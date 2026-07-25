import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, 
  Award, 
  BarChart3, 
  Plus, 
  Trash2, 
  Check, 
  CheckCircle2, 
  X, 
  Clock, 
  Play, 
  Pause, 
  RefreshCw, 
  Search, 
  Calendar, 
  CalendarDays, 
  CheckSquare, 
  FileText, 
  LayoutDashboard, 
  Table, 
  LineChart, 
  Target, 
  GraduationCap, 
  Zap, 
  AlertCircle, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Sparkles,
  Medal,
  Edit2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { UserProfile, AttendanceSubject, StudentMarkRecord, HabiturexData } from '../../types';
import { AttendanceView } from '../attendance/AttendanceView';
import { FirestoreService } from '../../lib/firestoreService';
import { StreakService } from '../../lib/streakService';

export interface TaskItem {
  id: string;
  name: string;
  subject: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed';
  progress: number;
  dueDate: string;
  timeLeft?: string;
  assignedBy?: string;
  category?: string;
  completedToday: boolean;
  streakDays: number;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  creditReward: number;
  completed: boolean;
  claimed: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'Exam' | 'Assignment' | 'Lecture' | 'Study';
  subject: string;
  color: string;
}

interface LeaderboardEntry {
  uid: string;
  displayName: string;
  university: string;
  marksAvg: number;
  tasksCompleted: number;
  streak: number;
  studyHours: number;
}

interface HabiturexViewProps {
  user: UserProfile;
  attendance: AttendanceSubject[];
  onUpdateAttendance: (subjects: AttendanceSubject[]) => void;
  initialInnerTab?: 'dashboard' | 'table' | 'attendance' | 'analytics' | 'missions' | 'calendar' | 'leaderboard';
  focusTimerSeconds?: number;
  focusTimerInitialMinutes?: number;
  isFocusTimerRunning?: boolean;
  focusTimerMode?: 'focus' | 'shortBreak' | 'longBreak';
  onToggleFocusTimer?: () => void;
  onResetFocusTimer?: () => void;
  onSetFocusTimerDuration?: (mins: number) => void;
}

