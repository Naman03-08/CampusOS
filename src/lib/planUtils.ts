import { UserProfile } from '../types';

export interface PlanInfo {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: string;
  priceYearly: string;
  period: string;
  rawPrice: number;
  popular: boolean;
  badge: string;
  badgeColor: string;
  features: string[];
  usageLimits: {
    studySuites: string;
    dsaSolutions: string;
    assignmentSolver: string;
    resumeScans: string;
    mockInterviews: string;
    aiChatTutor: string;
  };
  notIncluded?: string[];
}

export const PLAN_DEFINITIONS: PlanInfo[] = [
  {
    id: 'free_trial',
    name: 'Free Trial Pass',
    tagline: '4-Day Full Access Pass for every student (Start whenever you choose)',
    priceMonthly: '₹0',
    priceYearly: '₹0',
    period: '4 Days Free',
    rawPrice: 0,
    popular: false,
    badge: '4-Day Free Pass',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    usageLimits: {
      studySuites: '5 Generations total',
      dsaSolutions: '3 Solutions / day',
      assignmentSolver: '5 Problems total',
      resumeScans: '2 ATS Resume Audits total',
      mockInterviews: '1 Practice Session total',
      aiChatTutor: '20 Messages total'
    },
    features: [
      '4 Days Full Access to basic features',
      '5 AI Study Suite generations (Notes, Flashcards, Quiz)',
      '3 CampusOS 375 DSA question AI solutions / day',
      '5 AI Assignment Solves (Step-by-step logic)',
      '2 ATS Resume Audit Scans & PDF Export',
      '1 AI Technical Mock Interview session',
      'Attendance Tracker & Smart Calendar'
    ],
    notIncluded: [
      'Unlimited AI Voice/Video Mock Interviews',
      'Unlimited CampusOS 375 DSA Code Coach',
      'Priority High-Speed AI Processing Engine'
    ]
  },
  {
    id: 'plan_199',
    name: 'Pro Scholar Pass',
    tagline: 'Perfect for active college students aiming for top GPAs',
    priceMonthly: '₹199',
    priceYearly: '₹1,899',
    period: 'per month (30 Days)',
    rawPrice: 199,
    popular: true,
    badge: 'Most Popular',
    badgeColor: 'bg-blue-600 text-white shadow-xs',
    usageLimits: {
      studySuites: '50 Generations / month',
      dsaSolutions: 'Unlimited 375 DSA Sheet',
      assignmentSolver: 'Unlimited Problems',
      resumeScans: '15 ATS Scans / month',
      mockInterviews: '5 Sessions / month',
      aiChatTutor: 'Unlimited 24/7 Chat'
    },
    features: [
      'Everything in Free Trial, PLUS:',
      'UNLIMITED AI Assignment Solver with step-by-step logic',
      'Complete CampusOS 375 DSA Roadmap Sheet access',
      '15 High-Score ATS Resume Scans & Keyword Scans / month',
      '50 AI Study Suites & Flashcard Generators / month',
      '5 AI Mock Interview Practice Sessions / month',
      'Smart Calendar Auto-Scheduler with exam alerts',
      'UNLIMITED 24/7 AI Tutor Chat Assistant'
    ],
    notIncluded: [
      'Unlimited AI Voice & Video Mock Interviews',
      '1-on-1 AI Placement Mentor'
    ]
  },
  {
    id: 'plan_349',
    name: 'Campus Pro Ultimate',
    tagline: 'Complete Placement & Academic Acceleration Pass',
    priceMonthly: '₹349',
    priceYearly: '₹3,299',
    period: 'per month (30 Days)',
    rawPrice: 349,
    popular: false,
    badge: 'Best Value for Placements',
    badgeColor: 'bg-indigo-600 text-white shadow-xs',
    usageLimits: {
      studySuites: 'UNLIMITED Generations',
      dsaSolutions: 'UNLIMITED Code Coach',
      assignmentSolver: 'UNLIMITED Solves',
      resumeScans: 'UNLIMITED Scans & PDF Exports',
      mockInterviews: 'UNLIMITED Voice/Video Sessions',
      aiChatTutor: 'UNLIMITED Priority Chat'
    },
    features: [
      'Everything in ₹199 Plan, PLUS:',
      'UNLIMITED 1-on-1 AI Voice & Video Mock Interviews',
      'UNLIMITED High-Score ATS Resume Builder & Job Matcher',
      'UNLIMITED Instant CampusOS 375 DSA Code Coach (C++, Java, Python, TS)',
      'UNLIMITED AI Cover Letter Generators for Target Companies',
      '1-on-1 AI Placement Mentor & Company Interview Prep',
      'Priority Ultra-Fast AI Reasoning Engine',
      'Verified CampusOS Completion Certificate'
    ],
    notIncluded: []
  }
];

