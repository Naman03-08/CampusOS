export type Role = 'student' | 'admin';

export interface UserStats {
  attendancePercentage: number;
  totalClassesAttended: number;
  totalClassesHeld: number;
  dsaSolvedCount: number;
  dsaTotalCount: number;
  dsaStreak: number;
  streakAtRisk?: boolean;
  streakCompletedToday?: boolean;
  lastActivityDate?: string;
  assignmentsSolvedCount: number;
  assignmentsTotalCount: number;
  studySuitesCount: number;
  mockInterviewsCount: number;
  avgMockInterviewScore: number;
  resumeAtsScore: number;
  lastActiveAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: Role;
  plan?: string; // 'free_trial' | 'plan_199' | 'plan_349'
  freeTrialUsed?: boolean;
  freeTrialStartedAt?: string;
  planStartedAt?: string;
  planExpiresAt?: string;
  university?: string;
  major?: string;
  stream?: string;
  contactDetails?: string;
  phone?: string;
  year?: string;
  gpaGoal?: number;
  targetRole?: string;
  createdAt: string;
  stats?: UserStats;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  mastered?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MindmapNode {
  id: string;
  label: string;
  children?: MindmapNode[];
}

export interface FormulaItem {
  name: string;
  formula: string;
  description: string;
}

export interface StudySuite {
  id: string;
  userId: string;
  title: string;
  subject: string;
  summary: string;
  fullNotes: string;
  importantQuestions: { question: string; answer: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  mindmap: MindmapNode;
  formulas: FormulaItem[];
  vivaQuestions: { question: string; sampleAnswer: string }[];
  revisionPlan: { day: number; topic: string; tasks: string[] }[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
  codeSnippets?: { language: string; code: string }[];
}

export interface AssignmentItem {
  id: string;
  userId: string;
  title: string;
  subject: string;
  dueDate: string;
  questionText: string;
  solutionMarkdown?: string;
  explanations?: string;
  references?: string[];
  status: 'pending' | 'solved' | 'submitted';
  createdAt: string;
}

export interface AttendanceSubject {
  id: string;
  userId: string;
  code: string;
  name: string;
  totalClasses: number;
  attendedClasses: number;
  targetPercentage: number;
  scheduleDays: string[]; // e.g. ['Mon', 'Wed', 'Fri']
}

export interface ScheduleEvent {
  id: string;
  userId: string;
  title: string;
  category: 'Class' | 'Exam' | 'Assignment' | 'Study' | 'Interview' | 'Personal';
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  completed: boolean;
  notes?: string;
}

export interface DSAProblem {
  id: string;
  userId: string;
  title: string;
  category: 
    | 'Arrays' 
    | 'Strings' 
    | '2D Arrays' 
    | 'Searching & Sorting' 
    | 'Backtracking' 
    | 'Linked List' 
    | 'Stacks & Queues' 
    | 'Greedy' 
    | 'Binary Trees' 
    | 'Binary Search Trees' 
    | 'Heaps & Hashing' 
    | 'Graphs' 
    | 'Tries' 
    | 'Dynamic Programming' 
    | 'Bit Manipulation' 
    | 'Segment Trees' 
    | string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platformUrl?: string;
  gfgUrl?: string;
  leetcodeUrl?: string;
  solved: boolean;
  notes?: string;
  bookmarked?: boolean;
  solvedAt?: string;
}

export interface ResumeData {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
  education: { institution: string; degree: string; year: string; gpa: string }[];
  experience: { company: string; role: string; duration: string; bulletPoints: string[] }[];
  projects: { name: string; description: string; techStack: string[]; link?: string }[];
  skills: { category: string; list: string[] }[];
  atsScore?: number;
  atsFeedback?: {
    strengths: string[];
    missingKeywords: string[];
    improvements: string[];
  };
  updatedAt: string;
}

export interface MockInterviewResult {
  id: string;
  userId: string;
  targetRole: string;
  topic: string;
  question: string;
  userAnswerText: string;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  improvedAnswer: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'attendance' | 'assignment' | 'exam' | 'placement' | 'system';
  read: boolean;
  createdAt: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  codeSnippet?: {
    language: string;
    starterCode: string;
    solutionCode: string;
    instructions: string;
  };
  quiz?: QuizQuestion[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface CodingCourse {
  id: string;
  title: string;
  slug: string;
  category: 'Web Dev' | 'DSA & C++' | 'AI & ML' | 'Backend & Cloud' | 'Mobile Dev' | 'Cybersecurity';
  badge: string;
  description: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  durationHours: number;
  totalModules: number;
  rating: number;
  enrolledStudentsCount: number;
  tags: string[];
  gradientBg: string;
  modules: CourseModule[];
  capstoneProject?: {
    title: string;
    description: string;
    deliverables: string[];
  };
}

export interface UserCourseProgress {
  courseId: string;
  enrolledAt: string;
  completedLessonIds: string[];
  quizScores: Record<string, number>;
  certificateIssued?: boolean;
  certificateIssuedAt?: string;
}

export interface CertificateRecord {
  certificateId: string; // Unique ID, e.g. "COS-2026-784563"
  userId: string;
  userName: string;
  userEmail: string;
  joinedAt: string;
  userPlan: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  attendancePercentage: number;
  totalClassesAttended: number;
  totalClassesHeld: number;
  dsaSolvedCount: number;
  dsaTotalCount?: number;
}

export interface MonthlyProfitRecord {
  id: string; // e.g. "2026-07"
  monthKey: string; // "2026-07"
  monthName: string; // "July 2026"
  subscriptionRevenue: number;
  courseRevenue: number;
  grossProfit: number;
  subscriptionCount: number;
  coursePurchaseCount: number;
  updatedAt: string;
}

export interface StudentCoursePurchase {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  pricePaid: number;
  purchaseDate: string;
  paymentStatus: 'Completed' | 'Pending';
}

export interface AdminEmailPayload {
  recipientEmails: string[];
  subject: string;
  bodyHtml: string;
  smtpConfig?: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    fromEmail: string;
    fromName: string;
  };
}

