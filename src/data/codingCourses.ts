import { CodingCourse } from '../types';

export const CODING_COURSES: CodingCourse[] = [
  {
    id: 'course-webdev-101',
    title: 'Full-Stack Web Development Mastery (2026 Edition)',
    slug: 'fullstack-web-dev',
    category: 'Web Dev',
    badge: 'BESTSELLER',
    description: 'Master modern web development from HTML/CSS/JS fundamentals to building production-ready React 18+, TypeScript, Node.js, and Express apps with Tailwind CSS.',
    instructor: {
      name: 'Sarah Jenkins',
      role: 'Staff Frontend Engineer ex-Google',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    level: 'Beginner',
    durationHours: 42,
    totalModules: 5,
    rating: 4.95,
    enrolledStudentsCount: 14280,
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'REST API'],
    gradientBg: 'from-blue-600 via-indigo-600 to-purple-700',
    modules: [
      {
        id: 'webdev-m1',
        title: 'Module 1: JavaScript ES6+ & Async Mechanics',
        description: 'Understand promises, async/await, closures, prototypes, event loop, and array methods.',
        lessons: [
          {
            id: 'webdev-m1-l1',
            title: '1.1 ES6 Destructuring, Arrow Functions & Rest Parameters',
            duration: '22 mins',
            summary: 'Learn syntax cleanups, default parameters, destructuring objects and arrays efficiently.',
            codeSnippet: {
              language: 'javascript',
              starterCode: `// Exercise: Calculate user total order with discount
function calculateTotal(order) {
  // TODO: Destructure items, taxRate, and discount from order
  // Return final calculated total rounded to 2 decimals
}

const sampleOrder = { items: [29.99, 49.50, 12.00], taxRate: 0.08, discount: 5.00 };
console.log(calculateTotal(sampleOrder));`,
              solutionCode: `function calculateTotal({ items = [], taxRate = 0, discount = 0 }) {
  const subtotal = items.reduce((sum, price) => sum + price, 0);
  const discounted = Math.max(0, subtotal - discount);
  const total = discounted * (1 + taxRate);
  return Number(total.toFixed(2));
}

const sampleOrder = { items: [29.99, 49.50, 12.00], taxRate: 0.08, discount: 5.00 };
console.log(calculateTotal(sampleOrder)); // 93.41`,
              instructions: 'Destructure the order object properties in function parameters and return the final price after discount and tax.'
            },
            quiz: [
              {
                id: 'q-web-1',
                question: 'Which method iterates over an array and returns a single accumulated value?',
                options: ['array.map()', 'array.filter()', 'array.reduce()', 'array.forEach()'],
                correctAnswer: 2,
                explanation: 'reduce() accumulates array elements into a single return value.'
              }
            ]
          },
          {
            id: 'webdev-m1-l2',
            title: '1.2 Promises, Async/Await & Error Handling',
            duration: '35 mins',
            summary: 'Deep dive into asynchronous JavaScript execution, handling API responses with try/catch.',
            codeSnippet: {
              language: 'javascript',
              starterCode: `// Exercise: Fetch user profile asynchronously
async function fetchUserProfile(userId) {
  // TODO: Use fetch or simulate Promise to get user data
  // Handle errors gracefully using try/catch
}`,
              solutionCode: `async function fetchUserProfile(userId) {
  try {
    const res = await new Promise((resolve) => 
      setTimeout(() => resolve({ id: userId, name: 'Alex', status: 'Active' }), 500)
    );
    return res;
  } catch (err) {
    console.error('Failed to fetch user:', err);
  }
}
fetchUserProfile('u123').then(console.log);`,
              instructions: 'Implement async user profile fetching with try/catch error handling.'
            }
          }
        ]
      },
      {
        id: 'webdev-m2',
        title: 'Module 2: React 18 Fundamentals & Custom Hooks',
        description: 'Component architecture, useState, useEffect, useMemo, useCallback, and building re-usable custom hooks.',
        lessons: [
          {
            id: 'webdev-m2-l1',
            title: '2.1 Building Custom React Hooks (e.g. useLocalStorage)',
            duration: '28 mins',
            summary: 'Encapsulate browser local storage synchronization inside a clean custom React hook.',
            codeSnippet: {
              language: 'typescript',
              starterCode: `import { useState, useEffect } from 'react';

// TODO: Complete useLocalStorage hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Implement state initialization and window storage listener
}`,
              solutionCode: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
              instructions: 'Write a re-usable React hook that syncs state with localStorage.'
            }
          }
        ]
      }
    ],
    capstoneProject: {
      title: 'Real-Time E-Commerce & Analytics Dashboard',
      description: 'Build a production full-stack dashboard featuring user authentication, product catalogs, live state filtering, and chart visualizers.',
      deliverables: [
        'Responsive React + Tailwind CSS frontend interface',
        'Express REST API with authentication and input validation',
        'State management using custom React hooks or Context API'
      ]
    }
  },
  {
    id: 'course-dsa-201',
    title: 'Data Structures & Algorithms Deep Dive (C++ & Java)',
    slug: 'dsa-cpp-java',
    category: 'DSA & C++',
    badge: 'POPULAR',
    description: 'Conquer coding interviews at top tech companies. Master 375+ pattern problems covering Two Pointers, Dynamic Programming, Graphs, Trees, and Tries.',
    instructor: {
      name: 'Rohan Sharma',
      role: 'ACM-ICPC World Finalist & Senior SDE at Amazon',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    level: 'Intermediate',
    durationHours: 65,
    totalModules: 6,
    rating: 4.98,
    enrolledStudentsCount: 21500,
    tags: ['C++', 'Java', 'LeetCode', 'Dynamic Programming', 'Graphs', 'Trees'],
    gradientBg: 'from-amber-600 via-orange-600 to-red-700',
    modules: [
      {
        id: 'dsa-m1',
        title: 'Module 1: Two Pointers & Sliding Window Patterns',
        description: 'Master linear array patterns to reduce O(N^2) algorithms to O(N) optimal time complexity.',
        lessons: [
          {
            id: 'dsa-m1-l1',
            title: '1.1 Sliding Window Maximum & Variable Window Sum',
            duration: '40 mins',
            summary: 'Learn when to expand right pointer and shrink left pointer for substring and subarray problems.',
            codeSnippet: {
              language: 'cpp',
              starterCode: `// Problem: Find length of smallest subarray with sum >= target
#include <iostream>
#include <vector>
#include <algorithm>

int minSubArrayLen(int target, const std::vector<int>& nums) {
    // TODO: Implement O(N) sliding window
    return 0;
}`,
              solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>

int minSubArrayLen(int target, const std::vector<int>& nums) {
    int left = 0, current_sum = 0, min_len = INT_MAX;
    for (int right = 0; right < nums.size(); ++right) {
        current_sum += nums[right];
        while (current_sum >= target) {
            min_len = std::min(min_len, right - left + 1);
            current_sum -= nums[left++];
        }
    }
    return min_len == INT_MAX ? 0 : min_len;
}`,
              instructions: 'Implement sliding window to find minimum subarray length whose sum is greater than or equal to target.'
            },
            quiz: [
              {
                id: 'q-dsa-1',
                question: 'What is the time complexity of the Sliding Window technique on a 1D array of size N?',
                options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(2^N)'],
                correctAnswer: 2,
                explanation: 'Each element is visited by the left and right pointers at most once, making it O(N).'
              }
            ]
          }
        ]
      },
      {
        id: 'dsa-m2',
        title: 'Module 2: Dynamic Programming & Memoization',
        description: 'Deconstruct complex optimization problems into overlapping subproblems and optimal substructure.',
        lessons: [
          {
            id: 'dsa-m2-l1',
            title: '2.1 0/1 Knapsack & Subset Sum Matrix DP',
            duration: '50 mins',
            summary: 'Formulate DP state transitions for inclusion vs exclusion item optimization.',
            codeSnippet: {
              language: 'cpp',
              starterCode: `// Knapsack 0/1 DP State formulation
int knapsack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    // TODO: Fill 2D DP matrix
    return 0;
}`,
              solutionCode: `int knapsack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i-1] <= w) {
                dp[i][w] = max(val[i-1] + dp[i-1][w - wt[i-1]], dp[i-1][w]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}`,
              instructions: 'Write the 0/1 knapsack dynamic programming algorithm using a 2D matrix.'
            }
          }
        ]
      }
    ],
    capstoneProject: {
      title: '375 DSA Pattern Solver Benchmark',
      description: 'Solve key pattern problems on LeetCode/Striver sheet and analyze space-time complexities with written explanations.',
      deliverables: [
        'Sliding Window & Two Pointer practice solutions',
        'Graph Traversal (BFS/DFS/Dijkstra) code templates',
        'Dynamic Programming memoization and tabulation breakdowns'
      ]
    }
  },
  {
    id: 'course-ai-301',
    title: 'Generative AI & LLM Application Engineering',
    slug: 'genai-llm-engineering',
    category: 'AI & ML',
    badge: 'NEW & TRENDING',
    description: 'Build intelligent AI agents, RAG (Retrieval-Augmented Generation) pipelines, vector database search, and multimodal applications using Gemini API & LangChain.',
    instructor: {
      name: 'Dr. Michael Chen',
      role: 'AI Researcher & Co-founder at Neural AI Labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    level: 'All Levels',
    durationHours: 30,
    totalModules: 4,
    rating: 4.97,
    enrolledStudentsCount: 8940,
    tags: ['Python', 'Gemini API', 'LLM', 'RAG', 'VectorDB', 'LangChain'],
    gradientBg: 'from-purple-600 via-fuchsia-600 to-pink-600',
    modules: [
      {
        id: 'ai-m1',
        title: 'Module 1: Gemini API SDK & Prompt Engineering',
        description: 'Understand zero-shot, few-shot prompting, structured JSON schema output, and system instructions.',
        lessons: [
          {
            id: 'ai-m1-l1',
            title: '1.1 Structured JSON Output with Gemini SDK in TypeScript',
            duration: '30 mins',
            summary: 'Force Gemini models to generate strict JSON formats for automated data processing.',
            codeSnippet: {
              language: 'typescript',
              starterCode: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateStudyNotes(topic: string) {
  // TODO: Call gemini-2.5-flash with structured prompt
}`,
              solutionCode: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateStudyNotes(topic: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Generate 3 bullet points summary for \${topic} in clean JSON format.\`,
    config: { responseMimeType: 'application/json' }
  });
  return JSON.parse(response.text || '{}');
}`,
              instructions: 'Use the Gemini SDK to request structured JSON response.'
            },
            quiz: [
              {
                id: 'q-ai-1',
                question: 'Which configuration parameter instructs Gemini to return clean JSON?',
                options: ['format: "json"', 'responseMimeType: "application/json"', 'dataType: "object"', 'jsonMode: true'],
                correctAnswer: 1,
                explanation: 'responseMimeType: "application/json" instructs the Gemini API to enforce structured JSON output.'
              }
            ]
          }
        ]
      },
      {
        id: 'ai-m2',
        title: 'Module 2: RAG Architecture & Vector Search',
        description: 'Chunk documents, generate vector embeddings, store in Pinecone/Chroma, and query for contextual QA.',
        lessons: [
          {
            id: 'ai-m2-l1',
            title: '2.1 Document Chunking & Text Embeddings',
            duration: '45 mins',
            summary: 'Learn semantic chunking strategies for long PDFs and textbook documents.',
            codeSnippet: {
              language: 'python',
              starterCode: `# Python RAG Chunking
def chunk_text(text, chunk_size=500, overlap=50):
    # TODO: Implement overlapping sliding window text chunks
    return []`,
              solutionCode: `def chunk_text(text, chunk_size=500, overlap=50):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += (chunk_size - overlap)
    return chunks`,
              instructions: 'Implement overlapping text chunking algorithm for RAG indexing.'
            }
          }
        ]
      }
    ],
    capstoneProject: {
      title: 'Autonomous AI Study Assistant with RAG & Citation',
      description: 'Build a full-stack web app that accepts uploaded PDF textbooks, indexes them into a vector database, and answers user questions with exact page references.',
      deliverables: [
        'Document processor with vector embedding generation',
        'Gemini API powered conversational agent',
        'Source citations and page highlighting UI'
      ]
    }
  },
  {
    id: 'course-backend-401',
    title: 'Production Backend & Cloud Systems Architecture',
    slug: 'backend-cloud-systems',
    category: 'Backend & Cloud',
    badge: 'POPULAR',
    description: 'Architect scalable backend systems. Master REST & GraphQL APIs, PostgreSQL query optimization, Redis caching, Docker containerization, and AWS/Cloud Run deployment.',
    instructor: {
      name: 'Elena Rostova',
      role: 'Principal Cloud Architect & DevOps Lead',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    level: 'Intermediate',
    durationHours: 38,
    totalModules: 5,
    rating: 4.93,
    enrolledStudentsCount: 11200,
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'System Design'],
    gradientBg: 'from-emerald-600 via-teal-600 to-cyan-700',
    modules: [
      {
        id: 'back-m1',
        title: 'Module 1: PostgreSQL Schema Design & Indexing Optimization',
        description: 'B-tree vs Hash indexes, foreign keys, constraints, multi-table JOINs, and EXPLAIN ANALYZE tuning.',
        lessons: [
          {
            id: 'back-m1-l1',
            title: '1.1 High-Performance Database Indexing & Query Plans',
            duration: '35 mins',
            summary: 'Eliminate full table scans by creating optimal composite indexes on frequently queried columns.',
            codeSnippet: {
              language: 'sql',
              starterCode: `-- Exercise: Create composite index for student search by university and major
-- SELECT * FROM students WHERE university = 'Stanford' AND major = 'CS' ORDER BY gpa DESC;

-- TODO: Write optimal CREATE INDEX statement`,
              solutionCode: `CREATE INDEX idx_students_uni_major_gpa 
ON students (university, major, gpa DESC);`,
              instructions: 'Write a composite PostgreSQL index matching equality filtering and sorting order.'
            }
          }
        ]
      }
    ],
    capstoneProject: {
      title: 'High-Throughput Microservice with Redis Cache',
      description: 'Develop a resilient REST microservice capable of serving 10,000 requests/sec with Redis caching layer and PostgreSQL fallback.',
      deliverables: [
        'Node.js/Express server with rate limiting and JWT auth',
        'Redis cache invalidation strategy for write operations',
        'Docker Compose setup with Postgres and Redis containers'
      ]
    }
  },
  {
    id: 'course-mobile-501',
    title: 'Cross-Platform Mobile Apps with React Native & Expo',
    slug: 'react-native-expo',
    category: 'Mobile Dev',
    badge: 'HOT',
    description: 'Build native iOS and Android apps using React Native, Expo, Native Wind (Tailwind), React Navigation, and Firebase backend integration.',
    instructor: {
      name: 'David Kim',
      role: 'Lead Mobile Developer & Open Source Contributor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    level: 'Beginner',
    durationHours: 32,
    totalModules: 4,
    rating: 4.91,
    enrolledStudentsCount: 7800,
    tags: ['React Native', 'Expo', 'iOS', 'Android', 'Mobile UI', 'AsyncStorage'],
    gradientBg: 'from-cyan-600 via-blue-600 to-indigo-700',
    modules: [
      {
        id: 'mob-m1',
        title: 'Module 1: React Native Layouts & FlatList Performance',
        description: 'Flexbox mobile layout rules, scroll optimization, and touch interactions.',
        lessons: [
          {
            id: 'mob-m1-l1',
            title: '1.1 High Performance FlatList Rendering',
            duration: '25 mins',
            summary: 'Avoid mobile lagging by using keyExtractor, getItemLayout, and memoized render items.',
            codeSnippet: {
              language: 'typescript',
              starterCode: `import React from 'react';
import { FlatList, Text, View } from 'react-native';

// TODO: Optimize list rendering for 1000 items`,
              solutionCode: `import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';

export function OptimizedList({ data }) {
  const renderItem = useCallback(({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
    </View>
  ), []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      initialNumToRender={15}
    />
  );
}`,
              instructions: 'Use memoized renderItem and FlatList performance props for smooth mobile rendering.'
            }
          }
        ]
      }
    ],
    capstoneProject: {
      title: 'Full Featured Fitness Tracker Mobile App',
      description: 'Publish a complete mobile application with step counter, workout loggers, dark theme, and offline storage.',
      deliverables: [
        'Multi-screen Expo app with bottom tab navigation',
        'Custom interactive charts and progress trackers',
        'App Store and Google Play deployment build configuration'
      ]
    }
  },
  {
    id: 'course-security-601',
    title: 'Ethical Hacking & Web Security Essentials',
    slug: 'ethical-hacking-web-security',
    category: 'Cybersecurity',
    badge: 'ESSENTIAL',
    description: 'Learn offensive and defensive security fundamentals. Protect web applications from SQL Injection, XSS, CSRF, JWT tampering, and broken authentication.',
    instructor: {
      name: 'Alex Vance',
      role: 'Certified Ethical Hacker (CEH) & Security Consultant',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    },
    level: 'Beginner',
    durationHours: 26,
    totalModules: 4,
    rating: 4.96,
    enrolledStudentsCount: 9650,
    tags: ['Cybersecurity', 'OWASP Top 10', 'XSS', 'SQLi', 'JWT', 'Penetration Testing'],
    gradientBg: 'from-slate-800 via-slate-900 to-black',
    modules: [
      {
        id: 'sec-m1',
        title: 'Module 1: OWASP Top 10 & Web Application Vulnerabilities',
        description: 'Understand SQL injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF).',
        lessons: [
          {
            id: 'sec-m1-l1',
            title: '1.1 Preventing XSS & Input Sanitization',
            duration: '30 mins',
            summary: 'Sanitize untrusted user inputs before rendering them on the web page.',
            codeSnippet: {
              language: 'javascript',
              starterCode: `// Vulnerable Code:
// element.innerHTML = userInput;

// TODO: Write sanitized HTML encoder function
function escapeHTML(str) {
  // Replace &, <, >, ", ' with safe entity codes
}`,
              solutionCode: `function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (match) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return map[match];
  });
}
console.log(escapeHTML('<script>alert("hack")</script>'));`,
              instructions: 'Write an HTML escaping function to prevent Cross-Site Scripting (XSS).'
            }
          }
        ]
      }
    ],
    capstoneProject: {
      title: 'Security Audit & Vulnerability Report',
      description: 'Audit a sample web application for OWASP vulnerabilities and write a formal remediation patch report.',
      deliverables: [
        'Vulnerability analysis report detailing security risks',
        'Secure code patches for authentication and input handling',
        'Hardened HTTP security headers configuration (CORS, CSP, HSTS)'
      ]
    }
  }
];
