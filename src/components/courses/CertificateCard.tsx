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
  Star,
  Crown
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

// Ornate Corner Gold Filigree SVG Component with intricate Victorian/Academic scrolls
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
      className="absolute w-16 h-16 sm:w-24 sm:h-24 pointer-events-none opacity-90 text-[#D4AF37] z-10"
      style={{
        top: position.includes('top') ? '6px' : 'auto',
        bottom: position.includes('bottom') ? '6px' : 'auto',
        left: position.includes('left') ? '6px' : 'auto',
        right: position.includes('right') ? '6px' : 'auto',
        transform: getTransforms()
      }}
    >
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id={`goldCornerGrad_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8DC" />
            <stop offset="35%" stopColor="#F3CA52" />
            <stop offset="70%" stopColor="#C2921D" />
            <stop offset="100%" stopColor="#684705" />
          </linearGradient>
        </defs>
        {/* Outer Frame Border Bars */}
        <path d="M 0 0 L 120 0 L 120 10 L 10 10 L 10 120 L 0 120 Z" fill={`url(#goldCornerGrad_${position})`} />
        <path d="M 16 16 L 95 16 L 95 20 L 20 20 L 20 95 L 16 95 Z" fill={`url(#goldCornerGrad_${position})`} opacity="0.85" />
        <path d="M 26 26 L 70 26 L 70 28 L 28 28 L 28 70 L 26 70 Z" fill={`url(#goldCornerGrad_${position})`} opacity="0.6" />
        
        {/* Intricate Victorian Swirl Flourish */}
        <path d="M 32 32 C 55 32 75 48 75 72 C 75 52 52 32 32 32 Z" fill={`url(#goldCornerGrad_${position})`} />
        <path d="M 38 38 C 58 38 68 50 68 68 C 68 52 52 38 38 38 Z" fill={`url(#goldCornerGrad_${position})`} opacity="0.7" />
        
        {/* Rosette Accent Circles */}
        <circle cx="28" cy="28" r="4" fill={`url(#goldCornerGrad_${position})`} />
        <circle cx="48" cy="18" r="2.5" fill={`url(#goldCornerGrad_${position})`} />
        <circle cx="18" cy="48" r="2.5" fill={`url(#goldCornerGrad_${position})`} />
        <circle cx="85" cy="8" r="2" fill={`url(#goldCornerGrad_${position})`} />
        <circle cx="8" cy="85" r="2" fill={`url(#goldCornerGrad_${position})`} />
      </svg>
    </div>
  );
};

// Golden Laurel Wreath SVG
const GoldenLaurelWreathSVG: React.FC = () => (
  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] shrink-0" viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="laurelGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF5C0" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8A640F" />
      </linearGradient>
    </defs>
    {/* Left Laurel Leaves */}
    <g fill="url(#laurelGoldGrad)">
      <path d="M 45 85 C 30 80 18 65 18 45 C 18 30 25 18 35 12 C 32 20 32 32 38 42 C 42 48 46 58 45 85 Z" opacity="0.2" />
      <path d="M 28 30 C 22 25 15 28 12 35 C 18 36 24 33 28 30 Z" />
      <path d="M 24 42 C 16 38 10 42 8 50 C 14 50 21 46 24 42 Z" />
      <path d="M 23 55 C 15 53 10 58 9 66 C 15 65 21 60 23 55 Z" />
      <path d="M 26 68 C 19 68 15 75 16 83 C 21 80 25 74 26 68 Z" />
      <path d="M 33 79 C 27 81 25 89 28 96 C 32 91 34 85 33 79 Z" />
      
      {/* Right Laurel Leaves */}
      <path d="M 72 30 C 78 25 85 28 88 35 C 82 36 76 33 72 30 Z" />
      <path d="M 76 42 C 84 38 90 42 92 50 C 86 50 79 46 76 42 Z" />
      <path d="M 77 55 C 85 53 90 58 91 66 C 85 65 79 60 77 55 Z" />
      <path d="M 74 68 C 81 68 85 75 84 83 C 79 80 75 74 74 68 Z" />
      <path d="M 67 79 C 73 81 75 89 72 96 C 68 91 66 85 67 79 Z" />
    </g>
  </svg>
);

