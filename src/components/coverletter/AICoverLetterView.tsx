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
  deleteDoc
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
  Bookmark,
  BarChart3,
  HelpCircle,
  Flame,
  Compass,
  Zap,
  Layers,
  Plus,
  Info,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Trophy,
  Terminal
} from 'lucide-react';
import jsPDF from 'jspdf';
import { exportCanvasToPDF } from '../../lib/pdfExport';
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
  fullName?: string;
  email?: string;
  phone?: string;
  skills?: string;
  education?: string;
  achievements?: string;
  projects?: string;
  experience?: string;
  linkedIn?: string;
  portfolio?: string;
  github?: string;
}

// Company Preset Information
interface CompanyCulturePreset {
  name: string;
  logoColor: string;
  cultureName: string;
  description: string;
  suggestedTone: string;
  jobDescTemplate: string;
  customDirectives: string;
}

const COMPANY_PRESETS: CompanyCulturePreset[] = [
  {
    name: "Google",
    logoColor: "from-red-500 via-yellow-500 to-green-500",
    cultureName: "Googliness",
    description: "Emphasizes intellectual curiosity, bias for teamwork, user-first engineering, and handling ambiguity with positive leadership.",
    suggestedTone: "Professional & Balanced",
    jobDescTemplate: "As a Software Engineer on the Core Infrastructure team, you will design, develop, and deploy highly-scalable cloud microservices, optimize database access patterns for millions of queries per second, and collaborate across distributed systems to maintain maximum uptime and clean API standards.",
    customDirectives: "Emphasize collaboration, systemic thinking, and a user-first engineering perspective. Use words like 'scale', 'system-design', and 'cross-functional'."
  },
  {
    name: "Stripe",
    logoColor: "from-blue-600 via-indigo-500 to-purple-600",
    cultureName: "Developer First",
    description: "Prioritizes clean API semantics, elegant developer experiences (DX), rigorous performance profiling, and write-ups of tech designs.",
    suggestedTone: "Analytical & Technical",
    jobDescTemplate: "We are looking for a React Frontend Engineer who obsessed over developer tools, crisp layouts, modular component design systems, and lightning-fast loading performance. You will build core billing dashboard portals used by millions of global online businesses daily.",
    customDirectives: "Focus on API precision, developer experience (DX), performance optimization, and rigorous frontend engineering. Mention state machines or optimized rendering."
  },
  {
    name: "Amazon",
    logoColor: "from-amber-500 to-orange-600",
    cultureName: "Leadership Principles",
    description: "Highly structural. Values Customer Obsession, Ownership, Bias for Action, Invent and Simplify, and delivering high-impact metrics.",
    suggestedTone: "Confident & Dynamic",
    jobDescTemplate: "The AWS Serverless team is hiring an Engineer to scale event-driven messaging pipelines. You must demonstrate strong ownership over service SLAs, analyze bottlenecks in distributed event systems, and invent simple, durable mechanisms for customer workloads.",
    customDirectives: "Actively frame achievements using Amazon Leadership Principles: Ownership, Customer Obsession, and Bias for Action. Make sure to highlight quantified metrics (e.g. 35% speedup)."
  },
  {
    name: "Meta",
    logoColor: "from-blue-500 to-sky-600",
    cultureName: "Move Fast & Build Impact",
    description: "Values rapid shipping of high-leverage products, data-driven optimization, scalability, and solving open-ended product problems.",
    suggestedTone: "Confident & Dynamic",
    jobDescTemplate: "Join the Instagram Ads Delivery team to build high-throughput feed optimization frameworks. You will design real-time data ingestion flows, execute rigorous A/B experiments, and collaborate daily with data scientists to maximize user monetization impact.",
    customDirectives: "Frame your experience as fast-paced, high-leverage, and exceptionally metrics-driven. Focus on rapid iteration, user impact, and scaling products quickly."
  },
  {
    name: "Microsoft",
    logoColor: "from-teal-500 to-blue-600",
    cultureName: "Growth Mindset",
    description: "Emphasizes empathetic technology, accessibility, cloud-native enterprise migrations, continuous learning, and security-first code.",
    suggestedTone: "Humble & Passionate",
    jobDescTemplate: "Seeking an engineer to join Azure Developer Platform. You will deliver clean software integrations, migrate enterprise operations safely, ensure high accessibility standards, and foster a collaborative team culture focused on continuous development.",
    customDirectives: "Highlight learning agility, accessibility (WCAG), growth-mindset, and secure enterprise developer practices. Use positive, growth-oriented language."
  },
  {
    name: "OpenAI",
    logoColor: "from-slate-800 to-black",
    cultureName: "Frontier Research",
    description: "Focuses on building safe artificial general intelligence, handling bleeding-edge AI models, vector search, and latency optimization.",
    suggestedTone: "Analytical & Technical",
    jobDescTemplate: "We are looking for a Platform Engineer to build secure, scalable API gateway routes for our real-time models. You will handle custom connection pooling, optimize token rendering latency, and integrate advanced caching layers for frontier AI models.",
    customDirectives: "Incorporate modern concepts like vector databases, custom token caching, prompt orchestration, or LLM evaluation frameworks. Highlight technical pioneering."
  }
];

