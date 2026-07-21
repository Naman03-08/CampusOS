import React from 'react';
import { Award, GraduationCap, Building2 } from 'lucide-react';

export const TrustedBy: React.FC = () => {
  const universities = [
    'Stanford University',
    'MIT',
    'Harvard',
    'UC Berkeley',
    'IIT Bombay',
    'Carnegie Mellon',
    'Oxford',
    'UT Austin',
  ];

  return (
    <section className="py-12 bg-white/20 backdrop-blur-md border-y border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center justify-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          Trusted by 100,000+ Students Across Leading Global Universities
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-85 hover:opacity-100 transition-all">
          {universities.map((uni, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/40 backdrop-blur-md border border-white/70 shadow-2xs font-bold text-slate-700 text-xs sm:text-sm">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>{uni}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
