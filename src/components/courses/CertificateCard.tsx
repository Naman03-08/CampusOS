import React, { useRef, useState, useEffect } from 'react';
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
  Copy,
  Check,
  FileCode,
  FileText,
  Clock,
  Globe,
  Lock,
  Medal,
  Star,
  Crown,
  Move3d,
  Code2
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

// Ornate Corner 24K Gold Filigree SVG Component with Victorian & Academic Flourishes
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
      className="absolute w-16 h-16 sm:w-24 sm:h-24 pointer-events-none opacity-95 text-[#D4AF37] z-10"
      style={{
        top: position.includes('top') ? '6px' : 'auto',
        bottom: position.includes('bottom') ? '6px' : 'auto',
        left: position.includes('left') ? '6px' : 'auto',
        right: position.includes('right') ? '6px' : 'auto',
        transform: getTransforms()
      }}
    >
      <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id={`goldCornerGrad_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF0" />
            <stop offset="25%" stopColor="#F5D77F" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#997517" />
            <stop offset="100%" stopColor="#5E4306" />
          </linearGradient>
        </defs>
        {/* Outer Frame Border Bars */}
        <path d="M 0 0 L 120 0 L 120 8 L 8 8 L 8 120 L 0 120 Z" fill={`url(#goldCornerGrad_${position})`} />
        <path d="M 14 14 L 95 14 L 95 18 L 18 18 L 18 95 L 14 95 Z" fill={`url(#goldCornerGrad_${position})`} opacity="0.9" />
        <path d="M 24 24 L 70 24 L 70 26 L 26 26 L 26 70 L 24 70 Z" fill={`url(#goldCornerGrad_${position})`} opacity="0.75" />
        
        {/* Intricate Victorian Swirl Flourish */}
        <path d="M 30 30 C 55 30 75 48 75 72 C 75 52 52 30 30 30 Z" fill={`url(#goldCornerGrad_${position})`} />
        <path d="M 36 36 C 58 36 68 50 68 68 C 68 52 52 36 36 36 Z" fill={`url(#goldCornerGrad_${position})`} opacity="0.8" />
        
        {/* Rosette Accent Circles */}
        <circle cx="26" cy="26" r="4.5" fill={`url(#goldCornerGrad_${position})`} />
        <circle cx="46" cy="16" r="3" fill={`url(#goldCornerGrad_${position})`} />
        <circle cx="16" cy="46" r="3" fill={`url(#goldCornerGrad_${position})`} />
        <circle cx="85" cy="8" r="2.5" fill={`url(#goldCornerGrad_${position})`} />
        <circle cx="8" cy="85" r="2.5" fill={`url(#goldCornerGrad_${position})`} />
      </svg>
    </div>
  );
};

// Golden Laurel Wreath SVG
const GoldenLaurelWreathSVG: React.FC = () => (
  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] shrink-0 drop-shadow-xs" viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="laurelGoldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF0" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8A640F" />
      </linearGradient>
    </defs>
    <g fill="url(#laurelGoldGrad2)">
      <path d="M 45 85 C 30 80 18 65 18 45 C 18 30 25 18 35 12 C 32 20 32 32 38 42 C 42 48 46 58 45 85 Z" opacity="0.25" />
      <path d="M 28 30 C 22 25 15 28 12 35 C 18 36 24 33 28 30 Z" />
      <path d="M 24 42 C 16 38 10 42 8 50 C 14 50 21 46 24 42 Z" />
      <path d="M 23 55 C 15 53 10 58 9 66 C 15 65 21 60 23 55 Z" />
      <path d="M 26 68 C 19 68 15 75 16 83 C 21 80 25 74 26 68 Z" />
      <path d="M 33 79 C 27 81 25 89 28 96 C 32 91 34 85 33 79 Z" />
      
      <path d="M 72 30 C 78 25 85 28 88 35 C 82 36 76 33 72 30 Z" />
      <path d="M 76 42 C 84 38 90 42 92 50 C 86 50 79 46 76 42 Z" />
      <path d="M 77 55 C 85 53 90 58 91 66 C 85 65 79 60 77 55 Z" />
      <path d="M 74 68 C 81 68 85 75 84 83 C 79 80 75 74 74 68 Z" />
      <path d="M 67 79 C 73 81 75 89 72 96 C 68 91 66 85 67 79 Z" />
    </g>
  </svg>
);

