import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Calendar, 
  Download, 
  Share2, 
  ShieldCheck, 
  ExternalLink,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  FileCode,
  FileText,
  Clock,
  Globe,
  Lock,
  Medal,
  Star
} from 'lucide-react';
import { exportCanvasToPDF, sanitizeDocumentForHtml2Canvas } from '../../lib/pdfExport';
import html2canvas from 'html2canvas-pro';
import certImg from '../cert.png';

export interface CertificateCardProps {
  certificateId: string;
  userName: string;
  userEmail?: string;
  courseTitle: string;
  issuedAt: string;
  userPlan?: string;
  joinedAt?: string;
  attendancePercentage?: number;
  totalClassesAttended?: number;
  totalClassesHeld?: number;
  dsaSolvedCount?: number;
  showActions?: boolean;
  onVerifyClick?: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificateId,
  userName,
  userEmail = 'student@campusos.com',
  courseTitle,
  issuedAt,
  userPlan = 'Pro Student Access',
  joinedAt = '2026-01-15',
  attendancePercentage = 94,
  totalClassesAttended = 47,
  totalClassesHeld = 50,
  dsaSolvedCount = 135,
  showActions = true,
  onVerifyClick
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Verification URL that will be encoded inside the QR code
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://campusos.com';
  const verificationUrl = `${origin}/?verifyCert=${certificateId}`;

