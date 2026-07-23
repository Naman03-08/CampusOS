import React, { useState, useEffect, useMemo } from 'react';
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
  ChevronDown,
  Layers,
  MessageSquare,
  Brain,
  BarChart3,
  FileCode,
  Folder,
  Filter,
  Shield,
  Smartphone,
  Server,
  Search,
  CheckSquare,
  Square,
  RotateCcw,
  Zap
} from 'lucide-react';
import { UserProfile } from '../../types';

import { FirestoreService } from '../../lib/firestoreService';

interface CodingCoursesViewProps {
  user: UserProfile;
  onNavigateTab?: (tab: string) => void;
}

import { COURSES, type CourseItem } from '../../data/detailedCoursesData';
export { COURSES, type CourseItem };

const INLINE_COURSES = [
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
        title: 'Module 1: Modern JavaScript (ES6+), DOM & Async Mechanics',
        description: 'Master async/await, promises, closures, event loops, and modern ES6 syntax.',
        topics: [
          'Arrow Functions, Destructuring & Rest/Spread Operators',
          'Promises, Async/Await & Event Loop Mechanics',
          'Fetch API, Axios & RESTful Data Fetching',
          'DOM Manipulation, Event Bubbling & Delegation',
          'ES6 Modules, Scope, Hoisting & TDZ'
        ]
      },
      {
        title: 'Module 2: Frontend Mastery with React 18 & Tailwind CSS',
        description: 'Component architecture, state management, custom hooks, context API, and responsive UI design.',
        topics: [
          'React Hooks: useState, useEffect, useMemo & useCallback',
          'Building Reusable Custom Hooks & Local Storage Sync',
          'Tailwind CSS Utility Layouts & Responsive Breakpoints',
          'React Router v6 Dynamic Routing & Protected Routes',
          'State Management with Context API & Redux Toolkit'
        ]
      },
      {
        title: 'Module 3: Backend Microservices with Node.js & Express.js',
        description: 'Build secure, scalable RESTful APIs with input validation, error handling middleware, and logging.',
        topics: [
          'Node.js Runtime Engine & Event-Driven Architecture',
          'Express.js Router, Controllers & Service Layers',
          'Custom Middleware, CORS, Helmet & Request Rate Limiting',
          'RESTful API Design Standards & HTTP Status Codes',
          'File Uploads with Multer & Cloudinary Image Storage'
        ]
      },
      {
        title: 'Module 4: Database Design with MongoDB & Mongoose ORM',
        description: 'Schema modeling, indexing, aggregation frameworks, relationships, and queries in MongoDB.',
        topics: [
          'Mongoose Schemas, Models & Field Validations',
          'CRUD Operations, Operators ($set, $push) & Filters',
          'MongoDB Aggregation Pipelines & Data Analytics',
          'Database Indexing & Query Performance Tuning',
          'Relational Population ($lookup & populate)'
        ]
      },
      {
        title: 'Module 5: Authentication, Security & Cloud Deployment',
        description: 'JWT Auth, Role-Based Access Control, environment setup, and cloud hosting.',
        topics: [
          'JWT (JSON Web Tokens) Authentication & Cookie Storage',
          'Password Hashing with bcrypt & Salt Rounds',
          'Role-Based Access Control (RBAC) Middleware',
          'Environment Variables & Production Config',
          'Deploying Backend on Render/Railway & Frontend on Vercel'
        ]
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
        title: 'Module 1: C++ STL Mastery, Memory & Complexity Analysis',
        description: 'Vectors, maps, sets, priority queues, iterators, and asymptotic notation analysis.',
        topics: [
          'Big-O Time & Space Complexity Analysis',
          'Vectors, Deque, Lists & Capacity Allocation',
          'Ordered Maps/Sets vs Unordered Hash Tables',
          'Custom STL Comparators & Iterators',
          'Pointers, References & Dynamic Memory Allocation'
        ]
      },
      {
        title: 'Module 2: Arrays, Strings, Two-Pointer & Sliding Window',
        description: 'Master fundamental linear data structure techniques for interview problem solving.',
        topics: [
          'Subarray & Substring Search Patterns',
          'Two-Pointer Technique (Opposite & Same Direction)',
          'Sliding Window (Fixed vs Variable Size)',
          'Prefix Sum Arrays & Difference Arrays',
          'Kadane\'s Algorithm & Matrix Traversals'
        ]
      },
      {
        title: 'Module 3: Recursion, Backtracking & Linked Lists',
        description: 'Call stack visualization, combinatorial search, and pointer manipulations.',
        topics: [
          'Recursion Call Stack & Base Case Design',
          'Backtracking: N-Queens, Subsets & Sudoku Solver',
          'Single & Doubly Linked List Operations',
          'Fast & Slow Pointer Cycle Detection Pattern',
          'Monotonic Stack & Queue Applications'
        ]
      },
      {
        title: 'Module 4: Binary Trees, BST & Priority Queues',
        description: 'Hierarchical structure traversals, BST properties, and heap algorithms.',
        topics: [
          'Binary Tree Traversals (DFS & Level-Order BFS)',
          'BST Search, Insertion, Deletion & Validation',
          'Lowest Common Ancestor (LCA) in Trees',
          'Max/Min Heap Operations & Priority Queue',
          'Tries & Prefix Search Optimization'
        ]
      },
      {
        title: 'Module 5: Graphs & Dynamic Programming',
        description: 'Graph traversals, shortest path algorithms, and memoization DP.',
        topics: [
          'Graph Adjacency List Representation & BFS/DFS',
          'Dijkstra\'s & Bellman-Ford Shortest Path Algorithms',
          'Disjoint Set Union (DSU) & Kruskal\'s MST',
          '1D Dynamic Programming (Climbing Stairs, Coin Change)',
          '2D Dynamic Programming (LCS, Knapsack & Edit Distance)'
        ]
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
        title: 'Module 1: Java OOP Mechanics & JCF Memory Architecture',
        description: 'Classes, Inheritance, Generics, ArrayList, HashMap, and TreeSet internals.',
        topics: [
          'JVM, JRE & JDK Architecture & Garbage Collection',
          'Inheritance, Interfaces & Abstract Classes',
          'Heap vs Stack Memory Allocation & References',
          'Java Generics, Wildcards & Custom Comparators',
          'StringBuilder & String Pool Optimizations'
        ]
      },
      {
        title: 'Module 2: Java Collections Framework (JCF) Deep Dive',
        description: 'Internal implementations of List, Set, Map, and Queue interfaces.',
        topics: [
          'ArrayList vs LinkedList Performance Mechanics',
          'HashMap Internal Bucketing & Hash Collision Resolution',
          'TreeMap & TreeSet Red-Black Tree Guarantees',
          'PriorityQueue Heap Implementations in Java',
          'ArrayDeque vs Stack for Queue Operations'
        ]
      },
      {
        title: 'Module 3: Sorting, Searching & Linear Problem Patterns',
        description: 'Binary search variants, sorting algorithms, and pointer techniques.',
        topics: [
          'Binary Search on Answer Space Pattern',
          'MergeSort & QuickSort In-place Algorithms',
          'Two-Pointers & Sliding Window Patterns in Java',
          'Prefix Sum & HashMap Subarray Lookup Tricks'
        ]
      },
      {
        title: 'Module 4: Trees, Graphs & Heaps in Java',
        description: 'Tree traversals, graph algorithms, and heap data structures.',
        topics: [
          'Binary Tree Level Order BFS & Boundary Traversals',
          'Binary Search Tree (BST) Operations & Validation',
          'Graph Representation using Adjacency Lists',
          'Graph BFS, DFS & Cycle Detection in Directed Graphs',
          'Dijkstra Shortest Path with PriorityQueue'
        ]
      },
      {
        title: 'Module 5: Dynamic Programming & Placement Interview Prep',
        description: 'Recursion, memoization, tabular DP, and system design basics.',
        topics: [
          'Recursion & Backtracking in Java',
          'Top-Down Memoization Dynamic Programming',
          'Bottom-Up Tabular Matrix DP',
          'System Design Principles & OOP Interview Walkthroughs'
        ]
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
        title: 'Module 1: Python & JS Engine Mechanisms for DSA',
        description: 'Master built-in data structures, list comprehensions, slicing, Map, Set, and Object key lookups.',
        topics: [
          'Python Lists, Dicts, Counter & collections.deque',
          'JS Map, Set, Array Methods & Object Key Lookups',
          'Big-O Complexity & Memory Footprint in Py/JS',
          'Recursion Call Stack & Tail Call Optimization'
        ]
      },
      {
        title: 'Module 2: Arrays, Strings, HashMaps & Two-Pointers',
        description: 'Efficient string manipulation, frequency maps, two-pointers, and sliding window patterns.',
        topics: [
          'Two-Pointer Traversal Technique',
          'Sliding Window (Fixed & Variable Size)',
          'HashMap & HashSet Lookup Strategies',
          'Subarray Sum & Prefix Frequency Patterns'
        ]
      },
      {
        title: 'Module 3: Linked Lists, Stacks & Queues',
        description: 'Pointer/Reference nodes in JS/Python, Stack & Queue applications.',
        topics: [
          'Single & Doubly Linked List Operations',
          'Fast & Slow Pointer Cycle Detection',
          'Stack Implementation with Lists/Arrays',
          'Monotonic Stack & Queue Problems'
        ]
      },
      {
        title: 'Module 4: Trees, BST & Graph Traversals',
        description: 'Binary Tree traversals, BST search, and graph algorithms.',
        topics: [
          'Binary Tree Traversals & Depth Calculation',
          'BST Search, Insert & Validation',
          'Graph Adjacency List & Matrix Representation',
          'Graph BFS & DFS Algorithms'
        ]
      },
      {
        title: 'Module 5: Dynamic Programming & Interview Sets',
        description: 'Top-down memoization, bottom-up DP, and interview problem sets.',
        topics: [
          'Top-Down Memoization Patterns',
          'Bottom-Up Tabulation Matrices',
          'Standard DP Problems (Knapsack, LCS, LIS)',
          'Top 50 LeetCode Medium/Hard Walkthroughs'
        ]
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
        title: 'Module 1: Networking Fundamentals, Protocols & Reconnaissance',
        description: 'OSI Model, TCP/IP Protocols, Port Scanning with Nmap, and Wireshark Packet Analysis.',
        topics: [
          'OSI 7-Layer Model & TCP/IP Protocol Stack',
          'Linux CLI Utilities for Cyber Security Engineers',
          'Nmap Port Scanning, OS Fingerprinting & Service Enum',
          'Wireshark Packet Sniffing & Traffic Analysis'
        ]
      },
      {
        title: 'Module 2: Web Application Security & OWASP Top 10',
        description: 'Burp Suite proxy, SQL Injection, Cross-Site Scripting (XSS), CSRF, and Authentication Bypasses.',
        topics: [
          'Burp Suite Setup & HTTP Request Interception',
          'SQL Injection (SQLi) Exploitation & Prevention',
          'Cross-Site Scripting (XSS) Stored/Reflected Attacks',
          'CSRF, Session Hijacking & Broken Authentication'
        ]
      },
      {
        title: 'Module 3: System Penetration Testing & Metasploit',
        description: 'Vulnerability assessment, privilege escalation, Metasploit framework, and reporting.',
        topics: [
          'Vulnerability Assessment & CVE Identification',
          'Metasploit Framework Exploitation & Payloads',
          'Privilege Escalation in Linux & Windows Systems',
          'Password Cracking with John the Ripper / Hashcat'
        ]
      },
      {
        title: 'Module 4: Bug Bounty Workflows, Cryptography & Defense',
        description: 'Recon methodology, cryptography, security headers, and penetration report writing.',
        topics: [
          'Recon Methodology (Subdomain Enum, Asset Mapping)',
          'Cryptography (AES, RSA, SHA-256 Hashing)',
          'Web Security Headers, CORS & CSP Policies',
          'Writing Professional Penetration Testing Reports'
        ]
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
        title: 'Module 1: Dart Programming Language & Flutter Basics',
        description: 'Dart syntax, Async programming, Layout widgets, Material Design & Cupertino components.',
        topics: [
          'Dart Variables, Functions, Mixins & OOP',
          'Async Programming (Futures & Streams) in Dart',
          'Stateless vs Stateful Widgets Lifecycle',
          'Material Design 3 UI Components & Icons'
        ]
      },
      {
        title: 'Module 2: Layouts, Forms & Responsive UI Design',
        description: 'Managing layouts, forms, theme configuration, and responsive screens.',
        topics: [
          'Container, Row, Column & Flex Alignment',
          'ListView, GridView & CustomScrollView Builders',
          'Form Validation & Custom User Inputs',
          'Dark Mode & Theme Configuration'
        ]
      },
      {
        title: 'Module 3: State Management with Provider & Riverpod',
        description: 'Managing complex application state cleanly.',
        topics: [
          'State Management Fundamentals & Lifted State',
          'Provider Setup & Consumer Widgets',
          'Riverpod StateNotifier & Providers',
          'BLoC Pattern Architecture Overview'
        ]
      },
      {
        title: 'Module 4: REST API Integration & Local Storage',
        description: 'HTTP requests, JSON parsing, and local databases.',
        topics: [
          'HTTP Package & JSON Deserialization',
          'Handling Loading States & Error Handlers',
          'Local Storage with Shared Preferences',
          'Hive NoSQL Local Database'
        ]
      },
      {
        title: 'Module 5: Firebase Integration & App Store Deployment',
        description: 'Firebase Auth, Firestore, FCM Push Notifications, and Play/App Store releases.',
        topics: [
          'Firebase Auth (Email/Password & Google Sign-In)',
          'Cloud Firestore Realtime Database CRUD',
          'Firebase Cloud Messaging (FCM) Push Notifications',
          'Building Release APKs & Play Store Guidelines'
        ]
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
        topics: [
          'Python Setup, Variables & Primitive Data Types',
          'Conditional Statements (if-elif-else) & Logic',
          'Loops (for, while) & Range Functions',
          'Functions, Lambda Expressions & Scope'
        ]
      },
      {
        title: 'Module 2: Data Structures & Advanced Python Concepts',
        description: 'Lists, Tuples, Dictionaries, Sets, and Module management.',
        topics: [
          'Lists, Tuples, Dictionaries & Sets Manipulation',
          'List & Dictionary Comprehensions',
          'String Formatting & Regex Matching',
          'Modules, Packages & Virtual Environments'
        ]
      },
      {
        title: 'Module 3: Object-Oriented Programming (OOP) & Exceptions',
        description: 'Classes, Inheritance, Exception Handling, and File I/O.',
        topics: [
          'Classes, Objects & Constructors (__init__)',
          'Inheritance, Method Overriding & Polymorphism',
          'Exception Handling (try-except-finally)',
          'File I/O & Context Managers (with statement)'
        ]
      },
      {
        title: 'Module 4: NumPy & Pandas for AI & Data Science',
        description: 'Vector arrays, DataFrames, and data wrangling.',
        topics: [
          'NumPy Ndarrays, Slicing & Broadcasting',
          'Pandas Series & DataFrames',
          'Data Cleaning & Missing Value Handling',
          'Merging, Grouping & Aggregating Data'
        ]
      },
      {
        title: 'Module 5: Matplotlib, Seaborn & Intro to ML',
        description: 'Visualizations and machine learning introductory scripts.',
        topics: [
          'Matplotlib Line Plots, Bar Charts & Histograms',
          'Seaborn Heatmaps & Statistical Charts',
          'Feature Scaling & Train-Test Split',
          'Building First Scikit-Learn Machine Learning Script'
        ]
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
        title: 'Module 1: Core DSA Algorithms & Problem-Solving',
        description: 'Problem-solving patterns, Arrays, HashMaps, Trees, Graphs, and DP.',
        topics: [
          'Sliding Window & Two-Pointer Patterns',
          'HashMaps & Frequency Counter Tricks',
          'Binary Trees & BST Operations',
          'Graph BFS & DFS Traversals',
          'Dynamic Programming Fundamentals'
        ]
      },
      {
        title: 'Module 2: Generative AI & LLM Foundations',
        description: 'Transformer architecture, self-attention, tokenization, and prompt engineering.',
        topics: [
          'Transformer Architecture & Self-Attention',
          'Tokenization, Context Windows & Embeddings',
          'Zero-shot, Few-shot & Chain-of-Thought Prompting',
          'System Prompts & Temperature Tuning'
        ]
      },
      {
        title: 'Module 3: OpenAI & Gemini API Integrations',
        description: 'SDK integration, text/chat generation, function calling, and streaming.',
        topics: [
          'SDK Setup & API Authentication',
          'Generating Text, Chat Completion & JSON Parsing',
          'Function Calling & Tool Execution',
          'Streaming Responses in Real-Time'
        ]
      },
      {
        title: 'Module 4: Vector Databases & RAG Pipelines',
        description: 'Embeddings, ChromaDB, Pinecone, and RAG retrieval.',
        topics: [
          'Text Embedding Generation & Similarity Metrics',
          'Vector Databases (ChromaDB & Pinecone)',
          'Document Chunking & Indexing Strategies',
          'Building Retrieval-Augmented Generation (RAG) Pipelines'
        ]
      },
      {
        title: 'Module 5: LangChain, AI Agents & Autonomous Workflows',
        description: 'Chains, memory, custom tools, and AI agents.',
        topics: [
          'LangChain Chains & Memory Modules',
          'Custom Tool Creation for AI Agents',
          'ReAct Agent Frameworks',
          'Building Production GenAI Applications'
        ]
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
        topics: [
          'Transformers & Tokenization Mechanics',
          'System Prompts & Few-Shot In-Context Learning',
          'Chain-of-Thought & ReAct Reasoning Patterns',
          'API Rate Limiting & Retry Strategies'
        ]
      },
      {
        title: 'Module 2: Vector Databases, Embeddings & RAG Architectures',
        description: 'Creating document embeddings, semantic search, vector indexing in ChromaDB/Pinecone, and RAG retrieval.',
        topics: [
          'Text Embedding Models & Vector Spaces',
          'ChromaDB & Pinecone Setup & Indexing',
          'Document Chunking & Metadata Filtering',
          'RAG Pipeline Construction & Evaluation'
        ]
      },
      {
        title: 'Module 3: LangChain Framework & Custom Tools',
        description: 'Building multi-step AI agents with custom tools, Function Calling, and memory modules.',
        topics: [
          'LangChain Core Abstractions & Chains',
          'Conversation Buffer & Summary Memory',
          'Custom Tool Binding & Function Calling',
          'Multi-Agent Coordination Workflows'
        ]
      },
      {
        title: 'Module 4: Fine-Tuning Open Source Models & Production Deployment',
        description: 'Fine-tuning Llama 3/Mistral, LoRA, QLoRA, and cloud hosting.',
        topics: [
          'Fine-Tuning Open Source LLMs (Llama 3, Mistral)',
          'LoRA & QLoRA Quantization Techniques',
          'GGUF & AWQ Model Formats',
          'Deploying GenAI Apps on Cloud Infrastructure'
        ]
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
        topics: [
          'Pandas Data Wrangling & Cleaning',
          'NumPy High-Performance Matrix Computations',
          'Seaborn & Plotly Data Visualization',
          'Descriptive & Inferential Statistics'
        ]
      },
      {
        title: 'Module 2: Machine Learning & Deep Neural Networks',
        description: 'Supervised/Unsupervised Machine Learning algorithms, Scikit-Learn pipelines, and PyTorch deep learning.',
        topics: [
          'Supervised Learning (Regression & Classification)',
          'Unsupervised Learning (K-Means & PCA)',
          'Model Evaluation, ROC-AUC & Cross-Validation',
          'PyTorch Neural Network Architecture'
        ]
      },
      {
        title: 'Module 3: Natural Language Processing (NLP) & Transformers',
        description: 'Text preprocessing, embeddings, and Transformer models.',
        topics: [
          'Text Preprocessing & TF-IDF Vectors',
          'Word Embeddings (Word2Vec, GloVe)',
          'Recurrent Neural Networks (RNN/LSTM)',
          'Transformer Architecture & Hugging Face'
        ]
      },
      {
        title: 'Module 4: Generative AI, RAG Systems & LangChain Agents',
        description: 'LLM fine-tuning, Prompt engineering, RAG vector pipelines, and LangChain AI Agents.',
        topics: [
          'Large Language Model Mechanics',
          'Prompt Engineering Best Practices',
          'RAG Architecture with Vector Databases',
          'Building Autonomous AI Agents with LangChain'
        ]
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
        title: 'Module 1: Math & Python Data Science Stack',
        description: 'Data manipulation, linear algebra, matrix operations, and feature scaling.',
        topics: [
          'Linear Algebra & Calculus for ML',
          'NumPy Ndarrays & Vectorization',
          'Pandas DataFrames & Data Cleaning',
          'Matplotlib & Seaborn Visualizations'
        ]
      },
      {
        title: 'Module 2: Supervised Machine Learning Algorithms',
        description: 'Linear Regression, Logistic Regression, Decision Trees, Random Forests, XGBoost.',
        topics: [
          'Linear & Logistic Regression Models',
          'Decision Trees & Random Forests',
          'Support Vector Machines (SVM)',
          'XGBoost & Gradient Boosting Algorithms'
        ]
      },
      {
        title: 'Module 3: Unsupervised Learning & Model Optimization',
        description: 'Clustering, PCA, Cross-Validation, and Scikit-Learn pipelines.',
        topics: [
          'K-Means & Hierarchical Clustering',
          'Principal Component Analysis (PCA)',
          'Cross-Validation & Hyperparameter Tuning',
          'Scikit-Learn Pipelines & Model Persistence'
        ]
      },
      {
        title: 'Module 4: Deep Learning & PyTorch Framework',
        description: 'Perceptrons, Backpropagation, CNNs, and PyTorch tensors.',
        topics: [
          'Artificial Neural Networks (ANN) & Loss Functions',
          'Backpropagation & Gradient Descent',
          'Convolutional Neural Networks (CNN) for CV',
          'PyTorch Tensors, Datasets & Training Loops'
        ]
      },
      {
        title: 'Module 5: Transformers, Hugging Face & Fine-Tuning LLMs',
        description: 'Attention mechanisms, pretrained models, and LLM fine-tuning.',
        topics: [
          'Attention Mechanisms & Transformer Encoder/Decoder',
          'Hugging Face Hub & Pretrained Models',
          'Fine-Tuning Models on Custom Datasets',
          'Evaluating Model Performance in Production'
        ]
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
        topics: [
          'Advanced Formulas (XLOOKUP, INDEX-MATCH, LET, FILTER)',
          'Dynamic Pivot Tables, Slicers & Calculated Fields',
          'Power Query Data Transformation & Cleaning',
          'Executive Interactive Dashboard Design'
        ]
      },
      {
        title: 'Module 2: SQL Data Querying & Database Analytics',
        description: 'SELECT queries, Filtering, JOINs, Grouping, Aggregations, Subqueries, CTEs, and Window Functions.',
        topics: [
          'SELECT, WHERE, ORDER BY & Aggregations',
          'Multi-Table INNER/LEFT/FULL JOINs',
          'GROUP BY, HAVING & Subqueries',
          'Common Table Expressions (CTEs)',
          'Window Functions (ROW_NUMBER, RANK, LEAD/LAG)'
        ]
      },
      {
        title: 'Module 3: Power BI & Data Visualization',
        description: 'Data modeling, DAX measures, interactive dashboard builds, and storytelling.',
        topics: [
          'Data Modeling & Star Schema Architecture',
          'DAX Formulas (CALCULATE, SUMX, DATESYTD)',
          'Building Interactive Dashboards in Power BI',
          'Storytelling with Data & KPI Cards'
        ]
      },
      {
        title: 'Module 4: Python Exploratory Data Analysis (EDA)',
        description: 'Pandas data wrangling, Seaborn charts, and business case studies.',
        topics: [
          'Python Pandas Data Wrangling',
          'Cleaning Missing & Duplicate Data',
          'Matplotlib & Seaborn Exploratory Charts',
          'Business Case Studies & Portfolio Building'
        ]
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
        title: 'Module 1: Linux Administration, Shell Scripting & Git',
        description: 'Command line utilities, permissions, process management, bash automation scripts, and Git branching.',
        topics: [
          'Linux CLI Commands, Permissions & Process Management',
          'Bash Shell Scripting & Automation',
          'Git Branching, Merging, Rebasing & Pull Requests',
          'SSH Keys, Firewall & Server Hardening'
        ]
      },
      {
        title: 'Module 2: Docker Containers & Multi-Container Stacks',
        description: 'Container images, Dockerfiles, Docker Compose, and networking.',
        topics: [
          'Docker Architecture & Image Creation',
          'Dockerfile Best Practices & Multi-Stage Builds',
          'Managing Containers, Networks & Volumes',
          'Docker Compose Multi-Container Microservices'
        ]
      },
      {
        title: 'Module 3: Kubernetes Cluster Orchestration',
        description: 'Kubernetes Pods, Services, Deployments, and Helm package manager.',
        topics: [
          'Kubernetes Architecture (Control Plane & Worker Nodes)',
          'Pods, Deployments & ReplicaSets',
          'K8s Services, NodePort, ClusterIP & Ingress Controllers',
          'ConfigMaps, Secrets & Helm Package Manager'
        ]
      },
      {
        title: 'Module 4: CI/CD Pipelines, Infrastructure as Code & Cloud',
        description: 'GitHub Actions, Jenkins, Terraform IaC, Ansible, and AWS Cloud hosting.',
        topics: [
          'GitHub Actions Workflows & Automated Testing',
          'Jenkins Pipeline Setup & Integration',
          'Terraform Infrastructure as Code (IaC) Provisioning',
          'Ansible Configuration Management',
          'AWS EC2, S3 & EKS Cluster Deployments'
        ]
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
        title: 'Module 1: JavaScript, TypeScript & React/Next.js Architecture',
        description: 'Deep dive into JS internals, async programming, TypeScript types, React 18, and Next.js App Router.',
        topics: [
          'Callbacks, Promises, Event Loop & Async/Await',
          'TypeScript Generics, Interfaces & Strict Typing',
          'React 18 Custom Hooks & State Optimization',
          'Next.js 14 App Router & Server Components'
        ]
      },
      {
        title: 'Module 2: Backend Microservices with Node, PostgreSQL & Prisma',
        description: 'RESTful API microservices, relational database modeling, Prisma ORM, JWT auth, and middleware.',
        topics: [
          'RESTful API Microservices with Express',
          'PostgreSQL Relational Database Modeling',
          'Prisma ORM Migrations, Indexing & Relations',
          'JWT Authentication & Security Headers'
        ]
      },
      {
        title: 'Module 3: Real-Time WebSockets, WebRTC & Monorepos',
        description: 'Real-time communication, Turborepo monorepos, and WebRTC streaming.',
        topics: [
          'Real-Time Bidirectional WebSockets',
          'WebRTC Video/Audio P2P Streaming',
          'Turborepo Monorepo Architecture',
          'State Management & Recoil'
        ]
      },
      {
        title: 'Module 4: Docker, CI/CD, System Design & Open Source',
        description: 'Containerization, automated pipelines, system design, and open source PRs.',
        topics: [
          'Docker Containerization & Networking',
          'Automated CI/CD Pipelines',
          'System Design & Rate Limiting',
          'Open Source Contribution Guidelines & PRs'
        ]
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
        title: 'Module 1: Web Development & Microservice Backend',
        description: 'Next.js App Router, TypeScript, PostgreSQL, Prisma, serverless functions, and state management.',
        topics: [
          'Next.js 15 App Router & Server Actions',
          'Relational Schemas in PostgreSQL & Prisma',
          'Serverless Architectures & Cloudflare Workers',
          'Custom Middleware & Security Policies'
        ]
      },
      {
        title: 'Module 2: DevOps, Kubernetes, Redis, Kafka & Distributed Systems',
        description: 'Scaling backend services, caching layers with Redis, message queues with Kafka, and Kubernetes management.',
        topics: [
          'Redis Caching, Pub/Sub & Rate Limiting',
          'Kafka Message Queues & Event Streaming',
          'Kubernetes Deployment, Auto-Scaling & Ingress',
          'Prometheus & Grafana Monitoring'
        ]
      },
      {
        title: 'Module 3: Systems Programming in Rust & Web3 Blockchain',
        description: 'Rust programming fundamentals, Solana/Ethereum smart contracts, decentralized apps (dApps), and cryptography.',
        topics: [
          'Rust Ownership, Borrowing, Lifetimes & Enums',
          'Smart Contract Development on Solana/Anchor',
          'Building Decentralized Apps (dApps)',
          'Web3 Security Audits & Cryptography'
        ]
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
        title: 'Module 1: C++ DSA & Competitive Problem Solving',
        description: 'Arrays, Strings, Linked Lists, Trees, Graphs, DP, and Competitive Programming.',
        topics: [
          'Two Pointers & Sliding Window Patterns',
          'Recursion & Backtracking Algorithms',
          'Binary Trees, BST & Graph Traversals',
          'Dynamic Programming & Memoization'
        ]
      },
      {
        title: 'Module 2: Full-Stack Web Development & Blockchain',
        description: 'React, Node.js, Express, MongoDB, Web3, Ethereum & Smart Contracts.',
        topics: [
          'React & Node.js Microservices',
          'REST API & JWT Authentication',
          'Solidity Smart Contracts & Ethereum Virtual Machine',
          'Web3.js & dApp Frontend Integration'
        ]
      },
      {
        title: 'Module 3: System Design (LLD & HLD) Architecture',
        description: 'Design patterns, OOP principles, DB sharding, caching, microservices & rate limiters.',
        topics: [
          'SOLID Design Principles & Design Patterns',
          'Scalable Microservice Architecture',
          'Database Sharding, Replication & Caching',
          'Building Distributed Systems & Rate Limiters'
        ]
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
        title: 'Module 1: C++ STL & Linear Data Structures',
        description: 'Pointers, memory management, STL containers, Arrays, Strings, Searching & Sorting.',
        topics: [
          'C++ STL Vectors, Maps, Sets & Iterators',
          'Binary Search Variants & Matrix Operations',
          'Two Pointers & Sliding Window Patterns',
          'Linked List Construction & Inversion'
        ]
      },
      {
        title: 'Module 2: Stacks, Queues, Trees & Heaps',
        description: 'Stack-Queue algorithms, Binary Trees, BST, Heaps, and Priority Queues.',
        topics: [
          'Stack Evaluation & Monotonic Stack',
          'Binary Tree Traversals, Views & LCA',
          'Max/Min Heap Construction & Priority Queues',
          'Tries & Prefix Tree Operations'
        ]
      },
      {
        title: 'Module 3: Graphs, Backtracking & Dynamic Programming',
        description: 'Graph algorithms, shortest path, backtracking, and 1D/2D DP optimization.',
        topics: [
          'Graph BFS, DFS & Topological Sort',
          'Dijkstra & Minimum Spanning Trees',
          'N-Queens & Backtracking Problems',
          '1D & 2D Dynamic Programming Patterns'
        ]
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
        title: 'Module 1: Bit Manipulation, Recursion & Linear Structures',
        description: 'Complexity analysis, Bitwise operations, Recursion, Backtracking, and Linear Structures.',
        topics: [
          'Bitwise Tricks & XOR Operations',
          'Recursion Tree Analysis & Backtracking',
          'Arrays, Strings & Matrix Rotations',
          'Stack & Queue Applications'
        ]
      },
      {
        title: 'Module 2: Trees, Graph Algorithms & Advanced DP',
        description: 'LCA in Trees, Graph Algorithms, Tarjan/Bridges, and 2D/3D DP.',
        topics: [
          'Lowest Common Ancestor (LCA) in Trees',
          'Bridges & Articulation Points in Graphs',
          'DP on Trees & Grids',
          'Digit DP & Bitmask Dynamic Programming'
        ]
      },
      {
        title: 'Module 3: Advanced Data Structures (Segment/Fenwick) & LLD',
        description: 'Range queries with Segment Trees, Fenwick Trees, String Algorithms, and LLD.',
        topics: [
          'Segment Trees with Lazy Propagation',
          'Fenwick Trees (Binary Indexed Tree)',
          'KMP & Z-Algorithm for String Pattern Matching',
          'Low-Level System Design (LLD) Patterns'
        ]
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
        title: 'Module 1: Low-Level Design (LLD) & Design Patterns',
        description: 'SOLID design principles, design patterns, and UML class diagrams.',
        topics: [
          'SOLID Principles & Clean Code Standards',
          'Creational, Structural & Behavioral Patterns',
          'Class Diagrams & Object-Oriented Modeling',
          'LLD Case Studies: Parking Lot & Elevator System'
        ]
      },
      {
        title: 'Module 2: High-Level System Design (HLD) & Distributed Systems',
        description: 'Scalability fundamentals, Load Balancing, CAP Theorem, and Consistent Hashing.',
        topics: [
          'Horizontal vs Vertical Scaling & Load Balancers',
          'CAP & PACELC Theorems',
          'Consistent Hashing & Data Partitioning',
          'Database Sharding, Replication & CAP'
        ]
      },
      {
        title: 'Module 3: Caching, Message Queues & System Architectures',
        description: 'Redis caching strategies, Kafka message queues, and case studies.',
        topics: [
          'Redis Cache Strategies (Cache-Aside, Write-Through)',
          'Kafka Event Streaming & Message Queues',
          'Designing Distributed Rate Limiters',
          'HLD Case Studies: WhatsApp, Uber & YouTube'
        ]
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
        topics: [
          'Node.js Architecture & V8 Engine',
          'Asynchronous Non-blocking I/O & Event Loop',
          'File System (FS) & Event Emitters',
          'Streams, Buffers & Pipeline Handling'
        ]
      },
      {
        title: 'Module 2: Express.js Framework & MongoDB Database',
        description: 'Routing, custom middleware, error handling, MongoDB connection, Mongoose validation, and CRUD operations.',
        topics: [
          'Express Routing & Middleware Pipelines',
          'MongoDB Setup & Mongoose Schemas',
          'Database Indexing & Aggregation Pipelines',
          'Centralized Error Handling & Validation'
        ]
      },
      {
        title: 'Module 3: Authentication, WebSockets & Capstone Backend Project',
        description: 'JWT Auth, bcrypt password hashing, Socket.io real-time chat, file uploads (Multer/Cloudinary), and production deployment.',
        topics: [
          'JWT Authentication & Cookie Sessions',
          'Real-Time Communication with WebSockets',
          'File Uploads with Multer & Cloudinary',
          'Full Capstone E-Commerce REST API Deployment'
        ]
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
        topics: [
          'Spring Boot Architecture & Auto-configuration',
          'Spring Data JPA & Entity Relationships',
          'REST API Design & Swagger/OpenAPI Specs',
          'Exception Handling & Input Validation'
        ]
      },
      {
        title: 'Module 2: Spring Cloud Ecosystem & Microservice Patterns',
        description: 'Service discovery with Eureka, Centralized Config Server, Spring Cloud Gateway, Resilience4j, and Kafka messaging.',
        topics: [
          'Eureka Service Registry & Discovery',
          'Spring Cloud Gateway Routing & Security',
          'Resilience4j Circuit Breaker & Rate Limiting',
          'Event-Driven Microservices with Kafka'
        ]
      },
      {
        title: 'Module 3: Docker Containerization & Kubernetes Orchestration',
        description: 'Building OCI Docker images, Docker Compose multi-container environments, Kubernetes deployment, and ConfigMaps/Secrets.',
        topics: [
          'Dockerizing Spring Boot Applications',
          'Docker Compose Microservice Stacks',
          'Kubernetes Deployments, Pods & Services',
          'K8s ConfigMaps, Secrets & Helm Charts'
        ]
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
        topics: [
          'JVM, JRE & JDK Architecture',
          'Data Types & Control Flow Statements',
          'Classes, Objects & Constructors',
          'Encapsulation & Access Modifiers'
        ]
      },
      {
        title: 'Module 2: Advanced OOPs, Interfaces & Exception Handling',
        description: 'Inheritance, Polymorphism, Abstraction, Interfaces, Packages, and Custom Exception Handling.',
        topics: [
          'Method Overloading & Overriding',
          'Abstract Classes & Interfaces',
          'Exception Handling with Try-Catch-Finally',
          'Custom Exceptions & Packages'
        ]
      },
      {
        title: 'Module 3: Java Collections Framework, Streams & Multithreading',
        description: 'ArrayList, LinkedList, HashMap, HashSet, Iterators, Lambda expressions, Streams API, and Threads.',
        topics: [
          'ArrayList, HashSet & HashMap Mastery',
          'Generics & Iterators',
          'Java 8 Lambdas & Stream API',
          'Multithreading & Concurrency Basics'
        ]
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
        topics: [
          'MLOps Lifecycle & Project Architecture',
          'Data Version Control (DVC) Pipelines',
          'MLflow Experiment Tracking & Logging',
          'Model Packaging & Registry'
        ]
      },
      {
        title: 'Module 2: Model Serving, Containerization & CI/CD',
        description: 'FastAPI model endpoints, Docker containerization, BentoML serving, and GitHub Actions CI/CD workflows.',
        topics: [
          'FastAPI & Flask REST Endpoints for ML Models',
          'Dockerizing ML Pipelines & Containers',
          'BentoML & Triton Model Server',
          'GitHub Actions CI/CD Automation'
        ]
      },
      {
        title: 'Module 3: Cloud Deployment (AWS) & Model Monitoring',
        description: 'Deploying ML pipelines on AWS EC2/ECR/S3, monitoring data drift, Evidently AI, and 10+ Capstone Projects.',
        topics: [
          'AWS EC2, S3 & ECR Deployment Pipelines',
          'Data & Concept Drift Monitoring with Evidently AI',
          'Prometheus & Grafana ML Dashboards',
          '10+ Industry Capstone ML Project Walkthroughs'
        ]
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
        topics: [
          'Tenses & Practical Grammar Rules',
          'Building Everyday English Vocabulary',
          'Correct Pronunciation & Phonetics',
          'Eliminating Hesitation & Fear of Speaking'
        ]
      },
      {
        title: 'Module 2: Fluency, Conversation & Accent Building',
        description: 'Real-life conversation scenarios (shopping, traveling, office), thought framing in English, and accent neutralization.',
        topics: [
          'Framing Thoughts Directly in English',
          'Real-Life Conversation Roleplays',
          'Accent Neutralization & Voice Modulation',
          'Listening Comprehension & Expressive Speaking'
        ]
      },
      {
        title: 'Module 3: Professional English, Interviews & Public Speaking',
        description: 'Job interview preparation, corporate presentation skills, email writing etiquettes, and public speaking confidence.',
        topics: [
          'Job Interview Q&A Mastery',
          'Corporate Email Writing & Business Etiquettes',
          'Public Speaking & Presentation Skills',
          'Group Discussion (GD) Strategies'
        ]
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
        topics: [
          'Execution Context & Call Stack',
          'Hoisting, Let, Var & Const TDZ',
          'Lexical Scope & Closure Patterns',
          'ES6+ Destructuring, Rest/Spread & Modules'
        ]
      },
      {
        title: 'Module 2: Asynchronous JS, Promises & Event Loop Deep Dive',
        description: 'Callbacks, Promises, Async/Await, Microtask vs Macrotask Queue, and Event Loop.',
        topics: [
          'Event Loop & Event Queue Mechanics',
          'Promises Chaining & Error Handling',
          'Async/Await & Try-Catch Best Practices',
          'Building Custom Polyfills (Promise.all, Race)'
        ]
      },
      {
        title: 'Module 3: Prototypal Inheritance, DOM & Machine Coding Interviews',
        description: 'Prototypes, class syntax, DOM event delegation, debouncing, throttling, and machine coding problems.',
        topics: [
          'Prototype Chain & Object Inheritance',
          'DOM Event Delegation, Bubbling & Capturing',
          'Debouncing, Throttling & Currying',
          'Top 50 Machine Coding & Output Interview Questions'
        ]
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
        topics: [
          'Big-O Notation & Memory Footprint in Python',
          'Lists, Dicts, Sets & Collections (defaultdict, Counter)',
          'String Manipulation & Regex Tricks',
          'Heapq & Bisect Modules for Fast Searching'
        ]
      },
      {
        title: 'Module 2: Core Data Structures: Linked Lists, Trees & Graphs',
        description: 'Two-Pointers, Fast & Slow pointers, Recursion, Trees, Graphs, BFS/DFS in Python.',
        topics: [
          'Two Pointers & Sliding Window Patterns',
          'Linked Lists & Fast/Slow Pointer Pattern',
          'Binary Trees, BST & Tree Traversals',
          'Graph Adjacency Lists, BFS & DFS'
        ]
      },
      {
        title: 'Module 3: Backtracking, Dynamic Programming & Mock Interview Sets',
        description: 'Recursion, 1D/2D DP, and top Python technical interview problems.',
        topics: [
          'Recursion & Backtracking (Subsets, Permutations)',
          '1D & 2D Dynamic Programming in Python',
          'Top 100 LeetCode Python Interview Problems',
          'Mock Technical Interview Strategies'
        ]
      }
    ]
  }
];
void INLINE_COURSES;

