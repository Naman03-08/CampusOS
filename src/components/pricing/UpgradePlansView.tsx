import React, { useState } from 'react';
import { 
  Zap, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Award, 
  Star,
  CheckCircle2,
  QrCode,
  Flame,
  BookOpen,
  Briefcase,
  Code2,
  X,
  Clock,
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import { UserProfile } from '../../types';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { calculatePlanDetails, PLAN_DEFINITIONS } from '../../lib/planUtils';
import { FirestoreService } from '../../lib/firestoreService';

interface UpgradePlansProps {
  user: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
}

export const UpgradePlansView: React.FC<UpgradePlansProps> = ({ user, onUpdateProfile }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<{
    id: string;
    name: string;
    price: string;
    rawPrice: number;
  } | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'qr' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Subscription Plan Updated Successfully!');
  const [errorMessage, setErrorMessage] = useState('');

  const planDetails = calculatePlanDetails(user);

  const handleSelectPlan = (plan: typeof PLAN_DEFINITIONS[0]) => {
    setErrorMessage('');
    
    if (plan.id === 'free_trial') {
      if (planDetails.freeTrialUsed) {
        setErrorMessage('Free Trial is valid once per account for 4 days only. You have already used your trial! Please select the ₹199 or ₹349 plan.');
        return;
      }

      // Claim Free Trial (1-time, 4 days)
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);

      if (onUpdateProfile) {
        onUpdateProfile({
          plan: 'free_trial',
          freeTrialUsed: true,
          freeTrialStartedAt: now.toISOString(),
          planStartedAt: now.toISOString(),
          planExpiresAt: expiresAt.toISOString()
        });
      }

      setToastMessage('4-Day Free Trial activated successfully!');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
      return;
    }

    setSelectedPlanForCheckout({
      id: plan.id,
      name: plan.name,
      price: billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly,
      rawPrice: plan.rawPrice || 199
    });
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForCheckout) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);

      const now = new Date();
      const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 Days Renewal

      if (onUpdateProfile) {
        onUpdateProfile({
          plan: selectedPlanForCheckout.id,
          planStartedAt: now.toISOString(),
          planExpiresAt: expiresAt.toISOString()
        });
      }

      if (user && user.uid) {
        FirestoreService.recordFinancialTransaction({
          userId: user.uid,
          userName: user.displayName || user.email?.split('@')[0] || 'Student',
          userEmail: user.email || '',
          itemType: 'subscription',
          itemId: selectedPlanForCheckout.id,
          itemTitle: `Subscription Plan: ${selectedPlanForCheckout.name}`,
          amount: selectedPlanForCheckout.rawPrice
        }).catch(e => console.warn("Failed to record subscription transaction in Firestore:", e));
      }

      setSelectedPlanForCheckout(null);
      setToastMessage(`Upgraded to ${selectedPlanForCheckout.name} (Valid for 30 Days)!`);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Banner */}
      <SectionUsageBanner
        title="CampusOS Upgrade & Subscription Plans"
        subtitle="Choose the ideal plan to accelerate your academic grades, DSA mastery, and placement success"
        purpose="Upgrade to unlock unlimited AI Assignment Solving, full CampusOS 375 DSA Roadmap Code Coach, unlimited ATS Resume Scans, and AI Mock Interviews."
        keyFeatures={[
          '3 Plans: 4-Day Free Trial (1x Lifetime, Choose When to Start), ₹199 & ₹349 Plans',
          '30-Day Auto Renewal Cycles for Pro Scholar & Ultimate Plans',
          'Unlimited AI Study Suites, Assignment Solving & 375 DSA Sheet Solutions',
          'Instant Activation via UPI, QR Code, Net Banking, or Cards'
        ]}
        icon={<Zap className="w-6 h-6 text-white" />}
        badge="Subscription Portal"
      />

      {/* Success Notification Toast */}
      {showSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white shadow-xl flex items-center justify-between gap-3 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
            <div>
              <p className="font-extrabold text-sm">{toastMessage}</p>
              <p className="text-xs text-emerald-100">Your account features have been updated in real-time.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSuccessToast(false)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error / Alert Banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-sm flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs font-bold">{errorMessage}</p>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-amber-500 hover:text-amber-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Current Active Plan Header Status */}
      <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`p-3 rounded-2xl ${planDetails.isExpired ? 'bg-red-100 text-red-600' : 'bg-blue-600/10 text-blue-600'}`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500">Active Account Plan:</span>
              <span className={`px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wide border ${
                planDetails.isExpired 
                  ? 'bg-red-100 text-red-800 border-red-200' 
                  : planDetails.currentPlanId === 'plan_349'
                  ? 'bg-indigo-100 text-indigo-900 border-indigo-200'
                  : planDetails.currentPlanId === 'plan_199'
                  ? 'bg-blue-100 text-blue-900 border-blue-200'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-200'
              }`}>
                {planDetails.planName}
              </span>

              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 ${
                planDetails.isExpired 
                  ? 'bg-red-500 text-white' 
                  : 'bg-slate-900 text-white'
              }`}>
                <Clock className="w-3 h-3" />
                {planDetails.isExpired ? 'Expired - Upgrade Required' : `${planDetails.daysRemaining} Days Remaining`}
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium mt-1">
              Started on: <span className="font-bold text-slate-900">{planDetails.formattedStartedAt}</span> • Valid until: <span className="font-bold text-slate-900">{planDetails.formattedExpiresAt}</span>
            </p>
          </div>
        </div>

        {/* Cycle Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto shrink-0">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            30-Day Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Annual</span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] rounded-md font-extrabold">Save 20%</span>
          </button>
        </div>
      </div>

      {/* 3 Upgrade Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {PLAN_DEFINITIONS.map((plan) => {
          const isCurrentActive = planDetails.currentPlanId === plan.id && !planDetails.isExpired;
          const isTrialUsed = plan.id === 'free_trial' && planDetails.freeTrialUsed;
          const displayPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

          let buttonText = 'Upgrade Now';
          let isDisabled = false;

          if (plan.id === 'free_trial') {
            if (isCurrentActive) {
              buttonText = 'Active Free Trial (4 Days Pass)';
              isDisabled = true;
            } else if (isTrialUsed) {
              buttonText = 'Trial Expired (1x Lifetime)';
              isDisabled = true;
            } else {
              buttonText = 'Start 4-Day Free Trial (₹0)';
              isDisabled = false;
            }
          } else {
            if (isCurrentActive) {
              buttonText = 'Active Plan (Renew 30 Days)';
              isDisabled = false; // User can extend/renew anytime!
            } else {
              buttonText = `Upgrade to ${plan.priceMonthly} Plan`;
              isDisabled = false;
            }
          }

          return (
            <div
              key={plan.id}
              className={`p-7 rounded-3xl backdrop-blur-xl flex flex-col justify-between relative transition-all duration-300 card-3d ${
                plan.popular
                  ? 'bg-white border-2 border-blue-600 shadow-3d-blue lg:-translate-y-2 z-10'
                  : 'bg-white/90 border border-slate-200/90 shadow-3d-sm hover:border-blue-300 hover:shadow-xl'
              }`}
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                  {plan.popular && (
                    <span className="flex items-center gap-1 text-[11px] font-extrabold text-blue-600">
                      <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" /> Most Recommended
                    </span>
                  )}
                </div>

                {/* Plan Name & Tagline */}
                <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1 min-h-[32px]">{plan.tagline}</p>

                {/* Price Display */}
                <div className="mt-5 mb-5 pb-5 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{displayPrice}</span>
                    <span className="text-xs font-bold text-slate-500">{plan.period}</span>
                  </div>
                </div>

                {/* Amount of Uses Badge Box */}
                <div className="mb-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <p className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider flex items-center justify-between">
                    <span>Feature Usage Amounts:</span>
                    <span className="text-blue-600 font-black">{plan.period}</span>
                  </p>
                  <div className="grid grid-cols-1 gap-1 text-[11px] font-bold text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">AI Study Suites:</span>
                      <span className="text-slate-900 font-extrabold">{plan.usageLimits.studySuites}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">AI Assignment Solver:</span>
                      <span className="text-slate-900 font-extrabold">{plan.usageLimits.assignmentSolver}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">ATS Resume Scans:</span>
                      <span className="text-slate-900 font-extrabold">{plan.usageLimits.resumeScans}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">375 DSA Sheet AI:</span>
                      <span className="text-slate-900 font-extrabold">{plan.usageLimits.dsaSolutions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">AI Mock Interviews:</span>
                      <span className="text-slate-900 font-extrabold">{plan.usageLimits.mockInterviews}</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">What's included:</p>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}

                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <div className="pt-2 space-y-2">
                      {plan.notIncluded.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs font-medium text-slate-400">
                          <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                          <span className="line-through">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action CTA Button */}
              <button
                disabled={isDisabled}
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isDisabled
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : plan.id === 'plan_199'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md btn-3d-blue'
                    : plan.id === 'plan_349'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md btn-3d-blue'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md btn-3d-emerald'
                }`}
              >
                {isDisabled ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-400" />
                    <span>{buttonText}</span>
                  </>
                ) : isCurrentActive ? (
                  <>
                    <RotateCw className="w-4 h-4 text-white" />
                    <span>Renew Plan (+30 Days)</span>
                  </>
                ) : (
                  <>
                    <span>{buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" /> Detailed Plan Comparison Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-extrabold">
                <th className="py-3 px-4 w-2/5">Feature / Capability</th>
                <th className="py-3 px-4 text-center">Free Trial (4 Days 1x)</th>
                <th className="py-3 px-4 text-center text-blue-600">Pro Scholar (₹199 / 30 Days)</th>
                <th className="py-3 px-4 text-center text-indigo-600">Campus Pro Ultimate (₹349 / 30 Days)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              <tr>
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" /> AI Study Suite Generations
                </td>
                <td className="py-3.5 px-4 text-center text-slate-600 font-extrabold">5 Total</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-blue-600">50 / Month</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-indigo-600">UNLIMITED</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-600" /> CampusOS 375 DSA Roadmap Sheet
                </td>
                <td className="py-3.5 px-4 text-center text-slate-600 font-extrabold">3 Solutions / day</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-blue-600">UNLIMITED Sheet AI</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-indigo-600">UNLIMITED Code Coach</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600" /> ATS Resume Scans & Builder
                </td>
                <td className="py-3.5 px-4 text-center text-slate-600 font-extrabold">2 Audits Total</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-blue-600">15 Scans / Month</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-indigo-600">UNLIMITED Scans & Builder</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-600" /> AI Voice & Video Mock Interviews
                </td>
                <td className="py-3.5 px-4 text-center text-slate-600 font-extrabold">1 Practice Session</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-blue-600">5 Sessions / Month</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-indigo-600">UNLIMITED 1-on-1 Interviews</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" /> AI Assignment Solver
                </td>
                <td className="py-3.5 px-4 text-center text-slate-600 font-extrabold">5 Solves Total</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-blue-600">UNLIMITED Solves</td>
                <td className="py-3.5 px-4 text-center font-extrabold text-indigo-600">UNLIMITED Solves</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" /> Verified Placement Certificate
                </td>
                <td className="py-3.5 px-4 text-center text-slate-400">-</td>
                <td className="py-3.5 px-4 text-center text-slate-400">-</td>
                <td className="py-3.5 px-4 text-center font-bold text-indigo-600">Included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  Instant 30-Day Subscription
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Checkout: {selectedPlanForCheckout.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlanForCheckout(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-700">Selected Plan</p>
                <p className="text-sm font-extrabold text-blue-900">{selectedPlanForCheckout.name}</p>
                <p className="text-[10px] text-slate-500">Valid for 30 days from today</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-blue-600">{selectedPlanForCheckout.price}</p>
                <p className="text-[10px] text-slate-500 font-medium">Billed {billingCycle}</p>
              </div>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-4">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'upi'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>UPI ID</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'qr'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>QR Scan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Enter VPA / UPI ID</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. username@gpay or 9876543210@paytm"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                  />
                </div>
              )}

              {paymentMethod === 'qr' && (
                <div className="p-4 rounded-2xl bg-slate-900 text-center space-y-2">
                  <div className="w-32 h-32 bg-white p-2 mx-auto rounded-xl flex items-center justify-center border-4 border-blue-500">
                    <QrCode className="w-24 h-24 text-slate-900" />
                  </div>
                  <p className="text-xs text-slate-300 font-bold">Scan with Google Pay, PhonePe, or Paytm</p>
                  <p className="text-[10px] text-slate-400">Merchant: CampusOS AI Student Services</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Card Number (4242 •••• •••• 4242)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Activate {selectedPlanForCheckout.name} ({selectedPlanForCheckout.price})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

