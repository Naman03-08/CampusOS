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
  CheckCircle2 
} from 'lucide-react';
import { UserProfile, AttendanceSubject, ScheduleEvent, DSAProblem, StudySuite, AssignmentItem } from '../../types';

interface DashboardViewProps {
  user: UserProfile;
  attendance: AttendanceSubject[];
  schedule: ScheduleEvent[];
  dsa: DSAProblem[];
  studySuites: StudySuite[];
  assignments: AssignmentItem[];
  onNavigateTab: (tab: string) => void;
  onOpenStudyHubUpload: () => void;
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
}) => {
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
      {/* Personalized Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-[#2563EB] via-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/30 flex items-center gap-1.5 shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-orange-300 fill-orange-300" /> 14 Day Study Streak
              </span>
              <span className="text-xs text-blue-100 font-semibold">{user.university || 'Stanford University'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user.displayName || 'Alex'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1.5 max-w-xl leading-relaxed">
              Target Role: <strong className="text-white font-bold">{user.targetRole || 'Software Engineer'}</strong> | Major: <strong className="text-white font-bold">{user.major || 'Computer Science'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenStudyHubUpload}
              className="px-6 py-3 rounded-full bg-white text-blue-700 font-bold text-xs sm:text-sm shadow-lg shadow-black/10 hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
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
          className="bg-white/45 backdrop-blur-xl p-5 rounded-2xl border border-white/80 shadow-2xs hover:bg-white/70 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center font-bold">
              <CheckSquare className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{overallAttendance}%</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-emerald-200">
              Safe & Above 75%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-200/60 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallAttendance}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Target goal: 80% across all subjects</p>
        </div>

        {/* Upcoming Assignments */}
        <div 
          onClick={() => onNavigateTab('assignment')}
          className="bg-white/45 backdrop-blur-xl p-5 rounded-2xl border border-white/80 shadow-2xs hover:bg-white/70 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assignments</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{assignments.length}</span>
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              Due This Week
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">AI Step-by-Step Solver Ready</p>
        </div>

        {/* DSA Coding Progress */}
        <div 
          onClick={() => onNavigateTab('coding')}
          className="bg-white/45 backdrop-blur-xl p-5 rounded-2xl border border-white/80 shadow-2xs hover:bg-white/70 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">DSA Solved</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50/80 text-cyan-600 flex items-center justify-center font-bold">
              <Code2 className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{solvedDSA} / {totalDSA}</span>
            <span className="text-[11px] font-bold text-cyan-700 bg-cyan-100/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-cyan-200">
              {dsaProgressPct}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-200/60 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${dsaProgressPct}%` }}></div>
          </div>
        </div>

        {/* ATS Resume Score */}
        <div 
          onClick={() => onNavigateTab('placement')}
          className="bg-white/45 backdrop-blur-xl p-5 rounded-2xl border border-white/80 shadow-2xs hover:bg-white/70 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">ATS Resume</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50/80 text-purple-600 flex items-center justify-center font-bold">
              <Award className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">88 / 100</span>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-100/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-purple-200">
              Top 5%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Matched against {user.targetRole || 'SWE'}</p>
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
                  <Calendar className="w-5 h-5" />
                </div>
                <h2 className="text-base font-extrabold text-slate-900">Today's Schedule & Planner</h2>
              </div>
              <button
                onClick={() => onNavigateTab('calendar')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                View Full Calendar <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {todayEvents.length > 0 ? (
              <div className="space-y-3">
                {todayEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/60 flex items-center justify-between hover:border-blue-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex flex-col items-center justify-center border border-blue-100">
                        <span>{evt.time}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{evt.title}</p>
                        <p className="text-xs text-slate-500">{evt.category} • {evt.durationMinutes} mins</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      Upcoming
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-50/70 border border-dashed border-slate-200 text-center">
                <p className="text-xs font-semibold text-slate-500">No classes or events scheduled for today.</p>
                <button
                  onClick={() => onNavigateTab('calendar')}
                  className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                >
                  + Add Event to Smart Calendar
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
                const pct = Math.round((sub.attendedClasses / sub.totalClasses) * 100);
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
