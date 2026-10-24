import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  BookmarkPlus,
  AlertCircle,
  SlidersHorizontal,
  Bot,
  Zap
} from 'lucide-react';
import type { CategoryType } from '../types';
import { improvePrompt, type ImprovedPromptResult } from '../utils/promptEngine';
import { savePrompt } from '../utils/storage';

export const PlaygroundPage: React.FC = () => {
  const { syncStorage } = useOutletContext<{ syncStorage: () => void }>() || {};

  // Form states
  const [inputPrompt, setInputPrompt] = useState('');
  const [category, setCategory] = useState<CategoryType>('Coding');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate'>('Beginner');
  const [customAudience, setCustomAudience] = useState('');
  const [customFormat, setCustomFormat] = useState('');

  // Results & Feedback states
  const [result, setResult] = useState<ImprovedPromptResult | null>(null);
  const [validationError, setValidationError] = useState('');
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedImproved, setCopiedImproved] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Quick preset templates for rapid student testing
  const presets = [
    { label: 'Java Recursion', text: 'Write a program to reverse an array recursively in Java.', cat: 'Coding' as CategoryType },
    { label: 'SQL Joins', text: 'Explain the difference between inner and outer joins with SQL.', cat: 'Coding' as CategoryType },
    { label: 'Project Abstract', text: 'Help me write an abstract for my student library management project.', cat: 'Writing' as CategoryType },
    { label: 'OS Deadlocks', text: 'Explain deadlock conditions for my operating systems viva.', cat: 'Studying' as CategoryType },
  ];

  const handleImprove = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim()) {
      setValidationError('Please type or paste a prompt first to evaluate and improve.');
      return;
    }
    setValidationError('');
    const res = improvePrompt(inputPrompt, category, difficulty, customAudience, customFormat);
    setResult(res);
    setSaveSuccess(false);
  };

  const handleReset = () => {
    setInputPrompt('');
    setResult(null);
    setValidationError('');
    setSaveSuccess(false);
    setCustomAudience('');
    setCustomFormat('');
  };

  const handleCopyOriginal = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.originalPrompt);
    setCopiedOriginal(true);
    setTimeout(() => setCopiedOriginal(false), 2000);
  };

  const handleCopyImproved = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.improvedPrompt);
    setCopiedImproved(true);
    setTimeout(() => setCopiedImproved(false), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!result) return;
    savePrompt({
      title: result.originalPrompt.slice(0, 40) + '...',
      promptText: result.improvedPrompt,
      originalPrompt: result.originalPrompt,
      category: result.category,
      tags: [result.category.toLowerCase(), result.difficulty.toLowerCase(), 'playground-generated'],
      isFavorite: false,
      technique: 'Rule-Engine Optimization',
    });
    setSaveSuccess(true);
    if (syncStorage) syncStorage();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Title & Disclaimers */}
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-2">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>INTERACTIVE PROMPT OPTIMIZER</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Turn Weak Prompts into Powerful Prompts.
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl">
          Analyze instructions through the 6-pillar Prompt Anatomy. This local rule-based assistant detects missing parameters, boundary constraints, and output structures to build deterministic prompts.
        </p>

        {/* Clear Rule-Based Engine Notice */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200">
          <Bot className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Deterministic Rule Engine:</strong> This is a local algorithmic prompt architect that formats instructions according to LLM best practices. No external API keys or cloud calls required.
          </span>
        </div>
      </div>

      {/* Main Grid: Input Form vs Output Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Panel (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-5 md:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                1. Input Raw Prompt
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5 font-mono">Quick Student Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputPrompt(p.text);
                      setCategory(p.cat);
                      setValidationError('');
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/5 hover:border-purple-500/30 transition-all"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Textarea */}
            <div>
              <label htmlFor="promptInput" className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Starting Instruction <span className="text-rose-400">*</span>
              </label>
              <textarea
                id="promptInput"
                rows={5}
                value={inputPrompt}
                onChange={(e) => {
                  setInputPrompt(e.target.value);
                  if (validationError) setValidationError('');
                }}
                placeholder="e.g. Write a program to sort numbers in Java or Explain binary search for exam..."
                className="w-full p-3.5 rounded-xl bg-[#12192B] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 transition-all font-mono"
              />
              <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500 font-mono">
                <span>{inputPrompt.length} characters</span>
                <span>Minimum 5 characters recommended</span>
              </div>
              {validationError && (
                <div className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>

            {/* Parameter Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full p-2.5 rounded-xl bg-[#12192B] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="Coding">Coding & Software</option>
                  <option value="Writing">Writing & Academic</option>
                  <option value="Studying">Studying & Exam Prep</option>
                  <option value="Research">Research & Papers</option>
                  <option value="Presentation">Presentation & Seminars</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Depth / Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'Beginner' | 'Intermediate')}
                  className="w-full p-2.5 rounded-xl bg-[#12192B] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="Beginner">Beginner (1st / 2nd Year CSE)</option>
                  <option value="Intermediate">Intermediate (Senior / Industry)</option>
                </select>
              </div>
            </div>

            {/* Optional Custom Audience & Format */}
            <div className="pt-2 space-y-3 border-t border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
                Optional Precision Modifiers
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Specific Audience (Optional)
                  </label>
                  <input
                    type="text"
                    value={customAudience}
                    onChange={(e) => setCustomAudience(e.target.value)}
                    placeholder="e.g. Lab External Examiner, 1st Year Intern"
                    className="w-full p-2 rounded-xl bg-[#12192B] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Specific Format (Optional)
                  </label>
                  <input
                    type="text"
                    value={customFormat}
                    onChange={(e) => setCustomFormat(e.target.value)}
                    placeholder="e.g. Markdown table, Strict JSON, JUnit 5"
                    className="w-full p-2 rounded-xl bg-[#12192B] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => handleImprove()}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white shadow-glow-primary flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Improve My Prompt</span>
            </button>
          </div>
        </div>

        {/* Right Column: Output Card & Diagnostics (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-5">
          {!result ? (
            /* Helpful empty state */
            <div className="h-full min-h-[460px] rounded-2xl bg-[#0E1322] border border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-lg font-bold text-white">No Prompt Analyzed Yet</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter a weak prompt on the left or click one of the quick presets, then press <strong>Improve My Prompt</strong> to inspect the before-and-after transformation.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#12192B] border border-white/5 text-left text-xs text-slate-400 max-w-sm space-y-1.5 font-mono">
                <div className="text-cyan-400 font-semibold mb-1">What the engine diagnoses:</div>
                <div>✓ Missing Role / Domain Priming</div>
                <div>✓ Vague Task vs Imperative Action Verbs</div>
                <div>✓ Missing Boundary & Defensive Constraints</div>
                <div>✓ Output Schemas (JSON, Tables, Code)</div>
              </div>
            </div>
          ) : (
            /* Output Result Card */
            <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-5 md:p-6 shadow-2xl space-y-6 animate-in fade-in">
              {/* Output Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                      Engineered Prompt Ready
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {result.improvedPrompt.length} characters ({result.improvedPrompt.split(/\s+/).length} words)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyImproved}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 flex items-center gap-1.5 transition-all"
                  >
                    {copiedImproved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedImproved ? 'Copied!' : 'Copy Improved'}</span>
                  </button>

                  <button
                    onClick={handleSaveToLibrary}
                    disabled={saveSuccess}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-all"
                  >
                    {saveSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                    <span>{saveSuccess ? 'Saved to Library' : 'Save'}</span>
                  </button>
                </div>
              </div>

              {/* Elements Included vs Missing Diagnostic Bar */}
              <div className="p-4 rounded-xl bg-[#12192B] border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold">Prompt Completeness Score:</span>
                  <span className={`font-bold ${result.analysis.score > 60 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {result.analysis.score} / 100
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      result.analysis.score > 60 ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' : 'bg-gradient-to-r from-amber-500 to-rose-400'
                    }`}
                    style={{ width: `${Math.max(result.analysis.score, 15)}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div>
                    <span className="text-emerald-400 font-semibold block mb-1">Elements Detected:</span>
                    {result.analysis.includedElements.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {result.analysis.includedElements.map((el, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            {el}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-500 italic">None in raw prompt</span>
                    )}
                  </div>

                  <div>
                    <span className="text-amber-400 font-semibold block mb-1">Engine Added:</span>
                    <div className="flex flex-wrap gap-1">
                      {result.analysis.missingElements.map((el, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          + {el}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Improved Prompt Output Block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                    Synthesized Prompt Output
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Ready to paste into AI tools</span>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-purple-100 whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto custom-scrollbar">
                  {result.improvedPrompt}
                </div>
              </div>

              {/* Before and After Comparison Section */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold block">
                  Before vs After Comparison
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                    <div className="flex items-center justify-between text-rose-300 font-bold">
                      <span>Original Prompt</span>
                      <button
                        onClick={handleCopyOriginal}
                        className="text-slate-400 hover:text-white"
                        title="Copy original"
                      >
                        {copiedOriginal ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <p className="text-slate-400 font-mono text-[11px]">
                      "{result.originalPrompt}"
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1">
                    <div className="text-purple-300 font-bold">Key Enhancements</div>
                    <ul className="text-slate-400 text-[11px] list-disc list-inside space-y-0.5">
                      {result.explanation.map((exp, idx) => (
                        <li key={idx}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
