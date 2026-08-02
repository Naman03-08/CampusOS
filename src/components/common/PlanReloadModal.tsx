import React, { useState, useEffect } from 'react';
import { CheckCircle2, RefreshCw, ShieldCheck, Clock, Sparkles, Crown, Zap, Rocket, Star } from 'lucide-react';

interface PlanReloadModalProps {
  isOpen: boolean;
  planName: string;
  onReloadNow?: () => void;
}

export const PlanReloadModal: React.FC<PlanReloadModalProps> = ({
  isOpen,
  planName,
  onReloadNow
}) => {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(10);
      return;
    }

    setSecondsLeft(10);
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onReloadNow) {
            onReloadNow();
          } else {
            window.location.reload();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onReloadNow]);

  if (!isOpen) return null;

  const progressPercentage = ((10 - secondsLeft) / 10) * 100;

  const handleManualReload = () => {
    if (onReloadNow) {
      onReloadNow();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Ambient Floating 2D/3D Light Glow Orbs in Background */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl animate-pulse pointer-events-none delay-700" />
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-emerald-300/25 rounded-full blur-3xl animate-pulse pointer-events-none delay-1000" />

      {/* Main 3D Container Box */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-white via-slate-50/90 to-blue-50/50 rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(59,130,246,0.3)] border-2 border-white/90 overflow-hidden text-slate-800 animate-in zoom-in-95 duration-300 transition-all">
        
        {/* Top Floating 3D Sparkle Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white overflow-hidden shadow-lg shadow-blue-500/20">
          
          {/* Subtle 2D Decorative Light Grids & Waves */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-300/30 rounded-full blur-2xl pointer-events-none" />
          
          {/* Floating Light Confetti & Star Accents */}
          <Sparkles className="absolute top-3 right-5 w-5 h-5 text-yellow-200/80 animate-bounce delay-150" />
          <Star className="absolute bottom-3 left-8 w-4 h-4 text-emerald-200/80 animate-pulse delay-300" />
          <Zap className="absolute top-4 left-1/2 w-4 h-4 text-amber-200/60 animate-ping delay-500" />

          <div className="flex items-center gap-4 relative z-10">
            {/* 3D Elevated Shield/Badge */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 blur-sm opacity-80 group-hover:opacity-100 transition duration-300 animate-pulse" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 ring-4 ring-white/80 shrink-0 transform hover:scale-105 transition-transform duration-300">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-emerald-100 border border-white/30 shadow-2xs">
                <Sparkles className="w-3.0 h-3.0 text-amber-300" />
                <span>Instant Provision Confirmed</span>
              </div>
              <h2 className="text-xl font-black text-white mt-1 tracking-tight drop-shadow-xs">
                Plan Purchased & Activated!
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-7 space-y-6 text-center">
          
          {/* 3D Elevated Active Plan Badge Box */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white border-2 border-blue-200/80 shadow-[0_8px_20px_rgba(59,130,246,0.08)] transform hover:-translate-y-0.5 transition-all space-y-1 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />
            <p className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider flex items-center justify-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>Your Account Is Now Upgraded To:</span>
            </p>
            <p className="text-xl font-black text-blue-950 flex items-center justify-center gap-2 tracking-tight">
              <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
              <span className="bg-gradient-to-r from-blue-700 via-indigo-800 to-sky-700 bg-clip-text text-transparent">{planName}</span>
            </p>
          </div>

          {/* 3D Radial Countdown Timer display */}
          <div className="space-y-4 py-1">
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center group">
              
              {/* Glowing Outer 2D Ambient Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-sky-400/20 blur-md animate-pulse" />
              
              {/* Outer Decorative Dashed Rotating Ring */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] opacity-40">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  className="stroke-blue-400"
                  strokeWidth="1.5"
                  strokeDasharray="4,8"
                  fill="transparent"
                />
              </svg>

              {/* Main SVG Countdown Progress Ring */}
              <svg className="w-full h-full transform -rotate-90 relative z-10 drop-shadow-md">
                <defs>
                  <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                {/* Track Circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-slate-100"
                  strokeWidth="9"
                  fill="transparent"
                />

                {/* Progress Circle with Gradient */}
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="url(#timerGradient)"
                  strokeWidth="9"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={((100 - progressPercentage) / 100) * (2 * Math.PI * 52)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>

              {/* Counter Text Center Piece */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 tracking-tighter drop-shadow-2xs">
                  {secondsLeft}
                </span>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-0.5">
                  SECONDS
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                <span>Reloading & Syncing Workspace...</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
                Updating database permissions, syncing feature access, and initializing workspace capabilities for your plan.
              </p>
            </div>
          </div>

          {/* 3D Light Status Step Cards */}
          <div className="grid grid-cols-1 gap-2.5 text-left text-xs font-extrabold">
            <div className="p-3 rounded-2xl bg-white border border-emerald-200/80 shadow-[0_2px_8px_rgba(16,185,129,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-emerald-800">
                <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Plan subscription recorded in Firestore</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Synced
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-emerald-200/80 shadow-[0_2px_8px_rgba(16,185,129,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-emerald-800">
                <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <span>Module capabilities & usage limits unlocked</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Unlocked
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/80 border border-blue-200/80 shadow-[0_2px_8px_rgba(59,130,246,0.08)] flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2.5 text-blue-900">
                <div className="p-1.5 rounded-xl bg-blue-100 text-blue-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Auto-refreshes in {secondsLeft} seconds...</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-2xs">
                Active
              </span>
            </div>
          </div>

          {/* Tactile 3D Action Reload Button */}
          <button
            onClick={handleManualReload}
            className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <RefreshCw className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-500" />
            <span>Reload & Refresh Website Now</span>
            <Rocket className="w-4 h-4 text-sky-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Light Bottom Footer */}
        <div className="px-6 py-3 bg-gradient-to-r from-slate-100 via-blue-50/50 to-slate-100 border-t border-slate-200/60 text-center flex items-center justify-between text-[11px] font-extrabold text-slate-500">
          <span className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Placivo AI Sync Guarantee</span>
          </span>
          <span className="text-blue-600 font-bold">Auto-Sync Active</span>
        </div>

      </div>
    </div>
  );
};
