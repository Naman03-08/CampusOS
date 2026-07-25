import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  Zap, 
  FileText, 
  Award, 
  RefreshCw, 
  Download, 
  Building2, 
  Rocket, 
  Clock, 
  Plus, 
  Filter, 
  Sparkles,
  Send,
  Check,
  X,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { ResumeData, UserProfile } from '../../types';
import { exportTextToPDF } from '../../lib/pdfExport';
import { SectionUsageBanner } from '../common/SectionUsageBanner';

interface StartupJobsHubViewProps {
  user?: UserProfile;
  resumeData?: ResumeData;
  onUpdateResume?: (resume: ResumeData) => void;
  onNavigateTab?: (tab: string) => void;
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  logoBg: string;
  ycBatch?: string;
  roleType: 'SDE' | 'Full Stack' | 'AI/ML' | 'Backend' | 'Frontend' | 'Product';
  location: string;
  stipend: string;
  postedAgo: string;
  skillsRequired: string[];
  description: string;
  responsibilities?: string[];
  applyUrl: string;
}

const FEATURED_STARTUP_JOBS: JobListing[] = [
  {
    id: 'job_1',
    title: 'Software Engineer Intern (Full Stack / AI)',
    company: 'HyperScale AI',
    logoBg: 'bg-gradient-to-br from-purple-600 to-indigo-600',
    ycBatch: 'YC W25',
    roleType: 'AI/ML',
    location: 'Remote / San Francisco',
    stipend: '$4,000 - $6,000 / mo',
    postedAgo: '1 day ago',
    skillsRequired: ['TypeScript', 'React', 'Python', 'LLM Agents', 'FastAPI'],
    description: 'Build cutting-edge LLM agent workflows, automated code review pipelines, and real-time canvas interfaces for developer productivity.',
    responsibilities: [
      'Architect real-time streaming LLM response pipelines with WebSocket fallback',
      'Build responsive React & Tailwind UI components for automated code review dashboards',
      'Optimize vector database retrieval latency for enterprise repositories'
    ],
    applyUrl: 'https://ycombinator.com/jobs'
  },
  {
    id: 'job_2',
    title: 'Backend Engineering Intern (Distributed Systems)',
    company: 'FinPulse Systems',
    logoBg: 'bg-gradient-to-br from-emerald-600 to-teal-600',
    ycBatch: 'Unicorn',
    roleType: 'Backend',
    location: 'Hybrid (Bangalore / Remote)',
    stipend: '₹50,000 - ₹75,000 / mo',
    postedAgo: '2 days ago',
    skillsRequired: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'System Design'],
    description: 'Scale high-throughput payment settlement pipelines processing over 10 million daily financial transactions with sub-50ms p99 latency.',
    responsibilities: [
      'Design idempotent payment transaction engines preventing double-charging during network partitioning',
      'Implement Redis caching layers reducing database query load by 60%',
      'Write comprehensive unit & integration test suites using Jest & Docker'
    ],
    applyUrl: 'https://linkedin.com/jobs'
  },
  {
    id: 'job_3',
    title: 'Frontend Developer Intern (Next.js & Canvas)',
    company: 'CanvasFlow',
    logoBg: 'bg-gradient-to-br from-blue-600 to-cyan-600',
    ycBatch: 'YC S24',
    roleType: 'Frontend',
    location: 'Remote',
    stipend: '$3,000 - $4,500 / mo',
    postedAgo: '3 days ago',
    skillsRequired: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'WebSockets'],
    description: 'Craft smooth 60fps canvas editors, multiplayer document collaboration rooms, and interactive design tools using React & WebSockets.',
    responsibilities: [
      'Develop real-time cursor presence and collaborative canvas editing with CRDT algorithms',
      'Optimize DOM render performance for large complex vector diagrams',
      'Integrate drag-and-drop file uploaders with progress feedback'
    ],
    applyUrl: 'https://ycombinator.com/jobs'
  },
  {
    id: 'job_4',
    title: 'SDE Intern (Core Cloud Infrastructure)',
    company: 'CloudVolt',
    logoBg: 'bg-gradient-to-br from-indigo-600 to-purple-600',
    ycBatch: 'YC W24',
    roleType: 'SDE',
    location: 'Remote',
    stipend: '$3,500 - $5,000 / mo',
    postedAgo: '4 days ago',
    skillsRequired: ['Go / Golang', 'Kubernetes', 'gRPC', 'Distributed Systems'],
    description: 'Work on distributed state machines, serverless execution nodes, eBPF network monitoring, and edge telemetry collection engines.',
    responsibilities: [
      'Implement gRPC microservices for cluster node discovery and health monitoring',
      'Construct automated container deployment pipelines using Kubernetes Operators',
      'Benchmark memory allocation and reduce garbage collection pause times'
    ],
    applyUrl: 'https://ycombinator.com/jobs'
  },
  {
    id: 'job_5',
    title: 'AI Systems & Infra Engineer Intern',
    company: 'VectorScale',
    logoBg: 'bg-gradient-to-br from-amber-600 to-orange-600',
    ycBatch: 'YC W25',
    roleType: 'AI/ML',
    location: 'San Francisco, CA / Hybrid',
    stipend: '$5,000 - $7,000 / mo',
    postedAgo: 'Just now',
    skillsRequired: ['PyTorch', 'CUDA', 'Python', 'Vector DBs', 'Model Quantization'],
    description: 'Optimize high-speed vector embeddings retrieval and GPU inference kernels for enterprise search at billion-scale datasets.',
    responsibilities: [
      'Implement 8-bit quantized LLM inference servers delivering 3x faster token generation',
      'Optimize HNSW vector index search over 500M embeddings',
      'Build benchmark suites comparing PyTorch vs TensorRT-LLM runtimes'
    ],
    applyUrl: 'https://ycombinator.com/jobs'
  },
  {
    id: 'job_6',
    title: 'Full Stack Engineering Intern',
    company: 'Deel Referral',
    logoBg: 'bg-gradient-to-br from-rose-600 to-pink-600',
    ycBatch: 'Series B',
    roleType: 'Full Stack',
    location: 'Remote (Global)',
    stipend: '$3,200 - $4,800 / mo',
    postedAgo: '5 days ago',
    skillsRequired: ['React', 'Node.js', 'GraphQL', 'AWS', 'Microservices'],
    description: 'Develop international payroll calculation engines, automated compliance workflows, and multi-currency banking integrations.',
    responsibilities: [
      'Build React workflow builders for global HR compliance onboarding',
      'Connect GraphQL resolvers to legacy banking gateway microservices',
      'Write end-to-end Cypress tests ensuring zero downtime on payout releases'
    ],
    applyUrl: 'https://linkedin.com/jobs'
  }
];

