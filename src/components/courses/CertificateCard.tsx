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

// Corner Gold Filigree Ornament SVG Component
const CornerFiligreeSVG: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const getTransforms = () => {
    switch (position) {
      case 'top-left': return '';
      case 'top-right': return 'scaleX(-1)';
      case 'bottom-left': return 'scaleY(-1)';
      case 'bottom-right': return 'scale(-1, -1)';
    }
  };

  return (
    <div 
      className="absolute w-12 h-12 sm:w-20 sm:h-20 pointer-events-none opacity-80 text-[#D4AF37]"
      style={{
        top: position.includes('top') ? '8px' : 'auto',
        bottom: position.includes('bottom') ? '8px' : 'auto',
        left: position.includes('left') ? '8px' : 'auto',
        right: position.includes('right') ? '8px' : 'auto',
        transform: getTransforms()
      }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="goldCornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A640F" />
          </linearGradient>
        </defs>
        <path d="M 0 0 L 100 0 L 100 8 L 8 8 L 8 100 L 0 100 Z" fill="url(#goldCornerGrad)" />
        <path d="M 16 16 L 80 16 L 80 20 L 20 20 L 20 80 L 16 80 Z" fill="url(#goldCornerGrad)" opacity="0.7" />
        <path d="M 28 28 C 45 28 55 38 55 55 C 55 42 42 28 28 28 Z" fill="url(#goldCornerGrad)" />
        <circle cx="24" cy="24" r="3" fill="url(#goldCornerGrad)" />
      </svg>
    </div>
  );
};

