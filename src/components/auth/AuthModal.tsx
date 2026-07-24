import React, { useState } from 'react';
import { X, GraduationCap, Mail, Lock, User, ArrowRight, CheckCircle2, Phone, Building2, BookOpen, Sparkles } from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { UserProfile } from '../../types';
import { StorageService } from '../../lib/storage';
import { FirestoreService } from '../../lib/firestoreService';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'google-onboarding'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [university, setUniversity] = useState('');
  const [stream, setStream] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  // Hold Google Auth User credentials when completing Google onboarding
  const [googleAuthUser, setGoogleAuthUser] = useState<any>(null);

  const handleModalClose = async () => {
    // If student cancels/closes modal during onboarding or register without completing, sign out incomplete Auth user
    if (mode === 'google-onboarding' || mode === 'register') {
      if (auth && auth.currentUser) {
        try {
          await auth.signOut();
        } catch (e) {
          // ignore signout errors
        }
      }
    }
    onClose();
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (auth) {
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser = result.user;
        
        // Try fetching existing profile from Firestore
        let existingProfile = await FirestoreService.getProfile(fbUser.uid);

        // Check if existing profile is complete with contact details, university & stream
        if (
          existingProfile && 
          existingProfile.contactDetails && 
          existingProfile.university && 
          (existingProfile.stream || existingProfile.major)
        ) {
          StorageService.saveProfile(existingProfile);
          StorageService.setIsLoggedIn(true);
          onSuccess(existingProfile);
          return;
        }

        // Needs Google Onboarding form to fill contact, stream, university, name & email
        setGoogleAuthUser(fbUser);
        setDisplayName(fbUser.displayName || existingProfile?.displayName || '');
        setEmail(fbUser.email || existingProfile?.email || '');
        if (existingProfile?.university) setUniversity(existingProfile.university);
        if (existingProfile?.stream || existingProfile?.major) setStream(existingProfile.stream || existingProfile.major || '');
        if (existingProfile?.contactDetails || existingProfile?.phone) setContactDetails(existingProfile.contactDetails || existingProfile.phone || '');
        
        setMode('google-onboarding');
      } else {
        // Fallback local Google Auth prompt
        setGoogleAuthUser({
          uid: 'google_local_' + Date.now(),
          email: email || '',
          displayName: displayName || '',
        });
        setMode('google-onboarding');
      }
    } catch (err: any) {
      console.warn("Google Auth error:", err);
      if (err?.code === 'auth/unauthorized-domain' || err?.message?.includes('unauthorized-domain')) {
        setErrorMsg('UNAUTHORIZED_DOMAIN');
      } else {
        setErrorMsg(err.message || 'Google Auth Error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInstantGuestLogin = () => {
    const profile: UserProfile = {
      uid: 'guest_' + Date.now(),
      email: email || 'student@campus.edu',
      displayName: displayName || 'Student User',
      role: 'student',
      university: university || 'Campus University',
      major: stream || 'Computer Science',
      stream: stream || 'Computer Science',
      contactDetails: contactDetails || '+91 9876543210',
      phone: contactDetails || '+91 9876543210',
      year: '1st Year',
      gpaGoal: 3.9,
      targetRole: 'Software Engineer',
      createdAt: new Date().toISOString(),
    };
    StorageService.saveProfile(profile);
    StorageService.setIsLoggedIn(true);
    onSuccess(profile);
  };

  const handleGoogleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // STRICT VALIDATION: If any form field is missing, fail registration and do NOT store user in Firebase
    if (!displayName.trim() || !email.trim() || !university.trim() || !stream.trim() || !contactDetails.trim()) {
      setErrorMsg('Sign up failed: Please fill in all required form fields (Full Name, Email, University, Stream, and Contact Details).');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const uid = googleAuthUser?.uid || 'google_user_' + Date.now();
      const userEmail = googleAuthUser?.email || email;
      const userPhoto = googleAuthUser?.photoURL || undefined;

      let existingProfile = await FirestoreService.getProfile(uid);

      let profile: UserProfile;
      if (!existingProfile) {
        // Initialize user data with zero defaults & user details
        profile = await FirestoreService.initializeNewUserWithZeroData(uid, userEmail, displayName, {
          university,
          stream,
          contactDetails
        });
        profile.photoURL = userPhoto;
      } else {
        profile = {
          ...existingProfile,
          displayName: displayName || existingProfile.displayName,
          email: userEmail || existingProfile.email,
          university,
          major: stream,
          stream,
          contactDetails,
          phone: contactDetails,
          photoURL: userPhoto || existingProfile.photoURL,
        };
      }

      StorageService.saveProfile(profile);
      StorageService.setIsLoggedIn(true);
      await FirestoreService.saveProfile(profile);
      onSuccess(profile);
    } catch (err: any) {
      console.error("Google onboarding save error:", err);
      setErrorMsg('Sign up failed: ' + (err.message || 'Could not complete Google account registration.'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'google-onboarding') {
      return handleGoogleOnboardingSubmit(e);
    }

    setLoading(true);
    setErrorMsg('');

    try {
      if (mode === 'forgot') {
        if (auth) {
          await sendPasswordResetEmail(auth, email);
        }
        setResetSent(true);
        setLoading(false);
        return;
      }

      if (mode === 'login') {
        if (auth) {
          try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            let existingProfile = await FirestoreService.getProfile(res.user.uid);
            
            if (!existingProfile) {
              const init = StorageService.initializeZeroUserStorage(res.user.uid, res.user.email || email, res.user.displayName || email.split('@')[0], {
                university: university || 'Campus University',
                stream: stream || 'Computer Science',
                contactDetails: contactDetails || ''
              });
              existingProfile = await FirestoreService.initializeNewUserWithZeroData(res.user.uid, res.user.email || email, res.user.displayName || email.split('@')[0], {
                university: university || 'Campus University',
                stream: stream || 'Computer Science',
                contactDetails: contactDetails || ''
              });
            } else {
              StorageService.saveProfile(existingProfile);
            }

            StorageService.setIsLoggedIn(true);
            onSuccess(existingProfile);
            return;
          } catch (e: any) {
            console.warn("Firebase email login error:", e);
            setErrorMsg(e.message || 'Invalid email or password.');
            return;
          }
        }
        // Local fallback
        const init = StorageService.initializeZeroUserStorage('user_local_' + Date.now(), email || 'student@campus.edu', displayName || email.split('@')[0], {
          university,
          stream,
          contactDetails
        });
        StorageService.setIsLoggedIn(true);
        onSuccess(init.profile);
      } else {
        // Register New User - STRICT VALIDATION
        if (!displayName.trim() || !email.trim() || !password.trim() || !university.trim() || !stream.trim() || !contactDetails.trim()) {
          setErrorMsg('Sign up failed: Please fill in all required form fields (Full Name, Student Email, Password, University, Stream, and Contact Details).');
          setLoading(false);
          return;
        }

        if (auth) {
          try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const init = StorageService.initializeZeroUserStorage(res.user.uid, email, displayName, {
              university,
              stream,
              contactDetails
            });
            const profile = await FirestoreService.initializeNewUserWithZeroData(res.user.uid, email, displayName, {
              university,
              stream,
              contactDetails
            });

            StorageService.setIsLoggedIn(true);
            onSuccess(profile);
            return;
          } catch (e: any) {
            console.warn("Firebase registration error:", e);
            setErrorMsg('Sign up failed: ' + (e.message || 'Failed to create account in Firebase.'));
            return;
          }
        }
        const init = StorageService.initializeZeroUserStorage('user_' + Date.now(), email, displayName, {
          university,
          stream,
          contactDetails
        });
        StorageService.setIsLoggedIn(true);
        onSuccess(init.profile);
      }
    } catch (err: any) {
      setErrorMsg('Sign up failed: ' + (err.message || 'Authentication error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <GraduationCap className="w-4 h-4 text-blue-200" />
          </div>
          <span className="font-extrabold text-lg text-slate-900">CampusOS AI</span>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          {mode === 'login' && 'Welcome Back to CampusOS'}
          {mode === 'register' && 'Create Your Student Account'}
          {mode === 'google-onboarding' && 'Complete Your Student Profile'}
          {mode === 'forgot' && 'Reset Your Password'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          {mode === 'login' && 'Enter your student credentials to access your AI workspace.'}
          {mode === 'register' && 'Join thousands of students mastering academics & placements.'}
          {mode === 'google-onboarding' && 'Please fill in your academic & contact details to finish setting up your account.'}
          {mode === 'forgot' && 'We will send password reset instructions to your email.'}
        </p>

        {errorMsg && (
          errorMsg === 'UNAUTHORIZED_DOMAIN' || errorMsg.includes('unauthorized-domain') ? (
            <div className="p-3.5 mb-4 text-xs rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <span>⚠️ Firebase Domain Not Authorized</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-700">
                Firebase Project <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">campusos01</code> requires authorizing this preview URL domain in Firebase Console:
              </p>
              <div className="bg-amber-100/70 p-2 rounded-xl text-[10px] font-mono text-amber-900 break-all select-all">
                {typeof window !== 'undefined' ? window.location.hostname : 'aistudio.google.com'}
              </div>
              <p className="text-[10px] text-amber-600">
                Fix in Firebase Console: <b>Authentication</b> &rarr; <b>Settings</b> &rarr; <b>Authorized domains</b> &rarr; <b>Add domain</b>.
              </p>
              <button
                type="button"
                onClick={handleInstantGuestLogin}
                className="w-full mt-1 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Continue as Guest / Local Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-3 mb-4 text-xs rounded-xl bg-red-50 text-red-600 border border-red-200 font-medium flex flex-col gap-2">
              <span>{errorMsg}</span>
              <button
                type="button"
                onClick={handleInstantGuestLogin}
                className="self-start text-[11px] font-bold text-red-700 underline hover:text-red-900"
              >
                Or Continue with Guest Demo Mode
              </button>
            </div>
          )
        )}

        {resetSent ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-sm font-bold text-emerald-900">Password Reset Email Sent!</p>
            <p className="text-xs text-emerald-700">Check your inbox for further instructions.</p>
            <button
              onClick={() => setMode('login')}
              className="mt-3 px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 rounded-xl transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Show Google Auth Button ONLY if not in google-onboarding mode */}
            {mode !== 'google-onboarding' && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase my-2">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <span>Or email</span>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>
              </>
            )}

            {/* Google Onboarding Indicator Banner */}
            {mode === 'google-onboarding' && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4 text-blue-200" />
                </div>
                <div className="text-xs">
                  <p className="font-extrabold text-blue-900">Google Auth Verified</p>
                  <p className="text-[11px] text-blue-700">Please provide your university, stream & contact details.</p>
                </div>
              </div>
            )}

            {/* Full Name Field (In Register or Google Onboarding mode) */}
            {(mode === 'register' || mode === 'google-onboarding') && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            )}

            {/* University & Stream Grid (In Register or Google Onboarding mode) */}
            {(mode === 'register' || mode === 'google-onboarding') && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">University / College</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. IIT Bombay"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stream / Branch</label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Details / Phone Field (In Register or Google Onboarding mode) */}
            {(mode === 'register' || mode === 'google-onboarding') && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Details / Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={contactDetails}
                    onChange={(e) => setContactDetails(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Student Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@campus.edu"
                  readOnly={mode === 'google-onboarding' && !!googleAuthUser?.email}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    mode === 'google-onboarding' && !!googleAuthUser?.email ? 'bg-slate-100 text-slate-600 font-semibold cursor-not-allowed' : 'bg-slate-50'
                  }`}
                />
              </div>
            </div>

            {/* Password Field (Not required in forgot or google-onboarding mode) */}
            {mode !== 'forgot' && mode !== 'google-onboarding' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] font-semibold text-blue-600 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all mt-2"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'Sign In To CampusOS'}
                    {mode === 'register' && 'Create Account'}
                    {mode === 'google-onboarding' && 'Complete Registration'}
                    {mode === 'forgot' && 'Send Reset Email'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Mode Switcher */}
            <div className="pt-2 text-center text-xs text-slate-500 font-medium">
              {mode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Sign Up Free
                  </button>
                </span>
              ) : mode === 'google-onboarding' ? (
                <span>
                  Need to start over?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setGoogleAuthUser(null);
                    }}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Back to Login
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Log In
                  </button>
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
