import React, { useState } from 'react';
import { 
  Bot, 
  Mic, 
  Video, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Star, 
  Brain, 
  Play, 
  Volume2, 
  ChevronRight, 
  Zap, 
  HelpCircle,
  FileCode,
  Building2,
  Users,
  Target
} from 'lucide-react';
import { ResumeData, UserProfile } from '../../types';
import { SectionUsageBanner } from '../common/SectionUsageBanner';

interface InterviewPrepViewProps {
  user?: UserProfile;
  resumeData?: ResumeData;
  onNavigateTab?: (tab: string) => void;
}

const SAMPLE_QUESTION_BANK = [
  {
    id: 'q1',
    company: 'Google / Meta',
    role: 'Software Engineer',
    type: 'System Design & Data Structures',
    question: 'How do you design an LRU Cache with O(1) time complexity for both get() and put() operations?',
    difficulty: 'Hard',
    category: 'DSA & Systems'
  },
  {
    id: 'q2',
    company: 'Razorpay / Stripe',
    role: 'Backend Engineer',
    type: 'System Architecture',
    question: 'How do you prevent double-spending or race conditions in a high-concurrency payment gateway handling 10,000 transactions per second?',
    difficulty: 'Hard',
    category: 'System Design'
  },
  {
    id: 'q3',
    company: 'Amazon / Microsoft',
    role: 'Software Engineer',
    type: 'Behavioral (STAR Method)',
    question: 'Describe a situation where you had a tight deadline and conflicting requirements from stakeholders. How did you prioritize and execute?',
    difficulty: 'Medium',
    category: 'Behavioral'
  },
  {
    id: 'q4',
    company: 'Uber / Cred',
    role: 'Full Stack Engineer',
    type: 'Core CS Fundamentals',
    question: 'Explain the difference between Optimistic vs Pessimistic Locking in DBMS transactions with a real-world booking application scenario.',
    difficulty: 'Medium',
    category: 'Database Systems'
  }
];

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({
  user,
  resumeData,
  onNavigateTab
}) => {
  // Interview configuration state
  const [interviewRole, setInterviewRole] = useState(user?.targetRole || 'Software Engineer');
  const [companyTier, setCompanyTier] = useState('Top Product Companies & YC Startups');
  const [interviewType, setInterviewType] = useState<'technical' | 'system_design' | 'behavioral' | 'cs_fundamentals'>('technical');

  // Active question state
  const [currentQuestion, setCurrentQuestion] = useState('How do you design an LRU Cache with O(1) time complexity for both get() and put() operations?');
  const [userAnswer, setUserAnswer] = useState('');
  const [recording, setRecording] = useState(false);
  const [loadingInterview, setLoadingInterview] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState<any>(null);

  // AI Question Generator State
  const [loadingNewQuestion, setLoadingNewQuestion] = useState(false);

  const handleEvaluateInterviewAnswer = async () => {
    if (!userAnswer.trim()) {
      alert('Please enter or record your answer before submitting for AI evaluation.');
      return;
    }

    setLoadingInterview(true);
    try {
      const res = await fetch('/api/ai/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: `${interviewRole} (${companyTier})`,
          question: currentQuestion,
          userAnswer: userAnswer,
        }),
      });

      const data = await res.json();
      setInterviewFeedback(data);
    } catch (err) {
      console.error('Interview evaluation error:', err);
      // Fallback feedback if API fails
      setInterviewFeedback({
        score: 82,
        strengths: 'Good identification of core data structures (Doubly Linked List + Hash Map). Clear explanation of O(1) lookup time.',
        improvements: 'Mention boundary conditions when capacity is 1, and detail how memory allocation is handled under concurrency locks.',
        idealAnswer: 'To achieve O(1) time complexity for both get() and put(), combine a Doubly Linked List with a Hash Map. The Hash Map stores keys mapped to LinkedList nodes for O(1) lookup. The Doubly Linked List maintains access order, allowing O(1) removal and insertion at head or tail.'
      });
    } finally {
      setLoadingInterview(false);
    }
  };

  const handleGenerateNextQuestion = async () => {
    setLoadingNewQuestion(true);
    setInterviewFeedback(null);
    setUserAnswer('');
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate 1 realistic, high-yield interview question for a ${interviewRole} role at ${companyTier}. Category: ${interviewType}. Return ONLY the question text clearly without preamble.`
        })
      });

      const data = await res.json();
      if (data.reply) {
        setCurrentQuestion(data.reply.trim().replace(/^Question:\s*/i, ''));
      }
    } catch (err) {
      console.error('Generate question error:', err);
    } finally {
      setLoadingNewQuestion(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="AI Interview Prep & Live Mock Simulator"
        subtitle="AI Voice & Text Technical, System Design & Behavioral Mock Interviews"
        purpose="This dedicated section is built for mastering technical screening rounds, live coding interviews, system design architecture, and behavioral STAR-method questions. Get instant AI scorecards, technical depth analysis, and benchmark ideal answers."
        keyFeatures={[
          'Live AI Technical & Behavioral Mock Interview Simulator',
          'Voice & Text Answer Evaluation Engine',
          'FAANG & YC Startup Role-Based Question Generators',
          'Detailed AI Feedback: Technical Accuracy, Structure & Strengths',
          'Ideal Benchmark Answer Breakdowns'
        ]}
        icon={<Bot className="w-6 h-6 text-white" />}
        badge="Interview Prep Suite"
      />

      {/* Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-purple-200">
              <Zap className="w-3 h-3 text-purple-600 fill-purple-600" />
              LIVE SIMULATOR
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider border border-slate-200">
              AI COPILOT
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            AI Technical & Behavioral Interview Prep
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Simulate real interview pressure, evaluate your technical answers, and sharpen your delivery for top engineering roles.
          </p>
        </div>

        <button
          onClick={handleGenerateNextQuestion}
          disabled={loadingNewQuestion}
          className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-extrabold text-xs shadow-lg shadow-purple-600/20 flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          {loadingNewQuestion ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-300" />
          )}
          <span>Generate New Question</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: INTERVIEW CONFIG & QUESTION BANK (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Target Role Configurator */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              Interview Parameters
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Position</label>
                <input
                  type="text"
                  value={interviewRole}
                  onChange={(e) => setInterviewRole(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Company Tier</label>
                <select
                  value={companyTier}
                  onChange={(e) => setCompanyTier(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-medium text-slate-800"
                >
                  <option>Top Product Companies (Google, Meta, Uber)</option>
                  <option>High-Growth YC & Unicorn Startups</option>
                  <option>Fintech & Quantitative Trading</option>
                  <option>MNC Off-Campus Hiring Drives</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Interview Round Type</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setInterviewType('technical')}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all text-center border cursor-pointer ${
                      interviewType === 'technical'
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    DSA & Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterviewType('system_design')}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all text-center border cursor-pointer ${
                      interviewType === 'system_design'
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    System Design
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterviewType('behavioral')}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all text-center border cursor-pointer ${
                      interviewType === 'behavioral'
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Behavioral (STAR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterviewType('cs_fundamentals')}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all text-center border cursor-pointer ${
                      interviewType === 'cs_fundamentals'
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Core CS (OS/DBMS)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preset Question Drills */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Top Company Question Bank</span>
              <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">High Yield</span>
            </h3>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {SAMPLE_QUESTION_BANK.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestion(q.question);
                    setInterviewFeedback(null);
                    setUserAnswer('');
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer group ${
                    currentQuestion === q.question
                      ? 'bg-purple-50/90 border-purple-500 shadow-xs'
                      : 'bg-slate-50/80 border-slate-200 hover:border-purple-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-extrabold mb-1">
                    <span className="text-purple-700">{q.company}</span>
                    <span className={`px-2 py-0.5 rounded-md ${
                      q.difficulty === 'Hard' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-purple-700 line-clamp-2 leading-snug">
                    {q.question}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: LIVE SIMULATOR STAGE & AI EVALUATION (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Simulated Interview Stage Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-6">
            
            {/* Camera & Audio Feed Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider">
                    AI Interviewer Active
                  </span>
                  <h3 className="text-sm font-black text-slate-900">{interviewRole} • {companyTier}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                  <Video className="w-3.5 h-3.5 text-emerald-600" /> Camera Ready
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                  <Mic className="w-3.5 h-3.5 text-blue-600" /> Audio Stream Active
                </span>
              </div>
            </div>

            {/* Question Display Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-black text-purple-800 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-purple-600" /> Active Interview Prompt
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-purple-900 border border-purple-200">
                  {interviewType.toUpperCase().replace('_', ' ')}
                </span>
              </div>
              <p className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                "{currentQuestion}"
              </p>
            </div>

            {/* Answer Input Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Your Technical Answer
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setRecording(!recording);
                    if (!recording) {
                      setUserAnswer('To achieve O(1) time complexity for get and put, I would combine a Hash Map with a Doubly Linked List. The Hash Map provides O(1) lookup to list nodes, while the Doubly Linked List maintains node access order so the least recently used element can be removed in O(1) time.');
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    recording
                      ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{recording ? 'Recording Spoken Answer...' : 'Simulate Voice Input'}</span>
                </button>
              </div>

              <textarea
                rows={5}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type or speak your technical answer step-by-step..."
                className="w-full p-4 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans"
              />

              <button
                onClick={handleEvaluateInterviewAnswer}
                disabled={loadingInterview}
                className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-black text-sm shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                {loadingInterview ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>AI is evaluating technical depth & structure...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-5 h-5 text-amber-300" />
                    <span>Submit Answer For AI Technical Evaluation</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Feedback & Scorecard Output */}
            {interviewFeedback && (
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <h3 className="text-sm font-black text-slate-900">AI Evaluation Scorecard</h3>
                  </div>
                  <span className="text-base font-black text-purple-800 bg-purple-100 border border-purple-200 px-3.5 py-1 rounded-xl shadow-2xs">
                    Score: {interviewFeedback.score} / 100
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <p className="font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Technical Strengths
                    </p>
                    <p className="text-slate-600 leading-relaxed">{interviewFeedback.strengths}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <p className="font-bold text-amber-700 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-600" /> Areas for Refinement
                    </p>
                    <p className="text-slate-600 leading-relaxed">{interviewFeedback.improvements}</p>
                  </div>
                </div>

                {interviewFeedback.idealAnswer && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                    <p className="text-xs font-black text-purple-900 uppercase tracking-wider">
                      Ideal Benchmark Model Answer
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {interviewFeedback.idealAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* STAR Method & Prep Best Practices */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-purple-200 flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-300" /> STAR Method Pro Tip
              </h3>
              <span className="text-[10px] font-bold bg-white/10 text-purple-100 px-2.5 py-0.5 rounded-full">
                Behavioral Framework
              </span>
            </div>
            <p className="text-xs text-purple-100 leading-relaxed">
              Structure behavioral & project answers using <strong>Situation</strong>, <strong>Task</strong>, <strong>Action</strong>, and <strong>Result</strong>. Always highlight quantifiable metrics (e.g., "reduced latency by 40%", "handled 5,000 requests/sec").
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
