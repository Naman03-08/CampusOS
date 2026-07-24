import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  CheckCircle2, 
  Circle, 
  Zap, 
  Flame, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  Filter, 
  RotateCcw,
  BookOpenCheck,
  Trophy,
  Sparkles
} from 'lucide-react';
import { DSAProblem } from '../../types';
import { SectionUsageBanner } from '../common/SectionUsageBanner';
import { getCampusOSDSASheet } from '../../data/dsaSheet375';

interface CodingHubProps {
  dsa: DSAProblem[];
  onToggleSolved: (id: string) => void;
  onResetDSASheet?: (newSheet: DSAProblem[]) => void;
  onNavigateTab?: (tab: string) => void;
}

const CATEGORIES = [
  'All',
  'Arrays',
  'Strings',
  '2D Arrays',
  'Searching & Sorting',
  'Backtracking',
  'Linked List',
  'Stacks & Queues',
  'Greedy',
  'Binary Trees',
  'Binary Search Trees',
  'Heaps & Hashing',
  'Graphs',
  'Tries',
  'Dynamic Programming',
  'Bit Manipulation',
  'Segment Trees',
];

const SECTION_RESOURCES: Record<string, { gfg: string; leetcode: string; youtube: string }> = {
  'Arrays': {
    gfg: 'https://www.geeksforgeeks.org/array-data-structure/',
    leetcode: 'https://leetcode.com/tag/array/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Arrays+DSA'
  },
  'Strings': {
    gfg: 'https://www.geeksforgeeks.org/string-data-structure/',
    leetcode: 'https://leetcode.com/tag/string/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Strings+DSA'
  },
  '2D Arrays': {
    gfg: 'https://www.geeksforgeeks.org/matrix/',
    leetcode: 'https://leetcode.com/tag/matrix/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+2D+Arrays+Matrix+DSA'
  },
  'Searching & Sorting': {
    gfg: 'https://www.geeksforgeeks.org/sorting-algorithms/',
    leetcode: 'https://leetcode.com/tag/sorting/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Searching+and+Sorting+DSA'
  },
  'Backtracking': {
    gfg: 'https://www.geeksforgeeks.org/backtracking-algorithms/',
    leetcode: 'https://leetcode.com/tag/backtracking/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Backtracking+DSA'
  },
  'Linked List': {
    gfg: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
    leetcode: 'https://leetcode.com/tag/linked-list/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Linked+List+DSA'
  },
  'Stacks & Queues': {
    gfg: 'https://www.geeksforgeeks.org/stack-data-structure/',
    leetcode: 'https://leetcode.com/tag/stack/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Stacks+Queues+DSA'
  },
  'Greedy': {
    gfg: 'https://www.geeksforgeeks.org/greedy-algorithms/',
    leetcode: 'https://leetcode.com/tag/greedy/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Greedy+Algorithms+DSA'
  },
  'Binary Trees': {
    gfg: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
    leetcode: 'https://leetcode.com/tag/tree/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Binary+Trees+DSA'
  },
  'Binary Search Trees': {
    gfg: 'https://www.geeksforgeeks.org/binary-search-tree-data-structure/',
    leetcode: 'https://leetcode.com/tag/binary-search-tree/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Binary+Search+Trees+DSA'
  },
  'Heaps & Hashing': {
    gfg: 'https://www.geeksforgeeks.org/heap-data-structure/',
    leetcode: 'https://leetcode.com/tag/heap-priority-queue/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Heaps+Hashing+DSA'
  },
  'Graphs': {
    gfg: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
    leetcode: 'https://leetcode.com/tag/graph/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Graphs+DSA'
  },
  'Tries': {
    gfg: 'https://www.geeksforgeeks.org/trie-insert-and-search/',
    leetcode: 'https://leetcode.com/tag/trie/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Trie+Data+Structure+DSA'
  },
  'Dynamic Programming': {
    gfg: 'https://www.geeksforgeeks.org/dynamic-programming/',
    leetcode: 'https://leetcode.com/tag/dynamic-programming/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Dynamic+Programming+DSA'
  },
  'Bit Manipulation': {
    gfg: 'https://www.geeksforgeeks.org/bit-manipulation-data-structure/',
    leetcode: 'https://leetcode.com/tag/bit-manipulation/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Bit+Manipulation+DSA'
  },
  'Segment Trees': {
    gfg: 'https://www.geeksforgeeks.org/segment-tree-data-structure/',
    leetcode: 'https://leetcode.com/tag/segment-tree/',
    youtube: 'https://www.youtube.com/results?search_query=Apna+College+Segment+Trees+DSA'
  }
};

