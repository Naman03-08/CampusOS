import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Bot, 
  Users, 
  Building2, 
  Landmark, 
  FileText, 
  Star,
  Zap 
} from 'lucide-react';
import heroStudentsArt from '../../assets/images/campusos_blue_hoodies_art_1785350059169.jpg';

interface HeroProps {
  onOpenAuth: (mode: 'register') => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onExploreDemo }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTags = ['IIT Bombay', 'Data Science', 'Engineering', 'MBA', 'BCA'];

  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-20 overflow-x-clip bg-gradient-to-b from-blue-50/40 via-white to-slate-50/50">
      {/* Soft Ambient Background Orbs */}
      <div className="absolute top-[-120px] left-[-120px] w-[550px] h-[550px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[-100px] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[130px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* Left Column: Eyebrow, Headlines, Search Bar, Trending */}
          <div className="lg:col-span-6 text-left space-y-5">
            
            {/* Top Pill Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-600 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
              <span>Built for Students. Powered by Technology.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.12]">
              The All-in-One <br />
              Operating System <br />
              for <span className="text-[#2563EB]">College Students</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
              Placivo AI brings everything a student needs into one beautiful platform. Study smarter, stay organized, and achieve more – all in one place.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl pt-1">
              <div className="relative flex items-center bg-white p-2 rounded-full shadow-lg shadow-slate-200/70 border border-slate-200/80 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search colleges, courses, notes, tools..."
                  className="flex-1 bg-transparent px-3 py-1.5 outline-none text-slate-800 font-medium text-sm sm:text-base placeholder:text-slate-400"
                  onClick={onExploreDemo}
                />
                <button
                  onClick={onExploreDemo}
                  className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/20 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trending Tag Row */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-semibold text-slate-500 pl-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mr-1">Trending Now:</span>
                {trendingTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={onExploreDemo}
                    className="px-3 py-1 rounded-full bg-slate-100/90 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200/60 transition-colors text-xs font-medium cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="w-full sm:w-auto px-7 py-3 bg-[#2563EB] text-white rounded-full text-sm font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDemo}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>Try Live Demo</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clean Student Illustration encircled by Orbital Blue Ring & 6 Floating Pill Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-8 lg:pt-0 px-2 sm:px-4">
            
            {/* Outer Container for Graphic & Orbit */}
            <div className="relative z-10 w-full max-w-xl sm:max-w-2xl min-h-[440px] sm:min-h-[500px] flex items-center justify-center">
              
              {/* Smooth Orbital Blue Line encircling characters & badges */}
              <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                <svg viewBox="0 0 500 500" className="w-[105%] h-[105%] sm:w-[115%] sm:h-[115%] text-blue-400/70 max-w-full max-h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer delicate orbit line */}
                  <ellipse cx="250" cy="250" rx="220" ry="200" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                  {/* Primary orbital ring */}
                  <ellipse cx="250" cy="250" rx="200" ry="180" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Clean Isolated Students Art - Bigger & Zoom-Responsive */}
              <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg flex items-center justify-center px-2">
                <img
                  src={heroStudentsArt}
                  alt="Placivo AI College Students"
                  className="w-full h-auto object-contain mix-blend-multiply select-none pointer-events-none transform hover:scale-[1.02] transition-transform duration-500 scale-105 sm:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* 6 Floating Feature Badges */}

              {/* Badge 1: Top Left - AI Notes */}
              <div className="absolute top-0 left-0 sm:left-1 lg:-left-2 z-20 shadow-lg shadow-slate-200/90 rounded-2xl bg-white border border-slate-100 p-2 sm:p-2.5 flex items-center gap-2.5 transition-transform hover:scale-105 cursor-pointer max-w-[140px] sm:max-w-none" onClick={onExploreDemo}>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black text-slate-900 leading-tight truncate">AI Notes</div>
                  <div className="text-[10px] font-medium text-slate-500 truncate">Summarize & Study</div>
                </div>
              </div>

              {/* Badge 2: Top Right - Courses */}
              <div className="absolute top-0 right-0 sm:right-1 lg:-right-2 z-20 shadow-lg shadow-slate-200/90 rounded-2xl bg-white border border-slate-100 p-2 sm:p-2.5 flex items-center gap-2.5 transition-transform hover:scale-105 cursor-pointer max-w-[140px] sm:max-w-none" onClick={onExploreDemo}>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black text-slate-900 leading-tight truncate">Courses</div>
                  <div className="text-[10px] font-medium text-slate-500 truncate">Learn & Upskill</div>
                </div>
              </div>

              {/* Badge 3: Middle Left - Placements */}
              <div className="absolute top-1/2 left-0 sm:-left-3 lg:-left-6 -translate-y-1/2 z-20 shadow-lg shadow-slate-200/90 rounded-2xl bg-white border border-slate-100 p-2 sm:p-2.5 flex items-center gap-2.5 transition-transform hover:scale-105 cursor-pointer max-w-[150px] sm:max-w-none" onClick={onExploreDemo}>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black text-slate-900 leading-tight truncate">Placements</div>
                  <div className="text-[10px] font-medium text-slate-500 truncate">Jobs & Internships</div>
                </div>
              </div>

              {/* Badge 4: Middle Right - Planner */}
              <div className="absolute top-1/2 right-0 sm:-right-3 lg:-right-6 -translate-y-1/2 z-20 shadow-lg shadow-slate-200/90 rounded-2xl bg-white border border-slate-100 p-2 sm:p-2.5 flex items-center gap-2.5 transition-transform hover:scale-105 cursor-pointer max-w-[140px] sm:max-w-none" onClick={onExploreDemo}>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black text-slate-900 leading-tight truncate">Planner</div>
                  <div className="text-[10px] font-medium text-slate-500 truncate">Organize Better</div>
                </div>
              </div>

              {/* Badge 5: Bottom Left - AI Assistant */}
              <div className="absolute bottom-0 left-0 sm:left-1 lg:-left-2 z-20 shadow-lg shadow-slate-200/90 rounded-2xl bg-white border border-slate-100 p-2 sm:p-2.5 flex items-center gap-2.5 transition-transform hover:scale-105 cursor-pointer max-w-[145px] sm:max-w-none" onClick={onExploreDemo}>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black text-slate-900 leading-tight truncate">AI Assistant</div>
                  <div className="text-[10px] font-medium text-slate-500 truncate">Your Study Buddy</div>
                </div>
              </div>

              {/* Badge 6: Bottom Right - Community */}
              <div className="absolute bottom-0 right-0 sm:right-1 lg:-right-2 z-20 shadow-lg shadow-slate-200/90 rounded-2xl bg-white border border-slate-100 p-2 sm:p-2.5 flex items-center gap-2.5 transition-transform hover:scale-105 cursor-pointer max-w-[140px] sm:max-w-none" onClick={onExploreDemo}>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black text-slate-900 leading-tight truncate">Community</div>
                  <div className="text-[10px] font-medium text-slate-500 truncate">Connect & Grow</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Trusted By Banner */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 text-center">
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-6">
            Trusted by <span className="text-blue-600 font-extrabold">1M+</span> students from <span className="text-blue-600 font-extrabold">500+</span> colleges
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800 tracking-tight">
              <Building2 className="w-4 h-4 text-blue-600" /> IIT BOMBAY
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800 tracking-tight">
              <Building2 className="w-4 h-4 text-blue-600" /> DELHI UNIVERSITY
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800 tracking-tight">
              <Building2 className="w-4 h-4 text-blue-600" /> BITS PILANI
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800 tracking-tight">
              <Building2 className="w-4 h-4 text-blue-600" /> VIT CHENNAI
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800 tracking-tight">
              <Building2 className="w-4 h-4 text-blue-600" /> SRM UNIVERSITY
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800 tracking-tight">
              <Building2 className="w-4 h-4 text-blue-600" /> JNU
            </div>
          </div>
        </div>

        {/* Stats Grid Bar (1M+ Active Students, 500+ Top Colleges, 10M+ Notes, 50K+ Placements, 4.8/5 Rating) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">1M+</div>
              <div className="text-[11px] font-medium text-slate-500">Active Students</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">500+</div>
              <div className="text-[11px] font-medium text-slate-500">Top Colleges</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">10M+</div>
              <div className="text-[11px] font-medium text-slate-500">Notes & Resources</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">50K+</div>
              <div className="text-[11px] font-medium text-slate-500">Placement Opportunities</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <div className="text-left">
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">4.8/5</div>
              <div className="text-[11px] font-medium text-slate-500">Student Rating</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};



