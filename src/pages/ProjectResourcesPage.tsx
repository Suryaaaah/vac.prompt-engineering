import React, { useState } from 'react';
import {
  PROMPT_QUALITY_CHECKLIST,
  REUSABLE_PROMPT_TEMPLATE,
  RESEARCH_SUMMARY,
  WORKSHOP_LEARNING_OBJECTIVES,
  PRESENTATION_OUTLINE
} from '../data/resourcesData';
import { QUIZ_QUESTIONS } from '../data/quizData';
import {
  FileCode2,
  Copy,
  Check,
  Printer,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Presentation,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const ProjectResourcesPage: React.FC = () => {
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [activeTab, setActiveTab] = useState<'template' | 'quality' | 'research' | 'presentation' | 'quizKey'>('template');

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(REUSABLE_PROMPT_TEMPLATE);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-2">
            <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>REFERENCE REPOSITORY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Project Resources & Cheatsheets
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Official guidelines, reusable prompt skeletons, presentation slide outlines, verified industry research citations, and quiz answer keys.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#12192B] hover:bg-slate-800 text-slate-200 border border-white/10 transition-all self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Print Resources</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        <button
          onClick={() => setActiveTab('template')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'template'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-primary'
              : 'bg-[#0E1322] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Reusable Prompt Skeleton
        </button>
        <button
          onClick={() => setActiveTab('quality')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'quality'
              ? 'bg-purple-600 text-white shadow-glow-primary'
              : 'bg-[#0E1322] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Prompt Quality Checklist
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'research'
              ? 'bg-indigo-600 text-white shadow-glow-primary'
              : 'bg-[#0E1322] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Research & Official Lab Docs
        </button>
        <button
          onClick={() => setActiveTab('presentation')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'presentation'
              ? 'bg-cyan-600 text-white shadow-glow-primary'
              : 'bg-[#0E1322] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Presentation Slide Deck Outline
        </button>
        <button
          onClick={() => setActiveTab('quizKey')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'quizKey'
              ? 'bg-amber-600 text-white shadow-glow-primary'
              : 'bg-[#0E1322] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Quiz Verified Answer Key
        </button>
      </div>

      {/* TAB 1: REUSABLE PROMPT TEMPLATE */}
      {activeTab === 'template' && (
        <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 shadow-2xl space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                The Universal Prompt Template
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Copy and adapt this structured prompt skeleton. <em>Note:</em> Not every prompt requires every field; include only what is relevant to your specific programming or study task.
              </p>
            </div>

            <button
              onClick={handleCopyTemplate}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-primary flex items-center gap-1.5 transition-all self-start sm:self-auto"
            >
              {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTemplate ? 'Copied Template!' : 'Copy Template'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <pre className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar">
                {REUSABLE_PROMPT_TEMPLATE}
              </pre>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <div className="p-4 rounded-xl bg-[#12192B] border border-white/5 space-y-2 text-xs">
                <span className="font-bold text-cyan-400 font-mono uppercase block">Template Usage Rules</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  • <strong>Role:</strong> Use domain expertise keywords (e.g. "Senior Security Engineer") to prime tone and depth.
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  • <strong>Constraints:</strong> Add negative constraints ("Do not use libraries X or Y") to eliminate unwanted shortcuts.
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  • <strong>Output Format:</strong> Lock schemas (Markdown tables, JSON) for clean extraction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-300">
                <span className="font-bold block mb-1">Workshop Learning Objectives:</span>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  {WORKSHOP_LEARNING_OBJECTIVES.slice(0, 3).map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROMPT QUALITY CHECKLIST */}
      {activeTab === 'quality' && (
        <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 shadow-2xl space-y-4 animate-in fade-in">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Prompt Quality Assurance Checklist
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              8 structural criteria to audit before sending any mission-critical instruction to an AI model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROMPT_QUALITY_CHECKLIST.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-[#12192B] border border-white/5 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-300 font-mono text-[10px] flex items-center justify-center font-bold">
                    ✓
                  </span>
                  <span className="text-xs font-bold text-white">{item.item}</span>
                </div>
                <p className="text-xs text-slate-400 pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RESEARCH & LAB DOCUMENTATION */}
      {activeTab === 'research' && (
        <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 shadow-2xl space-y-6 animate-in fade-in">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              {RESEARCH_SUMMARY.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {RESEARCH_SUMMARY.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RESEARCH_SUMMARY.sources.map((src, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#12192B] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {src.lab}
                  </span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
                  >
                    Official Docs <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h3 className="text-sm font-bold text-white">{src.resource}</h3>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Core Recommended Tactics:</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {src.keyTactics.map((tac, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{tac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRESENTATION SLIDE DECK OUTLINE */}
      {activeTab === 'presentation' && (
        <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 shadow-2xl space-y-5 animate-in fade-in">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Presentation className="w-5 h-5 text-cyan-400" />
              15-Minute College Workshop Presentation Slide Outline
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Use this structured slide roadmap to deliver an engaging demonstration to faculty examiners and student peers.
            </p>
          </div>

          <div className="space-y-3">
            {PRESENTATION_OUTLINE.map((slide) => (
              <div key={slide.slideNumber} className="p-4 rounded-xl bg-[#12192B] border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-sm text-cyan-400 shrink-0">
                  #{slide.slideNumber}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{slide.title}</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                    {slide.talkingPoints.map((tp, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-black/40 border border-white/5 text-slate-300">
                        • {tp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: QUIZ VERIFIED ANSWER KEY */}
      {activeTab === 'quizKey' && (
        <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 shadow-2xl space-y-4 animate-in fade-in">
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              Official 12-Question Quiz Answer Key
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Quick reference sheet for instructors and students reviewing the 12 evaluation questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {QUIZ_QUESTIONS.map((q) => (
              <div key={q.id} className="p-3.5 rounded-xl bg-[#12192B] border border-white/5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-cyan-400 font-bold">Q{q.id}: {q.topic}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    Option {['A', 'B', 'C', 'D'][q.correctIndex]}
                  </span>
                </div>
                <div className="text-slate-300 font-medium">{q.question}</div>
                <div className="text-emerald-300/90 font-mono text-[11px] bg-black/30 p-2 rounded">
                  ✓ {q.options[q.correctIndex]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
