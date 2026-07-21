import React, { useState } from 'react';
import { Zap, BookOpen, FileCheck, Bot, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

export const InteractiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flashcard' | 'assignment' | 'interview'>('flashcard');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample data for demo
  const flashcardData = {
    subject: 'Data Structures',
    question: 'What is the time complexity of searching in a Balanced Binary Search Tree (AVL / Red-Black)?',
    answer: 'O(log N) worst-case time complexity because tree height is strictly bounded to log2(N).',
  };

  const assignmentData = {
    title: 'Operating Systems: Page Fault Analysis',
    question: 'Calculate page faults for sequence [7, 0, 1, 2, 0, 3] with 3 frames using FIFO.',
    solution: '1. Frame [7, -, -] -> Fault 1\n2. Frame [7, 0, -] -> Fault 2\n3. Frame [7, 0, 1] -> Fault 3\n4. Frame [2, 0, 1] -> Fault 4 (replaces 7)\n5. Frame [2, 0, 1] -> Hit!\n6. Frame [2, 3, 1] -> Fault 5 (replaces 0)',
  };

  const interviewData = {
    role: 'Software Engineer (Google)',
    question: 'How do you detect a cycle in a Directed Graph?',
    aiFeedback: 'Score: 95/100. Excellent choice using Kahn\'s Algorithm (BFS topological sort) or Depth-First Search with recursion stack coloring (White/Gray/Black).',
  };

  return (
    <section id="demo" className="py-20 bg-transparent border-t border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50/80 backdrop-blur-md px-3 py-1 rounded-full border border-blue-200">
            Interactive Playground
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Experience CampusOS AI Live
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Try out our core AI modules right now without logging in.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('flashcard')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'flashcard'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white/50 backdrop-blur-md text-slate-700 hover:bg-white/70 border border-white/60'
            }`}
          >
            <BookOpen className="w-4 h-4" /> AI Flashcard
          </button>

          <button
            onClick={() => setActiveTab('assignment')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'assignment'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white/50 backdrop-blur-md text-slate-700 hover:bg-white/70 border border-white/60'
            }`}
          >
            <FileCheck className="w-4 h-4" /> Assignment Solver
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'interview'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white/50 backdrop-blur-md text-slate-700 hover:bg-white/70 border border-white/60'
            }`}
          >
            <Bot className="w-4 h-4" /> Mock Interview Evaluator
          </button>
        </div>

        {/* Tab Stage Box */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/80 shadow-xl min-h-[320px] flex flex-col justify-between relative overflow-hidden">
          {activeTab === 'flashcard' && (
            <div className="flex flex-col items-center justify-center text-center py-6">
              <span className="text-xs font-bold text-blue-600 bg-blue-100/80 backdrop-blur-md px-3 py-1 rounded-full mb-4">
                {flashcardData.subject}
              </span>
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full max-w-lg p-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-md cursor-pointer hover:bg-white/80 transition-all min-h-[160px] flex items-center justify-center text-slate-800 font-semibold text-base sm:text-lg"
              >
                {isFlipped ? (
                  <span className="text-blue-700 font-bold">{flashcardData.answer}</span>
                ) : (
                  <span>{flashcardData.question}</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" /> Click card to flip and verify answer
              </p>
            </div>
          )}

          {activeTab === 'assignment' && (
            <div className="text-left space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase">Question</p>
                <p className="text-sm font-semibold text-slate-800">{assignmentData.question}</p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200">
                <p className="text-xs font-bold text-blue-600 uppercase flex items-center gap-1.5 mb-2">
                  <Zap className="w-4 h-4" /> AI Step-by-Step Solution
                </p>
                <pre className="text-xs sm:text-sm font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {assignmentData.solution}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="text-left space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                  {interviewData.role}
                </span>
                <p className="text-sm font-bold text-slate-900 mt-2">{interviewData.question}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium">
                <p className="font-bold flex items-center gap-1.5 text-emerald-700 mb-1">
                  <CheckCircle2 className="w-4 h-4" /> AI Feedback Analysis
                </p>
                {interviewData.aiFeedback}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
