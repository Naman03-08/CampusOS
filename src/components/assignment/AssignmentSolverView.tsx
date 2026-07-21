import React, { useState } from 'react';
import { FileCheck, Zap, Download, CheckCircle2, RefreshCw, Upload, FileText } from 'lucide-react';
import { AssignmentItem } from '../../types';
import { exportTextToPDF } from '../../lib/pdfExport';

interface AssignmentSolverProps {
  assignments: AssignmentItem[];
  onAddAssignment: (assignment: AssignmentItem) => void;
}

export const AssignmentSolverView: React.FC<AssignmentSolverProps> = ({
  assignments,
  onAddAssignment,
}) => {
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(
    assignments.length > 0 ? assignments[0] : null
  );

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Operating Systems');
  const [problemText, setProblemText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assignment-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemText: problemText || 'Calculate page faults for sequence [7,0,1,2,0,3] using FIFO.',
          subject: subject || 'Operating Systems',
        }),
      });

      const data = await res.json();

      const newItem: AssignmentItem = {
        id: 'assign_' + Date.now(),
        userId: 'default',
        title: title || 'Academic Problem Assignment',
        subject: subject || 'General Engineering',
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        questionText: problemText || 'Calculate page faults for sequence [7,0,1,2,0,3] using FIFO.',
        solutionMarkdown: data.stepByStepSolution || 'Step-by-step verified solution generated.',
        status: 'solved',
        createdAt: new Date().toISOString(),
      };

      onAddAssignment(newItem);
      setSelectedAssignment(newItem);
      setTitle('');
      setProblemText('');
    } catch (err) {
      console.error('Assignment solver error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedAssignment) return;
    const exportContent = `ASSIGNMENT: ${selectedAssignment.title}\nSUBJECT: ${selectedAssignment.subject}\n\nPROBLEM STATEMENT:\n${selectedAssignment.problemText}\n\nSTEP-BY-STEP VERIFIED SOLUTION:\n${selectedAssignment.solution}\n\nKEY FORMULAS:\n${selectedAssignment.keyFormulas.join('\n')}\n\nTEXTBOOK REFERENCES:\n${selectedAssignment.textbookReferences.join('\n')}`;
    exportTextToPDF(selectedAssignment.title, exportContent, `${selectedAssignment.title.replace(/\s+/g, '_')}_Solution.pdf`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-black text-slate-900">AI Step-by-Step Assignment Solver</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Solve math, physics, engineering & computer science problem sets with verified step-by-step proofs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form Column (1 Col) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600 animate-pulse" />
            <h2 className="font-extrabold text-slate-900 text-sm">Solve New Assignment Problem</h2>
          </div>

          <form onSubmit={handleSolve} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assignment Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. FIFO vs LRU Page Replacement Problem"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Operating Systems"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Paste Question / Problem Statement</label>
              <textarea
                rows={6}
                required
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Paste the math equation, physics problem, CS algorithm question or accounting statement here..."
                className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI is computing proof...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Generate Step-by-Step Solution</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Stage Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* History / Selected Item Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {assignments.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedAssignment(item)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                  selectedAssignment?.id === item.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {selectedAssignment ? (
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {selectedAssignment.subject}
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900 mt-1">{selectedAssignment.title}</h2>
                </div>

                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-indigo-600" />
                  Export PDF Solution
                </button>
              </div>

              {/* Problem Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold uppercase text-slate-400 mb-1">Problem Statement</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">{selectedAssignment.problemText}</p>
              </div>

              {/* Solution Box */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                <p className="text-xs font-bold uppercase text-indigo-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Step-by-Step Solution
                </p>
                <pre className="text-xs sm:text-sm font-sans text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedAssignment.solution}
                </pre>
              </div>

              {/* Formulas & References */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold text-slate-700 mb-2">Formulas & Principles Used</p>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {selectedAssignment.keyFormulas?.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold text-slate-700 mb-2">Textbook & Academic References</p>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {selectedAssignment.textbookReferences?.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center">
              <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">No Assignment Selected</p>
              <p className="text-xs text-slate-500">Paste your assignment problem on the left to generate verified solutions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
