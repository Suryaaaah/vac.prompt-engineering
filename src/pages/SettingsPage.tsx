import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Settings,
  HardDrive,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  getSavedPrompts,
  getCompletedLessons,
  getLatestQuizResult,
  getActivities,
  resetAllData
} from '../utils/storage';
import { exportFullBackupToJson } from '../utils/exportImport';

export const SettingsPage: React.FC = () => {
  const { syncStorage } = useOutletContext<{ syncStorage: () => void }>() || {};

  const [promptCount, setPromptCount] = useState(0);
  const [completedLessonCount, setCompletedLessonCount] = useState(0);
  const [hasQuizResult, setHasQuizResult] = useState(false);
  const [activityCount, setActivityCount] = useState(0);
  const [storageSizeKb, setStorageSizeKb] = useState('0');

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const calculateStorage = () => {
    setPromptCount(getSavedPrompts().length);
    setCompletedLessonCount(getCompletedLessons().length);
    setHasQuizResult(getLatestQuizResult() !== null);
    setActivityCount(getActivities().length);

    let totalChars = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('promptcraft')) {
        totalChars += (localStorage.getItem(key) || '').length;
      }
    }
    setStorageSizeKb((totalChars / 1024).toFixed(2));
  };

  useEffect(() => {
    calculateStorage();
  }, []);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleExportBackup = () => {
    exportFullBackupToJson();
    showFeedback('success', 'Full system backup downloaded as JSON.');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (parsed.prompts && Array.isArray(parsed.prompts)) {
          localStorage.setItem('promptcraft_saved_prompts_v1', JSON.stringify(parsed.prompts));
        }
        if (parsed.completedLessons && Array.isArray(parsed.completedLessons)) {
          localStorage.setItem('promptcraft_completed_lessons_v1', JSON.stringify(parsed.completedLessons));
        }
        if (parsed.latestQuiz) {
          localStorage.setItem('promptcraft_latest_quiz_v1', JSON.stringify(parsed.latestQuiz));
        }

        calculateStorage();
        if (syncStorage) syncStorage();
        showFeedback('success', 'Backup restored successfully into LocalStorage!');
      } catch (err: any) {
        showFeedback('error', 'Failed to restore backup: Invalid JSON structure.');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  const handleResetConfirmed = () => {
    resetAllData();
    calculateStorage();
    setConfirmResetOpen(false);
    if (syncStorage) syncStorage();
    showFeedback('success', 'All local data and progress have been reset.');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-white/10 mb-2">
          <Settings className="w-3.5 h-3.5 text-cyan-400" />
          <span>PREFERENCES & LOCAL STORAGE</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          System & Data Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Inspect browser storage allocation, export full system backups, or reset progress.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 border animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Storage Diagnostics Card */}
      <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-purple-400" />
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Local Browser Storage Diagnostics
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold">
            {storageSizeKb} KB Allocated
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
            <span className="text-slate-500 block mb-1 font-mono">Saved Prompts</span>
            <span className="text-white font-bold text-base font-mono">{promptCount}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
            <span className="text-slate-500 block mb-1 font-mono">Completed Lessons</span>
            <span className="text-purple-300 font-bold text-base font-mono">{completedLessonCount} / 7</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
            <span className="text-slate-500 block mb-1 font-mono">Quiz Status</span>
            <span className="text-cyan-400 font-bold text-base font-mono">
              {hasQuizResult ? 'Score Recorded' : 'Not Attempted'}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
            <span className="text-slate-500 block mb-1 font-mono">Activity History</span>
            <span className="text-emerald-400 font-bold text-base font-mono">{activityCount} Entries</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          PromptCraft AI stores all user states directly in your browser's persistent <code className="text-cyan-300">window.localStorage</code>. No telemetry, student credentials, or prompts are transmitted to remote cloud databases.
        </p>
      </div>

      {/* Backup and Restore Actions */}
      <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 shadow-xl space-y-5">
        <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <Download className="w-5 h-5 text-cyan-400" />
          Backup & Data Portability
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#12192B] border border-white/5 space-y-3 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Export Full System Backup</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download a JSON snapshot containing all saved prompts, module completion flags, and your latest quiz score.
              </p>
            </div>
            <button
              onClick={handleExportBackup}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 flex items-center justify-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download Full Backup (JSON)</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#12192B] border border-white/5 space-y-3 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Restore System Backup</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Restore a previously exported PromptCraft AI JSON file to recover your saved prompts and progress on another device.
              </p>
            </div>
            <label className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 cursor-pointer flex items-center justify-center gap-1.5 transition-all text-center">
              <Upload className="w-3.5 h-3.5 text-purple-400" />
              <span>Upload Backup JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="rounded-2xl bg-rose-950/20 border border-rose-500/20 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-rose-300">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h2 className="text-base font-bold font-mono uppercase tracking-wider">
            Reset Data & Fresh Start
          </h2>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Clear all local student data, including completed module checkmarks, quiz scores, and saved library prompts. This will reset the application to its first-time initial state.
        </p>

        <button
          onClick={() => setConfirmResetOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600/30 hover:bg-rose-600 text-rose-200 border border-rose-500/40 flex items-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Application Data</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0E1322] border border-white/15 p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white">Reset All Progress?</h3>
              <p className="text-xs text-slate-400 mt-1">
                This will wipe all 7 module progress records, your quiz score, and saved prompts from this browser. This cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleResetConfirmed}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
