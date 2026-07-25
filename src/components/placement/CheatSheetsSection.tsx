import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Tag, 
  Code2, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Lightbulb, 
  Terminal,
  BookOpen
} from 'lucide-react';
import { 
  ALL_CHEAT_SHEETS, 
  CHEATSHEET_CATEGORIES, 
  CheatSheet 
} from '../../data/interviewCheatSheets';

interface CheatSheetsSectionProps {
  masteredIds: string[];
  bookmarkedIds: string[];
  onToggleMastered: (id: string, e?: React.MouseEvent) => void;
  onToggleBookmark: (id: string, e?: React.MouseEvent) => void;
}

export const CheatSheetsSection: React.FC<CheatSheetsSectionProps> = ({
  masteredIds,
  bookmarkedIds,
  onToggleMastered,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<'All' | 'Fundamental' | 'Intermediate' | 'Advanced'>('All');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const copyCode = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSheets = useMemo(() => {
    return ALL_CHEAT_SHEETS.filter((cs) => {
      const matchesCategory = 
        selectedCategory === 'All Categories' || cs.category === selectedCategory;
      const matchesLevel = 
        levelFilter === 'All' || cs.difficultyLevel === levelFilter;
      
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !queryLower ||
        cs.title.toLowerCase().includes(queryLower) ||
        cs.summary.toLowerCase().includes(queryLower) ||
        cs.keyPoints.some((p) => p.toLowerCase().includes(queryLower)) ||
        cs.tags.some((t) => t.toLowerCase().includes(queryLower));

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [selectedCategory, levelFilter, searchQuery]);

  const totalSheetsCount = ALL_CHEAT_SHEETS.length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/70 to-purple-50 border border-blue-200/80 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Technical Revision Cheat Sheets
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100/70 text-indigo-700 border border-indigo-200">
                {totalSheetsCount}+ Rapid Cheat Cards
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Quick Reference Cards & Concept Summaries
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
              High-density, last-minute revision guides covering Big-O metrics, system architecture diagrams, SQL joins, Docker commands, React hooks rules, and design patterns.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            <div className="text-center px-3 border-r border-slate-200">
              <div className="text-xl font-bold text-blue-600">{totalSheetsCount}</div>
              <div className="text-[11px] text-slate-500 font-medium">Cheat Sheets</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-bold text-purple-600">12+</div>
              <div className="text-[11px] text-slate-500 font-medium">Domains</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search cheat sheets (e.g. Docker, Sliding Window, CAP Theorem, React Hooks, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Level:
            </span>
            {(['All', 'Fundamental', 'Intermediate', 'Advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  levelFilter === lvl
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Domain:
          </span>
          {CHEATSHEET_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cheat Sheets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSheets.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-slate-200">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900">No cheat sheets match your filters</h3>
            <p className="text-sm text-slate-500 mt-1">
              Try changing the domain category or clearing search terms.
            </p>
          </div>
        ) : (
          filteredSheets.map((cs) => {
            const isBookmarked = bookmarkedIds.includes(cs.id);
            const isMastered = masteredIds.includes(cs.id);
            const isExpanded = expandedIds.includes(cs.id);

            return (
              <div
                key={cs.id}
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden flex flex-col ${
                  isMastered
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-slate-200 hover:border-blue-300 shadow-xs'
                }`}
              >
                {/* Header Card */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                        {cs.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          cs.difficultyLevel === 'Fundamental'
                            ? 'bg-emerald-100 text-emerald-800'
                            : cs.difficultyLevel === 'Intermediate'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {cs.difficultyLevel}
                        </span>

                        <button
                          onClick={(e) => onToggleBookmark(cs.id, e)}
                          className={`p-1 rounded transition-colors ${
                            isBookmarked
                              ? 'text-indigo-600 bg-indigo-50'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title="Bookmark for rapid review"
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={(e) => onToggleMastered(cs.id, e)}
                          className={`p-1 rounded transition-colors ${
                            isMastered
                              ? 'text-emerald-600 bg-emerald-50'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title="Mark as Mastered"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                      {cs.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 font-medium">
                      {cs.summary}
                    </p>
                  </div>

                  {/* Bullet Key Points */}
                  <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200/80 my-2">
                    {cs.keyPoints.slice(0, isExpanded ? cs.keyPoints.length : 3).map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expand / Collapse Button & Tags */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 flex-wrap">
                      {cs.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleExpand(cs.id)}
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 shrink-0"
                    >
                      {isExpanded ? (
                        <>
                          Less Info <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          Full Cheat Card <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50/80 border-t border-slate-200 space-y-3 text-xs animate-in fade-in duration-200">
                    {cs.diagramOrTable && (
                      <div className="bg-white p-3 rounded-lg border border-slate-200 text-emerald-800 font-mono text-[11px] overflow-x-auto">
                        <div className="text-slate-500 font-sans text-[10px] mb-1 uppercase font-bold tracking-wider">
                          Visual Reference / Table:
                        </div>
                        <pre>{cs.diagramOrTable}</pre>
                      </div>
                    )}

                    {cs.codeOrCommandSnippet && (
                      <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
                        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 border-b border-slate-200 text-[11px] text-slate-700 font-mono">
                          <span className="flex items-center gap-1 text-blue-700 font-sans font-semibold">
                            <Terminal className="w-3 h-3" />
                            {cs.codeLanguage || 'Code'}
                          </span>
                          <button
                            onClick={(e) => copyCode(cs.codeOrCommandSnippet!, cs.id, e)}
                            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            {copiedId === cs.id ? (
                              <span className="text-emerald-600 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Copied
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Copy className="w-3 h-3" /> Copy
                              </span>
                            )}
                          </button>
                        </div>
                        <pre className="p-3 font-mono text-slate-800 text-[11px] overflow-x-auto leading-relaxed">
                          <code>{cs.codeOrCommandSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {cs.proTip && (
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-2 text-amber-900">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Interview Pro Tip:</span> {cs.proTip}
                        </div>
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
