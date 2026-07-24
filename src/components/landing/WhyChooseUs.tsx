import React from 'react';
import { X, Check, Sparkles, Zap, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenAuth?: (mode: 'register') => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenAuth }) => {
  const traditionalPoints = [
    {
      title: 'Manual Formatting Chaos',
      desc: 'Tweaking Microsoft Word grids and margins for hours, only to be rejected instantly by ATS bots.',
    },
    {
      title: 'Guesswork Mock Sessions',
      desc: 'Reciting generic interview answers in front of mirrors without metrics on delivery, tech correctness, or vocal poise.',
    },
    {
      title: 'Manual Lecture Sifting',
      desc: 'Reading thousands of textbook pages and lecture transcripts manually before exams, risking memory burnout.',
    },
    {
      title: 'Blind LeetCode Grinds',
      desc: 'Solving arbitrary algorithms without compiler statistics or telemetry report logs for target roles.',
    },
    {
      title: 'Portal Application Spam',
      desc: 'Uploading PDFs to endless general corporate boards and job boards, never receiving callback status.',
    },
  ];

  const campusosPoints = [
    {
      title: 'AI-Powered Resume Compiles',
      desc: 'Instantly compile flawless, ATS-optimized PDFs styled strictly with single-column layouts and target keywords.',
    },
    {
      title: 'Stateful Vocal & Tech Telemetry',
      desc: 'Engage with adaptive AI agents that analyze speech parameters, technical correctness, confidence levels, and structure response transcripts.',
    },
    {
      title: 'Instant Lecture Summaries',
      desc: 'Deconstruct extensive curriculum files into bite-sized study checklists, interactive flashcards, and exam keys.',
    },
    {
      title: 'Interactive Compiler & 375 DSA Roadmap',
      desc: 'Solve technical coding questions inside a browser compiler with direct complexity telemetry reports and solution guides.',
    },
    {
      title: 'Smart Placement Dispatch',
      desc: 'Automatically match your resume status with high-tier verified corporate vacancies, bypassing career portal queues.',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-transparent border-t border-white/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-emerald-200/90 inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Visual Contrast
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Why Choose CampusOS AI?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-3 max-w-2xl mx-auto">
            See how our stateful AI ecosystem elevates your preparation standards above traditional manual methods.
          </p>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT CARD: TRADITIONAL PREPARATION */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80 inline-block mb-3">
                Traditional Preparation
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                The Fragmented Journey
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-8">
                Outdated, manual, and highly stress-inducing strategies that keep students stuck behind recruiting thresholds.
              </p>

              {/* Items List */}
              <div className="space-y-6">
                {traditionalPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-500 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <X className="w-4 h-4 text-rose-500 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CARD: CAMPUSOS AI ECOSYSTEM */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0B132B] text-white shadow-2xl border border-slate-800/90 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group">
            
            {/* Ambient Background Glows inside Dark Card */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/25 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/35 transition-all duration-500" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-950/90 px-3 py-1 rounded-full border border-blue-800/80 inline-block mb-3 shadow-xs">
                CampusOS AI Ecosystem
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                The Unified Canvas
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed mb-8">
                Integrated real-time sandboxes that work persistently to align every prep factor with modern MNC expectations.
              </p>

              {/* Items List */}
              <div className="space-y-6">
                {campusosPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-900/60 border border-blue-700/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-4 h-4 text-blue-400 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA within Right Card if requested */}
            {onOpenAuth && (
              <div className="mt-8 pt-6 border-t border-slate-800/80 relative z-10 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-400">
                  Ready to upgrade your college journey?
                </span>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Get Started Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
