import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Flame, 
  Bot, 
  User, 
  LogOut, 
  ShieldCheck, 
  ChevronDown, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { UserProfile, AppNotification } from '../../types';

interface HeaderProps {
  user: UserProfile;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onToggleAIChat: () => void;
  onLogout: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  notifications,
  onOpenNotifications,
  onOpenSettings,
  onToggleAIChat,
  onLogout,
  onNavigateTab,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 w-full bg-white/40 backdrop-blur-2xl border-b border-white/60 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
      {/* Search Command Input */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full group">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Ask CampusOS AI... 'Solve assignment' or 'Check attendance'"
            className="w-full pl-10 pr-12 py-2 text-xs sm:text-sm rounded-xl bg-white/50 backdrop-blur-md border border-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/80 shadow-2xs transition-all font-medium text-slate-700 placeholder:text-slate-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onToggleAIChat();
              }
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Study Streak Badge */}
        <div 
          title="Daily Study Streak"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold shadow-2xs cursor-pointer hover:scale-105 transition-transform"
        >
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
          <span>14 Day Streak</span>
        </div>

        {/* Quick AI Trigger */}
        <button
          onClick={onToggleAIChat}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100/80 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-2xs">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100/80 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-md shadow-blue-500/20">
              {user.displayName ? user.displayName.slice(0, 2).toUpperCase() : 'EX'}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {user.displayName || 'Alex Rivers'}
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                {user.university || 'Stanford University'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user.displayName}</p>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100 uppercase tracking-wider">
                  {user.major || 'Computer Science'}
                </span>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onOpenSettings();
                }}
                className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-slate-400" />
                Profile & Settings
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigateTab('admin');
                }}
                className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                Admin Panel
              </button>

              <div className="border-t border-slate-100 my-1"></div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
