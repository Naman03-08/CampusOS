import React from 'react';
import { ArrowRight, Play, BookOpen, Laptop, Bot, ShieldCheck, Zap, Search } from 'lucide-react';

interface HeroProps {
  onOpenAuth: (mode: 'register') => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onExploreDemo }) => {
  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-amber-200/50 rounded-full blur-[120px] opacity-70 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-[100px] opacity-60 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Next-Gen Autonomous Academic Intelligence</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6">
          The AI Operating System For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">College</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          One interface for notes, assignments, attendance, and career growth. Built for the elite student.
        </p>

        {/* AI Command Bar */}
        <div className="relative group max-w-xl mx-auto mb-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
          <div className="relative flex items-center bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100">
            <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
            <input
              type="text"
              placeholder="Ask CampusOS... 'Solve my OS assignment' or 'Plan my week'"
              className="flex-1 bg-transparent px-3 py-1 outline-none text-slate-700 font-medium text-xs sm:text-sm"
              onClick={onExploreDemo}
              readOnly
            />
            <div className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-400 border border-slate-200 shrink-0">
              CTRL + K
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onOpenAuth('register')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#2563EB] text-white rounded-full text-base font-semibold shadow-lg shadow-blue-500/40 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
          >
            Launch CampusOS Free
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/80 hover:bg-white text-slate-700 font-semibold text-base border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
            Try Interactive AI Demo
          </button>
        </div>

        {/* Quick Stats Row */}
        <div className="flex justify-center items-center gap-8 sm:gap-16 mb-16 pt-2 border-t border-slate-200/40 max-w-2xl mx-auto">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">120k+</div>
            <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Active Students</div>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">98%</div>
            <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Success Rate</div>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.9/5</div>
            <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Rating</div>
          </div>
        </div>

        {/* 3D Visual Stage Showcase / Glassmorphism Preview */}
        <div className="relative max-w-5xl mx-auto rounded-[32px] bg-white/30 backdrop-blur-3xl border border-white/70 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-4 sm:p-8 text-left group overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/60 mb-6 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/80 shadow-2xs">
              campusos.ai / workspace / alex
            </span>
            <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold bg-blue-50/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-100">
              <Zap className="w-3.5 h-3.5 fill-blue-600" /> System Active
            </div>
          </div>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1 */}
            <div className="bg-white/60 backdrop-blur-xl p-5 rounded-2xl border border-white/70 shadow-xs hover:bg-white/75 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" /> AI Study Suite
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 mb-1">Data Structures & Algorithms</h3>
              <p className="text-xs text-slate-500 mb-3">Generated 12 Flashcards, 5 Quizzes & Formula Cheat Sheet.</p>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-100 w-fit">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Exam Ready
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white/60 backdrop-blur-xl p-5 rounded-2xl border border-white/70 shadow-xs hover:bg-white/75 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <Laptop className="w-4 h-4" /> Attendance Predictor
              </div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Average</span>
                <span className="text-lg font-extrabold text-slate-900">88.5%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/60 rounded-full my-2 overflow-hidden">
                <div className="h-full w-[88.5%] bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Target: 80%. Safe to miss 3 OS lectures.</p>
            </div>

            {/* Box 3 */}
            <div className="bg-white/60 backdrop-blur-xl p-5 rounded-2xl border border-white/70 shadow-xs hover:bg-white/75 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-purple-600 font-bold text-xs uppercase tracking-wider">
                <Bot className="w-4 h-4" /> Placement AI
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 mb-1">ATS Resume Score: 92/100</h3>
              <p className="text-xs text-slate-500 mb-3">Matched for Google & Meta SWE Roles.</p>
              <span className="text-[11px] font-bold text-purple-600 bg-purple-50/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-purple-100 inline-block">
                Mock Interview Ready
              </span>
            </div>
          </div>

          {/* Smart AI Banner inside card */}
          <div className="mt-5 p-4 bg-gradient-to-br from-[#2563EB] to-indigo-600 rounded-2xl text-white shadow-md flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs leading-relaxed">
              <span className="font-bold uppercase tracking-wider text-blue-200 block text-[10px]">AI ADVISOR</span>
              Attendance alert: You need 3 more classes in <span className="font-bold underline">Calculus II</span> to maintain 75% attendance threshold.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
