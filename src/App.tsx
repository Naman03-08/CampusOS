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
import { InteractiveDemo } from './components/landing/InteractiveDemo';
import { PlacementTimeline } from './components/landing/PlacementTimeline';
import { Testimonials } from './components/landing/Testimonials';
import { Pricing } from './components/landing/Pricing';
import { FAQ } from './components/landing/FAQ';
import { FooterLanding } from './components/landing/FooterLanding';

// App Portal Views
import { DashboardView } from './components/dashboard/DashboardView';
import { StudyHubView } from './components/studyhub/StudyHubView';
import { AIChatView } from './components/chat/AIChatView';
import { AssignmentSolverView } from './components/assignment/AssignmentSolverView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { CalendarView } from './components/calendar/CalendarView';
import { CodingHubView } from './components/coding/CodingHubView';
import { PlacementHubView } from './components/placement/PlacementHubView';
import { NotificationsDrawer } from './components/notifications/NotificationsDrawer';
import { SettingsView } from './components/settings/SettingsView';
import { AdminPanelView } from './components/admin/AdminPanelView';

import { StorageService } from './lib/storage';
import { FirestoreService } from './lib/firestoreService';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { UserProfile, StudySuite, AssignmentItem, AttendanceSubject, ScheduleEvent, DSAProblem, ResumeData, AppNotification } from './types';

