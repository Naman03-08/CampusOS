import React, { useState, useEffect } from 'react';
import { X, Laptop, Smartphone, AlertCircle } from 'lucide-react';
import { CanvasBackground } from './components/common/CanvasBackground';
import { Navbar } from './components/common/Navbar';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { AuthModal } from './components/auth/AuthModal';

// Landing Page Components
import { Hero } from './components/landing/Hero';
import { TrustedBy } from './components/landing/TrustedBy';
import { FeaturesGrid } from './components/landing/FeaturesGrid';
import { AgentSandboxesCarousel } from './components/landing/AgentSandboxesCarousel';
import { InteractiveDemo } from './components/landing/InteractiveDemo';
import { PlacementTimeline } from './components/landing/PlacementTimeline';
import { Testimonials } from './components/landing/Testimonials';
import { WhyChooseUs } from './components/landing/WhyChooseUs';
import { FAQ } from './components/landing/FAQ';
import { FooterLanding } from './components/landing/FooterLanding';

// App Portal Views
import { DashboardView } from './components/dashboard/DashboardView';
import { AINotesSummarizerView } from './components/notes/AINotesSummarizerView';
import { AIQuizHubView } from './components/quiz/AIQuizHubView';
import { StudyHubView } from './components/studyhub/StudyHubView';
import { AIChatView } from './components/chat/AIChatView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { HabiturexView } from './components/habiturex/HabiturexView';
import { CodingHubView } from './components/coding/CodingHubView';
import { CodingCoursesView } from './components/courses/CodingCoursesView';
import { InterviewPrepView } from './components/placement/InterviewPrepView';
import { StartupJobsHubView } from './components/placement/StartupJobsHubView';
import { AIResumeBuilderView } from './components/resume/AIResumeBuilderView';
import { SettingsView } from './components/settings/SettingsView';
import { AdminPanelView } from './components/admin/AdminPanelView';
import { UpgradePlansView } from './components/pricing/UpgradePlansView';
import { UpgradePromptModal } from './components/common/UpgradePromptModal';
import { CertificateVerificationModal } from './components/courses/CertificateVerificationModal';

import { StorageService, getZeroAttendance, getZeroDSA, getZeroResume } from './lib/storage';
import { FirestoreService } from './lib/firestoreService';
import { StreakService } from './lib/streakService';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { UserProfile, StudySuite, AssignmentItem, AttendanceSubject, ScheduleEvent, DSAProblem, ResumeData, AppNotification } from './types';
import { calculatePlanDetails } from './lib/planUtils';
import { CODING_COURSES } from './data/codingCourses';
import { COURSES } from './components/courses/CodingCoursesView';

