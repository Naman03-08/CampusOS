import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FirestoreService } from '../../lib/firestoreService';
import { StorageService } from '../../lib/storage';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import { 
  Sparkles, 
  FileText, 
  Upload, 
  RefreshCw, 
  Check, 
  Copy, 
  Download, 
  History, 
  Edit3, 
  Save, 
  Trash2, 
  ArrowRight, 
  FileDown, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  Briefcase, 
  Award, 
  GraduationCap, 
  Link2, 
  Settings, 
  FileSpreadsheet,
  AlertCircle,
  Eye,
  CheckSquare,
  Maximize2,
  Minimize2,
  Bookmark
} from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

interface CoverLetterData {
  greeting: string;
  opening: string;
  whyCompany: string;
  whyMe: string;
  experience: string;
  projects: string;
  skills: string;
  achievements: string;
  closing: string;
  signature: string;
  scores: {
    grammarScore: number;
    atsScore: number;
    professionalismScore: number;
    impactScore: number;
    confidenceScore: number;
    readabilityScore: number;
    recruiterScore: number;
  };
  suggestions: string[];
}

interface SavedCoverLetter {
  id: string;
  userId: string;
  targetCompany: string;
  targetJobRole: string;
  tone: string;
  template: string;
  letter: CoverLetterData;
  createdAt: string;
}

