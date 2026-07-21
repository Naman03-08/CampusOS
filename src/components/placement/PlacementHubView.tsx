import React, { useState } from 'react';
import { Briefcase, Zap, Award, FileText, Bot, Download, CheckCircle2, RefreshCw, Mic, Video, Star } from 'lucide-react';
import { ResumeData, UserProfile } from '../../types';
import { exportTextToPDF } from '../../lib/pdfExport';

interface PlacementHubProps {
  user: UserProfile;
  resumeData: ResumeData;
  onUpdateResume: (resume: ResumeData) => void;
}

export const PlacementHubView: React.FC<PlacementHubProps> = ({
  user,
  resumeData,
  onUpdateResume,
}) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'mock_interview' | 'cover_letter'>('resume');

  // Resume state
  const [resume, setResume] = useState<ResumeData>(resumeData);
  const [targetRole, setTargetRole] = useState(user.targetRole || 'Software Engineer');
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [loadingEval, setLoadingEval] = useState(false);

  // Mock Interview state
  const [interviewRole, setInterviewRole] = useState('Software Engineer (Google / Meta)');
  const [interviewQuestion, setInterviewQuestion] = useState('How do you design a LRU Cache with O(1) time complexity?');
  const [userAnswer, setUserAnswer] = useState('');
  const [recording, setRecording] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState<any>(null);
  const [loadingInterview, setLoadingInterview] = useState(false);

  // Cover letter state
  const [companyName, setCompanyName] = useState('Google');
  const [coverLetterText, setCoverLetterText] = useState('');
  const [loadingCover, setLoadingCover] = useState(false);

  const handleEvaluateResume = async () => {
    setLoadingEval(true);
    try {
      const res = await fetch('/api/ai/evaluate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: resume,
          targetRole,
        }),
      });

      const data = await res.json();
      setEvaluationResult(data);
    } catch (err) {
      console.error('Resume eval error:', err);
    } finally {
      setLoadingEval(false);
    }
  };

  const handleEvaluateInterviewAnswer = async () => {
    setLoadingInterview(true);
    try {
      const res = await fetch('/api/ai/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: interviewRole,
          question: interviewQuestion,
          userAnswer: userAnswer || 'I use a Doubly LinkedList combined with a Hash Map to store key-node pairs.',
        }),
      });

      const data = await res.json();
      setInterviewFeedback(data);
    } catch (err) {
      console.error('Interview eval error:', err);
    } finally {
      setLoadingInterview(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    setLoadingCover(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Write an exceptional, tailored ATS cover letter for student ${resume.fullName} applying for ${targetRole} at ${companyName}. Skills: ${resume.skills.join(', ')}.`,
        }),
      });

      const data = await res.json();
      setCoverLetterText(data.reply || 'Cover letter generated.');
    } catch (err) {
      console.error('Cover letter error:', err);
    } finally {
      setLoadingCover(false);
    }
  };

  const handleExportResumePDF = () => {
    const exportContent = `NAME: ${resume.fullName}\nEMAIL: ${resume.email}\nPHONE: ${resume.phone}\nUNIVERSITY: ${resume.university}\nMAJOR: ${resume.major}\n\nSUMMARY:\n${resume.summary}\n\nSKILLS:\n${resume.skills.join(', ')}\n\nPROJECTS:\n${resume.projects.map(p => `- ${p.title}: ${p.description} (Tech: ${p.techStack.join(', ')})`).join('\n')}`;
    exportTextToPDF(`${resume.fullName}_Resume`, exportContent, `${resume.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-rose-600" />
            <h1 className="text-2xl font-black text-slate-900">Placement Hub & AI Mock Interview Suite</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ATS Resume optimization, custom cover letters & live voice/video mock interview evaluations.
          </p>
        </div>

        <button
          onClick={handleExportResumePDF}
          className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 flex items-center gap-2 transition-all"
        >
          <Download className="w-4 h-4" />
          Export Resume PDF
        </button>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit text-xs font-bold">
        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'resume' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
          }`}
        >
          ATS Resume Evaluator & Editor
        </button>
        <button
          onClick={() => setActiveTab('mock_interview')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'mock_interview' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
          }`}
        >
          AI Mock Interview Simulator
        </button>
        <button
          onClick={() => setActiveTab('cover_letter')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'cover_letter' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
          }`}
        >
          Cover Letter Generator
        </button>
      </div>

      {/* TAB 1: ATS Resume Evaluator */}
      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="font-extrabold text-slate-900 text-sm">Resume Details</h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.fullName}
                  onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Executive Summary / Headline</label>
              <textarea
                rows={3}
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Skills (Comma separated)</label>
              <input
                type="text"
                value={resume.skills.join(', ')}
                onChange={(e) => setResume({ ...resume, skills: e.target.value.split(',').map((s) => s.trim()) })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <button
              onClick={handleEvaluateResume}
              disabled={loadingEval}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all"
            >
              {loadingEval ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI is scanning ATS criteria...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Run ATS Score Check</span>
                </>
              )}
            </button>
          </div>

          {/* Results Box */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-rose-600" /> ATS Feedback & Score
            </h2>

            {evaluationResult ? (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-rose-700">Overall Match Score</p>
                    <p className="text-3xl font-black text-rose-900">{evaluationResult.atsScore} / 100</p>
                  </div>
                  <span className="text-xs font-bold text-rose-800 bg-white px-3 py-1 rounded-full border border-rose-200">
                    Target: {targetRole}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold text-slate-900 mb-2">Strengths</p>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {evaluationResult.strengths?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <p className="text-xs font-bold text-amber-900 mb-2">Missing Keywords / Improvements</p>
                  <ul className="list-disc list-inside text-xs text-amber-800 space-y-1">
                    {evaluationResult.missingKeywords?.map((k: string, i: number) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200">
                <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No Evaluation Run Yet</p>
                <p className="text-xs text-slate-500">Click "Run ATS Score Check" to analyze your resume.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: AI Mock Interview Simulator */}
      {activeTab === 'mock_interview' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                Live AI Interview Stage
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">{interviewRole}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                <Video className="w-3.5 h-3.5 text-emerald-600" /> Camera Ready
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                <Mic className="w-3.5 h-3.5 text-blue-600" /> Audio Stream Active
              </span>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-5 rounded-2xl bg-purple-50/80 border border-purple-200">
            <p className="text-xs font-bold uppercase text-purple-700 mb-1">Interview Question 1 of 5</p>
            <p className="text-base font-extrabold text-slate-900">{interviewQuestion}</p>
          </div>

          {/* User Answer Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">Your Spoken / Typed Answer</label>
              <button
                type="button"
                onClick={() => setRecording(!recording)}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  recording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{recording ? 'Recording Voice...' : 'Simulate Voice Input'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type or speak your technical answer step-by-step..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
            />

            <button
              onClick={handleEvaluateInterviewAnswer}
              disabled={loadingInterview}
              className="py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition-all"
            >
              {loadingInterview ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI is evaluating confidence & depth...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Submit Answer For AI Evaluation</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback Stage */}
          {interviewFeedback && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">AI Scoring & Detailed Analysis</h3>
                <span className="text-base font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-xl">
                  Score: {interviewFeedback.score} / 100
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <p className="font-bold text-emerald-700 mb-1">Strong Points</p>
                  <p className="text-slate-600">{interviewFeedback.strengths}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <p className="font-bold text-amber-700 mb-1">Key Improvements Needed</p>
                  <p className="text-slate-600">{interviewFeedback.improvements}</p>
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                <strong>Ideal Benchmark Answer:</strong> {interviewFeedback.idealAnswer}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Cover Letter Generator */}
      {activeTab === 'cover_letter' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-extrabold text-slate-900 text-sm">Cover Letter Generator</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Position</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateCoverLetter}
            disabled={loadingCover}
            className="py-3 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all"
          >
            {loadingCover ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Writing tailored cover letter...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Generate Tailored Cover Letter</span>
              </>
            )}
          </button>

          {coverLetterText && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans mt-4">
              {coverLetterText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
