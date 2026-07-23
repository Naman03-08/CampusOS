import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquareText, 
  FileCheck, 
  FileText,
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
    { id: 'studyhub', label: 'AI Study, Chat & Solver', icon: BookOpen, badge: 'AI Suite' },
    { id: 'resumebuilder', label: 'AI Resume Builder', icon: FileText, badge: 'ATS' },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare },
    { id: 'calendar', label: 'Smart Calendar', icon: Calendar },
    { id: 'coding', label: 'Coding Hub', icon: Code2, badge: 'DSA' },
    { id: 'courses', label: 'Coding Courses', icon: GraduationCap, badge: 'NEW' },
    { id: 'placement', label: 'Placement & Interview', icon: Briefcase, badge: 'Jobs' },
    { id: 'pricing', label: 'Upgrade Plans', icon: Zap, badge: 'Plans' },
    { id: 'settings', label: 'Settings', icon: Settings },
    ...(isAdminUser ? [{ id: 'admin', label: 'Admin Panel', icon: ShieldAlert, badge: 'Lock' }] : []),
  ];

  return (
    <aside className="w-64 h-full overflow-y-auto bg-white/50 backdrop-blur-2xl border-r border-white/80 flex flex-col justify-between p-4 shrink-0 shadow-lg z-20 scrollbar-thin hidden md:flex">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-2.5 px-3.5 py-3 mb-5 bg-white/80 backdrop-blur-md border border-white/90 rounded-2xl shadow-3d-sm">
          <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/30">
            <GraduationCap className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-900 tracking-tight">CampusOS <span className="text-blue-600">AI</span></p>
            <p className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider">Student OS v2.5</p>
          </div>
        </div>

        {/* Nav list */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-3d-blue scale-[1.02]'
                    : 'text-slate-600 hover:bg-white/80 hover:text-blue-600 hover:shadow-xs hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 transition-transform ${isActive ? 'text-white scale-110' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100/80 shadow-2xs'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pro Plan Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2563EB] via-blue-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden mt-6 border border-white/30 card-3d">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
        <div className="flex items-center gap-2 mb-1.5">
          <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="text-xs font-black tracking-wide uppercase text-blue-100">Campus Pro</span>
        </div>
        <p className="text-[11px] text-blue-100 leading-snug mb-3.5 font-medium">
          Unlimited AI study suites, ATS resume checks & live mock interviews!
        </p>
        <button
          onClick={() => onSelectTab('pricing')}
          className="w-full py-2.5 rounded-xl bg-white text-blue-700 font-extrabold text-xs hover:bg-blue-50 transition-all shadow-md btn-3d-blue"
        >
          View Upgrade Plans
        </button>
      </div>
    </aside>
  );
};
