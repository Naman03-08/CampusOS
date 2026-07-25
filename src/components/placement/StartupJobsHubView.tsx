import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  ExternalLink, 
  Bookmark, 
  Check, 
  Copy, 
  Sparkles, 
  Building2, 
  Globe, 
  GraduationCap, 
  Rocket, 
  ShieldCheck, 
  Layers, 
  Grid, 
  List, 
  Star, 
  X,
  ArrowUpRight,
  Send,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { UserProfile, ResumeData } from '../../types';

interface StartupJobsHubViewProps {
  user?: UserProfile;
  resumeData?: ResumeData;
  onUpdateResume?: (resume: ResumeData) => void;
  onNavigateTab?: (tab: string) => void;
}

export interface JobPlatform {
  id: string;
  name: string;
  url: string;
  category: 'Tech & Startups' | 'Internships & Freshers' | 'Remote & Flexible' | 'Big Tech & Corporate' | 'Global & Public Sector' | 'Aggregators & Search';
  description: string;
  tags: string[];
  badge?: string;
  isFeatured?: boolean;
  bgGradient: string;
}

export const ALL_JOB_PLATFORMS: JobPlatform[] = [
  // Page 1 - Internships & Indian Tech
  {
    id: 'internshala',
    name: 'Internshala',
    url: 'https://internshala.com',
    category: 'Internships & Freshers',
    description: "India's #1 internship and fresher job portal. Offers over 80,000+ paid summer, winter, and work-from-home internships across tech, design, marketing, and management.",
    tags: ['Internships', 'Freshers', 'Work From Home', 'Paid Stipends'],
    badge: 'Top Choice in India',
    isFeatured: true,
    bgGradient: 'from-blue-600 to-sky-500'
  },
  {
    id: 'linkedin_jobs',
    name: 'LinkedIn Jobs',
    url: 'https://www.linkedin.com/jobs',
    category: 'Tech & Startups',
    description: "The world's largest professional networking platform. Search millions of job openings, direct recruiter connections, easy apply, and alumni network referrals.",
    tags: ['Global', 'Networking', 'Easy Apply', 'Direct Recruiters'],
    badge: 'Essential',
    isFeatured: true,
    bgGradient: 'from-blue-700 to-indigo-600'
  },
  {
    id: 'naukri',
    name: 'Naukri.com',
    url: 'https://www.naukri.com',
    category: 'Tech & Startups',
    description: "India's leading job search engine. Ideal for tech graduates, software engineers, and experienced professionals looking for MNC and IT jobs.",
    tags: ['India MNCs', 'IT Jobs', 'Campus Hiring', 'Resume Blast'],
    badge: 'India Leader',
    isFeatured: true,
    bgGradient: 'from-sky-600 to-blue-700'
  },
  {
    id: 'indeed_india',
    name: 'Indeed India',
    url: 'https://in.indeed.com',
    category: 'Aggregators & Search',
    description: "Localized job search engine for India with salary estimates, company reviews, instant alerts, and direct employer application links.",
    tags: ['India', 'All Roles', 'Company Reviews', 'Salary Insights'],
    bgGradient: 'from-indigo-600 to-blue-500'
  },
  {
    id: 'foundit',
    name: 'Foundit (Monster India)',
    url: 'https://www.foundit.in',
    category: 'Tech & Startups',
    description: "Formerly Monster India. Features personalized job recommendations, career insights, salary indexes, and direct recruiter chat.",
    tags: ['Monster', 'Personalized', 'Corporate Jobs', 'India'],
    bgGradient: 'from-purple-600 to-indigo-600'
  },
  {
    id: 'freshersworld',
    name: 'Freshersworld',
    url: 'https://www.freshersworld.com',
    category: 'Internships & Freshers',
    description: "Dedicated job portal for fresh graduates, campus recruitment drives, diploma candidates, government exams, and entry-level IT roles.",
    tags: ['Freshers', 'Campus Placement', 'Government Jobs', 'Entry Level'],
    badge: 'Campus Favorite',
    bgGradient: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'hirist',
    name: 'Hirist',
    url: 'https://www.hirist.com',
    category: 'Tech & Startups',
    description: "Niche job portal catering exclusively to premium tech roles: Backend, Frontend, DevOps, AI/ML, Data Science, and Mobile Development.",
    tags: ['Tech Only', 'High CTC', 'DevOps', 'Data Science'],
    badge: 'Premium Tech',
    bgGradient: 'from-violet-600 to-purple-600'
  },
  {
    id: 'cutshort',
    name: 'Cutshort',
    url: 'https://cutshort.io',
    category: 'Tech & Startups',
    description: "AI-powered recruitment platform connecting top software developers, product managers, and growth hackers directly with startup founders.",
    tags: ['AI Matching', 'Direct Founders', 'High Growth', 'India'],
    badge: 'Fast Response',
    bgGradient: 'from-rose-600 to-orange-500'
  },
  {
    id: 'wellfound',
    name: 'Wellfound (AngelList)',
    url: 'https://wellfound.com',
    category: 'Tech & Startups',
    description: "Formerly AngelList Talent. The premier global platform for early-stage startup jobs, venture-backed companies, equity packages, and remote roles.",
    tags: ['Startups', 'AngelList', 'Equity', 'Remote Tech'],
    badge: 'Global Startup Hub',
    isFeatured: true,
    bgGradient: 'from-slate-900 to-slate-700'
  },
  {
    id: 'workindia',
    name: 'WorkIndia',
    url: 'https://www.workindia.in',
    category: 'Internships & Freshers',
    description: "Hyper-local entry-level job portal enabling direct telephonic interviews with HRs without middleman delays across Indian cities.",
    tags: ['Direct HR Call', 'Entry Level', 'Local Jobs', 'Instant Interview'],
    bgGradient: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'apna',
    name: 'Apna',
    url: 'https://apna.co',
    category: 'Internships & Freshers',
    description: "India's largest professional network for frontline workers, fresh graduates, customer support, sales, and junior software developers.",
    tags: ['Hyper-local', 'Instant Calls', 'Skill Groups', 'Junior Tech'],
    bgGradient: 'from-teal-600 to-emerald-500'
  },
  {
    id: 'jobhai',
    name: 'Job Hai',
    url: 'https://www.jobhai.com',
    category: 'Internships & Freshers',
    description: "Verified job search platform powered by Info Edge (Naukri group) offering 100% free verified job applications across major Indian metros.",
    tags: ['Verified HRs', 'Zero Scam', '100% Free', 'Naukri Group'],
    bgGradient: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'placementindia',
    name: 'PlacementIndia',
    url: 'https://www.placementindia.com',
    category: 'Internships & Freshers',
    description: "Established Indian placement portal connecting candidates with top HR placement agencies, corporate recruiters, and walk-in drives.",
    tags: ['Walk-in Drives', 'Placement Agencies', 'Corporate', 'India'],
    bgGradient: 'from-slate-700 to-gray-600'
  },
  {
    id: 'shine',
    name: 'Shine.com',
    url: 'https://www.shine.com',
    category: 'Aggregators & Search',
    description: "Popular job portal by HT Media offering smart job alerts, resume creation tools, career guidance, and MNC hiring updates.",
    tags: ['HT Media', 'MNC Jobs', 'Career Guidance', 'Alerts'],
    bgGradient: 'from-sky-600 to-indigo-600'
  },
  {
    id: 'timesjobs',
    name: 'TimesJobs',
    url: 'https://www.timesjobs.com',
    category: 'Aggregators & Search',
    description: "Job search portal powered by Times Group specializing in IT, Telecom, Finance, Manufacturing, and campus recruitment.",
    tags: ['Times Group', 'IT & Telecom', 'Corporate', 'India'],
    bgGradient: 'from-red-600 to-rose-500'
  },
  {
    id: 'careerjet',
    name: 'CareerJet',
    url: 'https://www.careerjet.co.in',
    category: 'Aggregators & Search',
    description: "Comprehensive job search engine indexing millions of listings from company websites, recruitment portals, and job boards.",
    tags: ['Aggregator', 'Global Index', 'Fast Search', 'India Edition'],
    bgGradient: 'from-blue-600 to-indigo-500'
  },
  {
    id: 'jora',
    name: 'Jora India',
    url: 'https://in.jora.com',
    category: 'Aggregators & Search',
    description: "Minimalist, high-speed job search engine indexing fresh vacancy announcements directly from corporate portals and agencies.",
    tags: ['Lightweight', 'No Clutter', 'Fresh Listings', 'Global Network'],
    bgGradient: 'from-emerald-600 to-green-500'
  },
  {
    id: 'aicte_internship',
    name: 'AICTE Internship Portal',
    url: 'https://internship.aicte-india.org',
    category: 'Internships & Freshers',
    description: "Official Government of India internship portal by AICTE. Connects engineering & diploma students with government PSUs, MSMEs, and top corporates.",
    tags: ['Government AICTE', 'Verified PSUs', 'College Credits', 'Official'],
    badge: 'Govt Approved',
    isFeatured: true,
    bgGradient: 'from-orange-600 to-amber-500'
  },
  {
    id: 'ncs',
    name: 'National Career Service',
    url: 'https://www.ncs.gov.in',
    category: 'Global & Public Sector',
    description: "Ministry of Labour and Employment initiative linking job seekers, government departments, PSUs, and private employers.",
    tags: ['Ministry of Labour', 'Govt PSUs', 'Job Fairs', 'Free Registration'],
    badge: 'Government Portal',
    bgGradient: 'from-blue-800 to-indigo-900'
  },
  {
    id: 'hellointern',
    name: 'HelloIntern',
    url: 'https://hellointern.in',
    category: 'Internships & Freshers',
    description: "Global internship platform bridging Indian college students with international startups, research labs, and summer programs.",
    tags: ['Global Internships', 'Research Labs', 'Startups', 'Summer Internships'],
    bgGradient: 'from-cyan-600 to-blue-600'
  },
  {
    id: 'internadda',
    name: 'InternAdda',
    url: 'https://www.internadda.com',
    category: 'Internships & Freshers',
    description: "Curated internship portal focusing on tech, web development, digital marketing, content creation, and graphic design stipends.",
    tags: ['Stipend Focused', 'Student Portal', 'Tech & Design', 'India'],
    bgGradient: 'from-pink-600 to-rose-500'
  },
  {
    id: 'freeinternships',
    name: 'FreeInternships',
    url: 'https://www.freeinternships.in',
    category: 'Internships & Freshers',
    description: "Platform listing 100% free internship opportunities without registration charges or hidden training fees for college students.",
    tags: ['100% Free', 'Zero Fees', 'College Students', 'Freshers'],
    bgGradient: 'from-green-600 to-emerald-500'
  },

  // Global & General
  {
    id: 'indeed_global',
    name: 'Indeed Global',
    url: 'https://www.indeed.com',
    category: 'Aggregators & Search',
    description: "The world's #1 job search site with over 300 million unique monthly visitors. Global job listings across 60+ countries.",
    tags: ['Global', 'Worldwide', 'Company Reviews', 'Salaries'],
    badge: 'Global #1',
    bgGradient: 'from-blue-600 to-blue-800'
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor Jobs',
    url: 'https://www.glassdoor.com/Job',
    category: 'Aggregators & Search',
    description: "Combines job listings with anonymous employee reviews, real interview question databases, salary breakdowns, and CEO approval ratings.",
    tags: ['Interview Questions', 'Real Salaries', 'Company Reviews', 'Culture'],
    badge: 'Essential Reviews',
    bgGradient: 'from-emerald-600 to-green-700'
  },
  {
    id: 'google_jobs',
    name: 'Google Jobs',
    url: 'https://jobs.google.com',
    category: 'Aggregators & Search',
    description: "Google's official job search engine aggregating hiring postings from across the web into a unified, filtered interface.",
    tags: ['Google Search', 'Aggregated', 'Location Filters', 'Instant Alerts'],
    bgGradient: 'from-red-500 via-amber-500 to-blue-500'
  },
  {
    id: 'handshake',
    name: 'Handshake',
    url: 'https://joinhandshake.com',
    category: 'Internships & Freshers',
    description: "The #1 career network for college students and recent grads worldwide. Connects students with university career centers and Fortune 500 recruiters.",
    tags: ['College Career Centers', 'University Grads', 'Fortune 500', 'USA & Global'],
    badge: 'University Standard',
    bgGradient: 'from-rose-600 to-indigo-600'
  },
  {
    id: 'simplyhired',
    name: 'SimplyHired',
    url: 'https://www.simplyhired.com',
    category: 'Aggregators & Search',
    description: "Free job search engine and resume builder offering local job discovery, salary comparison estimators, and industry reports.",
    tags: ['Free Search', 'Salary Estimator', 'Global', 'Resume Builder'],
    bgGradient: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'ziprecruiter',
    name: 'ZipRecruiter',
    url: 'https://www.ziprecruiter.com',
    category: 'Aggregators & Search',
    description: "AI-driven employment marketplace with 'One-Click Apply' functionality, active employer matching, and recruiter notifications.",
    tags: ['1-Click Apply', 'AI Recruiter Match', 'US & Global', 'Instant Status'],
    bgGradient: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'jobrapido',
    name: 'Jobrapido',
    url: 'https://www.jobrapido.com',
    category: 'Aggregators & Search',
    description: "Leading international job search engine operating in 58 countries, matching millions of candidates with relevant vacancies.",
    tags: ['58 Countries', 'Global Search', 'Instant Match', 'Alerts'],
    bgGradient: 'from-purple-600 to-blue-600'
  },
  {
    id: 'jooble',
    name: 'Jooble',
    url: 'https://jooble.org',
    category: 'Aggregators & Search',
    description: "International job search website aggregating vacant jobs from over 140,000 resources across the globe in one place.",
    tags: ['140k+ Sources', 'Global Network', 'Fast Filters', 'Daily Updates'],
    bgGradient: 'from-amber-600 to-orange-600'
  },
  {
    id: 'adzuna',
    name: 'Adzuna',
    url: 'https://www.adzuna.com',
    category: 'Aggregators & Search',
    description: "Smart job search engine that uses advanced AI to analyze job market data, evaluate resume value, and surface missing opportunities.",
    tags: ['Value My Resume', 'Market Insights', 'AI Data', 'Global'],
    bgGradient: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'careerbuilder',
    name: 'CareerBuilder',
    url: 'https://www.careerbuilder.com',
    category: 'Aggregators & Search',
    description: "Pioneer recruitment platform offering career advice, salary trajectory insights, enterprise job opportunities, and talent management.",
    tags: ['Career Paths', 'Salary Insights', 'Global Enterprise', 'Resumes'],
    bgGradient: 'from-blue-700 to-sky-600'
  },
  {
    id: 'monster',
    name: 'Monster.com',
    url: 'https://www.monster.com',
    category: 'Aggregators & Search',
    description: "Global career site with resume parsing technology, industry guides, company profile insights, and enterprise employment drives.",
    tags: ['Global Brand', 'Resume Parsing', 'Interview Advice', 'Enterprise'],
    bgGradient: 'from-purple-700 to-indigo-800'
  },
  {
    id: 'flexjobs',
    name: 'FlexJobs',
    url: 'https://www.flexjobs.com',
    category: 'Remote & Flexible',
    description: "The gold standard for hand-screened, scam-free remote, hybrid, freelance, and flexible schedule job opportunities.",
    tags: ['Hand-Screened', '100% Scam-Free', 'Remote Work', 'Flexible Hours'],
    badge: 'Verified Remote',
    bgGradient: 'from-emerald-600 to-teal-700'
  },

  // Remote & Digital Nomad
  {
    id: 'remoteok',
    name: 'Remote OK',
    url: 'https://remoteok.com',
    category: 'Remote & Flexible',
    description: "The #1 remote job board for tech workers, developers, AI engineers, product designers, and digital nomads with live USD salary tags.",
    tags: ['USD Salaries', 'Digital Nomads', 'Dev & AI', 'Worldwide'],
    badge: 'Top Remote Tech',
    isFeatured: true,
    bgGradient: 'from-rose-500 to-pink-600'
  },
  {
    id: 'weworkremotely',
    name: 'We Work Remotely',
    url: 'https://weworkremotely.com',
    category: 'Remote & Flexible',
    description: "The largest remote work community on earth with over 3 million monthly visitors. Best for Full Stack, DevOps, and Product Design.",
    tags: ['3M+ Visitors', 'Full Stack', 'DevOps', 'Product Design'],
    badge: 'Remote Leader',
    bgGradient: 'from-red-600 to-amber-600'
  },
  {
    id: 'remotive',
    name: 'Remotive',
    url: 'https://remotive.com',
    category: 'Remote & Flexible',
    description: "Curated remote job board and active developer community featuring vetted tech startups hiring globally in engineering & AI.",
    tags: ['Vetted Startups', 'Remote Community', 'Global Tech', 'Engineering'],
    bgGradient: 'from-indigo-600 to-violet-600'
  },
  {
    id: 'workingnomads',
    name: 'Working Nomads',
    url: 'https://www.workingnomads.com',
    category: 'Remote & Flexible',
    description: "Curated list of remote jobs for digital professionals who want to work from anywhere in the world across software, design, and marketing.",
    tags: ['Work Anywhere', 'Digital Nomads', 'Software & Design', 'Global'],
    bgGradient: 'from-cyan-600 to-teal-600'
  },
  {
    id: 'otta',
    name: 'Otta',
    url: 'https://otta.com',
    category: 'Tech & Startups',
    description: "Modern candidate-first job platform matching engineers with top innovative tech companies, transparent salary ranges, and company culture metrics.",
    tags: ['Candidate First', 'Transparent CTC', 'Top Tech', 'Modern UI'],
    badge: 'Highly Rated UI',
    bgGradient: 'from-lime-600 to-emerald-600'
  },

  // Global Public Sector & Non-Profits
  {
    id: 'idealist',
    name: 'Idealist',
    url: 'https://www.idealist.org',
    category: 'Global & Public Sector',
    description: "Global clearinghouse for social impact jobs, non-profit internships, UN initiatives, environmental organizations, and volunteer roles.",
    tags: ['Non-Profits', 'Social Impact', 'Global NGO', 'Volunteering'],
    bgGradient: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'un_careers',
    name: 'UN Careers',
    url: 'https://careers.un.org',
    category: 'Global & Public Sector',
    description: "Official United Nations career portal for young professionals programs (YPP), international internships, field missions, and diplomatic posts.",
    tags: ['United Nations', 'YPP Program', 'Diplomacy', 'International Internships'],
    badge: 'Global Public Service',
    bgGradient: 'from-sky-700 to-blue-900'
  },
  {
    id: 'unicef_careers',
    name: 'UNICEF Careers',
    url: 'https://jobs.unicef.org',
    category: 'Global & Public Sector',
    description: "United Nations Children's Fund official hiring site for humanitarian tech roles, data analysis, field operations, and youth internships.",
    tags: ['UNICEF', 'Humanitarian Tech', 'Global Impact', 'Youth Programs'],
    bgGradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'worldbank_careers',
    name: 'World Bank Careers',
    url: 'https://www.worldbank.org/en/about/careers',
    category: 'Global & Public Sector',
    description: "World Bank Group Young Professionals Program (YPP), summer internships, economic research fellowships, and international technology roles.",
    tags: ['World Bank', 'YPP Fellowship', 'Economic Tech', 'Summer Internships'],
    bgGradient: 'from-indigo-800 to-blue-900'
  },
  {
    id: 'oecd_careers',
    name: 'OECD Careers',
    url: 'https://www.oecd.org/careers',
    category: 'Global & Public Sector',
    description: "Organization for Economic Co-operation and Development international internship program, policy analysis, and software development.",
    tags: ['OECD Paris', 'Global Policy', 'Internship Program', 'Data Science'],
    bgGradient: 'from-slate-800 to-slate-900'
  },
  {
    id: 'who_careers',
    name: 'WHO Careers',
    url: 'https://careers.who.int',
    category: 'Global & Public Sector',
    description: "World Health Organization career opportunities for health informatics, digital health software engineering, and global health research.",
    tags: ['WHO', 'Digital Health', 'Global Research', 'Geneva & Remote'],
    bgGradient: 'from-blue-600 to-teal-600'
  },
  {
    id: 'nasa_careers',
    name: 'NASA Careers',
    url: 'https://www.nasa.gov/careers',
    category: 'Global & Public Sector',
    description: "National Aeronautics and Space Administration Pathways Internships, computer science research fellowships, and aerospace software engineering.",
    tags: ['NASA Pathways', 'Aerospace Tech', 'Software & AI', 'Fellowships'],
    badge: 'Aero & Space',
    bgGradient: 'from-blue-900 via-indigo-900 to-red-600'
  },

  // Big Tech / FAANG
  {
    id: 'microsoft_careers',
    name: 'Microsoft Careers',
    url: 'https://careers.microsoft.com',
    category: 'Big Tech & Corporate',
    description: "Official Microsoft university hiring, Explore Internship program for 1st/2nd year students, software engineering, and cloud research.",
    tags: ['Explore Program', 'Software Engineer', 'Azure Cloud', 'University Hiring'],
    badge: 'FAANG / Big Tech',
    isFeatured: true,
    bgGradient: 'from-blue-600 to-red-500'
  },
  {
    id: 'google_careers',
    name: 'Google Careers',
    url: 'https://careers.google.com',
    category: 'Big Tech & Corporate',
    description: "Google Student Careers, STEP Internships (Software Engineering Technical Program), PhD research fellowships, and full-time software roles.",
    tags: ['STEP Internship', 'Software Engineer', 'Research Fellowships', 'Google'],
    badge: 'FAANG / Big Tech',
    isFeatured: true,
    bgGradient: 'from-blue-500 via-red-500 to-yellow-500'
  },
  {
    id: 'amazon_jobs',
    name: 'Amazon Jobs',
    url: 'https://www.amazon.jobs',
    category: 'Big Tech & Corporate',
    description: "Amazon Student Programs, AWS Software Development Engineer (SDE) internships, solutions architecture, and AI research hires.",
    tags: ['AWS SDE Intern', 'Student Programs', 'Systems Architecture', 'Amazon'],
    badge: 'FAANG / Big Tech',
    bgGradient: 'from-amber-500 to-slate-900'
  },
  {
    id: 'apple_careers',
    name: 'Apple Careers',
    url: 'https://jobs.apple.com',
    category: 'Big Tech & Corporate',
    description: "Apple hardware & software university internships, iOS development, Machine Learning research, and Silicon architecture opportunities.",
    tags: ['iOS Engineering', 'Core ML', 'Silicon', 'Apple Internships'],
    badge: 'FAANG / Big Tech',
    bgGradient: 'from-slate-900 to-slate-800'
  },

  // Tech & Niche Developer Boards
  {
    id: 'github_jobs',
    name: 'GitHub Jobs Projects',
    url: 'https://github.com/topics/jobs',
    category: 'Tech & Startups',
    description: "Community-maintained open-source repositories listing tech internships, hiring companies, YC lists, and direct developer applications.",
    tags: ['Open Source', 'Community Lists', 'Developer Direct', 'GitHub'],
    badge: 'Open Source Repo',
    bgGradient: 'from-gray-900 to-black'
  },
  {
    id: 'yc_jobs',
    name: 'Y Combinator Jobs',
    url: 'https://www.ycombinator.com/jobs',
    category: 'Tech & Startups',
    description: "Work at top YC backed startups. Filter by batch, stage (Seed to Series D), tech stack, remote options, and founder direct apply.",
    tags: ['YC Startups', 'Seed to Series D', 'Founder Direct', 'High Equity'],
    badge: 'YC Official',
    isFeatured: true,
    bgGradient: 'from-orange-600 to-amber-600'
  },
  {
    id: 'turing_jobs',
    name: 'Turing Jobs',
    url: 'https://www.turing.com/jobs',
    category: 'Tech & Startups',
    description: "AI-backed deep developer network connecting elite software engineers with top US companies for long-term remote roles paying in USD.",
    tags: ['US Tech Companies', 'Long-term Remote', 'USD Pay', 'Vetted Devs'],
    badge: 'Top US Remote',
    bgGradient: 'from-blue-600 to-purple-600'
  },
  {
    id: 'arc_dev',
    name: 'Arc.dev',
    url: 'https://arc.dev',
    category: 'Tech & Startups',
    description: "Remote developer career platform with vetted hiring passes, fast-tracked engineering interviews, and Silicon Valley company matching.",
    tags: ['Vetted Developers', 'Silicon Valley', 'Fast Track', 'Remote'],
    bgGradient: 'from-emerald-600 to-cyan-600'
  },
  {
    id: 'hn_jobs',
    name: 'Hacker News Jobs',
    url: 'https://news.ycombinator.com/jobs',
    category: 'Tech & Startups',
    description: "Y Combinator's Hacker News job board and monthly 'Who is Hiring?' threads where founders post raw tech roles without recruiters.",
    tags: ['Who is Hiring?', 'Hacker News', 'Raw Tech Roles', 'No Recruiters'],
    badge: 'Cult Favorite',
    bgGradient: 'from-orange-500 to-amber-600'
  },
  {
    id: 'devitjobs',
    name: 'DevITJobs',
    url: 'https://devitjobs.com',
    category: 'Tech & Startups',
    description: "Transparent developer job board with mandatory salary brackets, tech stack filters, location options, and direct company links.",
    tags: ['Transparent Salary', 'Dev Only', 'Tech Stack Filters', 'Europe & US'],
    bgGradient: 'from-violet-600 to-indigo-700'
  },
  {
    id: 'nofluffjobs',
    name: 'NoFluffJobs',
    url: 'https://nofluffjobs.com',
    category: 'Tech & Startups',
    description: "IT job portal with mandatory salary ranges on every single listing, clear requirements, and direct dev hiring transparency.",
    tags: ['100% Salary Listed', 'No Fluff', 'IT Tech Only', 'Transparent'],
    badge: '100% Transparent',
    bgGradient: 'from-rose-600 to-red-700'
  },
  {
    id: 'js_jobs',
    name: 'JavaScript Jobs',
    url: 'https://javascriptjob.xyz',
    category: 'Tech & Startups',
    description: "Specialized niche job board for JavaScript, React, Node.js, TypeScript, Next.js, and Full-Stack Web Engineers worldwide.",
    tags: ['React', 'Node.js', 'TypeScript', 'Full Stack'],
    bgGradient: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'python_jobs',
    name: 'Python Jobs',
    url: 'https://www.python.org/jobs',
    category: 'Tech & Startups',
    description: "Official Python Software Foundation job board listing backend engineering, Django/FastAPI, Data Science, and Machine Learning roles.",
    tags: ['Python Software Foundation', 'Django', 'FastAPI', 'AI/ML'],
    badge: 'Official Python',
    bgGradient: 'from-blue-600 to-yellow-500'
  },
  {
    id: 'ai_jobs',
    name: 'AIJobs.net',
    url: 'https://aijobs.net',
    category: 'Tech & Startups',
    description: "Dedicated job board for AI, Machine Learning, Deep Learning, LLM Engineers, Computer Vision, and Data Science professionals.",
    tags: ['AI & ML', 'LLM Engineers', 'Data Science', 'Generative AI'],
    badge: 'AI Dedicated',
    bgGradient: 'from-indigo-600 to-pink-600'
  }
];

