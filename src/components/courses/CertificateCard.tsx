import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Calendar, 
  Download, 
  Share2, 
  ShieldCheck, 
  ExternalLink,
  GraduationCap
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

// 3D Metallic Gold Laurel Wreath Left SVG
const LaurelWreathLeftSVG: React.FC = () => (
  <div className="w-8 h-16 sm:w-12 sm:h-22 shrink-0 text-[#D4AF37] drop-shadow-md">
    <svg className="w-full h-full" viewBox="0 0 60 120" fill="none">
      <defs>
        <linearGradient id="goldLeafGradL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="40%" stopColor="#F5D061" />
          <stop offset="80%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8A640F" />
        </linearGradient>
      </defs>
      <path d="M 50 110 C 25 85 15 50 28 10" stroke="url(#goldLeafGradL)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 45 95 C 20 85 10 75 25 68 C 35 72 40 82 45 95 Z" fill="url(#goldLeafGradL)" />
      <path d="M 32 75 C 10 65 2 52 18 45 C 28 50 30 62 32 75 Z" fill="url(#goldLeafGradL)" />
      <path d="M 26 55 C 5 42 -2 28 15 22 C 24 28 25 40 26 55 Z" fill="url(#goldLeafGradL)" />
      <path d="M 24 35 C 5 20 0 5 20 2 C 28 10 26 22 24 35 Z" fill="url(#goldLeafGradL)" />
      <path d="M 28 18 C 15 5 12 -5 28 0 C 32 8 30 14 28 18 Z" fill="url(#goldLeafGradL)" />
    </svg>
  </div>
);

// 3D Metallic Gold Laurel Wreath Right SVG
const LaurelWreathRightSVG: React.FC = () => (
  <div className="w-8 h-16 sm:w-12 sm:h-22 shrink-0 text-[#D4AF37] drop-shadow-md">
    <svg className="w-full h-full" viewBox="0 0 60 120" fill="none">
      <defs>
        <linearGradient id="goldLeafGradR" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="40%" stopColor="#F5D061" />
          <stop offset="80%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8A640F" />
        </linearGradient>
      </defs>
      <path d="M 10 110 C 35 85 45 50 32 10" stroke="url(#goldLeafGradR)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 15 95 C 40 85 50 75 35 68 C 25 72 20 82 15 95 Z" fill="url(#goldLeafGradR)" />
      <path d="M 28 75 C 50 65 58 52 42 45 C 32 50 30 62 28 75 Z" fill="url(#goldLeafGradR)" />
      <path d="M 34 55 C 55 42 62 28 45 22 C 36 28 35 40 34 55 Z" fill="url(#goldLeafGradR)" />
      <path d="M 36 35 C 55 20 60 5 40 2 C 32 10 34 22 36 35 Z" fill="url(#goldLeafGradR)" />
      <path d="M 32 18 C 45 5 48 -5 32 0 C 28 8 30 14 32 18 Z" fill="url(#goldLeafGradR)" />
    </svg>
  </div>
);

