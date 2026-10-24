import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { getSavedPrompts, getCompletedLessons, getLatestQuizResult } from '../../utils/storage';

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedPromptsCount, setSavedPromptsCount] = useState(0);
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Sync counts whenever route changes or storage event fires
  const syncStorage = () => {
    const prompts = getSavedPrompts();
    setSavedPromptsCount(prompts.length);
    const lessons = getCompletedLessons();
    setCompletedLessonsCount(lessons.length);
    const quiz = getLatestQuizResult();
    setQuizScore(quiz ? quiz.score : null);
  };

  useEffect(() => {
    syncStorage();
    const handleStorageChange = () => syncStorage();
    window.addEventListener('storage', handleStorageChange);
    // Custom sync event for in-tab updates
    window.addEventListener('promptcraft-sync', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('promptcraft-sync', handleStorageChange);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#080B14] text-[#F8FAFC] flex flex-col antialiased">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        savedPromptsCount={savedPromptsCount}
        completedLessonsCount={completedLessonsCount}
      />

      {/* Main content wrapper shifted right on desktop */}
      <div className="lg:pl-72 flex flex-col min-h-screen flex-1">
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          completedLessonsCount={completedLessonsCount}
          quizScore={quizScore}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ syncStorage }} />
        </main>

        {/* Global Footer */}
        <footer className="no-print mt-auto border-t border-white/10 py-6 px-4 md:px-8 bg-[#080B14]/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">PromptCraft AI</span>
            <span>—</span>
            <span>Prompt Engineering Workshop Kit for 1st & 2nd Year CSE Students</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Offline & Local Storage</span>
            <span>•</span>
            <span className="text-cyan-400">Designed for College Project Demo</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
