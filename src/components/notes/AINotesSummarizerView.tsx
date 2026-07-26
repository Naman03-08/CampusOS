import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  FileText, 
  Zap, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Layers, 
  Brain, 
  Bookmark, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Trash2,
  Upload,
  UploadCloud,
  Plus,
  HelpCircle,
  Tag,
  Send,
  Pin,
  ChevronRight,
  Cpu,
  Activity,
  Compass,
  Terminal,
  Award,
  Star,
  Info as InfoIcon
} from 'lucide-react';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { exportTextToPDF } from '../../lib/pdfExport';
import { StudySuite, UserProfile } from '../../types';

interface AINotesSummarizerViewProps {
  user?: UserProfile;
  onSaveSuite?: (suite: StudySuite) => void;
  onNavigateTab?: (tab: string) => void;
}

export interface SummarizedNote {
  id: string;
  title: string;
  subject: string;
  summaryLength: 'short' | 'medium' | 'large' | 'exam_ready';
  executiveSummary: string;
  keyTakeaways: string[];
  structuredNotes: string;
  keyTerminology: { term: string; definition: string }[];
  examQuestions: { question: string; answer: string; difficulty: string }[];
  flashcards: { front: string; back: string }[];
  actionItems: string[];
  estimatedReadTimeMinutes: number;
  wordCount: number;
  createdAt: string;
}

export interface PinnedNote {
  id: string;
  title: string;
  content: string;
  sourceCitation?: string;
  createdAt: string;
}

const SAMPLE_TOPICS = [
  {
    title: 'Operating Systems: Virtual Memory & Page Replacement',
    subject: 'Computer Science',
    content: `Virtual memory is a memory management technique that provides an idealization of the storage resources that are actually available on a given machine. It creates the illusion to users of a very large main memory.
Paging is a memory management scheme by which a computer stores and retrieves data from secondary storage for use in main memory. In this scheme, the operating system retrieves data from secondary storage in same-size blocks called pages.
Key terms: Page Table, Page Fault, TLB (Translation Lookaside Buffer), LRU Eviction, Belady's Anomaly.
When a process requests a page not currently in RAM, a Page Fault trap occurs. The OS halts the process, locates the page on disk, selects a victim frame in RAM using an algorithm like LRU or FIFO, swaps in the page, updates the Page Table, and resumes execution.`
  },
  {
    title: 'Machine Learning: Overfitting & Regularization',
    subject: 'Artificial Intelligence',
    content: `Overfitting occurs when a statistical model fits exactly against its training data. Consequently, the model fails to perform reliably on unseen test data.
High Bias leads to Underfitting (model is too simple). High Variance leads to Overfitting (model memorizes noise).
To combat overfitting:
1. Cross-Validation (k-fold).
2. L1 (Lasso) & L2 (Ridge) Regularization. L1 adds absolute weight value penalty (encourages sparsity), L2 adds squared weight value penalty.
3. Dropout in Neural Networks (randomly zeroes out neurons during training).
4. Early Stopping based on validation loss.`
  },
  {
    title: 'DBMS: Database Normalization (1NF to BCNF)',
    subject: 'Database Systems',
    content: `Database normalization is the process of structuring a relational database in accordance with a series of normal forms in order to reduce data redundancy and improve data integrity.
1NF (First Normal Form): Eliminate repeating groups; ensure atomic values in each column.
2NF (Second Normal Form): Must be in 1NF. Eliminate partial dependencies on composite primary keys.
3NF (Third Normal Form): Must be in 2NF. Eliminate transitive dependencies (non-prime attributes depending on non-prime attributes).
BCNF (Boyce-Codd Normal Form): A stricter version of 3NF. For every functional dependency X -> Y, X must be a super key.`
  }
];

