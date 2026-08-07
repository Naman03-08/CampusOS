import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { exportTextToPDF } from '../../lib/pdfExport';

// Configure workerSrc for pdfjs-dist using jsdelivr/unpkg ESM worker
if (typeof window !== 'undefined') {
  const version = pdfjsLib.version || '4.0.379';
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
}

// Helper to sanitize corrupt text, font encoding artifacts, and weird unicode symbols (e.g. 𓈌, hieroglyphics, private use areas)
function cleanCorruptText(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let str = input;

  // Remove Egyptian Hieroglyphs (\u1300-\u13FF or U+13000-U+1343F) and Astral/Private Use symbols
  str = str.replace(/[\u1300-\u13FF]/g, '');
  try {
    str = str.replace(/[\u{13000}-\u{1343F}]/gu, '');
    str = str.replace(/[\u{1F000}-\u{1FFFF}]/gu, '');
    str = str.replace(/[\uE000-\uF8FF]/g, '');
  } catch (e) {
    str = str.replace(/[\uD80C][\uDC00-\uDFFF]/g, '');
  }
  str = str.replace(/\uFFFD/g, '');

  // Remove non-printable control characters
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');

  // Remove repeated non-alphanumeric noise symbols (e.g., 𓈌𓈌𓈌, =====, -----)
  str = str.replace(/([^\w\s.,;:()?!\-+/*=\[\]{}<>])\1+/g, '');

  // Collapse whitespace
  str = str.replace(/[ \t]{2,}/g, ' ');
  str = str.replace(/ \n/g, '\n');
  str = str.replace(/\n{3,}/g, '\n\n');

  return str.trim();
}

async function extractPdfTextClient(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';
    for (let i = 1; i <= Math.min(pdf.numPages, 50); i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items
        .map((item: any) => cleanCorruptText(item.str))
        .filter(Boolean);
      if (pageStrings.length > 0) {
        fullText += `[Page ${i}]\n` + pageStrings.join(' ') + '\n\n';
      }
    }
    return cleanCorruptText(fullText.trim());
  } catch (err) {
    console.warn('PDF client text extraction note (sending raw base64 to server):', err);
    return '';
  }
}
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  BookOpen,
  Zap,
  ListOrdered,
  Search,
  ArrowRight,
  RefreshCw,
  FileCode,
  Layers,
  Award,
  ChevronRight,
  Eye,
  Trash2,
  ExternalLink,
  Info,
  HelpCircle,
  PenTool,
  Check,
  X,
  Volume2,
  RotateCcw,
  Printer,
  Brain,
  CheckSquare,
  FileCheck,
  Lightbulb,
  Radio,
  Filter,
  Lock,
  GraduationCap,
  Clock
} from 'lucide-react';
import { UserProfile, StudySuite } from '../../types';
import { checkStudySuiteLimit, incrementFeatureUsage, getDailyKey, getWeeklyKey, calculatePlanDetails } from '../../lib/planUtils';

interface AINotesSummarizerViewProps {
  user: UserProfile | null;
  onSaveSuite?: (suite: StudySuite) => void;
  onDeleteSuite?: (id: string) => void;
  onNavigateTab?: (tabId: string) => void;
  studySuites?: StudySuite[];
}

interface SummaryResult {
  title: string;
  subject: string;
  pageEstimate?: string;
  executiveSummaryBullets?: string[];
  executiveSummary?: string;
  importantTopics: string[];
  completeLineByLineSummary: Array<{
    sectionNumber: number;
    heading: string;
    sectionParagraph?: string;
    content?: string;
    bullets: string[];
    keyTerms: string[];
  }>;
  quickReviewBullets: string[];
}

export const AINotesSummarizerView: React.FC<AINotesSummarizerViewProps> = ({
  user,
  onSaveSuite,
  onDeleteSuite,
  onNavigateTab,
  studySuites = []
}) => {
  const [activeInputMode, setActiveInputMode] = useState<'upload' | 'text'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('Reading document...');
  const [error, setError] = useState<string | null>(null);
  
  const [summaryData, setSummaryData] = useState<SummaryResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'complete'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [suiteIdToDelete, setSuiteIdToDelete] = useState<string | null>(null);

  const loadSuiteAsSummary = (suite: StudySuite) => {
    if (suite.notesData) {
      setSummaryData(suite.notesData);
    } else {
      // Reconstruct fallback
      const sections = (suite.fullNotes || '').split('### Section ').filter(Boolean).map((sec, i) => {
        const lines = sec.trim().split('\n');
        const headerLine = lines[0] || '';
        const heading = headerLine.replace(/^\d+:\s*/, '').trim();
        const contentLines = lines.slice(1).filter(l => !l.trim().startsWith('-'));
        const bulletLines = lines.slice(1).filter(l => l.trim().startsWith('-')).map(l => l.trim().replace(/^-\s*/, ''));
        return {
          sectionNumber: i + 1,
          heading: heading || `Section ${i + 1}`,
          sectionParagraph: contentLines.join('\n').trim(),
          content: contentLines.join('\n').trim(),
          bullets: bulletLines.length > 0 ? bulletLines : ['Summary of section content.'],
          keyTerms: []
        };
      });

      setSummaryData({
        title: suite.title,
        subject: suite.subject,
        executiveSummary: suite.summary,
        executiveSummaryBullets: (suite.summary || '').split('\n').filter(Boolean),
        importantTopics: [suite.subject],
        completeLineByLineSummary: sections,
        quickReviewBullets: (suite.summary || '').split('\n').filter(Boolean).slice(0, 5)
      });
    }
    setActiveTab('overview');
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle File Select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setError('Please upload a valid PDF file.');
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

  // Submit Summarize
  const handleSummarize = async () => {
    if (!selectedFile && !fileBase64) {
      setError('Please upload a PDF document to summarize.');
      return;
    }

    if (user) {
      const limitCheck = checkStudySuiteLimit(user, user.stats?.studySuitesCount || 0);
      if (!limitCheck.allowed) {
        setError(limitCheck.message);
        return;
      }
    }

    setError(null);
    setIsLoading(true);
    setLoadingStep('Parsing PDF pages and extracting text...');

    try {
      let payloadNotes = '';
      if (selectedFile) {
        setLoadingStep('Extracting complete text content from PDF page by page...');
        const pdfText = await extractPdfTextClient(selectedFile);
        if (pdfText) {
          payloadNotes = pdfText;
        }
      }

      setLoadingStep('Analyzing complete document with Placivo AI...');

      const response = await fetch('/api/ai/summarize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customTitle || selectedFile?.name || 'Uploaded PDF Document',
          rawNotes: payloadNotes,
          pdfBase64: fileBase64,
          fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : undefined
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to process document with Placivo AI.');
      }

      const data = await response.json();
      if (user) {
        const details = calculatePlanDetails(user);
        const periodKey = details.currentPlanId === 'free_trial' ? getDailyKey() : getWeeklyKey();
        incrementFeatureUsage(user.uid, 'study_suite', periodKey);
      }
      setSummaryData(data);
      setActiveTab('overview');

      // Auto save suite to parent if available
      if (onSaveSuite && data) {
        const newSuite: StudySuite = {
          id: 'suite_' + Date.now(),
          userId: user?.uid || 'guest',
          title: data.title || customTitle || 'AI Summarized Notes',
          subject: data.subject || 'General Study',
          summary: data.executiveSummary || (Array.isArray(data.executiveSummaryBullets) ? data.executiveSummaryBullets.join(' ') : ''),
          fullNotes: (data.completeLineByLineSummary || [])
            .map((s: any) => `### Section ${s.sectionNumber}: ${s.heading || ''}\n\n${s.content || ''}\n\n` + (s.bullets || []).map((b: string) => `- ${b}`).join('\n'))
            .join('\n\n') || data.executiveSummary || '',
          importantQuestions: [],
          flashcards: [],
          quiz: [],
          mindmap: { id: 'root', label: data.title || 'Summary' },
          formulas: [],
          vivaQuestions: [],
          revisionPlan: [],
          createdAt: new Date().toISOString(),
          notesData: data
        };
        onSaveSuite(newSuite);
      }
    } catch (err: any) {
      console.error('Error summarizing PDF:', err);
      setError(err.message || 'An unexpected error occurred while analyzing the document.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format text with bold markdown
  const renderFormattedBullet = (text: string) => {
    if (!text) return null;
    const sanitized = cleanCorruptText(text);
    if (!sanitized) return null;
    const parts = sanitized.split(/(\*\*.*?\*\*)/g);
    return (
      <span>
        {parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={idx} className="font-extrabold text-slate-900 bg-amber-100/80 px-1.5 py-0.5 rounded border border-amber-200">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </span>
    );
  };

  // Helper to calculate word count across all summary components
  const calculateTotalWords = () => {
    if (!summaryData) return 0;
    let textStr = '';
    if (summaryData.executiveSummary) {
      textStr += ' ' + summaryData.executiveSummary;
    }
    if (summaryData.executiveSummaryBullets) {
      textStr += ' ' + summaryData.executiveSummaryBullets.join(' ');
    }
    if (summaryData.quickReviewBullets) {
      textStr += ' ' + summaryData.quickReviewBullets.join(' ');
    }
    if (summaryData.completeLineByLineSummary) {
      summaryData.completeLineByLineSummary.forEach(s => {
        textStr += ' ' + s.heading + ' ' + (s.sectionParagraph || s.content || '') + ' ' + (s.bullets ? s.bullets.join(' ') : '');
      });
    }
    return textStr.trim().split(/\s+/).filter(Boolean).length;
  };

  const copyToClipboard = () => {
    if (!summaryData) return;
    const execBullets = summaryData.executiveSummaryBullets || [summaryData.executiveSummary || ''];
    const text = `
# ${summaryData.title}
Subject: ${summaryData.subject}

## Point-Wise Executive Summary
${execBullets.map(b => `* ${b}`).join('\n')}

## Quick Key Highlights
${summaryData.quickReviewBullets?.map(b => `* ${b}`).join('\n')}

## Complete Line-by-Line Breakdown
${summaryData.completeLineByLineSummary?.map(s => `
### Section ${s.sectionNumber}: ${s.heading}
${s.bullets?.map(b => `* ${b}`).join('\n')}
`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (!summaryData) return;
    const execBullets = summaryData.executiveSummaryBullets || [summaryData.executiveSummary || ''];
    const text = `
TITLE: ${summaryData.title}
SUBJECT: ${summaryData.subject}
TOTAL WORD COUNT: ~${calculateTotalWords()} Words (Point-Wise Format)
==================================================

POINT-WISE EXECUTIVE SUMMARY:
${execBullets.map(b => `* ${b}`).join('\n')}

==================================================
IMPORTANT HIGHLIGHTS:
${summaryData.quickReviewBullets?.map(b => `* ${b}`).join('\n')}

==================================================
COMPLETE SECTION-BY-SECTION SUMMARY:
${summaryData.completeLineByLineSummary?.map(s => `
[Section ${s.sectionNumber}] ${s.heading}
Points:
${s.bullets?.map(b => ` - ${b}`).join('\n')}
`).join('\n')}
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${summaryData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_summary.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadPDF = () => {
    if (!summaryData) return;
    const execBullets = summaryData.executiveSummaryBullets || [summaryData.executiveSummary || ''];
    const text = `
Subject: ${summaryData.subject}
Generated by Placivo AI • Unique PDF Summary

EXECUTIVE SUMMARY
${execBullets.map(b => `• ${b.replace(/\*\*/g, '')}`).join('\n')}

IMPORTANT EXAM HIGHLIGHTS
${(summaryData.quickReviewBullets || []).map(b => `• ${b.replace(/\*\*/g, '')}`).join('\n')}

COMPLETE SECTION-BY-SECTION BREAKDOWN
${(summaryData.completeLineByLineSummary || []).map(s => `
Section ${s.sectionNumber}: ${s.heading}
${s.sectionParagraph ? s.sectionParagraph + '\n' : ''}${(s.bullets || []).map(b => `• ${b.replace(/\*\*/g, '')}`).join('\n')}
`).join('\n')}
    `.trim();

    exportTextToPDF(
      summaryData.title,
      text,
      `${summaryData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_placivo_summary.pdf`
    );
  };

  // Filter sections by search query
  const filteredSections = (summaryData?.completeLineByLineSummary || []).filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (s.heading && s.heading.toLowerCase().includes(q)) ||
      (s.content && s.content.toLowerCase().includes(q)) ||
      (s.bullets && s.bullets.some(b => b && b.toLowerCase().includes(q))) ||
      (s.keyTerms && s.keyTerms.some(t => t && t.toLowerCase().includes(q)))
    );
  });



  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/60 via-slate-50 to-sky-50/60 p-4 sm:p-6 lg:p-8 text-slate-800 antialiased relative overflow-hidden">
      {/* Soft Ambient Light Background Glows */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xl shadow-amber-900/5 transform hover:-translate-y-0.5 transition-all duration-300">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200/80 text-amber-900 font-bold text-xs uppercase tracking-wider shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              Powered by Placivo AI • Exclusive PDF Intelligence
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              AI Smart Notes & Exam Suite
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl">
              Upload any PDF textbook or lecture slides. AI generates point-wise summaries, handwritten exam pages, and 100% PDF-grounded multi-format quizzes!
            </p>
          </div>

          {summaryData && (
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <button
                onClick={copyToClipboard}
                className="px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Summary'}
              </button>
              <button
                onClick={downloadTxt}
                className="px-3.5 py-2.5 rounded-2xl bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md hover:bg-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export TXT
              </button>
              <button
                onClick={downloadPDF}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-white" />
                Export PDF
              </button>
            </div>
          )}
        </div>

        {/* PDF Input Section */}
        {!summaryData && (
          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60 transform transition-all hover:shadow-amber-100/50">
            
            {/* Custom Title Input */}
            <div className="mb-6 space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                Document Title (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Computer Architecture Chapter 4: Pipelining & Cache"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
              />
            </div>

            {/* PDF File Drag & Drop */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer group ${
                selectedFile
                  ? 'border-emerald-400 bg-emerald-50/40'
                  : 'border-slate-300 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/30'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
              />

              {selectedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-100">
                    <FileCheck className="w-8 h-8 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900">{selectedFile.name}</h4>
                    <p className="text-xs text-slate-500 font-bold mt-1">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI Line-by-Line Summarization
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 font-extrabold text-xs transition-all inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove File
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg shadow-amber-100">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900">
                      Drop your PDF document here, or <span className="text-amber-600 underline">browse</span>
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      Upload textbook chapters, research papers, or lecture slide PDFs up to 50MB
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-extrabold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Line 1 to End Complete PDF Extraction
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-bold flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSummarize}
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-base shadow-xl shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Analyzing PDF with Placivo AI...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
                    <span>Generate AI Notes & Quiz Suite</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Saved Documents History */}
        {!summaryData && studySuites && studySuites.length > 0 && (
          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60 mt-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-800">Your Saved Documents</h2>
                  <p className="text-xs text-slate-500 font-semibold">Open past summarized notes instantly without using AI credits.</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                {studySuites.length} {studySuites.length === 1 ? 'Document' : 'Documents'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {studySuites.map((suite) => {
                const isDeleting = suiteIdToDelete === suite.id;
                return (
                  <div 
                    key={suite.id}
                    className="flex flex-col justify-between p-5 rounded-2xl border border-slate-150/80 bg-slate-50/50 hover:bg-slate-50 hover:border-amber-300 transition-all shadow-sm hover:shadow-md group relative min-h-[180px]"
                  >
                    {isDeleting ? (
                      <div className="flex flex-col items-center justify-center text-center h-full my-auto space-y-4 py-4 animate-in fade-in duration-200">
                        <p className="text-sm font-black text-slate-800">Delete this document?</p>
                        <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
                          This action cannot be undone and will remove your notes permanently.
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSuiteIdToDelete(null);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onDeleteSuite) {
                                onDeleteSuite(suite.id);
                              }
                              setSuiteIdToDelete(null);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-amber-100/70 text-amber-800 text-[10px] font-black uppercase tracking-wider">
                              {suite.subject || 'General Study'}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSuiteIdToDelete(suite.id);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                              title="Delete Document"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <h3 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug">
                            {suite.title}
                          </h3>
                          
                          <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                            {suite.summary}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {suite.createdAt ? new Date(suite.createdAt).toLocaleDateString() : 'Past Session'}
                          </span>

                          <button
                            type="button"
                            onClick={() => loadSuiteAsSummary(suite)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 text-white font-black text-xs hover:bg-amber-600 transition-all shadow-sm cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Open Summary
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl border border-slate-200 text-center space-y-6 shadow-2xl">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-amber-200 animate-ping opacity-40" />
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-300/60">
                <Zap className="w-10 h-10 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">Reading Complete PDF Document...</h3>
              <p className="text-sm text-slate-500 font-semibold mt-1">
                Placivo AI is extracting point-wise summaries.
              </p>
            </div>
            <div className="max-w-md mx-auto bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-amber-500 h-full w-2/3 animate-pulse rounded-full" />
            </div>
          </div>
        )}

        {/* Summary Results View */}
        {summaryData && !isLoading && (
          <div className="space-y-6">

            {/* Document Meta Banner */}
            <div className="bg-gradient-to-r from-white via-amber-50/50 to-sky-50/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-extrabold text-xs">
                    {summaryData.subject || 'Academic PDF'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ~{calculateTotalWords()} Words • Point-Wise Summary
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-700" />
                    100% PDF Grounded
                  </span>
                  {selectedFile && (
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 font-bold text-xs">
                      PDF Source: {selectedFile.name}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {summaryData.title}
                </h2>
              </div>

              <button
                onClick={() => {
                  setSummaryData(null);
                  setSelectedFile(null);
                  setFileBase64(null);
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Summarize Another PDF
              </button>
            </div>

            {/* Tab Navigation Bar */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-300/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Point-Wise Overview
              </button>

              <button
                onClick={() => setActiveTab('complete')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'complete'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-300/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ListOrdered className="w-4 h-4" />
                Line Breakdown ({summaryData.completeLineByLineSummary?.length || 0})
              </button>
            </div>

            {/* TAB 1: EXECUTIVE OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                        <BookOpen className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900">Point-Wise Executive Summary</h3>
                        <p className="text-xs text-slate-500 font-semibold">Exhaustive point-wise & paragraph breakdown covering the PDF</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs">
                      {summaryData.executiveSummaryBullets?.length || 20}+ Points & Paragraphs
                    </span>
                  </div>

                  {/* Executive Conceptual Overview Paragraph */}
                  {summaryData.executiveSummary && (
                    <div className="p-5 bg-gradient-to-br from-amber-500/10 via-amber-100/30 to-sky-500/10 rounded-2xl border border-amber-200/80 space-y-3 shadow-inner">
                      <div className="flex items-center gap-2 text-amber-950 font-extrabold text-xs uppercase tracking-wider">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span>Executive Conceptual Overview Paragraph</span>
                      </div>
                      <div className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line space-y-2">
                        {summaryData.executiveSummary}
                      </div>
                    </div>
                  )}

                  {/* Executive Point-Wise Highlights */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-amber-500" />
                        Point-Wise Executive Highlights
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-extrabold text-xs">
                        {summaryData.executiveSummaryBullets?.length || 0} Points
                      </span>
                    </h4>

                    <div className="space-y-3 bg-gradient-to-b from-amber-50/60 via-white to-sky-50/30 p-5 rounded-2xl border border-amber-200/60">
                      {((summaryData.executiveSummaryBullets && summaryData.executiveSummaryBullets.length > 0)
                        ? summaryData.executiveSummaryBullets
                        : summaryData.executiveSummary
                        ? summaryData.executiveSummary.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10)
                        : ['Comprehensive point-wise summary extracted from line 1 to the end.']
                      ).map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3.5 bg-white/90 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                          <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            {idx + 1}
                          </div>
                          <p className="text-sm font-medium text-slate-800 leading-relaxed">
                            {renderFormattedBullet(bullet)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Review Takeaways */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        High-Yield Quick Review Takeaways
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-900 font-extrabold text-xs">
                        {summaryData.quickReviewBullets?.length || 0} Takeaway Points
                      </span>
                    </h4>

                    <div className="grid grid-cols-1 gap-3">
                      {summaryData.quickReviewBullets?.map((bullet, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                          <p className="text-sm font-medium text-slate-800 leading-snug">
                            {renderFormattedBullet(bullet)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Core Topics & Quick Actions */}
                <div className="space-y-6">
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/80 shadow-xl space-y-4">
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-sky-500" />
                      Core Topics Covered ({summaryData.importantTopics?.length || 0})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {summaryData.importantTopics?.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-100 hover:text-sky-900 text-slate-700 font-bold text-xs transition-all border border-slate-200/80 cursor-default"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Document Intelligence Stats */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-3xl text-white shadow-xl space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold">
                        Line-by-Line AI Analysis
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black">Exhaustive Line Breakdown</h3>
                      <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed">
                        Complete section-by-section breakdown covering every definition, rule, equation, and point from line 1 to the end.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10">
                      <div className="bg-white/10 p-3 rounded-2xl">
                        <span className="text-[10px] text-slate-400 uppercase font-black block">Total Sections</span>
                        <span className="text-xl font-black text-amber-300">{summaryData.completeLineByLineSummary?.length || 0}</span>
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl">
                        <span className="text-[10px] text-slate-400 uppercase font-black block">Total Word Count</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-amber-300">{calculateTotalWords().toLocaleString()}</span>
                          <span className="text-[10px] font-bold text-emerald-400">words</span>
                        </div>
                        <span className="text-[9px] font-semibold text-slate-300 block mt-0.5">Strict 5,000 - 10,000 Range</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('complete')}
                      className="w-full py-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Explore Line Breakdown ({summaryData.completeLineByLineSummary?.length || 0} Sections)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: LINE-BY-LINE BREAKDOWN */}
            {activeTab === 'complete' && (
              <div className="space-y-6">
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="relative w-full sm:w-96">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search section headings or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Showing {filteredSections?.length || 0} of {summaryData.completeLineByLineSummary?.length || 0} sections
                  </span>
                </div>

                <div className="space-y-6">
                  {filteredSections?.map((section) => (
                    <div
                      key={section.sectionNumber}
                      className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 space-y-5"
                    >
                      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                            #{section.sectionNumber}
                          </span>
                          <h3 className="text-xl font-black text-slate-900">
                            {section.heading}
                          </h3>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">
                          {section.bullets?.length || 0} Point Highlights
                        </span>
                      </div>

                      {/* Section Explanatory Paragraph */}
                      {(section.sectionParagraph || section.content) && (
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-50 to-sky-50 border border-amber-200/80 text-xs sm:text-sm font-medium text-slate-800 leading-relaxed flex items-start gap-3 shadow-inner">
                          <BookOpen className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-extrabold text-amber-950 block mb-1 uppercase tracking-wider text-[11px]">
                              Section Conceptual Explanatory Paragraph:
                            </span>
                            <p className="text-slate-800 leading-relaxed">{section.sectionParagraph || section.content}</p>
                          </div>
                        </div>
                      )}

                      {/* Section Point-Wise Bullets */}
                      <div className="space-y-3 pt-1">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Point-Wise Line Breakdown ({section.bullets?.length || 0} Points)
                        </h4>
                        {section.bullets?.map((b, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:bg-amber-50/50 hover:border-amber-200 transition-all"
                          >
                            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {bIdx + 1}
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                              {renderFormattedBullet(b)}
                            </p>
                          </div>
                        ))}
                      </div>

                      {section.keyTerms && section.keyTerms.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                          <span className="text-xs font-bold text-slate-400">Key Terms & Equations:</span>
                          {section.keyTerms.map((term, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-lg bg-amber-100/70 text-amber-900 font-extrabold text-xs"
                            >
                              {term}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