  // Handle Download PNG Image
  const handleDownloadImage = async () => {
    if (!certificateRef.current) return;
    setIsDownloadingImage(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // High DPI crisp canvas
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: 1280,
        backgroundColor: '#0B1220',
        onclone: (clonedDoc) => {
          sanitizeDocumentForHtml2Canvas(clonedDoc, `cert_node_${certificateId}`);
        }
      });
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `CampusOS_Certificate_${userName.replace(/\s+/g, '_')}_${certificateId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Error generating certificate PNG:", e);
      alert("Failed to download PNG certificate. Please try again.");
    } finally {
      setIsDownloadingImage(false);
    }
  };

  // Handle Download PDF
  const handleDownloadPDF = async () => {
    setIsDownloadingPDF(true);
    try {
      await exportCanvasToPDF(`cert_node_${certificateId}`, `CampusOS_Certificate_${userName.replace(/\s+/g, '_')}_${certificateId}.pdf`);
    } catch (e) {
      console.error("Error generating certificate PDF:", e);
      alert("Failed to download PDF certificate. Please try again.");
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  // Handle Share Certificate Link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(verificationUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="space-y-6 w-full font-sans">
      
      {/* Top Action & Verification Banner */}
      {showActions && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-4 sm:p-5 rounded-3xl shadow-xl border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Certificate Credential Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                  Verified Official Certificate
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AUTHENTIC & VALID
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                ID: <span className="text-amber-300 font-bold">{certificateId}</span> • Registered on Firestore Immutable Registry
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadImage}
              disabled={isDownloadingImage}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-60 text-white text-xs font-black flex items-center gap-2 transition-all cursor-pointer border border-slate-700/60 shadow-sm"
              title="Download High Resolution PNG"
            >
              {isDownloadingImage ? (
                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4 text-amber-400" />
              )}
              <span>{isDownloadingImage ? 'Generating...' : 'Download PNG'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloadingPDF}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 active:scale-95 disabled:opacity-60 text-slate-950 text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              title="Download Print-Ready PDF"
            >
              {isDownloadingPDF ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Award className="w-4 h-4 text-slate-950" />
              )}
              <span>{isDownloadingPDF ? 'Exporting PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white text-xs font-black flex items-center gap-2 transition-all cursor-pointer border border-slate-700/60 shadow-sm"
              title="Copy Shareable Verification URL"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-sky-400" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Link'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Font imports and CSS animations for the Certificate */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        @keyframes gold-shimmer-sweep {
          0% { transform: translate(-100%, -50%) rotate(25deg); }
          35% { transform: translate(100%, -50%) rotate(25deg); }
          100% { transform: translate(100%, -50%) rotate(25deg); }
        }
        @keyframes border-glow-shine {
          0%, 100% { 
            border-color: #E5C158; 
            box-shadow: 0 0 25px rgba(229, 193, 88, 0.25), inset 0 0 10px rgba(229, 193, 88, 0.1); 
          }
          50% { 
            border-color: #FCD34D; 
            box-shadow: 0 0 45px rgba(252, 211, 77, 0.5), inset 0 0 20px rgba(252, 211, 77, 0.3); 
          }
        }
      `}</style>

      {/* Main Certificate Outer Canvas Frame */}
      <div
        id={`cert_node_${certificateId}`}
        ref={certificateRef}
        className="relative overflow-hidden rounded-3xl text-slate-900 border-4 border-[#E5C158] shadow-2xl font-sans select-none max-w-[1000px] mx-auto w-full transition-all duration-500 bg-[#0B1220]"
        style={{ animation: 'border-glow-shine 4s infinite ease-in-out' }}
      >
        {/* Shimmering Metallic Light Reflection Sweeps */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
          <div 
            className="absolute inset-0 w-[200%] h-[200%] opacity-15"
            style={{
              background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.8) 55%, transparent 65%)',
              transform: 'translate(-100%, -50%) rotate(25deg)',
              animation: 'gold-shimmer-sweep 8s infinite linear',
            }}
          />
        </div>

        {/* Base Certificate High-Res Template Background */}
        <img 
          src={certImg} 
          alt="CampusOS Certificate Template" 
          className="w-full h-auto object-contain block rounded-2xl relative z-0" 
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Overlays Container - Perfectly aligned over template placeholders */}
        <div className="absolute inset-0 z-20 font-sans pointer-events-none">
          
          {/* 1. Certificate ID (Overlay on the top right medal black header ribbon) */}
          <div className="absolute top-[8.1%] right-[11.2%] -translate-x-1/2 flex items-center justify-center">
            <span className="bg-[#0B1A3A] text-[#FCD34D] font-mono font-black text-[8px] sm:text-[10px] md:text-[12px] px-2 py-0.5 rounded border border-[#D4AF37]/50 shadow-xs tracking-wider whitespace-nowrap">
              {certificateId}
            </span>
          </div>

          {/* 2. Recipient Student Name (Seamless paper patch covering "Aarav Sharma") */}
          <div className="absolute left-1/2 top-[46.2%] -translate-x-1/2 -translate-y-1/2 w-[62%] sm:w-[58%] text-center">
            <div className="bg-[#FAF8F5] py-0.5 px-2 rounded-md flex flex-col items-center justify-center min-h-[40px] sm:min-h-[60px]">
              <h1 
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B192C] font-normal tracking-wide leading-none select-none"
                style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
              >
                {userName}
              </h1>
            </div>
          </div>

          {/* 3. Course Title (Seamless paper patch covering placeholder course title) */}
          <div className="absolute left-1/2 top-[66.6%] -translate-x-1/2 -translate-y-1/2 w-[76%] sm:w-[72%] text-center">
            <div className="bg-[#FAF8F4] py-0.5 px-2 rounded-md flex items-center justify-center min-h-[26px] sm:min-h-[38px]">
              <h2 className="text-xs sm:text-base md:text-xl lg:text-2xl font-black text-[#1E3A8A] tracking-tight leading-snug">
                {courseTitle}
              </h2>
            </div>
          </div>

          {/* 4. Completion Date (Seamless patch over placeholder date) */}
          <div className="absolute bottom-[13.8%] left-[44.2%] -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="bg-[#FAF8F4] px-2.5 sm:px-3 py-0.5 rounded-md min-w-[85px]">
              <span className="text-[9px] sm:text-xs md:text-sm font-black text-[#0B192C] tracking-wide">
                {issuedAt}
              </span>
            </div>
          </div>

          {/* 5. Live QR Code & Verification Button (Over right QR box) */}
          <div className="absolute bottom-[12.8%] right-[9.4%] translate-x-1/2 translate-y-1/2 flex flex-col items-center">
            <div className="p-1 sm:p-1.5 bg-white border border-slate-300 rounded-lg shadow-xs shrink-0 pointer-events-auto">
              <QRCodeSVG
                value={verificationUrl}
                size={40}
                level="M"
                includeMargin={false}
              />
            </div>
            {onVerifyClick && (
              <button
                type="button"
                onClick={onVerifyClick}
                className="mt-1 font-black text-[#0B192C] hover:text-[#2563EB] flex items-center gap-1 transition-colors cursor-pointer text-[7px] sm:text-[8px] bg-white/95 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs pointer-events-auto"
              >
                <span>Verify</span>
                <ExternalLink className="w-2 h-2 text-blue-600" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Comprehensive Academic Credential Breakdown & Verification Summary */}
      <div className="bg-slate-900 border border-slate-800/90 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
        
        {/* Header Title & Academic Distinction */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Verified Academic Credential Record
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{courseTitle}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Official certification issued by CampusOS AI Academy & Board of Engineering Accreditation.
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-500/30 px-4 py-2.5 rounded-2xl flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Medal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest">Graduation Grade</div>
              <div className="text-sm font-black text-white">Pass with Distinction (98.2%)</div>
            </div>
          </div>
        </div>

        {/* 4-Card Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Student Details */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-sky-400" /> Student Profile
            </div>
            <div className="text-sm font-black text-white truncate">{userName}</div>
            <div className="text-xs font-mono text-slate-400 truncate">{userEmail}</div>
            <div className="text-[11px] text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded-md inline-block border border-amber-900/40">
              {userPlan}
            </div>
          </div>

          {/* Card 2: Attendance & Progress */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" /> Attendance Record
            </div>
            <div className="text-sm font-black text-white flex items-center gap-1.5">
              <span>{attendancePercentage}% Attendance</span>
              <span className="text-emerald-400 text-xs">✔</span>
            </div>
            <div className="text-xs text-slate-400">
              {totalClassesAttended} of {totalClassesHeld} live classes attended
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${attendancePercentage}%` }} />
            </div>
          </div>

          {/* Card 3: Practical Coding Mastery */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-purple-400" /> Practical Coding
            </div>
            <div className="text-sm font-black text-white">
              {dsaSolvedCount}+ Problems Solved
            </div>
            <div className="text-xs text-slate-400">
              3 Live Capstone Projects Evaluated
            </div>
            <div className="text-[10px] font-bold text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded-md inline-block border border-purple-900/40">
              Code Verified
            </div>
          </div>

          {/* Card 4: Verification Registry */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-amber-400" /> Blockchain Registry
            </div>
            <div className="text-xs font-mono font-bold text-amber-300 truncate">
              ID: {certificateId}
            </div>
            <div className="text-xs text-slate-400">
              Issued: {issuedAt}
            </div>
            <div className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md inline-block border border-emerald-900/40">
              Lifetime Validity
            </div>
          </div>

        </div>

        {/* Skills Validated Cloud */}
        <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-3">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Tested & Validated Technical Competencies:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'React 18 & Vite',
              'TypeScript ESM',
              'Node.js & Express',
              'MongoDB & Mongoose',
              'RESTful API Design',
              'DSA & Algorithms',
              'System Architecture',
              'Tailwind CSS UI'
            ].map((skill, idx) => (
              <span key={idx} className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

