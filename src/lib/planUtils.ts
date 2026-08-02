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
    interviewPrep: string;
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
      assignmentSolver: '5 Chats total',
      resumeScans: '2 ATS Resume Audits total',
      interviewPrep: '1 Practice Session total',
      aiChatTutor: '20 Messages total'
    },
    features: [
      '4 Days Full Access to basic features',
      '5 AI Study Suite generations (Notes, Flashcards, Quiz)',
      '3 Placivo 375 DSA question AI solutions / day',
      '5 AI Academic Tutor Sessions',
      '2 ATS Resume Audit Scans & PDF Export',
      '256 Subjects Technical Interview Question Bank',
      'Attendance Tracker & Smart Calendar'
    ],
    notIncluded: [
      'Unlimited High-Score ATS Resume Scans',
      'Unlimited Placivo 375 DSA Code Coach',
      'Priority High-Speed Processing Engine'
    ]
  },
  {
    id: 'plan_199',
    name: 'Pro Scholar Pass',
    tagline: 'Perfect for active college students aiming for top GPAs & Placements',
    priceMonthly: '₹199',
    priceYearly: '₹1,899',
    period: 'per month (30 Days)',
    rawPrice: 199,
    popular: false,
    badge: 'Popular',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    usageLimits: {
      studySuites: '50 Generations / month',
      dsaSolutions: 'Unlimited 375 DSA Sheet',
      assignmentSolver: 'Unlimited Chats',
      resumeScans: '15 ATS Scans / month',
      interviewPrep: '5 Sessions / month',
      aiChatTutor: 'Unlimited 24/7 Chat'
    },
    features: [
      'Everything in Free Trial, PLUS:',
      'UNLIMITED AI Academic Tutor with step-by-step logic',
      'Complete Placivo 375 DSA Roadmap Sheet access',
      '15 High-Score ATS Resume Scans & Keyword Scans / month',
      '50 AI Study Suites & Flashcard Generators / month',
      'Full Access to 256 Technical Interview Subjects & Questions',
      'Smart Calendar Auto-Scheduler with exam alerts',
      'UNLIMITED 24/7 AI Tutor Chat Assistant'
    ],
    notIncluded: [
      'Unlimited High-Score ATS Resume Builder',
      '1-on-1 Company Placement Mentor'
    ]
  },
  {
    id: 'plan_349',
    name: 'Placivo Pro Ultimate',
    tagline: 'The most valuable plan for every individual to master academics, placement prep, and high-scoring DSA.',
    priceMonthly: '₹399',
    priceYearly: '₹3,799',
    period: 'per month (30 Days)',
    rawPrice: 399,
    popular: true,
    badge: 'Most Recommended',
    badgeColor: 'bg-indigo-600 text-white shadow-xs',
    usageLimits: {
      studySuites: 'UNLIMITED Generations',
      dsaSolutions: 'UNLIMITED Code Coach',
      assignmentSolver: 'UNLIMITED Chats',
      resumeScans: 'UNLIMITED Scans & PDF Exports',
      interviewPrep: 'UNLIMITED Question Bank Access',
      aiChatTutor: 'UNLIMITED Priority Chat'
    },
    features: [
      'Everything in ₹199 Plan, PLUS:',
      'UNLIMITED Technical Interview Question Bank (All 256 Subjects)',
      'UNLIMITED High-Score ATS Resume Builder & Job Matcher',
      'UNLIMITED Instant Placivo 375 DSA Code Coach (C++, Java, Python, TS)',
      'UNLIMITED AI Cover Letter Generators for Target Companies',
      '1-on-1 AI Placement Mentor & Company Technical Interview Prep',
      'Priority Ultra-Fast AI Reasoning Engine',
      'Verified Placivo Completion Certificate'
    ],
    notIncluded: []
  }
];