export const CodingCoursesView: React.FC<CodingCoursesViewProps> = ({ user, onNavigateTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  
  // Unlocked courses persistence state
  const [unlockedCourses, setUnlockedCourses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campus_os_unlocked_courses');
      return saved ? JSON.parse(saved) : ['mern-webdev'];
    } catch {
      return ['mern-webdev'];
    }
  });

  // Completed syllabus topics state map (Key: `${courseId}::${topicName}`)
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('campus_os_completed_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Search filter query inside course syllabus detail view
  const [syllabusSearchQuery, setSyllabusSearchQuery] = useState('');

  // Accordion state for modules (open/close)
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true
  });

  // Payment Modal State
  const [payingForCourse, setPayingForCourse] = useState<CourseItem | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<boolean>(false);

  // Sync unlocked courses & completed topics with Firestore on mount
  useEffect(() => {
    if (user && user.uid) {
      FirestoreService.getUserCourseProgress(user.uid).then((progressMap) => {
        if (progressMap && Object.keys(progressMap).length > 0) {
          const unlockedFromDb: string[] = [];
          const completedFromDb: Record<string, boolean> = { ...completedTopics };

          Object.values(progressMap).forEach((pData: any) => {
            if (pData.courseId) {
              unlockedFromDb.push(pData.courseId);
            }
            if (pData.completedTopicIds && Array.isArray(pData.completedTopicIds)) {
              pData.completedTopicIds.forEach((topicKey: string) => {
                completedFromDb[topicKey] = true;
              });
            }
          });

          if (unlockedFromDb.length > 0) {
            setUnlockedCourses((prev) => {
              const combined = [...new Set([...prev, ...unlockedFromDb])];
              localStorage.setItem('campus_os_unlocked_courses', JSON.stringify(combined));
              return combined;
            });
          }

          setCompletedTopics(completedFromDb);
          localStorage.setItem('campus_os_completed_topics', JSON.stringify(completedFromDb));
        }
      }).catch(err => console.warn("Failed to load user course progress from Firestore:", err));
    }
  }, [user]);

  // Save unlocked courses to localStorage
  useEffect(() => {
    localStorage.setItem('campus_os_unlocked_courses', JSON.stringify(unlockedCourses));
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

  // Toggle individual topic checkbox completion
  const handleToggleTopicCheckbox = (courseId: string, topicName: string) => {
    const topicKey = `${courseId}::${topicName}`;
    const nextValue = !completedTopics[topicKey];

    const updated = {
      ...completedTopics,
      [topicKey]: nextValue
    };

    setCompletedTopics(updated);
    localStorage.setItem('campus_os_completed_topics', JSON.stringify(updated));

    if (user && user.uid) {
      const courseCompletedTopicIds = Object.keys(updated).filter(
        k => k.startsWith(`${courseId}::`) && updated[k]
      );

      FirestoreService.saveUserCourseProgress(user.uid, courseId, {
        completedTopicIds: courseCompletedTopicIds,
        lastTopicUpdated: topicName,
        updatedAt: new Date().toISOString()
      }).catch(e => console.warn("Firestore progress sync warning:", e));
    }
  };

  // Toggle all topics in a module (check all or uncheck all)
  const handleToggleModuleTopics = (courseId: string, moduleTopics: string[], forceCheck: boolean) => {
    const updated = { ...completedTopics };
    moduleTopics.forEach((t) => {
      const topicKey = `${courseId}::${t}`;
      updated[topicKey] = forceCheck;
    });

    setCompletedTopics(updated);
    localStorage.setItem('campus_os_completed_topics', JSON.stringify(updated));

    if (user && user.uid) {
      const courseCompletedTopicIds = Object.keys(updated).filter(
        k => k.startsWith(`${courseId}::`) && updated[k]
      );

      FirestoreService.saveUserCourseProgress(user.uid, courseId, {
        completedTopicIds: courseCompletedTopicIds,
        updatedAt: new Date().toISOString()
      }).catch(e => console.warn("Firestore progress sync warning:", e));
    }
  };

  // Calculate stats for a given course
  const getCourseStats = (course: CourseItem) => {
    let totalTopics = 0;
    let completedCount = 0;

    course.modules.forEach((mod) => {
      mod.topics.forEach((t) => {
        totalTopics++;
        const key = `${course.id}::${t}`;
        if (completedTopics[key]) {
          completedCount++;
        }
      });
    });

    const percentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
    return { totalTopics, completedCount, percentage };
  };

  const activeCourse = COURSES.find((c) => c.id === activeCourseId);

  // Filter logic
  const filteredCourses = selectedCategory === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.category === selectedCategory);

  // -------------------------------------------------------------
  // DETAIL VIEW FOR UNLOCKED / ACTIVE COURSE WITH SYLLABUS CHECKBOXES
  // -------------------------------------------------------------
  if (activeCourse) {
    const isDrive = activeCourse.linkType === 'drive';
    const stats = getCourseStats(activeCourse);

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveCourseId(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </button>

          <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
            <span>Syllabus Progress:</span>
            <span className="font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              {stats.completedCount} / {stats.totalTopics} Topics ({stats.percentage}%)
            </span>
          </div>
        </div>

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

            {/* Syllabus Overall Progress Bar */}
            <div className="pt-2 max-w-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-white/90 font-extrabold">
                <span>Course Syllabus Progress</span>
                <span>{stats.completedCount} of {stats.totalTopics} Topics Completed ({stats.percentage}%)</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 p-0.5 overflow-hidden backdrop-blur-md">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>

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
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Official Resource Access
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                Start Learning & Stream Lectures
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {isDrive 
                  ? 'Access the official Google Drive repository below to stream video lectures, download Jupyter notebooks, and access complete datasets.'
                  : 'Join the official Telegram channel below to access live lecture streams, study materials, project code repositories, and batch announcements.'}
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
                <span>{isDrive ? 'Open Google Drive Folder' : 'Join Telegram Channel'}</span>
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
                {isDrive ? 'Instant access to structured video folders & datasets.' : 'Direct access to mentors and doubt solving with batchmates.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="font-extrabold text-white flex items-center gap-1.5">
                <Video className="w-4 h-4 text-purple-400" /> High Quality Video Classes
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

        {/* DETAILED INTERACTIVE SYLLABUS & CHECKBOX ROADMAP */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-black uppercase tracking-wider mb-2">
                <CheckSquare className="w-3.5 h-3.5" /> Interactive Syllabus Tracker
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Complete Course Syllabus & Topic Tracker
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Mark off topics as you finish studying them. Your progress automatically syncs with Firebase!
              </p>
            </div>

            {/* Syllabus Search Filter */}
            <div className="relative shrink-0 max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search syllabus topics..."
                value={syllabusSearchQuery}
                onChange={(e) => setSyllabusSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Module-by-Module Accordion with Checkboxes */}
          <div className="space-y-6">
            {activeCourse.modules.map((mod, mIdx) => {
              // Filter topics by query if applicable
              const filteredTopics = syllabusSearchQuery
                ? mod.topics.filter(t => t.toLowerCase().includes(syllabusSearchQuery.toLowerCase()))
                : mod.topics;

              if (syllabusSearchQuery && filteredTopics.length === 0) {
                return null;
              }

              // Count completed topics in this module
              const completedInModule = mod.topics.filter(t => completedTopics[`${activeCourse.id}::${t}`]).length;
              const isModuleAllCompleted = completedInModule === mod.topics.length && mod.topics.length > 0;
              const isExpanded = expandedModules[mIdx] !== false;

              return (
                <div 
                  key={mIdx} 
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isModuleAllCompleted 
                      ? 'bg-emerald-50/40 border-emerald-200' 
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  {/* Module Header */}
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/70">
                    <div 
                      onClick={() => setExpandedModules(prev => ({ ...prev, [mIdx]: !isExpanded }))}
                      className="flex items-start gap-3 cursor-pointer select-none flex-1"
                    >
                      <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                        isModuleAllCompleted 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {isModuleAllCompleted ? <CheckCircle2 className="w-5 h-5" /> : `0${mIdx + 1}`}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                          {mod.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{mod.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                        isModuleAllCompleted
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {completedInModule} / {mod.topics.length} Done
                      </span>

                      {/* Toggle All Topics Button */}
                      <button
                        onClick={() => handleToggleModuleTopics(activeCourse.id, mod.topics, !isModuleAllCompleted)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          isModuleAllCompleted
                            ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                      >
                        {isModuleAllCompleted ? 'Uncheck Module' : 'Mark Module Complete'}
                      </button>

                      <button
                        onClick={() => setExpandedModules(prev => ({ ...prev, [mIdx]: !isExpanded }))}
                        className="p-1 rounded-lg hover:bg-slate-200/80 text-slate-500"
                      >
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Module Topics Checkbox List */}
                  {isExpanded && (
                    <div className="p-5 space-y-3 bg-white">
                      {filteredTopics.map((topic, tIdx) => {
                        const topicKey = `${activeCourse.id}::${topic}`;
                        const isChecked = !!completedTopics[topicKey];

                        return (
                          <div
                            key={tIdx}
                            onClick={() => handleToggleTopicCheckbox(activeCourse.id, topic)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                              isChecked
                                ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                                : 'bg-slate-50/50 hover:bg-purple-50/50 border-slate-200/80 hover:border-purple-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div className="shrink-0 transition-transform group-hover:scale-110">
                                {isChecked ? (
                                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                                ) : (
                                  <Square className="w-5 h-5 text-slate-400 group-hover:text-purple-600" />
                                )}
                              </div>

                              <span className={`text-xs sm:text-sm font-bold transition-all ${
                                isChecked ? 'line-through text-slate-500 font-semibold' : 'text-slate-800'
                              }`}>
                                {topic}
                              </span>
                            </div>

                            {isChecked && (
                              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Completed
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA & Progress Summary */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Overall Course Completion: {stats.completedCount} of {stats.totalTopics} Topics ({stats.percentage}%)</span>
            </div>

            <a
              href={activeCourse.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl ${
                isDrive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-purple-600 hover:bg-purple-700'
              } text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer`}
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
  // MAIN COURSES DIRECTORY LIST (ALL COURSES)
  // -------------------------------------------------------------
  const categories = ['All', 'Web Development', 'Data Structures & Algorithms', 'AI & Machine Learning', 'Data Analytics', 'Cyber Security', 'App Development', 'DevOps', 'System Design', 'Soft Skills & Communication'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" /> Interactive Coding Courses & Detailed Syllabi
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your Code & Track Your Syllabus Progress
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Enroll in top-rated structured courses designed by industry experts. Track your topic completion with live interactive checkboxes, access complete syllabus roadmaps, and join official Telegram / Google Drive resources for ₹399 each.
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
          const stats = getCourseStats(course);

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

                  {/* Syllabus Progress Bar on Card if Topics exist */}
                  <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-black text-slate-700">
                      <span className="flex items-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5 text-purple-600" /> Syllabus Progress
                      </span>
                      <span className="text-purple-700">{stats.completedCount}/{stats.totalTopics} Topics ({stats.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${stats.percentage}%` }}
                      />
                    </div>
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
                      <span>{isDrive ? 'Open Syllabus & Drive' : 'Open Syllabus & Telegram'}</span>
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
            <p className="text-xs text-slate-500 font-medium">Pay once to unlock lifetime access to course content, interactive syllabus progress tracking, and official Telegram / Google Drive resources.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-purple-600" /> Complete Syllabi</div>
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
                <div className="text-xs text-purple-500">Includes {payingForCourse.linkType === 'drive' ? 'Google Drive' : 'Telegram channel'} access & interactive syllabus</div>
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
