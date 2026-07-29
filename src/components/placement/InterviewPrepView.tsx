import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  Building2, 
  Tag, 
  Code2, 
  ChevronRight, 
  Copy, 
  Check, 
  X, 
  HelpCircle,
  Award,
  Layers,
  GraduationCap,
  ExternalLink,
  Flame,
  Zap,
  Filter,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { 
  INTERVIEWBIT_SUBJECTS, 
  INTERVIEWBIT_CATEGORIES, 
  InterviewBitSubject, 
  InterviewQuestion 
} from '../../data/interviewBitQuestions';
import { CompanyQuestionsSection } from './CompanyQuestionsSection';
import { CheatSheetsSection } from './CheatSheetsSection';
import { MCQPracticeSection } from './MCQPracticeSection';

// Beautiful Real-Time Interactive AI Concentric Orbit Animation Core
const AIAnimationMatrix: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([1, 3, 5]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => {
        const count = Math.floor(Math.random() * 3) + 2;
        const newNodes: number[] = [];
        for (let i = 0; i < count; i++) {
          newNodes.push(Math.floor(Math.random() * 8) + 1);
        }
        return newNodes;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-40 h-40 flex items-center justify-center bg-radial from-blue-500/10 via-transparent to-transparent rounded-full border border-blue-100/30 shrink-0">
      {/* Scanning Radar Line */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.15) 0deg, rgba(59, 130, 246, 0) 90deg, rgba(59, 130, 246, 0) 360deg)'
        }}
      />

      {/* Outer Orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-36 h-36 border border-dashed border-blue-400/30 rounded-full"
      />
      {/* Middle Orbit */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-26 h-26 border border-dotted border-indigo-400/40 rounded-full"
      />
      {/* Inner Core */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/20"
      >
        <Zap className="w-5 h-5 text-white animate-pulse" />
      </motion.div>

      {/* Orbiting AI Nodes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 360) / 8;
        const radius = 54; 
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        const isActive = activeNodes.includes(i + 1);

        return (
          <motion.div
            key={i}
            style={{ x, y }}
            animate={{
              scale: isActive ? [1, 1.35, 1] : 1,
              backgroundColor: isActive ? '#2563EB' : '#94A3B8',
              boxShadow: isActive ? '0 0 12px #3B82F6, 0 0 4px #2563EB' : 'none'
            }}
            transition={{ duration: 1 }}
            className="absolute w-2.5 h-2.5 rounded-full"
          />
        );
      })}
    </div>
  );
};

// Interactive 3D Subject Browser Card with dynamic Mouse Tilt
const InteractiveSubjectCard: React.FC<{
  sub: InterviewBitSubject;
  isSelected: boolean;
  onClick: () => void;
}> = ({ sub, isSelected, onClick }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / (rect.height / 2) * 8; 
    const rotateY = (x - centerX) / (rect.width / 2) * 8; 
    setCoords({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: coords.x,
        rotateX: coords.y,
        scale: isHovered ? 1.025 : 1,
        z: isHovered ? 15 : 0
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`p-4 rounded-2xl border transition-all cursor-pointer group relative ${
        isSelected
          ? 'bg-blue-50/95 border-blue-500 shadow-md shadow-blue-500/5'
          : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-slate-50 shadow-2xs'
      }`}
    >
      <div style={{ transform: 'translateZ(15px)' }} className="relative z-10 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">
            {sub.name}
          </span>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {sub.category}
          </span>
        </div>

        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium">
          {sub.description}
        </p>

        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Building2 className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[150px]">{sub.popularCompanies.slice(0, 3).join(', ')}</span>
          </div>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-300'}`} />
        </div>
      </div>
    </motion.div>
  );
};

// Interactive 3D Question Card with dynamic Mouse Tilt
const InteractiveQuestionCard: React.FC<{
  q: InterviewQuestion;
  idx: number;
  isMastered: boolean;
  isBookmarked: boolean;
  isAnswerVisible: boolean;
  onToggleBookmark: (e: React.MouseEvent) => void;
  onToggleMastered: (e: React.MouseEvent) => void;
  onToggleAnswer: (e: React.MouseEvent) => void;
  copiedQuestionId: string | null;
  copyAnswerText: (e: React.MouseEvent) => void;
}> = ({
  q,
  idx,
  isMastered,
  isBookmarked,
  isAnswerVisible,
  onToggleBookmark,
  onToggleMastered,
  onToggleAnswer,
  copiedQuestionId,
  copyAnswerText
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / (rect.height / 2) * 5; 
    const rotateY = (x - centerX) / (rect.width / 2) * 5; 
    setCoords({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: coords.x,
        rotateX: coords.y,
        scale: isHovered ? 1.015 : 1,
        z: isHovered ? 12 : 0
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`p-5 rounded-2xl bg-white border transition-all relative ${
        isMastered
          ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
          : 'border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md'
      }`}
    >
      <div style={{ transform: 'translateZ(10px)' }}>
        {/* Question Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Q{idx + 1}
              </span>
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded ${
                  q.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : q.difficulty === 'Medium'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {q.difficulty}
              </span>

              {q.companyTags.slice(0, 3).map((comp) => (
                <span key={comp} className="text-[10px] font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60">
                  {comp}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-black text-slate-900 leading-snug">
              {q.question}
            </h3>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0" style={{ transform: 'translateZ(15px)' }}>
            <button
              onClick={onToggleBookmark}
              className={`p-2 rounded-xl transition-all ${
                isBookmarked
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-slate-50 text-slate-400 hover:text-slate-600'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark question'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={onToggleMastered}
              className={`p-2 rounded-xl transition-all ${
                isMastered
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-50 text-slate-400 hover:text-slate-600'
              }`}
              title={isMastered ? 'Mastered' : 'Mark as Mastered'}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleAnswer}
              className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 border border-blue-200/60 flex items-center gap-1"
            >
              {isAnswerVisible ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {isAnswerVisible ? 'Hide' : 'Answer'}
            </button>
          </div>
        </div>

        {/* Collapsible Answer & Code Box */}
        {isAnswerVisible && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <div className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <span className="font-bold text-blue-600 block mb-1">Answer & Conceptual Breakdown:</span>
              {q.answer}
            </div>

            {q.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-slate-100" style={{ transform: 'translateZ(5px)' }}>
                <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 text-[11px] font-mono text-slate-300">
                  <span>{q.codeLanguage || 'code'}</span>
                  <button
                    onClick={copyAnswerText}
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedQuestionId === q.id ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-3.5 h-3.5" /> Copy Code
                      </span>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-100 overflow-x-auto leading-relaxed">
                  <code>{q.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface InterviewPrepViewProps {
  onNavigateTab?: (tab: string) => void;
}

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ onNavigateTab }) => {
  // Top-Level Section Tab State
  const [activePrepSection, setActivePrepSection] = useState<'subject_qa' | 'company_q' | 'cheat_sheets' | 'mcq_quiz'>('subject_qa');

  // Filter & Search State for Subject Q&A
  const [selectedCategory, setSelectedCategory] = useState<string>('All Subjects');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  
  // Selected Subject State
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('java');

  // User Progress State (Mastered & Bookmarked Qs saved in localStorage)
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('interview_prep_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('interview_prep_bookmarked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [visibleAnswerIds, setVisibleAnswerIds] = useState<string[]>([]);
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('interview_prep_mastered', JSON.stringify(masteredIds));
  }, [masteredIds]);

  useEffect(() => {
    localStorage.setItem('interview_prep_bookmarked', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Toggle Mastered
  const toggleMastered = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMasteredIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Bookmark
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Single Answer Visibility
  const toggleAnswerVisibility = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVisibleAnswerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Copy Answer
  const copyAnswerText = (q: InterviewQuestion, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const textToCopy = `Question: ${q.question}\n\nAnswer:\n${q.answer}${q.codeSnippet ? `\n\nCode Example:\n${q.codeSnippet}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedQuestionId(q.id);
    setTimeout(() => setCopiedQuestionId(null), 2000);
  };

  // Filter Subjects
  const filteredSubjects = useMemo(() => {
    return INTERVIEWBIT_SUBJECTS.filter((subject) => {
      const matchesCategory = 
        selectedCategory === 'All Subjects' || subject.category === selectedCategory;
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !queryLower ||
        subject.name.toLowerCase().includes(queryLower) ||
        subject.description.toLowerCase().includes(queryLower) ||
        subject.popularCompanies.some((c) => c.toLowerCase().includes(queryLower)) ||
        subject.questions.some((q) => q.question.toLowerCase().includes(queryLower));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Active Subject
  const activeSubject = useMemo(() => {
    return INTERVIEWBIT_SUBJECTS.find((s) => s.id === selectedSubjectId) || INTERVIEWBIT_SUBJECTS[0];
  }, [selectedSubjectId]);

  // Filtered Questions inside Active Subject
  const activeSubjectQuestions = useMemo(() => {
    if (!activeSubject) return [];
    return activeSubject.questions.filter((q) => {
      const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !queryLower ||
        q.question.toLowerCase().includes(queryLower) ||
        q.answer.toLowerCase().includes(queryLower) ||
        q.companyTags.some((c) => c.toLowerCase().includes(queryLower)) ||
        q.topicTags.some((t) => t.toLowerCase().includes(queryLower));

      return matchesDifficulty && matchesSearch;
    });
  }, [activeSubject, difficultyFilter, searchQuery]);

  // Total Statistics
  const totalSubjectsCount = INTERVIEWBIT_SUBJECTS.length; // 256
  const totalMasteredCount = masteredIds.length;
  const totalBookmarkedCount = bookmarkedIds.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Dynamic 3D Header Card with AI Orbit Animations */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
        {/* Soft Decorative Ambient Gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-60 h-60 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex-1 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider border border-blue-200 flex items-center gap-1.5 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              256 TECHNICAL SUBJECTS
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold uppercase tracking-wider border border-amber-200 flex items-center gap-1.5 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              COMPANY SPECIFIC QUESTIONS
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[11px] font-bold uppercase tracking-wider border border-purple-200 flex items-center gap-1.5 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
              INTERACTIVE MCQ ENGINE
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none flex items-center gap-2">
              Technical Interview Preparation Hub
              <Zap className="w-5 h-5 text-blue-600 animate-bounce" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2.5 max-w-2xl leading-relaxed">
              All-in-one interview toolkit: 256 subject technical Q&As, company-specific question vaults, rapid cheat sheet reference cards, and interactive MCQ practice with live scoring.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Global Progress Counters */}
            <div className="flex items-center gap-2.5">
              <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wider">Subjects</span>
                <span className="text-sm font-extrabold text-slate-900">{totalSubjectsCount}</span>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-center">
                <span className="text-[9px] font-bold text-emerald-700 block uppercase tracking-wider">Mastered</span>
                <span className="text-sm font-extrabold text-emerald-800">{totalMasteredCount}</span>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center">
                <span className="text-[9px] font-bold text-amber-700 block uppercase tracking-wider">Saved</span>
                <span className="text-sm font-extrabold text-amber-800">{totalBookmarkedCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Beautiful AI Rotating Concentric Orbit Animation Panel (Right Side) */}
        <div className="flex items-center justify-center relative bg-slate-50/40 p-4 rounded-2xl border border-slate-100">
          <AIAnimationMatrix />
        </div>
      </div>

      {/* TOP-LEVEL NAVIGATION SECTIONS */}
      <div className="p-2 bg-slate-100 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max w-full">
          <button
            onClick={() => setActivePrepSection('subject_qa')}
            className={`flex-1 min-w-[160px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activePrepSection === 'subject_qa'
                ? 'bg-white text-blue-600 shadow-sm border border-blue-100 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue-500" />
            Subject Q&A Bank (256)
          </button>

          <button
            onClick={() => setActivePrepSection('company_q')}
            className={`flex-1 min-w-[180px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activePrepSection === 'company_q'
                ? 'bg-white text-amber-600 shadow-sm border border-amber-100 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-500" />
            Company-Specific Vault (170+)
          </button>

          <button
            onClick={() => setActivePrepSection('cheat_sheets')}
            className={`flex-1 min-w-[170px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activePrepSection === 'cheat_sheets'
                ? 'bg-white text-indigo-600 shadow-sm border border-indigo-100 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-500" />
            Cheat Sheets (170+)
          </button>

          <button
            onClick={() => setActivePrepSection('mcq_quiz')}
            className={`flex-1 min-w-[170px] px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activePrepSection === 'mcq_quiz'
                ? 'bg-white text-purple-600 shadow-sm border border-purple-100 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-500" />
            Interactive MCQs (170+)
          </button>
        </div>
      </div>

      {/* SECTION CONTENT CONDITIONAL RENDER */}
      {activePrepSection === 'company_q' && (
        <CompanyQuestionsSection
          masteredIds={masteredIds}
          bookmarkedIds={bookmarkedIds}
          onToggleMastered={toggleMastered}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {activePrepSection === 'cheat_sheets' && (
        <CheatSheetsSection
          masteredIds={masteredIds}
          bookmarkedIds={bookmarkedIds}
          onToggleMastered={toggleMastered}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {activePrepSection === 'mcq_quiz' && (
        <MCQPracticeSection
          masteredIds={masteredIds}
          bookmarkedIds={bookmarkedIds}
          onToggleMastered={toggleMastered}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {activePrepSection === 'subject_qa' && (
        <div className="space-y-6">
          {/* Global Search & Category Tabs Bar */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 256 subjects and questions... (e.g. 'HashMap', 'React', 'Docker', 'Dijkstra', 'PostgreSQL')"
                className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Categories Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {INTERVIEWBIT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Main Grid: Subject Browser & Question View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: 256 Subjects List (4 Cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-20 lg:self-start space-y-3 z-10">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '10s' }} />
                  Subjects ({filteredSubjects.length} of {totalSubjectsCount})
                </h2>
                <span className="text-[10px] font-bold text-slate-400">Select subject</span>
              </div>

              <div className="space-y-2 max-h-[calc(100vh-13rem)] overflow-y-auto pr-1.5 scrollbar-thin">
                {filteredSubjects.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs font-medium">
                    No subjects found matching "{searchQuery}".
                  </div>
                ) : (
                  filteredSubjects.map((sub) => {
                    const isSelected = selectedSubjectId === sub.id;
                    return (
                      <InteractiveSubjectCard
                        key={sub.id}
                        sub={sub}
                        isSelected={isSelected}
                        onClick={() => setSelectedSubjectId(sub.id)}
                      />
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Questions and Technical Answers (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* ACTIVE SUBJECT BANNER HEADER */}
              {activeSubject && (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/70 to-sky-50 text-slate-900 border border-blue-200/80 shadow-xs relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                          {activeSubject.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                          {activeSubject.questions.length} Questions
                        </span>
                      </div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-900">{activeSubject.name} Technical Questions</h2>
                      <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed font-medium">
                        {activeSubject.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setShowAllAnswers(!showAllAnswers)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs transition-all flex items-center gap-1.5"
                      >
                        {showAllAnswers ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                        {showAllAnswers ? 'Hide Answers' : 'Show All Answers'}
                      </button>
                    </div>
                  </div>

                  {/* Filter Difficulty Toolbar */}
                  <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[11px] font-bold uppercase">Difficulty:</span>
                      {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setDifficultyFilter(diff)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                            difficultyFilter === diff
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium">
                      Showing {activeSubjectQuestions.length} of {activeSubject.questions.length} questions
                    </div>
                  </div>
                </div>
              )}

              {/* Questions Accordion List */}
              <div className="space-y-4">
                {activeSubjectQuestions.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
                    <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <h3 className="text-sm font-bold text-slate-800">No questions match filter</h3>
                    <p className="text-xs text-slate-400 mt-1">Try resetting search or difficulty filter.</p>
                  </div>
                ) : (
                  activeSubjectQuestions.map((q, idx) => {
                    const isMastered = masteredIds.includes(q.id);
                    const isBookmarked = bookmarkedIds.includes(q.id);
                    const isAnswerVisible = showAllAnswers || visibleAnswerIds.includes(q.id);

                    return (
                      <InteractiveQuestionCard
                        key={q.id}
                        q={q}
                        idx={idx}
                        isMastered={isMastered}
                        isBookmarked={isBookmarked}
                        isAnswerVisible={isAnswerVisible}
                        onToggleBookmark={(e) => toggleBookmark(q.id, e)}
                        onToggleMastered={(e) => toggleMastered(q.id, e)}
                        onToggleAnswer={(e) => toggleAnswerVisibility(q.id, e)}
                        copiedQuestionId={copiedQuestionId}
                        copyAnswerText={(e) => copyAnswerText(q, e)}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