// 3D Metallic Gold Medal Seal with Royal Blue Ribbon Tails
const GoldRibbonSealSVG: React.FC = () => (
  <div className="relative flex flex-col items-center shrink-0">
    {/* Scalloped Gold Medal */}
    <div className="relative w-14 h-14 sm:w-20 sm:h-20 shrink-0 drop-shadow-xl z-10">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <defs>
          <radialGradient id="goldMedalGrad3D" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF5C0" />
            <stop offset="30%" stopColor="#F3CA52" />
            <stop offset="70%" stopColor="#C2921D" />
            <stop offset="100%" stopColor="#785305" />
          </radialGradient>
          <linearGradient id="goldBorder3D" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFEAA5" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#5E4300" />
          </linearGradient>
        </defs>

        <path
          d="M 60 5 L 64 12 L 72 7 L 74 15 L 83 12 L 83 20 L 92 20 L 90 28 L 98 31 L 93 38 L 100 44 L 93 50 L 98 57 L 90 60 L 92 68 L 83 68 L 83 76 L 74 73 L 72 81 L 64 76 L 60 83 L 56 76 L 48 81 L 46 73 L 37 76 L 37 68 L 28 68 L 30 60 L 22 57 L 27 50 L 20 44 L 27 38 L 22 31 L 30 28 L 28 20 L 37 20 L 37 12 L 46 15 L 48 7 L 56 12 Z"
          fill="url(#goldMedalGrad3D)"
          stroke="url(#goldBorder3D)"
          strokeWidth="2"
        />

        <circle cx="60" cy="44" r="32" fill="#0B1A3A" stroke="url(#goldBorder3D)" strokeWidth="2.5" />

        <circle cx="60" cy="40" r="14" fill="url(#goldMedalGrad3D)" />
        <circle cx="60" cy="40" r="11" fill="#0B1A3A" />
        <text x="60" y="44" fill="#F3CA52" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
          C•OS
        </text>

        <text x="46" y="65" fill="#F3CA52" fontSize="7">★</text>
        <text x="60" y="66" fill="#F3CA52" fontSize="8">★</text>
        <text x="73" y="65" fill="#F3CA52" fontSize="7">★</text>
      </svg>
    </div>

    {/* Royal Blue V-Cut Ribbon Tails hanging underneath */}
    <div className="flex gap-2 -mt-3 z-0">
      <div 
        className="w-4 h-8 bg-gradient-to-b from-[#1E3A8A] via-[#10244A] to-[#0A1835] border-x border-b border-[#D4AF37] transform -rotate-12 shadow-md"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
      />
      <div 
        className="w-4 h-8 bg-gradient-to-b from-[#1E3A8A] via-[#10244A] to-[#0A1835] border-x border-b border-[#D4AF37] transform rotate-12 shadow-md"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
      />
    </div>
  </div>
);

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

      {/* Fonts for Certificate */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,700&family=Cinzel:wght@600;700;900&display=swap');

        @keyframes border-glow-shine {
          0%, 100% { 
            border-color: #E5C158; 
            box-shadow: 0 0 25px rgba(229, 193, 88, 0.25), inset 0 0 10px rgba(229, 193, 88, 0.1); 
          }
          50% { 
            border-color: #FCD34D; 
            box-shadow: 0 0 45px rgba(252, 211, 77, 0.4), inset 0 0 20px rgba(252, 211, 77, 0.2); 
          }
        }
      `}</style>

      {/* Main Vector Certificate Canvas Frame */}
      <div
        id={`cert_node_${certificateId}`}
        ref={certificateRef}
        className="relative overflow-hidden rounded-3xl text-slate-900 border-4 border-[#D4AF37] shadow-2xl font-sans select-none max-w-[1000px] mx-auto w-full transition-all duration-500 bg-[#FAF8F3] p-4 sm:p-8"
        style={{ animation: 'border-glow-shine 4s infinite ease-in-out' }}
      >
        {/* Fine Guilloche Pattern Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `radial-gradient(#D4AF37 0.75px, transparent 0.75px), radial-gradient(#1E3A8A 0.75px, #FAF8F3 0.75px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px'
        }} />

        {/* Outer Double Gold Border Frame */}
        <div className="relative inset-0 border-2 border-[#D4AF37] rounded-2xl p-4 sm:p-8 bg-white/95 backdrop-blur-xs shadow-inner">
          <div className="border border-[#C5A059]/40 rounded-xl p-4 sm:p-8 relative space-y-6 sm:space-y-8">
            
            {/* 4 Corner Ornaments */}
            <CornerFiligreeSVG position="top-left" />
            <CornerFiligreeSVG position="top-right" />
            <CornerFiligreeSVG position="bottom-left" />
            <CornerFiligreeSVG position="bottom-right" />

            {/* TOP BAR: CampusOS Academy Header & Certificate ID Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-amber-200/60 pb-4 pt-2 px-2">
              
              {/* CampusOS Academy Brand Emblem */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#0B1A3A] to-[#1E3A8A] text-amber-300 flex items-center justify-center font-black shadow-md border border-[#D4AF37]">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#FCD34D]" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-black text-[#0B1A3A] tracking-wider uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                    Campus OS <span className="text-[#D4AF37]">AI</span>
                  </div>
                  <div className="text-[9px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Learn • Prepare • Succeed
                  </div>
                </div>
              </div>

              {/* Certificate ID Pill */}
              <div className="bg-[#0B1A3A] text-white px-3 py-1.5 rounded-xl border border-[#D4AF37] shadow-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FCD34D]" />
                <div className="text-right">
                  <div className="text-[8px] uppercase tracking-widest text-amber-300 font-extrabold">Certificate ID</div>
                  <div className="text-xs sm:text-sm font-mono font-black text-white">{certificateId}</div>
                </div>
              </div>

            </div>

            {/* MAIN DIPLOMA HEADER */}
            <div className="text-center space-y-2 pt-2">
              <div className="text-[#D4AF37] text-xs sm:text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                <span>✦</span>
                <span>Official Academic Credential</span>
                <span>✦</span>
              </div>
              <h1 
                className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B1A3A] tracking-wider uppercase"
                style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
              >
                Certificate of Completion
              </h1>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
            </div>

            {/* RECIPIENT STUDENT SECTION */}
            <div className="text-center space-y-3 py-2">
              <p className="text-xs sm:text-sm font-serif italic text-slate-600 tracking-wide">
                This is to certify that
              </p>
              
              <div className="py-2">
                <h2 
                  className="text-3xl sm:text-5xl md:text-6xl text-[#0B1A3A] font-normal tracking-wide px-4 inline-block"
                  style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
                >
                  {userName}
                </h2>
                <div className="flex items-center justify-center gap-2 text-[#D4AF37] text-xs mt-1">
                  <span>❖</span>
                  <div className="w-24 sm:w-48 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  <span>❖</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-serif italic text-slate-600 max-w-xl mx-auto leading-relaxed">
                has successfully completed all requirements, practical engineering benchmarks, and capstone examinations for the course
              </p>
            </div>

            {/* COURSE TITLE BOX */}
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-gradient-to-r from-blue-50/80 via-amber-50/50 to-blue-50/80 p-4 sm:p-6 rounded-2xl border-2 border-[#D4AF37]/60 shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] mb-1">
                  Course of Completion
                </div>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-[#1E3A8A] tracking-tight leading-snug">
                  {courseTitle}
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-serif italic mt-3">
                We commend your commitment to excellence and wish you continued success in your engineering endeavors.
              </p>
            </div>

            {/* FOOTER: Date, 3D Gold Ribbon Seal, Founder Signature & Live QR Code */}
            <div className="pt-6 border-t-2 border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
              
              {/* Date Issued */}
              <div className="text-center sm:text-left space-y-1">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Date Issued</div>
                <div className="text-xs sm:text-sm font-black text-[#0B1A3A] bg-amber-50/80 px-3 py-1 rounded-lg border border-amber-200/80 inline-block">
                  {issuedAt}
                </div>
              </div>

              {/* 3D Metallic Gold Seal with Blue Ribbons */}
              <div className="flex flex-col items-center">
                <GoldRibbonSealSVG />
                <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest mt-1">
                  OFFICIAL ACADEMY SEAL
                </span>
              </div>

              {/* Founder Signature */}
              <div className="text-center space-y-1">
                <div 
                  className="text-2xl sm:text-3xl text-[#0B1A3A] font-normal tracking-wide"
                  style={{ fontFamily: "'Great Vibes', cursive, serif" }}
                >
                  Naman Pandey
                </div>
                <div className="w-28 h-0.5 bg-slate-300 mx-auto" />
                <div className="text-xs font-black text-[#0B1A3A]">Naman Pandey</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Founder & CEO</div>
              </div>

              {/* Live QR Code Verification Box */}
              <div className="flex flex-col items-center">
                <div className="p-1.5 bg-white border-2 border-[#D4AF37] rounded-xl shadow-md">
                  <QRCodeSVG
                    value={verificationUrl}
                    size={48}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <span className="text-[8px] font-black text-[#0B1A3A] uppercase tracking-wider mt-1">
                  SCAN TO VERIFY
                </span>
              </div>

            </div>

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

