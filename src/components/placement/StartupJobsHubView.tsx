import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ExternalLink, 
  Bookmark, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Grid, 
  List, 
  Star, 
  X,
  SlidersHorizontal,
  Compass,
  Filter,
  Briefcase,
  Globe,
  Share2,
  Info
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
  avatarBg: string;
  avatarText: string;
}

export const ALL_JOB_PLATFORMS: JobPlatform[] = [
  // Page 1 - Internships & Indian Tech
  {
    id: 'internshala',
    name: 'Internshala',
    url: 'https://internshala.com',
    category: 'Internships & Freshers',
    description: "India's #1 internship and fresher job portal. Offers over 80,000+ paid summer, winter, and work-from-home internships.",
    tags: ['Internships', 'Freshers', 'Work From Home', 'Paid Stipends'],
    badge: 'Top Choice in India',
    isFeatured: true,
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-700'
  },
  {
    id: 'linkedin_jobs',
    name: 'LinkedIn Jobs',
    url: 'https://www.linkedin.com/jobs',
    category: 'Tech & Startups',
    description: "Search millions of job openings, direct recruiter connections, easy apply, and alumni network referrals globally.",
    tags: ['Global', 'Networking', 'Easy Apply', 'Direct Recruiters'],
    badge: 'Essential',
    isFeatured: true,
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-700'
  },
  {
    id: 'naukri',
    name: 'Naukri.com',
    url: 'https://www.naukri.com',
    category: 'Tech & Startups',
    description: "India's leading job search engine. Ideal for tech graduates, software engineers, and experienced IT professionals.",
    tags: ['India MNCs', 'IT Jobs', 'Campus Hiring', 'MNC Roles'],
    badge: 'India Leader',
    isFeatured: true,
    avatarBg: 'bg-indigo-100',
    avatarText: 'text-indigo-700'
  },
  {
    id: 'indeed_india',
    name: 'Indeed India',
    url: 'https://in.indeed.com',
    category: 'Aggregators & Search',
    description: "Localized job search engine for India with salary estimates, company reviews, and direct employer application links.",
    tags: ['India', 'All Roles', 'Company Reviews', 'Salaries'],
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-700'
  },
  {
    id: 'foundit',
    name: 'Foundit',
    url: 'https://www.foundit.in',
    category: 'Tech & Startups',
    description: "Formerly Monster India. Features personalized job recommendations, career insights, and direct recruiter chat.",
    tags: ['Monster', 'Personalized', 'Corporate Jobs', 'India'],
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-700'
  },
  {
    id: 'freshersworld',
    name: 'Freshersworld',
    url: 'https://www.freshersworld.com',
    category: 'Internships & Freshers',
    description: "Dedicated job portal for fresh graduates, campus recruitment drives, diploma candidates, and entry-level IT roles.",
    tags: ['Freshers', 'Campus Placement', 'Government Jobs', 'Entry Level'],
    badge: 'Campus Favorite',
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-700'
  },
  {
    id: 'hirist',
    name: 'Hirist',
    url: 'https://www.hirist.com',
    category: 'Tech & Startups',
    description: "Niche job portal catering exclusively to premium tech roles: Backend, Frontend, DevOps, AI/ML, and Data Science.",
    tags: ['Tech Only', 'High CTC', 'DevOps', 'Data Science'],
    badge: 'Premium Tech',
    avatarBg: 'bg-rose-100',
    avatarText: 'text-rose-700'
  },
  {
    id: 'cutshort',
    name: 'Cutshort',
    url: 'https://cutshort.io',
    category: 'Tech & Startups',
    description: "AI-powered recruitment platform connecting top software developers directly with high-growth startup founders.",
    tags: ['AI Matching', 'Direct Founders', 'High Growth', 'India'],
    badge: 'Fast Response',
    avatarBg: 'bg-orange-100',
    avatarText: 'text-orange-700'
  },
  {
    id: 'wellfound',
    name: 'Wellfound',
    url: 'https://wellfound.com',
    category: 'Tech & Startups',
    description: "Startup jobs and internships from thousands of startups, formerly known as AngelList Talent.",
    tags: ['Startups', 'Internships', 'Remote', 'Global'],
    badge: 'Global Startup Hub',
    isFeatured: true,
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-700'
  },
  {
    id: 'workindia',
    name: 'WorkIndia',
    url: 'https://www.workindia.in',
    category: 'Internships & Freshers',
    description: "Hyper-local entry-level job portal enabling direct telephonic interviews with HRs across Indian cities.",
    tags: ['Direct HR Call', 'Entry Level', 'Local Jobs', 'Instant Interview'],
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-700'
  },
  {
    id: 'apna',
    name: 'Apna',
    url: 'https://apna.co',
    category: 'Internships & Freshers',
    description: "Professional network for fresh graduates, customer support, sales, and junior software developers.",
    tags: ['Hyper-local', 'Instant Calls', 'Junior Tech', 'Freshers'],
    avatarBg: 'bg-cyan-100',
    avatarText: 'text-cyan-700'
  },
  {
    id: 'jobhai',
    name: 'Job Hai',
    url: 'https://www.jobhai.com',
    category: 'Internships & Freshers',
    description: "Verified job search platform powered by Info Edge (Naukri group) offering free verified job applications.",
    tags: ['Verified HRs', '100% Free', 'Naukri Group', 'India'],
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-700'
  },
  {
    id: 'placementindia',
    name: 'PlacementIndia',
    url: 'https://www.placementindia.com',
    category: 'Internships & Freshers',
    description: "Connecting candidates with top HR placement agencies, corporate recruiters, and walk-in drives.",
    tags: ['Walk-in Drives', 'Placement Agencies', 'Corporate', 'India'],
    avatarBg: 'bg-stone-100',
    avatarText: 'text-stone-700'
  },
  {
    id: 'shine',
    name: 'Shine.com',
    url: 'https://www.shine.com',
    category: 'Aggregators & Search',
    description: "Popular job portal by HT Media offering smart job alerts, resume creation tools, and MNC hiring updates.",
    tags: ['HT Media', 'MNC Jobs', 'Career Guidance', 'Alerts'],
    avatarBg: 'bg-sky-100',
    avatarText: 'text-sky-700'
  },
  {
    id: 'timesjobs',
    name: 'TimesJobs',
    url: 'https://www.timesjobs.com',
    category: 'Aggregators & Search',
    description: "Job search portal powered by Times Group specializing in IT, Telecom, Finance, and campus recruitment.",
    tags: ['Times Group', 'IT & Telecom', 'Corporate', 'India'],
    avatarBg: 'bg-red-100',
    avatarText: 'text-red-700'
  },
  {
    id: 'careerjet',
    name: 'CareerJet',
    url: 'https://www.careerjet.co.in',
    category: 'Aggregators & Search',
    description: "Comprehensive job search engine indexing millions of listings from company websites and job boards.",
    tags: ['Aggregator', 'Global Index', 'Fast Search', 'India'],
    avatarBg: 'bg-indigo-100',
    avatarText: 'text-indigo-700'
  },
  {
    id: 'jora',
    name: 'Jora India',
    url: 'https://in.jora.com',
    category: 'Aggregators & Search',
    description: "Minimalist, high-speed job search engine indexing fresh vacancy announcements directly from corporate portals.",
    tags: ['Lightweight', 'No Clutter', 'Fresh Listings', 'Global'],
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-700'
  },
  {
    id: 'aicte_internship',
    name: 'AICTE Internship',
    url: 'https://internship.aicte-india.org',
    category: 'Internships & Freshers',
    description: "Official Government of India internship portal connecting engineering students with PSUs and corporates.",
    tags: ['Government AICTE', 'Verified PSUs', 'College Credits', 'Official'],
    badge: 'Govt Approved',
    isFeatured: true,
    avatarBg: 'bg-orange-100',
    avatarText: 'text-orange-700'
  },
  {
    id: 'ncs',
    name: 'National Career Service',
    url: 'https://www.ncs.gov.in',
    category: 'Global & Public Sector',
    description: "Ministry of Labour initiative linking job seekers, government departments, PSUs, and private employers.",
    tags: ['Ministry of Labour', 'Govt PSUs', 'Job Fairs', 'Free Registration'],
    badge: 'Government Portal',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-800'
  },
  {
    id: 'hellointern',
    name: 'HelloIntern',
    url: 'https://hellointern.in',
    category: 'Internships & Freshers',
    description: "Global internship platform bridging Indian college students with international startups and research labs.",
    tags: ['Global Internships', 'Research Labs', 'Startups', 'Summer Internships'],
    avatarBg: 'bg-violet-100',
    avatarText: 'text-violet-700'
  },
  {
    id: 'internadda',
    name: 'InternAdda',
    url: 'https://www.internadda.com',
    category: 'Internships & Freshers',
    description: "Curated internship portal focusing on tech, web development, digital marketing, and design stipends.",
    tags: ['Stipend Focused', 'Student Portal', 'Tech & Design', 'India'],
    avatarBg: 'bg-pink-100',
    avatarText: 'text-pink-700'
  },
  {
    id: 'freeinternships',
    name: 'FreeInternships',
    url: 'https://www.freeinternships.in',
    category: 'Internships & Freshers',
    description: "Listing 100% free internship opportunities without registration charges or hidden training fees.",
    tags: ['100% Free', 'Zero Fees', 'College Students', 'Freshers'],
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-700'
  },

  // YC & Tech Startup Hubs
  {
    id: 'yc_jobs',
    name: 'Y Combinator Jobs',
    url: 'https://www.ycombinator.com/jobs',
    category: 'Tech & Startups',
    description: "Work at early-stage and high-growth startups backed by Y Combinator, the world's top startup accelerator.",
    tags: ['Startups', 'Internships', 'Remote', 'Global'],
    badge: 'YC Official',
    isFeatured: true,
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-700'
  },
  {
    id: 'devjobsscanner',
    name: 'DevJobsScanner',
    url: 'https://devitjobs.com',
    category: 'Tech & Startups',
    description: "Aggregates and scans thousands of software engineering jobs across the web to show top tech roles.",
    tags: ['Software Engineering', 'Global', 'Frontend', 'Backend'],
    badge: 'Top Scanner',
    avatarBg: 'bg-indigo-100',
    avatarText: 'text-indigo-700'
  },
  {
    id: 'remotive',
    name: 'Remotive',
    url: 'https://remotive.com',
    category: 'Remote & Flexible',
    description: "A premium curated remote job board for developers, product managers, and support professionals.",
    tags: ['Remote', 'Software Engineering', 'Internships', 'Global'],
    badge: 'Vetted Remote',
    isFeatured: true,
    avatarBg: 'bg-rose-100',
    avatarText: 'text-rose-700'
  },
  {
    id: 'remoteok',
    name: 'Remote OK',
    url: 'https://remoteok.com',
    category: 'Remote & Flexible',
    description: "The world's most popular remote job board, connecting startups with remote builders globally.",
    tags: ['Remote', 'Global', 'Startups', 'Tech'],
    badge: 'Top Remote',
    isFeatured: true,
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-800'
  },
  {
    id: 'js_remotely',
    name: 'JS Remotely',
    url: 'https://javascriptjob.xyz',
    category: 'Tech & Startups',
    description: "The leading JavaScript-focused remote job board. Discover React, Node, Vue, and Angular startup roles.",
    tags: ['Frontend', 'Remote', 'Software Engineering', 'JavaScript'],
    avatarBg: 'bg-yellow-100',
    avatarText: 'text-yellow-800'
  },
  {
    id: 'weworkremotely',
    name: 'We Work Remotely',
    url: 'https://weworkremotely.com',
    category: 'Remote & Flexible',
    description: "The largest remote work community in the world, filled with high-impact software opportunities.",
    tags: ['Remote', 'Global', 'Software Engineering', 'Full Stack'],
    badge: 'Community Leader',
    avatarBg: 'bg-sky-100',
    avatarText: 'text-sky-700'
  },
  {
    id: 'nodesk',
    name: 'NoDesk',
    url: 'https://remoteok.com',
    category: 'Remote & Flexible',
    description: "Curated remote tech jobs, articles, resources, and advice for remote workers and modern startups.",
    tags: ['Remote', 'Global', 'Software Engineering', 'Digital Nomad'],
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-700'
  },
  {
    id: 'arc_jobs',
    name: 'Arc Jobs',
    url: 'https://arc.dev',
    category: 'Tech & Startups',
    description: "Remote tech careers made easy. Get matched with developer-vetted roles and leading tech startups.",
    tags: ['Remote', 'Global', 'Software Engineering', 'Vetted'],
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-700'
  },
  {
    id: 'startup_jobs_asia',
    name: 'Startup Jobs Asia',
    url: 'https://wellfound.com',
    category: 'Tech & Startups',
    description: "Unlocking startup opportunities and internships across Singapore, Malaysia, India, and wider Asian market.",
    tags: ['Asia', 'Startups', 'Internships', 'Regional'],
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-700'
  },
  {
    id: 'work_at_a_startup',
    name: 'Work at a Startup',
    url: 'https://www.ycombinator.com/jobs',
    category: 'Tech & Startups',
    description: "YC's official platform to find jobs at early-stage startups and co-founding opportunities.",
    tags: ['Startups', 'Remote', 'Global', 'Equity'],
    badge: 'YC Official',
    avatarBg: 'bg-sky-100',
    avatarText: 'text-sky-700'
  },
  {
    id: 'flexiple_jobs',
    name: 'Flexiple Jobs',
    url: 'https://flexjobs.com',
    category: 'Remote & Flexible',
    description: "Highly vetted and curated software development opportunities with premium tech startups and product companies.",
    tags: ['Software Engineering', 'Remote', 'Global', 'Vetted'],
    avatarBg: 'bg-rose-100',
    avatarText: 'text-rose-700'
  },

  // Global & General Search
  {
    id: 'indeed_global',
    name: 'Indeed Global',
    url: 'https://www.indeed.com',
    category: 'Aggregators & Search',
    description: "The world's #1 job search site with global job listings across 60+ countries and company insights.",
    tags: ['Global', 'Worldwide', 'Company Reviews', 'Salaries'],
    badge: 'Global #1',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-800'
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor Jobs',
    url: 'https://www.glassdoor.com/Job',
    category: 'Aggregators & Search',
    description: "Combines job listings with anonymous employee reviews, real interview questions, and salary breakdowns.",
    tags: ['Interview Questions', 'Real Salaries', 'Company Reviews', 'Culture'],
    badge: 'Essential Reviews',
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-800'
  },
  {
    id: 'google_jobs',
    name: 'Google Jobs',
    url: 'https://jobs.google.com',
    category: 'Aggregators & Search',
    description: "Google's official job search engine aggregating hiring postings from across the web into a unified interface.",
    tags: ['Google Search', 'Aggregated', 'Location Filters', 'Alerts'],
    avatarBg: 'bg-red-100',
    avatarText: 'text-red-700'
  },
  {
    id: 'handshake',
    name: 'Handshake',
    url: 'https://joinhandshake.com',
    category: 'Internships & Freshers',
    description: "The #1 career network for college students and recent grads worldwide. Connects students with top recruiters.",
    tags: ['College Career', 'University Grads', 'Fortune 500', 'Global'],
    badge: 'University Standard',
    avatarBg: 'bg-pink-100',
    avatarText: 'text-pink-700'
  },
  {
    id: 'simplyhired',
    name: 'SimplyHired',
    url: 'https://www.simplyhired.com',
    category: 'Aggregators & Search',
    description: "Free job search engine offering local job discovery, salary comparison estimators, and industry reports.",
    tags: ['Free Search', 'Salary Estimator', 'Global', 'Resumes'],
    avatarBg: 'bg-indigo-100',
    avatarText: 'text-indigo-700'
  },
  {
    id: 'ziprecruiter',
    name: 'ZipRecruiter',
    url: 'https://www.ziprecruiter.com',
    category: 'Aggregators & Search',
    description: "AI-driven employment marketplace with One-Click Apply functionality and active recruiter matching.",
    tags: ['1-Click Apply', 'AI Recruiter Match', 'US & Global', 'Status'],
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-800'
  },
  {
    id: 'jobrapido',
    name: 'Jobrapido',
    url: 'https://www.jobrapido.com',
    category: 'Aggregators & Search',
    description: "International job search engine operating in 58 countries, matching millions of candidates with vacancies.",
    tags: ['58 Countries', 'Global Search', 'Instant Match', 'Alerts'],
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-700'
  },
  {
    id: 'jooble',
    name: 'Jooble',
    url: 'https://jooble.org',
    category: 'Aggregators & Search',
    description: "International job search website aggregating vacant jobs from over 140,000 resources globally.",
    tags: ['140k+ Sources', 'Global Network', 'Fast Filters', 'Daily Updates'],
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-800'
  },
  {
    id: 'adzuna',
    name: 'Adzuna',
    url: 'https://www.adzuna.com',
    category: 'Aggregators & Search',
    description: "Smart job search engine that uses AI to analyze job market data, evaluate resume value, and surface opportunities.",
    tags: ['Value My Resume', 'Market Insights', 'AI Data', 'Global'],
    avatarBg: 'bg-cyan-100',
    avatarText: 'text-cyan-800'
  },
  {
    id: 'careerbuilder',
    name: 'CareerBuilder',
    url: 'https://www.careerbuilder.com',
    category: 'Aggregators & Search',
    description: "Pioneer recruitment platform offering career advice, salary trajectory insights, and enterprise drives.",
    tags: ['Career Paths', 'Salary Insights', 'Global Enterprise', 'Resumes'],
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-700'
  },
  {
    id: 'monster',
    name: 'Monster.com',
    url: 'https://www.monster.com',
    category: 'Aggregators & Search',
    description: "Global career site with resume parsing technology, industry guides, and company profile insights.",
    tags: ['Global Brand', 'Resume Parsing', 'Interview Advice', 'Enterprise'],
    avatarBg: 'bg-violet-100',
    avatarText: 'text-violet-800'
  },
  {
    id: 'flexjobs',
    name: 'FlexJobs',
    url: 'https://www.flexjobs.com',
    category: 'Remote & Flexible',
    description: "Hand-screened, scam-free remote, hybrid, freelance, and flexible schedule job opportunities.",
    tags: ['Hand-Screened', '100% Scam-Free', 'Remote Work', 'Flexible'],
    badge: 'Verified Remote',
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-800'
  },
  {
    id: 'workingnomads',
    name: 'Working Nomads',
    url: 'https://www.workingnomads.com',
    category: 'Remote & Flexible',
    description: "Curated list of remote jobs for digital professionals who want to work from anywhere in the world.",
    tags: ['Work Anywhere', 'Digital Nomads', 'Software & Design', 'Global'],
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-700'
  },
  {
    id: 'otta',
    name: 'Otta',
    url: 'https://otta.com',
    category: 'Tech & Startups',
    description: "Candidate-first job platform matching engineers with top innovative tech companies and transparent salaries.",
    tags: ['Candidate First', 'Transparent CTC', 'Top Tech', 'Modern UI'],
    badge: 'Highly Rated',
    avatarBg: 'bg-lime-100',
    avatarText: 'text-lime-800'
  },

  // Public Sector & Non-Profits
  {
    id: 'idealist',
    name: 'Idealist',
    url: 'https://www.idealist.org',
    category: 'Global & Public Sector',
    description: "Global clearinghouse for social impact jobs, non-profit internships, UN initiatives, and volunteer roles.",
    tags: ['Non-Profits', 'Social Impact', 'Global NGO', 'Volunteering'],
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-800'
  },
  {
    id: 'un_careers',
    name: 'UN Careers',
    url: 'https://careers.un.org',
    category: 'Global & Public Sector',
    description: "Official United Nations career portal for young professionals programs (YPP), internships, and diplomatic posts.",
    tags: ['United Nations', 'YPP Program', 'Diplomacy', 'International'],
    badge: 'Global Service',
    avatarBg: 'bg-sky-100',
    avatarText: 'text-sky-800'
  },
  {
    id: 'unicef_careers',
    name: 'UNICEF Careers',
    url: 'https://jobs.unicef.org',
    category: 'Global & Public Sector',
    description: "United Nations Children's Fund official hiring site for humanitarian tech roles, data analysis, and internships.",
    tags: ['UNICEF', 'Humanitarian Tech', 'Global Impact', 'Youth Programs'],
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-700'
  },
  {
    id: 'worldbank_careers',
    name: 'World Bank Careers',
    url: 'https://www.worldbank.org/en/about/careers',
    category: 'Global & Public Sector',
    description: "World Bank Group Young Professionals Program (YPP), summer internships, and technology roles.",
    tags: ['World Bank', 'YPP Fellowship', 'Economic Tech', 'Internships'],
    avatarBg: 'bg-indigo-100',
    avatarText: 'text-indigo-800'
  },
  {
    id: 'oecd_careers',
    name: 'OECD Careers',
    url: 'https://www.oecd.org/careers',
    category: 'Global & Public Sector',
    description: "Organization for Economic Co-operation and Development international internship program and policy analysis.",
    tags: ['OECD Paris', 'Global Policy', 'Internship Program', 'Data Science'],
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-800'
  },
  {
    id: 'who_careers',
    name: 'WHO Careers',
    url: 'https://careers.who.int',
    category: 'Global & Public Sector',
    description: "World Health Organization career opportunities for health informatics, digital health engineering, and research.",
    tags: ['WHO', 'Digital Health', 'Global Research', 'Geneva & Remote'],
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-800'
  },
  {
    id: 'nasa_careers',
    name: 'NASA Careers',
    url: 'https://www.nasa.gov/careers',
    category: 'Global & Public Sector',
    description: "National Aeronautics and Space Administration Pathways Internships and aerospace software engineering.",
    tags: ['NASA Pathways', 'Aerospace Tech', 'Software & AI', 'Fellowships'],
    badge: 'Aero & Space',
    avatarBg: 'bg-red-100',
    avatarText: 'text-red-800'
  },

  // Big Tech / FAANG
  {
    id: 'microsoft_careers',
    name: 'Microsoft Careers',
    url: 'https://careers.microsoft.com',
    category: 'Big Tech & Corporate',
    description: "Official Microsoft university hiring, Explore Internship program for 1st/2nd year students, and software roles.",
    tags: ['Explore Program', 'Software Engineer', 'Azure Cloud', 'University'],
    badge: 'Big Tech',
    isFeatured: true,
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-700'
  },
  {
    id: 'google_careers',
    name: 'Google Careers',
    url: 'https://careers.google.com',
    category: 'Big Tech & Corporate',
    description: "Google Student Careers, STEP Internships (Software Engineering Technical Program), and research fellowships.",
    tags: ['STEP Internship', 'Software Engineer', 'Research Fellowships', 'Google'],
    badge: 'Big Tech',
    isFeatured: true,
    avatarBg: 'bg-red-100',
    avatarText: 'text-red-700'
  },
  {
    id: 'amazon_jobs',
    name: 'Amazon Jobs',
    url: 'https://www.amazon.jobs',
    category: 'Big Tech & Corporate',
    description: "Amazon Student Programs, AWS Software Development Engineer (SDE) internships, and AI research hires.",
    tags: ['AWS SDE Intern', 'Student Programs', 'Systems Architecture', 'Amazon'],
    badge: 'Big Tech',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-800'
  },
  {
    id: 'apple_careers',
    name: 'Apple Careers',
    url: 'https://jobs.apple.com',
    category: 'Big Tech & Corporate',
    description: "Apple hardware & software university internships, iOS development, Machine Learning research, and Silicon.",
    tags: ['iOS Engineering', 'Core ML', 'Silicon', 'Apple Internships'],
    badge: 'Big Tech',
    avatarBg: 'bg-stone-100',
    avatarText: 'text-stone-800'
  },

  // Developer Niche Boards
  {
    id: 'github_jobs',
    name: 'GitHub Jobs',
    url: 'https://github.com/topics/jobs',
    category: 'Tech & Startups',
    description: "Community-maintained open-source repositories listing tech internships, hiring companies, and YC lists.",
    tags: ['Open Source', 'Community Lists', 'Developer Direct', 'GitHub'],
    badge: 'Open Source Repo',
    avatarBg: 'bg-stone-200',
    avatarText: 'text-stone-900'
  },
  {
    id: 'turing_jobs',
    name: 'Turing Jobs',
    url: 'https://www.turing.com/jobs',
    category: 'Tech & Startups',
    description: "AI-backed developer network connecting software engineers with top US companies for long-term remote roles.",
    tags: ['US Tech', 'Long-term Remote', 'USD Pay', 'Vetted Devs'],
    badge: 'US Remote',
    avatarBg: 'bg-indigo-100',
    avatarText: 'text-indigo-800'
  },
  {
    id: 'hn_jobs',
    name: 'Hacker News Jobs',
    url: 'https://news.ycombinator.com/jobs',
    category: 'Tech & Startups',
    description: "Y Combinator's Hacker News job board and monthly 'Who is Hiring?' threads where founders post raw tech roles.",
    tags: ['Who is Hiring?', 'Hacker News', 'Raw Tech Roles', 'No Recruiters'],
    badge: 'Cult Favorite',
    avatarBg: 'bg-orange-100',
    avatarText: 'text-orange-800'
  },
  {
    id: 'nofluffjobs',
    name: 'NoFluffJobs',
    url: 'https://nofluffjobs.com',
    category: 'Tech & Startups',
    description: "IT job portal with mandatory salary ranges on every single listing, clear requirements, and direct dev hiring.",
    tags: ['100% Salary Listed', 'No Fluff', 'IT Tech Only', 'Transparent'],
    badge: '100% Transparent',
    avatarBg: 'bg-rose-100',
    avatarText: 'text-rose-800'
  },
  {
    id: 'python_jobs',
    name: 'Python Jobs',
    url: 'https://www.python.org/jobs',
    category: 'Tech & Startups',
    description: "Official Python Software Foundation job board listing backend engineering, Django/FastAPI, and AI/ML roles.",
    tags: ['Python Foundation', 'Django', 'FastAPI', 'AI/ML'],
    badge: 'Official Python',
    avatarBg: 'bg-yellow-100',
    avatarText: 'text-yellow-800'
  },
  {
    id: 'ai_jobs',
    name: 'AIJobs.net',
    url: 'https://aijobs.net',
    category: 'Tech & Startups',
    description: "Dedicated job board for AI, Machine Learning, Deep Learning, LLM Engineers, Computer Vision, and Data Science.",
    tags: ['AI & ML', 'LLM Engineers', 'Data Science', 'Generative AI'],
    badge: 'AI Dedicated',
    avatarBg: 'bg-violet-100',
    avatarText: 'text-violet-800'
  }
];

