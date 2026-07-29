import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Shuffle, 
  Award, 
  Flame, 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck,
  Check,
  BarChart2
} from 'lucide-react';
import { ALL_MCQS, MCQ_CATEGORIES, MCQQuestion } from '../../data/interviewMCQs';

interface MCQPracticeSectionProps {
  masteredIds: string[];
  bookmarkedIds: string[];
  onToggleMastered: (id: string, e?: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e?: React.MouseEvent) => void;
}

export const MCQPracticeSection: React.FC<MCQPracticeSectionProps> = ({
  masteredIds,
  bookmarkedIds,
  onToggleMastered,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User Answers State: questionId -> chosenOptionIndex (0, 1, 2, 3)
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState<number>(0);

  const filteredMCQs = useMemo(() => {
    return ALL_MCQS.filter((q) => {
      const matchesCategory = 
        selectedCategory === 'All Categories' || q.category === selectedCategory;
      const matchesDifficulty = 
        difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !queryLower ||
        q.question.toLowerCase().includes(queryLower) ||
        q.explanation.toLowerCase().includes(queryLower) ||
        q.topicTags.some((t) => t.toLowerCase().includes(queryLower));

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, difficultyFilter, searchQuery]);

  // Current Question
  const activeQuestion: MCQQuestion | undefined = filteredMCQs[currentIndex] || filteredMCQs[0];

  // Stats calculation
  const totalAttempted = Object.keys(userAnswers).length;
  let correctCount = 0;
  Object.entries(userAnswers).forEach(([qId, answerIdx]) => {
    const q = ALL_MCQS.find((item) => item.id === qId);
    if (q && q.correctAnswerIndex === answerIdx) {
      correctCount++;
    }
  });

  const accuracyPct = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  const handleSelectOption = (optionIndex: number) => {
    if (!activeQuestion) return;
    if (userAnswers[activeQuestion.id] !== undefined) return; // already answered

    setUserAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: optionIndex
    }));

    if (optionIndex === activeQuestion.correctAnswerIndex) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredMCQs.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRandom = () => {
    if (filteredMCQs.length <= 1) return;
    const rand = Math.floor(Math.random() * filteredMCQs.length);
    setCurrentIndex(rand);
  };

  const handleResetSession = () => {
    if (window.confirm('Reset all MCQ quiz progress and score metrics?')) {
      setUserAnswers({});
      setStreak(0);
      setCurrentIndex(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quiz Banner & Score HUD */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50/70 to-rose-50 border border-purple-200/80 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                Interactive MCQ Practice Mode
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                {ALL_MCQS.length}+ MCQ Question Bank
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Technical MCQ & Concept Quiz Engine
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
              Practice multiple-choice questions for technical online assessments (OA), core CS fundamentals, Java, Python, SQL, Networks, and Operating Systems.
            </p>
          </div>

          {/* HUD Score Cards */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs self-start lg:self-auto flex-wrap">
            <div className="text-center px-3 border-r border-slate-200">
              <div className="text-xl font-bold text-slate-900">
                {totalAttempted} / {filteredMCQs.length}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Attempted</div>
            </div>

            <div className="text-center px-3 border-r border-slate-200">
              <div className="text-xl font-bold text-emerald-600">
                {correctCount}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Correct</div>
            </div>

            <div className="text-center px-3 border-r border-slate-200">
              <div className="text-xl font-bold text-purple-600">
                {accuracyPct}%
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Accuracy</div>
            </div>

            <div className="text-center px-3 flex items-center gap-1.5">
              <Flame className="w-5 h-5 text-orange-500 animate-bounce" />
              <div>
                <div className="text-xl font-bold text-orange-500">{streak}</div>
                <div className="text-[11px] text-slate-500 font-medium">Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Control Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search MCQs by question or topic..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              Difficulty:
            </span>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  setDifficultyFilter(diff);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  difficultyFilter === diff
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-2">
          {MCQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main MCQ Active Card */}
      {!activeQuestion ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900">No MCQ questions found</h3>
          <p className="text-sm text-slate-500 mt-1">
            Try resetting your category or difficulty filter.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Card Top Header */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-100 text-purple-800">
                Question {currentIndex + 1} of {filteredMCQs.length}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-200 text-slate-700">
                {activeQuestion.category}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                activeQuestion.difficulty === 'Easy'
                  ? 'bg-emerald-100 text-emerald-800'
                  : activeQuestion.difficulty === 'Medium'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {activeQuestion.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => onToggleBookmark(activeQuestion.id, e)}
                className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
                  bookmarkedIds.includes(activeQuestion.id)
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {bookmarkedIds.includes(activeQuestion.id) ? 'Saved' : 'Save'}
              </button>

              <button
                onClick={handleResetSession}
                className="p-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-1"
                title="Reset Quiz"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 leading-relaxed">
              {activeQuestion.question}
            </h3>

            {/* 4 Options Grid */}
            <div className="space-y-3">
              {activeQuestion.options.map((optText, optIdx) => {
                const userSelection = userAnswers[activeQuestion.id];
                const hasAnswered = userSelection !== undefined;
                const isCorrectOption = optIdx === activeQuestion.correctAnswerIndex;
                const isUserChoice = userSelection === optIdx;

                let optStyle = 'border-slate-200 bg-white hover:border-purple-500 hover:bg-purple-50/30 text-slate-900';

                if (hasAnswered) {
                  if (isCorrectOption) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/50';
                  } else if (isUserChoice && !isCorrectOption) {
                    optStyle = 'border-red-500 bg-red-50 text-red-950 ring-2 ring-red-500/50';
                  } else {
                    optStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border font-medium text-sm transition-all duration-200 flex items-center justify-between gap-3 ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        hasAnswered && isCorrectOption
                          ? 'bg-emerald-500 text-white'
                          : hasAnswered && isUserChoice
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{optText}</span>
                    </div>

                    {hasAnswered && isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                    {hasAnswered && isUserChoice && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Section (When Answered) */}
            {userAnswers[activeQuestion.id] !== undefined && (
              <div className="p-5 rounded-xl bg-purple-50 border border-purple-200 space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
                  <Award className="w-4 h-4 text-purple-600" />
                  Explanation & Learning Note:
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {activeQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Footer Controls: Prev, Next, Random */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </button>

            <button
              onClick={handleRandom}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 flex items-center gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5" /> Random
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredMCQs.length - 1}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-40 flex items-center gap-1.5 shadow-xs"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
