import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  Building2, 
  Tag, 
  Code2, 
  ChevronRight, 
  Copy, 
  Check, 
  SlidersHorizontal, 
  X, 
  HelpCircle,
  Award,
  Layers,
  GraduationCap,
  ExternalLink,
  Flame,
  Zap,
  Filter,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  INTERVIEWBIT_SUBJECTS, 
  INTERVIEWBIT_CATEGORIES, 
  InterviewBitSubject, 
  InterviewQuestion 
} from '../../data/interviewBitQuestions';

interface InterviewPrepViewProps {
  onNavigateTab?: (tab: string) => void;
}

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ onNavigateTab }) => {
  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>('All Subjects');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  
  // Selected Subject State
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('java');
  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestion | null>(null);

  // User Progress State (Mastered & Bookmarked Qs saved in localStorage)
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('interview_prep_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('interview_prep_bookmarked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [visibleAnswerIds, setVisibleAnswerIds] = useState<string[]>([]);
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('interview_prep_mastered', JSON.stringify(masteredIds));
  }, [masteredIds]);

  useEffect(() => {
    localStorage.setItem('interview_prep_bookmarked', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Toggle Mastered
  const toggleMastered = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMasteredIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Bookmark
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Single Answer Visibility
  const toggleAnswerVisibility = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVisibleAnswerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Copy Answer
  const copyAnswerText = (q: InterviewQuestion, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const textToCopy = `Question: ${q.question}\n\nAnswer:\n${q.answer}${q.codeSnippet ? `\n\nCode Example:\n${q.codeSnippet}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedQuestionId(q.id);
    setTimeout(() => setCopiedQuestionId(null), 2000);
  };

  // Filter Subjects
  const filteredSubjects = useMemo(() => {
    return INTERVIEWBIT_SUBJECTS.filter((subject) => {
      const matchesCategory = 
        selectedCategory === 'All Subjects' || subject.category === selectedCategory;
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !queryLower ||
        subject.name.toLowerCase().includes(queryLower) ||
        subject.description.toLowerCase().includes(queryLower) ||
        subject.popularCompanies.some((c) => c.toLowerCase().includes(queryLower)) ||
        subject.questions.some((q) => q.question.toLowerCase().includes(queryLower));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Active Subject
  const activeSubject = useMemo(() => {
    return INTERVIEWBIT_SUBJECTS.find((s) => s.id === selectedSubjectId) || INTERVIEWBIT_SUBJECTS[0];
  }, [selectedSubjectId]);

  // Filtered Questions inside Active Subject
  const activeSubjectQuestions = useMemo(() => {
    if (!activeSubject) return [];
    return activeSubject.questions.filter((q) => {
      const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !queryLower ||
        q.question.toLowerCase().includes(queryLower) ||
        q.answer.toLowerCase().includes(queryLower) ||
        q.companyTags.some((c) => c.toLowerCase().includes(queryLower)) ||
        q.topicTags.some((t) => t.toLowerCase().includes(queryLower));

      return matchesDifficulty && matchesSearch;
    });
  }, [activeSubject, difficultyFilter, searchQuery]);

  // Total Statistics
  const totalSubjectsCount = INTERVIEWBIT_SUBJECTS.length; // 256
  const totalMasteredCount = masteredIds.length;
  const totalBookmarkedCount = bookmarkedIds.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider border border-blue-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              256 TECHNICAL SUBJECTS
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-wider border border-slate-200">
              50+ QUESTIONS PER SUBJECT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Interview Prep & Technical Bank
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-2xl leading-relaxed">
            Master technical interview rounds with authentic questions across 256 core CS subjects, frameworks, and programming languages.
          </p>
        </div>

        {/* Global Progress Counters */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Subjects</span>
            <span className="text-xl font-extrabold text-slate-900">{totalSubjectsCount}</span>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-center">
            <span className="text-[10px] font-bold text-emerald-700 block uppercase tracking-wider">Mastered</span>
            <span className="text-xl font-extrabold text-emerald-800">{totalMasteredCount}</span>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-center">
            <span className="text-[10px] font-bold text-amber-700 block uppercase tracking-wider">Bookmarked</span>
            <span className="text-xl font-extrabold text-amber-800">{totalBookmarkedCount}</span>
          </div>
        </div>
      </div>

      {/* Global Search & Category Tabs Bar */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all 256 subjects and questions... (e.g. 'HashMap', 'React', 'Docker', 'Dijkstra', 'PostgreSQL')"
            className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {INTERVIEWBIT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Subject Browser & Question View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: 256 Subjects List (4 Cols) - STICKY IN PLACE */}
        <div className="lg:col-span-4 lg:sticky lg:top-20 lg:self-start space-y-3 z-10">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Subjects ({filteredSubjects.length} of {totalSubjectsCount})
            </h2>
            <span className="text-[10px] font-bold text-slate-400">Select subject</span>
          </div>

          <div className="space-y-2 max-h-[calc(100vh-13rem)] overflow-y-auto pr-1.5 scrollbar-thin">
            {filteredSubjects.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs font-medium">
                No subjects found matching "{searchQuery}".
              </div>
            ) : (
              filteredSubjects.map((sub) => {
                const isSelected = selectedSubjectId === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubjectId(sub.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-500 shadow-sm'
                        : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {sub.name}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {sub.category}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                      {sub.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[150px]">{sub.popularCompanies.slice(0, 3).join(', ')}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-300'}`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Questions and Technical Answers (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Active Subject Detail Bar */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase border border-blue-200">
                    {activeSubject.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Popular At: {activeSubject.popularCompanies.join(', ')}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{activeSubject.name} Technical Questions</h2>
              </div>

              {/* Difficulty & Global Answer Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => {
                    if (showAllAnswers) {
                      setShowAllAnswers(false);
                      setVisibleAnswerIds([]);
                    } else {
                      setShowAllAnswers(true);
                      setVisibleAnswerIds(activeSubjectQuestions.map((q) => q.id));
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  {showAllAnswers ? <EyeOff className="w-3.5 h-3.5 text-blue-600" /> : <Eye className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{showAllAnswers ? 'Hide All Answers' : 'Show All Answers'}</span>
                </button>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
                  {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                        difficultyFilter === diff
                          ? 'bg-white text-blue-600 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeSubject.description}
            </p>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {activeSubjectQuestions.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-sm font-black text-slate-800">No questions found for this filter</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing your search keyword or switching the difficulty filter to 'All'.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDifficultyFilter('All');
                  }}
                  className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              activeSubjectQuestions.map((q, idx) => {
                const isMastered = masteredIds.includes(q.id);
                const isBookmarked = bookmarkedIds.includes(q.id);
                const isAnswerVisible = showAllAnswers || visibleAnswerIds.includes(q.id);

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl bg-white border transition-all shadow-xs space-y-4 ${
                      isMastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200/90'
                    }`}
                  >
                    {/* Header line: Tags & Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-black text-slate-400">Q{idx + 1}.</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            q.difficulty === 'Hard'
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : q.difficulty === 'Medium'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {q.difficulty}
                        </span>

                        {q.companyTags.map((comp) => (
                          <span key={comp} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-extrabold border border-slate-200">
                            {comp}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleAnswerVisibility(q.id, e)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                            isAnswerVisible
                              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                          }`}
                        >
                          {isAnswerVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isAnswerVisible ? 'Hide Answer' : 'Show Answer'}</span>
                        </button>

                        <button
                          onClick={(e) => toggleMastered(q.id, e)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                            isMastered
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
                        </button>

                        <button
                          onClick={(e) => toggleBookmark(q.id, e)}
                          className={`p-1.5 rounded-xl transition-all cursor-pointer border ${
                            isBookmarked
                              ? 'bg-amber-100 text-amber-700 border-amber-300'
                              : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
                          }`}
                          title="Bookmark Question"
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-700" /> : <Bookmark className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={(e) => copyAnswerText(q, e)}
                          className="p-1.5 rounded-xl bg-slate-50 text-slate-500 border border-slate-200 hover:text-slate-800 transition-all cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedQuestionId === q.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Question Text */}
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                      {q.question}
                    </h3>

                    {/* Detailed Answer - CLEAN WHITE DESIGN */}
                    {isAnswerVisible ? (
                      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <p className="text-xs font-extrabold uppercase text-blue-700 tracking-wider flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-blue-600" /> Technical Explanation & Solution
                          </p>
                          <button
                            onClick={(e) => toggleAnswerVisibility(q.id, e)}
                            className="text-[11px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                          >
                            <EyeOff className="w-3.5 h-3.5" /> Hide
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium">
                          {q.answer}
                        </p>

                        {/* Code Snippet if present - CLEAN WHITE/LIGHT DESIGN */}
                        {q.codeSnippet && (
                          <div className="mt-3 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 text-slate-900 text-xs shadow-2xs">
                            <div className="px-3.5 py-2 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-700 font-bold">
                              <span className="flex items-center gap-1.5 text-blue-700">
                                <Code2 className="w-3.5 h-3.5 text-blue-600" /> {q.codeLanguage?.toUpperCase() || 'CODE EXAMPLE'}
                              </span>
                              <button
                                onClick={(e) => copyAnswerText(q, e)}
                                className="hover:text-blue-700 text-slate-500 font-sans text-[10px] flex items-center gap-1 cursor-pointer font-bold"
                              >
                                {copiedQuestionId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                {copiedQuestionId === q.id ? 'Copied' : 'Copy Code'}
                              </button>
                            </div>
                            <pre className="p-4 font-mono overflow-x-auto text-[11px] leading-relaxed text-slate-800 bg-white border-t border-slate-100 scrollbar-thin">
                              <code>{q.codeSnippet}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={(e) => toggleAnswerVisibility(q.id, e)}
                        className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-900 font-semibold text-xs flex items-center justify-between transition-all cursor-pointer group"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                          <span>Click to reveal answer & detailed explanation</span>
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-blue-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs group-hover:bg-blue-700">
                          Show Answer <ChevronDown className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    )}

                    {/* Topic Tags */}
                    {q.topicTags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {q.topicTags.map((tag) => (
                          <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