export const CodingHubView: React.FC<CodingHubProps> = ({ dsa, onToggleSolved, onResetDSASheet, onNavigateTab }) => {
  const [problems, setProblems] = useState<DSAProblem[]>(dsa);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Solved' | 'Unsolved'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'tracker' | 'ai_solver'>('tracker');
  const [pageSize, setPageSize] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync state if props change externally
  React.useEffect(() => {
    setProblems(dsa);
  }, [dsa]);

  // AI Code Solver State
  const [codePrompt, setCodePrompt] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('cpp');
  const [aiCodeSolution, setAiCodeSolution] = useState('');
  const [loadingCode, setLoadingCode] = useState(false);

  // Category Counts map
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: problems.length };
    problems.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [problems]);

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchStatus = 
        statusFilter === 'All' ? true : statusFilter === 'Solved' ? p.solved : !p.solved;
      const matchSearch = 
        !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchDiff && matchStatus && matchSearch;
    });
  }, [problems, selectedCategory, selectedDifficulty, statusFilter, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProblems.length / pageSize) || 1;
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProblems.slice(start, start + pageSize);
  }, [filteredProblems, currentPage, pageSize]);

  // Stats
  const solvedCount = problems.filter((p) => p.solved).length;
  const totalCount = problems.length;
  const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  const handleToggle = (id: string) => {
    const updated = problems.map((p) => (p.id === id ? { ...p, solved: !p.solved } : p));
    setProblems(updated);
    onToggleSolved(id);
  };

  const handleResetToCampusOS375 = () => {
    if (window.confirm('Reset DSA tracker to the complete CampusOS 375 DSA Roadmap Sheet?')) {
      const freshSheet = getCampusOSDSASheet('user');
      setProblems(freshSheet);
      if (onResetDSASheet) {
        onResetDSASheet(freshSheet);
      } else {
        freshSheet.forEach((p) => {
          if (p.solved) onToggleSolved(p.id);
        });
      }
      setCurrentPage(1);
    }
  };

  const handleSolveCodeAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingCode(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are the CampusOS AI Competitive Programming Coach. Provide clean, production-ready, optimal ${codeLanguage} code with detailed time & space complexity analysis for this problem:\n\n${codePrompt}`,
        }),
      });

      const data = await res.json();
      setAiCodeSolution(data.reply || 'Solution generated.');
    } catch (err) {
      console.error('Code solver error:', err);
    } finally {
      setLoadingCode(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="CampusOS 375 DSA Roadmap & Coding Mastery Hub"
        subtitle="Complete 375 Curated DSA Questions across Arrays, DP, Graphs, Trees, System Design & AI Code Coach"
        purpose="This hub contains the complete CampusOS 375 DSA Roadmap Sheet to help students systematically master Data Structures & Algorithms for software engineering interviews, coding rounds, and university exams."
        keyFeatures={[
          'Complete CampusOS 375 DSA Roadmap Questions',
          'Detailed Topic-Wise Categories (Arrays, Graphs, DP, Trees, Tries, Segment Trees)',
          'Difficulty & Completion Status Filtering with Instant Search',
          'AI Code & Algorithm Coach for C++, Java, Python, TypeScript Solutions',
          'Real-time Progress Tracker & Streak Analytics'
        ]}
        icon={<Code2 className="w-6 h-6 text-white" />}
        badge="CampusOS 375 DSA Sheet"
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-600">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">CampusOS 375 DSA Roadmap Sheet</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Comprehensive 375 DSA Question Bank (By Apna College) • Solved {solvedCount} of {totalCount} Questions
              </p>
            </div>
          </div>

          {/* PDF Section Links */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('courses')}
                className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Explore Interactive Coding Courses & Academies</span>
              </button>
            )}
            <a
              href="https://www.youtube.com/@ApnaCollegeOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3 h-3 text-red-600" />
              <span>Meet us on YouTube (Apna College)</span>
            </a>

            <a
              href="https://www.youtube.com/watch?v=rZ41y93P2Qo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3 h-3 text-amber-600" />
              <span>How to solve this sheet? (Video Guide)</span>
            </a>

            <a
              href="https://www.apnacollege.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3 h-3 text-cyan-600" />
              <span>Apna College Official Site</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-3.5 py-2 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold text-xs flex items-center gap-2">
            <Flame className={`w-4 h-4 ${solvedCount > 0 ? 'text-orange-500 fill-orange-500' : 'text-slate-400'}`} />
            <span>Streak: {solvedCount > 0 ? `${solvedCount} Day${solvedCount === 1 ? '' : 's'}` : '0 Days'}</span>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-emerald-600" />
            <span>Solved: {solvedCount}/{totalCount} ({progressPct}%)</span>
          </div>

          <button
            onClick={handleResetToCampusOS375}
            className="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            title="Reset to CampusOS 375 Questions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset 375 Sheet</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit text-xs font-bold">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'tracker' ? 'bg-white text-cyan-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>375 Problem Sheet Tracker ({filteredProblems.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('ai_solver')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'ai_solver' ? 'bg-white text-cyan-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-4 h-4 text-cyan-600" />
          <span>CampusOS AI Code & Algorithm Coach</span>
        </button>
      </div>

      {activeTab === 'tracker' && (
        <div className="space-y-5">
          {/* Search & Secondary Filters */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Bar */}
              <div className="relative md:col-span-5">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search 375 questions by title or keyword..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="md:col-span-3 flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => {
                    setSelectedDifficulty(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="md:col-span-2">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as 'All' | 'Solved' | 'Unsolved');
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Solved">Solved</option>
                  <option value="Unsolved">Unsolved</option>
                </select>
              </div>

              {/* Page size selector */}
              <div className="md:col-span-2">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-700 focus:outline-none"
                >
                  <option value={30}>Show 30 / page</option>
                  <option value={60}>Show 60 / page</option>
                  <option value={100}>Show 100 / page</option>
                  <option value={375}>Show All 375</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-thin">
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`px-1.5 py-0.2 text-[10px] rounded-md ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Section Resource Links Banner */}
            {selectedCategory !== 'All' && SECTION_RESOURCES[selectedCategory] && (
              <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="font-bold text-cyan-950 flex items-center gap-1.5">
                  <BookOpenCheck className="w-4 h-4 text-cyan-600" />
                  <span>{selectedCategory} Section Roadmap Resources:</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={SECTION_RESOURCES[selectedCategory].gfg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors flex items-center gap-1"
                  >
                    <span>GeeksforGeeks Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={SECTION_RESOURCES[selectedCategory].leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold text-[11px] hover:bg-amber-600 transition-colors flex items-center gap-1"
                  >
                    <span>LeetCode Tag</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={SECTION_RESOURCES[selectedCategory].youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold text-[11px] hover:bg-red-700 transition-colors flex items-center gap-1"
                  >
                    <span>YouTube Tutorials</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Table / Question List */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            {filteredProblems.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs space-y-2">
                <Code2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-700">No questions match your current search and filters.</p>
                <p>Try resetting categories or search terms.</p>
              </div>
            ) : (
              paginatedProblems.map((prob, idx) => {
                const globalIndex = (currentPage - 1) * pageSize + idx + 1;
                const linkUrl = prob.platformUrl || `https://www.google.com/search?q=${encodeURIComponent(prob.title + ' problem')}`;
                const gfgUrl = `https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(prob.title)}`;
                const leetcodeUrl = `https://leetcode.com/problemset/all/?search=${encodeURIComponent(prob.title)}`;
                const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent('Apna College ' + prob.title)}`;

                return (
                  <div
                    key={prob.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      prob.solved ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="text-[11px] font-extrabold text-slate-400 w-8 shrink-0 text-right">
                        #{globalIndex}
                      </span>

                      <button
                        onClick={() => handleToggle(prob.id)}
                        className="text-slate-300 hover:text-emerald-600 transition-colors shrink-0"
                        title={prob.solved ? 'Mark as unsolved' : 'Mark as solved'}
                      >
                        {prob.solved ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-extrabold uppercase text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
                            {prob.category}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                              prob.difficulty === 'Easy'
                                ? 'bg-emerald-100 text-emerald-800'
                                : prob.difficulty === 'Medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {prob.difficulty}
                          </span>
                        </div>
                        <h3 className={`font-bold text-xs sm:text-sm mt-1 truncate ${prob.solved ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                          {prob.title}
                        </h3>
                      </div>
                    </div>

                    {/* Question Links */}
                    <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                      <a
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                        title="Practice primary problem link"
                      >
                        <span>Practice</span>
                        <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                      </a>

                      <a
                        href={gfgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-[11px] transition-colors flex items-center gap-1"
                        title="Search on GeeksforGeeks"
                      >
                        <span>GFG</span>
                        <ExternalLink className="w-3 h-3 text-emerald-600" />
                      </a>

                      <a
                        href={leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-[11px] transition-colors flex items-center gap-1"
                        title="Search on LeetCode"
                      >
                        <span>LeetCode</span>
                        <ExternalLink className="w-3 h-3 text-amber-600" />
                      </a>

                      <a
                        href={ytUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-[11px] transition-colors flex items-center gap-1"
                        title="Search Apna College Video Solution"
                      >
                        <span>Video Solution</span>
                        <ExternalLink className="w-3 h-3 text-red-500" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 text-xs">
                <p className="text-slate-500 font-medium">
                  Showing <span className="font-bold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                  <span className="font-bold text-slate-900">
                    {Math.min(currentPage * pageSize, filteredProblems.length)}
                  </span>{' '}
                  of <span className="font-bold text-slate-900">{filteredProblems.length}</span> questions
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1.5 font-bold text-slate-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'ai_solver' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-600" /> CampusOS AI Competitive Coding Coach
            </h2>
            <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-xl border border-cyan-100">
              Optimal Time & Space Complexity
            </span>
          </div>

          <form onSubmit={handleSolveCodeAI} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Language</label>
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-bold text-slate-800"
                >
                  <option value="cpp">C++ (STL)</option>
                  <option value="java">Java 21</option>
                  <option value="python">Python 3</option>
                  <option value="typescript">TypeScript / JavaScript</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Problem Description / Code snippet to debug</label>
              <textarea
                rows={5}
                required
                value={codePrompt}
                onChange={(e) => setCodePrompt(e.target.value)}
                placeholder="Enter any problem title from the CampusOS 375 DSA Roadmap or paste your code snippet for optimal solution..."
                className="w-full p-3.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loadingCode}
              className="py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loadingCode ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>CampusOS AI is generating optimal algorithm...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Generate Optimal Solution & Complexity Analysis</span>
                </>
              )}
            </button>
          </form>

          {aiCodeSolution && (
            <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-2 mt-4 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
              <p className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> CampusOS AI Solution & Complexity Output
              </p>
              <pre className="whitespace-pre-wrap leading-relaxed">{aiCodeSolution}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
