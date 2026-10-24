import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';
import type { QuizResult } from '../types';
import { saveQuizResult, getLatestQuizResult } from '../utils/storage';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  Sparkles
} from 'lucide-react';

export const QuizPage: React.FC = () => {
  const { syncStorage } = useOutletContext<{ syncStorage: () => void }>() || {};

  // Quiz progression state: 'intro' | 'active' | 'review'
  const [quizState, setQuizState] = useState<'intro' | 'active' | 'review'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [latestResult, setLatestResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const existing = getLatestQuizResult();
    if (existing) {
      setLatestResult(existing);
    }
  }, []);

  const handleStartQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setQuizState('active');
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: optionIndex,
    });
  };

  const handleFinishQuiz = () => {
    let score = 0;
    const answersBreakdown = QUIZ_QUESTIONS.map((q) => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) score += 1;
      return {
        questionId: q.id,
        selectedOption: selected ?? -1,
        isCorrect,
      };
    });

    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

    // Collect missed topics
    const missedTopics = QUIZ_QUESTIONS
      .filter((q) => userAnswers[q.id] !== q.correctIndex)
      .map((q) => q.topic);
    const uniqueMissedTopics = Array.from(new Set(missedTopics));

    const finalResult: QuizResult = {
      score,
      total: QUIZ_QUESTIONS.length,
      percentage,
      completedAt: new Date().toISOString(),
      answers: answersBreakdown,
      topicsToReview: uniqueMissedTopics,
    };

    saveQuizResult(finalResult);
    setLatestResult(finalResult);
    setQuizState('review');
    if (syncStorage) syncStorage();

    // Trigger celebratory confetti if score >= 70%
    if (percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>EVALUATION CHALLENGE</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Interactive Prompting Quiz
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Evaluate your understanding across 12 core computer science prompt engineering concepts, ranging from role conditioning to AI hallucination detection.
        </p>
      </div>

      {/* QUIZ FLOW: 1. INTRO SCREEN */}
      {quizState === 'intro' && (
        <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-10 shadow-2xl max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Engineering Assessment Instructions</h2>
              <p className="text-xs text-slate-400">12 Multiple-Choice Questions • Verified Answer Key</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
              <span className="text-slate-500 block mb-1 font-mono">Questions</span>
              <span className="text-white font-bold text-base font-mono">12 Items</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
              <span className="text-slate-500 block mb-1 font-mono">Passing Grade</span>
              <span className="text-emerald-400 font-bold text-base font-mono">75% (9/12)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#12192B] border border-white/5">
              <span className="text-slate-500 block mb-1 font-mono">Time Limit</span>
              <span className="text-cyan-400 font-bold text-base font-mono">Self-Paced</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 space-y-2">
            <span className="text-purple-300 font-semibold block">Topics Covered in this Quiz:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-disc list-inside text-slate-400 text-[11px]">
              <li>Probabilistic token prediction</li>
              <li>Role and domain persona priming</li>
              <li>Task specificity & action verbs</li>
              <li>Context boundaries & JSON schemas</li>
              <li>Few-shot in-context exemplars</li>
              <li>Step-by-step reasoning</li>
              <li>ReAct thought-action loops</li>
              <li>AI hallucination diagnostics</li>
              <li>Code testing & source verification</li>
              <li>Academic integrity & data privacy</li>
            </ul>
          </div>

          {latestResult && (
            <div className="p-4 rounded-xl bg-[#12192B] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Your Most Recent Score:</span>
                <span className="text-base font-bold text-cyan-400 font-mono">
                  {latestResult.score} / {latestResult.total} ({latestResult.percentage}%)
                </span>
              </div>
              <button
                onClick={() => setQuizState('review')}
                className="text-xs text-purple-300 hover:text-purple-200 underline font-medium"
              >
                Review Past Answers
              </button>
            </div>
          )}

          <button
            onClick={handleStartQuiz}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white shadow-glow-primary flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{latestResult ? 'Retake Quiz Challenge' : 'Begin Assessment'}</span>
          </button>
        </div>
      )}

      {/* QUIZ FLOW: 2. ACTIVE QUESTION SCREEN */}
      {quizState === 'active' && (
        <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 shadow-2xl max-w-3xl mx-auto space-y-6">
          {/* Progress Bar & Indicators */}
          <div className="space-y-2 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-semibold">
                Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-slate-400">
                Answered: {answeredCount} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Topic Badge & Question Stem */}
          <div className="space-y-3">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
              Topic: {currentQ.topic}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* 4 Answer Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = userAnswers[currentQ.id] === idx;
              const optionLetters = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs md:text-sm transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-purple-950/50 border-purple-500/70 text-white shadow-glow-primary ring-1 ring-purple-400'
                      : 'bg-[#12192B] border-white/5 hover:border-white/20 text-slate-300 hover:bg-[#161f36]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-purple-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {optionLetters[idx]}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {!isLastQuestion ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 transition-all"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                disabled={answeredCount < QUIZ_QUESTIONS.length}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-cyan-500 hover:opacity-95 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-lg transition-all"
              >
                <span>Submit Assessment</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* QUIZ FLOW: 3. FINAL SCORE & REVIEW SCREEN */}
      {quizState === 'review' && latestResult && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Score Header Card */}
          <div className="rounded-2xl bg-[#0E1322] border border-white/10 p-6 md:p-8 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-400 mx-auto flex items-center justify-center text-white shadow-xl">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold block mb-1">
                Assessment Completed
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                You Scored {latestResult.score} / {latestResult.total}
              </h2>
              <div className="text-sm text-slate-400 mt-1">
                {latestResult.percentage >= 75
                  ? 'Outstanding! You have demonstrated strong competency in prompt engineering fundamentals.'
                  : 'Good effort! Review the questions and topics below to master all key techniques.'}
              </div>
            </div>

            {/* Score Breakdown Pills */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs">
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
                <span className="text-slate-500 block font-mono">Percentage</span>
                <span className="text-lg font-bold text-white font-mono">{latestResult.percentage}%</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                <span className="text-slate-500 block font-mono">Correct</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">{latestResult.score}</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20">
                <span className="text-slate-500 block font-mono">Incorrect</span>
                <span className="text-lg font-bold text-rose-400 font-mono">
                  {latestResult.total - latestResult.score}
                </span>
              </div>
            </div>

            {/* Topics to Review Recommendation */}
            {latestResult.topicsToReview.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 font-mono">
                  <AlertTriangle className="w-4 h-4" />
                  Suggested Topics for Targeted Revision:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {latestResult.topicsToReview.map((top, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs bg-amber-500/10 text-amber-200 border border-amber-500/20"
                    >
                      {top}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleStartQuiz}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-primary flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              Verified Answers & Technical Explanations
            </h3>

            {QUIZ_QUESTIONS.map((q) => {
              const record = latestResult.answers.find((a) => a.questionId === q.id);
              const userChoice = record ? record.selectedOption : -1;
              const isCorrect = userChoice === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'bg-[#0E1322] border-emerald-500/20'
                      : 'bg-[#0E1322] border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
                        {q.id}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">
                        {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold font-mono">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-white mb-3">
                    {q.question}
                  </p>

                  {/* Options List */}
                  <div className="space-y-1.5 text-xs mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userChoice === optIdx;
                      const isCorrectChoice = q.correctIndex === optIdx;
                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg border flex items-start gap-2.5 ${
                            isCorrectChoice
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                              : isUserChoice
                              ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                              : 'bg-black/20 border-transparent text-slate-400'
                          }`}
                        >
                          <span className="font-mono font-bold">
                            {['A', 'B', 'C', 'D'][optIdx]}.
                          </span>
                          <span>{opt}</span>
                          {isCorrectChoice && (
                            <span className="ml-auto text-[10px] font-mono text-emerald-400 font-bold uppercase">
                              (Correct Answer)
                            </span>
                          )}
                          {isUserChoice && !isCorrectChoice && (
                            <span className="ml-auto text-[10px] font-mono text-rose-400 font-bold uppercase">
                              (Your Choice)
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Block */}
                  <div className="p-3 rounded-xl bg-[#12192B] border border-white/5 text-xs text-slate-300">
                    <span className="text-cyan-400 font-semibold block mb-0.5 font-mono">
                      Technical Explanation:
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
