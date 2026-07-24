import React, { useState, useEffect } from 'react';
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
import { StudyHubView } from './components/studyhub/StudyHubView';
import { AIChatView } from './components/chat/AIChatView';
import { AssignmentSolverView } from './components/assignment/AssignmentSolverView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { CodingHubView } from './components/coding/CodingHubView';
import { CodingCoursesView } from './components/courses/CodingCoursesView';
import { PlacementHubView } from './components/placement/PlacementHubView';
import { AIResumeBuilderView } from './components/resume/AIResumeBuilderView';
import { SettingsView } from './components/settings/SettingsView';
import { AdminPanelView } from './components/admin/AdminPanelView';
import { UpgradePlansView } from './components/pricing/UpgradePlansView';
import { UpgradePromptModal } from './components/common/UpgradePromptModal';
import { CertificateVerificationModal } from './components/courses/CertificateVerificationModal';

import { StorageService, getZeroAttendance, getZeroDSA, getZeroResume } from './lib/storage';
import { StreakService } from './lib/streakService';
import { FirestoreService } from './lib/firestoreService';
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
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [upgradeFeatureName, setUpgradeFeatureName] = useState<string>('this feature');
  const [pendingTabAfterTrial, setPendingTabAfterTrial] = useState<string | null>(null);

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

  const gatedTabs = ['notes', 'studyhub', 'resumebuilder', 'chat', 'assignment', 'attendance', 'coding', 'courses', 'placement'];

  const getTabDisplayName = (tabId: string) => {
    switch (tabId) {
      case 'notes': return 'AI Smart Notes Summarizer';
      case 'studyhub':
      case 'chat': 
      case 'assignment':
        return 'AI Study, Chat & Assignment Solver';
      case 'attendance': return 'Attendance Manager & Calculator';
      case 'coding': return 'Coding Hub & 375 DSA Roadmap Sheet';
      case 'courses': return 'Interactive Coding Courses & Academies';
      case 'placement': return 'Placement Hub & AI Mock Interviews';
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

        // Hydrate data from Firestore
        try {
          const fsSuites = await FirestoreService.getStudySuites(fbUser.uid);
          setStudySuites(fsSuites);

          const fsAssignments = await FirestoreService.getAssignments(fbUser.uid);
          setAssignments(fsAssignments);

          const fsAttendance = await FirestoreService.getAttendance(fbUser.uid);
          if (fsAttendance.length > 0) {
            setAttendance(fsAttendance);
          } else {
            const zeroAtt = getZeroAttendance(fbUser.uid);
            setAttendance(zeroAtt);
            await FirestoreService.saveAttendance(fbUser.uid, zeroAtt);
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

  const handleUpdateAttendance = (subs: AttendanceSubject[]) => {
    setAttendance(subs);
    StorageService.saveAttendance(subs);
    if (user.uid) {
      FirestoreService.saveAttendance(user.uid, subs);
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
            onMarkReadNotification={handleMarkReadNotification}
            onDeleteNotification={handleDeleteNotification}
            onClearNotifications={handleClearNotifications}
            onOpenSettings={() => setActiveTab('settings')}
            onToggleAIChat={() => handleNavigateTabWithGuard('chat', 'AI Chat Assistant')}
            onLogout={handleLogout}
            onNavigateTab={handleNavigateTabWithGuard}
          />

          <div className="flex-1 flex w-full overflow-hidden">
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

              {activeTab === 'studyhub' && (
                <StudyHubView
                  studySuites={studySuites}
                  onSaveSuite={handleSaveSuite}
                  onDeleteSuite={handleDeleteSuite}
                  assignments={assignments}
                  onAddAssignment={handleAddAssignment}
                />
              )}

              {activeTab === 'chat' && (
                <StudyHubView
                  studySuites={studySuites}
                  onSaveSuite={handleSaveSuite}
                  onDeleteSuite={handleDeleteSuite}
                  assignments={assignments}
                  onAddAssignment={handleAddAssignment}
                  initialMode="chat"
                />
              )}

              {activeTab === 'assignment' && (
                <StudyHubView
                  studySuites={studySuites}
                  onSaveSuite={handleSaveSuite}
                  onDeleteSuite={handleDeleteSuite}
                  assignments={assignments}
                  onAddAssignment={handleAddAssignment}
                  initialMode="assignment"
                />
              )}

              {activeTab === 'attendance' && (
                <AttendanceView
                  attendance={attendance}
                  onUpdateAttendance={handleUpdateAttendance}
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

              {activeTab === 'placement' && (
                <PlacementHubView
                  user={user}
                  resumeData={resumeData}
                  onUpdateResume={handleUpdateResume}
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
