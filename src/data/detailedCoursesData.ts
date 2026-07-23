import React from 'react';
import { 
  Code, 
  Cpu, 
  Terminal, 
  Shield, 
  Smartphone, 
  Server, 
  Brain, 
  Sparkles, 
  BarChart3, 
  MessageSquare, 
  FileCode 
} from 'lucide-react';

export interface CourseItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Web Development' | 'Data Structures & Algorithms' | 'AI & Machine Learning' | 'Data Analytics' | 'Cyber Security' | 'App Development' | 'DevOps' | 'System Design' | 'Soft Skills & Communication';
  price: number;
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
    description: 'Master complete full-stack web development from scratch! Learn modern responsive UI design with React 18 & Tailwind CSS, architect robust backend microservices with Node & Express, model complex databases in MongoDB & Mongoose ORM, implement JWT authentication with Role-Based Access Control, and deploy production cloud apps.',
    features: [
      'Interactive Full-Stack MERN Architecture',
      'Real-world SaaS & E-commerce Projects',
      'REST API Design & JWT Auth Workflows',
      'Git, GitHub, CI/CD & Deployment Guide',
      'Exclusive Telegram Group with Mentor Support'
    ],
    modules: [
      {
        title: 'HTML5',
        description: 'Learn foundational HTML5 document structure, semantic markup, forms, validation, graphics, and SEO essentials.',
        topics: [
          'Document structure',
          'Semantic tags',
          'Headings',
          'Lists',
          'Tables',
          'Forms',
          'Input types',
          'Validation',
          'Audio/Video',
          'Canvas',
          'SVG',
          'SEO basics'
        ]
      },
      {
        title: 'CSS3',
        description: 'Master CSS3 layout, box model, Flexbox, Grid, media queries, animations, transitions, and BEM architecture.',
        topics: [
          'Selectors',
          'Box model',
          'Display',
          'Position',
          'Flexbox',
          'Grid',
          'Responsive design',
          'Media queries',
          'Animations',
          'Transitions',
          'Variables',
          'BEM'
        ]
      },
      {
        title: 'JavaScript',
        description: 'Deep dive into modern core JavaScript from syntax, closures, and DOM events to promises, async/await, and ES6+.',
        topics: [
          'Variables',
          'Data types',
          'Operators',
          'Conditionals',
          'Loops',
          'Functions',
          'Scope',
          'Closures',
          'Objects',
          'Arrays',
          'Destructuring',
          'Spread/Rest',
          'DOM',
          'Events',
          'Classes',
          'Modules',
          'Promises',
          'Async/Await',
          'Fetch API',
          'Error handling',
          'LocalStorage',
          'ES6+'
        ]
      },
      {
        title: 'Git/GitHub',
        description: 'Essential version control workflow covering repositories, branches, merges, rebasing, pull requests, and conflict resolution.',
        topics: [
          'Init',
          'Commit',
          'Branch',
          'Merge',
          'Rebase',
          'Remote',
          'Pull Request',
          'Conflict resolution'
        ]
      },
      {
        title: 'React',
        description: 'Build modern user interfaces with React, JSX, state management, hooks, routing, Context API, Redux Toolkit, and testing.',
        topics: [
          'Vite',
          'JSX',
          'Components',
          'Props',
          'State',
          'Lifecycle',
          'Hooks(useState,useEffect,useRef,useMemo,useCallback)',
          'Forms',
          'Routing',
          'Context API',
          'Redux Toolkit',
          'API integration',
          'Authentication',
          'Protected routes',
          'Optimization',
          'Testing'
        ]
      },
      {
        title: 'Node',
        description: 'Understand Node.js asynchronous runtime environment, module ecosystem, streams, buffers, file system, and HTTP module.',
        topics: [
          'Runtime',
          'Modules',
          'NPM',
          'Events',
          'Streams',
          'Buffers',
          'FS',
          'HTTP module',
          'Environment variables'
        ]
      },
      {
        title: 'Express',
        description: 'Build scalable backend web servers and RESTful APIs using Express routing, middleware, MVC, JWT authentication, and sessions.',
        topics: [
          'Server',
          'Routing',
          'Middleware',
          'MVC',
          'REST APIs',
          'Validation',
          'Error handling',
          'JWT Auth',
          'RBAC',
          'Multer',
          'Cookies',
          'Sessions'
        ]
      },
      {
        title: 'MongoDB',
        description: 'Store and manipulate NoSQL database documents with collections, CRUD, indexing, aggregation, and MongoDB Atlas.',
        topics: [
          'Collections',
          'CRUD',
          'Indexes',
          'Aggregation',
          'Relationships',
          'Transactions',
          'Atlas'
        ]
      },
      {
        title: 'Mongoose',
        description: 'Object Data Modeling (ODM) with schemas, models, custom validations, populate joins, and middleware hooks.',
        topics: [
          'Schemas',
          'Models',
          'Validation',
          'Populate',
          'Middleware'
        ]
      },
      {
        title: 'Backend Advanced',
        description: 'Advanced backend engineering with Bcrypt, refresh tokens, OTP, file uploads, Cloudinary, Redis, Socket.IO, and deployment.',
        topics: [
          'Password hashing(Bcrypt)',
          'JWT',
          'Refresh tokens',
          'Email OTP',
          'File upload',
          'Cloudinary',
          'Redis basics',
          'Socket.IO',
          'Security(CORS,Helmet,XSS,CSRF,Rate limiting)',
          'Logging',
          'Deployment(Render/Vercel/Nginx/Docker)'
        ]
      },
      {
        title: 'Projects',
        description: 'Build real-world full-stack portfolio applications from basic utility apps to complete enterprise platforms.',
        topics: [
          'Todo',
          'Notes',
          'Authentication',
          'Blog',
          'E-commerce',
          'Chat App',
          'LMS',
          'Job Portal'
        ]
      }
    ]
  },
  {
    id: 'dsa-cpp',
    title: 'DSA in C++: Advanced Algorithms & Data Structures',
    tagline: 'Master C++ STL, Pointers, Arrays, Trees, Graphs & Dynamic Programming for Top Tech Interviews.',
    category: 'Data Structures & Algorithms',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+P3OIno0M2OthNGI1',
    bgGradient: 'from-blue-600 via-indigo-600 to-slate-800',
    accentColor: 'blue',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Cpu,
    level: 'Beginner to Advanced',
    duration: '10 Weeks Batch',
    description: 'Master Data Structures & Algorithms in C++ from foundational STL to advanced competitive programming! Solve 250+ top interview questions covering Arrays, Strings, Two Pointers, Linked Lists, Stacks, Queues, Binary Trees, BST, Heaps, Tries, Graphs, and Dynamic Programming with dry-run visualizations.',
    features: [
      'Comprehensive C++ STL Library & Memory Mechanics',
      '250+ Solved LeetCode & CodeStudio Interview Problems',
      'Step-by-step Dry-Run Visualizations & Code Snippets',
      'Pattern-Based Problem Solving (Sliding Window, DP, Graphs)',
      'Exclusive Telegram Group with Mentor Assistance'
    ],
    modules: [
      {
        title: 'Programming with C++',
        description: 'Foundations of C++ programming including logic building, flow control, functions, and memory basics.',
        topics: [
          'Flowcharts & Pseudocode',
          'Variables & Data Types',
          'Operators',
          'Conditional Statements',
          'Loops (Flow Control)',
          'Patterns',
          'Functions & Scope'
        ]
      },
      {
        title: 'Data Structures & Algorithms',
        description: 'Core data structures and algorithms covering arrays, sorting, STL, pointers, recursion, OOPs, trees, and search trees.',
        topics: [
          'Arrays & 2D Arrays',
          'Sorting Algorithms',
          'Strings',
          'Pointers & Dynamic Allocation',
          'Standard Template Library (STL)',
          'Time & Space Complexity',
          'Recursion & Backtracking',
          'Divide & Conquer',
          'Object Oriented Programming (OOPs)',
          'Linked Lists',
          'Stacks & Queues',
          'Binary Trees',
          'Binary Search Trees'
        ]
      },
      {
        title: 'Advanced DSA',
        description: 'Advanced problem-solving techniques including heaps, hash mapping, tries, graph algorithms, greedy strategies, dynamic programming, and segment trees.',
        topics: [
          'Heaps (Priority Queue)',
          'Hashmaps',
          'Tries',
          'Graph',
          'Greedy Algorithms',
          'Dynamic Programming',
          'Segment Trees'
        ]
      },
      {
        title: 'Quant, Reasoning & Aptitude',
        description: 'Quantitative aptitude, logical reasoning, verbal reasoning, data interpretation, and numerical ability for tech campus placements.',
        topics: [
          'Quantitative Aptitude',
          'Logical Reasoning',
          'Verbal Reasoning',
          'Data Interpretation',
          'Numerical Ability'
        ]
      }
    ]
  },
  {
    id: 'dsa-java',
    title: 'DSA in Java: Ultimate Algorithms & Collections Framework',
    tagline: 'Master Java Collections Framework, OOP Mechanics, Memory Architecture & DSA Patterns.',
    category: 'Data Structures & Algorithms',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+Wd1Xf6y8yTI1MWJl',
    bgGradient: 'from-amber-600 via-orange-600 to-red-700',
    accentColor: 'orange',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: Code,
    level: 'Beginner to Advanced',
    duration: '10 Weeks Batch',
    description: 'Comprehensive Data Structures & Algorithms in Java! Learn Java JVM architecture, Memory Heap vs Stack, Java Collections Framework (JCF), HashMaps, Red-Black Trees, PriorityQueues, Graphs, and Dynamic Programming with hands-on Java code templates.',
    features: [
      'Java Collections Framework (ArrayList, HashMap, PriorityQueue)',
      'JVM Architecture, Heap vs Stack & Memory Allocations',
      'Pattern-Based DSA Problem Solving with Java 17+',
      '200+ Solved LeetCode & HackerRank Problems',
      'Exclusive Telegram Group for Java Solution Notes'
    ],
    modules: [
      {
        title: 'Programming with Java',
        description: 'Foundations of Java programming including logic building, flowcharts, variables, operators, conditionals, loops, patterns, functions, and scope.',
        topics: [
          'Flowcharts & Pseudocode',
          'Variables & Data Types',
          'Operators',
          'Conditional Statements',
          'Loops (Flow Control)',
          'Patterns',
          'Functions & Scope'
        ]
      },
      {
        title: 'Data Structures & Algorithms',
        description: 'Core data structures and algorithms covering arrays, sorting, strings, pointers, Collections Framework, recursion, OOPs, trees, and search trees.',
        topics: [
          'Arrays & 2D Arrays',
          'Sorting Algorithms',
          'Strings',
          'Pointers (additional chapter for Interviews)',
          'Collections Framework (similar to STL)',
          'Time & Space Complexity',
          'Recursion & Backtracking',
          'Divide & Conquer',
          'Object Oriented Programming (OOPs)',
          'Linked Lists',
          'Stacks & Queues',
          'Binary Trees',
          'Binary Search Trees'
        ]
      },
      {
        title: 'Advanced DSA',
        description: 'Advanced problem-solving techniques including heaps, HashMaps, HashSets, tries, graph algorithms, greedy strategies, dynamic programming, and segment trees.',
        topics: [
          'Heaps (Priority Queue)',
          'HashMaps & HashSets',
          'Tries',
          'Graph',
          'Greedy Algorithms',
          'Dynamic Programming',
          'Segment Trees'
        ]
      },
      {
        title: 'Quant, Reasoning & Aptitude',
        description: 'Quantitative aptitude, logical reasoning, verbal reasoning, data interpretation, and numerical ability for tech campus placements.',
        topics: [
          'Quantitative Aptitude',
          'Logical Reasoning',
          'Verbal Reasoning',
          'Data Interpretation',
          'Numerical Ability'
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
    description: 'Learn Data Structures & Algorithms using Python and JavaScript! Tailored for developers who want clean, idiomatic Pythonic and JS solutions for technical interviews. Covers List comprehensions, Dicts, Sets, Maps, HashMaps, Recursion, Trees, Graphs, and DP patterns with LeetCode solutions.',
    features: [
      'Dual-Language Code Walkthroughs (Python 3 & JavaScript)',
      'Pythonic Idioms & JS Prototype/Closure DSA Tricks',
      '200+ Top Selected LeetCode & HackerRank Problems',
      'Time & Space Complexity Optimization Techniques',
      'Exclusive Telegram Channel for Doubt Solving & Code Reviews'
    ],
    modules: [
      {
        title: 'Programming Fundamentals',
        description: 'Core programming concepts, syntax, control structures, functions, OOP, exception & file handling, comprehensions, iterators, and decorators.',
        topics: [
          'Variables',
          'Data Types',
          'Operators',
          'Input/Output',
          'Type Casting',
          'Conditional Statements',
          'Loops',
          'Functions',
          'Recursion',
          'OOP',
          'Exception Handling',
          'File Handling',
          'Modules & Packages',
          'Iterators & Generators',
          'Lambda Functions',
          'Decorators',
          'List/Dictionary/Set Comprehensions'
        ]
      },
      {
        title: 'Time & Space Complexity',
        description: 'Asymptotic notations, execution time, space complexity, auxiliary space, and amortized analysis.',
        topics: [
          'Big O',
          'Big Ω',
          'Big Θ',
          'Time Complexity',
          'Space Complexity',
          'Auxiliary Space',
          'Amortized Analysis'
        ]
      },
      {
        title: 'Mathematics',
        description: 'Essential mathematical foundations, number theory, prime numbers, modular arithmetic, and combinatorics for algorithmic efficiency.',
        topics: [
          'Prime Numbers',
          'Factors',
          'GCD & LCM',
          'Euclidean Algorithm',
          'Fast Exponentiation',
          'Modular Arithmetic',
          'Sieve of Eratosthenes',
          'Prefix Sum',
          'Number Theory',
          'Combinatorics',
          'Permutations & Combinations',
          'Probability'
        ]
      },
      {
        title: 'Bit Manipulation',
        description: 'Binary representations, bitwise operators, bit masking, subsets generation, and bitwise optimization techniques.',
        topics: [
          'Binary Numbers',
          'Bitwise Operators',
          'AND, OR, XOR, NOT',
          'Left & Right Shift',
          'Set Bits',
          'Bit Masking',
          'Power of Two',
          'Subsets using Bits'
        ]
      },
      {
        title: 'Arrays',
        description: 'Array traversals, insertion, searching, sliding window, two pointers, matrices, and interval problems.',
        topics: [
          'Traversal',
          'Insertion & Deletion',
          'Searching',
          'Prefix Sum',
          'Sliding Window',
          'Two Pointers',
          'Kadane\'s Algorithm',
          'Dutch National Flag',
          'Rotate Array',
          'Merge Arrays',
          'Matrix Problems',
          'Circular Arrays',
          'Interval Problems'
        ]
      },
      {
        title: 'Strings',
        description: 'String manipulation, pattern matching algorithms (KMP, Rabin-Karp, Z Algorithm), rolling hash, and compression techniques.',
        topics: [
          'String Operations',
          'Reverse',
          'Palindrome',
          'Anagrams',
          'Frequency Count',
          'KMP',
          'Rabin-Karp',
          'Z Algorithm',
          'Rolling Hash',
          'String Compression'
        ]
      },
      {
        title: 'Searching',
        description: 'Search techniques including linear, binary search variants, matrix search, and ternary search.',
        topics: [
          'Linear Search',
          'Binary Search',
          'Lower & Upper Bound',
          'Binary Search on Answer',
          'Rotated Array Search',
          'Matrix Search',
          'Ternary Search'
        ]
      },
      {
        title: 'Sorting',
        description: 'Standard sorting algorithms, comparison vs non-comparison sorts, time complexities, and stability.',
        topics: [
          'Bubble Sort',
          'Selection Sort',
          'Insertion Sort',
          'Merge Sort',
          'Quick Sort',
          'Heap Sort',
          'Counting Sort',
          'Radix Sort',
          'Bucket Sort'
        ]
      },
      {
        title: 'Recursion',
        description: 'Recursive call stacks, tail recursion, recursion trees, and backtracking foundations.',
        topics: [
          'Basic Recursion',
          'Tail Recursion',
          'Recursive Arrays',
          'Recursive Strings',
          'Recursion Trees',
          'Backtracking Basics'
        ]
      },
      {
        title: 'Linked List',
        description: 'Singly, Doubly, and Circular Linked Lists, cycle detection, reordering, LRU cache, and memory management.',
        topics: [
          'Singly Linked List',
          'Doubly Linked List',
          'Circular Linked List',
          'Reverse Linked List',
          'Cycle Detection',
          'Merge Lists',
          'Middle Node',
          'Clone List',
          'LRU Cache'
        ]
      },
      {
        title: 'Stack',
        description: 'Stack operations, expression evaluation, monotonic stacks, histogram problems, and parentheses matching.',
        topics: [
          'Stack Implementation',
          'Prefix/Infix/Postfix',
          'Expression Evaluation',
          'Next Greater Element',
          'Stock Span',
          'Histogram',
          'Balanced Parentheses',
          'Monotonic Stack'
        ]
      },
      {
        title: 'Queue',
        description: 'Queue, circular queue, deque, priority queue, monotonic queues, and queue/stack inter-conversions.',
        topics: [
          'Queue',
          'Circular Queue',
          'Deque',
          'Priority Queue',
          'Queue using Stack',
          'Stack using Queue',
          'Monotonic Queue'
        ]
      },
      {
        title: 'Hashing',
        description: 'HashMaps, HashSets, frequency counting, collision resolution techniques, and hash functions.',
        topics: [
          'HashMap',
          'HashSet',
          'Frequency Map',
          'Collision Handling',
          'Hash Functions'
        ]
      },
      {
        title: 'Trees',
        description: 'Binary Trees, BSTs, balanced search trees (AVL, Red-Black), Segment Trees, Fenwick Trees, Tries, and B-Trees.',
        topics: [
          'Binary Tree',
          'Tree Traversals',
          'DFS & BFS',
          'Height & Diameter',
          'Binary Search Tree',
          'AVL Tree',
          'Red-Black Tree',
          'Segment Tree',
          'Fenwick Tree',
          'Trie',
          'B-Tree',
          'B+ Tree'
        ]
      },
      {
        title: 'Heap',
        description: 'Min/Max Heaps, heapify mechanics, priority queues, stream median finder, and K-way merging.',
        topics: [
          'Min Heap',
          'Max Heap',
          'Heapify',
          'Heap Sort',
          'Priority Queue',
          'K Largest/Smallest',
          'Merge K Lists',
          'Median Finder'
        ]
      },
      {
        title: 'Graphs',
        description: 'Graph representations, BFS/DFS, shortest path algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall), MST, DSU, topological sort, and advanced graph theorems.',
        topics: [
          'Graph Representation',
          'BFS',
          'DFS',
          'Connected Components',
          'Cycle Detection',
          'Bipartite Graph',
          'Dijkstra',
          'Bellman-Ford',
          'Floyd-Warshall',
          'Prim\'s Algorithm',
          'Kruskal\'s Algorithm',
          'Union-Find (DSU)',
          'Topological Sort',
          'SCC (Kosaraju)',
          'Tarjan\'s Algorithm',
          'Bridges & Articulation Points',
          'Euler Path',
          'Hamiltonian Path',
          'Maximum Flow'
        ]
      },
      {
        title: 'Greedy Algorithms',
        description: 'Greedy strategy optimization, interval scheduling, Huffman coding, knapsack variants, and platform allocation.',
        topics: [
          'Activity Selection',
          'Job Scheduling',
          'Huffman Coding',
          'Fractional Knapsack',
          'Minimum Platforms',
          'Gas Station',
          'Candy Distribution'
        ]
      },
      {
        title: 'Backtracking',
        description: 'Combinatorial state-space search, subsets, permutations, N-Queens, Sudoku solver, and maze exploration.',
        topics: [
          'Subsets',
          'Permutations',
          'Combination Sum',
          'N-Queens',
          'Sudoku Solver',
          'Rat in a Maze',
          'Word Search'
        ]
      },
      {
        title: 'Dynamic Programming',
        description: 'Memoization, tabulation, space optimization, 1D/2D DP, matrix chain multiplication, tree DP, bitmask DP, and digit DP.',
        topics: [
          'Memoization',
          'Tabulation',
          'Space Optimization',
          'Fibonacci',
          'Climbing Stairs',
          'House Robber',
          'Coin Change',
          'Knapsack',
          'Rod Cutting',
          'Matrix Chain Multiplication',
          'LIS',
          'LCS',
          'Edit Distance',
          'Partition DP',
          'Digit DP',
          'Bitmask DP',
          'Tree DP',
          'Interval DP',
          'DP on Graphs'
        ]
      },
      {
        title: 'Advanced Data Structures',
        description: 'Advanced tree structures, Segment Trees with Lazy Propagation, Fenwick Trees, Sparse Tables, Treaps, and Skip Lists.',
        topics: [
          'Trie',
          'Segment Tree',
          'Lazy Propagation',
          'Fenwick Tree',
          'Sparse Table',
          'Treap',
          'Skip List',
          'Rope',
          'Ordered Set',
          'Policy-Based Data Structures'
        ]
      },
      {
        title: 'Advanced Algorithms',
        description: 'Divide & conquer, Mo\'s algorithm, sweep line, convex hull, string structures, and heavy-light decomposition.',
        topics: [
          'Divide & Conquer',
          'Meet in the Middle',
          'Sweep Line',
          'Mo\'s Algorithm',
          'Convex Hull',
          'Aho-Corasick',
          'Manacher\'s Algorithm',
          'Suffix Array',
          'Suffix Tree',
          'Heavy-Light Decomposition',
          'Centroid Decomposition'
        ]
      },
      {
        title: 'Interview Patterns',
        description: 'Master top LeetCode patterns for FAANG and product-based company coding rounds.',
        topics: [
          'Two Pointers',
          'Sliding Window',
          'Binary Search Pattern',
          'Fast & Slow Pointer',
          'Prefix Sum',
          'Monotonic Stack',
          'DFS/BFS Pattern',
          'Heap Pattern',
          'Greedy Pattern',
          'DP Pattern',
          'Backtracking Pattern',
          'Union-Find Pattern',
          'Trie Pattern'
        ]
      },
      {
        title: 'Competitive Programming',
        description: 'High-level competitive programming techniques, fast I/O, game theory, computational geometry, and bitmasking.',
        topics: [
          'Fast I/O',
          'Modular Arithmetic',
          'Binary Exponentiation',
          'Number Theory',
          'Segment Tree',
          'Fenwick Tree',
          'DSU',
          'Sparse Table',
          'Graph Algorithms',
          'String Algorithms',
          'Computational Geometry',
          'Game Theory',
          'Bitmasking'
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
    description: 'Master Ethical Hacking, Cyber Security, and Penetration Testing from absolute scratch! Learn network reconnaissance, Wireshark packet analysis, Linux command line security, Web Application Penetration Testing (OWASP Top 10), Metasploit, Cryptography, and Bug Bounty hunting workflows.',
    features: [
      'Ethical Hacking & Network Security Fundamentals',
      'OWASP Top 10 Web Vulnerability Exploitation',
      'Wireshark, Nmap, Burp Suite & Metasploit Tools',
      'Bug Bounty Hunting & Security Auditing',
      'Exclusive Telegram Channel for Course & Live Doubt Solving'
    ],
    modules: [
      {
        title: 'Phase 1: Computer Basics & Windows Fundamentals',
        description: 'Core computer architecture, operating system basics, boot process, Windows architecture, PowerShell, CMD, registry, and Active Directory basics.',
        topics: [
          'Computer Architecture',
          'CPU, GPU, RAM',
          'HDD, SSD',
          'BIOS & UEFI',
          'Motherboard',
          'Boot Process',
          'File Systems',
          'Operating System Basics',
          'Windows Architecture',
          'CMD',
          'PowerShell',
          'Registry',
          'Services',
          'Active Directory Basics',
          'File Permissions',
          'Task Manager'
        ]
      },
      {
        title: 'Phase 1: Linux Fundamentals & Networking',
        description: 'Linux installation, Kali Linux, terminal commands, OSI model, TCP/IP, DNS, DHCP, HTTP/HTTPS, VPN, routing, firewalls, and subnetting.',
        topics: [
          'Linux Installation',
          'Kali Linux',
          'Ubuntu',
          'Linux File System',
          'Terminal Commands',
          'Bash',
          'Permissions',
          'Users & Groups',
          'SSH',
          'Cron Jobs',
          'Package Management',
          'OSI Model',
          'TCP/IP',
          'IPv4 & IPv6',
          'MAC Address',
          'DNS',
          'DHCP',
          'HTTP & HTTPS',
          'FTP',
          'SMTP',
          'IMAP',
          'POP3',
          'SNMP',
          'SMB',
          'VLAN',
          'VPN',
          'NAT',
          'Routing',
          'Switching',
          'Firewalls',
          'Wi-Fi Security',
          'Subnetting'
        ]
      },
      {
        title: 'Phase 1: Programming for Cyber Security',
        description: 'Essential programming languages and scripting tools for automation, exploit writing, and regular expression pattern matching.',
        topics: [
          'Python',
          'Bash',
          'PowerShell',
          'JavaScript Basics',
          'SQL',
          'C Programming Basics',
          'Regular Expressions'
        ]
      },
      {
        title: 'Phase 2: Security Fundamentals & Cryptography',
        description: 'CIA Triad, risk, threat, vulnerability, Cyber Kill Chain, MITRE ATT&CK, NIST framework, encryption, SSL/TLS, and PKI.',
        topics: [
          'CIA Triad',
          'Risk',
          'Threat',
          'Vulnerability',
          'Exploit',
          'Attack Surface',
          'Security Controls',
          'Cyber Kill Chain',
          'MITRE ATT&CK',
          'NIST Framework',
          'Encryption',
          'Decryption',
          'Hashing',
          'AES',
          'RSA',
          'ECC',
          'SSL/TLS',
          'Certificates',
          'PKI',
          'Digital Signatures'
        ]
      },
      {
        title: 'Phase 2: Web Technologies & Web Security',
        description: 'Web development mechanics, cookies, sessions, JWT, OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF, IDOR), and auditing tools.',
        topics: [
          'HTML, CSS & JavaScript',
          'Cookies, Sessions & JWT',
          'REST APIs, GraphQL & WebSockets',
          'OWASP Top 10',
          'SQL Injection',
          'XSS',
          'CSRF',
          'SSRF',
          'XXE',
          'SSTI',
          'File Upload Vulnerabilities',
          'Command Injection',
          'IDOR',
          'LFI & RFI',
          'JWT Attacks',
          'Authentication Bypass',
          'Burp Suite',
          'OWASP ZAP',
          'Wireshark',
          'Fiddler',
          'Postman'
        ]
      },
      {
        title: 'Phase 3: Information Gathering & Reconnaissance',
        description: 'Google Dorking, WHOIS, DNS enumeration, OSINT, Shodan, Censys, Nmap, Masscan, service enumeration, and vulnerability assessment.',
        topics: [
          'Google Dorking',
          'WHOIS',
          'DNS Enumeration',
          'OSINT',
          'Shodan',
          'Censys',
          'Nmap',
          'Masscan',
          'Netdiscover',
          'Banner Grabbing',
          'Service Enumeration',
          'Vulnerability Assessment (Nessus, OpenVAS, Nikto, WhatWeb)'
        ]
      },
      {
        title: 'Phase 3: Exploitation, Password Attacks & Active Directory',
        description: 'Metasploit, reverse shells, password attacks, wireless hacking, Active Directory exploitation, privilege escalation, and pivoting.',
        topics: [
          'Metasploit & Searchsploit',
          'Reverse Shell & Bind Shell',
          'Payloads & Exploit Development Basics',
          'Password Attacks (Hydra, Hashcat, John the Ripper)',
          'Brute Force & Password Spraying',
          'Wireless Hacking (Aircrack-ng, WPA2/WPA3, Evil Twin)',
          'Active Directory (Kerberos, NTLM, BloodHound, Pass-the-Hash, Kerberoasting)',
          'Golden Ticket & Silver Ticket',
          'Linux & Windows PrivEsc',
          'Persistence, Lateral Movement & Pivoting'
        ]
      },
      {
        title: 'Phase 4: Cloud, Container & API Security',
        description: 'Securing AWS, Azure, Google Cloud, IAM, Docker, Kubernetes container hardening, API security, OAuth, and rate limiting.',
        topics: [
          'Cloud Security (AWS, Azure, Google Cloud)',
          'IAM, S3, EC2 & Security Groups',
          'Container Security (Docker, Kubernetes, Hardening)',
          'API Security (REST APIs, GraphQL, OAuth)',
          'JWT Security & Rate Limiting'
        ]
      },
      {
        title: 'Phase 4: Malware Analysis & Reverse Engineering',
        description: 'Analyzing viruses, worms, ransomware, static & dynamic analysis, assembly language, Ghidra, IDA Free, and x64dbg.',
        topics: [
          'Virus, Worm, Trojan, Ransomware, Spyware',
          'Static Analysis & Dynamic Analysis',
          'Reverse Engineering',
          'x86 & x64 Assembly Basics',
          'Ghidra',
          'IDA Free',
          'x64dbg'
        ]
      },
      {
        title: 'Phase 4: Digital Forensics, Incident Response & Blue Team',
        description: 'Memory/disk forensics, incident response, SOC SIEM threat hunting, YARA/Sigma rules, and Android mobile security.',
        topics: [
          'Digital Forensics (Memory, Disk, Log, Browser, Email)',
          'Incident Response (Detection, Containment, Eradication, Recovery, Reporting)',
          'Blue Team (SOC, SIEM, Threat Hunting, Detection Rules, YARA, Sigma Rules)',
          'Mobile Security (Android Security, APK Analysis, Frida, Objection)'
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
    description: 'Build beautiful native cross-platform mobile apps for Android and iOS using Flutter & Dart! Learn object-oriented Dart programming, Flutter widget trees, state management (Provider / Riverpod / BLoC), REST API integration, Firebase Firestore authentication, local storage, and publishing to Google Play Store & Apple App Store.',
    features: [
      'Cross-Platform Android & iOS App Development',
      'Dart Programming Language & OOP Concepts',
      'State Management with Provider, Riverpod & BLoC',
      'Firebase Auth, Firestore Database & Cloud Storage',
      'Exclusive Telegram Group for Live Support & App Code Repos'
    ],
    modules: [
      {
        title: 'Phase 1: Dart Programming & Flutter Basics',
        description: 'Fundamental Dart programming syntax, data structures, OOP, async mechanics, Flutter CLI setup, project structure, and basic widgets.',
        topics: [
          'Introduction to Dart, Variables, Data Types & Operators',
          'Input/Output, Type Casting, String Interpolation & Constants (final & const)',
          'Conditional Statements, Loops, Functions & Arrow Functions',
          'Null Safety, Collections (List, Set, Map) & Exception Handling',
          'Object-Oriented Dart: Classes, Objects, Constructors & Named Constructors',
          'OOP: Inheritance, Polymorphism, Abstraction, Encapsulation, Mixins & Extensions',
          'Generics & Async Programming (Future, Stream, async & await)',
          'Flutter Installation, Android Studio, VS Code, Emulator & Flutter CLI',
          'Project Structure & pubspec.yaml',
          'Widgets, Material & Cupertino Design, Hot Reload & Hot Restart',
          'Build Context, Widget Tree, StatelessWidget & StatefulWidget',
          'Basic Layout Widgets (Text, Image, Icon, Buttons, Scaffold, AppBar, FAB)',
          'Theme Basics'
        ]
      },
      {
        title: 'Phase 2: UI Development & Navigation',
        description: 'Advanced layout widgets, scrollable views, form inputs, navigation strategies, responsive UI design, themes, and UI effects.',
        topics: [
          'Layout Widgets (Container, Row, Column, Stack, Expanded, Flexible, Wrap, Align, Center, SizedBox, Padding, Margin, AspectRatio, FractionallySizedBox, Spacer)',
          'Scrollable Widgets (ListView, GridView, SingleChildScrollView, PageView, CustomScrollView, Slivers)',
          'Input Widgets & Form Validation (TextField, TextFormField, Checkbox, Radio Button, Switch, Slider, Date/Time Picker, Dropdown)',
          'Navigation (Navigator, Named Routes, Route Arguments, Nested Navigation, Bottom Navigation Bar, Drawer, Tabs, Deep Linking)',
          'UI Design (Responsive UI, MediaQuery, LayoutBuilder, OrientationBuilder, Dark/Light Mode, Custom Themes & Fonts)',
          'UI Assets & Effects (SVG, Custom Icons, Lottie Animation, Shimmer Effect)'
        ]
      },
      {
        title: 'Phase 3: State Management & Backend Integration',
        description: 'Comprehensive state management, local storage, REST API consumption, Firebase services, Node.js backend, and Supabase fundamentals.',
        topics: [
          'State Management (setState, Provider, Riverpod, Bloc, Cubit, GetX, ValueNotifier, ChangeNotifier)',
          'Local Storage (Shared Preferences, Hive, SQLite, Isar, Secure Storage)',
          'API Integration (HTTP Package, Dio, REST API, JSON Parsing, Serialization, Error Handling, Pagination, Infinite Scroll)',
          'Firebase (Setup, Auth Email/Google/Phone, Firestore, Realtime Database, Cloud Storage, Push Notifications FCM, Analytics, Crashlytics)',
          'Backend Integration (Node.js API, Express API, MongoDB, JWT Authentication, File Upload, Cloudinary, Supabase Basics)'
        ]
      },
      {
        title: 'Phase 4: Advanced Flutter Development',
        description: 'Software architecture patterns, custom painters, advanced animations, performance profiling, native device features, and payment gateways.',
        topics: [
          'Architecture (MVC, MVVM, Clean Architecture, Repository Pattern, Dependency Injection)',
          'Advanced Concepts (Custom Widgets, Reusable Components, Custom Painter, Canvas)',
          'Animations (Hero Animation, Implicit & Explicit Animations, Animation Controller, Custom Transitions)',
          'Performance (Lazy Loading, Memory & Image Optimization, Code Splitting, Tree Shaking, Build Optimization, Profiling)',
          'Native Features (Camera, Gallery, GPS, Maps, Geolocation, QR/Barcode Scanner, NFC, Bluetooth, Sensors, Biometrics Fingerprint/Face ID)',
          'Background & Media Services (Local Notifications, Background Services, Deep/App/Dynamic Links, File Picker, PDF Viewer, Video/Audio Player, Speech to Text, Text to Speech)',
          'Payment Gateway Integration (Razorpay, Stripe, UPI Integration)'
        ]
      },
      {
        title: 'Phase 5: Deployment, Testing & Professional Development',
        description: 'Testing methodologies, app security, DevOps CI/CD pipelines, publishing to Google Play & Apple App Store, and app monetization.',
        topics: [
          'Testing & Debugging (Unit Testing, Widget Testing, Integration Testing, Mock Testing, Debugging)',
          'Security (App & API Security, Secure Storage, Encryption, Certificate Pinning, Code Obfuscation)',
          'DevOps (Git, GitHub, Branching, Git Flow, CI/CD with GitHub Actions & Fastlane)',
          'Publishing (App Signing, Build APK/AAB, Play Store & App Store Deployment, Store Listing, Screenshots, Privacy Policy, Versioning, Release Notes)',
          'Monetization (AdMob, In-App Purchases, Subscriptions, RevenueCat)'
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
    description: 'Learn Python tailored specifically for AI & Data Science by Code With Harry! Master core Python syntax, object-oriented programming, file handling, data structures, NumPy, Pandas, Matplotlib, and AI library foundations.',
    features: [
      'Complete Python Foundations to Advanced OOP',
      'Python for AI, Machine Learning & Automation',
      'Hands-on Projects & Exercises by Code With Harry',
      'NumPy, Pandas & Matplotlib Fundamentals',
      'Exclusive Telegram Channel for Course & Code Notes'
    ],
    modules: [
      {
        title: 'Introduction to Programming & Python (4 lectures • 24min)',
        description: 'Fundamentals of programming, installing Python & VS Code, writing first program, and understanding Python syntax.',
        topics: [
          'Introduction to Programming (2:34)',
          'Installing Python and VS Code (3:04)',
          'Writing Our First Python Program (10:13)',
          'Understanding the Python Syntax (8:36)'
        ]
      },
      {
        title: 'Python Fundamentals (6 lectures • 77min)',
        description: 'Variables, data types, typecasting, user inputs, comments, print statements, operators, and practice problems.',
        topics: [
          'Variables and Data Types in Python (11:41)',
          'Typecasting in Python (9:11)',
          'Taking User Input in Python (9:59)',
          'Comments, Escape Sequences & Print Statement (15:29)',
          'Operators in Python (17:50)',
          'Python Basics - Practice Set (13:25)'
        ]
      },
      {
        title: 'Control Flow and Loops (6 lectures • 62min)',
        description: 'If-Else conditional logic, Match Case statements, for loops, while loops, break/continue/pass, and practice set.',
        topics: [
          'If-Else Conditional Statements (10:19)',
          'Match Case Statements in Python (4:28)',
          'For Loops in Python (8:10)',
          'While Loops in Python (7:29)',
          'Break, Continue, and Pass Statements (8:41)',
          'Python Conditionals & Loops - Practice Set (23:01)'
        ]
      },
      {
        title: 'Strings (5 lectures • 55min)',
        description: 'String manipulation, slicing, indexing, string methods, functions, f-strings formatting, and practice set.',
        topics: [
          'Strings in Python (10:37)',
          'String Slicing and Indexing (7:14)',
          'String Methods and Functions (13:07)',
          'String Formatting and f-Strings (5:27)',
          'Python Strings – Practice Set (18:41)'
        ]
      },
      {
        title: 'Functions and Modules (7 lectures • 76min)',
        description: 'Defining functions, arguments, return values, lambda functions, recursion, modules, pip, scope, and docstrings.',
        topics: [
          'Defining Functions in Python (10:37)',
          'Function Arguments & Return Values (5:10)',
          'Lambda Functions in Python (3:06)',
          'Recursion in Python (13:19)',
          'Modules and pip - Using External Libraries (11:54)',
          'Variable Scope and Docstrings (14:31)',
          'Python Functions & Modules – Practice Set (17:36)'
        ]
      },
      {
        title: 'Data Structures in Python (6 lectures • 56min)',
        description: 'Lists, tuples, sets, dictionaries, operations, methods, and python collections practice set.',
        topics: [
          'Introduction to Lists (6:38)',
          'List Methods (9:02)',
          'Tuples and Operations on Tuples (7:37)',
          'Sets and Set Methods (8:40)',
          'Dictionaries and Dictionary Methods (8:52)',
          'Python Collections – Practice Set (15:49)'
        ]
      },
      {
        title: 'Object-Oriented Programming (OOP) in Python (7 lectures • 41min)',
        description: 'Classes, objects, constructors, instance/class attributes, inheritance, polymorphism, method overriding, and OOP practice set.',
        topics: [
          'Introduction to OOP (6:59)',
          'Classes and Objects in Python (9:09)',
          'Constructors in Python (4:39)',
          'Instance and class attributes (4:35)',
          'Inheritance and Polymorphism (5:53)',
          'Method Overriding and Operator Overloading (4:45)',
          'Python OOP – Practice Set (5:07)'
        ]
      },
      {
        title: 'Advanced Python Concepts (9 lectures • 125min)',
        description: 'Decorators, getters/setters, static & class methods, dunder methods, exception handling, map/filter/reduce, walrus operator, args/kwargs, and practice set.',
        topics: [
          'Decorators in Python (15:04)',
          'Getters and Setters (9:05)',
          'Static & Class Methods (11:52)',
          'Magic/Dunder Methods (7:02)',
          'Exception Handling and Custom Errors (18:41)',
          'Map filter and reduce (12:07)',
          'Walrus operator (7:10)',
          'Args and kwargs (8:39)',
          'Python Advanced Concepts – Practice Set (35:22)'
        ]
      },
      {
        title: 'File IO - Working with Files & Related Modules (5 lectures • 51min)',
        description: 'File reading/writing/appending, OS & Shutil modules, command line utilities, and practice set.',
        topics: [
          'File I/O in Python (1:37)',
          'Read, Write, and Append Files (15:48)',
          'OS and Shutil Modules in Python (8:48)',
          'Creating Command Line Utilities (8:49)',
          'Python File Handling & Utilities – Practice Set (16:05)'
        ]
      },
      {
        title: 'Working with External Libraries (4 lectures • 41min)',
        description: 'Virtual environments, package management, Requests module APIs, Regular Expressions, and Multithreading.',
        topics: [
          'Virtual Environments & Package Management (21:34)',
          'Requests Module - Working with APIs (7:12)',
          'Regular Expressions in Python (6:33)',
          'Multithreading in Python (6:26)'
        ]
      },
      {
        title: 'Using AI as a Developer (4 lectures • 43min)',
        description: 'How to leverage AI tools, ChatGPT prompt workflows, GitHub Copilot, Cursor AI, Llama coder, and LLM APIs.',
        topics: [
          'When and how to use AI? (10:01)',
          'ChatGPT – The optimal way to use it (9:09)',
          'Github Copilot, Cursor AI & Llama coder (11:59)',
          'Working with LLM APIs (12:34)'
        ]
      },
      {
        title: 'Hands-On Python Projects (8 lectures • 76min)',
        description: 'Real-world projects: Calculator, Millionaire Game, PDFMerger, News App, Water Reminder, AI Virtual Assistant, File Organizer, QR Code Generator.',
        topics: [
          'Build a Simple Calculator (6:04)',
          'Who wants to be a Millionaire Game (12:02)',
          'PDFMerger: Merge PDFs using Python (7:32)',
          'Build a News App Using APIs (12:31)',
          'Build a Drink Water Reminder App (5:27)',
          'Build an AI Powered Virtual Assistant (13:49)',
          'Build a File Organizer using Python (10:51)',
          'Build a QR Code Generator using Python (7:44)'
        ]
      },
      {
        title: 'Building Web Applications using Flask (12 lectures • 93min)',
        description: 'Flask web app development: static sites, form handling, Jinja2 templating, template inheritance, static routing, query parameters, JSON APIs, and flashing.',
        topics: [
          'Introduction to Flask (3:15)',
          'Creating our first Flask App (6:48)',
          'Creating a Static Site (13:48)',
          'Serving Static Files in Flask (5:01)',
          'Handling Forms in Flask (10:05)',
          'Jinja 2 Templating in Flask (6:06)',
          'Conditionals, Loops & Comments in Jinja2 (6:54)',
          'Template Inheritance (10:24)',
          'Changing static folder & url_for function in Flask (9:19)',
          'Query Parameters in Flask (7:08)',
          'Creating APIs in Flask using jsonify (3:40)',
          'Message Flashing in Flask (10:41)'
        ]
      },
      {
        title: 'Project VidSnapAI - An AI Powered TikTok/Reel Generator (7 lectures • 79min)',
        description: 'Full-stack AI SaaS project: Flask backend logic, file uploading, AI Reel generation pipeline, ElevenLabs realistic AI audio, ffmpeg video processing, and gallery display.',
        topics: [
          'VidSnapAI - Setting up our AI Saas using Python & Flask (8:24)',
          'VidSnapAI - Writing Flask Backend Logic for AI Reel Generator (9:24)',
          'VidSnapAI - Uploading Files to our Server (10:44)',
          'VidSnapAI - Creating AI Reel Generation Pipeline (9:54)',
          'VidSnapAI - Using ElevenLabs to Generate realistic AI Audio (12:54)',
          'VidSnapAI - Generating Reels with audio using ffmpeg & Python (21:48)',
          'VidSnapAI - Displaying the Generated Reels in Gallery (6:38)'
        ]
      },
      {
        title: 'Version Control: Git for Developers (16 lectures • 147min)',
        description: 'Comprehensive Git & GitHub: installation, workflow, cloning, gitignore, branches, merging, merge conflicts, GitHub Desktop, stashing, VS Code & GitLens.',
        topics: [
          'Introduction to Git and GitHub (9:28)',
          'Installing Git (3:34)',
          'Basic Git Workflow for Python Developers (9:26)',
          'Writing commands for git workflow (9:30)',
          'Cloning a repository (8:06)',
          'Tracking and managing changes (15:14)',
          'Creating a gitignore file (8:31)',
          'Removing files from git repository (6:47)',
          'Branches in Git (14:23)',
          'Merging Branches & Merge Conflict (10:17)',
          'Working with GitHub (9:41)',
          'Working with Remote Repositories (9:03)',
          'Working with Github Desktop (11:15)',
          'Git Stash (9:49)',
          'Using git in VS Code (9:11)',
          'Using GitLens VS Code Extension (3:23)'
        ]
      },
      {
        title: 'Conclusion and Next Steps (2 lectures • 4min)',
        description: 'Course summary, next steps, additional resources, and software engineering career guidance.',
        topics: [
          'Course Summary & What’s Next (1:59)',
          'Resources and Career Guidance (2:46)'
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
    bgGradient: 'from-violet-600 via-purple-600 to-indigo-700',
    accentColor: 'violet',
    badgeBg: 'bg-violet-100 text-violet-800 border-violet-200',
    icon: Brain,
    level: 'Beginner to Advanced',
    duration: '12 Weeks Batch',
    description: 'The ultimate modern software engineering combo course! Master Core C++ and Data Structures & Algorithms alongside Generative AI engineering, LangChain, LangGraph, RAG systems, Multi-Agent frameworks, and AWS deployment.',
    features: [
      'Dual Mastery: Core C++ & DSA Algorithms with 300+ Solved Problems',
      'Generative AI Foundations, LLM Architecture & Vector Databases',
      'LangChain & RAG (Retrieval-Augmented Generation) Systems',
      'Advanced LangGraph Multi-Agent Workflows & MCP Server',
      'Production AWS Cloud Deployment & Final Capstone AI Agent'
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
    description: 'Master Generative AI with Hitesh Choudhary! Learn API integrations, prompt engineering techniques, fine-tuning open-source models, vector databases (Chroma/Pinecone), LangChain frameworks, and building real-world AI applications from concept to production deployment.',
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
    description: 'Combine cutting-edge Data Science with Generative AI! Master Python data analytics (Pandas, NumPy, Matplotlib), Machine Learning models, Deep Neural Networks, Large Language Models (LLMs), Prompt Engineering, Retrieval-Augmented Generation (RAG) with Vector Databases (Pinecone/Chroma), and build custom AI autonomous agents with LangChain.',
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
    description: 'The definitive complete roadmap to becoming an AI/ML Engineer! Dive deep into Python Data Science (NumPy, Pandas, Matplotlib), Supervised & Unsupervised Machine Learning algorithms (Regression, Decision Trees, XGBoost), Deep Learning with Neural Networks and PyTorch, Natural Language Processing (NLP), Transformer architectures, and Fine-Tuning Large Language Models (LLMs).',
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
    description: 'Transform raw data into actionable business insights! Master Advanced Microsoft Excel (XLOOKUP, Pivot Tables, Power Query), SQL Database Queries (JOINs, Window Functions, CTEs), Data Visualization with Power BI and Tableau, and Exploratory Data Analysis (EDA) with Python Pandas & Seaborn.',
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
    description: 'Master complete DevOps engineering and Cloud Infrastructure from scratch! Learn Linux system administration, shell scripting, Git workflows, Docker containerization, Kubernetes orchestration, CI/CD automation pipelines (GitHub Actions & Jenkins), Terraform Infrastructure as Code (IaC), Ansible configuration management, and AWS Cloud deployments.',
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
    tagline: 'Full-Stack Web Dev, Next.js, DevOps, System Design & Open Source by Harkirat Singh.',
    category: 'Web Development',
    price: 499,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+p3nJ7yJ0xNwxMTNl',
    bgGradient: 'from-amber-600 via-orange-600 to-red-700',
    accentColor: 'amber',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Code,
    level: 'Beginner to Advanced',
    duration: '16 Weeks Batch',
    description: 'The famous Cohort 2.0 by Harkirat Singh! Master full-stack JavaScript/TypeScript, React 18, Next.js 14 App Router, Node.js microservices, PostgreSQL, Prisma ORM, Docker, WebSockets, WebRTC, System Design, and Open Source development.',
    features: [
      'Complete Full-Stack MERN & Next.js 14 Cohort',
      'PostgreSQL, Prisma ORM & Database Indexing',
      'Docker, CI/CD & Production AWS Deployments',
      'WebSockets, WebRTC & Monorepos (Turborepo)',
      'Exclusive Telegram Group with Code Repos & Lecture Access'
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
    tagline: 'Upgraded Cohort 3.0: Next.js 15, DevOps, Kubernetes, Redis, Kafka, Rust & Web3 Blockchain.',
    category: 'Web Development',
    price: 599,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+f0g2X7a8uV41MDll',
    bgGradient: 'from-purple-700 via-indigo-800 to-slate-900',
    accentColor: 'purple',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Code,
    level: 'Beginner to Advanced',
    duration: '20 Weeks Cohort',
    description: 'The premier Harkirat Singh Cohort 3.0! Deep dive into modern Web Development with Next.js 15, TypeScript, PostgreSQL, Prisma, Cloudflare Workers, DevOps with Kubernetes & Kafka, Systems Programming in Rust, and Web3 Blockchain smart contracts.',
    features: [
      'Next.js 15, TypeScript, PostgreSQL & Serverless Architecture',
      'Kubernetes, Redis Caching, Apache Kafka & Event Streaming',
      'Rust Systems Programming & Smart Contracts (Solana/Ethereum)',
      'High-Level Distributed System Design & Performance Tuning',
      'Exclusive Telegram Channel for Code Repositories & Live Guidance'
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
    description: 'Master Web Development, Blockchain & Smart Contracts, Low-Level & High-Level System Design (SD), and Data Structures & Algorithms (DSA) with Rohit Negi! Built for aspiring software engineers aiming for top tech product company placements.',
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
    description: 'Master Data Structures & Algorithms from foundation to advanced competitive programming with Love Babbar in Supreme 1.0! Learn C++ STL, Bit Manipulation, Arrays, Searching/Sorting, Linked Lists, Stack, Queue, Trees, Graphs, Tries, Segment Trees, and Dynamic Programming.',
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
    description: 'The upgraded Love Babbar Supreme 2.0 DSA Cohort! Deep dive into advanced C++ problem solving, Segment Trees, Disjoint Set Union (DSU), Fenwick Trees, String Algorithms (KMP/Z-algorithm), and Low-Level System Design (LLD) fundamentals.',
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
    description: 'Master Low-Level Design (LLD) and High-Level System Design (HLD) from fundamentals to complex distributed architectures! Learn object-oriented design patterns, database sharding, replication, rate limiters, load balancing, message queues (Kafka, RabbitMQ), caching strategies (Redis), and microservice scalability.',
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
        description: 'OOP principles, SOLID design standards, Creational/Structural/Behavioral patterns, UML, and LLD case studies.',
        topics: [
          'Object-Oriented Programming (OOP) Principles',
          'SOLID Design Principles Deep Dive',
          'Creational Patterns: Singleton, Factory, Builder',
          'Structural Patterns: Adapter, Decorator, Proxy',
          'Behavioral Patterns: Observer, Strategy, State',
          'UML Class Diagrams & Sequence Diagrams',
          'LLD Case Study: Designing a Parking Lot',
          'LLD Case Study: Designing an Elevator Control System'
        ]
      },
      {
        title: 'Module 2: High-Level System Design (HLD) & Distributed Systems',
        description: 'Scaling strategies, Load Balancers, API Gateways, Sharding, Replication, CAP Theorem, and Consistent Hashing.',
        topics: [
          'Vertical vs Horizontal Scaling Strategies',
          'Load Balancers: Layer 4 vs Layer 7 Load Balancing',
          'API Gateway Architecture & Rate Limiting Algorithms',
          'Database Partitioning & Horizontal Sharding',
          'Database Replication: Master-Slave vs Multi-Master',
          'CAP Theorem & PACELC Theorem Trade-offs',
          'Consistent Hashing & Hash Ring Distribution',
          'Distributed Transactions & Saga Pattern'
        ]
      },
      {
        title: 'Module 3: Caching, Message Queues & System Architectures',
        description: 'Redis caching strategies, RabbitMQ/Kafka, CDNs, and case studies (TinyURL, WhatsApp, Uber, YouTube).',
        topics: [
          'Caching Strategies: Cache-Aside, Write-Through, Write-Back',
          'Redis In-Memory Data Structures & Eviction Policies',
          'Message Queues: RabbitMQ vs Apache Kafka',
          'Content Delivery Networks (CDN) & Static File Caching',
          'HLD Case Study: Designing URL Shortener (TinyURL)',
          'HLD Case Study: Designing WhatsApp / Chat Messenger',
          'HLD Case Study: Designing Uber / Ride Sharing Service',
          'HLD Case Study: Designing YouTube / Video Streaming'
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
    description: 'Learn Node.js from zero to advanced backend engineer with hands-on projects! Master the Node.js Event Loop, asynchronous I/O, Express.js framework, RESTful API design, authentication (JWT & OAuth), MongoDB/Mongoose database integration, file uploads, WebSockets, and deploying production server microservices.',
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
        description: 'V8 engine, Event loop phases, File System module, Event Emitters, Streams, Buffers, and HTTP server.',
        topics: [
          'Node.js Runtime Architecture & V8 Engine',
          'Asynchronous Non-blocking I/O & Event Loop Phases',
          'File System (FS) Module & Async Operations',
          'Events Module & Custom Event Emitters',
          'Streams & Buffers (Readable, Writable, Transform)',
          'HTTP Module & Creating HTTP Web Servers',
          'Node.js Process, Environment Variables & Global Scope',
          'Package Management with NPM / Yarn'
        ]
      },
      {
        title: 'Module 2: Express.js Framework & MongoDB Database',
        description: 'Express setup, Router, Params/Query/Body, Middlewares, MongoDB setup, Mongoose schemas, and Aggregations.',
        topics: [
          'Express.js Server Setup & Router Middleware',
          'Request & Response Objects, Params, Query, Body',
          'Custom Middleware Creation & Error Handling',
          'MongoDB Setup & Mongoose Schemas',
          'Mongoose Field Validations & Types',
          'CRUD Operations & Mongoose Query Builders',
          'Database Indexing & Aggregation Pipelines',
          'Security: Helmet, CORS & Rate Limiting'
        ]
      },
      {
        title: 'Module 3: Authentication, WebSockets & Capstone Backend Project',
        description: 'JWT Auth, bcrypt, RBAC, Multer file uploads, Socket.io real-time chat, API testing, and deployment.',
        topics: [
          'User Registration & Password Hashing with bcrypt',
          'JWT Sign, Verify & Cookie Session Storage',
          'Role-Based Access Control (RBAC) Middleware',
          'File Uploads with Multer & Cloudinary CDN',
          'Real-Time Communication with Socket.io / WebSockets',
          'API Testing with Postman & Jest',
          'Deploying Node.js Apps on Render / DigitalOcean',
          'Building a Full Capstone E-Commerce REST API'
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
    description: 'Master Enterprise Microservices architecture with Spring Boot, Spring Cloud, Docker containerization, and Kubernetes cluster orchestration! Learn Spring Cloud Gateway, Eureka Service Discovery, Config Server, Resilience4j Circuit Breakers, Docker containerization, Kubernetes Pods/Services, and distributed tracing with Zipkin & Prometheus.',
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
        description: 'Spring Boot auto-config, @RestController, Spring Data JPA, H2/PostgreSQL, Bean Validation, and Swagger.',
        topics: [
          'Spring Boot Architecture & Auto-Configuration',
          'Creating RESTful Web Services with @RestController',
          'Spring Data JPA & Entity Mapping (1:1, 1:N, N:M)',
          'H2 In-Memory & PostgreSQL Database Integration',
          'Spring Boot Actuator for Health Metrics',
          'Exception Handling with @ControllerAdvice',
          'Bean Validation with Hibernate Validator',
          'OpenAPI 3 / Swagger Documentation'
        ]
      },
      {
        title: 'Module 2: Spring Cloud Ecosystem & Microservice Patterns',
        description: 'Eureka Service Discovery, Spring Cloud Gateway, Config Server, Resilience4j Circuit Breakers, and Kafka.',
        topics: [
          'Monolithic to Microservices Migration',
          'Eureka Service Registry & Service Discovery',
          'Spring Cloud Gateway Routing, Filters & Security',
          'Spring Cloud Config Server for Centralized Config',
          'Resilience4j Circuit Breaker & Rate Limiter',
          'Distributed Tracing with Micrometer & Zipkin',
          'Event-Driven Microservices with Apache Kafka',
          'Feign Client for Declarative REST Calls'
        ]
      },
      {
        title: 'Module 3: Docker Containerization & Kubernetes Orchestration',
        description: 'Dockerizing Spring Boot, Multi-stage builds, Docker Compose, Kubernetes Pods, Services, ConfigMaps, and Secrets.',
        topics: [
          'Dockerizing Spring Boot Applications with Dockerfiles',
          'Multi-Stage Docker Builds for Jar Optimization',
          'Docker Compose Microservice Stack Setup',
          'Kubernetes Cluster Setup & Config',
          'Kubernetes Deployments, Pods & Services',
          'K8s ConfigMaps & Secrets Management',
          'Liveness & Readiness Probes for Microservices',
          'Deploying Microservices Stack on Kubernetes'
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
    description: 'Master Java from absolute scratch! Learn Java syntax, Object-Oriented Programming (OOP) principles, exception handling, Java Collections Framework (ArrayList, HashMap, HashSet), File I/O, Multithreading, and core DSA concepts.',
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
        description: 'JVM architecture, variables, control flow, methods, classes, constructors, encapsulation, and memory.',
        topics: [
          'JDK, JRE & JVM Architecture Overview',
          'Java Syntax, Variables & Primitive Data Types',
          'Operators: Arithmetic, Relational, Logical & Bitwise',
          'Control Flow: if-else, switch-case, for, while, do-while',
          'Methods, Parameters, Return Types & Scope',
          'Classes, Objects & Constructor Methods',
          'Encapsulation & Access Modifiers (public, private, protected)',
          'Garbage Collection & Stack vs Heap Memory'
        ]
      },
      {
        title: 'Module 2: Advanced OOPs, Interfaces & Exception Handling',
        description: 'Inheritance, Polymorphism, Abstract classes, Interfaces, Strings, Custom Exceptions, and Packages.',
        topics: [
          'Inheritance (super keyword, extends)',
          'Polymorphism: Method Overloading & Method Overriding',
          'Abstract Classes vs Interfaces',
          'Static Keyword, Final Keyword & Enums',
          'String, StringBuilder & StringBuffer Classes',
          'Exception Handling: try, catch, finally, throw, throws',
          'Creating Custom User-Defined Exceptions',
          'Java Packages & Access Control Rules'
        ]
      },
      {
        title: 'Module 3: Java Collections Framework, Streams & Multithreading',
        description: 'JCF Overview, ArrayList, HashSet, HashMap, Generics, Lambdas, Streams API, File I/O, and Multithreading.',
        topics: [
          'Java Collections Framework (JCF) Overview',
          'List Interface: ArrayList & LinkedList',
          'Set Interface: HashSet & TreeSet',
          'Map Interface: HashMap & TreeMap',
          'Generics & Iterators in Java',
          'Java 8 Features: Lambda Expressions & Stream API',
          'File I/O: Reading & Writing Files',
          'Multithreading Basics: Thread Class & Runnable Interface'
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
    description: 'Master production Machine Learning Operations (MLOps) with 10+ end-to-end industry projects! Learn experiment tracking with MLflow, data version control with DVC, automated CI/CD pipelines with GitHub Actions, model packaging with Docker & BentoML, cloud deployment on AWS EC2/S3, and model monitoring in production.',
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
        description: 'MLOps lifecycle, modular coding, Data Version Control (DVC), MLflow experiment tracking, and Model Registry.',
        topics: [
          'MLOps Lifecycle vs Traditional DevOps',
          'Modular Python Code Structuring for ML Pipelines',
          'Data Version Control (DVC) Setup & Remote Storage',
          'DVC Data Pipelines (dvc.yaml) & Reproducibility',
          'MLflow Experiment Tracking & Parameter Logging',
          'MLflow Model Registry & Stage Transitions',
          'Config Management with Hydra / PyYAML',
          'Automated Data Validation with Great Expectations'
        ]
      },
      {
        title: 'Module 2: Model Serving, Containerization & CI/CD',
        description: 'FastAPI prediction endpoints, Dockerizing ML pipelines, BentoML serving, and GitHub Actions CI/CD.',
        topics: [
          'FastAPI REST API Endpoints for ML Predictions',
          'Dockerizing ML Training & Inference Pipelines',
          'BentoML Model Packaging & Serving',
          'Triton Inference Server Basics',
          'GitHub Actions CI/CD Workflows for ML Models',
          'Automated Model Testing & Linting',
          'Pre-commit Hooks & Code Formatting (Black, Flake8)',
          'Container Registry Integration (Docker Hub / AWS ECR)'
        ]
      },
      {
        title: 'Module 3: Cloud Deployment (AWS) & Model Monitoring',
        description: 'AWS EC2/S3/ECR setup, SageMaker pipelines, Evidently AI drift monitoring, Prometheus/Grafana, and 10+ Capstones.',
        topics: [
          'AWS Infrastructure Setup: EC2, S3 & ECR',
          'Deploying Dockerized ML Containers on AWS EC2',
          'AWS SageMaker Pipelines Overview',
          'Monitoring Data & Concept Drift with Evidently AI',
          'Prometheus & Grafana ML Performance Dashboards',
          'Logging & Exception Handling in Production',
          'A/B Testing & Shadow Deployments for Models',
          '10+ End-to-End Capstone ML Project Walkthroughs'
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
    description: 'Transform your English communication skills from basic to fluent speaker! Master real-world spoken English, sentence framing, correct pronunciation, essential grammar, vocabulary expansion, public speaking, job interview answers, and professional corporate email writing.',
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
        description: 'Essential tenses, sentence construction rules, articles, prepositions, vocabulary, pronunciation, and confidence.',
        topics: [
          'Essential English Tenses (Present, Past, Future)',
          'Sentence Construction Rules (Subject-Verb Agreement)',
          'Correct Use of Articles (A, An, The) & Prepositions',
          'Daily Usage Vocabulary & Idioms',
          'Correct Pronunciation & Phonetics Basics',
          'Overcoming Hesitation & Building Speaking Confidence',
          'Common English Mistakes to Avoid',
          'Self-Introduction & Icebreaker Conversations'
        ]
      },
      {
        title: 'Module 2: Fluency, Conversation & Accent Building',
        description: 'Thinking in English, real-life conversation scenarios, voice modulation, accent neutralization, and active listening.',
        topics: [
          'Thinking Directly in English (Stopping Translation)',
          'Real-Life Conversation Scenarios (Shopping, Travel, Office)',
          'Voice Modulation, Pitch & Pacing',
          'Accent Neutralization & Clear Articulation',
          'Active Listening & Quick Response Strategies',
          'Expressing Opinions, Agreement & Disagreement',
          'Small Talk Techniques & Networking Skills',
          'Storytelling & Narrative Speaking'
        ]
      },
      {
        title: 'Module 3: Professional English, Interviews & Public Speaking',
        description: 'Job interview preparation, corporate email writing, presentations, GD strategies, and non-verbal communication.',
        topics: [
          'Job Interview Q&A Preparation & Sample Responses',
          'Corporate Email Writing & Business Etiquettes',
          'Delivering Professional Presentations & Speech Delivery',
          'Group Discussion (GD) Strategies & Leadership Speaking',
          'Negotiation Skills & Persuasive Communication',
          'Handling Difficult Workplace Conversations',
          'Body Language, Eye Contact & Non-Verbal Cues',
          'Mastering Telephonic & Video Call Communications'
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
    description: 'Master JavaScript inside-out and clear frontend/fullstack developer technical interviews with ease! Deep dive into execution contexts, hoisting, closures, prototypal inheritance, event loop, promises, async/await, ES6+ modern features, DOM manipulation, polyfills, and 100+ top company interview questions.',
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
        description: 'V8 engine, execution context, hoisting, TDZ, closures, lexical scope, arrow functions, and ES6+ features.',
        topics: [
          'JS Engine V8 Architecture, JIT Compilation & AST',
          'Execution Context, Call Stack & Global/Function Scope',
          'Hoisting Mechanics for Var, Let, Const & Functions',
          'Temporal Dead Zone (TDZ) & Scope Chain',
          'Closures: Definition, Memory Overhead & Lexical Scope',
          'Practical Closure Use Cases (Private Variables, Currying)',
          'ES6+ Features: Destructuring, Rest/Spread, Default Params',
          'Arrow Functions vs Regular Functions (This Keyword Binding)'
        ]
      },
      {
        title: 'Module 2: Asynchronous JS, Promises & Event Loop Deep Dive',
        description: 'Callbacks, Promises, Async/Await, Microtask vs Macrotask Queue, Event Loop, and custom Polyfills.',
        topics: [
          'Asynchronous JS: Callbacks, Callback Hell & Inversion of Control',
          'Promises States (Pending, Fulfilled, Rejected)',
          'Promise Chaining & Error Propagation (.catch, .finally)',
          'Promise Static Methods (Promise.all, allSettled, race, any)',
          'Async/Await Syntax & Try-Catch Best Practices',
          'Event Loop, Microtask Queue vs Macrotask Queue',
          'Writing Polyfills from Scratch (Array.map, Array.filter, Array.reduce)',
          'Writing Polyfills for Promise.all & Bind Method'
        ]
      },
      {
        title: 'Module 3: Prototypal Inheritance, DOM & Machine Coding Interviews',
        description: 'Prototypes, Prototype chain, Call/Apply/Bind, DOM event delegation, Debounce/Throttle, and Machine Coding.',
        topics: [
          'Prototypes, Prototype Chain & __proto__',
          'Prototypal Inheritance vs Class Syntax',
          'Call, Apply, and Bind Methods with Custom Implementations',
          'DOM Manipulation, Event Bubbling, Capturing & Delegation',
          'Debouncing & Throttling with Live Implementations',
          'Currying & Partial Application Patterns',
          'Deep Copy vs Shallow Copy (StructuredClone, JSON)',
          'Top 100 Output-Based & Machine Coding Interview Problems'
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
    description: 'Ace your Python coding interviews! Master Data Structures & Algorithms tailored specifically for Python developers. Learn pattern-based problem solving (Two Pointers, Sliding Window, HashMaps, Fast & Slow Pointers, Backtracking, Trees, Dynamic Programming) alongside Pythonic optimizations and 150+ LeetCode interview questions.',
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
        description: 'Big-O complexity, list/dict internals, collections module, heapq, bisect, itertools, and pythonic idioms.',
        topics: [
          'Big-O Time & Space Complexity in Python',
          'Python List & Dict Memory Mechanics under the hood',
          'Collections Module: Counter, defaultdict, deque, OrderedDict',
          'String Manipulation, Slicing & Regex Tricks',
          'Heapq Module for Min-Heap Operations',
          'Bisect Module for Binary Search',
          'Itertools & Functools Power Tricks',
          'Pythonic Code Optimization Standards'
        ]
      },
      {
        title: 'Module 2: Core Data Structures: Linked Lists, Trees & Graphs',
        description: 'Two Pointers, Sliding Window, Fast/Slow Pointers, Linked Lists, Binary Trees, BST, and Graphs.',
        topics: [
          'Two Pointers Pattern (Opposite, Same Direction)',
          'Sliding Window Pattern (Fixed & Variable Size)',
          'Fast & Slow Pointers for Linked List Cycle Detection',
          'Reversing Linked List & Merge K Sorted Lists',
          'Binary Trees, BST Operations & Traversals',
          'Lowest Common Ancestor (LCA) & Path Sum Problems',
          'Graph Representation using Adjacency Lists',
          'Graph Traversals: BFS, DFS, Shortest Path'
        ]
      },
      {
        title: 'Module 3: Backtracking, Dynamic Programming & Mock Interview Sets',
        description: 'Recursion trees, backtracking, 1D/2D DP with functools, bitwise operations, and top 150 LeetCode interview questions.',
        topics: [
          'Recursion Trees & Backtracking (Subsets, Permutations)',
          'Combinatorial Search & N-Queens Problem',
          '1D Dynamic Programming with @functools.lru_cache',
          '2D Dynamic Programming (Knapsack, LCS, Edit Distance)',
          'Bit Manipulation in Python',
          'Top 150 Solved LeetCode Python Interview Questions',
          'Mock Interview Problem Solving Strategies',
          'Tips for Communicating Thought Process in Tech Interviews'
        ]
      }
    ]
  }
];