export function calculatePlanDetails(user: UserProfile) {
  const rawPlan = user?.plan ? String(user.plan).trim() : '';
  const rawPlanLower = rawPlan.toLowerCase();

  // Normalize Plan ID across all possible name representations
  let currentPlanId = 'none';
  if (
    rawPlanLower === 'plan_199' ||
    rawPlanLower === 'pro_199' ||
    rawPlanLower === '199' ||
    rawPlanLower.includes('scholar')
  ) {
    currentPlanId = 'plan_199';
  } else if (
    rawPlanLower === 'plan_349' ||
    rawPlanLower === 'plan_399' ||
    rawPlanLower === 'pro_349' ||
    rawPlanLower === 'pro_399' ||
    rawPlanLower === '349' ||
    rawPlanLower === '399' ||
    rawPlanLower.includes('ultimate')
  ) {
    currentPlanId = 'plan_349';
  } else if (rawPlanLower.includes('pro')) {
    // Default any generic 'pro' setting to plan_349 (Ultimate)
    currentPlanId = 'plan_349';
  } else if (rawPlanLower === 'free_trial' || rawPlanLower.includes('trial')) {
    currentPlanId = 'free_trial';
  }

  const isPaid = currentPlanId === 'plan_199' || currentPlanId === 'plan_349';

  // Check if trial was explicitly started by user action
  const hasStartedTrial = Boolean(user.freeTrialStartedAt || (currentPlanId === 'free_trial' && user.planStartedAt));
  const freeTrialUsed = Boolean(user.freeTrialUsed || hasStartedTrial);

  if (currentPlanId === 'free_trial' && !hasStartedTrial) {
    currentPlanId = 'none'; // Not active yet
  }

  // Check cancellation flag:
  // Note: An active paid plan string (plan_199 / plan_349) takes precedence over an old stale planCancelled flag.
  const isCancelled = Boolean(user.planCancelled);

  if (
    (!isPaid && (isCancelled || rawPlanLower === 'free tier' || rawPlanLower === 'none' || !rawPlanLower)) ||
    rawPlanLower === 'free tier' ||
    rawPlanLower === 'none'
  ) {
    return {
      currentPlanId: 'none',
      planName: isCancelled ? 'Subscription Cancelled' : 'Free Tier',
      isFreeTrial: false,
      isPaid: false,
      hasStartedTrial,
      freeTrialUsed,
      hasActiveAccess: false,
      isExpired: false, // Do NOT mark cancelled / free plan as expired
      daysRemaining: 0,
      formattedStartedAt: user.planStartedAt ? new Date(user.planStartedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A',
      formattedExpiresAt: user.planCancelledAt ? new Date(user.planCancelledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A',
      expiresAtIso: '',
      startedAtIso: ''
    };
  }

  const isFreeTrial = currentPlanId === 'free_trial';

  let startedAtMs = 0;
  let expiresAtMs = 0;
  const nowMs = Date.now();

  if (isPaid) {
    if (user.planStartedAt) {
      startedAtMs = new Date(user.planStartedAt).getTime();
      if (isNaN(startedAtMs)) startedAtMs = nowMs;
    } else {
      startedAtMs = user.createdAt ? new Date(user.createdAt).getTime() : nowMs;
      if (isNaN(startedAtMs)) startedAtMs = nowMs;
    }

    if (user.planExpiresAt) {
      expiresAtMs = new Date(user.planExpiresAt).getTime();
      if (isNaN(expiresAtMs) || expiresAtMs <= startedAtMs) {
        expiresAtMs = startedAtMs + 30 * 24 * 60 * 60 * 1000;
      }
    } else {
      expiresAtMs = startedAtMs + 30 * 24 * 60 * 60 * 1000;
    }

    // Safety guarantee for active paid plans: ensure expiration is at least 30 days from purchase start date or now
    if (expiresAtMs <= nowMs) {
      // If user is set to a paid plan but expiresAt was in the past, reset it to 30 days from now
      expiresAtMs = nowMs + 30 * 24 * 60 * 60 * 1000;
    }
  } else if (hasStartedTrial) {
    const trialStartIso = user.freeTrialStartedAt || user.planStartedAt;
    startedAtMs = trialStartIso ? new Date(trialStartIso).getTime() : nowMs;
    if (isNaN(startedAtMs)) startedAtMs = nowMs;

    if (user.planExpiresAt) {
      expiresAtMs = new Date(user.planExpiresAt).getTime();
      if (isNaN(expiresAtMs)) expiresAtMs = startedAtMs + 4 * 24 * 60 * 60 * 1000;
    } else {
      expiresAtMs = startedAtMs + 4 * 24 * 60 * 60 * 1000; // 4 Days
    }
  }

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
    if (currentPlanId === 'plan_349') planName = 'Placivo Pro Ultimate (₹399)';
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

export interface LimitCheckResult {
  allowed: boolean;
  maxLimit: number; // -1 for unlimited
  currentCount: number;
  featureName: string;
  message: string;
}

export function checkStudySuiteLimit(user: UserProfile, currentCount: number): LimitCheckResult {
  const details = calculatePlanDetails(user);
  if (!details.hasActiveAccess) {
    return {
      allowed: false,
      maxLimit: 0,
      currentCount,
      featureName: 'AI Study Suites',
      message: 'Please start your 4-Day Free Trial or upgrade to a Pro Plan to generate AI Study Suites.'
    };
  }

  if (details.currentPlanId === 'free_trial') {
    const maxLimit = 5;
    const allowed = currentCount < maxLimit;
    return {
      allowed,
      maxLimit,
      currentCount,
      featureName: 'AI Study Suites',
      message: allowed
        ? `Free Trial Pass: ${currentCount}/${maxLimit} Study Suites generated.`
        : `Free Trial limit reached (${maxLimit} Study Suites total). Upgrade to Pro Scholar (₹199) or Pro Ultimate (₹399) for 50 or UNLIMITED generations!`
    };
  }

  if (details.currentPlanId === 'plan_199') {
    const maxLimit = 50;
    const allowed = currentCount < maxLimit;
    return {
      allowed,
      maxLimit,
      currentCount,
      featureName: 'AI Study Suites',
      message: allowed
        ? `Pro Scholar Plan: ${currentCount}/${maxLimit} Study Suites generated this month.`
        : `Pro Scholar monthly limit reached (${maxLimit} Generations/month). Upgrade to Placivo Pro Ultimate (₹399) for UNLIMITED generations!`
    };
  }

  // plan_349 or higher: UNLIMITED
  return {
    allowed: true,
    maxLimit: -1,
    currentCount,
    featureName: 'AI Study Suites',
    message: 'Placivo Pro Ultimate: UNLIMITED AI Study Suite generations active.'
  };
}

export function checkDSASolutionLimit(user: UserProfile, todayCount: number): LimitCheckResult {
  const details = calculatePlanDetails(user);
  if (!details.hasActiveAccess) {
    return {
      allowed: false,
      maxLimit: 0,
      currentCount: todayCount,
      featureName: '375 DSA AI Code Coach',
      message: 'Please start your 4-Day Free Trial or upgrade to a Pro Plan to access 375 DSA AI solutions.'
    };
  }

  if (details.currentPlanId === 'free_trial') {
    const maxLimit = 3;
    const allowed = todayCount < maxLimit;
    return {
      allowed,
      maxLimit,
      currentCount: todayCount,
      featureName: '375 DSA AI Code Coach',
      message: allowed
        ? `Free Trial Pass: ${todayCount}/${maxLimit} DSA AI Solutions used today.`
        : `Free Trial daily limit reached (${maxLimit} DSA Solutions / day). Upgrade to Pro Scholar (₹199) or Pro Ultimate (₹399) for UNLIMITED 375 DSA Sheet Solutions!`
    };
  }

  // plan_199 and plan_349: UNLIMITED
  return {
    allowed: true,
    maxLimit: -1,
    currentCount: todayCount,
    featureName: '375 DSA AI Code Coach',
    message: 'Pro Plan: UNLIMITED 375 DSA Roadmap Code Coach active.'
  };
}

export function checkAIChatLimit(user: UserProfile, currentChatCount: number): LimitCheckResult {
  const details = calculatePlanDetails(user);
  if (!details.hasActiveAccess) {
    return {
      allowed: false,
      maxLimit: 0,
      currentCount: currentChatCount,
      featureName: '24/7 AI Academic Tutor Chat',
      message: 'Please start your 4-Day Free Trial or upgrade to a Pro Plan to chat with the AI Academic Tutor.'
    };
  }

  if (details.currentPlanId === 'free_trial') {
    const maxLimit = 20;
    const allowed = currentChatCount < maxLimit;
    return {
      allowed,
      maxLimit,
      currentCount: currentChatCount,
      featureName: '24/7 AI Academic Tutor Chat',
      message: allowed
        ? `Free Trial Pass: ${currentChatCount}/${maxLimit} AI Tutor messages used.`
        : `Free Trial chat limit reached (${maxLimit} Messages total). Upgrade to Pro Scholar (₹199) for UNLIMITED 24/7 AI Tutor Chat Assistant!`
    };
  }

  return {
    allowed: true,
    maxLimit: -1,
    currentCount: currentChatCount,
    featureName: '24/7 AI Academic Tutor Chat',
    message: 'Pro Plan: UNLIMITED 24/7 AI Academic Tutor Chat active.'
  };
}

export function checkResumeScanLimit(user: UserProfile, currentScanCount: number): LimitCheckResult {
  const details = calculatePlanDetails(user);
  if (!details.hasActiveAccess) {
    return {
      allowed: false,
      maxLimit: 0,
      currentCount: currentScanCount,
      featureName: 'ATS Resume Scans',
      message: 'Please start your 4-Day Free Trial or upgrade to a Pro Plan to run ATS Resume Audits.'
    };
  }

  if (details.currentPlanId === 'free_trial') {
    const maxLimit = 2;
    const allowed = currentScanCount < maxLimit;
    return {
      allowed,
      maxLimit,
      currentCount: currentScanCount,
      featureName: 'ATS Resume Scans',
      message: allowed
        ? `Free Trial Pass: ${currentScanCount}/${maxLimit} ATS Resume Audits completed.`
        : `Free Trial ATS scan limit reached (${maxLimit} Audits total). Upgrade to Pro Scholar (15 Scans/month) or Pro Ultimate (UNLIMITED Scans & Resume Builder)!`
    };
  }

  if (details.currentPlanId === 'plan_199') {
    const maxLimit = 15;
    const allowed = currentScanCount < maxLimit;
    return {
      allowed,
      maxLimit,
      currentCount: currentScanCount,
      featureName: 'ATS Resume Scans',
      message: allowed
        ? `Pro Scholar Plan: ${currentScanCount}/${maxLimit} ATS Resume Scans used this month.`
        : `Pro Scholar monthly limit reached (${maxLimit} Scans/month). Upgrade to Placivo Pro Ultimate (₹399) for UNLIMITED ATS Scans & Resume Builder!`
    };
  }

  return {
    allowed: true,
    maxLimit: -1,
    currentCount: currentScanCount,
    featureName: 'ATS Resume Scans',
    message: 'Placivo Pro Ultimate: UNLIMITED High-Score ATS Resume Builder & Scans active.'
  };
}

export function checkInterviewPrepLimit(user: UserProfile, currentSessionCount: number): LimitCheckResult {
  const details = calculatePlanDetails(user);
  if (!details.hasActiveAccess) {
    return {
      allowed: false,
      maxLimit: 0,
      currentCount: currentSessionCount,
      featureName: 'Technical Interview Prep',
      message: 'Please start your 4-Day Free Trial or upgrade to a Pro Plan to access Technical Interview Prep.'
    };
  }

  if (details.currentPlanId === 'free_trial') {
    const maxLimit = 1;
    const allowed = currentSessionCount < maxLimit;
    return {
      allowed,
      maxLimit,
      currentCount: currentSessionCount,
      featureName: 'Technical Interview Prep',
      message: allowed
        ? `Free Trial Pass: ${currentSessionCount}/${maxLimit} Technical Interview practice session completed.`
        : `Free Trial interview prep limit reached (${maxLimit} Session total). Upgrade to Pro Scholar (5/month) or Pro Ultimate (UNLIMITED 1-on-1 Practice)!`
    };
  }

  if (details.currentPlanId === 'plan_199') {
    const maxLimit = 5;
    const allowed = currentSessionCount < maxLimit;
    return {
      allowed,
      maxLimit,
      currentCount: currentSessionCount,
      featureName: 'Technical Interview Prep',
      message: allowed
        ? `Pro Scholar Plan: ${currentSessionCount}/${maxLimit} Technical Interview practice sessions used this month.`
        : `Pro Scholar monthly interview limit reached (${maxLimit} Sessions/month). Upgrade to Placivo Pro Ultimate (₹399) for UNLIMITED 1-on-1 Practice & Question Bank!`
    };
  }

  return {
    allowed: true,
    maxLimit: -1,
    currentCount: currentSessionCount,
    featureName: 'Technical Interview Prep',
    message: 'Placivo Pro Ultimate: UNLIMITED 1-on-1 Technical Interview Prep & Question Bank active.'
  };
}

