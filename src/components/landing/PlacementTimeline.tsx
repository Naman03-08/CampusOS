import React from 'react';
import { GraduationCap, Code2, Briefcase, Award, CheckCircle, MessageSquarePlus, Star } from 'lucide-react';

export const PlacementTimeline: React.FC = () => {
  const years = [
    {
      year: 'Year 1: Foundations',
      icon: GraduationCap,
      color: 'bg-blue-600',
      title: 'Academic Core & Subject Mastery',
      items: ['Summarize lectures with AI Study Hub', 'Maintain 85%+ attendance with Attendance Predictor', 'Build strong GPA foundation'],
    },
    {
      year: 'Year 2: DSA & Projects',
      icon: Code2,
      color: 'bg-indigo-600',
      title: 'Coding & Full Stack Skillset',
      items: ['Solve 200+ DSA problems on Coding Hub', 'Build production full-stack projects', 'Solve complex assignments step-by-step'],
    },
    {
      year: 'Year 3: Resume & ATS',
      icon: Award,
      color: 'bg-purple-600',
      title: 'ATS Resume & Internship Prep',
      items: ['Generate ATS-optimized resume (90+ score)', 'Apply to summer internships', 'Optimize LinkedIn profile & cover letters'],
    },
    {
      year: 'Year 4: Placements',
      icon: Briefcase,
      color: 'bg-emerald-600',
      title: 'AI Mock Interviews & Top Offers',
      items: ['Practice AI voice/video mock interviews', 'Company-specific interview roadmaps', 'Land high-paying campus placements'],
    },
  ];

  return (
    <section id="placement" className="py-20 bg-transparent border-t border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50/80 backdrop-blur-md px-3 py-1 rounded-full border border-blue-200">
            Roadmap to Success
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Your 4-Year Placement Journey
          </h2>
          <p className="text-base text-slate-600 mt-3">
            CampusOS AI guides you every semester from freshman orientation to your final offer letter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {years.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white/45 backdrop-blur-xl border border-white/70 shadow-sm hover:bg-white/65 hover:shadow-md transition-all relative">
                <div className={`w-10 h-10 rounded-xl ${step.color} text-white flex items-center justify-center font-bold text-sm mb-4 shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">{step.year}</span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-3">{step.title}</h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Section Review Callout */}
        <div className="mt-12 p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">Preparing for placements with CampusOS?</p>
              <p className="text-xs text-slate-500 font-medium">Leave a review about your interview prep and placement journey!</p>
            </div>
          </div>
          <a
            href="#reviews"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0"
          >
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>Write a Placement Review</span>
          </a>
        </div>
      </div>
    </section>
  );
};
