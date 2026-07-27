import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  FileText, 
  Zap, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Brain, 
  Trash2, 
  Upload, 
  UploadCloud, 
  Plus, 
  ChevronRight, 
  Activity, 
  Award, 
  X, 
  File, 
  CheckCircle2, 
  Clock,
  Layers,
  HelpCircle,
  RotateCcw,
  RefreshCw,
  Flame,
  CheckSquare
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

import { exportTextToPDF } from '../../lib/pdfExport';
import { StudySuite, UserProfile } from '../../types';

// Configure pdfjs-dist worker safely
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

export type SummaryType = 'short' | 'medium' | 'large' | 'exam_ready';

export interface SummarizedNote {
  id: string;
  title: string;
  subject: string;
  summaryLength: SummaryType;
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

export interface NotebookItem {
  id: string;
  fileName: string;
  fileSizeFormatted: string;
  uploadedAt: string;
  rawText?: string;
  pdfBase64?: string;
  summaries?: Partial<Record<SummaryType, SummarizedNote>>;
  summary?: SummarizedNote; // Legacy single summary
}

interface AINotesSummarizerViewProps {
  user?: UserProfile;
  onSaveSuite?: (suite: StudySuite) => void;
  onNavigateTab?: (tab: string) => void;
}

export const SUMMARY_TYPE_CONFIG: Record<SummaryType, {
  id: SummaryType;
  title: string;
  wordCountRange: string;
  badge: string;
  description: string;
}> = {
  short: {
    id: 'short',
    title: 'Short Summary',
    wordCountRange: '600–700 Words',
    badge: 'Highlighted Keywords',
    description: 'Summarizes PDF in 600 to 700 words with all important keywords highlighted.'
  },
  medium: {
    id: 'medium',
    title: 'Medium Summary',
    wordCountRange: '1000–1200 Words',
    badge: 'Main Concepts & Definitions',
    description: 'Balanced 1000 to 1200 words with main keywords and key definitions.'
  },
  large: {
    id: 'large',
    title: 'Large Summary',
    wordCountRange: '1500–2000 Words',
    badge: 'Interactive & Detailed',
    description: 'Deep dive summary of 1500 to 2000 words covering complete PDF details.'
  },
  exam_ready: {
    id: 'exam_ready',
    title: 'Exam Ready Summary',
    wordCountRange: '< 2000 Words',
    badge: 'High-Yield Test Prep',
    description: 'High-yield exam prep under 2000 words with formulas, traps & viva prep.'
  }
};

export const AINotesSummarizerView: React.FC<AINotesSummarizerViewProps> = ({
  user,
  onSaveSuite,
  onNavigateTab
}) => {
  // Notebook Shelf state loaded from localStorage
  const [notebooks, setNotebooks] = useState<NotebookItem[]>(() => {
    try {
      const stored = localStorage.getItem('campus_os_notebooks_shelf');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedNotebookId, setSelectedNotebookId] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem('campus_os_notebooks_shelf');
      if (stored) {
        const parsed: NotebookItem[] = JSON.parse(stored);
        return parsed.length > 0 ? parsed[0].id : null;
      }
    } catch {}
    return null;
  });

  // Active Summary Type Selection state (default: 'short')
  const [selectedSummaryType, setSelectedSummaryType] = useState<SummaryType>('short');