// Company logo icon helper component
const CompanyLogoIcon: React.FC<{ name: string; logoUrl?: string }> = ({ name, logoUrl }) => {
  if (logoUrl && logoUrl !== 'NOT_FOUND') {
    return (
      <div className="w-6 h-6 shrink-0 shadow-xs p-0.5 bg-white border border-slate-200/85 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-200 hover:scale-105" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <img 
          src={logoUrl} 
          alt={`${name} logo`} 
          className="w-full h-full object-contain rounded" 
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }
  const normalizedName = name.toLowerCase();
  
  if (normalizedName.includes('microsoft')) {
    return (
      <div className="grid grid-cols-2 gap-0.5 w-6 h-6 shrink-0 shadow-sm" id="logo-microsoft" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <div className="bg-[#f25022] w-2.5 h-2.5"></div>
        <div className="bg-[#7fba00] w-2.5 h-2.5"></div>
        <div className="bg-[#00a4ef] w-2.5 h-2.5"></div>
        <div className="bg-[#ffb900] w-2.5 h-2.5"></div>
      </div>
    );
  }
  
  if (normalizedName.includes('google')) {
    return (
      <svg className="w-6 h-6 shrink-0 shadow-sm rounded-full" viewBox="0 0 24 24" id="logo-google" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
    );
  }
  
  if (normalizedName.includes('stripe')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-[#635bff] text-white shrink-0 shadow-sm border border-indigo-400/20" id="logo-stripe" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.92 7.1c0-.5-.4-.74-1.05-.74-.75 0-1.74.22-2.58.64V4.14c.94-.37 2-.54 2.92-.54 2.5 0 3.86 1.1 3.86 3.14v6.86c0 1.94.38 2.62.77 3.03l-2.9 1.1c-.27-.4-.52-1.03-.52-1.97-.68.83-1.85 2.1-4.04 2.1-2.07 0-3.54-1.22-3.54-3.13 0-2.62 2.37-3.58 5.75-3.58.55 0 .9-.05 1.33-.12V7.1zm-1.33 3.9c-1.34.05-2.58.33-2.58 1.48 0 .58.46.96 1.1.96 1.05 0 1.48-.7 1.48-1.57v-.87z"/>
        </svg>
      </div>
    );
  }
  
  if (normalizedName.includes('amazon') || normalizedName.includes('aws')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-[#111111] text-[#ff9900] shrink-0 shadow-sm border border-slate-800" id="logo-amazon" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5 text-[#ff9900]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 12.8c-1.1.5-2.6.8-3.7.8-2 0-3.1-1-3.1-2.9 0-2.4 1.8-3.5 4.9-3.5h1.9v1.2c0 1.2-.5 2-1.9 2.5l1.9 1.9zm1.3-4.7c0-2.5-1.5-3.8-4.2-3.8-2.1 0-3.9.9-4.8 1.6l1 1.6c.7-.6 1.9-1.2 3.1-1.2 1.5 0 2.2.7 2.2 2v.6h-2.1c-4.2 0-6.8 1.8-6.8 5 0 2.8 2 4.6 4.8 4.6 2.3 0 3.9-1.1 4.6-2.1l.1 1.7h2.6v-9.5zM21.9 19C17.2 21.6 11 22.8 5.1 21.9c-3.1-.5-6.1-1.7-8.1-4l1.5-1.5c1.6 1.8 4.2 2.8 6.9 3.2 4.9.7 10.2-.4 14.1-2.7L21.9 19zm1.1-1.6c.1.3-.2.5-.5.3l-2.4-1.3c-.3-.2-.2-.5.1-.4l2.7.3c.3.1.2.8.1.1.1.7.1 1.1.1 1.1zm-2.4-2.2l.6 1.9c.1.3-.2.5-.5.3l-1.9-.9c-.3-.1-.2-.5.1-.5l1.7-.1.1-.3z"/>
        </svg>
      </div>
    );
  }
  
  if (normalizedName.includes('meta') || normalizedName.includes('facebook')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-[#0668e1] shrink-0 shadow-sm" id="logo-meta" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.75 6c-1.75 0-3.37 1.05-4.25 2.62-.88-1.57-2.5-2.62-4.25-2.62-2.76 0-5 2.24-5 5s2.24 5 5 5c1.75 0 3.37-1.05 4.25-2.62.88 1.57 2.5 2.62 4.25 2.62 2.76 0 5-2.24 5-5s-2.24-5-5-5zm-8.5 7.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm8.5 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    );
  }
  
  if (normalizedName.includes('openai') || normalizedName.includes('chatgpt')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-slate-950 shrink-0 shadow-sm border border-slate-800" id="logo-openai" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.5 10c-.2-.9-.7-1.7-1.4-2.3l.1-.1c.5-.3.9-.8 1.1-1.3.4-1.1.1-2.4-.8-3.2-1-1-2.5-1.1-3.6-.3l-.1-.1c-.4-.5-.9-.8-1.5-1-.9-.3-1.8-.2-2.6.3L12 3 11.3 2.1c-.8-.5-1.7-.6-2.6-.3-.6.2-1.1.5-1.5 1l-.1.1C6 2.1 4.5 2.2 3.5 3.2c-.9.8-1.2 2.1-.8 3.2.2.5.6 1 1.1 1.3l.1.1C3.2 8.5 2.7 9.3 2.5 10c-.3.9-.2 1.8.3 2.6L3.7 13.5l-.9.9c-.5.8-.6 1.7-.3 2.6.2.6.5 1.1 1 1.5l.1.1C3.1 19.5 3 21 4 22c1 1 2.5 1.1 3.6.3l.1.1c.4.5.9.8 1.5 1 .9.3 1.8.2 2.6-.3l.7-.9.7.9c.8.5 1.7.6 2.6.3.6-.2 1.1-.5 1.5-1l.1-.1c1.1.8 2.6.7 3.6-.3 1-1 1.1-2.5 3-3.6l.1-.1c.5-.4.8-.9 1-1.5.3-.9.2-1.8-.3-2.6L20.3 10.5l1.2-.5zm-9.5 5.5l-2.3-1.3 2.3-4 2.3 1.3-2.3 4z" />
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('thoughtworks')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-[#ef4444] text-white font-black text-[10px] shrink-0 shadow-sm tracking-tighter" id="logo-thoughtworks" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        TW
      </div>
    );
  }

  if (normalizedName.includes('apple')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-slate-900 shrink-0 shadow-sm border border-slate-700/30" id="logo-apple" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94 1.08.08 2.15-.52 2.81-1.33z" />
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('netflix')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-black shrink-0 shadow-sm" id="logo-netflix" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3 h-4 text-[#E50914]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 21V3h4.63l6.59 13.91V3h4.31v18h-4.32l-6.9-14.39V21H4z" />
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('airbnb')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-[#FF5A5F] shrink-0 shadow-sm" id="logo-airbnb" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 01-9-9c0-1.74.84-3.3 2.16-4.27a9 9 0 0113.68 0C20.16 8.7 21 10.26 21 12a9 9 0 01-9 9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('spotify')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1ED760] shrink-0 shadow-sm" id="logo-spotify" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.98-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.743 3.856-.88 7.15-.51 9.82 1.127.296.18.388.565.207.86zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.182-.412.125-.843-.107-.968-.52-.125-.41.108-.844.52-.968 3.67-1.114 8.24-.57 11.34 1.33.366.226.486.707.258 1.08zm.105-2.836C14.492 8.71 8.822 8.52 5.54 9.513c-.51.156-1.05-.137-1.206-.648-.156-.51.137-1.05.648-1.206 3.76-1.14 10.007-.92 14.437 1.71.46.27.61.87.34 1.33-.27.46-.87.61-1.33.34z"/>
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('adobe')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-[#FF0000] text-white shrink-0 shadow-sm" id="logo-adobe" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.9 2h7.1v19h-5.9l-3.3-6.1h-4.3l-2.4 6.1H2.1L9.9 2h4zm-3.2 8.8l2.1 4.2H9.2l1.5-4.2z"/>
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('tesla')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-black shrink-0 border border-slate-800" id="logo-tesla" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5 text-[#E01A22]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 5.38c-.37 0-.74.19-.94.49L12 9.77l-1.25-1.9c-.2-.3-.57-.49-.94-.49H8.25c-.71 0-1.14.79-.75 1.38l2.5 3.8-2.5 3.8c-.39.59.04 1.38.75 1.38H9.8c.37 0 .74-.19.94-.49L12 15.35l1.25 1.9c.2.3.57.49.94.49h1.56c.71 0 1.14-.79.75-1.38l-2.5-3.8 2.5-3.8c.39-.59-.04-1.38-.75-1.38h-1.56z"/>
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('twitter') || normalizedName.includes(' x ')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-black text-white shrink-0 shadow-sm" id="logo-twitter" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('github')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white shrink-0 border border-slate-700 shadow-sm" id="logo-github" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('nvidia')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-black shrink-0 border border-slate-800 shadow-sm" id="logo-nvidia" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5 text-[#76B900]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('salesforce')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-white shrink-0 border border-slate-200 shadow-sm" id="logo-salesforce" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-4 h-3 text-[#00A1E0]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.1 8c-.1 0-.1 0 0 0-1-.3-1.9-.3-2.8-.1-.4-1.9-1.9-3.4-3.8-3.7-2.6-.4-5 1.1-5.7 3.6-.5-.2-1.1-.3-1.6-.2-1.8.3-3.1 1.9-3.2 3.7C.8 11.7 0 13.1 0 14.6c0 2.5 2 4.5 4.5 4.5h14.6c2.7-.2 4.9-2.5 4.9-5.2 0-3-2.2-5.5-4.9-5.9z" />
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('atlassian') || normalizedName.includes('jira') || normalizedName.includes('confluence')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-slate-50 border border-slate-200 shrink-0 shadow-sm" id="logo-atlassian" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5 text-[#0052CC]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.9 14.3l-2.4-4.5-2.4 4.5h4.8M12 .5L1.5 20.2h5.8l4.7-8.8 4.7 8.8h5.8L12 .5z" />
        </svg>
      </div>
    );
  }

  if (normalizedName.includes('uber')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-black shrink-0 border border-slate-800 shadow-sm" id="logo-uber" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <span className="text-white font-black text-[10px] tracking-tight">U</span>
      </div>
    );
  }

  if (normalizedName.includes('slack')) {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded bg-white border border-slate-200 shrink-0 shadow-sm" id="logo-slack" style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042z" fill="#36C5F0"/>
          <path d="M8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522V8.824a2.528 2.528 0 0 1 2.522-2.52h5.043z" fill="#2EB67D"/>
        </svg>
      </div>
    );
  }

  // Fallback Monogram
  return (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs shrink-0 shadow-sm border border-white" id={`logo-fallback-${name}`} style={{ minWidth: '24px', minHeight: '24px', width: '24px', height: '24px' }}>
      {name ? name.charAt(0).toUpperCase() : 'C'}
    </div>
  );
};

// Parser helpers
const parseExperienceBlocks = (text: string) => {
  if (!text) return [];
  const blocks = text.split(/\n\n+/);
  return blocks.map((block, idx) => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return null;
    const firstLine = lines[0];
    
    let role = "Software Engineer";
    let company = "Tech Company";
    let duration = "2024 - Present";
    let location = "Bengaluru, India";
    
    const atIdx = firstLine.toLowerCase().indexOf(' at ');
    const parenIdx = firstLine.indexOf('(');
    const parenEndIdx = firstLine.indexOf(')');
    
    if (atIdx !== -1) {
      role = firstLine.substring(0, atIdx).trim();
      if (parenIdx !== -1) {
        company = firstLine.substring(atIdx + 4, parenIdx).trim();
        duration = firstLine.substring(parenIdx + 1, parenEndIdx === -1 ? firstLine.length : parenEndIdx).trim();
      } else {
        company = firstLine.substring(atIdx + 4).trim();
      }
    } else if (parenIdx !== -1) {
      role = firstLine.substring(0, parenIdx).trim();
      duration = firstLine.substring(parenIdx + 1, parenEndIdx === -1 ? firstLine.length : parenEndIdx).trim();
    } else {
      role = firstLine;
    }

    const bullets = lines.slice(1);
    
    return {
      id: `exp-${idx}`,
      role,
      company,
      duration,
      location,
      bullets
    };
  }).filter(Boolean);
};

const parseEducationBlocks = (text: string) => {
  if (!text) return [];
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  return lines.map((line, idx) => {
    let degree = line;
    let institution = "Government Engineering College";
    let year = "2022 - 2026";
    
    const dashIdx = line.indexOf('-');
    const atIdx = line.toLowerCase().indexOf(' at ');
    
    if (dashIdx !== -1) {
      degree = line.substring(0, dashIdx).trim();
      year = line.substring(dashIdx + 1).trim();
    }
    
    const collegeIdx = degree.toLowerCase().indexOf(' at ');
    if (collegeIdx !== -1) {
      institution = degree.substring(collegeIdx + 4).trim();
      degree = degree.substring(0, collegeIdx).trim();
    }
    
    return {
      id: `edu-${idx}`,
      degree,
      institution,
      year
    };
  });
};

const parseProjectBlocks = (text: string) => {
  if (!text) return [];
  const blocks = text.split(/\n+/);
  return blocks.map((block, idx) => {
    let name = "Project Name";
    let description = block;
    let techStack: string[] = [];
    
    const colonIdx = block.indexOf(':');
    if (colonIdx !== -1) {
      name = block.substring(0, colonIdx).trim();
      description = block.substring(colonIdx + 1).trim();
    }
    
    const braceIdx = description.indexOf('[');
    const braceEndIdx = description.indexOf(']');
    if (braceIdx !== -1 && braceEndIdx !== -1) {
      const stackStr = description.substring(braceIdx + 1, braceEndIdx);
      techStack = stackStr.split(',').map(s => s.trim());
      description = description.substring(0, braceIdx).trim();
    }
    
    return {
      id: `proj-${idx}`,
      name,
      description,
      techStack
    };
  });
};

const parseAchievements = (text: string) => {
  if (!text) return [];
  return text.split('\n').map(l => l.trim()).filter(Boolean);
};

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

  // Automated Company logo fetching for Target and Experience companies
  const [companyLogos, setCompanyLogos] = useState<Record<string, string>>({});
  const companyLogosRef = useRef<Record<string, string>>({});
  const pendingFetches = useRef<Set<string>>(new Set());

  useEffect(() => {
    const fetchLogoForName = async (name: string) => {
      const trimmed = name.trim();
      if (!trimmed || trimmed.length < 2) return;
      
      const key = trimmed.toLowerCase();
      // Skip if already fetched, or currently fetching
      if (companyLogosRef.current[key] || pendingFetches.current.has(key)) return;

      // Skip if it is a hardcoded logo to preserve custom high-fidelity SVGs
      const hardcoded = ['microsoft', 'google', 'stripe', 'amazon', 'aws', 'meta', 'facebook', 'openai', 'chatgpt', 'github', 'spotify', 'apple', 'netflix', 'slack', 'atlassian', 'salesforce', 'nvidia', 'uber', 'airbnb', 'adobe', 'tesla'];
      if (hardcoded.some(hc => key.includes(hc))) return;

      pendingFetches.current.add(key);

      try {
        const response = await fetch(`/api/company/logo?name=${encodeURIComponent(trimmed)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.exists && data.logo) {
            companyLogosRef.current[key] = data.logo;
            setCompanyLogos(prev => ({ ...prev, [key]: data.logo }));
          } else {
            companyLogosRef.current[key] = 'NOT_FOUND';
            setCompanyLogos(prev => ({ ...prev, [key]: 'NOT_FOUND' }));
          }
        } else {
          companyLogosRef.current[key] = 'NOT_FOUND';
          setCompanyLogos(prev => ({ ...prev, [key]: 'NOT_FOUND' }));
        }
      } catch (err) {
        console.error('Failed to fetch company logo:', err);
        companyLogosRef.current[key] = 'NOT_FOUND';
        setCompanyLogos(prev => ({ ...prev, [key]: 'NOT_FOUND' }));
      } finally {
        pendingFetches.current.delete(key);
      }
    };

    // Gather names from targetCompany and parsed experience blocks
    const namesToFetch: string[] = [];
    if (targetCompany) {
      namesToFetch.push(targetCompany);
    }
    const parsedExp = parseExperienceBlocks(experience);
    parsedExp.forEach((exp: any) => {
      if (exp && exp.company) {
        namesToFetch.push(exp.company);
      }
    });

    const uniqueNames = Array.from(new Set(namesToFetch));
    uniqueNames.forEach(name => {
      fetchLogoForName(name);
    });
  }, [targetCompany, experience]);

  // Resume Parsing / Import Text
  const [resumeText, setResumeText] = useState('');
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [parseError, setParseError] = useState('');
  const [parseSuccess, setParseSuccess] = useState(false);

  // Cover Letter generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [generationError, setGenerationError] = useState('');
  
  // A/B Variations & Generated data
  const [generatedLetter, setGeneratedLetter] = useState<CoverLetterData | null>(null);
  const [editingLetter, setEditingLetter] = useState<CoverLetterData | null>(null);
  
  // Variant system
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');
  const [variantBLetter, setVariantBLetter] = useState<CoverLetterData | null>(null);
  const [isGeneratingVariantB, setIsGeneratingVariantB] = useState(false);

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
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [activeMode, setActiveMode] = useState<'letter' | 'outreach'>('letter');
  const [outreachCopiedKey, setOutreachCopiedKey] = useState<string | null>(null);
  
  // Custom Interview Preparation Cheat Sheet State
  const [interviewCheatSheet, setInterviewCheatSheet] = useState<{
    questions: { question: string; scenario: string; bestAnswer: string }[];
    questionsToAsk: string[];
    culturePoints: string[];
  } | null>(null);
  const [isGeneratingCheatSheet, setIsGeneratingCheatSheet] = useState(false);

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
        if (data.skills) setSkills(Array.isArray(data.skills) ? data.skills.join(', ') : data.skills);
        if (data.education) setEducation(Array.isArray(data.education) ? data.education.join('\n') : data.education);
        if (data.experience) setExperience(Array.isArray(data.experience) ? data.experience.join('\n\n') : data.experience);
        if (data.projects) setProjects(Array.isArray(data.projects) ? data.projects.join('\n') : data.projects);
        if (data.achievements) setAchievements(Array.isArray(data.achievements) ? data.achievements.join('\n') : data.achievements);
        
        setParseSuccess(true);
        triggerToast("Successfully parsed your resume text using AI!");
        setActiveFormTab('details');
      }
    } catch (err: any) {
      console.error(err);
      setParseError(err.message || 'Failed to connect to AI server.');
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

  // Preset Applicator
  const applyPreset = (preset: CompanyCulturePreset) => {
    setTargetCompany(preset.name);
    setTone(preset.suggestedTone);
    setJobDescription(preset.jobDescTemplate);
    setAdditionalInstructions(preset.customDirectives);
    triggerToast(`Applied high-ground ${preset.name} culture requirements!`);
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
    setVariantBLetter(null);
    setInterviewCheatSheet(null);
    setIsSavedInCloud(false);
    setActiveVariant('A');

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
        triggerToast("Successfully generated your primary cover letter!");
        
        // Auto-generate the companion interview cheat sheet
        handleGenerateInterviewCheatSheet(data);
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

  // Generate A/B Variant B (Disruptive & Bold alternative)
  const handleGenerateVariantB = async () => {
    if (!editingLetter) return;
    setIsGeneratingVariantB(true);
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
          tone: "Confident & Dynamic", // Force disruptive bold tone
          jobDescription,
          additionalInstructions: `${additionalInstructions}. Please write a highly creative, disruptive, bold alternative version of the cover letter that starts with a hook and projects maximum authority and charisma.`,
          template
        })
      });

      if (!response.ok) throw new Error('Failed to create Variant B.');
      const data = await response.json();
      if (data && data.greeting) {
        setVariantBLetter(data);
        setActiveVariant('B');
        setEditingLetter(data);
        triggerToast("Disruptive 'Variant B' successfully crafted!");
      }
    } catch (err) {
      console.error(err);
      triggerToast("Error producing alternative variant.");
    } finally {
      setIsGeneratingVariantB(false);
    }
  };

  // Generate Interview Preparation Cheat Sheet via client-side fetch helper
  const handleGenerateInterviewCheatSheet = async (letterCtx: CoverLetterData) => {
    setIsGeneratingCheatSheet(true);
    try {
      // Craft a quick internal fetch prompt utilizing the Gemini interactions standard or custom server query if applicable
      // To keep it clean and robust, we fetch from our companion AI route. If no backend route, we synthesize a beautiful dynamic one
      const response = await fetch('/api/ai/generate-cover-letter', { // we use the same flexible endpoint with custom instruction to build JSON
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          targetCompany,
          targetJobRole,
          skills,
          projects,
          tone: "Analytical & Technical",
          additionalInstructions: "CRITICAL: Do NOT generate a cover letter. Instead, generate a detailed mock interview prep sheet in JSON matching this structure: { greeting: '', opening: '', whyCompany: '', scores: {atsScore: 90}, suggestions: ['Suggest 1'], interviewPrep: { questions: [{question: 'Why this company?', scenario: 'STAR situation', bestAnswer: 'STAR response'}], questionsToAsk: ['Smart Question 1'], culturePoints: ['Culture Point 1'] } }",
          template: "Modern Serif"
        })
      });

      if (response.ok) {
        const result = await response.json();
        // Fallback or mapped mock if response is cover letter
        if (result && result.suggestions) {
          setInterviewCheatSheet({
            questions: [
              {
                question: `How would you utilize your ${skills.split(',')[0] || 'Technical'} skills to solve immediate bottlenecks at ${targetCompany}?`,
                scenario: `Recruiter wants to evaluate technical competence and practical application rather than theoretical memorization.`,
                bestAnswer: `Reference your projects: "${projects.split('\n')[0] || 'My recent project'}" to demonstrate how you designed modules to run efficiently under high load parameters, matching ${targetCompany}'s scalability standards.`
              },
              {
                question: `Why did you apply to ${targetCompany} over our competitors?`,
                scenario: `Hiring managers test if you've done actual research on their engineering culture or if you are simply mass-applying.`,
                bestAnswer: `Bring up their core values such as ${COMPANY_PRESETS.find(c => c.name.toLowerCase() === targetCompany.toLowerCase())?.cultureName || 'continuous innovation'}. Discuss how their developer tooling or scaling goals align with your development philosophy.`
              },
              {
                question: `Tell me about a time you encountered a heavy database or rendering performance issue. How did you optimize it?`,
                scenario: `Assesses your debugging lifecycle, systematic thinking, and depth of tool mastery.`,
                bestAnswer: `Frame using STAR: Situation (high database lag), Task (reduce load), Action (implemented index caching and React memoization), Result (slashed rendering times by 35%).`
              }
            ],
            questionsToAsk: [
              `What are the major structural challenges the team currently faces regarding legacy code or migration bottlenecks?`,
              `How does ${targetCompany} balance rapid feature deliveries with long-term code refactoring and developer experience (DX)?`,
              `What does a successful engineer look like in this specific role over their first 90 days?`
            ],
            culturePoints: [
              `Value alignment with: ${COMPANY_PRESETS.find(c => c.name.toLowerCase() === targetCompany.toLowerCase())?.description || 'Collaborative engineering and systemic excellence.'}`,
              `Emphasize autonomous code ownership and willingness to refactor early to avoid technical debt.`,
              `Demonstrate robust cross-functional collaboration with product design and analytics teams.`
            ]
          });
        }
      }
    } catch (e) {
      console.warn("Interview cheat sheet synthesis error:", e);
    } finally {
      setIsGeneratingCheatSheet(false);
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
      createdAt: new Date().toISOString(),
      fullName,
      email,
      phone,
      skills,
      education,
      achievements,
      projects,
      experience,
      linkedIn,
      portfolio,
      github
    };

    try {
      if (currentUser && db) {
        await setDoc(doc(db, 'coverLetters', letterId), newRecord);
        await fetchSavedLetters(currentUser.uid);
      } else {
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
    setFullName(item.fullName || item.letter.signature.split('\n')[2] || '');
    setTargetCompany(item.targetCompany);
    setTargetJobRole(item.targetJobRole);
    setTone(item.tone);
    setTemplate(item.template);
    setGeneratedLetter(item.letter);
    setEditingLetter(item.letter);
    setCurrentSelectedHistoryId(item.id);
    setIsSavedInCloud(true);
    setIsHistoryOpen(false);
    
    // Restore all fields
    if (item.email) setEmail(item.email);
    if (item.phone) setPhone(item.phone);
    if (item.skills) setSkills(item.skills);
    if (item.education) setEducation(item.education);
    if (item.achievements) setAchievements(item.achievements);
    if (item.projects) setProjects(item.projects);
    if (item.experience) setExperience(item.experience);
    if (item.linkedIn) setLinkedIn(item.linkedIn);
    if (item.portfolio) setPortfolio(item.portfolio);
    if (item.github) setGithub(item.github);

    // Load Interview Cheat Sheet fallback
    handleGenerateInterviewCheatSheet(item.letter);
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
      setVariantBLetter(null);
      setInterviewCheatSheet(null);
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

  // Export PDF using premium canvas-to-pdf engine
  const handleExportPDF = async () => {
    if (!editingLetter) return;
    setIsExportingPDF(true);
    try {
      const safeName = (targetCompany || "CoverLetter").replace(/\s+/g, '_');
      await exportCanvasToPDF('cover-letter-paper-canvas', `PlacivoAI_CoverLetter_${safeName}.pdf`);
      triggerToast("PDF generated and downloaded successfully!");
    } catch (err) {
      console.error(err);
      triggerToast("Failed to compile layout PDF. Copying plain text instead.");
      handleCopyToClipboard();
    } finally {
      setIsExportingPDF(false);
    }
  };

  const triggerToast = (msg: string) => {
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

  // Compare input skills with parsed keywords to highlight match index
  const getSkillsHighlight = () => {
    if (!skills) return { matches: [], missing: [], score: 0 };
    const userList = skills.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    const targetKeywords = jobDescription 
      ? Array.from(new Set(jobDescription.toLowerCase().match(/\b(react|typescript|node|express|database|aws|gcp|jest|testing|tailwind|ci\/cd|git|scalability|rest|api|graphql|redux|analytics|system)\b/g) || []))
      : ['react', 'typescript', 'node', 'express', 'database', 'api', 'tailwind'];
    
    const matches = targetKeywords.filter(k => userList.some(u => u.includes(k) || k.includes(u)));
    const missing = targetKeywords.filter(k => !userList.some(u => u.includes(k) || k.includes(u)));
    const totalCount = targetKeywords.length || 1;
    const score = Math.round((matches.length / totalCount) * 100);

    return { matches, missing, score };
  };

  const highlights = getSkillsHighlight();

  return (
    <div id="ai-cover-letter-root" className="w-full min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8 text-slate-800 relative overflow-hidden">
      
      {/* Premium Background Particles / 3D Nodes Grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-45">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(203, 213, 225, 0.4)" strokeWidth="1" />
              <circle cx="60" cy="60" r="1.5" fill="rgba(148, 163, 184, 0.6)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
        
        {/* Animated 3D Floating Blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-violet-200/20 to-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Visual Elegant Header Block */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full border border-blue-100 flex items-center gap-1">
                <Zap className="h-3 w-3 fill-blue-600" /> GEMINI PRO ARCHITECT
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin" /> Tailored Company Alignment
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 bg-clip-text text-transparent">
              AI Cover Letter Architect
            </h1>
            <p className="mt-2 text-slate-500 max-w-2xl text-sm leading-relaxed">
              Create world-class, ATS-optimized cover letters designed to bypass screening systems and capture the attention of technical hiring managers. Directly integrated with your profile database.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleLoadStoredResume}
              disabled={loadingHistory}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 text-blue-600 ${loadingHistory ? 'animate-spin' : ''}`} />
              Sync Profile
            </button>
            
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <History className="h-4 w-4 text-indigo-400" />
              Saved Library ({savedLetters.length})
            </button>
          </div>
        </div>
      </div>

      {/* Target Company Culture Presets Hub - 3D Hover Badges */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="h-4.5 w-4.5 text-blue-600 animate-pulse" />
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ground AI with Enterprise Culture Presets</h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Fast Auto-Fill</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {COMPANY_PRESETS.map((preset) => (
              <motion.div
                key={preset.name}
                whileHover={{ scale: 1.04, y: -2 }}
                onClick={() => applyPreset(preset)}
                className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                  targetCompany.toLowerCase() === preset.name.toLowerCase()
                    ? 'bg-blue-50/50 border-blue-500 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200/70 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-sm text-slate-800">{preset.name}</span>
                  <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${preset.logoColor}`}></span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-tight">{preset.cultureName}</div>
                <p className="text-[10px] text-slate-500 line-clamp-2 leading-snug">{preset.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Control Panel Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
            
            {/* Form Nav Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-1">
              <button
                onClick={() => setActiveFormTab('details')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-extrabold text-xs rounded-xl transition-all ${
                  activeFormTab === 'details'
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }`}
              >
                <User className="h-4 w-4" />
                Profile Info
              </button>
              
              <button
                onClick={() => setActiveFormTab('resume-parse')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-extrabold text-xs rounded-xl transition-all relative ${
                  activeFormTab === 'resume-parse'
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }`}
              >
                <Upload className="h-4 w-4" />
                Parser
                {resumeText.trim() && !parseSuccess && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500"></span>
                )}
              </button>

              <button
                onClick={() => setActiveFormTab('job-desc')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-extrabold text-xs rounded-xl transition-all relative ${
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
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Naman Pandey"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Exp Level</label>
                      <select
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold transition-all outline-none"
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
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. naman@campus.edu"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Skills</label>
                      <span className="text-[9px] text-slate-400">Comma separated</span>
                    </div>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="React, TypeScript, Node.js, Express, Tailwind, NoSQL"
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Education Overview</label>
                    <textarea
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      placeholder="e.g. B.Tech in Computer Science - Graduation 2026"
                      rows={2}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Work Experience Highlights</label>
                    <textarea
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. SDE Intern at Amazon: Assisted in designing microservices; optimized DB queries by 25%."
                      rows={3}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Featured Projects</label>
                    <textarea
                      value={projects}
                      onChange={(e) => setProjects(e.target.value)}
                      placeholder="Describe your 1-2 major projects..."
                      rows={2}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        placeholder="linkedin.com/..."
                        className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-[11px] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Github</label>
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="github.com/..."
                        className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-[11px] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Portfolio</label>
                      <input
                        type="text"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="mywebsite.com"
                        className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-[11px] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Resume Parser */}
              {activeFormTab === 'resume-parse' && (
                <div className="space-y-4">
                  <div className="bg-blue-50/65 border border-blue-100 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-900 leading-relaxed">
                      <strong>AI Extraction Node:</strong> Paste raw text to map education, achievements, and technical projects into their database elements.
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Paste Resume Text</label>
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste text contents from your resume directly..."
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
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
                  >
                    {isParsingResume ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        AI Mapping Fields...
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
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Target Company *</label>
                      <input
                        type="text"
                        value={targetCompany}
                        onChange={(e) => setTargetCompany(e.target.value)}
                        placeholder="e.g. Google India"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Job Role *</label>
                      <input
                        type="text"
                        value={targetJobRole}
                        onChange={(e) => setTargetJobRole(e.target.value)}
                        placeholder="e.g. Frontend Engineer"
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Voice Tone</label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold outline-none"
                      >
                        <option value="Professional & Balanced">Professional & Balanced</option>
                        <option value="Confident & Dynamic">Confident & Dynamic</option>
                        <option value="Humble & Passionate">Humble & Passionate</option>
                        <option value="Analytical & Technical">Analytical & Technical</option>
                        <option value="Creative & Modern">Creative & Modern</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Visual Template Style</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            id: 'Modern Serif',
                            name: 'Modern Serif',
                            desc: 'Ivory linen with editorial serif typography',
                            badge: 'Editorial',
                            previewBg: 'bg-[#fbfbf8] border-emerald-800/40',
                            fontSample: 'font-serif text-emerald-800 italic',
                            sampleName: 'Aa'
                          },
                          {
                            id: 'Corporate Clean',
                            name: 'Corporate Clean',
                            desc: 'Pristine white with corporate navy borders',
                            badge: 'Executive',
                            previewBg: 'bg-white border-blue-600',
                            fontSample: 'font-sans text-blue-900 font-bold',
                            sampleName: 'Aa'
                          },
                          {
                            id: 'Aesthetic Warm',
                            name: 'Aesthetic Warm',
                            desc: 'Soft sand with warm terracotta accents',
                            badge: 'Creative',
                            previewBg: 'bg-[#fdf9f3] border-orange-300',
                            fontSample: 'font-sans text-[#7c2d12] font-semibold',
                            sampleName: 'Aa'
                          },
                          {
                            id: 'Futuristic Minimalist',
                            name: 'Futuristic Minimalist',
                            desc: 'Monospace with high-tech gridded details',
                            badge: 'Tech-Core',
                            previewBg: 'bg-[#fcfdfd] border-dashed border-slate-300',
                            fontSample: 'font-mono text-violet-600 font-bold',
                            sampleName: '01'
                          }
                        ].map((t) => (
                          <div
                            key={t.id}
                            onClick={() => {
                              setTemplate(t.id);
                              triggerToast(`Switched visual style to ${t.name}`);
                            }}
                            className={`cursor-pointer rounded-2xl border p-3 text-left transition-all relative overflow-hidden group flex flex-col justify-between h-[105px] ${
                              template === t.id
                                ? 'bg-blue-50/20 border-blue-500 shadow-md ring-1 ring-blue-500/20'
                                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">{t.badge}</span>
                              <div className={`w-6 h-6 rounded flex items-center justify-center border text-[11px] ${t.previewBg} ${t.fontSample} shadow-3xs`}>
                                {t.sampleName}
                              </div>
                            </div>
                            <div className="mt-1">
                              <div className="font-extrabold text-[11.5px] text-slate-800 leading-tight">{t.name}</div>
                              <p className="text-[9.5px] text-slate-400 font-semibold line-clamp-1 mt-0.5 leading-snug">{t.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Job Description (Highly Recommended for ATS Optimization)</label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description or primary role bullets here..."
                      rows={5}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-mono outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Custom Style Instructions</label>
                    <textarea
                      value={additionalInstructions}
                      onChange={(e) => setAdditionalInstructions(e.target.value)}
                      placeholder="e.g. Focus heavy on AWS systems. Keep it under 300 words..."
                      rows={2}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-semibold outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Reset/Action Row */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all"
                >
                  Clear Form
                </button>
                <button
                  type="button"
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  <Sparkles className="h-4.5 w-4.5 text-amber-300 animate-pulse" />
                  Generate Cover Letter
                </button>
              </div>

            </div>
          </div>

          {/* Interactive ATS Keyword Matching Gauge */}
          {skills && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-emerald-500" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">ATS Keyword Match Index</h4>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {highlights.score}% Match Rate
                </span>
              </div>

              {/* Match Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full mb-4 overflow-hidden relative">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-green-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${highlights.score || 10}%` }}
                ></div>
              </div>

              {/* Keyword chips */}
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Aligned Keywords ({highlights.matches.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {highlights.matches.map((kw, i) => (
                      <span key={i} className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-2 py-0.5 flex items-center gap-1">
                        <Check className="h-2.5 w-2.5" /> {kw}
                      </span>
                    ))}
                    {highlights.matches.length === 0 && (
                      <span className="text-[10px] text-slate-400 italic">No direct matches. Paste target job description above!</span>
                    )}
                  </div>
                </div>

                {highlights.missing.length > 0 && (
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5 font-sans">Recommended Missing Keywords ({highlights.missing.length})</span>
                    <div className="flex flex-wrap gap-1.5">
                      {highlights.missing.slice(0, 8).map((kw, i) => (
                        <span key={i} className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-md px-2 py-0.5 flex items-center gap-1">
                          <Plus className="h-2.5 w-2.5" /> {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Right Stage Panel Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Generation Loader */}
          {isGenerating && (
            <div className="bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[520px] relative overflow-hidden">
              {/* Grid backdrop */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
              <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent -z-10"></div>
              
              <div className="relative mb-8">
                {/* Dual spinning tech rings */}
                <div className="w-24 h-24 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin"></div>
                <div className="w-20 h-20 border-4 border-dashed border-slate-700 border-t-cyan-400 rounded-full animate-spin absolute top-2 left-2 animate-[spin_3s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-cyan-400 animate-[pulse_1.5s_ease-in-out_infinite]" />
                </div>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold bg-indigo-950/60 border border-indigo-900/60 px-3 py-1 rounded-full">Placivo Gen-4 AI Architecture</span>
                <h3 className="text-xl font-bold tracking-tight text-white pt-2">Synthesizing Bespoke Cover Letter</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">Cross-referencing your credentials with {targetCompany || "target company"}'s engineering culture rules and job criteria...</p>
              </div>

              {/* High-quality technical progress bar */}
              <div className="w-full max-w-md mt-8 bg-slate-900 border border-slate-800 rounded-full h-3 p-0.5 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
                  style={{ width: `${((genStep + 1) / generationSteps.length) * 100}%` }}
                ></div>
              </div>

              {/* Progress metric */}
              <div className="flex justify-between w-full max-w-md text-[10px] font-mono text-slate-500 mt-2 font-bold px-1">
                <span>PHASE {genStep + 1} OF {generationSteps.length}</span>
                <span className="text-indigo-400">{Math.round(((genStep + 1) / generationSteps.length) * 100)}% ANALYSIS COMPLETE</span>
              </div>

              {/* Tech Diagnostic Live Stream Panel */}
              <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mt-6 text-left font-mono text-[10.5px] leading-relaxed text-slate-400 shadow-lg min-h-[140px] flex flex-col justify-between">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                    <span>SYSTEM_STATUS: ACTIVE_OPTIMIZATION</span>
                  </div>
                  <div className="text-slate-500">
                    &gt; Initializing neural semantic pipeline...
                  </div>
                  {genStep >= 1 && (
                    <div className="text-slate-400">
                      &gt; Extrapolating company values for <span className="text-white">"{targetCompany}"</span>...
                    </div>
                  )}
                  {genStep >= 2 && (
                    <div className="text-slate-400">
                      &gt; Parsing experience highlights and technology stacks...
                    </div>
                  )}
                  {genStep >= 3 && (
                    <div className="text-emerald-400">
                      &gt; Synthesizing bespoke paragraphs matching tone: <span className="italic">"{tone}"</span>...
                    </div>
                  )}
                  {genStep >= 4 && (
                    <div className="text-cyan-400">
                      &gt; Running real-time ATS keyword matching index simulations...
                    </div>
                  )}
                  {genStep >= 5 && (
                    <div className="text-indigo-400 font-bold">
                      &gt; Performing final structural polishing and formatting checks...
                    </div>
                  )}
                </div>
                <div className="pt-2 border-t border-slate-800 text-[10px] font-bold text-slate-500 flex justify-between items-center mt-3">
                  <span className="animate-pulse flex items-center gap-1">
                    <span className="h-1 w-1 bg-cyan-400 rounded-full"></span>
                    ACTIVE_PROCESS: {generationSteps[genStep]}
                  </span>
                  <span>v1.4.2</span>
                </div>
              </div>
            </div>
          )}

          {/* Error display */}
          {generationError && (
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 text-center text-rose-800 space-y-3">
              <AlertCircle className="h-8 w-8 text-rose-500 mx-auto" />
              <h3 className="font-extrabold text-base">Generation Failed</h3>
              <p className="text-xs">{generationError}</p>
              <button 
                onClick={handleGenerateCoverLetter} 
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold"
              >
                Retry Generation
              </button>
            </div>
          )}

          {/* Empty display */}
          {!isGenerating && !generatedLetter && !generationError && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
              <div className="h-20 w-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-6 border border-blue-100 shadow-sm animate-pulse">
                <FileText className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Your Masterpiece Workspace</h3>
              <p className="text-slate-400 text-sm mt-1.5 max-w-md mx-auto leading-relaxed font-semibold">
                Provide your role and company on the left or select a culture preset above, click <strong>Generate Cover Letter</strong>, and watch Placivo AI synthesize a tailored cover letter.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
                <div onClick={() => { applyPreset(COMPANY_PRESETS[0]); }} className="p-4 bg-slate-50/50 hover:bg-white border border-slate-200/60 rounded-2xl cursor-pointer text-left transition-all hover:scale-[1.01] hover:shadow-md flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xs font-bold">G</span>
                  <div>
                    <div className="font-bold text-xs text-slate-700">Google Workspace</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Software Developer Role</div>
                  </div>
                </div>
                <div onClick={() => { applyPreset(COMPANY_PRESETS[1]); }} className="p-4 bg-slate-50/50 hover:bg-white border border-slate-200/60 rounded-2xl cursor-pointer text-left transition-all hover:scale-[1.01] hover:shadow-md flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-xs font-bold">S</span>
                  <div>
                    <div className="font-bold text-xs text-slate-700">Stripe Billing</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Frontend Developer Role</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Completed Cover Letter Output with 3D Tilt Card and Variant Switching */}
          {generatedLetter && editingLetter && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Document vs Outreach Mode Switcher */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 p-1 flex gap-1 shadow-sm">
                <button
                  onClick={() => {
                    setActiveMode('letter');
                    triggerToast("Displaying formatted cover letter document");
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    activeMode === 'letter'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                  }`}
                >
                  <FileText className="h-4.5 w-4.5" />
                  Cover Letter Document
                </button>
                <button
                  onClick={() => {
                    setActiveMode('outreach');
                    triggerToast("Synthesizing multi-channel outreach pitches");
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    activeMode === 'outreach'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                  }`}
                >
                  <Zap className="h-4.5 w-4.5 text-amber-300 fill-amber-300 animate-pulse" />
                  Recruiter Outreach Hub
                </button>
              </div>
              
              {/* Toolbar */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 p-3.5 flex flex-wrap gap-2 justify-between items-center shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-extrabold text-slate-700">Masterpiece Draft</span>
                  {isSavedInCloud ? (
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Saved to cloud
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-100">
                      Unsaved Changes
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyToClipboard}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
                    title="Copy plain text"
                  >
                    {isCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={handleExportDocx}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
                    title="Export DOCX"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleExportPDF}
                    disabled={isExportingPDF}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all disabled:opacity-50"
                    title="Download PDF"
                  >
                    {isExportingPDF ? <RefreshCw className="h-4 w-4 animate-spin text-blue-600" /> : <FileDown className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={() => setZoomLetter(!zoomLetter)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
                    title="Toggle Full Width"
                  >
                    {zoomLetter ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={handleSaveToHistory}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-blue-500/15 hover:scale-[1.02]"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save Letter
                  </button>
                </div>
              </div>

              {/* A/B Dynamic Variations Split Bar */}
              <div className="bg-slate-100/85 p-1 rounded-2xl flex items-center justify-between gap-2 border border-slate-200">
                <div className="flex gap-1 flex-1">
                  <button
                    onClick={() => {
                      setActiveVariant('A');
                      setEditingLetter(generatedLetter);
                      triggerToast("Switched to Variant A (Balanced & Professional)");
                    }}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                      activeVariant === 'A'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Variant A (Balanced & Professional)
                  </button>
                  <button
                    onClick={() => {
                      if (!variantBLetter) {
                        handleGenerateVariantB();
                      } else {
                        setActiveVariant('B');
                        setEditingLetter(variantBLetter);
                        triggerToast("Switched to Variant B (Assertive Hook & Disruptive)");
                      }
                    }}
                    disabled={isGeneratingVariantB}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeVariant === 'B'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {isGeneratingVariantB ? (
                      <>
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        Generating Variant B...
                      </>
                    ) : (
                      <>
                        <Flame className={`h-3 w-3 ${activeVariant === 'B' ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
                        Variant B (Assertive Bold)
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Cover Letter Textured Sheet with 3D Tilt perspective */}
              {activeMode === 'letter' ? (
                (() => {
                const isSerif = template === 'Modern Serif';
                const isClean = template === 'Corporate Clean';
                const isWarm = template === 'Aesthetic Warm';
                const isFuturistic = template === 'Futuristic Minimalist';

                // Styles configuration
                let containerBg = 'bg-white';
                let textFamily = 'font-sans';
                let titleColor = 'text-slate-900';
                let subTitleColor = 'text-indigo-600';
                let accentBarColor = 'from-blue-600 via-indigo-500 to-violet-600';
                let sectionHeaderBg = 'border-b border-slate-100 pb-2 mb-4';
                let sectionHeaderText = 'text-indigo-600 font-black';
                let cardBg = 'bg-slate-50/40 border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow transition-all';
                let bulletColor = 'text-slate-500';
                let chipBg = 'bg-slate-50 text-slate-700 border border-slate-200/80 rounded-lg';
                let contactPillBg = 'bg-slate-50/80 border border-slate-100 rounded-lg';

                if (isSerif) {
                  containerBg = 'bg-[#fbfbf8]';
                  textFamily = 'font-serif tracking-normal';
                  titleColor = 'text-slate-900 font-serif font-semibold tracking-wide capitalize';
                  subTitleColor = 'text-emerald-800 font-serif font-bold italic tracking-wider';
                  accentBarColor = 'from-emerald-800 via-teal-700 to-slate-900';
                  sectionHeaderBg = 'border-b border-emerald-800 pb-1 mb-3';
                  sectionHeaderText = 'text-emerald-800 font-serif font-bold tracking-wide italic';
                  cardBg = 'bg-transparent border-b border-slate-200/50 rounded-none shadow-none pb-3 px-0';
                  bulletColor = 'text-slate-700 font-serif leading-relaxed';
                  chipBg = 'bg-transparent text-emerald-800 border border-emerald-800/40 rounded-md font-serif italic px-2 py-0.5 text-[10px] font-bold';
                  contactPillBg = 'bg-transparent border-0 px-1 py-0.5 text-slate-700 hover:text-emerald-800';
                } else if (isClean) {
                  containerBg = 'bg-[#ffffff]';
                  textFamily = 'font-sans tracking-wide';
                  titleColor = 'text-[#0f172a] font-sans font-black tracking-tight';
                  subTitleColor = 'text-blue-700 font-extrabold tracking-wider';
                  accentBarColor = 'from-blue-700 to-slate-900';
                  sectionHeaderBg = 'border-l-4 border-blue-700 pl-3 pb-0.5 mb-3';
                  sectionHeaderText = 'text-blue-900 font-sans font-black tracking-wider uppercase';
                  cardBg = 'bg-slate-50/60 border-l-2 border-blue-500/50 rounded-r-xl rounded-l-none p-3 shadow-sm hover:shadow-md hover:border-blue-600 transition-all';
                  bulletColor = 'text-slate-600 font-sans';
                  chipBg = 'bg-blue-50/80 text-blue-900 border border-blue-200/60 rounded-md font-bold px-2 py-0.5 text-[9px]';
                  contactPillBg = 'bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 rounded-xl';
                } else if (isWarm) {
                  containerBg = 'bg-[#fdf9f3]';
                  textFamily = 'font-sans tracking-wide';
                  titleColor = 'text-[#7c2d12] font-sans font-extrabold tracking-normal';
                  subTitleColor = 'text-[#c2410c] font-bold tracking-widest uppercase';
                  accentBarColor = 'from-[#7c2d12] via-[#c2410c] to-[#f97316]';
                  sectionHeaderBg = 'border-b-2 border-[#ffedd5] pb-2 mb-3';
                  sectionHeaderText = 'text-[#7c2d12] font-semibold tracking-wider uppercase';
                  cardBg = 'bg-[#fffdfa] border border-[#ffedd5] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300';
                  bulletColor = 'text-amber-900/80 font-sans';
                  chipBg = 'bg-[#fdf4e3] text-[#7c2d12] border border-[#fed7aa] rounded-xl font-bold px-3 py-1 text-[9px]';
                  contactPillBg = 'bg-[#fffefe]/80 border border-[#fed7aa]/50 hover:bg-[#fff9f0] rounded-xl';
                } else if (isFuturistic) {
                  containerBg = 'bg-[#fcfdfd]';
                  textFamily = 'font-mono tracking-tight text-xs';
                  titleColor = 'text-slate-950 font-mono font-black uppercase tracking-widest';
                  subTitleColor = 'text-violet-600 font-mono font-black tracking-tighter';
                  accentBarColor = 'from-violet-600 via-fuchsia-500 to-cyan-500';
                  sectionHeaderBg = 'border-b border-dashed border-slate-300 pb-1.5 mb-3';
                  sectionHeaderText = 'text-violet-600 font-mono font-bold tracking-widest uppercase';
                  cardBg = 'bg-slate-50/70 border border-dashed border-slate-200 rounded-none p-3 shadow-none hover:bg-slate-100/50 transition-all';
                  bulletColor = 'text-slate-500 font-mono';
                  chipBg = 'bg-slate-950 text-emerald-400 border border-emerald-950 rounded-none font-mono text-[9px] uppercase px-1.5 py-0.5';
                  contactPillBg = 'bg-white border border-slate-200 rounded-none hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all font-mono';
                }

                return (
                  <div 
                    id="cover-letter-paper-canvas"
                    className={`rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 relative ${
                      zoomLetter ? 'max-w-none' : ''
                    } ${textFamily} ${containerBg}`}
                    style={{
                      border: '1px solid rgba(226, 232, 240, 0.9)',
                      transition: 'box-shadow 0.2s ease-out'
                    }}
                  >

                    {/* Visual Letterhead Decorator */}
                    <div className={`h-2.5 w-full bg-gradient-to-r ${accentBarColor}`}></div>

                    {/* Cover Letter & Resume Unified Visual Board */}
                    <div className="p-8 sm:p-12 space-y-8 text-sm md:text-[15px] leading-relaxed text-slate-700 relative">
                      
                      {/* Top Header Section (Inspired by Radha Gupta Resume) */}
                      <div className="border-b border-slate-100 pb-6 mb-2">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h2 className={`text-3xl sm:text-4xl ${isSerif ? 'font-serif font-normal italic capitalize text-slate-900 tracking-wide' : titleColor}`}>
                              {fullName || "Radha Gupta"}
                            </h2>
                            <div className={`text-sm mt-2 ${isSerif ? 'font-serif font-bold italic text-emerald-800' : subTitleColor}`}>
                              {targetJobRole || "Software Developer"}
                            </div>
                          </div>
                          
                          {/* Active Company Target Badge */}
                          {targetCompany && (
                            <div className={`flex items-center gap-2 px-3 py-1.5 shadow-sm ${
                              isSerif ? 'bg-transparent border border-emerald-800/30 rounded-md font-serif italic text-emerald-800' :
                              isWarm ? 'bg-[#fffdf9] border border-[#fed7aa] rounded-2xl text-[#7c2d12]' :
                              isFuturistic ? 'bg-slate-950 border border-slate-800 rounded-none text-emerald-400 font-mono text-[10px]' :
                              'bg-slate-50 border border-slate-200/60 rounded-xl text-slate-700'
                            }`}>
                              <CompanyLogoIcon name={targetCompany} logoUrl={companyLogos[targetCompany.toLowerCase()]} />
                              <span className="text-xs font-bold">{targetCompany} Candidate</span>
                            </div>
                          )}
                        </div>

                        {/* Horizontal Contact Pill Bar with Premium Logos (inspired by image) */}
                        <div className="flex flex-wrap gap-2.5 mt-5 text-[11px] font-semibold text-slate-600">
                          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 shadow-sm hover:scale-[1.01] transition-all ${contactPillBg}`}>
                            <Mail className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                            <span>{email || "naman03mgs@gmail.com"}</span>
                          </div>
                          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 shadow-sm hover:scale-[1.01] transition-all ${contactPillBg}`}>
                            <Phone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span>{phone || "+91 98765 43210"}</span>
                          </div>
                          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 shadow-sm hover:scale-[1.01] transition-all ${contactPillBg}`}>
                            <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                            <span>Bengaluru, India</span>
                          </div>
                          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 shadow-sm hover:scale-[1.01] transition-all ${contactPillBg}`}>
                            <Linkedin className="h-3.5 w-3.5 text-[#0a66c2] shrink-0" />
                            <span className="text-blue-600 truncate max-w-[150px]">{linkedIn || "linkedin.com/in/naman-pandey"}</span>
                          </div>
                          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 shadow-sm hover:scale-[1.01] transition-all ${contactPillBg}`}>
                            <Github className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                            <span className="truncate max-w-[150px]">{github || "github.com/naman-pandey"}</span>
                          </div>
                          {portfolio && (
                            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 shadow-sm hover:scale-[1.01] transition-all ${contactPillBg}`}>
                              <Globe className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                              <span className="truncate max-w-[150px]">{portfolio}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Split Screen Document Body */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left Grid: The Document Text (Cover Letter Paragraphs) */}
                        <div className="lg:col-span-8 space-y-6 border-r border-slate-100/80 pr-0 lg:pr-8">
                          <div className={`flex items-center gap-2 ${sectionHeaderBg}`}>
                            <FileText className={`h-4.5 w-4.5 ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#7c2d12]' : isFuturistic ? 'text-violet-600' : 'text-blue-600'}`} />
                            <h3 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderText}`}>
                              {isFuturistic ? '[ COVER_LETTER_STATEMENT ]' : 'Cover Letter Statement'}
                            </h3>
                          </div>

                          {/* Inline Section Rendering */}
                          {[
                            { key: 'greeting', label: 'Salutation' },
                            { key: 'opening', label: 'Opening Hook' },
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
                                      className="w-full p-3 bg-slate-50 border border-blue-400 focus:outline-none rounded-xl text-xs font-sans font-semibold"
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        onClick={saveEditSection}
                                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                                      >
                                        <Save className="h-3.5 w-3.5" /> Save Section
                                      </button>
                                      <button
                                        onClick={() => setEditSectionKey(null)}
                                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-600 text-xs font-bold rounded-lg"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <p className={`whitespace-pre-line leading-relaxed ${isSerif ? 'text-slate-800 font-serif text-[15.5px]' : isWarm ? 'text-stone-800 font-sans' : isFuturistic ? 'text-slate-900 font-mono text-[11px]' : 'text-slate-800 font-sans text-[14.5px]'}`}>
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

                        {/* Right Grid: High-fidelity Resume Highlights Panel (Inspired by image) */}
                        <div className="lg:col-span-4 space-y-6">
                          
                          {/* EXPERIENCE */}
                          <div className="space-y-3">
                            <div className={`flex items-center gap-2 ${sectionHeaderBg}`}>
                              <Briefcase className={`h-4.5 w-4.5 ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#7c2d12]' : isFuturistic ? 'text-violet-600' : 'text-blue-600'}`} />
                              <h4 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderText}`}>
                                {isFuturistic ? '[ EXPERIENCE_HIGHLIGHTS ]' : 'Experience Highlight'}
                              </h4>
                            </div>
                            
                            {parseExperienceBlocks(experience).length > 0 ? (
                              parseExperienceBlocks(experience).slice(0, 2).map((expItem: any) => (
                                <div key={expItem.id} className={`${cardBg}`}>
                                  <div className="flex items-start gap-2.5">
                                    <CompanyLogoIcon name={expItem.company} logoUrl={companyLogos[expItem.company.toLowerCase()]} />
                                    <div className="flex-1 min-w-0">
                                      <div className="font-extrabold text-xs text-slate-800 truncate">{expItem.role}</div>
                                      <div className={`text-[10px] font-bold truncate ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#c2410c]' : isFuturistic ? 'text-violet-500' : 'text-indigo-600'}`}>{expItem.company}</div>
                                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold mt-1">
                                        <span>{expItem.duration}</span>
                                        <span>{expItem.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                  {expItem.bullets.length > 0 && (
                                    <ul className="list-disc list-inside text-[10px] pl-1 pt-1 space-y-1 mt-1.5">
                                      {expItem.bullets.slice(0, 2).map((b: string, bidx: number) => (
                                        <li key={bidx} className={`leading-snug ${bulletColor}`}>{b}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))
                            ) : (
                              // Fallback styled item matching high-end Microsoft experience from image
                              <div className={`${cardBg}`}>
                                <div className="flex items-start gap-2.5">
                                  <CompanyLogoIcon name="Microsoft" />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-extrabold text-xs text-slate-800">Software Development Engineer</div>
                                    <div className={`text-[10px] font-bold truncate ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#c2410c]' : isFuturistic ? 'text-violet-500' : 'text-indigo-600'}`}>Microsoft</div>
                                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold mt-1">
                                      <span>Aug 2024 - Present</span>
                                      <span>Bengaluru, India</span>
                                    </div>
                                  </div>
                                </div>
                                <ul className="list-disc list-inside text-[10px] pl-1 pt-1 space-y-1 mt-1.5">
                                  <li className={`leading-snug ${bulletColor}`}>Working on scalable cloud microservices with .NET Core and React.</li>
                                  <li className={`leading-snug ${bulletColor}`}>Optimized database operations and REST APIs reducing latency by 35%.</li>
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* EDUCATION */}
                          <div className="space-y-3">
                            <div className={`flex items-center gap-2 ${sectionHeaderBg}`}>
                              <GraduationCap className={`h-4.5 w-4.5 ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#7c2d12]' : isFuturistic ? 'text-violet-600' : 'text-indigo-600'}`} />
                              <h4 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderText}`}>
                                {isFuturistic ? '[ ACADEMIC_CREDENTIALS ]' : 'Education'}
                              </h4>
                            </div>
                            
                            {parseEducationBlocks(education).length > 0 ? (
                              parseEducationBlocks(education).slice(0, 2).map((eduItem: any) => (
                                <div key={eduItem.id} className={`${cardBg}`}>
                                  <div className="font-extrabold text-xs text-slate-800 leading-snug">{eduItem.degree}</div>
                                  <div className="text-[10px] font-bold text-slate-500">{eduItem.institution}</div>
                                  <div className={`text-[9px] font-bold ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#c2410c]' : isFuturistic ? 'text-violet-500' : 'text-indigo-600'}`}>{eduItem.year}</div>
                                </div>
                              ))
                            ) : (
                              // Fallback styled item matching Government Engineering College from image
                              <div className={`${cardBg}`}>
                                <div className="font-extrabold text-xs text-slate-800 leading-snug">B.Tech. in Computer Science</div>
                                <div className="text-[10px] font-bold text-slate-500 font-sans">Government Engineering College</div>
                                <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold mt-1">
                                  <span className={`font-extrabold ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#c2410c]' : isFuturistic ? 'text-violet-500' : 'text-indigo-600'}`}>2018 - 2022</span>
                                  <span>CGPA: 8.2 / 10</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* MOST PROUD OF / ACHIEVEMENTS */}
                          <div className="space-y-3">
                            <div className={`flex items-center gap-2 ${sectionHeaderBg}`}>
                              <Trophy className={`h-4.5 w-4.5 ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#7c2d12]' : isFuturistic ? 'text-violet-600' : 'text-purple-600'}`} />
                              <h4 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderText}`}>
                                {isFuturistic ? '[ PROUD_ACHIEVEMENTS ]' : 'Most Proud Of'}
                              </h4>
                            </div>
                            
                            <div className="space-y-2">
                              {parseAchievements(achievements).length > 0 ? (
                                parseAchievements(achievements).slice(0, 4).map((ach, idx) => (
                                  <div key={idx} className={`${cardBg} flex gap-2 items-start`}>
                                    <Award className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                                    <span className={`text-[10px] font-semibold leading-normal ${bulletColor}`}>{ach}</span>
                                  </div>
                                ))
                              ) : (
                                // Fallback styled items matching Radha's achievements (ranks, smart india hackathon, etc)
                                <>
                                  <div className={`${cardBg} flex gap-2.5 items-start`}>
                                    <Trophy className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <span className="text-[10px] font-bold text-slate-800 block">DSA Mentor at BossCoder Academy</span>
                                      <span className={`text-[9px] leading-snug block ${bulletColor}`}>Successfully mentored 400+ students in advanced algorithms.</span>
                                    </div>
                                  </div>
                                  <div className={`${cardBg} flex gap-2.5 items-start`}>
                                    <Award className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <span className="text-[10px] font-bold text-slate-800 block">Participated in SIH Finals</span>
                                      <span className={`text-[9px] leading-snug block ${bulletColor}`}>Selected for final round of Smart India Hackathon.</span>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* PROJECTS */}
                          <div className="space-y-3">
                            <div className={`flex items-center gap-2 ${sectionHeaderBg}`}>
                              <Terminal className={`h-4.5 w-4.5 ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#7c2d12]' : isFuturistic ? 'text-violet-600' : 'text-emerald-600'}`} />
                              <h4 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderText}`}>
                                {isFuturistic ? '[ CODE_PROJECTS ]' : 'Projects'}
                              </h4>
                            </div>
                            
                            {parseProjectBlocks(projects).length > 0 ? (
                              parseProjectBlocks(projects).slice(0, 2).map((projItem: any) => (
                                <div key={projItem.id} className={`${cardBg}`}>
                                  <div className="font-extrabold text-xs text-slate-800 leading-snug">{projItem.name}</div>
                                  <p className={`text-[10px] line-clamp-2 leading-relaxed ${bulletColor}`}>{projItem.description}</p>
                                  {projItem.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-1.5">
                                      {projItem.techStack.map((tech: string, tidx: number) => (
                                        <span key={tidx} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border border-slate-200/50 ${chipBg}`}>
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              // Fallback styled item matching Radha's actual project
                              <div className={`${cardBg}`}>
                                <div className="font-extrabold text-xs text-slate-800 leading-snug">AI-Powered Document Intelligence Platform</div>
                                <p className={`text-[10px] leading-relaxed ${bulletColor}`}>Built an AI document ingestion system extracting structured data from custom invoices using NLP.</p>
                                <div className="flex flex-wrap gap-1 pt-1.5">
                                  {["React.js", "Node.js", "Gemini API", "Tailwind"].map((tech, tidx) => (
                                    <span key={tidx} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border border-slate-200/50 ${chipBg}`}>
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* SKILLS & STRENGTHS */}
                          <div className="space-y-3">
                            <div className={`flex items-center gap-2 ${sectionHeaderBg}`}>
                              <Layers className={`h-4.5 w-4.5 ${isSerif ? 'text-emerald-800' : isWarm ? 'text-[#7c2d12]' : isFuturistic ? 'text-violet-600' : 'text-orange-500'}`} />
                              <h4 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderText}`}>
                                {isFuturistic ? '[ SKILLS_INVENTORY ]' : 'Skills & Strengths'}
                              </h4>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {skills ? (
                                skills.split(',').map(s => s.trim()).filter(Boolean).map((skill, i) => (
                                  <span 
                                    key={i} 
                                    className={`text-[10px] px-2.5 py-1 hover:bg-slate-100 transition-all shadow-sm ${chipBg}`}
                                  >
                                    {skill}
                                  </span>
                                ))
                              ) : (
                                // Beautiful fallback skill list matching image style
                                ["Java", "C++", "Python", "React", "TypeScript", "Node.js", "Express", "AWS", "Git", "System Design", "SQL"].map((skill, i) => (
                                  <span 
                                    key={i} 
                                    className={`text-[10px] px-2.5 py-1 hover:bg-slate-100 transition-all shadow-sm ${chipBg}`}
                                  >
                                    {skill}
                                  </span>
                                ))
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-100 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-200">
                      <Zap className="h-5 w-5 fill-indigo-500" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 uppercase tracking-wide">Placivo Recruiter Outreach Kit</h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed font-semibold">
                        Generating dynamic multi-channel micro-pitches based on your cover letter details. Tap any card to instantly copy optimized outreach statements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Outreach Card 1: LinkedIn Connection Note */}
                  {(() => {
                    const text = `Hi, I noticed you scale ${targetCompany}'s engineering. As a ${targetJobRole} with expertise in ${skills?.split(',')[0] || 'software development'} and systems, I'd love to connect & share my credentials for your active open roles. Thank you!`;
                    const isCopied = outreachCopiedKey === 'linkedin-note';
                    
                    return (
                      <motion.div 
                        whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)" }}
                        className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] bg-[#0a66c2]/10 text-[#0a66c2] px-2.5 py-1 rounded-full font-extrabold tracking-wider uppercase border border-[#0a66c2]/10">LinkedIn Note</span>
                            <span className="text-[10px] text-slate-400 font-bold">290 Chars Max</span>
                          </div>
                          <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Connection Invitation</h5>
                          <p className="text-slate-600 text-xs font-mono bg-slate-50/50 p-3 rounded-2xl border border-slate-100 leading-relaxed min-h-[120px] select-all">
                            {text}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(text);
                            setOutreachCopiedKey('linkedin-note');
                            triggerToast("Copied LinkedIn Connection Note!");
                            setTimeout(() => setOutreachCopiedKey(null), 2000);
                          }}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs mt-4 flex items-center justify-center gap-1.5 transition-all ${
                            isCopied 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {isCopied ? "Copied!" : "Copy Note"}
                        </button>
                      </motion.div>
                    );
                  })()}

                  {/* Outreach Card 2: Cold Email Pitch */}
                  {(() => {
                    const subject = `Scaling ${targetJobRole} roles at ${targetCompany} - Candidate Pitch`;
                    const body = `Dear Hiring Team,\n\nI am writing to express my strong interest in the ${targetJobRole} position at ${targetCompany}. With a background in building optimized applications and expertise in ${skills?.split(',').slice(0, 3).join(', ')}, I am confident in my ability to deliver immediate value to your scale operations.\n\nAt my previous experience, I worked on scaling backend microservices and modern frontend component design. I admire ${targetCompany}'s focus on ${COMPANY_PRESETS.find(c => c.name.toLowerCase() === targetCompany.toLowerCase())?.cultureName || 'continuous innovation'} and would welcome the opportunity to discuss how my skillset maps to your goals.\n\nThank you for your time,\n\n${fullName}`;
                    const fullEmailText = `Subject: ${subject}\n\n${body}`;
                    const isCopied = outreachCopiedKey === 'cold-email';

                    return (
                      <motion.div 
                        whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)" }}
                        className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] bg-red-50 text-red-700 px-2.5 py-1 rounded-full font-extrabold tracking-wider uppercase border border-red-100">Cold Email</span>
                            <span className="text-[10px] text-slate-400 font-bold">~120 Words</span>
                          </div>
                          <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Formal Candidate Pitch</h5>
                          <div className="text-slate-600 text-xs font-sans bg-slate-50/50 p-3 rounded-2xl border border-slate-100 leading-relaxed min-h-[120px] select-all space-y-2 overflow-y-auto max-h-[150px]">
                            <p className="font-bold border-b border-slate-200 pb-1 text-[11px]">Subject: {subject}</p>
                            <p className="whitespace-pre-line text-[11px]">{body}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(fullEmailText);
                            setOutreachCopiedKey('cold-email');
                            triggerToast("Copied Cold Email Draft!");
                            setTimeout(() => setOutreachCopiedKey(null), 2000);
                          }}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs mt-4 flex items-center justify-center gap-1.5 transition-all ${
                            isCopied 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {isCopied ? "Copied!" : "Copy Email Draft"}
                        </button>
                      </motion.div>
                    );
                  })()}

                  {/* Outreach Card 3: LinkedIn InMail/Follow-up */}
                  {(() => {
                    const text = `Hi, I recently applied for the ${targetJobRole} position at ${targetCompany}. Given my background in ${skills?.split(',')[0] || 'engineering'}, I'm incredibly excited about your team's mission. I wanted to briefly confirm that my application was successfully received, and would love to share a 2-minute overview of my fit if you have availability. Thank you for your leadership!`;
                    const isCopied = outreachCopiedKey === 'linkedin-follow';

                    return (
                      <motion.div 
                        whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)" }}
                        className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-extrabold tracking-wider uppercase border border-indigo-100">InMail Follow-up</span>
                            <span className="text-[10px] text-slate-400 font-bold">Conversational</span>
                          </div>
                          <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Direct Message Warm Pitch</h5>
                          <p className="text-slate-600 text-xs font-sans bg-slate-50/50 p-3 rounded-2xl border border-slate-100 leading-relaxed min-h-[120px] select-all">
                            {text}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(text);
                            setOutreachCopiedKey('linkedin-follow');
                            triggerToast("Copied InMail Follow-up!");
                            setTimeout(() => setOutreachCopiedKey(null), 2000);
                          }}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs mt-4 flex items-center justify-center gap-1.5 transition-all ${
                            isCopied 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {isCopied ? "Copied!" : "Copy InMail"}
                        </button>
                      </motion.div>
                    );
                  })()}
                </div>
              </div>
            )}

              {/* AI Scores Gauge Dashboard Panel */}
              <div 
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl transition-all"
              >
                <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                    <Sparkles className="h-4.5 w-4.5 text-blue-500 animate-pulse" />
                    Placivo AI Analytics Scorecard
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Real-Time Simulation</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {[
                    { label: 'ATS Match', val: editingLetter.scores.atsScore, color: 'text-emerald-600', bg: 'bg-emerald-50/75', border: 'border-emerald-100' },
                    { label: 'Readability', val: editingLetter.scores.readabilityScore, color: 'text-blue-600', bg: 'bg-blue-50/75', border: 'border-blue-100' },
                    { label: 'Impact', val: editingLetter.scores.impactScore, color: 'text-indigo-600', bg: 'bg-indigo-50/75', border: 'border-indigo-100' },
                    { label: 'Confidence', val: editingLetter.scores.confidenceScore, color: 'text-violet-600', bg: 'bg-violet-50/75', border: 'border-violet-100' },
                    { label: 'Recruiter Score', val: editingLetter.scores.recruiterScore, color: 'text-purple-600', bg: 'bg-purple-50/75', border: 'border-purple-100' },
                    { label: 'Professionalism', val: editingLetter.scores.professionalismScore, color: 'text-teal-600', bg: 'bg-teal-50/75', border: 'border-teal-100' },
                    { label: 'Grammar Grade', val: editingLetter.scores.grammarScore, color: 'text-pink-600', bg: 'bg-pink-50/75', border: 'border-pink-100' }
                  ].map((score) => (
                    <div key={score.label} className="text-center p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                      <span className="text-[9px] text-slate-400 font-extrabold block mb-2 leading-tight uppercase tracking-wider">{score.label}</span>
                      <div className={`w-12 h-12 rounded-full ${score.bg} mx-auto flex items-center justify-center font-black text-xs ${score.color} mb-1 border ${score.border} shadow-sm`}>
                        {score.val}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Recruiter Suggestions list */}
                {editingLetter.suggestions && editingLetter.suggestions.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Actionable Pro-Tips & Suggestions</span>
                    <ul className="space-y-2">
                      {editingLetter.suggestions.map((sug, i) => (
                        <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed font-semibold">
                          <CheckSquare className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3D Hiring Team Review Simulation */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Hiring Team Persona Reviews</span>
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded border border-indigo-100">Simulated Recruiter Sentiment</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Persona 1: Tech Lead */}
                    <div className="p-4 bg-slate-50/65 border border-slate-200/60 rounded-2xl space-y-2.5 transition-all hover:scale-[1.01] hover:bg-white hover:shadow-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center border border-blue-200 shadow-2xs">
                            EM
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-800 leading-none">Marcus</div>
                            <div className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Engineering Manager</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-indigo-600">8.8/10</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                        "Your metrics under experience items look solid. The use of quantitative values makes this very strong. I'd sign off on this technical review."
                      </p>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50/60 px-2 py-0.5 rounded border border-emerald-100 w-max">
                        <Check className="h-3 w-3" /> Architecture Aligned
                      </div>
                    </div>

                    {/* Persona 2: HR Specialist */}
                    <div className="p-4 bg-slate-50/65 border border-slate-200/60 rounded-2xl space-y-2.5 transition-all hover:scale-[1.01] hover:bg-white hover:shadow-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center border border-purple-200 shadow-2xs">
                            TA
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-800 leading-none">Sarah</div>
                            <div className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Talent Acquisition</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-purple-600">9.2/10</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                        "The salutation, formatting structure, and custom tone directives match our specific pipeline criteria. High layout eligibility."
                      </p>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50/60 px-2 py-0.5 rounded border border-emerald-100 w-max">
                        <Check className="h-3 w-3" /> Layout Approved
                      </div>
                    </div>

                    {/* Persona 3: Culture Specialist */}
                    <div className="p-4 bg-slate-50/65 border border-slate-200/60 rounded-2xl space-y-2.5 transition-all hover:scale-[1.01] hover:bg-white hover:shadow-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-amber-100 text-amber-700 font-black text-xs flex items-center justify-center border border-amber-200 shadow-2xs">
                            CF
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-800 leading-none">Priya</div>
                            <div className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Culture & Fit Lead</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-amber-600">8.5/10</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                        "Addresses our cultural principles directly. Integrates core motivations with technical descriptions smoothly."
                      </p>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50/60 px-2 py-0.5 rounded border border-emerald-100 w-max">
                        <Check className="h-3 w-3" /> Cultural Alignment
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic AI Interview Prep Companion Cheat Sheet */}
              {isGeneratingCheatSheet && (
                <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[250px]">
                  <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin mb-3" />
                  <p className="text-xs font-bold text-slate-600">Simulating Recruiter Panel Questions & Answers...</p>
                </div>
              )}

              {interviewCheatSheet && (
                <div 
                  className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-6 shadow-2xl relative overflow-hidden transition-all"
                >
                  {/* Decorative glowing gradient inside the cheat sheet card */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex justify-between items-center mb-5 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4.5 w-4.5 text-amber-400 fill-amber-400 animate-pulse" />
                      <h3 className="text-xs font-black tracking-widest uppercase text-slate-200">
                        Live AI Interview Preparation Cheat Sheet
                      </h3>
                    </div>
                    <span className="text-[9px] bg-slate-800 text-indigo-300 font-extrabold px-2.5 py-0.5 rounded border border-slate-700">
                      Companion Guide
                    </span>
                  </div>

                  <div className="space-y-6">
                    {/* Predictable Recruiter Questions */}
                    <div>
                      <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-widest block mb-3">Anticipated Interview Scenarios & Qs</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {interviewCheatSheet.questions.map((q, i) => (
                          <div key={i} className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-black text-amber-400 shrink-0">Q{i+1}:</span>
                              <h5 className="text-xs font-bold text-slate-100">{q.question}</h5>
                            </div>
                            <p className="text-[10px] text-slate-400 italic font-semibold">{q.scenario}</p>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{q.bestAnswer}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
                      {/* Culture alignment tips */}
                      <div>
                        <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-widest block mb-2">Target Culture Fit Drivers</span>
                        <ul className="space-y-1.5">
                          {interviewCheatSheet.culturePoints.map((p, i) => (
                            <li key={i} className="flex gap-2 text-xs text-slate-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5"></span>
                              <span className="font-semibold">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Strategic questions to ask back */}
                      <div>
                        <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-widest block mb-2">Smart Questions to Ask Them</span>
                        <ul className="space-y-1.5">
                          {interviewCheatSheet.questionsToAsk.map((q, i) => (
                            <li key={i} className="flex gap-2 text-xs text-slate-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                              <span className="font-semibold">{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
                    <h2 className="text-base font-extrabold text-slate-900">Saved Cover Letters</h2>
                  </div>
                  <button 
                    onClick={() => setIsHistoryOpen(false)} 
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all text-xs font-bold"
                  >
                    Close
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {loadingHistory ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
                      <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                      <span className="text-xs font-bold">Fetching past cover letters...</span>
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
                          <h4 className="font-extrabold text-xs text-slate-800 leading-snug">
                            {item.targetJobRole} at {item.targetCompany}
                          </h4>
                          <div className="flex gap-2 text-[10px] text-slate-400 font-semibold">
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
                  <div className="text-xs text-slate-400 text-center leading-relaxed font-semibold">
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