export function App() {
  const [user, setUser] = useState<UserProfile>(StorageService.getProfile());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Core Data State
  const [studySuites, setStudySuites] = useState<StudySuite[]>(StorageService.getStudySuites());
  const [assignments, setAssignments] = useState<AssignmentItem[]>(StorageService.getAssignments());
  const [attendance, setAttendance] = useState<AttendanceSubject[]>(StorageService.getAttendance());
  const [schedule, setSchedule] = useState<ScheduleEvent[]>(StorageService.getSchedule());
  const [dsa, setDSA] = useState<DSAProblem[]>(StorageService.getDSA());
  const [resumeData, setResumeData] = useState<ResumeData>(StorageService.getResume());
  const [notifications, setNotifications] = useState<AppNotification[]>(StorageService.getNotifications());

  // Listen to Firebase Auth state changes
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsLoggedIn(true);
        // Load Profile from Firestore
        const fsProfile = await FirestoreService.getProfile(fbUser.uid);
        if (fsProfile) {
          setUser(fsProfile);
          StorageService.saveProfile(fsProfile);
        } else {
          const newProfile: UserProfile = {
            uid: fbUser.uid,
            email: fbUser.email || 'student@campus.edu',
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Campus Student',
            photoURL: fbUser.photoURL || undefined,
            role: 'student',
            university: 'Stanford University',
            major: 'Computer Science',
            year: 'Junior Year',
            gpaGoal: 3.9,
            targetRole: 'Software Engineer',
            createdAt: new Date().toISOString(),
          };
          setUser(newProfile);
          StorageService.saveProfile(newProfile);
          await FirestoreService.saveProfile(newProfile);
        }

        // Hydrate data from Firestore
        try {
          const fsSuites = await FirestoreService.getStudySuites(fbUser.uid);
          if (fsSuites.length > 0) setStudySuites(fsSuites);

          const fsAssignments = await FirestoreService.getAssignments(fbUser.uid);
          if (fsAssignments.length > 0) setAssignments(fsAssignments);

          const fsAttendance = await FirestoreService.getAttendance(fbUser.uid);
          if (fsAttendance.length > 0) setAttendance(fsAttendance);

          const fsSchedule = await FirestoreService.getSchedule(fbUser.uid);
          if (fsSchedule.length > 0) setSchedule(fsSchedule);

          const fsDSA = await FirestoreService.getDSA(fbUser.uid);
          if (fsDSA.length > 0) setDSA(fsDSA);

          const fsResume = await FirestoreService.getResume(fbUser.uid);
          if (fsResume) setResumeData(fsResume);
        } catch (e) {
          console.warn("Error hydrating student data from Firestore:", e);
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
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("SignOut error:", e);
      }
    }
    setIsLoggedIn(false);
  };

  const handleSaveSuite = (suite: StudySuite) => {
    const updated = [suite, ...studySuites];
    setStudySuites(updated);
    StorageService.saveStudySuites(updated);
    if (user.uid) {
      FirestoreService.saveStudySuite(user.uid, suite);
    }
  };

  const handleDeleteSuite = (id: string) => {
    const updated = studySuites.filter((s) => s.id !== id);
    setStudySuites(updated);
    StorageService.saveStudySuites(updated);
    FirestoreService.deleteStudySuite(id);
  };

  const handleAddAssignment = (item: AssignmentItem) => {
    const updated = [item, ...assignments];
    setAssignments(updated);
    StorageService.saveAssignments(updated);
    if (user.uid) {
      FirestoreService.saveAssignment(user.uid, item);
    }
  };

  const handleUpdateAttendance = (subs: AttendanceSubject[]) => {
    setAttendance(subs);
    StorageService.saveAttendance(subs);
    if (user.uid) {
      FirestoreService.saveAttendance(user.uid, subs);
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
    }
  };

  const handleUpdateResume = (r: ResumeData) => {
    setResumeData(r);
    StorageService.saveResume(r);
    if (user.uid) {
      FirestoreService.saveResume(user.uid, r);
    }
  };

  const handleMarkReadNotification = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
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
    <div className="min-h-screen bg-[#FAF6EE] text-slate-900 font-sans selection:bg-amber-600 selection:text-white relative overflow-x-hidden">
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
            <InteractiveDemo />
            <PlacementTimeline />
            <Testimonials />
            <Pricing onOpenAuth={() => handleOpenAuth('register')} />
            <FAQ />
          </main>

          <FooterLanding />
        </div>
      ) : (
        /* VIEWMODE 2: APP WORKSPACE PORTAL (If logged in) */
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header
            user={user}
            notifications={notifications}
            onOpenNotifications={() => setActiveTab('notifications')}
            onOpenSettings={() => setActiveTab('settings')}
            onToggleAIChat={() => setActiveTab('chat')}
            onLogout={handleLogout}
            onNavigateTab={setActiveTab}
          />

          <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
            {/* Sidebar */}
            <Sidebar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              unreadNotificationsCount={notifications.filter((n) => !n.read).length}
            />

            {/* Main Stage View Area */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
              {activeTab === 'dashboard' && (
                <DashboardView
                  user={user}
                  attendance={attendance}
                  schedule={schedule}
                  dsa={dsa}
                  studySuites={studySuites}
                  assignments={assignments}
                  onNavigateTab={setActiveTab}
                  onOpenStudyHubUpload={() => setActiveTab('studyhub')}
                />
              )}

              {activeTab === 'studyhub' && (
                <StudyHubView
                  studySuites={studySuites}
                  onSaveSuite={handleSaveSuite}
                  onDeleteSuite={handleDeleteSuite}
                />
              )}

              {activeTab === 'chat' && <AIChatView />}

              {activeTab === 'assignment' && (
                <AssignmentSolverView
                  assignments={assignments}
                  onAddAssignment={handleAddAssignment}
                />
              )}

              {activeTab === 'attendance' && (
                <AttendanceView
                  attendance={attendance}
                  onUpdateAttendance={handleUpdateAttendance}
                />
              )}

              {activeTab === 'calendar' && (
                <CalendarView
                  schedule={schedule}
                  onAddEvent={handleAddEvent}
                  onDeleteEvent={handleDeleteEvent}
                />
              )}

              {activeTab === 'coding' && (
                <CodingHubView
                  dsa={dsa}
                  onToggleSolved={handleToggleDSA}
                />
              )}

              {activeTab === 'placement' && (
                <PlacementHubView
                  user={user}
                  resumeData={resumeData}
                  onUpdateResume={handleUpdateResume}
                />
              )}

              {activeTab === 'notifications' && (
                <NotificationsDrawer
                  notifications={notifications}
                  onMarkRead={handleMarkReadNotification}
                  onClearAll={handleClearNotifications}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView user={user} onSaveProfile={setUser} />
              )}

              {activeTab === 'admin' && <AdminPanelView />}
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
    </div>
  );
}
export default App;
