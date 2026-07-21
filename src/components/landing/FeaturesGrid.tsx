import React from 'react';
import { 
  BookOpen, 
  FileCheck, 
  CheckSquare, 
  Calendar, 
  Code2, 
  Briefcase, 
  Bot, 
  Zap, 
  Layers, 
  Cpu 
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      title: 'AI Study Hub',
      desc: 'Upload PDFs, PPTs or syllabus notes. AI instantly outputs executive summaries, full notes, flashcards, quizzes, and 7-day revision plans.',
    },
    {
      icon: FileCheck,
      color: 'from-indigo-500 to-purple-600',
      title: 'Assignment Solver',
      desc: 'Get step-by-step verified problem solutions with core references, formula proofs, and one-click PDF exports.',
    },
    {
      icon: CheckSquare,
      color: 'from-emerald-500 to-teal-600',
      title: 'Attendance Manager',
      desc: 'Smart timetable tracking with target percentage calculator. Tells you exactly how many classes you can skip or MUST attend.',
    },
    {
      icon: Calendar,
      color: 'from-amber-500 to-orange-600',
      title: 'Smart AI Calendar',
      desc: 'Auto-schedules your daily study sessions, assignment deadlines, and exam revision based on difficulty and time remaining.',
    },
    {
      icon: Code2,
      color: 'from-cyan-500 to-blue-600',
      title: 'Coding & DSA Hub',
      desc: 'Track topic-wise DSA problems (Arrays, Graphs, DP), coding streaks, bookmarks, and receive AI recommendations for weak topics.',
    },
    {
      icon: Briefcase,
      color: 'from-rose-500 to-pink-600',
      title: 'Placement & Resume Suite',
      desc: 'Drag-and-drop ATS resume builder, cover letter generator, LinkedIn headline optimizer, and company preparation roadmaps.',
    },
    {
      icon: Bot,
      color: 'from-purple-500 to-indigo-600',
      title: 'AI Mock Interviews',
      desc: 'Camera and microphone ready! Practice technical and behavioral questions with immediate AI scoring on confidence & depth.',
    },
    {
      icon: Cpu,
      color: 'from-blue-600 to-cyan-600',
      title: 'Realtime Persistence & Cloud',
      desc: 'Sync seamlessly across devices with Firestore, local storage fallback, and real-time activity updates.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50/80 backdrop-blur-md px-3 py-1 rounded-full border border-blue-200">
            Engineered For Excellence
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Everything You Need To <span className="text-blue-600">Ace College</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4">
            No fragmented tools. CampusOS AI combines your complete academic workflow and career preparation into a unified, high-speed operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/45 backdrop-blur-xl border border-white/70 shadow-sm hover:bg-white/65 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Feature</span>
                  <Zap className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
