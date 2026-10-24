import React, { useState, useEffect } from 'react';
import {
  VERIFICATION_TOPICS,
  VERIFICATION_CHECKLIST_ITEMS,
  VERIFICATION_SCENARIOS,
  VERIFICATION_REPORT_TEMPLATE
} from '../data/verificationData';
import { getChecklistState, toggleChecklistItem } from '../utils/storage';
import {
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  FileCheck2,
  Bug,
  BookOpen
} from 'lucide-react';

export const AiVerificationPage: React.FC = () => {
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [copiedReport, setCopiedReport] = useState(false);
  const [activeTab, setActiveTab] = useState<'checklist' | 'scenarios' | 'topics' | 'report'>('checklist');

  useEffect(() => {
    setChecklistState(getChecklistState());
  }, []);

  const handleToggleItem = (id: string) => {
    const updated = toggleChecklistItem(id);
    setChecklistState({ ...updated });
  };

  const handleCopyReportTemplate = () => {
    navigator.clipboard.writeText(VERIFICATION_REPORT_TEMPLATE);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const checkedCount = Object.values(checklistState).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>RESPONSIBLE AI & CODE AUDITING</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          AI Output Verification & Ethics
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl">
          Never trust raw AI code or citations without independent testing. Master the 8-point Verification Checklist, audit realistic bug scenarios, and maintain academic integrity.
        </p>

        <div className="mt-4 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Engineering Rule:</strong> AI-generated content is strictly unverified draft code. Always compile in a sandbox, review OWASP security vulnerabilities, and verify references on primary documentation.
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'checklist'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-primary'
              : 'bg-[#0E1322] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Verification Checklist ({checkedCount}/8)
        </button>
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'scenarios'
              ? 'bg-purple-600 text-white shadow-glow-primary'
              : 'bg-[#0E1322] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Interactive Audit Scenarios (4)
        </button>
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'topics'
              ? 'bg-indigo-600 text-white shadow-glow-primary'
              : 'bg-[#0E1322] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          10 Ethical & Safety Principles
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'report'
              ? 'bg-cyan-600 text-white shadow-glow-primary'
              : 'bg-[#0E1322] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          Audit Report Template
        </button>
      </div>

      {/* TAB 1: PRACTICAL VERIFICATION CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 shadow-2xl space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-400" />
                The 8-Point AI Verification Checklist
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Mark items as completed before integrating any AI-suggested code into your university assignments or repositories.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-300 font-bold">
                {checkedCount} of {VERIFICATION_CHECKLIST_ITEMS.length} Verified
              </span>
              <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-400 h-2 rounded-full transition-all"
                  style={{ width: `${(checkedCount / VERIFICATION_CHECKLIST_ITEMS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {VERIFICATION_CHECKLIST_ITEMS.map((item) => {
              const isChecked = Boolean(checklistState[item.id]);
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggleItem(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-white shadow'
                      : 'bg-[#12192B] border-white/5 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-emerald-500 text-white'
                        : 'border border-slate-600 bg-black/40'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-0.5">
                      {item.category}
                    </span>
                    <p className={`text-xs md:text-sm ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-400 flex items-center justify-between">
            <span>Checklist state is automatically saved to your browser session.</span>
            <button
              onClick={() => {
                VERIFICATION_CHECKLIST_ITEMS.forEach(i => {
                  if (checklistState[i.id]) toggleChecklistItem(i.id);
                });
                setChecklistState({});
              }}
              className="text-xs text-purple-300 hover:text-purple-200 underline"
            >
              Reset All Checkmarks
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE SCENARIOS */}
      {activeTab === 'scenarios' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="pb-2">
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Bug className="w-5 h-5 text-rose-400" />
              Realistic AI Output Defect Scenarios
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Can you spot the trap? Review realistic student interactions where AI generated flawed, insecure, or hallucinated outputs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VERIFICATION_SCENARIOS.map((sc) => (
              <div
                key={sc.id}
                className="rounded-2xl bg-[#0E1322] border border-white/10 p-5 space-y-4 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white font-mono">{sc.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        sc.riskLevel === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : sc.riskLevel === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      Risk: {sc.riskLevel}
                    </span>
                  </div>

                  {/* Fictional Output */}
                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 font-mono text-xs text-slate-300 mb-3 whitespace-pre-line leading-relaxed">
                    <span className="text-[10px] uppercase text-slate-500 block mb-1">Simulated AI Output:</span>
                    {sc.fictionalAiOutput}
                  </div>

                  {/* Possible Issue */}
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200 mb-2">
                    <span className="font-bold text-rose-300 block mb-0.5">Identified Defect / Trap:</span>
                    {sc.possibleIssue}
                  </div>

                  {/* Verification Task */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200 mb-2">
                    <span className="font-bold text-cyan-300 block mb-0.5">Recommended Audit Task:</span>
                    {sc.verificationTask}
                  </div>
                </div>

                {/* Correct Approach */}
                <div className="pt-3 border-t border-white/5 text-xs text-slate-300">
                  <span className="text-emerald-400 font-semibold block mb-0.5">Correct Engineering Protocol:</span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">{sc.correctApproach}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 10 ETHICAL & SAFETY PRINCIPLES */}
      {activeTab === 'topics' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="pb-2">
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              10 Fundamental Responsible AI Principles
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Core academic and engineering guidelines for evaluating artificial intelligence outputs ethically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VERIFICATION_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="p-5 rounded-2xl bg-[#0E1322] border border-white/10 space-y-3 shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 font-mono text-xs font-bold text-cyan-400 flex items-center justify-center">
                    {topic.id}
                  </span>
                  <h3 className="text-sm font-bold text-white flex-1 ml-2.5">
                    {topic.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {topic.shortDesc}
                </p>

                <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-[11px] text-rose-300">
                  <strong>Risk:</strong> {topic.riskFactor}
                </div>

                <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-500/20 text-[11px] text-purple-200">
                  <strong>Best Practice:</strong> {topic.bestPractice}
                </div>

                <div className="text-[11px] text-slate-500">
                  <span className="text-slate-400 font-medium">Warning Signs: </span>
                  {topic.warningSigns.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT REPORT TEMPLATE */}
      {activeTab === 'report' && (
        <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 shadow-2xl space-y-4 animate-in fade-in max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                Standard Verification Report Template
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Use this markdown template to document testing results for university lab reports and project evaluations.
              </p>
            </div>

            <button
              onClick={handleCopyReportTemplate}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-primary flex items-center gap-1.5 transition-all"
            >
              {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedReport ? 'Copied Template!' : 'Copy Template'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-cyan-200 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar">
            {VERIFICATION_REPORT_TEMPLATE}
          </pre>
        </div>
      )}
    </div>
  );
};