// Bespoke Campus-AI Personalized Synthesis Engine Logo Component
const CampusAISynthesisLogo: React.FC = () => {
  return (
    <motion.div 
      className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0"
      whileHover={{ scale: 1.08, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {/* Glowing atmospheric halo */}
      <div className="absolute inset-0 bg-indigo-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute inset-3 bg-purple-100/40 rounded-full blur-lg" />

      {/* Triple concentric gear-orbits */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-indigo-300/70"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2.5 rounded-full border border-purple-200/50"
      />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-5 rounded-full border border-emerald-200/50"
      />

      {/* Orbiting cyber-beads */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500 shadow-sm" />
      </motion.div>
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2.5"
      >
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-xs" />
      </motion.div>

      {/* The Central Solid Tech Crest */}
      <div className="absolute inset-4.5 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200/95 shadow-md flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-10/12 h-10/12 text-indigo-600">
          {/* Subtle design alignments */}
          <path d="M 15,50 L 85,50" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M 50,15 L 50,85" stroke="#E2E8F0" strokeWidth="1.5" />
          
          {/* Geometric Diamond Layer */}
          <motion.polygon 
            points="50,18 82,50 50,82 18,50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
            animate={{ strokeDashoffset: [0, 240] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            strokeDasharray="8, 6"
          />
          
          {/* Inner core matrix */}
          <circle cx="50" cy="50" r="11" className="fill-indigo-50 text-indigo-500" stroke="currentColor" strokeWidth="2.5" />
          <motion.circle 
            cx="50" 
            cy="50" 
            r="4.5" 
            className="fill-emerald-400"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Node micro-junctions */}
          <circle cx="18" cy="50" r="3.5" className="fill-indigo-500" />
          <circle cx="82" cy="50" r="3.5" className="fill-indigo-500" />
          <circle cx="50" cy="18" r="3.5" className="fill-purple-500" />
          <circle cx="50" cy="82" r="3.5" className="fill-purple-500" />
        </svg>
      </div>
    </motion.div>
  );
};

export const AINotesSummarizerView: React.FC<AINotesSummarizerViewProps> = ({
  user,
  onSaveSuite,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'summarizer' | 'saved'>('summarizer');
  const [activeHeroTab, setActiveHeroTab] = useState<'synthesis' | 'benefits' | 'workflow'>('synthesis');
  const [hoveredCard3d, setHoveredCard3d] = useState<number | null>(null);

  // Input states
  const [inputTitle, setInputTitle] = useState('');
  const [inputSubject, setInputSubject] = useState('Computer Science');
  const [rawText, setRawText] = useState('');
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'large' | 'exam_ready'>('medium');
  const [summaryStyle, setSummaryStyle] = useState<'executive' | 'detailed' | 'exam' | 'flashcards'>('detailed');
  
  // Output states
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<SummarizedNote | null>(null);
  const [currentFCIndex, setCurrentFCIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [copiedNote, setCopiedNote] = useState(false);
  const [savedToSuite, setSavedToSuite] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  // Saved / Pinned Notes
  const [pinnedNotes, setPinnedNotes] = useState<PinnedNote[]>(() => {
    try {
      const stored = localStorage.getItem('campus_os_pinned_notes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [newPinTitle, setNewPinTitle] = useState('');
  const [newPinContent, setNewPinContent] = useState('');
  const [showAddPinModal, setShowAddPinModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('campus_os_pinned_notes', JSON.stringify(pinnedNotes));
    } catch (e) {
      console.warn('Failed to store pinned notes:', e);
    }
  }, [pinnedNotes]);

  const handleSelectSample = (sample: typeof SAMPLE_TOPICS[0]) => {
    setInputTitle(sample.title);
    setInputSubject(sample.subject);
    setRawText(sample.content);
  };

  const handleSummarize = async () => {
    if (!rawText.trim()) {
      alert('Please enter or paste your lecture notes text first.');
      return;
    }

    setLoadingSummary(true);
    setSavedToSuite(false);
    setRevealedAnswers({});

    const title = inputTitle.trim() || 'AI Smart Study Notes';

    try {
      const res = await fetch('/api/ai/summarize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subject: inputSubject,
          rawNotes: rawText,
          summaryLength,
          summaryStyle
        })
      });

      const data = await res.json();
      const textForWordCount = data.structuredNotes || '';
      const calculatedWordCount = textForWordCount.trim() ? textForWordCount.trim().split(/\s+/).length : 500;

      const newNote: SummarizedNote = {
        id: 'note_' + Date.now(),
        title: data.title || title,
        subject: data.subject || inputSubject,
        summaryLength,
        executiveSummary: data.executiveSummary || 'Executive summary synthesized from lecture notes.',
        keyTakeaways: data.keyTakeaways || [],
        structuredNotes: data.structuredNotes || rawText,
        keyTerminology: data.keyTerminology || [],
        examQuestions: data.examQuestions || [],
        flashcards: data.flashcards || [],
        actionItems: data.actionItems || [],
        estimatedReadTimeMinutes: data.estimatedReadTimeMinutes || Math.max(2, Math.round(calculatedWordCount / 200)),
        wordCount: calculatedWordCount,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      setCurrentSummary(newNote);
      setCurrentFCIndex(0);
      setFcFlipped(false);
      setActiveTab('summarizer');
    } catch (e) {
      console.error('Error generating notes:', e);
      alert('Failed to generate summary notes. Please try again.');
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleCopyNote = () => {
    if (!currentSummary) return;
    const textToCopy = `TITLE: ${currentSummary.title}\n\nEXECUTIVE SUMMARY:\n${currentSummary.executiveSummary}\n\nKEY TAKEAWAYS:\n${currentSummary.keyTakeaways.join('\n')}\n\nDETAILED NOTES:\n${currentSummary.structuredNotes}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!currentSummary) return;
    exportTextToPDF(
      `${currentSummary.title}\n\nExecutive Summary:\n${currentSummary.executiveSummary}\n\nKey Takeaways:\n${currentSummary.keyTakeaways.join('\n')}\n\nDetailed Structured Notes:\n${currentSummary.structuredNotes}`,
      `${currentSummary.title.replace(/[^a-zA-Z0-9]/g, '_')}_AI_Summary.pdf`
    );
  };

  const handleSaveToStudySuite = () => {
    if (!currentSummary || !onSaveSuite) return;

    const newSuite: StudySuite = {
      id: 'suite_' + Date.now(),
      userId: user?.uid || 'guest',
      title: currentSummary.title,
      subject: currentSummary.subject,
      summary: currentSummary.executiveSummary,
      fullNotes: currentSummary.structuredNotes,
      importantQuestions: currentSummary.examQuestions.map(q => ({
        question: q.question,
        answer: q.answer,
        difficulty: (q.difficulty as any) === 'Easy' ? 'Easy' : (q.difficulty as any) === 'Hard' ? 'Hard' : 'Medium'
      })),
      flashcards: currentSummary.flashcards.map((f, i) => ({
        id: 'fc_' + i,
        front: f.front,
        back: f.back
      })),
      quiz: [],
      mindmap: { id: 'root', label: currentSummary.title },
      formulas: [],
      vivaQuestions: [],
      revisionPlan: [],
      createdAt: currentSummary.createdAt
    };

    onSaveSuite(newSuite);
    setSavedToSuite(true);
  };

  const handlePinCurrentNote = () => {
    if (!currentSummary) return;
    const newNote: PinnedNote = {
      id: 'pin_' + Date.now(),
      title: currentSummary.title,
      content: `${currentSummary.executiveSummary}\n\n${currentSummary.structuredNotes}`,
      sourceCitation: `AI Smart Notes (${currentSummary.subject})`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setPinnedNotes(prev => [newNote, ...prev]);
    alert(`📌 Saved "${currentSummary.title}" to Saved Notes!`);
  };

  const handleAddManualPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinTitle.trim() || !newPinContent.trim()) return;

    const newNote: PinnedNote = {
      id: 'pin_' + Date.now(),
      title: newPinTitle.trim(),
      content: newPinContent.trim(),
      sourceCitation: 'Custom Student Note',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setPinnedNotes(prev => [newNote, ...prev]);
    setNewPinTitle('');
    setNewPinContent('');
    setShowAddPinModal(false);
  };

  const handleDeletePin = (id: string) => {
    setPinnedNotes(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-7xl mx-auto">
      {/* BRAND NEW INTERACTIVE 3D AI INTRO HERO */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', damping: 24 }}
        className="w-full bg-gradient-to-br from-white via-[#F8FAFC] to-[#F1F5F9] rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden relative p-6 sm:p-8 mb-6"
      >
        {/* Glowing Neural Path Network and Subtle Dots Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 -z-1" />
        
        {/* Interactive Floating AI Sparks (Background Animation Orbs) */}
        <div className="absolute top-12 left-1/4 w-32 h-32 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-1" />
        <div className="absolute bottom-6 right-1/4 w-40 h-40 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-1" />
        <div className="absolute top-1/2 left-3/4 w-28 h-28 bg-emerald-50/50 rounded-full blur-2xl pointer-events-none -z-1" />

        {/* Floating animated ambient dust tokens (Thought Streams) */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-indigo-400/20 blur-xs pointer-events-none -z-1"
            animate={{
              x: [0, (i % 2 === 0 ? 40 : -40), 0],
              y: [0, (i % 2 === 0 ? -40 : 40), 0],
              scale: [1, 1.5, 1],
              opacity: [0.15, 0.45, 0.15]
            }}
            transition={{
              duration: 8 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              top: `${20 + i * 22}%`,
              left: `${15 + i * 20}%`,
            }}
          />
        ))}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* LEFT SIDE: Header & Tabbed Information Suite */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-3.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold"
                >
                  <Cpu className="w-3.5 h-3.5 text-indigo-600 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>CAMPUS-AI COGNITIVE SUITE</span>
                </motion.div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>Real-time Synthesis</span>
                </span>
              </div>
              
              <div className="flex items-start gap-4">
                {/* Custom Bespoke AI Logo in place of generic icon */}
                <CampusAISynthesisLogo />
                
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                    AI Smart Notes <br/>
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent font-black">
                      & Neural Summarizer
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Powering high-yield study notes with a robust personal synthesis engine.
                  </p>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl font-medium pt-1">
                Say goodbye to unorganized lectures and infinite PDFs. Input transcript chunks, web notes, or textbook materials to generate beautiful executive digests, terminology libraries, flashcards, and practice exam Q&As instantly.
              </p>
            </div>

            {/* LIGHTWEIGHT TAB PILLS FOR DETAILED INFO DISPLAY */}
            <div className="flex bg-slate-200/55 p-1 rounded-2xl max-w-md border border-slate-200/50">
              {(['synthesis', 'benefits', 'workflow'] as const).map((tab) => {
                const isActive = activeHeroTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveHeroTab(tab)}
                    className={`relative flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                      isActive ? 'text-slate-950 font-black' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNotesHeroTabBg"
                        className="absolute inset-0 bg-white rounded-xl border border-slate-200/70 shadow-2xs -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                      />
                    )}
                    {tab === 'synthesis' ? 'Synthesis Core' : tab === 'benefits' ? 'Recall Advantages' : 'Smart Workflow'}
                  </button>
                );
              })}
            </div>

            {/* EXPANDED INTERACTIVE WORKSPACE CARD FOR THE TABS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroTab}
                initial={{ opacity: 0, x: -12, y: 4 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 12, y: -4 }}
                transition={{ duration: 0.25 }}
                className="bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4"
              >
                {activeHeroTab === 'synthesis' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Bespoke Semantic Abstraction Engine</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      Our proprietary neural pipelines map lecture structure based on technical hierarchy. The engine extracts abstract dependencies, isolates complex topics like virtualization or algorithmic variance, and translates them into dense, digestible mental units.
                    </p>
                    <div className="grid grid-cols-3 gap-3.5 pt-2">
                      <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/50 text-center">
                        <span className="text-base font-black text-indigo-600 block">5x</span>
                        <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Time Saved</span>
                      </div>
                      <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/50 text-center">
                        <span className="text-base font-black text-emerald-600 block">98.4%</span>
                        <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Recall Rate</span>
                      </div>
                      <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/50 text-center">
                        <span className="text-base font-black text-purple-600 block">100%</span>
                        <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Vetted Study</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeHeroTab === 'benefits' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                        <Award className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Cognitive Acceleration Features</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      Standard text summaries only scratch the surface. Campus-AI builds real study weapons to help you conquer exams with confidence:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-bold text-slate-600">
                      <div className="flex items-center gap-2 p-2 bg-slate-50/60 rounded-xl border border-slate-200/30">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span>Interactive Q&A Difficulty Shields</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-50/60 rounded-xl border border-slate-200/30">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>Active Recall Double-Sided Flashcards</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-50/60 rounded-xl border border-slate-200/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Formatted PDF Export Pipelines</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-50/60 rounded-xl border border-slate-200/30">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>One-Click AI Study Suite Syncing</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeHeroTab === 'workflow' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                        <Compass className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Optimal 3-Step Study Loop</h4>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 text-[10px] font-black shrink-0 mt-0.5">1</div>
                        <p className="text-xs text-slate-500 leading-normal">
                          <strong className="text-slate-800 font-extrabold">Ingest</strong>: Paste lecture slides, voice transcripts, or select a predefined operating system or database preset.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 text-[10px] font-black shrink-0 mt-0.5">2</div>
                        <p className="text-xs text-slate-500 leading-normal">
                          <strong className="text-slate-800 font-extrabold">Synthesize & Pin</strong>: Trigger the personal AI engine, pin notes to your saved drawer, and download verified PDFs.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: INTERACTIVE 3D PERSPECTIVE CARDS GRID */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[350px] lg:min-h-[330px] px-2 sm:px-4">
            
            <div 
              className="relative w-full max-w-[310px] min-h-[290px] flex items-center justify-center" 
              style={{ perspective: 1200 }}
            >
              
              {/* Spinning background halo lines */}
              <div className="absolute w-60 h-60 border border-dashed border-indigo-200 rounded-full animate-spin opacity-40 pointer-events-none" style={{ animationDuration: '35s' }} />
              <div className="absolute w-44 h-44 border border-purple-100 rounded-full animate-ping opacity-15 pointer-events-none" style={{ animationDuration: '7s' }} />

              {/* 3D CARD 1: RAW INGESTION CARD */}
              <motion.div
                animate={{
                  y: hoveredCard3d === 1 ? -12 : [0, -8, 0],
                  rotateZ: hoveredCard3d === 1 ? -4 : [-2, 0, -2],
                }}
                transition={{
                  y: hoveredCard3d === 1 ? { duration: 0.25 } : { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
                  rotateZ: hoveredCard3d === 1 ? { duration: 0.25 } : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{
                  scale: 1.06,
                  rotateY: -12,
                  rotateX: 8,
                  z: 40,
                  boxShadow: "0 22px 40px -15px rgba(99, 102, 241, 0.22)"
                }}
                onHoverStart={() => setHoveredCard3d(1)}
                onHoverEnd={() => setHoveredCard3d(null)}
                className="absolute top-2 w-[220px] bg-[#EEF2F6] hover:bg-white border border-slate-300/70 hover:border-indigo-400 p-3.5 rounded-2xl shadow-xs transition-all duration-300 cursor-pointer transform -translate-x-10 select-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    STAGE 01 • INPUT
                  </span>
                  <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold">
                    <FileText className="w-3 h-3" />
                  </div>
                </div>
                <h5 className="font-extrabold text-xs text-slate-900 mt-2">Raw Data Ingestion</h5>
                <p className="text-[10px] text-slate-500 leading-normal mt-1 font-medium">
                  Accepts lecture PDFs, text, and raw voice transcripts.
                </p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[9px] text-indigo-500 font-mono font-bold">utf8_parsing_ok</span>
                  <Activity className="w-3 h-3 text-indigo-500 animate-pulse" />
                </div>
              </motion.div>

              {/* 3D CARD 2: RECALL & FLASHCARDS CARD */}
              <motion.div
                animate={{
                  y: hoveredCard3d === 2 ? -12 : [0, 8, 0],
                  rotateZ: hoveredCard3d === 2 ? 6 : [3, 1, 3],
                }}
                transition={{
                  y: hoveredCard3d === 2 ? { duration: 0.25 } : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                  rotateZ: hoveredCard3d === 2 ? { duration: 0.25 } : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
                }}
                whileHover={{
                  scale: 1.06,
                  rotateY: 12,
                  rotateX: -8,
                  z: 50,
                  boxShadow: "0 22px 40px -15px rgba(168, 85, 247, 0.22)"
                }}
                onHoverStart={() => setHoveredCard3d(2)}
                onHoverEnd={() => setHoveredCard3d(null)}
                className="absolute top-16 w-[220px] bg-[#FAF5FF] hover:bg-white border border-purple-200 hover:border-purple-400 p-3.5 rounded-2xl shadow-xs transition-all duration-300 cursor-pointer transform translate-x-12 select-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    STAGE 02 • PARSING
                  </span>
                  <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center text-white">
                    <Brain className="w-3 h-3" />
                  </div>
                </div>
                <h5 className="font-extrabold text-xs text-slate-900 mt-2">Semantic Extraction</h5>
                <p className="text-[10px] text-slate-500 leading-normal mt-1 font-medium">
                  Isolates key terminologies and auto-generates exam QA.
                </p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[9px] text-purple-500 font-mono font-bold">nlp_matrix_100</span>
                  <Sparkles className="w-3 h-3 text-purple-500" />
                </div>
              </motion.div>

              {/* 3D CARD 3: FLASHCARDS CARD */}
              <motion.div
                animate={{
                  y: hoveredCard3d === 3 ? -12 : [0, -10, 0],
                  rotateZ: hoveredCard3d === 3 ? 0 : [0, 1, 0],
                }}
                transition={{
                  y: hoveredCard3d === 3 ? { duration: 0.25 } : { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
                  rotateZ: hoveredCard3d === 3 ? { duration: 0.25 } : { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
                }}
                whileHover={{
                  scale: 1.06,
                  rotateY: 0,
                  rotateX: 12,
                  z: 60,
                  boxShadow: "0 25px 45px -15px rgba(16, 185, 129, 0.22)"
                }}
                onHoverStart={() => setHoveredCard3d(3)}
                onHoverEnd={() => setHoveredCard3d(null)}
                className="absolute bottom-2 w-[224px] bg-[#ECFDF5] hover:bg-white border border-emerald-200 hover:border-emerald-400 p-3.5 rounded-2xl shadow-sm transition-all duration-300 cursor-pointer text-slate-800 select-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    STAGE 03 • OUTPUT
                  </span>
                  <div className="w-5 h-5 rounded-md bg-emerald-600 flex items-center justify-center text-white">
                    <Layers className="w-3 h-3" />
                  </div>
                </div>
                <h5 className="font-extrabold text-xs text-slate-900 mt-2 font-sans">Active Recall Cards</h5>
                <p className="text-[10px] text-slate-500 leading-normal mt-1 font-medium">
                  Produces study slides, terminal flashcards & exam preps.
                </p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[9px] text-emerald-600 font-mono font-bold">suite_ready_true</span>
                  <div className="flex gap-0.5">
                    <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                    <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                    <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Hover guidance label */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              className="text-[11px] text-slate-400 font-bold mt-2.5 flex items-center gap-1.5 cursor-default text-center"
            >
              <InfoIcon className="w-3.5 h-3.5 text-indigo-500 animate-bounce" /> Hover or touch 3D cards to track semantic layers
            </motion.p>
          </div>

        </div>
      </motion.div>

      {/* Navigation Bar */}
      <div className="p-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('summarizer')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'summarizer'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Summarizer Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-300" />
            <span>Saved Notes & Pins ({pinnedNotes.length})</span>
          </button>
        </div>

        {currentSummary && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyNote}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedNote ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedNote ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>PDF</span>
            </button>

            {onSaveSuite && (
              <button
                onClick={handleSaveToStudySuite}
                disabled={savedToSuite}
                className={`px-3 py-1.5 rounded-lg font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                  savedToSuite ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{savedToSuite ? 'Saved to Suite' : 'Save to Study Suite'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {activeTab === 'summarizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANEL: Input & Settings (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-slate-900">Input Lecture Notes</h2>
                    <p className="text-[11px] text-slate-500">Paste or select sample text to summarize</p>
                  </div>
                </div>
              </div>

              {/* Sample Quick Preset Pills */}
              <div>
                <p className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-2">Try Sample Lecture Notes:</p>
                <div className="space-y-1.5">
                  {SAMPLE_TOPICS.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSample(sample)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/60 hover:border-blue-200 text-xs font-bold text-slate-700 hover:text-blue-700 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span className="truncate">{sample.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Details Input */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Chapter Title</label>
                  <input
                    type="text"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                    placeholder="e.g. Operating Systems: Paging & Segmentation"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject Category</label>
                  <input
                    type="text"
                    value={inputSubject}
                    onChange={(e) => setInputSubject(e.target.value)}
                    placeholder="e.g. Computer Science / Physics / Management"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Raw Lecture / Notes Text</label>
                  <textarea
                    rows={8}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste lecture transcript, textbook text, or bullet points here..."
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 scrollbar-thin resize-y"
                  />
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Summary Length</label>
                    <select
                      value={summaryLength}
                      onChange={(e: any) => setSummaryLength(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="short">Short (Quick Overview)</option>
                      <option value="medium">Medium (Balanced)</option>
                      <option value="large">Comprehensive (Detailed)</option>
                      <option value="exam_ready">Exam Ready (High-Yield)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Focus Output Style</label>
                    <select
                      value={summaryStyle}
                      onChange={(e: any) => setSummaryStyle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="detailed">Structured Study Notes</option>
                      <option value="executive">Executive Bullet Summary</option>
                      <option value="exam">Exam Practice & Q&A</option>
                      <option value="flashcards">Active Recall Flashcards</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSummarize}
                  disabled={loadingSummary || !rawText.trim()}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 btn-3d-blue mt-2"
                >
                  <Sparkles className={`w-4 h-4 text-amber-300 ${loadingSummary ? 'animate-spin' : ''}`} />
                  <span>{loadingSummary ? 'Synthesizing Smart Notes...' : '✨ Generate AI Smart Notes'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Generated Notes Canvas (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {currentSummary ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                {/* Note Header Card */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase">
                          {currentSummary.subject}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {currentSummary.estimatedReadTimeMinutes} min read • {currentSummary.wordCount} words
                        </span>
                      </div>
                      <h1 className="text-xl font-black text-slate-900 mt-1">{currentSummary.title}</h1>
                    </div>

                    <button
                      onClick={handlePinCurrentNote}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Pin className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pin Note</span>
                    </button>
                  </div>

                  {/* Executive Summary */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <p className="text-xs font-black text-slate-900 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <Brain className="w-4 h-4 text-blue-600" />
                      Executive Summary
                    </p>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {currentSummary.executiveSummary}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  {currentSummary.keyTakeaways.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Key Takeaways & Core Concepts
                      </p>
                      <ul className="space-y-1.5">
                        {currentSummary.keyTakeaways.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Structured Notes Content */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                  <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Structured Detailed Study Notes
                  </h3>
                  <div className="prose prose-slate text-xs font-medium leading-relaxed whitespace-pre-wrap text-slate-700">
                    {currentSummary.structuredNotes}
                  </div>
                </div>

                {/* Key Terminology */}
                {currentSummary.keyTerminology.length > 0 && (
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                    <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-purple-600" />
                      Key Terminology Sheet
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentSummary.keyTerminology.map((term, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
                          <p className="text-xs font-black text-purple-900">{term.term}</p>
                          <p className="text-[11px] text-slate-600 font-medium">{term.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Recall Flashcards */}
                {currentSummary.flashcards.length > 0 && (
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-600" />
                        Active Recall Flashcards ({currentFCIndex + 1} / {currentSummary.flashcards.length})
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <button
                          onClick={() => {
                            setCurrentFCIndex(prev => Math.max(0, prev - 1));
                            setFcFlipped(false);
                          }}
                          disabled={currentFCIndex === 0}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 cursor-pointer"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => {
                            setCurrentFCIndex(prev => Math.min(currentSummary.flashcards.length - 1, prev + 1));
                            setFcFlipped(false);
                          }}
                          disabled={currentFCIndex === currentSummary.flashcards.length - 1}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>

                    <div
                      onClick={() => setFcFlipped(!fcFlipped)}
                      className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 text-white min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer shadow-lg transition-transform active:scale-98 relative"
                    >
                      <p className="text-[10px] uppercase font-black tracking-widest text-indigo-200 mb-2">
                        {fcFlipped ? 'ANSWER / BACK (Click to flip)' : 'QUESTION / FRONT (Click to reveal answer)'}
                      </p>
                      <p className="text-base font-extrabold max-w-md">
                        {fcFlipped 
                          ? currentSummary.flashcards[currentFCIndex].back 
                          : currentSummary.flashcards[currentFCIndex].front}
                      </p>
                    </div>
                  </div>
                )}

                {/* Exam Practice Questions */}
                {currentSummary.examQuestions.length > 0 && (
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
                    <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-600" />
                      Predicted Exam Questions & Answers
                    </h3>
                    <div className="space-y-3">
                      {currentSummary.examQuestions.map((q, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-black text-slate-900">Q{i + 1}: {q.question}</p>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-extrabold text-[9px]">
                              {q.difficulty || 'Medium'}
                            </span>
                          </div>

                          {revealedAnswers[i] ? (
                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                              <p className="font-bold text-emerald-950 mb-0.5">Answer:</p>
                              {q.answer}
                            </div>
                          ) : (
                            <button
                              onClick={() => setRevealedAnswers(prev => ({ ...prev, [i]: true }))}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors cursor-pointer"
                            >
                              Show Answer
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-white border border-slate-200/80 text-center space-y-4 card-3d">
                <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="text-base font-black text-slate-900">No Summary Generated Yet</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Paste your lecture text or select a sample topic on the left, then click "Generate AI Smart Notes".
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SAVED NOTES TAB */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900">Saved Study Notes & Pins</h2>
              <p className="text-xs text-slate-500 font-medium">Review your pinned AI summaries and custom student notes</p>
            </div>
            <button
              onClick={() => setShowAddPinModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Note</span>
            </button>
          </div>

          {pinnedNotes.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border border-slate-200/80 text-center space-y-3 card-3d">
              <Pin className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-black text-slate-800">No Pinned Notes Yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Pin AI generated notes from the Summarizer or click "Add Custom Note" above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedNotes.map((note) => (
                <div key={note.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 relative card-3d flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-black text-[9px] uppercase">
                        {note.sourceCitation || 'Pinned Note'}
                      </span>
                      <button
                        onClick={() => handleDeletePin(note.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-sm font-black text-slate-900">{note.title}</h3>
                    <p className="text-xs text-slate-600 font-medium mt-2 line-clamp-6 whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                    Saved on {note.createdAt}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Custom Note Modal */}
      {showAddPinModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900">Add Custom Note</h3>
            <form onSubmit={handleAddManualPin} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newPinTitle}
                  onChange={(e) => setNewPinTitle(e.target.value)}
                  placeholder="e.g. Memory Management Quick Formula"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Note Content</label>
                <textarea
                  rows={5}
                  required
                  value={newPinContent}
                  onChange={(e) => setNewPinContent(e.target.value)}
                  placeholder="Type your study notes or key points..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPinModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