export function App() {
  const [user, setUser] = useState<UserProfile>(StorageService.getProfile());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const cachedLoggedIn = StorageService.getIsLoggedIn();
    const cachedProfile = StorageService.getProfile();
    return cachedLoggedIn || (!!cachedProfile && cachedProfile.uid !== 'guest_user');
  });
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [upgradeFeatureName, setUpgradeFeatureName] = useState<string>('this feature');
  const [pendingTabAfterTrial, setPendingTabAfterTrial] = useState<string | null>(null);
  const [showMobileDisclaimer, setShowMobileDisclaimer] = useState<boolean>(() => {
    const dismissed = sessionStorage.getItem('placivo_disclaimer_dismissed');
    if (dismissed === 'true') return false;
    
    const isMobileSize = window.innerWidth < 1024;
    const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    return isMobileSize || isMobileAgent;
  });

  // Global Focus Timer State for Navbar Watch & Habiturex (Backed by Local Storage to prevent reset bugs)
  const [focusTimerInitialMinutes, setFocusTimerInitialMinutes] = useState<number>(() => {
    const cached = localStorage.getItem('campus_os_focus_initial_minutes');
    return cached ? parseInt(cached, 10) : 25;
  });

  const [focusTimerSeconds, setFocusTimerSeconds] = useState<number>(() => {
    const cachedSeconds = localStorage.getItem('campus_os_focus_seconds');
    if (cachedSeconds) {
      return parseInt(cachedSeconds, 10);
    }
    const cachedMins = localStorage.getItem('campus_os_focus_initial_minutes');
    return cachedMins ? parseInt(cachedMins, 10) * 60 : 25 * 60;
  });

  const [isFocusTimerRunning, setIsFocusTimerRunning] = useState<boolean>(() => {
    const cachedRunning = localStorage.getItem('campus_os_focus_running');
    return cachedRunning === 'true';
  });

  const [focusTimerMode, setFocusTimerMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');

  // Keep Local Storage synced with Focus Timer state
  useEffect(() => {
    localStorage.setItem('campus_os_focus_initial_minutes', focusTimerInitialMinutes.toString());
  }, [focusTimerInitialMinutes]);

  useEffect(() => {
    localStorage.setItem('campus_os_focus_seconds', focusTimerSeconds.toString());
  }, [focusTimerSeconds]);

  useEffect(() => {
    localStorage.setItem('campus_os_focus_running', isFocusTimerRunning.toString());
  }, [isFocusTimerRunning]);

  // Use a ref to access latest user data without restarting interval ticks
  const userRefForTimer = React.useRef(user);
  useEffect(() => {
    userRefForTimer.current = user;
  }, [user]);

  // Focus Timer Tick Interval in App.tsx (never unmounts during tab switches)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isFocusTimerRunning) {
      interval = setInterval(() => {
        setFocusTimerSeconds((prevSeconds) => {
          if (prevSeconds > 1) {
            return prevSeconds - 1;
          }
          // Timer completed!
          setIsFocusTimerRunning(false);
          const currentUid = userRefForTimer.current?.uid;
          if (currentUid) {
            const today = new Date().toISOString().split('T')[0];
            FirestoreService.getHabiturexData(currentUid).then(data => {
              const currentLog = data?.studyHoursLog || {};
              const currentStats = data?.stats || { credits: 0, flameStreak: 0, xp: 0, perfectDays: 0 };
              const newLog = {
                ...currentLog,
                [today]: (currentLog[today] || 0) + 0.5
              };
              FirestoreService.saveHabiturexData(currentUid, {
                tasks: data?.tasks || [],
                missions: data?.missions || [],
                events: data?.events || [],
                studyHoursLog: newLog,
                stats: {
                  ...currentStats,
                  credits: (currentStats.credits || 0) + 50
                }
              }).catch(err => console.warn('Focus timer save error:', err));
            });
          }
          alert('🎉 Focus Session Completed! +50 Gold Credits Earned.');
          return 0;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocusTimerRunning]);

  const displayFocusMinutes = Math.floor(focusTimerSeconds / 60);
  const displayFocusSeconds = focusTimerSeconds % 60;

  const focusTimerInfo = {
    active: isFocusTimerRunning || focusTimerSeconds < focusTimerInitialMinutes * 60,
    isRunning: isFocusTimerRunning,
    minutes: displayFocusMinutes,
    seconds: displayFocusSeconds,
    mode: focusTimerMode,
    onTogglePlay: () => setIsFocusTimerRunning(prev => !prev),
    onReset: () => {
      setIsFocusTimerRunning(false);
      const resetSeconds = focusTimerInitialMinutes * 60;
      setFocusTimerSeconds(resetSeconds);
    }
  };

  // Global Certificate QR code verification listener
  const [globalVerifyCertId, setGlobalVerifyCertId] = useState<string | null>(null);
  const [showGlobalCertModal, setShowGlobalCertModal] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verifyCertCode = params.get('verifyCert');
    if (verifyCertCode) {
      setGlobalVerifyCertId(verifyCertCode);
      setShowGlobalCertModal(true);
    }
  }, []);

  const gatedTabs = ['notes', 'quiz', 'studyhub', 'resumebuilder', 'chat', 'attendance', 'habiturex', 'coding', 'courses', 'interviewprep', 'placement'];

  const getTabDisplayName = (tabId: string) => {
    switch (tabId) {
      case 'notes': return 'AI Smart Notes Summarizer';
      case 'quiz': return 'AI Practice Quiz Hub';
      case 'studyhub':
      case 'chat': 
        return 'Personal Assistant';
      case 'attendance': return 'Attendance Manager & Calculator';
      case 'habiturex': return 'Habiturex Daily Consistency OS';
      case 'coding': return 'Coding Hub & 375 DSA Roadmap Sheet';
      case 'courses': return 'Interactive Coding Courses & Academies';
      case 'interviewprep': return 'Technical Interview Prep & Question Bank';
      case 'placement': return 'Startup Jobs & Internship Hub';
      default: return 'this AI feature';
    }
  };

  const handleNavigateTabWithGuard = (tabId: string, customFeatureName?: string) => {
    const planDetails = calculatePlanDetails(user);
    if (gatedTabs.includes(tabId) && !planDetails.hasActiveAccess) {
      setUpgradeFeatureName(customFeatureName || getTabDisplayName(tabId));
      setPendingTabAfterTrial(tabId);
      setShowUpgradeModal(true);
      return;
    }
    setActiveTab(tabId);
  };

  const handleStartFreeTrial = () => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000); // 4 Days
    const updated: UserProfile = {
      ...user,
      plan: 'free_trial',
      freeTrialUsed: true,
      freeTrialStartedAt: now.toISOString(),
      planStartedAt: now.toISOString(),
      planExpiresAt: expiresAt.toISOString()
    };
    handleUpdateProfile(updated);
    if (pendingTabAfterTrial) {
      setActiveTab(pendingTabAfterTrial);
      setPendingTabAfterTrial(null);
    }
  };

  // Core Data State
  const [studySuites, setStudySuites] = useState<StudySuite[]>(StorageService.getStudySuites());
  const [assignments, setAssignments] = useState<AssignmentItem[]>(StorageService.getAssignments());
  const [attendance, setAttendance] = useState<AttendanceSubject[]>(StorageService.getAttendance());
  const [schedule, setSchedule] = useState<ScheduleEvent[]>(StorageService.getSchedule());
  const [dsa, setDSA] = useState<DSAProblem[]>(StorageService.getDSA());
  const [resumeData, setResumeData] = useState<ResumeData>(StorageService.getResume());
  const [notifications, setNotifications] = useState<AppNotification[]>(StorageService.getNotifications());

  // Helper to recalculate and sync user stats to Firestore for real-time Admin Monitoring
  const syncUserStats = async (
    currentProfile: UserProfile,
    currentAttendance: AttendanceSubject[],
    currentDSA: DSAProblem[],
    currentAssignments: AssignmentItem[],
    currentSuites: StudySuite[],
    currentResume: ResumeData
  ) => {
    if (!currentProfile || !currentProfile.uid) return;

    const totalAttended = currentAttendance.reduce((acc, s) => acc + s.attendedClasses, 0);
    const totalClasses = currentAttendance.reduce((acc, s) => acc + s.totalClasses, 0);
    const attPct = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;

    const dsaSolved = currentDSA.filter((p) => p.solved).length;
    const assignmentsSolved = currentAssignments.filter((a) => a.status === 'solved' || a.status === 'submitted').length;
    const mockList = StorageService.getMockInterviews();
    const avgMockScore = mockList.length > 0
      ? Math.round(mockList.reduce((acc, i) => acc + i.overallScore, 0) / mockList.length)
      : 0;

    let courseTopicsCompleted = 0;
    try {
      const savedTopics = localStorage.getItem('campus_os_completed_topics');
      if (savedTopics) {
        const parsed = JSON.parse(savedTopics);
        courseTopicsCompleted = Object.values(parsed).filter(Boolean).length;
      }
    } catch {
      courseTopicsCompleted = 0;
    }

    const totalActivityCount = dsaSolved + assignmentsSolved + courseTopicsCompleted;

    const prevActivityCount = parseInt(localStorage.getItem('campus_os_prev_activity_count') || '0', 10);
    
    let streakInfo = StreakService.evaluateStreak();

    if (totalActivityCount > prevActivityCount && totalActivityCount > 0) {
      streakInfo = StreakService.recordActivity();
      localStorage.setItem('campus_os_prev_activity_count', totalActivityCount.toString());
    } else if (totalActivityCount > 0 && !streakInfo.completedToday) {
      streakInfo = StreakService.recordActivity();
      localStorage.setItem('campus_os_prev_activity_count', totalActivityCount.toString());
    } else if (totalActivityCount === 0) {
      localStorage.setItem('campus_os_prev_activity_count', '0');
    }

    const updatedProfile: UserProfile = {
      ...currentProfile,
      stats: {
        attendancePercentage: attPct,
        totalClassesAttended: totalAttended,
        totalClassesHeld: totalClasses,
        dsaSolvedCount: dsaSolved,
        dsaTotalCount: currentDSA.length,
        dsaStreak: streakInfo.streak,
        streakAtRisk: streakInfo.isAtRisk,
        streakCompletedToday: streakInfo.completedToday,
        assignmentsSolvedCount: assignmentsSolved,
        assignmentsTotalCount: currentAssignments.length,
        studySuitesCount: currentSuites.length,
        mockInterviewsCount: mockList.length,
        avgMockInterviewScore: avgMockScore,
        resumeAtsScore: currentResume?.atsScore || 0,
        lastActiveAt: new Date().toISOString(),
      },
    };

    setUser(updatedProfile);
    StorageService.saveProfile(updatedProfile);
    await FirestoreService.saveProfile(updatedProfile);
  };

  // Ensure current active user profile is saved/connected in Firestore database
  useEffect(() => {
    if (user && user.uid) {
      FirestoreService.saveProfile(user).catch(err => {
        console.warn("User profile sync warning:", err);
      });
    }
  }, [user]);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsLoggedIn(true);
        StorageService.setIsLoggedIn(true);
        // Load Profile from Firestore
        let fsProfile = await FirestoreService.getProfile(fbUser.uid);
        if (!fsProfile) {
          // Initialize NEW registered user with 100% ZERO data
          StorageService.initializeZeroUserStorage(fbUser.uid, fbUser.email || '', fbUser.displayName || '');
          fsProfile = await FirestoreService.initializeNewUserWithZeroData(
            fbUser.uid,
            fbUser.email || '',
            fbUser.displayName || ''
          );
        }
        setUser(fsProfile);
        StorageService.saveProfile(fsProfile);

        if (typeof fsProfile.stats?.dsaStreak === 'number') {
          StreakService.syncStreak(fsProfile.stats.dsaStreak, fsProfile.stats.lastActiveAt);
        }

        // Hydrate data from Firestore
        try {
          const fsSuites = await FirestoreService.getStudySuites(fbUser.uid);
          setStudySuites(fsSuites);

          const fsAssignments = await FirestoreService.getAssignments(fbUser.uid);
          setAssignments(fsAssignments);

          const fsAttendance = await FirestoreService.getAttendance(fbUser.uid);
          const filteredAttendance = fsAttendance.filter(item => !item.id.startsWith('att-'));
          setAttendance(filteredAttendance);
          StorageService.saveAttendance(filteredAttendance);
          
          if (filteredAttendance.length !== fsAttendance.length) {
            // Delete the default preloaded subjects from Firestore
            const defaultSubjects = fsAttendance.filter(item => item.id.startsWith('att-'));
            for (const item of defaultSubjects) {
              await FirestoreService.deleteAttendanceSubject(item.id);
            }
          }

          const fsSchedule = await FirestoreService.getSchedule(fbUser.uid);
          setSchedule(fsSchedule);

          const fsDSA = await FirestoreService.getDSA(fbUser.uid);
          if (fsDSA.length > 0) {
            setDSA(fsDSA);
          } else {
            const zeroD = getZeroDSA(fbUser.uid);
            setDSA(zeroD);
            await FirestoreService.saveDSA(fbUser.uid, zeroD);
          }

          const fsResume = await FirestoreService.getResume(fbUser.uid);
          if (fsResume) {
            setResumeData(fsResume);
          } else {
            const zeroRes = getZeroResume(fbUser.uid, fsProfile.displayName, fsProfile.email);
            setResumeData(zeroRes);
            await FirestoreService.saveResume(fbUser.uid, zeroRes);
          }
        } catch (e) {
          console.warn("Error hydrating student data from Firestore:", e);
        }
      } else {
        // If not authenticated in Firebase and local storage says not logged in
        if (!StorageService.getIsLoggedIn()) {
          setIsLoggedIn(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (newProfile: UserProfile) => {
    setUser(newProfile);
    setIsLoggedIn(true);
    StorageService.setIsLoggedIn(true);
    StorageService.saveProfile(newProfile);
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    StorageService.setIsLoggedIn(false);
    StorageService.clearUserData();
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("SignOut error:", e);
      }
    }
    setIsLoggedIn(false);
    setUser(StorageService.getProfile());
  };

  const handleSaveSuite = (suite: StudySuite) => {
    const updated = [suite, ...studySuites];
    setStudySuites(updated);
    StorageService.saveStudySuites(updated);
    if (user.uid) {
      FirestoreService.saveStudySuite(user.uid, suite);
      syncUserStats(user, attendance, dsa, assignments, updated, resumeData);
    }
  };

  const handleDeleteSuite = (id: string) => {
    const updated = studySuites.filter((s) => s.id !== id);
    setStudySuites(updated);
    StorageService.saveStudySuites(updated);
    FirestoreService.deleteStudySuite(id);
    if (user.uid) {
      syncUserStats(user, attendance, dsa, assignments, updated, resumeData);
    }
  };

  const handleAddAssignment = (item: AssignmentItem) => {
    const updated = [item, ...assignments];
    setAssignments(updated);
    StorageService.saveAssignments(updated);
    if (user.uid) {
      FirestoreService.saveAssignment(user.uid, item);
      syncUserStats(user, attendance, dsa, updated, studySuites, resumeData);
    }
  };

  const handleUpdateAttendance = async (subs: AttendanceSubject[]) => {
    // Find deleted subjects to remove from database
    const deletedSubjects = attendance.filter(oldSub => !subs.some(newSub => newSub.id === oldSub.id));
    
    setAttendance(subs);
    StorageService.saveAttendance(subs);
    
    if (user.uid) {
      for (const item of deletedSubjects) {
        await FirestoreService.deleteAttendanceSubject(item.id);
      }
      await FirestoreService.saveAttendance(user.uid, subs);
      syncUserStats(user, subs, dsa, assignments, studySuites, resumeData);
    }
  };

  const handleAddEvent = (evt: ScheduleEvent) => {
    const updated = [...schedule, evt];
    setSchedule(updated);
    StorageService.saveSchedule(updated);
    if (user.uid) {
      FirestoreService.saveSchedule(user.uid, updated);
    }
  };

  const handleDeleteEvent = (id: string) => {
    const updated = schedule.filter((e) => e.id !== id);
    setSchedule(updated);
    StorageService.saveSchedule(updated);
    if (user.uid) {
      FirestoreService.saveSchedule(user.uid, updated);
    }
  };

  const handleToggleDSA = (id: string) => {
    const updated = dsa.map((p) => (p.id === id ? { ...p, solved: !p.solved } : p));
    setDSA(updated);
    StorageService.saveDSA(updated);
    if (user.uid) {
      FirestoreService.saveDSA(user.uid, updated);
      syncUserStats(user, attendance, updated, assignments, studySuites, resumeData);
    }
  };

  const handleResetDSASheet = (newSheet: DSAProblem[]) => {
    setDSA(newSheet);
    StorageService.saveDSA(newSheet);
    if (user.uid) {
      FirestoreService.saveDSA(user.uid, newSheet);
      syncUserStats(user, attendance, newSheet, assignments, studySuites, resumeData);
    }
  };

  const handleUpdateResume = (r: ResumeData) => {
    setResumeData(r);
    StorageService.saveResume(r);
    if (user.uid) {
      FirestoreService.saveResume(user.uid, r);
      syncUserStats(user, attendance, dsa, assignments, studySuites, r);
    }
  };

  const handleUpdateProfile = (updatedFields: Partial<UserProfile>) => {
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    StorageService.saveProfile(updated);
    if (user.uid) {
      FirestoreService.saveProfile(updated);
    }
  };

  const handleMarkReadNotification = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    StorageService.saveNotifications(updated);
  };

  const handleDeleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    StorageService.saveNotifications(updated);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    StorageService.saveNotifications([]);
  };

  const scrollToLandingSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      {/* 3D WebGL Canvas Ambient Particle Background */}
      <CanvasBackground />

      {/* Mobile/Tablet Laptop Preference Disclaimer Popup */}
      {showMobileDisclaimer && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
          <div className="relative bg-white border border-slate-100 max-w-sm sm:max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 overflow-hidden">
            {/* Ambient subtle light-glows inside the card */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-100/40 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-100/40 rounded-full blur-2xl pointer-events-none" />

            {/* Icons illustrating transition to Laptop/PC */}
            <div className="flex items-center justify-center gap-4 relative">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs relative">
                <Smartphone className="w-7 h-7 text-slate-400" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-pulse delay-100" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-pulse delay-200" />
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 shadow-3d-sm relative">
                <Laptop className="w-9 h-9 text-blue-600 animate-bounce" />
              </div>
            </div>

            {/* Disclaimer Content */}
            <div className="space-y-2.5 relative">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 tracking-wide uppercase">
                <AlertCircle className="w-3.5 h-3.5" /> Laptop / PC Recommended
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Enhance Your Placement Prep
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                For the absolute best experience with coding compilers, aptitude tests, and interactive resume tools, we highly recommend using <span className="text-blue-600 font-extrabold">Placivo AI</span> on a laptop or desktop computer.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-1.5 flex flex-col gap-2 relative">
              <button
                onClick={() => {
                  setShowMobileDisclaimer(false);
                  sessionStorage.setItem('placivo_disclaimer_dismissed', 'true');
                }}
                className="w-full py-2.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-500/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                Continue Anyway
              </button>
              <button
                onClick={() => {
                  setShowMobileDisclaimer(false);
                  sessionStorage.setItem('placivo_disclaimer_dismissed', 'true');
                }}
                className="text-[10px] sm:text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Don't show this again today
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEWMODE 1: LANDING PAGE (If not logged in) */}
      {!isLoggedIn ? (
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar
            onNavigateLandingSection={scrollToLandingSection}
            onOpenAuth={handleOpenAuth}
            onLaunchApp={() => setIsLoggedIn(true)}
            isLoggedIn={isLoggedIn}
          />

          <main className="flex-1">
            <Hero
              onOpenAuth={() => handleOpenAuth('register')}
              onExploreDemo={() => scrollToLandingSection('demo')}
            />
            <TrustedBy />
            <FeaturesGrid />
            <AgentSandboxesCarousel onOpenAuth={() => handleOpenAuth('register')} />
            <InteractiveDemo />
            <PlacementTimeline />
            <Testimonials />
            <WhyChooseUs onOpenAuth={() => handleOpenAuth('register')} />
            <FAQ />
          </main>

          <FooterLanding />
        </div>
      ) : (
        /* VIEWMODE 2: APP WORKSPACE PORTAL (If logged in) */
        <div className="relative z-10 h-screen w-screen overflow-hidden flex flex-col">
          <Header
            user={user}
            notifications={notifications}
            focusTimer={focusTimerInfo}
            onMarkReadNotification={handleMarkReadNotification}
            onDeleteNotification={handleDeleteNotification}
            onClearNotifications={handleClearNotifications}
            onOpenSettings={() => setActiveTab('settings')}
            onToggleAIChat={() => handleNavigateTabWithGuard('chat', 'AI Chat Assistant')}
            onLogout={handleLogout}
            onNavigateTab={handleNavigateTabWithGuard}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
          />

          <div className="flex-1 flex w-full overflow-hidden relative">
            {/* Mobile Sidebar Slide-over Drawer Overlay */}
            {isMobileSidebarOpen && (
              <div className="fixed inset-0 z-50 flex md:hidden">
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
                  onClick={() => setIsMobileSidebarOpen(false)}
                />
                
                {/* Slide Drawer Content */}
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl transition-transform duration-300 transform translate-x-0">
                  {/* Close button */}
                  <div className="absolute top-4 right-4 z-50">
                    <button
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 h-full overflow-hidden pt-12">
                    <Sidebar
                      activeTab={activeTab}
                      onSelectTab={(tab) => {
                        handleNavigateTabWithGuard(tab);
                        setIsMobileSidebarOpen(false);
                      }}
                      unreadNotificationsCount={notifications.filter((n) => !n.read).length}
                      user={user}
                      isMobile={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar */}
            <Sidebar
              activeTab={activeTab}
              onSelectTab={handleNavigateTabWithGuard}
              unreadNotificationsCount={notifications.filter((n) => !n.read).length}
              user={user}
            />

            {/* Main Stage View Area */}
            <main className="flex-1 h-full overflow-y-auto p-3 sm:p-5 lg:p-6 min-w-0 max-w-full scrollbar-thin">
              {activeTab === 'dashboard' && (
                <DashboardView
                  user={user}
                  attendance={attendance}
                  schedule={schedule}
                  dsa={dsa}
                  studySuites={studySuites}
                  assignments={assignments}
                  onNavigateTab={handleNavigateTabWithGuard}
                  onOpenStudyHubUpload={() => handleNavigateTabWithGuard('studyhub', 'AI Study Hub Upload')}
                  onStartTrial={handleStartFreeTrial}
                />
              )}

              {activeTab === 'notes' && (
                <AINotesSummarizerView
                  user={user}
                  onSaveSuite={handleSaveSuite}
                  onNavigateTab={handleNavigateTabWithGuard}
                />
              )}

              {activeTab === 'quiz' && (
                <AIQuizHubView
                  user={user}
                />
              )}

              {(activeTab === 'studyhub' || activeTab === 'chat') && (
                <StudyHubView
                  studySuites={studySuites}
                  onSaveSuite={handleSaveSuite}
                  onDeleteSuite={handleDeleteSuite}
                />
              )}

              {(activeTab === 'habiturex' || activeTab === 'attendance') && (
                <HabiturexView
                  user={user}
                  attendance={attendance}
                  onUpdateAttendance={handleUpdateAttendance}
                  onSyncUserStats={() => syncUserStats(user, attendance, dsa, assignments, studySuites, resumeData)}
                  focusTimerSeconds={focusTimerSeconds}
                  focusTimerInitialMinutes={focusTimerInitialMinutes}
                  isFocusTimerRunning={isFocusTimerRunning}
                  focusTimerMode={focusTimerMode}
                  onToggleFocusTimer={() => setIsFocusTimerRunning(prev => !prev)}
                  onResetFocusTimer={() => {
                    setIsFocusTimerRunning(false);
                    setFocusTimerSeconds(focusTimerInitialMinutes * 60);
                  }}
                  onSetFocusTimerDuration={(mins: number) => {
                    setIsFocusTimerRunning(false);
                    setFocusTimerInitialMinutes(mins);
                    setFocusTimerSeconds(mins * 60);
                  }}
                  initialInnerTab={activeTab === 'attendance' ? 'attendance' : undefined}
                />
              )}

              {activeTab === 'coding' && (
                <CodingHubView
                  dsa={dsa}
                  onToggleSolved={handleToggleDSA}
                  onResetDSASheet={handleResetDSASheet}
                  onNavigateTab={handleNavigateTabWithGuard}
                />
              )}

              {activeTab === 'courses' && (
                <CodingCoursesView
                  user={user}
                  onNavigateTab={handleNavigateTabWithGuard}
                  onUpdateCourseTopics={() => syncUserStats(user, attendance, dsa, assignments, studySuites, resumeData)}
                />
              )}

              {activeTab === 'resumebuilder' && (
                <AIResumeBuilderView
                  user={user}
                  resumeData={resumeData}
                  onUpdateResume={handleUpdateResume}
                  onNavigateTab={handleNavigateTabWithGuard}
                />
              )}

              {activeTab === 'interviewprep' && (
                <InterviewPrepView
                  user={user}
                  resumeData={resumeData}
                  onNavigateTab={handleNavigateTabWithGuard}
                />
              )}

              {activeTab === 'placement' && (
                <StartupJobsHubView
                  user={user}
                  resumeData={resumeData}
                  onUpdateResume={handleUpdateResume}
                  onNavigateTab={handleNavigateTabWithGuard}
                />
              )}

              {activeTab === 'pricing' && (
                <UpgradePlansView
                  user={user}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView 
                  user={user} 
                  onSaveProfile={handleUpdateProfile}
                  onNavigateTab={setActiveTab}
                />
              )}

              {activeTab === 'admin' && (
                <AdminPanelView user={user} onNavigateTab={setActiveTab} />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        initialMode={authMode}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Feature Upgrade & Free Trial Prompt Modal */}
      <UpgradePromptModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        user={user}
        onStartTrial={handleStartFreeTrial}
        onNavigateToPricing={() => setActiveTab('pricing')}
        featureName={upgradeFeatureName}
      />

      {/* Global QR Code Verification Portal */}
      <CertificateVerificationModal
        isOpen={showGlobalCertModal}
        onClose={() => setShowGlobalCertModal(false)}
        certificateId={globalVerifyCertId}
      />
    </div>
  );
}
export default App;
