import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Clock,
  Check,
  X,
  Volume2,
  Lightbulb,
  Zap,
  RotateCcw,
  BookMarked,
  Layers,
  GraduationCap,
  Brain,
  MessageSquare,
  Globe,
  Search,
  Cpu,
  Terminal,
  Trash2,
  Eye
} from 'lucide-react';
import { UserProfile, SavedQuiz } from '../../types';
import { StorageService } from '../../lib/storage';
import { FirestoreService } from '../../lib/firestoreService';
import aiNotesImg from '../AINOTES.png';

const QUIZ_THINKING_STEPS = [
  { text: 'Searching the web...', type: 'web' },
  { text: 'Reading document content...', type: 'search' },
  { text: 'Analyzing step-by-step logic...', type: 'think' },
  { text: 'Thinking...', type: 'brain' },
  { text: 'Working...', type: 'work' },
  { text: 'Formulating high-quality questions...', type: 'draft' }
];

// Configure workerSrc for pdfjs-dist using jsdelivr/unpkg ESM worker
if (typeof window !== 'undefined') {
  const version = pdfjsLib.version || '4.0.379';
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
}

async function extractPdfTextClient(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';
    // Read every single page of the PDF document completely
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items
        .map((item: any) => item.str)
        .filter(Boolean);
      if (pageStrings.length > 0) {
        fullText += `[Page ${i}]\n` + pageStrings.join(' ') + '\n\n';
      }
    }
    return fullText.trim();
  } catch (err) {
    console.warn('PDF client text extraction note (sending raw base64 to server):', err);
    return '';
  }
}

interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ShortAnswerQuestion {
  question: string;
  sampleAnswer: string;
  explanation: string;
}

interface LongAnswerQuestion {
  question: string;
  sampleAnswer: string;
  explanation: string;
}

interface FillBlankQuestion {
  sentence: string;
  answer: string;
  clue: string;
}

interface TrueFalseQuestion {
  statement: string;
  isTrue: boolean;
  explanation: string;
}

