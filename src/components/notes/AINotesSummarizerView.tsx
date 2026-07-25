import React, { useState, useEffect } from 'react';
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
  ChevronRight
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

export const AINotesSummarizerView: React.FC<AINotesSummarizerViewProps> = ({
  user,
  onSaveSuite,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'summarizer' | 'saved'>('summarizer');

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
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="AI Smart Notes & Text Summarizer"
        subtitle="Instant High-Yield Lecture Summaries, Exam Flashcards & Key Terminology"
        purpose="Transform long lecture transcripts, textbook chapters, or raw study notes into structured executive summaries, active recall flashcards, terminology sheets, and predicted exam questions."
        keyFeatures={[
          'Instant High-Yield Executive Summaries & Key Takeaways',
          'Structured Study Notes with Terminology Breakdown',
          'Interactive Active Recall Flashcards & Practice Questions',
          'Export to PDF or Save directly to AI Study Suite'
        ]}
        icon={<Sparkles className="w-6 h-6 text-white" />}
        badge="AI Summarizer"
      />

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
