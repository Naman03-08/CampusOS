import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, RefreshCw, ShieldCheck, Clock, Sparkles } from 'lucide-react';

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
          // Trigger website refresh
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-200/80 overflow-hidden text-slate-800 animate-in zoom-in-95 duration-300">
        
        {/* Top Celebration Header */}
        <div className="p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0 animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1 w-fit">
                <Sparkles className="w-3 h-3" />
                Plan Activation Confirmed
              </span>
              <h2 className="text-xl font-black text-white mt-1 leading-snug">
                Plan Purchased & Activated!
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-center">
          
          {/* Active Plan Badge Box */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-1">
            <p className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
              Your Account Plan Is Now Active:
            </p>
            <p className="text-lg font-black text-blue-900 flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>{planName}</span>
            </p>
          </div>

          {/* 10 Seconds Countdown Display */}
          <div className="space-y-3">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              {/* Circular Progress Ring Background */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className="stroke-blue-600 transition-all duration-1000 ease-linear"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={((100 - progressPercentage) / 100) * (2 * Math.PI * 48)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Counter Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {secondsLeft}
                </span>
                <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">
                  SECONDS
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center justify-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Reloading & Refreshing Website...</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed px-2">
                Updating database permissions, syncing feature limits, and initializing workspace capabilities for your active plan.
              </p>
            </div>
          </div>

          {/* Real-time Status Steps */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Plan subscription recorded in Firestore</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Module capabilities & usage limits unlocked</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700 font-bold animate-pulse">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Full website auto-refresh in {secondsLeft}s...</span>
            </div>
          </div>

          {/* Action Button: Instant Reload */}
          <button
            onClick={handleManualReload}
            className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-4 h-4 text-white" />
            <span>Reload & Refresh Website Now</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] font-medium text-slate-400">
            Placivo AI • Automatic Refresh Guarantee
          </p>
        </div>

      </div>
    </div>
  );
};
