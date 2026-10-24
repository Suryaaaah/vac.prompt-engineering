import type { SavedPrompt, QuizResult, ActivityLog } from '../types';

const STORAGE_KEYS = {
  SAVED_PROMPTS: 'promptcraft_saved_prompts_v1',
  COMPLETED_LESSONS: 'promptcraft_completed_lessons_v1',
  LATEST_QUIZ: 'promptcraft_latest_quiz_v1',
  ACTIVITIES: 'promptcraft_activity_log_v1',
  CHECKLIST: 'promptcraft_verification_checklist_v1',
};

export const getSavedPrompts = (): SavedPrompt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_PROMPTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read saved prompts from localStorage', e);
    return [];
  }
};

export const savePrompt = (prompt: Omit<SavedPrompt, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): SavedPrompt => {
  const current = getSavedPrompts();
  const now = new Date().toISOString();
  
  if (prompt.id) {
    // Update existing
    const index = current.findIndex(p => p.id === prompt.id);
    if (index !== -1) {
      const updated: SavedPrompt = {
        ...current[index],
        ...prompt,
        id: prompt.id,
        updatedAt: now,
      };
      current[index] = updated;
      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(current));
      addActivity('prompt_saved', `Updated prompt: "${updated.title}"`);
      return updated;
    }
  }

  // Create new
  const newPrompt: SavedPrompt = {
    ...prompt,
    id: `prompt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };
  const updated = [newPrompt, ...current];
  localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(updated));
  addActivity('prompt_saved', `Saved new prompt: "${newPrompt.title}"`);
  return newPrompt;
};

export const deletePrompt = (id: string): boolean => {
  const current = getSavedPrompts();
  const filtered = current.filter(p => p.id !== id);
  if (filtered.length !== current.length) {
    localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(filtered));
    addActivity('prompt_saved', 'Deleted a prompt from library');
    return true;
  }
  return false;
};

export const toggleFavoritePrompt = (id: string): boolean => {
  const current = getSavedPrompts();
  const target = current.find(p => p.id === id);
  if (target) {
    target.isFavorite = !target.isFavorite;
    target.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(current));
    return target.isFavorite;
  }
  return false;
};

export const clearAllPrompts = (): void => {
  localStorage.removeItem(STORAGE_KEYS.SAVED_PROMPTS);
  addActivity('prompt_saved', 'Cleared all saved prompts from local storage');
};

// ================= Completed Lessons =================
export const getCompletedLessons = (): number[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

export const toggleLessonCompleted = (lessonId: number): boolean => {
  const current = getCompletedLessons();
  const exists = current.includes(lessonId);
  let updated: number[];
  if (exists) {
    updated = current.filter(id => id !== lessonId);
  } else {
    updated = [...current, lessonId];
    addActivity('lesson', `Completed Module ${lessonId}`);
  }
  localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(updated));
  return !exists;
};

// ================= Quiz Results =================
export const getLatestQuizResult = (): QuizResult | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LATEST_QUIZ);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const saveQuizResult = (result: QuizResult): void => {
  localStorage.setItem(STORAGE_KEYS.LATEST_QUIZ, JSON.stringify(result));
  addActivity('quiz', `Finished Quiz with score ${result.score}/${result.total} (${result.percentage}%)`);
};

// ================= Activity Log =================
export const getActivities = (): ActivityLog[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

export const addActivity = (type: ActivityLog['type'], description: string): void => {
  try {
    const current = getActivities();
    const newEntry: ActivityLog = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      type,
      description,
      timestamp: new Date().toISOString(),
    };
    const updated = [newEntry, ...current].slice(0, 20); // Keep last 20
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to log activity', e);
  }
};

// ================= Verification Checklist =================
export const getChecklistState = (): Record<string, boolean> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
};

export const toggleChecklistItem = (id: string): Record<string, boolean> => {
  const current = getChecklistState();
  const updated = { ...current, [id]: !current[id] };
  localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(updated));
  return updated;
};

// ================= Reset All User Data =================
export const resetAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
};