// 3D Metallic Gold Medal Seal with Royal Blue Ribbon Tails
const GoldRibbonSealSVG: React.FC = () => (
  <div className="relative flex flex-col items-center shrink-0">
    {/* Scalloped Gold Medal */}
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 drop-shadow-2xl z-10">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <defs>
          <radialGradient id="goldMedalGrad3D_v2" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF8DB" />
            <stop offset="25%" stopColor="#FAD86B" />
            <stop offset="60%" stopColor="#C2921D" />
            <stop offset="100%" stopColor="#6E4D05" />
          </radialGradient>
          <linearGradient id="goldBorder3D_v2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF5C0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#4A3400" />
          </linearGradient>
          <radialGradient id="hologramCenterGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="60%" stopColor="#0B1A3A" />
            <stop offset="100%" stopColor="#050B18" />
          </radialGradient>
        </defs>

        {/* Outer Starburst Scallop */}
        <path
          d="M 60 5 L 64 12 L 72 7 L 74 15 L 83 12 L 83 20 L 92 20 L 90 28 L 98 31 L 93 38 L 100 44 L 93 50 L 98 57 L 90 60 L 92 68 L 83 68 L 83 76 L 74 73 L 72 81 L 64 76 L 60 83 L 56 76 L 48 81 L 46 73 L 37 76 L 37 68 L 28 68 L 30 60 L 22 57 L 27 50 L 20 44 L 27 38 L 22 31 L 30 28 L 28 20 L 37 20 L 37 12 L 46 15 L 48 7 L 56 12 Z"
          fill="url(#goldMedalGrad3D_v2)"
          stroke="url(#goldBorder3D_v2)"
          strokeWidth="2.5"
        />

        {/* Outer Ring */}
        <circle cx="60" cy="44" r="32" fill="url(#hologramCenterGrad)" stroke="url(#goldBorder3D_v2)" strokeWidth="2.5" />

        {/* Inner Gold Shield / Crest */}
        <circle cx="60" cy="42" r="15" fill="url(#goldMedalGrad3D_v2)" />
        <circle cx="60" cy="42" r="12" fill="#0B1A3A" />
        <text x="60" y="46" fill="#FAD86B" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="Cinzel, sans-serif">
          C•OS
        </text>

        <text x="44" y="65" fill="#FAD86B" fontSize="8">★</text>
        <text x="60" y="66" fill="#FAD86B" fontSize="9">★</text>
        <text x="76" y="65" fill="#FAD86B" fontSize="8">★</text>
      </svg>
    </div>

    {/* Royal Blue V-Cut Ribbon Tails hanging underneath */}
    <div className="flex gap-2.5 -mt-3 z-0">
      <div 
        className="w-4 h-9 bg-gradient-to-b from-[#1E3A8A] via-[#10244A] to-[#0A1835] border-x border-b border-[#D4AF37] transform -rotate-12 shadow-lg"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)' }}
      />
      <div 
        className="w-4 h-9 bg-gradient-to-b from-[#1E3A8A] via-[#10244A] to-[#0A1835] border-x border-b border-[#D4AF37] transform rotate-12 shadow-lg"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)' }}
      />
    </div>
  </div>
);

