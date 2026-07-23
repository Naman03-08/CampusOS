import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Download, 
  Share2, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { exportCanvasToPDF } from '../../lib/pdfExport';
import html2canvas from 'html2canvas';

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
  userEmail,
  courseTitle,
  issuedAt,
  userPlan = 'Pro Student',
  joinedAt,
  attendancePercentage = 92,
  totalClassesAttended = 46,
  totalClassesHeld = 50,
  dsaSolvedCount = 120,
  showActions = true,
  onVerifyClick
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  // Verification URL that will be encoded inside the QR code
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://campusos.com';
  const verificationUrl = `${origin}/?verifyCert=${certificateId}`;

  // Handle Download PNG Image
  const handleDownloadImage = async () => {
    if (!certificateRef.current) return;
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, // High DPI for crisp certificate print quality
        useCORS: true,
        logging: false,
        backgroundColor: '#FAF7F0'
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Certificate_${userName.replace(/\s+/g, '_')}_${certificateId}.png`;
      link.click();
    } catch (e) {
      console.error("Error generating certificate PNG:", e);
    }
  };

  // Handle Download PDF
  const handleDownloadPDF = async () => {
    try {
      await exportCanvasToPDF(`cert_node_${certificateId}`, `Certificate_${userName.replace(/\s+/g, '_')}_${certificateId}.pdf`);
    } catch (e) {
      console.error("Error generating certificate PDF:", e);
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
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Top action bar if enabled */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 text-white p-4 rounded-2xl shadow-md border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Verified Official Certificate • ID: <span className="font-mono text-white">{certificateId}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadImage}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Image</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span>Download PDF</span>
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

      {/* Main Certificate Frame (Exact reproduction of uploaded template) */}
      <div
        id={`cert_node_${certificateId}`}
        ref={certificateRef}
        className="relative overflow-hidden rounded-2xl bg-[#FAF7F0] text-slate-900 border-4 border-[#C5A059] shadow-2xl p-6 sm:p-10 md:p-12 font-serif select-none"
        style={{
          backgroundImage: 'radial-gradient(#e5decf 0.75px, transparent 0.75px)',
          backgroundSize: '16px 16px',
        }}
      >
        {/* Dark Navy Corner Accent Top-Left */}
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#0B192C] clip-path-triangle-tl pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-full h-full border-b-4 border-r-4 border-[#D4AF37] opacity-90" />
        </div>

        {/* Dark Navy Corner Accent Bottom-Right */}
        <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#0B192C] clip-path-triangle-br pointer-events-none z-10">
          <div className="absolute bottom-0 right-0 w-full h-full border-t-4 border-l-4 border-[#D4AF37] opacity-90" />
        </div>

        {/* Inner Gold Filigree Frame */}
        <div className="border-2 border-[#D4AF37] p-4 sm:p-8 rounded-xl relative z-20 bg-[#FAF7F0]/90 backdrop-blur-3xs">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E2D5B5] pb-6">
            
            {/* Top-Left: Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0B192C] border-2 border-[#D4AF37] flex items-center justify-center shadow-md">
                <span className="text-[#D4AF37] font-black text-xl font-sans tracking-tight">C•</span>
              </div>
              <div className="text-left font-sans">
                <div className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight leading-none">
                  Campus<span className="text-[#C5A059]">OS</span>
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-widest uppercase mt-1 flex items-center gap-1">
                  <span>Learn</span>
                  <span className="text-[#C5A059]">•</span>
                  <span>Build</span>
                  <span className="text-[#C5A059]">•</span>
                  <span>Achieve</span>
                </div>
              </div>
            </div>

            {/* Top-Right: Certificate ID */}
            <div className="text-center sm:text-right font-sans">
              <div className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">
                CERTIFICATE ID
              </div>
              <div className="text-sm sm:text-base font-black text-[#0B192C] font-mono tracking-wider mt-0.5">
                {certificateId}
              </div>
            </div>
          </div>

          {/* Center Main Certificate Title & Subtitle */}
          <div className="text-center my-8 sm:my-10 space-y-3">
            
            {/* Flourish Icon */}
            <div className="flex justify-center text-[#C5A059]">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#0B192C] tracking-[0.2em] font-serif leading-tight">
              CERTIFICATE
            </h1>

            <div className="flex items-center justify-center gap-4">
              <div className="h-0.5 w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <span className="text-[#C5A059] font-extrabold text-xs sm:text-sm uppercase tracking-[0.25em]">
                OF COMPLETION
              </span>
              <div className="h-0.5 w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            </div>

            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-600 pt-2">
              THIS CERTIFICATE IS PROUDLY PRESENTED TO
            </div>

            {/* Student Name */}
            <div className="py-2">
              <div className="text-3xl sm:text-5xl font-serif italic text-[#0B192C] font-bold tracking-wide drop-shadow-3xs inline-block border-b-2 border-[#C5A059]/40 pb-1 px-6">
                {userName}
              </div>
            </div>

            {/* Small Diamond Motif */}
            <div className="text-[#C5A059] text-xs font-bold">◇</div>

            {/* Course Name Statement */}
            <div className="space-y-1 max-w-2xl mx-auto pt-2">
              <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium">
                for successfully completing the
              </p>
              <h2 className="text-xl sm:text-3xl font-black text-[#0B192C] font-serif tracking-tight leading-snug">
                {courseTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-2 font-medium">
                An intensive learning journey powered by <span className="font-bold text-[#0B192C]">CampusOS</span>, recognizing your dedication, curiosity, and commitment to continuous growth.
              </p>
            </div>

          </div>

          {/* Middle Details Grid: Left Features, Right Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 pt-4 border-t border-[#E2D5B5]/60 font-sans">
            
            {/* Left Column: Feature Highlights */}
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2.5 font-bold">
                <div className="p-1.5 rounded-lg bg-[#C5A059]/15 text-[#C5A059]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Hands-on Learning</span>
              </div>
              <div className="flex items-center gap-2.5 font-bold">
                <div className="p-1.5 rounded-lg bg-[#C5A059]/15 text-[#C5A059]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span>Skill Development</span>
              </div>
              <div className="flex items-center gap-2.5 font-bold">
                <div className="p-1.5 rounded-lg bg-[#C5A059]/15 text-[#C5A059]">
                  <Users className="w-4 h-4" />
                </div>
                <span>Global Community</span>
              </div>
              <div className="flex items-center gap-2.5 font-bold">
                <div className="p-1.5 rounded-lg bg-[#C5A059]/15 text-[#C5A059]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span>Career Opportunities</span>
              </div>
            </div>

            {/* Right Column: Quote */}
            <div className="p-4 rounded-2xl bg-[#F5EFE0]/60 border border-[#E2D5B5] flex flex-col justify-center text-center space-y-1.5 relative">
              <span className="text-4xl text-[#0B192C] font-serif leading-none absolute top-2 left-3 opacity-30">“</span>
              <p className="text-xs sm:text-sm font-serif italic text-slate-800 font-semibold px-4 pt-2">
                Keep learning, keep building, keep growing.
              </p>
              <span className="text-[11px] font-extrabold text-[#C5A059] uppercase tracking-wider">
                — CampusOS
              </span>
            </div>

          </div>

          {/* Footer Section: Completion Date, Signature, Gold Seal, QR Code */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-center pt-6 border-t border-[#E2D5B5] font-sans">
            
            {/* Col 1: Completed On */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="p-2.5 rounded-2xl bg-[#0B192C] text-[#D4AF37] shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  COMPLETED ON
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#0B192C]">
                  {issuedAt}
                </div>
              </div>
            </div>

            {/* Col 2: Signature */}
            <div className="text-center space-y-1">
              <div className="text-2xl font-serif italic text-[#0B192C] font-bold tracking-wide">
                N Pandey
              </div>
              <div className="w-28 mx-auto border-b border-[#C5A059]" />
              <div className="text-xs font-black text-[#0B192C]">
                Naman Pandey
              </div>
              <div className="text-[10px] font-bold text-[#C5A059]">
                Founder, CampusOS
              </div>
            </div>

            {/* Col 3: Gold Medal Seal */}
            <div className="flex justify-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] p-1.5 shadow-xl flex items-center justify-center transform hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full border-2 border-dashed border-[#FAF7F0] flex flex-col items-center justify-center p-1 bg-[#0B192C] text-center text-white">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0B192C] font-black text-sm flex items-center justify-center mb-0.5">
                    C•
                  </div>
                  <div className="text-[8px] font-black text-[#D4AF37] uppercase tracking-tighter leading-none">
                    CAMPUSOS
                  </div>
                  <div className="text-[7px] text-white/80 font-bold uppercase tracking-tighter">
                    EMPOWERING LEARNERS
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4: QR Code & Verification */}
            <div className="flex items-center gap-3 justify-center sm:justify-end">
              <div className="p-1.5 bg-white border border-[#C5A059]/60 rounded-xl shadow-xs shrink-0">
                <QRCodeSVG
                  value={verificationUrl}
                  size={64}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <div className="text-left text-xs">
                <button
                  onClick={onVerifyClick}
                  className="font-black text-[#0B192C] hover:text-[#C5A059] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Verify Certificate</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  campusos.com/verify
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