export function calculatePlanDetails(user: UserProfile) {
  const rawPlan = user.plan;
  const isPaid = rawPlan === 'plan_199' || rawPlan === 'plan_349';
  
  // Check if trial was explicitly started by user action
  const hasStartedTrial = Boolean(user.freeTrialStartedAt || (rawPlan === 'free_trial' && user.planStartedAt));
  const freeTrialUsed = Boolean(user.freeTrialUsed || hasStartedTrial);

  let currentPlanId = rawPlan || 'none';
  if (currentPlanId === 'free_trial' && !hasStartedTrial) {
    currentPlanId = 'none'; // Not active yet
  }

  const isFreeTrial = currentPlanId === 'free_trial';

  let startedAtMs = 0;
  let expiresAtMs = 0;

  if (isPaid) {
    if (user.planStartedAt) {
      startedAtMs = new Date(user.planStartedAt).getTime();
    } else {
      startedAtMs = user.createdAt ? new Date(user.createdAt).getTime() : Date.now();
    }

    if (user.planExpiresAt) {
      expiresAtMs = new Date(user.planExpiresAt).getTime();
    } else {
      expiresAtMs = startedAtMs + 30 * 24 * 60 * 60 * 1000;
    }
  } else if (hasStartedTrial) {
    const trialStartIso = user.freeTrialStartedAt || user.planStartedAt;
    startedAtMs = trialStartIso ? new Date(trialStartIso).getTime() : Date.now();
    
    if (user.planExpiresAt) {
      expiresAtMs = new Date(user.planExpiresAt).getTime();
    } else {
      expiresAtMs = startedAtMs + 4 * 24 * 60 * 60 * 1000; // 4 Days
    }
  }

  const nowMs = Date.now();
  let hasActiveAccess = false;
  let isExpired = false;
  let daysRemaining = 0;

  if (isPaid || hasStartedTrial) {
    const diffMs = expiresAtMs - nowMs;
    daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    if (diffMs <= 0) {
      isExpired = true;
      hasActiveAccess = false;
    } else {
      isExpired = false;
      hasActiveAccess = true;
    }
  } else {
    // Trial NOT started yet and no paid plan!
    hasActiveAccess = false;
    isExpired = false;
    daysRemaining = 0;
  }

  let planName = 'No Active Plan';
  if (!hasActiveAccess) {
    if (isExpired) {
      planName = isFreeTrial ? 'Free Trial Expired' : 'Pro Plan Expired';
    } else if (!freeTrialUsed) {
      planName = '4-Day Free Trial Available';
    } else {
      planName = 'No Active Plan';
    }
  } else {
    if (currentPlanId === 'free_trial') planName = 'Free Trial (4 Days)';
    if (currentPlanId === 'plan_199') planName = 'Pro Scholar (₹199)';
    if (currentPlanId === 'plan_349') planName = 'Campus Pro Ultimate (₹349)';
  }

  const formattedStartedAt = startedAtMs > 0 ? new Date(startedAtMs).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'Not Started';

  const formattedExpiresAt = expiresAtMs > 0 ? new Date(expiresAtMs).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'Not Started';

  return {
    currentPlanId,
    planName,
    isFreeTrial,
    isPaid,
    hasStartedTrial,
    freeTrialUsed,
    hasActiveAccess,
    isExpired,
    daysRemaining,
    formattedStartedAt,
    formattedExpiresAt,
    expiresAtIso: expiresAtMs > 0 ? new Date(expiresAtMs).toISOString() : '',
    startedAtIso: startedAtMs > 0 ? new Date(startedAtMs).toISOString() : ''
  };
}