export const StartupJobsHubView: React.FC<StartupJobsHubViewProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedPlatformIds, setSavedPlatformIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('campusos_saved_job_platforms');
      return stored ? JSON.parse(stored) : ['internshala', 'linkedin_jobs', 'wellfound', 'aicte_internship'];
    } catch {
      return ['internshala', 'linkedin_jobs', 'wellfound', 'aicte_internship'];
    }
  });
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('campusos_saved_job_platforms', JSON.stringify(savedPlatformIds));
    } catch (e) {
      console.warn("Failed to persist saved platforms:", e);
    }
  }, [savedPlatformIds]);

  const toggleSavePlatform = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPlatformIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopyLink = (platform: JobPlatform, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(platform.url);
    setCopiedId(platform.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    'All',
    'Tech & Startups',
    'Internships & Freshers',
    'Remote & Flexible',
    'Big Tech & Corporate',
    'Global & Public Sector',
    'Aggregators & Search'
  ];

  // Filter platforms
  const filteredPlatforms = ALL_JOB_PLATFORMS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSaved = !showSavedOnly || savedPlatformIds.includes(p.id);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) || 
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q);

    return matchesCategory && matchesSaved && matchesSearch;
  });

  const featuredPlatforms = ALL_JOB_PLATFORMS.filter(p => p.isFeatured);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider border border-blue-200 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              60+ VERIFIED PLATFORMS
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider border border-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% DIRECT FREE ACCESS
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[11px] font-bold uppercase tracking-wider border border-purple-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              7 CATEGORY VAULTS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Startup & Internship Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl leading-relaxed">
            Curated directory of 60+ top verified internship & job portals across Indian tech, startup hiring platforms, remote workboards, FAANG careers, and government portals.
          </p>
        </div>

        {/* STATS BADGES */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center min-w-[90px]">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Total Sites</span>
            <span className="text-xl font-extrabold text-slate-900">{ALL_JOB_PLATFORMS.length}</span>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-center min-w-[90px]">
            <span className="text-[10px] font-bold text-blue-700 block uppercase tracking-wider">Categories</span>
            <span className="text-xl font-extrabold text-blue-800">7</span>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center min-w-[90px]">
            <span className="text-[10px] font-bold text-amber-700 block uppercase tracking-wider">Saved</span>
            <span className="text-xl font-extrabold text-amber-800">{savedPlatformIds.length}</span>
          </div>
        </div>
      </div>

      {/* FEATURED / TOP RECOMMENDED PLATFORMS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            Top Recommended Job & Internship Portals
          </h2>
          <span className="text-[11px] font-bold text-slate-500">Essential Student Hubs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPlatforms.map((p) => {
            const isSaved = savedPlatformIds.includes(p.id);
            return (
              <div 
                key={p.id}
                className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${p.bgGradient} flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0`}>
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug flex items-center gap-1.5">
                          {p.name}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => toggleSavePlatform(p.id, e)}
                      className={`p-2 rounded-xl transition-all ${
                        isSaved 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Saved to bookmarks' : 'Save platform'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-700' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.badge && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {p.badge}
                      </span>
                    )}
                    {p.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                  >
                    <span>Visit Official Site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={(e) => handleCopyLink(p, e)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Copy link"
                  >
                    {copiedId === p.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEARCH AND FILTER TOOLBAR */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 60+ platforms by name, category, or keyword (e.g. 'Internshala', 'Remote', 'AI', 'Google', 'Govt')..."
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

          {/* Controls: Bookmarked Filter & View Mode */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                showSavedOnly 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
              <span>Saved ({savedPlatformIds.length})</span>
            </button>

            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-2xs font-extrabold' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-2xs font-extrabold' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[11px] font-black uppercase text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PLATFORMS DISPLAY AREA */}
      {filteredPlatforms.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No platforms found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No job portals or internship websites match your current filter criteria or search query "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setShowSavedOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors inline-block"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlatforms.map((p) => {
            const isSaved = savedPlatformIds.includes(p.id);
            return (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group relative"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${p.bgGradient} flex items-center justify-center text-white font-black text-base shadow-xs shrink-0`}>
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                          {p.name}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => toggleSavePlatform(p.id, e)}
                      className={`p-2 rounded-xl transition-all shrink-0 ${
                        isSaved 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Saved' : 'Save platform'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-700' : ''}`} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-medium min-h-[42px]">
                    {p.description}
                  </p>

                  {/* Tags & Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.badge && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {p.badge}
                      </span>
                    )}
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>Visit Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={(e) => handleCopyLink(p, e)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Copy direct link"
                  >
                    {copiedId === p.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW TABLE */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Platform Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Key Features / Tags</th>
                  <th className="py-3.5 px-4">Highlight</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredPlatforms.map((p) => {
                  const isSaved = savedPlatformIds.includes(p.id);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${p.bgGradient} flex items-center justify-center text-white font-black text-xs shrink-0 shadow-2xs`}>
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors block text-xs">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate max-w-xs block">
                              {p.url}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-bold text-slate-600 text-[11px] whitespace-nowrap">
                        {p.category}
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {p.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {p.badge ? (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">Verified Direct</span>
                        )}
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => toggleSavePlatform(p.id, e)}
                            className={`p-2 rounded-xl transition-all ${
                              isSaved ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                            }`}
                            title={isSaved ? 'Saved' : 'Save'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-700' : ''}`} />
                          </button>

                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
