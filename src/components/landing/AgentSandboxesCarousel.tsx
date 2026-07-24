import React, { useState } from 'react';
import { 
  FileText, 
  Code2, 
  FileCheck, 
  GraduationCap, 
  CalendarCheck, 
  Briefcase, 
  Bot, 
  Calculator, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

interface SandboxModule {
  id: string;
  title: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  cardBorder: string;
  iconBg: string;
  iconColor: string;
  bulletColor: string;
  metricLabel: string;
  metricValue: string;
  description: string;
  bullets: string[];
  icon: React.ElementType;
}

const SANDBOX_MODULES: SandboxModule[] = [
  {
    id: 'resume',
    title: 'AI Resume Builder & ATS Checker',
    badge: 'REAL-TIME ATS SCORING',
    badgeBg: 'bg-indigo-100/80 border-indigo-200/80',
    badgeText: 'text-indigo-700',
    cardBg: 'bg-indigo-50/70',
    cardBorder: 'border-indigo-200/90',
    iconBg: 'bg-indigo-100/90 border-indigo-200',
    iconColor: 'text-indigo-600',
    bulletColor: 'bg-indigo-600',
    metricLabel: 'ATS COMPATIBILITY',
    metricValue: '98% Pass Rate',
    description: 'Generates ATS-optimized, high-scoring single-column resumes aligned with precise corporate hiring models.',
    bullets: [
      'Interactive resume editor with live scoring metrics',
      'Auto-extracts missing technical requirements & keywords',
      'Direct single-column PDF compiles optimized for HR parsers',
    ],
    icon: FileText,
  },
  {
    id: 'dsa',
    title: '375 DSA Roadmap & Compiler',
    badge: 'CURATED PROBLEM SET',
    badgeBg: 'bg-amber-100/80 border-amber-200/80',
    badgeText: 'text-amber-800',
    cardBg: 'bg-amber-50/70',
    cardBorder: 'border-amber-200/90',
    iconBg: 'bg-amber-100/90 border-amber-200',
    iconColor: 'text-amber-600',
    bulletColor: 'bg-amber-600',
    metricLabel: 'CURATED DSA QUESTIONS',
    metricValue: '375 Problems',
    description: 'Master data structures & algorithms with topic-wise progress tracking, solution hints, and in-browser execution.',
    bullets: [
      'Topic-wise tracking from Arrays to Graphs & Segment Trees',
      'In-browser TypeScript/Python/Java execution sandbox',
      'Direct video walkthroughs and time-complexity telemetry',
    ],
    icon: Code2,
  },
  {
    id: 'pdf',
    title: 'AI PDF Summarizer & Flashcards',
    badge: 'INSTANT SYLLABUS PARSER',
    badgeBg: 'bg-purple-100/80 border-purple-200/80',
    badgeText: 'text-purple-700',
    cardBg: 'bg-purple-50/70',
    cardBorder: 'border-purple-200/90',
    iconBg: 'bg-purple-100/90 border-purple-200',
    iconColor: 'text-purple-600',
    bulletColor: 'bg-purple-600',
    metricLabel: 'EXAM PREP EFFICIENCY',
    metricValue: '10x Faster Study',
    description: 'Deconstruct extensive curriculum files into bite-sized study checklists, interactive flashcards, and exam keys.',
    bullets: [
      'Uploads 100+ page textbook PDFs in under 5 seconds',
      'Generates interactive flashcards and 2-minute chapter summaries',
      'Auto-creates practice quizzes based on previous exam patterns',
    ],
    icon: FileCheck,
  },
  {
    id: 'courses',
    title: 'Interactive Coding Courses',
    badge: 'VERIFIED CERTIFICATIONS',
    badgeBg: 'bg-emerald-100/80 border-emerald-200/80',
    badgeText: 'text-emerald-800',
    cardBg: 'bg-emerald-50/70',
    cardBorder: 'border-emerald-200/90',
    iconBg: 'bg-emerald-100/90 border-emerald-200',
    iconColor: 'text-emerald-600',
    bulletColor: 'bg-emerald-600',
    metricLabel: 'STRUCTURED COURSES',
    metricValue: '12+ Full Tracks',
    description: 'Step-by-step full-stack web development, Python DSA, AI engineering, and system design learning paths.',
    bullets: [
      'Interactive progress checkboxes and module quizzes',
      'Authentic cryptographic certificate verification IDs',
      'Hands-on project repositories and capstone guides',
    ],
    icon: GraduationCap,
  },
  {
    id: 'studyhub',
    title: 'AI Study Hub & Habit Tracker',
    badge: 'DAILY STREAK ENGINE',
    badgeBg: 'bg-cyan-100/80 border-cyan-200/80',
    badgeText: 'text-cyan-800',
    cardBg: 'bg-cyan-50/70',
    cardBorder: 'border-cyan-200/90',
    iconBg: 'bg-cyan-100/90 border-cyan-200',
    iconColor: 'text-cyan-600',
    bulletColor: 'bg-cyan-600',
    metricLabel: 'STUDENT RETENTION',
    metricValue: '94% Consistency',
    description: 'Track daily study streaks, manage assignment deadlines, and review weak topics with AI revision prompts.',
    bullets: [
      'Gamified streak tracking with habit milestone badges',
      '7-day spaced repetition revision scheduling',
      'Pomodoro timer integrated with subject task logs',
    ],
    icon: CalendarCheck,
  },
  {
    id: 'placement',
    title: 'Placement & Internship Alerts',
    badge: 'MNC VACANCY DISPATCH',
    badgeBg: 'bg-rose-100/80 border-rose-200/80',
    badgeText: 'text-rose-700',
    cardBg: 'bg-rose-50/70',
    cardBorder: 'border-rose-200/90',
    iconBg: 'bg-rose-100/90 border-rose-200',
    iconColor: 'text-rose-600',
    bulletColor: 'bg-rose-600',
    metricLabel: 'VERIFIED OPPORTUNITIES',
    metricValue: '500+ Off-Campus Jobs',
    description: 'Discover verified off-campus hiring drives, tier-3 campus placement links, and MNC referral windows.',
    bullets: [
      'Real-time application link verification and deadline alerts',
      'Batch-wise hiring filters for 2024, 2025, and 2026 graduates',
      'Direct ATS resume matching for target corporate roles',
    ],
    icon: Briefcase,
  },
  {
    id: 'interview',
    title: 'AI Mock Interview Evaluator',
    badge: 'SPEECH & TECH TELEMETRY',
    badgeBg: 'bg-teal-100/80 border-teal-200/80',
    badgeText: 'text-teal-800',
    cardBg: 'bg-teal-50/70',
    cardBorder: 'border-teal-200/90',
    iconBg: 'bg-teal-100/90 border-teal-200',
    iconColor: 'text-teal-600',
    bulletColor: 'bg-teal-600',
    metricLabel: 'MOCK SIMULATION',
    metricValue: 'Full AI Voice HR',
    description: 'Engage with adaptive AI agents that analyze speech parameters, technical correctness, and vocal poise.',
    bullets: [
      'Real-time voice speech analysis and filler word detection',
      'Role-specific HR, System Design, and Technical questions',
      'Detailed rating report with action points for improvement',
    ],
    icon: Bot,
  },
  {
    id: 'attendance',
    title: 'Attendance Predictor & Log',
    badge: '75% THRESHOLD SAFEGUARD',
    badgeBg: 'bg-sky-100/80 border-sky-200/80',
    badgeText: 'text-sky-800',
    cardBg: 'bg-sky-50/70',
    cardBorder: 'border-sky-200/90',
    iconBg: 'bg-sky-100/90 border-sky-200',
    iconColor: 'text-sky-600',
    bulletColor: 'bg-sky-600',
    metricLabel: 'ELIGIBILITY RISK',
    metricValue: '0 Exam Bunk Penalties',
    description: 'Calculates exact class bunk allowances so you stay eligible for mid-sems without risking attendance shortage.',
    bullets: [
      'Smart predictor calculates how many classes you can safely skip',
      'Subject-wise timetable logging with instant alerts',
      'De-stress calculation based on college criteria',
    ],
    icon: Calculator,
  },
  {
    id: 'assignment',
    title: 'Assignment & Formula Solver',
    badge: 'STEP-BY-STEP SOLUTION ENGINE',
    badgeBg: 'bg-fuchsia-100/80 border-fuchsia-200/80',
    badgeText: 'text-fuchsia-800',
    cardBg: 'bg-fuchsia-50/70',
    cardBorder: 'border-fuchsia-200/90',
    iconBg: 'bg-fuchsia-100/90 border-fuchsia-200',
    iconColor: 'text-fuchsia-600',
    bulletColor: 'bg-fuchsia-600',
    metricLabel: 'SOLUTION ACCURACY',
    metricValue: '99.4% Verified Proofs',
    description: 'Solves complex engineering mathematics, physics equations, and code lab assignments with step-by-step explanations.',
    bullets: [
      'Generates formatted PDF submission writeups',
      'Step-by-step derivation proofs and graph plots',
      'Clean LaTeX math formula rendering',
    ],
    icon: BookOpen,
  },
];

interface AgentSandboxesCarouselProps {
  onOpenAuth?: (mode: 'register') => void;
}

export const AgentSandboxesCarousel: React.FC<AgentSandboxesCarouselProps> = ({ onOpenAuth }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SANDBOX_MODULES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SANDBOX_MODULES.length - 1 ? 0 : prev + 1));
  };

  const prevIndex = activeIndex === 0 ? SANDBOX_MODULES.length - 1 : activeIndex - 1;
  const nextIndex = activeIndex === SANDBOX_MODULES.length - 1 ? 0 : activeIndex + 1;

  const currentModule = SANDBOX_MODULES[activeIndex];
  const prevModule = SANDBOX_MODULES[prevIndex];
  const nextModule = SANDBOX_MODULES[nextIndex];

  return (
    <section id="sandboxes" className="py-20 bg-transparent border-t border-white/40 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-indigo-200/90 inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            IMMERSIVE 3D EXPLORATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Explore the CampusOS Modules
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-3 max-w-2xl mx-auto">
            Interact with our stateful 3D carousel to see how each module elevates your college & placement preparation.
          </p>
        </div>

        {/* 3D CAROUSEL CONTAINER */}
        <div className="relative max-w-5xl mx-auto min-h-[460px] flex items-center justify-center">
          
          {/* PREVIOUS CARD (LEFT 3D DEPTH) */}
          <div 
            onClick={handlePrev}
            className={`hidden md:block absolute left-0 lg:-left-4 w-[340px] p-6 rounded-3xl ${prevModule.cardBg} backdrop-blur-xl border ${prevModule.cardBorder} shadow-lg opacity-40 scale-90 -rotate-3 transition-all duration-500 cursor-pointer hover:opacity-70 pointer-events-auto z-10 select-none`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl ${prevModule.iconBg} ${prevModule.iconColor}`}>
                <prevModule.icon className="w-5 h-5" />
              </div>
              <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${prevModule.badgeBg} ${prevModule.badgeText}`}>
                {prevModule.badge}
              </span>
            </div>
            <h4 className="font-extrabold text-base text-slate-900 mb-1 truncate">{prevModule.title}</h4>
            <p className="text-xs text-slate-600 line-clamp-2">{prevModule.description}</p>
          </div>

          {/* MAIN ACTIVE CARD (CENTER FOCUS) */}
          <div className="w-full max-w-xl z-20 transition-all duration-500 transform scale-100">
            <div className={`p-8 sm:p-10 rounded-3xl ${currentModule.cardBg} backdrop-blur-2xl border-2 ${currentModule.cardBorder} shadow-2xl relative overflow-hidden transition-all duration-300`}>
              
              {/* Header Row: Icon & Tag Badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className={`p-3.5 rounded-2xl ${currentModule.iconBg} ${currentModule.iconColor} shadow-sm border border-white/80`}>
                  <currentModule.icon className="w-7 h-7" />
                </div>
                <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border shadow-2xs ${currentModule.badgeBg} ${currentModule.badgeText}`}>
                  {currentModule.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                {currentModule.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
                {currentModule.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-3 mb-8">
                {currentModule.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`w-2 h-2 rounded-full ${currentModule.bulletColor} shrink-0 mt-1.5 shadow-xs`} />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom Metrics Bar & CTA Button */}
              <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between gap-4">
                <div>
                  <p className="text-base sm:text-xl font-black text-slate-900 leading-tight">
                    {currentModule.metricValue}
                  </p>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
                    {currentModule.metricLabel}
                  </p>
                </div>

                <button
                  onClick={() => onOpenAuth && onOpenAuth('register')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Try Sandbox</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-400" />
                </button>
              </div>

            </div>
          </div>

          {/* NEXT CARD (RIGHT 3D DEPTH) */}
          <div 
            onClick={handleNext}
            className={`hidden md:block absolute right-0 lg:-right-4 w-[340px] p-6 rounded-3xl ${nextModule.cardBg} backdrop-blur-xl border ${nextModule.cardBorder} shadow-lg opacity-40 scale-90 rotate-3 transition-all duration-500 cursor-pointer hover:opacity-70 pointer-events-auto z-10 select-none`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl ${nextModule.iconBg} ${nextModule.iconColor}`}>
                <nextModule.icon className="w-5 h-5" />
              </div>
              <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${nextModule.badgeBg} ${nextModule.badgeText}`}>
                {nextModule.badge}
              </span>
            </div>
            <h4 className="font-extrabold text-base text-slate-900 mb-1 truncate">{nextModule.title}</h4>
            <p className="text-xs text-slate-600 line-clamp-2">{nextModule.description}</p>
          </div>

        </div>

        {/* CAROUSEL CONTROLS: PREV, DOTS, NEXT */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous Module"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {SANDBOX_MODULES.map((mod, idx) => (
              <button
                key={mod.id}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 bg-blue-600 shadow-xs'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to ${mod.title}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next Module"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
