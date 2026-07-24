import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Database, 
  Users, 
  Activity, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ShieldCheck,
  RefreshCw,
  Search,
  BookOpen,
  Code2,
  FileCheck,
  Briefcase,
  GraduationCap,
  Calendar,
  X,
  ExternalLink,
  Clock,
  Sparkles,
  BarChart3,
  Award,
  DollarSign,
  CreditCard,
  TrendingUp,
  Mail,
  Send,
  CheckSquare,
  Square,
  Settings,
  HelpCircle,
  Layers,
  ChevronRight,
  Plus,
  Trash2,
  UserX,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { UserProfile, MonthlyProfitRecord, StudentCoursePurchase } from '../../types';
import { FirestoreService, UserFullData } from '../../lib/firestoreService';
import { SectionUsageBanner } from '../common/SectionUsageBanner';

interface AdminPanelViewProps {
  user?: UserProfile;
  onNavigateTab?: (tab: string) => void;
}

const ADMIN_EMAIL = 'naman03mgs@gmail.com';
const SECURITY_KEY = 'Naman@#2008';

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ user, onNavigateTab }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('campusos_admin_unlocked') === 'true';
  });
  const [securityInput, setSecurityInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);

  // Active Admin Section Tab: 'telemetry' | 'financials' | 'email_broadcast'
  const [activeAdminTab, setActiveAdminTab] = useState<'telemetry' | 'financials' | 'email_broadcast'>('telemetry');

  // Firestore Registered Users State
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Student Inspection Modal State
  const [selectedUserUid, setSelectedUserUid] = useState<string | null>(null);
  const [inspectData, setInspectData] = useState<UserFullData | null>(null);
  const [loadingInspect, setLoadingInspect] = useState<boolean>(false);
  const [inspectTab, setInspectTab] = useState<'attendance' | 'dsa' | 'assignments' | 'suites' | 'mock'>('attendance');

  // -------------------------------------------------------------
  // SECTION 1 STATE: Financials, Gross Profits & Course Purchases
  // -------------------------------------------------------------
  const [monthlyProfits, setMonthlyProfits] = useState<MonthlyProfitRecord[]>([]);
  const [loadingProfits, setLoadingProfits] = useState<boolean>(false);
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>(() => new Date().toISOString().slice(0, 7));

  const [coursePurchases, setCoursePurchases] = useState<StudentCoursePurchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState<boolean>(false);

  // New Monthly Record Modal Form
  const [showAddMonthModal, setShowAddMonthModal] = useState<boolean>(false);
  const [newMonthKey, setNewMonthKey] = useState(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toISOString().slice(0, 7);
  });
  const [newMonthName, setNewMonthName] = useState(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });
  const [newSubRevenue, setNewSubRevenue] = useState('0');
  const [newCourseRevenue, setNewCourseRevenue] = useState('0');

  // Admin Payment Deletion & Subscription Cancellation States
  const [paymentToDelete, setPaymentToDelete] = useState<StudentCoursePurchase | null>(null);
  const [isDeletingPayment, setIsDeletingPayment] = useState(false);
  const [userToCancelSub, setUserToCancelSub] = useState<UserProfile | null>(null);
  const [isCancellingSub, setIsCancellingSub] = useState(false);

  // -------------------------------------------------------------
  // SECTION 2 STATE: Real Email Broadcast & AI Email Draft Helper
  // -------------------------------------------------------------
  const [selectedRecipientEmails, setSelectedRecipientEmails] = useState<string[]>([]);
  const [emailSearch, setEmailSearch] = useState('');
  const [emailTopicInput, setEmailTopicInput] = useState('');
  const [isDraftingAI, setIsDraftingAI] = useState(false);

  const [draftedSubject, setDraftedSubject] = useState('');
  const [draftedText, setDraftedText] = useState('');

  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatusMessage, setEmailStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    details?: string[];
  } | null>(null);

  // SMTP Credentials Config State & Live Testing
  const [showSmtpSettings, setShowSmtpSettings] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);
  const [smtpTestResult, setSmtpTestResult] = useState<{ success: boolean; message: string; advice?: string } | null>(null);
  const [smtpConfig, setSmtpConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('campusos_admin_smtp_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.port === 535 || (parsed.host && parsed.host.includes('gmail') && parsed.port !== 465 && parsed.port !== 587)) {
          parsed.port = 587;
        }
        return parsed;
      }
      return {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        user: 'naman03mgs@gmail.com',
        pass: '',
        fromEmail: 'naman03mgs@gmail.com',
        fromName: 'CampusOS AI Administrator'
      };
    } catch {
      return {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        user: 'naman03mgs@gmail.com',
        pass: '',
        fromEmail: 'naman03mgs@gmail.com',
        fromName: 'CampusOS AI Administrator'
      };
    }
  });

  const currentUserEmail = user?.email?.trim().toLowerCase() || '';
  const isAuthorizedEmail = currentUserEmail === ADMIN_EMAIL;

  // Load all data from Firestore when unlocked
  const fetchAllData = async () => {
    setLoadingUsers(true);
    setLoadingProfits(true);
    setLoadingPurchases(true);

    try {
      // 1. Fetch Users
      const usersList = await FirestoreService.getAllUsers();
      let finalUsers = usersList;
      if (usersList.length === 0 && user) {
        finalUsers = [user];
      }
      setAllUsers(finalUsers);

      // Initialize default selections for email
      setSelectedRecipientEmails(finalUsers.map(u => u.email).filter(Boolean));

      // 2. Fetch Monthly Profits from Firestore
      const profitRecords = await FirestoreService.getMonthlyProfits();
      setMonthlyProfits(profitRecords);
      if (profitRecords.length > 0) {
        setSelectedMonthKey(profitRecords[0].monthKey);
      }

      // 3. Fetch Course Purchases from Firestore
      const purchases = await FirestoreService.getAllCoursePurchases();
      setCoursePurchases(purchases);

    } catch (e) {
      console.warn("Error fetching admin data:", e);
    } finally {
      setLoadingUsers(false);
      setLoadingProfits(false);
      setLoadingPurchases(false);
    }
  };

  useEffect(() => {
    if (isUnlocked && isAuthorizedEmail) {
      fetchAllData();
    }
  }, [isUnlocked, isAuthorizedEmail]);

  // Unlock Admin Key
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (securityInput === SECURITY_KEY) {
      setIsUnlocked(true);
      sessionStorage.setItem('campusos_admin_unlocked', 'true');
      setSecurityInput('');
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Security Key. Access Denied!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleLockPanel = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('campusos_admin_unlocked');
    setSecurityInput('');
    setErrorMsg('');
  };

  // Inspect student detailed progress
  const handleInspectUser = async (studentUid: string) => {
    setSelectedUserUid(studentUid);
    setLoadingInspect(true);
    try {
      const data = await FirestoreService.getUserFullData(studentUid);
      setInspectData(data);
    } catch (e) {
      console.warn("Error fetching student full data:", e);
    } finally {
      setLoadingInspect(false);
    }
  };

  // Manual Reset Handler: Reset all revenue numbers to ₹0 baseline starting fresh from today
  const handleResetFinancialsToZero = async () => {
    if (!window.confirm("Are you sure you want to reset all financial numbers, revenue, and monthly profit records in Firestore to ₹0 baseline starting fresh from today?")) {
      return;
    }
    setLoadingProfits(true);
    try {
      const zeroRecords = await FirestoreService.resetFinancialsToZeroBaseline();
      setMonthlyProfits(zeroRecords);
      setCoursePurchases([]);
      if (zeroRecords.length > 0) {
        setSelectedMonthKey(zeroRecords[0].monthKey);
      }
      setEmailStatusMessage({
        type: 'success',
        text: 'All revenue metrics and monthly profits have been reset to ₹0 baseline starting fresh from today!'
      });
    } catch (e: any) {
      console.error("Failed to reset financials:", e);
      setEmailStatusMessage({
        type: 'error',
        text: `Failed to reset financials: ${e.message || e}`
      });
    } finally {
      setLoadingProfits(false);
    }
  };

  // Save new month gross profit record
  const handleSaveNewMonthRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    const subRev = Number(newSubRevenue) || 0;
    const crsRev = Number(newCourseRevenue) || 0;
    const totalGross = subRev + crsRev;

    const record: MonthlyProfitRecord = {
      id: newMonthKey,
      monthKey: newMonthKey,
      monthName: newMonthName,
      subscriptionRevenue: subRev,
      courseRevenue: crsRev,
      grossProfit: totalGross,
      subscriptionCount: Math.round(subRev / 349),
      coursePurchaseCount: Math.round(crsRev / 599),
      updatedAt: new Date().toISOString()
    };

    await FirestoreService.saveMonthlyProfit(record);
    setMonthlyProfits((prev) => [record, ...prev.filter((p) => p.monthKey !== record.monthKey)]);
    setSelectedMonthKey(record.monthKey);
    setShowAddMonthModal(false);
  };

  // Helper to normalize and auto-fix domain typos in SMTP settings
  const normalizeConfig = (cfg: typeof smtpConfig) => {
    let user = (cfg.user || '').trim().toLowerCase()
      .replace(/@gmai\.com$/i, '@gmail.com')
      .replace(/@gamil\.com$/i, '@gmail.com')
      .replace(/@gmial\.com$/i, '@gmail.com');
    let fromEmail = (cfg.fromEmail || user).trim().toLowerCase()
      .replace(/@gmai\.com$/i, '@gmail.com')
      .replace(/@gamil\.com$/i, '@gmail.com')
      .replace(/@gmial\.com$/i, '@gmail.com');
    let host = (cfg.host || 'smtp.gmail.com').trim().toLowerCase();
    let port = Number(cfg.port) || 587;
    if (port === 535 || (host.includes('gmail') && port !== 465 && port !== 587)) {
      port = 587;
    }
    if (host.includes('gmail') || user.endsWith('@gmail.com')) {
      host = 'smtp.gmail.com';
      fromEmail = user; // Gmail requires From header to match authenticated Gmail account
    }
    // Strip spaces from password (e.g. Google App Passwords 'xxxx yyyy zzzz wwww' -> 'xxxxyyyyzzzzwwww')
    const cleanedPass = (cfg.pass || '').toString().replace(/\s+/g, '').trim();

    return {
      ...cfg,
      host,
      port,
      user,
      fromEmail,
      pass: cleanedPass
    };
  };

  // Save SMTP Settings with live verification
  const handleSaveSmtpSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingSmtp(true);
    setSmtpTestResult(null);

    const cleaned = normalizeConfig(smtpConfig);
    setSmtpConfig(cleaned);

    try {
      const res = await fetch('/api/admin/test-smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smtpConfig: cleaned })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('campusos_admin_smtp_config', JSON.stringify(cleaned));
        setShowSmtpSettings(false);
        setEmailStatusMessage({
          type: 'success',
          text: data.message || `SMTP Server verified & saved successfully! Test email delivered to ${cleaned.user}.`
        });
      } else {
        setSmtpTestResult({
          success: false,
          message: data.error || 'Failed to authenticate with SMTP server.',
          advice: data.advice || 'Please enter a valid 16-character Google App Password from myaccount.google.com/apppasswords'
        });
      }
    } catch (err: any) {
      setSmtpTestResult({
        success: false,
        message: err.message || 'Network error verifying SMTP server credentials.'
      });
    } finally {
      setIsTestingSmtp(false);
    }
  };

  // Test SMTP Server Connection
  const handleTestSmtpConnection = async () => {
    setIsTestingSmtp(true);
    setSmtpTestResult(null);

    const activeConfig = normalizeConfig(smtpConfig);
    setSmtpConfig(activeConfig);

    try {
      const res = await fetch('/api/admin/test-smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smtpConfig: activeConfig })
      });
      const data = await res.json();
      if (data.success) {
        setSmtpTestResult({
          success: true,
          message: data.message || 'SMTP Connection Verified Successfully!'
        });
      } else {
        setSmtpTestResult({
          success: false,
          message: data.error || 'Failed to connect to SMTP server.',
          advice: data.advice
        });
      }
    } catch (err: any) {
      setSmtpTestResult({
        success: false,
        message: err.message || 'Network error testing SMTP connection.'
      });
    } finally {
      setIsTestingSmtp(false);
    }
  };

  // AI Email Draft Assistant in Simple English Text
  const handleAIDraftEmail = async () => {
    if (!emailTopicInput.trim()) return;
    setIsDraftingAI(true);
    setEmailStatusMessage(null);

    try {
      const res = await fetch('/api/admin/ai-draft-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: emailTopicInput,
          recipientCount: selectedRecipientEmails.length,
          targetAudience: 'Registered CampusOS Students'
        })
      });

      const data = await res.json();
      if (data.subject && (data.message || data.bodyText)) {
        setDraftedSubject(data.subject);
        setDraftedText(data.message || data.bodyText);
      }
    } catch (err) {
      console.error('Error drafting email with AI:', err);
    } finally {
      setIsDraftingAI(false);
    }
  };

  // Dispatch Real Email
  const handleSendEmailBroadcast = async () => {
    if (selectedRecipientEmails.length === 0) {
      setEmailStatusMessage({
        type: 'error',
        text: 'Please select at least 1 student recipient to send email.'
      });
      return;
    }

    if (!draftedSubject.trim() || !draftedText.trim()) {
      setEmailStatusMessage({
        type: 'error',
        text: 'Please draft an email subject and message body in simple English before sending.'
      });
      return;
    }

    setIsSendingEmail(true);
    setEmailStatusMessage(null);

    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmails: selectedRecipientEmails,
          subject: draftedSubject,
          message: draftedText,
          bodyText: draftedText,
          smtpConfig: normalizeConfig(smtpConfig)
        })
      });

      const result = await res.json();
      if (result.success) {
        setEmailStatusMessage({
          type: 'success',
          text: result.message || `Successfully sent email to ${selectedRecipientEmails.length} recipients!`,
          details: result.errors
        });
      } else {
        setEmailStatusMessage({
          type: 'error',
          text: result.error || result.message || 'Failed to dispatch emails.',
          details: result.advice ? [result.advice] : (result.errors || [])
        });
      }
    } catch (err: any) {
      console.error('Send email error:', err);
      setEmailStatusMessage({
        type: 'error',
        text: err.message || 'Failed to dispatch email broadcast.'
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Admin Handlers: Delete Payment Transaction & Cancel Subscription
  const handleDeletePayment = async () => {
    if (!paymentToDelete) return;
    setIsDeletingPayment(true);
    try {
      await FirestoreService.deleteTransactionAndAdjustMonthlyProfit(paymentToDelete);
      // Refresh local state
      const updatedPurchases = coursePurchases.filter(p => p.id !== paymentToDelete.id);
      setCoursePurchases(updatedPurchases);

      const updatedProfits = await FirestoreService.getMonthlyProfits();
      setMonthlyProfits(updatedProfits);

      setPaymentToDelete(null);
      setEmailStatusMessage({
        type: 'success',
        text: `Payment of ₹${paymentToDelete.pricePaid} for '${paymentToDelete.courseTitle}' was permanently deleted and monthly profit adjusted in Firestore!`
      });
    } catch (e: any) {
      console.error("Failed to delete payment:", e);
      setEmailStatusMessage({
        type: 'error',
        text: `Failed to delete payment transaction: ${e.message || e}`
      });
    } finally {
      setIsDeletingPayment(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!userToCancelSub) return;
    setIsCancellingSub(true);
    try {
      await FirestoreService.cancelUserSubscription(userToCancelSub.uid);
      // Update local allUsers state
      setAllUsers(prev => prev.map(u => u.uid === userToCancelSub.uid ? { ...u, plan: 'Free Tier', planExpiresAt: undefined } : u));
      setUserToCancelSub(null);
      setEmailStatusMessage({
        type: 'success',
        text: `Subscription cancelled successfully for ${userToCancelSub.displayName || userToCancelSub.email}. User set to Free Tier in Firestore.`
      });
    } catch (e: any) {
      console.error("Failed to cancel subscription:", e);
      setEmailStatusMessage({
        type: 'error',
        text: `Failed to cancel user subscription: ${e.message || e}`
      });
    } finally {
      setIsCancellingSub(false);
    }
  };

  // Helper calculation for Subscription Expiration Days Remaining & Real Paid Amount
  const getSubscriptionInfo = (u: UserProfile) => {
    const rawPlan = u.plan ? u.plan.trim() : '';
    const isFree = !rawPlan || rawPlan === 'free_trial' || rawPlan === 'Free Tier' || rawPlan === 'Free' || rawPlan.toLowerCase().includes('starter') || rawPlan.toLowerCase().includes('free');
    
    const planName = isFree 
      ? 'Free Tier / Starter' 
      : (rawPlan === 'free_trial' ? '4-Day Free Trial' : rawPlan);

    // Exact paid price mapping for active plan
    let price = 0;
    if (!isFree) {
      if (rawPlan === 'plan_199' || planName.toLowerCase().includes('pro scholar') || rawPlan.includes('199')) {
        price = 199;
      } else if (rawPlan === 'plan_349' || planName.toLowerCase().includes('ultimate') || planName.toLowerCase().includes('pro') || rawPlan.includes('349')) {
        price = 349;
      } else if (planName.toLowerCase().includes('ultra') || rawPlan.includes('599')) {
        price = 599;
      } else if (planName.toLowerCase().includes('year') || rawPlan.includes('1999')) {
        price = 1999;
      } else {
        price = 349; // Default paid plan rate
      }
    }

    // Remaining days calculation
    let daysRemaining = 0;
    let statusLabel = 'Free Access';

    if (!isFree) {
      if (u.planExpiresAt) {
        const exp = new Date(u.planExpiresAt).getTime();
        const diff = exp - Date.now();
        daysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
      } else {
        daysRemaining = 30; // Default active 30 days
      }

      statusLabel = `${daysRemaining} Days Remaining`;
      if (daysRemaining === 0) statusLabel = 'Expired';
      if (daysRemaining <= 5 && daysRemaining > 0) statusLabel = `Expiring Soon (${daysRemaining}d left)`;
    }

    return {
      planName,
      price,
      daysRemaining,
      statusLabel,
      isFree
    };
  };

  // Real Financial Calculations connected to all registered users (allUsers) and purchase logs (coursePurchases)
  const liveFinancials = useMemo(() => {
    // 1. Subscription Revenue from purchases logged in coursePurchases
    const subPurchasesFromLogs = coursePurchases.filter(
      p => p.id.startsWith('sub_') || p.courseTitle.toLowerCase().includes('subscription')
    );
    const subRevFromLogs = subPurchasesFromLogs.reduce((sum, p) => sum + (p.pricePaid || 0), 0);

    // 2. Set of emails already in subPurchasesFromLogs to prevent double-counting
    const loggedUserEmailsForSub = new Set(
      subPurchasesFromLogs.map(p => (p.userEmail || '').toLowerCase().trim())
    );

    // 3. Subscription Revenue from registered users in allUsers holding active paid plans
    const activePaidUsers = allUsers.filter(u => {
      const sub = getSubscriptionInfo(u);
      return !sub.isFree && sub.price > 0;
    });

    const subRevFromActiveUsers = activePaidUsers
      .filter(u => !loggedUserEmailsForSub.has((u.email || '').toLowerCase().trim()))
      .reduce((sum, u) => sum + getSubscriptionInfo(u).price, 0);

    const totalSubRevenue = subRevFromLogs + subRevFromActiveUsers;
    const totalSubCount = subPurchasesFromLogs.length + activePaidUsers.filter(u => !loggedUserEmailsForSub.has((u.email || '').toLowerCase().trim())).length;

    // 4. Course Sales Revenue from coursePurchases
    const coursePurchasesOnly = coursePurchases.filter(
      p => !p.id.startsWith('sub_') && !p.courseTitle.toLowerCase().includes('subscription')
    );
    const totalCourseRevenue = coursePurchasesOnly.reduce((sum, p) => sum + (p.pricePaid || 0), 0);
    const totalCourseCount = coursePurchasesOnly.length;

    const totalGrossProfit = totalSubRevenue + totalCourseRevenue;

    return {
      totalSubRevenue,
      totalSubCount,
      totalCourseRevenue,
      totalCourseCount,
      totalGrossProfit
    };
  }, [allUsers, coursePurchases]);

  const currentMonthKey = useMemo(() => new Date().toISOString().slice(0, 7), []);
  const currentMonthName = useMemo(() => new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), []);

  // Effective Monthly Profits records for UI display
  const effectiveMonthlyProfits = useMemo(() => {
    let list = monthlyProfits.length > 0 ? [...monthlyProfits] : [{
      id: currentMonthKey,
      monthKey: currentMonthKey,
      monthName: currentMonthName,
      subscriptionRevenue: liveFinancials.totalSubRevenue,
      courseRevenue: liveFinancials.totalCourseRevenue,
      grossProfit: liveFinancials.totalGrossProfit,
      subscriptionCount: liveFinancials.totalSubCount,
      coursePurchaseCount: liveFinancials.totalCourseCount,
      updatedAt: new Date().toISOString()
    }];

    // Ensure current month record reflects actual live financials
    let hasCurrentMonth = false;
    list = list.map(m => {
      if (m.monthKey === currentMonthKey) {
        hasCurrentMonth = true;
        const subRev = Math.max(m.subscriptionRevenue || 0, liveFinancials.totalSubRevenue);
        const crsRev = Math.max(m.courseRevenue || 0, liveFinancials.totalCourseRevenue);
        return {
          ...m,
          subscriptionRevenue: subRev,
          courseRevenue: crsRev,
          grossProfit: subRev + crsRev,
          subscriptionCount: Math.max(m.subscriptionCount || 0, liveFinancials.totalSubCount),
          coursePurchaseCount: Math.max(m.coursePurchaseCount || 0, liveFinancials.totalCourseCount)
        };
      }
      return m;
    });

    if (!hasCurrentMonth) {
      list.unshift({
        id: currentMonthKey,
        monthKey: currentMonthKey,
        monthName: currentMonthName,
        subscriptionRevenue: liveFinancials.totalSubRevenue,
        courseRevenue: liveFinancials.totalCourseRevenue,
        grossProfit: liveFinancials.totalGrossProfit,
        subscriptionCount: liveFinancials.totalSubCount,
        coursePurchaseCount: liveFinancials.totalCourseCount,
        updatedAt: new Date().toISOString()
      });
    }

    return list;
  }, [monthlyProfits, liveFinancials, currentMonthKey, currentMonthName]);

  // Sync live financials to Firestore whenever live totals are available
  useEffect(() => {
    if (isUnlocked && isAuthorizedEmail && (liveFinancials.totalSubRevenue > 0 || liveFinancials.totalCourseRevenue > 0)) {
      const recordToSync: MonthlyProfitRecord = {
        id: currentMonthKey,
        monthKey: currentMonthKey,
        monthName: currentMonthName,
        subscriptionRevenue: liveFinancials.totalSubRevenue,
        courseRevenue: liveFinancials.totalCourseRevenue,
        grossProfit: liveFinancials.totalGrossProfit,
        subscriptionCount: liveFinancials.totalSubCount,
        coursePurchaseCount: liveFinancials.totalCourseCount,
        updatedAt: new Date().toISOString()
      };
      FirestoreService.saveMonthlyProfit(recordToSync).catch(e => console.warn("Failed syncing live financials to Firestore:", e));
    }
  }, [isUnlocked, isAuthorizedEmail, liveFinancials, currentMonthKey, currentMonthName]);

  // Overall Financial Totals across all months/live
  const totalSubRevenueAllTime = Math.max(liveFinancials.totalSubRevenue, effectiveMonthlyProfits.reduce((sum, p) => sum + (p.subscriptionRevenue || 0), 0));
  const totalCourseRevenueAllTime = Math.max(liveFinancials.totalCourseRevenue, effectiveMonthlyProfits.reduce((sum, p) => sum + (p.courseRevenue || 0), 0));
  const totalGrossProfitAllTime = totalSubRevenueAllTime + totalCourseRevenueAllTime;

  const currentMonthRecord = effectiveMonthlyProfits.find((p) => p.monthKey === selectedMonthKey) || effectiveMonthlyProfits[0];

  // Case 1: Unauthorized Email Access
  if (!isAuthorizedEmail) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-2xl border border-red-200 rounded-3xl p-8 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900">Restricted Admin Access</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              The Admin Panel is strictly locked and exclusive to authorized administrator <code className="bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">{ADMIN_EMAIL}</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-1">
            <p className="font-bold text-slate-700">Current Logged-in Account:</p>
            <p className="font-mono text-slate-600 truncate">{user?.email || 'Guest / Unauthenticated'}</p>
          </div>

          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </div>
    );
  }

  // Case 2: Security Key Locked
  if (!isUnlocked) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className={`max-w-md w-full bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all ${shake ? 'animate-bounce' : ''}`}>
          <div className="text-center space-y-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20">
              <Lock className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin Security Verification Required</span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Security Lock</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Welcome <span className="font-bold text-slate-700">{ADMIN_EMAIL}</span>. Please enter your secret key to unlock full platform telemetry, revenue profits & email broadcast studio.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Security Key
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showKey ? 'text' : 'password'}
                  required
                  value={securityInput}
                  onChange={(e) => {
                    setSecurityInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter Security Key..."
                  className="w-full pl-10 pr-10 py-3 text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-mono tracking-wider transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredUsers = allUsers.filter(u => 
    u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.major && u.major.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="Admin Control, Financial Revenue & Real Email Broadcast"
        subtitle="Full administrative command center for platform operations, financial tracking & student messaging"
        purpose="This comprehensive admin dashboard enables platform administrators to track real-time gross profits from subscription plans and course purchases saved directly in Firebase Firestore. Inspect student subscription remaining days, manage monthly revenue history, and send real broadcast emails to registered student email IDs with AI drafting support."
        keyFeatures={[
          'Gross Profit & Monthly Revenue Records Saved in Firebase Firestore',
          'Student Subscription List with Expiration Days Remaining Calculator',
          'Separate Categorized List of Students who Purchased Coding Courses',
          'Real Student Email Dispatch Hub with Custom SMTP Server Support',
          'Gemini AI Email Drafting Assistant by Topic Input',
          'Live Registered Student Telemetry & Progress Inspector'
        ]}
        icon={<ShieldAlert className="w-6 h-6 text-white" />}
        badge="Admin Full Control Purpose"
      />

      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-3d">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">Admin Control & Platform Operations</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Firestore Connected
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Logged in as <strong className="text-slate-800">{ADMIN_EMAIL}</strong> • Synchronized with live database collections.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={fetchAllData}
            disabled={loadingUsers}
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
            <span>Sync Firestore</span>
          </button>

          <button
            onClick={handleLockPanel}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Lock Panel</span>
          </button>
        </div>
      </div>

      {/* Main Admin Section Nav Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('financials')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeAdminTab === 'financials'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-700 hover:bg-white hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Financials, Gross Profits & Subscriptions</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px]">₹ {totalGrossProfitAllTime.toLocaleString()}</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('email_broadcast')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeAdminTab === 'email_broadcast'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-700 hover:bg-white hover:text-slate-900'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Registered User Email Broadcast & AI Writer</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px]">SMTP & AI</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('telemetry')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeAdminTab === 'telemetry'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-700 hover:bg-white hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Directory & Progress Inspector</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]">{allUsers.length}</span>
        </button>
      </div>

      {/* ======================================================================== */}
      {/* SECTION 1 TAB: FINANCIALS, GROSS PROFITS, SUBSCRIPTIONS & COURSE PURCHASES */}
      {/* ======================================================================== */}
      {activeAdminTab === 'financials' && (
        <div className="space-y-6">
          {/* Top Gross Profit Banner Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg space-y-1">
              <div className="flex items-center justify-between opacity-80">
                <p className="text-xs font-bold uppercase tracking-wider">All-Time Gross Profit</p>
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black">₹ {totalGrossProfitAllTime.toLocaleString()}</p>
              <p className="text-[11px] font-medium opacity-90">Subscriptions + Course Sales Combined</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <p className="text-xs font-bold uppercase tracking-wider">Subscription Revenue</p>
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-black text-slate-900">₹ {totalSubRevenueAllTime.toLocaleString()}</p>
              <p className="text-[11px] font-bold text-blue-600">From Active Student Plan Purchases</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <p className="text-xs font-bold uppercase tracking-wider">Course Sales Revenue</p>
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-3xl font-black text-slate-900">₹ {totalCourseRevenueAllTime.toLocaleString()}</p>
              <p className="text-[11px] font-bold text-indigo-600">From Individual Course Purchases</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <p className="text-xs font-bold uppercase tracking-wider">Current Month Revenue ({currentMonthRecord?.monthName || 'July 2026'})</p>
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl font-black text-amber-600">₹ {(currentMonthRecord?.grossProfit || 0).toLocaleString()}</p>
              <p className="text-[11px] font-semibold text-slate-500">Stored in Firebase `monthly_profits`</p>
            </div>
          </div>

          {/* Monthly Gross Profit Selector & History Table */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5 card-3d">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  Monthly Gross Profits History (Saved in Firebase Firestore)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select and review historical profit metrics for every month, or add a new monthly profit entry.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedMonthKey}
                  onChange={(e) => setSelectedMonthKey(e.target.value)}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {effectiveMonthlyProfits.map((mp) => (
                    <option key={mp.monthKey} value={mp.monthKey}>
                      {mp.monthName} — Gross: ₹{mp.grossProfit.toLocaleString()}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleResetFinancialsToZero}
                  disabled={loadingProfits}
                  title="Reset all revenue and profit metrics to ₹0 starting fresh from today"
                  className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-600" />
                  <span>Reset to ₹0 Baseline</span>
                </button>

                <button
                  onClick={() => setShowAddMonthModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Month Record</span>
                </button>
              </div>
            </div>

            {/* Monthly Profit Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {effectiveMonthlyProfits.length === 0 ? (
                <div className="col-span-full p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-500">No monthly gross profit records in Firebase Firestore yet.</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">When users upgrade plans or purchase courses, real monthly profits will automatically record here.</p>
                </div>
              ) : (
                effectiveMonthlyProfits.map((mp) => (
                  <div
                    key={mp.monthKey}
                    onClick={() => setSelectedMonthKey(mp.monthKey)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedMonthKey === mp.monthKey
                        ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-slate-900">{mp.monthName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Firebase Saved
                      </span>
                    </div>
                    <p className="text-xl font-black text-slate-900">₹ {mp.grossProfit.toLocaleString()}</p>
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium flex items-center justify-between">
                      <span>Subs: ₹{mp.subscriptionRevenue.toLocaleString()}</span>
                      <span>Courses: ₹{mp.courseRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* TWO SEPARATE CATEGORIZED TABLES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TABLE 1: Students with Subscriptions & Remaining Days */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    Students with Website Subscriptions
                  </h3>
                  <p className="text-xs text-slate-500">
                    Names, email IDs, active plan names & days remaining before subscription expiry.
                  </p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  {allUsers.length} Students
                </span>
              </div>

              <div className="overflow-x-auto space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {allUsers.map((u) => {
                  const sub = getSubscriptionInfo(u);
                  return (
                    <div
                      key={u.uid}
                      className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between text-xs hover:bg-white transition-colors"
                    >
                      <div className="pr-2 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-slate-900 truncate">{u.displayName}</p>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                            sub.isFree ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {sub.planName}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium font-mono truncate">{u.email}</p>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="text-right">
                          <p className={`font-black text-xs ${
                            sub.daysRemaining <= 5 && !sub.isFree ? 'text-red-600' : 'text-emerald-600'
                          }`}>
                            {sub.statusLabel}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold">
                            {sub.price > 0 ? `Paid: ₹${sub.price}` : 'Free Access'}
                          </p>
                        </div>

                        {!sub.isFree && (
                          <button
                            onClick={() => setUserToCancelSub(u)}
                            title="Cancel user subscription"
                            className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[10px] border border-red-200 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <UserX className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TABLE 2: Students who Purchased Individual Courses */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    Students who Purchased Courses
                  </h3>
                  <p className="text-xs text-slate-500">
                    Separate list of course purchasers, course title, price paid & transaction dates.
                  </p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {coursePurchases.length} Purchases
                </span>
              </div>

              <div className="overflow-x-auto space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {coursePurchases.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-xs font-bold text-slate-500">No course purchase records in Firebase Firestore yet.</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">When students buy coding courses, real transaction data will appear here automatically.</p>
                  </div>
                ) : (
                  coursePurchases.map((cp) => (
                    <div
                      key={cp.id}
                      className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between text-xs hover:bg-white transition-colors"
                    >
                      <div className="pr-2 min-w-0">
                        <p className="font-extrabold text-slate-900 truncate">{cp.userName}</p>
                        <p className="text-[11px] text-indigo-600 font-bold truncate">{cp.courseTitle}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">{cp.userEmail}</p>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="text-right">
                          <p className="font-black text-slate-900 text-xs">₹ {cp.pricePaid}</p>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            {cp.paymentStatus}
                          </span>
                        </div>

                        <button
                          onClick={() => setPaymentToDelete(cp)}
                          title="Delete payment record from Firestore"
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* SECTION 2 TAB: REGISTERED USER EMAIL BROADCAST & AI EMAIL DRAFT ASSISTANT */}
      {/* ======================================================================== */}
      {activeAdminTab === 'email_broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Student Directory & Selection Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Recipient Selection ({selectedRecipientEmails.length} / {allUsers.length})
                  </h3>
                  <p className="text-xs text-slate-500">Select registered users to receive real emails</p>
                </div>

                <button
                  onClick={() => setShowSmtpSettings(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-600" />
                  <span>SMTP Config</span>
                </button>
              </div>

              {/* Quick Select Buttons */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <button
                  onClick={() => setSelectedRecipientEmails(allUsers.map(u => u.email).filter(Boolean))}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  Select All Users
                </button>
                <button
                  onClick={() => setSelectedRecipientEmails([])}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Deselect All
                </button>
              </div>

              {/* Email List with Checkboxes */}
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {allUsers.map((u) => {
                  const isChecked = selectedRecipientEmails.includes(u.email);
                  return (
                    <div
                      key={u.uid}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedRecipientEmails(prev => prev.filter(e => e !== u.email));
                        } else {
                          setSelectedRecipientEmails(prev => [...prev, u.email]);
                        }
                      }}
                      className={`p-3 rounded-2xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-blue-50/80 border-blue-400 text-slate-900'
                          : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="font-extrabold truncate text-slate-900">{u.displayName}</p>
                          <p className="text-[10px] font-mono text-slate-500 truncate">{u.email}</p>
                        </div>
                      </div>

                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 shrink-0">
                        {u.university || 'Registered'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right AI Email Draft & Dispatch Hub (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5 card-3d">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">AI Email Draft & Dispatch Studio</h3>
                    <p className="text-xs text-slate-500">Input why you want to email students & let AI draft it</p>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  Gemini AI Powered
                </span>
              </div>

              {/* Status Message */}
              {emailStatusMessage && (
                <div className={`p-4 rounded-2xl border text-xs font-semibold space-y-1 ${
                  emailStatusMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-red-50 text-red-900 border-red-200'
                }`}>
                  <p>{emailStatusMessage.text}</p>
                  {emailStatusMessage.details && emailStatusMessage.details.length > 0 && (
                    <ul className="list-disc pl-4 text-[11px] opacity-90">
                      {emailStatusMessage.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  )}
                </div>
              )}

              {/* AI Draft Input Form */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Topic / Reason Admin Wants to Send Email
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={emailTopicInput}
                    onChange={(e) => setEmailTopicInput(e.target.value)}
                    placeholder="e.g. Announce Mid-Term Exam Cheat Sheets on Study Hub and 20% discount on Ultra AI plan"
                    className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                  />

                  <button
                    onClick={handleAIDraftEmail}
                    disabled={isDraftingAI || !emailTopicInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {isDraftingAI ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                    )}
                    <span>Draft Email with AI</span>
                  </button>
                </div>
              </div>

              {/* Draft Preview & Review */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Subject Line</label>
                  <input
                    type="text"
                    value={draftedSubject}
                    onChange={(e) => setDraftedSubject(e.target.value)}
                    placeholder="Subject line generated by AI or custom..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">Email Message Content (Simple English)</label>
                    <span className="text-[10px] font-semibold text-slate-500">Plain Readable Text</span>
                  </div>
                  <textarea
                    rows={10}
                    value={draftedText}
                    onChange={(e) => setDraftedText(e.target.value)}
                    placeholder="Type or draft your email message in simple English text..."
                    className="w-full p-3.5 text-xs font-sans rounded-xl bg-slate-50 text-slate-900 border border-slate-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Action Dispatch Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  Sending to <strong>{selectedRecipientEmails.length}</strong> selected student email(s)
                </span>

                <button
                  onClick={handleSendEmailBroadcast}
                  disabled={isSendingEmail || selectedRecipientEmails.length === 0 || !draftedSubject}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 btn-3d-blue"
                >
                  {isSendingEmail ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Dispatching Real Emails...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Send Real Email to {selectedRecipientEmails.length} Users</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* SECTION 3 TAB: ORIGINAL TELEMETRY & STUDENT PROGRESS INSPECTOR */}
      {/* ======================================================================== */}
      {activeAdminTab === 'telemetry' && (
        <div className="space-y-6">
          {/* User Search & Monitoring Directory */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 card-3d">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Registered Student Directory & Progress Tracker
                </h2>
                <p className="text-xs text-slate-500">
                  Inspect student attendance, DSA coding solves, AI study suites, and mock interview performance.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search user name or email..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {loadingUsers ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500" />
                <p className="text-xs font-semibold">Loading registered users from Firestore...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Users className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-bold text-slate-600">No matching user records found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((u) => {
                  const sub = getSubscriptionInfo(u);
                  return (
                    <div
                      key={u.uid}
                      className="p-5 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-blue-300 transition-all space-y-3 flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-sm">
                              {u.displayName.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-extrabold text-slate-900 text-sm truncate">{u.displayName}</h3>
                              <p className="text-[11px] text-slate-500 font-mono truncate">{u.email}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            sub.isFree ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {sub.planName}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-center">
                          <div className="bg-white p-2 rounded-xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Attendance</p>
                            <p className="text-xs font-black text-emerald-600">{u.stats?.attendancePercentage || 0}%</p>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">DSA Solved</p>
                            <p className="text-xs font-black text-indigo-600">{u.stats?.dsaSolvedCount || 0}</p>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Suites</p>
                            <p className="text-xs font-black text-purple-600">{u.stats?.studySuitesCount || 0}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleInspectUser(u.uid)}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Full Student Progress</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 1: ADD NEW MONTH GROSS PROFIT RECORD */}
      {showAddMonthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Add Monthly Gross Profit Record
              </h3>
              <button onClick={() => setShowAddMonthModal(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveNewMonthRecord} className="space-y-3 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1">Month Key (YYYY-MM)</label>
                <input
                  type="text"
                  required
                  value={newMonthKey}
                  onChange={(e) => setNewMonthKey(e.target.value)}
                  placeholder="2026-08"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block mb-1">Month Display Name</label>
                <input
                  type="text"
                  required
                  value={newMonthName}
                  onChange={(e) => setNewMonthName(e.target.value)}
                  placeholder="August 2026"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Subscription Revenue (₹)</label>
                  <input
                    type="number"
                    required
                    value={newSubRevenue}
                    onChange={(e) => setNewSubRevenue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block mb-1">Course Sales Revenue (₹)</label>
                  <input
                    type="number"
                    required
                    value={newCourseRevenue}
                    onChange={(e) => setNewCourseRevenue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs">
                Total Gross Profit for {newMonthName}: <strong>₹ {(Number(newSubRevenue) + Number(newCourseRevenue)).toLocaleString()}</strong>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md cursor-pointer"
              >
                Save Record in Firebase Firestore
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SMTP CONFIGURATION */}
      {showSmtpSettings && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Custom Real SMTP Credentials Setup
              </h3>
              <button onClick={() => setShowSmtpSettings(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* App Password Instructions Box */}
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-slate-800 text-xs space-y-1.5 leading-relaxed">
              <p className="font-extrabold text-amber-900 flex items-center gap-1.5">
                <span>💡 Important for Gmail Users:</span>
              </p>
              <p className="text-[11px] text-slate-700">
                Google requires a <strong>16-character App Password</strong> (not your normal password). To generate one:
              </p>
              <ol className="list-decimal pl-4 text-[11px] text-slate-700 space-y-0.5 font-medium">
                <li>Go to <strong>Google Account &gt; Security</strong></li>
                <li>Turn ON <strong>2-Step Verification</strong></li>
                <li>Search or select <strong>App Passwords</strong> and generate a code</li>
                <li>Paste the 16-character code into the Password field below</li>
              </ol>
            </div>

            {smtpTestResult && (
              <div className={`p-3.5 rounded-2xl border text-xs font-semibold space-y-1 ${
                smtpTestResult.success ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
              }`}>
                <p>{smtpTestResult.message}</p>
                {smtpTestResult.advice && <p className="text-[11px] opacity-90">{smtpTestResult.advice}</p>}
              </div>
            )}

            <form onSubmit={handleSaveSmtpSettings} className="space-y-3 text-xs font-bold text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">SMTP Host</label>
                  <input
                    type="text"
                    required
                    value={smtpConfig.host}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                    placeholder="smtp.gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block">SMTP Port</label>
                    <span className="text-[10px] text-blue-600 font-bold">587 (TLS) or 465 (SSL)</span>
                  </div>
                  <input
                    type="number"
                    required
                    value={smtpConfig.port}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setSmtpConfig({ ...smtpConfig, port: val === 535 ? 587 : val });
                    }}
                    placeholder="587"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                  />
                  {smtpConfig.port === 535 && (
                    <p className="text-[10px] font-bold text-amber-600 mt-1">
                      ⚠️ Note: 535 is an error code, not a port. Standard Gmail port is 587.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-1">SMTP Username / Email</label>
                <input
                  type="email"
                  required
                  value={smtpConfig.user}
                  onChange={(e) => setSmtpConfig({ ...smtpConfig, user: e.target.value })}
                  placeholder="naman03mgs@gmail.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block mb-1">SMTP Password / App Password</label>
                <input
                  type="password"
                  value={smtpConfig.pass}
                  onChange={(e) => setSmtpConfig({ ...smtpConfig, pass: e.target.value })}
                  placeholder="16-character Gmail App Password or SendGrid Key"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">From Sender Email</label>
                  <input
                    type="email"
                    value={smtpConfig.fromEmail}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, fromEmail: e.target.value })}
                    placeholder="naman03mgs@gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block mb-1">From Sender Name</label>
                  <input
                    type="text"
                    value={smtpConfig.fromName}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, fromName: e.target.value })}
                    placeholder="CampusOS AI Admin"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestSmtpConnection}
                  disabled={isTestingSmtp || !smtpConfig.pass}
                  className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isTestingSmtp ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                  ) : (
                    <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span>Test Connection</span>
                </button>

                <button
                  type="submit"
                  className="py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md cursor-pointer"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: STUDENT FULL DATA INSPECTOR */}
      {selectedUserUid && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-4 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">Student Detail Inspector</h3>
              <button onClick={() => setSelectedUserUid(null)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {loadingInspect ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500" />
                <p className="text-xs font-semibold">Fetching student data from Firestore...</p>
              </div>
            ) : inspectData ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{inspectData.profile.displayName}</h4>
                    <p className="text-xs text-slate-500">{inspectData.profile.email} • {inspectData.profile.university}</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    {inspectData.profile.plan || 'Ultra AI Plan'}
                  </span>
                </div>

                <div className="flex items-center gap-2 border-b pb-2 text-xs font-bold">
                  <button
                    onClick={() => setInspectTab('attendance')}
                    className={`px-3 py-1.5 rounded-lg ${inspectTab === 'attendance' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Attendance ({inspectData.attendance.length})
                  </button>
                  <button
                    onClick={() => setInspectTab('dsa')}
                    className={`px-3 py-1.5 rounded-lg ${inspectTab === 'dsa' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    DSA Solves ({inspectData.dsa.filter(d => d.solved).length})
                  </button>
                  <button
                    onClick={() => setInspectTab('suites')}
                    className={`px-3 py-1.5 rounded-lg ${inspectTab === 'suites' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Study Suites ({inspectData.studySuites.length})
                  </button>
                </div>

                {inspectTab === 'attendance' && (
                  <div className="space-y-2 text-xs">
                    {inspectData.attendance.map((a) => (
                      <div key={a.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">{a.name} ({a.code})</span>
                        <span className="font-mono text-emerald-600 font-bold">{a.attendedClasses}/{a.totalClasses} Attended</span>
                      </div>
                    ))}
                  </div>
                )}

                {inspectTab === 'dsa' && (
                  <div className="space-y-2 text-xs">
                    {inspectData.dsa.map((d) => (
                      <div key={d.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">{d.title} ({d.category})</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${d.solved ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                          {d.solved ? 'Solved' : 'Unsolved'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {inspectTab === 'suites' && (
                  <div className="space-y-2 text-xs">
                    {inspectData.studySuites.map((s) => (
                      <div key={s.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="font-bold text-slate-900 block">{s.title} ({s.subject})</span>
                        <p className="text-slate-500 line-clamp-1">{s.summary}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* MODAL 4: DELETE PAYMENT TRANSACTION CONFIRMATION */}
      {paymentToDelete && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-red-600 font-extrabold text-base">
                <Trash2 className="w-5 h-5" />
                <span>Delete Payment Transaction</span>
              </div>
              <button
                onClick={() => setPaymentToDelete(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete this payment transaction record from Firebase Firestore?
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-medium">
              <p className="text-slate-900 font-extrabold">{paymentToDelete.courseTitle}</p>
              <p className="text-slate-600">Student: <strong>{paymentToDelete.userName}</strong> ({paymentToDelete.userEmail})</p>
              <p className="text-emerald-700 font-black text-sm pt-1">Amount Paid: ₹{paymentToDelete.pricePaid}</p>
            </div>

            <p className="text-[11px] text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 font-semibold leading-normal">
              ⚠️ Deleting this transaction will remove it from student purchases and automatically deduct ₹{paymentToDelete.pricePaid} from monthly gross profits in Firestore.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPaymentToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePayment}
                disabled={isDeletingPayment}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {isDeletingPayment ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span>{isDeletingPayment ? 'Deleting...' : 'Delete Payment'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: CANCEL USER SUBSCRIPTION CONFIRMATION */}
      {userToCancelSub && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-amber-600 font-extrabold text-base">
                <UserX className="w-5 h-5" />
                <span>Cancel User Subscription</span>
              </div>
              <button
                onClick={() => setUserToCancelSub(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel the active subscription for this student?
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-medium">
              <p className="text-slate-900 font-extrabold">{userToCancelSub.displayName}</p>
              <p className="text-slate-600 font-mono">{userToCancelSub.email}</p>
              <p className="text-blue-700 font-bold pt-1">Current Plan: {userToCancelSub.plan || 'Active Subscription'}</p>
            </div>

            <p className="text-[11px] text-slate-600 bg-slate-100 p-3 rounded-xl border border-slate-200 font-medium leading-normal">
              This student's plan status will be updated to <strong>Free Tier</strong> in Firebase Firestore and active plan perks will be revoked immediately.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setUserToCancelSub(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-700 transition-colors cursor-pointer"
              >
                Keep Active
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={isCancellingSub}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {isCancellingSub ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <UserX className="w-4 h-4" />
                )}
                <span>{isCancellingSub ? 'Cancelling...' : 'Cancel Subscription'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
