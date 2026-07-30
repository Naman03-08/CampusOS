import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Save, ShieldCheck, Database, Zap, Clock, Check, ArrowRight, Star, KeyRound, Lock, RefreshCw, CheckCircle2, ExternalLink } from 'lucide-react';
import { UserProfile } from '../../types';
import { StorageService } from '../../lib/storage';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { calculatePlanDetails, PLAN_DEFINITIONS } from '../../lib/planUtils';
import { auth } from '../../lib/firebase';
import { updatePassword, sendPasswordResetEmail } from 'firebase/auth';

interface SettingsViewProps {
  user: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenTerms?: (tab?: 'terms' | 'privacy' | 'cancellation') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onSaveProfile, onNavigateTab, onOpenTerms }) => {
  const [profile, setProfile] = useState<UserProfile>(user);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // OTP Password Reset States inside Settings
  const [otpStep, setOtpStep] = useState<0 | 1 | 2 | 3>(0); // 0: Idle/Initial, 1: OTP Sent, 2: OTP Verified (Enter New Pwd), 3: Reset Success
  const [otpCode, setOtpCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [devOtpNotice, setDevOtpNotice] = useState('');
  const [emailPreviewUrl, setEmailPreviewUrl] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const planDetails = calculatePlanDetails(user);
  const activePlanDef = PLAN_DEFINITIONS.find(p => p.id === planDetails.currentPlanId) || PLAN_DEFINITIONS[0];

  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveProfile(profile);
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Settings OTP Handler: Send OTP to User Email
  const handleSettingsSendOtp = async () => {
    if (!profile.email) {
      setOtpError('Student email address is missing.');
      return;
    }

    setOtpLoading(true);
    setOtpError('');
    setDevOtpNotice('');
    setEmailPreviewUrl(null);

    try {
      let fbNotice = '';
      if (auth) {
        try {
          await sendPasswordResetEmail(auth, profile.email.trim());
          console.log("[Firebase Auth] Password reset email sent directly to real email inbox:", profile.email.trim());
        } catch (fbErr: any) {
          console.warn("[Firebase Auth] Password reset email note:", fbErr);
          if (fbErr?.code === 'auth/user-not-found') {
            fbNotice = ' (Firebase Auth user account not found for this email, but 6-digit OTP code generated below).';
          }
        }
      }

      const res = await fetch('/api/auth/send-reset-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profile.email.trim() }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to send OTP code.');
      }

      setOtpStep(1);
      setResendCooldown(60);
      if (data.emailPreviewUrl) {
        setEmailPreviewUrl(data.emailPreviewUrl);
      }
      if (data.devOtp) {
        setDevOtpNotice(`Real email & 6-digit OTP code dispatched to ${profile.email.trim()}${fbNotice} (Dev OTP preview: ${data.devOtp}).`);
      } else {
        setDevOtpNotice(`Real email & 6-digit OTP code dispatched to ${profile.email.trim()}.${fbNotice}`);
      }
    } catch (err: any) {
      console.error("Settings OTP error:", err);
      setOtpError(err.message || 'Failed to issue OTP verification code.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Settings OTP Handler: Verify OTP
  const handleSettingsVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setOtpError('Please enter the 6-digit OTP code sent to your email.');
      return;
    }

    setOtpLoading(true);
    setOtpError('');

    try {
      const res = await fetch('/api/auth/verify-reset-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profile.email.trim(), otp: otpCode.trim() }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Invalid OTP code.');
      }

      setResetToken(data.resetToken);
      setOtpStep(2);
    } catch (err: any) {
      console.error("Settings verify OTP error:", err);
      setOtpError(err.message || 'OTP verification failed. Please check your code.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Settings OTP Handler: Set New Password
  const handleSettingsResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setOtpError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setOtpError('New passwords do not match. Please re-enter.');
      return;
    }

    setOtpLoading(true);
    setOtpError('');

    try {
      const res = await fetch('/api/auth/reset-password-with-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profile.email.trim(),
          resetToken,
          newPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to update password.');
      }

      // If user is currently signed in via Firebase Auth, update Firebase Auth Password
      if (auth && auth.currentUser) {
        try {
          await updatePassword(auth.currentUser, newPassword);
        } catch (e) {
          // ignore if re-auth required
        }
      }

      setOtpStep(3);
    } catch (err: any) {
      console.error("Settings reset password error:", err);
      setOtpError(err.message || 'Failed to update password.');
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="Student Account & Profile Settings"
        subtitle="Configure university background, target GPA, dream career role, subscription plan & cloud synchronization"
        purpose="This section is used to customize your student profile settings and review your active subscription plan status. Your target GPA and career goals customize the AI models across the study hub and placement interview prep."
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Stream / Major</label>
              <input
                type="text"
                value={profile.stream || profile.major || ''}
                onChange={(e) => setProfile({ ...profile, major: e.target.value, stream: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Details / Phone</label>
              <input
                type="tel"
                value={profile.contactDetails || profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, contactDetails: e.target.value, phone: e.target.value })}
                placeholder="+91 9876543210"
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

        <div className="pt-4 border-t border-slate-200 space-y-4">
          <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-blue-600" /> Account Security & Password Reset (OTP Verification)
          </h2>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-800">Verify Password Reset via 6-Digit Email OTP</p>
                <p className="text-[11px] text-slate-500">
                  Registered Email: <span className="font-mono font-bold text-slate-700">{profile.email || 'student@campus.edu'}</span>
                </p>
              </div>

              {otpStep === 0 && (
                <button
                  type="button"
                  onClick={handleSettingsSendOtp}
                  disabled={otpLoading}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
                >
                  {otpLoading ? (
                    <span>Issuing OTP...</span>
                  ) : (
                    <>
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Request 6-Digit OTP</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {otpError && (
              <div className="p-3 text-xs rounded-xl bg-red-50 text-red-600 border border-red-200 font-medium">
                {otpError}
              </div>
            )}

            {/* STEP 1: ENTER OTP CODE */}
            {otpStep === 1 && (
              <div className="space-y-3 pt-1">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-blue-600" /> 6-Digit OTP Code Sent to Email
                  </p>
                  <p className="text-[11px] text-blue-700">Check your email inbox or spam folder for the code.</p>
                </div>

                {devOtpNotice && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 font-medium space-y-1.5">
                    <p className="font-bold">{devOtpNotice}</p>
                    {emailPreviewUrl && (
                      <a
                        href={emailPreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-700 font-bold underline hover:text-blue-900 text-[11px]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Dispatched Email Preview in Ethereal Inbox</span>
                      </a>
                    )}
                  </div>
                )}

                <div className="max-w-xs space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 482915"
                    className="w-full px-3 py-2 text-center text-base font-mono font-black tracking-widest rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleSettingsVerifyOtp}
                    disabled={otpLoading}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    {otpLoading ? (
                      <span>Verifying...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verify OTP Code</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSettingsSendOtp}
                    disabled={resendCooldown > 0 || otpLoading}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 disabled:text-slate-400"
                  >
                    <RefreshCw className={`w-3 h-3 ${otpLoading ? 'animate-spin' : ''}`} />
                    <span>{resendCooldown > 0 ? `Resend (${resendCooldown}s)` : 'Resend OTP'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ENTER NEW PASSWORD */}
            {otpStep === 2 && (
              <div className="space-y-3 pt-1">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>OTP Code Verified! Enter your new password below.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                    <input
                      type="password"
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSettingsResetPassword}
                  disabled={otpLoading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  {otpLoading ? (
                    <span>Updating Password...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Update Password Now</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* STEP 3: RESET SUCCESS */}
            {otpStep === 3 && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-2">
                <p className="font-extrabold text-sm flex items-center gap-2 text-emerald-950">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Password Updated Successfully via OTP!
                </p>
                <p className="text-emerald-800">
                  Your student account password has been changed. You can use your new password next time you log in.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOtpStep(0);
                    setOtpCode('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-[11px]"
                >
                  Done
                </button>
              </div>
            )}
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

        {/* Legal & Compliance Section */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" /> Legal, Terms & Privacy Policy
          </h2>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-slate-900">Placivo AI Terms & Privacy Policies</p>
              <p className="text-slate-500 mt-0.5">Review our terms of service, acceptable use, and student data protection standards.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => onOpenTerms?.('terms')}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-blue-700 font-bold transition-all shadow-2xs"
              >
                Terms & Conditions
              </button>
              <button
                type="button"
                onClick={() => onOpenTerms?.('privacy')}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-purple-700 font-bold transition-all shadow-2xs"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => onOpenTerms?.('cancellation')}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-emerald-700 font-bold transition-all shadow-2xs"
              >
                Refund Policy
              </button>
            </div>
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
