import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
  completedLessonsCount: number;
  quizScore: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSidebar,
  completedLessonsCount,
  quizScore,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/examples?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080B14]/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Mobile Drawer Trigger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-white/[0.06] text-purple-300 border border-purple-500/20">
            CSE Workshop
          </span>
          <span className="text-xs text-slate-400 hidden md:inline">
            "Learn to Prompt Smarter. Build with AI."
          </span>
        </div>
      </div>

      {/* Search Input */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-md mx-2 relative"
      >
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search 20 prompt examples, modules, or templates..."
          className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#12192B] border border-white/10 text-xs md:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition-all"
        />
      </form>

      {/* Right Actions: Notifications & Profile */}
      <div className="flex items-center gap-2 md:gap-3 relative">
        {/* Quick Playground link */}
        <button
          onClick={() => navigate('/playground')}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-primary transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Playground</span>
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/60 relative border border-white/5"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#080B14]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#12192B] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Workshop Notifications
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  Live
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                  <div className="font-semibold text-purple-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    New: 20 Curated Prompts
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1 leading-snug">
                    7 Coding, 6 Writing, and 7 Studying before-and-after examples are ready to study.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-white/5 text-xs">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Interactive Quiz Available
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1 leading-snug">
                    Test your understanding with 12 multiple choice questions and instant answer reviews.
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-white/10 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/workshop');
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                >
                  View 120-Minute Workshop Schedule <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar / Menu Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/60 border border-white/10 transition-all"
            aria-label="User profile menu"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              CS
            </div>
            <span className="hidden sm:inline text-xs font-medium text-slate-200">
              Student
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#12192B] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow">
                  CS
                </div>
                <div>
                  <div className="text-xs font-bold text-white">CSE Student Profile</div>
                  <div className="text-[10px] text-slate-400 font-mono">1st / 2nd Year B.Tech</div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Modules Completed:</span>
                  <span className="font-mono text-purple-300 font-semibold">{completedLessonsCount} / 7</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Quiz Score:</span>
                  <span className="font-mono text-cyan-300 font-semibold">{quizScore !== null ? `${quizScore} / 12` : 'Not Taken'}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-2 space-y-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  Storage & Backup Settings
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/resources');
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  Project Resources & Documentation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
