import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Database, 
  Users, 
  Activity, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ShieldCheck,
  RefreshCw,
  Search,
  BookOpen,
  Code2,
  FileCheck,
  Briefcase,
  GraduationCap,
  Calendar,
  X,
  ExternalLink,
  Clock,
  Sparkles,
  BarChart3,
  Award
} from 'lucide-react';
import { UserProfile } from '../../types';
import { FirestoreService, UserFullData } from '../../lib/firestoreService';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { calculatePlanDetails } from '../../lib/planUtils';

interface AdminPanelViewProps {
  user?: UserProfile;
  onNavigateTab?: (tab: string) => void;
}

const ADMIN_EMAIL = 'naman03mgs@gmail.com';
const SECURITY_KEY = 'Naman@#2008';

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ user, onNavigateTab }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('campusos_admin_unlocked') === 'true';
  });
  const [securityInput, setSecurityInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);

  // Firestore Data State for Admin Monitoring
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUserUid, setSelectedUserUid] = useState<string | null>(null);
  const [inspectData, setInspectData] = useState<UserFullData | null>(null);
  const [loadingInspect, setLoadingInspect] = useState<boolean>(false);
  const [inspectTab, setInspectTab] = useState<'attendance' | 'dsa' | 'assignments' | 'suites' | 'mock'>('attendance');

  const currentUserEmail = user?.email?.trim().toLowerCase() || '';
  const isAuthorizedEmail = currentUserEmail === ADMIN_EMAIL;

  // Load all users from Firestore when unlocked
  const fetchAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const usersList = await FirestoreService.getAllUsers();
      
      // If Firestore users collection is empty or only includes admin, ensure current user profile is present
      if (usersList.length === 0 && user) {
        setAllUsers([user]);
      } else {
        setAllUsers(usersList);
      }
    } catch (e) {
      console.warn("Failed to fetch admin user list:", e);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (isUnlocked && isAuthorizedEmail) {
      fetchAllUsers();
    }
  }, [isUnlocked, isAuthorizedEmail]);

  // Unlock Admin Security Key
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (securityInput === SECURITY_KEY) {
      setIsUnlocked(true);
      sessionStorage.setItem('campusos_admin_unlocked', 'true');
      setSecurityInput('');
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Security Key. Access Denied!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleLockPanel = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('campusos_admin_unlocked');
    setSecurityInput('');
    setErrorMsg('');
  };

  // Inspect student detailed progress
  const handleInspectUser = async (studentUid: string) => {
    setSelectedUserUid(studentUid);
    setLoadingInspect(true);
    try {
      const data = await FirestoreService.getUserFullData(studentUid);
      setInspectData(data);
    } catch (e) {
      console.warn("Error fetching student full data:", e);
    } finally {
      setLoadingInspect(false);
    }
  };

  // Case 1: Signed in with an unauthorized email address
  if (!isAuthorizedEmail) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-2xl border border-red-200 rounded-3xl p-8 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900">Restricted Admin Access</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              The Admin Panel is strictly locked and exclusive to authorized administrator <code className="bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">{ADMIN_EMAIL}</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-1">
            <p className="font-bold text-slate-700">Current Logged-in Account:</p>
            <p className="font-mono text-slate-600 truncate">{user?.email || 'Guest / Unauthenticated'}</p>
          </div>

          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </div>
    );
  }

  // Case 2: Authorized user (naman03mgs@gmail.com) but Security Key is Locked
  if (!isUnlocked) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className={`max-w-md w-full bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all ${shake ? 'animate-bounce' : ''}`}>
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="text-center space-y-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20">
              <Lock className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin Key Verification Required</span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Security Lock</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Welcome <span className="font-bold text-slate-700">{ADMIN_EMAIL}</span>. Please enter your secret security key to unlock real-time user monitoring & telemetry.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Security Key
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showKey ? 'text' : 'password'}
                  required
                  value={securityInput}
                  onChange={(e) => {
                    setSecurityInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter Security Key..."
                  className="w-full pl-10 pr-10 py-3 text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-mono tracking-wider transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  title={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Protected by CampusOS AI Zero-Trust Lock
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Aggregated Metrics from User Profiles
  const totalStudents = allUsers.length;
  const totalDsaSolvedAcrossUsers = allUsers.reduce((sum, u) => sum + (u.stats?.dsaSolvedCount || 0), 0);
  const totalSuitesAcrossUsers = allUsers.reduce((sum, u) => sum + (u.stats?.studySuitesCount || 0), 0);
  const totalAssignmentsSolvedAcrossUsers = allUsers.reduce((sum, u) => sum + (u.stats?.assignmentsSolvedCount || 0), 0);
  const avgAttendanceAcrossPlatform = totalStudents > 0 
    ? Math.round(allUsers.reduce((sum, u) => sum + (u.stats?.attendancePercentage || 0), 0) / totalStudents)
    : 0;

  // Filter Users
  const filteredUsers = allUsers.filter(u => 
    u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.major && u.major.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="Admin Control & Real-time Platform Monitoring"
        subtitle="Exclusive management portal for platform admin (naman03mgs@gmail.com)"
        purpose="This section is used by the system administrator to monitor platform activity, aggregate student engagement metrics, inspect registered student profiles, and audit individual student progress across attendance, DSA problems, assignments, study suites, and mock interviews."
        keyFeatures={[
          'Live Registered Student Directory',
          'Platform-Wide Aggregate Telemetry (Total DSA, Attendance %, Suites)',
          'Deep Progress Inspector per Student',
          'Zero-Trust Security Key Unlock Protection'
        ]}
        icon={<ShieldAlert className="w-6 h-6 text-white" />}
        badge="Admin Control Purpose"
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">Admin Control & Real-time User Monitoring</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Connected
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Logged in as <strong className="text-slate-800">{ADMIN_EMAIL}</strong> • Live synchronization with Firestore user directory.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={fetchAllUsers}
            disabled={loadingUsers}
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
            <span>Refresh Firestore Data</span>
          </button>

          <button
            onClick={handleLockPanel}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5 transition-colors"
            title="Lock Admin Panel"
          >
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Lock Panel</span>
          </button>
        </div>
      </div>

      {/* Global Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <p className="text-xs font-bold uppercase tracking-wider">Registered Users</p>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{totalStudents}</p>
          <p className="text-[11px] font-semibold text-emerald-600">Active Firestore Sync</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <p className="text-xs font-bold uppercase tracking-wider">Avg Platform Attendance</p>
            <GraduationCap className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-emerald-600">{avgAttendanceAcrossPlatform}%</p>
          <p className="text-[11px] font-semibold text-slate-400">Calculated across all students</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <p className="text-xs font-bold uppercase tracking-wider">Total DSA Solved</p>
            <Code2 className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-black text-indigo-600">{totalDsaSolvedAcrossUsers}</p>
          <p className="text-[11px] font-semibold text-slate-400">Problems completed</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <p className="text-xs font-bold uppercase tracking-wider">AI Study Suites</p>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-black text-purple-600">{totalSuitesAcrossUsers}</p>
          <p className="text-[11px] font-semibold text-slate-400">Suites generated</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <p className="text-xs font-bold uppercase tracking-wider">Assignments Solved</p>
            <FileCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-amber-600">{totalAssignmentsSolvedAcrossUsers}</p>
          <p className="text-[11px] font-semibold text-slate-400">Solves submitted</p>
        </div>
      </div>

      {/* User Search & Monitoring Directory */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Registered User Directory & Real-time Progress Tracker
            </h2>
            <p className="text-xs text-slate-500">
              Inspect student attendance, DSA coding solves, AI study suites, and mock interview performance.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user name or email..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {loadingUsers ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500" />
            <p className="text-xs font-semibold">Loading registered users from Firestore...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Users className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-bold text-slate-600">No matching user records found</p>
            <p className="text-[11px]">When new users register, their progress and telemetry will appear here instantly.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="py-3 px-4">Student Profile</th>
                  <th className="py-3 px-4">Active Plan & Expiry</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">DSA Solved</th>
                  <th className="py-3 px-4">Assignments</th>
                  <th className="py-3 px-4">Study Suites</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredUsers.map((student) => {
                  const planDetails = calculatePlanDetails(student);
                  const stats = student.stats || {
                    attendancePercentage: 0,
                    totalClassesAttended: 0,
                    totalClassesHeld: 0,
                    dsaSolvedCount: 0,
                    dsaTotalCount: 6,
                    assignmentsSolvedCount: 0,
                    studySuitesCount: 0,
                    mockInterviewsCount: 0,
                    avgMockInterviewScore: 0,
                    lastActiveAt: student.createdAt,
                  };

                  const isNewZeroUser = stats.attendancePercentage === 0 && stats.dsaSolvedCount === 0 && stats.studySuitesCount === 0 && stats.assignmentsSolvedCount === 0;

                  return (
                    <tr key={student.uid} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                            {student.displayName ? student.displayName.charAt(0).toUpperCase() : 'S'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                              <span>{student.displayName || 'Unnamed Student'}</span>
                              {student.email.trim().toLowerCase() === ADMIN_EMAIL && (
                                <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 text-[10px] font-extrabold uppercase">
                                  Admin
                                </span>
                              )}
                              {isNewZeroUser && student.email.trim().toLowerCase() !== ADMIN_EMAIL && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                                  0 Baseline
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono truncate">{student.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Plan & Remaining Days Column */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              planDetails.currentPlanId === 'plan_349'
                                ? 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                                : planDetails.currentPlanId === 'plan_199'
                                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                            }`}>
                              {planDetails.planName}
                            </span>

                            <span className={`px-2 py-0.5 rounded text-[10px] font-black flex items-center gap-1 ${
                              planDetails.isExpired 
                                ? 'bg-red-100 text-red-800 border border-red-200' 
                                : 'bg-slate-900 text-white'
                            }`}>
                              <Clock className="w-3 h-3" />
                              {planDetails.isExpired ? 'Expired' : `${planDetails.daysRemaining} Days Left`}
                            </span>
                          </div>

                          <p className="text-[10px] text-slate-400 font-medium">
                            Expires: <span className="font-mono text-slate-700 font-bold">{planDetails.formattedExpiresAt}</span>
                          </p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1 w-28">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className={stats.attendancePercentage >= 75 ? 'text-emerald-600' : 'text-amber-600'}>
                              {stats.attendancePercentage}%
                            </span>
                            <span className="text-slate-400 font-normal">
                              {stats.totalClassesAttended}/{stats.totalClassesHeld}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${stats.attendancePercentage >= 75 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                              style={{ width: `${Math.min(100, stats.attendancePercentage)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-100">
                          <Code2 className="w-3 h-3 text-indigo-500" />
                          <span>{stats.dsaSolvedCount} / {stats.dsaTotalCount || 6}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-xs border border-amber-100">
                          <FileCheck className="w-3 h-3 text-amber-500" />
                          <span>{stats.assignmentsSolvedCount} solved</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs border border-purple-100">
                          <BookOpen className="w-3 h-3 text-purple-500" />
                          <span>{stats.studySuitesCount} suites</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[11px] text-slate-400 font-mono">
                        {stats.lastActiveAt ? new Date(stats.lastActiveAt).toLocaleDateString() : 'Just now'}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleInspectUser(student.uid)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Progress</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Deep Inspection Drawer / Modal */}
      {selectedUserUid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-lg">
                  {inspectData?.profile.displayName ? inspectData.profile.displayName.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>{inspectData?.profile.displayName || 'Loading Student...'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                      {inspectData?.profile.email}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {inspectData?.profile.university || 'Campus Student'} • {inspectData?.profile.major || 'Computer Science'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedUserUid(null);
                  setInspectData(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            {loadingInspect ? (
              <div className="p-12 text-center space-y-2">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                <p className="text-xs font-semibold text-slate-500">Fetching complete student activity logs from Firestore...</p>
              </div>
            ) : !inspectData ? (
              <div className="p-8 text-center text-slate-400">Failed to load student telemetry.</div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Student Plan Status Banner */}
                {(() => {
                  const pDetails = calculatePlanDetails(inspectData.profile);
                  return (
                    <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase text-blue-400 tracking-wider">Subscription Plan Status</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            pDetails.currentPlanId === 'plan_349' ? 'bg-indigo-500 text-white' : pDetails.currentPlanId === 'plan_199' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'
                          }`}>
                            {pDetails.planName}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-300 mt-0.5">
                          Started: <strong className="text-white">{pDetails.formattedStartedAt}</strong> • Valid Until: <strong className="text-white">{pDetails.formattedExpiresAt}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                          pDetails.isExpired ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                        }`}>
                          <Clock className="w-3.5 h-3.5" />
                          <span>{pDetails.isExpired ? 'Plan Expired' : `${pDetails.daysRemaining} Days Remaining`}</span>
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <button
                    onClick={() => setInspectTab('attendance')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${inspectTab === 'attendance' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Attendance ({inspectData.attendance.length})</span>
                  </button>

                  <button
                    onClick={() => setInspectTab('dsa')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${inspectTab === 'dsa' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>DSA Solved ({inspectData.dsa.filter(d => d.solved).length}/{inspectData.dsa.length})</span>
                  </button>

                  <button
                    onClick={() => setInspectTab('assignments')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${inspectTab === 'assignments' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Assignments ({inspectData.assignments.length})</span>
                  </button>

                  <button
                    onClick={() => setInspectTab('suites')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${inspectTab === 'suites' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Study Suites ({inspectData.studySuites.length})</span>
                  </button>

                  <button
                    onClick={() => setInspectTab('mock')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${inspectTab === 'mock' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Mock Interviews ({inspectData.mockInterviews.length})</span>
                  </button>
                </div>

                {/* Tab Panel 1: Attendance */}
                {inspectTab === 'attendance' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Attendance Breakdown by Subject</h4>
                    {inspectData.attendance.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No attendance records logged yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {inspectData.attendance.map((sub) => {
                          const pct = sub.totalClasses > 0 ? Math.round((sub.attendedClasses / sub.totalClasses) * 100) : 0;
                          return (
                            <div key={sub.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-slate-900">{sub.code}: {sub.name}</span>
                                <span className={`font-extrabold text-xs ${pct >= sub.targetPercentage ? 'text-emerald-600' : 'text-amber-600'}`}>
                                  {pct}%
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500">
                                Attended: <strong className="text-slate-800">{sub.attendedClasses}</strong> / {sub.totalClasses} total classes held
                              </p>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(100, pct)}%` }}></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Panel 2: DSA Problems */}
                {inspectTab === 'dsa' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Coding & DSA Solve Log</h4>
                    <div className="space-y-2">
                      {inspectData.dsa.map((p) => (
                        <div key={p.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${p.solved ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                            <span className="font-bold text-slate-800">{p.title}</span>
                            <span className="px-2 py-0.5 rounded bg-slate-200/80 text-[10px] text-slate-600 font-bold">{p.category}</span>
                            <span className={`text-[10px] font-bold ${p.difficulty === 'Easy' ? 'text-emerald-600' : p.difficulty === 'Medium' ? 'text-amber-600' : 'text-red-600'}`}>
                              {p.difficulty}
                            </span>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${p.solved ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                            {p.solved ? 'Solved' : 'Unsolved'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Panel 3: Assignments */}
                {inspectTab === 'assignments' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Assignments Log</h4>
                    {inspectData.assignments.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No assignments uploaded yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {inspectData.assignments.map((asg) => (
                          <div key={asg.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 text-sm">{asg.title} ({asg.subject})</span>
                              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${asg.status === 'solved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                {asg.status}
                              </span>
                            </div>
                            <p className="text-slate-600 italic">"{asg.questionText}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Panel 4: Study Suites */}
                {inspectTab === 'suites' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">AI Study Suites Generated</h4>
                    {inspectData.studySuites.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No study suites generated yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {inspectData.studySuites.map((suite) => (
                          <div key={suite.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                            <span className="font-bold text-slate-900 text-sm block">{suite.title}</span>
                            <span className="text-[11px] font-bold text-purple-600 block">{suite.subject}</span>
                            <p className="text-slate-500 line-clamp-2 mt-1">{suite.summary}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Panel 5: Mock Interviews */}
                {inspectTab === 'mock' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Mock Interview Results</h4>
                    {inspectData.mockInterviews.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No mock interviews completed yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {inspectData.mockInterviews.map((m) => (
                          <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">{m.targetRole} • {m.topic}</span>
                              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                                Overall Score: {m.overallScore}/100
                              </span>
                            </div>
                            <p className="text-slate-700 font-semibold">Q: {m.question}</p>
                            <p className="text-slate-500 italic">User Answer: "{m.userAnswerText}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
