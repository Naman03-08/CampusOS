import React, { useState } from 'react';
import { Code2, CheckCircle2, Circle, Zap, BookMarked, Flame, ExternalLink, RefreshCw } from 'lucide-react';
import { DSAProblem } from '../../types';

interface CodingHubProps {
  dsa: DSAProblem[];
  onToggleSolved: (id: string) => void;
}

export const CodingHubView: React.FC<CodingHubProps> = ({ dsa, onToggleSolved }) => {
  const [problems, setProblems] = useState<DSAProblem[]>(dsa);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'tracker' | 'ai_solver'>('tracker');

  // AI Code Solver State
  const [codePrompt, setCodePrompt] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('cpp');
  const [aiCodeSolution, setAiCodeSolution] = useState('');
  const [loadingCode, setLoadingCode] = useState(false);

  const categories = ['All', 'Arrays', 'Strings', 'LinkedList', 'Trees', 'Graphs', 'Dynamic Programming'];

  const filteredProblems = problems.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    return matchCat && matchDiff;
  });

  const solvedCount = problems.filter((p) => p.solved).length;
  const totalCount = problems.length;
  const progressPct = Math.round((solvedCount / totalCount) * 100);

  const handleToggle = (id: string) => {
    const updated = problems.map((p) => (p.id === id ? { ...p, solved: !p.solved } : p));
    setProblems(updated);
    onToggleSolved(id);
  };

  const handleSolveCodeAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingCode(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are an expert DSA Competitive Programming AI Coach. Provide clean, production-ready, optimal ${codeLanguage} code with time & space complexity analysis for this problem:\n\n${codePrompt}`,
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
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-cyan-600" />
            <h1 className="text-2xl font-black text-slate-900">Coding & DSA Topic Mastery Hub</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track category-wise DSA problem solving, solution notes & AI competitive programming assistant.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold text-xs flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>Streak: 12 Days</span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 font-bold text-xs">
            Solved: {solvedCount}/{totalCount} ({progressPct}%)
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit text-xs font-bold">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'tracker' ? 'bg-white text-cyan-600 shadow-xs' : 'text-slate-600'
          }`}
        >
          DSA Problem Sheet Tracker
        </button>
        <button
          onClick={() => setActiveTab('ai_solver')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'ai_solver' ? 'bg-white text-cyan-600 shadow-xs' : 'text-slate-600'
          }`}
        >
          AI Code & Algorithm Solver
        </button>
      </div>

      {activeTab === 'tracker' && (
        <div className="space-y-4">
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table / List */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            {filteredProblems.map((prob) => (
              <div
                key={prob.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  prob.solved ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => handleToggle(prob.id)} className="text-slate-400 hover:text-emerald-600 transition-colors">
                    {prob.solved ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
                        {prob.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
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
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{prob.title}</h3>
                  </div>
                </div>

                <a
                  href={prob.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <span>Solve Link</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ai_solver' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-600" /> Ask AI to Solve or Optimize Code
          </h2>

          <form onSubmit={handleSolveCodeAI} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Language</label>
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
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
                placeholder="Paste DSA problem statement or your buggy code snippet here..."
                className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loadingCode}
              className="py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 transition-all"
            >
              {loadingCode ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI is generating optimal algorithm...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Get Optimal Solution & Complexity Analysis</span>
                </>
              )}
            </button>
          </form>

          {aiCodeSolution && (
            <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-2 mt-4 font-mono text-xs overflow-x-auto">
              <p className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider mb-2">
                AI Code & Complexity Output
              </p>
              <pre className="whitespace-pre-wrap leading-relaxed">{aiCodeSolution}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
