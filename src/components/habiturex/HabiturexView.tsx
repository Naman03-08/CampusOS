import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Edit2,
  Brain,
  Activity,
  Compass,
  ExternalLink,
  ShieldCheck
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
import { UserProfile, AttendanceSubject, StudentMarkRecord, HabiturexData, GlobalBounty, UserBountySubmission } from '../../types';
import { AttendanceView } from '../attendance/AttendanceView';
import { FirestoreService } from '../../lib/firestoreService';
import { StreakService } from '../../lib/streakService';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

// ----------------------------------------------------------------------------
// HIGH-TECH AI ORBITS & SCANNING RADAR ANIMATION MATRIX FOR HABITUREX
// ----------------------------------------------------------------------------
const HabiturexAIAnimationMatrix: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([0, 2, 4]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => {
        const count = Math.floor(Math.random() * 3) + 2;
        const nodes: number[] = [];
        for (let i = 0; i < count; i++) {
          nodes.push(Math.floor(Math.random() * 6));
        }
        return nodes;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodeLabels = ['Attendance', 'Focus Log', 'Exams', 'Credits', 'Streak', 'Missions'];

  return (
    <div className="relative w-44 h-44 flex items-center justify-center bg-radial from-indigo-500/10 via-transparent to-transparent rounded-full border border-indigo-100/20 shrink-0">
      {/* Dynamic Conic Scanning Radar */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, rgba(99, 102, 241, 0.15) 0deg, rgba(99, 102, 241, 0) 120deg, rgba(99, 102, 241, 0) 360deg)'
        }}
      />

      {/* Orbit Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute w-40 h-40 border border-dashed border-indigo-400/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-28 h-28 border border-dotted border-blue-400/30 rounded-full"
      />

      {/* Core Processor Element */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-indigo-400/20"
      >
        <Brain className="w-6 h-6 text-white animate-pulse" />
      </motion.div>

      {/* Synaptic Orbital Nodes */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 360) / 6;
        const radius = 60;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        const isActive = activeNodes.includes(i);

        return (
          <div
            key={i}
            className="absolute flex flex-col items-center justify-center"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <motion.div
              animate={{
                scale: isActive ? [1, 1.3, 1] : 1,
                backgroundColor: isActive ? '#4F46E5' : '#94A3B8',
                boxShadow: isActive ? '0 0 12px #6366F1, 0 0 4px #4F46E5' : 'none'
              }}
              transition={{ duration: 1.2 }}
              className="w-3 h-3 rounded-full border border-white cursor-pointer relative group"
            >
              {/* Tooltip on Hover */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-[8px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 shadow-sm border border-slate-700">
                {nodeLabels[i]}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

// ----------------------------------------------------------------------------
// INTERACTIVE 3D MOUSE TILT STAT CARD (DASHBOARD HUB)
// ----------------------------------------------------------------------------
interface InteractiveHabitCardProps {
  title: string;
  value: string | number;
  subValue: string;
  subValueColor: string;
  icon: React.ReactNode;
  bgIconClass: string;
}

const InteractiveHabitCard: React.FC<InteractiveHabitCardProps> = ({
  title,
  value,
  subValue,
  subValueColor,
  icon,
  bgIconClass
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / (rect.height / 2)) * 8;
    const rotateY = ((x - centerX) / (rect.width / 2)) * 8;
    setCoords({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: coords.x,
        rotateX: coords.y,
        scale: isHovered ? 1.03 : 1,
        z: isHovered ? 15 : 0
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`p-4 rounded-2xl bg-white border transition-all relative ${
        isHovered
          ? 'border-indigo-300 shadow-[0_12px_28px_-8px_rgba(99,102,241,0.14)] bg-indigo-50/5'
          : 'border-slate-200/80 shadow-2xs'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-1" />

      <div style={{ transform: 'translateZ(15px)' }} className="space-y-2.5 relative">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{title}</span>
          <div className={`w-7.5 h-7.5 rounded-lg ${bgIconClass} flex items-center justify-center shadow-2xs border border-black/5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            {icon}
          </div>
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 tracking-tight leading-none">{value}</p>
          <p className={`text-[10px] font-black mt-1.5 ${subValueColor}`}>{subValue}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------------
// INTERACTIVE 3D MOUSE TILT MISSION CARD (DASHBOARD HUB)
// ----------------------------------------------------------------------------
interface InteractiveMissionCardProps {
  m: DailyMission;
  onClaim: () => void;
  onAddProgress: () => void;
}

const InteractiveMissionCard: React.FC<InteractiveMissionCardProps> = ({
  m,
  onClaim,
  onAddProgress
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / (rect.height / 2)) * 6;
    const rotateY = ((x - centerX) / (rect.width / 2)) * 6;
    setCoords({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const isCompleted = m.currentCount >= m.targetCount || m.completed;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: coords.x,
        rotateX: coords.y,
        scale: isHovered ? 1.02 : 1,
        z: isHovered ? 12 : 0
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`p-4.5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
        isCompleted
          ? 'bg-emerald-50/20 border-emerald-300/80 shadow-xs'
          : isHovered
          ? 'bg-white border-indigo-300 shadow-[0_15px_30px_-10px_rgba(99,102,241,0.12)]'
          : 'bg-[#F9FAFB] border-slate-200/70 shadow-2xs'
      }`}
    >
      <div style={{ transform: 'translateZ(10px)' }} className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-tight flex items-center gap-1.5">
              <span>{m.title}</span>
              {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">{m.description}</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold text-[10px] border border-amber-200/60 shrink-0 shadow-2xs">
            +{m.creditReward} Gold
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between" style={{ transform: 'translateZ(15px)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'}`}
              style={{ width: `${Math.min(100, (m.currentCount / m.targetCount) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-600">
            {m.currentCount} / {m.targetCount}
          </span>
        </div>

        {m.claimed ? (
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-black text-[10px] border border-emerald-200">
            Claimed ✅
          </span>
        ) : isCompleted ? (
          <button
            onClick={onClaim}
            className="px-2.5 py-1 rounded bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[10px] hover:scale-105 transition-all shadow-md cursor-pointer animate-pulse"
          >
            Claim 🎁
          </button>
        ) : (
          <button
            onClick={onAddProgress}
            className="px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/50 font-extrabold text-[10px] cursor-pointer transition-all hover:scale-105"
          >
            + Progress
          </button>
        )}
      </div>
    </motion.div>
  );
};

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
  onSyncUserStats?: () => void;
  initialInnerTab?: 'dashboard' | 'table' | 'attendance' | 'analytics' | 'missions' | 'calendar' | 'leaderboard' | 'bounties';
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
  onSyncUserStats,
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
  const [activeInnerTab, setActiveInnerTab] = useState<'dashboard' | 'table' | 'attendance' | 'analytics' | 'missions' | 'calendar' | 'leaderboard' | 'bounties'>(
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

  // Global Bounties & Proof Submissions State
  const [bountiesList, setBountiesList] = useState<GlobalBounty[]>([]);
  const [loadingBounties, setLoadingBounties] = useState<boolean>(false);
  const [userSubmissionsList, setUserSubmissionsList] = useState<UserBountySubmission[]>([]);

  // Bounties Filter State
  const [bountyCategoryFilter, setBountyCategoryFilter] = useState<string>('All');
  const [bountyDifficultyFilter, setBountyDifficultyFilter] = useState<string>('All');

  // Submit Proof Modal State
  const [selectedBountyForSubmission, setSelectedBountyForSubmission] = useState<GlobalBounty | null>(null);
  const [proofUrl, setProofUrl] = useState<string>('');
  const [proofNotes, setProofNotes] = useState<string>('');
  const [submittingProof, setSubmittingProof] = useState<boolean>(false);
  const [proofFeedback, setProofFeedback] = useState<string | null>(null);

  // Load Bounties and Submissions when user opens 'bounties' tab or on mount
  useEffect(() => {
    async function fetchBountiesData() {
      try {
        setLoadingBounties(true);
        const list = await FirestoreService.getGlobalBounties();
        setBountiesList(list);

        if (user?.uid) {
          const subs = await FirestoreService.getUserSubmissions(user.uid);
          setUserSubmissionsList(subs);
        }
      } catch (err) {
        console.warn("Failed fetching global bounties:", err);
      } finally {
        setLoadingBounties(false);
      }
    }

    fetchBountiesData();
  }, [user?.uid, activeInnerTab]);

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBountyForSubmission || !user?.uid || !proofUrl.trim()) return;

    setSubmittingProof(true);
    try {
      const submission: UserBountySubmission = {
        id: 'sub_' + Date.now(),
        bountyId: selectedBountyForSubmission.id,
        bountyTitle: selectedBountyForSubmission.title,
        userId: user.uid,
        userName: user.displayName || 'Campus Student',
        userEmail: user.email || '',
        proofUrl: proofUrl.trim(),
        notes: proofNotes.trim(),
        submittedAt: new Date().toISOString(),
        status: 'pending',
        rewardCredits: selectedBountyForSubmission.rewardCredits
      };

      await FirestoreService.submitBountyProof(submission);
      setUserSubmissionsList(prev => [submission, ...prev]);

      setProofFeedback(`🎉 Proof for '${selectedBountyForSubmission.title}' submitted! Pending admin review.`);
      setSelectedBountyForSubmission(null);
      setProofUrl('');
      setProofNotes('');
    } catch (err: any) {
      console.error("Proof submission failed:", err);
      setProofFeedback(`Failed to submit proof: ${err.message || err}`);
    } finally {
      setSubmittingProof(false);
    }
  };

  // AI Diagnostics State
  const [showAIDiagnosticsModal, setShowAIDiagnosticsModal] = useState(false);
  const [aiLoading, setAILoading] = useState(false);
  const [aiResult, setAIResult] = useState<{
    score: number;
    tier: string;
    description: string;
    tips: string[];
    gradeForecasts: { subject: string; grade: string; color: string }[];
  } | null>(null);
  const [aiLoadingStep, setAiLoadingStep] = useState(0);

  const triggerAIDiagnostics = () => {
    setShowAIDiagnosticsModal(true);
    setAILoading(true);
    setAiLoadingStep(0);
    setAIResult(null);

    const timer1 = setTimeout(() => setAiLoadingStep(1), 600);
    const timer2 = setTimeout(() => setAiLoadingStep(2), 1200);
    const timer3 = setTimeout(() => setAiLoadingStep(3), 1800);
    const timer4 = setTimeout(() => {
      setAILoading(false);

      const taskDoneCount = tasks.filter(t => t.status === 'Completed' || t.completedToday).length;
      const taskTotal = Math.max(1, tasks.length);
      const taskRatio = taskDoneCount / taskTotal;

      const scoreValue = Math.round(
        (overallAttendancePct * 0.35) + 
        (taskRatio * 25) + 
        (overallMarksPct * 0.25) + 
        (Math.min(10, flameStreak) * 1.5)
      );

      const finalScore = Math.min(100, Math.max(15, scoreValue));

      let tier = 'Rising Dynamo';
      let desc = 'You are starting your academic journey. Establish consistent focus logs and complete pending tasks to climb the campus leaderboard.';
      let tips = [
        'Complete at least 1 task today to keep your streak alive and earn gold credits.',
        'Log a 25-minute study block in the Focus Timer Watch to boost your weekly hours.',
        'Attend upcoming classes to ensure your attendance rate stays comfortably above 75%.'
      ];

      if (finalScore >= 85) {
        tier = 'Dean’s List Legend';
        desc = 'Phenomenal performance! You have exceptional attendance, excellent exam preparation, and stellar task consistency.';
        tips = [
          'Maintain your current elite momentum and continue claiming custom daily mission rewards.',
          'Help peers on the campus leaderboard by hosting study hubs.',
          'Consider attempting critical priority mock tests to secure top tier grade forecasts.'
        ];
      } else if (finalScore >= 70) {
        tier = 'Consistent Scholar';
        desc = 'Splendid consistency. Your study routines are robust and you maintain a healthy balance between classroom attendance and assignments.';
        tips = [
          'Target higher priority tasks to push your preparedness rating beyond 85%.',
          'Use the Focus Timer for consecutive intervals to scale up study hour metrics.',
          'Complete custom daily missions to rapidly multiply your Gold credits.'
        ];
      } else if (finalScore >= 50) {
        tier = 'Capable Workhorse';
        desc = 'Good foundation. You are completing standard milestones but there is clear scope to optimize preparation routines and exam marks average.';
        tips = [
          'Improve your marks average by logging subject-specific marks in the schedule planner.',
          'Light up your active streak flame by completing targets consistently.',
          'Aim to raise overall attendance to unlock top tier performance bonuses.'
        ];
      }

      const gradeForecasts = [
        { subject: 'DBMS', grade: overallMarksPct >= 90 ? 'A+' : overallMarksPct >= 75 ? 'A' : 'B', color: 'text-indigo-600' },
        { subject: 'OS', grade: overallAttendancePct >= 85 ? 'A' : overallAttendancePct >= 70 ? 'B+' : 'B', color: 'text-blue-600' },
        { subject: 'DSA', grade: taskRatio >= 0.8 ? 'A+' : taskRatio >= 0.5 ? 'A' : 'B+', color: 'text-emerald-600' },
        { subject: 'CN', grade: overallMarksPct >= 80 ? 'A' : 'B', color: 'text-purple-600' },
        { subject: 'System Design', grade: flameStreak >= 5 ? 'A+' : 'A', color: 'text-rose-600' }
      ];

      setAIResult({
        score: finalScore,
        tier: tier,
        description: desc,
        tips: tips,
        gradeForecasts: gradeForecasts
      });
    }, 2400);
  };

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
        // Hydrate StreakService from user.stats.dsaStreak if available
        if (typeof user.stats?.dsaStreak === 'number') {
          StreakService.syncStreak(user.stats.dsaStreak, user.stats.lastActiveAt);
        }
        const streakInfo = StreakService.getStreakInfo();
        const currentEvaluatedStreak = streakInfo.streak;

        const habData = await FirestoreService.getHabiturexData(user.uid);
        const userMarks = await FirestoreService.getStudentMarks(user.uid);

        if (isMounted) {
          if (habData) {
            setTasks(habData.tasks || []);
            setMissions(habData.missions || []);
            setEvents(habData.events || []);
            setStudyHoursLog(habData.studyHoursLog || {});
            setCredits(habData.stats?.credits || 0);

            const unifiedStreak = Math.max(habData.stats?.flameStreak || 0, currentEvaluatedStreak, user.stats?.dsaStreak || 0);
            setFlameStreak(unifiedStreak);
            setPerfectDays(habData.stats?.perfectDays || 0);
          } else {
            setFlameStreak(currentEvaluatedStreak);
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
  }, [user?.uid, user?.stats?.dsaStreak]);

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
      const streakInfo = StreakService.getStreakInfo();
      const unifiedStreak = updatedStreak !== undefined ? updatedStreak : streakInfo.streak;

      await FirestoreService.saveHabiturexData(user.uid, {
        tasks: updatedTasks,
        missions: updatedMissions,
        events: updatedEvents,
        studyHoursLog: updatedLog,
        stats: {
          xp: 0,
          credits: updatedCredits,
          flameStreak: unifiedStreak,
          perfectDays
        }
      });

      // Synchronize profile stats in Firestore & local user object so header and habiturex are 100% identical!
      if (user.stats) {
        const updatedProfileStats = {
          ...user.stats,
          dsaStreak: unifiedStreak,
          streakAtRisk: streakInfo.isAtRisk,
          streakCompletedToday: streakInfo.completedToday,
          lastActiveAt: new Date().toISOString()
        };
        await FirestoreService.saveProfile({
          ...user,
          stats: updatedProfileStats
        });
      }

      if (onSyncUserStats) {
        onSyncUserStats();
      }
    } catch (e) {
      console.warn("Error saving Habiturex data:", e);
    }
  };

  // Toggle Task Status & Record Streak
  const handleToggleTask = async (taskId: string) => {
    let isTaskCompleting = false;
    const updated = tasks.map(t => {
      if (t.id !== taskId) return t;
      const isCompleting = !t.completedToday;
      if (isCompleting) {
        isTaskCompleting = true;
      }

      return {
        ...t,
        completedToday: isCompleting,
        status: (isCompleting ? 'Completed' : 'In Progress') as TaskItem['status'],
        progress: isCompleting ? 100 : 50,
        streakDays: isCompleting ? t.streakDays + 1 : Math.max(0, t.streakDays - 1)
      };
    });

    let newStreak = flameStreak;
    if (isTaskCompleting) {
      const streakInfo = StreakService.recordActivity();
      newStreak = streakInfo.streak;
      setFlameStreak(newStreak);
    } else {
      const streakInfo = StreakService.getStreakInfo();
      newStreak = streakInfo.streak;
      setFlameStreak(newStreak);
    }

    setTasks(updated);
    await saveAllToFirestore(updated, missions, events, studyHoursLog, credits, newStreak);
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

    const streakInfo = StreakService.recordActivity();
    const newStreak = streakInfo.streak;
    setFlameStreak(newStreak);

    const newCredits = credits + rewardGranted;
    setCredits(newCredits);
    setMissions(updated);
    saveAllToFirestore(tasks, updated, events, studyHoursLog, newCredits, newStreak);
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
    await FirestoreService.deleteStudentMark(id, user.uid);
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

  // Delete Calendar Event
  const handleDeleteEvent = (id: string) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    saveAllToFirestore(tasks, missions, updated);
  };

  // Load Campus Leaderboard Data from Firestore with real-time updates
  useEffect(() => {
    if (activeInnerTab === 'leaderboard' && db) {
      setLoadingLeaderboard(true);

      // Proactively sync local/latest stats of current user to ensure they are on the leaderboard
      if (user && user.uid) {
        FirestoreService.updateLeaderboardEntry(user.uid).catch(e => console.warn(e));
      }

      const q = query(collection(db, 'leaderboard'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const entries: LeaderboardEntry[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data && data.uid) {
            entries.push({
              uid: data.uid,
              displayName: data.displayName || 'Campus Student',
              university: data.university || 'Engineering Cohort',
              marksAvg: Number(data.marksAvg) || 0,
              tasksCompleted: Number(data.tasksCompleted) || 0,
              streak: Number(data.streak) || 0,
              studyHours: Number(data.studyHours) || 0
            });
          }
        });

        // Sort by highest marks avg, then completed tasks, then streak
        entries.sort((a, b) => b.marksAvg - a.marksAvg || b.tasksCompleted - a.tasksCompleted || b.streak - a.streak);
        setLeaderboardList(entries);
        setLoadingLeaderboard(false);
      }, (error) => {
        console.warn("Real-time leaderboard subscribe error:", error);
        setLoadingLeaderboard(false);
      });

      return () => unsubscribe();
    }
  }, [activeInnerTab, user]);

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

              <button
                onClick={() => setActiveInnerTab('bounties')}
                className={`w-full p-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  activeInnerTab === 'bounties'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-amber-900 bg-amber-50/80 hover:bg-amber-100 hover:text-amber-950 border border-amber-200/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  {!innerSidebarCollapsed && <span>Gold Quest Arena</span>}
                </div>
                {!innerSidebarCollapsed && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-black text-[10px] flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                    <span>Earn Gold</span>
                  </span>
                )}
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
              <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-50/90 via-blue-50/80 to-slate-100/90 text-slate-900 shadow-xs relative overflow-hidden border border-indigo-200/80">
                {/* Background high-tech grids and circles */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-4 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-extrabold text-[10px] tracking-wider uppercase border border-indigo-200 backdrop-blur-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-600 animate-pulse" />
                        <span>AI-POWERED HABITUREX SYSTEM</span>
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <h2 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
                        Welcome to your Synaptic Space, {user?.displayName || 'Student'}
                      </h2>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Track focus sessions, complete active targets to keep your streak alive, and deploy real-time academic analytics diagnostics.
                      </p>
                    </div>

                    <div className="pt-1 flex flex-wrap gap-2.5">
                      <button
                        onClick={triggerAIDiagnostics}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer group"
                      >
                        <Brain className="w-4 h-4 text-indigo-100 group-hover:animate-bounce" />
                        <span>Ask AI Academic Coach</span>
                        <Sparkles className="w-3 h-3 text-indigo-200 animate-pulse" />
                      </button>
                    </div>
                  </div>

                  {/* Gorgeous high-tech AI animation matrix */}
                  <div className="hidden md:flex items-center justify-center pr-4">
                    <HabiturexAIAnimationMatrix />
                  </div>
                </div>
              </div>

              {/* 8 Stat KPI Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                
                {/* 1. Attendance Rate */}
                <InteractiveHabitCard
                  title="Attendance Rate"
                  value={`${overallAttendancePct}%`}
                  subValue="Target ≥75%"
                  subValueColor="text-emerald-600"
                  icon={<CheckSquare className="w-4 h-4 text-emerald-600" />}
                  bgIconClass="bg-emerald-50"
                />

                {/* 2. Active Tasks */}
                <InteractiveHabitCard
                  title="Active Tasks"
                  value={`${tasks.length} Total`}
                  subValue={`${tasks.filter(t => t.status !== 'Completed').length} Pending`}
                  subValueColor="text-blue-600"
                  icon={<FileText className="w-4 h-4 text-blue-600" />}
                  bgIconClass="bg-blue-50"
                />

                {/* 3. Completed Tasks */}
                <InteractiveHabitCard
                  title="Completed Tasks"
                  value={`${tasks.filter(t => t.status === 'Completed' || t.completedToday).length} Done`}
                  subValue="Streak Active"
                  subValueColor="text-indigo-600"
                  icon={<CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  bgIconClass="bg-indigo-50"
                />

                {/* 4. Total Focus Hours */}
                <InteractiveHabitCard
                  title="Focus Hours"
                  value={`${Object.values(studyHoursLog).reduce<number>((a, b) => a + Number(b), 0).toFixed(1)} hrs`}
                  subValue="Logged Total"
                  subValueColor="text-purple-600"
                  icon={<Clock className="w-4 h-4 text-purple-600" />}
                  bgIconClass="bg-purple-50"
                />

                {/* 5. Exam Marks Avg */}
                <InteractiveHabitCard
                  title="Exam Marks Avg"
                  value={`${overallMarksPct}%`}
                  subValue={`EST. CGPA: ${estimatedCGPA}`}
                  subValueColor="text-amber-600"
                  icon={<GraduationCap className="w-4 h-4 text-amber-600" />}
                  bgIconClass="bg-amber-50"
                />

                {/* 6. Gold Credits */}
                <InteractiveHabitCard
                  title="Gold Credits"
                  value={credits}
                  subValue="Redeem Rewards"
                  subValueColor="text-amber-600"
                  icon={<Award className="w-4 h-4 text-amber-600" />}
                  bgIconClass="bg-amber-100"
                />

                {/* 7. Upcoming Exams */}
                <InteractiveHabitCard
                  title="Upcoming Exams"
                  value={`${events.filter(e => e.type === 'Exam').length} Scheduled`}
                  subValue="Calendar Active"
                  subValueColor="text-rose-600"
                  icon={<AlertCircle className="w-4 h-4 text-rose-600" />}
                  bgIconClass="bg-rose-50"
                />

                {/* 8. Flame Streak */}
                <InteractiveHabitCard
                  title="Daily Streak"
                  value={`${flameStreak} Days`}
                  subValue="Task Streak"
                  subValueColor="text-orange-600"
                  icon={<Flame className="w-4 h-4 text-orange-500 fill-orange-500" />}
                  bgIconClass="bg-orange-50"
                />

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
                      return (
                        <InteractiveMissionCard
                          key={m.id}
                          m={m}
                          onClaim={() => handleClaimMission(m.id)}
                          onAddProgress={() => {
                            const updatedMissions = missions.map(ms => ms.id === m.id ? { ...ms, currentCount: ms.currentCount + 1, completed: ms.currentCount + 1 >= ms.targetCount } : ms);
                            setMissions(updatedMissions);
                            saveAllToFirestore(tasks, updatedMissions);
                          }}
                        />
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
                  {events.length === 0 ? (
                    <div className="col-span-full py-8 text-center text-slate-400 text-xs font-semibold">
                      No schedule events added yet. Click "Add Event" above to create one!
                    </div>
                  ) : (
                    events.map(e => (
                      <div key={e.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2 relative group hover:border-slate-300 transition-all">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${e.color}`}>
                            {e.type}
                          </span>
                          <button
                            onClick={() => handleDeleteEvent(e.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Schedule Event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-xs font-black text-slate-900">{e.title}</h4>
                        <p className="text-[10px] font-bold text-slate-500">Date: {e.date}</p>
                        <p className="text-[10px] font-bold text-blue-600">Subject: {e.subject}</p>
                      </div>
                    ))
                  )}
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

          {/* ============================================================================ */}
          {/* TAB 8: GOLD QUEST ARENA (EARN GOLD CREDITS) */}
          {/* ============================================================================ */}
          {activeInnerTab === 'bounties' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Gold Hero Banner */}
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-50/90 to-orange-50/60 text-slate-900 border border-amber-300 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Admin Published Gold Bounties</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      Gold Quest Arena & Bounties
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                      Complete rigorous, high-difficulty engineering tasks published by Campus OS administrators to earn high-tier <strong className="text-amber-800">Gold Credits</strong>, rise on the global leaderboard, and unlock verified tech badges!
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/80 border border-amber-200/80 backdrop-blur-md shrink-0 flex items-center gap-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shadow-amber-500/20">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-amber-800 tracking-wider">Your Balance</p>
                      <p className="text-2xl font-black text-amber-900 font-mono">{credits} GOLD</p>
                      <p className="text-[10px] font-semibold text-slate-500">Ready for Redemption</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Banner if submitted */}
              {proofFeedback && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
                  <span>{proofFeedback}</span>
                  <button onClick={() => setProofFeedback(null)} className="p-1 hover:text-emerald-950 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Category & Difficulty Filter Bar */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 mr-1">Category:</span>
                  {['All', 'DSA & Algorithmic', 'Full-Stack & AI', 'Cloud & Systems', 'Cybersecurity', 'Research & Dev'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setBountyCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                        bountyCategoryFilter === cat
                          ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400">Difficulty:</span>
                  <select
                    value={bountyDifficultyFilter}
                    onChange={(e) => setBountyDifficultyFilter(e.target.value)}
                    className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  >
                    <option value="All">All Difficulties</option>
                    <option value="Hard">Hard (300-500 Gold)</option>
                    <option value="Extreme">Extreme (600-900 Gold)</option>
                    <option value="Legendary">Legendary (1000+ Gold)</option>
                  </select>
                </div>
              </div>

              {/* Bounties Grid */}
              {loadingBounties ? (
                <div className="py-16 text-center text-slate-400 font-bold text-xs animate-pulse">
                  Fetching published Gold Bounties from Campus OS Admin Hub...
                </div>
              ) : bountiesList.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-slate-200 space-y-3">
                  <Award className="w-10 h-10 text-amber-400 mx-auto opacity-60" />
                  <h3 className="text-sm font-black text-slate-800">No Active Bounties Found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Admins have not published any Gold Bounties yet or your current filters yielded no results. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bountiesList
                    .filter(b => bountyCategoryFilter === 'All' || b.category === bountyCategoryFilter)
                    .filter(b => bountyDifficultyFilter === 'All' || b.difficulty === bountyDifficultyFilter)
                    .map(bounty => {
                      const userSub = userSubmissionsList.find(s => s.bountyId === bounty.id);
                      const isApproved = userSub?.status === 'approved';
                      const isPending = userSub?.status === 'pending';
                      const isRejected = userSub?.status === 'rejected';

                      const isLegendary = bounty.difficulty === 'Legendary';
                      const isExtreme = bounty.difficulty === 'Extreme';

                      return (
                        <div
                          key={bounty.id}
                          className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-4 relative ${
                            isApproved
                              ? 'bg-emerald-50/40 border-emerald-300/80 shadow-xs'
                              : isLegendary
                              ? 'bg-gradient-to-b from-purple-50/50 to-amber-50/30 border-purple-200 shadow-sm hover:shadow-md'
                              : 'bg-white border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-md'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[10px] border border-slate-200/60">
                                  {bounty.category}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                                  isLegendary ? 'bg-purple-100 text-purple-900 border-purple-300' :
                                  isExtreme ? 'bg-orange-100 text-orange-900 border-orange-300' :
                                  'bg-amber-100 text-amber-900 border-amber-300'
                                }`}>
                                  {bounty.difficulty}
                                </span>
                              </div>

                              <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-xs border border-amber-300 flex items-center gap-1 shrink-0">
                                <Sparkles className="w-3 h-3 text-slate-950" />
                                <span>+{bounty.rewardCredits} GOLD</span>
                              </span>
                            </div>

                            <div>
                              <h3 className="text-base font-black text-slate-900 leading-snug">{bounty.title}</h3>
                              <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1.5">{bounty.description}</p>
                            </div>

                            {/* Deliverables Checklist */}
                            {bounty.deliverables && bounty.deliverables.length > 0 && (
                              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Required Deliverables Proof:</p>
                                <ul className="space-y-1">
                                  {bounty.deliverables.map((deliv, idx) => (
                                    <li key={idx} className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                                      <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                                      <span>{deliv}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Submission Footer Actions */}
                          <div className="pt-2 border-t border-slate-100">
                            {isApproved ? (
                              <div className="p-3 rounded-2xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 font-black text-xs flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                  <span>Challenge Completed & Verified!</span>
                                </span>
                                <span className="text-[11px] bg-emerald-600 text-white px-2 py-0.5 rounded-lg">+ {bounty.rewardCredits} Gold Credited</span>
                              </div>
                            ) : isPending ? (
                              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 font-bold text-xs flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-blue-600 animate-spin" />
                                  <span>Proof Submitted (Pending Admin Verification)</span>
                                </span>
                                {userSub?.proofUrl && (
                                  <a href={userSub.proofUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-[11px] flex items-center gap-0.5 font-bold">
                                    <span>Link</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {isRejected && (
                                  <p className="text-[11px] font-bold text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200">
                                    ⚠️ Previous proof was rejected. You can resubmit revised proof below!
                                  </p>
                                )}
                                <button
                                  onClick={() => {
                                    setSelectedBountyForSubmission(bounty);
                                    setProofUrl('');
                                    setProofNotes('');
                                  }}
                                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
                                >
                                  <Zap className="w-4 h-4 text-amber-400" />
                                  <span>Attempt Challenge & Submit Deliverables</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
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

      {/* ============================================================================ */}
      {/* MODAL 5: AI ACADEMIC DIAGNOSTICS & COACH */}
      {/* ============================================================================ */}
      {showAIDiagnosticsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-100 pb-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                  <Brain className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight text-slate-900 uppercase">AI Academic Coach & Advisor</h3>
                  <p className="text-[10px] text-slate-500 font-semibold">Real-Time Cognitive Diagnostics</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIDiagnosticsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {aiLoading ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-6 relative z-10">
                {/* Custom animated radar scanner */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Outer breathing ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-300 animate-ping" />
                  {/* Middle rotating dashed ring */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-indigo-400/60 animate-[spin_8s_linear_infinite]" />
                  {/* Inner glowing dot */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 relative">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="text-center space-y-1.5 max-w-xs">
                  <p className="text-sm font-black text-slate-900 tracking-tight animate-pulse">
                    {aiLoadingStep === 0 && 'Connecting to Cognitive Core...'}
                    {aiLoadingStep === 1 && 'Ingesting active attendance streams...'}
                    {aiLoadingStep === 2 && 'Calibrating streak trajectories...'}
                    {aiLoadingStep === 3 && 'Generating grade forecasts & advising...'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold">
                    Telemetry is calculated relative to your real-time academic logs.
                  </p>
                </div>
              </div>
            ) : aiResult ? (
              <div className="space-y-5 relative z-10 text-xs animate-in slide-in-from-bottom-3 duration-300">
                {/* Metric circular summary */}
                <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex items-center gap-4">
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center bg-white rounded-full border border-indigo-200 shadow-2xs">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        className="stroke-slate-200"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        className="stroke-indigo-600"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={2 * Math.PI * 28 * (1 - aiResult.score / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-sm font-black text-indigo-950">{aiResult.score}</span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-1.5 items-center mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-900 font-extrabold text-[9px] tracking-wide uppercase border border-indigo-200">
                        {aiResult.tier}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-slate-900">Synaptic Academic Index</h4>
                    <p className="text-[10px] text-slate-600 font-medium leading-relaxed mt-0.5">{aiResult.description}</p>
                  </div>
                </div>

                {/* Subject Grade Forecasts */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-black uppercase text-indigo-700 tracking-wider">Semester Grade Forecasts</h5>
                  <div className="grid grid-cols-5 gap-2">
                    {aiResult.gradeForecasts.map((f, i) => (
                      <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <p className="text-[9px] font-bold text-slate-500 truncate">{f.subject}</p>
                        <p className={`text-xs font-black ${f.color} mt-0.5`}>{f.grade}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Coaching Tips */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-black uppercase text-indigo-700 tracking-wider">Dynamic Coaching Prescriptions</h5>
                  <div className="space-y-1.5">
                    {aiResult.tips.map((t, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex gap-2.5 items-start">
                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex">
                  <button
                    type="button"
                    onClick={() => setShowAIDiagnosticsModal(false)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black transition-all cursor-pointer text-center hover:scale-102 shadow-sm"
                  >
                    Close Diagnostics
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* ============================================================================ */}
      {/* MODAL 6: SUBMIT BOUNTY PROOF */}
      {/* ============================================================================ */}
      {selectedBountyForSubmission && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">Gold Quest Submission</span>
                <h3 className="text-sm font-black text-slate-900">{selectedBountyForSubmission.title}</h3>
              </div>
              <button
                onClick={() => setSelectedBountyForSubmission(null)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 font-medium space-y-1">
              <p className="font-black text-amber-950 flex items-center justify-between">
                <span>Reward Pool:</span>
                <span className="text-amber-700 font-mono font-bold">+{selectedBountyForSubmission.rewardCredits} GOLD</span>
              </p>
              <p className="text-[11px] text-amber-800">{selectedBountyForSubmission.description}</p>
            </div>

            <form onSubmit={handleSubmitProof} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                  Deliverable Proof Link (GitHub Repo / Live URL / Drive / Writeup) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  placeholder="https://github.com/username/project-repo"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                  Technical Explanation & Implementation Notes
                </label>
                <textarea
                  rows={3}
                  value={proofNotes}
                  onChange={(e) => setProofNotes(e.target.value)}
                  placeholder="Describe how you solved this challenge, architectural choices, or test steps..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBountyForSubmission(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingProof}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  {submittingProof ? 'Submitting...' : 'Submit Proof to Admins'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
