import React, { useState, useEffect, useRef } from 'react';
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
  ListChecks, 
  Trash2,
  Upload,
  UploadCloud,
  Plus,
  File,
  Sliders,
  ChevronRight,
  Lightbulb,
  FileCode,
  Volume2,
  HelpCircle,
  X
} from 'lucide-react';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { exportTextToPDF } from '../../lib/pdfExport';
import { StudySuite, UserProfile } from '../../types';

interface AINotesSummarizerViewProps {
  user?: UserProfile;
  onSaveSuite?: (suite: StudySuite) => void;
  onNavigateTab?: (tab: string) => void;
}

interface NotebookFile {
  id: string;
  name: string;
  sizeMb: number;
  uploadedAt: string;
  pdfBase64?: string;
  extractedText?: string;
  pageCount?: number;
}

interface SummarizedNote {
  id: string;
  notebookId?: string;
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
  }
];

export const AINotesSummarizerView: React.FC<AINotesSummarizerViewProps> = ({
  user,
  onSaveSuite,
  onNavigateTab
}) => {
  // Notebook shelf state
  const [notebooks, setNotebooks] = useState<NotebookFile[]>(() => {
    try {
      const stored = localStorage.getItem('campus_os_notebook_shelf');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedNotebook, setSelectedNotebook] = useState<NotebookFile | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form controls
  const [subject, setSubject] = useState('Computer Science');
  const [title, setTitle] = useState('');
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'large' | 'exam_ready'>('medium');
  const [summaryStyle, setSummaryStyle] = useState<'executive' | 'detailed' | 'exam' | 'flashcards'>('detailed');

  // Generation & Output State
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
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

  // Sync localStorage
  useEffect(() => {
    try {
      localStorage.setItem('campus_os_notebook_shelf', JSON.stringify(notebooks));
    } catch (e) {
      console.warn('Failed to persist notebook shelf:', e);
    }
  }, [notebooks]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_os_saved_summarized_notes', JSON.stringify(savedSummaries));
    } catch (e) {
      console.warn('Failed to persist summaries:', e);
    }
  }, [savedSummaries]);

  // Handle PDF file selection & upload
  const handleFileUpload = (file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Please upload a PDF document (.pdf).');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('File size exceeds 50MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const cleanTitle = file.name.replace(/\.pdf$/i, '');

      const newNotebook: NotebookFile = {
        id: 'nb_' + Date.now(),
        name: file.name,
        sizeMb: parseFloat((file.size / (1024 * 1024)).toFixed(1)),
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        pdfBase64: base64,
        pageCount: Math.max(1, Math.floor(file.size / (150 * 1024))) || 12
      };

      setNotebooks((prev) => [newNotebook, ...prev]);
      setSelectedNotebook(newNotebook);
      setTitle(cleanTitle);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDeleteNotebook = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotebooks((prev) => prev.filter((n) => n.id !== id));
    if (selectedNotebook?.id === id) {
      setSelectedNotebook(null);
    }
  };

  // Summarize action
  const handleSummarize = async () => {
    setLoading(true);
    setLoadingStep('Reading PDF pages & extracting content...');
    setSavedToSuite(false);

    try {
      setTimeout(() => setLoadingStep('Analyzing with Gemini 3.6 AI Engine...'), 1200);
      setTimeout(() => setLoadingStep('Generating custom summary according to word count limit...'), 2500);

      const res = await fetch('/api/ai/summarize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || selectedNotebook?.name.replace(/\.pdf$/i, '') || 'Uploaded Lecture Notes',
          subject: subject || 'Academic Coursework',
          rawNotes: selectedNotebook?.extractedText || title,
          pdfBase64: selectedNotebook?.pdfBase64,
          summaryLength,
          summaryStyle
        })
      });

      const data = await res.json();

      const textForWordCount = data.structuredNotes || '';
      const calculatedWordCount = textForWordCount.trim() ? textForWordCount.trim().split(/\s+/).length : 600;

      const newNote: SummarizedNote = {
        id: 'note_summary_' + Date.now(),
        notebookId: selectedNotebook?.id,
        title: data.title || title || 'AI Smart Notes Summary',
        subject: data.subject || subject || 'General Academic',
        summaryLength,
        executiveSummary: data.executiveSummary || 'Core lecture summary generated by CampusOS AI.',
        keyTakeaways: data.keyTakeaways || [],
        structuredNotes: data.structuredNotes || '',
        keyTerminology: data.keyTerminology || [],
        examQuestions: data.examQuestions || [],
        flashcards: data.flashcards || [],
        actionItems: data.actionItems || [],
        estimatedReadTimeMinutes: data.estimatedReadTimeMinutes || (summaryLength === 'short' ? 3 : summaryLength === 'medium' ? 6 : 10),
        wordCount: calculatedWordCount,
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
      setLoadingStep('');
    }
  };

  const handleCopy = () => {
    if (!currentSummary) return;
    const textToCopy = `SUBJECT: ${currentSummary.subject}\nTITLE: ${currentSummary.title}\nWORD COUNT: ~${currentSummary.wordCount} words\n\nEXECUTIVE SUMMARY:\n${currentSummary.executiveSummary}\n\nKEY TAKEAWAYS:\n${currentSummary.keyTakeaways.map(t => '• ' + t).join('\n')}\n\nSTRUCTURED NOTES:\n${currentSummary.structuredNotes}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    if (!currentSummary) return;
    const exportContent = `SUBJECT: ${currentSummary.subject}\nTITLE: ${currentSummary.title}\nSUMMARY LENGTH MODE: ${currentSummary.summaryLength}\n\nEXECUTIVE SUMMARY:\n${currentSummary.executiveSummary}\n\nKEY TAKEAWAYS:\n${currentSummary.keyTakeaways.map(t => '• ' + t).join('\n')}\n\nSTRUCTURED NOTES:\n${currentSummary.structuredNotes}\n\nKEY TERMINOLOGY:\n${currentSummary.keyTerminology.map(kt => `${kt.term}: ${kt.definition}`).join('\n')}`;
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
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {/* Header Badges & Section Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-purple-100/90 text-purple-800 border border-purple-200 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
            STUDY SUITE ELITE
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-black uppercase tracking-wider shadow-2xs">
            AI COPILOT
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          AI Smart Notes Summarizer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-3xl leading-relaxed">
          Transform heavy textbooks and lecture slides into beautiful summary sheets, active recall exam questions, and custom podcasts.
        </p>
      </div>

      {/* Main Workspace Layout (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: YOUR NOTEBOOKS SHELF (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                YOUR NOTEBOOKS SHELF
              </h2>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wide">
                {notebooks.length} FILES
              </span>
            </div>

            {/* Dashed Add New Textbook Card */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-5 rounded-2xl border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/30 hover:bg-indigo-50/70 transition-all cursor-pointer flex flex-col items-center justify-center text-center group space-y-2"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100/80 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                  Add New Textbook
                </h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  PDF up to 50MB
                </p>
              </div>
            </div>

            {/* Notebooks Shelf Items List */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {notebooks.length === 0 ? (
                <div className="py-10 text-center space-y-1">
                  <p className="text-xs text-slate-400 font-medium italic">
                    Your shelf is empty.
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium italic">
                    Upload a PDF to get started!
                  </p>
                </div>
              ) : (
                notebooks.map((nb) => (
                  <div
                    key={nb.id}
                    onClick={() => {
                      setSelectedNotebook(nb);
                      setTitle(nb.name.replace(/\.pdf$/i, ''));
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      selectedNotebook?.id === nb.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-800 border-slate-200/80 hover:border-indigo-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-xl shrink-0 ${
                        selectedNotebook?.id === nb.id ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 pr-2">
                        <h4 className="text-xs font-black line-clamp-1">{nb.name}</h4>
                        <p className={`text-[10px] font-semibold ${
                          selectedNotebook?.id === nb.id ? 'text-indigo-100' : 'text-slate-400'
                        }`}>
                          {nb.sizeMb} MB • ~{nb.pageCount || 12} Pages
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteNotebook(nb.id, e)}
                      className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                        selectedNotebook?.id === nb.id ? 'hover:bg-white/20 text-white' : 'hover:bg-slate-200 text-slate-400'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Quick Presets Section */}
            <div className="pt-2 border-t border-slate-100">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                ⚡ Sample Preset Chapters
              </span>
              <div className="space-y-1.5">
                {PRESET_TOPICS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTitle(preset.title);
                      setSubject(preset.subject);
                      setSelectedNotebook({
                        id: 'preset_' + idx,
                        name: preset.title + '.pdf',
                        sizeMb: 2.4,
                        uploadedAt: 'Preset',
                        extractedText: preset.rawNotes,
                        pageCount: 15
                      });
                    }}
                    className="w-full p-2.5 rounded-xl text-left border border-slate-200/70 hover:border-indigo-300 bg-slate-50/80 hover:bg-indigo-50/50 transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-[11px] font-bold text-slate-800 group-hover:text-indigo-700 line-clamp-1">
                        {preset.title}
                      </p>
                      <p className="text-[9px] text-slate-400 font-semibold">{preset.subject}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Saved Summaries History */}
          {savedSummaries.length > 0 && (
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Generated Summaries ({savedSummaries.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {savedSummaries.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setCurrentSummary(s);
                      setActiveTab('summary');
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      currentSummary?.id === s.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-purple-300 hover:bg-white'
                    }`}
                  >
                    <div className="pr-2 min-w-0">
                      <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">{s.subject}</span>
                      <h4 className="text-xs font-bold line-clamp-1">{s.title}</h4>
                      <p className="text-[9px] font-medium opacity-75">~{s.wordCount} words • {s.summaryLength}</p>
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

        {/* RIGHT COLUMN: MAIN WORKSPACE & OUTPUT (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* 1. INITIAL UNSELECTED EMPTY STATE - MATCHES SCREENSHOT 100% */}
          {!selectedNotebook && !currentSummary && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-12 sm:p-20 rounded-3xl border-2 transition-all flex flex-col items-center justify-center text-center space-y-6 min-h-[480px] relative overflow-hidden ${
                isDragOver
                  ? 'border-indigo-500 bg-indigo-50/60 scale-[0.99]'
                  : 'border-slate-200/80 bg-[#f9f8f3] hover:border-slate-300'
              }`}
            >
              {/* Floating Graph Network Decorative Background */}
              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#c7d2fe_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="w-20 h-20 rounded-full bg-white shadow-xl shadow-indigo-100/50 border border-slate-200/80 flex items-center justify-center relative z-10">
                <UploadCloud className="w-10 h-10 text-indigo-600 stroke-[1.5]" />
              </div>

              <div className="space-y-2 max-w-lg relative z-10">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Upload Lecture Notes & Textbooks
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Drag and drop your syllabus or college textbook PDF here, and let Gemini turn it into an interactive smart module. Max size 50MB.
                </p>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-indigo-600/25 hover:scale-105 transition-all cursor-pointer relative z-10"
              >
                Browse Notebooks
              </button>
            </div>
          )}

          {/* 2. NOTEBOOK SELECTED CONFIGURATION CARD */}
          {selectedNotebook && !currentSummary && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-6">
              
              {/* Selected File Banner */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-3 rounded-xl bg-indigo-600 text-white shrink-0 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider">
                      Selected Textbook
                    </span>
                    <h3 className="text-sm font-black text-slate-900 line-clamp-1">{selectedNotebook.name}</h3>
                    <p className="text-[11px] text-slate-500 font-semibold">{selectedNotebook.sizeMb} MB • ~{selectedNotebook.pageCount || 12} Pages</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedNotebook(null);
                    setCurrentSummary(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  Change File
                </button>
              </div>

              {/* Title & Subject Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course / Subject Name</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Operating Systems"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Module / Chapter Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Virtual Memory & Paging"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                  />
                </div>
              </div>

              {/* SUMMARY LENGTH SELECTOR (Required by prompt: Short 500-600, Medium 900-1200, Large 1200+, Exam Ready 1200+) */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                  Select AI Summary Output Word Length
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Option 1: Short Summary */}
                  <div
                    onClick={() => setSummaryLength('short')}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      summaryLength === 'short'
                        ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 shadow-xs'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-indigo-700">Short Summary</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        500 - 600 Words
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-snug">
                      Crisp, high-level overview covering core definitions and key points fast.
                    </p>
                  </div>

                  {/* Option 2: Medium Summary */}
                  <div
                    onClick={() => setSummaryLength('medium')}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      summaryLength === 'medium'
                        ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 shadow-xs'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-indigo-700">Medium Summary</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        900 - 1200 Words
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-snug">
                      Standard balanced academic notes with subheadings and key formulas.
                    </p>
                  </div>

                  {/* Option 3: Large Detailed Summary */}
                  <div
                    onClick={() => setSummaryLength('large')}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      summaryLength === 'large'
                        ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 shadow-xs'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-indigo-700">Large Detailed Summary</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        1200+ Words (Comprehensive)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-snug">
                      Exhaustive deep dive capturing full textbook chapter details and derivations.
                    </p>
                  </div>

                  {/* Option 4: Exam Ready Summary */}
                  <div
                    onClick={() => setSummaryLength('exam_ready')}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      summaryLength === 'exam_ready'
                        ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 shadow-xs'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-indigo-700">Exam Ready Master</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        1200+ Words (Exam Ready)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-snug">
                      High-yield exam cheat sheet with formulas, viva traps, and step-by-step proofs.
                    </p>
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSummarize}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-black text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{loadingStep || 'Summarizing PDF with Gemini AI...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Summarize PDF with Gemini AI</span>
                  </>
                )}
              </button>

            </div>
          )}

          {/* 3. GENERATED SUMMARY OUTPUT VIEW */}
          {currentSummary && (
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* Top Summary Banner */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {currentSummary.subject}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                        {currentSummary.summaryLength.toUpperCase()} MODE
                      </span>
                      <span className="text-[10px] text-slate-500 font-black flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> ~{currentSummary.wordCount} words ({currentSummary.estimatedReadTimeMinutes} min read)
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{currentSummary.title}</h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
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
                      <Download className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Export PDF</span>
                    </button>

                    {onSaveSuite && (
                      <button
                        onClick={handleSaveAsStudySuite}
                        disabled={savedToSuite}
                        className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          savedToSuite
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{savedToSuite ? 'Saved in Study Hub ✓' : 'Save to Study Hub'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub-Tab Navigation Bar */}
                <div className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl overflow-x-auto text-xs font-bold border border-slate-200/80">
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'summary' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Brief & Takeaways
                  </button>

                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'notes' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Structured Notes (~{currentSummary.wordCount} words)
                  </button>

                  <button
                    onClick={() => setActiveTab('terms')}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'terms' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Terminology ({currentSummary.keyTerminology?.length || 0})
                  </button>

                  <button
                    onClick={() => setActiveTab('exam')}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'exam' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Exam Questions ({currentSummary.examQuestions?.length || 0})
                  </button>

                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'flashcards' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Flashcards ({currentSummary.flashcards?.length || 0})
                  </button>
                </div>
              </div>

              {/* TAB 1: Executive Briefing & Key Takeaways */}
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-3xl bg-indigo-50/80 border border-indigo-200 space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-indigo-600 text-indigo-600" /> Executive Summary
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                      {currentSummary.executiveSummary}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                    <h3 className="text-sm font-extrabold text-slate-900 border-b pb-3 flex items-center gap-2">
                      <ListChecks className="w-4.5 h-4.5 text-indigo-600" /> Key High-Yield Takeaways
                    </h3>
                    <ul className="space-y-3">
                      {currentSummary.keyTakeaways?.map((kt, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{kt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actionable Follow-up Study Plan */}
                  {currentSummary.actionItems?.length > 0 && (
                    <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200 space-y-3">
                      <h3 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600" /> Next Actionable Study Steps
                      </h3>
                      <div className="space-y-2">
                        {currentSummary.actionItems.map((act, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-amber-950 font-medium">
                            <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">
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
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Structured Lecture & Textbook Notes
                    </h3>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                      ~{currentSummary.wordCount} Words Output
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans space-y-3">
                    {currentSummary.structuredNotes}
                  </div>
                </div>
              )}

              {/* TAB 3: Key Terminology Dictionary */}
              {activeTab === 'terms' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 border-b pb-3">
                    Key Terminology & Definitions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentSummary.keyTerminology?.map((kt, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <span className="text-xs font-black text-indigo-600">{kt.term}</span>
                        <p className="text-xs text-slate-700 leading-snug">{kt.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Exam Questions */}
              {activeTab === 'exam' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 border-b pb-3">
                    High-Probability Viva & Exam Questions
                  </h3>
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
                <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
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
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-500/20'
                            : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-indigo-400'
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
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer"
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
          )}

        </div>

      </div>
    </div>
  );
};
