import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { LESSONS_DATA } from '../data/lessonsData';
import { getCompletedLessons, toggleLessonCompleted } from '../utils/storage';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Check,
  Copy,
  Layers,
  ArrowRight
} from 'lucide-react';

export const LearnPromptingPage: React.FC = () => {
  const { syncStorage } = useOutletContext<{ syncStorage: () => void }>() || {};
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  useEffect(() => {
    setCompletedIds(getCompletedLessons());
  }, []);

  const handleToggleComplete = (id: number) => {
    toggleLessonCompleted(id);
    const updated = getCompletedLessons();
    setCompletedIds(updated);
    if (syncStorage) syncStorage();
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const activeModule = LESSONS_DATA.find((m) => m.id === activeModuleId) || LESSONS_DATA[0];
  const isCompleted = completedIds.includes(activeModule.id);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>CURRICULUM MODULES</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Learn Prompt Engineering
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            A 7-part foundational guide crafted for first and second-year Computer Science Engineering students. Complete each module and verify your progress.
          </p>
        </div>

        {/* Progress tracker pill */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0E1322] border border-white/10 self-start md:self-auto">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Overall Mastery</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">
              {completedIds.length} / {LESSONS_DATA.length} Completed
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-bold text-white text-sm">
            {Math.round((completedIds.length / LESSONS_DATA.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Module Selector Grid / Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {LESSONS_DATA.map((mod) => {
          const isActive = mod.id === activeModuleId;
          const done = completedIds.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModuleId(mod.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/40 border-purple-500/60 shadow-glow-primary'
                  : 'bg-[#0E1322] border-white/5 hover:border-white/20 hover:bg-[#12192B]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                  M-0{mod.id}
                </span>
                {done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
              <div className="text-xs font-semibold text-white truncate">
                {mod.title.split(':')[1]?.trim() || mod.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Module Detailed View */}
      <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 space-y-8 shadow-2xl">
        {/* Module Title & Completion Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Estimated Duration: {activeModule.duration}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {activeModule.title}
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              {activeModule.shortDesc}
            </p>
          </div>

          <button
            onClick={() => handleToggleComplete(activeModule.id)}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all self-start sm:self-auto ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-primary'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Completed (Click to Unmark)' : 'Mark as Completed'}</span>
          </button>
        </div>

        {/* Section 1: Detailed Explanation & Key Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Core Concept Explanation
            </h3>
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-3 p-5 rounded-xl bg-[#12192B] border border-white/5">
              {activeModule.explanation}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 font-mono">
              Key Concepts & Takeaways
            </h3>
            <div className="p-4 rounded-xl bg-[#12192B] border border-white/5 space-y-2">
              {activeModule.keyConcepts.map((kc, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{kc}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-2">
              <span className="text-xs font-semibold text-purple-200 block">When to Use This:</span>
              {activeModule.whenToUse.map((wtu, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{wtu}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Real Examples with Bad vs Good Comparison */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Practical Demonstrations (Before vs After)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeModule.examples.map((eg, idx) => (
              <div key={idx} className="rounded-xl bg-[#12192B] border border-white/10 p-4 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-white mb-2 flex items-center justify-between">
                    <span>{eg.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">Ex 0{idx + 1}</span>
                  </div>

                  {/* Bad Prompt */}
                  <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200 mb-2">
                    <span className="text-[10px] font-bold uppercase text-rose-400 block mb-0.5">Weak Prompt:</span>
                    "{eg.badPrompt}"
                  </div>

                  {/* Good Prompt */}
                  <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-xs text-purple-100">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold uppercase text-cyan-300">Engineered Prompt:</span>
                      <button
                        onClick={() => copyToClipboard(eg.goodPrompt, `mod-${activeModule.id}-eg-${idx}`)}
                        className="p-1 hover:text-white text-slate-400"
                        title="Copy good prompt"
                      >
                        {copiedIndex === `mod-${activeModule.id}-eg-${idx}` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    "{eg.goodPrompt}"
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 leading-snug">
                  <span className="text-cyan-400 font-medium">Why it works: </span>
                  {eg.whyItWorks}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Common Mistakes to Avoid */}
        <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold font-mono uppercase">
            <AlertTriangle className="w-4 h-4" />
            Common Student Mistakes in this Technique
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            {activeModule.commonMistakes.map((mis, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✕</span>
                <span>{mis}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Mini Practice Activity */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-950/30 to-purple-950/20 border border-indigo-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Mini Hands-On Practice Activity
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Active Learning</span>
          </div>

          <div className="text-xs md:text-sm text-white font-medium">
            {activeModule.practiceActivity.task}
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-rose-300">
            <span className="text-[10px] uppercase text-slate-500 block">Starter Weak Prompt:</span>
            "{activeModule.practiceActivity.starterPrompt}"
          </div>

          {/* Interactive Hint and Model Answer Reveal */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() =>
                setRevealedHints({
                  ...revealedHints,
                  [activeModule.id]: !revealedHints[activeModule.id],
                })
              }
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 flex items-center gap-1.5"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{revealedHints[activeModule.id] ? 'Hide Hint' : 'Show Hint'}</span>
            </button>

            <button
              onClick={() =>
                setRevealedAnswers({
                  ...revealedAnswers,
                  [activeModule.id]: !revealedAnswers[activeModule.id],
                })
              }
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{revealedAnswers[activeModule.id] ? 'Hide Model Prompt' : 'Reveal Model Prompt'}</span>
            </button>
          </div>

          {revealedHints[activeModule.id] && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 animate-in fade-in">
              <span className="font-bold">Hint: </span>
              {activeModule.practiceActivity.hint}
            </div>
          )}

          {revealedAnswers[activeModule.id] && (
            <div className="p-4 rounded-lg bg-purple-950/50 border border-purple-500/40 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-cyan-300 font-semibold font-mono">
                <span>Recommended Engineered Prompt:</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      activeModule.practiceActivity.modelAnswer,
                      `practice-model-${activeModule.id}`
                    )
                  }
                  className="hover:text-white text-slate-400 flex items-center gap-1 text-[11px]"
                >
                  {copiedIndex === `practice-model-${activeModule.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-xs text-purple-100 whitespace-pre-line leading-relaxed">
                {activeModule.practiceActivity.modelAnswer}
              </p>
            </div>
          )}
        </div>

        {/* Navigation bottom bar */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            disabled={activeModule.id === 1}
            onClick={() => setActiveModuleId(activeModule.id - 1)}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
          >
            ← Previous Module
          </button>

          <span className="text-xs font-mono text-slate-500">
            Module {activeModule.id} of {LESSONS_DATA.length}
          </span>

          <button
            disabled={activeModule.id === LESSONS_DATA.length}
            onClick={() => setActiveModuleId(activeModule.id + 1)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:from-purple-500 hover:to-indigo-500 transition-colors flex items-center gap-1.5"
          >
            <span>Next Module</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
