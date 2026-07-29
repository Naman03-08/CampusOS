import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Star, 
  Tag, 
  Code2, 
  Layers,
  Flame,
  Award
} from 'lucide-react';
import { 
  ALL_COMPANY_QUESTIONS, 
  COMPANY_CATEGORIES, 
  POPULAR_COMPANIES_LIST, 
  CompanyQuestion 
} from '../../data/companyInterviewQuestions';

interface CompanyQuestionsSectionProps {
  masteredIds: string[];
  bookmarkedIds: string[];
  onToggleMastered: (id: string, e?: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e?: React.MouseEvent) => void;
}

export const CompanyQuestionsSection: React.FC<CompanyQuestionsSectionProps> = ({
  masteredIds,
  bookmarkedIds,
  onToggleMastered,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Companies');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [visibleAnswerIds, setVisibleAnswerIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleAnswerVisibility = (id: string) => {
    setVisibleAnswerIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredQuestions = useMemo(() => {
    return ALL_COMPANY_QUESTIONS.filter((q) => {
      const matchesCategory = 
        selectedCategory === 'All Companies' || q.companyCategory === selectedCategory;
      const matchesCompany = 
        selectedCompany === 'All' || q.company.toLowerCase() === selectedCompany.toLowerCase();
      const matchesDifficulty = 
        difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !queryLower ||
        q.question.toLowerCase().includes(queryLower) ||
        q.answer.toLowerCase().includes(queryLower) ||
        q.company.toLowerCase().includes(queryLower) ||
        q.role.toLowerCase().includes(queryLower) ||
        q.topicTags.some((t) => t.toLowerCase().includes(queryLower));

      return matchesCategory && matchesCompany && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedCompany, difficultyFilter, searchQuery]);

  const totalCount = ALL_COMPANY_QUESTIONS.length;
  const masteredCompanyCount = masteredIds.filter(id => id.startsWith('goog-') || id.startsWith('amzn-') || id.startsWith('msft-') || id.startsWith('meta-') || id.startsWith('comp-')).length;

  return (
    <div className="space-y-6">
      {/* Header Stat & Intro */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50/70 to-red-50 border border-amber-200/80 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                Company-Specific Question Vault
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                {totalCount}+ Real Interview Questions
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Targeted Company Interview Preparation
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
              Real interview questions asked in top product companies, FAANG, quant firms, and IT service giants. Filter by target role, interview round, and difficulty level.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            <div className="text-center px-3 border-r border-slate-200">
              <div className="text-xl font-bold text-amber-600">{totalCount}</div>
              <div className="text-[11px] text-slate-500 font-medium">Questions</div>
            </div>
            <div className="text-center px-3 border-r border-slate-200">
              <div className="text-xl font-bold text-emerald-600">{masteredCompanyCount}</div>
              <div className="text-[11px] text-slate-500 font-medium">Mastered</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-bold text-indigo-600">19+</div>
              <div className="text-[11px] text-slate-500 font-medium">Companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-4">
        {/* Search & Difficulty Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by company, question, topic tag, or role (e.g. System Design, Google, LRU)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Difficulty:
            </span>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  difficultyFilter === diff
                    ? diff === 'Easy'
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : diff === 'Medium'
                      ? 'bg-amber-600 text-white font-semibold shadow-xs'
                      : diff === 'Hard'
                      ? 'bg-red-600 text-white font-semibold shadow-xs'
                      : 'bg-amber-700 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Company Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Category:
          </span>
          {COMPANY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Specific Company Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs font-semibold text-slate-500 mr-1">
            Filter Company:
          </span>
          <button
            onClick={() => setSelectedCompany('All')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              selectedCompany === 'All'
                ? 'bg-amber-700 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({filteredQuestions.length})
          </button>
          {POPULAR_COMPANIES_LIST.map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedCompany(comp)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedCompany === comp
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-500/10 hover:text-amber-700'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900">No company questions found</h3>
            <p className="text-sm text-slate-500 mt-1">
              Try adjusting your company filter or search terms.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isMastered = masteredIds.includes(q.id);
            const isBookmarked = bookmarkedIds.includes(q.id);
            const isAnswerVisible = visibleAnswerIds.includes(q.id);

            return (
              <div
                key={q.id}
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                  isMastered
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-slate-200 hover:border-amber-300 shadow-xs'
                }`}
              >
                {/* Question Header Card */}
                <div className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {q.company}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                        {q.role}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700">
                        {q.round}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          q.difficulty === 'Easy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : q.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-amber-500 mr-2" title={`Frequency Score: ${q.frequencyRating}/5`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < q.frequencyRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={(e) => onToggleBookmark(q.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked
                            ? 'text-indigo-600 bg-indigo-50'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={isBookmarked ? 'Bookmarked' : 'Bookmark for revision'}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={(e) => onToggleMastered(q.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isMastered
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={isMastered ? 'Mastered' : 'Mark as Mastered'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base font-semibold text-slate-900 leading-relaxed mb-3">
                    Q{idx + 1}. {q.question}
                  </h3>

                  {/* Topic Tags & Action Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {q.topicTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleAnswerVisibility(q.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60 transition-colors"
                    >
                      {isAnswerVisible ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          Hide Solution
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          View Solution & Code
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Collapsible Answer & Code Section */}
                {isAnswerVisible && (
                  <div className="bg-slate-50 p-5 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-500" /> Detailed Explanation & Concept:
                      </h4>
                      <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                        {q.answer}
                      </p>
                    </div>

                    {q.codeSnippet && (
                      <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-700 font-mono">
                          <span className="flex items-center gap-1.5 font-semibold text-amber-700">
                            <Code2 className="w-3.5 h-3.5 text-amber-600" />
                            {q.codeLanguage || 'code'}
                          </span>
                          <button
                            onClick={() => copyCode(q.codeSnippet!, q.id)}
                            className="flex items-center gap-1 text-slate-600 hover:text-amber-700 transition-colors"
                          >
                            {copiedId === q.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-sans">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="font-sans">Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-slate-800 overflow-x-auto leading-relaxed">
                          <code>{q.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
