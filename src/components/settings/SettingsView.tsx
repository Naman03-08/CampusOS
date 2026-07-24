import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Save, ShieldCheck, Database, Zap, Clock, Check, ArrowRight, Star } from 'lucide-react';
import { UserProfile } from '../../types';
import { StorageService } from '../../lib/storage';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { calculatePlanDetails, PLAN_DEFINITIONS } from '../../lib/planUtils';

interface SettingsViewProps {
  user: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onNavigateTab?: (tab: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onSaveProfile, onNavigateTab }) => {
  const [profile, setProfile] = useState<UserProfile>(user);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const planDetails = calculatePlanDetails(user);
  const activePlanDef = PLAN_DEFINITIONS.find(p => p.id === planDetails.currentPlanId) || PLAN_DEFINITIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveProfile(profile);
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="Student Account & Profile Settings"
        subtitle="Configure university background, target GPA, dream career role, subscription plan & cloud synchronization"
        purpose="This section is used to customize your student profile settings and review your active subscription plan status. Your target GPA and career goals customize the AI models across the study hub, assignment solver, and placement mock interviews."
        keyFeatures={[
          'University & Major Profile Management',
          'Active Subscription Plan Status & Expiration Countdown',
          'Target GPA & Dream Career Role Configuration',
          'Real-time Firestore Database Persistence & Privacy'
        ]}
        icon={<SettingsIcon className="w-6 h-6 text-white" />}
        badge="Settings Purpose"
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900">Student Account & Settings</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage your university details, subscription plan, academic targets & cloud sync preferences.
          </p>
        </div>
      </div>

      {/* Active Subscription Plan Section (100% matched with Upgrade Plans) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wide">
                Account Subscription
              </span>
              {activePlanDef.popular && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-slate-950" /> Most Popular
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black tracking-tight">{activePlanDef.name}</h2>
            <p className="text-xs text-slate-300 font-medium">{activePlanDef.tagline}</p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              planDetails.isExpired 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
            }`}>
              {planDetails.isExpired ? 'Subscription Expired' : 'Active Plan'}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{planDetails.isExpired ? '0 Days Left (Action Required)' : `${planDetails.daysRemaining} Days Remaining`}</span>
            </div>
          </div>
        </div>

        {/* Start / Expiration Timing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan Duration Cycle</p>
            <p className="text-sm font-extrabold text-white mt-0.5">
              {planDetails.isFreeTrial ? '4-Day Free Trial (1x Lifetime)' : '30-Day Monthly Subscription'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Activated On</p>
            <p className="text-sm font-extrabold text-white mt-0.5">{planDetails.formattedStartedAt}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expires On</p>
            <p className="text-sm font-extrabold font-mono text-blue-300 mt-0.5">{planDetails.formattedExpiresAt}</p>
          </div>
        </div>

        {/* Plan Benefits Checklist */}
        <div className="space-y-2">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Plan Features & Privileges Included:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
            {activePlanDef.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade / Extend CTA */}
        {onNavigateTab && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigateTab('pricing')}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{planDetails.isExpired ? 'Upgrade Subscription Plan Now' : 'Manage & Upgrade Plans'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Profile settings updated successfully!</span>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" /> Personal & University Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Student Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University / College</label>
              <input
                type="text"
                value={profile.university}
                onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Major / Branch</label>
              <input
                type="text"
                value={profile.major}
                onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Academic Year</label>
              <input
                type="text"
                value={profile.year}
                onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Role / Career</label>
              <input
                type="text"
                value={profile.targetRole}
                onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-3">
          <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" /> Database & Cloud Persistence Status
          </h2>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Firestore & Local Backup Operational
            </p>
            <p className="text-slate-600">All user study suites, DSA progress & attendance records are stored with isolation.</p>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Profile Changes
        </button>
      </form>
    </div>
  );
};