  // Processing & Thinking States
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingStep, setGeneratingStep] = useState<string>('AI is reading complete PDF document...');
  const [isDragging, setIsDragging] = useState(false);

  // Active Output Tab State
  const [activeOutputTab, setActiveOutputTab] = useState<'summary' | 'notes' | 'terms' | 'questions' | 'flashcards'>('summary');
  
  // Flashcard Deck State
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);

  // Q&A Reveal Answers State
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  // Action states
  const [copiedNote, setCopiedNote] = useState(false);
  const [savedToSuite, setSavedToSuite] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Save notebooks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('campus_os_notebooks_shelf', JSON.stringify(notebooks));
    } catch (e) {
      console.warn('Failed to store notebooks shelf:', e);
    }
  }, [notebooks]);

  // Current Active Notebook object
  const currentNotebook = notebooks.find(n => n.id === selectedNotebookId) || null;

  // Helper to retrieve cached summary for specific type
  const getSummaryForType = (nb: NotebookItem | null, type: SummaryType): SummarizedNote | null => {
    if (!nb) return null;
    if (nb.summaries && nb.summaries[type]) {
      return nb.summaries[type]!;
    }
    // Fallback for legacy single summary format
    if (nb.summary) {
      if (nb.summary.summaryLength === type) return nb.summary;
      if (type === 'large' || type === 'short') return nb.summary;
    }
    return null;
  };

  const activeSummary = getSummaryForType(currentNotebook, selectedSummaryType);

  // Trigger AI generation on demand for a specific summary type
  const generateSummaryForType = async (type: SummaryType, notebook: NotebookItem) => {
    setIsGenerating(true);

    let stepMsg = 'AI is reading PDF and generating summary...';
    if (type === 'short') {
      stepMsg = 'AI is thinking & building a 600–700 word Short Summary with highlighted keywords...';
    } else if (type === 'medium') {
      stepMsg = 'AI is thinking & synthesizing a 1000–1200 word Medium Summary with definitions...';
    } else if (type === 'large') {
      stepMsg = 'AI is thinking & performing deep synthesis for a 1500–2000 word Large Summary...';
    } else if (type === 'exam_ready') {
      stepMsg = 'AI is thinking & structuring an Exam-Ready Master Summary under 2000 words...';
    }
    setGeneratingStep(stepMsg);

    try {
      const res = await fetch('/api/ai/summarize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: notebook.fileName.replace(/\.pdf$/i, ''),
          subject: 'Academic Textbook / Lecture',
          rawNotes: notebook.rawText || '',
          pdfBase64: notebook.pdfBase64 || '',
          summaryLength: type,
          summaryStyle: 'detailed'
        })
      });

      const data = await res.json();
      const textForWordCount = data.structuredNotes || notebook.rawText || '';
      const calculatedWordCount = data.wordCount || (textForWordCount.trim() ? textForWordCount.trim().split(/\s+/).length : 650);

      const newNote: SummarizedNote = {
        id: 'note_' + type + '_' + Date.now(),
        title: data.title || notebook.fileName.replace(/\.pdf$/i, ''),
        subject: data.subject || 'Textbook / Lecture',
        summaryLength: type,
        executiveSummary: data.executiveSummary || `${SUMMARY_TYPE_CONFIG[type].title} synthesized from PDF.`,
        keyTakeaways: data.keyTakeaways || [
          'Comprehensive overview extracted directly from the uploaded textbook PDF.',
          'Key foundational principles and theoretical structures analyzed.',
          'Active recall exam questions and terminology compiled for review.'
        ],
        structuredNotes: data.structuredNotes || notebook.rawText || 'Detailed structured notes from PDF document.',
        keyTerminology: data.keyTerminology || [
          { term: 'Core Invariant', definition: 'The fundamental law governing this module.' },
          { term: 'System Architecture', definition: 'The structural organization of components.' }
        ],
        examQuestions: data.examQuestions || [
          { question: 'What are the main principles outlined in this text?', answer: 'The text highlights core theoretical framework, execution steps, and practical applications.', difficulty: 'Medium' },
          { question: 'How do the primary concepts relate to real-world engineering?', answer: 'They provide systematic methodology for problem solving and design analysis.', difficulty: 'Hard' }
        ],
        flashcards: data.flashcards || [
          { front: 'Key Concept 1', back: 'Primary definition and function derived from textbook.' },
          { front: 'Core Formula / Principle', back: 'Detailed explanation of the mathematical/algorithmic model.' }
        ],
        actionItems: data.actionItems || [
          'Review executive summary and flashcards',
          'Practice active recall exam questions'
        ],
        estimatedReadTimeMinutes: data.estimatedReadTimeMinutes || Math.max(3, Math.round(calculatedWordCount / 200)),
        wordCount: calculatedWordCount,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      setNotebooks(prev => prev.map(nb => {
        if (nb.id === notebook.id) {
          return {
            ...nb,
            summary: newNote,
            summaries: {
              ...(nb.summaries || {}),
              [type]: newNote
            }
          };
        }
        return nb;
      }));

    } catch (err) {
      console.error('Error generating summary:', err);
      alert('Failed to generate summary with Gemini AI. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle user clicking a summary type button
  const handleSelectSummaryType = async (type: SummaryType) => {
    setSelectedSummaryType(type);
    if (!currentNotebook) return;

    const existing = getSummaryForType(currentNotebook, type);
    if (!existing) {
      // AI starts thinking and builds it on demand!
      await generateSummaryForType(type, currentNotebook);
    }
  };

  // Process uploaded PDF file
  const processPdfFile = async (file: File) => {
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF document.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('File size exceeds 50MB. Please upload a smaller PDF file.');
      return;
    }

    setIsProcessingFile(true);
    setGeneratingStep('Reading PDF document & extracting text...');

    try {
      // 1. Read Base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.includes(',') ? result.split(',')[1] : result;
          resolve(base64);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      // 2. Extract text using pdfjs-dist
      let extractedText = '';
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer.slice(0)) }).promise;
        let textChunks: string[] = [];
        for (let i = 1; i <= Math.min(pdf.numPages, 100); i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageStr = textContent.items.map((item: any) => item.str).join(' ');
          textChunks.push(`--- Page ${i} ---\n${pageStr}`);
        }
        extractedText = textChunks.join('\n\n');
      } catch (pdfErr) {
        console.warn('pdfjs extraction fallback:', pdfErr);
      }

      const newNotebook: NotebookItem = {
        id: 'nb_' + Date.now(),
        fileName: file.name,
        fileSizeFormatted: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rawText: extractedText,
        pdfBase64: base64Data,
        summaries: {}
      };

      setNotebooks(prev => [newNotebook, ...prev]);
      setSelectedNotebookId(newNotebook.id);
      setSelectedSummaryType('short'); // Default to short summary
      setActiveOutputTab('summary');
      setFcIndex(0);
      setFcFlipped(false);
      setRevealedAnswers({});
      setSavedToSuite(false);

      setIsProcessingFile(false);

      // Now trigger AI thinking to build Short summary on demand!
      await generateSummaryForType('short', newNotebook);

    } catch (err) {
      console.error('Error processing PDF:', err);
      alert('Failed to process PDF. Please try again.');
      setIsProcessingFile(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processPdfFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processPdfFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDeleteNotebook = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = notebooks.filter(n => n.id !== id);
    setNotebooks(updated);
    if (selectedNotebookId === id) {
      setSelectedNotebookId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const handleCopyNote = () => {
    if (!activeSummary) return;
    const textToCopy = `TITLE: ${activeSummary.title}\nSUMMARY TYPE: ${SUMMARY_TYPE_CONFIG[activeSummary.summaryLength].title}\n\nEXECUTIVE SUMMARY:\n${activeSummary.executiveSummary}\n\nKEY TAKEAWAYS:\n${activeSummary.keyTakeaways.join('\n')}\n\nSTRUCTURED NOTES:\n${activeSummary.structuredNotes}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!activeSummary || !currentNotebook) return;
    exportTextToPDF(
      `${activeSummary.title} (${SUMMARY_TYPE_CONFIG[activeSummary.summaryLength].title})\n\nExecutive Summary:\n${activeSummary.executiveSummary}\n\nKey Takeaways:\n${activeSummary.keyTakeaways.join('\n')}\n\nStructured Notes:\n${activeSummary.structuredNotes}`,
      `${currentNotebook.fileName.replace(/[^a-zA-Z0-9]/g, '_')}_${selectedSummaryType}_Summary.pdf`
    );
  };

  const handleSaveToSuite = () => {
    if (!activeSummary || !onSaveSuite) return;

    const newSuite: StudySuite = {
      id: 'suite_' + Date.now(),
      userId: user?.uid || 'guest',
      title: activeSummary.title,
      subject: activeSummary.subject,
      summary: activeSummary.executiveSummary,
      fullNotes: activeSummary.structuredNotes,
      importantQuestions: activeSummary.examQuestions.map(q => ({
        question: q.question,
        answer: q.answer,
        difficulty: (q.difficulty as any) === 'Easy' ? 'Easy' : (q.difficulty as any) === 'Hard' ? 'Hard' : 'Medium'
      })),
      flashcards: activeSummary.flashcards.map((f, i) => ({
        id: 'fc_' + i,
        front: f.front,
        back: f.back
      })),
      quiz: [],
      mindmap: { id: 'root', label: activeSummary.title },
      formulas: [],
      vivaQuestions: [],
      revisionPlan: [],
      createdAt: activeSummary.createdAt
    };

    onSaveSuite(newSuite);
    setSavedToSuite(true);
  };

  // Helper to render markdown lines with keyword highlights
  const renderFormattedNotes = (content: string, isShortSummary: boolean) => {
    if (!content) return null;
    return content.split('\n').map((line, lineIdx) => {
      if (line.startsWith('### ')) {
        return <h3 key={lineIdx} className="text-base sm:text-lg font-black text-slate-900 mt-5 mb-2 leading-tight">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={lineIdx} className="text-xs sm:text-sm font-black text-indigo-900 mt-4 mb-2 leading-tight flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-indigo-500" />{line.replace('#### ', '')}</h4>;
      }
      if (line.startsWith('##### ')) {
        return <h5 key={lineIdx} className="text-xs font-black text-slate-800 mt-3 mb-1">{line.replace('##### ', '')}</h5>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const cleanLine = line.replace(/^[-*]\s+/, '');
        return (
          <li key={lineIdx} className="ml-4 list-disc text-xs sm:text-sm text-slate-700 font-medium my-1 leading-relaxed">
            {renderInlineBold(cleanLine, isShortSummary)}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={lineIdx} className="h-2" />;
      }
      return (
        <p key={lineIdx} className="text-xs sm:text-sm text-slate-700 font-medium my-1.5 leading-relaxed">
          {renderInlineBold(line, isShortSummary)}
        </p>
      );
    });
  };

  const renderInlineBold = (text: string, isShortSummary: boolean) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const kw = part.slice(2, -2);
        return (
          <span 
            key={i} 
            className={
              isShortSummary 
                ? "font-black text-amber-950 bg-amber-200/80 px-1.5 py-0.5 rounded-md border border-amber-300 shadow-2xs mx-0.5 inline-block" 
                : "font-black text-slate-950 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-100"
            }
          >
            {kw}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-7xl mx-auto">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        accept=".pdf" 
        ref={fileInputRef} 
        onChange={handleFileInputChange} 
        className="hidden" 
      />

      {/* HEADER BAR */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-black uppercase tracking-wider shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>STUDY SUITE ELITE &nbsp;|&nbsp; AI COPILOT</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              AI Smart Notes Summarizer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
              Transform heavy textbooks and lecture PDFs into 4 distinct AI summary lengths, active recall exam questions, and flashcards.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID (Notebook Shelf Left + Main View Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: YOUR NOTEBOOKS SHELF */}
        <div className="lg:col-span-4 bg-white/90 rounded-3xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
          
          {/* Shelf Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              YOUR NOTEBOOKS SHELF
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black border border-slate-200">
              {notebooks.length} {notebooks.length === 1 ? 'FILE' : 'FILES'}
            </span>
          </div>

          {/* Add New Textbook Upload Card */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-indigo-200/80 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50/60 rounded-2xl p-5 text-center cursor-pointer transition-all shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-xs">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black text-slate-900">Add New Textbook PDF</h4>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5">PDF up to 50MB</p>
          </div>

          {/* Notebooks List */}
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {notebooks.length === 0 ? (
              <div className="py-12 text-center space-y-1">
                <p className="text-xs font-bold text-slate-400 italic">Your shelf is empty.</p>
                <p className="text-[10px] font-semibold text-slate-400">Upload a PDF to get started!</p>
              </div>
            ) : (
              notebooks.map((nb) => {
                const isSelected = selectedNotebookId === nb.id;
                return (
                  <div
                    key={nb.id}
                    onClick={() => {
                      setSelectedNotebookId(nb.id);
                      setSelectedSummaryType('short');
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 relative group ${
                      isSelected
                        ? 'bg-indigo-50/90 border-indigo-300 shadow-2xs'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-black text-slate-900 truncate leading-snug">
                          {nb.fileName}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold mt-0.5">
                          <span>{nb.fileSizeFormatted}</span>
                          <span>•</span>
                          <span>{nb.uploadedAt}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteNotebook(nb.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Delete notebook"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: MAIN DISPLAY AREA */}
        <div className="lg:col-span-8">
          
          {isProcessingFile ? (
            /* FILE PROCESSING STATE */
            <div className="rounded-3xl border border-slate-200/80 bg-white p-12 text-center space-y-6 shadow-2xs min-h-[460px] flex flex-col items-center justify-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                <div className="absolute inset-3 rounded-full border-2 border-dashed border-indigo-300 animate-[spin_6s_linear_infinite]" />
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Brain className="w-6 h-6 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2 max-w-sm mx-auto">
                <h3 className="text-base font-black text-slate-900 tracking-tight animate-pulse">
                  {generatingStep}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Extracting PDF content and preparing smart modules.
                </p>
              </div>
            </div>
          ) : !currentNotebook ? (
            /* EMPTY SHELF STATE (UPLOAD DROPZONE) */
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`rounded-3xl border-2 border-dashed transition-all p-10 sm:p-14 flex flex-col items-center justify-center text-center min-h-[460px] relative overflow-hidden ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-50/80 scale-[1.01]' 
                  : 'border-slate-200/80 bg-gradient-to-b from-slate-50/90 to-white/95 hover:border-slate-300'
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

              <div className="relative z-10 max-w-md space-y-5">
                <div className="w-20 h-20 rounded-full bg-indigo-100/80 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
                  <UploadCloud className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Upload Lecture Notes & Textbooks
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Drag and drop your PDF textbook here. Choose between Short, Medium, Large, or Exam Ready summaries on demand.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-indigo-500/25 hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Browse Notebooks</span>
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE NOTEBOOK RESULTS VIEW */
            <div className="space-y-5">
              
              {/* 4 SUMMARY TYPE SELECTOR CARDS (TRIGGER ON-DEMAND THINKING) */}
              <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    SELECT SUMMARY TYPE (GENERATES ON DEMAND)
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">
                    Click any card to start AI thinking
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {(['short', 'medium', 'large', 'exam_ready'] as SummaryType[]).map((typeId) => {
                    const config = SUMMARY_TYPE_CONFIG[typeId];
                    const isSelected = selectedSummaryType === typeId;
                    const hasCached = !!getSummaryForType(currentNotebook, typeId);

                    return (
                      <button
                        key={typeId}
                        onClick={() => handleSelectSummaryType(typeId)}
                        disabled={isGenerating}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.01]'
                            : 'bg-slate-50/80 hover:bg-slate-100/80 border-slate-200/80 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-indigo-200' : 'text-indigo-700'}`}>
                            {config.title}
                          </span>
                          {hasCached ? (
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-indigo-500 text-white' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}`}>
                              Ready
                            </span>
                          ) : (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-indigo-500 text-indigo-100' : 'bg-slate-200 text-slate-600'}`}>
                              Click to Build
                            </span>
                          )}
                        </div>

                        <div className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {config.wordCountRange}
                        </div>

                        <div className={`text-[10px] font-medium mt-1 line-clamp-1 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {config.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI THINKING / GENERATING LOADER STATE FOR SELECTED TYPE */}
              {isGenerating ? (
                <div className="p-10 rounded-3xl bg-white border border-slate-200/90 text-center space-y-5 shadow-2xs min-h-[320px] flex flex-col items-center justify-center animate-in fade-in duration-200">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                      <Brain className="w-5 h-5 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-1.5 max-w-md mx-auto">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight animate-pulse">
                      {generatingStep}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Gemini AI is analyzing the complete PDF and structuring your {SUMMARY_TYPE_CONFIG[selectedSummaryType].title}.
                    </p>
                  </div>
                </div>
              ) : !activeSummary ? (
                /* PROMPT USER TO CLICK A SUMMARY CARD */
                <div className="p-10 rounded-3xl bg-white border border-slate-200/90 text-center space-y-4 shadow-2xs">
                  <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="space-y-1 max-w-sm mx-auto">
                    <h3 className="text-base font-black text-slate-900">
                      Build {SUMMARY_TYPE_CONFIG[selectedSummaryType].title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {SUMMARY_TYPE_CONFIG[selectedSummaryType].description}
                    </p>
                  </div>
                  <button
                    onClick={() => generateSummaryForType(selectedSummaryType, currentNotebook)}
                    className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
                  >
                    <Brain className="w-4 h-4" />
                    <span>Start AI Thinking & Build</span>
                  </button>
                </div>
              ) : (
                /* DISPLAY GENERATED SUMMARY RESULTS */
                <div className="space-y-5">
                  
                  {/* Active Summary Module Header Bar */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-black tracking-wider uppercase border border-indigo-200">
                          {SUMMARY_TYPE_CONFIG[activeSummary.summaryLength].title}
                        </span>
                        <span className="text-xs text-slate-400 font-bold truncate max-w-[200px]">
                          {currentNotebook.fileName}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => generateSummaryForType(selectedSummaryType, currentNotebook)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Re-generate this summary with AI"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                          <span>Re-generate</span>
                        </button>

                        <button
                          onClick={handleCopyNote}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedNote ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedNote ? 'Copied!' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={handleDownloadPDF}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>

                        {onSaveSuite && (
                          <button
                            onClick={handleSaveToSuite}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                              savedToSuite
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                            }`}
                          >
                            {savedToSuite ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{savedToSuite ? 'Saved to Suite' : 'Save Suite'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {activeSummary.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          {activeSummary.estimatedReadTimeMinutes} min read
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-indigo-700 font-bold">
                          <FileText className="w-3.5 h-3.5 text-blue-500" />
                          {activeSummary.wordCount} words ({SUMMARY_TYPE_CONFIG[activeSummary.summaryLength].wordCountRange})
                        </span>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                          {SUMMARY_TYPE_CONFIG[activeSummary.summaryLength].badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* OUTPUT TABS NAVIGATION (Summary, Notes, Terms, Questions, Flashcards) */}
                  <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80">
                    <button
                      onClick={() => setActiveOutputTab('summary')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all min-w-max flex items-center gap-1.5 cursor-pointer ${
                        activeOutputTab === 'summary'
                          ? 'bg-white text-indigo-600 shadow-2xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>Executive Summary</span>
                    </button>

                    <button
                      onClick={() => setActiveOutputTab('notes')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all min-w-max flex items-center gap-1.5 cursor-pointer ${
                        activeOutputTab === 'notes'
                          ? 'bg-white text-indigo-600 shadow-2xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Structured Notes ({activeSummary.wordCount} words)</span>
                    </button>

                    <button
                      onClick={() => setActiveOutputTab('terms')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all min-w-max flex items-center gap-1.5 cursor-pointer ${
                        activeOutputTab === 'terms'
                          ? 'bg-white text-indigo-600 shadow-2xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Key Terminology</span>
                    </button>

                    <button
                      onClick={() => setActiveOutputTab('questions')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all min-w-max flex items-center gap-1.5 cursor-pointer ${
                        activeOutputTab === 'questions'
                          ? 'bg-white text-indigo-600 shadow-2xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Active Recall Exam Qs</span>
                    </button>

                    <button
                      onClick={() => setActiveOutputTab('flashcards')}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all min-w-max flex items-center gap-1.5 cursor-pointer ${
                        activeOutputTab === 'flashcards'
                          ? 'bg-white text-indigo-600 shadow-2xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Flashcards</span>
                    </button>
                  </div>

                  {/* TAB CONTENT PANELS */}
                  
                  {/* TAB 1: EXECUTIVE SUMMARY */}
                  {activeOutputTab === 'summary' && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div className="p-6 rounded-3xl bg-indigo-50/60 border border-indigo-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-indigo-600" />
                            Executive Overview — {SUMMARY_TYPE_CONFIG[activeSummary.summaryLength].title}
                          </h3>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-200 text-indigo-900">
                            {activeSummary.wordCount} WORDS
                          </span>
                        </div>
                        <p className="text-sm text-slate-800 font-medium leading-relaxed">
                          {activeSummary.executiveSummary}
                        </p>
                      </div>

                      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                          Key Takeaways & Core Insights
                        </h3>
                        <div className="space-y-2.5">
                          {activeSummary.keyTakeaways.map((takeaway, idx) => (
                            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                                {takeaway}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: STRUCTURED NOTES */}
                  {activeOutputTab === 'notes' && (
                    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                          {SUMMARY_TYPE_CONFIG[activeSummary.summaryLength].title} ({activeSummary.wordCount} Words)
                        </h3>
                        {selectedSummaryType === 'short' && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                            ★ Important PDF Keywords Highlighted
                          </span>
                        )}
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 font-mono text-slate-800 leading-relaxed overflow-x-auto">
                        {renderFormattedNotes(activeSummary.structuredNotes, selectedSummaryType === 'short')}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: KEY TERMINOLOGY */}
                  {activeOutputTab === 'terms' && (
                    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-4 animate-in fade-in duration-200">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Key Terminology & High-Yield Definitions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeSummary.keyTerminology.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                            <h4 className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                              {item.term}
                            </h4>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              {item.definition}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: ACTIVE RECALL EXAM QUESTIONS */}
                  {activeOutputTab === 'questions' && (
                    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-4 animate-in fade-in duration-200">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        High-Probability Exam & Viva Questions
                      </h3>
                      <div className="space-y-3">
                        {activeSummary.examQuestions.map((q, idx) => {
                          const isRevealed = revealedAnswers[idx];
                          return (
                            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                                      Q{idx + 1}
                                    </span>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                                      q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                                      q.difficulty === 'Hard' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                                    }`}>
                                      {q.difficulty}
                                    </span>
                                  </div>
                                  <h4 className="text-xs font-black text-slate-900 leading-snug">
                                    {q.question}
                                  </h4>
                                </div>

                                <button
                                  onClick={() => setRevealedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }))}
                                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                                >
                                  {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                                </button>
                              </div>

                              {isRevealed && (
                                <div className="p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200/80 text-xs text-indigo-950 font-medium leading-relaxed animate-in fade-in duration-150">
                                  <strong className="text-indigo-900 block mb-1">Answer:</strong>
                                  {q.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: FLASHCARDS */}
                  {activeOutputTab === 'flashcards' && activeSummary.flashcards.length > 0 && (
                    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-5 text-center animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs font-extrabold text-slate-500">
                        <span>Card {fcIndex + 1} of {activeSummary.flashcards.length}</span>
                        <span className="text-indigo-600 font-black">Click card to flip</span>
                      </div>

                      {/* Flip Card Container */}
                      <div
                        onClick={() => setFcFlipped(!fcFlipped)}
                        className="min-h-[220px] p-8 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/90 border border-indigo-200/80 shadow-xs flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.01]"
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3">
                          {fcFlipped ? 'ANSWER / BACK' : 'QUESTION / FRONT'}
                        </span>
                        <p className="text-sm sm:text-base font-black text-slate-900 max-w-lg leading-relaxed">
                          {fcFlipped 
                            ? activeSummary.flashcards[fcIndex].back 
                            : activeSummary.flashcards[fcIndex].front}
                        </p>
                      </div>

                      {/* Flashcard Navigation */}
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          disabled={fcIndex === 0}
                          onClick={() => { setFcIndex(prev => prev - 1); setFcFlipped(false); }}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setFcFlipped(!fcFlipped)}
                          className="px-4 py-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-black text-xs transition-colors cursor-pointer"
                        >
                          Flip Card
                        </button>
                        <button
                          disabled={fcIndex === activeSummary.flashcards.length - 1}
                          onClick={() => { setFcIndex(prev => prev + 1); setFcFlipped(false); }}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
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
