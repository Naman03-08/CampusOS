import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  Lock, 
  Send, 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  Video, 
  Users, 
  Award, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  ExternalLink,
  ChevronRight,
  Layers,
  MessageSquare,
  Brain,
  BarChart3,
  FileCode,
  Folder,
  Database,
  Filter,
  Shield,
  Smartphone,
  Sparkle,
  Server
} from 'lucide-react';
import { UserProfile } from '../../types';

import { FirestoreService } from '../../lib/firestoreService';

interface CodingCoursesViewProps {
  user: UserProfile;
  onNavigateTab?: (tab: string) => void;
}

export interface CourseItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Web Development' | 'Data Structures & Algorithms' | 'AI & Machine Learning' | 'Data Analytics' | 'Cyber Security' | 'App Development' | 'DevOps' | 'System Design' | 'Soft Skills & Communication';
  price: number; // 399
  linkType: 'telegram' | 'drive';
  linkUrl: string;
  bgGradient: string;
  bgImageUrl?: string;
  accentColor: string;
  badgeBg: string;
  icon: React.ElementType;
  level: string;
  duration: string;
  description: string;
  features: string[];
  modules: {
    title: string;
    description: string;
    topics: string[];
  }[];
}

export const COURSES: CourseItem[] = [
  {
    id: 'mern-webdev',
    title: 'Web Development: Interactive MERN Core',
    tagline: 'Build & deploy full-stack production web applications with MongoDB, Express, React, and Node.js.',
    category: 'Web Development',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+_lS1gy4M3yhmY2Q1',
    bgGradient: 'from-purple-600 via-indigo-600 to-blue-600',
    accentColor: 'purple',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Code,
    level: 'Beginner to Advanced',
    duration: '8 Weeks Batch',
    description: 'Master complete full-stack web development from scratch! Learn how to design modern responsive user interfaces with React & Tailwind CSS, architect robust backend microservices with Node & Express, model complex relational & document databases in MongoDB, implement JWT authentication, and deploy applications to production cloud servers.',
    features: [
      'Interactive Full-Stack MERN Architecture',
      'Real-world SaaS & E-commerce Projects',
      'REST API Design & JWT Auth Workflows',
      'Git, GitHub, CI/CD & Deployment Guide',
      'Exclusive Telegram Group with Mentor Support'
    ],
    modules: [
      {
        title: 'Module 1: Modern JavaScript (ES6+) & DOM Fundamentals',
        description: 'Master async/await, promises, closures, event loops, and modern ES6 syntax.',
        topics: ['Arrow functions & Destructuring', 'Promises & Async/Await', 'Fetch API & JSON handling', 'DOM Manipulation & Events']
      },
      {
        title: 'Module 2: Frontend Mastery with React 18 & Tailwind CSS',
        description: 'Component architecture, state management, custom hooks, context API, and responsive UI design.',
        topics: ['React Hooks (useState, useEffect, useMemo)', 'Custom Hooks & State Persistence', 'Tailwind CSS Utility Design', 'React Router v6 Navigation']
      },
      {
        title: 'Module 3: Backend Microservices with Node.js & Express.js',
        description: 'Build secure, scalable RESTful APIs with input validation, error handling middleware, and logging.',
        topics: ['Express Routing & Controllers', 'Custom Middleware & Error Handling', 'RESTful API Best Practices', 'File Uploads with Multer']
      },
      {
        title: 'Module 4: Database Design with MongoDB & Mongoose ORM',
        description: 'Schema modeling, indexing, aggregation frameworks, relationships, and queries in MongoDB.',
        topics: ['Mongoose Schemas & Models', 'CRUD Operations & Filters', 'Aggregation Pipelines', 'Data Validation & Indexing']
      }
    ]
  },
  {
    id: 'dsa-cpp',
    title: 'DSA in C++: Advanced Algorithms & Data Structures',
    tagline: 'Master Data Structures & Competitive Programming in C++ for top product company interviews.',
    category: 'Data Structures & Algorithms',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+uY1xg7V1-oBjYmI1',
    bgGradient: 'from-blue-600 via-cyan-600 to-teal-600',
    accentColor: 'blue',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Terminal,
    level: 'Intermediate to Advanced',
    duration: '10 Weeks Batch',
    description: 'Conquer tech company interviews with step-by-step C++ DSA problem solving! Learn memory management, pointers, and C++ Standard Template Library (STL), then dive deep into Arrays, Strings, Linked Lists, Trees, Graphs, Backtracking, and Dynamic Programming with standard pattern-based problem solving.',
    features: [
      'Comprehensive C++ STL & Memory Mastery',
      '300+ Solved Interview Problems (LeetCode / CodeStudio)',
      'Pattern-based approach (Sliding Window, Two Pointers, DP)',
      'Mock Technical Interview Guidance',
      'Exclusive Telegram Community for Doubt Solution'
    ],
    modules: [
      {
        title: 'Module 1: C++ STL Mastery & Time-Space Complexity',
        description: 'Vectors, maps, sets, priority queues, iterators, and asymptotic notation analysis.',
        topics: ['Vectors, Deque & Lists', 'Ordered/Unordered Maps & Sets', 'Iterators & STL Algorithms', 'Big-O Analysis']
      },
      {
        title: 'Module 2: Arrays, Strings, Two-Pointer & Sliding Window',
        description: 'Master fundamental linear data structure techniques for interview problem solving.',
        topics: ['Subarray & Substring Patterns', 'Two-Pointer Technique', 'Sliding Window (Fixed & Variable)', 'Prefix Sum']
      },
      {
        title: 'Module 3: Trees, Graphs, Backtracking & Dynamic Programming',
        description: 'Hierarchical traversals, shortest paths, memoization, and tabular DP.',
        topics: ['BFS & DFS Traversal Patterns', 'Dijkstra & DSU', 'Backtracking N-Queens', '1D & 2D Dynamic Programming']
      }
    ]
  },
  {
    id: 'dsa-java',
    title: 'DSA in Java: Ultimate Algorithms & Collections Framework',
    tagline: 'Complete Java Collections Framework & algorithmic problem-solving for SWE placements.',
    category: 'Data Structures & Algorithms',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+epdFx090CRU3NmRl',
    bgGradient: 'from-amber-600 via-orange-600 to-rose-600',
    accentColor: 'amber',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Cpu,
    level: 'Beginner to Advanced',
    duration: '10 Weeks Batch',
    description: 'Master algorithms with Java! Learn the internal mechanics of Java Collections Framework (JCF), Object-Oriented principles, memory allocation (Heap vs Stack), and build crystal-clear problem-solving intuition across all key data structure topics asked in campus placements and off-campus drives.',
    features: [
      'Java Collections Framework (ArrayList, HashMap, TreeSet, etc.)',
      'Clean Object-Oriented Java Coding Standards',
      '250+ Curated Placement Problems & Solutions',
      'System Design & OOP Interview Fundamentals',
      'Exclusive Telegram Group for Course Updates'
    ],
    modules: [
      {
        title: 'Module 1: Java OOP Fundamentals & Collections Framework',
        description: 'Classes, Inheritance, Generics, ArrayList, HashMap, and TreeSet internals.',
        topics: ['Inheritance & Abstract Classes', 'ArrayList & HashMap internals', 'Heap vs Stack Memory', 'Generics & Comparators']
      },
      {
        title: 'Module 2: Sorting, Searching, Trees & Graphs',
        description: 'Binary search variants, tree construction, BFS/DFS graph traversals in Java.',
        topics: ['Binary Search on Answer', 'Binary Tree Construction', 'Graph Representation in Java', 'Dynamic Programming']
      }
    ]
  },
  {
    id: 'dsa-py-js',
    title: 'DSA in Python and JavaScript: Ultimate Algorithms & Pythonic Solutions',
    tagline: 'Master Data Structures & Problem Solving in Python 3 & Modern JavaScript (ES6+).',
    category: 'Data Structures & Algorithms',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+OemaHeinbgM4NWFl',
    bgGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    accentColor: 'emerald',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: FileCode,
    level: 'Beginner to Advanced',
    duration: '8 Weeks Batch',
    description: 'Learn Data Structures & Algorithms using Python and JavaScript! Designed for developers, competitive programmers, and frontend/backend engineers who want clean, idiomatic Pythonic and JS solutions for technical interviews. Covers List comprehensions, Dictionaries, Sets, HashMaps, Recursion, Trees, Graphs, and DP patterns with LeetCode solutions.',
    features: [
      'Dual-Language Code Walkthroughs (Python 3 & JavaScript)',
      'Pythonic Idioms & JS Prototype/Closure DSA Tricks',
      '200+ Top Selected LeetCode & HackerRank Problems',
      'Time & Space Complexity Optimization Techniques',
      'Exclusive Telegram Channel for Doubt Solving & Code Reviews'
    ],
    modules: [
      {
        title: 'Module 1: Python & JavaScript Language Mechanisms for DSA',
        description: 'Master built-in data structures, list comprehensions, slicing, Map, Set, and Object key lookups.',
        topics: ['Python Lists, Dicts, Counter & collections.deque', 'JS Map, Set, Array methods & Object lookups', 'Big-O Complexity & Memory Overhead', 'Recursion & Call Stack in Python/JS']
      },
      {
        title: 'Module 2: Arrays, Strings, HashMaps & Two-Pointers',
        description: 'Efficient string manipulation, frequency maps, two-pointers, and sliding window patterns.',
        topics: ['Sliding Window Technique', 'Two-Pointer Traversal', 'HashMap & HashSet Lookup Patterns', 'Subarray Sum Problems']
      },
      {
        title: 'Module 3: Linked Lists, Trees, Graphs & Dynamic Programming',
        description: 'Pointer/Reference nodes in JS/Python, Tree traversals, BFS/DFS, and Memoization.',
        topics: ['Node-based Data Structures', 'Binary Tree & BST Traversals', 'Graph BFS/DFS with Recursion/Queue', 'Top-Down Memoization & Tabulation']
      }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Complete Cyber Security & Hacking Course',
    tagline: 'Ethical Hacking, Network Security, Penetration Testing, Bug Bounty & Cyber Defense.',
    category: 'Cyber Security',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+AXikguwVuL1jMzBl',
    bgGradient: 'from-emerald-700 via-teal-800 to-slate-900',
    accentColor: 'emerald',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: Shield,
    level: 'Beginner to Advanced',
    duration: '10 Weeks Batch',
    description: 'Master Ethical Hacking, Cyber Security, and Penetration Testing from absolute scratch! Learn network reconnaissance, Wireshark packet analysis, Linux command line security, Web Application Penetration Testing (OWASP Top 10), Metasploit, Cryptography, and Bug Bounty hunting workflows. Access live lectures, lab setups, and the official Telegram channel for course updates.',
    features: [
      'Ethical Hacking & Network Security Fundamentals',
      'OWASP Top 10 Web Vulnerability Exploitation',
      'Wireshark, Nmap, Burp Suite & Metasploit Tools',
      'Bug Bounty Hunting & Security Auditing',
      'Exclusive Telegram Channel for Course & Live Doubt Solving'
    ],
    modules: [
      {
        title: 'Module 1: Fundamentals of Cyber Security & Networking',
        description: 'OSI Model, TCP/IP Protocols, Port Scanning with Nmap, and Wireshark Packet Analysis.',
        topics: ['TCP/IP Protocol Suite & Handshakes', 'Linux CLI for Security Tools', 'Nmap Port Scanning & Service Enumeration', 'Wireshark Packet Sniffing']
      },
      {
        title: 'Module 2: Web Application Penetration Testing (OWASP Top 10)',
        description: 'Burp Suite proxy, SQL Injection, Cross-Site Scripting (XSS), CSRF, and Authentication Bypasses.',
        topics: ['Burp Suite Setup & Interception', 'SQL Injection (SQLi) Exploitation', 'Cross-Site Scripting (XSS) Attacks', 'Session Hijacking & CSRF']
      },
      {
        title: 'Module 3: System Hacking, Metasploit & Bug Bounty Workflows',
        description: 'Vulnerability assessment, privilege escalation, Metasploit framework, and reporting.',
        topics: ['Metasploit Exploitation Framework', 'Privilege Escalation Techniques', 'Bug Bounty Methodology & Recon', 'Ethical Hacking Report Writing']
      }
    ]
  },
  {
    id: 'flutter-appdev',
    title: 'Complete App Development (Flutter)',
    tagline: 'Cross-platform Android & iOS app development with Flutter 3, Dart, Provider/Bloc & Firebase.',
    category: 'App Development',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+n9CS0pDEKa9jYzg1',
    bgGradient: 'from-sky-600 via-blue-600 to-indigo-700',
    accentColor: 'sky',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
    icon: Smartphone,
    level: 'Beginner to Advanced',
    duration: '8 Weeks Batch',
    description: 'Build beautiful native cross-platform mobile apps for Android and iOS using Flutter & Dart! Learn object-oriented Dart programming, Flutter widget trees, state management (Provider / Riverpod / BLoC), REST API integration, Firebase Firestore authentication, local storage, and publishing to Google Play Store & Apple App Store. Join the official Telegram channel for source codes and batch live support.',
    features: [
      'Cross-Platform Android & iOS App Development',
      'Dart Programming Language & OOP Concepts',
      'State Management with Provider, Riverpod & BLoC',
      'Firebase Auth, Firestore Database & Cloud Storage',
      'Exclusive Telegram Group for Live Support & App Code Repos'
    ],
    modules: [
      {
        title: 'Module 1: Dart Fundamentals & Flutter UI Widget Tree',
        description: 'Dart syntax, Async programming, Layout widgets, Material Design & Cupertino components.',
        topics: ['Variables, Functions & OOP in Dart', 'Stateless vs Stateful Widgets', 'Container, Column, Row & Flex Layouts', 'Custom Buttons & Form Inputs']
      },
      {
        title: 'Module 2: State Management & REST API Integration',
        description: 'Managing complex application state, HTTP requests, JSON parsing, and local persistent cache.',
        topics: ['Provider State Management', 'HTTP Package & JSON Serialization', 'Shared Preferences & Hive DB', 'BLoC Pattern Overview']
      },
      {
        title: 'Module 3: Firebase Integration & App Store Deployment',
        description: 'Firebase Authentication, Cloud Firestore, Push Notifications, and Play Store release build generation.',
        topics: ['Firebase Email/Google Authentication', 'Firestore Realtime Database CRUD', 'Push Notifications with FCM', 'Building APKs & App Store Guidelines']
      }
    ]
  },
  {
    id: 'python-ai-harry',
    title: 'Complete Python For AI (BY CODE WITH HARRY)',
    tagline: 'Master Python from scratch to advanced AI, machine learning, and automation with Code With Harry.',
    category: 'AI & Machine Learning',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+B2KYQh0uUDIyYmJl',
    bgGradient: 'from-amber-600 via-yellow-600 to-amber-700',
    accentColor: 'amber',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Code,
    level: 'Beginner to Advanced',
    duration: '8 Weeks Batch',
    description: 'Learn Python tailored specifically for AI & Data Science by Code With Harry! Master core Python syntax, object-oriented programming, file handling, data structures, NumPy, Pandas, Matplotlib, and AI library foundations. Join the official Telegram channel after payment to start learning with live lectures, code notes, and mentor support.',
    features: [
      'Complete Python Foundations to Advanced OOP',
      'Python for AI, Machine Learning & Automation',
      'Hands-on Projects & Exercises by Code With Harry',
      'NumPy, Pandas & Matplotlib Fundamentals',
      'Exclusive Telegram Channel for Course & Code Notes'
    ],
    modules: [
      {
        title: 'Module 1: Python Basics & Core Language Syntax',
        description: 'Variables, data types, conditional statements, loops, functions, and list/dict manipulations.',
        topics: ['Python Syntax & Variables', 'Control Flow & Loops', 'Functions & Lambda Expressions', 'Lists, Tuples, Dictionaries & Sets']
      },
      {
        title: 'Module 2: Object-Oriented Programming (OOP) & Exception Handling',
        description: 'Classes, Inheritance, Polymorphism, Encapsulation, Exception Handling, and File I/O.',
        topics: ['Classes & Constructors', 'Inheritance & Method Overriding', 'Try-Except Blocks & Custom Exceptions', 'File Read/Write & Context Managers']
      },
      {
        title: 'Module 3: Python Data Science & AI Libraries',
        description: 'NumPy vector arrays, Pandas DataFrames, Matplotlib plotting, and intro to AI workflows.',
        topics: ['NumPy Ndarrays & Operations', 'Pandas Data Wrangling', 'Matplotlib Data Visualization', 'Building First Machine Learning Script']
      }
    ]
  },
  {
    id: 'genai-dsa-combo',
    title: 'Complete Generative AI And DSA Course',
    tagline: 'Master Data Structures & Algorithms alongside Generative AI, LLMs, and RAG architectures.',
    category: 'AI & Machine Learning',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+YbYNOr5rxX02MmQ9',
    bgGradient: 'from-indigo-600 via-purple-600 to-pink-600',
    accentColor: 'indigo',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: Brain,
    level: 'Beginner to Advanced',
    duration: '10 Weeks Batch',
    description: 'The ultimate combo course combining Data Structures & Algorithms (DSA) problem solving with modern Generative AI engineering! Learn array patterns, trees, graphs, and dynamic programming alongside LLM prompt engineering, RAG pipelines, LangChain, and OpenAI/Gemini API integrations. Unlock the official Telegram channel upon payment to start learning.',
    features: [
      'Core DSA Algorithms (Arrays, Trees, Graphs, DP)',
      'Generative AI & LLM Engineering Concepts',
      'Retrieval-Augmented Generation (RAG) & Vector DBs',
      'LangChain & AI Agent Building',
      'Exclusive Telegram Group for Live Support & Materials'
    ],
    modules: [
      {
        title: 'Module 1: Data Structures & Algorithms Foundations',
        description: 'Problem-solving patterns, Arrays, Two-Pointers, HashMaps, Trees, Graphs, and DP.',
        topics: ['Sliding Window & Two-Pointers', 'HashMaps & HashSets', 'Binary Trees & Graph BFS/DFS', 'Dynamic Programming Fundamentals']
      },
      {
        title: 'Module 2: Generative AI, LLMs & Prompt Engineering',
        description: 'Large Language Models architecture, prompt design patterns, context windows, and API calling.',
        topics: ['LLM Foundations & Tokens', 'Zero-shot / Few-shot Prompting', 'OpenAI & Gemini API Integration', 'Structured Output Parsing']
      },
      {
        title: 'Module 3: RAG Systems, Vector Databases & LangChain Agents',
        description: 'Embeddings, ChromaDB, Pinecone, Retrieval-Augmented Generation pipelines, and AI Agents.',
        topics: ['Text Embeddings & Vector Search', 'Building RAG Pipelines', 'LangChain Memory & Chains', 'Autonomous AI Agents']
      }
    ]
  },
  {
    id: 'hitesh-genai-mastery',
    title: 'Hitesh Generative AI Mastery',
    tagline: 'Deep-dive Generative AI cohort by Hitesh Choudhary covering LLMs, Vector DBs, LangChain & Agentic AI.',
    category: 'AI & Machine Learning',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+RZYEzvV3fwA2ZDc1',
    bgGradient: 'from-rose-600 via-purple-700 to-indigo-800',
    accentColor: 'rose',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    icon: Sparkles,
    level: 'Beginner to Advanced',
    duration: '8 Weeks Batch',
    description: 'Master Generative AI with Hitesh Choudhary! Learn API integrations, prompt engineering techniques, fine-tuning open-source models, vector databases (Chroma/Pinecone), LangChain frameworks, and building real-world AI applications from concept to production deployment. Join the official Telegram channel after payment to start learning.',
    features: [
      'Comprehensive GenAI Cohort by Hitesh Choudhary',
      'LangChain, Vector DBs & Prompt Engineering',
      'Building Autonomous AI Agents & Custom Tools',
      'Fine-Tuning Open Source LLMs (Llama 3, Mistral)',
      'Exclusive Telegram Channel for Source Code & Lectures'
    ],
    modules: [
      {
        title: 'Module 1: LLM Architecture & Advanced Prompt Engineering',
        description: 'Understanding Transformers, self-attention, tokenization, temperature, system prompts, and chain-of-thought.',
        topics: ['Transformers & Tokenization Mechanics', 'System Prompts & Few-Shot Examples', 'Chain-of-Thought & ReAct Prompting', 'API Rate Limits & Error Handling']
      },
      {
        title: 'Module 2: Vector Databases, Embeddings & RAG Architectures',
        description: 'Creating document embeddings, semantic search, vector indexing in ChromaDB/Pinecone, and RAG retrieval.',
        topics: ['Embedding Models & Cosine Similarity', 'Vector Store Indexing with ChromaDB', 'Document Chunking Strategies', 'Evaluating RAG Performance']
      },
      {
        title: 'Module 3: LangChain Agents, Tool Calling & LLM Fine-Tuning',
        description: 'Building multi-step AI agents with custom tools, Function Calling, and fine-tuning open-source models.',
        topics: ['LangChain Agents & Tools', 'Function Calling & Tool Execution', 'Fine-Tuning Llama 3 / Mistral', 'Production Deployment of GenAI Apps']
      }
    ]
  },
  {
    id: 'datascience-genai',
    title: 'Complete DATA Science + Gen AI',
    tagline: 'Master Data Science, Python, Deep Learning, Generative AI, RAG Systems & LangChain.',
    category: 'AI & Machine Learning',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+Jkbb9vNdlLRmM2Vl',
    bgGradient: 'from-purple-700 via-fuchsia-700 to-pink-600',
    accentColor: 'purple',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Sparkles,
    level: 'Beginner to Advanced',
    duration: '12 Weeks Batch',
    description: 'Combine cutting-edge Data Science with Generative AI! Master Python data analytics (Pandas, NumPy, Matplotlib), Machine Learning models, Deep Neural Networks, Large Language Models (LLMs), Prompt Engineering, Retrieval-Augmented Generation (RAG) with Vector Databases (Pinecone/Chroma), and build custom AI autonomous agents with LangChain & OpenAI/Gemini APIs. Access the official Telegram channel for course materials and live batch sessions.',
    features: [
      'End-to-End Data Science & Exploratory Data Analysis (EDA)',
      'Machine Learning Algorithms & Deep Learning PyTorch',
      'Generative AI, LLMs & Prompt Engineering',
      'RAG Architecture & Vector DBs (ChromaDB, Pinecone)',
      'Exclusive Telegram Channel for Live Batch & GenAI Code'
    ],
    modules: [
      {
        title: 'Module 1: Python Data Science & Statistical Analysis',
        description: 'Data wrangling with Pandas, matrix computations with NumPy, data visualization, and statistical modeling.',
        topics: ['Pandas Data Wrangling & Cleaning', 'NumPy High-Performance Computing', 'Seaborn & Plotly Data Visualization', 'Hypothesis Testing & Statistics']
      },
      {
        title: 'Module 2: Machine Learning & Deep Learning Neural Networks',
        description: 'Supervised/Unsupervised Machine Learning algorithms, Scikit-Learn pipelines, and PyTorch deep learning.',
        topics: ['Regression & Classification Algorithms', 'Model Evaluation & Cross-Validation', 'Deep Neural Networks in PyTorch', 'Convolutional & Recurrent Networks']
      },
      {
        title: 'Module 3: Generative AI, RAG Systems & LangChain Agents',
        description: 'LLM fine-tuning, Prompt engineering, Embedding models, RAG vector pipelines, and LangChain AI Agents.',
        topics: ['Large Language Models Architecture', 'Prompt Engineering Patterns', 'RAG Pipelines with Vector DBs', 'Building Autonomous AI Agents with LangChain']
      }
    ]
  },
  {
    id: 'aiml-masterclass',
    title: 'Complete AI/ML Masterclass: Data Science to LLMs',
    tagline: 'End-to-End Artificial Intelligence, Machine Learning, Deep Learning, PyTorch & LLMs.',
    category: 'AI & Machine Learning',
    price: 399,
    linkType: 'drive',
    linkUrl: 'https://drive.google.com/drive/folders/1f_YWOA5s2Jr5poVm1HZmcqtYMEJhh5uA?usp=drive_link',
    bgGradient: 'from-violet-600 via-purple-700 to-pink-600',
    accentColor: 'violet',
    badgeBg: 'bg-violet-100 text-violet-800 border-violet-200',
    icon: Brain,
    level: 'Beginner to Advanced',
    duration: '12 Weeks Self-Paced & Live Drive',
    description: 'The definitive complete roadmap to becoming an AI/ML Engineer! Dive deep into Python Data Science (NumPy, Pandas, Matplotlib), Supervised & Unsupervised Machine Learning algorithms (Regression, Decision Trees, XGBoost), Deep Learning with Neural Networks and PyTorch, Natural Language Processing (NLP), Transformer architectures, and Fine-Tuning Large Language Models (LLMs). All materials, Jupyter notebooks, datasets, and video lectures are organized in the Google Drive repository.',
    features: [
      'Full Access to Google Drive Repository with Jupyter Notebooks & Datasets',
      'Math & Linear Algebra for Machine Learning',
      'Supervised & Unsupervised Learning Algorithms',
      'Neural Networks & PyTorch Deep Learning Framework',
      'Transformers, Hugging Face & Fine-Tuning LLMs'
    ],
    modules: [
      {
        title: 'Module 1: Python Data Science Stack (NumPy, Pandas, Scikit-Learn)',
        description: 'Data manipulation, exploratory data analysis, matrix operations, and feature scaling.',
        topics: ['NumPy Ndarrays & Vectorization', 'Pandas DataFrames & Data Cleaning', 'Matplotlib & Seaborn Visualization', 'Scikit-Learn Pipelines & Preprocessing']
      },
      {
        title: 'Module 2: Classical Machine Learning Algorithms',
        description: 'Linear Regression, Logistic Regression, Decision Trees, Random Forests, XGBoost, and Clustering.',
        topics: ['Supervised Learning Models', 'Cross-Validation & Hyperparameter Tuning', 'Ensemble Methods (XGBoost/LightGBM)', 'K-Means & Hierarchical Clustering']
      },
      {
        title: 'Module 3: Deep Learning, PyTorch & Large Language Models (LLMs)',
        description: 'Perceptrons, Backpropagation, Convolutional Networks, Transformers, and LLM Fine-Tuning.',
        topics: ['Artificial Neural Networks & Loss Functions', 'PyTorch Tensors & Model Training', 'Transformer Architecture (Self-Attention)', 'Hugging Face & Fine-Tuning LLMs']
      }
    ]
  },
  {
    id: 'data-analysis',
    title: 'Complete DATA ANALYSIS',
    tagline: 'Master Advanced Excel, SQL, Power BI, Tableau, Python EDA & Business Analytics.',
    category: 'Data Analytics',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+gudc39PlKcZiYjRl',
    bgGradient: 'from-rose-600 via-pink-600 to-indigo-700',
    accentColor: 'rose',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    icon: BarChart3,
    level: 'Beginner to Professional',
    duration: '8 Weeks Batch',
    description: 'Transform raw data into actionable business insights! Master Advanced Microsoft Excel (XLOOKUP, Pivot Tables, Power Query), SQL Database Queries (JOINs, Window Functions, CTEs), Data Visualization with Power BI and Tableau, and Exploratory Data Analysis (EDA) with Python Pandas & Seaborn. Join the dedicated Telegram cohort for live case studies and portfolio projects.',
    features: [
      'Advanced Excel & Power Query Mastery',
      'SQL for Data Analysts (PostgreSQL / MySQL)',
      'Interactive Power BI & Tableau Dashboards',
      'Python Data Cleaning & Exploratory Data Analysis (EDA)',
      'Exclusive Telegram Group for Live Support & Portfolio Reviews'
    ],
    modules: [
      {
        title: 'Module 1: Advanced Excel & Power Query for Analytics',
        description: 'XLOOKUP, INDEX-MATCH, Pivot Tables, Conditional Formatting, and Power Query ETL.',
        topics: ['Advanced Formulas (XLOOKUP, LET, FILTER)', 'Dynamic Pivot Tables & Slicers', 'Power Query Data Transformation', 'Executive Dashboard Design']
      },
      {
        title: 'Module 2: SQL Data Querying & Database Management',
        description: 'SELECT queries, Filtering, JOINs, Grouping, Aggregations, Subqueries, CTEs, and Window Functions.',
        topics: ['Multi-Table INNER/LEFT/FULL JOINs', 'GROUP BY, HAVING & Aggregations', 'Common Table Expressions (CTEs)', 'Window Functions (ROW_NUMBER, RANK, LEAD/LAG)']
      },
      {
        title: 'Module 3: Power BI, Tableau & Python Exploratory Analysis',
        description: 'Data modeling, DAX measures, interactive dashboard builds, and Python EDA.',
        topics: ['Power BI DAX Formulas & Data Modeling', 'Tableau Calculations & Visual Storytelling', 'Python Pandas Data wrangling', 'Business Case Studies & Portfolio Building']
      }
    ]
  },
  {
    id: 'devops-zero-to-hero',
    title: 'Complete DevOps - Zero To Hero',
    tagline: 'Master Linux, Docker, Kubernetes, CI/CD Pipelines, Terraform, Ansible & AWS Cloud.',
    category: 'DevOps',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+gg0XQtCimbxiNjll',
    bgGradient: 'from-blue-700 via-indigo-800 to-slate-900',
    accentColor: 'blue',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Server,
    level: 'Beginner to Advanced',
    duration: '10 Weeks Batch',
    description: 'Master complete DevOps engineering and Cloud Infrastructure from scratch! Learn Linux system administration, shell scripting, Git workflows, Docker containerization, Kubernetes orchestration, CI/CD automation pipelines (GitHub Actions & Jenkins), Terraform Infrastructure as Code (IaC), Ansible configuration management, and AWS Cloud deployments. Unlock the official Telegram channel after payment to start learning with live sessions and repository access.',
    features: [
      'Linux Administration & Shell Scripting',
      'Docker Containers & Kubernetes Cluster Orchestration',
      'CI/CD Automation Pipelines (GitHub Actions & Jenkins)',
      'Terraform Infrastructure as Code (IaC) & AWS Cloud',
      'Exclusive Telegram Channel for Live Sessions & Shell Scripts'
    ],
    modules: [
      {
        title: 'Module 1: Linux System Administration, Shell Scripting & Git',
        description: 'Command line utilities, permissions, process management, bash automation scripts, and Git branching.',
        topics: ['Linux CLI Commands & Permissions', 'Bash Shell Scripting & Automation', 'Git Branching, Merging & Rebasing', 'SSH Keys & Server Security']
      },
      {
        title: 'Module 2: Docker Containers & Kubernetes Cluster Orchestration',
        description: 'Container images, Dockerfiles, Docker Compose, Kubernetes Pods, Services, Deployments, and Helm charts.',
        topics: ['Dockerfile Optimization & Multi-stage Builds', 'Docker Compose Microservices', 'Kubernetes Architecture & Pods', 'K8s Services, Ingress & Helm Charts']
      },
      {
        title: 'Module 3: CI/CD Pipelines, Terraform IaC, Ansible & AWS Cloud',
        description: 'Automated build/test/deploy pipelines, declarative infrastructure provisioning, and AWS cloud hosting.',
        topics: ['GitHub Actions & Jenkins CI/CD', 'Terraform Modules & State Management', 'Ansible Playbooks & Configuration', 'AWS EC2, S3, IAM & EKS Deployments']
      }
    ]
  },
  {
    id: 'cohort-2-harkirat',
    title: 'Complete Cohort 2.0 (BY Harkirat Singh)',
    tagline: 'Full-Stack Web Development, Open Source, System Design, DevOps & Production Deployment.',
    category: 'Web Development',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+ZxSmCYKxDDFiMDVl',
    bgGradient: 'from-cyan-600 via-blue-700 to-indigo-900',
    accentColor: 'cyan',
    badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    icon: Code,
    level: 'Beginner to Advanced',
    duration: '12 Weeks Batch',
    description: 'The renowned Complete Full-Stack Web Development & Open-Source Cohort 2.0 by Harkirat Singh! Master modern JavaScript/TypeScript, React, Next.js 14/15 App Router, Node.js, Express, PostgreSQL, Prisma ORM, WebSockets, WebRTC, Docker, CI/CD, Monorepos, System Design, and Open-Source contributions. Unlock the official Telegram channel after payment to start learning with batchmates and mentors.',
    features: [
      'Full-Stack MERN & Next.js 14/15 App Router',
      'TypeScript, PostgreSQL & Prisma ORM Data Modeling',
      'WebSockets, WebRTC, Monorepos & System Design',
      'Docker, CI/CD & Cloud Infrastructure Deployment',
      'Exclusive Telegram Channel for Cohort Notes & Batch Code'
    ],
    modules: [
      {
        title: 'Module 1: Foundation: Modern JavaScript, TypeScript & React/Next.js',
        description: 'Deep dive into JS internals, async programming, TypeScript types, React 18, and Next.js App Router.',
        topics: ['JavaScript Callbacks, Promises & Async/Await', 'TypeScript Generics & Strict Typing', 'React Hooks & State Optimization', 'Next.js 14 App Router & Server Actions']
      },
      {
        title: 'Module 2: Backend Architecture: Node.js, PostgreSQL, Prisma & Express',
        description: 'RESTful API microservices, relational database modeling, Prisma ORM, JWT auth, and middleware.',
        topics: ['Node.js & Express API Design', 'PostgreSQL Queries & Relational Schemas', 'Prisma ORM Migrations & Indexing', 'JWT Authentication & Security Headers']
      },
      {
        title: 'Module 3: Advanced Systems: WebSockets, Monorepos, Docker & Open Source',
        description: 'Real-time communication, Turborepo monorepos, containerization, and open-source contribution guidelines.',
        topics: ['Real-time WebSockets & WebRTC', 'Turborepo & Monorepo Workflows', 'Docker Containerization & Networking', 'Open Source PRs & System Design']
      }
    ]
  },
  {
    id: 'cohort-3-harkirat',
    title: 'Complete Cohort 3.0 (BY Harkirat Singh)',
    tagline: 'Next-Gen Full Stack, DevOps, Web3/Blockchain & Deep System Architecture Cohort.',
    category: 'Web Development',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+N1GWdhS7Ex1iYWJl',
    bgGradient: 'from-purple-700 via-indigo-900 to-slate-900',
    accentColor: 'purple',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Layers,
    level: 'Beginner to Advanced',
    duration: '14 Weeks Batch',
    description: 'The flagship Complete Cohort 3.0 by Harkirat Singh covering Web Development, DevOps, Cloud Infrastructure, Systems Programming, and Web3/Blockchain engineering! Master modern full-stack web applications, scalable microservice architectures, Kubernetes, Kafka, Redis, Rust fundamentals, Web3 smart contracts, and production-grade software engineering. Join the official Telegram channel after payment to start learning.',
    features: [
      'Comprehensive Full Stack, DevOps & Web3 Curriculum',
      'Advanced System Architecture & Microservices',
      'Kubernetes, Kafka, Redis & Distributed Message Queues',
      'Rust Foundations & Web3 Smart Contract Development',
      'Exclusive Telegram Channel for Live Lectures & Repositories'
    ],
    modules: [
      {
        title: 'Module 1: Web Development & Full Stack Microservices',
        description: 'Next.js App Router, TypeScript, PostgreSQL, Prisma, serverless functions, and state management.',
        topics: ['Next.js App Router & Server Components', 'Relational Schemas in PostgreSQL & Prisma', 'State Management & Custom Hooks', 'Serverless Architecture & Cloudflare Workers']
      },
      {
        title: 'Module 2: DevOps, Kubernetes, Kafka, Redis & Distributed Systems',
        description: 'Scaling backend services, caching layers with Redis, message queues with Kafka, and Kubernetes management.',
        topics: ['Redis Caching & Pub/Sub Queues', 'Kafka Message Streams & Consumer Groups', 'Kubernetes Deployment & Auto-scaling', 'Monitoring with Prometheus & Grafana']
      },
      {
        title: 'Module 3: Web3, Blockchain Architecture & Rust Systems Programming',
        description: 'Rust programming fundamentals, Solana/Ethereum smart contracts, decentralized apps (dApps), and cryptography.',
        topics: ['Rust Ownership, Borrowing & Lifetimes', 'Smart Contract Development (Anchor/Solana)', 'Decentralized Applications (dApps)', 'Web3 Security Auditing & Cryptography']
      }
    ]
  },
  {
    id: 'rohit-negi-nexus',
    title: 'Rohit Negi Nexus - Web dev | Block chain | SD | DSA Complete',
    tagline: 'Complete Full-Stack Web Dev, Blockchain, System Design & DSA Masterclass by Rohit Negi.',
    category: 'Web Development',
    price: 599,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+v9arS7na-sJlMzc9',
    bgGradient: 'from-indigo-700 via-purple-700 to-pink-700',
    accentColor: 'indigo',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: Code,
    level: 'Beginner to Advanced',
    duration: '16 Weeks Nexus Batch',
    description: 'Master Web Development, Blockchain & Smart Contracts, Low-Level & High-Level System Design (SD), and Data Structures & Algorithms (DSA) with Rohit Negi! Built for aspiring software engineers aiming for top tech product company placements. Unlock the official Telegram channel after payment to start learning with full access to live lectures, notes, and problem sets.',
    features: [
      'Full-Stack MERN & Next.js Web Development',
      'Blockchain & Solidity Smart Contract Development',
      'Low-Level Design (LLD) & High-Level System Design (HLD)',
      'Comprehensive Pattern-Based DSA Problem Solving',
      'Exclusive Telegram Channel for Code Repositories & Doubts'
    ],
    modules: [
      {
        title: 'Module 1: Data Structures & Problem Solving in C++',
        description: 'Arrays, Strings, Linked Lists, Trees, Graphs, DP, and Competitive Programming.',
        topics: ['Sliding Window & Two Pointers', 'Recursion & Backtracking', 'Trees, Graphs BFS/DFS', 'Dynamic Programming Patterns']
      },
      {
        title: 'Module 2: Full-Stack Web Dev & Blockchain Tech',
        description: 'React, Node.js, Express, MongoDB, Web3, Ethereum & Smart Contracts.',
        topics: ['Full-Stack MERN Architecture', 'REST APIs & JWT Auth', 'Solidity & Ethereum Smart Contracts', 'Web3.js & dApp Frontend Integration']
      },
      {
        title: 'Module 3: Low-Level (LLD) & High-Level System Design (HLD)',
        description: 'Design patterns, OOP principles, DB sharding, caching, microservices & rate limiters.',
        topics: ['SOLID Principles & LLD Design Patterns', 'Scalable Microservices Architecture', 'Database Sharding, Replication & Caching', 'Building Rate Limiters & Distributed Systems']
      }
    ]
  },
  {
    id: 'love-babbar-supreme-1',
    title: 'LOVE BABBAR SUPREME 1.O',
    tagline: 'Complete C++ DSA & System Design Masterclass by Love Babbar (Supreme 1.0).',
    category: 'Data Structures & Algorithms',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+mjvG3wC4r20zOGNl',
    bgGradient: 'from-amber-600 via-orange-600 to-rose-600',
    accentColor: 'orange',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: Terminal,
    level: 'Beginner to Advanced',
    duration: '12 Weeks Batch',
    description: 'Master Data Structures & Algorithms from foundation to advanced competitive programming with Love Babbar in Supreme 1.0! Learn C++ STL, Bit Manipulation, Arrays, Searching/Sorting, Linked Lists, Stack, Queue, Trees, Graphs, Tries, Segment Trees, and Dynamic Programming with LeetCode & CodeStudio interview problems. Unlock the official Telegram channel after payment to start learning.',
    features: [
      'Complete C++ Language & STL Basics to Advanced',
      '250+ Solved Top Product Company Interview Questions',
      'Step-by-step Dry-Run Visualization & Code Templates',
      'Mock Interview Tips & Placement Guidance',
      'Exclusive Telegram Channel for Course Updates & Solution Notes'
    ],
    modules: [
      {
        title: 'Module 1: C++ Fundamentals, STL & Linear Data Structures',
        description: 'Pointers, memory management, STL containers, Arrays, Strings, Searching & Sorting.',
        topics: ['C++ STL Vectors, Maps, Sets', 'Binary Search Variants', 'Two Pointers & Sliding Window', 'Linked List Construction & Tricks']
      },
      {
        title: 'Module 2: Stacks, Queues, Trees & Heap Data Structures',
        description: 'Stack-Queue algorithms, Binary Trees, BST, Heaps, and Priority Queues.',
        topics: ['Infix/Postfix Stack Evaluation', 'Tree Traversals & Views', 'Heap Sort & Priority Queue', 'Tries & Prefix Trees']
      },
      {
        title: 'Module 3: Graphs, Backtracking & Dynamic Programming',
        description: 'Graph algorithms, shortest path, backtracking, and 1D/2D DP optimization.',
        topics: ['BFS, DFS & Topological Sort', 'Dijkstra & Minimum Spanning Tree', 'N-Queens & Sudoku Backtracking', 'Tabulation & Memoization DP']
      }
    ]
  },
  {
    id: 'love-babbar-supreme-2',
    title: 'LOVE BABBAR SUPREME 2.0',
    tagline: 'Next-Gen C++ DSA, Advanced Algorithms & System Design by Love Babbar (Supreme 2.0).',
    category: 'Data Structures & Algorithms',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+CS5v6DUANnFhNzJl',
    bgGradient: 'from-rose-600 via-red-700 to-amber-700',
    accentColor: 'rose',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    icon: Cpu,
    level: 'Beginner to Advanced',
    duration: '14 Weeks Batch',
    description: 'The upgraded Love Babbar Supreme 2.0 DSA Cohort! Deep dive into advanced C++ problem solving, modern algorithmic techniques, Segment Trees, Disjoint Set Union (DSU), Fenwick Trees, String Algorithms (KMP/Z-algorithm), and Low-Level System Design (LLD) fundamentals. Unlock the official Telegram channel after payment to start learning.',
    features: [
      'Upgraded Supreme 2.0 Curriculum with Advanced Problem Patterns',
      'Segment Trees, Fenwick Trees, DSU & String Matching (KMP)',
      'Low-Level System Design (LLD) & Object-Oriented Principles',
      '300+ LeetCode Hard & Medium Problems Solved Live',
      'Exclusive Telegram Channel for Code Repositories & Mentor Guidance'
    ],
    modules: [
      {
        title: 'Module 1: Advanced C++ Concepts & Basic to Intermediate DSA',
        description: 'Complexity analysis, Bitwise operations, Recursion, Backtracking, and Linear Structures.',
        topics: ['Bit Manipulation Tricks', 'Recursion Tree Analysis', 'Arrays, Strings & Matrix Problems', 'Stack & Queue Applications']
      },
      {
        title: 'Module 2: Trees, Advanced Graphs & Dynamic Programming',
        description: 'LCA in Trees, Graph Algorithms, Tarjan/Bridges, and 2D/3D DP.',
        topics: ['Lowest Common Ancestor (LCA)', 'Bridges & Articulation Points in Graphs', 'DP on Trees & Grids', 'Digit DP & Bitmask DP']
      },
      {
        title: 'Module 3: Advanced Data Structures (Segment/Fenwick) & LLD',
        description: 'Range queries with Segment Trees, Fenwick Trees, String Algorithms, and LLD.',
        topics: ['Segment Tree with Lazy Propagation', 'Fenwick Tree (Binary Indexed Tree)', 'KMP & Z-Algorithm for Strings', 'Low-Level System Design Patterns']
      }
    ]
  },
  {
    id: 'mastering-system-design',
    title: 'Mastering System Design',
    tagline: 'Master Low-Level Design (LLD) & High-Level System Design (HLD) for scalable distributed systems.',
    category: 'System Design',
    price: 199,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+sY0d7wXZu7I2NGNl',
    bgGradient: 'from-slate-800 via-indigo-900 to-slate-900',
    accentColor: 'indigo',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: Server,
    level: 'Intermediate to Advanced',
    duration: '8 Weeks Batch',
    description: 'Master Low-Level Design (LLD) and High-Level System Design (HLD) from fundamentals to complex distributed architectures! Learn object-oriented design patterns, database sharding, replication, rate limiters, load balancing, message queues (Kafka, RabbitMQ), caching strategies (Redis), and microservice scalability. Join the official Telegram channel after payment to start learning.',
    features: [
      'Comprehensive Low-Level Design (LLD) & SOLID Principles',
      'High-Level Distributed System Design (HLD) Architecture',
      'Database Sharding, Replication, Indexing & Caching (Redis)',
      'Real-World Case Studies: Designing Rate Limiters, Uber & Netflix',
      'Exclusive Telegram Channel for Architecture Diagrams & Code Notes'
    ],
    modules: [
      {
        title: 'Module 1: Low-Level Design (LLD) & Object-Oriented Design',
        description: 'SOLID design principles, design patterns (Factory, Singleton, Observer, Strategy), and UML class diagrams.',
        topics: ['SOLID Principles & Clean Code', 'Creational & Structural Design Patterns', 'Behavioral Patterns & State Machines', 'LLD Case Studies: Parking Lot & Elevator System']
      },
      {
        title: 'Module 2: High-Level System Design (HLD) & Distributed Systems',
        description: 'Scalability fundamentals, Load Balancing, Horizontal vs Vertical Scaling, CAP Theorem, and Consistent Hashing.',
        topics: ['Horizontal vs Vertical Scaling & Load Balancers', 'CAP Theorem & PACELC Theorem', 'Consistent Hashing & Partitioning', 'Database Sharding, Replication & ACID vs BASE']
      },
      {
        title: 'Module 3: Caching, Messaging Queues & Production Architectures',
        description: 'Redis caching strategies, Kafka/RabbitMQ message brokers, API Gateway design, and microservices.',
        topics: ['Redis Cache-Aside, Write-Through & Write-Back', 'Kafka Event Streaming & Message Queues', 'Designing Distributed Rate Limiters', 'HLD Case Studies: WhatsApp, Uber & YouTube']
      }
    ]
  },
  {
    id: 'nodejs-beginner-to-advanced',
    title: 'Node.js- beginner to Advance With Project',
    tagline: 'Master Node.js, Express.js, MongoDB, Event Loop, REST APIs & Real-World Projects.',
    category: 'Web Development',
    price: 249,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+M4INcXhsBsA0OTdl',
    bgGradient: 'from-emerald-700 via-teal-800 to-slate-900',
    accentColor: 'emerald',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: Code,
    level: 'Beginner to Advanced',
    duration: '8 Weeks Batch',
    description: 'Learn Node.js from zero to advanced backend engineer with hands-on projects! Master the Node.js Event Loop, asynchronous I/O, Express.js framework, RESTful API design, authentication (JWT & OAuth), MongoDB/Mongoose database integration, file uploads, WebSockets, and deploying production server microservices. Join the official Telegram channel after payment to start learning.',
    features: [
      'Node.js Runtime Architecture & Event Loop Deep Dive',
      'Express.js REST API Development & Middleware Pipelines',
      'MongoDB Integration with Mongoose Schemas & Indexing',
      'JWT Authentication, Role-Based Access & Security',
      'Exclusive Telegram Channel for Project Source Code & Live Help'
    ],
    modules: [
      {
        title: 'Module 1: Node.js Runtime, Event Loop & Core Modules',
        description: 'Understanding V8 Engine, Non-blocking I/O, Event Loop phases, FS module, Streams, and Buffers.',
        topics: ['Node.js Architecture & V8 Engine', 'Asynchronous Non-blocking I/O & Event Loop', 'File System (FS) & Event Emitters', 'Streams, Buffers & Pipeline Handling']
      },
      {
        title: 'Module 2: Express.js Framework & MongoDB Database',
        description: 'Routing, custom middleware, error handling, MongoDB connection, Mongoose validation, and CRUD operations.',
        topics: ['Express Routing & Middleware Architecture', 'MongoDB Setup & Mongoose Schemas', 'Database Indexing & Aggregation Pipelines', 'Centralized Error Handling & Validation']
      },
      {
        title: 'Module 3: Authentication, WebSockets & Capstone Backend Project',
        description: 'JWT Auth, bcrypt password hashing, Socket.io real-time chat, file uploads (Multer/Cloudinary), and production deployment.',
        topics: ['JWT Authentication & Cookie Sessions', 'Real-Time Communication with WebSockets', 'File Uploads with Multer & Cloudinary', 'Full Capstone E-Commerce REST API Deployment']
      }
    ]
  },
  {
    id: 'master-microservices-springboot-docker-k8s',
    title: 'Master Microservices With SpringBoot, Docker,Kubernetes',
    tagline: 'Build scalable Enterprise Microservices with Spring Boot, Docker, Kubernetes & Service Mesh.',
    category: 'DevOps',
    price: 199,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+qYzqJMFQ8785YjI1',
    bgGradient: 'from-teal-700 via-emerald-800 to-indigo-950',
    accentColor: 'teal',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
    icon: Server,
    level: 'Intermediate to Advanced',
    duration: '10 Weeks Batch',
    description: 'Master Enterprise Microservices architecture with Spring Boot, Spring Cloud, Docker containerization, and Kubernetes cluster orchestration! Learn Spring Cloud Gateway, Eureka Service Discovery, Config Server, Resilience4j Circuit Breakers, Docker containerization, Kubernetes Pods/Services, and distributed tracing with Zipkin & Prometheus. Unlock the official Telegram channel after payment to start learning.',
    features: [
      'Spring Boot Microservices & Spring Cloud Infrastructure',
      'Eureka Service Discovery & Spring Cloud API Gateway',
      'Resilience4j Circuit Breaker & Distributed Tracing',
      'Docker Containerization & Kubernetes Cluster Deployment',
      'Exclusive Telegram Channel for Repositories & Architecture Diagrams'
    ],
    modules: [
      {
        title: 'Module 1: Spring Boot Microservices & REST API Fundamentals',
        description: 'Building RESTful web services with Spring Boot, Spring Data JPA, H2/PostgreSQL databases, and Bean Validation.',
        topics: ['Spring Boot Architecture & Auto-configuration', 'Spring Data JPA & Entity Relationships', 'REST API Design & Swagger/OpenAPI Specs', 'Exception Handling & Input Validation']
      },
      {
        title: 'Module 2: Spring Cloud Ecosystem & Microservice Patterns',
        description: 'Service discovery with Eureka, Centralized Config Server, Spring Cloud Gateway, Resilience4j, and Kafka messaging.',
        topics: ['Eureka Service Registry & Discovery', 'Spring Cloud Gateway Routing & Security', 'Resilience4j Circuit Breaker & Rate Limiting', 'Event-Driven Microservices with Kafka']
      },
      {
        title: 'Module 3: Docker Containerization & Kubernetes Orchestration',
        description: 'Building OCI Docker images, Docker Compose multi-container environments, Kubernetes deployment, and ConfigMaps/Secrets.',
        topics: ['Dockerizing Spring Boot Applications', 'Docker Compose Microservice Stacks', 'Kubernetes Deployments, Pods & Services', 'K8s ConfigMaps, Secrets & Helm Charts']
      }
    ]
  },
  {
    id: 'complete-java-beginners',
    title: 'Complete JAVA For Beginners',
    tagline: 'Master Java Programming, OOPs Concepts, Collections Framework & Multithreading from Scratch.',
    category: 'Data Structures & Algorithms',
    price: 249,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+7WQwU6ta7xI3OGY9',
    bgGradient: 'from-amber-700 via-orange-800 to-red-900',
    accentColor: 'orange',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: Code,
    level: 'Beginner to Intermediate',
    duration: '6 Weeks Batch',
    description: 'Master Java from absolute scratch! Learn Java syntax, Object-Oriented Programming (OOP) principles, exception handling, Java Collections Framework (ArrayList, HashMap, HashSet), File I/O, Multithreading, and core DSA concepts. Unlock the official Telegram channel after payment to start learning with code notes, exercises, and mentor support.',
    features: [
      'Complete Java Foundations & Core Language Syntax',
      'Object-Oriented Programming (Classes, Inheritance, Interfaces)',
      'Java Collections Framework & Memory Management',
      'Multithreading, Exception Handling & File I/O',
      'Exclusive Telegram Channel for Code Examples & Doubt Resolution'
    ],
    modules: [
      {
        title: 'Module 1: Java Basics, Control Flow & OOP Fundamentals',
        description: 'JDK setup, JVM/JRE architecture, variables, loops, methods, classes, objects, and encapsulation.',
        topics: ['JVM, JRE & JDK Architecture', 'Data Types & Control Flow Statements', 'Classes, Objects & Constructors', 'Encapsulation & Access Modifiers']
      },
      {
        title: 'Module 2: Advanced OOPs, Interfaces & Exception Handling',
        description: 'Inheritance, Polymorphism, Abstraction, Interfaces, Packages, and Custom Exception Handling.',
        topics: ['Method Overloading & Overriding', 'Abstract Classes & Interfaces', 'Exception Handling with Try-Catch-Finally', 'Custom Exceptions & Packages']
      },
      {
        title: 'Module 3: Java Collections Framework, Streams & Multithreading',
        description: 'ArrayList, LinkedList, HashMap, HashSet, Iterators, Lambda expressions, Streams API, and Threads.',
        topics: ['ArrayList, HashSet & HashMap Mastery', 'Generics & Iterators', 'Java 8 Lambdas & Stream API', 'Multithreading & Concurrency Basics']
      }
    ]
  },
  {
    id: 'complete-mlops-10-projects',
    title: 'Complete MLOps With 10+ End To End ML Projects',
    tagline: 'Master Machine Learning Operations (MLOps), CI/CD, MLflow, DVC, Docker, BentoML & AWS Deployments.',
    category: 'AI & Machine Learning',
    price: 199,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+Mk7Y5I00V0xiMzVl',
    bgGradient: 'from-purple-700 via-indigo-800 to-slate-900',
    accentColor: 'purple',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Brain,
    level: 'Intermediate to Advanced',
    duration: '8 Weeks Batch',
    description: 'Master production Machine Learning Operations (MLOps) with 10+ end-to-end industry projects! Learn experiment tracking with MLflow, data version control with DVC, automated CI/CD pipelines with GitHub Actions, model packaging with Docker & BentoML, cloud deployment on AWS EC2/S3, and model monitoring in production. Unlock the official Telegram channel after payment to start learning.',
    features: [
      '10+ Production End-to-End Machine Learning Projects',
      'Experiment Tracking & Model Registry with MLflow',
      'Data & Pipeline Version Control using DVC',
      'CI/CD Pipelines for ML with GitHub Actions & Docker',
      'Exclusive Telegram Channel for Project Code Repositories & Notes'
    ],
    modules: [
      {
        title: 'Module 1: MLOps Foundations, Data Versioning & MLflow',
        description: 'MLOps lifecycle, modular coding structure, DVC data versioning, MLflow experiment tracking, and model registry.',
        topics: ['MLOps Lifecycle & Project Architecture', 'Data Version Control (DVC) Pipelines', 'MLflow Experiment Tracking & Logging', 'Model Packaging & Registry']
      },
      {
        title: 'Module 2: Model Serving, Containerization & CI/CD',
        description: 'FastAPI model endpoints, Docker containerization, BentoML serving, and GitHub Actions CI/CD workflows.',
        topics: ['FastAPI & Flask REST Endpoints for ML Models', 'Dockerizing ML Pipelines & Containers', 'BentoML & Triton Model Server', 'GitHub Actions CI/CD Automation']
      },
      {
        title: 'Module 3: Cloud Deployment (AWS) & Model Monitoring',
        description: 'Deploying ML pipelines on AWS EC2/ECR/S3, monitoring data drift, Evidently AI, and 10+ Capstone Projects.',
        topics: ['AWS EC2, S3 & ECR Deployment Pipelines', 'Data & Concept Drift Monitoring with Evidently AI', 'Prometheus & Grafana ML Dashboards', '10+ Industry Capstone ML Project Walkthroughs']
      }
    ]
  },
  {
    id: 'complete-english-speaking-mastery',
    title: 'Complete English Speaking Course- English Language Mastery',
    tagline: 'Master Fluent Spoken English, Pronunciation, Grammar, Public Speaking & Professional Communication.',
    category: 'Soft Skills & Communication',
    price: 199,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+qYzqJMFQ8785YjI1',
    bgGradient: 'from-pink-600 via-rose-700 to-purple-800',
    accentColor: 'pink',
    badgeBg: 'bg-pink-100 text-pink-800 border-pink-200',
    icon: MessageSquare,
    level: 'Beginner to Advanced',
    duration: '6 Weeks Batch',
    description: 'Transform your English communication skills from basic to fluent speaker! Master real-world spoken English, sentence framing, correct pronunciation, essential grammar, vocabulary expansion, public speaking, job interview answers, and professional corporate email writing. Unlock the official Telegram channel after payment to start learning with daily audio lessons and practice sessions.',
    features: [
      'Daily Spoken English Audio & Video Practice Sessions',
      'Fluency, Accent Neutralization & Pronunciation Exercises',
      'Practical Grammar Rules & Sentence Construction',
      'Corporate Communication, Email Writing & Interview Prep',
      'Exclusive Telegram Channel for Daily Vocabulary & Live Practice'
    ],
    modules: [
      {
        title: 'Module 1: Foundations of Spoken English & Grammar',
        description: 'Tenses made simple, sentence structures, common grammar mistakes, daily usage vocabulary, and pronunciation.',
        topics: ['Tenses & Practical Grammar Rules', 'Building Everyday English Vocabulary', 'Correct Pronunciation & Phonetics', 'Eliminating Hesitation & Fear of Speaking']
      },
      {
        title: 'Module 2: Fluency, Conversation & Accent Building',
        description: 'Real-life conversation scenarios (shopping, traveling, office), thought framing in English, and accent neutralization.',
        topics: ['Framing Thoughts Directly in English', 'Real-Life Conversation Roleplays', 'Accent Neutralization & Voice Modulation', 'Listening Comprehension & Expressive Speaking']
      },
      {
        title: 'Module 3: Professional English, Interviews & Public Speaking',
        description: 'Job interview preparation, corporate presentation skills, email writing etiquettes, and public speaking confidence.',
        topics: ['Job Interview Q&A Mastery', 'Corporate Email Writing & Business Etiquettes', 'Public Speaking & Presentation Skills', 'Group Discussion (GD) Strategies']
      }
    ]
  },
  {
    id: 'javascript-mastery-interview',
    title: 'JavaScript Mastery With Interview Questions Series',
    tagline: 'Master JS Core, Asynchronous Execution, Event Loop, Closures & 100+ Top Interview Questions.',
    category: 'Web Development',
    price: 149,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+EbPsc-dZ7lVlYmRl',
    bgGradient: 'from-amber-500 via-yellow-600 to-amber-700',
    accentColor: 'amber',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Code,
    level: 'Beginner to Advanced',
    duration: '6 Weeks Batch',
    description: 'Master JavaScript inside-out and clear frontend/fullstack developer technical interviews with ease! Deep dive into execution contexts, hoisting, closures, prototypal inheritance, event loop, promises, async/await, ES6+ modern features, DOM manipulation, polyfills, and 100+ top company interview questions. Unlock the official Telegram channel after payment to start learning.',
    features: [
      'Comprehensive JavaScript Fundamentals to Advanced Engine Mechanics',
      'Event Loop, Microtask Queue, Closures & Prototypal Inheritance',
      '100+ Solved Machine Coding & Output-Based Interview Questions',
      'Custom Polyfill Building (Array.map, Promise.all, Debounce, Throttle)',
      'Exclusive Telegram Channel for Discussion, Code Notes & Machine Coding Repos'
    ],
    modules: [
      {
        title: 'Module 1: Engine Mechanics, Scope, Closures & ES6+',
        description: 'Execution context, hoisting, lexical scope, closures, TDZ, arrow functions, and ES6+ features.',
        topics: ['Execution Context & Call Stack', 'Hoisting, Let, Var & Const TDZ', 'Lexical Scope & Closure Patterns', 'ES6+ Destructuring, Rest/Spread & Modules']
      },
      {
        title: 'Module 2: Asynchronous JS, Promises & Event Loop Deep Dive',
        description: 'Callbacks, Promises, Async/Await, Microtask vs Macrotask Queue, and Event Loop.',
        topics: ['Event Loop & Event Queue Mechanics', 'Promises Chaining & Error Handling', 'Async/Await & Try-Catch Best Practices', 'Building Custom Polyfills (Promise.all, Race)']
      },
      {
        title: 'Module 3: Prototypal Inheritance, DOM & Machine Coding Interviews',
        description: 'Prototypes, class syntax, DOM event delegation, debouncing, throttling, and machine coding problems.',
        topics: ['Prototype Chain & Object Inheritance', 'DOM Event Delegation, Bubbling & Capturing', 'Debouncing, Throttling & Currying', 'Top 50 Machine Coding & Output Interview Questions']
      }
    ]
  },
  {
    id: 'python-interview-prep-dsa',
    title: 'Complete Python Interview Prep With DSA',
    tagline: 'Master Python DSA Patterns, Big-O Optimization, String/Array Tricks & Technical Interview Problems.',
    category: 'Data Structures & Algorithms',
    price: 299,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+ORtwWuR8P6FhM2Q1',
    bgGradient: 'from-blue-600 via-sky-700 to-indigo-900',
    accentColor: 'sky',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
    icon: Terminal,
    level: 'Beginner to Advanced',
    duration: '8 Weeks Batch',
    description: 'Ace your Python coding interviews! Master Data Structures & Algorithms tailored specifically for Python developers. Learn pattern-based problem solving (Two Pointers, Sliding Window, HashMaps, Fast & Slow Pointers, Backtracking, Trees, Dynamic Programming) alongside Pythonic optimizations, built-in library tricks (collections, heapq, itertools), and 150+ LeetCode interview questions. Join the official Telegram channel after payment to start learning.',
    features: [
      'Pythonic Data Structures & Idiomatic Algorithm Optimization',
      '150+ Top Solved Python LeetCode & Company Interview Problems',
      'Pattern-Based DSA (Sliding Window, Two Pointers, Trees, DP)',
      'Python Collections, Heapq, Bisect & Itertools Power Tricks',
      'Exclusive Telegram Group for Live Code Reviews & Interview Mock Sets'
    ],
    modules: [
      {
        title: 'Module 1: Python Built-in Data Structures & Algorithm Foundations',
        description: 'Time/space complexity, Python list/dict internals, collections module, and string/array tricks.',
        topics: ['Big-O Notation & Memory Footprint in Python', 'Lists, Dicts, Sets & Collections (defaultdict, Counter)', 'String Manipulation & Regex Tricks', 'Heapq & Bisect Modules for Fast Searching']
      },
      {
        title: 'Module 2: Core Data Structures: Linked Lists, Trees & Graphs',
        description: 'Two-Pointers, Fast & Slow pointers, Recursion, Trees, Graphs, BFS/DFS in Python.',
        topics: ['Two Pointers & Sliding Window Patterns', 'Linked Lists & Fast/Slow Pointer Pattern', 'Binary Trees, BST & Tree Traversals', 'Graph Adjacency Lists, BFS & DFS']
      },
      {
        title: 'Module 3: Advanced Algorithms, Dynamic Programming & Mock Prep',
        description: 'Backtracking, Memoization, Tabulation, Dynamic Programming, and top Python interview problem sets.',
        topics: ['Recursion & Backtracking (N-Queens, Subsets)', 'Dynamic Programming (1D & 2D Memoization)', 'Top 50 Python LeetCode Interview Questions', 'Behavioral & Technical Python Interview Strategies']
      }
    ]
  },
  {
    id: 'master-microsoft-fabric-cicd',
    title: 'Master MicroSoft Fabric: A Complete End-To-End Project- CICD',
    tagline: 'Build Enterprise Data Pipelines with Microsoft Fabric, OneLake, Synapse, Power BI & CI/CD.',
    category: 'Data Analytics',
    price: 199,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+dxrp3E4W-3dlMGU1',
    bgGradient: 'from-blue-700 via-teal-700 to-slate-900',
    accentColor: 'blue',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Database,
    level: 'Intermediate to Advanced',
    duration: '8 Weeks Batch',
    description: 'Master Microsoft Fabric for modern enterprise data engineering! Build an end-to-end data platform project using OneLake, Synapse Data Factory, Data Engineering Lakehouses, Real-Time Analytics, Power BI DirectLake mode, and automated Git/CI/CD deployment pipelines. Unlock the official Telegram channel after payment to start learning.',
    features: [
      'End-to-End Enterprise Data Platform Project with Microsoft Fabric',
      'OneLake Storage, Lakehouse & Synapse Pipelines Architecture',
      'PySpark Data Engineering, Delta Lake & Real-Time Analytics',
      'Automated Git Integration & Deployment Pipelines (CI/CD)',
      'Exclusive Telegram Channel for Solution Architecture & Deployment Templates'
    ],
    modules: [
      {
        title: 'Module 1: Microsoft Fabric Architecture, OneLake & Lakehouse',
        description: 'Fabric workspace setup, OneLake architecture, Lakehouse vs Warehouse, and Delta Parquet storage.',
        topics: ['Microsoft Fabric Platform Architecture', 'OneLake Storage & Shortcutting Concept', 'Building Lakehouses & Data Warehouses', 'Delta Table Formats & Optimization']
      },
      {
        title: 'Module 2: Data Engineering with PySpark & Data Factory Pipelines',
        description: 'Ingesting data with Data Factory, PySpark transformations, Notebooks, and Dataflows Gen2.',
        topics: ['Data Factory Pipelines & Copy Activities', 'PySpark Transformations in Fabric Notebooks', 'Dataflows Gen2 for ETL Ingestion', 'Real-Time Analytics with KQL Database']
      },
      {
        title: 'Module 3: Power BI DirectLake, Git Integration & CI/CD Pipelines',
        description: 'DirectLake reporting in Power BI, Fabric Git integration, deployment pipelines, and ALM.',
        topics: ['Power BI DirectLake Reporting Mode', 'Fabric Git Integration with Azure DevOps/GitHub', 'Deployment Pipelines (Dev/Test/Prod)', 'End-to-End Capstone Project & CI/CD Automation']
      }
    ]
  }
];

export const CodingCoursesView: React.FC<CodingCoursesViewProps> = ({ user }) => {
  // Persistence for unlocked courses in localStorage
  const [unlockedCourses, setUnlockedCourses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('unlocked_coding_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [payingForCourse, setPayingForCourse] = useState<CourseItem | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('unlocked_coding_courses', JSON.stringify(unlockedCourses));
    } catch (e) {
      console.warn('Failed to save unlocked courses to localStorage:', e);
    }
  }, [unlockedCourses]);

  const handleUnlockCourseClick = (course: CourseItem) => {
    if (unlockedCourses.includes(course.id)) {
      setActiveCourseId(course.id);
    } else {
      setPayingForCourse(course);
    }
  };

  const handleConfirmPayment = () => {
    if (!payingForCourse) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccessMessage(true);

      setTimeout(() => {
        const courseId = payingForCourse.id;
        setUnlockedCourses((prev) => [...new Set([...prev, courseId])]);
        setActiveCourseId(courseId);

        if (user && user.uid) {
          FirestoreService.saveUserCourseProgress(user.uid, courseId, {
            enrolled: true,
            enrolledAt: new Date().toISOString(),
            courseTitle: payingForCourse.title,
            courseCategory: payingForCourse.category
          });
        }

        setPayingForCourse(null);
        setPaymentSuccessMessage(false);
      }, 1000);
    }, 1200);
  };

  const activeCourse = COURSES.find((c) => c.id === activeCourseId);

  // Filter logic
  const filteredCourses = selectedCategory === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.category === selectedCategory);

  // -------------------------------------------------------------
  // DETAIL VIEW FOR UNLOCKED / PAID COURSE
  // -------------------------------------------------------------
  if (activeCourse) {
    const isDrive = activeCourse.linkType === 'drive';

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
        {/* Back navigation */}
        <button
          onClick={() => setActiveCourseId(null)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>

        {/* Hero banner for Course detail */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${activeCourse.bgGradient} p-6 sm:p-10 text-white shadow-xl`}>
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider">
                {activeCourse.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-black flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" /> Course Unlocked & Enrolled
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {activeCourse.title}
            </h1>
            
            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
              {activeCourse.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-white/90 font-bold">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{activeCourse.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{activeCourse.level}</span>
              </div>
              <div className="flex items-center gap-2">
                {isDrive ? <Folder className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                <span>{isDrive ? 'Google Drive Access Repository' : 'Interactive Telegram Cohort'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* START LEARNING & REDIRECT SECTION */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-8 border border-purple-900/50 shadow-2xl text-white space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Enrollment Confirmed
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                start learning
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {isDrive 
                  ? 'You have successfully unlocked this course! Access the official Google Drive folder below to stream video lectures, download Jupyter notebooks, and access complete datasets.'
                  : 'You have successfully unlocked this course! Join the official Telegram channel below to access live lecture streams, study materials, project code repositories, and batch announcements.'}
              </p>
            </div>

            {/* Action Redirect Button */}
            <div className="shrink-0">
              <a
                href={activeCourse.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl ${
                  isDrive 
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 shadow-amber-500/25'
                    : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-sky-500/25'
                } text-white font-black text-sm sm:text-base shadow-xl transition-all transform hover:scale-[1.03] cursor-pointer`}
              >
                {isDrive ? <Folder className="w-5 h-5 text-white" /> : <Send className="w-5 h-5 text-white" />}
                <span>{isDrive ? 'Open Google Drive Folder & Start Learning' : 'Join Telegram Channel & Start Learning'}</span>
                <ExternalLink className="w-4 h-4 text-white/80" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="font-extrabold text-white flex items-center gap-1.5">
                {isDrive ? <Folder className="w-4 h-4 text-amber-400" /> : <MessageSquare className="w-4 h-4 text-sky-400" />}
                <span>{isDrive ? 'Google Drive Access' : 'Telegram Community'}</span>
              </div>
              <p className="text-slate-400">
                {isDrive ? 'Instant access to all structured course folders & datasets.' : 'Direct access to mentors and doubt solving with batchmates.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="font-extrabold text-white flex items-center gap-1.5">
                <Video className="w-4 h-4 text-purple-400" /> Live & Video Lectures
              </div>
              <p className="text-slate-400">Stream high-definition class recordings and live sessions anytime.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="font-extrabold text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" /> Source Codes & Projects
              </div>
              <p className="text-slate-400">Complete code repositories, notes, and assignment solutions included.</p>
            </div>
          </div>
        </div>

        {/* Detailed Course Syllabus Roadmap */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" /> Detailed Course Roadmap & Curriculum
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Structured step-by-step breakdown of modules covered in this cohort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCourse.modules.map((mod, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{mod.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{mod.description}</p>
                  </div>
                </div>

                <div className="pl-10 space-y-1.5">
                  {mod.topics.map((t, tidx) => (
                    <div key={tidx} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA again for convenience */}
          <div className="pt-4 flex justify-center">
            <a
              href={activeCourse.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl ${
                isDrive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-purple-600 hover:bg-purple-700'
              } text-white font-extrabold text-sm shadow-md transition-colors`}
            >
              {isDrive ? <Folder className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              <span>{isDrive ? 'Open Google Drive Course Folder' : 'Go to Course Telegram Channel'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN COURSES DIRECTORY LIST
  // -------------------------------------------------------------
  const categories = ['All', 'Web Development', 'Data Structures & Algorithms', 'AI & Machine Learning', 'Data Analytics', 'Cyber Security', 'App Development', 'DevOps', 'System Design', 'Soft Skills & Communication'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" /> Exclusive Interactive Coding Courses
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your Code & Unlock Placements
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Enroll in top-rated structured courses designed by industry experts. Get instant access to full syllabus materials, interactive problem sets, and our official Telegram / Google Drive resources for ₹399 each.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        <div className="text-xs font-black text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => {
          const isUnlocked = unlockedCourses.includes(course.id);
          const IconComp = course.icon;
          const isDrive = course.linkType === 'drive';

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Header with Background Image Overlay */}
              <div className={`p-6 bg-gradient-to-br ${course.bgGradient} text-white relative min-h-[170px] flex flex-col justify-between overflow-hidden`}>
                {course.bgImageUrl && (
                  <img
                    src={course.bgImageUrl}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black border backdrop-blur-md ${course.badgeBg}`}>
                    {course.category}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md text-white shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-black text-white tracking-tight leading-snug mb-1.5 drop-shadow-sm">
                    {course.title}
                  </h3>
                  
                  <p className="text-xs text-white/90 line-clamp-2 font-medium drop-shadow-xs">
                    {course.tagline}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  {/* Pricing tag */}
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-2xl font-black text-slate-900">₹{course.price}</span>
                      <span className="text-xs text-slate-400 font-bold ml-1.5 line-through">₹2,999</span>
                    </div>
                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      87% OFF
                    </span>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                      Key Highlights:
                    </div>
                    {course.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-2">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleUnlockCourseClick(course)}
                      className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isDrive ? 'Access Course & Drive' : 'Access Course & Telegram'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnlockCourseClick(course)}
                      className="w-full py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <Lock className="w-4 h-4 text-amber-300" />
                      <span>Unlock Course for ₹{course.price}</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-700">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-purple-100 text-purple-700 shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-base">Instant Course Access & Dedicated Learning Support</h4>
            <p className="text-xs text-slate-500 font-medium">Pay once to unlock lifetime access to course content and the official Telegram / Google Drive resources.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-purple-600" /> Full Curriculum</div>
          <span>•</span>
          <div className="flex items-center gap-1"><Send className="w-4 h-4 text-sky-500" /> Telegram & Drive Access</div>
        </div>
      </div>

      {/* PAYMENT CHECKOUT MODAL */}
      {payingForCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase">
                  Course Checkout
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{payingForCourse.title}</h3>
              </div>
              <button
                onClick={() => setPayingForCourse(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Price Summary */}
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-purple-700 font-bold">Total Course Fee</div>
                <div className="text-xs text-purple-500">Includes {payingForCourse.linkType === 'drive' ? 'Google Drive' : 'Telegram channel'} access & roadmap</div>
              </div>
              <div className="text-2xl font-black text-purple-900">₹{payingForCourse.price}</div>
            </div>

            {/* Payment Methods Simulation */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Select Payment Method:
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-purple-600 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <QrCode className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-extrabold text-slate-900 text-xs">UPI / GPay / PhonePe / Paytm</div>
                    <div className="text-[11px] text-slate-500">Instant Course & Material Unlock</div>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 opacity-80 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-slate-500" />
                <div className="font-extrabold text-slate-800 text-xs">Credit / Debit Card / NetBanking</div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessingPayment || paymentSuccessMessage}
                className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-75 text-white font-black text-sm shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment (₹{payingForCourse.price})...</span>
                  </>
                ) : paymentSuccessMessage ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    <span>Payment Successful! Opening Course...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-300" />
                    <span>Pay ₹{payingForCourse.price} & Unlock Course</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
