import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  BookOpen,
  HelpCircle,
  FolderHeart,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Zap,
  RefreshCw,
  Compass,
  TrendingUp
} from 'lucide-react';
import { PromptAnatomy } from '../components/infographic/PromptAnatomy';
import { getCompletedLessons, getSavedPrompts, getLatestQuizResult, getActivities } from '../utils/storage';
import type { ActivityLog, QuizResult } from '../types';

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate();

  // Local storage real states
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [latestQuiz, setLatestQuiz] = useState<QuizResult | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  // Animated Prompt Card transformation state
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    setCompletedLessons(getCompletedLessons());
    setSavedCount(getSavedPrompts().length);
    setLatestQuiz(getLatestQuizResult());
    setActivities(getActivities());

    // Auto-toggle demonstration prompt every 5 seconds for visual wow factor
    const timer = setInterval(() => {
      setIsTransformed((prev) => !prev);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const totalLessons = 7;
  const progressPercent = Math.round(
    ((completedLessons.length / totalLessons) * 0.6 +
      (latestQuiz ? (latestQuiz.score / 12) * 0.3 : 0) +
      (savedCount > 0 ? 0.1 : 0)) *
      100
  );

  return (
    <div className="space-y-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative rounded-3xl bg-[#0E1322] border border-white/10 p-6 md:p-12 overflow-hidden shadow-2xl">
        {/* Decorative background glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Hero Left: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>PROMPT ENGINEERING WORKSHOP KIT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Master the Art of <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                Prompting.
              </span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              Learn how to turn simple instructions into clear, useful AI outputs through practical examples, guided exercises, and responsible AI practices. Tailored for First & Second-Year Computer Science Engineering students.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/learn')}
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-primary flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </button>

              <button
                onClick={() => navigate('/playground')}
                className="px-5 py-3 rounded-xl font-semibold text-sm bg-[#12192B] hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-purple-500/40 flex items-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Explore Prompt Playground</span>
              </button>
            </div>

            {/* Quick stats tags */}
            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero API Key Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>100% Local Browser Engine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>College Demo Ready</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Animated Prompt Transformation Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/15 bg-[#12192B]/90 backdrop-blur-xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isTransformed ? 'bg-cyan-400' : 'bg-amber-400'} animate-pulse`} />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    {isTransformed ? 'Engineered Prompt (Upgraded)' : 'Vague Raw Prompt (Weak)'}
                  </span>
                </div>
                <button
                  onClick={() => setIsTransformed(!isTransformed)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-all"
                  title="Toggle prompt comparison"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-mono">Toggle</span>
                </button>
              </div>

              {/* Animated Prompt Display */}
              <div className="min-h-[220px] flex flex-col justify-between">
                {!isTransformed ? (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="inline-block px-2.5 py-1 rounded text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Weak Prompt: Ambiguous & Incomplete
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-rose-200">
                      "Write a Java program to sort numbers."
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <p className="text-rose-400 font-medium">Why it fails:</p>
                      <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
                        <li>No algorithm specified (Bubble? Quick? Merge?)</li>
                        <li>No boundary conditions (nulls, duplicates)</li>
                        <li>No time/space complexity analysis</li>
                        <li>Misses Java LTS version and generics</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="inline-block px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Upgraded Prompt: High-Precision Specification
                    </div>
                    <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 font-mono text-[11px] text-purple-200 leading-relaxed max-h-36 overflow-y-auto custom-scrollbar">
                      <span className="text-cyan-300 font-bold">Act as a CS Lab Instructor.</span> Write a clean, compilable Java 17 method implementing <span className="text-amber-300">Dual-Pivot QuickSort</span> for a generic array. Include: (1) O(N log N) time complexity proof, (2) in-place memory optimization, and (3) JUnit 5 tests covering empty array and duplicate keys.
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/20">Role</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">Specific Algorithm</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/20">Edge Cases</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">JUnit 5</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>PromptCraft AI Engine</span>
                <span className="text-cyan-400 font-mono">Real-time transformation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS CARDS ================= */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E1322] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-slate-400">Curriculum</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white">5+</div>
          <div className="text-xs text-slate-400 mt-1">Prompting Techniques</div>
          <div className="text-[11px] text-purple-400 mt-2 font-mono">Role, Task, Context, Few-Shot, ReAct</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E1322] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-slate-400">Bank</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white">20</div>
          <div className="text-xs text-slate-400 mt-1">Prompt Examples</div>
          <div className="text-[11px] text-indigo-400 mt-2 font-mono">7 Coding, 6 Writing, 7 Studying</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E1322] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-slate-400">Evaluation</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white">12</div>
          <div className="text-xs text-slate-400 mt-1">Quiz Questions</div>
          <div className="text-[11px] text-cyan-400 mt-2 font-mono">Instant explanations & scoring</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E1322] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-slate-400">Workshop</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white">120-Min</div>
          <div className="text-xs text-slate-400 mt-1">Workshop Schedule</div>
          <div className="text-[11px] text-emerald-400 mt-2 font-mono">9 structured 2-hr sessions</div>
        </div>
      </section>

      {/* ================= LEARNING PROGRESS & RECENT ACTIVITY ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Progress Card (Local State) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0E1322] border border-white/10 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">Your Learning Progress</h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">
                {progressPercent}% Complete
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Real Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
                <span className="text-[11px] text-slate-400 block mb-1">Modules Done</span>
                <span className="text-lg font-bold text-white font-mono">
                  {completedLessons.length} <span className="text-xs text-slate-500">/ 7</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
                <span className="text-[11px] text-slate-400 block mb-1">Latest Quiz</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">
                  {latestQuiz ? `${latestQuiz.score} / 12` : '—'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
                <span className="text-[11px] text-slate-400 block mb-1">Saved Prompts</span>
                <span className="text-lg font-bold text-purple-300 font-mono">
                  {savedCount}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {completedLessons.length === 0
                ? 'Welcome! You have not started any modules yet.'
                : `${completedLessons.length} of 7 modules verified.`}
            </span>
            <button
              onClick={() => navigate('/learn')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
            >
              Resume Lessons <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0E1322] border border-white/10 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Recent Activity</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Local History</span>
            </div>

            {activities.length === 0 ? (
              /* Helpful onboarding message for new users */
              <div className="p-4 rounded-xl bg-[#12192B] border border-white/5 text-center space-y-2 my-auto">
                <Compass className="w-8 h-8 text-purple-400 mx-auto" />
                <div className="text-xs font-semibold text-white">Ready to begin your journey?</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Complete your first learning module, improve a prompt in the playground, or take the interactive quiz to see real activity logged here.
                </p>
                <button
                  onClick={() => navigate('/learn')}
                  className="mt-2 text-xs px-3 py-1.5 rounded-lg bg-purple-600/30 text-purple-200 border border-purple-500/40 hover:bg-purple-600/50"
                >
                  Start Module 1
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
                {activities.slice(0, 5).map((act) => (
                  <div key={act.id} className="p-2.5 rounded-xl bg-[#12192B] border border-white/5 flex items-start gap-2.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="text-slate-200 font-medium">{act.description}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Stored in browser LocalStorage</span>
            <button
              onClick={() => navigate('/settings')}
              className="text-[11px] text-purple-400 hover:text-purple-300"
            >
              Manage Data
            </button>
          </div>
        </div>
      </section>

      {/* ================= PROMPT ANATOMY INFOGRAPHIC ================= */}
      <section>
        <PromptAnatomy />
      </section>

      {/* ================= FEATURE CARDS ================= */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Platform Core Features</h2>
          <p className="text-sm text-slate-400 mt-1">
            Explore the multi-page modules designed specifically for engineering student project demonstrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Learn Prompting */}
          <div
            onClick={() => navigate('/learn')}
            className="p-6 rounded-2xl bg-[#0E1322] border border-white/10 hover:border-purple-500/40 hover:bg-[#12192B] transition-all cursor-pointer group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              1. Learn Prompting
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              7 comprehensive modules covering Role, Task, Context, Few-Shot, Step-by-Step, and ReAct paradigms with mini-practice tasks.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-purple-400 gap-1">
              <span>View 7 Modules</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Improve Your Prompts */}
          <div
            onClick={() => navigate('/playground')}
            className="p-6 rounded-2xl bg-[#0E1322] border border-white/10 hover:border-cyan-500/40 hover:bg-[#12192B] transition-all cursor-pointer group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              2. Improve Your Prompts
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Interactive rule-based Prompt Playground that analyzes missing prompt anatomy elements and generates production-ready prompts.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-cyan-400 gap-1">
              <span>Launch Playground</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Practice with Examples */}
          <div
            onClick={() => navigate('/examples')}
            className="p-6 rounded-2xl bg-[#0E1322] border border-white/10 hover:border-indigo-500/40 hover:bg-[#12192B] transition-all cursor-pointer group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
              3. Practice with Examples
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              20 full before-and-after prompt transformations spanning Java, Python, SQL, academic papers, and OS exam revision.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-indigo-400 gap-1">
              <span>Explore 20 Examples</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Test Your Knowledge */}
          <div
            onClick={() => navigate('/quiz')}
            className="p-6 rounded-2xl bg-[#0E1322] border border-white/10 hover:border-amber-500/40 hover:bg-[#12192B] transition-all cursor-pointer group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              4. Test Your Knowledge
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              12-question interactive quiz evaluating prompting techniques, hallucinations, privacy, and ethics with immediate scoring.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1">
              <span>Take the Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 5. Build Your Prompt Library */}
          <div
            onClick={() => navigate('/library')}
            className="p-6 rounded-2xl bg-[#0E1322] border border-white/10 hover:border-rose-500/40 hover:bg-[#12192B] transition-all cursor-pointer group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <FolderHeart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
              5. Build Your Prompt Library
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Save, edit, tag, search, and export your personal collection of reusable prompts with LocalStorage persistence and JSON backups.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-rose-400 gap-1">
              <span>Manage Prompts</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 6. Verify AI Outputs */}
          <div
            onClick={() => navigate('/verification')}
            className="p-6 rounded-2xl bg-[#0E1322] border border-white/10 hover:border-emerald-500/40 hover:bg-[#12192B] transition-all cursor-pointer group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              6. Verify AI Outputs
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Learn responsible engineering: detect hallucinated libraries, subtle code bugs, and practice with real-world verification scenarios.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-400 gap-1">
              <span>View Verification Kit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