export const StartupJobsHubView: React.FC<StartupJobsHubViewProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedPlatformIds, setSavedPlatformIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('campusos_saved_job_platforms');
      return stored ? JSON.parse(stored) : ['wellfound', 'yc_jobs', 'remotive', 'remoteok', 'internshala', 'linkedin_jobs'];
    } catch {
      return ['wellfound', 'yc_jobs', 'remotive', 'remoteok', 'internshala', 'linkedin_jobs'];
    }
  });
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<JobPlatform | null>(null);

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

  return (
    <div className="min-h-screen bg-[#F4F5F8] -m-6 sm:-m-8 p-4 sm:p-8 space-y-6 text-slate-800 font-sans">
      
      {/* TOP HEADER / SEARCH & COUNTER BAR */}
      <motion.div 
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shadow-2xs">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                SHOWING {filteredPlatforms.length} HUBS
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Startup Jobs & Internship Hub
            </h1>
          </div>
        </div>

        {/* SEARCH BAR & CONTROLS */}
        <div className="flex items-center gap-3 flex-1 md:max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, jobs, or prep material..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-100/80 border border-slate-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-400 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* BOOKMARK FILTER */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shrink-0 ${
              showSavedOnly 
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
            <span className="hidden sm:inline">Saved</span> ({savedPlatformIds.length})
          </button>

          {/* VIEW TOGGLE */}
          <div className="flex items-center bg-slate-200/60 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'list' 
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* CATEGORY FILTER TABS */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin"
      >
        <span className="text-[10px] font-black uppercase text-slate-400 shrink-0 mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Categories:
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'text-slate-900 bg-white shadow-xs border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-white rounded-xl border border-slate-200/90 shadow-2xs -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* CARDS DISPLAY CONTAINER */}
      <AnimatePresence mode="wait">
        {filteredPlatforms.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-3"
          >
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No hubs found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No portals match "{searchQuery}" in category "{selectedCategory}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setShowSavedOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors inline-block shadow-sm"
            >
              Reset All Filters
            </button>
          </motion.div>
        ) : viewMode === 'grid' ? (
          /* PLACIVO PLAIN CREME / LIGHT CARD GRID (Exact Screenshot Match) */
          <motion.div 
            key="grid-view"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.04
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredPlatforms.map((p) => {
              const isSaved = savedPlatformIds.includes(p.id);
              const firstLetter = p.name.charAt(0);

              return (
                <motion.div
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl bg-[#F9FAFB] hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                  onClick={() => setSelectedPlatform(p)}
                >
                  <div className="space-y-3">
                    {/* TOP ROW: Letter Badge + Bookmark Icon */}
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-xl ${p.avatarBg} ${p.avatarText} font-black text-sm flex items-center justify-center shadow-2xs border border-black/5`}>
                        {firstLetter}
                      </div>

                      <button
                        onClick={(e) => toggleSavePlatform(p.id, e)}
                        className={`p-1.5 rounded-lg transition-all ${
                          isSaved 
                            ? 'text-amber-600 bg-amber-50' 
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                        title={isSaved ? 'Saved to bookmarks' : 'Save platform'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* TITLE & DESCRIPTION */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2 mt-1.5 min-h-[36px]">
                        {p.description}
                      </p>
                    </div>

                    {/* PILL TAGS */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100/90 text-slate-600 border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTON */}
                  <div className="mt-5 pt-2">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-900 hover:text-white text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 border border-slate-200/90 hover:border-slate-900 shadow-2xs group/btn"
                    >
                      <span>Visit Jobs</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white transition-colors" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* COMPACT LIST VIEW */
          <motion.div 
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-5">Platform Name</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Tags</th>
                    <th className="py-3.5 px-4">Badge</th>
                    <th className="py-3.5 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredPlatforms.map((p) => {
                    const isSaved = savedPlatformIds.includes(p.id);
                    return (
                      <tr 
                        key={p.id} 
                        onClick={() => setSelectedPlatform(p)}
                        className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      >
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${p.avatarBg} ${p.avatarText} flex items-center justify-center font-black text-xs shrink-0 shadow-2xs`}>
                              {p.name.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors block text-xs">
                                {p.name}
                              </span>
                              <span className="text-[10px] text-slate-400 line-clamp-1 max-w-xs">
                                {p.description}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-slate-600 text-[11px] whitespace-nowrap">
                          {p.category}
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {p.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {p.badge ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                              {p.badge}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">Direct Hub</span>
                          )}
                        </td>

                        <td className="py-3.5 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => toggleSavePlatform(p.id, e)}
                              className={`p-1.5 rounded-lg transition-all ${
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
                              onClick={(e) => e.stopPropagation()}
                              className="py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs inline-flex items-center gap-1 transition-all shadow-2xs"
                            >
                              <span>Visit Jobs</span>
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK VIEW DETAILS MODAL */}
      <AnimatePresence>
        {selectedPlatform && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedPlatform(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* HEADER INFO */}
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl ${selectedPlatform.avatarBg} ${selectedPlatform.avatarText} font-black text-2xl flex items-center justify-center shadow-xs border border-black/5 shrink-0`}>
                  {selectedPlatform.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {selectedPlatform.category}
                    </span>
                    {selectedPlatform.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {selectedPlatform.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mt-1">
                    {selectedPlatform.name}
                  </h2>
                  <p className="text-xs text-slate-400 truncate max-w-xs font-mono mt-0.5">
                    {selectedPlatform.url}
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">About Platform</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  {selectedPlatform.description}
                </p>
              </div>

              {/* TAGS */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Tags & Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlatform.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => handleCopyLink(selectedPlatform, e)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors flex-1"
                >
                  {copiedId === selectedPlatform.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied URL!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <a
                  href={selectedPlatform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md flex-1"
                >
                  <span>Open Official Hub</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
