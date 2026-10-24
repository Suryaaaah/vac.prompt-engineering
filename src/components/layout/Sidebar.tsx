import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  BookOpen,
  HelpCircle,
  FolderHeart,
  CalendarCheck,
  ShieldCheck,
  FileCode2,
  Settings,
  X,
  Bot
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  savedPromptsCount: number;
  completedLessonsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  savedPromptsCount,
  completedLessonsCount,
}) => {
  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { 
      to: '/learn', 
      label: 'Learn Prompting', 
      icon: GraduationCap, 
      badge: completedLessonsCount > 0 ? `${completedLessonsCount}/7` : '7 Modules' 
    },
    { to: '/playground', label: 'Prompt Playground', icon: Sparkles, hot: true },
    { to: '/examples', label: 'Example Library', icon: BookOpen, badge: '20' },
    { to: '/quiz', label: 'Interactive Quiz', icon: HelpCircle, badge: '12 Qs' },
    { 
      to: '/library', 
      label: 'Prompt Library', 
      icon: FolderHeart, 
      badge: savedPromptsCount > 0 ? String(savedPromptsCount) : undefined 
    },
    { to: '/workshop', label: 'Workshop Planner', icon: CalendarCheck, badge: '120m' },
    { to: '/verification', label: 'AI Verification', icon: ShieldCheck },
    { to: '/resources', label: 'Project Resources', icon: FileCode2 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0E1322] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 bg-[#080B14]/60">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-glow-primary group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080B14] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
                PromptCraft <span className="text-cyan-400">AI</span>
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Workshop Kit v1.0
              </span>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 custom-scrollbar">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Navigation Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/20 text-white border border-purple-500/40 shadow-glow-primary'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </div>

                {item.hot && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gradient-to-r from-purple-500 to-cyan-400 text-slate-950 uppercase tracking-wider shadow">
                    AI Lab
                  </span>
                )}

                {item.badge && !item.hot && (
                  <span className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-slate-800 text-slate-300 border border-white/5">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer info card */}
        <div className="p-4 border-t border-white/10 bg-[#080B14]/60">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-purple-200">CSE Student Kit</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Offline ready" />
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Local rule-based engine. Zero API key needed. Runs 100% offline in browser.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
