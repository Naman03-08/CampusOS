import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Save, ShieldCheck, Database, Key } from 'lucide-react';
import { UserProfile } from '../../types';
import { StorageService } from '../../lib/storage';
import { SectionUsageBanner } from '../common/SectionUsageBanner';

interface SettingsViewProps {
  user: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onSaveProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(user);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveProfile(profile);
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="Student Account & Profile Settings"
        subtitle="Configure university background, target GPA, dream career role & cloud database synchronization"
        purpose="This section is used to customize your student profile settings. Your target GPA and career goals (e.g. Software Engineer) customize the AI models across the study hub, assignment solver, and placement mock interviews."
        keyFeatures={[
          'University & Major Profile Management',
          'Target GPA & Dream Career Role Configuration',
          'Real-time Firestore Database Persistence',
          'Zero-Trust Security & Cloud Privacy Settings'
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
            Manage your university details, academic targets, career goals & cloud sync preferences.
          </p>
        </div>
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
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" /> Save Profile Changes
        </button>
      </form>
    </div>
  );
};
