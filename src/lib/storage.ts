import { 
  StudySuite, 
  AssignmentItem, 
  AttendanceSubject, 
  ScheduleEvent, 
  DSAProblem, 
  ResumeData, 
  MockInterviewResult, 
  AppNotification, 
  UserProfile,
  UserStats
} from '../types';
import { getCampusOSDSASheet } from '../data/dsaSheet375';

const STORAGE_KEYS = {
  LOGGED_IN: 'campusos_is_logged_in',
  PROFILE: 'campusos_user_profile',
  STUDY_SUITES: 'campusos_study_suites',
  ASSIGNMENTS: 'campusos_assignments',
  ATTENDANCE: 'campusos_attendance',
  SCHEDULE: 'campusos_schedule',
  DSA: 'campusos_dsa',
  RESUME: 'campusos_resume',
  MOCK_INTERVIEWS: 'campusos_mock_interviews',
  NOTIFICATIONS: 'campusos_notifications',
  CHAT_MESSAGES: 'campusos_chat_messages',
  COURSE_PROGRESS: 'campusos_course_progress',
};

// ZERO BASELINE GENERATORS FOR NEW REGISTERED USERS
export const getZeroAttendance = (userId: string = 'new_user'): AttendanceSubject[] => [
  { id: `att-1-${userId}`, userId, code: 'CS301', name: 'Data Structures & Algorithms', totalClasses: 0, attendedClasses: 0, targetPercentage: 75, scheduleDays: ['Mon', 'Wed', 'Fri'] },
  { id: `att-2-${userId}`, userId, code: 'CS302', name: 'Database Management Systems', totalClasses: 0, attendedClasses: 0, targetPercentage: 75, scheduleDays: ['Tue', 'Thu'] },
  { id: `att-3-${userId}`, userId, code: 'CS303', name: 'Operating Systems', totalClasses: 0, attendedClasses: 0, targetPercentage: 75, scheduleDays: ['Mon', 'Wed'] },
  { id: `att-4-${userId}`, userId, code: 'CS304', name: 'Computer Networks', totalClasses: 0, attendedClasses: 0, targetPercentage: 75, scheduleDays: ['Tue', 'Fri'] },
  { id: `att-5-${userId}`, userId, code: 'MA301', name: 'Discrete Mathematics', totalClasses: 0, attendedClasses: 0, targetPercentage: 75, scheduleDays: ['Wed', 'Fri'] }
];

export const getZeroDSA = (userId: string = 'new_user'): DSAProblem[] => getCampusOSDSASheet(userId);

export const getZeroNotifications = (userId: string = 'new_user'): AppNotification[] => [
  { 
    id: `notif-welcome-${userId}`, 
    userId, 
    title: 'Welcome to CampusOS AI', 
    message: 'Your student workspace is initialized with 0% initial metrics. Start logging attendance, solving DSA, and uploading assignments!', 
    type: 'system', 
    read: false, 
    createdAt: new Date().toISOString() 
  }
];

export const getZeroResume = (userId: string = 'new_user', fullName: string = '', email: string = ''): ResumeData => ({
  id: `res-${userId}`,
  userId,
  fullName: fullName || '',
  email: email || '',
  phone: '',
  location: '',
  github: '',
  linkedin: '',
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  atsScore: 0,
  updatedAt: new Date().toISOString()
});

export const getZeroStats = (): UserStats => ({
  attendancePercentage: 0,
  totalClassesAttended: 0,
  totalClassesHeld: 0,
  dsaSolvedCount: 0,
  dsaTotalCount: 375,
  dsaStreak: 0,
  assignmentsSolvedCount: 0,
  assignmentsTotalCount: 0,
  studySuitesCount: 0,
  mockInterviewsCount: 0,
  avgMockInterviewScore: 0,
  resumeAtsScore: 0,
  lastActiveAt: new Date().toISOString()
});