// 3D Metallic Gold Medal Seal with Dual Royal Blue Ribbons
const GoldRibbonSealSVG: React.FC = () => (
  <div className="relative flex flex-col items-center shrink-0 group">
    {/* Dual Royal Blue Satin Ribbon Tails under Seal */}
    <div className="absolute top-16 flex justify-center gap-2 pointer-events-none z-0 opacity-95">
      {/* Left Ribbon */}
      <svg className="w-8 h-16 drop-shadow-md transform -rotate-12" viewBox="0 0 30 60">
        <defs>
          <linearGradient id="blueRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0B1A3A" />
          </linearGradient>
        </defs>
        <path d="M 0 0 L 30 0 L 25 50 L 15 42 L 5 50 Z" fill="url(#blueRibbonGrad1)" stroke="#D4AF37" strokeWidth="1" />
      </svg>
      {/* Right Ribbon */}
      <svg className="w-8 h-16 drop-shadow-md transform rotate-12" viewBox="0 0 30 60">
        <path d="M 0 0 L 30 0 L 25 50 L 15 42 L 5 50 Z" fill="url(#blueRibbonGrad1)" stroke="#D4AF37" strokeWidth="1" />
      </svg>
    </div>

    {/* Scalloped 3D Gold Medal */}
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 drop-shadow-2xl z-10 transition-transform duration-500 group-hover:scale-105">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <defs>
          <radialGradient id="goldMedal3DGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFDF0" />
            <stop offset="20%" stopColor="#FAD86B" />
            <stop offset="55%" stopColor="#C2921D" />
            <stop offset="85%" stopColor="#8A640F" />
            <stop offset="100%" stopColor="#4A3400" />
          </radialGradient>
          <linearGradient id="goldBorder3D" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFDF0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#3B2900" />
          </linearGradient>
          <radialGradient id="hologramCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="60%" stopColor="#0B1A3A" />
            <stop offset="100%" stopColor="#040914" />
          </radialGradient>
        </defs>

        {/* Outer Starburst Scallop Centered at (60,60) */}
        <path
          d="M 60 6 L 65 14 L 73 9 L 75 18 L 84 15 L 84 24 L 93 23 L 91 32 L 100 33 L 95 41 L 103 45 L 97 52 L 104 58 L 97 64 L 103 71 L 95 75 L 100 83 L 91 84 L 93 93 L 84 92 L 84 101 L 75 98 L 73 107 L 65 102 L 60 110 L 55 102 L 47 107 L 45 98 L 36 101 L 36 92 L 27 93 L 29 84 L 20 83 L 25 75 L 17 71 L 23 64 L 16 58 L 23 52 L 17 45 L 25 41 L 20 33 L 29 32 L 27 23 L 36 24 L 36 15 L 45 18 L 47 9 L 55 14 Z"
          fill="url(#goldMedal3DGrad)"
          stroke="url(#goldBorder3D)"
          strokeWidth="2.5"
        />

        {/* Outer Ridge Circle */}
        <circle cx="60" cy="60" r="44" fill="none" stroke="url(#goldBorder3D)" strokeWidth="1.5" />

        {/* Hologram Navy Center Circle */}
        <circle cx="60" cy="60" r="41" fill="url(#hologramCoreGrad)" stroke="url(#goldBorder3D)" strokeWidth="2.5" />

        {/* Beaded Dash Circle */}
        <circle cx="60" cy="60" r="36" fill="none" stroke="#FAD86B" strokeWidth="1" strokeDasharray="3,2" opacity="0.8" />

        {/* Inner Gold Medallion Ring */}
        <circle cx="60" cy="60" r="31" fill="url(#goldMedal3DGrad)" stroke="url(#goldBorder3D)" strokeWidth="1" />
        <circle cx="60" cy="60" r="27" fill="#0B1A3A" stroke="url(#goldBorder3D)" strokeWidth="1.5" />

        {/* Top Decorative Stars */}
        <text x="60" y="44" fill="#FAD86B" fontSize="7" textAnchor="middle">★ ★ ★</text>

        {/* Brand Name: PLACIVO */}
        <text
          x="60"
          y="56"
          fill="#FAD86B"
          fontSize="8"
          fontWeight="900"
          textAnchor="middle"
          letterSpacing="0.6px"
          fontFamily="Cinzel, sans-serif"
        >
          PLACIVO AI
        </text>

        {/* Subtitle: ACADEMY */}
        <text
          x="60"
          y="66"
          fill="#FFFDF0"
          fontSize="6"
          fontWeight="800"
          textAnchor="middle"
          letterSpacing="0.8px"
          fontFamily="Cinzel, sans-serif"
        >
          ACADEMY
        </text>

        {/* Bottom Star */}
        <text x="60" y="76" fill="#FAD86B" fontSize="7" textAnchor="middle">★</text>
      </svg>
    </div>
  </div>
);

// Background Banknote/Diploma Security Guilloche Rosette SVG
const SecurityGuillocheSVG: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.12] flex items-center justify-center overflow-hidden">
    <svg className="w-[650px] h-[650px] text-[#D4AF37] animate-spin-very-slow" viewBox="0 0 200 200" fill="none">
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