// 3D Gold Medal Seal with Royal Blue Ribbon Tails
const GoldRibbonSealSVG: React.FC = () => (
  <div className="relative flex flex-col items-center shrink-0">
    {/* Scalloped Gold Medal */}
    <div className="relative w-14 h-14 sm:w-18 sm:h-18 shrink-0 drop-shadow-xl z-10">
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
        <text x="60" y="44" fill="#F3CA52" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
          C•
        </text>

        <text x="48" y="65" fill="#F3CA52" fontSize="7">★</text>
        <text x="60" y="66" fill="#F3CA52" fontSize="8">★</text>
        <text x="71" y="65" fill="#F3CA52" fontSize="7">★</text>
      </svg>
    </div>

    {/* Royal Blue V-Cut Ribbon Tails hanging underneath */}
    <div className="flex gap-1.5 -mt-3 z-0">
      <div 
        className="w-3.5 h-7 bg-gradient-to-b from-[#1E3A8A] via-[#10244A] to-[#0A1835] border-x border-b border-[#D4AF37] transform -rotate-12 shadow-md"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
      />
      <div 
        className="w-3.5 h-7 bg-gradient-to-b from-[#1E3A8A] via-[#10244A] to-[#0A1835] border-x border-b border-[#D4AF37] transform rotate-12 shadow-md"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
      />
    </div>
  </div>
);

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificateId,
  userName,
  userEmail,
  courseTitle,
  issuedAt,
  showActions = true,
  onVerifyClick
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

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
      link.download = `Certificate_${userName.replace(/\s+/g, '_')}_${certificateId}.png`;
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
      await exportCanvasToPDF(`cert_node_${certificateId}`, `Certificate_${userName.replace(/\s+/g, '_')}_${certificateId}.pdf`);
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
      alert(`Certificate verification link copied to clipboard!\n${verificationUrl}`);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Action bar if enabled */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 text-white p-3.5 rounded-2xl shadow-md border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Verified Official Certificate • ID: <span className="font-mono text-white">{certificateId}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadImage}
              disabled={isDownloadingImage}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isDownloadingImage ? (
                <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{isDownloadingImage ? 'Generating PNG...' : 'Download Image'}</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloadingPDF}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              {isDownloadingPDF ? (
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Award className="w-3.5 h-3.5 text-slate-950" />
              )}
              <span>{isDownloadingPDF ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Share Link</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Certificate Outer Container (Increased Width, Reduced Height aspect ratio) */}
      <div
        id={`cert_node_${certificateId}`}
        ref={certificateRef}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1A3A] via-[#10254C] to-[#0A1835] text-slate-900 border-2 border-[#E5C158] shadow-2xl p-2 sm:p-2.5 font-sans select-none max-w-[1240px] mx-auto w-full"
      >
        {/* Glowing Corner Light Flares */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Inner Canvas Box with compact padding for reduced length */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FF] to-[#E9EFFB] p-4 sm:p-5 md:p-6 overflow-hidden border border-white/80 shadow-inner">

          {/* Background Radial Mesh Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px), radial-gradient(#d4af37 0.5px, #f6f9ff 0.5px)',
              backgroundSize: '20px 20px, 40px 40px',
              backgroundPosition: '0 0, 10px 10px'
            }}
          />

          {/* TOP LEFT DARK NAVY SWOOCH WITH GOLDEN EDGE */}
          <div 
            className="absolute -top-1 -left-1 w-48 sm:w-60 h-16 sm:h-20 bg-gradient-to-br from-[#0A1835] via-[#0F2248] to-[#1E3A8A] border-r-2 border-b-2 border-[#D4AF37] rounded-br-[60px] shadow-lg p-2.5 sm:p-3 z-10 flex flex-col justify-center"
          >
            <div className="text-[9px] sm:text-[11px] font-semibold text-white/90 leading-tight">
              Building India's <span className="font-bold text-sky-200">Next Generation</span> of Learners 🚀
            </div>
          </div>

          {/* TOP RIGHT DARK NAVY CORNER SWOOCH */}
          <div 
            className="absolute -top-1 -right-1 w-36 sm:w-48 h-14 sm:h-18 bg-gradient-to-bl from-[#0A1835] via-[#0F2248] to-[#1E3A8A] border-l-2 border-b-2 border-[#D4AF37] rounded-bl-[50px] pointer-events-none z-0"
          />

          {/* BOTTOM LEFT DARK NAVY CORNER SWOOCH */}
          <div 
            className="absolute -bottom-1 -left-1 w-36 sm:w-48 h-14 sm:h-18 bg-gradient-to-tr from-[#0A1835] via-[#0F2248] to-[#1E3A8A] border-r-2 border-t-2 border-[#D4AF37] rounded-tr-[50px] pointer-events-none z-0"
          />

          {/* BOTTOM RIGHT DARK NAVY CORNER SWOOCH */}
          <div 
            className="absolute -bottom-1 -right-1 w-36 sm:w-48 h-14 sm:h-18 bg-gradient-to-tl from-[#0A1835] via-[#0F2248] to-[#1E3A8A] border-l-2 border-t-2 border-[#D4AF37] rounded-tl-[50px] pointer-events-none z-0"
          />

          {/* TOP ROW: LOGO CENTER & CERTIFICATE ID TOP RIGHT */}
          <div className="relative z-20 flex flex-row items-center justify-between gap-4 mb-1.5">
            
            {/* Top Left Placeholder matching swooch width */}
            <div className="w-36 sm:w-48 shrink-0" />

            {/* Center Logo */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2">
                {/* 3D Glowing C• Circle Logo */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#0B1A3A] via-[#2563EB] to-[#F3CA52] p-0.5 shadow-md flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full bg-[#0B1A3A] flex items-center justify-center text-[#F3CA52] font-black text-base sm:text-lg font-sans tracking-tight">
                    C•
                  </div>
                </div>
                <div className="text-left font-sans">
                  <div className="text-xl sm:text-2xl font-black text-[#0B192C] tracking-tight leading-none">
                    Campus<span className="text-[#2563EB]">OS</span>
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-bold text-slate-600 tracking-widest uppercase mt-0.5 flex items-center gap-1">
                    <span>Learn</span>
                    <span className="text-[#2563EB]">•</span>
                    <span>Build</span>
                    <span className="text-[#2563EB]">•</span>
                    <span>Achieve</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Right Certificate ID Badge */}
            <div className="flex justify-end shrink-0">
              <div className="px-2.5 py-1 rounded-xl bg-white/90 border border-blue-200 shadow-2xs flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
                <div className="text-right">
                  <div className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none">
                    Certificate ID
                  </div>
                  <div className="text-xs font-black text-[#0B192C] font-mono tracking-wider">
                    {certificateId}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* MAIN CENTER SECTION: LAUREL WREATH & CERTIFICATE OF COMPLETION */}
          <div className="relative z-20 my-1 text-center">
            
            {/* Small Top Badge: OFFICIAL */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50/90 border border-amber-300 text-amber-800 text-[9px] font-extrabold uppercase tracking-widest shadow-2xs mb-0.5">
              <span className="text-amber-500 text-xs">⭐</span>
              <span>OFFICIAL</span>
            </div>

            {/* 3D Laurel Wreath Framing Title */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 my-0.5">
              <LaurelWreathLeftSVG />
              
              <div className="text-center space-y-0.5">
                <div 
                  className="text-xl sm:text-3xl text-[#0B192C] font-bold tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Certificate <span className="italic font-normal font-serif text-slate-700">of</span>
                </div>
                <h1 
                  className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8] tracking-tight leading-none drop-shadow-xs"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Completion
                </h1>
                
                {/* Underline Gold Line with Center Star */}
                <div className="flex items-center justify-center gap-2 pt-0.5">
                  <div className="h-0.5 w-20 sm:w-36 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-[10px]">✦</span>
                  <div className="h-0.5 w-20 sm:w-36 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
                </div>
              </div>

              <LaurelWreathRightSVG />
            </div>

            <div className="text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-widest">
              This certificate is proudly presented to
            </div>

            {/* CALLIGRAPHIC RECIPIENT NAME */}
            <div className="py-0.5">
              <div 
                className="text-3xl sm:text-5xl text-[#0B192C] font-normal tracking-wide inline-block px-4 relative"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {userName}
                {/* Cyan Glow Bar underneath name */}
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full opacity-60 mt-0.5" />
              </div>
            </div>

            <div className="text-[11px] text-slate-600 font-medium">
              for successfully completing the
            </div>

            {/* COURSE TITLE 3D GLASS BADGE */}
            <div className="mt-1 mb-1 max-w-2xl mx-auto">
              <div className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-blue-50/90 border border-blue-200/80 shadow-sm flex items-center justify-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-2xs shrink-0">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-sm sm:text-lg font-black text-[#0B192C] tracking-tight leading-snug font-sans">
                  {courseTitle}
                </h2>
              </div>
            </div>

            <p className="text-[10px] sm:text-xs text-slate-600 max-w-2xl mx-auto leading-tight">
              An intensive learning journey powered by <span className="font-extrabold text-[#2563EB]">CampusOS</span>, recognizing your dedication, curiosity, and commitment to continuous growth.
            </p>

          </div>

          {/* MIDDLE WIDE HORIZONTAL LAYOUT: 4 PILLS IN HORIZONTAL ROW (LEFT) + QUOTE BLOCK (RIGHT) */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-12 gap-3 my-2 items-center">
            
            {/* Left 9 Cols: Horizontal 4 Glass Pills Grid */}
            <div className="sm:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <div className="px-2 py-1 rounded-xl bg-white/80 border border-blue-100 shadow-2xs flex items-center justify-center gap-1.5 text-[9px] sm:text-[10.5px] font-bold text-slate-800 whitespace-nowrap">
                <div className="p-0.5 rounded-md bg-blue-100 text-blue-600 shrink-0">
                  <BookOpen className="w-3 h-3" />
                </div>
                <span>Hands-on Learning</span>
              </div>
              <div className="px-2 py-1 rounded-xl bg-white/80 border border-blue-100 shadow-2xs flex items-center justify-center gap-1.5 text-[9px] sm:text-[10.5px] font-bold text-slate-800 whitespace-nowrap">
                <div className="p-0.5 rounded-md bg-blue-100 text-blue-600 shrink-0">
                  <TrendingUp className="w-3 h-3" />
                </div>
                <span>Skill Development</span>
              </div>
              <div className="px-2 py-1 rounded-xl bg-white/80 border border-blue-100 shadow-2xs flex items-center justify-center gap-1.5 text-[9px] sm:text-[10.5px] font-bold text-slate-800 whitespace-nowrap">
                <div className="p-0.5 rounded-md bg-blue-100 text-blue-600 shrink-0">
                  <Users className="w-3 h-3" />
                </div>
                <span>Global Community</span>
              </div>
              <div className="px-2 py-1 rounded-xl bg-white/80 border border-blue-100 shadow-2xs flex items-center justify-center gap-1.5 text-[9px] sm:text-[10.5px] font-bold text-slate-800 whitespace-nowrap">
                <div className="p-0.5 rounded-md bg-blue-100 text-blue-600 shrink-0">
                  <Briefcase className="w-3 h-3" />
                </div>
                <span>Career Opportunities</span>
              </div>
            </div>

            {/* Right 3 Cols: Quote Block */}
            <div className="sm:col-span-3 relative pl-3 flex flex-col justify-center border-l-2 border-blue-600 py-0.5">
              <p className="text-[10px] sm:text-[11px] font-serif italic text-slate-800 font-semibold leading-tight">
                “Keep learning, keep building, keep growing..”
              </p>
              <div className="text-[9px] font-extrabold text-[#2563EB] pt-0.5">
                — Campus<span className="text-[#0B192C]">OS</span>
              </div>
            </div>

          </div>

          {/* FOOTER SECTION: 4 BALANCED COLUMNS (Date, Signature of Naman Pandey, 3D Seal, QR Code) */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center pt-2 border-t border-slate-200">
            
            {/* Col 1: Completed On Glass Pill */}
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="px-2.5 py-1 rounded-xl bg-white/90 border border-blue-100 shadow-2xs flex items-center gap-2">
                <div className="p-1 rounded-lg bg-blue-900 text-amber-400 shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none">
                    Completed On
                  </div>
                  <div className="text-[11px] font-extrabold text-[#0B192C] mt-0.5">
                    {issuedAt}
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2: Signature of Naman Pandey (Founder, CampusOS) */}
            <div className="text-center space-y-0.5">
              <div className="relative inline-block text-center">
                <div 
                  className="text-2xl sm:text-3xl text-[#0B192C] font-semibold tracking-wide leading-none select-none"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  N Pandey
                </div>
                <svg className="w-24 sm:w-28 h-2 mx-auto text-[#0B192C] overflow-visible -mt-1" viewBox="0 0 120 10">
                  <path 
                    d="M 5 2 C 35 8, 75 1, 115 5 C 118 6, 119 3, 110 2 C 85 1, 40 5, 5 2" 
                    fill="currentColor" 
                  />
                </svg>
              </div>
              <div className="w-20 mx-auto border-b border-amber-500/60 my-0.5" />
              <div className="text-[10px] font-black text-[#0B192C] leading-none">
                Naman Pandey
              </div>
              <div className="text-[9px] font-bold text-blue-600 leading-none">
                Founder, CampusOS
              </div>
            </div>

            {/* Col 3: 3D Gold Ribbon Seal */}
            <div className="flex justify-center">
              <GoldRibbonSealSVG />
            </div>

            {/* Col 4: QR Code & Verify Certificate Glass Badge */}
            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <div className="px-2.5 py-1 rounded-xl bg-white/90 border border-blue-100 shadow-2xs flex items-center gap-2">
                <div className="p-1 bg-white border border-slate-300 rounded-lg shrink-0">
                  <QRCodeSVG
                    value={verificationUrl}
                    size={36}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <div className="text-left">
                  <button
                    onClick={onVerifyClick}
                    className="font-black text-[#0B192C] hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer text-[9px]"
                  >
                    <span>Verify Certificate</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                  <div className="text-[8px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                    <span>campusos.com/verify</span>
                    <span>✔</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM CENTER PILL BADGE */}
          <div className="relative z-20 mt-2 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/80 border border-blue-200/80 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-slate-700 shadow-2xs">
              <span className="text-amber-500">✦</span>
              <span>POWERED BY CAMPUSOS</span>
              <span className="text-slate-400">|</span>
              <span>EMPOWERING 1M+ STUDENTS</span>
              <span className="text-blue-500">💙</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