// Background Banknote/Diploma Security Guilloche Rosette SVG
const SecurityGuillocheSVG: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center overflow-hidden">
    <svg className="w-[600px] h-[600px] text-[#D4AF37]" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
      <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,2" />
      
      {/* Rosette Petal Geometry Loops */}
      {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="100"
          rx="70"
          ry="25"
          stroke="currentColor"
          strokeWidth="0.4"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      {[7.5, 22.5, 37.5, 52.5, 67.5, 82.5, 97.5, 112.5, 127.5, 142.5, 157.5, 172.5].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="100"
          rx="55"
          ry="18"
          stroke="currentColor"
          strokeWidth="0.3"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </svg>
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

  // Verification URL encoded inside QR code
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
        backgroundColor: '#FAF8F3',
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
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
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
                  AUTHENTIC & IMMUTABLE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                ID: <span className="text-amber-300 font-bold">{certificateId}</span> • Firestore Blockchain Ledger Record
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

      {/* Fonts & Shimmer Animations for Certificate */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Herr+Von+Muellerhoff&family=Monsieur+La+Doulaise&family=Alex+Brush&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,700&family=Cinzel:wght@600;700;800;900&display=swap');

        @keyframes gold-metallic-glow {
          0%, 100% { 
            border-color: #D4AF37; 
            box-shadow: 0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 15px rgba(212, 175, 55, 0.15); 
          }
          50% { 
            border-color: #FCD34D; 
            box-shadow: 0 0 55px rgba(252, 211, 77, 0.45), inset 0 0 25px rgba(252, 211, 77, 0.25); 
          }
        }

        @keyframes gold-light-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .gold-shimmer-text {
          background: linear-gradient(135deg, #1E3A8A 0%, #0B1A3A 30%, #8A640F 65%, #D4AF37 85%, #0B1A3A 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .runny-signature-font {
          font-family: 'Herr Von Muellerhoff', 'Monsieur La Doulaise', 'Alex Brush', cursive, serif;
          font-style: italic;
          letter-spacing: 0.05em;
          text-shadow: 0.5px 0.5px 1px rgba(11, 26, 58, 0.15);
        }

        .gold-border-bevel {
          border-image: linear-gradient(135deg, #FFF8DB, #D4AF37, #8A640F, #F3CA52, #FFF8DB) 1;
        }
      `}</style>

      {/* MAIN CERTIFICATE CANVAS FRAME: Increased Width (max-w-[1180px]) & Decreased Length/Height with Rich Details */}
      <div
        id={`cert_node_${certificateId}`}
        ref={certificateRef}
        className="relative overflow-hidden rounded-3xl text-slate-900 border-4 border-[#D4AF37] shadow-2xl font-sans select-none max-w-[1180px] mx-auto w-full transition-all duration-500 bg-[#FAF8F3] p-3 sm:p-6"
        style={{ animation: 'gold-metallic-glow 4s infinite ease-in-out' }}
      >
        {/* Fine Guilloche Pattern & Radial Background Texture */}
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{
          backgroundImage: `radial-gradient(#D4AF37 0.8px, transparent 0.8px), radial-gradient(#1E3A8A 0.8px, #FAF8F3 0.8px)`,
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px'
        }} />

        {/* Central Watermark Security Rosette */}
        <SecurityGuillocheSVG />

        {/* Outer Double Gold Border Frame with Beveled Edges */}
        <div className="relative inset-0 border-2 border-[#D4AF37] rounded-2xl p-3 sm:p-5 bg-white/95 backdrop-blur-xs shadow-inner">
          <div className="border-2 border-[#C5A059]/50 rounded-xl p-3 sm:p-6 relative space-y-4 sm:space-y-5">
            
            {/* Microtext Security Line along Inner Border */}
            <div className="absolute top-1 left-8 right-8 text-[7px] font-mono font-bold text-[#C5A059]/60 tracking-[0.25em] text-center overflow-hidden whitespace-nowrap uppercase pointer-events-none">
              CAMPUSOS AI ACADEMY • IMMUTABLE CREDENTIAL RECORD • VERIFIED AUTHENTICITY • FIRESTORE SECURITY PROOF •
            </div>

            {/* 4 Corner Ornaments */}
            <CornerFiligreeSVG position="top-left" />
            <CornerFiligreeSVG position="top-right" />
            <CornerFiligreeSVG position="bottom-left" />
            <CornerFiligreeSVG position="bottom-right" />

            {/* TOP BAR: Honors Distinction Pill, CampusOS Brand Emblem with Laurels & ID Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b-2 border-amber-200/80 pb-3 pt-2 px-2">
              
              {/* Honors Badge / Academic Rank */}
              <div className="bg-amber-50 text-[#8A640F] px-3 py-1 rounded-xl border border-[#D4AF37]/60 shadow-2xs flex items-center gap-1.5 shrink-0">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  Honors Distinction • Top 1% Performer
                </span>
              </div>

              {/* Central Academy Brand Crest with Laurels */}
              <div className="flex items-center gap-2 sm:gap-3">
                <GoldenLaurelWreathSVG />
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-black text-[#0B1A3A] tracking-wider uppercase flex items-center justify-center gap-1.5" style={{ fontFamily: "'Cinzel', serif" }}>
                    Campus OS <span className="text-[#D4AF37] text-xl sm:text-3xl">AI</span> Academy
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.25em]">
                    Board of Engineering Accreditation & Skill Assessment
                  </div>
                </div>
                <div className="transform scale-x-[-1]">
                  <GoldenLaurelWreathSVG />
                </div>
              </div>

              {/* Certificate ID & Security Hash Badge */}
              <div className="bg-[#0B1A3A] text-white px-3 py-1.5 rounded-xl border border-[#D4AF37] shadow-md flex items-center gap-2 shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#FCD34D]" />
                <div className="text-right">
                  <div className="text-[8px] uppercase tracking-widest text-amber-300 font-extrabold">Certificate ID</div>
                  <div className="text-xs font-mono font-black text-white">{certificateId}</div>
                </div>
              </div>

            </div>

            {/* MAIN DIPLOMA HEADER */}
            <div className="text-center space-y-1 pt-1">
              <div className="text-[#D4AF37] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                <span>✦</span>
                <span>Official Academic Credential of Engineering Achievement</span>
                <span>✦</span>
              </div>
              <h1 
                className="text-2xl sm:text-4xl md:text-4xl font-black text-[#0B1A3A] tracking-wider uppercase drop-shadow-2xs"
                style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
              >
                Certificate of Completion
              </h1>
              <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
            </div>

            {/* RECIPIENT STUDENT SECTION */}
            <div className="text-center space-y-2 py-1">
              <p className="text-xs sm:text-sm font-serif italic text-slate-600 tracking-wide">
                This credential is proudly awarded and presented to
              </p>
              
              <div className="py-1 relative inline-block max-w-full px-4">
                <h2 
                  className="text-3xl sm:text-5xl md:text-5xl text-[#0B1A3A] font-normal tracking-wide px-6 py-0.5 inline-block"
                  style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
                >
                  {userName}
                </h2>
                
                {/* Ornate Gold Dividers around Name */}
                <div className="flex items-center justify-center gap-3 text-[#D4AF37] text-xs mt-0.5">
                  <span className="text-amber-500">✦</span>
                  <div className="w-24 sm:w-56 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  <span className="text-amber-500">✦</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-serif italic text-slate-600 max-w-2xl mx-auto leading-relaxed">
                in recognition of outstanding academic mastery, practical coding benchmarks, and capstone engineering evaluations for
              </p>
            </div>

            {/* COURSE TITLE BOX */}
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-gradient-to-r from-blue-50/90 via-amber-50/70 to-blue-50/90 p-3 sm:p-4 rounded-2xl border-2 border-[#D4AF37]/80 shadow-sm relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-amber-200/30 rounded-full blur-xl pointer-events-none" />
                <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#D4AF37] mb-0.5">
                  Certified Engineering Program
                </div>
                <h3 className="text-base sm:text-2xl md:text-2xl font-black text-[#1E3A8A] tracking-tight leading-snug">
                  {courseTitle}
                </h3>
              </div>
            </div>

            {/* FOOTER: Date, 3D Gold Ribbon Seal, Sole Founder Signature & Live QR Code */}
            <div className="pt-3 border-t-2 border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
              
              {/* Date Issued & Verified Status */}
              <div className="text-center sm:text-left space-y-1">
                <div className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Date Issued</div>
                <div className="text-xs font-black text-[#0B1A3A] bg-amber-50/90 px-3.5 py-1.5 rounded-xl border border-amber-300/80 inline-block shadow-2xs">
                  {issuedAt}
                </div>
              </div>

              {/* 3D Metallic Gold Seal with Blue Ribbons */}
              <div className="flex flex-col items-center">
                <GoldRibbonSealSVG />
                <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-widest mt-0.5">
                  OFFICIAL ACADEMY SEAL
                </span>
              </div>

              {/* Sole Founder Signature Block (Naman Pandey) - Ultra-runny calligraphic pen style */}
              <div className="text-center space-y-0.5 relative px-4">
                <div 
                  className="text-3xl sm:text-4xl text-[#0B1A3A] font-normal tracking-wide transform -rotate-3 leading-none py-1 select-none runny-signature-font"
                  style={{ 
                    transform: 'rotate(-4deg) scaleY(1.1)',
                    filter: 'drop-shadow(0px 1px 1px rgba(15, 44, 89, 0.25))'
                  }}
                >
                  Naman Pandey
                </div>
                {/* Custom Calligraphic Pen Swoosh Line under Signature */}
                <svg className="w-36 h-2 mx-auto text-[#0B1A3A] opacity-80" viewBox="0 0 120 10" fill="none">
                  <path d="M 5 5 Q 35 1, 60 6 T 115 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="text-[12px] font-black text-[#0B1A3A] tracking-wide mt-1">Naman Pandey</div>
                <div className="text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-widest">Founder & CEO, CampusOS</div>
              </div>

              {/* Live QR Code Verification Box */}
              <div className="flex flex-col items-center">
                <div className="p-1.5 bg-white border-2 border-[#D4AF37] rounded-xl shadow-md">
                  <QRCodeSVG
                    value={verificationUrl}
                    size={46}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <span className="text-[7px] font-black text-[#0B1A3A] uppercase tracking-wider mt-1">
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
