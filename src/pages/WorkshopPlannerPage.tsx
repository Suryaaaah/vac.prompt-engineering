import React, { useState } from 'react';
import { WORKSHOP_SESSIONS, WORKSHOP_EXERCISES } from '../data/workshopData';
import {
  CalendarCheck,
  Clock,
  Printer,
  ChevronDown,
  ChevronUp,
  Target,
  CheckCircle2,
  Users,
  Code2
} from 'lucide-react';

export const WorkshopPlannerPage: React.FC = () => {
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(1);

  const totalMinutes = WORKSHOP_SESSIONS.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-2">
            <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>COLLEGE CURRICULUM SYLLABUS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Workshop Planner & Schedule
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            A comprehensive, battle-tested 2-hour (120-minute) instructional roadmap structured for academic department workshops, faculty presentations, and student hackathons.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="no-print inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#12192B] hover:bg-slate-800 text-slate-200 border border-white/10 shadow transition-all self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Print Schedule / PDF</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0E1322] border border-white/10 shadow">
          <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Total Duration</span>
          <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-1.5">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>{totalMinutes} Mins</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Exactly 2.0 Hours</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E1322] border border-white/10 shadow">
          <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Sessions Count</span>
          <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-1.5">
            <Target className="w-5 h-5 text-purple-400" />
            <span>{WORKSHOP_SESSIONS.length} Segments</span>
          </div>
          <span className="text-[10px] text-purple-400 font-mono mt-1 block">Theory + Hands-on + Lab</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E1322] border border-white/10 shadow">
          <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Target Cohort</span>
          <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-1.5">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>1st & 2nd Year</span>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono mt-1 block">B.Tech / B.E. Students</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E1322] border border-white/10 shadow">
          <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Interactive Lab</span>
          <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-1.5">
            <Code2 className="w-5 h-5 text-amber-400" />
            <span>35 Mins</span>
          </div>
          <span className="text-[10px] text-amber-400 font-mono mt-1 block">Exercises & Prompt Refactoring</span>
        </div>
      </div>

      {/* Timeline Schedule View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Official 120-Minute Workshop Agenda
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Sum of Sessions = {totalMinutes}m
          </span>
        </div>

        <div className="space-y-3">
          {WORKSHOP_SESSIONS.map((session, index) => {
            const isExpanded = expandedSessionId === session.id;

            // Calculate start minute offset
            let startMinute = 0;
            for (let i = 0; i < index; i++) {
              startMinute += WORKSHOP_SESSIONS[i].durationMinutes;
            }
            const endMinute = startMinute + session.durationMinutes;

            return (
              <div
                key={session.id}
                className="rounded-2xl bg-[#0E1322] border border-white/10 overflow-hidden shadow-lg transition-all"
              >
                {/* Session Header Bar */}
                <div
                  onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-12 h-10 rounded-xl bg-[#12192B] border border-white/10 flex flex-col items-center justify-center font-mono shrink-0">
                      <span className="text-xs font-bold text-cyan-400">{session.durationMinutes}m</span>
                      <span className="text-[9px] text-slate-500 uppercase">Dur</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-0.5">
                        <span>Session {session.id}</span>
                        <span>•</span>
                        <span className="text-slate-400">
                          Minute {startMinute} - {endMinute} (T+{startMinute}m)
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {session.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs text-slate-400 font-mono hidden md:inline">
                      {session.objectives.length} Objectives
                    </span>
                    <button
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                      aria-label="Toggle session detail"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Session Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-white/5 space-y-4 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Session Objectives */}
                      <div className="p-4 rounded-xl bg-[#12192B] border border-white/5 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono block">
                          Session Objectives
                        </span>
                        <ul className="text-xs text-slate-300 space-y-1.5">
                          {session.objectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Learning Outcomes */}
                      <div className="p-4 rounded-xl bg-[#12192B] border border-white/5 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono block">
                          Expected Learning Outcomes
                        </span>
                        <ul className="text-xs text-slate-300 space-y-1.5">
                          {session.learningOutcomes.map((out, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{out}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Activity Instructions */}
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-200 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 font-mono block">
                        Instructor & Student Activity Instructions:
                      </span>
                      <p className="leading-relaxed text-slate-300">
                        {session.activityInstructions}
                      </p>
                    </div>

                    {session.speakerNotes && (
                      <div className="text-[11px] text-slate-400 italic">
                        <strong>Speaker Tip:</strong> {session.speakerNotes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Workshop Exercise Bank */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              Hands-On Student Exercise Bank
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Practical prompt refactoring tasks for the 20-minute hands-on lab block.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WORKSHOP_EXERCISES.map((ex) => (
            <div key={ex.id} className="p-5 rounded-2xl bg-[#0E1322] border border-white/10 shadow flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {ex.title}
                </h3>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  {ex.scenario}
                </p>

                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 font-mono text-xs text-rose-200 mb-3">
                  <span className="text-[10px] uppercase text-rose-400 font-bold block mb-1">Starter Weak Prompt:</span>
                  "{ex.starterPrompt}"
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <span className="text-cyan-400 font-semibold block text-[11px]">Assignment:</span>
                  <p className="text-slate-400 text-xs leading-relaxed">{ex.task}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Target Elements to Include:</span>
                <div className="flex flex-wrap gap-1">
                  {ex.targetElements.map((el, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      ✓ {el}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
