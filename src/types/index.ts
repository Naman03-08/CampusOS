export type Role = 'student' | 'admin';

export interface UserStats {
  attendancePercentage: number;
  totalClassesAttended: number;
  totalClassesHeld: number;
  dsaSolvedCount: number;
  dsaTotalCount: number;
  dsaStreak: number;
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
  university?: string;
  major?: string;
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
