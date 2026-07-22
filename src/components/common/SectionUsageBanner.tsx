import React from 'react';
import { Sparkles, CheckCircle2, Info } from 'lucide-react';

interface SectionUsageBannerProps {
  title: string;
  subtitle: string;
  purpose: string;
  keyFeatures: string[];
  icon: React.ReactNode;
  badge?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const SectionUsageBanner: React.FC<SectionUsageBannerProps> = ({
  title,
  subtitle,
  purpose,
  keyFeatures,
  icon,
  badge = 'Section Purpose & Usage Guide',
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50/90 via-indigo-50/70 to-purple-100/60 p-6 sm:p-7 shadow-sm border border-purple-200/80 mb-6">
      {/* Background Soft Purple Glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-4">
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20 shrink-0">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  {badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Purpose Callout Box */}
        <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-purple-200/70 text-xs leading-relaxed space-y-1.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-purple-800 font-extrabold uppercase tracking-wider text-[10px]">
            <Info className="w-3.5 h-3.5 text-purple-600" />
            <span>What is this section used for?</span>
          </div>
          <p className="text-slate-800 font-semibold text-xs sm:text-sm">
            {purpose}
          </p>
        </div>

        {/* Key Features Chips */}
        {keyFeatures.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-purple-800">
              Core Capabilities Available in this Section:
            </p>
            <div className="flex flex-wrap gap-2">
              {keyFeatures.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/90 border border-purple-200 text-purple-900 text-xs font-bold shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>{feature}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
