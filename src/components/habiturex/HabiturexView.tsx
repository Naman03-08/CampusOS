import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  Coins, 
  Sliders, 
  RotateCcw, 
  Search, 
  Bell, 
  LayoutDashboard, 
  Table, 
  Target, 
  LineChart, 
  Calendar, 
  CheckSquare, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Check, 
  X, 
  Trash2, 
  Edit2, 
  Activity, 
  ShieldCheck, 
  BarChart3, 
  Clock, 
  CalendarCheck,
  UserCheck,
  Percent,
  Calculator,
  PlusCircle,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart as ReLineChart, 
  Line, 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { AttendanceSubject, UserProfile } from '../../types';
import { AttendanceView } from '../attendance/AttendanceView';

interface HabiturexViewProps {
  user?: UserProfile;
  attendance: AttendanceSubject[];
  onUpdateAttendance: (updated: AttendanceSubject[]) => void;
  onNavigateTab?: (tab: string) => void;
  initialInnerTab?: 'dashboard' | 'table' | 'missions' | 'analytics' | 'matrix' | 'attendance';
}

export interface HabitItem {
  id: string;
  name: string;
  timeframe: 'Morning' | 'Afternoon' | 'Evening' | 'Anytime';
  category: 'Coding' | 'Fitness' | 'Mind' | 'Growth' | 'Career' | 'Health' | 'Social' | 'Finance' | 'Studies';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpValue: number;
  streakDays: number;
  completedToday: boolean;
  historyDates: string[]; // ISO date strings
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  xpReward: number;
  creditReward: number;
  completed: boolean;
  claimed: boolean;
}

const DEFAULT_CATEGORIES = ['Coding', 'Fitness', 'Mind', 'Growth', 'Career', 'Health', 'Social', 'Finance', 'Studies'];

const BASELINE_HABITS: Omit<HabitItem, 'id' | 'completedToday' | 'historyDates'>[] = [
  { name: 'Solve 1 CampusOS DSA Problem', timeframe: 'Morning', category: 'Coding', difficulty: 'Medium', xpValue: 50, streakDays: 0 },
  { name: 'Review Core CS Concept (OS/DBMS)', timeframe: 'Afternoon', category: 'Studies', difficulty: 'Easy', xpValue: 30, streakDays: 0 },
  { name: 'Gym / 30-min Physical Fitness', timeframe: 'Evening', category: 'Fitness', difficulty: 'Medium', xpValue: 40, streakDays: 0 },
  { name: 'Update AI Resume / Portfolio Project', timeframe: 'Anytime', category: 'Career', difficulty: 'Hard', xpValue: 60, streakDays: 0 },
  { name: '30-min Mindful Reading or System Design', timeframe: 'Evening', category: 'Mind', difficulty: 'Medium', xpValue: 40, streakDays: 0 }
];

const STARTER_MISSIONS: Omit<DailyMission, 'id' | 'completed' | 'claimed'>[] = [
  { title: 'Placement Starter', description: 'Log at least 2 habits in Habiturex today', targetCount: 2, currentCount: 0, xpReward: 100, creditReward: 20 },
  { title: 'Consistency Flame', description: 'Maintain active Flame for 3 consecutive days', targetCount: 3, currentCount: 0, xpReward: 150, creditReward: 35 },
  { title: 'Perfect Score', description: 'Complete 100% of your configured habits', targetCount: 1, currentCount: 0, xpReward: 200, creditReward: 50 }
];

