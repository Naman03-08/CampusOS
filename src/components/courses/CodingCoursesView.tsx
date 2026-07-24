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
import { UserProfile, CertificateRecord } from '../../types';
import confetti from 'canvas-confetti';
import { CertificateCard } from './CertificateCard';
import { CertificateVerificationModal } from './CertificateVerificationModal';
import { FirestoreService } from '../../lib/firestoreService';
import { StreakService } from '../../lib/streakService';

interface CodingCoursesViewProps {
  user: UserProfile;
  onNavigateTab?: (tab: string) => void;
  onUpdateCourseTopics?: () => void;
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
    tagline: 'Master Data Structures & Algorithms alongside LLMs, OpenAI/Gemini APIs, RAG, LangGraph & AI Agents.',
    category: 'AI & Machine Learning',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+oJ52yN2eY4E3YTM1',
    bgGradient: 'from-indigo-600 via-purple-600 to-pink-600',
    accentColor: 'indigo',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: Brain,
    level: 'Beginner to Advanced',
    duration: '12 Weeks Batch',
    description: 'The ultimate combo course combining C++ and Data Structures & Algorithms (DSA) problem solving with modern Generative AI engineering! Learn array patterns, trees, graphs, dynamic programming, LLMs, RAG pipelines, LangChain, LangGraph multi-agent systems, and AWS cloud deployments.',
    features: [
      'Core C++ & DSA Algorithms with 300+ Solved Problems',
      'Generative AI & LLM Engineering Concepts',
      'Retrieval-Augmented Generation (RAG) & Vector DBs',
      'LangChain & LangGraph Multi-Agent Building',
      'Production AWS Cloud Deployment & Capstone AI Agent'
    ],
    modules: [
      {
        title: 'Getting Started: Your Journey Overview',
        description: 'Course structure, setting up your development environment for DSA & AI, balancing practice, and career paths.',
        topics: [
          'Course Structure & Learning Path',
          'Setting up Development Environment for DSA & AI',
          'How to Balance DSA Practice with AI Projects',
          'Career Paths: SWE vs AI Engineer vs Full-Stack AI'
        ]
      },
      {
        title: 'Part 1: C++ & DSA Fundamentals',
        description: 'C++ programming foundations, time & space complexity, arrays, strings, searching, sorting, STL, and OOP concepts.',
        topics: [
          'C++ Programming Foundations',
          'Time & Space Complexity Analysis',
          'Arrays, Strings, and Basic Algorithms',
          'Searching & Sorting Algorithms',
          'STL (Standard Template Library)',
          'Object-Oriented Programming for Data Structures'
        ]
      },
      {
        title: 'Part 2: Data Structures Deep Dive',
        description: 'Linked lists, stacks, queues, binary trees, BST, heaps, hashing, graph representation & traversals, and advanced trees.',
        topics: [
          'Linked Lists, Stacks, Queues',
          'Trees: Binary Trees, BST, Heaps',
          'Hashing and Hash Tables',
          'Graphs: Representation, Traversals',
          'Advanced Trees: AVL, B-Trees',
          '100+ Problems Solved'
        ]
      },
      {
        title: 'Part 3: Advanced Algorithms',
        description: 'Backtracking, greedy algorithms, dynamic programming patterns, shortest path graph algorithms, sliding window, and bit manipulation.',
        topics: [
          'Backtracking & Divide and Conquer',
          'Greedy Algorithms',
          'Dynamic Programming (All patterns)',
          'Graph Algorithms: MST, Shortest Paths, Topological Sort',
          'Sliding Window & Two Pointers',
          'Bit Manipulation',
          '200+ Problems Solved Total'
        ]
      },
      {
        title: 'Part 4: AI Fundamentals & Theory',
        description: 'Introduction to Generative AI, LLMs, tokens, prompts, context windows, deep learning intuition, transformers, and vector databases.',
        topics: [
          'Introduction to Generative AI',
          'Understanding Large Language Models',
          'Tokens, Prompts, and Context Windows',
          'Deep Learning Intuition',
          'Transformer Architecture Deep Dive',
          'Vector Embeddings & Vector Databases'
        ]
      },
      {
        title: 'Part 5: Building AI Applications',
        description: 'LangChain framework mastery, building RAG systems, creating AI agents, tool use, function calling, agent memory, and research assistant project.',
        topics: [
          'LangChain Framework Mastery',
          'Building RAG (Retrieval-Augmented Generation) Systems',
          'Creating Your First AI Agent',
          'Tool Use & Function Calling',
          'Agent Memory Implementation',
          'Project: Research Assistant Agent'
        ]
      },
      {
        title: 'Part 6: Advanced AI & Multi-Agent Systems',
        description: 'LangGraph for complex workflows, multi-agent systems, human-in-the-loop design, graph RAG, multimodal agents, and collaborative team project.',
        topics: [
          'LangGraph for Complex Workflows',
          'Building Multi-Agent Systems',
          'Human-in-the-Loop Design',
          'Graph RAG & Multi-Modal Agents',
          'Advanced Data Techniques',
          'Project: Collaborative AI Team'
        ]
      },
      {
        title: 'Part 7: Production AI & Deployment',
        description: 'Architecting AI for scale, cloud deployment on AWS, MCP server, fine-tuning custom models, LangSmith observability, and full-stack AI agent capstone.',
        topics: [
          'Architecting AI for Scale',
          'Cloud Deployment on AWS',
          'MCP (Model Control Plane) Server',
          'Fine-Tuning Custom Models',
          'LangSmith for Observability',
          'Automated Evaluation & Testing',
          'Final Capstone: Full-Stack AI Agent'
        ]
      },
      {
        title: 'Part 8: Integration & Career Prep',
        description: 'DSA in AI systems, building AI coding assistants, system design for AI, interview preparation, portfolio project, and career guidance.',
        topics: [
          'Using DSA in AI Systems (Efficient algorithms for AI)',
          'Building AI-Powered Coding Assistants',
          'System Design for AI Applications',
          'Interview Preparation: DSA + AI Combined',
          'Portfolio Project: AI System with Strong Algorithmic Foundation',
          'Career Guidance & Job Search Strategies'
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
        title: 'Module 1: Tool Setup, Python Foundations & Data Types',
        description: 'Installation of VS Code, Python environment, code organization, PEP8, data types, numbers, strings, tuples, lists, sets, dicts, and mini projects.',
        topics: [
          'Installation of Tools (VSCode and Python)',
          'VS Code Setup (Extensions and Themes)',
          'Get your code files here',
          'Meet your Instructor - Hitesh',
          'What is Programming..?',
          'Convert that into Python Code',
          'A Real World Python Code Intro',
          'Why to use Python',
          'Writing first Python code on MAC',
          'Writing first Python code on WINDOWS',
          'Get everything in Virtual Environment',
          'Organize Python Code like a Pro',
          'PEP8 and Zen of python',
          'Objects - Mutable and Immutable in Python',
          'Numbers, Booleans and Operators in Depth in Python',
          'String - Index, Slice and Encoding',
          'Tuples and Membership Testing',
          'Basics of List in Python',
          'Operator overloading and bytearray in python',
          'Set and frozenset in python',
          'Dictionary in Python',
          'Touch on Advance Data types like Collections',
          'Kettle Boiling Story Project',
          'Building a Snack System',
          'Building a Chai Price Calculator',
          'Building Smart Thermostat System',
          'Delivery Fees Waiver System',
          'Build a train seat information system'
        ]
      },
      {
        title: 'Module 2: Loops, Functions, Comprehensions & OOP in Python',
        description: 'Loops, enumerate, zip, walrus operator, functions, lambdas, comprehensions, generators, decorators, classes, inheritance, and error handling.',
        topics: [
          'Introduction to Loops',
          'Tea Token Dispenser',
          'Batch Chai Preparation',
          'Looping through list - Orders Name',
          'Why to use Enumerate',
          'Zip Can Combine Lists',
          'Introducing While Loop in Python',
          'Break, Continue and Loop Fallback',
          'Walrus Operator is Interesting in Python',
          'Dictionary in place of Match Case',
          'Functions - Reducing Duplication and Splitting Complex Tasks',
          'Functions - 3 More Features',
          'Scope and Named Space in Functions',
          'Non local vs Global scopes',
          'Handling Arguments in Function in Python',
          'Handle Multiple Return in Python',
          'Lambdas, Pure vs Impure functions',
          'Documenting your Functions and Built-in Functions',
          'Python Imports, Modules and Init File',
          'What are Comprehensions in Python?',
          'List Comprehensions in Python',
          'Set Comprehensions in Python',
          'Dictionary Comprehensions in Python',
          'Generator Comprehensions for Memory Optimization',
          'Generators with Yield and Next Methods',
          'Infinite Generators in Python',
          'Send Value to Generators',
          'Yield From and Close the Generators',
          'Decorators in Python',
          'Build a Logger with Decorator',
          'Build an Authorization Decorator',
          'Building your 1st Class and Object in Python',
          'Class and Object Namespace',
          'Attribute Shadowing in Python',
          'Self argument in python',
          'Constructors and Init in Python Classes',
          'Inheritance and Composition in Python Classes',
          '3 Ways to Access Base Class',
          'Method Resolution Order - MRO',
          'Static Methods in Python',
          'Classmethod vs Staticmethod',
          'Property decorator - Getter and Setter',
          'What is Error handling',
          'Try except else and finally',
          'Catching multiple exceptions',
          'Raise your own errors',
          'Creating custom exceptions',
          'Mini project with exception learning',
          'File handling with try except and with'
        ]
      },
      {
        title: 'Module 3: Concurrency, Asyncio & Pydantic Data Validation',
        description: 'Concurrency vs parallelism, GIL, threads, locks, multiprocess, asyncio event loop, coroutines, and Pydantic validation.',
        topics: [
          'Code files for Thread and concurrency section',
          'What is Concurrency and Parallelism?',
          'What is Global Interpreter Lock - GIL',
          'Threads and lock in depth',
          'Multi Process with Queue and Value',
          'Code files for asyncio section',
          'Asyncio, Event loop, coroutines and await in python',
          'Mixing threads with asyncio in python',
          'Asyncio and MultiProcess in python',
          'Understanding Daemon vs Non-Daemon Threads',
          'Debugging and Profiling - Race condition and Deadlock in python',
          'Why pydantic is important',
          'The foundation of pydantic',
          'Pydantic Default conversions',
          'Mixing pydantic and typing in python',
          'Adding validations with Field',
          'Field and model validators in python',
          'Computed property in pydantic',
          'Advance Validation in pydantic',
          'Nested models in pydantic',
          'Self referencing models in pydantic',
          'Advance nested model patterns',
          'Best practice for pydantic model design',
          'Model dump and model dump json in serialization of pydantic'
        ]
      },
      {
        title: 'Module 4: LLM Architecture, Prompting, Ollama & Hugging Face',
        description: 'Deep dive into GPT, transformers, tokenization, embeddings, OpenAI/Gemini APIs, prompt engineering, local LLMs with Ollama, and Hugging Face deployment.',
        topics: [
          'Understanding Large Language Models (LLMs)',
          'Deep Dive into the GPT Architecture',
          'How LLMS Work under the Hood?',
          'Fundamentals of Tokenization in NLP',
          'Implementing a Custom Tokenizer in Python',
          'The Transformer Breakthrough: Google’s Paper on Attention',
          'Deep Diving into Vector Embeddings',
          'Role of Positional Encodings in Transformers',
          'Understanding Multi-Head Attention for Rich Context',
          'Configuring Your OpenAI Account',
          'Invoking OpenAI APIs with Python',
          'Creating and Setting Up Google Gemini Account',
          'Using Google Gemini with OpenAI-Compatible APIs',
          'Prompt Fundamentals: Encoding Instructions for LLMs',
          'Prompting Types: Zero-Shot, Few-Shot, One-Shot',
          'One-Shot Prompting for Deterministic Inference',
          'Few-Shot Prompting for Contextual Generalization',
          'Structured Outputs with Few-Shot Prompting',
          'Chain-of-Thought (CoT) for Reasoning',
          'Auto-CoT: Automated Reasoning Prompt Generation',
          'Persona-Based Prompting',
          'Introduction to Prompt Serialization Styles',
          'Alpaca Prompt Template for Instruction Tuning',
          'ChatML Schema: OpenAI’s Structured Prompt Format',
          'INST Format: LLaMA-2 Instruction Specification',
          'Ollama Overview: Local LLM Runtime Engine',
          'Dockerized Environment Setup for LLMs',
          'Running Ollama Models with Docker Runner',
          'Configuring OpenWebUI with Ollama Backend',
          'FastAPI Environment Setup & Dependencies',
          'Integrating Ollama with FastAPI & Python APIs',
          'Hugging Face Model Deployment – Section Intro',
          'Configuring and Securing Hugging Face Account',
          'Accessing Instruct-Tuned Models (Google Gemma)',
          'Installing and Using Hugging Face CLI Tools',
          'Model Downloading & Execution from HF Hub'
        ]
      },
      {
        title: 'Module 5: AI Agents, RAG, LangChain & Distributed Queues',
        description: 'Agentic AI concepts, building CLI coding agent, RAG indexing & retrieval, vector DBs, LangChain setup, distributed queues with Redis & FastAPI.',
        topics: [
          'Agentic AI Fundamentals – Section Intro',
          'What Exactly Are AI Agents? (Core Concepts)',
          'Coding Your First AI Agent',
          'Enforcing Structured Outputs with Pydantic',
          'Building a CLI Coding Agent (Claude Code) from Scratch',
          'Intro to RAG & LangChain – Section Overview',
          'Defining the Core Problem in RAG Systems',
          'Naive Retrieval-Based Solution Approach',
          'RAG Pipeline – Indexing Workflow Explained',
          'RAG Pipeline – Retrieval Mechanism in Depth',
          'Local Vector DB Setup with Docker Compose',
          'LangChain Installation & Setup',
          'LangChain Document Loaders for PDF',
          'LangChain Document Chunking & Splitting',
          'LangChain Vector Store as Retrievers',
          'LangChain-Powered RAG Retrieval Execution',
          'Sync vs Async in RAG Architectures',
          'Introduction to Queues System Design for Async Setup',
          'Python RQ Setup Distributed Queues',
          'Setting up Redis and Valkey with Docker',
          'Worker Orchestration with Python RQ',
          'FastAPI Endpoints setup for chat Queue',
          'Asynchronous Message Enqueueing with FastAPI',
          'FastAPI Polling & Dequeuing Messages from Async Queues',
          'Running & Scaling Worker Nodes for Background Processing',
          'What is Multi Modal Agent?',
          'Sending Multimedia to LLM (Images)'
        ]
      },
      {
        title: 'Module 6: LangGraph Workflows, Agent Memory & Graph DBs',
        description: 'LangGraph core concepts, nodes, edges, state management, MongoDB checkpointer, memory layers (short/long-term), Mem0, Neo4j & Cypher queries.',
        topics: [
          'Section Intro - Why LangGraph is a Game-Changer for AI Agents',
          'Deep Dive into LangGraph – Core Concepts, Nodes and Edges',
          'Setting Up LangGraph – Installation and Environment Configuration',
          'Defining State in LangGraph for AI Agent Context',
          'Defining Nodes and Functions in LangGraph',
          'Connecting Nodes with Edges – Designing Complex AI Graph',
          'Testing and Debugging Your LangGraph AI Workflow',
          'Integrating AI LLMs into LangGraph',
          'Conditional Edges & Smart Routing',
          'What is Checkpointing? Enabling Persistence in AI Agent Workflows',
          'Setting Up MongoDB with Docker for LangGraph Checkpoint Storage',
          'Implementing MongoDB Checkpointer in LangGraph Workflow Graphs',
          'Section Intro - The Memory Layer in AI Agents',
          'What is Memory in AI and Agents',
          'Different Types of Memory Architectures in AI and Agent',
          'Short-Term Memory – Handling Context Windows',
          'Long-Term Memory – Persistent Knowledge',
          'Factual Memory for AI Agents',
          'Episodic Memory in AI Workflows',
          'Semantic Memory for General Knowledge',
          'Mem0 Setup with Python for AI Memory Layer',
          'Mem0 Configuration with Python for Agents',
          'Vector Database Setup with Docker for Memory',
          'Using Vector Databases for AI Agent Memory',
          'Section Intro to the Graph Memory',
          'What is a Graph in AI and Data Systems',
          'Why Graph Memory is Needed in AI Agents',
          'Introduction to Graph Databases Neo4j and Kuzu',
          'Setting Up Neo4j Cloud Instance for Graph Memory',
          'Basics of Cypher Query for Graph Databases',
          'Adding Graph Database Support for Memory Agent',
          'Testing Graph Memory Implementation in Agents'
        ]
      },
      {
        title: 'Module 7: Conversational Voice AI, MCP, Git, Docker & AWS ECS',
        description: 'Conversational voice AI, speech-to-speech, voice Cursor IDE clone, Model Context Protocol (MCP), Git series, Docker containerization, and AWS ECS cloud deployment.',
        topics: [
          'Section Intro to Conversational Agentic AI',
          'Understanding Conversational AI for Agents',
          'The S2S and Chained Voice Agents',
          'Speech To Speech Voice Agents',
          'Understanding the Chained Pattern for Voice Agents',
          'Setting Up STT for Chained Conversational Agent',
          'Setting Up OpenAI GPT Completions for Chained Agent',
          'Setting Up TTS for Conversational AI Agents',
          'Building a Voice Based AI Cursor IDE Clone',
          'Section Intro to Model Context Protocol',
          'Understanding What Model Context Protocol (MCP) Is',
          'Exploring the Architecture of MCP',
          'Introduction to GIT series',
          'Git init and hidden folder',
          'Git commits and logs',
          'Git internal working and configs',
          'Git merge and git conflicts',
          'Git Diff and stashing',
          'Git rebase is not that scary',
          'Insight of pushing code to github',
          'How to make Pull Request and Open Source contribution',
          'Introduction to Docker and the Rise of Containerization in DevOps',
          'Real-World Problem That Docker Solves in Modern Development',
          'Understanding the Difference Between Docker and Virtual Machines',
          'How to Install Docker on Your System for Local Development',
          'Docker Containers vs Docker Images: What\'s the Difference?',
          'Introduction to Docker CLI and Commonly Used Commands',
          'Running Docker Containers Using the CLI with Practical Examples',
          'Working with Docker Images Through Command-Line Interface (CLI)',
          'Exploring Docker Container Commands for Management and Debugging',
          'Creating and Using a Dockerfile to Containerize Node.js Apps',
          'Best Practices to Optimize Docker Images for Speed and Performance',
          'Understanding and Implementing Port Mapping in Docker Containers',
          'Auto Port Mapping in Docker: Dynamic Exposure of Container Ports',
          'Publishing Docker Images to Docker Hub or Private Registries',
          'Building Optimized Multi-Stage Docker Images for Production Use',
          'Security Best Practices for Running Docker Containers Safely',
          'Understanding Docker Bridge Networking for Container Communication',
          'Creating and Using Custom Docker Bridges for Network Isolation',
          'Docker Other Modes of Networking',
          'Attaching Host Machine Volumes to Docker Containers for Data Sharing',
          'Creating and Managing Custom Named Volumes in Docker for Persistence',
          'Introduction to Docker Compose',
          'Networking in Docker Compose',
          'Volume in Docker Compose',
          'Custom Docker builds',
          'Introduction to Docker Orchestration and Why It’s Crucial for Production',
          'Creating and Configuring a New AWS Account for ECS Deployment',
          'Setting Up Amazon Elastic Container Registry (ECR) to Push Docker Images',
          'Launching and Configuring ECS Clusters to Run Docker Containers',
          'Defining ECS Tasks and Creating Task Definitions for Container Execution',
          'Deploying ECS Services with Load Balancer for High Availability',
          'Cleaning Up AWS ECS and ECR Resources to Avoid Unnecessary Billing',
          'Debugging and Fixing ECS Health Check Failures During Container Deployment',
          'Hosted Tools in Agent SDK',
          'Function Tools in Agent SDK',
          'Agent As a Tool'
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
        title: 'Phase 1: Foundations',
        description: 'Python programming, mathematics for data science, SQL, Git & GitHub, and Linux basics.',
        topics: [
          'Python Programming',
          'Mathematics (Linear Algebra, Calculus, Probability, Statistics)',
          'SQL',
          'Git & GitHub',
          'Linux Basics'
        ]
      },
      {
        title: 'Phase 2: Data Analysis',
        description: 'NumPy, Pandas, data cleaning, Exploratory Data Analysis (EDA), visualization, feature engineering, and preprocessing.',
        topics: [
          'NumPy',
          'Pandas',
          'Data Cleaning',
          'Exploratory Data Analysis (EDA)',
          'Data Visualization (Matplotlib, Seaborn, Plotly)',
          'Feature Engineering',
          'Data Preprocessing'
        ]
      },
      {
        title: 'Phase 3: Machine Learning',
        description: 'ML fundamentals, supervised & unsupervised learning, ensemble methods, recommendation systems, time series analysis, and model evaluation.',
        topics: [
          'ML Fundamentals',
          'Supervised Learning',
          'Unsupervised Learning',
          'Ensemble Learning',
          'Recommendation Systems',
          'Time Series Analysis',
          'Model Evaluation & Hyperparameter Tuning'
        ]
      },
      {
        title: 'Phase 4: Deep Learning',
        description: 'ANN, TensorFlow, PyTorch, CNN, RNN/LSTM/GRU, NLP fundamentals, Transformers, GANs, and Reinforcement Learning.',
        topics: [
          'Neural Networks (ANN)',
          'TensorFlow',
          'PyTorch',
          'CNN (Computer Vision)',
          'RNN, LSTM, GRU',
          'NLP Fundamentals',
          'Transformers',
          'GANs',
          'Reinforcement Learning'
        ]
      },
      {
        title: 'Phase 5: Generative AI',
        description: 'LLM fundamentals, prompt engineering, Hugging Face, LangChain, LlamaIndex, vector DBs, RAG, AI agents, fine-tuning, multimodal AI, and guardrails.',
        topics: [
          'LLM Fundamentals',
          'Prompt Engineering',
          'Hugging Face',
          'LangChain',
          'LlamaIndex',
          'Embeddings',
          'Vector Databases (FAISS, Pinecone, ChromaDB)',
          'Retrieval-Augmented Generation (RAG)',
          'AI Agents',
          'Function Calling & Tool Use',
          'Fine-Tuning (LoRA, QLoRA, PEFT)',
          'Multimodal AI',
          'Diffusion Models (Stable Diffusion, Flux)',
          'LLM Evaluation & Guardrails'
        ]
      },
      {
        title: 'Phase 6: Data Engineering',
        description: 'ETL pipelines, data warehousing, data lakes, Apache Spark, Hadoop, Kafka, Airflow, and BigQuery / Snowflake.',
        topics: [
          'ETL',
          'Data Warehousing',
          'Data Lakes',
          'Apache Spark',
          'Hadoop',
          'Kafka',
          'Airflow',
          'BigQuery / Snowflake'
        ]
      },
      {
        title: 'Phase 7: MLOps & LLMOps',
        description: 'Docker, Kubernetes, FastAPI/Flask, Streamlit/Gradio, MLflow, DVC, CI/CD, model deployment, monitoring, and prompt management.',
        topics: [
          'Docker',
          'Kubernetes',
          'FastAPI / Flask',
          'Streamlit / Gradio',
          'MLflow',
          'DVC',
          'CI/CD',
          'Model Deployment',
          'Monitoring',
          'Prompt Management'
        ]
      },
      {
        title: 'Phase 8: Cloud',
        description: 'AWS, Google Cloud (Vertex AI), Microsoft Azure AI, SageMaker, cloud storage, and serverless deployment.',
        topics: [
          'AWS',
          'Google Cloud (Vertex AI)',
          'Microsoft Azure AI',
          'SageMaker',
          'Cloud Storage',
          'Serverless Deployment'
        ]
      },
      {
        title: 'Phase 9: Deployment',
        description: 'REST APIs, FastAPI, Docker deployment, Vercel, Render, Railway, and Hugging Face Spaces.',
        topics: [
          'REST APIs',
          'FastAPI',
          'Docker Deployment',
          'Vercel',
          'Render',
          'Railway',
          'Hugging Face Spaces'
        ]
      },
      {
        title: 'Phase 10: Real-World Projects',
        description: 'Hands-on projects covering Data Analysis, ML, Deep Learning, Computer Vision, NLP, RAG, Chatbots, AI Agents, and AI SaaS.',
        topics: [
          'Data Analysis Projects',
          'Machine Learning Projects',
          'Deep Learning Projects',
          'Computer Vision Projects',
          'NLP Projects',
          'RAG Applications',
          'AI Chatbots',
          'AI Agents',
          'AI SaaS Products',
          'End-to-End Data Science Projects'
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
        title: 'Module 1: Python & Data',
        description: 'Python programming language, variables, flow control, functions, data structures, OOPs, file handling, NumPy, Pandas, Matplotlib, and Seaborn.',
        topics: [
          'Python (programming language)',
          'Variables & Operators',
          'Conditional Statements & Loops (Flow Control)',
          'Functions & lambda functions',
          'List & List comprehensions, Tuple, Dictionary, & Set',
          'File Handling & JSON Module',
          'Object Oriented Programming (OOPs) - in Detail',
          'Data collection, preprocessing & visualization',
          'Numpy, Pandas, Matplotlib, Seaborn etc.'
        ]
      },
      {
        title: 'Module 2: Machine Learning',
        description: 'Mathematics for AI, supervised & unsupervised learning, reinforcement learning, evaluation metrics, Scikit-learn, Kaggle, and hands-on projects.',
        topics: [
          'Mathematics for AI (Statistics, Probability, Linear Algebra, Calculus, Central Limit Theorem)',
          'Supervised Learning in ML (classification & regression)',
          'Algorithms - Linear regression, Logistic regression, Naive Bayes, KNN, Decision Trees etc.',
          'Unsupervised Learning in ML (clustering & association)',
          'Algorithms - K-means, DBSCAN, PCA for dimensionality reduction etc.',
          'Reinforcement Learning in ML',
          'Additional concepts: precision, recall, F1 score, bias/variance tradeoff etc.',
          'Scikit-learn & Kaggle',
          'Multiple projects'
        ]
      },
      {
        title: 'Module 3: Deep Learning',
        description: 'Neural networks, backpropagation, perceptron, FNN, RNN, LSTM, CNN, Transformers, PyTorch, and framework comparisons.',
        topics: [
          'Neural Networks & Terminologies',
          'Forward & Backward Propagation',
          'Perceptron',
          'FNN Architecture (Feed forward neural network)',
          'RNN Architecture (Recurrent neural network)',
          'LSTM (Long short term memory network) need & advantages',
          'CNN Architecture (Convolutional neural network)',
          'Transformers',
          'PyTorch',
          'PyTorch vs TensorFlow vs Keras',
          'Multiple Projects'
        ]
      },
      {
        title: 'Module 4: GenAI',
        description: 'Introduction to GenAI, LLMs, NLP, GANs, RAG, Agentic AI, Cursor AI, GitHub Copilot, Claude, and OpenAI APIs.',
        topics: [
          'Introduction to GenAI & LLMs (Large Language Models)',
          'RNNs for NLP (Natural Language Processing)',
          'GAN (Generative Adversarial Network)',
          'RAG (Retrieval-Augmented Generation)',
          'Agentic AI',
          'Cursor AI, Github co-pilot, Claude etc.',
          'Working with OpenAI APIs'
        ]
      },
      {
        title: 'Module 5: AI Engineering Stack',
        description: 'Flask for AI development, frontend fundamentals, SQL for data science, Git & GitHub, Docker, and Kubernetes.',
        topics: [
          'Flask (Development with AI)',
          'Frontend fundamentals (HTML, CSS, JS)',
          'SQL (for Data Science)',
          'Git & Github (Version Control)',
          'Docker',
          'Kubernetes'
        ]
      },
      {
        title: 'Module 6: Projects',
        description: 'Minor & major industry-grade projects across finance, medical, e-commerce, media sentiment analysis, GenAI assistants, and assignments.',
        topics: [
          'Multiple minor & major projects',
          'Industry grade domain specific projects',
          'Finance, Medical, E-commerce (Clustering), Media (Sentiment Analysis) etc.',
          'GenAI assistant',
          'Additional assignment projects'
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
        title: 'Phase 1: Programming Fundamentals',
        description: 'Python basics, NumPy, Pandas, Jupyter Notebook, Git & GitHub.',
        topics: [
          'Python Basics',
          'NumPy',
          'Pandas',
          'Jupyter Notebook',
          'Git & GitHub'
        ]
      },
      {
        title: 'Phase 2: SQL & Databases',
        description: 'SQL basics, CRUD, JOINs, aggregate functions, GROUP BY, HAVING, Window functions, CTE, Views, and query optimization.',
        topics: [
          'SQL Basics',
          'CRUD Operations',
          'Joins',
          'Aggregate Functions',
          'Group By & Having',
          'Window Functions',
          'CTE',
          'Views',
          'Query Optimization'
        ]
      },
      {
        title: 'Phase 3: Data Cleaning & Preparation',
        description: 'Data collection, cleaning, missing values, duplicates, outliers, transformations, feature engineering, encoding, and scaling.',
        topics: [
          'Data Collection',
          'Data Cleaning',
          'Missing Values',
          'Duplicate Handling',
          'Outlier Detection',
          'Data Transformation',
          'Data Formatting',
          'Feature Engineering',
          'Data Encoding',
          'Feature Scaling'
        ]
      },
      {
        title: 'Phase 4: Exploratory Data Analysis (EDA)',
        description: 'Descriptive statistics, univariate, bivariate, multivariate, correlation, distributions, trends, and pattern detection.',
        topics: [
          'Descriptive Statistics',
          'Univariate Analysis',
          'Bivariate Analysis',
          'Multivariate Analysis',
          'Correlation Analysis',
          'Data Distribution',
          'Trend Analysis',
          'Pattern Detection'
        ]
      },
      {
        title: 'Phase 5: Data Visualization',
        description: 'Matplotlib, Seaborn, Plotly, line/bar/pie charts, histograms, box plots, scatter plots, heatmaps, and dashboards.',
        topics: [
          'Matplotlib',
          'Seaborn',
          'Plotly',
          'Line Charts',
          'Bar Charts',
          'Pie Charts',
          'Histograms',
          'Box Plots',
          'Scatter Plots',
          'Heatmaps',
          'Dashboards'
        ]
      },
      {
        title: 'Phase 6: Statistics',
        description: 'Mean/median/mode, variance, standard deviation, probability, sampling, hypothesis testing, confidence intervals, and A/B testing.',
        topics: [
          'Mean, Median, Mode',
          'Variance & Standard Deviation',
          'Probability',
          'Probability Distributions',
          'Correlation & Covariance',
          'Sampling',
          'Hypothesis Testing',
          'Confidence Intervals',
          'A/B Testing'
        ]
      },
      {
        title: 'Phase 7: Excel for Data Analysis',
        description: 'Excel basics, formulas, lookup functions, pivot tables, charts, conditional formatting, Power Query, and Power Pivot.',
        topics: [
          'Excel Basics',
          'Formulas & Functions',
          'Lookup Functions',
          'Pivot Tables',
          'Charts',
          'Conditional Formatting',
          'Power Query',
          'Power Pivot'
        ]
      },
      {
        title: 'Phase 8: Business Intelligence (BI)',
        description: 'Power BI, Tableau, data modeling, DAX basics, interactive dashboards, KPI reporting, and business reporting.',
        topics: [
          'Power BI',
          'Tableau',
          'Data Modeling',
          'DAX Basics',
          'Interactive Dashboards',
          'KPI Reporting',
          'Business Reporting'
        ]
      },
      {
        title: 'Phase 9: Real-World Data Analysis',
        description: 'Business, sales, marketing, financial, HR, customer, product, and web analytics.',
        topics: [
          'Business Analysis',
          'Sales Analysis',
          'Marketing Analysis',
          'Financial Analysis',
          'HR Analytics',
          'Customer Analytics',
          'Product Analytics',
          'Web Analytics'
        ]
      },
      {
        title: 'Phase 10: Projects',
        description: 'Real-world dashboards and projects including Sales, Customer Churn, Netflix, E-commerce, IPL, COVID-19, Financial, HR, and End-to-End Business Dashboards.',
        topics: [
          'Sales Dashboard',
          'Customer Churn Analysis',
          'Netflix Data Analysis',
          'E-commerce Analysis',
          'IPL Data Analysis',
          'COVID-19 Analysis',
          'Financial Dashboard',
          'HR Dashboard',
          'End-to-End Business Dashboard'
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
        title: 'Phase 1: Programming & OS Fundamentals',
        description: 'Linux basics, commands, shell scripting (Bash), networking fundamentals (HTTP/HTTPS, DNS, SSH), YAML, JSON, Git & GitHub.',
        topics: [
          'Linux Basics',
          'Linux Commands',
          'Shell Scripting (Bash)',
          'Networking Fundamentals',
          'HTTP/HTTPS',
          'DNS',
          'SSH',
          'YAML',
          'JSON',
          'Git & GitHub'
        ]
      },
      {
        title: 'Phase 2: Cloud Fundamentals',
        description: 'Cloud computing concepts, AWS core services (IAM, EC2, S3, VPC, EBS, Load Balancer, Auto Scaling, Route 53, CloudWatch, AWS CLI), Azure basics, and Google Cloud basics.',
        topics: [
          'Cloud Computing Basics',
          'AWS Fundamentals',
          'IAM',
          'EC2',
          'S3',
          'VPC',
          'EBS',
          'Load Balancer',
          'Auto Scaling',
          'Route 53',
          'CloudWatch',
          'AWS CLI',
          'Azure Basics',
          'Google Cloud Basics'
        ]
      },
      {
        title: 'Phase 3: Containers',
        description: 'Docker fundamentals, images, containers, Dockerfile, Docker Compose, networking, volumes, registry, Docker Hub, multi-stage builds, and Docker security.',
        topics: [
          'Docker Basics',
          'Docker Images',
          'Docker Containers',
          'Dockerfile',
          'Docker Compose',
          'Docker Networking',
          'Docker Volumes',
          'Docker Registry',
          'Docker Hub',
          'Multi-stage Builds',
          'Docker Security'
        ]
      },
      {
        title: 'Phase 4: Container Orchestration',
        description: 'Kubernetes architecture, Pods, ReplicaSets, Deployments, Services, ConfigMaps, Secrets, Namespaces, Volumes, StatefulSets, DaemonSets, Jobs/CronJobs, Ingress, Helm, and security.',
        topics: [
          'Kubernetes Fundamentals',
          'Pods',
          'ReplicaSets',
          'Deployments',
          'Services',
          'ConfigMaps',
          'Secrets',
          'Namespaces',
          'Volumes',
          'StatefulSets',
          'DaemonSets',
          'Jobs & CronJobs',
          'Ingress',
          'Helm',
          'Kubernetes Security'
        ]
      },
      {
        title: 'Phase 5: CI/CD',
        description: 'CI/CD concepts, Jenkins, GitHub Actions, GitLab CI/CD, Azure DevOps, pipelines, build/testing/deployment automation, and rollback strategies.',
        topics: [
          'CI/CD Concepts',
          'Jenkins',
          'GitHub Actions',
          'GitLab CI/CD',
          'Azure DevOps',
          'Pipelines',
          'Build Automation',
          'Testing Automation',
          'Deployment Automation',
          'Rollback Strategy'
        ]
      },
      {
        title: 'Phase 6: Infrastructure as Code (IaC)',
        description: 'Terraform modules, state, workspaces, Ansible playbooks, inventory, roles, variables, Puppet basics, and Chef basics.',
        topics: [
          'Terraform',
          'Terraform Modules',
          'Terraform State',
          'Terraform Workspaces',
          'Ansible',
          'Ansible Playbooks',
          'Inventory',
          'Roles',
          'Variables',
          'Puppet (Basics)',
          'Chef (Basics)'
        ]
      },
      {
        title: 'Phase 7: Monitoring & Logging',
        description: 'Prometheus, Grafana, ELK Stack, Loki, Fluentd, Jaeger, OpenTelemetry, AlertManager, CloudWatch, logging, and metrics.',
        topics: [
          'Prometheus',
          'Grafana',
          'ELK Stack',
          'Loki',
          'Fluentd',
          'Jaeger',
          'OpenTelemetry',
          'AlertManager',
          'CloudWatch',
          'Logging & Metrics'
        ]
      },
      {
        title: 'Phase 8: Security (DevSecOps)',
        description: 'DevSecOps fundamentals, IAM best practices, HashiCorp Vault, Trivy, SonarQube, SAST, DAST, dependency scanning, container/K8s security, policy as code.',
        topics: [
          'DevSecOps Fundamentals',
          'IAM Best Practices',
          'Secrets Management',
          'HashiCorp Vault',
          'Trivy',
          'SonarQube',
          'SAST',
          'DAST',
          'Dependency Scanning',
          'Container Security',
          'Kubernetes Security',
          'Policy as Code'
        ]
      },
      {
        title: 'Phase 9: Advanced DevOps',
        description: 'Microservices, API Gateway, Istio Service Mesh, ArgoCD, FluxCD, GitOps, Nginx, HAProxy, Redis, Kafka, RabbitMQ, Serverless, cost optimization, and disaster recovery.',
        topics: [
          'Microservices',
          'API Gateway',
          'Service Mesh (Istio)',
          'ArgoCD',
          'FluxCD',
          'GitOps',
          'Nginx',
          'HAProxy',
          'Caching (Redis)',
          'Message Queues (Kafka, RabbitMQ)',
          'Serverless',
          'Cost Optimization',
          'High Availability',
          'Disaster Recovery'
        ]
      },
      {
        title: 'Phase 10: Real-World Projects',
        description: 'Hands-on projects: CI/CD pipelines, MERN Dockerization, K8s deployments, Terraform AWS infra, Jenkins+Docker+K8s pipeline, GitOps with ArgoCD, DevSecOps pipeline, and end-to-end cloud deployments.',
        topics: [
          'CI/CD Pipeline',
          'Dockerized MERN App',
          'Kubernetes Deployment',
          'Terraform AWS Infrastructure',
          'Jenkins + Docker + Kubernetes Pipeline',
          'GitOps with ArgoCD',
          'Monitoring Dashboard',
          'Logging System',
          'DevSecOps Pipeline',
          'End-to-End Cloud Deployment'
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
        title: 'Complete 0-1: Foundation & Backend',
        description: 'JavaScript async internals, Node.js runtime, MongoDB, PostgreSQL, TypeScript, Express, ORMs, Middlewares, Zod, Monorepos, Serverless, OpenAPI Spec, Auth, and Node.js scaling.',
        topics: [
          'Foundation JavaScript & async nature of JS',
          'Node.js and its runtime',
          'Databases (NoSQL / SQL)',
          'Mongo and Postgres deep dive',
          'Typescript beginner to advance',
          'Backend architecture',
          'Backend communication protocols',
          'Express basic to advance',
          'ORMs (Prisma / Mongoose)',
          'Middlewares, routes, status codes & global catches',
          'Zod schema validation',
          'MonoRepos & Turborepo',
          'Serverless Backends',
          'OpenAPI Spec & Autogenerated clients',
          'Authentication using external libraries',
          'Scaling Node.js & performance benchmarks',
          'Deploying npm packages'
        ]
      },
      {
        title: 'Complete 0-1: Frontend Development',
        description: 'Reconcilers, React, state internals, Context API, Recoil, CSS, Tailwind CSS, Docker containerization, Next.js, Custom hooks, and NextAuth.',
        topics: [
          'Reconcilers and Frontend frameworks',
          'React beginner to advance',
          'Internals of state & Context API',
          'State management using Recoil',
          'CSS fundamentals, Flexbox & basic styling',
          'Frontend UI frameworks & Deep dive into Tailwind',
          'Containerization & Docker',
          'Next.js',
          'Custom hooks',
          'In-house auth using NextAuth'
        ]
      },
      {
        title: 'Complete 0-1: Basic DevOps & Projects',
        description: 'Docker end-to-end, AWS deployments, Fly.io, Nginx reverse proxies, GSoC issue solving, and full-stack Paytm/Wallet project.',
        topics: [
          'Docker end to end',
          'Deploying to AWS servers',
          'Newer clouds like Fly.io / Remix',
          'Nginx and reverse proxies',
          'GSoC Project setting up and issue solving',
          'Building Paytm/Wallet End to End'
        ]
      },
      {
        title: 'Complete 1-100: Advanced Backend & System Design',
        description: 'Message queues, PubSubs, Proxies, Redis, Kafka, Design Patterns, Indexing, Normalization, Rate limiting, Sharding, gRPC, Capacity Estimation, and WebRTC.',
        topics: [
          'Advanced backend communication',
          'Message queues and PubSubs',
          'Proxies & Load balancers',
          'Redis Deep dive',
          'Kafka Deep dive',
          'Common Design Patterns in JS',
          'Advanced DB concepts (Indexing, normalization)',
          'Rate limiting',
          'Captchas and DDoS protection',
          'Sharding, Replication & Resiliency',
          'Horizontal and vertical scaling',
          'Polling and WebSockets',
          'gRPC',
          'Capacity Estimation',
          'Load Balancers & CAP Theorem',
          'Testing Node.js Apps',
          'Real time communication & basics of WebRTC'
        ]
      },
      {
        title: 'Complete 1-100: Advanced DevOps',
        description: 'Container orchestration, Docker Swarm, Kubernetes, CI/CD, Prometheus, Grafana, New Relic, Serverless deep dive, and AWS constructs.',
        topics: [
          'Container Orchestration & Docker Swarm',
          'Kubernetes',
          'CI/CD Pipelines',
          'Monitoring systems basics to advance',
          'Prometheus & Grafana',
          'New Relic as a paid service',
          'Serverless Deep dive',
          'AWS Constructs (EC2, S3, CDNs, LB, EKS)'
        ]
      },
      {
        title: 'Complete 1-100: Capstone Projects',
        description: 'End-to-end production projects including Zerodha trading platform, Zapier automation engine, and real-world open-source contributions.',
        topics: [
          'Zerodha end to end',
          'Zapier end to end',
          'Real world open-source projects'
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
        title: 'Phase 1: Foundations',
        description: 'Internet & HTTP, HTML5, CSS3, JavaScript (ES6+), Async JS, DOM manipulation, Git & GitHub, Linux basics, and CLI.',
        topics: [
          'Internet & HTTP',
          'HTML5',
          'CSS3',
          'JavaScript (ES6+)',
          'Async JavaScript',
          'DOM Manipulation',
          'Git & GitHub',
          'Linux Basics',
          'CLI (Command Line)'
        ]
      },
      {
        title: 'Phase 2: Backend Development',
        description: 'Node.js, Bun, Cloudflare Workers, Express, REST APIs, JWT/Sessions, Zod, PostgreSQL, MongoDB, Prisma, WebSockets, gRPC, Redis, Kafka, Monorepos, and Node scaling.',
        topics: [
          'Node.js',
          'Bun Runtime',
          'Cloudflare Workers',
          'Express.js',
          'REST APIs',
          'Authentication & Authorization (JWT, Cookies & Sessions)',
          'Middleware, Error Handling & File Uploads',
          'Validation (Zod)',
          'SQL Databases (PostgreSQL) & NoSQL (MongoDB)',
          'Prisma ORM & Mongoose',
          'Backend Communication (WebSockets, Server-Sent Events, gRPC)',
          'API Design, OpenAPI/Swagger, Rate Limiting',
          'Caching (Redis) & Message Queues',
          'Cron Jobs & Serverless Functions',
          'Monorepos (TurboRepo) & NPM Package Publishing',
          'Performance Optimization & Scaling Node.js'
        ]
      },
      {
        title: 'Phase 3: Frontend Development',
        description: 'React.js, Vite, TypeScript, Tailwind CSS, Routing, State Management, Recoil/Zustand, Forms, React Query, Axios, Auth, UI & Dashboards.',
        topics: [
          'React.js',
          'Vite',
          'TypeScript',
          'Tailwind CSS',
          'Routing & Protected Routes',
          'State Management (React Hooks, Context API, Recoil/Zustand)',
          'Forms, React Query & Axios',
          'Authentication',
          'Component Libraries, Charts & Dashboard UI',
          'Responsive Design & Deployment'
        ]
      },
      {
        title: 'Phase 4: DevOps',
        description: 'Linux admin, Bash, EC2/GCP VMs, Docker, ECS, Kubernetes, Helm, Terraform, GitHub Actions, GitOps, Monitoring, CDN, Nginx, and deployment.',
        topics: [
          'Linux Administration & Bash Scripting',
          'Virtual Machines (AWS EC2, Google Cloud VMs)',
          'Auto Scaling Groups',
          'Docker & Containerization',
          'Amazon ECS & Kubernetes (Helm)',
          'Terraform (Infrastructure as Code)',
          'CI/CD (GitHub Actions) & GitOps',
          'Monitoring & Logging',
          'Object Storage, CDN & Reverse Proxy (Nginx)',
          'Production Deployment'
        ]
      },
      {
        title: 'Phase 5: Web3 / Blockchain',
        description: 'Ethereum, EVM, Smart Contracts, Solidity, Hardhat, Ethers.js, Solana, Rust (Basics & Advanced), Anchor Framework, DApps, and Web2+Web3 integration.',
        topics: [
          'Blockchain Fundamentals & Ethereum Basics (EVM, Wallets)',
          'Smart Contracts & Solidity (Basics to Advanced)',
          'Remix IDE & Hardhat',
          'Client-side Web3 Apps & Ethers.js',
          'Solana Basics & Solana Data Model',
          'Rust Basics & Advanced Rust',
          'Solana Programs & Anchor Framework',
          'DApps, Indexing & Blockchain Backend',
          'Web2 + Web3 Integration & Smart Contract Deployment',
          'Real-world Blockchain Projects'
        ]
      },
      {
        title: 'Phase 6: Advanced Engineering',
        description: 'System design (HLD/LLD), microservices, design patterns, distributed systems, load balancing, caching strategies, database scaling, and security.',
        topics: [
          'System Design Basics',
          'High-Level Design (HLD) & Low-Level Design (LLD)',
          'Microservices & Design Patterns',
          'Distributed Systems & Load Balancing',
          'Caching Strategies & Database Scaling',
          'Security Best Practices',
          'Performance Optimization & Production Architecture'
        ]
      },
      {
        title: 'Phase 7: Projects',
        description: 'Full-stack MERN applications, authentication systems, SaaS projects, real-time chat apps, Dockerized/K8s deployments, smart contracts, DApps, and portfolio projects.',
        topics: [
          'Full-Stack MERN Applications',
          'Authentication System',
          'SaaS Project',
          'Real-time Chat Application',
          'Production Deployment',
          'Dockerized Applications',
          'Kubernetes Deployment',
          'Smart Contracts & Decentralized Applications (DApps)',
          'End-to-End Portfolio Projects'
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
        title: 'Module 1: Full-Stack Web Development (Live)',
        description: 'Internet basics, HTML/CSS/JS, React.js, TypeScript, Node.js, Express.js, MongoDB, Mongoose, Auth, WebSockets, WebRTC, REST APIs, Advanced Projects & Deployment.',
        topics: [
          'Internet & Frontend: HTML, CSS, JavaScript, React.js & TypeScript',
          'Backend Development: Node.js, Express.js, MongoDB & Mongoose',
          'Authentication & Authorization Mechanisms',
          'Real-Time Communication: WebSockets & WebRTC',
          'APIs: REST APIs & Third-Party Integration',
          'Advanced Full Stack Projects & Deployment'
        ]
      },
      {
        title: 'Module 2: Blockchain Engineering',
        description: 'Blockchain fundamentals, Cryptographic foundations, Ethereum ecosystem, Solidity (Basic to Advanced), Solana client-side apps, Rust (Basic to Advanced), and Projects.',
        topics: [
          'Blockchain Fundamentals & Cryptographic Foundations',
          'Internal Working of Blockchains & Consensus Mechanics',
          'Ethereum Ecosystem, Smart Contracts & Solidity (Basic to Advanced)',
          'Solana Client-Side Applications & Rust (Basic to Advanced)',
          'Advanced Blockchain Projects & Deployment'
        ]
      },
      {
        title: 'Module 3: Data Structures & Algorithms in C++ (Pre-Recorded)',
        description: '150+ Hours recorded videos, 300+ company questions, C++, STL, Time/Space complexity, Recursion, Backtracking, OOP, Linked Lists, Stacks, Queues, Trees, Heaps, Graphs, Hashing, Tries, Sliding Window, DP.',
        topics: [
          'Programming Basics, Flowcharts, Variables, Loops & Complexity Analysis',
          'Arrays, Dynamic Arrays, Searching & Sorting Algorithms',
          'Strings, Mathematics for Coding & C++ Pointers',
          'Standard Template Library (STL), Functions & Call Stack',
          'Recursion, Backtracking & Object-Oriented Programming (OOP)',
          'Data Structures: Linked List, Stack, Queue, Trees, Heaps, Graphs, Hashing & Tries',
          'Patterns: Sliding Window, Bit Manipulation, Divide & Conquer, Greedy & Dynamic Programming',
          '150+ Hours Recorded Videos & 300+ Company Coding Questions'
        ]
      },
      {
        title: 'Module 4: High Level System Design (HLD) - Foundations & Features',
        description: 'CAP theorem, Monolith vs Microservices, HLD interview framework, Scaling, Load balancing, Caching, Sharding, Message queues (Kafka/RabbitMQ), Rate limiting, CDN, Search engines, and Notifications.',
        topics: [
          'HLD Foundations: Goals, Trade-offs, CAP Theorem & Monolith vs Microservices',
          'Horizontal/Vertical Scaling, Load Balancing & Consistent Hashing',
          'Caching, SQL vs NoSQL, Database Sharding & Indexing',
          'Message Queues & Pub/Sub (Kafka, RabbitMQ) - Scaling to Millions of Users',
          'Real-World Features: Auth Design, Rate Limiting (Token/Leaky Bucket) & API Gateway',
          'CDN, Monitoring, Logging, Health Checks & Search Engine Design',
          'Notification System (Email, SMS, Push) & File Upload System'
        ]
      },
      {
        title: 'Module 5: High Level System Design (HLD) - Complete Design Problems',
        description: 'End-to-end HLD case studies for top product company interviews: Bit.ly, Instagram, Swiggy/Zomato, YouTube, WhatsApp, Google Docs, and Twitter/X.',
        topics: [
          'Bit.ly (URL Shortener System Architecture)',
          'Instagram Feed System Design',
          'Swiggy / Zomato Food Delivery Architecture',
          'YouTube Video Streaming Engine',
          'WhatsApp Real-Time Messaging Architecture',
          'Google Docs Collaborative Editing Engine',
          'Twitter / X Timeline Feed System'
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
        title: 'Phase 1: Programming Fundamentals',
        description: 'Flowcharts, pseudocode, C++ basics, variables, operators, loops, pattern problems, functions, 2D arrays, strings, pointers, dynamic memory, macros, bit manipulation, and time/space complexity.',
        topics: [
          'Flowcharts & Pseudocode',
          'C++ Basics, Variables & Data Types',
          'Operators, Input/Output & Conditional Statements',
          'Loops & Pattern Problems',
          'Functions, Arrays & 2D Arrays',
          'Character Arrays & Strings',
          'Pointers, References & Dynamic Memory Allocation',
          'Macros, Bit Manipulation & Time/Space Complexity'
        ]
      },
      {
        title: 'Phase 2: Basic Data Structures',
        description: 'Linear/Binary Search, C++ STL, Sorting algorithms, searching techniques, Prefix Sum, Sliding Window, and Two Pointer technique.',
        topics: [
          'Linear Search & Binary Search',
          'STL (Vector, Pair, Map, Set, Queue, Stack, Priority Queue)',
          'Sorting (Bubble, Selection, Insertion, Merge, Quick Sort)',
          'Searching Techniques',
          'Prefix Sum & Sliding Window',
          'Two Pointer Technique'
        ]
      },
      {
        title: 'Phase 3: Recursion & Backtracking',
        description: 'Basics of recursion, recursive problem solving, backtracking, Rat in a Maze, N Queens, Sudoku Solver, Permutations, Combinations, Subsequences, and Divide & Conquer.',
        topics: [
          'Basics of Recursion & Recursive Problem Solving',
          'Backtracking Fundamentals',
          'Rat in a Maze & N Queens Problems',
          'Sudoku Solver & Permutations',
          'Combinations, Subsequences & Power Set',
          'Divide & Conquer Approach'
        ]
      },
      {
        title: 'Phase 4: Linked Lists',
        description: 'Singly, Doubly, and Circular Linked Lists, reversing, cycle detection/removal, merging, sorting, cloning, and LRU Cache.',
        topics: [
          'Singly Linked List & Doubly Linked List',
          'Circular Linked List',
          'Reverse Linked List',
          'Detect Cycle & Remove Cycle',
          'Merge Lists & Sort Linked List',
          'Clone Linked List & LRU Cache'
        ]
      },
      {
        title: 'Phase 5: Stack & Queue',
        description: 'Stack/Queue implementations, Circular Queue, Deque, Monotonic Stack, Next Greater/Previous Smaller Element, Histogram, Celebrity Problem, and Min Stack.',
        topics: [
          'Stack & Queue Implementation',
          'Circular Queue & Deque',
          'Priority Queue',
          'Monotonic Stack Problems',
          'Next Greater Element & Previous Smaller Element',
          'Largest Rectangle in Histogram & Celebrity Problem',
          'Valid Parentheses & Min Stack'
        ]
      },
      {
        title: 'Phase 6: Trees',
        description: 'Binary Tree traversals, height, diameter, balanced trees, views, boundary traversal, LCA, Kth Ancestor, Burning Tree, and Morris Traversal.',
        topics: [
          'Binary Tree Fundamentals',
          'Tree Traversals (Preorder, Inorder, Postorder, Level Order)',
          'Height, Diameter & Balanced Tree Checks',
          'Views of Tree & Boundary Traversal',
          'Lowest Common Ancestor (LCA) & Kth Ancestor',
          'Burning Tree Problem & Morris Traversal'
        ]
      },
      {
        title: 'Phase 7: Binary Search Tree',
        description: 'BST operations (insert/delete/search), validation, Kth smallest, LCA, converting, merging BSTs, and largest BST subtree.',
        topics: [
          'BST Basics & Insert/Delete/Search',
          'BST Validation & Kth Smallest Element',
          'LCA in BST',
          'Convert BST & Merge BSTs',
          'Largest BST Subtree in Binary Tree'
        ]
      },
      {
        title: 'Phase 8: Heap',
        description: 'Max Heap, Min Heap, Heapify, Heap Sort, Priority Queue, Merge K Sorted Arrays/Lists, Median in Stream, and Top K Elements.',
        topics: [
          'Max Heap & Min Heap Construction',
          'Heapify Algorithm & Heap Sort',
          'Priority Queue Operations',
          'Merge K Sorted Arrays & Merge K Sorted Lists',
          'Find Median in a Data Stream & Top K Elements'
        ]
      },
      {
        title: 'Phase 9: Hashing',
        description: 'Hash Maps, Hash Tables, frequency counting, custom hashing, collision handling, and practical applications of hashing.',
        topics: [
          'Hash Maps & Hash Tables',
          'Frequency Counting',
          'Custom Hashing Functions',
          'Collision Handling Techniques',
          'Applications of Hashing'
        ]
      },
      {
        title: 'Phase 10: Tries',
        description: 'Trie implementation, insert/search/delete, prefix matching, auto complete, and Maximum XOR problems.',
        topics: [
          'Trie Implementation & Operations (Insert/Search/Delete)',
          'Prefix Matching & Auto Complete',
          'Maximum XOR Problems using Trie'
        ]
      },
      {
        title: 'Phase 11: Graphs',
        description: 'Graph representation, BFS, DFS, cycle detection, Topological Sort, Dijkstra, Bellman-Ford, Floyd Warshall, Prim/Kruskal MST, DSU, Bridges, and Articulation Points.',
        topics: [
          'Graph Representation (Adjacency Matrix & List)',
          'BFS & DFS Traversals',
          'Cycle Detection in Directed & Undirected Graphs',
          'Topological Sort & Kahn\'s Algorithm',
          'Shortest Path: Dijkstra, Bellman Ford & Floyd Warshall',
          'Minimum Spanning Tree: Prim\'s & Kruskal\'s Algorithm',
          'Disjoint Set Union (Union Find / DSU)',
          'Strongly Connected Components (Kosaraju/Tarjan), Bridges & Articulation Points'
        ]
      },
      {
        title: 'Phase 12: Dynamic Programming',
        description: 'Memoization, tabulation, space optimization, Fibonacci, Knapsack, Subset Sum, Partition DP, LCS, LIS, MCM, Edit Distance, Coin Change, House Robber, Palindrome DP.',
        topics: [
          'DP Introduction: Memoization vs Tabulation vs Space Optimization',
          '1D DP: Fibonacci, Coin Change, House Robber & Rod Cutting',
          '2D DP: 0/1 Knapsack, Subset Sum & Partition DP',
          'Grid DP, Longest Common Subsequence (LCS) & Edit Distance',
          'Longest Increasing Subsequence (LIS) & Matrix Chain Multiplication (MCM)',
          'Palindrome DP & Digit DP (Basics)'
        ]
      },
      {
        title: 'Phase 13: Greedy Algorithms',
        description: 'Activity Selection, Fractional Knapsack, Huffman Coding, Job Sequencing, Interval Scheduling, Merge Intervals, Gas Station, and Jump Game.',
        topics: [
          'Activity Selection & Fractional Knapsack',
          'Huffman Coding & Job Sequencing',
          'Interval Scheduling & Merge Intervals',
          'Gas Station & Jump Game'
        ]
      },
      {
        title: 'Phase 14: Advanced Algorithms',
        description: 'Binary Search on Answer, Monotonic Queue, Segment Tree (Basics), Fenwick Tree (BIT), Sparse Table (Basics), and Sweep Line introduction.',
        topics: [
          'Binary Search on Answer',
          'Monotonic Queue',
          'Segment Tree (Basics)',
          'Fenwick Tree / Binary Indexed Tree (BIT)',
          'Sparse Table (Basics)',
          'Sweep Line Algorithm (Introduction)'
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
        title: 'Phase 1: Programming Fundamentals',
        description: 'Flowcharts, Pseudocode, Time & Space Complexity, C++ Basics, Variables, Operators, Input/Output, Conditionals, Loops, Functions, Arrays, Strings, Character Arrays, Vectors, Pointers, References, and Memory Management.',
        topics: [
          'Flowcharts',
          'Pseudocode',
          'Time & Space Complexity',
          'C++ Basics',
          'Variables & Data Types',
          'Operators',
          'Input/Output',
          'Conditional Statements',
          'Loops',
          'Functions',
          'Arrays',
          'Strings',
          'Character Arrays',
          'Vectors',
          'Pointers',
          'References',
          'Memory Management'
        ]
      },
      {
        title: 'Phase 2: Recursion & Basic Algorithms',
        description: 'Recursion, Backtracking, Binary Search, Searching Techniques, Sorting Algorithms (Bubble, Selection, Insertion, Merge, Quick Sort), Divide & Conquer, Bit Manipulation, and Mathematics for DSA.',
        topics: [
          'Recursion',
          'Backtracking',
          'Binary Search',
          'Searching Techniques',
          'Sorting Algorithms',
          'Bubble Sort',
          'Selection Sort',
          'Insertion Sort',
          'Merge Sort',
          'Quick Sort',
          'Divide & Conquer',
          'Bit Manipulation',
          'Mathematics for DSA'
        ]
      },
      {
        title: 'Phase 3: Linear Data Structures',
        description: 'Advanced Arrays, 2D Arrays, Advanced Strings, Linked Lists (Singly, Doubly, Circular), Stack, Queue, Deque, and C++ Standard Template Library (STL).',
        topics: [
          'Arrays (Advanced)',
          '2D Arrays',
          'Strings (Advanced)',
          'Linked List',
          'Singly Linked List',
          'Doubly Linked List',
          'Circular Linked List',
          'Stack',
          'Queue',
          'Deque',
          'STL (Standard Template Library)'
        ]
      },
      {
        title: 'Phase 4: Trees',
        description: 'Binary Tree, Tree Traversals, Binary Search Tree (BST), AVL Tree (Basics), Heap, Priority Queue, Trie, Segment Tree, and Fenwick Tree (BIT).',
        topics: [
          'Binary Tree',
          'Tree Traversals',
          'Binary Search Tree',
          'AVL Tree (Basics)',
          'Heap',
          'Priority Queue',
          'Trie',
          'Segment Tree',
          'Fenwick Tree (BIT)'
        ]
      },
      {
        title: 'Phase 5: Hashing & Graphs',
        description: 'Hash Maps, Hash Tables, Collision Handling, Graph Representation, BFS, DFS, Topological Sort, Shortest Path Algorithms (Dijkstra, Bellman-Ford, Floyd Warshall), Minimum Spanning Tree (Prim\'s, Kruskal\'s), and Disjoint Set Union (Union Find).',
        topics: [
          'Hash Maps',
          'Hash Tables',
          'Collision Handling',
          'Graph Representation',
          'BFS',
          'DFS',
          'Topological Sort',
          'Shortest Path',
          'Dijkstra',
          'Bellman-Ford',
          'Floyd Warshall',
          'Minimum Spanning Tree',
          'Prim\'s Algorithm',
          'Kruskal\'s Algorithm',
          'Disjoint Set Union (Union Find)'
        ]
      },
      {
        title: 'Phase 6: Advanced Algorithms',
        description: 'Greedy Algorithms, Sliding Window, Two Pointers, Prefix Sum, Binary Search on Answer, Meet in the Middle, Monotonic Stack, and Monotonic Queue.',
        topics: [
          'Greedy Algorithms',
          'Sliding Window',
          'Two Pointers',
          'Prefix Sum',
          'Binary Search on Answer',
          'Meet in the Middle',
          'Monotonic Stack',
          'Monotonic Queue'
        ]
      },
      {
        title: 'Phase 7: Dynamic Programming',
        description: 'DP Basics, Memoization, Tabulation, Space Optimization, 1D DP, 2D DP, Knapsack, LIS, LCS, Matrix Chain Multiplication, Partition DP, Digit DP (Basics), Tree DP, and Bitmask DP (Introduction).',
        topics: [
          'DP Basics',
          'Memoization',
          'Tabulation',
          'Space Optimization',
          '1D DP',
          '2D DP',
          'Knapsack',
          'LIS',
          'LCS',
          'Matrix Chain Multiplication',
          'Partition DP',
          'Digit DP (Basics)',
          'Tree DP',
          'Bitmask DP (Introduction)'
        ]
      },
      {
        title: 'Phase 8: Interview Preparation',
        description: 'Company-wise Questions, Pattern-based Questions, LeetCode Problems, Coding Contest Practice, Mock Coding Interviews, Resume Building, HR Interview Preparation, Systematic Problem Solving, and Placement Strategy.',
        topics: [
          'Company-wise Questions',
          'Pattern-based Questions',
          'LeetCode Problems',
          'Coding Contest Practice',
          'Mock Coding Interviews',
          'Resume Building',
          'HR Interview Preparation',
          'Systematic Problem Solving',
          'Placement Strategy'
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
        title: 'Phase 1: System Design Fundamentals',
        description: 'Introduction to System Design, Functional vs Non-Functional Requirements, CAP Theorem, Scalability, Latency vs Throughput, Availability, Reliability, Consistency, and Fault Tolerance.',
        topics: [
          'What is System Design?',
          'Functional vs Non-Functional Requirements',
          'CAP Theorem',
          'Scalability',
          'Latency vs Throughput',
          'Availability',
          'Reliability',
          'Consistency',
          'Fault Tolerance'
        ]
      },
      {
        title: 'Phase 2: Networking & Communication',
        description: 'OSI Model, TCP vs UDP, HTTP / HTTPS, REST APIs, WebSockets, gRPC, DNS, CDN, Reverse Proxy, Load Balancer, and SSL/TLS.',
        topics: [
          'OSI Model',
          'TCP vs UDP',
          'HTTP / HTTPS',
          'REST APIs',
          'WebSockets',
          'gRPC',
          'DNS',
          'CDN',
          'Reverse Proxy',
          'Load Balancer',
          'SSL/TLS'
        ]
      },
      {
        title: 'Phase 3: Protocols',
        description: 'HTTP Methods, Status Codes, Cookies, Sessions, JWT Authentication, OAuth, Webhooks, API Gateway, and Rate Limiting.',
        topics: [
          'HTTP Methods',
          'Status Codes',
          'Cookies',
          'Sessions',
          'JWT Authentication',
          'OAuth',
          'Webhooks',
          'API Gateway',
          'Rate Limiting'
        ]
      },
      {
        title: 'Phase 4: Software Architecture',
        description: 'Monolithic Architecture, Microservices, Service-Oriented Architecture (SOA), Event-Driven Architecture, Layered Architecture, Client-Server Architecture, CQRS, and Event Sourcing.',
        topics: [
          'Monolithic Architecture',
          'Microservices',
          'Service-Oriented Architecture (SOA)',
          'Event-Driven Architecture',
          'Layered Architecture',
          'Client-Server Architecture',
          'CQRS',
          'Event Sourcing'
        ]
      },
      {
        title: 'Phase 5: Web Concepts',
        description: 'Caching, Browser Cache, Redis, Memcached, CDN, API Caching, Cache Invalidation, Compression, and Pagination.',
        topics: [
          'Caching',
          'Browser Cache',
          'Redis',
          'Memcached',
          'CDN',
          'API Caching',
          'Cache Invalidation',
          'Compression',
          'Pagination'
        ]
      },
      {
        title: 'Phase 6: Scalability',
        description: 'Vertical Scaling, Horizontal Scaling, Auto Scaling, Stateless Servers, Sticky Sessions, Load Balancing Algorithms, Consistent Hashing, Sharding, and Replication.',
        topics: [
          'Vertical Scaling',
          'Horizontal Scaling',
          'Auto Scaling',
          'Stateless Servers',
          'Sticky Sessions',
          'Load Balancing Algorithms',
          'Consistent Hashing',
          'Sharding',
          'Replication'
        ]
      },
      {
        title: 'Phase 7: Databases & Storage',
        description: 'SQL (MySQL, PostgreSQL, ACID, Transactions, Indexing, Normalization), NoSQL (MongoDB, Cassandra, DynamoDB, Redis, Key-Value, Document, Wide Column, Graph), and Storage (Blob, Object, File, Distributed, Partitioning).',
        topics: [
          'SQL (MySQL, PostgreSQL, ACID, Transactions)',
          'Indexing & Normalization',
          'NoSQL (MongoDB, Cassandra, DynamoDB, Redis)',
          'Key-Value, Document & Wide Column Stores',
          'Graph Databases',
          'Blob, Object & File Storage',
          'Distributed Storage & Data Partitioning'
        ]
      },
      {
        title: 'Phase 8: Performance Optimization',
        description: 'Caching Strategies, Query Optimization, Database Indexing, Compression, Lazy Loading, Connection Pooling, Batch Processing, Asynchronous Processing, and CDN Optimization.',
        topics: [
          'Caching Strategies',
          'Query Optimization',
          'Database Indexing',
          'Compression',
          'Lazy Loading',
          'Connection Pooling',
          'Batch Processing',
          'Asynchronous Processing',
          'CDN Optimization'
        ]
      },
      {
        title: 'Phase 9: Reliability & Availability',
        description: 'Replication, Backups, Disaster Recovery, Failover, Health Checks, Circuit Breaker, Retry Mechanism, Idempotency, Monitoring, and Logging.',
        topics: [
          'Replication & Backups',
          'Disaster Recovery & Failover',
          'Health Checks',
          'Circuit Breaker Pattern',
          'Retry Mechanism & Idempotency',
          'Monitoring & Logging'
        ]
      },
      {
        title: 'Phase 10: Security',
        description: 'Authentication, Authorization, JWT, OAuth 2.0, HTTPS, Encryption, Hashing, SQL Injection Prevention, XSS Prevention, CSRF Prevention, Rate Limiting, and API Security.',
        topics: [
          'Authentication & Authorization',
          'JWT & OAuth 2.0',
          'HTTPS, Encryption & Hashing',
          'SQL Injection Prevention',
          'XSS & CSRF Prevention',
          'Rate Limiting & API Security'
        ]
      },
      {
        title: 'Phase 11: System Design Blueprint',
        description: 'Requirement Gathering, Capacity Estimation, API Design, Database Design, High-Level Design, Low-Level Components, Bottleneck Analysis, Scaling Strategy, Trade-offs, and Final Architecture.',
        topics: [
          'Requirement Gathering',
          'Capacity Estimation',
          'API & Database Design',
          'High-Level & Low-Level Component Design',
          'Bottleneck Analysis',
          'Scaling Strategy & Trade-offs',
          'Final Architecture Layout'
        ]
      },
      {
        title: 'Phase 12: Real-World System Design Problems',
        description: 'Designing TinyURL, BookMyShow, Twitter/X Feed, Instagram Feed, Notification Service, WhatsApp, eBay Auction System, Airbnb, Google Drive, Dropbox, YouTube, Google Search, Amazon, Uber, and Google Docs.',
        topics: [
          'TinyURL (URL Shortener)',
          'BookMyShow',
          'Twitter/X Feed & Instagram Feed',
          'Notification Service & WhatsApp',
          'eBay Auction System & Airbnb',
          'Google Drive & Dropbox',
          'YouTube & Google Search',
          'Amazon & Uber',
          'Google Docs'
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
        title: 'Phase 1: JavaScript Fundamentals (Bonus)',
        description: 'JavaScript basics, V8 Engine, Node.js Runtime, Variables & Data Types, Functions, Scope, Closures, Objects & Arrays, Modules, Callbacks, Promises, Async/Await, Event Loop, Error Handling, and ES Modules vs CommonJS.',
        topics: [
          'JavaScript basics',
          'V8 Engine',
          'Node.js Runtime',
          'Variables & Data Types',
          'Functions',
          'Scope',
          'Closures',
          'Objects & Arrays',
          'Modules',
          'Callbacks',
          'Promises',
          'Async/Await',
          'Event Loop',
          'Error Handling',
          'ES Modules vs CommonJS'
        ]
      },
      {
        title: 'Phase 2: Node.js Core',
        description: 'Installing Node.js, npm & package.json, REPL, Running Node Scripts, Modules, File System (fs), Path Module, OS Module, Process Object, Events Module, Buffers, Streams, and Timers.',
        topics: [
          'Installing Node.js',
          'npm & package.json',
          'REPL',
          'Running Node Scripts',
          'Modules',
          'File System (fs)',
          'Path Module',
          'OS Module',
          'Process Object',
          'Events Module',
          'Buffers',
          'Streams',
          'Timers'
        ]
      },
      {
        title: 'Phase 3: HTTP & Native Web Server',
        description: 'HTTP Module, Creating Web Servers, Routing, Request & Response, Serving Static Files, JSON APIs, Status Codes, Headers, and URL Parsing.',
        topics: [
          'HTTP Module',
          'Creating Web Servers',
          'Routing',
          'Request & Response',
          'Serving Static Files',
          'JSON APIs',
          'Status Codes',
          'Headers',
          'URL Parsing'
        ]
      },
      {
        title: 'Phase 4: Express.js Fundamentals',
        description: 'Express Installation, Express Routing, Route Parameters, Query Parameters, Middleware, Static Middleware, Error Middleware, MVC Architecture, Controllers, Routers, Services, Environment Variables, and Book Store REST API Project.',
        topics: [
          'Express Installation & Routing',
          'Route Parameters & Query Parameters',
          'Middleware, Static & Error Middleware',
          'MVC Architecture (Controllers, Routers, Services)',
          'Environment Variables',
          'Project: Book Store REST API'
        ]
      },
      {
        title: 'Phase 5: Databases (SQL)',
        description: 'SQL vs NoSQL, PostgreSQL, Docker PostgreSQL, Database Design, Tables, Relationships, Primary Keys, Foreign Keys, Indexes, and CRUD Operations.',
        topics: [
          'SQL vs NoSQL',
          'PostgreSQL & Docker PostgreSQL',
          'Database Design & Tables',
          'Relationships (Primary & Foreign Keys)',
          'Indexes & CRUD Operations'
        ]
      },
      {
        title: 'Phase 6: Drizzle ORM',
        description: 'ORM Basics, Drizzle ORM Setup, Schema Design, Migrations, Queries, Relations, and CRUD using ORM.',
        topics: [
          'ORM Basics & Drizzle ORM Setup',
          'Schema Design & Migrations',
          'Queries & Relations',
          'CRUD using Drizzle ORM'
        ]
      },
      {
        title: 'Phase 7: REST API Development',
        description: 'REST Principles, CRUD APIs, Validation, Request Parsing, API Architecture, API Testing, and Postman Collections.',
        topics: [
          'REST Principles & CRUD APIs',
          'Validation & Request Parsing',
          'API Architecture',
          'API Testing & Postman Collections'
        ]
      },
      {
        title: 'Phase 8: Authentication & Authorization',
        description: 'Sessions, Cookies, JWT Authentication, Password Hashing, Login, Signup, Protected Routes, Authorization, Role-Based Access Control (RBAC), and Middleware Security.',
        topics: [
          'Sessions & Cookies',
          'JWT Authentication & Password Hashing',
          'Login & Signup Workflows',
          'Protected Routes & Authorization',
          'Role-Based Access Control (RBAC)',
          'Middleware Security'
        ]
      },
      {
        title: 'Phase 9: MongoDB (Bonus)',
        description: 'MongoDB Installation, Collections, Documents, CRUD Operations, Queries, Indexes, Aggregation Framework, and MongoDB with Node.js.',
        topics: [
          'MongoDB Installation',
          'Collections & Documents',
          'CRUD Operations & Queries',
          'Indexes & Aggregation Framework',
          'MongoDB with Node.js'
        ]
      },
      {
        title: 'Phase 10: Mega Project – URL Shortener',
        description: 'User Authentication, PostgreSQL Database, Drizzle ORM, URL Generation, Short Links, Analytics, Protected Dashboard, API Development, and Production Structure.',
        topics: [
          'User Authentication & Protected Dashboard',
          'PostgreSQL Database & Drizzle ORM',
          'URL Generation & Short Links Engine',
          'Analytics & Production Structure'
        ]
      },
      {
        title: 'Phase 11: Docker (Bonus)',
        description: 'Docker Basics, Images, Containers, Docker CLI, Dockerfile, Docker Compose, and Containerizing Node.js Apps.',
        topics: [
          'Docker Basics & CLI',
          'Images & Containers',
          'Dockerfile & Docker Compose',
          'Containerizing Node.js Applications'
        ]
      },
      {
        title: 'Phase 12: MongoDB Aggregation',
        description: 'Aggregation Pipeline, Match, Group, Project, Sort, Lookup, and Advanced Aggregation Queries.',
        topics: [
          'Aggregation Pipeline Fundamentals',
          '$match, $group, $project, $sort, $lookup',
          'Advanced Aggregation Queries'
        ]
      },
      {
        title: 'Phase 13: Major Project – Basecamp Clone',
        description: 'Project Planning, Team Management, Authentication, Projects, Tasks, APIs, Database Design, and Full Backend Architecture.',
        topics: [
          'Project Planning & Database Design',
          'Team Management & Authentication',
          'Projects & Tasks APIs',
          'Full Backend Architecture'
        ]
      },
      {
        title: 'Phase 14: System Design',
        description: 'Scaling Applications, Monolith vs Microservices, Caching, Load Balancers, Databases, Architecture Patterns, API Design, Performance Optimization, and Production Readiness.',
        topics: [
          'Scaling Applications & Architecture Patterns',
          'Monolith vs Microservices',
          'Caching & Load Balancers',
          'API Design & Performance Optimization',
          'Production Readiness'
        ]
      },
      {
        title: 'Phase 15: Git (Bonus)',
        description: 'Git Basics, GitHub, Branches, Merge, Pull Requests, Collaboration, and Version Control Workflow.',
        topics: [
          'Git Basics & GitHub',
          'Branches, Merge & Pull Requests',
          'Collaboration & Version Control Workflow'
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
        title: 'Phase 1: Microservices Fundamentals',
        description: 'Introduction to Microservices, Monolithic vs SOA vs Microservices, Benefits & Challenges, Service Boundaries, Domain Driven Design (DDD) Basics, Cloud Native Applications, 12/15 Factor Methodology, and Distributed Systems Concepts.',
        topics: [
          'Introduction to Microservices',
          'Monolithic vs SOA vs Microservices',
          'Benefits & Challenges',
          'Service Boundaries',
          'Domain Driven Design (DDD) Basics',
          'Cloud Native Applications',
          '12/15 Factor Methodology',
          'Distributed Systems Concepts'
        ]
      },
      {
        title: 'Phase 2: Spring Boot Fundamentals',
        description: 'Spring Boot Setup, Maven, REST APIs, Controllers, Services, Repository Layer, Spring Data JPA, Hibernate, MySQL Integration, Validation, Exception Handling, and Configuration Properties.',
        topics: [
          'Spring Boot Setup & Maven',
          'REST APIs, Controllers & Services',
          'Repository Layer, Spring Data JPA & Hibernate',
          'MySQL Integration',
          'Validation & Exception Handling',
          'Configuration Properties'
        ]
      },
      {
        title: 'Phase 3: Building Production Microservices',
        description: 'Building Accounts Service, Cards Service, Loans Service, Gateway Service, Config Server, Eureka Server with CRUD APIs, DTOs, Mapping, Layered Architecture, Externalized Configuration, Profiles, and Environment Variables.',
        topics: [
          'Accounts, Cards & Loans Services',
          'Gateway Service, Config Server & Eureka Server',
          'CRUD APIs, DTOs & Mapping',
          'Layered Architecture',
          'Externalized Configuration & Profiles',
          'Environment Variables'
        ]
      },
      {
        title: 'Phase 4: Spring Cloud',
        description: 'Spring Cloud Overview, Config Server, Config Client, Git-based Configuration, Refresh Configuration, and Distributed Configuration.',
        topics: [
          'Spring Cloud Overview',
          'Config Server & Config Client',
          'Git-based Configuration',
          'Refresh Configuration',
          'Distributed Configuration'
        ]
      },
      {
        title: 'Phase 5: Service Discovery',
        description: 'Eureka Server, Eureka Client, Service Registration, Service Discovery, Load Balancing, and Dynamic Scaling.',
        topics: [
          'Eureka Server & Eureka Client',
          'Service Registration & Service Discovery',
          'Load Balancing',
          'Dynamic Scaling'
        ]
      },
      {
        title: 'Phase 6: API Gateway',
        description: 'Spring Cloud Gateway, Routing, Filters, Global Filters, Authentication Filters, Rate Limiting, and Cross-cutting Concerns.',
        topics: [
          'Spring Cloud Gateway',
          'Routing & Filters',
          'Global & Authentication Filters',
          'Rate Limiting & Cross-cutting Concerns'
        ]
      },
      {
        title: 'Phase 7: Inter-Service Communication',
        description: 'REST Communication, OpenFeign Client, Service-to-Service Calls, Load Balanced Communication, and Timeout Handling.',
        topics: [
          'REST Communication',
          'OpenFeign Client',
          'Service-to-Service Calls',
          'Load Balanced Communication',
          'Timeout Handling'
        ]
      },
      {
        title: 'Phase 8: Resilience & Fault Tolerance',
        description: 'Resilience4j, Circuit Breaker, Retry, Bulkhead, Rate Limiter, Time Limiter, Fallback Methods, and Failure Handling.',
        topics: [
          'Resilience4j Overview',
          'Circuit Breaker & Retry',
          'Bulkhead & Rate Limiter',
          'Time Limiter & Fallback Methods',
          'Failure Handling'
        ]
      },
      {
        title: 'Phase 9: Docker',
        description: 'Docker Basics, Containers, Images, Docker Architecture, Docker CLI, Docker Hub, Dockerfile, Image Optimization, Docker Networking, Docker Volumes, Multi-stage Builds, Docker Compose, and Running Complete Microservices Stack.',
        topics: [
          'Docker Basics, Containers & Images',
          'Docker Architecture, CLI & Docker Hub',
          'Dockerfile & Image Optimization',
          'Docker Networking & Volumes',
          'Multi-stage Builds & Docker Compose',
          'Running Complete Microservices Stack'
        ]
      },
      {
        title: 'Phase 10: Kubernetes',
        description: 'Kubernetes Architecture, Pods, ReplicaSets, Deployments, Services, Labels, Selectors, Namespaces, ConfigMaps, Secrets, Ingress, Rolling Updates, Rollbacks, Auto Scaling, Resource Limits, Health Checks, Liveness Probe, and Readiness Probe.',
        topics: [
          'Kubernetes Architecture, Pods & ReplicaSets',
          'Deployments & Services',
          'Labels, Selectors & Namespaces',
          'ConfigMaps & Secrets',
          'Ingress, Rolling Updates & Rollbacks',
          'Auto Scaling & Resource Limits',
          'Health Checks (Liveness & Readiness Probes)'
        ]
      },
      {
        title: 'Phase 11: Helm',
        description: 'Helm Introduction, Helm Charts, Templates, Values Files, Releases, Installing Applications, and Managing Helm Deployments.',
        topics: [
          'Helm Introduction & Helm Charts',
          'Templates & Values Files',
          'Releases & Installing Applications',
          'Managing Helm Deployments'
        ]
      },
      {
        title: 'Phase 12: Security',
        description: 'Spring Security, OAuth2, OpenID Connect, JWT Authentication, Authorization, Authentication Flow, Resource Server, and Secure APIs.',
        topics: [
          'Spring Security Overview',
          'OAuth2 & OpenID Connect',
          'JWT Authentication & Authorization',
          'Authentication Flow & Resource Server',
          'Securing REST APIs'
        ]
      },
      {
        title: 'Phase 13: Event-Driven Microservices',
        description: 'Event-Driven Architecture, Asynchronous Communication, RabbitMQ, Kafka, Producers, Consumers, Topics, Queues, Message Routing, and Dead Letter Queues.',
        topics: [
          'Event-Driven Architecture & Async Messaging',
          'RabbitMQ & Apache Kafka',
          'Producers, Consumers, Topics & Queues',
          'Message Routing & Dead Letter Queues'
        ]
      },
      {
        title: 'Phase 14: Spring Cloud Stream',
        description: 'Spring Cloud Stream, Functional Programming Model, Message Binding, Event Publishing, and Event Consumption.',
        topics: [
          'Spring Cloud Stream Fundamentals',
          'Functional Programming Model',
          'Message Binding',
          'Event Publishing & Consumption'
        ]
      },
      {
        title: 'Phase 15: Spring Cloud Function',
        description: 'Functional Beans, Function Composition, Event Processing, and Cloud Function Integration.',
        topics: [
          'Functional Beans & Function Composition',
          'Event Processing',
          'Cloud Function Integration'
        ]
      },
      {
        title: 'Phase 16: Observability & Monitoring',
        description: 'Micrometer, Prometheus, Grafana, Loki, Promtail, Tempo, Distributed Tracing, Metrics Collection, Log Aggregation, and Dashboard Creation.',
        topics: [
          'Micrometer, Prometheus & Grafana',
          'Loki, Promtail & Tempo',
          'Distributed Tracing & Metrics Collection',
          'Log Aggregation & Dashboard Creation'
        ]
      },
      {
        title: 'Phase 17: API Documentation',
        description: 'OpenAPI Specification, Swagger UI, API Documentation, and Testing Endpoints.',
        topics: [
          'OpenAPI Specification',
          'Swagger UI',
          'API Documentation',
          'Testing Endpoints'
        ]
      },
      {
        title: 'Phase 18: Configuration & Deployment',
        description: 'Profiles, Environment Variables, External Configuration, Secrets Management, and Production Configuration.',
        topics: [
          'Profiles & Environment Variables',
          'External Configuration',
          'Secrets Management',
          'Production Configuration'
        ]
      },
      {
        title: 'Phase 19: Cloud Native Practices',
        description: 'Cloud Native Principles, Containerized Applications, Scalability, Stateless Services, High Availability, and Microservice Best Practices.',
        topics: [
          'Cloud Native Principles',
          'Containerized Applications & Scalability',
          'Stateless Services & High Availability',
          'Microservice Best Practices'
        ]
      },
      {
        title: 'Phase 20: End-to-End Deployment',
        description: 'Build Complete Microservices System, Docker Deployment, Docker Compose Deployment, Kubernetes Deployment, Helm Deployment, Monitoring Setup, Logging Setup, and Security Setup.',
        topics: [
          'Build Complete Microservices System',
          'Docker & Docker Compose Deployment',
          'Kubernetes & Helm Deployment',
          'Monitoring, Logging & Security Setup'
        ]
      },
      {
        title: 'Phase 21: Best Practices',
        description: 'Production Architecture, Microservice Design Patterns, API Versioning, Error Handling, Logging Standards, Monitoring Standards, Performance Optimization, Scalability, and Production Readiness Checklist.',
        topics: [
          'Production Architecture & Design Patterns',
          'API Versioning & Error Handling',
          'Logging & Monitoring Standards',
          'Performance Optimization & Scalability',
          'Production Readiness Checklist'
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
        title: 'Phase 1: Java Setup',
        description: 'Install JDK, Java Installation (Windows, Mac, Linux), Environment Variables, JShell, IDE Setup, and Troubleshooting.',
        topics: [
          'Install JDK',
          'Java Installation (Windows, Mac, Linux)',
          'Environment Variables',
          'JShell',
          'IDE Setup',
          'Troubleshooting'
        ]
      },
      {
        title: 'Phase 2: Java Fundamentals',
        description: 'Java History, JDK vs JRE vs JVM, Bytecode, Java Compilation Process, Hello World, Java Program Structure, and Comments.',
        topics: [
          'Java History',
          'JDK vs JRE vs JVM',
          'Bytecode',
          'Java Compilation Process',
          'Hello World',
          'Java Program Structure',
          'Comments'
        ]
      },
      {
        title: 'Phase 3: Variables & Data Types',
        description: 'Primitive Data Types, Non-Primitive Types, Variables, Constants, Type Casting, Wrapper Classes, and Literals.',
        topics: [
          'Primitive Data Types',
          'Non-Primitive Types',
          'Variables & Constants',
          'Type Casting',
          'Wrapper Classes',
          'Literals'
        ]
      },
      {
        title: 'Phase 4: Operators',
        description: 'Arithmetic, Assignment, Relational, Logical, Unary, Bitwise, Ternary, Operator Precedence, and Short Circuit Operators.',
        topics: [
          'Arithmetic & Assignment Operators',
          'Relational & Logical Operators',
          'Unary, Bitwise & Ternary Operators',
          'Operator Precedence & Short Circuit Operators'
        ]
      },
      {
        title: 'Phase 5: Input & Output',
        description: 'Scanner Class, Reading Numbers, Reading Strings, and Formatted Output.',
        topics: [
          'Scanner Class',
          'Reading Numbers',
          'Reading Strings',
          'Formatted Output'
        ]
      },
      {
        title: 'Phase 6: Methods',
        description: 'Methods, Parameters, Arguments, Return Values, Method Overloading, and Pass by Value.',
        topics: [
          'Methods, Parameters & Arguments',
          'Return Values',
          'Method Overloading',
          'Pass by Value'
        ]
      },
      {
        title: 'Phase 7: Conditional Statements',
        description: 'if, if-else, Nested if, Switch, Switch Expressions (Java 14+), and Ternary Operator.',
        topics: [
          'if & if-else Statements',
          'Nested if & Switch',
          'Switch Expressions (Java 14+)',
          'Ternary Operator'
        ]
      },
      {
        title: 'Phase 8: Loops',
        description: 'for Loop, while Loop, do-while, Nested Loops, break, continue, and Enhanced for Loop.',
        topics: [
          'for, while & do-while Loops',
          'Nested Loops',
          'break & continue',
          'Enhanced for Loop'
        ]
      },
      {
        title: 'Phase 9: Object-Oriented Programming (OOP)',
        description: 'Classes, Objects, Constructors, this Keyword, Encapsulation, Abstraction, Inheritance, Polymorphism, Method Overriding, Method Overloading, and Access Modifiers.',
        topics: [
          'Classes, Objects & Constructors',
          'this Keyword & Encapsulation',
          'Abstraction & Inheritance',
          'Polymorphism, Method Overriding & Overloading',
          'Access Modifiers'
        ]
      },
      {
        title: 'Phase 10: Strings',
        description: 'String, String Methods, StringBuilder, StringBuffer, Text Blocks, and String Comparison.',
        topics: [
          'String & String Methods',
          'StringBuilder & StringBuffer',
          'Text Blocks',
          'String Comparison'
        ]
      },
      {
        title: 'Phase 11: Arrays',
        description: '1D Arrays, 2D Arrays, Array of Objects, Arrays Utility Class, and Array Algorithms.',
        topics: [
          '1D Arrays & 2D Arrays',
          'Array of Objects',
          'Arrays Utility Class',
          'Array Algorithms'
        ]
      },
      {
        title: 'Phase 12: Collections Framework',
        description: 'ArrayList, LinkedList, Vector, Stack, Queue, PriorityQueue, HashSet, LinkedHashSet, TreeSet, HashMap, LinkedHashMap, TreeMap, and Iterator.',
        topics: [
          'ArrayList, LinkedList, Vector & Stack',
          'Queue & PriorityQueue',
          'HashSet, LinkedHashSet & TreeSet',
          'HashMap, LinkedHashMap & TreeMap',
          'Iterator'
        ]
      },
      {
        title: 'Phase 13: Exception Handling',
        description: 'try, catch, finally, throw, throws, Custom Exceptions, Checked Exceptions, and Unchecked Exceptions.',
        topics: [
          'try, catch & finally',
          'throw & throws',
          'Custom Exceptions',
          'Checked & Unchecked Exceptions'
        ]
      },
      {
        title: 'Phase 14: Packages',
        description: 'Creating Packages, Import Statements, and Package Structure.',
        topics: [
          'Creating Packages',
          'Import Statements',
          'Package Structure'
        ]
      },
      {
        title: 'Phase 15: Java Built-in Classes',
        description: 'Math, Random, BigInteger, BigDecimal, Objects Class, and Wrapper Classes.',
        topics: [
          'Math & Random Classes',
          'BigInteger & BigDecimal',
          'Objects Class & Wrapper Classes'
        ]
      },
      {
        title: 'Phase 16: Date & Time API',
        description: 'LocalDate, LocalTime, LocalDateTime, and Formatting Dates.',
        topics: [
          'LocalDate & LocalTime',
          'LocalDateTime',
          'Formatting Dates'
        ]
      },
      {
        title: 'Phase 17: File Handling',
        description: 'File Class, Reading Files, Writing Files, BufferedReader, BufferedWriter, and Scanner with Files.',
        topics: [
          'File Class',
          'Reading & Writing Files',
          'BufferedReader & BufferedWriter',
          'Scanner with Files'
        ]
      },
      {
        title: 'Phase 18: Java Generics',
        description: 'Generic Classes, Generic Methods, and Wildcards.',
        topics: [
          'Generic Classes',
          'Generic Methods',
          'Wildcards'
        ]
      },
      {
        title: 'Phase 19: Functional Programming',
        description: 'Lambda Expressions, Functional Interfaces, and Method References.',
        topics: [
          'Lambda Expressions',
          'Functional Interfaces',
          'Method References'
        ]
      },
      {
        title: 'Phase 20: Streams API',
        description: 'Stream Basics, Filter, Map, Reduce, Collect, Sorting, Parallel Streams, and Stream Gatherers (Java 24).',
        topics: [
          'Stream Basics, Filter, Map & Reduce',
          'Collect & Sorting',
          'Parallel Streams',
          'Stream Gatherers (Java 24)'
        ]
      },
      {
        title: 'Phase 21: Modern Java Features',
        description: 'Records, Sealed Classes, Pattern Matching, Switch Expressions, Text Blocks, Virtual Threads (Project Loom), Markdown Documentation Comments, Unnamed Variables, and New Java 24 Features.',
        topics: [
          'Records & Sealed Classes',
          'Pattern Matching & Switch Expressions',
          'Text Blocks & Virtual Threads (Project Loom)',
          'Markdown Documentation Comments & Unnamed Variables',
          'New Java 24 Features'
        ]
      },
      {
        title: 'Phase 22: Object Class',
        description: 'equals(), hashCode(), toString(), and clone().',
        topics: [
          'equals() & hashCode()',
          'toString() & clone()'
        ]
      },
      {
        title: 'Phase 23: Interfaces',
        description: 'Interface Basics, Default Methods, Static Methods, and Functional Interfaces.',
        topics: [
          'Interface Basics',
          'Default Methods & Static Methods',
          'Functional Interfaces'
        ]
      },
      {
        title: 'Phase 24: Abstract Classes',
        description: 'Abstract Methods, Abstract Classes, and Difference Between Interface & Abstract Class.',
        topics: [
          'Abstract Methods',
          'Abstract Classes',
          'Difference Between Interface & Abstract Class'
        ]
      },
      {
        title: 'Phase 25: Enums',
        description: 'Enum Basics and Enum Methods.',
        topics: [
          'Enum Basics',
          'Enum Methods'
        ]
      },
      {
        title: 'Phase 26: Java Memory',
        description: 'Stack Memory, Heap Memory, and Garbage Collection.',
        topics: [
          'Stack Memory & Heap Memory',
          'Garbage Collection'
        ]
      },
      {
        title: 'Phase 27: Multithreading',
        description: 'Threads, Runnable, Thread Lifecycle, Synchronization, and Virtual Threads.',
        topics: [
          'Threads & Runnable Interface',
          'Thread Lifecycle & Synchronization',
          'Virtual Threads'
        ]
      },
      {
        title: 'Phase 28: Maven',
        description: 'Maven Introduction, pom.xml, and Dependency Management.',
        topics: [
          'Maven Introduction',
          'pom.xml Configuration',
          'Dependency Management'
        ]
      },
      {
        title: 'Phase 29: Spring Framework Basics',
        description: 'Spring Introduction, Dependency Injection, and IoC Container.',
        topics: [
          'Spring Introduction',
          'Dependency Injection',
          'IoC Container'
        ]
      },
      {
        title: 'Phase 30: Spring Boot',
        description: 'Spring Boot Setup, REST APIs, Controllers, Services, Dependency Injection, and Spring Boot Project Structure.',
        topics: [
          'Spring Boot Setup & Project Structure',
          'REST APIs, Controllers & Services',
          'Dependency Injection'
        ]
      },
      {
        title: 'Phase 31: JPA & Hibernate',
        description: 'ORM Basics, Entities, Repositories, CRUD Operations, Relationships, and Hibernate.',
        topics: [
          'ORM Basics & Entities',
          'Repositories & CRUD Operations',
          'Relationships & Hibernate'
        ]
      },
      {
        title: 'Phase 32: REST API Project',
        description: 'REST Endpoints, JSON, HTTP Methods, Request Mapping, and ResponseEntity.',
        topics: [
          'REST Endpoints & JSON',
          'HTTP Methods & Request Mapping',
          'ResponseEntity'
        ]
      },
      {
        title: 'Phase 33: Interview Preparation & Projects Included',
        description: 'Java & OOP Interview Questions, Coding Exercises, Best Practices, Puzzles, Multiple Console Apps, OOP Mini Projects, Spring Boot REST API Project, and CRUD Application using Spring Boot + JPA + Hibernate.',
        topics: [
          'Java & OOP Interview Questions',
          'Coding Exercises, Best Practices & Puzzles',
          'Multiple Console Applications & OOP Mini Projects',
          'Spring Boot REST API Project',
          'CRUD Application using Spring Boot + JPA + Hibernate'
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
        title: 'Phase 1: Python Fundamentals',
        description: 'Python Syntax, Variables & Data Types, Operators, Conditional Statements, Loops, Strings, Lists, Tuples, Sets, Dictionaries, Functions, Lambda Functions, map(), filter(), Modules & Packages, File Handling, Exception Handling, OOP, Inheritance, Polymorphism, Encapsulation, Abstraction, Magic Methods, Custom Exceptions, Operator Overloading, Iterators, Generators, Decorators, NumPy, Pandas, Data Manipulation, Reading CSV/Excel/SQL Data, Logging, Multiple Loggers, and Production Logging.',
        topics: [
          'Python Syntax, Variables & Data Types',
          'Operators & Conditional Statements',
          'Loops (for, while, break, continue)',
          'Strings, Lists, Tuples, Sets & Dictionaries',
          'Functions, Lambda Functions, map() & filter()',
          'Modules, Packages & File Handling',
          'Exception Handling & Custom Exceptions',
          'OOP: Inheritance, Polymorphism, Encapsulation & Abstraction',
          'Magic Methods & Operator Overloading',
          'Iterators, Generators & Decorators',
          'NumPy, Pandas & Data Manipulation',
          'Reading CSV/Excel/SQL Data',
          'Logging, Multiple Loggers & Production Logging'
        ]
      },
      {
        title: 'Phase 2: Flask',
        description: 'Flask Introduction, Routing, HTML Templates, Jinja2, Forms, GET & POST Requests, Dynamic URLs, REST APIs, and PUT & DELETE APIs.',
        topics: [
          'Flask Introduction & Routing',
          'HTML Templates, Jinja2 & Forms',
          'GET & POST Requests & Dynamic URLs',
          'REST APIs (PUT & DELETE APIs)'
        ]
      },
      {
        title: 'Phase 3: Git & GitHub',
        description: 'Git Installation, Repository Creation, Commit, Push, Pull, Branching, Merge, Checkout, Git Log, Merge Conflicts, and GitHub Workflow.',
        topics: [
          'Git Installation & Repository Creation',
          'Commit, Push, Pull & Git Log',
          'Branching, Merge & Checkout',
          'Merge Conflicts & GitHub Workflow'
        ]
      },
      {
        title: 'Phase 4: MLflow',
        description: 'MLflow Introduction, Experiment Tracking, Tracking Server, ML Projects, Model Logging, Model Registry, Artifact Management, Model Inference, and Production Tracking.',
        topics: [
          'MLflow Introduction & Experiment Tracking',
          'Tracking Server & ML Projects',
          'Model Logging & Model Registry',
          'Artifact Management & Model Inference',
          'Production Tracking'
        ]
      },
      {
        title: 'Phase 5: MLflow Integration',
        description: 'House Price Prediction, Data Preprocessing, Training, Logging Metrics, Logging Parameters, and Registering Models.',
        topics: [
          'House Price Prediction Project',
          'Data Preprocessing & Training',
          'Logging Metrics & Logging Parameters',
          'Registering Models'
        ]
      },
      {
        title: 'Phase 6: Deep Learning + MLflow',
        description: 'ANN, TensorFlow Integration, Model Tracking, and Experiment Comparison.',
        topics: [
          'Artificial Neural Networks (ANN)',
          'TensorFlow Integration',
          'Model Tracking & Experiment Comparison'
        ]
      },
      {
        title: 'Phase 7: Data Version Control (DVC)',
        description: 'DVC Installation, Dataset Versioning, Pipeline Creation, Data Tracking, and Model Versioning.',
        topics: [
          'DVC Installation',
          'Dataset Versioning & Data Tracking',
          'Pipeline Creation',
          'Model Versioning'
        ]
      },
      {
        title: 'Phase 8: DagsHub',
        description: 'DagsHub Introduction, Remote Repository, Git + DVC Integration, and Experiment Tracking.',
        topics: [
          'DagsHub Introduction & Remote Repository',
          'Git + DVC Integration',
          'Experiment Tracking on DagsHub'
        ]
      },
      {
        title: 'Phase 9: End-to-End MLOps Pipeline',
        description: 'Git, DVC, MLflow, DagsHub, Complete Pipeline, Version Control, and Experiment Tracking.',
        topics: [
          'Git, DVC, MLflow & DagsHub Integration',
          'Complete MLOps Pipeline',
          'Version Control & Experiment Tracking'
        ]
      },
      {
        title: 'Phase 10: MLflow + AWS',
        description: 'AWS Setup, S3, MLflow Server on AWS, Artifact Storage, and Cloud Experiment Tracking.',
        topics: [
          'AWS Setup & S3 Configuration',
          'MLflow Server on AWS',
          'Artifact Storage & Cloud Experiment Tracking'
        ]
      },
      {
        title: 'Phase 11: Docker (Basic to Advanced)',
        description: 'Docker Installation, Docker Images, Containers, Dockerfile, Docker Compose, Volumes, Networking, Environment Variables, and Production Deployment.',
        topics: [
          'Docker Installation, Images & Containers',
          'Dockerfile & Docker Compose',
          'Volumes, Networking & Environment Variables',
          'Production Deployment'
        ]
      },
      {
        title: 'Phase 12: Apache Airflow',
        description: 'Airflow Basics, DAGs, Operators, Scheduling, Task Dependencies, Airflow UI, and Workflow Automation.',
        topics: [
          'Airflow Basics & Architecture',
          'DAGs, Operators & Scheduling',
          'Task Dependencies & Airflow UI',
          'Workflow Automation'
        ]
      },
      {
        title: 'Phase 13: ETL Pipelines',
        description: 'Extract, Transform, Load, PostgreSQL, API Integration, Airflow, Astro Cloud, and AWS Deployment.',
        topics: [
          'Extract, Transform, Load (ETL)',
          'PostgreSQL & API Integration',
          'Airflow & Astro Cloud',
          'AWS Deployment'
        ]
      },
      {
        title: 'Phase 14: GitHub Actions (CI/CD)',
        description: 'GitHub Actions Basics, YAML Workflow, Build Pipeline, Testing, Docker Build, DockerHub Push, and Automated Deployment.',
        topics: [
          'GitHub Actions Basics & YAML Workflow',
          'Build Pipeline & Automated Testing',
          'Docker Build & DockerHub Push',
          'Automated Deployment'
        ]
      },
      {
        title: 'Phase 15: End-to-End Data Science Project',
        description: 'Project Structure, Modular Coding, Configuration Files, Data Ingestion, Data Validation, Data Transformation, Model Trainer, Prediction Pipeline, and Flask Deployment.',
        topics: [
          'Project Structure & Modular Coding',
          'Configuration Files & Settings',
          'Data Ingestion, Validation & Transformation',
          'Model Trainer & Prediction Pipeline',
          'Flask Deployment'
        ]
      },
      {
        title: 'Phase 16: Network Security System Project',
        description: 'ETL Pipeline, Feature Engineering, Model Training, Pipeline Automation, and Deployment.',
        topics: [
          'ETL Pipeline & Feature Engineering',
          'Model Training & Pipeline Automation',
          'Network Security Deployment'
        ]
      },
      {
        title: 'Phase 17: Cloud Deployment',
        description: 'AWS Deployment, Azure Deployment, CI/CD Integration, and Production Deployment.',
        topics: [
          'AWS Deployment',
          'Azure Deployment',
          'CI/CD Integration & Production Deployment'
        ]
      },
      {
        title: 'Phase 18: NLP Project',
        description: 'Hugging Face, Transformers, Tokenizers, Fine-Tuning, Model Deployment, and Inference APIs.',
        topics: [
          'Hugging Face, Transformers & Tokenizers',
          'Fine-Tuning Transformer Models',
          'Model Deployment & Inference APIs'
        ]
      },
      {
        title: 'Phase 19: AWS SageMaker',
        description: 'SageMaker Studio, Training Jobs, Model Registry, Deployment, Endpoints, and Real-time Inference.',
        topics: [
          'SageMaker Studio & Training Jobs',
          'SageMaker Model Registry',
          'Deployment, Endpoints & Real-time Inference'
        ]
      },
      {
        title: 'Phase 20: Monitoring',
        description: 'Grafana, PostgreSQL, Dashboards, Monitoring, Logs, Metrics, and Alerts.',
        topics: [
          'Grafana & PostgreSQL Integration',
          'Dashboards, Monitoring, Logs, Metrics & Alerts'
        ]
      },
      {
        title: 'Phase 21: Generative AI & LLMOps',
        description: 'AWS Bedrock, Large Language Models, LLM Deployment, LLM Monitoring, and Production GenAI Pipelines.',
        topics: [
          'AWS Bedrock & Large Language Models',
          'LLM Deployment & LLM Monitoring',
          'Production GenAI Pipelines'
        ]
      },
      {
        title: '10+ End-to-End Projects Included',
        description: 'House Price Prediction, ANN Model with MLflow, MLflow Tracking Project, Git + DVC + MLflow Pipeline, Dockerized ML Application, Airflow ETL Pipeline, GitHub Actions CI/CD Pipeline, Complete Data Science Deployment Project, Network Security System, NLP Project using Hugging Face Transformers, AWS SageMaker Deployment Project, and GenAI/LLMOps Deployment Project.',
        topics: [
          'House Price Prediction',
          'ANN Model with MLflow',
          'MLflow Tracking Project',
          'Git + DVC + MLflow Pipeline',
          'Dockerized ML Application',
          'Airflow ETL Pipeline',
          'GitHub Actions CI/CD Pipeline',
          'Complete Data Science Deployment Project',
          'Network Security System',
          'NLP Project using Hugging Face Transformers',
          'AWS SageMaker Deployment Project',
          'GenAI/LLMOps Deployment Project'
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
        title: 'Phase 1: English Fundamentals',
        description: 'Course Introduction, Study Tips, Learning Strategy, and How to Use the Course.',
        topics: [
          'Course Introduction',
          'Study Tips',
          'Learning Strategy',
          'How to Use the Course'
        ]
      },
      {
        title: 'Phase 2: Mastering the Basics',
        description: 'Parts of Speech, Nouns, Pronouns, Verbs, Irregular Verbs, Subject-Verb Agreement, Adjectives, Adverbs, Articles, Demonstratives, Possessives, Comparatives & Superlatives, Prefixes & Suffixes, Homonyms, Homophones, Homographs, Phrasal Verbs, Collocations, Idioms, Slang, Contractions, Sentence Types, Subject & Predicate, and Complete Tense Masterclass.',
        topics: [
          'Parts of Speech, Nouns & Pronouns',
          'Verbs, Irregular Verbs & Subject-Verb Agreement',
          'Adjectives, Adverbs, Articles, Demonstratives & Possessives',
          'Comparatives & Superlatives, Prefixes & Suffixes',
          'Homonyms, Homophones & Homographs',
          'Phrasal Verbs, Collocations, Idioms & Slang',
          'Contractions, Sentence Types, Subject & Predicate',
          'Complete Tense Masterclass: Present Tenses (Simple, Continuous, Perfect, Perfect Continuous)',
          'Complete Tense Masterclass: Past Tenses (Simple, Continuous, Perfect, Perfect Continuous)',
          'Complete Tense Masterclass: Future Tenses (Simple, Continuous, Perfect, Perfect Continuous)'
        ]
      },
      {
        title: 'Phase 3: English Speaking Modules',
        description: 'Real-world conversational modules: Introductions, Greetings, Describing People/Places/Things, Opinions, Daily Routine, Hobbies, Doubts, University Life, Restaurants, Requests, Travel, Debates, Food, Giving Advice, Relationships & Listening Tests.',
        topics: [
          'M1: Introductions, Greetings, Small Talk, Asking Questions, Politeness & Present Tense',
          'M2: Describing People, Places & Things, Quantifiers, Linking Words & Feelings Vocabulary',
          'M3: Opinions, Likes & Dislikes, Agreeing, Disagreeing, Preferences, Opinion Expressions & Listening Test 1',
          'M5: Daily Routine, Time Expressions, Morning Routine, Prepositions & Common Phrasal Verbs',
          'M6: Hobbies, Interests, Achievements, Past Experiences, Present Perfect & Pronunciation Practice',
          'M7: Doubts, Certainty, Uncertainty, Modal Verbs, First Conditional, Continuous Tenses & Listening Test 2',
          'M9: University Life',
          'M10: Sharing Experiences',
          'M11: Restaurants, Ordering Food & Listening Test 3',
          'M13: Requests & Offers',
          'M14: Travel, Vacations & Planning Trips',
          'M15: Debates, Arguments, Discussions & Listening Test 4',
          'M17: Food & Cooking',
          'M18: Giving Advice',
          'M19: Relationships, Dating & Listening Test 5'
        ]
      },
      {
        title: 'Phase 4: Business English',
        description: 'Professional Introductions, Meetings, Presentations, Emails, Workplace Communication, Telephone English, Negotiation, Interview English, and Business Vocabulary.',
        topics: [
          'Professional Introductions & Workplace Communication',
          'Meetings, Presentations & Negotiations',
          'Corporate Emails & Professional Correspondence',
          'Telephone English & Etiquette',
          'Interview English & Business Vocabulary'
        ]
      },
      {
        title: 'Phase 5: English Pronunciation',
        description: 'English Sounds, Vowels, Consonants, Stress, Rhythm, Intonation, Silent Letters, Linking Sounds, Difficult Pronunciation, and Natural Speech.',
        topics: [
          'English Sounds, Vowels & Consonants',
          'Stress, Rhythm & Intonation',
          'Silent Letters & Linking Sounds',
          'Difficult Pronunciation & Natural Speech'
        ]
      },
      {
        title: 'Phase 6: English Grammar Masterplan',
        description: 'Clauses, Active & Passive Voice, Direct & Indirect Speech, Modal Verbs, Conditionals, Relative Clauses, Gerunds, Infinitives, Determiners, Conjunctions, Punctuation, and Advanced Grammar.',
        topics: [
          'Clauses, Active & Passive Voice',
          'Direct & Indirect Speech',
          'Modal Verbs, Conditionals & Relative Clauses',
          'Gerunds, Infinitives, Determiners & Conjunctions',
          'Punctuation & Advanced Grammar'
        ]
      },
      {
        title: 'Phase 7: English Writing',
        description: 'Writing Basics, Sentence Structure, Paragraph Writing, Grammar in Writing, Core Writing, Essays, Emails, Reports, Formal & Informal Writing, Story Writing, Advanced Writing, Business Emails, Professional Writing, Academic Writing, Advanced Style, Clarity & Cohesion.',
        topics: [
          'Writing Basics, Sentence Structure & Paragraph Writing',
          'Grammar in Writing & Core Writing',
          'Essays, Emails, Reports, Formal & Informal Writing',
          'Story Writing, Business Emails & Professional Writing',
          'Academic Writing, Advanced Style, Clarity & Cohesion'
        ]
      },
      {
        title: 'Phase 8: Advanced English',
        description: 'Advanced Grammar, Advanced Vocabulary, Natural Expressions, Native-Level Speaking, Fluent Conversation, and Complex Sentence Structures.',
        topics: [
          'Advanced Grammar & Complex Sentence Structures',
          'Advanced Vocabulary & Natural Expressions',
          'Native-Level Speaking & Fluent Conversation'
        ]
      },
      {
        title: 'Phase 9: Listening Practice',
        description: 'Monologues, Everyday Conversations, Real-Life Listening, Listening Comprehension, and Accent Understanding.',
        topics: [
          'Monologues & Everyday Conversations',
          'Real-Life Listening & Listening Comprehension',
          'Accent Understanding & Native Speech'
        ]
      },
      {
        title: 'Phase 10: English Phrasal Verb Mastery',
        description: 'Common Phrasal Verbs, Daily Use, Business Use, Travel, Work, Education, Relationships, and Communication.',
        topics: [
          'Common Phrasal Verbs & Daily Use',
          'Business Use & Workplace Phrasal Verbs',
          'Travel, Work & Education Phrasal Verbs',
          'Relationships & Communication Phrasal Verbs'
        ]
      },
      {
        title: 'Phase 11: Vocabulary Booster (12 Modules)',
        description: 'Everyday Vocabulary, Education, Work, Technology, Business, Travel, Food, Health, Personality, Environment, Emotions, and Advanced Vocabulary.',
        topics: [
          'Everyday & Education Vocabulary',
          'Work, Technology & Business Vocabulary',
          'Travel, Food & Health Vocabulary',
          'Personality, Environment & Emotions Vocabulary',
          'Advanced Vocabulary'
        ]
      },
      {
        title: 'Phase 12: Synonyms Mastery',
        description: 'Common Synonyms, Academic Vocabulary, Professional Vocabulary, and Advanced Word Choice.',
        topics: [
          'Common Synonyms',
          'Academic Vocabulary',
          'Professional Vocabulary',
          'Advanced Word Choice'
        ]
      },
      {
        title: 'Phase 13: Practice',
        description: 'Speaking Activities, Listening Tests, Vocabulary Exercises, Grammar Exercises, Role Plays, Conversation Practice, Review Lessons, and Fluency Challenges.',
        topics: [
          'Speaking Activities & Role Plays',
          'Listening Tests & Audio Exercises',
          'Vocabulary & Grammar Exercises',
          'Conversation Practice, Review Lessons & Fluency Challenges'
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
        title: 'Phase 1: JavaScript Language Fundamentals',
        description: 'Variables (var, let, const), Data Types, Primitive vs Reference Types, null vs undefined, Hoisting, Temporal Dead Zone (TDZ), Scope (Global, Function, Block), Closures, Lexical Environment, Execution Context, Call Stack, Type Coercion, Equality (== vs ===), Truthy & Falsy Values, Memory Management, Garbage Collection, Strict Mode, and IIFE.',
        topics: [
          'Variables (var, let, const) & Data Types',
          'Primitive vs Reference Types & null vs undefined',
          'Hoisting, Temporal Dead Zone (TDZ) & Scope (Global, Function, Block)',
          'Closures & Lexical Environment',
          'Execution Context & Call Stack',
          'Type Coercion, Equality (== vs ===) & Truthy/Falsy Values',
          'Memory Management, Garbage Collection, Strict Mode & IIFE'
        ]
      },
      {
        title: 'Phase 2: Functions',
        description: 'Function Declaration, Function Expression, Arrow Functions, Anonymous Functions, Callback Functions, Higher Order Functions, First Class Functions, Pure Functions, Currying, Function Composition, this Keyword, call(), apply(), bind(), Rest Parameters, Spread Operator, and Default Parameters.',
        topics: [
          'Function Declaration, Expression, Arrow & Anonymous Functions',
          'Callback Functions, Higher Order Functions & First Class Functions',
          'Pure Functions, Currying & Function Composition',
          'this Keyword, call(), apply() & bind()',
          'Rest Parameters, Spread Operator & Default Parameters'
        ]
      },
      {
        title: 'Phase 3: Arrays',
        description: 'Array Methods (map, filter, reduce, forEach, find, findIndex, some, every, sort, slice, splice, flat, flatMap), Array Destructuring, Deep Copy vs Shallow Copy, and Array Interview Problems.',
        topics: [
          'Array Methods: map(), filter(), reduce() & forEach()',
          'Search & Check Methods: find(), findIndex(), some(), every() & sort()',
          'Manipulation Methods: slice(), splice(), flat() & flatMap()',
          'Array Destructuring, Deep Copy vs Shallow Copy & Array Interview Problems'
        ]
      },
      {
        title: 'Phase 4: Strings',
        description: 'String Methods, Template Literals, Regular Expressions, String Manipulation, and String Interview Questions.',
        topics: [
          'String Methods & Template Literals',
          'Regular Expressions (RegEx)',
          'String Manipulation & String Interview Questions'
        ]
      },
      {
        title: 'Phase 5: Objects (OOJS)',
        description: 'Objects, Object Literals, Property Descriptors, Object Methods, Object Destructuring, Prototype, Prototype Chain, Constructor Functions, Classes, Inheritance, Encapsulation, Polymorphism, Static Methods, Getters & Setters, Object.create(), Object.freeze(), Object.seal(), and Object.assign().',
        topics: [
          'Objects, Object Literals, Property Descriptors & Object Methods',
          'Object Destructuring & Object Utilities (create, freeze, seal, assign)',
          'Prototype, Prototype Chain & Constructor Functions',
          'Classes, Inheritance, Encapsulation, Polymorphism, Static Methods, Getters & Setters'
        ]
      },
      {
        title: 'Phase 6: DOM & Browser',
        description: 'DOM Tree, DOM Traversal, Selecting Elements, Creating Elements, Removing Elements, Event Handling, Event Bubbling, Event Capturing, Event Delegation, Forms, Browser APIs, Local Storage, Session Storage, and Cookies.',
        topics: [
          'DOM Tree, Traversal, Selecting, Creating & Removing Elements',
          'Event Handling: Event Bubbling, Event Capturing & Event Delegation',
          'Forms & Browser APIs',
          'Local Storage, Session Storage & Cookies'
        ]
      },
      {
        title: 'Phase 7: Asynchronous JavaScript',
        description: 'Synchronous vs Asynchronous, Event Loop, Web APIs, Callback Functions, Callback Hell, Promises, Promise Chaining, Promise Methods (all, race, allSettled, any), Async/Await, Fetch API, AJAX Basics, and Error Handling.',
        topics: [
          'Synchronous vs Asynchronous, Web APIs & Callback Hell',
          'Promises, Promise Chaining & Promise Methods (all, race, allSettled, any)',
          'Async/Await, Fetch API, AJAX Basics & Error Handling'
        ]
      },
      {
        title: 'Phase 8: ES6+ Features',
        description: 'Template Literals, Destructuring, Spread Operator, Rest Operator, Optional Chaining, Nullish Coalescing, Modules, Import / Export, Symbols, and BigInt.',
        topics: [
          'Template Literals, Destructuring, Spread & Rest Operators',
          'Optional Chaining & Nullish Coalescing',
          'ES6 Modules (Import / Export), Symbols & BigInt'
        ]
      },
      {
        title: 'Phase 9: Map & Set',
        description: 'Map, WeakMap, Set, WeakSet, and Interview Questions.',
        topics: [
          'Map & WeakMap Data Structures',
          'Set & WeakSet Data Structures',
          'Map & Set Interview Questions'
        ]
      },
      {
        title: 'Phase 10: Timers',
        description: 'setTimeout, setInterval, clearTimeout, clearInterval, and Timer Interview Questions.',
        topics: [
          'setTimeout & setInterval Mechanics',
          'clearTimeout & clearInterval',
          'Timer Interview Questions & Async Execution Order'
        ]
      },
      {
        title: 'Phase 11: Error Handling',
        description: 'try, catch, finally, throw, and Custom Errors.',
        topics: [
          'try, catch & finally Blocks',
          'throw Statement & Custom Error Classes'
        ]
      },
      {
        title: 'Phase 12: JavaScript Internals',
        description: 'Execution Context, Call Stack, Memory Heap, Event Loop, Microtask Queue, Macrotask Queue, Hoisting, Closures, and Prototype Chain.',
        topics: [
          'Execution Context, Call Stack & Memory Heap',
          'Event Loop: Microtask Queue vs Macrotask Queue',
          'Internals of Hoisting, Closures & Prototype Chain'
        ]
      },
      {
        title: 'Phase 13: Automated Testing',
        description: 'JavaScript Testing Basics, Unit Testing Concepts, and Practical Examples.',
        topics: [
          'JavaScript Testing Basics & Frameworks',
          'Unit Testing Concepts & Practical Examples'
        ]
      },
      {
        title: 'Phase 14: Real-world Coding Problems',
        description: 'Polyfills, Debounce, Throttle, Deep Clone, Memoization, Flatten Array, Object Comparison, Custom map(), Custom filter(), Custom reduce(), LRU-style logic, and Interview Coding Challenges.',
        topics: [
          'Polyfills: Custom map(), filter(), reduce(), bind()',
          'Debounce & Throttle Implementations',
          'Deep Clone, Memoization & Flatten Array',
          'Object Comparison, LRU-style logic & Interview Coding Challenges'
        ]
      },
      {
        title: 'Phase 15: JavaScript Interview Questions',
        description: 'Course built around 100+ real interview questions: null vs undefined, closures, hoisting, this, event loop, promises, async/await, prototype vs class, deep vs shallow copy, event delegation, currying, debouncing, throttling, polyfills, company-style coding questions.',
        topics: [
          '100+ Real Interview Questions & Core Concept Defensability',
          'Output-Based Code Snippets & Scenario-Based Challenges',
          'Company-Style Machine Coding & Live Problem Solving'
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
        title: 'Phase 1: Getting Started',
        description: 'Course Introduction, Code Editor Setup, How to Use the Course, and Coding Exercises.',
        topics: [
          'Course Introduction',
          'Code Editor Setup',
          'How to Use the Course',
          'Coding Exercises'
        ]
      },
      {
        title: 'Phase 2: Time Complexity (Big O)',
        description: 'What is Big O, Worst Case Analysis, O(1), O(log n), O(n), O(n²), Drop Constants, Drop Non-Dominant Terms, Different Inputs, Space Complexity, and Big O Interview Questions.',
        topics: [
          'What is Big O? & Worst Case Analysis',
          'Complexity Classes: O(1), O(log n), O(n) & O(n²)',
          'Simplifying Rules: Drop Constants & Drop Non-Dominant Terms',
          'Handling Different Inputs & Space Complexity',
          'Big O Interview Questions'
        ]
      },
      {
        title: 'Phase 3: Core Data Structures',
        description: 'Arrays, Dynamic Arrays, Operations, Time Complexity, Coding Problems, Linked Lists (Singly, Doubly, Circular, Reverse, Remove Node, Detect Loop, Merge Lists), Stacks (List & Linked List implementations, Interview Questions), Queues (Basics, Linked List, Circular Queue, Interview Problems), Hash Tables (Hash Functions, Collision Handling, Separate Chaining, Dictionaries in Python, Interview Questions).',
        topics: [
          'Arrays & Dynamic Arrays: Operations, Time Complexity & Coding Problems',
          'Linked Lists: Singly, Doubly & Circular Linked Lists',
          'Linked List Operations: Reverse, Remove Node, Detect Loop & Merge Lists',
          'Stacks: List & Linked List Implementations & Stack Interview Questions',
          'Queues: Linked List & Circular Queue Implementations & Queue Interview Problems',
          'Hash Tables: Hash Functions, Collision Handling & Separate Chaining',
          'Dictionaries in Python & Hash Table Interview Questions'
        ]
      },
      {
        title: 'Phase 4: Trees',
        description: 'Binary Trees (Terminology, Traversals: DFS, BFS, Level Order, Recursive Traversals, Tree Height, Tree Problems), Binary Search Trees (Insert, Search, Delete, Min/Max, Traversals, BST Interview Questions), Heap (Max Heap, Min Heap, Insert/Delete, Heapify, Priority Queue, Heap Interview Questions).',
        topics: [
          'Binary Trees: Terminology, DFS, BFS & Level Order Traversals',
          'Recursive Traversals, Tree Height & Tree Problems',
          'Binary Search Trees (BST): Insert, Search, Delete & Min/Max',
          'BST Traversals & BST Interview Questions',
          'Heap: Max Heap & Min Heap Mechanics',
          'Heap Insert/Delete, Heapify & Priority Queue',
          'Heap Interview Questions'
        ]
      },
      {
        title: 'Phase 5: Graphs',
        description: 'Graph Representation (Adjacency List, Adjacency Matrix), DFS, BFS, Connected Components, and Graph Interview Questions.',
        topics: [
          'Graph Representation: Adjacency List & Adjacency Matrix',
          'Graph Traversals: DFS & BFS',
          'Connected Components & Graph Interview Questions'
        ]
      },
      {
        title: 'Phase 6: Recursion',
        description: 'Recursion Basics, Call Stack, Recursive Thinking, Tail Recursion, Tree Recursion, Backtracking Basics, and Interview Problems.',
        topics: [
          'Recursion Basics, Call Stack & Recursive Thinking',
          'Tail Recursion & Tree Recursion',
          'Backtracking Basics & Recursion Interview Problems'
        ]
      },
      {
        title: 'Phase 7: Sorting Algorithms',
        description: 'Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Complexity Analysis, and Comparison of Sorting Algorithms.',
        topics: [
          'Elementary Sorting: Bubble Sort, Selection Sort & Insertion Sort',
          'Advanced Sorting: Merge Sort & Quick Sort',
          'Complexity Analysis & Comparison of Sorting Algorithms'
        ]
      },
      {
        title: 'Phase 8: Searching Algorithms',
        description: 'Linear Search, Binary Search, Recursive Binary Search, and Searching Interview Questions.',
        topics: [
          'Linear Search & Binary Search Mechanics',
          'Recursive Binary Search & Searching Interview Questions'
        ]
      },
      {
        title: 'Phase 9: Dynamic Programming',
        description: 'Introduction, Memoization, Tabulation, Fibonacci, Climbing Stairs, Coin Change, and Common DP Patterns.',
        topics: [
          'Dynamic Programming Intro: Memoization vs Tabulation',
          'Classic DP Problems: Fibonacci, Climbing Stairs & Coin Change',
          'Common DP Patterns & Subproblems'
        ]
      },
      {
        title: 'Phase 10: LeetCode Interview Patterns',
        description: 'Two Pointers, Sliding Window, Fast & Slow Pointers, Prefix Sum, Binary Search Pattern, DFS Pattern, BFS Pattern, Tree Pattern, Heap Pattern, and Hash Map Pattern.',
        topics: [
          'Two Pointers, Sliding Window & Fast & Slow Pointers',
          'Prefix Sum & Binary Search Pattern',
          'DFS & BFS Graph/Tree Patterns',
          'Tree Pattern, Heap Pattern & Hash Map Pattern'
        ]
      },
      {
        title: 'Phase 11: Coding Interview Questions',
        description: 'Array Problems, String Problems, Linked List Problems, Stack & Queue Problems, Tree Problems, BST Problems, Graph Problems, Heap Problems, Sorting Problems, and Dynamic Programming Problems.',
        topics: [
          'Array & String Interview Problems',
          'Linked List, Stack & Queue Interview Problems',
          'Tree, BST & Heap Interview Problems',
          'Graph, Sorting & Dynamic Programming Interview Problems'
        ]
      },
      {
        title: 'Phase 12: Final Interview Preparation',
        description: 'Problem Solving Strategy, Optimizing Solutions, Time & Space Complexity Analysis, Common Interview Mistakes, and Whiteboard Interview Tips.',
        topics: [
          'Problem Solving Strategy & Solution Optimization',
          'Time & Space Complexity Analysis Defense',
          'Common Interview Mistakes & Whiteboard Interview Tips'
        ]
      }
    ]
  }
];
void INLINE_COURSES;

export const CodingCoursesView: React.FC<CodingCoursesViewProps> = ({ user, onNavigateTab, onUpdateCourseTopics }) => {
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

  // Lock warning message toast state
  const [lockWarningMessage, setLockWarningMessage] = useState<string | null>(null);

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

  // Certificate Verification Modal State
  const [showCertVerificationModal, setShowCertVerificationModal] = useState<boolean>(false);
  const [verificationCodeToView, setVerificationCodeToView] = useState<string | null>(null);

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

          FirestoreService.recordFinancialTransaction({
            userId: user.uid,
            userName: user.displayName || user.email?.split('@')[0] || 'Student',
            userEmail: user.email || '',
            itemType: 'course',
            itemId: payingForCourse.id,
            itemTitle: payingForCourse.title,
            amount: payingForCourse.price
          }).catch(e => console.warn("Failed to record course purchase transaction in Firestore:", e));
        }

        setPayingForCourse(null);
        setPaymentSuccessMessage(false);
      }, 1000);
    }, 1200);
  };

  const activeCourse = COURSES.find((c) => c.id === activeCourseId);

  // Ordered topics list for sequential progress tracking across active course
  const activeCourseTopics = useMemo(() => {
    if (!activeCourse) return [];
    const list: { topic: string; key: string; moduleIdx: number; topicIdx: number; globalIdx: number }[] = [];
    let count = 0;
    activeCourse.modules.forEach((mod, mIdx) => {
      mod.topics.forEach((t, tIdx) => {
        const key = `${activeCourse.id}::${t}`;
        list.push({
          topic: t,
          key,
          moduleIdx: mIdx,
          topicIdx: tIdx,
          globalIdx: count++
        });
      });
    });
    return list;
  }, [activeCourse]);

  const topicGlobalIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
    activeCourseTopics.forEach((item) => {
      map[item.key] = item.globalIdx;
    });
    return map;
  }, [activeCourseTopics]);

  // Check if a topic at globalIdx is unlocked (i.e. previous topic is completed)
  const isTopicUnlocked = (globalIdx: number) => {
    if (globalIdx === 0) return true;
    const prevKey = activeCourseTopics[globalIdx - 1]?.key;
    return !!completedTopics[prevKey];
  };

  // Toggle individual topic checkbox completion (with sequential lock enforcement)
  const handleToggleTopicCheckbox = (courseId: string, topicName: string) => {
    const topicKey = `${courseId}::${topicName}`;
    const globalIdx = topicGlobalIndexMap[topicKey];

    if (globalIdx === undefined) return;

    // Guard: Topic is locked if previous topic is not completed
    if (!isTopicUnlocked(globalIdx)) {
      const prevTopic = activeCourseTopics[globalIdx - 1]?.topic;
      setLockWarningMessage(`🔒 Checkpoint Locked! Complete "${prevTopic}" first.`);
      setTimeout(() => setLockWarningMessage(null), 3500);
      return;
    }

    const isCurrentlyChecked = !!completedTopics[topicKey];
    const updated = { ...completedTopics };

    if (!isCurrentlyChecked) {
      updated[topicKey] = true;
      setLockWarningMessage(null);
      StreakService.recordActivity();
    } else {
      // Unchecking this topic -> also uncheck all subsequent topics in this course to maintain sequence
      activeCourseTopics.forEach((item) => {
        if (item.globalIdx >= globalIdx) {
          updated[item.key] = false;
        }
      });
    }

    setCompletedTopics(updated);
    localStorage.setItem('campus_os_completed_topics', JSON.stringify(updated));
    onUpdateCourseTopics?.();

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

  // Toggle all topics in a module (check up to module end or uncheck from module start)
  const handleToggleModuleTopics = (courseId: string, mIdx: number, forceCheck: boolean) => {
    if (!activeCourse) return;
    const updated = { ...completedTopics };

    if (forceCheck) {
      // Complete all topics up to the end of this module
      const moduleLastTopic = activeCourse.modules[mIdx]?.topics.slice(-1)[0];
      const moduleLastKey = `${courseId}::${moduleLastTopic}`;
      const targetGlobalIdx = topicGlobalIndexMap[moduleLastKey] ?? 0;

      activeCourseTopics.forEach((item) => {
        if (item.globalIdx <= targetGlobalIdx) {
          updated[item.key] = true;
        }
      });
      setLockWarningMessage(null);
    } else {
      // Uncheck all topics starting from the first topic of this module onwards
      const moduleFirstTopic = activeCourse.modules[mIdx]?.topics[0];
      const moduleFirstKey = `${courseId}::${moduleFirstTopic}`;
      const startGlobalIdx = topicGlobalIndexMap[moduleFirstKey] ?? 0;

      activeCourseTopics.forEach((item) => {
        if (item.globalIdx >= startGlobalIdx) {
          updated[item.key] = false;
        }
      });
    }

    setCompletedTopics(updated);
    localStorage.setItem('campus_os_completed_topics', JSON.stringify(updated));
    onUpdateCourseTopics?.();

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

  // Calculate active course stats at top level for certificate handling
  const activeCourseStats = activeCourse ? getCourseStats(activeCourse) : null;

  // Auto-save certificate to Firestore & trigger celebration confetti when 100% completed
  useEffect(() => {
    if (activeCourse && activeCourseStats && activeCourseStats.percentage === 100) {
      const courseCodeClean = activeCourse.id.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
      const userCodeClean = user?.uid ? user.uid.replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase() : '7845';
      const activeCourseCertCode = `COS-2026-${courseCodeClean}-${userCodeClean}`;
      const certificateIssuedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      const studentDisplayName = user?.displayName && user.displayName.trim() !== 'Guest Student' ? user.displayName : 'Naman Pandey';

      const certRecord: CertificateRecord = {
        certificateId: activeCourseCertCode,
        userId: user?.uid || 'guest_user',
        userName: studentDisplayName,
        userEmail: user?.email || '',
        joinedAt: user?.createdAt ? user.createdAt.split('T')[0] : '2026-01-15',
        userPlan: user?.plan ? (user.plan === 'free_trial' ? '4-Day Free Trial' : user.plan) : 'Pro Student Access',
        courseId: activeCourse.id,
        courseTitle: activeCourse.title,
        issuedAt: certificateIssuedDate,
        attendancePercentage: user?.stats?.attendancePercentage ?? 92,
        totalClassesAttended: user?.stats?.totalClassesAttended ?? 46,
        totalClassesHeld: user?.stats?.totalClassesHeld ?? 50,
        dsaSolvedCount: user?.stats?.dsaSolvedCount ?? 120
      };

      FirestoreService.saveCertificate(certRecord).catch(e => console.warn("Error auto-saving certificate:", e));

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  }, [activeCourse, activeCourseStats?.percentage, user]);

  // Filter logic
  const filteredCourses = selectedCategory === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.category === selectedCategory);

  // -------------------------------------------------------------
  // DETAIL VIEW FOR UNLOCKED / ACTIVE COURSE WITH SYLLABUS CHECKBOXES
  // -------------------------------------------------------------
  if (activeCourse) {
    const isDrive = activeCourse.linkType === 'drive';
    const stats = activeCourseStats || getCourseStats(activeCourse);

    // Generate unique Certificate Code for this course and user
    const courseCodeClean = activeCourse.id.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
    const userCodeClean = user?.uid ? user.uid.replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase() : '7845';
    const activeCourseCertCode = `COS-2026-${courseCodeClean}-${userCodeClean}`;
    const certificateIssuedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const studentDisplayName = user?.displayName && user.displayName.trim() !== 'Guest Student' ? user.displayName : 'Naman Pandey';

    return (
      <div className="w-full max-w-full px-2 sm:px-4 py-4 space-y-6 animate-in fade-in duration-300">
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
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-sm text-slate-900 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-purple-200/60 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Official Resource Access
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                Start Learning & Stream Lectures
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
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
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 shadow-amber-500/20'
                    : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-sky-500/20'
                } text-white font-black text-sm sm:text-base shadow-md transition-all transform hover:scale-[1.02] cursor-pointer`}
              >
                {isDrive ? <Folder className="w-5 h-5 text-white" /> : <Send className="w-5 h-5 text-white" />}
                <span>{isDrive ? 'Open Google Drive Folder' : 'Join Telegram Channel'}</span>
                <ExternalLink className="w-4 h-4 text-white/80" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                {isDrive ? <Folder className="w-4 h-4 text-amber-500" /> : <MessageSquare className="w-4 h-4 text-sky-500" />}
                <span>{isDrive ? 'Google Drive Access' : 'Telegram Community'}</span>
              </div>
              <p className="text-slate-500">
                {isDrive ? 'Instant access to structured video folders & datasets.' : 'Direct access to mentors and doubt solving with batchmates.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-purple-600" /> High Quality Video Classes
              </div>
              <p className="text-slate-500">Stream high-definition class recordings and live sessions anytime.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" /> Source Codes & Projects
              </div>
              <p className="text-slate-500">Complete code repositories, notes, and assignment solutions included.</p>
            </div>
          </div>
        </div>

        {/* DETAILED INTERACTIVE SYLLABUS & CHECKBOX ROADMAP */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Sequential Lock Warning Toast */}
          {lockWarningMessage && (
            <div className="p-4 rounded-2xl bg-amber-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-between gap-3 shadow-lg animate-in fade-in slide-in-from-top duration-300">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-200 shrink-0" />
                <span>{lockWarningMessage}</span>
              </div>
              <button
                onClick={() => setLockWarningMessage(null)}
                className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-black text-xs cursor-pointer"
              >
                Got it
              </button>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-black uppercase tracking-wider mb-2">
                <CheckSquare className="w-3.5 h-3.5 text-purple-600" /> Sequential Checkpoint Syllabus Tracker
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Complete Course Syllabus & Topic Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                🔒 Checkpoints unlock sequentially! Complete the current topic to unlock the next one.
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

              // Check if module is locked (i.e. first topic of module is locked)
              const firstTopicKey = `${activeCourse.id}::${mod.topics[0]}`;
              const firstTopicGlobalIdx = topicGlobalIndexMap[firstTopicKey] ?? 0;
              const isModuleUnlocked = isTopicUnlocked(firstTopicGlobalIdx);

              return (
                <div 
                  key={mIdx} 
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isModuleAllCompleted 
                      ? 'bg-emerald-50/40 border-emerald-200' 
                      : isModuleUnlocked
                      ? 'bg-white border-slate-200 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 opacity-80'
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
                          : isModuleUnlocked
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isModuleAllCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : isModuleUnlocked ? (
                          `0${mIdx + 1}`
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                          {mod.title}
                          {!isModuleUnlocked && (
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Locked Phase
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{mod.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                        isModuleAllCompleted
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isModuleUnlocked
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {completedInModule} / {mod.topics.length} Done
                      </span>

                      {/* Toggle All Topics Button */}
                      <button
                        onClick={() => handleToggleModuleTopics(activeCourse.id, mIdx, !isModuleAllCompleted)}
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
                        const globalIdx = topicGlobalIndexMap[topicKey] ?? 0;
                        const isChecked = !!completedTopics[topicKey];
                        const unlocked = isTopicUnlocked(globalIdx);
                        const isNextAvailable = unlocked && !isChecked;

                        return (
                          <div
                            key={tIdx}
                            onClick={() => handleToggleTopicCheckbox(activeCourse.id, topic)}
                            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 group ${
                              isChecked
                                ? 'bg-emerald-50/70 border-emerald-300 text-slate-900 cursor-pointer'
                                : unlocked
                                ? 'bg-slate-50 hover:bg-purple-50/60 border-purple-200 hover:border-purple-400 text-slate-900 cursor-pointer shadow-2xs'
                                : 'bg-slate-100/60 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div className="shrink-0 transition-transform group-hover:scale-105">
                                {isChecked ? (
                                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                                ) : unlocked ? (
                                  <Square className="w-5 h-5 text-purple-600 group-hover:text-purple-700" />
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-400" />
                                )}
                              </div>

                              <span className={`text-xs sm:text-sm font-bold transition-all ${
                                isChecked
                                  ? 'line-through text-slate-500 font-semibold'
                                  : unlocked
                                  ? 'text-slate-900'
                                  : 'text-slate-400'
                              }`}>
                                {topic}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {isChecked && (
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Completed
                                </span>
                              )}

                              {isNextAvailable && (
                                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                                  <Zap className="w-3 h-3 text-amber-500" /> Next Checkpoint
                                </span>
                              )}

                              {!unlocked && (
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                  <Lock className="w-3 h-3" /> Locked
                                </span>
                              )}
                            </div>
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

          {/* OFFICIAL CERTIFICATE SECTION AT THE LAST OF EVERY CODING COURSE */}
          <div className="pt-8 border-t-2 border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-600" /> Official Verified Course Certificate
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeCourse.title} Certificate of Completion
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {stats.percentage === 100 
                    ? '🎉 You have completed 100% of all syllabus topics! Your official verified certificate is ready below.' 
                    : `Complete all ${stats.totalTopics} syllabus checkpoints above (${stats.completedCount}/${stats.totalTopics} completed) to unlock and claim your official certificate.`}
                </p>
              </div>

              {stats.percentage === 100 && (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4" /> 100% Completed & Issued
                  </span>
                </div>
              )}
            </div>

            {stats.percentage === 100 ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="font-black text-base sm:text-lg text-amber-300 flex items-center justify-center sm:justify-start gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      Congratulations, {studentDisplayName}!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300">
                      You have earned your official <span className="font-bold text-white underline">{activeCourse.title}</span> Certificate. Scan the embedded QR code or verify online anytime.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setVerificationCodeToView(activeCourseCertCode);
                      setShowCertVerificationModal(true);
                    }}
                    className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer shrink-0 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-950" />
                    <span>Verify Credentials & Student Data</span>
                  </button>
                </div>

                {/* Render Official Certificate Card */}
                <CertificateCard
                  certificateId={activeCourseCertCode}
                  userName={studentDisplayName}
                  userEmail={user.email}
                  courseTitle={activeCourse.title}
                  issuedAt={certificateIssuedDate}
                  userPlan={user.plan ? (user.plan === 'free_trial' ? '4-Day Free Trial' : user.plan) : 'Pro Student Access'}
                  joinedAt={user.createdAt ? user.createdAt.split('T')[0] : '2026-01-15'}
                  attendancePercentage={user.stats?.attendancePercentage ?? 92}
                  totalClassesAttended={user.stats?.totalClassesAttended ?? 46}
                  totalClassesHeld={user.stats?.totalClassesHeld ?? 50}
                  dsaSolvedCount={user.stats?.dsaSolvedCount ?? 120}
                  showActions={true}
                  onVerifyClick={() => {
                    setVerificationCodeToView(activeCourseCertCode);
                    setShowCertVerificationModal(true);
                  }}
                />
              </div>
            ) : (
              /* Locked Certificate Banner */
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4 shadow-2xs">
                <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h4 className="text-lg font-black text-slate-900">
                    Certificate Locked ({stats.completedCount} / {stats.totalTopics} Topics Completed)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    To earn and download your official CampusOS Certificate for <span className="font-bold text-slate-800">{activeCourse.title}</span>, you must complete all topic checkboxes in the syllabus above.
                  </p>
                  
                  {/* Progress bar */}
                  <div className="pt-3 max-w-xs mx-auto space-y-1.5">
                    <div className="flex justify-between text-xs font-extrabold text-slate-600">
                      <span>Syllabus Checkpoints</span>
                      <span className="text-amber-600 font-black">{stats.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 p-0.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${stats.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
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
    <div className="w-full max-w-full px-2 sm:px-4 py-4 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/80 p-8 sm:p-12 text-slate-900 shadow-sm">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-600" /> Interactive Coding Courses & Detailed Syllabi
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Level Up Your Code & Track Your Syllabus Progress
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
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

      {/* Global Certificate Verification Modal */}
      <CertificateVerificationModal
        isOpen={showCertVerificationModal}
        onClose={() => setShowCertVerificationModal(false)}
        certificateId={verificationCodeToView}
      />

    </div>
  );
};
