import React from 'react';
import { GraduationCap, Heart, ShieldCheck } from 'lucide-react';

export const FooterLanding: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-purple-50/60 to-purple-100/80 text-slate-600 py-16 border-t border-purple-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-purple-200/60">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
                <GraduationCap className="w-5 h-5 text-purple-100" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">CampusOS AI</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              The AI Operating System for College Students. Empowering academic excellence and campus placements worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Core Modules</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#features" className="hover:text-purple-600 transition-colors">AI Study Hub</a></li>
              <li><a href="#features" className="hover:text-purple-600 transition-colors">Assignment Solver</a></li>
              <li><a href="#features" className="hover:text-purple-600 transition-colors">Attendance Manager</a></li>
              <li><a href="#features" className="hover:text-purple-600 transition-colors">Smart Calendar</a></li>
              <li><a href="#features" className="hover:text-purple-600 transition-colors">DSA Coding Hub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Career & Placements</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#placement" className="hover:text-purple-600 transition-colors">ATS Resume Builder</a></li>
              <li><a href="#placement" className="hover:text-purple-600 transition-colors">AI Mock Interviews</a></li>
              <li><a href="#placement" className="hover:text-purple-600 transition-colors">LinkedIn Optimizer</a></li>
              <li><a href="#placement" className="hover:text-purple-600 transition-colors">Company Roadmaps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Security & Privacy</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Protected by Firebase Auth, Firestore security rules, and server-side AI encryption.
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>100% Privacy Compliant</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CampusOS AI Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for students globally.
          </p>
        </div>
      </div>
    </footer>
  );
};
