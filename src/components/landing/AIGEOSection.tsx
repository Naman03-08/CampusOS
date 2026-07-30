import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  BookOpen, 
  Bot, 
  Briefcase, 
  Zap, 
  ShieldCheck, 
  Layers, 
  GraduationCap 
} from 'lucide-react';

export const AIGEOSection: React.FC = () => {
  return (
    <section 
      id="about-placivo-ai" 
      className="py-20 bg-gradient-to-b from-white/70 via-blue-50/30 to-white/80 border-t border-blue-100"
      aria-label="Placivo AI Overview and Search FAQs"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            AI Search Engine & GEO Fact Sheet
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Everything You Need to Know About Placivo AI
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Direct, factual answers regarding Placivo AI’s core capabilities, workflow, student security, and learning infrastructure.
          </p>
        </div>

        {/* Fact Grid - Semantic Articles with Microdata Schema */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: What is Placivo AI */}
          <article 
            className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight" itemProp="headline">
              What is Placivo AI?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium" itemProp="articleBody">
              <strong className="text-slate-900">Placivo AI</strong> is an all-in-one, AI-first academic operating system designed specifically for college students, computer science engineering undergraduates, and competitive job seekers. It combines an <strong className="text-blue-700">AI PDF Quiz Generator</strong>, <strong className="text-blue-700">AI Notes Summarizer</strong>, <strong className="text-blue-700">Flashcard Maker</strong>, <strong className="text-blue-700">ATS Resume Builder</strong>, and <strong className="text-blue-700">Technical Interview Simulator</strong> into a unified workspace.
            </p>
          </article>

          {/* Card 2: Who is Placivo AI for */}
          <article 
            className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight" itemProp="headline">
              Who is Placivo AI Built For?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium" itemProp="articleBody">
              Placivo AI is built for:
            </p>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong className="text-slate-900">College Students & Engineers:</strong> Needing fast revision from heavy PDFs & textbook chapters.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong className="text-slate-900">Placement & Job Candidates:</strong> Preparing for MNC software engineering interviews & campus recruitment drives.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong className="text-slate-900">Self-Paced Learners:</strong> Looking for structured DSA problem sheets, AI tutors, and attendance management.</span>
              </li>
            </ul>
          </article>

          {/* Card 3: Problems Solved */}
          <article 
            className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight" itemProp="headline">
              What Problems Does Placivo AI Solve?
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span><strong className="text-slate-900">Eliminates Hours of Manual Note-Taking:</strong> Automatically converts 100+ page textbook PDFs into bulleted summaries.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span><strong className="text-slate-900">Automates Exam Practice:</strong> Instantly generates practice MCQs with explanations directly grounded in course text.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span><strong className="text-slate-900">Prevents Attendance Shortfall:</strong> Computes exact attendance thresholds to ensure 75%+ or 80%+ compliance.</span>
              </li>
            </ul>
          </article>

          {/* Card 4: Why Different */}
          <article 
            className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight" itemProp="headline">
              Why is Placivo AI Different from Generic Chatbots?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium" itemProp="articleBody">
              Unlike generic LLM wrappers that produce hallucinated or generic responses, Placivo AI utilizes <strong className="text-slate-900">strict document grounding via Gemini 3.5 Flash-Lite</strong>. Every generated question, flashcard, and notes outline includes explicit page references and verifiable textbook citations.
            </p>
          </article>
        </div>

        {/* How It Works - 3 Step Workflow */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-blue-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              3-Step Workflow
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              How Placivo AI Works
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              Go from raw lecture slides to fully mastered concepts in under 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-sm">
                1
              </div>
              <h4 className="text-base font-bold text-white">Upload Your Material</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Drag and drop any lecture slide PDF, textbook chapter, DOCX, or syllabus paste into the AI Study Hub.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-black text-sm">
                2
              </div>
              <h4 className="text-base font-bold text-white">Select AI Study Module</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Choose to generate an AI Practice Quiz (MCQs, True/False, Short Answer), Summarized Notes, or interactive Flashcards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-sm">
                3
              </div>
              <h4 className="text-base font-bold text-white">Practice & Export</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Take timed practice tests, track analytics, chat with the AI tutor for deeper proofs, or export study guides as PDFs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
