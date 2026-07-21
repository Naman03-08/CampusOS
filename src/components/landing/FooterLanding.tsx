import React from 'react';
import { GraduationCap, Heart, ShieldCheck } from 'lucide-react';

export const FooterLanding: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5 text-blue-200" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">CampusOS AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              The AI Operating System for College Students. Empowering academic excellence and campus placements worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/60 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Core Modules</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#features" className="hover:text-blue-400 transition-colors">AI Study Hub</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Assignment Solver</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Attendance Manager</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Smart Calendar</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">DSA Coding Hub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Career & Placements</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#placement" className="hover:text-blue-400 transition-colors">ATS Resume Builder</a></li>
              <li><a href="#placement" className="hover:text-blue-400 transition-colors">AI Mock Interviews</a></li>
              <li><a href="#placement" className="hover:text-blue-400 transition-colors">LinkedIn Optimizer</a></li>
              <li><a href="#placement" className="hover:text-blue-400 transition-colors">Company Roadmaps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Security & Privacy</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Protected by Firebase Auth, Firestore security rules, and server-side AI encryption.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>100% Privacy Compliant</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CampusOS AI Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for students globally.
          </p>
        </div>
      </div>
    </footer>
  );
};
