import React from 'react';
import { 
  BookOpen
} from 'lucide-react';
import { StudySuite } from '../../types';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { AIChatView } from '../chat/AIChatView';

interface StudyHubViewProps {
  studySuites?: StudySuite[];
  onSaveSuite?: (suite: StudySuite) => void;
  onDeleteSuite?: (id: string) => void;
  initialMode?: 'chat';
}

export const StudyHubView: React.FC<StudyHubViewProps> = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="Personal Assistant"
        subtitle="Your 24/7 AI Personal Assistant & Academic Tutor"
        purpose="This unified workspace features your personalized autonomous AI Assistant. Chat for step-by-step proofs, complex code debugging, and task support."
        keyFeatures={[
          '24/7 Personal AI Assistant & Reasoning Engine',
          'Interactive Math & Code Proof Explanation',
          'Token-Saving Auto-New Chat Optimization'
        ]}
        icon={<BookOpen className="w-6 h-6 text-white" />}
        badge="Personal Assistant"
      />

      {/* MODE 1: AI Chat Assistant & Tutor */}
      <AIChatView />
    </div>
  );
};