export const HabiturexView: React.FC<HabiturexViewProps> = ({
  user,
  attendance,
  onUpdateAttendance,
  initialInnerTab
}) => {
  // Inner Tab State
  const [activeInnerTab, setActiveInnerTab] = useState<'dashboard' | 'table' | 'missions' | 'analytics' | 'matrix' | 'attendance'>(initialInnerTab || 'dashboard');
  const [innerSidebarCollapsed, setInnerSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (initialInnerTab) {
      setActiveInnerTab(initialInnerTab);
    }
  }, [initialInnerTab]);

  // Stats State (Set to ZERO initially)
  const [xp, setXp] = useState<number>(() => {
    return Number(localStorage.getItem('habiturex_xp')) || 0;
  });
  const [credits, setCredits] = useState<number>(() => {
    return Number(localStorage.getItem('habiturex_credits')) || 0;
  });
  const [flameStreak, setFlameStreak] = useState<number>(() => {
    return Number(localStorage.getItem('habiturex_flame')) || 0;
  });
  const [xpMultiplier, setXpMultiplier] = useState<number>(1);
  const [perfectDaysCount, setPerfectDaysCount] = useState<number>(() => {
    return Number(localStorage.getItem('habiturex_perfect_days')) || 0;
  });

  // Habits State
  const [habits, setHabits] = useState<HabitItem[]>(() => {
    try {
      const stored = localStorage.getItem('habiturex_habits');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Missions State
  const [missions, setMissions] = useState<DailyMission[]>(() => {
    try {
      const stored = localStorage.getItem('habiturex_missions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Modals
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState<HabitItem | null>(null);
  const [habitForm, setHabitForm] = useState({
    name: '',
    timeframe: 'Morning' as HabitItem['timeframe'],
    category: 'Coding' as HabitItem['category'],
    difficulty: 'Medium' as HabitItem['difficulty'],
    xpValue: 50
  });

  const [showMissionModal, setShowMissionModal] = useState(false);
  const [missionForm, setMissionForm] = useState({
    title: '',
    description: '',
    targetCount: 1,
    xpReward: 100,
    creditReward: 20
  });

  const [showTunerModal, setShowTunerModal] = useState(false);
  const [showNotificationsPopover, setShowNotificationsPopover] = useState(false);

  // Attendance Sub-view State
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ code: '', name: '', totalClasses: 0, attendedClasses: 0, targetPercentage: 75 });
  const [calcTargetPercent, setCalcTargetPercent] = useState<number>(75);

  // Level Calculation: 500 XP per level
  const currentLevel = Math.floor(xp / 500) + 1;
  const currentLevelXp = xp % 500;

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('habiturex_xp', xp.toString());
    localStorage.setItem('habiturex_credits', credits.toString());
    localStorage.setItem('habiturex_flame', flameStreak.toString());
    localStorage.setItem('habiturex_perfect_days', perfectDaysCount.toString());
    localStorage.setItem('habiturex_habits', JSON.stringify(habits));
    localStorage.setItem('habiturex_missions', JSON.stringify(missions));
  }, [xp, credits, flameStreak, perfectDaysCount, habits, missions]);

  // Handle Habit Toggle
  const toggleHabitCompletion = (habitId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];

    setHabits(prev => prev.map(h => {
      if (h.id !== habitId) return h;

      const isCompleting = !h.completedToday;
      const gainedXp = isCompleting ? h.xpValue * xpMultiplier : -(h.xpValue * xpMultiplier);

      setXp(currentXp => Math.max(0, currentXp + gainedXp));

      let newStreak = h.streakDays;
      let newHistory = [...h.historyDates];

      if (isCompleting) {
        newStreak += 1;
        if (!newHistory.includes(todayStr)) newHistory.push(todayStr);
      } else {
        newStreak = Math.max(0, newStreak - 1);
        newHistory = newHistory.filter(d => d !== todayStr);
      }

      return {
        ...h,
        completedToday: isCompleting,
        streakDays: newStreak,
        historyDates: newHistory
      };
    }));

    // Update Missions
    setMissions(prevMissions => prevMissions.map(m => {
      const updatedCount = Math.min(m.targetCount, m.currentCount + 1);
      return {
        ...m,
        currentCount: updatedCount,
        completed: updatedCount >= m.targetCount
      };
    }));
  };

  // Seed Baseline Habits
  const handleSeedBaseline = () => {
    const seeded: HabitItem[] = BASELINE_HABITS.map((b, i) => ({
      ...b,
      id: `hb_seed_${Date.now()}_${i}`,
      completedToday: false,
      historyDates: []
    }));
    setHabits(prev => [...prev, ...seeded]);
  };

  // Seed Starter Missions
  const handleSeedMissions = () => {
    const seeded: DailyMission[] = STARTER_MISSIONS.map((m, i) => ({
      ...m,
      id: `ms_seed_${Date.now()}_${i}`,
      completed: false,
      claimed: false
    }));
    setMissions(prev => [...prev, ...seeded]);
  };

  // Save Custom / Edited Habit
  const handleSaveHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitForm.name.trim()) return;

    if (editingHabit) {
      setHabits(prev => prev.map(h => h.id === editingHabit.id ? { ...h, ...habitForm } : h));
    } else {
      const newH: HabitItem = {
        id: 'hb_' + Date.now(),
        name: habitForm.name.trim(),
        timeframe: habitForm.timeframe,
        category: habitForm.category,
        difficulty: habitForm.difficulty,
        xpValue: habitForm.xpValue,
        streakDays: 0,
        completedToday: false,
        historyDates: []
      };
      setHabits(prev => [newH, ...prev]);
    }

    setHabitForm({ name: '', timeframe: 'Morning', category: 'Coding', difficulty: 'Medium', xpValue: 50 });
    setEditingHabit(null);
    setShowHabitModal(false);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  // Save Custom Mission
  const handleSaveMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!missionForm.title.trim()) return;

    const newM: DailyMission = {
      id: 'ms_' + Date.now(),
      title: missionForm.title.trim(),
      description: missionForm.description.trim(),
      targetCount: missionForm.targetCount,
      currentCount: 0,
      xpReward: missionForm.xpReward,
      creditReward: missionForm.creditReward,
      completed: false,
      claimed: false
    };

    setMissions(prev => [newM, ...prev]);
    setMissionForm({ title: '', description: '', targetCount: 1, xpReward: 100, creditReward: 20 });
    setShowMissionModal(false);
  };

  const handleClaimMission = (missionId: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === missionId && !m.claimed && m.completed) {
        setXp(x => x + m.xpReward);
        setCredits(c => c + m.creditReward);
        return { ...m, claimed: true };
      }
      return m;
    }));
  };

  // Wipe All Data
  const handleWipeAll = () => {
    if (window.confirm('⚠️ Are you sure you want to reset ALL Habiturex metrics, habits, and streak data back to ZERO?')) {
      setXp(0);
      setCredits(0);
      setFlameStreak(0);
      setPerfectDaysCount(0);
      setHabits([]);
      setMissions([]);
      localStorage.removeItem('habiturex_xp');
      localStorage.removeItem('habiturex_credits');
      localStorage.removeItem('habiturex_flame');
      localStorage.removeItem('habiturex_perfect_days');
      localStorage.removeItem('habiturex_habits');
      localStorage.removeItem('habiturex_missions');
      alert('Reset completed. All Habiturex metrics are set back to 0.');
    }
  };

  // Attendance Handler Helpers
  const handleAttendanceChange = (id: string, deltaAttended: number, deltaTotal: number) => {
    const updated = attendance.map(item => {
      if (item.id === id) {
        const newTotal = Math.max(0, item.totalClasses + deltaTotal);
        const newAttended = Math.max(0, Math.min(newTotal, item.attendedClasses + deltaAttended));
        return { ...item, totalClasses: newTotal, attendedClasses: newAttended };
      }
      return item;
    });
    onUpdateAttendance(updated);
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name.trim()) return;

    const sub: AttendanceSubject = {
      id: 'att_' + Date.now(),
      userId: user?.uid || 'guest',
      code: newSubject.code.toUpperCase() || 'CS101',
      name: newSubject.name.trim(),
      totalClasses: newSubject.totalClasses,
      attendedClasses: newSubject.attendedClasses,
      targetPercentage: newSubject.targetPercentage || 75,
      scheduleDays: ['Mon', 'Wed', 'Fri']
    };

    onUpdateAttendance([...attendance, sub]);
    setNewSubject({ code: '', name: '', totalClasses: 0, attendedClasses: 0, targetPercentage: 75 });
    setShowAddSubjectModal(false);
  };

  // Filtered Habits
  const filteredHabits = habits.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || h.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || h.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const completedHabitsCount = habits.filter(h => h.completedToday).length;
  const completionPercentage = habits.length > 0 ? Math.round((completedHabitsCount / habits.length) * 100) : 0;

  // Radar Data for Performance Analytics
  const radarData = DEFAULT_CATEGORIES.map(cat => {
    const catHabits = habits.filter(h => h.category === cat);
    const catCompleted = catHabits.filter(h => h.completedToday).length;
    const score = catHabits.length > 0 ? Math.round((catCompleted / catHabits.length) * 100) : 0;
    return { category: cat, score };
  });

  // Recharts Mock Weekly XP
  const weeklyData = [
    { day: 'Mon', xp: Math.round(xp * 0.1) },
    { day: 'Tue', xp: Math.round(xp * 0.25) },
    { day: 'Wed', xp: Math.round(xp * 0.4) },
    { day: 'Thu', xp: Math.round(xp * 0.6) },
    { day: 'Fri', xp: Math.round(xp * 0.75) },
    { day: 'Sat', xp: Math.round(xp * 0.9) },
    { day: 'Sun', xp: xp }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      
      {/* ============================================================================ */}
      {/* HABITUREX TOP HEADER BAR */}
      {/* ============================================================================ */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4 border border-slate-800 card-3d">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 font-black">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-white">Habiturex</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-black text-[10px] tracking-wider uppercase border border-blue-500/30">
                  V3.5 PREMIUM
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Daily Consistency Operating System</p>
            </div>
          </div>

          {/* Top Bar Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Level & XP */}
            <div className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-black">
                <span className="text-blue-400">LVL {currentLevel}</span>
                <span className="text-slate-400 uppercase tracking-widest text-[9px]">RECRUIT EXPERTISE</span>
              </div>
              <p className="text-xs font-black text-white">{xp} XP</p>
              <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500" 
                  style={{ width: `${(currentLevelXp / 500) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Store Credits */}
            <div className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-black text-white">{credits} Gold</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Store Credits</p>
              </div>
            </div>

            {/* Active Flame Streak */}
            <div className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <p className="text-xs font-black text-white">{flameStreak} Days</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Active Flame</p>
              </div>
            </div>

            {/* XP Boost */}
            <div className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-black text-white">x{xpMultiplier} XP</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Multiplier</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTunerModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>TUNER</span>
            </button>

            <button
              onClick={handleWipeAll}
              className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 font-bold text-xs border border-red-800/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>WIPE ALL</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotificationsPopover(!showNotificationsPopover)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer relative"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1 right-1"></span>
              </button>

              {showNotificationsPopover && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-4 z-50 space-y-2 animate-in zoom-in-95">
                  <h4 className="text-xs font-black text-white border-b border-slate-800 pb-2">Habiturex System Activity</h4>
                  <div className="space-y-2 text-[11px] text-slate-300 font-medium">
                    <p className="p-2 rounded-xl bg-slate-800/60">🔥 Habiturex Daily Engine Active. Log routine habits to earn XP.</p>
                    <p className="p-2 rounded-xl bg-slate-800/60">🎯 Level 1 Recruit initialized. Complete daily missions to unlock store credits.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================================ */}
      {/* MAIN HABITUREX CONTENT AREA WITH INNER SIDEBAR */}
      {/* ============================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Inner Navigation Sidebar (3 cols on desktop) */}
        <div className={`${innerSidebarCollapsed ? 'lg:col-span-1' : 'lg:col-span-3'} space-y-3 transition-all duration-300`}>
          <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 card-3d">
            
            <div className="flex items-center justify-between px-2 py-1">
              {!innerSidebarCollapsed && (
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                  HABITUREX HUB
                </span>
              )}
              <button
                onClick={() => setInnerSidebarCollapsed(!innerSidebarCollapsed)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer ml-auto"
              >
                {innerSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveInnerTab('dashboard')}
                className={`w-full p-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  activeInnerTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  {!innerSidebarCollapsed && <span>Dashboard Hub</span>}
                </div>
                {!innerSidebarCollapsed && <span className="w-2 h-2 rounded-full bg-blue-300"></span>}
              </button>

              <button
                onClick={() => setActiveInnerTab('table')}
                className={`w-full p-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  activeInnerTab === 'table'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Table className="w-4 h-4" />
                  {!innerSidebarCollapsed && <span>Habits Table</span>}
                </div>
                {!innerSidebarCollapsed && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">{habits.length}</span>
                )}
              </button>

              <button
                onClick={() => setActiveInnerTab('missions')}
                className={`w-full p-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  activeInnerTab === 'missions'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Target className="w-4 h-4" />
                  {!innerSidebarCollapsed && <span>Daily Missions</span>}
                </div>
                {!innerSidebarCollapsed && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">{missions.length}</span>
                )}
              </button>

              <button
                onClick={() => setActiveInnerTab('analytics')}
                className={`w-full p-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  activeInnerTab === 'analytics'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LineChart className="w-4 h-4" />
                  {!innerSidebarCollapsed && <span>Performance Analytics</span>}
                </div>
              </button>

              <button
                onClick={() => setActiveInnerTab('matrix')}
                className={`w-full p-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  activeInnerTab === 'matrix'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4" />
                  {!innerSidebarCollapsed && <span>Consistency Matrix</span>}
                </div>
              </button>

              <button
                onClick={() => setActiveInnerTab('attendance')}
                className={`w-full p-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  activeInnerTab === 'attendance'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-emerald-500" />
                  {!innerSidebarCollapsed && <span>Attendance Manager</span>}
                </div>
                {!innerSidebarCollapsed && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">Active</span>
                )}
              </button>
            </nav>

            {/* Profile Footer Box */}
            {!innerSidebarCollapsed && (
              <div className="pt-3 border-t border-slate-100">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'N'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate">{user?.displayName || 'Naman pandey'}</p>
                    <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-extrabold text-[9px]">
                      PLACEMENT READY
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Workspace (9 cols or 11 cols when inner sidebar collapsed) */}
        <div className={`${innerSidebarCollapsed ? 'lg:col-span-11' : 'lg:col-span-9'} space-y-5`}>
          
          {/* ============================================================================ */}
          {/* TAB 1: DASHBOARD HUB */}
          {/* ============================================================================ */}
          {activeInnerTab === 'dashboard' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* Consistency Blueprint Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl space-y-4 border border-blue-800/40 relative overflow-hidden card-3d">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-400/20 text-blue-300 font-black text-[10px] uppercase tracking-wider border border-blue-400/30">
                        AI CO-PILOT ADVISOR
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-white">Consistency Blueprint</h2>
                    <p className="text-xs text-indigo-200 font-medium italic max-w-xl">
                      "Excellence is an art won by training and habituation. We are what we repeatedly do." — Aristotle
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingHabit(null);
                        setHabitForm({ name: '', timeframe: 'Morning', category: 'Coding', difficulty: 'Medium', xpValue: 50 });
                        setShowHabitModal(true);
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-white hover:bg-blue-50 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-blue-600" />
                      <span>New Habit Target</span>
                    </button>
                  </div>
                </div>

                {/* Progress Summary Pill */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>COMPLETED TODAY: {completedHabitsCount} of {habits.length} Habits</span>
                  <span className="text-amber-300 font-black">{completionPercentage}% Completed</span>
                </div>
              </div>

              {/* Today's Performance Target Box */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="text-base font-black text-slate-900">Today's Performance Routine</h3>
                      <p className="text-xs text-slate-500">Tap completion circle to log habit and claim score</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs">
                    ACTIVE LOGS
                  </span>
                </div>

                {habits.length === 0 ? (
                  <div className="p-10 text-center space-y-3">
                    <Target className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm font-black text-slate-800">No Routine Logs Registered</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Build an outstanding high-performance routine by registering your first habit target or seeding our baseline habits.
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => setShowHabitModal(true)}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-colors cursor-pointer shadow-sm"
                      >
                        + Add Habit Target
                      </button>
                      <button
                        onClick={handleSeedBaseline}
                        className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-black text-xs transition-colors cursor-pointer border border-purple-200"
                      >
                        ⚡ Seed Baseline
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {habits.map((h) => (
                      <div
                        key={h.id}
                        onClick={() => toggleHabitCompletion(h.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          h.completedToday
                            ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                            : 'bg-slate-50/60 border-slate-200/80 hover:bg-white text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            h.completedToday ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {h.completedToday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="min-w-0">
                            <p className={`text-xs font-black truncate ${h.completedToday ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                              {h.name}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium mt-0.5">
                              <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-bold">{h.timeframe}</span>
                              <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-bold">{h.category}</span>
                              <span className="text-orange-600 font-bold">🔥 {h.streakDays}d Streak</span>
                            </div>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-xl bg-blue-100 text-blue-800 font-black text-xs shrink-0">
                          +{h.xpValue} XP
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Metrics & Radar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Performance Metrics Breakdown */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                  <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">
                    Performance Stats Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 space-y-1">
                      <p className="text-[10px] uppercase font-bold text-blue-600">Total Habits Logged</p>
                      <p className="text-lg font-black text-slate-900">{completedHabitsCount}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-100 space-y-1">
                      <p className="text-[10px] uppercase font-bold text-orange-600">Combo Streak</p>
                      <p className="text-lg font-black text-slate-900">{flameStreak}d</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                      <p className="text-[10px] uppercase font-bold text-emerald-600">Perfect Days</p>
                      <p className="text-lg font-black text-slate-900">{perfectDaysCount}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 space-y-1">
                      <p className="text-[10px] uppercase font-bold text-amber-600">Store Gold</p>
                      <p className="text-lg font-black text-slate-900">{credits}g</p>
                    </div>
                  </div>
                </div>

                {/* Radar Chart: Category Mastery */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 card-3d">
                  <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">
                    Balanced Category Mastery
                  </h3>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                        <Radar name="Completion %" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 2: HABITS TABLE */}
          {/* ============================================================================ */}
          {activeInnerTab === 'table' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-base font-black text-slate-900">Active Habits Console</h2>
                    <p className="text-xs text-slate-500">Configure, customize, and log your placement routine targets.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingHabit(null);
                      setHabitForm({ name: '', timeframe: 'Morning', category: 'Coding', difficulty: 'Medium', xpValue: 50 });
                      setShowHabitModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Configure Habit</span>
                  </button>
                </div>

                {/* Filter & Search Controls */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search habits..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1">
                    {['All', ...DEFAULT_CATEGORIES].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer shrink-0 ${
                          selectedCategory === cat 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                {filteredHabits.length === 0 ? (
                  <div className="p-10 text-center space-y-3 border border-dashed border-slate-200 rounded-2xl">
                    <Table className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-black text-slate-800">No Active Habits Found</p>
                    <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                      Your habits console is empty. Configure a custom habit target or seed baseline placement habits.
                    </p>
                    <button
                      onClick={handleSeedBaseline}
                      className="px-4 py-2 rounded-xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 transition-colors shadow-sm cursor-pointer"
                    >
                      ⚡ Seed Baseline
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                          <th className="py-3 px-2">Done Today</th>
                          <th className="py-3 px-2">Habit Target</th>
                          <th className="py-3 px-2">Time Frame</th>
                          <th className="py-3 px-2">Category</th>
                          <th className="py-3 px-2">Difficulty</th>
                          <th className="py-3 px-2">Streak</th>
                          <th className="py-3 px-2">XP</th>
                          <th className="py-3 px-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredHabits.map((h) => (
                          <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-2">
                              <button
                                onClick={() => toggleHabitCompletion(h.id)}
                                className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${
                                  h.completedToday ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                                }`}
                              >
                                {h.completedToday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </button>
                            </td>
                            <td className="py-3 px-2 font-black text-slate-900">{h.name}</td>
                            <td className="py-3 px-2 font-semibold text-slate-600">{h.timeframe}</td>
                            <td className="py-3 px-2">
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                                {h.category}
                              </span>
                            </td>
                            <td className="py-3 px-2 font-semibold text-slate-600">{h.difficulty}</td>
                            <td className="py-3 px-2 font-bold text-orange-600">🔥 {h.streakDays}d</td>
                            <td className="py-3 px-2 font-black text-blue-600">+{h.xpValue} XP</td>
                            <td className="py-3 px-2 text-right">
                              <button
                                onClick={() => handleDeleteHabit(h.id)}
                                className="p-1 rounded text-slate-400 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 3: DAILY MISSIONS */}
          {/* ============================================================================ */}
          {activeInnerTab === 'missions' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-base font-black text-slate-900">Daily Missions Console</h2>
                    <p className="text-xs text-slate-500">Challenge yourself with daily targets and claim XP boosts to accelerate placement readiness.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSeedMissions}
                      className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 cursor-pointer"
                    >
                      ⚡ Seed Missions
                    </button>
                    <button
                      onClick={() => setShowMissionModal(true)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Define Mission</span>
                    </button>
                  </div>
                </div>

                {missions.length === 0 ? (
                  <div className="p-10 text-center space-y-3 border border-dashed border-slate-200 rounded-2xl">
                    <Target className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-black text-slate-800">No Active Missions</p>
                    <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                      Your daily missions console is empty. Click "Define Mission" above or seed starter missions.
                    </p>
                    <button
                      onClick={handleSeedMissions}
                      className="px-4 py-2 rounded-xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 transition-colors shadow-sm cursor-pointer"
                    >
                      ⚡ Seed Starter Missions
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {missions.map((m) => (
                      <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-black text-slate-900">{m.title}</h4>
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5">{m.description}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-black text-[10px] shrink-0">
                            +{m.xpReward} XP / +{m.creditReward}g
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-slate-500">
                            <span>Progress</span>
                            <span>{m.currentCount} / {m.targetCount}</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 transition-all duration-300"
                              style={{ width: `${Math.min(100, (m.currentCount / m.targetCount) * 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleClaimMission(m.id)}
                          disabled={!m.completed || m.claimed}
                          className={`w-full py-2 rounded-xl font-black text-xs transition-colors cursor-pointer ${
                            m.claimed
                              ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed'
                              : m.completed
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {m.claimed ? 'Reward Claimed ✓' : m.completed ? 'Claim Reward 🎉' : 'In Progress'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 4: PERFORMANCE ANALYTICS */}
          {/* ============================================================================ */}
          {activeInnerTab === 'analytics' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-2">
                  Weekly XP Compound Curve
                </h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={weeklyData}>
                      <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip />
                      <Line type="monotone" dataKey="xp" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 5: CONSISTENCY MATRIX */}
          {/* ============================================================================ */}
          {activeInnerTab === 'matrix' && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d animate-in fade-in duration-300">
              <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-2">
                Consistency Heatmap Matrix
              </h2>
              <p className="text-xs text-slate-500 font-medium">30-day visual activity distribution based on habit check-ins.</p>

              <div className="grid grid-cols-7 sm:grid-cols-10 gap-2 pt-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const dayNum = i + 1;
                  const isActive = habits.some(h => h.historyDates.length > 0 && i % 3 === 0);
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-center font-extrabold text-xs transition-all ${
                        isActive
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      Day {dayNum}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 6: ATTENDANCE TRACKER & PREDICTOR */}
          {/* ============================================================================ */}
          {activeInnerTab === 'attendance' && (
            <AttendanceView
              attendance={attendance}
              onUpdateAttendance={onUpdateAttendance}
            />
          )}

        </div>
      </div>

      {/* ============================================================================ */}
      {/* MODALS */}
      {/* ============================================================================ */}

      {/* Add / Edit Habit Modal */}
      {showHabitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900">
              {editingHabit ? 'Edit Habit Target' : 'Configure New Habit Target'}
            </h3>
            <form onSubmit={handleSaveHabit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Habit Name</label>
                <input
                  type="text"
                  required
                  value={habitForm.name}
                  onChange={(e) => setHabitForm({ ...habitForm, name: e.target.value })}
                  placeholder="e.g. Solve 1 CampusOS LeetCode Problem"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Frame</label>
                  <select
                    value={habitForm.timeframe}
                    onChange={(e: any) => setHabitForm({ ...habitForm, timeframe: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Anytime">Anytime</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={habitForm.category}
                    onChange={(e: any) => setHabitForm({ ...habitForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    {DEFAULT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={habitForm.difficulty}
                    onChange={(e: any) => setHabitForm({ ...habitForm, difficulty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">XP Value</label>
                  <input
                    type="number"
                    min={10}
                    max={200}
                    value={habitForm.xpValue}
                    onChange={(e) => setHabitForm({ ...habitForm, xpValue: parseInt(e.target.value) || 50 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowHabitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Mission Modal */}
      {showMissionModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900">Define Daily Mission</h3>
            <form onSubmit={handleSaveMission} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mission Title</label>
                <input
                  type="text"
                  required
                  value={missionForm.title}
                  onChange={(e) => setMissionForm({ ...missionForm, title: e.target.value })}
                  placeholder="e.g. Master System Design Concept"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={missionForm.description}
                  onChange={(e) => setMissionForm({ ...missionForm, description: e.target.value })}
                  placeholder="e.g. Log 2 habits today"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Count</label>
                  <input
                    type="number"
                    min={1}
                    value={missionForm.targetCount}
                    onChange={(e) => setMissionForm({ ...missionForm, targetCount: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">XP Reward</label>
                  <input
                    type="number"
                    min={20}
                    value={missionForm.xpReward}
                    onChange={(e) => setMissionForm({ ...missionForm, xpReward: parseInt(e.target.value) || 100 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMissionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                  Create Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tuner Settings Modal */}
      {showTunerModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              Habiturex Tuner Engine
            </h3>
            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1">XP Multiplier</label>
                <select
                  value={xpMultiplier}
                  onChange={(e) => setXpMultiplier(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                >
                  <option value={1}>x1 Standard Boost</option>
                  <option value={1.5}>x1.5 Placement Sprint</option>
                  <option value={2}>x2 Double Level Boost</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowTunerModal(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Attendance Subject Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900">Add Course Subject</h3>
            <form onSubmit={handleAddSubject} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  placeholder="e.g. Operating Systems"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code</label>
                  <input
                    type="text"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                    placeholder="CS301"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target %</label>
                  <input
                    type="number"
                    value={newSubject.targetPercentage}
                    onChange={(e) => setNewSubject({ ...newSubject, targetPercentage: parseInt(e.target.value) || 75 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
