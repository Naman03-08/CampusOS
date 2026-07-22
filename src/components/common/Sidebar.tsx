import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquareText, 
  FileCheck, 
  CheckSquare, 
  Calendar, 
  Code2, 
  Briefcase, 
  Bell, 
  Settings, 
  ShieldAlert, 
  Zap, 
  GraduationCap 
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  unreadNotificationsCount: number;
  user?: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  unreadNotificationsCount,
  user,
}) => {
  const isAdminUser = user?.email?.trim().toLowerCase() === 'naman03mgs@gmail.com';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'studyhub', label: 'AI Study Hub', icon: BookOpen, badge: 'AI' },
    { id: 'chat', label: 'AI Chat Assistant', icon: MessageSquareText },
    { id: 'assignment', label: 'Assignment Solver', icon: FileCheck },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare },
    { id: 'calendar', label: 'Smart Calendar', icon: Calendar },
    { id: 'coding', label: 'Coding Hub', icon: Code2, badge: 'DSA' },
    { id: 'placement', label: 'Placement & Interview', icon: Briefcase, badge: 'Jobs' },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadNotificationsCount },
    { id: 'settings', label: 'Settings', icon: Settings },
    ...(isAdminUser ? [{ id: 'admin', label: 'Admin Panel', icon: ShieldAlert, badge: 'Lock' }] : []),
  ];

  return (
    <aside className="w-64 bg-white/40 backdrop-blur-2xl border-r border-white/60 flex flex-col justify-between p-4 min-h-[calc(100vh-4.25rem)] shrink-0 shadow-2xs">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 mb-5 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl">
          <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-slate-900 tracking-tight">CampusOS <span className="text-blue-600">AI</span></p>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Student OS v2.5</p>
          </div>
        </div>

        {/* Nav list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.count ? (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                    {item.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pro Plan Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2563EB] to-indigo-600 text-white shadow-xl relative overflow-hidden mt-6 border border-white/20">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
        <div className="flex items-center gap-2 mb-1.5">
          <Zap className="w-4 h-4 text-blue-200" />
          <span className="text-xs font-bold tracking-wide uppercase text-blue-100">Campus Pro</span>
        </div>
        <p className="text-[11px] text-blue-100 leading-snug mb-3">
          Unlimited AI study suites, ATS resume checks & live mock interviews!
        </p>
        <button
          onClick={() => onSelectTab('settings')}
          className="w-full py-2 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm"
        >
          Manage Plan
        </button>
      </div>
    </aside>
  );
};