export const HabiturexView: React.FC<HabiturexViewProps> = ({
  user,
  attendance,
  onUpdateAttendance,
  initialInnerTab,
  focusTimerSeconds = 25 * 60,
  focusTimerInitialMinutes = 25,
  isFocusTimerRunning = false,
  focusTimerMode = 'focus',
  onToggleFocusTimer,
  onResetFocusTimer,
  onSetFocusTimerDuration
}) => {
  // Navigation Tab State
  const [activeInnerTab, setActiveInnerTab] = useState<'dashboard' | 'table' | 'attendance' | 'analytics' | 'missions' | 'calendar' | 'leaderboard'>(
    initialInnerTab || 'dashboard'
  );
  const [innerSidebarCollapsed, setInnerSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (initialInnerTab) {
      setActiveInnerTab(initialInnerTab);
    }
  }, [initialInnerTab]);

  // User Stats State
  const [credits, setCredits] = useState<number>(0);
  const [flameStreak, setFlameStreak] = useState<number>(0);
  const [perfectDays, setPerfectDays] = useState<number>(0);

  // Core Data Lists
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [missions, setMissions] = useState<DailyMission[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [marks, setMarks] = useState<StudentMarkRecord[]>([]);
  const [studyHoursLog, setStudyHoursLog] = useState<Record<string, number>>({});

  // Quick Notes State
  const [quickNotes, setQuickNotes] = useState<string>('');

  // Derived Focus Timer Values from Parent State (Top-Level App.tsx)
  const timerMinutes = Math.floor(focusTimerSeconds / 60);
  const timerSeconds = focusTimerSeconds % 60;
  const isTimerRunning = isFocusTimerRunning;

  const [customMinutesInput, setCustomMinutesInput] = useState<string>((focusTimerInitialMinutes || 25).toString());

  useEffect(() => {
    setCustomMinutesInput((focusTimerInitialMinutes || 25).toString());
  }, [focusTimerInitialMinutes]);

  // Leaderboard Data
  const [leaderboardList, setLeaderboardList] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState<boolean>(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals State
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [taskForm, setTaskForm] = useState({
    name: '',
    subject: 'DBMS',
    priority: 'Medium' as TaskItem['priority'],
    status: 'Pending' as TaskItem['status'],
    dueDate: new Date().toISOString().split('T')[0],
    category: 'Studies'
  });

  const [showMissionModal, setShowMissionModal] = useState(false);
  const [missionForm, setMissionForm] = useState({
    title: '',
    description: '',
    targetCount: 1,
    creditReward: 100
  });

  const [showMarkModal, setShowMarkModal] = useState(false);
  const [editingMark, setEditingMark] = useState<StudentMarkRecord | null>(null);
  const [markForm, setMarkForm] = useState({
    subject: 'DBMS',
    examTitle: 'Mid-Term Exam',
    scoredMarks: 85,
    maxMarks: 100,
    examDate: new Date().toISOString().split('T')[0],
    semester: 'Semester 4'
  });

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Exam' as CalendarEvent['type'],
    subject: 'DBMS'
  });

  // Fetch Firestore Data on Mount & Sync
  useEffect(() => {
    let isMounted = true;
    async function loadHabiturexData() {
      if (!user?.uid) return;
      try {
        const habData = await FirestoreService.getHabiturexData(user.uid);
        const userMarks = await FirestoreService.getStudentMarks(user.uid);

        if (isMounted) {
          if (habData) {
            setTasks(habData.tasks || []);
            setMissions(habData.missions || []);
            setEvents(habData.events || []);
            setStudyHoursLog(habData.studyHoursLog || {});
            setCredits(habData.stats?.credits || 0);
            setFlameStreak(habData.stats?.flameStreak || 0);
            setPerfectDays(habData.stats?.perfectDays || 0);
          }
          if (userMarks) {
            setMarks(userMarks);
          }
        }
      } catch (err) {
        console.warn("Failed loading Habiturex Firestore data:", err);
      }
    }

    loadHabiturexData();
    return () => { isMounted = false; };
  }, [user?.uid]);

  // Auto Save to Firestore
  const saveAllToFirestore = async (
    updatedTasks = tasks,
    updatedMissions = missions,
    updatedEvents = events,
    updatedLog = studyHoursLog,
    updatedCredits = credits,
    updatedStreak = flameStreak
  ) => {
    if (!user?.uid) return;
    try {
      await FirestoreService.saveHabiturexData(user.uid, {
        tasks: updatedTasks,
        missions: updatedMissions,
        events: updatedEvents,
        studyHoursLog: updatedLog,
        stats: {
          xp: 0,
          credits: updatedCredits,
          flameStreak: updatedStreak,
          perfectDays
        }
      });
    } catch (e) {
      console.warn("Error saving Habiturex data:", e);
    }
  };

  // Toggle Task Status & Record Streak
  const handleToggleTask = async (taskId: string) => {
    const updated = tasks.map(t => {
      if (t.id !== taskId) return t;
      const isCompleting = !t.completedToday;
      
      if (isCompleting) {
        // Record active activity for streak
        StreakService.recordActivity();
      }

      return {
        ...t,
        completedToday: isCompleting,
        status: (isCompleting ? 'Completed' : 'In Progress') as TaskItem['status'],
        progress: isCompleting ? 100 : 50,
        streakDays: isCompleting ? t.streakDays + 1 : Math.max(0, t.streakDays - 1)
      };
    });

    const completedCount = updated.filter(t => t.completedToday).length;
    let newStreak = flameStreak;
    if (completedCount > 0) {
      newStreak = Math.max(flameStreak, 1);
      setFlameStreak(newStreak);
    }

    setTasks(updated);
    saveAllToFirestore(updated, missions, events, studyHoursLog, credits, newStreak);
  };

  // Add or Edit Task
  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.name.trim()) return;

    let updated: TaskItem[];
    if (editingTask) {
      updated = tasks.map(t => t.id === editingTask.id ? { ...t, ...taskForm } : t);
    } else {
      const newTask: TaskItem = {
        id: 'tsk_' + Date.now(),
        name: taskForm.name.trim(),
        subject: taskForm.subject,
        priority: taskForm.priority,
        status: taskForm.status,
        progress: taskForm.status === 'Completed' ? 100 : 25,
        dueDate: taskForm.dueDate,
        timeLeft: '3 Days Left',
        assignedBy: 'Self-Target',
        category: taskForm.category,
        completedToday: taskForm.status === 'Completed',
        streakDays: 0
      };
      updated = [newTask, ...tasks];
    }

    setTasks(updated);
    setShowTaskModal(false);
    setEditingTask(null);
    setTaskForm({ name: '', subject: 'DBMS', priority: 'Medium', status: 'Pending', dueDate: new Date().toISOString().split('T')[0], category: 'Studies' });
    saveAllToFirestore(updated);
  };

  // Delete Task
  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    saveAllToFirestore(updated);
  };

  // Add Custom Mission
  const handleSaveMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!missionForm.title.trim()) return;

    const newMission: DailyMission = {
      id: 'msn_' + Date.now(),
      title: missionForm.title.trim(),
      description: missionForm.description || 'Custom daily study goal',
      targetCount: missionForm.targetCount,
      currentCount: 0,
      creditReward: missionForm.creditReward,
      completed: false,
      claimed: false
    };

    const updated = [newMission, ...missions];
    setMissions(updated);
    setShowMissionModal(false);
    setMissionForm({ title: '', description: '', targetCount: 1, creditReward: 100 });
    saveAllToFirestore(tasks, updated);
  };

  // Claim Mission Reward
  const handleClaimMission = (missionId: string) => {
    let rewardGranted = 0;
    const updated = missions.map(m => {
      if (m.id !== missionId) return m;
      rewardGranted = m.creditReward;
      return { ...m, claimed: true };
    });

    const newCredits = credits + rewardGranted;
    setCredits(newCredits);
    setMissions(updated);
    saveAllToFirestore(tasks, updated, events, studyHoursLog, newCredits);
    alert(`🎉 Reward Claimed! +${rewardGranted} Gold Credits added to your account.`);
  };

  // Save Exam Mark
  const handleSaveMark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!markForm.subject.trim() || !user?.uid) return;

    let updated: StudentMarkRecord[];
    if (editingMark) {
      updated = marks.map(m => m.id === editingMark.id ? { ...m, ...markForm } : m);
    } else {
      const newMark: StudentMarkRecord = {
        id: 'mrk_' + Date.now(),
        userId: user.uid,
        subject: markForm.subject,
        examTitle: markForm.examTitle,
        scoredMarks: Number(markForm.scoredMarks),
        maxMarks: Number(markForm.maxMarks),
        examDate: markForm.examDate,
        semester: markForm.semester,
        createdAt: new Date().toISOString()
      };
      updated = [newMark, ...marks];
    }

    setMarks(updated);
    setShowMarkModal(false);
    setEditingMark(null);
    await FirestoreService.saveStudentMarks(user.uid, updated);
  };

  // Delete Exam Mark
  const handleDeleteMark = async (id: string) => {
    const updated = marks.filter(m => m.id !== id);
    setMarks(updated);
    await FirestoreService.deleteStudentMark(id);
  };

  // Save Calendar Event
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    const colors = {
      Exam: 'bg-rose-100 text-rose-800 border-rose-200',
      Assignment: 'bg-blue-100 text-blue-800 border-blue-200',
      Lecture: 'bg-purple-100 text-purple-800 border-purple-200',
      Study: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };

    const newEv: CalendarEvent = {
      id: 'evt_' + Date.now(),
      title: eventForm.title,
      date: eventForm.date,
      type: eventForm.type,
      subject: eventForm.subject,
      color: colors[eventForm.type] || 'bg-slate-100 text-slate-800 border-slate-200'
    };

    const updated = [newEv, ...events];
    setEvents(updated);
    setShowEventModal(false);
    setEventForm({ title: '', date: new Date().toISOString().split('T')[0], type: 'Exam', subject: 'DBMS' });
    saveAllToFirestore(tasks, missions, updated);
  };

  // Load Campus Leaderboard Data from Firestore
  useEffect(() => {
    if (activeInnerTab === 'leaderboard') {
      setLoadingLeaderboard(true);
      async function fetchLeaderboard() {
        try {
          const users = await FirestoreService.getAllUsers();
          const entries: LeaderboardEntry[] = [];

          for (const u of users) {
            const [uMarks, uHab] = await Promise.all([
              FirestoreService.getStudentMarks(u.uid),
              FirestoreService.getHabiturexData(u.uid)
            ]);

            const totalScored = uMarks.reduce((acc, m) => acc + m.scoredMarks, 0);
            const totalMax = uMarks.reduce((acc, m) => acc + m.maxMarks, 0);
            const marksAvg = totalMax > 0 ? Math.round((totalScored / totalMax) * 100) : 0;

            const tasksCompleted = (uHab?.tasks || []).filter((t: any) => t.completedToday || t.status === 'Completed').length;
            const streak = uHab?.stats?.flameStreak || 0;
            const studyHours = Object.values(uHab?.studyHoursLog || {}).reduce((a, b) => a + Number(b), 0);

            entries.push({
              uid: u.uid,
              displayName: u.displayName || 'Campus Student',
              university: u.university || 'Engineering Cohort',
              marksAvg,
              tasksCompleted,
              streak,
              studyHours
            });
          }

          // Sort by highest marks avg, then completed tasks, then streak
          entries.sort((a, b) => b.marksAvg - a.marksAvg || b.tasksCompleted - a.tasksCompleted || b.streak - a.streak);
          setLeaderboardList(entries);
        } catch (e) {
          console.warn("Failed fetching leaderboard:", e);
        } finally {
          setLoadingLeaderboard(false);
        }
      }

      fetchLeaderboard();
    }
  }, [activeInnerTab]);

  // Overall Attendance Percentage
  const totalHeldClasses = attendance.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const totalAttendedClasses = attendance.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const overallAttendancePct = totalHeldClasses > 0 ? Math.round((totalAttendedClasses / totalHeldClasses) * 1000) / 10 : 0;

  // Filtered Tasks
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Dynamic Weekly Study Hours Data (Starting from User Sign-In Date)
  const studyHoursData = useMemo(() => {
    const userCreatedDate = user?.createdAt ? new Date(user.createdAt) : new Date();
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const now = new Date();
    
    // Map current week days
    return days.map((dayName, idx) => {
      const d = new Date();
      const currentDayIdx = (d.getDay() + 6) % 7; // Monday = 0
      const diff = idx - currentDayIdx;
      d.setDate(d.getDate() + diff);
      const dateStr = d.toISOString().split('T')[0];

      // Check if date is before user creation date
      const isBeforeSignIn = d.getTime() < userCreatedDate.setHours(0,0,0,0);
      const hours = isBeforeSignIn ? 0 : (studyHoursLog[dateStr] || 0);

      return {
        day: dayName,
        hours: hours,
        goal: 6
      };
    });
  }, [user?.createdAt, studyHoursLog]);

  // Attendance Trend (Fresh Start = 0 unless logged)
  const attendanceTrendData = [
    { week: 'W1', rate: 0 },
    { week: 'W2', rate: 0 },
    { week: 'W3', rate: 0 },
    { week: 'W4', rate: 0 },
    { week: 'W5', rate: 0 },
    { week: 'W6', rate: overallAttendancePct }
  ];

  // Radar Mastery (Fresh Start = 0 unless subjects completed)
  const radarData = useMemo(() => {
    const subjects = ['DBMS', 'OS', 'DSA', 'CN', 'System Design'];
    return subjects.map(sub => {
      const subMarks = marks.filter(m => m.subject.toLowerCase() === sub.toLowerCase());
      const subScored = subMarks.reduce((a, m) => a + m.scoredMarks, 0);
      const subMax = subMarks.reduce((a, m) => a + m.maxMarks, 0);
      const score = subMax > 0 ? Math.round((subScored / subMax) * 100) : 0;
      return { subject: sub, score };
    });
  }, [marks]);

  // Exam Marks Analytics Calculations
  const totalScoredMarks = marks.reduce((a, m) => a + m.scoredMarks, 0);
  const totalMaxMarks = marks.reduce((a, m) => a + m.maxMarks, 0);
  const overallMarksPct = totalMaxMarks > 0 ? Math.round((totalScoredMarks / totalMaxMarks) * 1000) / 10 : 0;
  const estimatedCGPA = overallMarksPct > 0 ? Math.min(10, Math.round((overallMarksPct / 9.5) * 100) / 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[10px] tracking-wide uppercase">
              STUDENT PERFORMANCE & HABIT ENGINE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Habiturex Workspace & Academic Suite
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Personalized dashboard, active study tracking, exam marks analysis, and live campus leaderboard.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-black text-amber-700">Gold Credits</p>
              <p className="text-sm font-black text-amber-900">{credits} Gold</p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-orange-50 border border-orange-200 text-orange-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-bounce shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-black text-orange-700">Active Streak</p>
              <p className="text-sm font-black text-orange-900">{flameStreak} Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Sub-Sidebar Navigation */}
        <div className={`${innerSidebarCollapsed ? 'lg:col-span-1' : 'lg:col-span-3'} space-y-3 transition-all duration-300`}>
          <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            
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
                  {!innerSidebarCollapsed && <span>Tasks & Targets</span>}
                </div>
                {!innerSidebarCollapsed && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">{tasks.length}</span>
                )}
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
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">{overallAttendancePct}%</span>
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
                  {!innerSidebarCollapsed && <span>Analytics & Performance</span>}
                </div>
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
              </button>

              <button
                onClick={() => setActiveInnerTab('calendar')}
                className={`w-full p-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  activeInnerTab === 'calendar'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4" />
                  {!innerSidebarCollapsed && <span>Marks & Academic Schedule</span>}
                </div>
              </button>

              <button
                onClick={() => setActiveInnerTab('leaderboard')}
                className={`w-full p-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  activeInnerTab === 'leaderboard'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  {!innerSidebarCollapsed && <span>Campus Leaderboard</span>}
                </div>
              </button>
            </nav>

            {/* Profile Footer */}
            {!innerSidebarCollapsed && (
              <div className="pt-3 border-t border-slate-100">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate">{user?.displayName || 'Student'}</p>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[9px]">
                      {overallMarksPct > 0 ? `${overallMarksPct}% MARKS AVG` : 'FRESH START'}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Main Content Pane */}
        <div className={`${innerSidebarCollapsed ? 'lg:col-span-11' : 'lg:col-span-9'} space-y-5`}>
          
          {/* ============================================================================ */}
          {/* TAB 1: DASHBOARD HUB */}
          {/* ============================================================================ */}
          {activeInnerTab === 'dashboard' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* Hero Greeting Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-black text-[10px] tracking-wider uppercase backdrop-blur-md">
                        STUDENT HABITUREX CONSOLE
                      </span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-white">
                      Welcome, {user?.displayName || 'Student'} 👋
                    </h2>
                    <p className="text-xs text-blue-100 font-medium max-w-xl">
                      "Consistency turns effort into excellence. Set your custom daily missions, complete active tasks to keep your streak alive, and track your performance."
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-right">
                      <p className="text-[10px] uppercase font-bold text-blue-200">Today's Date</p>
                      <p className="text-xs font-black text-white">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8 Stat KPI Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                
                {/* 1. Attendance Rate */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-slate-400">Attendance Rate</span>
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckSquare className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">{overallAttendancePct}%</p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">Target ≥75%</p>
                  </div>
                </div>

                {/* 2. Active Tasks */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-slate-400">Active Tasks</span>
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">{tasks.length} Total</p>
                    <p className="text-[10px] font-bold text-blue-600 mt-0.5">{tasks.filter(t => t.status !== 'Completed').length} Pending</p>
                  </div>
                </div>

                {/* 3. Completed Tasks */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-slate-400">Completed Tasks</span>
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">{tasks.filter(t => t.status === 'Completed' || t.completedToday).length} Done</p>
                    <p className="text-[10px] font-bold text-indigo-600 mt-0.5">Streak Active</p>
                  </div>
                </div>

                {/* 4. Total Focus Hours */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-slate-400">Focus Hours</span>
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">
                      {Object.values(studyHoursLog).reduce<number>((a, b) => a + Number(b), 0).toFixed(1)} hrs
                    </p>
                    <p className="text-[10px] font-bold text-purple-600 mt-0.5">Logged Total</p>
                  </div>
                </div>

                {/* 5. Exam Marks Avg */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-slate-400">Exam Marks Avg</span>
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">{overallMarksPct}%</p>
                    <p className="text-[10px] font-bold text-amber-600 mt-0.5">EST. CGPA: {estimatedCGPA}</p>
                  </div>
                </div>

                {/* 6. Gold Credits */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-slate-400">Gold Credits</span>
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-black text-amber-900">{credits}</p>
                    <p className="text-[10px] font-bold text-amber-600 mt-0.5">Redeem Rewards</p>
                  </div>
                </div>

                {/* 7. Upcoming Exams */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-slate-400">Upcoming Exams</span>
                    <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                      <AlertCircle className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">
                      {events.filter(e => e.type === 'Exam').length} Scheduled
                    </p>
                    <p className="text-[10px] font-bold text-rose-600 mt-0.5">Calendar Active</p>
                  </div>
                </div>

                {/* 8. Flame Streak */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-slate-400">Daily Streak</span>
                    <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Flame className="w-3.5 h-3.5 fill-orange-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">{flameStreak} Days</p>
                    <p className="text-[10px] font-bold text-orange-600 mt-0.5">Task Streak</p>
                  </div>
                </div>

              </div>

              {/* USER DAILY MISSIONS ON DASHBOARD */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span>Daily Missions & Targets</span>
                    </h3>
                    <p className="text-xs text-slate-500">Set your custom targets and claim Gold credits upon completion</p>
                  </div>

                  <button
                    onClick={() => setShowMissionModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-colors shadow-sm cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Set Custom Mission</span>
                  </button>
                </div>

                {missions.length === 0 ? (
                  <div className="text-center py-6 text-slate-400 text-xs font-semibold">
                    No custom daily missions set yet. Click "Set Custom Mission" above!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {missions.map(m => {
                      const isCompleted = m.currentCount >= m.targetCount || m.completed;
                      return (
                        <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-xs font-black text-slate-900">{m.title}</h4>
                              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold text-[10px]">
                                +{m.creditReward} Gold
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">{m.description}</p>
                          </div>

                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-600">
                              Target: {m.currentCount} / {m.targetCount}
                            </span>

                            {m.claimed ? (
                              <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-[10px]">
                                Claimed ✅
                              </span>
                            ) : isCompleted ? (
                              <button
                                onClick={() => handleClaimMission(m.id)}
                                className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs hover:scale-105 transition-all shadow-md cursor-pointer animate-pulse"
                              >
                                Claim Reward 🎁
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  const updatedMissions = missions.map(ms => ms.id === m.id ? { ...ms, currentCount: ms.currentCount + 1, completed: ms.currentCount + 1 >= ms.targetCount } : ms);
                                  setMissions(updatedMissions);
                                  saveAllToFirestore(tasks, updatedMissions);
                                }}
                                className="px-2.5 py-1 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 font-extrabold text-[10px] cursor-pointer"
                              >
                                + Progress
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Main Workspace Split: Task Console + Right Panel Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left Active Tasks Console (8 cols) */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-black text-slate-900">Active Tasks & Assignments</h3>
                        <p className="text-xs text-slate-500">Completing tasks automatically maintains your daily streak</p>
                      </div>

                      <button
                        onClick={() => setShowTaskModal(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-colors shadow-sm cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Task</span>
                      </button>
                    </div>

                    {/* Filter & Search Toolbar */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                      <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search tasks or subjects..."
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
                        {['All', 'Pending', 'In Progress', 'Completed'].map(st => (
                          <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                              statusFilter === st 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tasks Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                            <th className="py-2.5 px-2">Done</th>
                            <th className="py-2.5 px-2">Task / Goal</th>
                            <th className="py-2.5 px-2">Subject</th>
                            <th className="py-2.5 px-2">Priority</th>
                            <th className="py-2.5 px-2">Status</th>
                            <th className="py-2.5 px-2">Progress</th>
                            <th className="py-2.5 px-2">Due Date</th>
                            <th className="py-2.5 px-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredTasks.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="py-6 text-center text-slate-400 text-xs font-semibold">
                                No tasks found. Click "Add Task" to create one!
                              </td>
                            </tr>
                          ) : (
                            filteredTasks.map(t => (
                              <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-3 px-2">
                                  <button
                                    onClick={() => handleToggleTask(t.id)}
                                    className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${
                                      t.completedToday ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                                    }`}
                                  >
                                    {t.completedToday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                  </button>
                                </td>
                                <td className="py-3 px-2 font-black text-slate-900 min-w-[180px]">
                                  <span className={t.completedToday ? 'line-through text-slate-400' : 'text-slate-900'}>
                                    {t.name}
                                  </span>
                                </td>
                                <td className="py-3 px-2">
                                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-extrabold text-[10px]">
                                    {t.subject}
                                  </span>
                                </td>
                                <td className="py-3 px-2">
                                  <span className={`px-2 py-0.5 rounded font-black text-[10px] ${
                                    t.priority === 'Critical' ? 'bg-rose-100 text-rose-800' :
                                    t.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                                    t.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                                    'bg-slate-100 text-slate-700'
                                  }`}>
                                    {t.priority}
                                  </span>
                                </td>
                                <td className="py-3 px-2 font-semibold text-slate-700">
                                  {t.status}
                                </td>
                                <td className="py-3 px-2 w-24">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                      <div 
                                        className="h-full bg-blue-600 rounded-full"
                                        style={{ width: `${t.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500">{t.progress}%</span>
                                  </div>
                                </td>
                                <td className="py-3 px-2 font-semibold text-slate-500">{t.dueDate}</td>
                                <td className="py-3 px-2 text-right">
                                  <button
                                    onClick={() => handleDeleteTask(t.id)}
                                    className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>

                {/* Right Widget Column (4 cols) */}
                <div className="lg:col-span-4 space-y-5">
                  
                  {/* 1. Custom Focus Timer */}
                  <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-black text-slate-900">Focus Timer Watch</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold text-[10px]">
                        +50 Gold / Session
                      </span>
                    </div>

                    {/* Presets */}
                    <div className="flex items-center justify-between gap-1 bg-slate-100 p-1 rounded-xl text-[10px] font-bold overflow-x-auto">
                      {[15, 25, 45, 60, 90, 120].map(m => (
                        <button
                          key={m}
                          onClick={() => {
                            onSetFocusTimerDuration?.(m);
                            setCustomMinutesInput(m.toString());
                          }}
                          className={`flex-1 py-1 px-1.5 rounded-lg transition-all cursor-pointer text-center ${
                            focusTimerInitialMinutes === m ? 'bg-blue-600 text-white font-black shadow-xs' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {m}m
                        </button>
                      ))}
                    </div>

                    {/* Custom Minute Input & Adjuster */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                      <label className="block text-[10px] font-black uppercase text-slate-500">
                        Custom Duration (Minutes)
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const newMins = Math.max(1, focusTimerInitialMinutes - 5);
                            onSetFocusTimerDuration?.(newMins);
                            setCustomMinutesInput(newMins.toString());
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-black text-xs hover:bg-slate-100 cursor-pointer"
                        >
                          -5m
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="600"
                          value={customMinutesInput}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCustomMinutesInput(val);
                            const parsed = parseInt(val, 10);
                            if (!isNaN(parsed) && parsed > 0) {
                              onSetFocusTimerDuration?.(parsed);
                            }
                          }}
                          className="w-full text-center py-1.5 px-2 bg-white rounded-xl border border-slate-200 font-mono font-black text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newMins = focusTimerInitialMinutes + 5;
                            onSetFocusTimerDuration?.(newMins);
                            setCustomMinutesInput(newMins.toString());
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-black text-xs hover:bg-slate-100 cursor-pointer"
                        >
                          +5m
                        </button>
                      </div>
                    </div>

                    {/* Timer Clock Display */}
                    <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white text-center space-y-2">
                      <p className="text-3xl font-black font-mono tracking-wider">
                        {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
                        {isTimerRunning ? '🔥 Focus Session Active' : 'Ready to Start'}
                      </p>
                    </div>

                    {/* Timer Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleFocusTimer?.()}
                        className={`flex-1 py-2 rounded-xl font-black text-xs text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isTimerRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20'
                        }`}
                      >
                        {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{isTimerRunning ? 'Pause' : 'Start Focus'}</span>
                      </button>
                      <button
                        onClick={() => onResetFocusTimer?.()}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                        title="Reset Timer"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Scratchpad Notes */}
                  <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <Bookmark className="w-4 h-4 text-amber-500" />
                        <h4 className="text-xs font-black text-slate-900">Quick Notes Scratchpad</h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">Auto-saved</span>
                    </div>

                    <textarea
                      value={quickNotes}
                      onChange={(e) => setQuickNotes(e.target.value)}
                      rows={4}
                      placeholder="Write down lecture points, formula reminders, or tasks..."
                      className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-slate-800"
                    ></textarea>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 2: TASKS & TARGETS */}
          {/* ============================================================================ */}
          {activeInnerTab === 'table' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-base font-black text-slate-900">Full Tasks & Habit Management</h2>
                    <p className="text-xs text-slate-500">Organize your coursework, coding targets, and daily routines</p>
                  </div>
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Target</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                        <th className="py-3 px-2">Complete</th>
                        <th className="py-3 px-2">Task Name</th>
                        <th className="py-3 px-2">Subject / Tag</th>
                        <th className="py-3 px-2">Priority</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2">Progress</th>
                        <th className="py-3 px-2">Due Date</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {tasks.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-2">
                            <button
                              onClick={() => handleToggleTask(t.id)}
                              className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${
                                t.completedToday ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                              }`}
                            >
                              {t.completedToday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                          </td>
                          <td className="py-3 px-2 font-black text-slate-900">{t.name}</td>
                          <td className="py-3 px-2">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-extrabold text-[10px]">
                              {t.subject}
                            </span>
                          </td>
                          <td className="py-3 px-2 font-black text-[10px]">{t.priority}</td>
                          <td className="py-3 px-2 font-semibold text-slate-600">{t.status}</td>
                          <td className="py-3 px-2">{t.progress}%</td>
                          <td className="py-3 px-2 font-medium text-slate-500">{t.dueDate}</td>
                          <td className="py-3 px-2 text-right">
                            <button
                              onClick={() => handleDeleteTask(t.id)}
                              className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 3: ATTENDANCE MANAGER */}
          {/* ============================================================================ */}
          {activeInnerTab === 'attendance' && (
            <AttendanceView
              attendance={attendance}
              onUpdateAttendance={onUpdateAttendance}
            />
          )}

          {/* ============================================================================ */}
          {/* TAB 4: ANALYTICS & PERFORMANCE */}
          {/* ============================================================================ */}
          {activeInnerTab === 'analytics' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* SHIFTED: Weekly Study Hours & Goal Completion Chart */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">
                    Weekly Study Hours & Goal Completion
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tracks logged focus hours starting strictly from your account sign-in date (days prior remain at 0.0 hrs).
                  </p>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={studyHoursData}>
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                      />
                      <Bar dataKey="hours" name="Logged Focus Hours" fill="#2563eb" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="goal" name="Daily Goal Target" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 6-Week Attendance Stability Trend (%) */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">
                    6-Week Attendance Stability Trend (%)
                  </h3>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={attendanceTrendData}>
                        <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                        <Tooltip />
                        <Area type="monotone" dataKey="rate" stroke="#10b981" fill="#d1fae5" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Subject Mastery & Preparedness Radar */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">
                    Subject Mastery & Preparedness Radar
                  </h3>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                        <Radar name="Score" dataKey="score" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 5: DAILY MISSIONS & STREAKS */}
          {/* ============================================================================ */}
          {activeInnerTab === 'missions' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-base font-black text-slate-900">Daily Missions & Custom Targets</h2>
                    <p className="text-xs text-slate-500 font-medium">Create your own missions and claim Gold credits upon completion</p>
                  </div>

                  <button
                    onClick={() => setShowMissionModal(true)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Set Custom Mission</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {missions.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                      No daily missions yet. Click "Set Custom Mission" above to start!
                    </div>
                  ) : (
                    missions.map(m => {
                      const isCompleted = m.currentCount >= m.targetCount || m.completed;
                      return (
                        <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-3">
                          <div>
                            <h4 className="text-xs font-black text-slate-900">{m.title}</h4>
                            <p className="text-[11px] text-slate-500">{m.description}</p>
                            <p className="text-[10px] font-bold text-blue-600 mt-1">
                              Target Progress: {m.currentCount} / {m.targetCount} • Reward: +{m.creditReward} Gold
                            </p>
                          </div>

                          <div>
                            {m.claimed ? (
                              <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs">
                                Claimed ✅
                              </span>
                            ) : isCompleted ? (
                              <button
                                onClick={() => handleClaimMission(m.id)}
                                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs hover:scale-105 transition-all shadow-md cursor-pointer animate-pulse"
                              >
                                Claim Reward 🎁
                              </button>
                            ) : (
                              <span className="px-3 py-1 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs">
                                In Progress ({Math.round((m.currentCount / m.targetCount) * 100)}%)
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 6: ACADEMIC CALENDAR & MARKS ANALYSIS */}
          {/* ============================================================================ */}
          {activeInnerTab === 'calendar' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* MARKS & GRADE PERFORMANCE ANALYZER */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <span>Marks & Performance Analyzer</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Enter exam scores to analyze overall percentage, estimated CGPA, and subject performance
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingMark(null);
                      setMarkForm({ subject: 'DBMS', examTitle: 'Mid-Term Exam', scoredMarks: 85, maxMarks: 100, examDate: new Date().toISOString().split('T')[0], semester: 'Semester 4' });
                      setShowMarkModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Enter Exam Marks</span>
                  </button>
                </div>

                {/* Score Summary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-1">
                    <p className="text-[10px] uppercase font-black text-blue-700">Overall Marks Average</p>
                    <p className="text-2xl font-black text-blue-900">{overallMarksPct}%</p>
                    <p className="text-[10px] font-bold text-blue-600">Total: {totalScoredMarks} / {totalMaxMarks} Marks</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
                    <p className="text-[10px] uppercase font-black text-amber-700">Estimated CGPA</p>
                    <p className="text-2xl font-black text-amber-900">{estimatedCGPA} / 10</p>
                    <p className="text-[10px] font-bold text-amber-600">Calculated on total scores</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                    <p className="text-[10px] uppercase font-black text-emerald-700">Exams Logged</p>
                    <p className="text-2xl font-black text-emerald-900">{marks.length} Exams</p>
                    <p className="text-[10px] font-bold text-emerald-600">Synced to Profile & Admin Panel</p>
                  </div>
                </div>

                {/* Entered Marks Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                        <th className="py-2.5 px-2">Subject</th>
                        <th className="py-2.5 px-2">Exam Title</th>
                        <th className="py-2.5 px-2">Scored / Max</th>
                        <th className="py-2.5 px-2">Percentage</th>
                        <th className="py-2.5 px-2">Semester</th>
                        <th className="py-2.5 px-2">Date</th>
                        <th className="py-2.5 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {marks.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-slate-400 text-xs font-semibold">
                            No exam marks logged yet. Click "Enter Exam Marks" above!
                          </td>
                        </tr>
                      ) : (
                        marks.map(m => {
                          const pct = m.maxMarks > 0 ? Math.round((m.scoredMarks / m.maxMarks) * 100) : 0;
                          return (
                            <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3 px-2 font-black text-slate-900">{m.subject}</td>
                              <td className="py-3 px-2 font-bold text-slate-700">{m.examTitle}</td>
                              <td className="py-3 px-2 font-mono font-bold text-slate-800">{m.scoredMarks} / {m.maxMarks}</td>
                              <td className="py-3 px-2">
                                <span className={`px-2 py-0.5 rounded font-black text-[10px] ${
                                  pct >= 75 ? 'bg-emerald-100 text-emerald-800' :
                                  pct >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {pct}%
                                </span>
                              </td>
                              <td className="py-3 px-2 font-medium text-slate-500">{m.semester || 'N/A'}</td>
                              <td className="py-3 px-2 font-medium text-slate-500">{m.examDate}</td>
                              <td className="py-3 px-2 text-right">
                                <button
                                  onClick={() => handleDeleteMark(m.id)}
                                  className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ACADEMIC CALENDAR & EVENT SCHEDULE */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-base font-black text-slate-900">Academic Calendar & Schedule</h2>
                    <p className="text-xs text-slate-500">Key exam dates, submission deadlines, and campus events</p>
                  </div>

                  <button
                    onClick={() => setShowEventModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1 shadow-sm cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Event</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {events.map(e => (
                    <div key={e.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${e.color}`}>
                        {e.type}
                      </span>
                      <h4 className="text-xs font-black text-slate-900">{e.title}</h4>
                      <p className="text-[10px] font-bold text-slate-500">Date: {e.date}</p>
                      <p className="text-[10px] font-bold text-blue-600">Subject: {e.subject}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================================ */}
          {/* TAB 7: CAMPUS LEADERBOARD */}
          {/* ============================================================================ */}
          {activeInnerTab === 'leaderboard' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>Live Campus Leaderboard</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Real-time rankings based on exam marks average, task completions, and daily study streaks
                  </p>
                </div>

                {loadingLeaderboard ? (
                  <div className="py-12 text-center text-slate-400 font-bold text-xs animate-pulse">
                    Loading Campus Leaderboard...
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leaderboardList.map((st, idx) => {
                      const isTop1 = idx === 0;
                      const isTop2 = idx === 1;
                      const isTop3 = idx === 2;

                      return (
                        <div 
                          key={st.uid} 
                          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                            st.uid === user?.uid 
                              ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20' 
                              : 'bg-slate-50 border-slate-200/70'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${
                              isTop1 ? 'bg-amber-400 text-amber-950 shadow-md shadow-amber-500/20' :
                              isTop2 ? 'bg-slate-300 text-slate-900' :
                              isTop3 ? 'bg-amber-700 text-white' :
                              'bg-slate-200 text-slate-700'
                            }`}>
                              {isTop1 ? '🥇' : isTop2 ? '🥈' : isTop3 ? '🥉' : `#${idx + 1}`}
                            </div>

                            <div>
                              <p className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                <span>{st.displayName}</span>
                                {st.uid === user?.uid && (
                                  <span className="px-2 py-0.2 rounded bg-blue-600 text-white text-[9px] font-black">
                                    YOU
                                  </span>
                                )}
                              </p>
                              <p className="text-[10px] text-slate-500 font-semibold">{st.university}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-right">
                            <div>
                              <p className="text-xs font-black text-slate-900">{st.marksAvg}%</p>
                              <p className="text-[10px] text-slate-400 font-bold">Marks Avg</p>
                            </div>

                            <div>
                              <p className="text-xs font-black text-orange-600 flex items-center gap-0.5 justify-end">
                                <Flame className="w-3 h-3 fill-orange-500" />
                                <span>{st.streak}d</span>
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold">Streak</p>
                            </div>

                            <div>
                              <p className="text-xs font-black text-blue-600">{st.studyHours.toFixed(1)}h</p>
                              <p className="text-[10px] text-slate-400 font-bold">Study</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ============================================================================ */}
      {/* MODAL 1: ADD/EDIT TASK TARGET */}
      {/* ============================================================================ */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">
                {editingTask ? 'Edit Task Target' : 'Add New Task Target'}
              </h3>
              <button
                onClick={() => setShowTaskModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskForm.name}
                  onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
                  placeholder="e.g. Finish DBMS Normalization Assignment"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Subject</label>
                  <input
                    type="text"
                    value={taskForm.subject}
                    onChange={(e) => setTaskForm({ ...taskForm, subject: e.target.value })}
                    placeholder="e.g. DBMS"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Due Date</label>
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black transition-colors cursor-pointer shadow-sm"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================ */}
      {/* MODAL 2: ADD CUSTOM MISSION */}
      {/* ============================================================================ */}
      {showMissionModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">Set Custom Daily Mission</h3>
              <button
                onClick={() => setShowMissionModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMission} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Mission Title</label>
                <input
                  type="text"
                  required
                  value={missionForm.title}
                  onChange={(e) => setMissionForm({ ...missionForm, title: e.target.value })}
                  placeholder="e.g. Solve 3 DSA Problems Today"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Description</label>
                <input
                  type="text"
                  value={missionForm.description}
                  onChange={(e) => setMissionForm({ ...missionForm, description: e.target.value })}
                  placeholder="e.g. Complete Array & String questions"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Target Count</label>
                  <input
                    type="number"
                    min="1"
                    value={missionForm.targetCount}
                    onChange={(e) => setMissionForm({ ...missionForm, targetCount: Math.max(1, Number(e.target.value)) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Gold Reward</label>
                  <input
                    type="number"
                    min="10"
                    value={missionForm.creditReward}
                    onChange={(e) => setMissionForm({ ...missionForm, creditReward: Math.max(10, Number(e.target.value)) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowMissionModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black transition-colors cursor-pointer shadow-sm"
                >
                  Save Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================ */}
      {/* MODAL 3: ENTER EXAM MARKS */}
      {/* ============================================================================ */}
      {showMarkModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">Enter Exam Marks & Result</h3>
              <button
                onClick={() => setShowMarkModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMark} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={markForm.subject}
                    onChange={(e) => setMarkForm({ ...markForm, subject: e.target.value })}
                    placeholder="e.g. DBMS"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Semester</label>
                  <input
                    type="text"
                    value={markForm.semester}
                    onChange={(e) => setMarkForm({ ...markForm, semester: e.target.value })}
                    placeholder="e.g. Semester 4"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Exam Title</label>
                <input
                  type="text"
                  required
                  value={markForm.examTitle}
                  onChange={(e) => setMarkForm({ ...markForm, examTitle: e.target.value })}
                  placeholder="e.g. Mid-Term Theory Exam"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Scored Marks</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={markForm.scoredMarks}
                    onChange={(e) => setMarkForm({ ...markForm, scoredMarks: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Max Marks</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={markForm.maxMarks}
                    onChange={(e) => setMarkForm({ ...markForm, maxMarks: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Exam Date</label>
                <input
                  type="date"
                  value={markForm.examDate}
                  onChange={(e) => setMarkForm({ ...markForm, examDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowMarkModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black transition-colors cursor-pointer shadow-sm"
                >
                  Save Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================ */}
      {/* MODAL 4: ADD CALENDAR EVENT */}
      {/* ============================================================================ */}
      {showEventModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">Add Academic Calendar Event</h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. DBMS End-Sem Exam"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Subject</label>
                  <input
                    type="text"
                    value={eventForm.subject}
                    onChange={(e) => setEventForm({ ...eventForm, subject: e.target.value })}
                    placeholder="e.g. DBMS"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Type</label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Exam">Exam</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Study">Study Session</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Event Date</label>
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black transition-colors cursor-pointer shadow-sm"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
