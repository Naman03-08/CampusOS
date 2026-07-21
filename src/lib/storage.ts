import { 
  StudySuite, 
  AssignmentItem, 
  AttendanceSubject, 
  ScheduleEvent, 
  DSAProblem, 
  ResumeData, 
  MockInterviewResult, 
  AppNotification, 
  UserProfile 
} from '../types';

const STORAGE_KEYS = {
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
};

// Initial Seed Data for immediate full functionality
const INITIAL_ATTENDANCE: AttendanceSubject[] = [
  { id: 'att-1', userId: 'default', code: 'CS301', name: 'Data Structures & Algorithms', totalClasses: 28, attendedClasses: 25, targetPercentage: 80, scheduleDays: ['Mon', 'Wed', 'Fri'] },
  { id: 'att-2', userId: 'default', code: 'CS302', name: 'Database Management Systems', totalClasses: 24, attendedClasses: 20, targetPercentage: 75, scheduleDays: ['Tue', 'Thu'] },
  { id: 'att-3', userId: 'default', code: 'CS303', name: 'Operating Systems', totalClasses: 30, attendedClasses: 28, targetPercentage: 80, scheduleDays: ['Mon', 'Wed'] },
  { id: 'att-4', userId: 'default', code: 'CS304', name: 'Computer Networks', totalClasses: 22, attendedClasses: 17, targetPercentage: 75, scheduleDays: ['Tue', 'Fri'] },
  { id: 'att-5', userId: 'default', code: 'MA301', name: 'Discrete Mathematics', totalClasses: 26, attendedClasses: 23, targetPercentage: 75, scheduleDays: ['Wed', 'Fri'] }
];

const INITIAL_SCHEDULE: ScheduleEvent[] = [
  { id: 'sch-1', userId: 'default', title: 'CS301: DSA Lecture - Binary Trees', category: 'Class', date: new Date().toISOString().split('T')[0], time: '10:00', durationMinutes: 60, completed: false },
  { id: 'sch-2', userId: 'default', title: 'DBMS Quiz Preparation', category: 'Study', date: new Date().toISOString().split('T')[0], time: '14:30', durationMinutes: 90, completed: false },
  { id: 'sch-3', userId: 'default', title: 'Submit OS Memory Management Assignment', category: 'Assignment', date: new Date().toISOString().split('T')[0], time: '23:59', durationMinutes: 30, completed: false },
  { id: 'sch-4', userId: 'default', title: 'Google SWE Mock Interview Session', category: 'Interview', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '16:00', durationMinutes: 45, completed: false }
];