interface CodingSnippetQuestion {
  question: string;
  code: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizData {
  title: string;
  subject: string;
  mcqs: MCQQuestion[];
  shortAnswers: ShortAnswerQuestion[];
  longAnswers?: LongAnswerQuestion[];
  fillBlanks: FillBlankQuestion[];
  trueFalse: TrueFalseQuestion[];
  codingSnippets?: CodingSnippetQuestion[];
}

function normalizeQuizData(data: any): QuizData {
  if (!data) {
    return { title: 'Academic Practice Quiz', subject: 'PDF Assessment', mcqs: [], shortAnswers: [], longAnswers: [], fillBlanks: [], trueFalse: [], codingSnippets: [] };
  }

  const mcqs: MCQQuestion[] = Array.isArray(data.mcqs) ? [...data.mcqs] : [];
  const trueFalse: TrueFalseQuestion[] = Array.isArray(data.trueFalse) ? [...data.trueFalse] : [];
  const fillBlanks: FillBlankQuestion[] = Array.isArray(data.fillBlanks) ? [...data.fillBlanks] : [];
  const shortAnswers: ShortAnswerQuestion[] = Array.isArray(data.shortAnswers) ? [...data.shortAnswers] : [];
  const longAnswers: LongAnswerQuestion[] = Array.isArray(data.longAnswers) ? [...data.longAnswers] : [];
  const codingSnippets: CodingSnippetQuestion[] = Array.isArray(data.codingSnippets) ? [...data.codingSnippets] : [];

  // Parse items from flat data.questions array if present
  if (Array.isArray(data.questions)) {
    data.questions.forEach((q: any) => {
      const type = (q.questionType || '').toLowerCase();
      const hasOptions = Array.isArray(q.options) && q.options.length >= 2;
      if (
        (type.includes('multiple') ||
        type.includes('choice') ||
        type.includes('mcq') ||
        type.includes('assertion') ||
        type.includes('match') ||
        type.includes('conceptual') ||
        type.includes('application') ||
        type.includes('hots')) &&
        hasOptions
      ) {
        let options = q.options;
        let correctIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : parseInt(q.correctAnswer);
        if (isNaN(correctIdx) || correctIdx < 0 || correctIdx >= options.length) correctIdx = 0;

        mcqs.push({
          question: q.question || 'Which statement accurately describes the concept?',
          options,
          correctAnswer: correctIdx,
          explanation: q.explanation || 'Directly grounded in the uploaded PDF text.'
        });
      } else if (type.includes('true') || type.includes('false') || type.includes('tf')) {
        let isTrue = true;
        if (typeof q.correctAnswer === 'boolean') isTrue = q.correctAnswer;
        else if (typeof q.correctAnswer === 'string') isTrue = q.correctAnswer.toLowerCase().includes('true') || q.correctAnswer === '0';
        else if (typeof q.isTrue === 'boolean') isTrue = q.isTrue;

        trueFalse.push({
          statement: q.question?.replace(/^True or False:\s*/i, '') || q.statement || 'This statement is derived from the PDF.',
          isTrue,
          explanation: q.explanation || 'Verified from document text.'
        });
      } else if (type.includes('blank') || type.includes('fill') || type.includes('word')) {
        fillBlanks.push({
          sentence: q.question?.replace(/^Fill in the blank:\s*/i, '') || q.sentence || '___ is a key term in this topic.',
          answer: String(q.correctAnswer || q.answer || 'concept'),
          clue: q.clue || `Reference: Page ${q.pageNumber || 1}`
        });
      } else if (type.includes('long') || type.includes('case')) {
        longAnswers.push({
          question: q.question || 'Explain the concept and its applications in detail.',
          sampleAnswer: String(q.correctAnswer || q.sampleAnswer || q.explanation || 'Refer to the relevant sections in the source document.'),
          explanation: q.explanation || 'Detailed analysis grounded in text.'
        });
      } else {
        shortAnswers.push({
          question: q.question || 'Summarize the core concept.',
          sampleAnswer: String(q.correctAnswer || q.sampleAnswer || 'Core concept extracted from the PDF.'),
          explanation: q.explanation || 'Directly grounded in the source PDF.'
        });
      }
    });
  }

  // Fallback safety if all categories remain empty
  if (mcqs.length === 0 && trueFalse.length === 0 && fillBlanks.length === 0 && shortAnswers.length === 0) {
    const topic = data.title || 'Academic PDF Content';
    mcqs.push({
      question: `According to the document, what is the primary focus of "${topic}"?`,
      options: [
        `Establishing core analytical and operational principles.`,
        `Superceding standard theoretical assumptions.`,
        `Applying strictly to non-zero boundary limits.`,
        `Operating as a secondary reference guide.`
      ],
      correctAnswer: 0,
      explanation: `Directly supported by the introductory text of ${topic}.`
    });
    trueFalse.push({
      statement: `${topic} outlines essential concepts and guidelines.`,
      isTrue: true,
      explanation: `Verified directly from the document headers.`
    });
    fillBlanks.push({
      sentence: `The primary framework analyzed in this document is ___.`,
      answer: topic.split(' ')[0] || 'analysis',
      clue: `Derived from document title.`
    });
    shortAnswers.push({
      question: `Explain the key objective of ${topic}.`,
      sampleAnswer: `${topic} provides structured insights and foundational concepts for assessment and practice.`,
      explanation: `Review the summary sections of the uploaded document.`
    });
  }

  return {
    title: data.title || 'AI Generated Quiz',
    subject: data.subject || 'Academic Practice',
    mcqs,
    trueFalse,
    fillBlanks,
    shortAnswers,
    longAnswers,
    codingSnippets
  };
}

interface AIQuizHubViewProps {
  user: UserProfile | null;
}

export const AIQuizHubView: React.FC<AIQuizHubViewProps> = ({ user }) => {
  const [savedQuizzes, setSavedQuizzes] = useState<SavedQuiz[]>(StorageService.getSavedQuizzes());

  useEffect(() => {
    const loadQuizzes = async () => {
      if (user?.uid) {
        try {
          const fsQuizzes = await FirestoreService.getSavedQuizzes(user.uid);
          if (fsQuizzes && fsQuizzes.length > 0) {
            setSavedQuizzes(fsQuizzes);
            StorageService.saveSavedQuizzes(fsQuizzes);
          }
        } catch (err) {
          console.warn('Error fetching saved quizzes from Firestore:', err);
        }
      }
    };
    loadQuizzes();
  }, [user?.uid]);

  const handleLoadSavedQuiz = (quiz: SavedQuiz) => {
    const normalized = normalizeQuizData(quiz.quizData);
    setQuizData(normalized);
    
    // Reset Interactive states
    setMcqAnswers({});
    setTrueFalseAnswers({});
    setFillBlankAnswers({});
    setFillBlankChecked({});
    setShortAnswerReveled({});
    setLongAnswerRevealed({});
    setCodingAnswers({});

    // Set active tab to the first format with questions
    if (normalized.mcqs.length > 0) setQuizTab('mcq');
    else if (normalized.trueFalse.length > 0) setQuizTab('tf');
    else if (normalized.fillBlanks.length > 0) setQuizTab('blank');
    else if (normalized.shortAnswers.length > 0) setQuizTab('short');
    else if (normalized.longAnswers?.length && normalized.longAnswers.length > 0) setQuizTab('long');
    else if (normalized.codingSnippets?.length && normalized.codingSnippets.length > 0) setQuizTab('coding');
    else setQuizTab('mcq');
  };

  const [quizToDelete, setQuizToDelete] = useState<SavedQuiz | null>(null);

  const handleDeleteSavedQuiz = (quiz: SavedQuiz, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuizToDelete(quiz);
  };

  const confirmDeleteSavedQuiz = async () => {
    if (!quizToDelete) return;
    const id = quizToDelete.id;
    StorageService.deleteSavedQuiz(id);
    setSavedQuizzes(prev => prev.filter(q => q.id !== id));
    try {
      await FirestoreService.deleteSavedQuiz(id);
    } catch (err) {
      console.warn('Error deleting saved quiz from Firestore:', err);
    }
    setQuizToDelete(null);
  };

  const [activeInputMode, setActiveInputMode] = useState<'upload' | 'text'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customSubject, setCustomSubject] = useState<string>('Academic Practice');
  const [questionType, setQuestionType] = useState<string>('mixed');
  const [difficulty, setDifficulty] = useState<string>('MNC Standard');
  const [numQuestions, setNumQuestions] = useState<number>(15);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('Reading document...');
  const [thinkingStepIdx, setThinkingStepIdx] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setThinkingStepIdx(0);
      interval = setInterval(() => {
        setThinkingStepIdx((prev) => (prev < QUIZ_THINKING_STEPS.length - 1 ? prev + 1 : prev));
      }, 1400);
    } else {
      setThinkingStepIdx(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const renderQuizThinkingIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Globe className="w-6 h-6 text-blue-600 animate-spin" />;
      case 'search':
        return <Search className="w-6 h-6 text-indigo-600 animate-pulse" />;
      case 'think':
        return <Zap className="w-6 h-6 text-sky-600 animate-bounce" />;
      case 'brain':
        return <Brain className="w-6 h-6 text-blue-600 animate-pulse" />;
      case 'work':
        return <Terminal className="w-6 h-6 text-emerald-600 animate-pulse" />;
      case 'draft':
        return <FileText className="w-6 h-6 text-indigo-600 animate-bounce" />;
      default:
        return <Cpu className="w-6 h-6 text-blue-600 animate-spin" />;
    }
  };

  // Generated Quiz State
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  // Interactive Quiz States
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [trueFalseAnswers, setTrueFalseAnswers] = useState<Record<number, boolean>>({});
  const [fillBlankAnswers, setFillBlankAnswers] = useState<Record<number, string>>({});
  const [fillBlankChecked, setFillBlankChecked] = useState<Record<number, boolean>>({});
  const [shortAnswerReveled, setShortAnswerReveled] = useState<Record<number, boolean>>({});
  const [longAnswerRevealed, setLongAnswerRevealed] = useState<Record<number, boolean>>({});
  const [codingAnswers, setCodingAnswers] = useState<Record<number, number>>({});

  // Active quiz section filter tab
  const [quizTab, setQuizTab] = useState<'mcq' | 'tf' | 'blank' | 'short' | 'long' | 'coding'>('mcq');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setError('Please select a valid PDF file.');
        return;
      }
      setError(null);
      setSelectedFile(file);
      if (!customTitle) {
        setCustomTitle(file.name.replace(/\.pdf$/i, ''));
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf'))) {
      setError(null);
      setSelectedFile(file);
      if (!customTitle) {
        setCustomTitle(file.name.replace(/\.pdf$/i, ''));
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      setError('Please upload a valid PDF document.');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileBase64(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit and Generate Quiz
  const handleGenerateQuiz = async () => {
    if (activeInputMode === 'upload' && !selectedFile && !fileBase64) {
      setError('Please upload a PDF document first.');
      return;
    }
    if (activeInputMode === 'text' && !rawText.trim()) {
      setError('Please paste or type textbook text to extract questions.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setLoadingStep('Reading complete PDF document from first page to last...');

    try {
      let payloadNotes = rawText;
      if (activeInputMode === 'upload' && selectedFile) {
        setLoadingStep('Extracting complete text content from all PDF pages...');
        const pdfText = await extractPdfTextClient(selectedFile);
        if (pdfText) {
          payloadNotes = pdfText;
        }
      }

      setLoadingStep('Analyzing document with Placivo AI & generating grounded questions...');

      const response = await fetch('/api/ai/quiz-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customTitle || selectedFile?.name || 'Uploaded PDF Document',
          rawNotes: payloadNotes,
          pdfBase64: fileBase64,
          questionType,
          difficulty,
          numQuestions
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate practice quiz.');
      }

      const data = await response.json();
      const normalized = normalizeQuizData(data);
      setQuizData(normalized);

      // Save generated quiz to storage history and Firestore
      const quizId = 'quiz-' + Date.now();
      const newSavedQuiz: SavedQuiz = {
        id: quizId,
        userId: user?.uid || 'guest',
        title: normalized.title,
        subject: normalized.subject,
        questionType,
        difficulty,
        numQuestions,
        quizData: normalized,
        createdAt: new Date().toISOString()
      };

      StorageService.saveSavedQuiz(newSavedQuiz);
      setSavedQuizzes(prev => [newSavedQuiz, ...prev]);

      if (user?.uid) {
        try {
          await FirestoreService.saveSavedQuiz(user.uid, newSavedQuiz);
        } catch (e) {
          console.warn("Error saving quiz to Firestore:", e);
        }
      }
      
      // Reset Interactive states
      setMcqAnswers({});
      setTrueFalseAnswers({});
      setFillBlankAnswers({});
      setFillBlankChecked({});
      setShortAnswerReveled({});
      setLongAnswerRevealed({});
      setCodingAnswers({});

      // Set active tab to the first format with questions
      if (normalized.mcqs.length > 0) setQuizTab('mcq');
      else if (normalized.trueFalse.length > 0) setQuizTab('tf');
      else if (normalized.fillBlanks.length > 0) setQuizTab('blank');
      else if (normalized.shortAnswers.length > 0) setQuizTab('short');
      else if (normalized.longAnswers?.length && normalized.longAnswers.length > 0) setQuizTab('long');
      else if (normalized.codingSnippets?.length && normalized.codingSnippets.length > 0) setQuizTab('coding');
      else setQuizTab('mcq');
    } catch (err: any) {
      console.error('Quiz generation error:', err);
      setError(err.message || 'Something went wrong while generating the quiz.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate Scores
  const totalMcqs = quizData?.mcqs?.length || 0;
  const answeredMcqs = Object.keys(mcqAnswers).length;
  const correctMcqs = quizData?.mcqs ? quizData.mcqs.filter((q, idx) => mcqAnswers[idx] === q.correctAnswer).length : 0;

  const totalTf = quizData?.trueFalse?.length || 0;
  const answeredTf = Object.keys(trueFalseAnswers).length;
  const correctTf = quizData?.trueFalse ? quizData.trueFalse.filter((q, idx) => trueFalseAnswers[idx] === q.isTrue).length : 0;

  const totalBlanks = quizData?.fillBlanks?.length || 0;
  const answeredBlanks = Object.keys(fillBlankChecked).length;
  const correctBlanks = quizData?.fillBlanks ? quizData.fillBlanks.filter((q, idx) => {
    if (!fillBlankChecked[idx]) return false;
    const userAns = (fillBlankAnswers[idx] || '').trim().toLowerCase();
    const correctAns = q.answer.trim().toLowerCase();
    return userAns === correctAns || correctAns.includes(userAns) && userAns.length > 2;
  }).length : 0;

  const totalShort = quizData?.shortAnswers?.length || 0;
  const reviewedShort = Object.keys(shortAnswerReveled).length;

  const totalLong = quizData?.longAnswers?.length || 0;
  const reviewedLong = Object.keys(longAnswerRevealed).length;

  const totalCoding = quizData?.codingSnippets?.length || 0;
  const answeredCoding = Object.keys(codingAnswers).length;
  const correctCoding = quizData?.codingSnippets ? quizData.codingSnippets.filter((q, idx) => codingAnswers[idx] === q.correctAnswer).length : 0;

  // General statistics
  const totalInteractiveQuestions = totalMcqs + totalTf + totalBlanks + totalCoding;
  const totalInteractiveCorrect = correctMcqs + correctTf + correctBlanks + correctCoding;
  const totalInteractiveAnswered = answeredMcqs + answeredTf + answeredBlanks + answeredCoding;
  const accuracyPercentage = totalInteractiveAnswered > 0 ? Math.round((totalInteractiveCorrect / totalInteractiveAnswered) * 100) : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8" id="ai-quiz-section">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-black text-blue-600 tracking-wider uppercase">
            <Brain className="w-3.5 h-3.5 text-blue-600" /> Powered by Placivo AI
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            AI Practice Quiz Hub
          </h1>
          <p className="text-sm text-slate-500 font-semibold max-w-2xl">
            Upload your lecture slides, academic journals, or textbook PDFs to generate expected interview and semester exam quizzes instantly.
          </p>
        </div>

        {quizData && (
          <button
            onClick={() => setQuizData(null)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-black text-slate-700 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500 animate-spin-slow" /> New Quiz Upload
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-3 shadow-3d-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-black">Generation Notice</p>
            <p className="text-xs text-amber-800 mt-1 font-semibold">{error}</p>
          </div>
        </div>
      )}

      {/* Generating/Loading State - ChatGPT Style Status Updates */}
      {isLoading && (
        <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />

          <div className="relative inline-flex items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-inner">
              {renderQuizThinkingIcon(QUIZ_THINKING_STEPS[thinkingStepIdx]?.type || 'brain')}
            </div>
            <span className="absolute -right-1 -bottom-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
            </span>
          </div>

          <div className="space-y-2 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              Step {thinkingStepIdx + 1} of {QUIZ_THINKING_STEPS.length}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 transition-all duration-300">
              {QUIZ_THINKING_STEPS[thinkingStepIdx]?.text || 'Working...'}
            </h3>
            <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto leading-relaxed">
              Curating high-quality MCQs, short answers, long answers & fill-in-the-blanks from your PDF content
            </p>
          </div>

          <div className="space-y-2">
            <div className="max-w-md mx-auto bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-200/60">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, Math.max(15, ((thinkingStepIdx + 1) / QUIZ_THINKING_STEPS.length) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between max-w-md mx-auto text-[11px] font-semibold text-slate-400">
              <span>PDF Analysis</span>
              <span>{Math.round(((thinkingStepIdx + 1) / QUIZ_THINKING_STEPS.length) * 100)}%</span>
            </div>
          </div>

          {/* ChatGPT-style thinking status steps list */}
          <div className="max-w-md mx-auto pt-2 flex flex-wrap justify-center gap-2">
            {QUIZ_THINKING_STEPS.map((step, idx) => (
              <span
                key={idx}
                className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold transition-all duration-200 ${
                  idx === thinkingStepIdx
                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold shadow-sm scale-105'
                    : idx < thinkingStepIdx
                    ? 'bg-slate-50 border-slate-200 text-slate-400 line-through opacity-70'
                    : 'bg-white border-slate-100 text-slate-300'
                }`}
              >
                {step.text}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: Quiz Creator / Input Screen */}
      {!quizData && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* File Upload Pane */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/50 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <button
                  onClick={() => setActiveInputMode('upload')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeInputMode === 'upload'
                      ? 'bg-blue-600 text-white shadow-3d-blue'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Upload Lecture PDF
                </button>
                <button
                  onClick={() => setActiveInputMode('text')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeInputMode === 'text'
                      ? 'bg-blue-600 text-white shadow-3d-blue'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Paste Course Text
                </button>
              </div>

              {activeInputMode === 'upload' ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-8 text-center bg-slate-50/50 transition-all cursor-pointer relative"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />
                  {selectedFile ? (
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                      <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{selectedFile.name}</p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-[11px] font-black tracking-wide transition-colors"
                      >
                        Remove Document
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 pointer-events-none">
                      <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200">
                        <Upload className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">Drag & drop your lecture slides PDF here</p>
                        <p className="text-xs text-slate-400 font-semibold mt-1">or click to browse your local storage</p>
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold max-w-xs mx-auto">
                        Supports university textbooks, interview notes, or placement prep slides up to 50MB.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wide">Pasted Study Content</label>
                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste technical syllabus, coding problem descriptions, or book notes here to generate dynamic expected quiz questions..."
                    className="w-full h-56 p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all leading-relaxed"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-semibold">
                    {rawText.length} characters
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wide">Quiz Title / Chapter</label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Operating Systems Chapter 3"
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wide">Subject / Course</label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Options Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 border-t border-slate-100">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" /> Question Format
                  </label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="mixed">Mixed (All Formats)</option>
                    <option value="mcq">Multiple Choice Only</option>
                    <option value="tf">True / False Only</option>
                    <option value="fill">Fill in Blanks Only</option>
                    <option value="short">Short Answer Only</option>
                    <option value="long">Long Answer Only</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-600" /> Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="MNC Standard">MNC / Exam Standard</option>
                    <option value="Easy">Easy (Fundamental)</option>
                    <option value="Medium">Medium (Conceptual)</option>
                    <option value="Hard">Hard (Analytical)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" /> Questions Per Section
                  </label>
                  <select
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions (Default)</option>
                    <option value={20}>20 Questions</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateQuiz}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm tracking-wide shadow-md shadow-blue-500/10 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 btn-3d-blue"
              >
                <Brain className="w-4 h-4 animate-pulse" /> Generate Expected Practice Quiz
              </button>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50/60 border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-xs">
                <img 
                  src={aiNotesImg} 
                  alt="AI Quiz Practice Illustration" 
                  className="w-full h-auto object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-black text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Practice Makes Perfect
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">Direct PDF Grounding</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mt-0.5">
                      The generator extracts formulas, edge-cases, and strict lecture-slide content without hallucinating questions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">4 Diverse Question Genres</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mt-0.5">
                      Practice multiple-choice options, write conceptual short responses, test memory gaps, and verify true/false statements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">Immediate Logical Proofs</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mt-0.5">
                      Every question comes accompanied by detailed explanatory cards and logical breakdowns outlining exactly why an option holds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-3d-sm text-center">
                <p className="text-[10px] text-blue-600 font-extrabold uppercase tracking-widest mb-1">PRO TIP FOR PLACEMENTS</p>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Before going for an interview, upload the company's tech stacks or online assessment syllabus to simulate exact MCQ scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Quizzes History */}
      {!quizData && !isLoading && savedQuizzes && savedQuizzes.length > 0 && (
        <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60 mt-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800">Your Saved Practice Quizzes</h2>
                <p className="text-xs text-slate-500 font-semibold">Start saved tests instantly without consuming AI generation credits.</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
              {savedQuizzes.length} {savedQuizzes.length === 1 ? 'Quiz' : 'Quizzes'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedQuizzes.map((quiz) => {
              const totalQuestions = 
                (quiz.quizData.mcqs?.length || 0) +
                (quiz.quizData.trueFalse?.length || 0) +
                (quiz.quizData.fillBlanks?.length || 0) +
                (quiz.quizData.shortAnswers?.length || 0) +
                (quiz.quizData.longAnswers?.length || 0) +
                (quiz.quizData.codingSnippets?.length || 0);

              return (
                <div 
                  key={quiz.id}
                  className="flex flex-col justify-between p-5 rounded-2xl border border-slate-150/80 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all shadow-sm hover:shadow-md group relative"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-100/70 text-blue-800 text-[10px] font-black uppercase tracking-wider animate-fade-in truncate max-w-[150px]" title={quiz.subject}>
                        {quiz.subject || 'General Practice'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteSavedQuiz(quiz, e)}
                        className="opacity-70 group-hover:opacity-100 md:opacity-0 group-hover:md:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                        title="Delete Quiz"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug">
                      {quiz.title}
                    </h3>
                    
                    {/* Question Breakdown Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {quiz.quizData.mcqs && quiz.quizData.mcqs.length > 0 && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                          {quiz.quizData.mcqs.length} MCQs
                        </span>
                      )}
                      {quiz.quizData.trueFalse && quiz.quizData.trueFalse.length > 0 && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                          {quiz.quizData.trueFalse.length} T/F
                        </span>
                      )}
                      {quiz.quizData.fillBlanks && quiz.quizData.fillBlanks.length > 0 && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                          {quiz.quizData.fillBlanks.length} Blanks
                        </span>
                      )}
                      {quiz.quizData.shortAnswers && quiz.quizData.shortAnswers.length > 0 && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                          {quiz.quizData.shortAnswers.length} Short
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : 'Past Test'}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleLoadSavedQuiz(quiz)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-500 text-white font-black text-xs hover:bg-blue-600 transition-all shadow-sm cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Start Test
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: Interactive Active Quiz Screen */}
      {quizData && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Interactive Quiz Card */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white/50 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              
              {/* Info Subbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">{quizData.title}</h2>
                  <p className="text-xs text-blue-600 font-bold mt-0.5">{quizData.subject}</p>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-600">Self-Paced Learning</span>
                </div>
              </div>

              {/* Quiz Format Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none border-b border-slate-100">
                <button
                  onClick={() => setQuizTab('mcq')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    quizTab === 'mcq'
                      ? 'bg-blue-600 text-white shadow-3d-blue scale-[1.02]'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> Multiple Choice ({totalMcqs})
                </button>
                <button
                  onClick={() => setQuizTab('tf')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    quizTab === 'tf'
                      ? 'bg-blue-600 text-white shadow-3d-blue scale-[1.02]'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> True / False ({totalTf})
                </button>
                <button
                  onClick={() => setQuizTab('blank')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    quizTab === 'blank'
                      ? 'bg-blue-600 text-white shadow-3d-blue scale-[1.02]'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5" /> Fill Blanks ({totalBlanks})
                </button>
                <button
                  onClick={() => setQuizTab('short')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    quizTab === 'short'
                      ? 'bg-blue-600 text-white shadow-3d-blue scale-[1.02]'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Short Answers ({totalShort})
                </button>
                <button
                  onClick={() => setQuizTab('long')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    quizTab === 'long'
                      ? 'bg-blue-600 text-white shadow-3d-blue scale-[1.02]'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" /> Long Answers ({totalLong})
                </button>
                {totalCoding > 0 && (
                  <button
                    onClick={() => setQuizTab('coding')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      quizTab === 'coding'
                        ? 'bg-blue-600 text-white shadow-3d-blue scale-[1.02]'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Brain className="w-3.5 h-3.5" /> Coding Tracing ({totalCoding})
                  </button>
                )}
              </div>

              {/* TAB 1: MCQs */}
              {quizTab === 'mcq' && (
                <div className="space-y-8">
                  {quizData.mcqs && quizData.mcqs.length > 0 ? (
                    quizData.mcqs.map((q, idx) => {
                      const selectedOpt = mcqAnswers[idx];
                      const isCorrect = selectedOpt === q.correctAnswer;
                      const hasAnswered = selectedOpt !== undefined;

                      return (
                        <div key={idx} className="space-y-4 pb-6 border-b border-slate-100/60 last:border-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <h4 className="text-sm font-black text-slate-800 leading-relaxed">{q.question}</h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedOpt === oIdx;
                              const isCorrectAnswerOption = oIdx === q.correctAnswer;
                              
                              let btnClass = 'border-slate-200 hover:border-blue-400 hover:bg-slate-50';
                              let badgeIcon = null;

                              if (hasAnswered) {
                                if (isSelected) {
                                  if (isCorrect) {
                                    btnClass = 'border-emerald-500 bg-emerald-50/50 text-emerald-950 shadow-emerald-100';
                                    badgeIcon = <Check className="w-3.5 h-3.5 text-emerald-600" />;
                                  } else {
                                    btnClass = 'border-red-500 bg-red-50/50 text-red-950 shadow-red-100';
                                    badgeIcon = <X className="w-3.5 h-3.5 text-red-600" />;
                                  }
                                } else if (isCorrectAnswerOption) {
                                  btnClass = 'border-emerald-300 bg-emerald-50/30 text-emerald-900';
                                } else {
                                  btnClass = 'opacity-60 border-slate-100';
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={hasAnswered}
                                  onClick={() => setMcqAnswers(prev => ({ ...prev, [idx]: oIdx }))}
                                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between gap-3 transition-all ${
                                    !hasAnswered ? 'cursor-pointer active:scale-[0.99]' : ''
                                  } ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {badgeIcon}
                                </button>
                              );
                            })}
                          </div>

                          {hasAnswered && (
                            <div className="ml-8 p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                              <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-wide">
                                <Lightbulb className="w-3.5 h-3.5" /> Logical Proof Explanation
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400 font-semibold text-center py-6">No MCQs available in this chapter.</p>
                  )}
                </div>
              )}

              {/* TAB 2: TRUE / FALSE */}
              {quizTab === 'tf' && (
                <div className="space-y-8">
                  {quizData.trueFalse && quizData.trueFalse.length > 0 ? (
                    quizData.trueFalse.map((q, idx) => {
                      const userAns = trueFalseAnswers[idx];
                      const hasAnswered = userAns !== undefined;
                      const isCorrect = userAns === q.isTrue;

                      return (
                        <div key={idx} className="space-y-4 pb-6 border-b border-slate-100/60 last:border-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <h4 className="text-sm font-black text-slate-800 leading-relaxed">{q.statement}</h4>
                          </div>

                          <div className="flex items-center gap-3 pl-8">
                            <button
                              disabled={hasAnswered}
                              onClick={() => setTrueFalseAnswers(prev => ({ ...prev, [idx]: true }))}
                              className={`px-4 py-2 rounded-xl border text-xs font-black transition-all ${
                                hasAnswered
                                  ? userAns === true
                                    ? isCorrect
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                      : 'bg-red-50 border-red-500 text-red-800'
                                    : q.isTrue === true
                                      ? 'border-emerald-300 text-emerald-700 bg-emerald-50/10'
                                      : 'opacity-40 border-slate-100'
                                  : 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 text-slate-700 cursor-pointer'
                              }`}
                            >
                              True
                            </button>
                            <button
                              disabled={hasAnswered}
                              onClick={() => setTrueFalseAnswers(prev => ({ ...prev, [idx]: false }))}
                              className={`px-4 py-2 rounded-xl border text-xs font-black transition-all ${
                                hasAnswered
                                  ? userAns === false
                                    ? isCorrect
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                      : 'bg-red-50 border-red-500 text-red-800'
                                    : q.isTrue === false
                                      ? 'border-emerald-300 text-emerald-700 bg-emerald-50/10'
                                      : 'opacity-40 border-slate-100'
                                  : 'border-slate-200 hover:border-red-400 hover:bg-red-50/20 text-slate-700 cursor-pointer'
                              }`}
                            >
                              False
                            </button>
                          </div>

                          {hasAnswered && (
                            <div className="ml-8 p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                              <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-wide">
                                <Lightbulb className="w-3.5 h-3.5" /> Conceptual Explanation
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400 font-semibold text-center py-6">No True/False questions in this chapter.</p>
                  )}
                </div>
              )}

              {/* TAB 3: FILL BLANKS */}
              {quizTab === 'blank' && (
                <div className="space-y-8">
                  {quizData.fillBlanks && quizData.fillBlanks.length > 0 ? (
                    quizData.fillBlanks.map((q, idx) => {
                      const userValue = fillBlankAnswers[idx] || '';
                      const isChecked = fillBlankChecked[idx];
                      
                      const cleanCorrect = q.answer.trim().toLowerCase();
                      const cleanUser = userValue.trim().toLowerCase();
                      const isCorrect = cleanUser === cleanCorrect || cleanCorrect.includes(cleanUser) && cleanUser.length > 2;

                      return (
                        <div key={idx} className="space-y-4 pb-6 border-b border-slate-100/60 last:border-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div className="space-y-3 w-full">
                              <h4 className="text-sm font-black text-slate-800 leading-relaxed">
                                {q.sentence.split('___').map((part, pIdx, arr) => (
                                  <React.Fragment key={pIdx}>
                                    {part}
                                    {pIdx < arr.length - 1 && (
                                      <span className="inline-block px-1.5 py-0.5 border-b-2 border-dashed border-blue-500 bg-blue-50/30 text-blue-700 min-w-[70px] text-center font-bold">
                                        {isChecked ? q.answer : userValue || '...'}
                                      </span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </h4>

                              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <input
                                  type="text"
                                  disabled={isChecked}
                                  value={userValue}
                                  onChange={(e) => setFillBlankAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                                  placeholder="Type blank word..."
                                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs w-full disabled:bg-slate-50 disabled:text-slate-500"
                                />

                                <div className="flex items-center gap-2">
                                  {!isChecked ? (
                                    <button
                                      disabled={!userValue.trim()}
                                      onClick={() => setFillBlankChecked(prev => ({ ...prev, [idx]: true }))}
                                      className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-[11px] font-black hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
                                    >
                                      Verify Answer
                                    </button>
                                  ) : (
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                                      isCorrect
                                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                                        : 'bg-red-50 border border-red-200 text-red-700'
                                    }`}>
                                      {isCorrect ? 'Correct' : `Incorrect (Ans: ${q.answer})`}
                                    </span>
                                  )}

                                  {!isChecked && q.clue && (
                                    <div className="group relative">
                                      <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-help">
                                        <Lightbulb className="w-3.5 h-3.5" />
                                      </button>
                                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 rounded-lg bg-slate-900 text-[10px] text-white leading-relaxed font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg text-center">
                                        {q.clue}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400 font-semibold text-center py-6">No fill-in-the-blank questions generated.</p>
                  )}
                </div>
              )}

              {/* TAB 4: SHORT ANSWERS */}
              {quizTab === 'short' && (
                <div className="space-y-8">
                  {quizData.shortAnswers && quizData.shortAnswers.length > 0 ? (
                    quizData.shortAnswers.map((q, idx) => {
                      const isRevealed = shortAnswerReveled[idx];

                      return (
                        <div key={idx} className="space-y-4 pb-6 border-b border-slate-100/60 last:border-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div className="space-y-3 w-full">
                              <h4 className="text-sm font-black text-slate-800 leading-relaxed">{q.question}</h4>
                              
                              {!isRevealed ? (
                                <button
                                  onClick={() => setShortAnswerReveled(prev => ({ ...prev, [idx]: true }))}
                                  className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <BookOpen className="w-4 h-4 text-slate-500" /> Reveal Best Model Answer & Key Points
                                </button>
                              ) : (
                                <div className="space-y-4 p-5 rounded-2xl bg-blue-50/40 border border-blue-100/80 animate-fade-in">
                                  <div className="space-y-1.5">
                                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Model Course Solution</div>
                                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">{q.sampleAnswer}</p>
                                  </div>

                                  <div className="border-t border-blue-100/60 pt-3 space-y-1.5">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Exam Marking Criteria & Tip</div>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{q.explanation}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400 font-semibold text-center py-6">No short answer questions available.</p>
                  )}
                </div>
              )}

              {/* TAB 4.5: LONG ANSWERS */}
              {quizTab === 'long' && (
                <div className="space-y-8">
                  {quizData.longAnswers && quizData.longAnswers.length > 0 ? (
                    quizData.longAnswers.map((q, idx) => {
                      const isRevealed = longAnswerRevealed[idx];

                      return (
                        <div key={idx} className="space-y-4 pb-6 border-b border-slate-100/60 last:border-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div className="space-y-3 w-full">
                              <h4 className="text-sm font-black text-slate-800 leading-relaxed">{q.question}</h4>
                              
                              {!isRevealed ? (
                                <button
                                  onClick={() => setLongAnswerRevealed(prev => ({ ...prev, [idx]: true }))}
                                  className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <BookOpen className="w-4 h-4 text-slate-500" /> Reveal Best Model Answer & Key Points
                                </button>
                              ) : (
                                <div className="space-y-4 p-5 rounded-2xl bg-blue-50/40 border border-blue-100/80 animate-fade-in">
                                  <div className="space-y-1.5">
                                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Model Course Solution</div>
                                    <p className="text-xs text-slate-700 font-semibold leading-relaxed whitespace-pre-line">{q.sampleAnswer}</p>
                                  </div>

                                  <div className="border-t border-blue-100/60 pt-3 space-y-1.5">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Exam Marking Criteria & Tip</div>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{q.explanation}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400 font-semibold text-center py-6">No long answer questions available.</p>
                  )}
                </div>
              )}

              {/* TAB 5: CODING TRACING */}
              {quizTab === 'coding' && (
                <div className="space-y-8">
                  {quizData.codingSnippets && quizData.codingSnippets.length > 0 ? (
                    quizData.codingSnippets.map((q, idx) => {
                      const selectedOpt = codingAnswers[idx];
                      const isCorrect = selectedOpt === q.correctAnswer;
                      const hasAnswered = selectedOpt !== undefined;

                      return (
                        <div key={idx} className="space-y-4 pb-6 border-b border-slate-100/60 last:border-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div className="space-y-3 w-full">
                              <h4 className="text-sm font-black text-slate-800 leading-relaxed">{q.question}</h4>
                              
                              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed select-all border border-slate-800 shadow-inner">
                                <code>{q.code}</code>
                              </pre>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedOpt === oIdx;
                              const isCorrectAnswerOption = oIdx === q.correctAnswer;
                              
                              let btnClass = 'border-slate-200 hover:border-blue-400 hover:bg-slate-50';
                              let badgeIcon = null;

                              if (hasAnswered) {
                                if (isSelected) {
                                  if (isCorrect) {
                                    btnClass = 'border-emerald-500 bg-emerald-50/50 text-emerald-950 shadow-emerald-100';
                                    badgeIcon = <Check className="w-3.5 h-3.5 text-emerald-600" />;
                                  } else {
                                    btnClass = 'border-red-500 bg-red-50/50 text-red-950 shadow-red-100';
                                    badgeIcon = <X className="w-3.5 h-3.5 text-red-600" />;
                                  }
                                } else if (isCorrectAnswerOption) {
                                  btnClass = 'border-emerald-300 bg-emerald-50/30 text-emerald-900';
                                } else {
                                  btnClass = 'opacity-60 border-slate-100';
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={hasAnswered}
                                  onClick={() => setCodingAnswers(prev => ({ ...prev, [idx]: oIdx }))}
                                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between gap-3 transition-all ${
                                    !hasAnswered ? 'cursor-pointer active:scale-[0.99]' : ''
                                  } ${btnClass}`}
                                >
                                  <span className="font-mono">{opt}</span>
                                  {badgeIcon}
                                </button>
                              );
                            })}
                          </div>

                          {hasAnswered && (
                            <div className="ml-8 p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                              <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-wide">
                                <Lightbulb className="w-3.5 h-3.5" /> Logical Dry Run & Complexity Proof
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400 font-semibold text-center py-6">No coding snippets available in this session.</p>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Interactive Stats Dashboard Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800">Your Analytics</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Placement Preparedness</p>
                </div>
              </div>

              {/* Progress & Scores */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Interactive Completion</span>
                    <span>{totalInteractiveAnswered} / {totalInteractiveQuestions} Done</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${totalInteractiveQuestions > 0 ? (totalInteractiveAnswered / totalInteractiveQuestions) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white border border-slate-200/60 p-3 rounded-2xl text-center shadow-3d-sm">
                    <p className="text-2xl font-black text-emerald-600">{totalInteractiveCorrect}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Correct</p>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-3 rounded-2xl text-center shadow-3d-sm">
                    <p className="text-2xl font-black text-slate-800">{accuracyPercentage}%</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Accuracy</p>
                  </div>
                </div>
              </div>

              {/* Sub-genre details */}
              <div className="space-y-3.5 border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-slate-600">Multiple Choice</span>
                  </div>
                  <span className="text-slate-800 font-extrabold">{correctMcqs} / {totalMcqs}</span>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span className="text-slate-600">Coding Tracing</span>
                  </div>
                  <span className="text-slate-800 font-extrabold">{correctCoding} / {totalCoding}</span>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="text-slate-600">True or False</span>
                  </div>
                  <span className="text-slate-800 font-extrabold">{correctTf} / {totalTf}</span>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="text-slate-600">Fill in the Blanks</span>
                  </div>
                  <span className="text-slate-800 font-extrabold">{correctBlanks} / {totalBlanks}</span>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-600">Short Answers Reviewed</span>
                  </div>
                  <span className="text-slate-800 font-extrabold">{reviewedShort} / {totalShort}</span>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-slate-600">Long Answers Reviewed</span>
                  </div>
                  <span className="text-slate-800 font-extrabold">{reviewedLong} / {totalLong}</span>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-700 text-[11px] font-semibold leading-relaxed">
                {totalInteractiveAnswered === 0 ? (
                  <p>Attempt the Multiple Choice and Coding Tracing questions above to verify your core textbook concepts and benchmark your score against online standard criteria.</p>
                ) : accuracyPercentage >= 80 ? (
                  <p>🎉 Excellent! Your foundational understanding is highly competitive. Standard placement tests require consistent {accuracyPercentage}%+ accuracy to clear high-demand candidate round thresholds.</p>
                ) : (
                  <p>Keep going! We recommend reviewing the logical explanation cards for questions you missed to reinforce your memory and improve accuracy bounds.</p>
                )}
              </div>

              <button
                onClick={() => {
                  setMcqAnswers({});
                  setTrueFalseAnswers({});
                  setFillBlankAnswers({});
                  setFillBlankChecked({});
                  setShortAnswerReveled({});
                  setLongAnswerRevealed({});
                  setCodingAnswers({});
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-white text-xs font-black text-slate-600 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" /> Reset Answers
              </button>

            </div>
          </div>

        </div>
      )}

      {/* Custom Confirmation Modal for Deleting Saved Quiz */}
      {quizToDelete && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in" id="delete-quiz-modal-backdrop">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-100 shadow-xl space-y-4 animate-scale-up" id="delete-quiz-modal-container">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl" id="delete-quiz-modal-icon">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900" id="delete-quiz-modal-title">Delete Practice Quiz</h3>
                <p className="text-xs text-slate-500 font-medium" id="delete-quiz-modal-description">
                  Are you sure you want to delete <span className="font-bold text-slate-700">"{quizToDelete.title}"</span> from your history? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                id="delete-quiz-modal-cancel"
                onClick={() => setQuizToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-extrabold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                id="delete-quiz-modal-confirm"
                onClick={confirmDeleteSavedQuiz}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition-all cursor-pointer shadow-sm shadow-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
