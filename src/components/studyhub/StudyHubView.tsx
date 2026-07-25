import React, { useState } from 'react';
import { 
  BookOpen, 
  Bot, 
  FileCheck
} from 'lucide-react';
import { StudySuite, AssignmentItem } from '../../types';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { AIChatView } from '../chat/AIChatView';
import { AssignmentSolverView } from '../assignment/AssignmentSolverView';

interface StudyHubViewProps {
  studySuites?: StudySuite[];
  onSaveSuite?: (suite: StudySuite) => void;
  onDeleteSuite?: (id: string) => void;
  assignments?: AssignmentItem[];
  onAddAssignment?: (assignment: AssignmentItem) => void;
  initialMode?: 'chat' | 'assignment';
}

export const StudyHubView: React.FC<StudyHubViewProps> = ({
  assignments = [],
  onAddAssignment = () => {},
  initialMode = 'chat',
}) => {
  const [mainMode, setMainMode] = useState<'chat' | 'assignment'>(initialMode);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="AI Academic Chat Assistant & Assignment Solver"
        subtitle="24/7 AI Tutor & Step-by-Step Problem Solver"
        purpose="This unified workspace combines an autonomous AI Academic Tutor and an AI Assignment Solver. Chat with the AI Tutor for step-by-step proofs & code debugging, or solve complex homework problem sets with textbook references."
        keyFeatures={[
          '24/7 AI Academic Chat Assistant & Reasoning Engine',
          'AI Step-by-Step Assignment & Proof Solver',
          'Interactive Math & Code Proof Explanation',
          'Export Chat Transcripts & Homework Solutions to PDF'
        ]}
        icon={<BookOpen className="w-6 h-6 text-white" />}
        badge="Unified Chat & Solver OS"
      />

      {/* Top Mode Selector Bar */}
      <div className="flex items-center gap-2 bg-slate-100/90 p-2 rounded-2xl border border-slate-200/80 shadow-3d-sm w-fit flex-wrap">
        <button
          onClick={() => setMainMode('chat')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
            mainMode === 'chat'
              ? 'bg-blue-600 text-white shadow-3d-blue scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
          }`}
        >
          <Bot className="w-4 h-4 text-amber-300" />
          <span>AI Chat Tutor & Assistant</span>
          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase bg-amber-400 text-slate-950">
            24/7 Live
          </span>
        </button>

        <button
          onClick={() => setMainMode('assignment')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
            mainMode === 'assignment'
              ? 'bg-blue-600 text-white shadow-3d-blue scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
          }`}
        >
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>AI Assignment Solver</span>
        </button>
      </div>

      {/* MODE 1: AI Chat Assistant & Tutor */}
      {mainMode === 'chat' && (
        <AIChatView />
      )}

      {/* MODE 2: AI Assignment Solver */}
      {mainMode === 'assignment' && (
        <AssignmentSolverView
          assignments={assignments}
          onAddAssignment={onAddAssignment}
        />
      )}
    </div>
  );
};
