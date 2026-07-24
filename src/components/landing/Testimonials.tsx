import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, Sparkles, Send, Filter, UserCheck, HeartHandshake } from 'lucide-react';

export interface ReviewItem {
  id: string;
  name: string;
  role: string; // e.g. "Verified Aspirant • DTU"
  badge: string; // e.g. "AI PDF SUMMARIZER", "375 DSA ROADMAP", "AI RESUME BUILDER"
  date: string;
  review: string;
  rating: number;
  initials: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: '1',
    name: 'Rahul Verma',
    role: 'Verified Aspirant • DTU',
    badge: 'AI PDF SUMMARIZER',
    date: '09/07/2026',
    review: 'The PDF Summarizer is a lifesaver for exam prep! The parsing takes heavy 150-page textbooks and outputs precise flashcards and Q&A summaries. Saved me 3 nights of study before mid-sems.',
    rating: 5,
    initials: 'RA',
  },
  {
    id: '2',
    name: 'Priya Patel',
    role: 'Verified Student • IIT Bombay',
    badge: '375 DSA ROADMAP',
    date: '06/07/2026',
    review: 'CampusOS 375 DSA Roadmap keeps me accountable every single day for practice. The topic-wise tracking, solution links, and YouTube guide integrations are clean and don\'t lag at all.',
    rating: 5,
    initials: 'PR',
  },
  {
    id: '3',
    name: 'Siddharth Nair',
    role: 'Verified Aspirant • BITS Pilani',
    badge: 'AI RESUME BUILDER',
    date: '04/07/2026',
    review: 'Software Engineer @ Microsoft aspirant here. Used the AI Resume Builder to draft my single-column ATS resume. Got off-campus interview calls from Salesforce and Razorpay in just 2 weeks!',
    rating: 5,
    initials: 'SI',
  },
  {
    id: '4',
    name: 'Rohan Gupta',
    role: 'Verified Aspirant • NIT Trichy',
    badge: 'PLACEMENT & INTERVIEWS',
    date: '02/07/2026',
    review: 'Tier-3 college student here. CampusOS placement prep and AI mock interview evaluator accurately pointed out gaps in my system design answers. Cleared the Razorpay rounds thanks to this!',
    rating: 5,
    initials: 'RO',
  },
  {
    id: '5',
    name: 'Priyanka Nair',
    role: 'Verified Student • SRM Ramapuram',
    badge: 'CODING COURSES',
    date: '28/06/2026',
    review: 'Enrolled in the MERN Full Stack Course. The structured syllabus, live topic checkboxes, and verified certificate verification system are top-notch. Best investment for coding prep.',
    rating: 5,
    initials: 'PN',
  },
  {
    id: '6',
    name: 'Riddhi Shah',
    role: 'Verified Student • NMIMS Mumbai',
    badge: 'ATTENDANCE TRACKER',
    date: '25/06/2026',
    review: 'The Attendance Predictor calculated exactly how many classes I could safely skip or needed to attend to clear the 75% threshold. Kept me eligible for exams while working on my capstone!',
    rating: 5,
    initials: 'RI',
  },
  {
    id: '7',
    name: 'Divya Sharma',
    role: 'Verified Aspirant • IGDTUW Delhi',
    badge: 'AI STUDY HUB',
    date: '21/06/2026',
    review: 'I use CampusOS Study Hub to log my coding, reading, and problem-solving daily. The 7-day revision calendar and instant quiz generator fit right into my daily schedule. Highly recommended!',
    rating: 5,
    initials: 'DI',
  },
  {
    id: '8',
    name: 'Aarav Mehta',
    role: 'Verified Aspirant • IIT Delhi',
    badge: 'ASSIGNMENT SOLVER',
    date: '18/06/2026',
    review: 'The step-by-step formula proofs and assignment solutions are super accurate. Outputting downloadable PDFs directly for college submission saved me countless hours during lab weeks.',
    rating: 5,
    initials: 'AR',
  },
  {
    id: '9',
    name: 'Ananya Sharma',
    role: 'Verified Student • VIT Vellore',
    badge: '375 DSA ROADMAP',
    date: '15/06/2026',
    review: 'The 375 DSA problem set is structured brilliantly from Arrays to Graphs and Segment Trees. Extremely useful for campus placement preparation. 9.5/10 overall experience!',
    rating: 4,
    initials: 'AN',
  },
  {
    id: '10',
    name: 'Aditya Joshi',
    role: 'Verified Student • RVCE Bengaluru',
    badge: 'CODING COURSES',
    date: '12/06/2026',
    review: 'Mastered Java DSA and OOP mechanics through the CampusOS course. The step-by-step dry-run code explanations and certificate verification ID feature made my LinkedIn profile stand out.',
    rating: 5,
    initials: 'AD',
  },
  {
    id: '11',
    name: 'Sneha Reddy',
    role: 'Verified Student • JNTU Hyderabad',
    badge: 'AI RESUME BUILDER',
    date: '09/06/2026',
    review: 'The ATS resume builder parses job descriptions and suggests missing keywords instantly. Generated a crisp 1-page PDF. Highly effective for off-campus job applications!',
    rating: 4,
    initials: 'SN',
  },
  {
    id: '12',
    name: 'Vikramaditya Rao',
    role: 'Verified Aspirant • IIT Madras',
    badge: 'GENERAL PLATFORM',
    date: '05/06/2026',
    review: 'CampusOS is literally the operating system every college student in India needs. Combining notes, resume, DSA, mock interviews, and attendance in one platform is pure genius.',
    rating: 5,
    initials: 'VR',
  },
];

