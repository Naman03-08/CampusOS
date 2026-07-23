import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  UserProfile, 
  StudySuite, 
  AssignmentItem, 
  AttendanceSubject, 
  ScheduleEvent, 
  DSAProblem, 
  ResumeData, 
  MockInterviewResult 
} from '../types';
import { 
  getZeroAttendance, 
  getZeroDSA, 
  getZeroResume, 
  getZeroNotifications, 
  getZeroStats 
} from './storage';

export interface UserFullData {
  profile: UserProfile;
  attendance: AttendanceSubject[];
  dsa: DSAProblem[];
  assignments: AssignmentItem[];
  studySuites: StudySuite[];
  mockInterviews: MockInterviewResult[];
  resume: ResumeData | null;
  schedule: ScheduleEvent[];
}

export class FirestoreService {
  // User Profile
  static async saveProfile(profile: UserProfile): Promise<void> {
    if (!db || !profile.uid) return;
    try {
      await setDoc(doc(db, 'users', profile.uid), profile, { merge: true });
    } catch (e) {
      console.warn("Firestore saveProfile error:", e);
    }
  }

  static async getProfile(uid: string): Promise<UserProfile | null> {
    if (!db || !uid) return null;
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        return snap.data() as UserProfile;
      }
    } catch (e) {
      console.warn("Firestore getProfile error:", e);
    }
    return null;
  }

  // Admin Method: Get all registered users from Firestore
  static async getAllUsers(): Promise<UserProfile[]> {
    if (!db) return [];
    try {
      const snap = await getDocs(collection(db, 'users'));
      const list: UserProfile[] = [];
      snap.forEach(d => {
        const data = d.data() as UserProfile;
        if (data && data.uid) {
          list.push(data);
        }
      });
      return list;
    } catch (e) {
      console.warn("Firestore getAllUsers error:", e);
      return [];
    }
  }

  // Admin Method: Fetch complete progress & activity data for a specific user
  static async getUserFullData(uid: string): Promise<UserFullData | null> {
    if (!db || !uid) return null;
    try {
      const profile = await this.getProfile(uid);
      if (!profile) return null;

      const [attendance, dsa, assignments, studySuites, mockInterviews, resume, schedule] = await Promise.all([
        this.getAttendance(uid),
        this.getDSA(uid),
        this.getAssignments(uid),
        this.getStudySuites(uid),
        this.getMockInterviews(uid),
        this.getResume(uid),
        this.getSchedule(uid),
      ]);

      return {
        profile,
        attendance,
        dsa,
        assignments,
        studySuites,
        mockInterviews,
        resume,
        schedule
      };
    } catch (e) {
      console.warn("Firestore getUserFullData error:", e);
      return null;
    }
  }

  // Helper: Initialize zero data across all collections in Firestore for a new registered user
  static async initializeNewUserWithZeroData(uid: string, email: string, displayName: string): Promise<UserProfile> {
    const isAdmin = email.trim().toLowerCase() === 'naman03mgs@gmail.com';
    const profile: UserProfile = {
      uid,
      email: email || 'student@campus.edu',
      displayName: displayName || email.split('@')[0] || 'New Student',
      role: isAdmin ? 'admin' : 'student',
      university: 'Campus University',
      major: 'Computer Science',
      year: '1st Year',
      gpaGoal: 4.0,
      targetRole: 'Software Engineer',
      createdAt: new Date().toISOString(),
      stats: getZeroStats(),
    };

    const zeroAttendance = getZeroAttendance(uid);
    const zeroDSA = getZeroDSA(uid);
    const zeroResume = getZeroResume(uid, profile.displayName, profile.email);

    await Promise.all([
      this.saveProfile(profile),
      this.saveAttendance(uid, zeroAttendance),
      this.saveDSA(uid, zeroDSA),
      this.saveResume(uid, zeroResume)
    ]);

    return profile;
  }

  // Study Suites
  static async saveStudySuite(uid: string, suite: StudySuite): Promise<void> {
    if (!db || !uid) return;
    try {
      await setDoc(doc(db, 'studySuites', suite.id), { ...suite, userId: uid }, { merge: true });
    } catch (e) {
      console.warn("Firestore saveStudySuite error:", e);
    }
  }

  static async getStudySuites(uid: string): Promise<StudySuite[]> {
    if (!db || !uid) return [];
    try {
      const q = query(collection(db, 'studySuites'), where('userId', '==', uid));
      const snap = await getDocs(q);
      const list: StudySuite[] = [];
      snap.forEach(d => list.push(d.data() as StudySuite));
      return list;
    } catch (e) {
      console.warn("Firestore getStudySuites error:", e);
      return [];
    }
  }

  static async deleteStudySuite(id: string): Promise<void> {
    if (!db) return;
    try {
      await deleteDoc(doc(db, 'studySuites', id));
    } catch (e) {
      console.warn("Firestore deleteStudySuite error:", e);
    }
  }

  // Assignments
  static async saveAssignment(uid: string, assignment: AssignmentItem): Promise<void> {
    if (!db || !uid) return;
    try {
      await setDoc(doc(db, 'assignments', assignment.id), { ...assignment, userId: uid }, { merge: true });
    } catch (e) {
      console.warn("Firestore saveAssignment error:", e);
    }
  }

  static async getAssignments(uid: string): Promise<AssignmentItem[]> {
    if (!db || !uid) return [];
    try {
      const q = query(collection(db, 'assignments'), where('userId', '==', uid));
      const snap = await getDocs(q);
      const list: AssignmentItem[] = [];
      snap.forEach(d => list.push(d.data() as AssignmentItem));
      return list;
    } catch (e) {
      console.warn("Firestore getAssignments error:", e);
      return [];
    }
  }

  // Attendance
  static async saveAttendance(uid: string, list: AttendanceSubject[]): Promise<void> {
    if (!db || !uid) return;
    try {
      for (const item of list) {
        await setDoc(doc(db, 'attendance', item.id), { ...item, userId: uid }, { merge: true });
      }
    } catch (e) {
      console.warn("Firestore saveAttendance error:", e);
    }
  }

  static async getAttendance(uid: string): Promise<AttendanceSubject[]> {
    if (!db || !uid) return [];
    try {
      const q = query(collection(db, 'attendance'), where('userId', '==', uid));
      const snap = await getDocs(q);
      const list: AttendanceSubject[] = [];
      snap.forEach(d => list.push(d.data() as AttendanceSubject));
      return list;
    } catch (e) {
      console.warn("Firestore getAttendance error:", e);
      return [];
    }
  }

  // Schedule Events
  static async saveSchedule(uid: string, list: ScheduleEvent[]): Promise<void> {
    if (!db || !uid) return;
    try {
      for (const item of list) {
        await setDoc(doc(db, 'schedules', item.id), { ...item, userId: uid }, { merge: true });
      }
    } catch (e) {
      console.warn("Firestore saveSchedule error:", e);
    }
  }

  static async getSchedule(uid: string): Promise<ScheduleEvent[]> {
    if (!db || !uid) return [];
    try {
      const q = query(collection(db, 'schedules'), where('userId', '==', uid));
      const snap = await getDocs(q);
      const list: ScheduleEvent[] = [];
      snap.forEach(d => list.push(d.data() as ScheduleEvent));
      return list;
    } catch (e) {
      console.warn("Firestore getSchedule error:", e);
      return [];
    }
  }

  // DSA Problems
  static async saveDSA(uid: string, list: DSAProblem[]): Promise<void> {
    if (!db || !uid) return;
    try {
      for (const item of list) {
        await setDoc(doc(db, 'dsaProblems', item.id), { ...item, userId: uid }, { merge: true });
      }
    } catch (e) {
      console.warn("Firestore saveDSA error:", e);
    }
  }

  static async getDSA(uid: string): Promise<DSAProblem[]> {
    if (!db || !uid) return [];
    try {
      const q = query(collection(db, 'dsaProblems'), where('userId', '==', uid));
      const snap = await getDocs(q);
      const list: DSAProblem[] = [];
      snap.forEach(d => list.push(d.data() as DSAProblem));
      return list;
    } catch (e) {
      console.warn("Firestore getDSA error:", e);
      return [];
    }
  }

  // Resume Data
  static async saveResume(uid: string, resume: ResumeData): Promise<void> {
    if (!db || !uid) return;
    try {
      await setDoc(doc(db, 'resumes', resume.id || 'res-' + uid), { ...resume, userId: uid }, { merge: true });
    } catch (e) {
      console.warn("Firestore saveResume error:", e);
    }
  }

  static async getResume(uid: string): Promise<ResumeData | null> {
    if (!db || !uid) return null;
    try {
      const q = query(collection(db, 'resumes'), where('userId', '==', uid));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs[0].data() as ResumeData;
      }
    } catch (e) {
      console.warn("Firestore getResume error:", e);
    }
    return null;
  }

  // Mock Interviews
  static async saveMockInterview(uid: string, result: MockInterviewResult): Promise<void> {
    if (!db || !uid) return;
    try {
      await setDoc(doc(db, 'mockInterviews', result.id), { ...result, userId: uid }, { merge: true });
    } catch (e) {
      console.warn("Firestore saveMockInterview error:", e);
    }
  }

  static async getMockInterviews(uid: string): Promise<MockInterviewResult[]> {
    if (!db || !uid) return [];
    try {
      const q = query(collection(db, 'mockInterviews'), where('userId', '==', uid));
      const snap = await getDocs(q);
      const list: MockInterviewResult[] = [];
      snap.forEach(d => list.push(d.data() as MockInterviewResult));
      return list;
    } catch (e) {
      console.warn("Firestore getMockInterviews error:", e);
      return [];
    }
  }

  // ==========================================
  // CODING COURSES & USER COURSE PROGRESS
  // ==========================================

  /**
   * Seed/save coding courses into Firebase Firestore collection `codingCourses`.
   */
  static async seedCodingCourses(coursesList: any[]): Promise<void> {
    if (!db || !coursesList || coursesList.length === 0) return;
    try {
      for (const course of coursesList) {
        if (!course.id) continue;
        await setDoc(doc(db, 'codingCourses', course.id), course, { merge: true });
      }
      console.log(`Successfully synced ${coursesList.length} coding courses to Firebase Firestore.`);
    } catch (e) {
      console.warn("Firestore seedCodingCourses error:", e);
    }
  }

  /**
   * Get all coding courses from Firebase Firestore collection `codingCourses`.
   */
  static async getCodingCourses(): Promise<any[]> {
    if (!db) return [];
    try {
      const snap = await getDocs(collection(db, 'codingCourses'));
      const list: any[] = [];
      snap.forEach(d => list.push(d.data()));
      return list;
    } catch (e) {
      console.warn("Firestore getCodingCourses error:", e);
      return [];
    }
  }

  /**
   * Save user course progress for a specific course into Firestore collection `userCourseProgress`.
   */
  static async saveUserCourseProgress(uid: string, courseId: string, progressData: any): Promise<void> {
    if (!db || !uid || !courseId) return;
    try {
      const docId = `${uid}_${courseId}`;
      const payload = {
        id: docId,
        userId: uid,
        courseId,
        ...progressData,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'userCourseProgress', docId), payload, { merge: true });
    } catch (e) {
      console.warn("Firestore saveUserCourseProgress error:", e);
    }
  }

  /**
   * Get all course progress for a user from Firestore collection `userCourseProgress`.
   */
  static async getUserCourseProgress(uid: string): Promise<Record<string, any>> {
    if (!db || !uid) return {};
    try {
      const q = query(collection(db, 'userCourseProgress'), where('userId', '==', uid));
      const snap = await getDocs(q);
      const progressMap: Record<string, any> = {};
      snap.forEach(d => {
        const data = d.data();
        if (data.courseId) {
          progressMap[data.courseId] = data;
        }
      });
      return progressMap;
    } catch (e) {
      console.warn("Firestore getUserCourseProgress error:", e);
      return {};
    }
  }
}