const INITIAL_DSA: DSAProblem[] = [
  { id: 'dsa-1', userId: 'default', title: 'Two Sum', category: 'Arrays', difficulty: 'Easy', solved: true, bookmarked: true, solvedAt: '2026-07-15' },
  { id: 'dsa-2', userId: 'default', title: 'Longest Substring Without Repeating Characters', category: 'Strings', difficulty: 'Medium', solved: true, bookmarked: false, solvedAt: '2026-07-18' },
  { id: 'dsa-3', userId: 'default', title: 'Reverse a Linked List', category: 'Linked List', difficulty: 'Easy', solved: true, bookmarked: true, solvedAt: '2026-07-19' },
  { id: 'dsa-4', userId: 'default', title: 'Lowest Common Ancestor of Binary Tree', category: 'Trees', difficulty: 'Medium', solved: false, bookmarked: true },
  { id: 'dsa-5', userId: 'default', title: 'Course Schedule (Graph Cycle Detection)', category: 'Graphs', difficulty: 'Medium', solved: false, bookmarked: false },
  { id: 'dsa-6', userId: 'default', title: 'Coin Change (0/1 Knapsack Variant)', category: 'Dynamic Programming', difficulty: 'Medium', solved: false, bookmarked: true },
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: 'notif-1', userId: 'default', title: 'Attendance Alert', message: 'Computer Networks attendance is at 77%. You need 2 more classes to reach 80%.', type: 'attendance', read: false, createdAt: new Date().toISOString() },
  { id: 'notif-2', userId: 'default', title: 'Assignment Due Tomorrow', message: 'OS Memory Management Assignment is due tomorrow at 11:59 PM.', type: 'assignment', read: false, createdAt: new Date().toISOString() },
  { id: 'notif-3', userId: 'default', title: 'Placement Drive Update', message: 'Microsoft SWE Campus Hiring registration opens this Friday.', type: 'placement', read: true, createdAt: new Date().toISOString() },
];

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

  // Profile
  static getProfile(): UserProfile {
    return this.get<UserProfile>(STORAGE_KEYS.PROFILE, {
      uid: 'guest_user',
      email: 'alex.student@campus.edu',
      displayName: 'Alex Rivers',
      role: 'student',
      university: 'Stanford University',
      major: 'Computer Science & AI',
      year: 'Junior Year (3rd Year)',
      gpaGoal: 3.9,
      targetRole: 'Full Stack AI Engineer / SDE',
      createdAt: new Date().toISOString(),
    });
  }

  static saveProfile(profile: UserProfile): void {
    this.set(STORAGE_KEYS.PROFILE, profile);
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
    return this.get<AssignmentItem[]>(STORAGE_KEYS.ASSIGNMENTS, [
      {
        id: 'asg-1',
        userId: 'default',
        title: 'OS Page Replacement Algorithm Comparison',
        subject: 'Operating Systems',
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        questionText: 'Compare FIFO, LRU, and Optimal Page Replacement Algorithms with page trace simulation: [7, 0, 1, 2, 0, 3, 0, 4, 2, 3]. Calculate page fault ratios for 3 frames.',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'asg-2',
        userId: 'default',
        title: 'DBMS Normalization 3NF & BCNF Proof',
        subject: 'Database Management Systems',
        dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
        questionText: 'Given Relation R(A, B, C, D, E) with Functional Dependencies F = {A->BC, CD->E, B->D}. Find candidate keys and decompose R into 3NF.',
        status: 'solved',
        solutionMarkdown: '### Candidate Keys & Normalization Analysis\n1. **Candidate Key**: A\n2. **Decomposition**: R1(A, B, C), R2(B, D), R3(C, D, E).',
        createdAt: new Date().toISOString(),
      }
    ]);
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
    return this.get<AttendanceSubject[]>(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  }

  static saveAttendance(list: AttendanceSubject[]): void {
    this.set(STORAGE_KEYS.ATTENDANCE, list);
  }

  // Schedule
  static getSchedule(): ScheduleEvent[] {
    return this.get<ScheduleEvent[]>(STORAGE_KEYS.SCHEDULE, INITIAL_SCHEDULE);
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
    return this.get<DSAProblem[]>(STORAGE_KEYS.DSA, INITIAL_DSA);
  }

  static saveDSA(list: DSAProblem[]): void {
    this.set(STORAGE_KEYS.DSA, list);
  }

  // Resume
  static getResume(): ResumeData {
    return this.get<ResumeData>(STORAGE_KEYS.RESUME, {
      id: 'res-default',
      userId: 'default',
      fullName: 'Alex Rivers',
      email: 'alex.rivers@stanford.edu',
      phone: '+1 (555) 382-9102',
      location: 'Palo Alto, CA',
      github: 'github.com/alexrivers',
      linkedin: 'linkedin.com/in/alexrivers',
      summary: 'High-performing Computer Science & AI undergraduate with hands-on expertise building distributed systems, full-stack microservices, and fine-tuned LLM applications. Passionate about algorithms, low-latency API design, and cloud scalability.',
      education: [
        { institution: 'Stanford University', degree: 'B.S. in Computer Science (Artificial Intelligence Track)', year: '2023 - 2026', gpa: '3.92 / 4.0' }
      ],
      experience: [
        { company: 'Meta AI Lab', role: 'Software Engineering Intern', duration: 'Summer 2025', bulletPoints: ['Engineered multi-GPU evaluation pipeline reducing model inference latency by 28%.', 'Optimized Redis caching layer handling 100K+ concurrent RPC query requests.', 'Co-authored technical design doc for asynchronous streaming API gateway.'] }
      ],
      projects: [
        { name: 'CampusOS AI Engine', description: 'Autonomous academic workspace leveraging advanced AI & RAG vector search for automated notes, flashcards, and step-by-step assignment reasoning.', techStack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'AI Engine', 'Tailwind CSS'], link: 'https://campusos.ai' }
      ],
      skills: [
        { category: 'Languages', list: ['TypeScript', 'Python', 'C++', 'Java', 'SQL', 'Go'] },
        { category: 'Frameworks & Cloud', list: ['React 19', 'Next.js', 'Node.js', 'Express', 'Firebase', 'Docker', 'AWS'] }
      ],
      atsScore: 88,
      atsFeedback: {
        strengths: ['Clear quantitative metrics in bullet points', 'Strong technical skill stack', 'Clean structure'],
        missingKeywords: ['System Architecture', 'CI/CD Pipelines', 'GraphQL'],
        improvements: ['Add 2-3 extra quantitative impact metrics in the Meta internship section.']
      },
      updatedAt: new Date().toISOString()
    });
  }

  static saveResume(resume: ResumeData): void {
    this.set(STORAGE_KEYS.RESUME, resume);
  }

  // Mock Interviews
  static getMockInterviews(): MockInterviewResult[] {
    return this.get<MockInterviewResult[]>(STORAGE_KEYS.MOCK_INTERVIEWS, [
      {
        id: 'mock-1',
        userId: 'default',
        targetRole: 'Software Engineer',
        topic: 'Data Structures & Algorithms',
        question: 'Explain how LRU Cache works and how to achieve O(1) time complexity for both get and put operations.',
        userAnswerText: 'LRU Cache can be implemented using a combination of a Doubly Linked List and a Hash Map. The Hash Map provides O(1) lookup to the nodes, and the Doubly Linked List allows O(1) removal and insertion of elements at the head and tail.',
        technicalScore: 92,
        communicationScore: 88,
        confidenceScore: 90,
        overallScore: 90,
        strengths: ['Accurate choice of data structures', 'Clear articulation of O(1) time complexity reasoning'],
        weaknesses: ['Could mention boundary conditions like node capacity zero or node update when existing key is put again'],
        improvedAnswer: 'To achieve O(1) operations for LRU Cache, we combine a Hash Map key->Node and a Doubly Linked List. The doubly linked list maintains the usage order (Head = Most Recently Used, Tail = Least Recently Used). When get(key) is invoked, we lookup in O(1) and move node to head in O(1). When put(key, val) is called, if key exists we update value and move to head; if new and capacity is reached, we remove tail node from list and map in O(1).',
        timestamp: new Date().toISOString()
      }
    ]);
  }

  static saveMockInterview(result: MockInterviewResult): void {
    const list = this.getMockInterviews();
    list.unshift(result);
    this.set(STORAGE_KEYS.MOCK_INTERVIEWS, list);
  }

  // Notifications
  static getNotifications(): AppNotification[] {
    return this.get<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
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
}