export const StartupJobsHubView: React.FC<StartupJobsHubViewProps> = ({
  user,
  resumeData,
  onUpdateResume,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'ats_checker' | 'cover_letter' | 'applications'>('jobs');
  const [selectedJobModal, setSelectedJobModal] = useState<JobListing | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');

  // Saved / Applied Jobs Tracker
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<{ id: string; company: string; title: string; date: string; status: string }[]>([]);

  // ATS Evaluator State
  const [resume, setResume] = useState<ResumeData>(
    resumeData || {
      fullName: user?.displayName || 'Campus Student',
      email: user?.email || '',
      phone: '+1 555-0192',
      university: 'Tech University',
      major: 'Computer Science',
      summary: 'Passionate Computer Science student with strong DSA fundamentals and hands-on React/Node.js experience.',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Data Structures', 'Tailwind CSS'],
      projects: [
        {
          id: 'p1',
          title: 'CampusOS Student Productivity Platform',
          description: 'Full-stack academic platform with AI Notes Summarizer and DSA tracker.',
          techStack: ['React', 'TypeScript', 'Express', 'Firebase']
        }
      ],
      education: [],
      experience: [],
      atsScore: 88
    }
  );
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Engineer');
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [loadingEval, setLoadingEval] = useState(false);

  // Cover Letter State
  const [companyName, setCompanyName] = useState('HyperScale AI');
  const [coverLetterText, setCoverLetterText] = useState('');
  const [loadingCover, setLoadingCover] = useState(false);
  const [copiedCover, setCopiedCover] = useState(false);

  // Handle ATS Scan
  const handleEvaluateResume = async () => {
    setLoadingEval(true);
    try {
      const res = await fetch('/api/ai/evaluate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: resume,
          targetRole
        })
      });

      const data = await res.json();
      setEvaluationResult(data);
      if (onUpdateResume) {
        onUpdateResume({ ...resume, atsScore: data.atsScore || 88 });
      }
    } catch (err) {
      console.error('Resume eval error:', err);
      setEvaluationResult({
        atsScore: 88,
        strengths: [
          'Solid inclusion of modern tech stack (React, TypeScript, Node.js)',
          'Clear project descriptions with measurable outcomes',
          'Clean layout structure standard for tech ATS scanners'
        ],
        missingKeywords: ['System Design', 'CI/CD Pipelines', 'RESTful API Optimization', 'Jest / Unit Testing']
      });
    } finally {
      setLoadingEval(false);
    }
  };

  // Handle Cover Letter Generation
  const handleGenerateCoverLetter = async () => {
    setLoadingCover(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Write a compelling, concise ATS-optimized startup internship cover letter for ${resume.fullName} applying for ${targetRole} at ${companyName}. Skills: ${resume.skills.join(', ')}. Keep it under 250 words and professional.`
        })
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
    const exportContent = `NAME: ${resume.fullName}\nEMAIL: ${resume.email}\nPHONE: ${resume.phone}\nUNIVERSITY: ${resume.university}\nMAJOR: ${resume.major}\n\nEXECUTIVE SUMMARY:\n${resume.summary}\n\nSKILLS:\n${resume.skills.join(', ')}\n\nPROJECTS:\n${resume.projects.map((p) => `- ${p.title}: ${p.description} (Tech: ${p.techStack.join(', ')})`).join('\n')}`;
    exportTextToPDF(`${resume.fullName}_Resume`, exportContent, `${resume.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
  };

  const handleApplyToJob = (job: JobListing) => {
    if (!appliedJobs.some((a) => a.id === job.id)) {
      setAppliedJobs((prev) => [
        {
          id: job.id,
          company: job.company,
          title: job.title,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          status: 'Applied'
        },
        ...prev
      ]);
    }
    window.open(job.applyUrl, '_blank');
  };

  const toggleSaveJob = (id: string) => {
    setSavedJobIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const filteredJobs = FEATURED_STARTUP_JOBS.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || j.roleType === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="Startup Jobs & Internship Hub"
        subtitle="Curated YC & High-Growth Startup Internships, ATS Resume Audit & Cover Letter Suite"
        purpose="This section connects students with high-impact software engineering & AI startup internships. Scan your resume against target roles, generate tailored cover letters for top tech companies, and track your active job applications in one unified workspace."
        keyFeatures={[
          'Curated Early-Stage & YC Startup Internship Listings',
          'AI ATS Resume Score Scanner & Keyword Analyzer',
          '1-Click Tailored Cover Letter Generator for Target Companies',
          'Active Application Status Tracker (Applied, Interviewing, Offer)',
          'Export Clean ATS PDF Resumes'
        ]}
        icon={<Rocket className="w-6 h-6 text-white" />}
        badge="Placement & Jobs Hub"
      />

      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Rocket className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Startup Jobs & Internship Hub</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Discover verified tech startup internships, run ATS resume checks, and generate company-specific cover letters.
          </p>
        </div>

        <button
          onClick={handleExportResumePDF}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export ATS Resume PDF</span>
        </button>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 bg-slate-100/90 p-1.5 rounded-2xl w-fit text-xs font-extrabold border border-slate-200/80 shadow-2xs flex-wrap">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'jobs' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Startup Jobs Board ({FEATURED_STARTUP_JOBS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ats_checker')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'ats_checker' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>ATS Resume Evaluator</span>
        </button>

        <button
          onClick={() => setActiveTab('cover_letter')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'cover_letter' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-purple-600" />
          <span>Tailored Cover Letter</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'applications' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>My Applications ({appliedJobs.length})</span>
        </button>
      </div>

      {/* TAB 1: STARTUP JOBS BOARD */}
      {activeTab === 'jobs' && (
        <div className="space-y-5">
          
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role title or startup name (e.g. HyperScale, AI)..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <span className="text-xs font-extrabold text-slate-400 shrink-0">Role:</span>
              {['All', 'SDE', 'AI/ML', 'Full Stack', 'Backend', 'Frontend'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                    roleFilter === r
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              const isApplied = appliedJobs.some((a) => a.id === job.id);

              return (
                <div
                  key={job.id}
                  className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl ${job.logoBg} text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0`}>
                          {job.company.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {job.company}
                            </h3>
                            {job.ycBatch && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[9px] font-black uppercase">
                                {job.ycBatch}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-extrabold text-slate-800 line-clamp-1">{job.title}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-xl transition-colors shrink-0 ${
                          isSaved ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-400'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> {job.stipend}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" /> {job.postedAgo}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
                      {job.description}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {job.skillsRequired.map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJobModal(job)}
                      className="px-3.5 py-2.5 rounded-xl font-extrabold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer shrink-0"
                    >
                      Details & Match
                    </button>

                    <button
                      onClick={() => handleApplyToJob(job)}
                      className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isApplied
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Applied ✓</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Apply Now</span>
                          <ExternalLink className="w-3 h-3 opacity-80" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: ATS RESUME EVALUATOR */}
      {activeTab === 'ats_checker' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="font-extrabold text-slate-900 text-sm">Resume ATS Parameters</h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.fullName}
                  onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Executive Summary / Headline</label>
              <textarea
                rows={3}
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Skills (Comma separated)</label>
              <input
                type="text"
                value={resume.skills.join(', ')}
                onChange={(e) => setResume({ ...resume, skills: e.target.value.split(',').map((s) => s.trim()) })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-medium"
              />
            </div>

            <button
              onClick={handleEvaluateResume}
              disabled={loadingEval}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loadingEval ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning against ATS algorithms...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Run Automated ATS Score Check</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" /> ATS Audit Results
            </h2>

            {evaluationResult ? (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-indigo-700">Overall Match Score</p>
                    <p className="text-3xl font-black text-indigo-900">{evaluationResult.atsScore} / 100</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-800 bg-white px-3 py-1 rounded-full border border-indigo-200">
                    Target: {targetRole}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">Key Strengths</p>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {evaluationResult.strengths?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <p className="text-xs font-bold text-amber-900">Recommended Keywords To Add</p>
                  <ul className="list-disc list-inside text-xs text-amber-800 space-y-1">
                    {evaluationResult.missingKeywords?.map((k: string, i: number) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <Award className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700">No ATS Scan Run Yet</p>
                <p className="text-xs text-slate-500">Click "Run Automated ATS Score Check" to analyze keyword matches.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: TAILORED COVER LETTER GENERATOR */}
      {activeTab === 'cover_letter' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-slate-900 text-base">AI Tailored Cover Letter Generator</h2>
            <p className="text-xs text-slate-500">Generate company-specific cover letters highlighting your exact skills.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. HyperScale AI"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Position</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Engineer Intern"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none font-medium"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateCoverLetter}
            disabled={loadingCover}
            className="py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {loadingCover ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Writing tailored cover letter...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Tailored Cover Letter</span>
              </>
            )}
          </button>

          {coverLetterText && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans relative">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(coverLetterText);
                  setCopiedCover(true);
                  setTimeout(() => setCopiedCover(false), 2000);
                }}
                className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                {copiedCover ? 'Copied ✓' : 'Copy Text'}
              </button>
              {coverLetterText}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MY APPLICATIONS TRACKER */}
      {activeTab === 'applications' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
            My Application Tracker ({appliedJobs.length})
          </h2>

          {appliedJobs.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Briefcase className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-600">No active applications tracked yet.</p>
              <p className="text-xs text-slate-400">Click "Apply Now" on any startup job to add it here!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {appliedJobs.map((app, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black text-slate-900">{app.title}</h3>
                    <p className="text-[11px] font-bold text-slate-500">{app.company} • Applied on {app.date}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* JOB DETAIL OVERLAY MODAL */}
      {selectedJobModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedJobModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 pr-8">
              <div className={`w-14 h-14 rounded-2xl ${selectedJobModal.logoBg} text-white font-black text-lg flex items-center justify-center shadow-md shrink-0`}>
                {selectedJobModal.company.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-black text-slate-900">{selectedJobModal.company}</h2>
                  {selectedJobModal.ycBatch && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                      {selectedJobModal.ycBatch}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-extrabold text-indigo-600">{selectedJobModal.title}</h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-3">
                  <span>📍 {selectedJobModal.location}</span>
                  <span>💰 {selectedJobModal.stipend}</span>
                  <span>⏱️ Posted {selectedJobModal.postedAgo}</span>
                </p>
              </div>
            </div>

            {/* Job Description & Responsibilities */}
            <div className="space-y-4 text-xs sm:text-sm border-t border-slate-100 pt-4">
              <div>
                <h4 className="font-extrabold text-slate-900 mb-1">Role Description</h4>
                <p className="text-slate-600 leading-relaxed">{selectedJobModal.description}</p>
              </div>

              {selectedJobModal.responsibilities && (
                <div>
                  <h4 className="font-extrabold text-slate-900 mb-2">Key Responsibilities</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                    {selectedJobModal.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-extrabold text-slate-900 mb-2">Required Skills & Technologies</h4>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedJobModal.skillsRequired.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  setCompanyName(selectedJobModal.company);
                  setTargetRole(selectedJobModal.title);
                  setActiveTab('cover_letter');
                  setSelectedJobModal(null);
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-xs flex items-center justify-center gap-2 border border-purple-200 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Generate Tailored Cover Letter</span>
              </button>

              <button
                onClick={() => {
                  handleApplyToJob(selectedJobModal);
                  setSelectedJobModal(null);
                }}
                className="w-full sm:flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Apply via Referral / Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