export const AICoverLetterView: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Form parameters
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [targetJobRole, setTargetJobRole] = useState('');
  const [experienceYears, setExperienceYears] = useState('2');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [achievements, setAchievements] = useState('');
  const [projects, setProjects] = useState('');
  const [experience, setExperience] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [github, setGithub] = useState('');
  const [tone, setTone] = useState('Confident & Dynamic');
  const [jobDescription, setJobDescription] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [template, setTemplate] = useState('Modern Serif');

  // Resume Parsing / Import Text
  const [resumeText, setResumeText] = useState('');
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [parseError, setParseError] = useState('');
  const [parseSuccess, setParseSuccess] = useState(false);

  // Cover Letter generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [generationError, setGenerationError] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState<CoverLetterData | null>(null);
  const [editingLetter, setEditingLetter] = useState<CoverLetterData | null>(null);

  // Active sub-panels
  const [activeFormTab, setActiveFormTab] = useState<'details' | 'resume-parse' | 'job-desc'>('details');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [savedLetters, setSavedLetters] = useState<SavedCoverLetter[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [currentSelectedHistoryId, setCurrentSelectedHistoryId] = useState<string | null>(null);

  // Inline section edit tracking
  const [editSectionKey, setEditSectionKey] = useState<string | null>(null);
  const [editSectionVal, setEditSectionVal] = useState('');

  // UI States
  const [isCopied, setIsCopied] = useState(false);
  const [isSavedInCloud, setIsSavedInCloud] = useState(false);
  const [zoomLetter, setZoomLetter] = useState(false);

  const generationSteps = [
    'Parsing Target Job Requirements...',
    'Analyzing Employer Company Values...',
    'Matching Resume Strengths with Job Role...',
    'Synthesizing Dynamic Sentences & Formatting...',
    'Simulating Recruiter ATS Screening...',
    'Polishing Professional Terminology...'
  ];

  // Auth & Initial load
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setLoadingUser(true);
      if (fbUser) {
        setCurrentUser(fbUser);
        await loadUserData(fbUser.uid, fbUser);
        await fetchSavedLetters(fbUser.uid);
      } else {
        setCurrentUser(null);
        // Load default from storage for guest
        const resume = StorageService.getResume();
        if (resume) {
          populateFromResume(resume);
        }
        loadGuestHistory();
      }
      setLoadingUser(false);
    });
    return () => unsub();
  }, []);

  // Set up step rotation timer during generation
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setGenStep((prev) => (prev < generationSteps.length - 1 ? prev + 1 : prev));
      }, 3000);
    } else {
      setGenStep(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const loadUserData = async (uid: string, fbUser: any) => {
    try {
      const resume = await FirestoreService.getResume(uid);
      if (resume) {
        populateFromResume(resume);
      } else {
        const localResume = StorageService.getResume();
        if (localResume) populateFromResume(localResume);
      }
    } catch (err) {
      console.warn("Error reading profile or resume from cloud:", err);
    }
  };

  const populateFromResume = (resume: any) => {
    if (resume) {
      setFullName(resume.fullName || '');
      setEmail(resume.email || '');
      setPhone(resume.phone || '');
      setLinkedIn(resume.linkedin || '');
      setGithub(resume.github || '');
      
      // Convert skills object or list
      if (Array.isArray(resume.skills)) {
        const skillsStr = resume.skills.map((s: any) => {
          if (typeof s === 'string') return s;
          return s.list ? s.list.join(', ') : '';
        }).filter(Boolean).join(', ');
        setSkills(skillsStr);
      } else if (typeof resume.skills === 'string') {
        setSkills(resume.skills);
      }

      // Convert education
      if (Array.isArray(resume.education)) {
        const eduStr = resume.education.map((e: any) => {
          return `${e.degree || 'Degree'} at ${e.institution || 'University'} (${e.year || ''})`;
        }).join('\n');
        setEducation(eduStr);
      }

      // Convert experience
      if (Array.isArray(resume.experience)) {
        const expStr = resume.experience.map((ex: any) => {
          const bulletPoints = Array.isArray(ex.bulletPoints) ? ex.bulletPoints.join('. ') : '';
          return `${ex.role || 'Role'} at ${ex.company || 'Company'} (${ex.duration || ''}): ${bulletPoints}`;
        }).join('\n\n');
        setExperienceYears(resume.experience.length > 0 ? String(resume.experience.length * 2 || '2') : '2');
        setExperience(expStr);
      }

      // Convert projects
      if (Array.isArray(resume.projects)) {
        const projStr = resume.projects.map((p: any) => {
          const tech = Array.isArray(p.techStack) ? ` [${p.techStack.join(', ')}]` : '';
          return `${p.name || 'Project'}: ${p.description || ''}${tech}`;
        }).join('\n');
        setProjects(projStr);
      }
    }
  };

  // Sync from Stored Profile / Resume Button click
  const handleLoadStoredResume = async () => {
    setParseSuccess(false);
    setParseError('');
    if (currentUser) {
      setLoadingHistory(true);
      const resume = await FirestoreService.getResume(currentUser.uid);
      if (resume) {
        populateFromResume(resume);
        triggerToast("Successfully synchronized your stored profile!");
      } else {
        triggerToast("No resume found in cloud storage.");
      }
      setLoadingHistory(false);
    } else {
      const localResume = StorageService.getResume();
      if (localResume) {
        populateFromResume(localResume);
        triggerToast("Successfully populated from local resume draft!");
      }
    }
  };

  // Analyze pasted resume text
  const handleParseResumeText = async () => {
    if (!resumeText.trim()) {
      setParseError('Please enter or paste your resume text to analyze.');
      return;
    }
    setIsParsingResume(true);
    setParseError('');
    setParseSuccess(false);

    try {
      const response = await fetch('/api/ai/analyze-resume-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetRole: targetJobRole })
      });
      
      if (!response.ok) throw new Error('API server returned error parsing resume.');
      const data = await response.json();

      if (data) {
        if (data.skills) setSkills(data.skills.join(', '));
        if (data.education) setEducation(data.education.join('\n'));
        if (data.experience) setExperience(data.experience.join('\n\n'));
        if (data.projects) setProjects(data.projects.join('\n'));
        if (data.achievements) setAchievements(data.achievements.join('\n'));
        
        setParseSuccess(true);
        triggerToast("Successfully parsed your resume text using AI!");
        setActiveFormTab('details');
      }
    } catch (err: any) {
      console.error(err);
      setParseError(err.message || 'Failed to connect to AI server. Standard mock parser was run.');
    } finally {
      setIsParsingResume(false);
    }
  };

  // Load Saved Letters
  const fetchSavedLetters = async (uid: string) => {
    if (!db) return;
    setLoadingHistory(true);
    try {
      const q = query(
        collection(db, 'coverLetters'), 
        where('userId', '==', uid)
      );
      const snap = await getDocs(q);
      const list: SavedCoverLetter[] = [];
      snap.forEach(d => {
        list.push(d.data() as SavedCoverLetter);
      });
      // Sort client-side by date descending
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setSavedLetters(list);
    } catch (e) {
      console.warn("Firestore cover letters fetch failed:", e);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadGuestHistory = () => {
    try {
      const raw = localStorage.getItem('placivo_saved_cover_letters');
      if (raw) {
        setSavedLetters(JSON.parse(raw));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const saveGuestHistory = (list: SavedCoverLetter[]) => {
    try {
      localStorage.setItem('placivo_saved_cover_letters', JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }
  };

  // Generate main letter
  const handleGenerateCoverLetter = async () => {
    if (!fullName) {
      triggerToast('Please provide your Full Name to sign the cover letter.');
      return;
    }
    if (!targetCompany) {
      triggerToast('Please provide the Target Company name.');
      return;
    }
    if (!targetJobRole) {
      triggerToast('Please provide the Target Job Role.');
      return;
    }

    setIsGenerating(true);
    setGenerationError('');
    setGeneratedLetter(null);
    setEditingLetter(null);
    setIsSavedInCloud(false);

    try {
      const response = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          targetCompany,
          targetJobRole,
          experienceYears,
          skills,
          education,
          achievements,
          projects,
          linkedIn,
          portfolio,
          github,
          tone,
          jobDescription,
          additionalInstructions,
          template
        })
      });

      if (!response.ok) throw new Error('API server failed during cover letter generation.');
      const data = await response.json();

      if (data && data.greeting) {
        setGeneratedLetter(data);
        setEditingLetter(data);
        triggerConfetti();
        triggerToast("Successfully generated your masterpiece cover letter!");
      } else {
        throw new Error('API server returned malformed JSON structure.');
      }
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || 'An error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Cover Letter to history database
  const handleSaveToHistory = async () => {
    if (!editingLetter) return;
    setLoadingHistory(true);

    const letterId = currentSelectedHistoryId || `cl-${Date.now()}`;
    const newRecord: SavedCoverLetter = {
      id: letterId,
      userId: currentUser?.uid || 'guest_user',
      targetCompany,
      targetJobRole,
      tone,
      template,
      letter: editingLetter,
      createdAt: new Date().toISOString()
    };

    try {
      if (currentUser && db) {
        // Save in cloud
        await setDoc(doc(db, 'coverLetters', letterId), newRecord);
        await fetchSavedLetters(currentUser.uid);
      } else {
        // Save in local storage
        const list = [...savedLetters];
        const idx = list.findIndex(l => l.id === letterId);
        if (idx >= 0) {
          list[idx] = newRecord;
        } else {
          list.unshift(newRecord);
        }
        setSavedLetters(list);
        saveGuestHistory(list);
      }
      setIsSavedInCloud(true);
      setCurrentSelectedHistoryId(letterId);
      triggerToast("Cover letter saved successfully!");
    } catch (err) {
      console.warn("Save history failed:", err);
      triggerToast("Failed to save cover letter to cloud.");
    } finally {
      setLoadingHistory(false);
    }
  };

  // Load selected history item
  const handleLoadHistoryItem = (item: SavedCoverLetter) => {
    setFullName(fullName || item.letter.signature.split('\n')[2] || '');
    setTargetCompany(item.targetCompany);
    setTargetJobRole(item.targetJobRole);
    setTone(item.tone);
    setTemplate(item.template);
    setGeneratedLetter(item.letter);
    setEditingLetter(item.letter);
    setCurrentSelectedHistoryId(item.id);
    setIsSavedInCloud(true);
    setIsHistoryOpen(false);
    triggerToast(`Loaded cover letter for ${item.targetCompany}`);
  };

  // Delete history item
  const handleDeleteHistoryItem = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this saved cover letter?")) return;

    setLoadingHistory(true);
    try {
      if (currentUser && db) {
        await deleteDoc(doc(db, 'coverLetters', id));
        await fetchSavedLetters(currentUser.uid);
      } else {
        const updated = savedLetters.filter(l => l.id !== id);
        setSavedLetters(updated);
        saveGuestHistory(updated);
      }
      if (currentSelectedHistoryId === id) {
        setGeneratedLetter(null);
        setEditingLetter(null);
        setCurrentSelectedHistoryId(null);
        setIsSavedInCloud(false);
      }
      triggerToast("Deleted successfully.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Clean form
  const handleResetForm = () => {
    if (window.confirm("Clear all form fields?")) {
      setTargetCompany('');
      setTargetJobRole('');
      setJobDescription('');
      setAdditionalInstructions('');
      setResumeText('');
      setGeneratedLetter(null);
      setEditingLetter(null);
      setCurrentSelectedHistoryId(null);
      setIsSavedInCloud(false);
    }
  };

  // Inline Section Editing
  const startEditSection = (key: string, val: string) => {
    setEditSectionKey(key);
    setEditSectionVal(val);
  };

  const saveEditSection = () => {
    if (!editingLetter || !editSectionKey) return;
    const updated = { ...editingLetter, [editSectionKey]: editSectionVal };
    setEditingLetter(updated);
    setEditSectionKey(null);
    setIsSavedInCloud(false);
    triggerToast("Section updated locally. Remember to click Save!");
  };

  // Copy plain text
  const handleCopyToClipboard = () => {
    if (!editingLetter) return;
    const fullText = [
      editingLetter.greeting,
      editingLetter.opening,
      editingLetter.whyCompany,
      editingLetter.whyMe,
      editingLetter.experience,
      editingLetter.projects,
      editingLetter.skills,
      editingLetter.achievements,
      editingLetter.closing,
      editingLetter.signature
    ].join('\n\n');

    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    triggerToast("Copied plain text to clipboard!");
  };

  // Download DOCX (standard HTML/Rich-text Blob)
  const handleExportDocx = () => {
    if (!editingLetter) return;
    const fullText = [
      editingLetter.greeting,
      editingLetter.opening,
      editingLetter.whyCompany,
      editingLetter.whyMe,
      editingLetter.experience,
      editingLetter.projects,
      editingLetter.skills,
      editingLetter.achievements,
      editingLetter.closing,
      editingLetter.signature
    ].join('\n\n');

    const blob = new Blob([fullText], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PlacivoAI_CoverLetter_${targetCompany.replace(/\s+/g, '_')}.doc`;
    link.click();
    URL.revokeObjectURL(url);
    triggerToast("DOCX file exported successfully!");
  };

  // Export PDF using jsPDF
  const handleExportPDF = () => {
    if (!editingLetter) return;
    try {
      const docPdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const fullText = [
        editingLetter.greeting,
        editingLetter.opening,
        editingLetter.whyCompany,
        editingLetter.whyMe,
        editingLetter.experience,
        editingLetter.projects,
        editingLetter.skills,
        editingLetter.achievements,
        editingLetter.closing,
        editingLetter.signature
      ].join('\n\n');

      docPdf.setFont('times', 'normal');
      docPdf.setFontSize(11);
      
      const pageHeight = docPdf.internal.pageSize.height;
      const margin = 20;
      const maxLineWidth = 170; // 210 - 40
      const splitText = docPdf.splitTextToSize(fullText, maxLineWidth);
      
      let cursorY = 25;
      
      docPdf.text(`PLACIVO AI COVER LETTER SUITE`, 20, 15);
      docPdf.setFontSize(10);
      docPdf.text(`Candidate: ${fullName} | Company: ${targetCompany} | Role: ${targetJobRole}`, 20, 20);
      docPdf.line(20, 21, 190, 21);
      
      docPdf.setFontSize(11);
      cursorY = 28;

      for (let i = 0; i < splitText.length; i++) {
        if (cursorY > pageHeight - margin) {
          docPdf.addPage();
          cursorY = 20;
        }
        docPdf.text(splitText[i], 20, cursorY);
        cursorY += 6;
      }

      docPdf.save(`PlacivoAI_CoverLetter_${targetCompany.replace(/\s+/g, '_')}.pdf`);
      triggerToast("PDF generated and downloaded!");
    } catch (err) {
      console.error(err);
      triggerToast("Failed to compile pdf. Copying plain text instead.");
      handleCopyToClipboard();
    }
  };

  const triggerToast = (msg: string) => {
    // Custom non-blocking console info
    console.log(`[Placivo AI Toast] ${msg}`);
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-sm py-3 px-5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce';
    toast.innerHTML = `<span class="h-2 w-2 rounded-full bg-emerald-400"></span> <span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#3b82f6', '#8b5cf6', '#6366f1', '#10b981']
    });
  };

  return (
    <div id="ai-cover-letter-root" className="w-full min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 text-slate-800">
      
      {/* Visual Elegant Header Block */}
      <div className="max-w-7xl mx-auto mb-8 relative">
        <div className="absolute top-0 right-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl filter -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-violet-200/40 rounded-full blur-3xl filter -z-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full border border-blue-100">
                PRO PLATFORM
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> Powered by Gemini 2.5 Flash-lite
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              AI Cover Letter Architect
            </h1>
            <p className="mt-2 text-slate-500 max-w-2xl text-sm leading-relaxed">
              Create world-class, ATS-optimized cover letters designed to bypass screening systems and capture the attention of technical hiring managers. Directly integrated with your profile database.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadStoredResume}
              disabled={loadingHistory}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl border border-slate-200 shadow-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 text-blue-600 ${loadingHistory ? 'animate-spin' : ''}`} />
              Sync Stored Profile
            </button>
            
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <History className="h-4 w-4 text-indigo-400" />
              History ({savedLetters.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Control Panel Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
            
            {/* Form Nav Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-1">
              <button
                onClick={() => setActiveFormTab('details')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-semibold text-xs rounded-xl transition-all ${
                  activeFormTab === 'details'
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }`}
              >
                <User className="h-4 w-4" />
                Profile Details
              </button>
              
              <button
                onClick={() => setActiveFormTab('resume-parse')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-semibold text-xs rounded-xl transition-all relative ${
                  activeFormTab === 'resume-parse'
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }`}
              >
                <Upload className="h-4 w-4" />
                Paste Resume Text
                {resumeText.trim() && !parseSuccess && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500"></span>
                )}
              </button>

              <button
                onClick={() => setActiveFormTab('job-desc')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-semibold text-xs rounded-xl transition-all relative ${
                  activeFormTab === 'job-desc'
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }`}
              >
                <Briefcase className="h-4 w-4" />
                Target Job
                {jobDescription.trim() && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
                )}
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Tab 1: Profile Details */}
              {activeFormTab === 'details' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Naman Pandey"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Experience (Years)</label>
                      <select
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm transition-all outline-none"
                      >
                        <option value="0">Fresh Graduate / Entry</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="5">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. naman@campus.edu"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Skills</label>
                      <span className="text-[10px] text-slate-400">Comma separated</span>
                    </div>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="React, TypeScript, Node.js, Express, Tailwind, NoSQL"
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Education Overview</label>
                    <textarea
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      placeholder="e.g. B.Tech in Computer Science - Graduation 2026"
                      rows={2}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Work Experience Details</label>
                    <textarea
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. SDE Intern at Amazon: Assisted in designing microservices; optimized DB queries by 25%."
                      rows={3}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Featured Projects</label>
                    <textarea
                      value={projects}
                      onChange={(e) => setProjects(e.target.value)}
                      placeholder="Describe your 1-2 major projects..."
                      rows={3}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        placeholder="linkedin.com/in/..."
                        className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Github</label>
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="github.com/..."
                        className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Portfolio</label>
                      <input
                        type="text"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="mywebsite.com"
                        className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Resume Parser */}
              {activeFormTab === 'resume-parse' && (
                <div className="space-y-4">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-800 leading-relaxed">
                      <strong>Smart AI Extractor:</strong> Paste your raw resume text here. Our background Gemini parser will instantly map education, skills, and projects so you don't have to fill them in manually!
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Paste Resume Text</label>
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste text contents from your PDF or Docx resume directly..."
                      rows={10}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs outline-none resize-none font-mono"
                    />
                  </div>

                  {parseError && (
                    <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{parseError}</span>
                    </div>
                  )}

                  {parseSuccess && (
                    <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>AI successfully parsed and mapped all profile values!</span>
                    </div>
                  )}

                  <button
                    onClick={handleParseResumeText}
                    disabled={isParsingResume}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
                  >
                    {isParsingResume ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        AI Parsing Resume Fields...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-amber-300" />
                        AI Parse Resume Text
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Tab 3: Target Job & Instructions */}
              {activeFormTab === 'job-desc' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Company *</label>
                      <input
                        type="text"
                        value={targetCompany}
                        onChange={(e) => setTargetCompany(e.target.value)}
                        placeholder="e.g. Google India"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Job Role *</label>
                      <input
                        type="text"
                        value={targetJobRole}
                        onChange={(e) => setTargetJobRole(e.target.value)}
                        placeholder="e.g. Frontend Engineer"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Voice Tone</label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm outline-none"
                      >
                        <option value="Professional & Balanced">Professional & Balanced</option>
                        <option value="Confident & Dynamic">Confident & Dynamic</option>
                        <option value="Humble & Passionate">Humble & Passionate</option>
                        <option value="Analytical & Technical">Analytical & Technical</option>
                        <option value="Creative & Modern">Creative & Modern</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Visual Template</label>
                      <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm outline-none"
                      >
                        <option value="Modern Serif">Modern Serif</option>
                        <option value="Corporate Clean">Corporate Clean</option>
                        <option value="Aesthetic Warm">Aesthetic Warm</option>
                        <option value="Futuristic Minimalist">Futuristic Minimalist</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Job Description (Highly Recommended)</label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description or primary role bullets to maximize ATS key-matching score..."
                      rows={5}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs outline-none resize-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Custom Instructions</label>
                    <textarea
                      value={additionalInstructions}
                      onChange={(e) => setAdditionalInstructions(e.target.value)}
                      placeholder="e.g. Focus heavy on the DBMS project. Keep it under 350 words..."
                      rows={2}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Reset/Action Row */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm rounded-xl transition-all"
                >
                  Reset Form
                </button>
                <button
                  type="button"
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  <Sparkles className="h-4.5 w-4.5 text-amber-300 animate-spin" />
                  Generate Masterpiece
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Stage Panel Column */}
        <div className="lg:col-span-7">
          
          {/* Active Generation Loader */}
          {isGenerating && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
              <div className="relative mb-6">
                <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-indigo-500 animate-bounce" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800">Architecting Your Cover Letter</h3>
              <p className="text-slate-400 text-xs mt-1 mb-8">This takes around 10-15 seconds for highest quality synthesis</p>

              <div className="w-full max-w-sm bg-slate-100 rounded-full h-1.5 mb-6 overflow-hidden">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${((genStep + 1) / generationSteps.length) * 100}%` }}
                ></div>
              </div>

              <div className="text-sm font-semibold text-blue-600 animate-pulse h-6">
                {generationSteps[genStep]}
              </div>
            </div>
          )}

          {/* Error display */}
          {generationError && (
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 text-center text-rose-800 space-y-3">
              <AlertCircle className="h-8 w-8 text-rose-500 mx-auto" />
              <h3 className="font-bold">Generation Encountered an Error</h3>
              <p className="text-sm">{generationError}</p>
              <button 
                onClick={handleGenerateCoverLetter} 
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs"
              >
                Retry Generation
              </button>
            </div>
          )}

          {/* Empty display */}
          {!isGenerating && !generatedLetter && !generationError && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
              <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Your Masterpiece Workspace</h3>
              <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto leading-relaxed">
                Provide your role and company on the left, click <strong>Generate Masterpiece</strong>, and watch Placivo AI synthesize a persuasive, tailored cover letter.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
                <div onClick={() => { setTargetCompany('Google India'); setTargetJobRole('Software Developer'); }} className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl cursor-pointer text-left transition-all hover:scale-[1.01]">
                  <div className="font-semibold text-xs text-slate-600">Try Prompt 1</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Software Engineer at Google</div>
                </div>
                <div onClick={() => { setTargetCompany('Stripe'); setTargetJobRole('React Frontend Architect'); }} className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl cursor-pointer text-left transition-all hover:scale-[1.01]">
                  <div className="font-semibold text-xs text-slate-600">Try Prompt 2</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">React Specialist at Stripe</div>
                </div>
              </div>
            </div>
          )}

          {/* Completed Cover Letter Output */}
          {generatedLetter && editingLetter && (
            <div className="space-y-6">
              
              {/* Toolbar */}
              <div className="bg-white rounded-xl border border-slate-100 p-3 flex flex-wrap gap-2 justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-semibold text-slate-600">Masterpiece Draft Ready</span>
                  {isSavedInCloud ? (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Saved to History
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">
                      Unsaved Changes
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyToClipboard}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
                    title="Copy plain text"
                  >
                    {isCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={handleExportDocx}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
                    title="Export DOCX"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleExportPDF}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
                    title="Download PDF"
                  >
                    <FileDown className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setZoomLetter(!zoomLetter)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
                    title="Toggle Zoom View"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleSaveToHistory}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-all"
                  >
                    <Save className="h-3 w-3" />
                    Save Letter
                  </button>
                </div>
              </div>

              {/* Cover Letter Textured Sheet */}
              <div 
                className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 relative ${
                  zoomLetter ? 'max-w-none' : ''
                } ${
                  template === 'Modern Serif' ? 'font-serif' :
                  template === 'Corporate Clean' ? 'font-sans tracking-wide' :
                  template === 'Aesthetic Warm' ? 'font-sans' : 'font-mono'
                }`}
                style={{
                  background: template === 'Aesthetic Warm' ? '#fdfbf7' : '#ffffff',
                  border: '1px solid rgba(226, 232, 240, 0.8)'
                }}
              >
                
                {/* Visual Letterhead Decorator */}
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>

                {/* Cover Letter Content Body */}
                <div className="p-8 sm:p-12 space-y-6 text-sm md:text-base leading-relaxed text-slate-700">
                  
                  {/* Inline Section Rendering */}
                  {[
                    { key: 'greeting', label: 'Salutation' },
                    { key: 'opening', label: 'Opening Paragraph' },
                    { key: 'whyCompany', label: 'Why This Company' },
                    { key: 'whyMe', label: 'Why Candidate Fits' },
                    { key: 'experience', label: 'Value-driven Experience' },
                    { key: 'projects', label: 'Impactful Projects' },
                    { key: 'skills', label: 'Technical Skills Paragraph' },
                    { key: 'achievements', label: 'Key Achievements Block' },
                    { key: 'closing', label: 'Call to Action / Closing' },
                    { key: 'signature', label: 'Professional Sign-off' }
                  ].map((sec) => {
                    const currentSectionText = (editingLetter as any)[sec.key] || '';
                    const isEditingThis = editSectionKey === sec.key;

                    return (
                      <div key={sec.key} className="group relative border-l-2 border-transparent hover:border-slate-100 pl-4 -ml-4 transition-all">
                        {isEditingThis ? (
                          <div className="space-y-2 py-2">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{sec.label} Editor</span>
                            <textarea
                              value={editSectionVal}
                              onChange={(e) => setEditSectionVal(e.target.value)}
                              rows={5}
                              className="w-full p-3 bg-slate-50 border border-blue-400 focus:outline-none rounded-xl text-sm font-sans"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={saveEditSection}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                              >
                                <Save className="h-3.5 w-3.5" /> Save Section
                              </button>
                              <button
                                onClick={() => setEditSectionKey(null)}
                                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-600 text-xs font-semibold rounded-lg"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="whitespace-pre-line leading-relaxed text-slate-800">
                              {currentSectionText}
                            </p>
                            
                            {/* Hover Edit Pencil */}
                            <button
                              onClick={() => startEditSection(sec.key, currentSectionText)}
                              className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-all duration-150"
                              title={`Edit ${sec.label}`}
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Scores Gauge Dashboard Panel */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6">
                <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-blue-500 animate-pulse" />
                  Placivo AI Analytical Audit
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {[
                    { label: 'ATS Match', val: editingLetter.scores.atsScore, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Readability', val: editingLetter.scores.readabilityScore, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Impact', val: editingLetter.scores.impactScore, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    { label: 'Confidence', val: editingLetter.scores.confidenceScore, color: 'text-violet-500', bg: 'bg-violet-50' },
                    { label: 'Recruiter Score', val: editingLetter.scores.recruiterScore, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: 'Professionalism', val: editingLetter.scores.professionalismScore, color: 'text-teal-500', bg: 'bg-teal-50' },
                    { label: 'Grammar', val: editingLetter.scores.grammarScore, color: 'text-pink-500', bg: 'bg-pink-50' }
                  ].map((score) => (
                    <div key={score.label} className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                      <span className="text-[10px] text-slate-400 font-bold block mb-2 leading-tight uppercase">{score.label}</span>
                      <div className={`w-12 h-12 rounded-full ${score.bg} mx-auto flex items-center justify-center font-bold text-sm ${score.color} mb-1 border border-slate-100`}>
                        {score.val}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Recruiter Suggestions list */}
                {editingLetter.suggestions && editingLetter.suggestions.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Actionable Pro-Tips & Suggestions</span>
                    <ul className="space-y-2">
                      {editingLetter.suggestions.map((sug, i) => (
                        <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                          <CheckSquare className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Slide-over Saved History overlay */}
      <AnimatePresence>
        {isHistoryOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="absolute inset-0 bg-black transition-opacity"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <History className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-lg font-bold text-slate-900">Saved Cover Letters</h2>
                  </div>
                  <button 
                    onClick={() => setIsHistoryOpen(false)} 
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all text-xs"
                  >
                    Close
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {loadingHistory ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
                      <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                      <span className="text-xs">Fetching past cover letters...</span>
                    </div>
                  ) : savedLetters.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-medium">No saved letters yet</p>
                      <p className="text-xs mt-1">Generate a cover letter and save it to cloud history.</p>
                    </div>
                  ) : (
                    savedLetters.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleLoadHistoryItem(item)}
                        className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 rounded-xl cursor-pointer transition-all flex justify-between items-start group"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-xs text-slate-800 leading-snug">
                            {item.targetJobRole} at {item.targetCompany}
                          </h4>
                          <div className="flex gap-2 text-[10px] text-slate-400">
                            <span>{item.tone}</span>
                            <span>•</span>
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => handleDeleteHistoryItem(e, item.id)}
                          className="p-1 opacity-0 group-hover:opacity-100 hover:bg-rose-50 rounded text-rose-500 hover:text-rose-700 transition-all duration-150"
                          title="Delete history item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                  <div className="text-xs text-slate-400 text-center leading-relaxed">
                    Synced with Firestore Database ID: <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">ai-studio-campusosai</code>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
