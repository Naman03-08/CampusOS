import React from 'react';
import { 
  Bot, 
  Flame, 
  CheckSquare, 
  Calendar, 
  Code2, 
  Briefcase, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Plus, 
  Award, 
  TrendingUp, 
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';
import { UserProfile, AttendanceSubject, ScheduleEvent, DSAProblem, StudySuite, AssignmentItem } from '../../types';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { calculatePlanDetails } from '../../lib/planUtils';
import { StreakService } from '../../lib/streakService';

interface DashboardViewProps {
  user: UserProfile;
  attendance: AttendanceSubject[];
  schedule: ScheduleEvent[];
  dsa: DSAProblem[];
  studySuites: StudySuite[];
  assignments: AssignmentItem[];
  onNavigateTab: (tab: string) => void;
  onOpenStudyHubUpload: () => void;
  onStartTrial?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  attendance,
  schedule,
  dsa,
  studySuites,
  assignments,
  onNavigateTab,
  onOpenStudyHubUpload,
  onStartTrial
}) => {
  const planDetails = calculatePlanDetails(user);

  // Calculate statistics
  const totalClasses = attendance.reduce((acc, a) => acc + a.totalClasses, 0);
  const totalAttended = attendance.reduce((acc, a) => acc + a.attendedClasses, 0);
  const overallAttendance = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 85;

  const solvedDSA = dsa.filter(d => d.solved).length;
  const totalDSA = dsa.length;
  const dsaProgressPct = Math.round((solvedDSA / totalDSA) * 100);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEvents = schedule.filter(s => s.date === todayStr);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="Command Dashboard & Telemetry Central"
        subtitle="Your personalized AI-powered academic command center"
        purpose="This Dashboard section serves as your primary academic hub. It aggregates real-time attendance statistics, active study material suites, upcoming assignment deadlines, DSA problem-solving progress, and quick action shortcuts into a single view."
        keyFeatures={[
          'Real-time Academic Health Overview',
          'Quick AI Notes & PDF Study Suite Generator',
          'Instant Class Attendance Tracker',
          'DSA Problem Solving Progress Meter',
          'Upcoming Class & Assignment Schedule'
        ]}
        icon={<Bot className="w-6 h-6 text-white" />}
        badge="Main Dashboard Overview"
      />

      {/* Trial Inactive Banner */}
      {!planDetails.hasActiveAccess && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-500/40 card-3d">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0 mt-0.5 shadow-3d-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950 shadow-2xs">
                  {planDetails.isExpired ? 'Plan Expired' : 'Free Trial Ready'}
                </span>
              </div>
              <h3 className="text-base font-black text-white mt-1">
                {planDetails.isExpired ? 'Your Subscription Plan Has Expired' : 'Start Your 4-Day Free Trial (₹0) to Unlock All Features'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
                {planDetails.isExpired 
                  ? 'Please upgrade to Pro Scholar (₹199) or Campus Pro Ultimate (₹349) to continue using AI tools.'
                  : 'You are currently browsing in website preview mode. Activate your 4-day free trial whenever you are ready!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {!planDetails.freeTrialUsed && onStartTrial && (
              <button
                onClick={onStartTrial}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md btn-3d-emerald flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Start 4-Day Free Trial</span>
              </button>
            )}
            <button
              onClick={() => onNavigateTab('pricing')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md btn-3d-blue flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Upgrade to Pro Plan</span>
            </button>
          </div>
        </div>
      )}

      {/* Red Streak Risk Warning Banner */}
      {user.stats?.streakAtRisk && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse border-2 border-red-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 shrink-0">
              <Flame className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-wide text-white flex items-center gap-2">
                ⚠️ STREAK AT RISK! ({user.stats?.dsaStreak || 1} Day Streak)
              </h3>
              <p className="text-xs text-red-100 font-medium mt-0.5">
                You haven't completed any activity today. Complete at least 1 coding question, assignment, or course topic today or your streak will break tomorrow!
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('coding')}
            className="px-4 py-2 rounded-xl bg-white text-red-700 font-black text-xs shrink-0 hover:bg-red-50 shadow-md transition-all cursor-pointer"
          >
            Solve a Problem Now →
          </button>
        </div>
      )}

      {/* Personalized Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-[#2563EB] via-blue-600 to-indigo-600 text-white shadow-2xl relative overflow-hidden card-3d">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              {(() => {
                const { streak, isAtRisk } = StreakService.getStreakInfo();
                if (isAtRisk) {
                  return (
                    <span className="px-3 py-1 rounded-full font-extrabold text-xs bg-red-600 text-white border border-red-400 flex items-center gap-1.5 shadow-md animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-bounce" />
                      {streak} Day{streak === 1 ? '' : 's'} Study Streak (At Risk! ⚠️)
                    </span>
                  );
                }
                return (
                  <span className={`px-3 py-1 rounded-full font-extrabold text-xs backdrop-blur-md border flex items-center gap-1.5 shadow-2xs ${
                    streak > 0 ? 'bg-white/20 border-white/30 text-white' : 'bg-black/20 border-white/20 text-blue-100'
                  }`}>
                    <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-orange-300 fill-orange-300 animate-pulse' : 'text-slate-300'}`} />
                    {streak} Day{streak === 1 ? '' : 's'} Study Streak
                  </span>
                );
              })()}
              <span className="text-xs text-blue-100 font-bold">{user.university || 'Stanford University'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
              Welcome back, {user.displayName || 'Alex'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1.5 max-w-xl leading-relaxed font-medium">
              Target Role: <strong className="text-white font-extrabold">{user.targetRole || 'Software Engineer'}</strong> | Major: <strong className="text-white font-extrabold">{user.major || 'Computer Science'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => onNavigateTab('notes')}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:scale-105 cursor-pointer transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
              AI Notes Summarizer
            </button>
            <button
              onClick={onOpenStudyHubUpload}
              className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs sm:text-sm border border-white/40 cursor-pointer transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-white" />
              Upload Study Notes
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Widget */}
        <div 
          onClick={() => onNavigateTab('attendance')}
          className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/90 shadow-3d-sm hover:shadow-xl card-3d transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Attendance</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50/90 text-blue-600 flex items-center justify-center font-black shadow-2xs">
              <CheckSquare className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{overallAttendance}%</span>
            <span className="text-[11px] font-black text-emerald-700 bg-emerald-100/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-emerald-200">
              Safe & Above 75%
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200/80 rounded-full mt-3 overflow-hidden shadow-inner">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallAttendance}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">Target goal: 80% across all subjects</p>
        </div>

        {/* Upcoming Assignments */}
        <div 
          onClick={() => onNavigateTab('assignment')}
          className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/90 shadow-3d-sm hover:shadow-xl card-3d transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Assignments</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black shadow-2xs">
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{assignments.length}</span>
            <span className="text-[11px] font-black text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-200">
              Due This Week
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">AI Step-by-Step Solver Ready</p>
        </div>

        {/* DSA Coding Progress */}
        <div 
          onClick={() => onNavigateTab('coding')}
          className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/90 shadow-3d-sm hover:shadow-xl card-3d transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">DSA Solved</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-black shadow-2xs">
              <Code2 className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{solvedDSA} / {totalDSA}</span>
            <span className="text-[11px] font-black text-cyan-800 bg-cyan-100/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-cyan-200">
              {dsaProgressPct}%
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200/80 rounded-full mt-3 overflow-hidden shadow-inner">
            <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${dsaProgressPct}%` }}></div>
          </div>
        </div>

        {/* ATS Resume Score */}
        <div 
          onClick={() => onNavigateTab('resumebuilder')}
          className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/90 shadow-3d-sm hover:shadow-xl card-3d transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">ATS Resume</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black shadow-2xs">
              <Award className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">88 / 100</span>
            <span className="text-[11px] font-black text-purple-800 bg-purple-100/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-purple-200">
              Top 5%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">Matched against {user.targetRole || 'SWE'}</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Schedule & Recent Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule Card */}
          <div className="p-6 sm:p-7 rounded-[28px] bg-white/45 backdrop-blur-2xl border border-white/80 shadow-2xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-base font-extrabold text-slate-900">Active Assignments & Deadlines</h2>
              </div>
              <button
                onClick={() => onNavigateTab('assignment')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                View Solver <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {assignments.length > 0 ? (
              <div className="space-y-3">
                {assignments.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onNavigateTab('assignment')}
                    className="p-4 rounded-2xl bg-white border border-slate-200/60 flex items-center justify-between hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs flex flex-col items-center justify-center border border-indigo-100">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.subject} • Due: {item.dueDate}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      Solve AI
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-50/70 border border-dashed border-slate-200 text-center">
                <p className="text-xs font-semibold text-slate-500">No active assignment deadlines recorded.</p>
                <button
                  onClick={() => onNavigateTab('assignment')}
                  className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                >
                  + Solve Assignment with AI
                </button>
              </div>
            )}
          </div>

          {/* Recent AI Notes & Libraries */}
          <div className="p-6 sm:p-7 rounded-[28px] bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-base font-extrabold text-slate-900">Recent AI Study Suites</h2>
              </div>
              <button
                onClick={() => onNavigateTab('studyhub')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {studySuites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {studySuites.slice(0, 4).map((suite) => (
                  <div
                    key={suite.id}
                    onClick={() => onNavigateTab('studyhub')}
                    className="p-4 rounded-2xl bg-white border border-slate-200/60 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {suite.subject}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 mt-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{suite.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{suite.summary}</p>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 mt-3 pt-2 border-t border-slate-100">
                      <span>{suite.flashcards.length} Flashcards</span>
                      <span>•</span>
                      <span>{suite.quiz.length} Quiz Qs</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-50/70 border border-dashed border-slate-200 text-center">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No Study Suites Generated Yet</p>
                <p className="text-xs text-slate-500 mb-3">Upload your syllabus notes or slides to generate flashcards and quizzes.</p>
                <button
                  onClick={onOpenStudyHubUpload}
                  className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
                >
                  + Upload Document
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Quick Placement & AI Shortcuts */}
        <div className="space-y-6">
          {/* AI Career Assistant Launcher */}
          <div className="p-6 rounded-[28px] bg-gradient-to-br from-[#2563EB] to-indigo-600 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-5 h-5 text-blue-200" />
              <h3 className="text-base font-extrabold">Placement AI Ready</h3>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed mb-4">
              Practice 1-on-1 AI voice/video mock interviews for <strong>{user.targetRole || 'Software Engineer'}</strong>.
            </p>
            <button
              onClick={() => onNavigateTab('placement')}
              className="w-full py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition-all shadow-sm"
            >
              Start Mock Interview
            </button>
          </div>

          {/* Quick Attendance Check */}
          <div className="p-6 rounded-[28px] bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 mb-3.5 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600" /> Subject Attendance Summary
            </h3>
            <div className="space-y-3.5">
              {attendance.slice(0, 3).map((sub) => {
                const total = sub.totalClasses || 0;
                const attended = sub.attendedClasses || 0;
                const pct = total > 0 ? Math.round((attended / total) * 100) : 0;
                return (
                  <div key={sub.id} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-800 mb-1">
                      <span>{sub.name}</span>
                      <span className={pct >= 80 ? 'text-emerald-600' : 'text-amber-600'}>{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${pct >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => onNavigateTab('attendance')}
              className="w-full mt-5 py-2.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-100"
            >
              Open Attendance Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
