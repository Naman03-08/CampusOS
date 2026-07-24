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
  HelpCircle, 
  Brain, 
  Bookmark, 
  RefreshCw, 
  ArrowRight, 
  Share2, 
  CheckCircle2, 
  Clock, 
  ListChecks, 
  Trash2,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { exportTextToPDF } from '../../lib/pdfExport';
import { StudySuite, UserProfile } from '../../types';

interface AINotesSummarizerViewProps {
  user?: UserProfile;
  onSaveSuite?: (suite: StudySuite) => void;
  onNavigateTab?: (tab: string) => void;
}

interface SummarizedNote {
  id: string;
  title: string;
  subject: string;
  executiveSummary: string;
  keyTakeaways: string[];
  structuredNotes: string;
  keyTerminology: { term: string; definition: string }[];
  examQuestions: { question: string; answer: string; difficulty: string }[];
  flashcards: { front: string; back: string }[];
  actionItems: string[];
  estimatedReadTimeMinutes: number;
  createdAt: string;
}

const PRESET_TOPICS = [
  {
    title: 'Operating Systems: Virtual Memory & Paging',
    subject: 'Operating Systems',
    rawNotes: `Virtual memory is a memory management technique that provides an idealization of the storage resources that are actually available on a given machine. It creates the illusion to users of a very large main memory.
Paging is a memory management scheme by which a computer stores and retrieves data from secondary storage for use in main memory. In this scheme, the operating system retrieves data from secondary storage in same-size blocks called pages.
Key terms: Page Table, Page Fault, TLB (Translation Lookaside Buffer), LRU Eviction, Belady's Anomaly.
When a process requests a page not currently in RAM, a Page Fault trap occurs. The OS halts the process, locates the page on disk, selects a victim frame in RAM using an algorithm like LRU or FIFO, swaps in the page, updates the Page Table, and resumes execution.`
  },
  {
    title: 'Machine Learning: Overfitting, Bias & Regularization',
    subject: 'Machine Learning',
    rawNotes: `Overfitting occurs when a statistical model fits exactly against its training data. Consequently, the model fails to perform reliably on unseen test data.
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
    rawNotes: `Database normalization is the process of structuring a relational database in accordance with a series of normal forms in order to reduce data redundancy and improve data integrity.
1NF (First Normal Form): Eliminate repeating groups; ensure atomic values in each column.
2NF (Second Normal Form): Must be in 1NF. Eliminate partial dependencies on composite primary keys.
3NF (Third Normal Form): Must be in 2NF. Eliminate transitive dependencies (non-prime attributes depending on non-prime attributes).
BCNF (Boyce-Codd Normal Form): A stricter version of 3NF. For every functional dependency X -> Y, X must be a super key.`
  },
  {
    title: 'Computer Networks: TCP vs UDP & 3-Way Handshake',
    subject: 'Computer Networks',
    rawNotes: `TCP (Transmission Control Protocol) is connection-oriented, reliable, guarantees packet ordering, and implements flow control (sliding window) and congestion control.
UDP (User Datagram Protocol) is connectionless, lightweight, unreliable, but has minimal latency suitable for real-time video/gaming.
TCP 3-Way Handshake:
1. Client sends SYN (Synchronize sequence number).
2. Server responds with SYN-ACK (Acknowledge client SYN, send server SYN).
3. Client sends ACK (Acknowledge server SYN).
4-Way Handshake Teardown: FIN -> ACK -> FIN -> ACK.`
  }
];

export const AINotesSummarizerView: React.FC<AINotesSummarizerViewProps> = ({
  user,
  onSaveSuite,
  onNavigateTab
}) => {
  const [subject, setSubject] = useState('Computer Science');
  const [title, setTitle] = useState('');
  const [rawNotes, setRawNotes] = useState('');
  const [summaryStyle, setSummaryStyle] = useState<'executive' | 'detailed' | 'exam' | 'flashcards'>('detailed');
  const [detailLevel, setDetailLevel] = useState<'concise' | 'balanced' | 'comprehensive'>('balanced');

  const [loading, setLoading] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<SummarizedNote | null>(null);
  const [savedSummaries, setSavedSummaries] = useState<SummarizedNote[]>(() => {
    try {
      const stored = localStorage.getItem('campus_os_saved_summarized_notes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'notes' | 'terms' | 'exam' | 'flashcards'>('summary');
  const [currentFCIndex, setCurrentFCIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [savedToSuite, setSavedToSuite] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('campus_os_saved_summarized_notes', JSON.stringify(savedSummaries));
    } catch (e) {
      console.warn('Failed to persist summaries:', e);
    }
  }, [savedSummaries]);

  const handleApplyPreset = (preset: typeof PRESET_TOPICS[0]) => {
    setTitle(preset.title);
    setSubject(preset.subject);
    setRawNotes(preset.rawNotes);
  };

  const handleSummarize = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!rawNotes.trim() && !title.trim()) return;

    setLoading(true);
    setSavedToSuite(false);

    try {
      const res = await fetch('/api/ai/summarize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || 'Class Lecture Notes',
          subject: subject || 'Computer Science',
          rawNotes: rawNotes || title,
          summaryStyle,
          detailLevel
        })
      });

      const data = await res.json();

      const newNote: SummarizedNote = {
        id: 'note_summary_' + Date.now(),
        title: data.title || title || 'AI Smart Notes Summary',
        subject: data.subject || subject || 'General Academic',
        executiveSummary: data.executiveSummary || 'Core lecture summary generated by CampusOS AI.',
        keyTakeaways: data.keyTakeaways || [],
        structuredNotes: data.structuredNotes || '',
        keyTerminology: data.keyTerminology || [],
        examQuestions: data.examQuestions || [],
        flashcards: data.flashcards || [],
        actionItems: data.actionItems || [],
        estimatedReadTimeMinutes: data.estimatedReadTimeMinutes || 3,
        createdAt: new Date().toISOString()
      };

      setCurrentSummary(newNote);
      setSavedSummaries((prev) => [newNote, ...prev.filter((s) => s.id !== newNote.id)]);
      setActiveTab('summary');
      setCurrentFCIndex(0);
      setFcFlipped(false);
    } catch (err) {
      console.error('Error generating summary:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!currentSummary) return;
    const textToCopy = `SUBJECT: ${currentSummary.subject}\nTITLE: ${currentSummary.title}\n\nEXECUTIVE SUMMARY:\n${currentSummary.executiveSummary}\n\nKEY TAKEAWAYS:\n${currentSummary.keyTakeaways.map(t => '• ' + t).join('\n')}\n\nSTRUCTURED NOTES:\n${currentSummary.structuredNotes}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    if (!currentSummary) return;
    const exportContent = `SUBJECT: ${currentSummary.subject}\nTITLE: ${currentSummary.title}\n\nEXECUTIVE SUMMARY:\n${currentSummary.executiveSummary}\n\nKEY TAKEAWAYS:\n${currentSummary.keyTakeaways.map(t => '• ' + t).join('\n')}\n\nSTRUCTURED NOTES:\n${currentSummary.structuredNotes}\n\nKEY TERMINOLOGY:\n${currentSummary.keyTerminology.map(kt => `${kt.term}: ${kt.definition}`).join('\n')}`;
    exportTextToPDF(currentSummary.title, exportContent, `${currentSummary.title.replace(/\s+/g, '_')}_Summary.pdf`);
  };

  const handleSaveAsStudySuite = () => {
    if (!currentSummary || !onSaveSuite) return;

    const suite: StudySuite = {
      id: 'suite_' + Date.now(),
      userId: user?.uid || 'default',
      title: currentSummary.title,
      subject: currentSummary.subject,
      summary: currentSummary.executiveSummary,
      fullNotes: currentSummary.structuredNotes,
      importantQuestions: currentSummary.examQuestions,
      flashcards: currentSummary.flashcards.map((f, i) => ({ id: `fc_${i}`, front: f.front, back: f.back })),
      quiz: currentSummary.examQuestions.map((q, i) => ({
        id: `q_${i}`,
        question: q.question,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: q.answer
      })),
      mindmap: {
        id: 'm_root',
        label: currentSummary.title,
        children: currentSummary.keyTakeaways.slice(0, 3).map((kt, i) => ({ id: `m_${i}`, label: kt }))
      },
      formulas: currentSummary.keyTerminology.map((kt) => ({ name: kt.term, formula: kt.definition, description: 'Key definition' })),
      vivaQuestions: currentSummary.examQuestions.map((q) => ({ question: q.question, sampleAnswer: q.answer })),
      revisionPlan: [
        { day: 1, topic: 'Review Executive Summary & Key Takeaways', tasks: currentSummary.actionItems },
        { day: 2, topic: 'Practice Active Recall Flashcards', tasks: ['Review term definitions', 'Test flashcards'] }
      ],
      createdAt: new Date().toISOString()
    };

    onSaveSuite(suite);
    setSavedToSuite(true);
  };

  const handleDeleteSavedSummary = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedSummaries((prev) => prev.filter((s) => s.id !== id));
    if (currentSummary?.id === id) {
      setCurrentSummary(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="AI Smart Notes Summarizer"
        subtitle="Transform raw lectures, PDF extracts, slide transcripts & textbook chapters into executive summaries, key concepts, and exam cheat sheets"
        purpose="This dedicated AI Smart Notes Summarizer uses deep academic reasoning to compress length lecture notes into high-yield summaries, flashcards, terminology dictionaries, and viva questions. Save time during exam season and review key takeaways in minutes."
        keyFeatures={[
          'Instant Executive Briefings & 3-Bullet Key Takeaways',
          'Structured Lecture Notes with Markdown Formatting',
          'Key Terminology Dictionary & Formula Definitions',
          'High-Probability Exam Questions & Viva Preparation',
          'Active Recall Flashcards Deck with Flip Animations',
          '1-Click Export to PDF or Save Directly to AI Study Hub'
        ]}
        icon={<Sparkles className="w-6 h-6 text-white" />}
        badge="Gemini 3.6 Academic Summarizer"
      />

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Control & Input Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-3d-sm space-y-5 card-3d">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Summarizer Studio</h2>
                  <p className="text-[11px] text-slate-500 font-medium">Input notes or pick a quick sample topic</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                AI Powered
              </span>
            </div>

            {/* Quick Sample Topic Presets */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                ⚡ Quick Sample Topic Presets
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_TOPICS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="p-2 rounded-xl text-left border border-slate-200/80 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 transition-all cursor-pointer group"
                  >
                    <p className="text-[11px] font-bold text-slate-900 group-hover:text-blue-700 line-clamp-1">{p.title}</p>
                    <p className="text-[9px] text-slate-500 font-medium">{p.subject}</p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSummarize} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Operating Systems"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title / Chapter</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Virtual Memory & Paging"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Paste Raw Lecture Notes, Transcripts or Textbook Text
                </label>
                <textarea
                  rows={6}
                  required
                  value={rawNotes}
                  onChange={(e) => setRawNotes(e.target.value)}
                  placeholder="Paste raw lecture content, article text, slide transcripts or syllabus points here..."
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-sans leading-relaxed"
                />
              </div>

              {/* Summary Style Mode Selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Summary Mode & Focus
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setSummaryStyle('detailed')}
                    className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      summaryStyle === 'detailed'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Structured Notes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSummaryStyle('executive')}
                    className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      summaryStyle === 'executive'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Executive Brief</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSummaryStyle('exam')}
                    className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      summaryStyle === 'exam'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span>Exam Cheat Sheet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSummaryStyle('flashcards')}
                    className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      summaryStyle === 'flashcards'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Flashcards & Terms</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer btn-3d-blue"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing High-Yield Summary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Summarize Notes with Gemini AI</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* History of Saved Summaries List */}
          {savedSummaries.length > 0 && (
            <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Recent Summaries History ({savedSummaries.length})
                </h3>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {savedSummaries.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setCurrentSummary(s);
                      setActiveTab('summary');
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      currentSummary?.id === s.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-white'
                    }`}
                  >
                    <div className="pr-2 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{s.subject}</p>
                      <h4 className="text-xs font-bold line-clamp-1">{s.title}</h4>
                    </div>

                    <button
                      onClick={(e) => handleDeleteSavedSummary(s.id, e)}
                      className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                        currentSummary?.id === s.id ? 'hover:bg-white/20 text-white' : 'hover:bg-slate-200 text-slate-400'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Output Stage Viewer (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {currentSummary ? (
            <div className="space-y-4">
              {/* Top Banner Action Bar */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-3d-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-3d">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {currentSummary.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {currentSummary.estimatedReadTimeMinutes} min read
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">{currentSummary.title}</h2>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleExportPDF}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Export PDF</span>
                  </button>

                  {onSaveSuite && (
                    <button
                      onClick={handleSaveAsStudySuite}
                      disabled={savedToSuite}
                      className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        savedToSuite
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md btn-3d-blue'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{savedToSuite ? 'Saved in Study Hub ✓' : 'Save to Study Hub'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-Tab Navigation */}
              <div className="flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl overflow-x-auto text-xs font-bold border border-slate-200/80">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'summary' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Brief & Takeaways
                </button>

                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'notes' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Structured Notes
                </button>

                <button
                  onClick={() => setActiveTab('terms')}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'terms' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Terminology ({currentSummary.keyTerminology?.length || 0})
                </button>

                <button
                  onClick={() => setActiveTab('exam')}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'exam' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Exam Questions ({currentSummary.examQuestions?.length || 0})
                </button>

                <button
                  onClick={() => setActiveTab('flashcards')}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'flashcards' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Flashcards ({currentSummary.flashcards?.length || 0})
                </button>
              </div>

              {/* TAB 1: Executive Briefing & Key Takeaways */}
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 fill-blue-600 text-blue-600" /> Executive Summary
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                      {currentSummary.executiveSummary}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                    <h3 className="text-sm font-extrabold text-slate-900 border-b pb-2 flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-blue-600" /> Key High-Yield Takeaways
                    </h3>
                    <ul className="space-y-2.5">
                      {currentSummary.keyTakeaways?.map((kt, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{kt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actionable Follow-up Study Plan */}
                  {currentSummary.actionItems?.length > 0 && (
                    <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-600" /> Next Actionable Study Steps
                      </h3>
                      <div className="space-y-1.5">
                        {currentSummary.actionItems.map((act, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-amber-950 font-medium">
                            <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Full Structured Notes */}
              {activeTab === 'notes' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 border-b pb-2">Full Structured Lecture Notes</h3>
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans space-y-3">
                    {currentSummary.structuredNotes}
                  </div>
                </div>
              )}

              {/* TAB 3: Key Terminology Dictionary */}
              {activeTab === 'terms' && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 border-b pb-2">Key Terminology & Definitions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentSummary.keyTerminology?.map((kt, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <span className="text-xs font-extrabold text-blue-600">{kt.term}</span>
                        <p className="text-xs text-slate-700 leading-snug">{kt.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Exam Questions */}
              {activeTab === 'exam' && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 border-b pb-2">High-Probability Viva & Exam Questions</h3>
                  <div className="space-y-3">
                    {currentSummary.examQuestions?.map((eq, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900">Q{i + 1}. {eq.question}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            eq.difficulty === 'Hard'
                              ? 'bg-red-50 text-red-600 border-red-200'
                              : eq.difficulty === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {eq.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                          <strong>Model Answer:</strong> {eq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Flashcards Deck */}
              {activeTab === 'flashcards' && (
                <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-6">
                  {currentSummary.flashcards?.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between w-full max-w-lg text-xs font-bold text-slate-500">
                        <span>Card {currentFCIndex + 1} of {currentSummary.flashcards.length}</span>
                        <span>Click card to flip answer</span>
                      </div>

                      <div
                        onClick={() => setFcFlipped(!fcFlipped)}
                        className={`w-full max-w-lg min-h-[220px] p-8 rounded-3xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md ${
                          fcFlipped
                            ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/20'
                            : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-blue-400'
                        }`}
                      >
                        <p className="text-base sm:text-lg font-bold leading-relaxed">
                          {fcFlipped
                            ? currentSummary.flashcards[currentFCIndex].back
                            : currentSummary.flashcards[currentFCIndex].front}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            setFcFlipped(false);
                            setCurrentFCIndex((prev) => (prev > 0 ? prev - 1 : currentSummary.flashcards.length - 1));
                          }}
                          className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                        >
                          ← Previous
                        </button>

                        <button
                          onClick={() => {
                            setFcFlipped(false);
                            setCurrentFCIndex((prev) => (prev < currentSummary.flashcards.length - 1 ? prev + 1 : 0));
                          }}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
                        >
                          Next →
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-slate-500">No flashcards available in this note summary.</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">AI Smart Notes Summarizer Ready</h3>
                <p className="text-xs text-slate-500 max-w-md mt-1 font-medium">
                  Select a quick preset topic on the left or paste your lecture notes to instantly synthesize executive briefs, key takeaways & flashcards.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
