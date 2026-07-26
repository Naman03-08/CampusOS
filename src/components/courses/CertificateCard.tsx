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

      {/* CSS Styles for shiny gold shimmer, pulsing glow, and floating animations */}
      <style>{`
        @keyframes gold-shimmer {
          0% { transform: translate(-100%, -50%) rotate(25deg); }
          40% { transform: translate(100%, -50%) rotate(25deg); }
          100% { transform: translate(100%, -50%) rotate(25deg); }
        }
        @keyframes float-dust-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          50% { transform: translate(15px, -15px) scale(1.2); opacity: 0.4; }
        }
        @keyframes float-dust-2 {
          0%, 100% { transform: translate(0, 0) scale(1.2); opacity: 0.2; }
          50% { transform: translate(-20px, -10px) scale(0.9); opacity: 0.45; }
        }
        @keyframes border-glow-shine {
          0%, 100% { 
            border-color: #E5C158; 
            box-shadow: 0 0 25px rgba(229, 193, 88, 0.25), inset 0 0 10px rgba(229, 193, 88, 0.1); 
          }
          50% { 
            border-color: #FCD34D; 
            box-shadow: 0 0 45px rgba(252, 211, 77, 0.6), inset 0 0 20px rgba(252, 211, 77, 0.35); 
          }
        }
      `}</style>

      {/* Main Certificate Outer Container using cert.png */}
      <div
        id={`cert_node_${certificateId}`}
        ref={certificateRef}
        className="relative overflow-hidden rounded-3xl text-slate-900 border-4 border-[#E5C158] shadow-2xl font-sans select-none max-w-[1000px] mx-auto w-full aspect-[1000/680] transition-all duration-500 bg-[#0B1220]"
        style={{ animation: 'border-glow-shine 4s infinite ease-in-out' }}
      >
        {/* Shimmering Metallic Light Reflection Sweeps */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-30">
          <div 
            className="absolute inset-0 w-[200%] h-[200%] opacity-15"
            style={{
              background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 55%, transparent 65%)',
              transform: 'translate(-100%, -50%) rotate(25deg)',
              animation: 'gold-shimmer 8s infinite linear',
            }}
          />
        </div>

        {/* Background Certificate Image */}
        <img 
          src={certImg} 
          alt="CampusOS AI Certificate" 
          className="absolute inset-0 w-full h-full object-fill z-0" 
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Overlays Container (Percentage-based for perfect fluid responsiveness!) */}
        <div className="absolute inset-0 z-10 font-sans pointer-events-none">
          
          {/* Certificate ID in the Top Right Area */}
          <div className="absolute top-[6%] right-[8%] flex flex-col items-end text-right">
            <span className="text-[7px] sm:text-[8px] font-black text-amber-300 uppercase tracking-widest leading-none mb-1 flex items-center gap-1 justify-end">
              <span>CERTIFICATE ID</span>
            </span>
            <span className="text-[9px] sm:text-[11px] font-black text-white font-mono tracking-wider bg-slate-950/50 px-2 py-0.5 rounded-md border border-white/10">
              {certificateId}
            </span>
          </div>

          {/* RECIPIENT NAME: Perfectly Centered calligraphic overlay */}
          <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[80%] flex flex-col items-center">
            <span className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2 font-mono">
              This certificate is proudly presented to
            </span>
            <h1 
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B192C] font-semibold tracking-wide inline-block"
              style={{ fontFamily: "'Great Vibes', cursive", lineHeight: '1.2' }}
            >
              {userName}
            </h1>
            <div className="h-[2px] w-[50%] max-w-xs bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full opacity-60 mt-2" />
          </div>

          {/* COURSE TITLE: Beautiful Centered display */}
          <div className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[75%] flex flex-col items-center">
            <span className="text-[8px] sm:text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">
              for successfully completing the course
            </span>
            <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black text-[#1E3A8A] tracking-tight leading-snug">
              {courseTitle}
            </h2>
          </div>

          {/* Completed On Date (Bottom-Left) */}
          <div className="absolute bottom-[10%] left-[8%] flex flex-col">
            <span className="text-[7px] sm:text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">
              Completed On
            </span>
            <span className="text-[10px] sm:text-xs font-black text-[#0B192C] mt-1 bg-white/40 px-2.5 py-0.5 rounded-md border border-slate-200/50">
              {issuedAt}
            </span>
          </div>

          {/* Verification Badge & Live QR Code (Bottom-Right) */}
          <div className="absolute bottom-[8%] right-[8%] flex items-center gap-2 pointer-events-auto">
            <div className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm shrink-0">
              <QRCodeSVG
                value={verificationUrl}
                size={40}
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="text-left">
              <button
                type="button"
                onClick={onVerifyClick}
                className="font-black text-[#0B192C] hover:text-[#2563EB] flex items-center gap-1 transition-colors cursor-pointer text-[8px] sm:text-[9px]"
              >
                <span>Verify Credential</span>
                <svg className="w-2.5 h-2.5 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" x2="21" y1="14" y2="3" />
                </svg>
              </button>
              <div className="text-[7px] sm:text-[8px] text-emerald-600 font-black flex items-center gap-0.5 mt-0.5">
                <span>campusos.com/verify</span>
                <span>✔</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
