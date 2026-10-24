import type { SavedPrompt } from '../types';
import { getSavedPrompts, getCompletedLessons, getLatestQuizResult } from './storage';

export function exportPromptsToJson(): void {
  const prompts = getSavedPrompts();
  const exportPayload = {
    app: 'PromptCraft AI',
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    itemCount: prompts.length,
    prompts
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `promptcraft_prompts_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportFullBackupToJson(): void {
  const fullBackup = {
    app: 'PromptCraft AI — Full Backup',
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    prompts: getSavedPrompts(),
    completedLessons: getCompletedLessons(),
    latestQuiz: getLatestQuizResult(),
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `promptcraft_full_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export interface ImportResult {
  success: boolean;
  importedCount: number;
  message: string;
}

export function validateAndParseImportedJson(jsonString: string): { valid: boolean; prompts: SavedPrompt[]; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    let candidatePrompts: any[] = [];

    if (Array.isArray(parsed)) {
      candidatePrompts = parsed;
    } else if (parsed && Array.isArray(parsed.prompts)) {
      candidatePrompts = parsed.prompts;
    } else {
      return { valid: false, prompts: [], error: 'Invalid JSON structure. Expected an array of prompts or an object with a "prompts" array.' };
    }

    const validated: SavedPrompt[] = [];

    for (let i = 0; i < candidatePrompts.length; i++) {
      const p = candidatePrompts[i];
      if (!p || typeof p !== 'object') continue;
      if (!p.title || typeof p.title !== 'string') continue;
      if (!p.promptText || typeof p.promptText !== 'string') continue;

      const validPrompt: SavedPrompt = {
        id: typeof p.id === 'string' && p.id ? p.id : `imported_${Date.now()}_${i}`,
        title: p.title.trim().slice(0, 120),
        promptText: p.promptText.trim(),
        category: (['Coding', 'Writing', 'Studying', 'Research', 'Presentation', 'General'].includes(p.category) ? p.category : 'General') as any,
        tags: Array.isArray(p.tags) ? p.tags.map((t: any) => String(t).trim()).filter(Boolean) : ['imported'],
        isFavorite: Boolean(p.isFavorite),
        createdAt: typeof p.createdAt === 'string' ? p.createdAt : new Date().toISOString(),
        updatedAt: typeof p.updatedAt === 'string' ? p.updatedAt : new Date().toISOString(),
        originalPrompt: typeof p.originalPrompt === 'string' ? p.originalPrompt : undefined,
        technique: typeof p.technique === 'string' ? p.technique : undefined
      };
      validated.push(validPrompt);
    }

    if (validated.length === 0) {
      return { valid: false, prompts: [], error: 'No valid prompt objects containing "title" and "promptText" were found in the file.' };
    }

    return { valid: true, prompts: validated };
  } catch (err: any) {
    return { valid: false, prompts: [], error: `JSON parse error: ${err.message || 'Corrupted file syntax'}` };
  }
}