export class StorageService {
  // Helper to load/save
  private static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  // Persistent Login State
  static getIsLoggedIn(): boolean {
    return this.get<boolean>(STORAGE_KEYS.LOGGED_IN, false);
  }

  static setIsLoggedIn(isLoggedIn: boolean): void {
    this.set(STORAGE_KEYS.LOGGED_IN, isLoggedIn);
  }

  static clearUserData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.LOGGED_IN);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
    } catch (e) {
      console.error("Storage clear error:", e);
    }
  }

  // Profile
  static getProfile(): UserProfile {
    return this.get<UserProfile>(STORAGE_KEYS.PROFILE, {
      uid: 'guest_user',
      email: 'student@campus.edu',
      displayName: 'New Student',
      role: 'student',
      university: 'Campus University',
      major: 'Computer Science',
      year: '1st Year',
      gpaGoal: 4.0,
      targetRole: 'Software Engineer',
      createdAt: new Date().toISOString(),
      stats: getZeroStats(),
    });
  }

  static saveProfile(profile: UserProfile): void {
    this.set(STORAGE_KEYS.PROFILE, profile);
  }

  // Clear or initialize zero state for a new registered user
  static initializeZeroUserStorage(
    userId: string, 
    email: string, 
    displayName: string, 
    extraProfileDetails?: { university?: string; stream?: string; contactDetails?: string }
  ): {
    profile: UserProfile;
    attendance: AttendanceSubject[];
    dsa: DSAProblem[];
    assignments: AssignmentItem[];
    studySuites: StudySuite[];
    resumeData: ResumeData;
    mockInterviews: MockInterviewResult[];
    schedule: ScheduleEvent[];
    notifications: AppNotification[];
  } {
    const streamName = extraProfileDetails?.stream || 'Computer Science';
    const profile: UserProfile = {
      uid: userId,
      email: email || 'student@campus.edu',
      displayName: displayName || email.split('@')[0] || 'New Student',
      role: email.trim().toLowerCase() === 'naman03mgs@gmail.com' ? 'admin' : 'student',
      university: extraProfileDetails?.university || 'Campus University',
      major: streamName,
      stream: streamName,
      contactDetails: extraProfileDetails?.contactDetails || '',
      phone: extraProfileDetails?.contactDetails || '',
      year: '1st Year',
      gpaGoal: 4.0,
      targetRole: 'Software Engineer',
      createdAt: new Date().toISOString(),
      stats: getZeroStats(),
    };

    const attendance = getZeroAttendance(userId);
    const dsa = getZeroDSA(userId);
    const assignments: AssignmentItem[] = [];
    const studySuites: StudySuite[] = [];
    const resumeData = getZeroResume(userId, profile.displayName, profile.email);
    const mockInterviews: MockInterviewResult[] = [];
    const schedule: ScheduleEvent[] = [];
    const notifications = getZeroNotifications(userId);

    this.saveProfile(profile);
    this.saveAttendance(attendance);
    this.saveDSA(dsa);
    this.saveAssignments(assignments);
    this.saveStudySuites(studySuites);
    this.saveResume(resumeData);
    this.set(STORAGE_KEYS.MOCK_INTERVIEWS, mockInterviews);
    this.saveSchedule(schedule);
    this.saveNotifications(notifications);

    return {
      profile,
      attendance,
      dsa,
      assignments,
      studySuites,
      resumeData,
      mockInterviews,
      schedule,
      notifications
    };
  }

  // Study Suites
  static getStudySuites(): StudySuite[] {
    return this.get<StudySuite[]>(STORAGE_KEYS.STUDY_SUITES, []);
  }

  static saveStudySuites(suites: StudySuite[]): void {
    this.set(STORAGE_KEYS.STUDY_SUITES, suites);
  }

  static saveStudySuite(suite: StudySuite): void {
    const suites = this.getStudySuites();
    const index = suites.findIndex(s => s.id === suite.id);
    if (index >= 0) suites[index] = suite;
    else suites.unshift(suite);
    this.set(STORAGE_KEYS.STUDY_SUITES, suites);
  }

  static deleteStudySuite(id: string): void {
    const suites = this.getStudySuites().filter(s => s.id !== id);
    this.set(STORAGE_KEYS.STUDY_SUITES, suites);
  }

  // Assignments
  static getAssignments(): AssignmentItem[] {
    return this.get<AssignmentItem[]>(STORAGE_KEYS.ASSIGNMENTS, []);
  }

  static saveAssignments(list: AssignmentItem[]): void {
    this.set(STORAGE_KEYS.ASSIGNMENTS, list);
  }

  static saveAssignment(assignment: AssignmentItem): void {
    const list = this.getAssignments();
    const idx = list.findIndex(a => a.id === assignment.id);
    if (idx >= 0) list[idx] = assignment;
    else list.unshift(assignment);
    this.set(STORAGE_KEYS.ASSIGNMENTS, list);
  }

  // Attendance
  static getAttendance(): AttendanceSubject[] {
    return this.get<AttendanceSubject[]>(STORAGE_KEYS.ATTENDANCE, getZeroAttendance('guest'));
  }

  static saveAttendance(list: AttendanceSubject[]): void {
    this.set(STORAGE_KEYS.ATTENDANCE, list);
  }

  // Schedule
  static getSchedule(): ScheduleEvent[] {
    return this.get<ScheduleEvent[]>(STORAGE_KEYS.SCHEDULE, []);
  }

  static saveSchedule(events: ScheduleEvent[]): void {
    this.set(STORAGE_KEYS.SCHEDULE, events);
  }

  static addScheduleEvent(event: ScheduleEvent): void {
    const list = this.getSchedule();
    list.push(event);
    this.set(STORAGE_KEYS.SCHEDULE, list);
  }

  // DSA
  static getDSA(): DSAProblem[] {
    const list = this.get<DSAProblem[]>(STORAGE_KEYS.DSA, getZeroDSA('guest'));
    if (!list || list.length < 300) {
      const fullSet = getZeroDSA('guest');
      this.saveDSA(fullSet);
      return fullSet;
    }
    return list;
  }

  static saveDSA(list: DSAProblem[]): void {
    this.set(STORAGE_KEYS.DSA, list);
  }

  // Resume
  static getResume(): ResumeData {
    return this.get<ResumeData>(STORAGE_KEYS.RESUME, getZeroResume('guest', 'New Student', 'student@campus.edu'));
  }

  static saveResume(resume: ResumeData): void {
    this.set(STORAGE_KEYS.RESUME, resume);
  }

  // Mock Interviews
  static getMockInterviews(): MockInterviewResult[] {
    return this.get<MockInterviewResult[]>(STORAGE_KEYS.MOCK_INTERVIEWS, []);
  }

  static saveMockInterview(result: MockInterviewResult): void {
    const list = this.getMockInterviews();
    list.unshift(result);
    this.set(STORAGE_KEYS.MOCK_INTERVIEWS, list);
  }

  // Notifications
  static getNotifications(): AppNotification[] {
    return this.get<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, getZeroNotifications('guest'));
  }

  static saveNotifications(list: AppNotification[]): void {
    this.set(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  static markNotificationRead(id: string): void {
    const list = this.getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
    this.set(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  static addNotification(notif: AppNotification): void {
    const list = this.getNotifications();
    list.unshift(notif);
    this.set(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  // Course Progress
  static getCourseProgress(): Record<string, any> {
    return this.get<Record<string, any>>(STORAGE_KEYS.COURSE_PROGRESS, {});
  }

  static saveCourseProgress(progressMap: Record<string, any>): void {
    this.set(STORAGE_KEYS.COURSE_PROGRESS, progressMap);
  }

  static updateSingleCourseProgress(courseId: string, progressData: any): void {
    const progressMap = this.getCourseProgress();
    progressMap[courseId] = progressData;
    this.saveCourseProgress(progressMap);
  }
}

