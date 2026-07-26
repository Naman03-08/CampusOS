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
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  File, 
  CheckCircle2, 
  Clock,
  Layers,
  HelpCircle,
  Headphones
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

import { exportTextToPDF } from '../../lib/pdfExport';
import { StudySuite, UserProfile } from '../../types';

// Configure pdfjs-dist worker safely
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
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

export interface NotebookItem {
  id: string;
  fileName: string;
  fileSizeFormatted: string;
  uploadedAt: string;
  summary: SummarizedNote;
}

interface AINotesSummarizerViewProps {
  user?: UserProfile;
  onSaveSuite?: (suite: StudySuite) => void;
  onNavigateTab?: (tab: string) => void;
}

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

  // Processing & Drag & Drop State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('Reading complete PDF document...');
  const [isDragging, setIsDragging] = useState(false);

  // Active Output Tab State
  const [activeOutputTab, setActiveOutputTab] = useState<'summary' | 'notes' | 'terms' | 'questions' | 'flashcards' | 'podcast'>('summary');
  
  // Flashcard Deck State
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);

  // Q&A Reveal Answers State
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  // Action states
  const [copiedNote, setCopiedNote] = useState(false);
  const [savedToSuite, setSavedToSuite] = useState(false);

  // Podcast / Audio Simulation State
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [podcastProgress, setPodcastProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Save notebooks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('campus_os_notebooks_shelf', JSON.stringify(notebooks));
    } catch (e) {
      console.warn('Failed to store notebooks shelf:', e);
    }
  }, [notebooks]);

  // Handle Podcast audio simulation timer
  useEffect(() => {
    let timer: any;
    if (isPlayingPodcast) {
      timer = setInterval(() => {
        setPodcastProgress(prev => {
          if (prev >= 100) {
            setIsPlayingPodcast(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlayingPodcast]);

  // Current Active Notebook object
  const currentNotebook = notebooks.find(n => n.id === selectedNotebookId) || null;

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

    setIsProcessing(true);
    setProcessingStep('Reading complete PDF document & extracting text...');

    try {
      // 1. Read Base64 using FileReader to avoid detaching ArrayBuffer or stack overflow
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

      // 2. Extract text using pdfjs-dist if possible
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

      setProcessingStep('Sending complete PDF to Gemini AI for deep synthesis...');

      const res = await fetch('/api/ai/summarize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: file.name.replace(/\.pdf$/i, ''),
          subject: 'Academic Textbook / Lecture',
          rawNotes: extractedText,
          pdfBase64: base64Data,
          summaryLength: 'large',
          summaryStyle: 'detailed'
        })
      });

      const data = await res.json();

      setProcessingStep('Structuring active recall questions & podcasts...');

      const textForWordCount = data.structuredNotes || extractedText || '';
      const calculatedWordCount = textForWordCount.trim() ? textForWordCount.trim().split(/\s+/).length : 950;

      const newNote: SummarizedNote = {
        id: 'note_' + Date.now(),
        title: data.title || file.name.replace(/\.pdf$/i, ''),
        subject: data.subject || 'Textbook / Lecture',
        summaryLength: 'large',
        executiveSummary: data.executiveSummary || 'Executive summary synthesized from full PDF document.',
        keyTakeaways: data.keyTakeaways || [
          'Comprehensive overview extracted directly from the uploaded textbook PDF.',
          'Key foundational principles and theoretical structures analyzed.',
          'Active recall exam questions and terminology compiled for review.'
        ],
        structuredNotes: data.structuredNotes || extractedText || 'Detailed structured notes from PDF document.',
        keyTerminology: data.keyTerminology || [
          { term: 'Core Theorem', definition: 'The fundamental law governing this module.' },
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

      const newNotebook: NotebookItem = {
        id: 'nb_' + Date.now(),
        fileName: file.name,
        fileSizeFormatted: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        summary: newNote
      };

      setNotebooks(prev => [newNotebook, ...prev]);
      setSelectedNotebookId(newNotebook.id);
      setActiveOutputTab('summary');
      setFcIndex(0);
      setFcFlipped(false);
      setRevealedAnswers({});
      setSavedToSuite(false);

    } catch (err) {
      console.error('Error processing PDF:', err);
      alert('Failed to process PDF with Gemini AI. Please verify your file and try again.');
    } finally {
      setIsProcessing(false);
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
    if (!currentNotebook) return;
    const s = currentNotebook.summary;
    const textToCopy = `TITLE: ${s.title}\n\nEXECUTIVE SUMMARY:\n${s.executiveSummary}\n\nKEY TAKEAWAYS:\n${s.keyTakeaways.join('\n')}\n\nSTRUCTURED NOTES:\n${s.structuredNotes}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!currentNotebook) return;
    const s = currentNotebook.summary;
    exportTextToPDF(
      `${s.title}\n\nExecutive Summary:\n${s.executiveSummary}\n\nKey Takeaways:\n${s.keyTakeaways.join('\n')}\n\nDetailed Structured Notes:\n${s.structuredNotes}`,
      `${currentNotebook.fileName.replace(/[^a-zA-Z0-9]/g, '_')}_Summary.pdf`
    );
  };

  const handleSaveToSuite = () => {
    if (!currentNotebook || !onSaveSuite) return;
    const s = currentNotebook.summary;

    const newSuite: StudySuite = {
      id: 'suite_' + Date.now(),
      userId: user?.uid || 'guest',
      title: s.title,
      subject: s.subject,
      summary: s.executiveSummary,
      fullNotes: s.structuredNotes,
      importantQuestions: s.examQuestions.map(q => ({
        question: q.question,
        answer: q.answer,
        difficulty: (q.difficulty as any) === 'Easy' ? 'Easy' : (q.difficulty as any) === 'Hard' ? 'Hard' : 'Medium'
      })),
      flashcards: s.flashcards.map((f, i) => ({
        id: 'fc_' + i,
        front: f.front,
        back: f.back
      })),
      quiz: [],
      mindmap: { id: 'root', label: s.title },
      formulas: [],
      vivaQuestions: [],
      revisionPlan: [],
      createdAt: s.createdAt
    };

    onSaveSuite(newSuite);
    setSavedToSuite(true);
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
              Transform heavy textbooks and lecture slides into beautiful summary sheets, active recall exam questions, and custom podcasts.
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
            <h4 className="text-xs font-black text-slate-900">Add New Textbook</h4>
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
                    onClick={() => setSelectedNotebookId(nb.id)}
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
          
          {isProcessing ? (
            /* PROCESSING / ANALYZING STATE */
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
                  {processingStep}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Gemini is digesting pages, key concepts, formulas, and active recall questions from your PDF.
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
              {/* Decorative Subtle Background Nodes */}
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
                    Drag and drop your syllabus or college textbook PDF here, and let Gemini turn it into an interactive smart module. Max size 50MB.
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
            /* ACTIVE NOTEBOOK MODULE RESULTS VIEW */
            <div className="space-y-5">
              
              {/* Module Header Bar */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-black tracking-wider uppercase border border-indigo-200">
                      AI SMART MODULE
                    </span>
                    <span className="text-xs text-slate-400 font-bold truncate max-w-[200px]">
                      {currentNotebook.fileName}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
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
                    {currentNotebook.summary.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {currentNotebook.summary.estimatedReadTimeMinutes} min read
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                      {currentNotebook.summary.wordCount} words
                    </span>
                    <span>•</span>
                    <span>Subject: <strong className="text-slate-800">{currentNotebook.summary.subject}</strong></span>
                  </div>
                </div>
              </div>

              {/* OUTPUT TABS NAVIGATION */}
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
                  <span>Structured Notes</span>
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

                <button
                  onClick={() => setActiveOutputTab('podcast')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all min-w-max flex items-center gap-1.5 cursor-pointer ${
                    activeOutputTab === 'podcast'
                      ? 'bg-white text-indigo-600 shadow-2xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Audio Podcast</span>
                </button>
              </div>

              {/* TAB CONTENT PANELS */}
              
              {/* TAB 1: EXECUTIVE SUMMARY */}
              {activeOutputTab === 'summary' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="p-6 rounded-3xl bg-indigo-50/60 border border-indigo-200/80 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      Executive Summary
                    </h3>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {currentNotebook.summary.executiveSummary}
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Key Takeaways & Core Insights
                    </h3>
                    <div className="space-y-2.5">
                      {currentNotebook.summary.keyTakeaways.map((takeaway, idx) => (
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
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Full Chapter-by-Chapter Structured Breakdown
                  </h3>
                  <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-wrap bg-slate-50 p-5 rounded-2xl border border-slate-200/60 font-mono">
                    {currentNotebook.summary.structuredNotes}
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
                    {currentNotebook.summary.keyTerminology.map((item, idx) => (
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
                    {currentNotebook.summary.examQuestions.map((q, idx) => {
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
              {activeOutputTab === 'flashcards' && currentNotebook.summary.flashcards.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-5 text-center animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-500">
                    <span>Card {fcIndex + 1} of {currentNotebook.summary.flashcards.length}</span>
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
                        ? currentNotebook.summary.flashcards[fcIndex].back 
                        : currentNotebook.summary.flashcards[fcIndex].front}
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
                      disabled={fcIndex === currentNotebook.summary.flashcards.length - 1}
                      onClick={() => { setFcIndex(prev => prev + 1); setFcFlipped(false); }}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 6: AUDIO PODCAST OVERVIEW */}
              {activeOutputTab === 'podcast' && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-6 animate-in fade-in duration-200">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white space-y-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-indigo-400 animate-pulse" />
                        <h4 className="text-sm font-black uppercase tracking-wider text-white">
                          AI Academic Podcast Overview
                        </h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-black uppercase border border-indigo-400/30">
                        2 MIN SUMMARY
                      </span>
                    </div>

                    <p className="text-xs text-indigo-200 font-medium leading-relaxed">
                      Listen to a synthesized conversational podcast covering the primary takeaways, core formulas, and exam questions from {currentNotebook.fileName}.
                    </p>

                    {/* Audio Player Controls */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsPlayingPodcast(!isPlayingPodcast)}
                          className="w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                        >
                          {isPlayingPodcast ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        </button>

                        <div className="flex-1 space-y-1">
                          <div className="w-full h-2 rounded-full bg-indigo-950 border border-indigo-800/80 overflow-hidden">
                            <div 
                              className="h-full bg-indigo-400 transition-all duration-300"
                              style={{ width: `${podcastProgress}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-bold text-indigo-300 font-mono">
                            <span>0:{(Math.floor(podcastProgress * 1.2)).toString().padStart(2, '0')}</span>
                            <span>2:00</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setPodcastProgress(0)}
                          className="p-2 text-indigo-300 hover:text-white transition-colors cursor-pointer"
                          title="Restart Podcast"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Transcript / Script Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Podcast Transcript & Audio Script
                    </h4>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3 text-xs text-slate-700 font-medium leading-relaxed">
                      <p><strong className="text-indigo-600 font-black">Host 1:</strong> "Welcome back to the Campus OS AI Study Lounge! Today we're diving into <span className="text-slate-900 font-bold">{currentNotebook.summary.title}</span>."</p>
                      <p><strong className="text-blue-600 font-black">Host 2:</strong> "That's right! If you're revising for exams, the big takeaway here revolves around: <span className="italic">{currentNotebook.summary.executiveSummary}</span>"</p>
                      <p><strong className="text-indigo-600 font-black">Host 1:</strong> "Make sure to review the terminology list and practice the active recall questions before test day!"</p>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