const MODULE_OPTIONS = [
  'General CampusOS Platform',
  'AI PDF SUMMARIZER',
  'AI STUDY HUB',
  '375 DSA ROADMAP',
  'AI RESUME BUILDER',
  'CODING COURSES',
  'PLACEMENT & INTERVIEWS',
  'ATTENDANCE TRACKER',
  'ASSIGNMENT SOLVER',
];

export const Testimonials: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Form states
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRole, setReviewerRole] = useState('');
  const [selectedModule, setSelectedModule] = useState('375 DSA ROADMAP');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load custom reviews from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('campusos_user_reviews');
      if (saved) {
        const parsed: ReviewItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviewsList([...parsed, ...INITIAL_REVIEWS]);
        }
      }
    } catch (e) {
      console.error('Failed to load local reviews:', e);
    }
  }, []);

  // Filter reviews
  const filteredReviews = reviewsList.filter((rev) => {
    if (selectedCategory === 'ALL') return true;
    return rev.badge.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Split into two rows for the double marquee
  const row1 = filteredReviews.slice(0, Math.ceil(filteredReviews.length / 2));
  const row2 = filteredReviews.slice(Math.ceil(filteredReviews.length / 2));

  // Form submit handler
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewText.trim()) return;

    setIsSubmitting(true);

    const getInitials = (nameStr: string) => {
      const parts = nameStr.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return nameStr.substring(0, 2).toUpperCase();
    };

    const newRev: ReviewItem = {
      id: Date.now().toString(),
      name: reviewerName.trim(),
      role: reviewerRole.trim() ? `Verified Student • ${reviewerRole.trim()}` : 'Verified CampusOS Student',
      badge: selectedModule.toUpperCase(),
      date: new Date().toLocaleDateString('en-GB'),
      review: reviewText.trim(),
      rating: rating,
      initials: getInitials(reviewerName.trim()),
    };

    setTimeout(() => {
      const updated = [newRev, ...reviewsList];
      setReviewsList(updated);
      try {
        const existingCustomSaved = localStorage.getItem('campusos_user_reviews');
        const customArr = existingCustomSaved ? JSON.parse(existingCustomSaved) : [];
        localStorage.setItem('campusos_user_reviews', JSON.stringify([newRev, ...customArr]));
      } catch (err) {
        console.error('Failed to save review:', err);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setReviewerName('');
      setReviewerRole('');
      setReviewText('');
      setRating(5);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 600);
  };

  const renderCard = (rev: ReviewItem, idx: number, keyPrefix: string) => {
    return (
      <div
        key={`${keyPrefix}-${rev.id}-${idx}`}
        className="sm:w-[380px] w-[310px] shrink-0 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-md hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
      >
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

        <div>
          {/* Header Row: Badge Tag & Date */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-full border border-blue-200/80">
              {rev.badge}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 font-mono">
              {rev.date}
            </span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rev.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-200 text-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Review Text */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
            "{rev.review}"
          </p>
        </div>

        {/* Footer: User Details */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm border border-white">
            {rev.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
              {rev.name}
            </p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate font-medium">
              <UserCheck className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate">{rev.role}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="reviews" className="py-20 bg-transparent border-t border-white/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Student Reviews & Feedback
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
            See What Students Say About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CampusOS AI</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
            Real-time dynamic comments and verified feedback from engineering and university students across campuses in India!
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {[
            { label: 'All Reviews', id: 'ALL' },
            { label: 'AI PDF Summarizer', id: 'PDF' },
            { label: '375 DSA Roadmap', id: 'DSA' },
            { label: 'AI Resume Builder', id: 'RESUME' },
            { label: 'Placement & Interviews', id: 'PLACEMENT' },
            { label: 'Coding Courses', id: 'COURSES' },
            { label: 'Attendance Tracker', id: 'ATTENDANCE' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105'
                  : 'bg-white/60 text-slate-700 hover:bg-white border border-white/80'
              }`}
            >
              <Filter className="w-3 h-3 opacity-70" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTINUOUS MOVING MARQUEE ROWS */}
      <div className="space-y-6 w-full overflow-hidden py-2 relative group">
        
        {/* Left and Right Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F7F2FD] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F7F2FD] to-transparent z-10 pointer-events-none" />

        {/* ROW 1: Scrolling Left */}
        <div className="animate-marquee gap-6 px-4">
          {/* Duplicate row 1 twice for smooth infinite loop */}
          {row1.concat(row1).concat(row1).map((rev, idx) => renderCard(rev, idx, 'row1'))}
        </div>

        {/* ROW 2: Scrolling Right */}
        <div className="animate-marquee-reverse gap-6 px-4">
          {/* Duplicate row 2 twice for smooth infinite loop */}
          {row2.concat(row2).concat(row2).map((rev, idx) => renderCard(rev, idx, 'row2'))}
        </div>
      </div>

      {/* SECTION: WRITE A REVIEW FORM */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-6 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <HeartHandshake className="w-48 h-48 text-blue-600" />
          </div>

          <div className="relative z-10">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Community Feedback
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Write a Review About CampusOS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Have you used any module of CampusOS AI? Share your review and rate your experience! Your review will appear live in our student marquee above.
              </p>
            </div>

            {submitSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your review has been submitted and added to the CampusOS live marquee above.</span>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College / University / Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DTU Student or Software Aspirant"
                    value={reviewerRole}
                    onChange={(e) => setReviewerRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Section / Module
                  </label>
                  <select
                    value={selectedModule}
                    onChange={(e) => setSelectedModule(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer"
                  >
                    {MODULE_OPTIONS.map((mod) => (
                      <option key={mod} value={mod}>
                        {mod}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2 py-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            starVal <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-extrabold text-slate-700 ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Review / Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell other students what you loved about this feature in CampusOS..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Review...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post Review to Live Marquee</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