// Animated Floating Gold Dust Particle Layer
const FloatingSparklesLayer: React.FC = () => {
  const particles = [
    { top: '10%', left: '15%', delay: '0s', size: '10px' },
    { top: '18%', left: '82%', delay: '1.2s', size: '14px' },
    { top: '35%', left: '8%', delay: '2.5s', size: '8px' },
    { top: '45%', left: '92%', delay: '0.8s', size: '12px' },
    { top: '65%', left: '12%', delay: '3.1s', size: '11px' },
    { top: '75%', left: '85%', delay: '1.7s', size: '15px' },
    { top: '88%', left: '30%', delay: '2.0s', size: '9px' },
    { top: '90%', left: '70%', delay: '0.4s', size: '13px' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p, idx) => (
        <div
          key={idx}
          className="absolute text-amber-400 opacity-80 animate-float-sparkle"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            fontSize: p.size,
            filter: 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.8))'
          }}
        >
          ★
        </div>
      ))}
    </div>
  );
};

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificateId,
  userName,
  userEmail = 'student@placivo.com',
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
  const [isDownloadingHTML, setIsDownloadingHTML] = useState(false);
  const [isDownloadingSVG, setIsDownloadingSVG] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // 3D Tilt Physics & Interactive Specular Light State
  const [enable3d, setEnable3d] = useState(true);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://placivo.com';
  const verificationUrl = `${origin}/?verifyCert=${certificateId}`;

  // Mouse Move Event Listener for 3D Tilt Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enable3d || !certificateRef.current) return;
    const rect = certificateRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate normalized rotation angle (max 8 degrees)
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotX, rotY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  };

  // 1. Export Interactive Standalone HTML Certificate (Runs 3D Tilt, Animations, Verification Offline!)
  const handleDownloadHTML = () => {
    setIsDownloadingHTML(true);
    try {
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Placivo AI Official Certificate - ${userName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400&family=Cinzel:wght@600;700;800;900&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0F172A;
      color: #0F172A;
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      overflow-x: hidden;
    }

    @keyframes gold-light-sweep {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes float-sparkle {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
      50% { transform: translateY(-12px) scale(1.3); opacity: 0.95; }
    }

    @keyframes rotate-rosette {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .cert-stage {
      perspective: 1200px;
      width: 100%;
      max-w: 1120px;
    }

    .cert-card {
      position: relative;
      background: linear-gradient(135deg, #E3EDF7 0%, #E0F2F1 45%, #FBEED0 85%, #F5D77F 100%);
      border: 4px solid #D4AF37;
      border-radius: 24px;
      padding: 16px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.3);
      transition: transform 0.15s ease-out, box-shadow 0.3s ease;
      transform-style: preserve-3d;
      overflow: hidden;
    }

    .glare-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 30;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(212,175,55,0.15) 35%, transparent 70%);
      mix-blend-mode: overlay;
      opacity: 0.8;
    }

    .inner-frame {
      border: 2px solid #D4AF37;
      border-radius: 16px;
      padding: 20px;
      background: linear-gradient(135deg, rgba(227,237,247,0.92) 0%, rgba(224,242,241,0.88) 50%, rgba(251,238,208,0.92) 100%);
      position: relative;
      z-index: 10;
    }

    .micro-text {
      font-size: 7px;
      font-family: monospace;
      font-weight: 800;
      color: #997517;
      letter-spacing: 0.25em;
      text-align: center;
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #F3E5AB;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }

    .honors-badge {
      background: #FFFDF0;
      color: #8A640F;
      border: 1px solid #D4AF37;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
    }

    .brand-title {
      font-family: 'Cinzel', serif;
      font-size: 26px;
      font-weight: 900;
      color: #0B1A3A;
      text-align: center;
      text-transform: uppercase;
    }

    .brand-title span { color: #D4AF37; }

    .cert-title {
      font-family: 'Cinzel', 'Playfair Display', serif;
      font-size: 34px;
      font-weight: 900;
      color: #0B1A3A;
      text-align: center;
      text-transform: uppercase;
      margin: 8px 0;
    }

    .recipient-name {
      font-family: 'Great Vibes', cursive, serif;
      font-size: 52px;
      color: #0B1A3A;
      text-align: center;
      margin: 10px 0;
    }

    .course-box {
      background: linear-gradient(135deg, #E3EDF7, #FBEED0, #E0F2F1);
      border: 2px solid #D4AF37;
      border-radius: 16px;
      padding: 14px;
      text-align: center;
      max-width: 750px;
      margin: 16px auto;
    }

    .course-title {
      font-size: 22px;
      font-weight: 900;
      color: #1E3A8A;
    }

    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2px solid #F3E5AB;
      padding-top: 16px;
      margin-top: 16px;
    }

    .signature-name {
      font-family: 'Great Vibes', cursive, serif;
      font-size: 36px;
      color: #0B1A3A;
      transform: rotate(-4deg);
    }

    .rosette-bg {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.12;
      pointer-events: none;
    }

    .sparkle {
      position: absolute;
      color: #D4AF37;
      font-size: 14px;
      animation: float-sparkle 3s infinite ease-in-out;
    }
  </style>
</head>
<body>

  <div style="color: white; margin-bottom: 16px; text-align: center;">
    <h2 style="font-size: 18px; font-weight: 800; color: #F2C94C;">✨ Interactive 3D Offline Certificate</h2>
    <p style="font-size: 12px; color: #94A3B8;">Hover over the certificate to view real-time 3D tilt physics and specular gold reflections!</p>
  </div>

  <div class="cert-stage">
    <div class="cert-card" id="interactiveCertCard">
      <div class="glare-overlay" id="glareOverlay"></div>

      <!-- Rosette Background -->
      <div class="rosette-bg">
        <svg width="500" height="500" viewBox="0 0 200 200" style="animation: rotate-rosette 90s linear infinite;">
          <circle cx="100" cy="100" r="85" stroke="#D4AF37" stroke-width="0.8" stroke-dasharray="2,2"/>
          <circle cx="100" cy="100" r="70" stroke="#D4AF37" stroke-width="0.6"/>
          ${[0, 30, 60, 90, 120, 150].map(a => `<ellipse cx="100" cy="100" rx="65" ry="22" stroke="#D4AF37" stroke-width="0.4" transform="rotate(${a} 100 100)"/>`).join('')}
        </svg>
      </div>

      <!-- Sparkles -->
      <div class="sparkle" style="top: 12%; left: 10%; animation-delay: 0s;">★</div>
      <div class="sparkle" style="top: 20%; left: 88%; animation-delay: 1s;">★</div>
      <div class="sparkle" style="top: 80%; left: 15%; animation-delay: 2s;">★</div>
      <div class="sparkle" style="top: 85%; left: 82%; animation-delay: 1.5s;">★</div>

      <div class="inner-frame">
        <div class="micro-text">PLACIVO AI ACADEMY • IMMUTABLE CREDENTIAL RECORD • VERIFIED AUTHENTICITY •</div>

        <div class="header-bar">
          <div class="honors-badge">👑 Honors Distinction • Top 1% Performer</div>
          <div class="brand-title">Placivo <span>AI</span> Academy</div>
          <div style="background: #0B1A3A; color: white; padding: 6px 12px; border-radius: 10px; font-size: 11px; font-family: monospace; border: 1px solid #D4AF37;">
            ID: ${certificateId}
          </div>
        </div>

        <div style="text-align: center;">
          <div style="color: #D4AF37; font-size: 10px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase;">★ Official Academic Credential ★</div>
          <h1 class="cert-title">Certificate of Completion</h1>
          <p style="font-style: italic; color: #475569; font-size: 14px; margin-top: 6px;">This credential is proudly awarded and presented to</p>
          <div class="recipient-name">${userName}</div>
          <p style="font-style: italic; color: #475569; font-size: 14px;">in recognition of outstanding academic mastery and coding benchmarks for</p>
        </div>

        <div class="course-box">
          <div style="font-size: 9px; font-weight: 800; color: #D4AF37; text-transform: uppercase; letter-spacing: 0.2em;">Certified Engineering Program</div>
          <div class="course-title">${courseTitle}</div>
        </div>

        <div class="footer-bar">
          <div>
            <div style="font-size: 9px; color: #64748B; font-weight: 800; text-transform: uppercase;">Date Issued</div>
            <div style="font-size: 12px; font-weight: 800; color: #0B1A3A; background: #FFFDF0; padding: 4px 10px; border-radius: 8px; border: 1px solid #F3E5AB;">
              ${issuedAt}
            </div>
          </div>

          <div style="text-align: center;">
            <div style="width: 70px; height: 70px; border-radius: 50%; background: radial-gradient(circle, #FFFDF0, #FAD86B, #8A640F); border: 2px solid #D4AF37; display: flex; align-items: center; justify-content: center; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
              <span style="font-family: 'Cinzel', serif; font-size: 9px; font-weight: 900; color: #0B1A3A; text-align: center;">PLACIVO<br>SEAL</span>
            </div>
            <span style="font-size: 8px; font-weight: 900; color: #D4AF37; letter-spacing: 0.1em; display: block; margin-top: 4px;">OFFICIAL SEAL</span>
          </div>

          <div style="text-align: center;">
            <div class="signature-name">Naman Pandey</div>
            <div style="font-size: 11px; font-weight: 800; color: #0B1A3A;">Naman Pandey</div>
            <div style="font-size: 9px; font-weight: 800; color: #D4AF37; text-transform: uppercase;">Founder & CEO, Placivo</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const card = document.getElementById('interactiveCertCard');
    const glare = document.getElementById('glareOverlay');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = -((y - centerY) / centerY) * 8;
      const rotY = ((x - centerX) / centerX) * 8;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      card.style.transform = \`rotateX(\${rotX}deg) rotateY(\${rotY}deg) scale(1.02)\`;
      glare.style.background = \`radial-gradient(circle at \${glareX}% \${glareY}%, rgba(255,255,255,0.5) 0%, rgba(212,175,55,0.2) 35%, transparent 70%)\`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      glare.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)';
    });
  </script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Placivo_3D_Interactive_Certificate_${userName.replace(/\s+/g, '_')}_${certificateId}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Error exporting HTML cert:", e);
      alert("Failed to export HTML certificate.");
    } finally {
      setIsDownloadingHTML(false);
    }
  };

  // 2. Export Animated Vector SVG Certificate (Plays keyframe animations in any SVG viewer!)
  const handleDownloadSVG = () => {
    setIsDownloadingSVG(true);
    try {
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 700" width="1100" height="700">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&amp;family=Playfair+Display:wght@700;900&amp;family=Cinzel:wght@700;900&amp;display=swap');

      @keyframes goldSweep {
        0% { stop-color: #FFFDF0; }
        50% { stop-color: #FCD34D; }
        100% { stop-color: #FFFDF0; }
      }

      @keyframes rosetteSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes particlePulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.4); }
      }

      .animated-gold { animation: goldSweep 4s infinite ease-in-out; }
      .spinning-rosette { transform-origin: 550px 350px; animation: rosetteSpin 80s linear infinite; }
      .pulsing-star { animation: particlePulse 3s infinite ease-in-out; }
      
      .title-font { font-family: 'Cinzel', serif; font-weight: 900; }
      .name-font { font-family: 'Great Vibes', cursive, serif; }
      .serif-font { font-family: 'Playfair Display', serif; }
    </style>

    <linearGradient id="goldGradSVG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF0" />
      <stop offset="35%" stop-color="#FAD86B" class="animated-gold" />
      <stop offset="70%" stop-color="#C2921D" />
      <stop offset="100%" stop-color="#6E4D05" />
    </linearGradient>

    <linearGradient id="bgGradSVG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E3EDF7" />
      <stop offset="50%" stop-color="#E0F2F1" />
      <stop offset="100%" stop-color="#FBEED0" />
    </linearGradient>
  </defs>

  <!-- Outer Border Frame -->
  <rect x="10" y="10" width="1080" height="680" rx="24" fill="url(#bgGradSVG)" stroke="url(#goldGradSVG)" stroke-width="8"/>
  <rect x="25" y="25" width="1050" height="650" rx="16" fill="url(#bgGradSVG)" fill-opacity="0.9" stroke="url(#goldGradSVG)" stroke-width="3"/>

  <!-- Rotating Rosette Background -->
  <g class="spinning-rosette" opacity="0.12">
    <circle cx="550" cy="350" r="220" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>
    <circle cx="550" cy="350" r="180" stroke="#D4AF37" stroke-width="1" fill="none"/>
    ${[0, 20, 40, 60, 80, 100, 120, 140, 160].map(a => `<ellipse cx="550" cy="350" rx="180" ry="60" stroke="#D4AF37" stroke-width="0.8" fill="none" transform="rotate(${a} 550 350)"/>`).join('')}
  </g>

  <!-- Pulsing Sparkle Stars -->
  <text x="120" y="100" fill="#D4AF37" font-size="20" class="pulsing-star">★</text>
  <text x="980" y="120" fill="#D4AF37" font-size="24" class="pulsing-star" style="animation-delay: 1s;">★</text>
  <text x="150" y="600" fill="#D4AF37" font-size="22" class="pulsing-star" style="animation-delay: 2s;">★</text>
  <text x="950" y="580" fill="#D4AF37" font-size="26" class="pulsing-star" style="animation-delay: 1.5s;">★</text>

  <!-- Header -->
  <text x="550" y="70" fill="#997517" font-size="10" font-family="monospace" font-weight="bold" letter-spacing="4" text-anchor="middle">
    PLACIVO AI ACADEMY • OFFICIAL IMMUTABLE CERTIFICATE RECORD
  </text>

  <text x="550" y="120" fill="#0B1A3A" font-size="32" class="title-font" text-anchor="middle">
    PLACIVO <tspan fill="#D4AF37">AI</tspan> ACADEMY
  </text>

  <text x="550" y="150" fill="#D4AF37" font-size="12" font-family="sans-serif" font-weight="bold" letter-spacing="3" text-anchor="middle">
    ★ OFFICIAL ACADEMIC CREDENTIAL OF ENGINEERING ACHIEVEMENT ★
  </text>

  <text x="550" y="210" fill="#0B1A3A" font-size="38" class="title-font" text-anchor="middle">
    Certificate of Completion
  </text>

  <text x="550" y="255" fill="#475569" font-size="16" class="serif-font" font-style="italic" text-anchor="middle">
    This credential is proudly awarded and presented to
  </text>

  <!-- Recipient Name -->
  <text x="550" y="325" fill="#0B1A3A" font-size="64" class="name-font" text-anchor="middle">
    ${userName}
  </text>

  <text x="550" y="375" fill="#475569" font-size="15" class="serif-font" font-style="italic" text-anchor="middle">
    in recognition of outstanding academic mastery and practical coding benchmarks for
  </text>

  <!-- Course Title Box -->
  <rect x="200" y="405" width="700" height="75" rx="16" fill="url(#bgGradSVG)" stroke="url(#goldGradSVG)" stroke-width="2"/>
  <text x="550" y="425" fill="#D4AF37" font-size="10" font-family="sans-serif" font-weight="bold" letter-spacing="2" text-anchor="middle">CERTIFIED ENGINEERING PROGRAM</text>
  <text x="550" y="455" fill="#1E3A8A" font-size="22" class="title-font" text-anchor="middle">${courseTitle}</text>

  <!-- Footer -->
  <text x="120" y="550" fill="#64748B" font-size="10" font-family="sans-serif" font-weight="bold" letter-spacing="2">DATE ISSUED</text>
  <rect x="120" y="560" width="130" height="30" rx="8" fill="#FFFDF0" stroke="#D4AF37" stroke-width="1"/>
  <text x="185" y="580" fill="#0B1A3A" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">${issuedAt}</text>

  <!-- 3D Seal -->
  <circle cx="550" cy="570" r="42" fill="url(#goldGradSVG)" stroke="#3B2900" stroke-width="2"/>
  <circle cx="550" cy="570" r="32" fill="#0B1A3A" stroke="#D4AF37" stroke-width="1.5"/>
  <text x="550" y="566" fill="#FAD86B" font-size="9" class="title-font" text-anchor="middle">PLACIVO</text>
  <text x="550" y="578" fill="#FFFDF0" font-size="8" class="title-font" text-anchor="middle">SEAL</text>

  <!-- Signature -->
  <text x="950" y="555" fill="#0B1A3A" font-size="36" class="name-font" text-anchor="middle">Naman Pandey</text>
  <line x1="870" y1="565" x2="1030" y2="565" stroke="#0B1A3A" stroke-width="1.5"/>
  <text x="950" y="582" fill="#0B1A3A" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Naman Pandey</text>
  <text x="950" y="596" fill="#D4AF37" font-size="10" font-family="sans-serif" font-weight="bold" letter-spacing="1" text-anchor="middle">FOUNDER &amp; CEO, PLACIVO</text>
</svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Placivo_Animated_Certificate_${userName.replace(/\s+/g, '_')}_${certificateId}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Error exporting SVG cert:", e);
      alert("Failed to export SVG certificate.");
    } finally {
      setIsDownloadingSVG(false);
    }
  };

  // 3. Download High-Res PNG Image
  const handleDownloadImage = async () => {
    if (!certificateRef.current) return;
    setIsDownloadingImage(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: 1280,
        backgroundColor: null,
        onclone: (clonedDoc) => {
          sanitizeDocumentForHtml2Canvas(clonedDoc, `cert_node_${certificateId}`);
          const elem = clonedDoc.getElementById(`cert_node_${certificateId}`);
          if (elem) {
            elem.style.transform = 'none';
            elem.style.perspective = 'none';
          }
        }
      });
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `Placivo_Certificate_3D_${userName.replace(/\s+/g, '_')}_${certificateId}.png`;
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

  // 4. Download PDF
  const handleDownloadPDF = async () => {
    setIsDownloadingPDF(true);
    try {
      await exportCanvasToPDF(`cert_node_${certificateId}`, `Placivo_Certificate_${userName.replace(/\s+/g, '_')}_${certificateId}.pdf`);
    } catch (e) {
      console.error("Error generating certificate PDF:", e);
      alert("Failed to download PDF certificate. Please try again.");
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(verificationUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="space-y-6 w-full font-sans">
      
      {/* Top Action & Downloads Toolbar */}
      {showActions && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-800/80 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Status & Verification Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
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

          {/* Action Buttons Toolbar with 3D / Animated Export Options */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            
            {/* Toggle 3D Physics */}
            <button
              onClick={() => setEnable3d(!enable3d)}
              className={`px-3 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                enable3d 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm' 
                  : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:text-white'
              }`}
              title="Toggle Live 3D Tilt & Hologram Effect"
            >
              <Move3d className="w-3.5 h-3.5 text-amber-400" />
              <span>3D Motion: {enable3d ? 'ON' : 'OFF'}</span>
            </button>

            {/* Standalone Interactive 3D HTML Export */}
            <button
              onClick={handleDownloadHTML}
              disabled={isDownloadingHTML}
              className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 disabled:opacity-60 text-white text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-md border border-blue-400/30"
              title="Download Standalone 3D Interactive HTML File (Works Offline with Motion & Animations!)"
            >
              {isDownloadingHTML ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Code2 className="w-4 h-4 text-blue-200" />
              )}
              <span>{isDownloadingHTML ? 'Building HTML...' : '3D Interactive HTML'}</span>
            </button>

            {/* Animated Vector SVG Export */}
            <button
              onClick={handleDownloadSVG}
              disabled={isDownloadingSVG}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-60 text-white text-xs font-black flex items-center gap-2 transition-all cursor-pointer border border-slate-700/60 shadow-sm"
              title="Download Animated Vector SVG (Plays keyframe animations in any browser/viewer!)"
            >
              {isDownloadingSVG ? (
                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Crown className="w-4 h-4 text-amber-400" />
              )}
              <span>{isDownloadingSVG ? 'Generating...' : 'Animated SVG'}</span>
            </button>

            {/* High-Res PNG */}
            <button
              onClick={handleDownloadImage}
              disabled={isDownloadingImage}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-60 text-white text-xs font-black flex items-center gap-2 transition-all cursor-pointer border border-slate-700/60 shadow-sm"
              title="Download High Resolution 3D PNG"
            >
              {isDownloadingImage ? (
                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4 text-amber-400" />
              )}
              <span>{isDownloadingImage ? 'Rendering...' : 'PNG Image'}</span>
            </button>

            {/* Print-Ready PDF */}
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloadingPDF}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 active:scale-95 disabled:opacity-60 text-slate-950 text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              title="Download Print-Ready PDF"
            >
              {isDownloadingPDF ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Award className="w-4 h-4 text-slate-950" />
              )}
              <span>{isDownloadingPDF ? 'Exporting...' : 'PDF Print'}</span>
            </button>

            {/* Share Link */}
            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white text-xs font-black flex items-center gap-2 transition-all cursor-pointer border border-slate-700/60 shadow-sm"
              title="Copy Shareable Verification URL"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-sky-400" />}
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3D PERSPECTIVE WRAPPER STAGE */}
      <div 
        className="w-full flex justify-center py-2"
        style={{ perspective: '1200px' }}
      >
        {/* MAIN CERTIFICATE CANVAS CARD: Light, Pristine Ivory Canvas with 24k Gold Bevel & 3D Tilt Physics */}
        <div
          id={`cert_node_${certificateId}`}
          ref={certificateRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden rounded-3xl text-slate-900 border-4 border-[#D4AF37] shadow-2xl font-sans select-none max-w-[1150px] mx-auto w-full transition-all duration-200 ease-out p-3 sm:p-6"
          style={{
            background: 'linear-gradient(to bottom right, #E3EDF7 0%, #E0F2F1 45%, #FBEED0 85%, #F5D77F 100%)',
            animation: 'gold-metallic-glow 4s infinite ease-in-out',
            transform: enable3d 
              ? `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(1.01, 1.01, 1.01)` 
              : 'none',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Interactive Specular Light Specular Reflection Overlay */}
          {enable3d && (
            <div 
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.5) 0%, rgba(252, 211, 77, 0.2) 35%, transparent 70%)`,
                mixBlendMode: 'overlay'
              }}
            />
          )}

          {/* Animated Floating Gold Sparkles Layer */}
          <FloatingSparklesLayer />

          {/* Central Watermark Security Rosette */}
          <SecurityGuillocheSVG />

          {/* Outer Double Gold Border Frame on White Parchment */}
          <div 
            className="relative inset-0 border-2 border-[#D4AF37] rounded-2xl p-3 sm:p-5 backdrop-blur-xs shadow-inner"
            style={{
              background: 'linear-gradient(to bottom right, rgba(227, 237, 247, 0.92) 0%, rgba(224, 242, 241, 0.88) 45%, rgba(251, 238, 208, 0.92) 100%)'
            }}
          >
            <div className="border-2 border-[#C5A059]/60 rounded-xl p-3 sm:p-6 relative space-y-4 sm:space-y-5">
              
              {/* Microtext Security Line along Inner Border */}
              <div className="absolute top-[8px] sm:top-[14px] left-8 right-8 text-[7px] sm:text-[8px] font-mono font-bold text-[#997517] tracking-[0.25em] text-center overflow-hidden whitespace-nowrap uppercase pointer-events-none leading-none">
                PLACIVO AI ACADEMY • IMMUTABLE CREDENTIAL RECORD • VERIFIED AUTHENTICITY • FIRESTORE SECURITY PROOF •
              </div>

              {/* 4 Corner Ornaments */}
              <CornerFiligreeSVG position="top-left" />
              <CornerFiligreeSVG position="top-right" />
              <CornerFiligreeSVG position="bottom-left" />
              <CornerFiligreeSVG position="bottom-right" />

              {/* TOP BAR: Honors Distinction Pill, Brand Emblem with Laurels & Security Badge */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b-2 border-amber-200/80 pb-3 pt-2 px-2">
                
                {/* Honors Badge / Academic Rank */}
                <div className="bg-[#FBEED0]/90 text-[#8A640F] px-3.5 py-1.5 rounded-xl border border-[#D4AF37]/70 shadow-2xs flex items-center gap-1.5 shrink-0">
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
                      Placivo <span className="text-[#D4AF37] text-xl sm:text-3xl">AI</span> Academy
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.25em]">
                      Board of Engineering Accreditation & Skill Assessment
                    </div>
                  </div>
                  <div className="transform scale-x-[-1]">
                    <GoldenLaurelWreathSVG />
                  </div>
                </div>

                {/* Certificate ID Badge */}
                <div 
                  className="text-[#8A640F] px-3.5 py-1.5 rounded-xl border border-[#D4AF37] shadow-md flex items-center gap-2 shrink-0"
                  style={{
                    background: 'linear-gradient(to right, #FBEED0, #E0F2F1, #E3EDF7)'
                  }}
                >
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/20" />
                  <div className="text-right">
                    <div className="text-[8px] uppercase tracking-widest text-[#997517] font-extrabold">Certificate ID</div>
                    <div className="text-xs font-mono font-black text-[#0B1A3A]">{certificateId}</div>
                  </div>
                </div>

              </div>

              {/* MAIN DIPLOMA HEADER */}
              <div className="text-center space-y-1 pt-1">
                <div className="text-[#D4AF37] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                  <span>★</span>
                  <span>Official Academic Credential of Engineering Achievement</span>
                  <span>★</span>
                </div>
                <h1 
                  className="text-2xl sm:text-4xl md:text-4xl font-black text-[#0B1A3A] tracking-wider uppercase drop-shadow-2xs"
                  style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                >
                  Certificate of Completion
                </h1>
                <div 
                  className="w-56 h-0.5 mx-auto"
                  style={{
                    background: 'linear-gradient(to right, transparent, #D4AF37, transparent)'
                  }}
                />
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
                    <span className="text-amber-500">★</span>
                    <div 
                      className="w-24 sm:w-56 h-0.5"
                      style={{
                        background: 'linear-gradient(to right, transparent, #D4AF37, transparent)'
                      }}
                    />
                    <span className="text-amber-500">★</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-serif italic text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  in recognition of outstanding academic mastery, practical coding benchmarks, and capstone engineering evaluations for
                </p>
              </div>

              {/* COURSE TITLE BOX */}
              <div className="max-w-3xl mx-auto text-center">
                <div 
                  className="p-3 sm:p-4 rounded-2xl border-2 border-[#D4AF37]/90 shadow-sm relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(to right, rgba(227, 237, 247, 0.9) 0%, rgba(251, 238, 208, 0.8) 50%, rgba(224, 242, 241, 0.9) 100%)'
                  }}
                >
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-amber-200/40 rounded-full blur-xl pointer-events-none" />
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#997517] mb-0.5">
                    Certified Engineering Program
                  </div>
                  <h3 className="text-base sm:text-2xl md:text-2xl font-black text-[#1E3A8A] tracking-tight leading-snug">
                    {courseTitle}
                  </h3>
                </div>
              </div>

              {/* FOOTER: Date, 3D Gold Ribbon Seal, Sole Founder Signature & Live QR Code */}
              <div className="pt-3 border-t-2 border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
                
                {/* Date Issued */}
                <div className="text-center sm:text-left space-y-1">
                  <div className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Date Issued</div>
                  <div className="text-xs font-black text-[#0B1A3A] bg-[#FBEED0]/95 px-3.5 py-1.5 rounded-xl border border-amber-300/80 inline-block shadow-2xs">
                    {issuedAt}
                  </div>
                </div>

                {/* 3D Metallic Gold Seal */}
                <div className="flex flex-col items-center">
                  <GoldRibbonSealSVG />
                  <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-widest mt-1">
                    OFFICIAL ACADEMY SEAL
                  </span>
                </div>

                {/* Sole Founder Signature Block (Naman Pandey) */}
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
                  <div className="text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-widest">Founder & CEO, Placivo</div>
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
      </div>

      {/* Comprehensive Academic Credential Breakdown & Verification Summary */}
      <div className="bg-slate-900 border border-slate-800/90 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
        
        {/* Header Title & Academic Distinction */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Verified Academic Credential Record
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{courseTitle}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Official certification issued by Placivo AI Academy & Board of Engineering Accreditation.
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
