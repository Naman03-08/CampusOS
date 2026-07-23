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
        title: 'Module 1: Dart Programming Language & Flutter Basics',
        description: 'Dart syntax, OOP, Async futures, null safety, widget tree architecture, and Material Design 3.',
        topics: [
          'Dart Variables, Data Types, Control Flow & Functions',
          'Object-Oriented Dart: Classes, Constructors & Mixins',
          'Asynchronous Dart: Futures, async/await & Streams',
          'Null Safety Mechanics & Type System in Dart',
          'Flutter Widget Tree Architecture & Element Tree',
          'StatelessWidget vs StatefulWidget Lifecycle',
          'Material Design 3 & Cupertino Component Sets',
          'Debugging Flutter Apps & Hot Reload Mechanics'
        ]
      },
      {
        title: 'Module 2: Layouts, Forms & Responsive UI Design',
        description: 'Container layouts, ListView, GridView, Form validations, responsive design, themes, and navigation.',
        topics: [
          'Container, Row, Column, Expanded & Flexible Widgets',
          'ListView, GridView, CustomScrollView & Slivers',
          'Form Widgets, FormKeys & Input Field Validations',
          'Responsive Layouts with LayoutBuilder & MediaQuery',
          'Custom Painter, Animations & Hero Transitions',
          'Dark Mode Configuration & Custom Theme Extension',
          'Asset Management (Images, Fonts & SVG Icons)',
          'Navigation & Routing (Navigator 2.0 & go_router)'
        ]
      },
      {
        title: 'Module 3: State Management with Provider, Riverpod & BLoC',
        description: 'State management fundamentals, Provider, Riverpod, BLoC pattern, dependency injection, and testing.',
        topics: [
          'State Management Fundamentals & Lifting State Up',
          'Provider Package: ChangeNotifiers, Consumer & Selector',
          'Riverpod StateNotifier, FutureProvider & StreamProvider',
          'BLoC / Cubit Pattern Architecture & Event Handling',
          'Comparing State Management Options for Production Apps',
          'Dependency Injection with get_it / Injectable',
          'Immutability in Dart with Freezed & Equatable',
          'Unit & Widget Testing in Flutter'
        ]
      },
      {
        title: 'Module 4: REST API Integration & Local Storage',
        description: 'HTTP requests, Dio, JSON serialization, SharedPreferences, Hive NoSQL, and SQLite.',
        topics: [
          'HTTP Requests using http & Dio Packages',
          'JSON Parsing & Auto Serialization with json_serializable',
          'Handling Loading States, Retries & Error SnackBar',
          'Local Storage with SharedPreferences',
          'Hive NoSQL Local Key-Value Database',
          'SQLite Local Relational Database with sqflite',
          'Secure Storage for Tokens (flutter_secure_storage)',
          'Caching Network Images & Offline First Support'
        ]
      },
      {
        title: 'Module 5: Firebase Integration & App Store Deployment',
        description: 'Firebase setup, Auth, Cloud Firestore CRUD, Push Notifications, and Play/App Store publishing.',
        topics: [
          'Firebase Project Setup for Android & iOS',
          'Firebase Authentication (Email/Password & Google Sign-In)',
          'Cloud Firestore Realtime CRUD Operations',
          'Firebase Cloud Storage for Image & File Uploads',
          'Firebase Cloud Messaging (FCM) Push Notifications',
          'Building Release APK, AAB & iOS IPA Bundles',
          'Google Play Console & Apple App Store Publishing',
          'App Monetization with Google AdMob & In-App Purchases'
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
        title: 'Module 1: Python Basics & Core Language Syntax',
        description: 'Environment setup, variables, operators, conditional logic, loops, functions, and lambda expressions.',
        topics: [
          'Python Installation, Anaconda Setup & VS Code Config',
          'Variables, Data Types & Type Casting Mechanics',
          'Operators: Arithmetic, Comparison, Logical & Bitwise',
          'Control Flow: if, elif, else & Nested Conditions',
          'Loops: for, while, break, continue & pass',
          'Functions, Arguments, Return Values & Docstrings',
          'Lambda Expressions, Map, Filter & Reduce',
          'Scope Rules: Local, Global & Nonlocal'
        ]
      },
      {
        title: 'Module 2: Data Structures & Advanced Python Concepts',
        description: 'Lists, Tuples, Dictionaries, Sets, Regex pattern matching, modules, and virtual environments.',
        topics: [
          'Lists: Indexing, Slicing, Methods & List Comprehensions',
          'Tuples: Immutability, Unpacking & Tuple Operations',
          'Dictionaries: Key-Value Pairs, Methods & Dict Comprehensions',
          'Sets: Set Operations (Union, Intersection, Difference)',
          'String Manipulation, Formatting (f-strings) & Methods',
          'Regular Expressions (Re Module) for Pattern Matching',
          'Modules, Packages & Virtual Environments (venv)',
          'Command Line Arguments with argparse / sys'
        ]
      },
      {
        title: 'Module 3: Object-Oriented Programming (OOP) & Exceptions',
        description: 'Classes, Objects, Inheritance, Polymorphism, Encapsulation, Exception handling, and File I/O.',
        topics: [
          'Classes, Objects & Constructor (__init__) Methods',
          'Instance vs Class Attributes & Methods',
          'Inheritance: Single, Multiple & Multilevel',
          'Polymorphism, Method Overriding & Operator Overloading',
          'Encapsulation, Name Mangling & Property Decorators',
          'Exception Handling: try, except, else, finally & Custom Errors',
          'File I/O: Reading, Writing & Context Managers (with statement)',
          'Generators & Iterators (__iter__, __next__, yield)'
        ]
      },
      {
        title: 'Module 4: NumPy & Pandas for AI & Data Science',
        description: 'NumPy Ndarrays, vectorized computations, Pandas DataFrames, cleaning, and data aggregations.',
        topics: [
          'NumPy Ndarrays, Data Types & Shape Manipulations',
          'NumPy Slicing, Indexing & Vectorized Operations',
          'NumPy Broadcasting Rules & Matrix Multiplication',
          'Pandas Series & DataFrame Creation',
          'Data Cleaning: Handling Missing Values (fillna, dropna)',
          'Filtering, Querying & Sorting DataFrames',
          'Grouping Data with groupby() & Aggregations',
          'Merging, Joining & Concatenating DataFrames'
        ]
      },
      {
        title: 'Module 5: Matplotlib, Seaborn & Intro to Machine Learning',
        description: 'Data visualizations, charts, feature preprocessing, and building your first Scikit-Learn script.',
        topics: [
          'Matplotlib Line Plots, Scatter Plots, Bar Charts & Histograms',
          'Subplots, Figure Sizing & Styling Visualizations',
          'Seaborn Statistical Charts, Heatmaps & Pairplots',
          'Data Preprocessing: Standard Scaling & One-Hot Encoding',
          'Train-Test Split & Dataset Partitioning',
          'Scikit-Learn Basics: Linear Regression Model',
          'Logistic Regression for Classification',
          'Building First Complete AI Automation Script'
        ]
      }
    ]
  },
  {
    id: 'genai-dsa-combo',
    title: 'Complete Generative AI And DSA Course',
    tagline: 'Master Data Structures & Algorithms alongside LLMs, OpenAI/Gemini APIs, RAG & LangChain.',
    category: 'AI & Machine Learning',
    price: 399,
    linkType: 'telegram',
    linkUrl: 'https://t.me/+oJ52yN2eY4E3YTM1',
    bgGradient: 'from-violet-600 via-purple-600 to-indigo-700',
    accentColor: 'violet',
    badgeBg: 'bg-violet-100 text-violet-800 border-violet-200',
    icon: Brain,
    level: 'Beginner to Advanced',
    duration: '10 Weeks Batch',
    description: 'The ultimate modern software engineering combo course! Master Core DSA problem solving (Trees, Graphs, DP) alongside Generative AI engineering (Transformers, Vector Databases, RAG pipelines, LangChain, and AI Agent frameworks).',
    features: [
      'Dual Mastery: Core DSA Algorithms & Generative AI Engineering',
      'OpenAI & Gemini API Integrations with Function Calling',
      'RAG Systems with Vector Databases (Pinecone, ChromaDB)',
      'LangChain Framework & Autonomous AI Agents',
      'Exclusive Telegram Group for Solution Code & Live Batch'
    ],
    modules: [
      {
        title: 'Module 1: Core DSA Algorithms & Problem-Solving Patterns',
        description: 'Time/space complexity, Two Pointers, Sliding Window, Recursion, Trees, Graphs, and DP.',
        topics: [
          'Time & Space Complexity Analysis (Big-O Analysis)',
          'Two Pointers & Sliding Window Algorithmic Patterns',
          'Frequency Map & Subarray Lookup Patterns',
          'Recursion, Backtracking & Subsets Generation',
          'Binary Trees, BST Operations & Traversals',
          'Graph Adjacency Lists, BFS & DFS Traversals',
          'Topological Sort & Shortest Path Algorithms',
          '1D & 2D Dynamic Programming Fundamentals'
        ]
      },
      {
        title: 'Module 2: Generative AI & Large Language Model Foundations',
        description: 'Transformers, self-attention, tokenization, embeddings, prompt engineering, and LLM parameters.',
        topics: [
          'Transformer Architecture & Self-Attention Mechanism',
          'Encoder-Only vs Decoder-Only Models (BERT vs GPT)',
          'Tokenization, Context Windows & Vocabulary Encoding',
          'Vector Embeddings & Semantic Similarity',
          'Prompt Engineering: Zero-Shot, Few-Shot & Chain-of-Thought',
          'System Prompts, Temperature, Top-P & Repetition Penalty',
          'Hallucinations & Mitigation Strategies',
          'Evaluating LLM Outputs & Benchmark Metrics'
        ]
      },
      {
        title: 'Module 3: OpenAI & Gemini API Integrations',
        description: 'API integration, streaming responses, structured JSON outputs, function calling, and multimodal AI.',
        topics: [
          'API Key Setup, Environment Variables & Client Config',
          'Generating Text, Chat Completions & Streaming Responses',
          'Structured JSON Output Generation & Schema Validation',
          'Function Calling & External Tool Execution',
          'Multimodal AI: Text, Image & Audio Analysis',
          'Rate Limiting, Retries & Exponential Backoff',
          'Token Usage Optimization & Cost Management',
          'Building a Full AI Assistant Interface'
        ]
      },
      {
        title: 'Module 4: Vector Databases & RAG Architectures',
        description: 'Embedding generation, vector databases (ChromaDB, Pinecone, FAISS), document chunking, and RAG.',
        topics: [
          'Generating Text Embeddings using OpenAI/Gemini Embeddings',
          'Vector Similarity Metrics: Cosine Distance, Dot Product, Euclidean',
          'Vector DBs: ChromaDB, Pinecone & FAISS Setup',
          'Document Ingestion, Chunking Strategies & Overlaps',
          'Building Retrieval-Augmented Generation (RAG) Pipelines',
          'RAG Reranking & Hybrid Keyword/Vector Search',
          'Handling Large PDF Documents & Context Windows',
          'RAG Evaluation with Ragas Framework'
        ]
      },
      {
        title: 'Module 5: LangChain, AI Agents & Autonomous Workflows',
        description: 'LangChain core, LCEL chains, memory modules, custom tools, ReAct framework, and LangGraph.',
        topics: [
          'LangChain Core: Prompts, Models & Output Parsers',
          'LangChain Expression Language (LCEL) Chains',
          'Conversation Memory Modules (Buffer, Summary)',
          'Custom Tools Binding for External API Calls',
          'ReAct (Reasoning + Acting) Agent Framework',
          'Multi-Agent System Orchestration',
          'LangGraph Framework for Stateful AI Workflows',
          'Deploying Production-Ready GenAI Applications'
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
        title: 'Module 1: LLM Architecture & Advanced Prompt Engineering',
        description: 'Transformers, self-attention, tokenization, advanced prompt patterns, system prompts, and security.',
        topics: [
          'Transformer Encoder-Decoder Architecture Deep Dive',
          'Positional Encoding, Self-Attention & Multi-Head Attention',
          'Tokenization Engines (Tiktoken, SentencePiece)',
          'Advanced Prompt Engineering Techniques (ReAct, Tree of Thoughts)',
          'System Instructions, Temperature & Top-P Fine-Tuning',
          'Handling Long Context Windows & Context Compression',
          'Guardrails, Content Filtering & Prompt Injection Security',
          'Model Benchmarking (MMLU, HumanEval)'
        ]
      },
      {
        title: 'Module 2: Vector Databases, Embeddings & RAG Systems',
        description: 'Vector spaces, ChromaDB, Pinecone, document chunking, RAG architectures, and hybrid search.',
        topics: [
          'High-Dimensional Vector Spaces & Embeddings',
          'ChromaDB Setup, Persistent Storage & Metadata Indexing',
          'Pinecone Serverless Indexing & Vector Search',
          'Document Processing: PyPDF, Recursive Character Splitter',
          'RAG Architecture: Retrieval, Context Injection & Generation',
          'Hybrid Search: Combining BM25 Keyword & Dense Vector Search',
          'Parent-Document Retriever & Self-Querying Retrievers',
          'Evaluating RAG Precision, Recall & Faithfulness'
        ]
      },
      {
        title: 'Module 3: LangChain Framework & Agentic AI',
        description: 'LangChain LCEL, memory persistence, function calling, custom tools, ReAct loops, and LangGraph.',
        topics: [
          'LangChain Core Architecture & Runnable Interfaces',
          'Building Complex Chains with LCEL',
          'Memory Persistence in Vector Stores & Databases',
          'Function Calling with Structured Output Parsers',
          'Building Custom Tools for Web Search, SQL & APIs',
          'ReAct Agents & Autonomous Decision Loops',
          'LangGraph for Graphs-based Multi-Agent Workflows',
          'Human-in-the-Loop Approval Workflows'
        ]
      },
      {
        title: 'Module 4: Fine-Tuning Open Source Models & Production Cloud',
        description: 'Llama 3, Mistral, LoRA/QLoRA, dataset preparation, GGUF/AWQ formats, Ollama/vLLM, and cloud deployment.',
        topics: [
          'Open Source LLMs: Llama 3, Mistral, Qwen & Gemma',
          'Fine-Tuning Overview: Full Fine-Tuning vs Parameter-Efficient',
          'LoRA (Low-Rank Adaptation) & QLoRA Quantization',
          'Dataset Preparation & Formatting (JSONL Format)',
          'Model Quantization Formats (GGUF, AWQ, EXL2)',
          'Ollama & vLLM High-Performance Inference Servers',
          'Deploying Open Source LLMs on AWS EC2 / Modal / RunPod',
          'Monitoring Production GenAI Costs & Latency'
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
        title: 'Module 1: Python Data Science & Statistical Foundations',
        description: 'Python data analytics, NumPy matrix calculations, Pandas wrangling, hypothesis testing, and EDA.',
        topics: [
          'Python Programming for Data Analysis',
          'NumPy Arrays, Matrix Operations & Vectorized Calculations',
          'Pandas DataFrames, Series, Slicing & Wrangling',
          'Data Cleaning: Missing Values, Duplicates & Outliers',
          'Descriptive Statistics: Mean, Median, Variance, Std Dev',
          'Probability Distributions: Normal, Binomial, Poisson',
          'Hypothesis Testing, Z-test, T-test, ANOVA & P-values',
          'Exploratory Data Analysis (EDA) Case Studies'
        ]
      },
      {
        title: 'Module 2: Machine Learning & Deep Neural Networks',
        description: 'Supervised ML models, Ensemble methods, Unsupervised clustering, PCA, and PyTorch deep learning.',
        topics: [
          'Supervised Learning: Linear & Logistic Regression',
          'Decision Trees, Random Forests & Ensemble Methods',
          'XGBoost, LightGBM & Gradient Boosting',
          'Unsupervised Learning: K-Means Clustering & Hierarchical',
          'Dimensionality Reduction: PCA & t-SNE',
          'Model Evaluation: Precision, Recall, F1-Score & ROC-AUC',
          'Cross-Validation, GridSearch & Hyperparameter Tuning',
          'PyTorch Neural Networks, Loss Functions & Optimizers'
        ]
      },
      {
        title: 'Module 3: Natural Language Processing (NLP) & Transformers',
        description: 'Text preprocessing, TF-IDF, Word Embeddings, RNN/LSTM, Transformers, and Hugging Face.',
        topics: [
          'Text Preprocessing: Tokenization, Stemming, Lemmatization',
          'TF-IDF Vectors & CountVectorizer',
          'Word Embeddings: Word2Vec, GloVe & FastText',
          'Recurrent Neural Networks (RNN) & LSTM Architectures',
          'Transformer Encoder-Decoder Architecture',
          'Hugging Face Transformers Pipeline & Datasets',
          'Text Classification & Sentiment Analysis',
          'Named Entity Recognition (NER) & Text Summarization'
        ]
      },
      {
        title: 'Module 4: Generative AI, RAG Systems & LangChain Agents',
        description: 'LLM mechanics, Prompt engineering, Vector databases, RAG architecture, and Streamlit/Gradio apps.',
        topics: [
          'Large Language Models (LLMs) Overview & APIs',
          'Prompt Engineering & Context Window Management',
          'Text Embeddings & Vector Databases (ChromaDB, Pinecone)',
          'Retrieval-Augmented Generation (RAG) Architecture',
          'LangChain Expression Language (LCEL)',
          'Custom Tools Integration & Function Calling',
          'Building Autonomous AI Data Analysts',
          'Deploying Data Science & GenAI Apps with Streamlit / Gradio'
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
        title: 'Module 1: Math Foundations & Python Data Science Stack',
        description: 'Linear algebra, calculus, probability, NumPy vectorization, Pandas DataFrames, and Seaborn charts.',
        topics: [
          'Linear Algebra: Vectors, Matrices, Eigenvalues & SVD',
          'Calculus: Partial Derivatives, Gradients & Chain Rule',
          'Probability & Bayes Theorem for Machine Learning',
          'NumPy High-Performance Vector Computations',
          'Pandas Advanced Data Manipulation & Aggregations',
          'Matplotlib & Seaborn Data Visualization',
          'Data Cleaning & Feature Preprocessing Pipelines',
          'Feature Scaling: Standard Scaling vs Min-Max Normalization'
        ]
      },
      {
        title: 'Module 2: Supervised Machine Learning Algorithms',
        description: 'Linear/Logistic regression, Decision Trees, Random Forests, SVM, Naive Bayes, KNN, and XGBoost.',
        topics: [
          'Linear Regression & Polynomial Regression',
          'Logistic Regression & Binary/Multiclass Classification',
          'Decision Trees & Information Gain (Gini / Entropy)',
          'Random Forests & Bagging Methods',
          'Support Vector Machines (SVM) & Kernel Functions',
          'Naive Bayes Classifier & Text Classification',
          'K-Nearest Neighbors (KNN) Algorithm',
          'XGBoost & LightGBM Gradient Boosting'
        ]
      },
      {
        title: 'Module 3: Unsupervised Learning & Model Optimization',
        description: 'Clustering, PCA, Anomaly Detection, L1/L2 regularization, Cross-Validation, and Scikit-Learn pipelines.',
        topics: [
          'K-Means Clustering & Elbow Method',
          'Hierarchical Clustering & Dendrograms',
          'DBSCAN Density-Based Clustering',
          'Principal Component Analysis (PCA) for Dimension Reduction',
          'Anomaly Detection Algorithms',
          'Overfitting, Underfitting & L1/L2 Regularization (Lasso/Ridge)',
          'Cross-Validation Strategies (K-Fold, Stratified)',
          'Scikit-Learn Custom Transformer Pipelines'
        ]
      },
      {
        title: 'Module 4: Deep Learning & PyTorch Framework',
        description: 'Perceptrons, ANNs, Backpropagation, Adam optimizer, CNNs, and PyTorch Tensors/DataLoaders.',
        topics: [
          'Perceptron, Activation Functions (ReLU, Sigmoid, Softmax)',
          'Artificial Neural Networks (ANN) & Feedforward Architecture',
          'Backpropagation & Gradient Descent Optimizers (Adam, SGD)',
          'Convolutional Neural Networks (CNN) for Computer Vision',
          'CNN Architectures: ResNet, VGG, MobileNet',
          'PyTorch Tensors, Autograd & Loss Functions',
          'Building Custom PyTorch Dataset & DataLoader',
          'PyTorch Training Loop, Validation & Checkpointing'
        ]
      },
      {
        title: 'Module 5: Transformers, Hugging Face & Fine-Tuning LLMs',
        description: 'Attention mechanisms, BERT/GPT models, Hugging Face Hub, fine-tuning, LoRA/QLoRA, and ONNX deployment.',
        topics: [
          'Sequence-to-Sequence Models & Attention Mechanism',
          'Transformer Architecture: Self-Attention & Multi-Head Attention',
          'BERT, GPT, T5 Model Families',
          'Hugging Face Hub, Tokenizers & Model Loading',
          'Fine-Tuning Pretrained Models on Custom Datasets',
          'LoRA & QLoRA Parameter-Efficient Fine-Tuning',
          'Evaluating Language Models (Perplexity, BLEU, ROUGE)',
          'Model Exporting (ONNX) & Deployment to Production Cloud'
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
        title: 'Module 1: Advanced Excel & Power Query for Analytics',
        description: 'XLOOKUP, INDEX-MATCH, Pivot Tables, Power Query ETL, Goal Seek, and Executive Dashboards.',
        topics: [
          'Advanced Formulas (XLOOKUP, INDEX-MATCH, LET, FILTER, UNIQUE)',
          'Dynamic Pivot Tables, Slicers & Calculated Fields',
          'Conditional Formatting & Data Validation Rules',
          'Power Query ETL: Importing, Cleaning & Unpivoting Data',
          'Excel Financial & Logical Functions (NPV, IRR, IF/AND/OR)',
          'What-If Analysis: Goal Seek, Data Tables & Scenario Manager',
          'Excel VBA Macros Automation Basics',
          'Designing Executive KPI Dashboards in Excel'
        ]
      },
      {
        title: 'Module 2: SQL Data Querying & Database Analytics',
        description: 'Relational databases, SELECT queries, JOINs, aggregations, subqueries, CTEs, and Window functions.',
        topics: [
          'Relational Database Concepts, Primary & Foreign Keys',
          'SQL Queries: SELECT, WHERE, GROUP BY, HAVING, ORDER BY',
          'Multi-Table JOINs: INNER, LEFT, RIGHT, FULL OUTER & CROSS',
          'Aggregate Functions: SUM, AVG, COUNT, MIN, MAX',
          'Subqueries: Correlated & Non-Correlated Subqueries',
          'Common Table Expressions (CTEs) & WITH Clause',
          'Window Functions: ROW_NUMBER, RANK, DENSE_RANK, NTILE',
          'Lead, Lag, Running Totals & Moving Averages'
        ]
      },
      {
        title: 'Module 3: Power BI & Data Visualization',
        description: 'Data modeling, Star schema, DAX measures, Time intelligence, interactive dashboards, and Power BI Service.',
        topics: [
          'Importing Data & Power Query Data Transformations',
          'Data Modeling: Star Schema vs Snowflake Schema',
          'Creating Relationships & Cardinality (1:Many, Many:Many)',
          'DAX Basics: Calculated Columns vs Measures',
          'Advanced DAX: CALCULATE, SUMX, FILTER, ALL, ALLEXCEPT',
          'Time Intelligence DAX: DATESYTD, SAMEPERIODLASTYEAR',
          'Building Interactive Power BI Dashboards & Filters',
          'Publishing to Power BI Service & Automated Refresh'
        ]
      },
      {
        title: 'Module 4: Python Exploratory Data Analysis (EDA)',
        description: 'Pandas data wrangling, cleaning missing values, Seaborn charts, hypothesis testing, and portfolio case studies.',
        topics: [
          'Python Pandas DataFrames & Data Inspection',
          'Data Cleaning: Dropping Duplicates & Imputing Missing Values',
          'Matplotlib & Seaborn Chart Customization',
          'Distribution Plots: Histograms, Boxplots & Violin Plots',
          'Correlation Matrices & Heatmaps',
          'Statistical Analysis: Hypothesis Testing & P-values',
          'Cohort Analysis & Customer Churn Modeling',
          'Real-World E-Commerce & Finance EDA Case Studies'
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
        title: 'Module 1: Linux Administration, Shell Scripting & Git',
        description: 'Linux file permissions, systemctl, process monitoring, bash automation, Git branching, and SSH hardening.',
        topics: [
          'Linux File System Hierarchy, Permissions (chmod/chown) & Ownership',
          'Linux CLI Command Mastery (grep, awk, sed, find, systemctl)',
          'Process Management, CPU/Memory Monitoring & Cron Jobs',
          'Bash Shell Scripting: Variables, Loops, Conditionals & Functions',
          'Git Version Control: Branching, Merging, Rebasing & Conflict Resolution',
          'SSH Keys Configuration & Secure Server Access',
          'Linux Firewall (UFW/iptables) & Network Configuration',
          'Automating System Tasks with Shell Scripts'
        ]
      },
      {
        title: 'Module 2: Docker Containers & Multi-Container Stacks',
        description: 'Docker architecture, Dockerfiles, multi-stage builds, volumes, networking, Docker Compose, and image security.',
        topics: [
          'Monolithic vs Containerized Architecture',
          'Docker Architecture: Engine, Images, Containers & Registries',
          'Writing Production Dockerfiles & Multi-Stage Builds',
          'Docker Image Layer Caching & Optimization',
          'Docker Volumes, Bind Mounts & Persistent Storage',
          'Docker Networking: Bridge, Host & Overlay Networks',
          'Docker Compose for Multi-Container Applications',
          'Docker Security Best Practices & Image Scanning'
        ]
      },
      {
        title: 'Module 3: Kubernetes Cluster Orchestration',
        description: 'Control plane, kubectl, Pods, Deployments, Services, ConfigMaps, Secrets, PV/PVC, and Helm.',
        topics: [
          'Kubernetes Architecture: Control Plane & Worker Nodes',
          'Kubectl CLI Tool Configuration & Command Usage',
          'Kubernetes Objects: Pods, ReplicaSets & Deployments',
          'Kubernetes Networking: ClusterIP, NodePort, LoadBalancer & Ingress',
          'ConfigMaps & Secrets for Environment Management',
          'Persistent Volumes (PV), Claims (PVC) & StorageClasses',
          'Kubernetes Auto-scaling (HPA & Cluster Autoscaler)',
          'Helm Package Manager & Chart Deployments'
        ]
      },
      {
        title: 'Module 4: CI/CD Pipelines, Infrastructure as Code & Cloud',
        description: 'GitHub Actions, Jenkins pipelines, Terraform IaC, Ansible playbooks, AWS cloud services, and EKS deployments.',
        topics: [
          'Continuous Integration & Continuous Deployment Concepts',
          'GitHub Actions Workflows, Triggers & Matrix Builds',
          'Jenkins Pipeline Setup, Declarative Pipelines & Plugins',
          'Terraform Infrastructure as Code (IaC) Provider Setup',
          'Terraform State Management, Modules & Variables',
          'Ansible Playbooks & Configuration Management',
          'AWS Infrastructure Setup: EC2, S3, VPC & IAM',
          'Deploying Kubernetes Clusters on AWS EKS with CI/CD'
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
        title: 'Module 1: JavaScript, TypeScript & React/Next.js Architecture',
        description: 'JS event loop, TypeScript strict types, React hooks, Next.js App Router, Server Actions, and Recoil/Zustand.',
        topics: [
          'JavaScript Event Loop, Promises, Callbacks & Async/Await',
          'TypeScript Generics, Interfaces, Types & Strict Config',
          'React 18 Custom Hooks, Context API & Performance Optimization',
          'Next.js 14/15 App Router, Server Components & Client Components',
          'Server Actions, Form Handling & Zod Validation',
          'Tailwind CSS Layout Utilities & Component Libraries',
          'State Management with Recoil / Zustand',
          'Authentication with NextAuth / Auth.js'
        ]
      },
      {
        title: 'Module 2: Backend Microservices with Node, PostgreSQL & Prisma',
        description: 'Express.js microservices, PostgreSQL relational schemas, Prisma ORM, transactions, and JWT authentication.',
        topics: [
          'Express.js Microservices Architecture & Middleware',
          'PostgreSQL Relational Database Schemas & Queries',
          'Prisma ORM Migrations, Schema Design & Indexing',
          'Database Pooling, Transactions & Relations',
          'JWT Authentication, Refresh Tokens & HttpOnly Cookies',
          'Input Sanitization & Rate Limiting Middleware',
          'OpenAPI / Swagger API Documentation',
          'Testing Express/Next APIs with Jest & Supertest'
        ]
      },
      {
        title: 'Module 3: Real-Time WebSockets, WebRTC & Monorepos',
        description: 'WebSockets protocol, Socket.io, WebRTC peer-to-peer video, Turborepo monorepos, and Redis Pub/Sub.',
        topics: [
          'WebSockets Protocol vs HTTP Polling',
          'Socket.io / ws Library Implementation in Node.js',
          'WebRTC Peer-to-Peer Video & Audio Connections',
          'STUN / TURN Server Configuration for WebRTC',
          'Turborepo Monorepo Setup & Workspace Management',
          'Shared Packages for TypeScript Types & UI Components',
          'Pub/Sub Architecture with Redis',
          'Building Real-time Chat & Collaborative Applications'
        ]
      },
      {
        title: 'Module 4: Docker, CI/CD, System Design & Open Source',
        description: 'Docker multi-stage builds, GitHub Actions pipelines, System Design rate limiters, and Open Source contributions.',
        topics: [
          'Docker Containerization for Frontend & Backend Apps',
          'Multi-Stage Dockerfiles for Production Assets',
          'GitHub Actions Automated Testing & Deployment Pipelines',
          'System Design Fundamentals: Rate Limiters, Load Balancers',
          'Database Caching Strategies with Redis',
          'Deploying Monorepos to AWS / DigitalOcean / Vercel',
          'Open Source Contribution Guidelines & Pull Requests',
          'Building a Capstone Production Application'
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
        title: 'Module 1: Web Development & Microservice Backend',
        description: 'Next.js 15 App Router, TypeScript, PostgreSQL, Prisma, Cloudflare Workers, and Monorepo infrastructure.',
        topics: [
          'Next.js 15 App Router & React Server Components',
          'TypeScript Advanced Generics, Utility Types & Type Guards',
          'PostgreSQL Relational Schemas, Indexing & Query Tuning',
          'Prisma ORM Migrations & Complex Relations',
          'Serverless Architectures & Cloudflare Workers',
          'Custom Middleware, CORS, Security Headers & Rate Limiting',
          'OAuth2 & JWT Authentication Workflows',
          'Monorepo Infrastructure with Turborepo'
        ]
      },
      {
        title: 'Module 2: DevOps, Kubernetes, Redis, Kafka & Distributed Systems',
        description: 'Docker, Kubernetes cluster management, Redis caching, Apache Kafka event streaming, and CI/CD pipelines.',
        topics: [
          'Docker Containerization & Multi-Container Docker Compose',
          'Kubernetes Cluster Deployments, Services & Ingress',
          'Redis Caching, Pub/Sub & Distributed Locks',
          'Apache Kafka Message Queues & Event-Driven Architecture',
          'Kafka Producers, Consumers & Topic Partitioning',
          'CI/CD Automation Pipelines with GitHub Actions',
          'Prometheus & Grafana Monitoring & Alerts',
          'Zero-Downtime Rolling Deployments'
        ]
      },
      {
        title: 'Module 3: Systems Programming in Rust & Web3 Blockchain',
        description: 'Rust language mechanics, memory safety, Blockchain concepts, Solana smart contracts, and dApps.',
        topics: [
          'Rust Fundamentals: Ownership, Borrowing & Lifetimes',
          'Rust Data Structures: Structs, Enums, Result & Option',
          'Error Handling & Memory Safety in Rust',
          'Blockchain Architecture & Cryptographic Hash Functions',
          'Solana Smart Contract Development with Anchor Framework',
          'Ethereum & Solidity Smart Contract Basics',
          'Building Decentralized Applications (dApps) with Web3.js',
          'Smart Contract Auditing & Security Vulnerabilities'
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
        title: 'Module 1: C++ DSA & Competitive Problem Solving',
        description: 'C++ STL, Big-O complexity, Two Pointers, Sliding Window, Recursion, Trees, Graphs, and 300+ LeetCode problems.',
        topics: [
          'C++ STL Vectors, Maps, Sets & Priority Queues',
          'Time & Space Complexity Analysis (Big-O)',
          'Two Pointers & Sliding Window Patterns',
          'Recursion, Backtracking & Subsets Generation',
          'Binary Trees, BST Operations & Boundary Traversals',
          'Graph BFS, DFS, Shortest Path & Cycle Detection',
          '1D & 2D Dynamic Programming Patterns',
          '300+ Solved LeetCode & CodeStudio Questions'
        ]
      },
      {
        title: 'Module 2: Full-Stack Web Development & Blockchain',
        description: 'React, Node.js microservices, MongoDB/PostgreSQL, REST APIs, JWT Auth, Solidity, and dApps.',
        topics: [
          'Frontend Development with React 18 & Tailwind CSS',
          'Backend REST API Microservices with Node.js & Express',
          'MongoDB / PostgreSQL Database Modeling & Queries',
          'JWT Authentication & Security Best Practices',
          'Blockchain Fundamentals & Ethereum Virtual Machine (EVM)',
          'Solidity Smart Contract Development & Deployment',
          'Web3.js & Ethers.js Frontend Integration',
          'Building Full-Stack Decentralized SaaS Apps'
        ]
      },
      {
        title: 'Module 3: System Design (LLD & HLD) Architecture',
        description: 'SOLID principles, design patterns, LLD case studies, HLD load balancers, database sharding, and caching.',
        topics: [
          'SOLID Principles & Clean Architecture Standards',
          'Creational, Structural & Behavioral Design Patterns',
          'Low-Level Design (LLD) Case Studies (Parking Lot, LLD Games)',
          'High-Level System Design (HLD) Concepts',
          'Load Balancers, API Gateways & Service Discovery',
          'Database Sharding, Replication & CAP Theorem',
          'Distributed Caching with Redis & Content Delivery Networks (CDN)',
          'HLD Case Studies: Designing WhatsApp, Uber & Rate Limiters'
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
        title: 'Module 1: C++ STL & Linear Data Structures',
        description: 'Pointers, memory management, STL containers, Arrays, Searching/Sorting, Two Pointers, and Linked Lists.',
        topics: [
          'C++ Fundamentals, Pointers & Memory Allocation',
          'C++ STL Vectors, Deque, Maps, Sets & Iterators',
          'Time & Space Complexity Analysis',
          'Arrays: Searching, Sorting & Matrix Traversals',
          'Binary Search Variants & Search on Answer Space',
          'Two Pointers & Sliding Window Problems',
          'Singly & Doubly Linked List Operations',
          'Reversing Linked List & Cycle Detection'
        ]
      },
      {
        title: 'Module 2: Stacks, Queues, Trees & Heaps',
        description: 'Stack evaluation, Monotonic Stack, Binary Trees, BST, Heaps, Priority Queues, and Trie structures.',
        topics: [
          'Stack Implementation & Monotonic Stack Problems',
          'Queue Implementation, Deque & Circular Queue',
          'Binary Tree Traversals (Inorder, Preorder, Postorder, BFS)',
          'Binary Search Tree (BST) Search, Insert & Delete',
          'Lowest Common Ancestor (LCA) & Tree Views',
          'Max Heap & Min Heap Construction from Scratch',
          'Priority Queues & Top K Frequent Problems',
          'Trie Implementation for Prefix Searching'
        ]
      },
      {
        title: 'Module 3: Graphs, Backtracking & Dynamic Programming',
        description: 'Graph algorithms, shortest path, MST, backtracking, 1D/2D DP, and top product company interview questions.',
        topics: [
          'Graph Adjacency List & Matrix Representation',
          'Graph BFS, DFS & Cycle Detection Algorithms',
          'Dijkstra Algorithm & Bellman-Ford Shortest Path',
          'Minimum Spanning Trees (Kruskal & Prim)',
          'Backtracking: N-Queens, Sudoku & Rat in a Maze',
          '1D Dynamic Programming: Climbing Stairs & Coin Change',
          '2D Dynamic Programming: 0/1 Knapsack & LCS',
          'Top 250 Company Interview Problems Walkthrough'
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
        title: 'Module 1: Bit Manipulation, Recursion & Linear Structures',
        description: 'Bitwise operations, XOR tricks, recursion trees, backtracking, matrix rotations, and Monotonic Stacks.',
        topics: [
          'Bitwise Operations, XOR Tricks & Bit Masking',
          'Time & Space Complexity Proofs',
          'Recursion Tree Analysis & Call Stack Visualization',
          'Backtracking Combinatorial Search',
          'Array Rotations, Kadane Algorithm & Subarray Patterns',
          'Matrix Manipulations & Spiral Search',
          'Monotonic Stack & Monotonic Queue Applications',
          'Hard Linked List In-Place Reversals'
        ]
      },
      {
        title: 'Module 2: Trees, Graph Algorithms & Advanced DP',
        description: 'LCA, BST balancing, Topological sort, Tarjan bridges, DSU, Tree DP, Digit DP, and Bitmask DP.',
        topics: [
          'Binary Tree Diameter, LCA & Path Sum Problems',
          'BST Balancing & Range Queries',
          'Graph Topological Sort (Kahn Algorithm & DFS)',
          'Bridges & Articulation Points in Graphs (Tarjan)',
          'Disjoint Set Union (DSU) with Path Compression',
          'DP on Trees & Re-rooting DP',
          'Digit DP & Bitmask Dynamic Programming',
          'Matrix Chain Multiplication & DP on Grids'
        ]
      },
      {
        title: 'Module 3: Advanced Data Structures (Segment/Fenwick) & LLD',
        description: 'Segment Trees, Lazy Propagation, Fenwick Trees, KMP string matching, and Low-Level Design (LLD).',
        topics: [
          'Segment Tree Construction & Range Queries',
          'Segment Tree Lazy Propagation for Range Updates',
          'Fenwick Tree (Binary Indexed Tree) Operations',
          'String Pattern Matching: KMP Algorithm',
          'Z-Algorithm & Rabin-Karp Hash Matching',
          'Object-Oriented Design Principles (SOLID)',
          'Low-Level Design (LLD) Patterns',
          'Top 300 LeetCode Medium/Hard Questions Solved'
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
