import React from 'react';
import { Star, Quote, Building2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Rohan Sharma',
      uni: 'IIT Bombay',
      role: 'SDE at Google ($180K Package)',
      review: 'CampusOS AI transformed my final year. The AI Study Hub generated perfect flashcards from my 200-page DBMS slides, and the Mock Interview evaluator accurately pointed out gaps in my graph theory answers.',
      rating: 5,
    },
    {
      name: 'Sarah Jenkins',
      uni: 'Stanford University',
      role: 'L5 Software Engineer at Meta',
      review: 'The ATS Resume Builder boosted my resume score from 68 to 94 in 10 minutes. I landed interviews at Apple, Meta, and Stripe within two weeks.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      uni: 'UC Berkeley',
      role: 'Backend Intern at Amazon',
      review: 'The Attendance Predictor saved my semester! It calculated exactly how many classes I needed to attend to clear the 75% threshold so I could focus on my capstone project.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-transparent border-t border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50/80 backdrop-blur-md px-3 py-1 rounded-full border border-blue-200">
            Student Success Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Loved By Thousands Of Students
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/45 backdrop-blur-xl border border-white/70 shadow-sm flex flex-col justify-between relative hover:bg-white/65 transition-all">
              <Quote className="w-8 h-8 text-amber-300/80 absolute top-6 right-6" />
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">"{rev.review}"</p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <p className="font-extrabold text-sm text-slate-900">{rev.name}</p>
                <p className="text-xs font-semibold text-blue-600">{rev.role}</p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3" /> {rev.uni}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
