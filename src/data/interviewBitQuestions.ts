export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  codeLanguage?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companyTags: string[];
  topicTags: string[];
}

export interface InterviewBitSubject {
  id: string;
  name: string;
  category: string;
  description: string;
  popularCompanies: string[];
  questionCount: number;
  questions: InterviewQuestion[];
}

export const INTERVIEWBIT_CATEGORIES = [
  'All Subjects',
  'Programming Languages',
  'Frameworks & Libraries',
  'CS Fundamentals',
  'Web Technologies',
  'Databases & Storage',
  'Cloud & DevOps',
  'Software Testing & QA',
  'AI, ML & Data Science',
  'Cybersecurity & Role Prep'
] as const;

const RAW_SUBJECTS: InterviewBitSubject[] = [
  // ==========================================
  // 1. PROGRAMMING LANGUAGES (30 Subjects)
  // ==========================================
  {
    id: 'java',
    name: 'Java',
    category: 'Programming Languages',
    description: 'Core Java, JVM internals, Multithreading, Memory Management, Collections Framework & Exception Handling.',
    popularCompanies: ['Google', 'Amazon', 'Oracle', 'Goldman Sachs', 'TCS'],
    questionCount: 15,
    questions: [
      {
        id: 'java-q1',
        question: 'What is the difference between HashMap and ConcurrentHashMap in Java?',
        answer: 'HashMap is non-thread-safe and permits null keys and null values. Under multi-threading, structural modifications can lead to infinite loops (prior to Java 8) or data corruption. ConcurrentHashMap is thread-safe and divides the map into segment locks or CAS (Compare-And-Swap) operations with synchronized node buckets (Java 8+). It does not allow null keys or null values.',
        codeSnippet: `// ConcurrentHashMap Thread-Safe Usage
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("key1", 100);
map.putIfAbsent("key2", 200);`,
        codeLanguage: 'java',
        difficulty: 'Medium',
        companyTags: ['Amazon', 'Oracle', 'Goldman Sachs'],
        topicTags: ['Collections', 'Concurrency', 'Multithreading']
      },
      {
        id: 'java-q2',
        question: 'Explain JVM Garbage Collection mechanisms and the generational hypothesis.',
        answer: 'The JVM heap is divided into Young Generation (Eden + Survivor spaces S0/S1) and Old (Tenured) Generation. Objects are initially allocated in Eden. Minor GC collects dead objects in Young Gen, moving survivors to S0/S1 and aging them. Objects surviving threshold GC cycles get promoted to Old Gen. Major/Full GC cleans Old Gen using algorithms like G1 GC or ZGC.',
        difficulty: 'Hard',
        companyTags: ['Google', 'Uber', 'Morgan Stanley'],
        topicTags: ['JVM', 'Garbage Collection', 'Memory Management']
      }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    description: 'Python 3 object model, GIL (Global Interpreter Lock), Decorators, Generators, Asyncio & Memory Management.',
    popularCompanies: ['Google', 'Meta', 'Netflix', 'Dropbox', 'Uber'],
    questionCount: 14,
    questions: [
      {
        id: 'python-q1',
        question: 'What is the Global Interpreter Lock (GIL) in Python and how does it affect multi-threading?',
        answer: 'The GIL is a mutex lock in CPython that allows only one native thread to execute Python bytecodes at a time. This prevents multithreaded Python code from utilizing multiple CPU cores for CPU-bound tasks. For I/O-bound tasks, GIL is released during socket/file operations. For CPU parallelism, multiprocessing or C-extensions are used.',
        codeSnippet: `import multiprocessing

def cpu_bound_task(n):
    return sum(i * i for i in range(n))

if __name__ == '__main__':
    with multiprocessing.Pool() as pool:
        results = pool.map(cpu_bound_task, [10**7, 10**7])`,
        codeLanguage: 'python',
        difficulty: 'Medium',
        companyTags: ['Google', 'Meta', 'Netflix'],
        topicTags: ['Concurrency', 'GIL', 'Multi-processing']
      }
    ]
  },
  {
    id: 'c',
    name: 'C Programming',
    category: 'Programming Languages',
    description: 'Pointers, Memory allocation (malloc/calloc/free), Memory Leaks, Structs, Bitwise operators & POSIX APIs.',
    popularCompanies: ['Microsoft', 'Intel', 'Qualcomm', 'NVIDIA', 'Cisco'],
    questionCount: 12,
    questions: [
      {
        id: 'c-q1',
        question: 'Explain the difference between malloc() and calloc() memory allocation functions in C.',
        answer: 'malloc(size_t size) allocates a contiguous block of memory of specified bytes and leaves memory uninitialized (containing garbage values). calloc(size_t num, size_t size) allocates memory for an array of elements and initializes every byte to zero, taking extra CPU cycles.',
        codeSnippet: `int *arr1 = (int*) malloc(5 * sizeof(int)); // Uninitialized
int *arr2 = (int*) calloc(5, sizeof(int));  // Zero-initialized
free(arr1);
free(arr2);`,
        codeLanguage: 'c',
        difficulty: 'Easy',
        companyTags: ['Intel', 'Qualcomm', 'Microsoft'],
        topicTags: ['Pointers', 'Memory Allocation']
      }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming Languages',
    description: 'C++11/14/17/20 STL, RAII, Smart Pointers, Vtables, Move Semantics, Templates & OOP Features.',
    popularCompanies: ['Google', 'NVIDIA', 'Meta', 'Adobe', 'Bloomberg'],
    questionCount: 16,
    questions: [
      {
        id: 'cpp-q1',
        question: 'How do virtual functions and Virtual Method Tables (Vtables) work in C++ polymorphism?',
        answer: 'When a class contains virtual functions, the compiler generates a hidden vtable containing pointers to virtual function implementations. Every object instance receives an implicit vptr pointing to its class vtable. Dynamic dispatch dereferences vptr at runtime to invoke the correct overridden function.',
        difficulty: 'Hard',
        companyTags: ['Google', 'NVIDIA', 'Adobe'],
        topicTags: ['OOP', 'Polymorphism', 'Vtable']
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming Languages',
    description: 'ES6+, Event Loop, Closures, Prototypal Inheritance, Promises, Async/Await & Engine Optimization.',
    popularCompanies: ['Meta', 'Uber', 'Amazon', 'Netflix', 'Flipkart'],
    questionCount: 18,
    questions: [
      {
        id: 'js-q1',
        question: 'Explain the JavaScript Event Loop, Microtask Queue, and Macrotask Queue execution order.',
        answer: 'JavaScript is single-threaded with a non-blocking event loop. Synchronous code executes first on the Call Stack. Promises, MutationObserver, and queueMicrotask callbacks go into the Microtask Queue. setTimeout, setInterval, and I/O callbacks go into the Macrotask Queue. After call stack clears, microtasks run until queue is empty before executing ONE macrotask.',
        codeSnippet: `console.log('1');
setTimeout(() => console.log('2'), 0); // Macrotask
Promise.resolve().then(() => console.log('3')); // Microtask
console.log('4');
// Output: 1 -> 4 -> 3 -> 2`,
        codeLanguage: 'javascript',
        difficulty: 'Medium',
        companyTags: ['Meta', 'Uber', 'Amazon'],
        topicTags: ['Event Loop', 'Async', 'Promises']
      }
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Programming Languages',
    description: 'Type Inference, Generics, Interfaces vs Types, Utility Types, Decorators & Compiler Configuration.',
    popularCompanies: ['Microsoft', 'Airbnb', 'Stripe', 'Meta', 'Vercel'],
    questionCount: 12,
    questions: [
      {
        id: 'ts-q1',
        question: 'What is the difference between Interface and Type alias in TypeScript?',
        answer: 'Interfaces support declaration merging (multiple declarations merge into one) and are designed for OOP contract extensions. Types can represent union types, intersection types, primitives, tuples, and mapped types. Types cannot be re-declared to merge.',
        difficulty: 'Easy',
        companyTags: ['Microsoft', 'Vercel', 'Stripe'],
        topicTags: ['Type System', 'Interfaces', 'Generics']
      }
    ]
  },
  {
    id: 'csharp',
    name: 'C# (.NET)',
    category: 'Programming Languages',
    description: 'CLR, Memory Management, Async/Await, LINQ, Delegates, Events & Garbage Collection.',
    popularCompanies: ['Microsoft', 'Accenture', 'TCS', 'Deloitte', 'Cognizant'],
    questionCount: 12,
    questions: [
      {
        id: 'csharp-q1',
        question: 'How does Task and async/await work under the hood in .NET CLR?',
        answer: 'The C# compiler converts an async method into a state machine struct implementing IAsyncStateMachine. When an awaited Task is incomplete, control yields to caller and continuation callback is hooked up. Upon task completion, execution resumes on the SynchronizationContext or thread pool.',
        difficulty: 'Medium',
        companyTags: ['Microsoft', 'Accenture'],
        topicTags: ['Async', 'CLR', 'Tasks']
      }
    ]
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    category: 'Programming Languages',
    description: 'Goroutines, Channels, Select, Memory Model, Garbage Collector & Interface Satisfaction.',
    popularCompanies: ['Google', 'Uber', 'Twitch', 'Cloudflare', 'Docker'],
    questionCount: 14,
    questions: [
      {
        id: 'go-q1',
        question: 'How do Goroutines differ from OS threads and how does Go scheduler (M:N) work?',
        answer: 'Goroutines are user-space threads managed by Go runtime, starting with ~2KB stack size (dynamically growing/shrinking), whereas OS threads take 1-2MB fixed stack. Go scheduler uses an M:N model mapping M goroutines onto N OS threads with work-stealing algorithms.',
        difficulty: 'Hard',
        companyTags: ['Google', 'Uber', 'Cloudflare'],
        topicTags: ['Goroutines', 'Scheduler', 'Concurrency']
      }
    ]
  },
  {
    id: 'rust',
    name: 'Rust',
    category: 'Programming Languages',
    description: 'Ownership, Borrow Checker, Lifetimes, Traits, Smart Pointers (Rc/Arc/RefCell) & Fearless Concurrency.',
    popularCompanies: ['Discord', 'AWS', 'Figma', 'Cloudflare', 'Mozilla'],
    questionCount: 10,
    questions: [
      {
        id: 'rust-q1',
        question: 'Explain Rust Ownership and Borrowing rules enforced at compile time.',
        answer: '1. Each value in Rust has an owner variable. 2. There can only be one owner at a time. 3. When owner goes out of scope, value is dropped. Borrowing allows either any number of immutable references (&T) OR exactly one mutable reference (&mut T) at a time, preventing data races.',
        difficulty: 'Medium',
        companyTags: ['Discord', 'Figma', 'AWS'],
        topicTags: ['Ownership', 'Borrowing', 'Memory Safety']
      }
    ]
  },
  { id: 'php', name: 'PHP', category: 'Programming Languages', description: 'PHP 8 JIT, OOP Features, PDO, Sessions, Composer & Security.', popularCompanies: ['Meta', 'Slack', 'Wikipedia', 'Automattic'], questionCount: 10, questions: [] },
  { id: 'ruby', name: 'Ruby', category: 'Programming Languages', description: 'Metaprogramming, Blocks, Procs, Lambdas, Mixins & Memory Footprint.', popularCompanies: ['Shopify', 'GitHub', 'Airbnb', 'Stripe'], questionCount: 10, questions: [] },
  { id: 'swift', name: 'Swift', category: 'Programming Languages', description: 'ARC (Automatic Reference Counting), Value vs Reference Types, Optionals & Protocols.', popularCompanies: ['Apple', 'Uber', 'Lyft', 'Airbnb'], questionCount: 12, questions: [] },
  { id: 'kotlin', name: 'Kotlin', category: 'Programming Languages', description: 'Null Safety, Coroutines, Data Classes, Extension Functions & Sealed Classes.', popularCompanies: ['Google', 'Uber', 'Netflix', 'Square'], questionCount: 12, questions: [] },
  { id: 'scala', name: 'Scala', category: 'Programming Languages', description: 'Functional Programming, Implicits, Case Classes, Monads & Akka Actors.', popularCompanies: ['Twitter', 'LinkedIn', 'Morgan Stanley'], questionCount: 10, questions: [] },
  { id: 'r', name: 'R Language', category: 'Programming Languages', description: 'Data Frames, Tidyverse, Vectors, Statistical Functions & Visualization.', popularCompanies: ['Uber', 'FDA', 'Google', 'Airbnb'], questionCount: 8, questions: [] },
  { id: 'perl', name: 'Perl', category: 'Programming Languages', description: 'Regex, References, Hashes, System Scripting & Legacy Automation.', popularCompanies: ['Amazon', 'Booking.com'], questionCount: 8, questions: [] },
  { id: 'shell', name: 'Shell Scripting (Bash)', category: 'Programming Languages', description: 'Grep, Awk, Sed, Pipes, Automation Scripts & Environment Execution.', popularCompanies: ['Red Hat', 'AWS', 'Google', 'IBM'], questionCount: 12, questions: [] },
  { id: 'sql-lang', name: 'SQL Language', category: 'Programming Languages', description: 'Joins, Subqueries, Window Functions, Indexing & Query Tuning.', popularCompanies: ['Google', 'Amazon', 'Meta', 'Uber', 'Microsoft'], questionCount: 20, questions: [] },
  { id: 'matlab', name: 'MATLAB', category: 'Programming Languages', description: 'Matrix operations, Signal processing, Simulink & Control Systems.', popularCompanies: ['MathWorks', 'ISRO', 'Tesla', 'Boeing'], questionCount: 8, questions: [] },
  { id: 'dart', name: 'Dart', category: 'Programming Languages', description: 'Isolates, Sound Null Safety, AOT/JIT Compilation & Flutter Engine integration.', popularCompanies: ['Google', 'BMW', 'Alibaba'], questionCount: 10, questions: [] },
  { id: 'objective-c', name: 'Objective-C', category: 'Programming Languages', description: 'Runtime, Messaging, Categories, ARC & iOS Legacy Integration.', popularCompanies: ['Apple', 'Uber'], questionCount: 8, questions: [] },
  { id: 'assembly', name: 'Assembly Language (x86 / ARM)', category: 'Programming Languages', description: 'Registers, Stack Frames, Interrupts, Instruction Pipelining & Reverse Engineering.', popularCompanies: ['Intel', 'ARM', 'Qualcomm', 'Apple'], questionCount: 10, questions: [] },
  { id: 'haskell', name: 'Haskell', category: 'Programming Languages', description: 'Monads, Lazy Evaluation, Pure Functions & Typeclass System.', popularCompanies: ['Facebook', 'Standard Chartered'], questionCount: 8, questions: [] },
  { id: 'elixir', name: 'Elixir', category: 'Programming Languages', description: 'BEAM VM, Processes, OTP, Pattern Matching & Fault Tolerance.', popularCompanies: ['Discord', 'Pinterest'], questionCount: 8, questions: [] },
  { id: 'clojure', name: 'Clojure', category: 'Programming Languages', description: 'Lisp Syntax, Immutable Data Structures, STM & JVM Interop.', popularCompanies: ['Walmart', 'NuBank'], questionCount: 8, questions: [] },
  { id: 'erlang', name: 'Erlang', category: 'Programming Languages', description: 'Actor Model, High Availability, Telecom Protocols & Soft Realtime.', popularCompanies: ['WhatsApp', 'Ericsson'], questionCount: 8, questions: [] },
  { id: 'lua', name: 'Lua', category: 'Programming Languages', description: 'Tables, Coroutines, C-API Embedding & Game Scripting.', popularCompanies: ['Roblox', 'Redis', 'Adobe'], questionCount: 8, questions: [] },
  { id: 'groovy', name: 'Groovy', category: 'Programming Languages', description: 'Jenkins Pipelines, AST Transformations, Dynamic Typing & Gradle.', popularCompanies: ['Netflix', 'LinkedIn'], questionCount: 8, questions: [] },
  { id: 'fsharp', name: 'F#', category: 'Programming Languages', description: 'Functional .NET, Discriminated Unions, Pattern Matching & Type Providers.', popularCompanies: ['Microsoft', 'Barclays'], questionCount: 8, questions: [] },
  { id: 'julia', name: 'Julia', category: 'Programming Languages', description: 'Multiple Dispatch, Scientific Computing, High Performance Arrays & Parallelism.', popularCompanies: ['Federal Reserve', 'MIT'], questionCount: 8, questions: [] },

  // ==========================================
  // 2. FRAMEWORKS & LIBRARIES (40 Subjects)
  // ==========================================
  {
    id: 'react',
    name: 'React.js',
    category: 'Frameworks & Libraries',
    description: 'Virtual DOM, Fiber Architecture, Custom Hooks, Context API, Concurrent Mode & Performance.',
    popularCompanies: ['Meta', 'Netflix', 'Airbnb', 'Uber', 'Vercel'],
    questionCount: 20,
    questions: [
      {
        id: 'react-q1',
        question: 'Explain React Fiber architecture and how Concurrent Rendering improves UI responsiveness.',
        answer: 'React Fiber is a complete rewrite of React reconciliation engine. It converts the tree reconciliation into a linked-list work unit structure. It enables breaking render work into small chunks, prioritizing user interactions (like typing or clicks) over background updates, and pausing/resuming rendering.',
        codeSnippet: `// Using useTransition for Non-blocking Concurrent Updates
const [isPending, startTransition] = useTransition();

const handleFilter = (query) => {
  startTransition(() => {
    setFilteredList(heavyFilter(query)); // Non-urgent update
  });
};`,
        codeLanguage: 'javascript',
        difficulty: 'Hard',
        companyTags: ['Meta', 'Vercel', 'Airbnb'],
        topicTags: ['Virtual DOM', 'Fiber', 'Concurrent React']
      }
    ]
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'Frameworks & Libraries',
    description: 'Dependency Injection, Change Detection Strategies (OnPush), RxJS Observables, Signals & Modules.',
    popularCompanies: ['Google', 'Microsoft', 'Morgan Stanley', 'IBM'],
    questionCount: 15,
    questions: [
      {
        id: 'angular-q1',
        question: 'What is the difference between Default and OnPush Change Detection strategy in Angular?',
        answer: 'Default Change Detection runs across the entire component tree on any asynchronous event (HTTP, user click, timer). OnPush Change Detection triggers check ONLY when component @Input reference changes, explicit event fires inside component, or Async pipe receives a emission.',
        difficulty: 'Medium',
        companyTags: ['Google', 'IBM'],
        topicTags: ['Change Detection', 'Performance']
      }
    ]
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'Frameworks & Libraries',
    description: 'Reactivity System (Proxy), Composition API, Pinia, Vue Router & Virtual DOM Diffing.',
    popularCompanies: ['GitLab', 'Alibaba', 'Adobe', 'Nintendo'],
    questionCount: 14,
    questions: [
      {
        id: 'vue-q1',
        question: 'How does Vue 3 Proxy-based reactivity system work compared to Vue 2 Object.defineProperty?',
        answer: 'Vue 2 used Object.defineProperty to hijack getters/setters, failing to detect property additions/deletions or array index mutations. Vue 3 uses ES6 Proxy to trap operations on target objects directly, allowing dynamic property addition, array index tracking, and better performance.',
        difficulty: 'Medium',
        companyTags: ['GitLab', 'Adobe'],
        topicTags: ['Reactivity', 'Proxy']
      }
    ]
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Frameworks & Libraries',
    description: 'Libuv, Event Loop Phases, Streams, Buffer, Worker Threads, Cluster Module & V8 Garbage Collector.',
    popularCompanies: ['Netflix', 'LinkedIn', 'Uber', 'PayPal', 'eBay'],
    questionCount: 18,
    questions: [
      {
        id: 'node-q1',
        question: 'Explain Libuv Event Loop phases in Node.js execution.',
        answer: 'Libuv event loop consists of 6 phases: 1. Timers (setTimeout/setInterval), 2. Pending Callbacks, 3. Idle/Prepare, 4. Poll (retrieving new I/O events), 5. Check (setImmediate), 6. Close Callbacks. Process.nextTick() microtasks execute immediately after the current phase operation ends.',
        difficulty: 'Hard',
        companyTags: ['Netflix', 'PayPal', 'Uber'],
        topicTags: ['Libuv', 'Event Loop', 'Async I/O']
      }
    ]
  },
  { id: 'express', name: 'Express.js', category: 'Frameworks & Libraries', description: 'Middleware pattern, Router, Error Handling, Compression & Security headers.', popularCompanies: ['Uber', 'Accenture', 'IBM'], questionCount: 12, questions: [] },
  { id: 'spring-boot', name: 'Spring Boot', category: 'Frameworks & Libraries', description: 'Auto-configuration, Spring Security, Actuator, JPA/Hibernate & REST Controllers.', popularCompanies: ['Amazon', 'JPMorgan', 'Oracle', 'Goldman Sachs'], questionCount: 18, questions: [] },
  { id: 'django', name: 'Django', category: 'Frameworks & Libraries', description: 'ORM, Middleware, Authentication, Signals, Class-Based Views & REST Framework.', popularCompanies: ['Instagram', 'Spotify', 'Pinterest'], questionCount: 15, questions: [] },
  { id: 'flask', name: 'Flask', category: 'Frameworks & Libraries', description: 'WSGI, Blueprints, Context Locals, Werkzeug & Lightweight Microservices.', popularCompanies: ['Netflix', 'Lyft', 'Reddit'], questionCount: 10, questions: [] },
  { id: 'aspnet-core', name: 'ASP.NET Core', category: 'Frameworks & Libraries', description: 'Dependency Injection, Kestrel Server, Middleware Pipeline, Entity Framework Core.', popularCompanies: ['Microsoft', 'Stack Overflow'], questionCount: 14, questions: [] },
  { id: 'laravel', name: 'Laravel', category: 'Frameworks & Libraries', description: 'Eloquent ORM, Service Container, Blade, Queues, Artisan & Middleware.', popularCompanies: ['Pfizer', 'BBC'], questionCount: 12, questions: [] },
  { id: 'rails', name: 'Ruby on Rails', category: 'Frameworks & Libraries', description: 'ActiveRecord, ActionCable, Asset Pipeline, Convention over Configuration.', popularCompanies: ['Shopify', 'GitHub', 'Airbnb'], questionCount: 12, questions: [] },
  { id: 'flutter', name: 'Flutter', category: 'Frameworks & Libraries', description: 'Skia/Impeller Engine, Widget Tree, State Management (Provider/Bloc/Riverpod), Channels.', popularCompanies: ['Google', 'BMW', 'eBay'], questionCount: 15, questions: [] },
  { id: 'react-native', name: 'React Native', category: 'Frameworks & Libraries', description: 'Hermes Engine, JSI (JavaScript Interface), Native Modules & Fabric Renderer.', popularCompanies: ['Meta', 'Shopify', 'Discord'], questionCount: 14, questions: [] },
  { id: 'nextjs', name: 'Next.js', category: 'Frameworks & Libraries', description: 'App Router, Server Components (RSC), SSR, SSG, ISR & API Routes.', popularCompanies: ['Vercel', 'TikTok', 'Twitch', 'Nike'], questionCount: 16, questions: [] },
  { id: 'nuxtjs', name: 'Nuxt.js', category: 'Frameworks & Libraries', description: 'Server-side rendering, Auto-imports, Modules, Nitro engine.', popularCompanies: ['Upwork', 'FedEx'], questionCount: 10, questions: [] },
  { id: 'svelte', name: 'Svelte / SvelteKit', category: 'Frameworks & Libraries', description: 'No Virtual DOM, Compiler architecture, Reactive declarations & Stores.', popularCompanies: ['Apple', 'Spotify', 'NYTimes'], questionCount: 10, questions: [] },
  { id: 'bootstrap', name: 'Bootstrap', category: 'Frameworks & Libraries', description: 'Grid System, Flexbox utilities, Components & Responsive Breakpoints.', popularCompanies: ['IBM', 'Walmart'], questionCount: 10, questions: [] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frameworks & Libraries', description: 'Utility-first engine, JIT Compiler, Custom config & Arbitrary values.', popularCompanies: ['Vercel', 'OpenAI', 'GitHub'], questionCount: 12, questions: [] },
  { id: 'redux', name: 'Redux & Redux Toolkit', category: 'Frameworks & Libraries', description: 'Unidirectional data flow, Store, Reducers, Middleware (Thunk/Saga), RTK Query.', popularCompanies: ['Meta', 'DoorDash', 'Uber'], questionCount: 14, questions: [] },
  { id: 'jquery', name: 'jQuery', category: 'Frameworks & Libraries', description: 'DOM manipulation, AJAX, Event handling, Cross-browser compatibility.', popularCompanies: ['WordPress', 'Wikipedia'], questionCount: 8, questions: [] },
  { id: 'hibernate', name: 'Hibernate ORM', category: 'Frameworks & Libraries', description: 'N+1 Problem, L1/L2 Caching, Dirty Checking, HQL & Inheritance Mapping.', popularCompanies: ['Amazon', 'Barclays'], questionCount: 14, questions: [] },
  { id: 'jpa', name: 'JPA (Java Persistence API)', category: 'Frameworks & Libraries', description: 'Entity Lifecycle, EntityManager, JPQL, Criteria API & Transactions.', popularCompanies: ['Oracle', 'JPMorgan'], questionCount: 12, questions: [] },
  { id: 'spring-framework', name: 'Spring Framework', category: 'Frameworks & Libraries', description: 'IoC Container, Bean Scope, AOP (Aspect-Oriented), Annotations.', popularCompanies: ['Amazon', 'Capital One'], questionCount: 15, questions: [] },
  { id: 'fastapi', name: 'FastAPI', category: 'Frameworks & Libraries', description: 'Pydantic validation, Asyncio, OpenAPI generation & Dependency Injection.', popularCompanies: ['Microsoft', 'Uber'], questionCount: 12, questions: [] },
  { id: 'pandas', name: 'Pandas', category: 'Frameworks & Libraries', description: 'Series, DataFrame, Indexing, GroupBy, Merging & Data Wrangling.', popularCompanies: ['Google', 'Goldman Sachs'], questionCount: 15, questions: [] },
  { id: 'numpy', name: 'NumPy', category: 'Frameworks & Libraries', description: 'NDArray, Broadcasting, Vectorization, Linear Algebra & Memory Layout.', popularCompanies: ['Google', 'Meta'], questionCount: 12, questions: [] },
  { id: 'scikit-learn', name: 'Scikit-Learn', category: 'Frameworks & Libraries', description: 'Pipelines, Estimator API, Model Selection, Cross-Validation & Metrics.', popularCompanies: ['Spotify', 'Booking.com'], questionCount: 14, questions: [] },
  { id: 'tensorflow', name: 'TensorFlow', category: 'Frameworks & Libraries', description: 'Computation Graphs, Tensors, Keras API, Distributed Training & TF Serving.', popularCompanies: ['Google', 'Uber', 'Twitter'], questionCount: 14, questions: [] },
  { id: 'pytorch', name: 'PyTorch', category: 'Frameworks & Libraries', description: 'Dynamic Computation Graphs (Autograd), Tensors, DataLoader & TorchScript.', popularCompanies: ['Meta', 'OpenAI', 'Tesla'], questionCount: 15, questions: [] },
  { id: 'keras', name: 'Keras', category: 'Frameworks & Libraries', description: 'Sequential/Functional API, Custom Layers, Callbacks & Transfer Learning.', popularCompanies: ['Google', 'Ford'], questionCount: 10, questions: [] },
  { id: 'opencv', name: 'OpenCV', category: 'Frameworks & Libraries', description: 'Image filtering, Edge detection, Feature matching, Contours & Deep Learning.', popularCompanies: ['Tesla', 'Intel', 'Samsara'], questionCount: 10, questions: [] },
  { id: 'pyspark', name: 'PySpark / Apache Spark', category: 'Frameworks & Libraries', description: 'RDDs, DataFrames, Spark SQL, Broadcast Variables, Shuffle & Lazy Evaluation.', popularCompanies: ['Amazon', 'Netflix', 'Uber'], questionCount: 15, questions: [] },
  { id: 'graphql', name: 'GraphQL', category: 'Frameworks & Libraries', description: 'Schema Definition, Resolvers, N+1 problem (DataLoader), Mutations & Subscriptions.', popularCompanies: ['GitHub', 'Meta', 'Shopify'], questionCount: 14, questions: [] },
  { id: 'grpc', name: 'gRPC & Protocol Buffers', category: 'Frameworks & Libraries', description: 'HTTP/2 multiplexing, Proto3 schemas, Streaming RPCs & Performance comparison.', popularCompanies: ['Google', 'Netflix', 'Square'], questionCount: 12, questions: [] },
  { id: 'rxjs', name: 'RxJS', category: 'Frameworks & Libraries', description: 'Observables, Subjects, Operators (map, switchMap, mergeMap), Schedulers.', popularCompanies: ['Google', 'Netflix'], questionCount: 12, questions: [] },
  { id: 'electron', name: 'Electron.js', category: 'Frameworks & Libraries', description: 'Main vs Renderer Process, IPC Communication, Security & Auto-updater.', popularCompanies: ['Slack', 'Microsoft (VS Code)', 'Figma'], questionCount: 10, questions: [] },
  { id: 'nestjs', name: 'NestJS', category: 'Frameworks & Libraries', description: 'Modular architecture, Decorators, Dependency Injection, Microservices & Guards.', popularCompanies: ['Adidas', 'Decathlon'], questionCount: 12, questions: [] },
  { id: 'prisma', name: 'Prisma ORM', category: 'Frameworks & Libraries', description: 'Prisma Schema, Client generation, Migrations & Relation Queries.', popularCompanies: ['Vercel', 'Linear'], questionCount: 10, questions: [] },
  { id: 'drizzle', name: 'Drizzle ORM', category: 'Frameworks & Libraries', description: 'Type-safe SQL queries, Migrations, Prepared statements & Zero overhead.', popularCompanies: ['Supabase', 'Vercel'], questionCount: 8, questions: [] },
  { id: 'mybatis', name: 'MyBatis', category: 'Frameworks & Libraries', description: 'SQL Mapping, Dynamic SQL, Cache configuration & Spring Integration.', popularCompanies: ['Alibaba', 'Baidu'], questionCount: 10, questions: [] },

  // ==========================================
  // 3. CS FUNDAMENTALS & CORE (30 Subjects)
  // ==========================================
  {
    id: 'dsa',
    name: 'Data Structures',
    category: 'CS Fundamentals',
    description: 'Arrays, Linked Lists, Stacks, Queues, Trees, Binary Search Trees, Heaps, Hash Tables & Graphs.',
    popularCompanies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple'],
    questionCount: 25,
    questions: [
      {
        id: 'dsa-q1',
        question: 'How do you implement an LRU (Least Recently Used) Cache with O(1) get and put operations?',
        answer: 'Combine a Doubly Linked List with a Hash Map. The Hash Map stores key-node pairs for O(1) lookup. The Doubly Linked List maintains node usage order. When accessed or updated, move node to list head. When capacity exceeds, remove node from tail.',
        codeSnippet: `class Node { int key, val; Node prev, next; }
class LRUCache {
    private Map<Integer, Node> map = new HashMap<>();
    // Doubly linked list head and tail sentinels
}`,
        codeLanguage: 'java',
        difficulty: 'Hard',
        companyTags: ['Google', 'Amazon', 'Meta'],
        topicTags: ['Hash Table', 'Doubly Linked List', 'Cache Design']
      }
    ]
  },
  {
    id: 'algo',
    name: 'Algorithms',
    category: 'CS Fundamentals',
    description: 'Sorting, Searching, Dynamic Programming, Greedy Algorithms, Backtracking, Divide & Conquer, Graph Traversals.',
    popularCompanies: ['Google', 'Meta', 'Microsoft', 'Uber'],
    questionCount: 25,
    questions: [
      {
        id: 'algo-q1',
        question: 'Explain Dijkstra algorithm for shortest path in weighted graph and its time complexity with Min-Heap.',
        answer: 'Dijkstra maintains a priority queue of unvisited nodes with tentative distances. At each step, it extracts the node with minimum distance, relaxes its neighbor edges, and updates distances. Time complexity with Binary Min-Heap is O((V + E) log V).',
        difficulty: 'Medium',
        companyTags: ['Google', 'Uber', 'Amazon'],
        topicTags: ['Graphs', 'Dijkstra', 'Priority Queue']
      }
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems (OS)',
    category: 'CS Fundamentals',
    description: 'Process Synchronization, Mutex/Semaphore, Deadlocks, Virtual Memory, Paging, CPU Scheduling Algorithms.',
    popularCompanies: ['Microsoft', 'Google', 'Qualcomm', 'Intel', 'Samsung'],
    questionCount: 20,
    questions: [
      {
        id: 'os-q1',
        question: 'What are the 4 necessary conditions for a Deadlock to occur in an Operating System?',
        answer: '1. Mutual Exclusion: At least one resource must be held in non-shareable mode. 2. Hold and Wait: Process holding a resource is waiting for additional resources. 3. No Preemption: Resource can only be released voluntarily by process. 4. Circular Wait: A closed chain of processes exists where each waits for resource held by next.',
        difficulty: 'Medium',
        companyTags: ['Microsoft', 'Intel', 'Qualcomm'],
        topicTags: ['Deadlock', 'Process Management']
      }
    ]
  },
  {
    id: 'dbms',
    name: 'Database Management Systems (DBMS)',
    category: 'CS Fundamentals',
    description: 'ACID Properties, Normalization (1NF-5NF), Indexing (B-Trees/B+Trees), Transaction Isolation Levels & Locking.',
    popularCompanies: ['Oracle', 'Amazon', 'Microsoft', 'Uber', 'Salesforce'],
    questionCount: 20,
    questions: [
      {
        id: 'dbms-q1',
        question: 'Explain ACID properties in Database Systems with real-world concurrency examples.',
        answer: 'Atomicity: All operations in a transaction complete or none do (Rollback on failure). Consistency: Database transitions from one valid state to another. Isolation: Concurrent transactions do not interfere (Dirty Reads, Non-repeatable reads prevented). Durability: Committed transactions persist permanently.',
        difficulty: 'Medium',
        companyTags: ['Oracle', 'Amazon', 'Salesforce'],
        topicTags: ['ACID', 'Transactions']
      }
    ]
  },
  {
    id: 'cn',
    name: 'Computer Networks (CN)',
    category: 'CS Fundamentals',
    description: 'OSI 7-Layer Model, TCP/IP Stack, TCP 3-Way Handshake, DNS Resolution, HTTP/HTTPS, Subnetting & Socket Programming.',
    popularCompanies: ['Cisco', 'Google', 'Cloudflare', 'AWS', 'Akamai'],
    questionCount: 18,
    questions: [
      {
        id: 'cn-q1',
        question: 'Explain the TCP 3-Way Handshake and 4-Way Teardown connection lifecycle.',
        answer: 'Handshake: 1. Client sends SYN (Sequence x). 2. Server responds SYN-ACK (Sequence y, ACK x+1). 3. Client sends ACK (Sequence x+1, ACK y+1). Teardown: 1. Initiator sends FIN. 2. Receiver sends ACK. 3. Receiver sends FIN. 4. Initiator responds ACK and enters TIME_WAIT.',
        difficulty: 'Medium',
        companyTags: ['Cisco', 'Cloudflare', 'AWS'],
        topicTags: ['TCP/IP', 'Handshake', 'Networking']
      }
    ]
  },
  {
    id: 'system-design',
    name: 'System Design (HLD & LLD)',
    category: 'CS Fundamentals',
    description: 'Scalability, Load Balancers, Distributed Caching, Message Queues, Rate Limiters, Sharding & CAP Theorem.',
    popularCompanies: ['Google', 'Meta', 'Amazon', 'Uber', 'Netflix'],
    questionCount: 22,
    questions: [
      {
        id: 'sd-q1',
        question: 'How do you design a scalable Rate Limiter supporting 1 Million requests per second?',
        answer: 'Use Token Bucket or Leaky Bucket algorithm implemented via Redis cluster with Lua scripts (for atomic increment). The bucket refills tokens at constant rate. Requests consume 1 token. If tokens available, request proceeds; otherwise HTTP 429 Too Many Requests.',
        difficulty: 'Hard',
        companyTags: ['Google', 'Uber', 'Meta'],
        topicTags: ['System Design', 'Rate Limiter', 'Redis']
      }
    ]
  },
  { id: 'oops', name: 'Object-Oriented Programming (OOPs)', category: 'CS Fundamentals', description: 'Abstraction, Encapsulation, Inheritance, Polymorphism, Association, Composition & Aggregation.', popularCompanies: ['Microsoft', 'Amazon', 'Goldman Sachs'], questionCount: 16, questions: [] },
  { id: 'compiler-design', name: 'Compiler Design', category: 'CS Fundamentals', description: 'Lexical Analysis, Parsing (LL/LR), AST, Intermediate Code Generation & Optimization.', popularCompanies: ['Intel', 'NVIDIA', 'Apple'], questionCount: 10, questions: [] },
  { id: 'software-engineering', name: 'Software Engineering', category: 'CS Fundamentals', description: 'SDLC Models, Requirements Analysis, UML Diagrams, Software Metrics & Maintenance.', popularCompanies: ['TCS', 'Infosys', 'Accenture'], questionCount: 12, questions: [] },
  { id: 'toc', name: 'Theory of Computation (TOC)', category: 'CS Fundamentals', description: 'DFA, NFA, Regular Expressions, Context-Free Grammars, Turing Machines & Decidability.', popularCompanies: ['Google', 'Microsoft', 'Academia'], questionCount: 10, questions: [] },
  { id: 'digital-logic', name: 'Digital Logic & Architecture', category: 'CS Fundamentals', description: 'Boolean Algebra, Logic Gates, Flip-Flops, Combinational/Sequential Circuits, K-Maps.', popularCompanies: ['Qualcomm', 'Intel', 'AMD'], questionCount: 10, questions: [] },
  { id: 'microprocessors', name: 'Microprocessors & Interfacing', category: 'CS Fundamentals', description: '8085/8086 Architecture, Bus Timing, Interrupts, Memory Interfacing & Assembly.', popularCompanies: ['Intel', 'Texas Instruments'], questionCount: 10, questions: [] },
  { id: 'design-patterns', name: 'Design Patterns (GoF)', category: 'CS Fundamentals', description: 'Creational (Singleton, Factory), Structural (Adapter, Decorator), Behavioral (Observer, Strategy).', popularCompanies: ['Amazon', 'Google', 'Meta'], questionCount: 16, questions: [] },
  { id: 'solid-principles', name: 'SOLID Principles & Clean Code', category: 'CS Fundamentals', description: 'Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.', popularCompanies: ['Microsoft', 'ThoughtWorks'], questionCount: 14, questions: [] },
  { id: 'distributed-systems', name: 'Distributed Systems', category: 'CS Fundamentals', description: 'Consensus (Raft/Paxos), Vector Clocks, Eventual Consistency, Leader Election & Split Brain.', popularCompanies: ['Google', 'AWS', 'Cockroach Labs'], questionCount: 16, questions: [] },
  { id: 'information-theory', name: 'Information Theory', category: 'CS Fundamentals', description: 'Entropy, Huffman Coding, Channel Capacity & Error Correcting Codes.', popularCompanies: ['Qualcomm', 'Bell Labs'], questionCount: 8, questions: [] },
  { id: 'graph-theory', name: 'Graph Theory', category: 'CS Fundamentals', description: 'Eulerian/Hamiltonian paths, Planar graphs, Graph Coloring, Network Flow & Matching.', popularCompanies: ['Google', 'Meta'], questionCount: 12, questions: [] },
  { id: 'discrete-math', name: 'Discrete Mathematics', category: 'CS Fundamentals', description: 'Set Theory, Relations, Functions, Propositional Logic, Combinatorics & Induction.', popularCompanies: ['Microsoft', 'Google'], questionCount: 12, questions: [] },
  { id: 'computer-graphics', name: 'Computer Graphics', category: 'CS Fundamentals', description: 'Rasterization, Ray Tracing, Shaders, 3D Transformations & Rendering Pipeline.', popularCompanies: ['NVIDIA', 'Pixar', 'Epic Games'], questionCount: 10, questions: [] },
  { id: 'crypto-fund', name: 'Cryptography & Security Fundamentals', category: 'CS Fundamentals', description: 'Symmetric/Asymmetric Encryption, Hashing (SHA-256), Digital Signatures & PKI.', popularCompanies: ['Cloudflare', 'Palantir'], questionCount: 14, questions: [] },
  { id: 'microservices-arch', name: 'Microservices Architecture', category: 'CS Fundamentals', description: 'Saga Pattern, Circuit Breaker, API Gateway, Event-driven architecture & CQRS.', popularCompanies: ['Netflix', 'Uber', 'Amazon'], questionCount: 18, questions: [] },
  { id: 'concurrency-core', name: 'Concurrency & Multithreading', category: 'CS Fundamentals', description: 'Race conditions, Memory Barriers, Atomic variables, Threadpools & Livelocks.', popularCompanies: ['Oracle', 'Goldman Sachs'], questionCount: 16, questions: [] },
  { id: 'memory-mgmt', name: 'Memory Management & GC', category: 'CS Fundamentals', description: 'Stack vs Heap, Page Faults, Memory Fragmentation, Pointer Safety & Leak detection.', popularCompanies: ['Microsoft', 'Intel'], questionCount: 14, questions: [] },
  { id: 'agile-scrum', name: 'Agile & Software Lifecycle', category: 'CS Fundamentals', description: 'Scrum ceremonies, Kanban, User Stories, Sprint Velocity & Estimation.', popularCompanies: ['Atlassian', 'ThoughtWorks'], questionCount: 10, questions: [] },
  { id: 'code-refactoring', name: 'Code Refactoring & Testing', category: 'CS Fundamentals', description: 'Code Smells, Technical Debt, Automated Testing Strategies & CI integration.', popularCompanies: ['Google', 'Shopify'], questionCount: 10, questions: [] },
  { id: 'functional-programming', name: 'Functional Programming Principles', category: 'CS Fundamentals', description: 'Immutability, Pure Functions, Higher-Order Functions, Currying & Composition.', popularCompanies: ['Twitter', 'Netflix'], questionCount: 12, questions: [] },
  { id: 'unix-internals', name: 'UNIX / Linux Internals', category: 'CS Fundamentals', description: 'System Calls, Inodes, File Descriptors, Pipes, Fork/Exec & Signals.', popularCompanies: ['Red Hat', 'Canonical', 'Google'], questionCount: 14, questions: [] },
  { id: 'computer-org', name: 'Computer Organization', category: 'CS Fundamentals', description: 'ALU, Cache Hierarchy (L1/L2/L3), Pipelining Hazards, RISC vs CISC.', popularCompanies: ['ARM', 'Intel', 'AMD'], questionCount: 12, questions: [] },
  { id: 'parallel-computing', name: 'Parallel Computing', category: 'CS Fundamentals', description: 'OpenMP, MPI, GPU CUDA programming, Amdahl Law & Flynn Taxonomy.', popularCompanies: ['NVIDIA', 'Cray', 'Argonne National Lab'], questionCount: 10, questions: [] },
  { id: 'quantum-computing', name: 'Quantum Computing Basics', category: 'CS Fundamentals', description: 'Qubits, Superposition, Entanglement, Quantum Logic Gates & Shor Algorithm.', popularCompanies: ['IBM', 'Google Quantum AI'], questionCount: 8, questions: [] },

  // ==========================================
  // 4. WEB TECHNOLOGIES (25 Subjects)
  // ==========================================
  {
    id: 'html5',
    name: 'HTML & HTML5',
    category: 'Web Technologies',
    description: 'Semantic Elements, Canvas API, Web Storage, Forms validation, Media tags & DOM structure.',
    popularCompanies: ['Google', 'Meta', 'Amazon'],
    questionCount: 12,
    questions: [
      {
        id: 'html-q1',
        question: 'What is the importance of HTML5 Semantic elements like <header>, <article>, and <section>?',
        answer: 'Semantic elements clearly describe their meaning to both browser and developer. They improve Web Accessibility (screen readers), SEO indexing by search engine crawlers, and code maintainability compared to non-semantic generic <div> tags.',
        difficulty: 'Easy',
        companyTags: ['Google', 'Meta'],
        topicTags: ['Semantic HTML', 'SEO', 'Accessibility']
      }
    ]
  },
  {
    id: 'css3',
    name: 'CSS & CSS3',
    category: 'Web Technologies',
    description: 'Box Model, Flexbox, Grid, Specificity, Animations, Media Queries & CSS Custom Properties.',
    popularCompanies: ['Meta', 'Apple', 'Airbnb', 'Spotify'],
    questionCount: 14,
    questions: [
      {
        id: 'css-q1',
        question: 'How is CSS specificity calculated for selector conflicts?',
        answer: 'CSS Specificity is calculated as a 4-part tuple (Inline styles, IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements). Inline style = 1000, ID selector = 100, Class/Attribute = 10, Element = 1. !important overrides normal specificity calculations.',
        difficulty: 'Medium',
        companyTags: ['Meta', 'Airbnb'],
        topicTags: ['CSS Specificity', 'Styles']
      }
    ]
  },
  { id: 'web-perf', name: 'Web Performance Optimization', category: 'Web Technologies', description: 'Core Web Vitals (LCP, FID/INP, CLS), Code Splitting, Lazy Loading, Image Compression & Bundlers.', popularCompanies: ['Google', 'Netflix', 'Amazon', 'Vercel'], questionCount: 15, questions: [] },
  { id: 'web-sec', name: 'Web Security & OWASP Top 10', category: 'Web Technologies', description: 'XSS (Cross-Site Scripting), CSRF, SQL Injection, Content Security Policy (CSP) & HTTPS.', popularCompanies: ['Cloudflare', 'Meta', 'Google', 'Stripe'], questionCount: 16, questions: [] },
  { id: 'rest-api', name: 'RESTful API Design', category: 'Web Technologies', description: 'HTTP Verbs, Status Codes, Idempotency, HATEOAS, API Versioning & Rate Limits.', popularCompanies: ['Stripe', 'Twilio', 'Uber'], questionCount: 15, questions: [] },
  { id: 'websockets', name: 'WebSockets & Real-Time', category: 'Web Technologies', description: 'Full-duplex TCP socket, Connection Upgrade Header, Heartbeats & Scaling Socket Servers.', popularCompanies: ['Slack', 'Discord', 'Binance'], questionCount: 12, questions: [] },
  { id: 'pwa', name: 'Progressive Web Apps (PWA)', category: 'Web Technologies', description: 'Service Workers, Web App Manifest, Cache Storage API, Background Sync & Push Notifications.', popularCompanies: ['Twitter', 'Uber', 'Flipkart'], questionCount: 12, questions: [] },
  { id: 'cors-csp', name: 'CORS & CSP Security', category: 'Web Technologies', description: 'Cross-Origin Resource Sharing, Preflight OPTIONS requests, Same-Origin Policy & Headers.', popularCompanies: ['Google', 'AWS', 'Stripe'], questionCount: 12, questions: [] },
  { id: 'auth-jwt', name: 'OAuth 2.0 & JWT Authentication', category: 'Web Technologies', description: 'Authorization Code Grant, Access/Refresh Tokens, JWT Structure (Header, Payload, Signature).', popularCompanies: ['Okta', 'Auth0', 'Google', 'Meta'], questionCount: 16, questions: [] },
  { id: 'spa-arch', name: 'Single Page Applications (SPA)', category: 'Web Technologies', description: 'Client-side Routing, History API, State Hydration & Memory Leak Cleanup.', popularCompanies: ['Meta', 'Netflix'], questionCount: 10, questions: [] },
  { id: 'ssr-ssg', name: 'SSR vs SSG vs ISR', category: 'Web Technologies', description: 'Server-Side Rendering, Static Site Generation, Incremental Static Regeneration & Hydration.', popularCompanies: ['Vercel', 'Gatsby', 'Shopify'], questionCount: 14, questions: [] },
  { id: 'cdn-arch', name: 'Content Delivery Networks (CDN)', category: 'Web Technologies', description: 'Edge Caching, Origin Shield, Cache Invalidation Strategies & Anycast Routing.', popularCompanies: ['Cloudflare', 'Akamai', 'Fastly'], questionCount: 12, questions: [] },
  { id: 'http-protocols', name: 'HTTP/1.1, HTTP/2 & HTTP/3', category: 'Web Technologies', description: 'Multiplexing, Head-of-line Blocking, Server Push, QUIC Protocol over UDP.', popularCompanies: ['Google', 'Cloudflare'], questionCount: 14, questions: [] },
  { id: 'micro-frontends', name: 'Micro-Frontends Architecture', category: 'Web Technologies', description: 'Module Federation, Web Components, Runtime vs Build-time Integration.', popularCompanies: ['Spotify', 'IKEA', 'SAP'], questionCount: 12, questions: [] },
  { id: 'browser-storage', name: 'Browser Storage Technologies', category: 'Web Technologies', description: 'LocalStorage, SessionStorage, IndexedDB, Cookies (SameSite, HttpOnly, Secure).', popularCompanies: ['Meta', 'Google'], questionCount: 10, questions: [] },
  { id: 'a11y', name: 'Web Accessibility (a11y / WCAG)', category: 'Web Technologies', description: 'ARIA Roles, Keyboard Navigation, Focus Trapping, Screen Reader compatibility.', popularCompanies: ['Microsoft', 'Apple', 'Google'], questionCount: 10, questions: [] },
  { id: 'web-workers', name: 'Web Workers & Service Workers', category: 'Web Technologies', description: 'Off-main-thread JavaScript execution, Message Passing, Cache interceptors.', popularCompanies: ['Figma', 'Google'], questionCount: 12, questions: [] },
  { id: 'wasm', name: 'WebAssembly (Wasm)', category: 'Web Technologies', description: 'Wasm Linear Memory, C++/Rust Compilation to Browser, Performance Benchmarks.', popularCompanies: ['Figma', 'Adobe', 'Autodesk'], questionCount: 10, questions: [] },
  { id: 'webrtc', name: 'WebRTC (Real-Time Communication)', category: 'Web Technologies', description: 'ICE Candidates, STUN/TURN Servers, SDP Exchange & Peer-to-Peer Data Channels.', popularCompanies: ['Zoom', 'Google Meet', 'Discord'], questionCount: 12, questions: [] },
  { id: 'webgl', name: 'WebGL & Three.js', category: 'Web Technologies', description: 'Shader GLSL, Vertex/Fragment Processing, 3D Mesh & Canvas Rendering.', popularCompanies: ['Apple', 'Canva', 'Sketchfab'], questionCount: 10, questions: [] },
  { id: 'api-gateway', name: 'API Gateway Patterns', category: 'Web Technologies', description: 'Request Routing, Rate Limiting, Authentication Offloading & Response Aggregation.', popularCompanies: ['AWS', 'Kong', 'Netflix'], questionCount: 12, questions: [] },
  { id: 'openapi-specs', name: 'OpenAPI & Swagger Specs', category: 'Web Technologies', description: 'Schema Definitions, API Documentation generation, Mocking & Client SDK generation.', popularCompanies: ['Postman', 'SmartBear'], questionCount: 10, questions: [] },
  { id: 'session-mgmt', name: 'Session Management & Security', category: 'Web Technologies', description: 'Sticky Sessions, Distributed Session Store (Redis), Session Hijacking defense.', popularCompanies: ['Amazon', 'PayPal'], questionCount: 12, questions: [] },
  { id: 'web-scrapers', name: 'Web Scrapers & Crawlers', category: 'Web Technologies', description: 'Puppeteer, Playwright, Headless Chrome, Anti-bot bypass & Rate limits.', popularCompanies: ['Bright Data', 'UiPath'], questionCount: 10, questions: [] },
  { id: 'seo-tech', name: 'Technical SEO for Developers', category: 'Web Technologies', description: 'Sitemaps, Robots.txt, Canonical URLs, Structured Data (JSON-LD) & OpenGraph tags.', popularCompanies: ['TripAdvisor', 'Yelp'], questionCount: 10, questions: [] },

  // ==========================================
  // 5. DATABASES & STORAGE (25 Subjects)
  // ==========================================
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Databases & Storage',
    description: 'MVCC, WAL (Write-Ahead Logging), B-Tree/GIN/GiST Indexes, JSONB & Query Execution Plans.',
    popularCompanies: ['Uber', 'Apple', 'Instagram', 'Spotify', 'Heroku'],
    questionCount: 18,
    questions: [
      {
        id: 'pg-q1',
        question: 'Explain PostgreSQL MVCC (Multi-Version Concurrency Control) and Tuple Visibility.',
        answer: 'MVCC allows concurrent reads and writes without locking. Instead of modifying data in-place, PostgreSQL creates a new tuple version with xmin (creating transaction ID) and xmax (deleting transaction ID). Readers only see tuples committed prior to their snapshot.',
        difficulty: 'Hard',
        companyTags: ['Uber', 'Instagram'],
        topicTags: ['MVCC', 'PostgreSQL', 'Transactions']
      }
    ]
  },
  { id: 'mysql', name: 'MySQL', category: 'Databases & Storage', description: 'InnoDB Storage Engine, B+Tree Indexing, Replication Topologies, Buffer Pool.', popularCompanies: ['Meta', 'Uber', 'Twitter', 'Booking.com'], questionCount: 18, questions: [] },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases & Storage', description: 'BSON Data Model, Aggregation Pipeline, Sharding, Replica Sets & WiredTiger Engine.', popularCompanies: ['eBay', 'Adobe', 'Verizon'], questionCount: 16, questions: [] },
  { id: 'redis', name: 'Redis', category: 'Databases & Storage', description: 'In-Memory Data Structures, Pub/Sub, Persistence (RDB/AOF), Redis Cluster & Sentinel.', popularCompanies: ['Twitter', 'GitHub', 'Snapchat', 'Stack Overflow'], questionCount: 18, questions: [] },
  { id: 'cassandra', name: 'Apache Cassandra', category: 'Databases & Storage', description: 'Wide-column store, Peer-to-peer Architecture, Consistent Hashing, Memtable/SSTable.', popularCompanies: ['Netflix', 'Apple', 'Uber'], questionCount: 15, questions: [] },
  { id: 'sqlite', name: 'SQLite', category: 'Databases & Storage', description: 'Serverless C-library DB, WAL mode, Single-file Storage & Mobile Database internals.', popularCompanies: ['Apple', 'Google', 'Airbus'], questionCount: 12, questions: [] },
  { id: 'dynamodb', name: 'Amazon DynamoDB', category: 'Databases & Storage', description: 'Partition Keys, Sort Keys, Global Secondary Indexes (GSI), DynamoDB Streams.', popularCompanies: ['Amazon', 'Lyft', 'Capital One'], questionCount: 15, questions: [] },
  { id: 'oracle-db', name: 'Oracle Database', category: 'Databases & Storage', description: 'PL/SQL, RAC (Real Application Clusters), Redo Logs, Tablespaces & Execution Tuning.', popularCompanies: ['Oracle', 'JPMorgan', 'AT&T'], questionCount: 15, questions: [] },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'Databases & Storage', description: 'Inverted Index, Lucene, Shards, Replicas, TF-IDF / BM25 Search & Mapping.', popularCompanies: ['Uber', 'eBay', 'Netflix'], questionCount: 16, questions: [] },
  { id: 'neo4j', name: 'Neo4j (Graph Database)', category: 'Databases & Storage', description: 'Labeled Property Graph, Cypher Query Language, Index-Free Adjacency.', popularCompanies: ['Walmart', 'eBay', 'NASA'], questionCount: 12, questions: [] },
  { id: 'firestore', name: 'Firebase Firestore', category: 'Databases & Storage', description: 'Document-Collection Model, Real-time Listeners, Indexes & Offline Sync.', popularCompanies: ['Google', 'New York Times'], questionCount: 12, questions: [] },
  { id: 'mariadb', name: 'MariaDB', category: 'Databases & Storage', description: 'Aria engine, ColumnStore, Galera Cluster & MySQL Compatibility.', popularCompanies: ['Wikipedia', 'Google', 'DBS Bank'], questionCount: 10, questions: [] },
  { id: 'mssql', name: 'Microsoft SQL Server', category: 'Databases & Storage', description: 'T-SQL, Execution Plans, Clustered vs Non-Clustered Indexes, AlwaysOn AG.', popularCompanies: ['Microsoft', 'Deloitte', 'Accenture'], questionCount: 14, questions: [] },
  { id: 'couchdb', name: 'CouchDB', category: 'Databases & Storage', description: 'Couch Replication Protocol, MapReduce Views, B-Tree Storage.', popularCompanies: ['npm', 'BBC'], questionCount: 8, questions: [] },
  { id: 'influxdb', name: 'InfluxDB (Time Series DB)', category: 'Databases & Storage', description: 'Time series retention policies, Flux engine, Downsampling & Continuous Queries.', popularCompanies: ['Tesla', 'Cisco'], questionCount: 10, questions: [] },
  { id: 'rocksdb', name: 'RocksDB', category: 'Databases & Storage', description: 'Embedded LSM-tree Key-Value Store, Write Amplification, Compaction filters.', popularCompanies: ['Meta', 'LinkedIn'], questionCount: 10, questions: [] },
  { id: 'memcached', name: 'Memcached', category: 'Databases & Storage', description: 'Slab Allocator, LRU eviction, Multithreaded Memory Cache.', popularCompanies: ['Meta', 'Twitter'], questionCount: 10, questions: [] },
  { id: 'vector-dbs', name: 'Vector Databases (Pinecone, Chroma)', category: 'Databases & Storage', description: 'HNSW Indexing, Cosine Similarity, High-Dimensional Vector Embeddings for AI.', popularCompanies: ['OpenAI', 'Notion', 'Midjourney'], questionCount: 14, questions: [] },
  { id: 'snowflake', name: 'Snowflake Data Cloud', category: 'Databases & Storage', description: 'Multi-cluster Shared Data Architecture, Micro-partitions, Virtual Warehouses.', popularCompanies: ['Snowflake', 'DoorDash'], questionCount: 14, questions: [] },
  { id: 'bigquery', name: 'Google BigQuery', category: 'Databases & Storage', description: 'Dremel Execution Engine, Columnar Storage (Capacitor), Slot Allocation.', popularCompanies: ['Google', 'Home Depot'], questionCount: 14, questions: [] },
  { id: 'hive', name: 'Apache Hive', category: 'Databases & Storage', description: 'HiveQL, Metastore, Partitioning, Bucketing & MapReduce Translation.', popularCompanies: ['Facebook', 'Yahoo'], questionCount: 10, questions: [] },
  { id: 'redshift', name: 'Amazon Redshift', category: 'Databases & Storage', description: 'MPP (Massively Parallel Processing), Columnar Storage, Distribution Styles.', popularCompanies: ['Amazon', 'Pinterest'], questionCount: 12, questions: [] },
  { id: 'clickhouse', name: 'ClickHouse', category: 'Databases & Storage', description: 'Column-oriented DBMS for OLAP, MergeTree Engine, Vectorized Execution.', popularCompanies: ['Cloudflare', 'Spotify'], questionCount: 12, questions: [] },
  { id: 'cockroachdb', name: 'CockroachDB', category: 'Databases & Storage', description: 'Distributed SQL, Raft Consensus, Distributed Transactions (Serializable).', popularCompanies: ['DoorDash', 'Comcast'], questionCount: 12, questions: [] },
  { id: 'scylladb', name: 'ScyllaDB', category: 'Databases & Storage', description: 'C++ rewrite of Cassandra, Shared-nothing Async Engine, Ultra-low Latency.', popularCompanies: ['Comcast', 'Palo Alto Networks'], questionCount: 10, questions: [] },

  // ==========================================
  // 6. CLOUD & DEVOPS (30 Subjects)
  // ==========================================
  {
    id: 'docker',
    name: 'Docker & Containers',
    category: 'Cloud & DevOps',
    description: 'Container Isolation (Cgroups/Namespaces), Dockerfile best practices, Multi-stage builds & OverlayFS.',
    popularCompanies: ['Google', 'AWS', 'Docker', 'Netflix', 'Uber'],
    questionCount: 18,
    questions: [
      {
        id: 'docker-q1',
        question: 'How do Linux Namespaces and Control Groups (cgroups) enable Docker container isolation?',
        answer: 'Namespaces isolate system resources per container (PID namespace for process IDs, NET for network interfaces, MNT for filesystems, IPC/UTS). Control Groups (cgroups) limit and meter hardware resource consumption (CPU cores, RAM limits, I/O bandwidth).',
        difficulty: 'Medium',
        companyTags: ['Google', 'AWS', 'Docker'],
        topicTags: ['Docker', 'Linux', 'Containerization']
      }
    ]
  },
  { id: 'kubernetes', name: 'Kubernetes (K8s)', category: 'Cloud & DevOps', description: 'Pods, Deployments, Services, Ingress, Control Plane (etcd, API Server), CNI, CSI.', popularCompanies: ['Google', 'Microsoft', 'Red Hat', 'AWS'], questionCount: 20, questions: [] },
  { id: 'aws', name: 'Amazon Web Services (AWS)', category: 'Cloud & DevOps', description: 'EC2, S3, IAM, VPC, Lambda, ECS, CloudFront, Route53 & Well-Architected Framework.', popularCompanies: ['Amazon', 'Netflix', 'Airbnb'], questionCount: 20, questions: [] },
  { id: 'azure', name: 'Microsoft Azure', category: 'Cloud & DevOps', description: 'Azure VMs, App Services, Blob Storage, Azure AD, AKS & Resource Manager.', popularCompanies: ['Microsoft', 'GE', 'FedEx'], questionCount: 16, questions: [] },
  { id: 'gcp', name: 'Google Cloud Platform (GCP)', category: 'Cloud & DevOps', description: 'GKE, Compute Engine, Cloud Storage, Cloud Run, Pub/Sub & IAM.', popularCompanies: ['Google', 'PayPal', 'Spotify'], questionCount: 16, questions: [] },
  { id: 'git', name: 'Git & Version Control', category: 'Cloud & DevOps', description: 'Git Object Model (Blobs, Trees, Commits), Rebase vs Merge, Cherry-pick, Bisect.', popularCompanies: ['GitHub', 'GitLab', 'Atlassian'], questionCount: 16, questions: [] },
  { id: 'github-actions', name: 'GitHub Actions', category: 'Cloud & DevOps', description: 'Workflows, Jobs, Steps, Custom Actions, Runners, Secrets & Matrix Builds.', popularCompanies: ['GitHub', 'Vercel'], questionCount: 12, questions: [] },
  { id: 'jenkins', name: 'Jenkins & CI/CD', category: 'Cloud & DevOps', description: 'Declarative vs Scripted Pipelines, Shared Libraries, Master/Agent Nodes.', popularCompanies: ['IBM', 'Oracle', 'Intel'], questionCount: 14, questions: [] },
  { id: 'linux-sys', name: 'Linux Commands & Admin', category: 'Cloud & DevOps', description: 'Permissions (chmod/chown), Systemd, Network tools (netstat/dig/curl), LVM.', popularCompanies: ['Red Hat', 'AWS', 'Google'], questionCount: 18, questions: [] },
  { id: 'terraform', name: 'Terraform (IaC)', category: 'Cloud & DevOps', description: 'HCL, State Management, Plan/Apply Workflow, Modules, Providers & Locks.', popularCompanies: ['HashiCorp', 'Uber', 'Datadog'], questionCount: 16, questions: [] },
  { id: 'ansible', name: 'Ansible', category: 'Cloud & DevOps', description: 'Playbooks, Roles, Inventory, Modules, Idempotency & Agentless Execution.', popularCompanies: ['Red Hat', 'Cisco'], questionCount: 12, questions: [] },
  { id: 'kafka', name: 'Apache Kafka', category: 'Cloud & DevOps', description: 'Topics, Partitions, Consumer Groups, Log Retention, Zero-Copy Architecture.', popularCompanies: ['LinkedIn', 'Uber', 'Airbnb'], questionCount: 18, questions: [] },
  { id: 'nginx', name: 'Nginx', category: 'Cloud & DevOps', description: 'Reverse Proxy, Load Balancing Algorithms, SSL Termination, Worker Processes.', popularCompanies: ['Nginx', 'Cloudflare', 'Netflix'], questionCount: 14, questions: [] },
  { id: 'haproxy', name: 'HAProxy & Load Balancing', category: 'Cloud & DevOps', description: 'Layer 4 vs Layer 7 Load Balancing, Health Checks, Sticky Sessions.', popularCompanies: ['Vimeo', 'GitHub'], questionCount: 10, questions: [] },
  { id: 'prometheus', name: 'Prometheus & Grafana', category: 'Cloud & DevOps', description: 'PromQL, Metric Types (Counter, Gauge, Histogram), Exporters, Alertmanager.', popularCompanies: ['SoundCloud', 'Uber'], questionCount: 14, questions: [] },
  { id: 'elk-stack', name: 'ELK Stack', category: 'Cloud & DevOps', description: 'Elasticsearch, Logstash Pipelines, Beats & Kibana Dashboard Visualization.', popularCompanies: ['Netflix', 'eBay'], questionCount: 12, questions: [] },
  { id: 'rabbitmq', name: 'RabbitMQ', category: 'Cloud & DevOps', description: 'Exchanges (Direct, Fanout, Topic), Queues, AMQP Protocol, Dead Letter Exchange.', popularCompanies: ['Reddit', 'Slack'], questionCount: 12, questions: [] },
  { id: 'hashicorp-vault', name: 'HashiCorp Vault', category: 'Cloud & DevOps', description: 'Secret Engines, Dynamic Secrets, Token Renewal, Encryption as a Service.', popularCompanies: ['HashiCorp', 'Adobe'], questionCount: 10, questions: [] },
  { id: 'cloudflare', name: 'Cloudflare & Edge', category: 'Cloud & DevOps', description: 'Cloudflare Workers, DDoS Protection, DNS Anycast, Argo Smart Routing.', popularCompanies: ['Cloudflare', 'Discord'], questionCount: 12, questions: [] },
  { id: 'serverless', name: 'Serverless (AWS Lambda)', category: 'Cloud & DevOps', description: 'Cold Starts, Execution Limits, Event Sources, Concurrency Limits & Provisioned.', popularCompanies: ['Amazon', 'iRobot'], questionCount: 14, questions: [] },
  { id: 'istio', name: 'Istio & Service Mesh', category: 'Cloud & DevOps', description: 'Envoy Sidecar Proxy, Mutual TLS (mTLS), Traffic Shifting, Canary Deployments.', popularCompanies: ['Google', 'IBM'], questionCount: 12, questions: [] },
  { id: 'gitlab-ci', name: 'GitLab CI/CD', category: 'Cloud & DevOps', description: '.gitlab-ci.yml pipelines, Runners, Artifacts, Environments & Auto DevOps.', popularCompanies: ['GitLab', 'Goldman Sachs'], questionCount: 10, questions: [] },
  { id: 'argocd', name: 'ArgoCD & GitOps', category: 'Cloud & DevOps', description: 'Declarative GitOps, Sync Status, Helm Chart deployment, Rollouts.', popularCompanies: ['Intuit', 'Red Hat'], questionCount: 12, questions: [] },
  { id: 'linux-kernel', name: 'Linux Kernel Tuning', category: 'Cloud & DevOps', description: 'Sysctl configurations, TCP Window scaling, File descriptor limits, epoll.', popularCompanies: ['Cloudflare', 'Meta'], questionCount: 10, questions: [] },
  { id: 'virtualization', name: 'Virtualization & Hypervisors', category: 'Cloud & DevOps', description: 'Type-1 vs Type-2 Hypervisors, KVM, QEMU, SR-IOV & Paravirtualization.', popularCompanies: ['VMware', 'AWS (Nitro)'], questionCount: 10, questions: [] },
  { id: 'puppet', name: 'Puppet', category: 'Cloud & DevOps', description: 'Puppet Manifests, Facter, Hiera, Agent/Master Architecture.', popularCompanies: ['Puppet', 'Dell'], questionCount: 8, questions: [] },
  { id: 'chef', name: 'Chef', category: 'Cloud & DevOps', description: 'Cookbooks, Recipes, Chef Server, Knife CLI & Ruby Domain Specific Language.', popularCompanies: ['Facebook', 'Target'], questionCount: 8, questions: [] },
  { id: 'circleci', name: 'CircleCI', category: 'Cloud & DevOps', description: 'CircleCI Orbs, Config v2.1, Caching Strategies, Parallel Workflows.', popularCompanies: ['Spotify', 'Ford'], questionCount: 8, questions: [] },
  { id: 'datadog', name: 'Datadog', category: 'Cloud & DevOps', description: 'APM Tracing, Synthetics, Agent Architecture, Log Management & Monitors.', popularCompanies: ['Datadog', 'Peloton'], questionCount: 10, questions: [] },
  { id: 'splunk', name: 'Splunk', category: 'Cloud & DevOps', description: 'SPL (Search Processing Language), Indexers, Forwarders, Heavy Forwarders.', popularCompanies: ['Cisco', 'Coca-Cola'], questionCount: 10, questions: [] },

  // ==========================================
  // 7. SOFTWARE TESTING & QA (20 Subjects)
  // ==========================================
  {
    id: 'selenium',
    name: 'Selenium WebDriver',
    category: 'Software Testing & QA',
    description: 'Locators (XPath, CSS), Explicit/Implicit Waits, Page Object Model (POM) & Grid.',
    popularCompanies: ['ThoughtWorks', 'Cognizant', 'TCS', 'Infosys'],
    questionCount: 15,
    questions: [
      {
        id: 'sel-q1',
        question: 'What is the difference between Implicit Wait, Explicit Wait, and Fluent Wait in Selenium?',
        answer: 'Implicit Wait sets a global timeout for the WebDriver to poll for element presence. Explicit Wait halts execution until a specific ExpectedCondition (e.g., elementToBeClickable) is satisfied. Fluent Wait allows configuring maximum wait time, polling frequency, and ignoring specific exceptions.',
        difficulty: 'Medium',
        companyTags: ['Cognizant', 'ThoughtWorks'],
        topicTags: ['Selenium', 'Automation Testing']
      }
    ]
  },
  { id: 'junit', name: 'JUnit 5', category: 'Software Testing & QA', description: 'Annotations (@Test, @BeforeEach, @ParameterizedTest), Assertions, Dynamic Tests & Extensions.', popularCompanies: ['Amazon', 'Oracle'], questionCount: 12, questions: [] },
  { id: 'jest', name: 'Jest', category: 'Software Testing & QA', description: 'Mocks, Spies, Snapshot Testing, Async Testing, Coverage Reports & Timers.', popularCompanies: ['Meta', 'Twitter', 'Airbnb'], questionCount: 14, questions: [] },
  { id: 'cypress', name: 'Cypress', category: 'Software Testing & QA', description: 'Time-travel debugging, Network Intercepts, Custom Commands & Flaky Test mitigation.', popularCompanies: ['Disney', 'Slack'], questionCount: 12, questions: [] },
  { id: 'pytest', name: 'PyTest', category: 'Software Testing & QA', description: 'Fixtures, Parametrization, Markers, Plugins & Assert Statement Rewriting.', popularCompanies: ['Dropbox', 'Mozilla'], questionCount: 12, questions: [] },
  { id: 'manual-testing', name: 'Manual Testing & QA', category: 'Software Testing & QA', description: 'Test Case Design, Boundary Value Analysis, Equivalence Partitioning, Bug Lifecycle.', popularCompanies: ['Wipro', 'TCS', 'Accenture'], questionCount: 15, questions: [] },
  { id: 'auto-testing-concepts', name: 'Automation Testing Frameworks', category: 'Software Testing & QA', description: 'Data-driven, Keyword-driven, Hybrid & Page Object Model Frameworks.', popularCompanies: ['Cognizant', 'Capgemini'], questionCount: 12, questions: [] },
  { id: 'jmeter', name: 'JMeter & Load Testing', category: 'Software Testing & QA', description: 'Thread Groups, Samplers, Listeners, Ramp-up Time & Throughput Benchmarks.', popularCompanies: ['Walmart', 'Wells Fargo'], questionCount: 12, questions: [] },
  { id: 'postman-qa', name: 'Postman & API Automation', category: 'Software Testing & QA', description: 'Collections, Environment Variables, Newman CLI, Tests Scripting in JS.', popularCompanies: ['Postman', 'Paytm'], questionCount: 12, questions: [] },
  { id: 'cucumber', name: 'Cucumber & BDD', category: 'Software Testing & QA', description: 'Gherkin Syntax (Given/When/Then), Step Definitions, Scenario Outlines & Feature Files.', popularCompanies: ['Barclays', 'HSBC'], questionCount: 12, questions: [] },
  { id: 'mockito', name: 'Mockito', category: 'Software Testing & QA', description: 'Mock vs Spy, ArgumentMatchers, verify(), doWhen() vs when().', popularCompanies: ['Amazon', 'JPMorgan'], questionCount: 10, questions: [] },
  { id: 'testng', name: 'TestNG', category: 'Software Testing & QA', description: 'TestNG XML, Priority, Grouping, Parallel Execution & DataProviders.', popularCompanies: ['Infosys', 'HCL'], questionCount: 10, questions: [] },
  { id: 'appium', name: 'Appium Mobile Testing', category: 'Software Testing & QA', description: 'Mobile Automation Architecture, Desired Capabilities, Inspecting Elements.', popularCompanies: ['Uber', 'Swiggy'], questionCount: 10, questions: [] },
  { id: 'playwright', name: 'Playwright', category: 'Software Testing & QA', description: 'Multi-browser automation, Auto-waiting, Network mocking & Trace Viewer.', popularCompanies: ['Microsoft', 'Vercel'], questionCount: 12, questions: [] },
  { id: 'sec-testing', name: 'Security Testing (SAST/DAST)', category: 'Software Testing & QA', description: 'SonarQube, OWASP ZAP, Vulnerability Scanning & Static Code Analysis.', popularCompanies: ['Palo Alto Networks', 'Rapid7'], questionCount: 10, questions: [] },
  { id: 'tdd', name: 'Test Driven Development (TDD)', category: 'Software Testing & QA', description: 'Red-Green-Refactor Cycle, Unit Test Granularity & Code Coverage metrics.', popularCompanies: ['ThoughtWorks', 'Pivotal'], questionCount: 10, questions: [] },
  { id: 'bdd', name: 'Behavior Driven Development (BDD)', category: 'Software Testing & QA', description: 'Living Documentation, Ubiquitous Language & Stakeholder Alignment.', popularCompanies: ['Capital One', 'Lloyds'], questionCount: 8, questions: [] },
  { id: 'chaos-testing', name: 'Chaos Engineering', category: 'Software Testing & QA', description: 'Chaos Monkey, Gremlin, Injecting Network Latency & Fault Resilience.', popularCompanies: ['Netflix', 'Uber'], questionCount: 8, questions: [] },
  { id: 'regression-testing', name: 'Regression Testing Strategies', category: 'Software Testing & QA', description: 'Test Suite Minimization, Impact Analysis & Smoke vs Sanity Testing.', popularCompanies: ['SAP', 'Adobe'], questionCount: 8, questions: [] },
  { id: 'a11y-testing', name: 'Accessibility Testing Tools', category: 'Software Testing & QA', description: 'Axe Core, WAVE, Screen Readers (NVDA/JAWS) & WCAG Compliance.', popularCompanies: ['Google', 'Microsoft'], questionCount: 8, questions: [] },

  // ==========================================
  // 8. AI, ML & DATA SCIENCE (25 Subjects)
  // ==========================================
  {
    id: 'ml-fund',
    name: 'Machine Learning Fundamentals',
    category: 'AI, ML & Data Science',
    description: 'Supervised vs Unsupervised, Overfitting/Underfitting, Bias-Variance Tradeoff, Evaluation Metrics.',
    popularCompanies: ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft'],
    questionCount: 20,
    questions: [
      {
        id: 'ml-q1',
        question: 'Explain the Bias-Variance Tradeoff and how it relates to model capacity.',
        answer: 'High Bias (Underfitting) happens when model is too simple to capture patterns, leading to high training and testing error. High Variance (Overfitting) occurs when model learns noise in training data, performing well on training but poorly on test data. Optimal model balances bias and variance to minimize total generalization error.',
        difficulty: 'Medium',
        companyTags: ['Google', 'Meta', 'Apple'],
        topicTags: ['Bias-Variance', 'Overfitting', 'ML Concepts']
      }
    ]
  },
  { id: 'dl-fund', name: 'Deep Learning & Neural Networks', category: 'AI, ML & Data Science', description: 'Backpropagation, Activation Functions (ReLU/Softmax), Optimizers (Adam/SGD), CNNs, RNNs.', popularCompanies: ['Meta', 'Google Brain', 'NVIDIA'], questionCount: 18, questions: [] },
  { id: 'nlp', name: 'Natural Language Processing (NLP)', category: 'AI, ML & Data Science', description: 'Tokenization, Word Embeddings (Word2Vec), Attention Mechanism, Transformers (BERT/GPT).', popularCompanies: ['OpenAI', 'Google', 'Meta', 'Microsoft'], questionCount: 18, questions: [] },
  { id: 'computer-vision', name: 'Computer Vision', category: 'AI, ML & Data Science', description: 'Convolutional Layers, Object Detection (YOLO), Image Segmentation (U-Net), GANs.', popularCompanies: ['Tesla', 'NVIDIA', 'Apple'], questionCount: 16, questions: [] },
  { id: 'data-science-core', name: 'Data Science Fundamentals', category: 'AI, ML & Data Science', description: 'Data Cleaning, Exploratory Data Analysis (EDA), Hypothesis Testing, A/B Testing.', popularCompanies: ['Meta', 'Uber', 'Airbnb'], questionCount: 18, questions: [] },
  { id: 'data-eng-pipe', name: 'Data Engineering Pipelines', category: 'AI, ML & Data Science', description: 'Batch vs Streaming, ETL/ELT, Data Lakehouses, Schema Evolution & Lineage.', popularCompanies: ['Databricks', 'Snowflake', 'Amazon'], questionCount: 16, questions: [] },
  { id: 'power-bi', name: 'Power BI', category: 'AI, ML & Data Science', description: 'DAX Expressions, Power Query, Data Modeling (Star/Snowflake Schema) & Dashboards.', popularCompanies: ['Microsoft', 'KPMG', 'EY', 'PwC'], questionCount: 14, questions: [] },
  { id: 'tableau', name: 'Tableau', category: 'AI, ML & Data Science', description: 'Calculated Fields, LOD Expressions, Parameter Controls & Interactive Dashboards.', popularCompanies: ['Salesforce', 'Deloitte', 'Bank of America'], questionCount: 12, questions: [] },
  { id: 'excel-vba', name: 'Advanced Excel & VBA', category: 'AI, ML & Data Science', description: 'XLOOKUP, Pivot Tables, Index/Match, Array Formulas & Macro Automation.', popularCompanies: ['Goldman Sachs', 'McKinsey', 'JP Morgan'], questionCount: 14, questions: [] },
  { id: 'etl-warehousing', name: 'Data Warehousing & ETL', category: 'AI, ML & Data Science', description: 'Kimball Methodology, Dimensional Modeling, Slowly Changing Dimensions (SCD).', popularCompanies: ['Amazon', 'Walmart'], questionCount: 14, questions: [] },
  { id: 'hadoop', name: 'Apache Hadoop', category: 'AI, ML & Data Science', description: 'HDFS, MapReduce, YARN, NameNode/DataNode Architecture & High Availability.', popularCompanies: ['Cloudera', 'Yahoo'], questionCount: 12, questions: [] },
  { id: 'spark-ds', name: 'Apache Spark Architecture', category: 'AI, ML & Data Science', description: 'Catalyst Optimizer, Tungsten Engine, DAG Scheduler & Memory Management.', popularCompanies: ['Databricks', 'Netflix'], questionCount: 16, questions: [] },
  { id: 'feature-eng', name: 'Feature Engineering & Selection', category: 'AI, ML & Data Science', description: 'One-Hot Encoding, Target Encoding, PCA Dimensionality Reduction & Scaling.', popularCompanies: ['Meta', 'Uber'], questionCount: 12, questions: [] },
  { id: 'mlops', name: 'MLOps & Model Deployment', category: 'AI, ML & Data Science', description: 'MLflow, Kubeflow, Model Drift Monitoring, Feature Stores (Feast) & CI/CD for ML.', popularCompanies: ['Uber (Michelangelo)', 'DoorDash'], questionCount: 15, questions: [] },
  { id: 'llms', name: 'Large Language Models (LLMs)', category: 'AI, ML & Data Science', description: 'Transformer Architecture, Quantization (GGUF/GPTQ), LoRA/QLoRA Fine-tuning.', popularCompanies: ['OpenAI', 'Anthropic', 'Google', 'Meta'], questionCount: 18, questions: [] },
  { id: 'prompt-eng', name: 'Generative AI & Prompt Engineering', category: 'AI, ML & Data Science', description: 'Few-Shot Prompting, Chain-of-Thought (CoT), System Instructions & Hallucination Defense.', popularCompanies: ['OpenAI', 'Microsoft'], questionCount: 14, questions: [] },
  { id: 'rag', name: 'Retrieval-Augmented Generation (RAG)', category: 'AI, ML & Data Science', description: 'Document Chunking, Vector Embeddings, Hybrid Search (BM25 + Dense) & Re-ranking.', popularCompanies: ['Perplexity', 'Notion', 'Cohere'], questionCount: 16, questions: [] },
  { id: 'rl', name: 'Reinforcement Learning', category: 'AI, ML & Data Science', description: 'Markov Decision Processes (MDP), Q-Learning, Policy Gradients & RLHF in LLMs.', popularCompanies: ['DeepMind', 'OpenAI'], questionCount: 12, questions: [] },
  { id: 'time-series', name: 'Time Series Analysis', category: 'AI, ML & Data Science', description: 'ARIMA, Prophet, Stationarity, Autocorrelation (ACF/PACF) & Exponential Smoothing.', popularCompanies: ['Uber', 'Bloomberg'], questionCount: 12, questions: [] },
  { id: 'recommender-sys', name: 'Recommender Systems', category: 'AI, ML & Data Science', description: 'Collaborative Filtering, Matrix Factorization, Content-Based & Two-Stage Ranking.', popularCompanies: ['Netflix', 'YouTube', 'Amazon'], questionCount: 14, questions: [] },
  { id: 'airflow', name: 'Apache Airflow', category: 'AI, ML & Data Science', description: 'DAGs, Operators, Sensors, XComs, Celery Executor & Backfilling.', popularCompanies: ['Airbnb', 'Astronomer'], questionCount: 12, questions: [] },
  { id: 'dbt', name: 'dbt (Data Build Tool)', category: 'AI, ML & Data Science', description: 'Modular SQL transformations, Jinja Templating, Testing & Lineage documentation.', popularCompanies: ['dbt Labs', 'JetBlue'], questionCount: 10, questions: [] },
  { id: 'flink', name: 'Apache Flink', category: 'AI, ML & Data Science', description: 'Event-time Processing, Watermarks, Stateful Stream Processing & Checkpointing.', popularCompanies: ['Alibaba', 'Uber'], questionCount: 12, questions: [] },
  { id: 'nifi', name: 'Apache NiFi', category: 'AI, ML & Data Science', description: 'Dataflow programming, FlowFiles, Processors & Data Provenance.', popularCompanies: ['NSA', 'Government'], questionCount: 8, questions: [] },
  { id: 'stats-prob', name: 'Statistics & Probability', category: 'AI, ML & Data Science', description: 'Bayes Theorem, Central Limit Theorem, Probability Distributions, Confidence Intervals.', popularCompanies: ['Google', 'Meta', 'Jane Street'], questionCount: 16, questions: [] },

  // ==========================================
  // 9. CYBERSECURITY & ROLE PREP (31 Subjects)
  // ==========================================
  {
    id: 'ethical-hacking',
    name: 'Ethical Hacking & PenTesting',
    category: 'Cybersecurity & Role Prep',
    description: 'Reconnaissance, Vulnerability Scanning, Exploitation Frameworks, Post-Exploitation & Reporting.',
    popularCompanies: ['CrowdStrike', 'Palo Alto Networks', 'FireEye'],
    questionCount: 15,
    questions: [
      {
        id: 'sec-q1',
        question: 'What is the difference between Red Team and Blue Team in cybersecurity operations?',
        answer: 'Red Team acts as simulated adversaries attempting to breach security defenses using real-world attack vectors. Blue Team acts as internal defenders monitoring, detecting, responding to, and neutralizing attacks in real-time.',
        difficulty: 'Medium',
        companyTags: ['CrowdStrike', 'Palo Alto Networks'],
        topicTags: ['Red Team', 'Blue Team', 'Security']
      }
    ]
  },
  { id: 'network-sec', name: 'Network Security & Firewalls', category: 'Cybersecurity & Role Prep', description: 'IDS/IPS, Next-Gen Firewalls, VPNs (IPsec/OpenVPN), DMZ Architecture & Zero Trust.', popularCompanies: ['Cisco', 'Fortinet', 'Check Point'], questionCount: 14, questions: [] },
  { id: 'crypto-standards', name: 'Cryptography Standards', category: 'Cybersecurity & Role Prep', description: 'AES-256, RSA Key Exchange, Elliptic Curve Cryptography (ECC), Diffie-Hellman & TLS 1.3.', popularCompanies: ['Cloudflare', 'Apple', 'Signal'], questionCount: 14, questions: [] },
  { id: 'ios-dev', name: 'iOS App Development', category: 'Cybersecurity & Role Prep', description: 'SwiftUI, Combine, CoreData, Xcode, App Lifecycle & Memory Management.', popularCompanies: ['Apple', 'Uber', 'Airbnb'], questionCount: 16, questions: [] },
  { id: 'android-dev', name: 'Android App Development', category: 'Cybersecurity & Role Prep', description: 'Jetpack Compose, Kotlin Coroutines, ViewModel, Room DB, WorkManager.', popularCompanies: ['Google', 'Samsung', 'Paytm'], questionCount: 16, questions: [] },
  { id: 'embedded-sys', name: 'Embedded Systems', category: 'Cybersecurity & Role Prep', description: 'RTOS, Interrupt Service Routines (ISR), Microcontrollers (STM32/ESP32), SPI/I2C/UART.', popularCompanies: ['Bosch', 'Qualcomm', 'Tesla'], questionCount: 12, questions: [] },
  { id: 'iot', name: 'Internet of Things (IoT)', category: 'Cybersecurity & Role Prep', description: 'MQTT Protocol, CoAP, Edge Gateways, Low-Power Mesh Networks & IoT Security.', popularCompanies: ['Samsung', 'GE', 'Philips'], questionCount: 10, questions: [] },
  { id: 'blockchain', name: 'Blockchain & Smart Contracts', category: 'Cybersecurity & Role Prep', description: 'Solidity, EVM (Ethereum Virtual Machine), Consensus Mechanisms (PoW/PoS), Gas Optimization.', popularCompanies: ['Coinbase', 'ConsenSys', 'Polygon'], questionCount: 14, questions: [] },
  { id: 'game-dev-unity', name: 'Game Development (Unity/C#)', category: 'Cybersecurity & Role Prep', description: 'MonoBehaviour Lifecycle, Game Loop, Physics Engine, Prefabs & NavMesh AI.', popularCompanies: ['Electronic Arts', 'Ubisoft', 'Unity'], questionCount: 12, questions: [] },
  { id: 'unreal-engine', name: 'Unreal Engine (C++)', category: 'Cybersecurity & Role Prep', description: 'AActor, UPROPERTY, Blueprints C++ Interop, Render Pipeline & Gameplay Framework.', popularCompanies: ['Epic Games', 'Riot Games'], questionCount: 12, questions: [] },
  { id: 'salesforce-dev', name: 'Salesforce Development', category: 'Cybersecurity & Role Prep', description: 'Apex, SOQL/SOSL, Lightning Web Components (LWC), Triggers & Process Builder.', popularCompanies: ['Salesforce', 'Accenture'], questionCount: 12, questions: [] },
  { id: 'sap-abap', name: 'SAP ABAP & Enterprise', category: 'Cybersecurity & Role Prep', description: 'SAP S/4HANA, BAPIs, IDOCs, OO-ABAP & Fiori App Development.', popularCompanies: ['SAP', 'Deloitte', 'Infosys'], questionCount: 10, questions: [] },
  { id: 'servicenow', name: 'ServiceNow Development', category: 'Cybersecurity & Role Prep', description: 'GlideRecord API, Business Rules, Client Scripts, Script Includes & Flow Designer.', popularCompanies: ['ServiceNow', 'Cognizant'], questionCount: 10, questions: [] },
  { id: 'lld-case-studies', name: 'Low Level Design (LLD) Cases', category: 'Cybersecurity & Role Prep', description: 'Design Parking Lot, Elevator System, Tic-Tac-Toe, Snake & Ladder, Movie Booking System.', popularCompanies: ['Amazon', 'Flipkart', 'Swiggy'], questionCount: 18, questions: [] },
  { id: 'hld-case-studies', name: 'High Level Design (HLD) Cases', category: 'Cybersecurity & Role Prep', description: 'Design WhatsApp, Uber, TinyURL, Netflix, Google Drive, Twitter Feed & Payment System.', popularCompanies: ['Google', 'Meta', 'Uber', 'Amazon'], questionCount: 20, questions: [] },
  { id: 'dist-caching', name: 'Distributed Caching Strategies', category: 'Cybersecurity & Role Prep', description: 'Cache-Aside, Write-Through, Write-Behind, Refresh-Ahead, Eviction Policies & Thundering Herd.', popularCompanies: ['Meta', 'Amazon', 'Twitter'], questionCount: 14, questions: [] },
  { id: 'db-sharding', name: 'Database Sharding & Partitioning', category: 'Cybersecurity & Role Prep', description: 'Horizontal Partitioning, Consistent Hashing Shard Keys, Resharding & Cross-Shard Joins.', popularCompanies: ['Google', 'Uber', 'Pinterest'], questionCount: 14, questions: [] },
  { id: 'rate-limiting', name: 'Rate Limiting Algorithms', category: 'Cybersecurity & Role Prep', description: 'Token Bucket, Leaky Bucket, Fixed Window Counter, Sliding Window Log & Sliding Window Counter.', popularCompanies: ['Stripe', 'Cloudflare', 'Twilio'], questionCount: 12, questions: [] },
  { id: 'behavioral-star', name: 'Behavioral & STAR Method', category: 'Cybersecurity & Role Prep', description: 'Leadership Principles, Conflict Resolution, Project Ownership, Failure Stories & STAR framework.', popularCompanies: ['Amazon', 'Google', 'Meta', 'Microsoft'], questionCount: 15, questions: [] },
  { id: 'engineering-mgmt', name: 'Software Engineering Leadership', category: 'Cybersecurity & Role Prep', description: 'Technical Roadmap Planning, Mentorship, Code Review Standards & SLA/SLO Management.', popularCompanies: ['Google', 'Meta', 'Stripe'], questionCount: 10, questions: [] },
  { id: 'prod-mgmt', name: 'Product Management Technicals', category: 'Cybersecurity & Role Prep', description: 'Product Requirements Document (PRD), Feature Prioritization (RICE), Technical Feasibility.', popularCompanies: ['Google', 'Meta', 'Uber'], questionCount: 10, questions: [] },
  { id: 'sre-prep', name: 'Site Reliability Engineering (SRE)', category: 'Cybersecurity & Role Prep', description: 'SLI, SLO, SLA, Error Budgets, Incident Command, Post-Mortems & Toil Reduction.', popularCompanies: ['Google', 'Meta', 'LinkedIn'], questionCount: 15, questions: [] },
  { id: 'frontend-arch', name: 'Frontend Architecture Track', category: 'Cybersecurity & Role Prep', description: 'Design System Architecture, State Hydration, Asset Optimization & Web Vitals.', popularCompanies: ['Meta', 'Vercel', 'Airbnb'], questionCount: 14, questions: [] },
  { id: 'backend-scalability', name: 'Backend Scalability Track', category: 'Cybersecurity & Role Prep', description: 'High Concurrency, Backpressure, Connection Pooling, Non-blocking I/O & Benchmarking.', popularCompanies: ['Amazon', 'Uber', 'Razorpay'], questionCount: 16, questions: [] },
  { id: 'mobile-perf', name: 'Mobile Performance Engineering', category: 'Cybersecurity & Role Prep', description: 'App Startup Time (Cold/Warm), Battery Drain Optimization, Memory Leak Profiling.', popularCompanies: ['Uber', 'Lyft', 'DoorDash'], questionCount: 12, questions: [] },
  { id: 'fullstack-track', name: 'Full Stack Developer Interview Track', category: 'Cybersecurity & Role Prep', description: 'End-to-End Feature Delivery, Client-Server Protocol, State Management & Database Queries.', popularCompanies: ['Meta', 'Stripe', 'Atlassian'], questionCount: 18, questions: [] },
  { id: 'quant-finance', name: 'Quant Finance & Algo Trading', category: 'Cybersecurity & Role Prep', description: 'Low Latency C++, FIX Protocol, Order Books, Market Microstructure & Monte Carlo.', popularCompanies: ['Jane Street', 'Citadel', 'Two Sigma', 'HRT'], questionCount: 14, questions: [] },
  { id: 'cloud-architect', name: 'Cloud Architect Master Track', category: 'Cybersecurity & Role Prep', description: 'Multi-Cloud Strategy, Disaster Recovery (DR), Cost Optimization & Zero Trust Cloud.', popularCompanies: ['AWS', 'GCP', 'Azure', 'Deloitte'], questionCount: 16, questions: [] },
  { id: 'sec-engineer', name: 'Security Engineer Track', category: 'Cybersecurity & Role Prep', description: 'Threat Modeling (STRIDE), Application Security Reviews, DevSecOps & Incident Response.', popularCompanies: ['Cloudflare', 'Palantir', 'CrowdStrike'], questionCount: 14, questions: [] },
  { id: 'devops-master', name: 'DevOps & Infrastructure Track', category: 'Cybersecurity & Role Prep', description: 'CI/CD Automation, Infrastructure as Code, Immutable Infrastructure & Observability.', popularCompanies: ['Red Hat', 'AWS', 'Datadog'], questionCount: 16, questions: [] },
  { id: 'hr-interview', name: 'HR & Cultural Fit Questions', category: 'Cybersecurity & Role Prep', description: 'Company Culture Fit, Salary Negotiation, Relocation, Career Goals & 5-Year Vision.', popularCompanies: ['TCS', 'Infosys', 'Amazon', 'Google', 'Accenture'], questionCount: 12, questions: [] }
];

// =========================================================================
// AUTOMATIC QUESTION ENGINE (GUARANTEES AT LEAST 50 UNIQUE QUESTIONS PER SUBJECT)
// =========================================================================

function getLanguageForSubject(subjectId: string, category: string): string {
  const id = subjectId.toLowerCase();
  if (id.includes('python') || id.includes('django') || id.includes('flask') || id.includes('fastapi') || id.includes('pandas') || id.includes('numpy') || id.includes('pytorch') || id.includes('tensorflow') || id.includes('scikit') || id.includes('ml')) return 'python';
  if (id.includes('java') || id.includes('spring') || id.includes('hibernate') || id.includes('android')) return 'java';
  if (id.includes('js') || id.includes('ts') || id.includes('react') || id.includes('next') || id.includes('node') || id.includes('express') || id.includes('angular') || id.includes('vue') || id.includes('svelte') || id.includes('web') || id.includes('frontend')) return 'typescript';
  if (id.includes('cpp') || id.includes('c-lang') || id.includes('c-prog') || id.includes('quant') || id.includes('unreal')) return 'cpp';
  if (id.includes('go')) return 'go';
  if (id.includes('rust')) return 'rust';
  if (id.includes('csharp') || id.includes('dotnet') || id.includes('unity')) return 'csharp';
  if (id.includes('sql') || id.includes('postgres') || id.includes('mysql') || id.includes('oracle') || id.includes('db') || id.includes('redis') || id.includes('mongo')) return 'sql';
  if (id.includes('docker') || id.includes('k8s') || id.includes('kubernetes') || id.includes('terraform') || id.includes('ansible')) return 'yaml';
  if (id.includes('bash') || id.includes('linux') || id.includes('shell')) return 'bash';
  return 'typescript';
}

function generateSnippetForSubject(subject: InterviewBitSubject, qIndex: number): string {
  const lang = getLanguageForSubject(subject.id, subject.category);
  const cleanName = subject.name.replace(/[^a-zA-Z0-9]/g, '');
  const cleanId = subject.id.replace(/[^a-zA-Z0-9]/g, '_');

  if (lang === 'python') {
    return `# ${subject.name} - Technical Implementation Pattern #${qIndex + 1}
def execute_${cleanId}_task(input_payload: dict) -> dict:
    """Production workflow implementation for ${subject.name}."""
    if not input_payload.get('valid', True):
        raise ValueError("Invalid payload received for ${subject.name}")
    
    # Process core execution flow
    result = {
        "subject": "${subject.name}",
        "processed_id": input_payload.get("id", 1001),
        "status": "SUCCESS"
    }
    return result`;
  }

  if (lang === 'java') {
    return `// ${subject.name} - Technical Pattern #${qIndex + 1}
public class ${cleanName}Handler {
    private final String subjectName = "${subject.name}";

    public boolean processRequest(Object requestData) {
        if (requestData == null) {
            throw new IllegalArgumentException("Data cannot be null in " + subjectName);
        }
        // Concurrent safe execution block
        return true;
    }
}`;
  }

  if (lang === 'sql') {
    return `-- ${subject.name} - Optimized Query Pattern #${qIndex + 1}
SELECT 
  id,
  entity_title,
  COUNT(*) AS item_count,
  MAX(updated_at) AS last_modified
FROM ${cleanId}_table
WHERE is_active = TRUE
GROUP BY id, entity_title
HAVING COUNT(*) > 1
ORDER BY last_modified DESC;`;
  }

  if (lang === 'cpp') {
    return `// ${subject.name} - Low Latency C++ Pattern #${qIndex + 1}
#include <iostream>
#include <vector>

class ${cleanName}Processor {
public:
    void processData(const std::vector<int>& dataBuffer) {
        // Zero-copy high performance buffer handling for ${subject.name}
        std::cout << "Executing ${subject.name} optimization..." << std::endl;
    }
};`;
  }

  if (lang === 'go') {
    return `// ${subject.name} - Go Concurrent Worker Pattern #${qIndex + 1}
package main

import "fmt"

func handle${cleanName}Job(jobId int, resultChan chan<- string) {
    // Concurrent execution pipeline for ${subject.name}
    resultChan <- fmt.Sprintf("${subject.name} Job %d executed successfully", jobId)
}`;
  }

  if (lang === 'yaml') {
    return `# ${subject.name} - Infrastructure Config #${qIndex + 1}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${subject.id}-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ${subject.id}-app`;
  }

  return `// ${subject.name} - Production Module Pattern #${qIndex + 1}
export interface ${cleanName}Config {
  enabled: boolean;
  timeoutMs: number;
}

export async function process${cleanName}(config: ${cleanName}Config): Promise<{ success: boolean }> {
  if (!config.enabled) return { success: false };
  console.log("Executing ${subject.name} workflow with timeout:", config.timeoutMs);
  return { success: true };
}`;
}

// 50 Unique Question Template Angles
const TOPIC_ANGLES = [
  {
    topic: 'Architecture & Fundamentals',
    diff: 'Easy' as const,
    q: (s: string) => `What are the core fundamentals and primary architectural benefits of using ${s}?`,
    a: (s: string, d: string) => `${s} is built upon key design principles focused on high reliability, modularity, and operational efficiency. Main features include: ${d}. Understanding its foundational design helps engineers write maintainable and robust systems.`
  },
  {
    topic: 'Memory Management',
    diff: 'Hard' as const,
    q: (s: string) => `How does ${s} handle memory allocation, object lifecycles, and garbage collection / resource cleanup?`,
    a: (s: string) => `Memory management in ${s} balances rapid allocations with deterministic cleanup mechanisms. It prevents memory leaks through automatic garbage collection or strict RAII boundaries, ensuring stable memory footprints under heavy production loads.`
  },
  {
    topic: 'Concurrency & Threading',
    diff: 'Hard' as const,
    q: (s: string) => `Explain the concurrency model, thread synchronization, or lock mechanisms in ${s}.`,
    a: (s: string) => `${s} provides explicit primitives or asynchronous event loops to manage concurrent tasks without race conditions. Memory visibility guarantees, atomic locks, or message passing channels prevent deadlocks and thread starvation.`
  },
  {
    topic: 'Data Structures & Collections',
    diff: 'Medium' as const,
    q: (s: string) => `What are the most essential internal data structures and collections used in ${s}?`,
    a: (s: string) => `Core data structures in ${s} offer optimized time complexities for insertion, lookup, and iteration (e.g., O(1) hash maps, O(log N) trees). Selecting the appropriate data structure prevents memory overhead and CPU bottlenecks.`
  },
  {
    topic: 'Exception Handling & Fault Tolerance',
    diff: 'Medium' as const,
    q: (s: string) => `What are the recommended best practices for exception handling and fault isolation in ${s}?`,
    a: (s: string) => `Fault-tolerant ${s} applications enforce structured error handling, preserving stack traces and avoiding silent failures. Using custom exception hierarchies and panic recovery prevents cascading service outages.`
  },
  {
    topic: 'Performance Optimization & Profiling',
    diff: 'Hard' as const,
    q: (s: string) => `What are the top performance bottlenecks in ${s} applications and how do you profile and eliminate them?`,
    a: (s: string) => `Performance bottlenecks in ${s} typically stem from unoptimized loops, excessive object allocations, and blocking I/O calls. Utilizing dedicated profilers (flamegraphs, heap dumps) identifies hot execution paths for micro-optimization.`
  },
  {
    topic: 'Security & Hardening',
    diff: 'Hard' as const,
    q: (s: string) => `How do you secure ${s} applications against common security vulnerabilities and injection attacks?`,
    a: (s: string) => `Securing ${s} requires input sanitization, strict secret management, parameterized queries, and principle of least privilege. Applying dependency vulnerability scanners (SAST/DAST) mitigates zero-day exploits.`
  },
  {
    topic: 'Asynchronous Operations & Event Loops',
    diff: 'Medium' as const,
    q: (s: string) => `How does ${s} process non-blocking asynchronous operations, promises/futures, or event queues?`,
    a: (s: string) => `${s} leverages event-driven runtimes or worker thread pools to execute non-blocking I/O. This enables high concurrency without incurring heavy per-thread stack allocation overhead.`
  },
  {
    topic: 'Testing & Mocking Frameworks',
    diff: 'Easy' as const,
    q: (s: string) => `What strategies and tools are used for unit testing, integration testing, and mocking in ${s}?`,
    a: (s: string) => `Testing in ${s} relies on standard test runners and mocking libraries to isolate external dependencies (databases, third-party APIs). High test coverage ensures seamless regression testing during continuous integration.`
  },
  {
    topic: 'State Persistence & Serialization',
    diff: 'Medium' as const,
    q: (s: string) => `How does ${s} handle state persistence, object serialization, and data transport?`,
    a: (s: string) => `${s} supports binary and JSON serialization formats for cross-network state transfer. Implementing immutable schemas prevents version mismatch errors during database reads and RPC messaging.`
  },
  {
    topic: 'Dependency Management',
    diff: 'Easy' as const,
    q: (s: string) => `How are package dependencies, module versioning, and environment isolation managed in ${s}?`,
    a: (s: string) => `Dependency management in ${s} uses lockfiles and semantic versioning (SemVer) to guarantee deterministic builds. Isolated package environments prevent transitive dependency conflicts.`
  },
  {
    topic: 'Distributed Scalability',
    diff: 'Hard' as const,
    q: (s: string) => `How do you scale ${s} applications horizontally across multi-node clusters?`,
    a: (s: string) => `Horizontal scaling with ${s} involves stateless app instances, distributed load balancers, and shared caching layers (e.g., Redis). Stateless design allows seamless container auto-scaling under peak traffic.`
  },
  {
    topic: 'API Design & Protocols',
    diff: 'Medium' as const,
    q: (s: string) => `How does ${s} interface with RESTful APIs, gRPC, or WebSockets efficiently?`,
    a: (s: string) => `${s} implements strongly-typed protocol definitions (Protobuf/OpenAPI) to ensure strict API contracts between client and server, minimizing payload size and latency.`
  },
  {
    topic: 'Type Systems & Contracts',
    diff: 'Medium' as const,
    q: (s: string) => `Explain the type system, polymorphism, or contract enforcement capabilities of ${s}.`,
    a: (s: string) => `The type system in ${s} catches type mismatch bugs at compile time or early runtime, providing interface abstraction and code completion while reducing runtime validation overhead.`
  },
  {
    topic: 'Idiomatic Design Patterns',
    diff: 'Medium' as const,
    q: (s: string) => `Which software design patterns (Factory, Observer, Strategy, Singleton) are most idiomatic in ${s}?`,
    a: (s: string) => `Idiomatic design patterns in ${s} promote loose coupling and high cohesion. For instance, Strategy and Observer patterns simplify feature extensibility without modifying existing core logic.`
  },
  {
    topic: 'Observability & Monitoring',
    diff: 'Medium' as const,
    q: (s: string) => `How do you configure logging, Prometheus metrics, and distributed tracing in ${s}?`,
    a: (s: string) => `Observability in ${s} utilizes structured JSON logging, OpenTelemetry tracing spans, and health check probes. This provides real-time visibility into latency distribution and error rates.`
  },
  {
    topic: 'Database Connection Pooling',
    diff: 'Hard' as const,
    q: (s: string) => `How do you configure database connection pools and transaction management in ${s}?`,
    a: (s: string) => `Connection pooling in ${s} reuses established database connections to prevent socket depletion under spike loads. Proper validation intervals and max lifetime parameters prevent stale connections.`
  },
  {
    topic: 'Runtime Heap Inspection',
    diff: 'Hard' as const,
    q: (s: string) => `How do you inspect runtime heap allocations and diagnose memory leaks in ${s}?`,
    a: (s: string) => `Diagnosing heap leaks in ${s} involves comparing heap snapshots taken over time, analyzing retained references, and pinpointing unclosed streams or circular reference graphs.`
  },
  {
    topic: 'Rate Limiting & Backpressure',
    diff: 'Hard' as const,
    q: (s: string) => `How do you enforce backpressure and rate limiting in high-throughput ${s} services?`,
    a: (s: string) => `Backpressure in ${s} controls traffic volume by signaling upstream producers when buffer capacity is reached, preventing out-of-memory crashes during traffic surges.`
  },
  {
    topic: 'Containerization & Isolation',
    diff: 'Medium' as const,
    q: (s: string) => `What are the containerization and Docker deployment best practices for ${s}?`,
    a: (s: string) => `Dockerizing ${s} involves multi-stage builds, minimal base images (Alpine/Distroless), non-root execution permissions, and layer caching optimization for fast build pipelines.`
  },
  {
    topic: 'Cold Start Reduction',
    diff: 'Medium' as const,
    q: (s: string) => `What techniques minimize cold start latencies and optimize startup execution time in ${s}?`,
    a: (s: string) => `Minimizing cold starts in ${s} includes lazy-loading heavy modules, compiling ahead-of-time (AOT), and stripping unused dependency overhead from initial execution paths.`
  },
  {
    topic: 'Immutability & Safety',
    diff: 'Medium' as const,
    q: (s: string) => `Why is immutability important when building concurrent or reactive ${s} software?`,
    a: (s: string) => `Immutable state in ${s} eliminates race conditions by preventing mutation of shared data structures after creation, enabling safe lock-free concurrent reads.`
  },
  {
    topic: 'Custom Middleware Architecture',
    diff: 'Medium' as const,
    q: (s: string) => `How do you design custom middleware or interceptor pipelines in ${s}?`,
    a: (s: string) => `Middleware in ${s} executes pre-processing and post-processing tasks (authentication, rate limiting, logging) along request pipelines using composable function chains.`
  },
  {
    topic: 'Non-Blocking Streaming & Buffers',
    diff: 'Hard' as const,
    q: (s: string) => `How does ${s} handle non-blocking streaming I/O for large file or network payloads?`,
    a: (s: string) => `Non-blocking streams in ${s} read data in chunked buffers without loading entire datasets into RAM, keeping memory usage constant regardless of file size.`
  },
  {
    topic: 'Zero-Downtime Deployment',
    diff: 'Hard' as const,
    q: (s: string) => `How do you execute blue-green or canary zero-downtime upgrades for ${s}?`,
    a: (s: string) => `Zero-downtime upgrades for ${s} combine backward-compatible API changes, health probe checks, and gradual load-balancer shift across blue and green server pools.`
  },
  {
    topic: 'Circuit Breakers & Retries',
    diff: 'Hard' as const,
    q: (s: string) => `How do you implement circuit breakers and exponential backoff retries in ${s}?`,
    a: (s: string) => `Circuit breakers in ${s} temporarily halt requests to failing downstream dependencies, allowing degraded systems to recover while serving fallback responses.`
  },
  {
    topic: 'Static Code Analysis',
    diff: 'Easy' as const,
    q: (s: string) => `What static code analysis tools and linting rules ensure code consistency in ${s}?`,
    a: (s: string) => `Static analysis in ${s} catches code smells, unused variables, formatting inconsistencies, and potential security bugs before code is merged into production.`
  },
  {
    topic: 'Scoping & Binding Rules',
    diff: 'Easy' as const,
    q: (s: string) => `Explain variable scoping, lexical closures, or binding mechanisms in ${s}.`,
    a: (s: string) => `Scoping rules in ${s} dictate variable lifetime and visibility. Lexical closures capture outer scope variables, enabling state encapsulation in functional modules.`
  },
  {
    topic: 'Reflection & Metaprogramming',
    diff: 'Hard' as const,
    q: (s: string) => `When is dynamic reflection or metaprogramming appropriate in ${s} and what are its performance costs?`,
    a: (s: string) => `Reflection in ${s} enables dynamic inspection of classes and methods at runtime, useful for ORMs and DI containers, but introduces runtime lookup overhead.`
  },
  {
    topic: 'Low-Level System Calls',
    diff: 'Hard' as const,
    q: (s: string) => `How does ${s} interact with OS system calls, POSIX interfaces, or native C bindings?`,
    a: (s: string) => `Interfacing with native system calls in ${s} allows direct hardware and memory control, bypassing high-level abstraction boundaries for specialized low-latency tasks.`
  },
  {
    topic: 'Kubernetes Orchestration',
    diff: 'Medium' as const,
    q: (s: string) => `How do you configure Kubernetes liveness, readiness, and startup probes for ${s}?`,
    a: (s: string) => `Probes in Kubernetes monitor ${s} container health. Readiness probes prevent traffic routing before initializations finish, while liveness probes restart crashed pods.`
  },
  {
    topic: 'Event-Driven Messaging',
    diff: 'Medium' as const,
    q: (s: string) => `How do you integrate ${s} with distributed message queues like Kafka or RabbitMQ?`,
    a: (s: string) => `Integrating ${s} with Kafka enables decoupled pub/sub messaging with event offset management, consumer group balancing, and reliable message retry topics.`
  },
  {
    topic: 'Multi-Level Caching',
    diff: 'Medium' as const,
    q: (s: string) => `How do you design L1 in-memory and L2 distributed caching strategies for ${s}?`,
    a: (s: string) => `Multi-level caching in ${s} stores hot data in local RAM (L1) and shared Redis (L2), drastically reducing database query load while maintaining low lookup latencies.`
  },
  {
    topic: 'Live Incident Debugging',
    diff: 'Hard' as const,
    q: (s: string) => `How do you troubleshoot a sudden memory leak or high CPU spike in a production ${s} service?`,
    a: (s: string) => `Troubleshooting live incidents in ${s} requires capturing thread/heap dumps, inspecting metrics dashboards, isolating degraded nodes, and reverting recent commits.`
  },
  {
    topic: 'Internationalization & Encodings',
    diff: 'Easy' as const,
    q: (s: string) => `How does ${s} handle UTF-8 text encoding, locale formatting, and timezones?`,
    a: (s: string) => `Text encoding in ${s} standardizes on UTF-8, while date-time parsing uses UTC offsets to prevent timezone conversion discrepancies in multi-region deployments.`
  },
  {
    topic: 'WebAssembly & Edge Execution',
    diff: 'Medium' as const,
    q: (s: string) => `How is ${s} adapted for WebAssembly (WASM) or serverless Edge runtime execution?`,
    a: (s: string) => `Compiling ${s} to WASM enables near-native execution inside browsers or Edge CDN nodes with minimal bundle overhead and sandbox security.`
  },
  {
    topic: 'Cryptography & Tokens',
    diff: 'Hard' as const,
    q: (s: string) => `How do you implement JWT authentication, password hashing, and TLS in ${s}?`,
    a: (s: string) => `Authentication in ${s} uses secure password hashing (Argon2/bcrypt) and signed JWT tokens with short expiry windows and rotating refresh key pairs.`
  },
  {
    topic: 'Micro-benchmarking',
    diff: 'Medium' as const,
    q: (s: string) => `How do you write accurate micro-benchmarks in ${s} without compiler optimizations skewing metrics?`,
    a: (s: string) => `Micro-benchmarking in ${s} uses warmup iterations, dead-code elimination prevention, and statistical variance calculation to isolate true algorithm execution times.`
  },
  {
    topic: 'Database Schema Migrations',
    diff: 'Medium' as const,
    q: (s: string) => `How do you manage version-controlled database schema migrations in ${s}?`,
    a: (s: string) => `Database migrations in ${s} execute sequential SQL delta scripts during deployment pipelines, ensuring idempotent schema updates across environments.`
  },
  {
    topic: 'Domain-Driven Design (DDD)',
    diff: 'Medium' as const,
    q: (s: string) => `How do you structure Domain Entities, Value Objects, and Repositories in ${s}?`,
    a: (s: string) => `DDD in ${s} isolates domain business logic into pure entities and value objects, decoupling core domain models from persistence ORM frameworks.`
  },
  {
    topic: 'High Availability Failover',
    diff: 'Hard' as const,
    q: (s: string) => `How do you configure active-passive or active-active failover clusters for ${s}?`,
    a: (s: string) => `High availability for ${s} pairs automated heartbeats with VIP DNS failovers and real-time database replication to ensure minimal RTO and RPO during outages.`
  },
  {
    topic: 'Contract-Driven Validation',
    diff: 'Easy' as const,
    q: (s: string) => `How do you enforce schema validation and runtime contract checks in ${s}?`,
    a: (s: string) => `Contract validation in ${s} validates inbound payloads against schemas before execution, returning clear HTTP 400 validation error responses.`
  },
  {
    topic: 'Thread Pool Tuning',
    diff: 'Hard' as const,
    q: (s: string) => `How do you calculate optimal thread pool sizes and worker counts for ${s}?`,
    a: (s: string) => `Optimal thread pool sizing in ${s} uses the formula: Threads = CPU Cores * (1 + Wait Time / Service Time), balancing CPU usage without context-switching churn.`
  },
  {
    topic: 'Dynamic Plugin Engines',
    diff: 'Hard' as const,
    q: (s: string) => `How does ${s} support dynamic module loading and plugin extensibility at runtime?`,
    a: (s: string) => `Plugin engines in ${s} load external compiled modules or scripts dynamically, enforcing interface boundaries to prevent untrusted code from crashing the engine.`
  },
  {
    topic: 'Monolith to Microservices Refactoring',
    diff: 'Hard' as const,
    q: (s: string) => `What strategy is used to decompose a large ${s} monolith into microservices?`,
    a: (s: string) => `Decomposing a monolith in ${s} uses the Strangler Fig pattern, gradually extracting sub-domains into independent microservices behind an API Gateway.`
  },
  {
    topic: 'High-Throughput Binary Serialization',
    diff: 'Medium' as const,
    q: (s: string) => `Why are binary protocols like Protobuf or Avro preferred over JSON for ${s} services?`,
    a: (s: string) => `Binary protocols reduce payload sizes by up to 80% in ${s} microservices, cutting network serialization time and CPU parsing overhead significantly.`
  },
  {
    topic: 'Deterministic Resource Cleanup',
    diff: 'Easy' as const,
    q: (s: string) => `How does ${s} guarantee deterministic cleanup of open sockets, database handles, and files?`,
    a: (s: string) => `Deterministic resource cleanup in ${s} uses automated try-with-resources or defer blocks, ensuring file descriptors and connections close even when exceptions occur.`
  },
  {
    topic: 'Event Sourcing & CQRS',
    diff: 'Hard' as const,
    q: (s: string) => `How do you implement Event Sourcing and CQRS architecture with ${s}?`,
    a: (s: string) => `Event Sourcing with ${s} persists all state changes as an append-only log of immutable events, while CQRS separates write model logic from optimized read models.`
  },
  {
    topic: 'Third-Party Vulnerability Auditing',
    diff: 'Easy' as const,
    q: (s: string) => `How do you continuously audit and remediate third-party dependency vulnerabilities in ${s}?`,
    a: (s: string) => `Continuous dependency auditing in ${s} integrates automated security bots (Snyk/Dependabot) into pull requests to auto-patch CVEs.`
  },
  {
    topic: 'Enterprise Tech Stack ROI',
    diff: 'Easy' as const,
    q: (s: string) => `What key ROI and engineering factors justify adopting ${s} for enterprise production?`,
    a: (s: string) => `Adopting ${s} offers strong developer ecosystem support, high runtime efficiency, predictable operational costs, and reduced time-to-market for modern applications.`
  }
];

// Process ALL 256 subjects to ensure EVERY SINGLE SUBJECT has AT LEAST 50 unique questions
export const INTERVIEWBIT_SUBJECTS: InterviewBitSubject[] = RAW_SUBJECTS.map((subject) => {
  const existing = [...subject.questions];
  const needed = Math.max(0, 50 - existing.length);

  const generated: InterviewQuestion[] = [];
  const popularCompanies = subject.popularCompanies.length > 0 ? subject.popularCompanies : ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple'];

  for (let i = 0; i < needed; i++) {
    const angleIndex = i % TOPIC_ANGLES.length;
    const angle = TOPIC_ANGLES[angleIndex];
    const companyIndex = i % popularCompanies.length;

    generated.push({
      id: `${subject.id}-q-${existing.length + i + 1}`,
      question: angle.q(subject.name),
      answer: angle.a(subject.name, subject.description),
      codeSnippet: generateSnippetForSubject(subject, i),
      codeLanguage: getLanguageForSubject(subject.id, subject.category),
      difficulty: angle.diff,
      companyTags: [popularCompanies[companyIndex], popularCompanies[(companyIndex + 1) % popularCompanies.length]],
      topicTags: [angle.topic, subject.category, subject.name]
    });
  }

  const allQuestions = [...existing, ...generated];

  return {
    ...subject,
    questionCount: allQuestions.length,
    questions: allQuestions
  };
});

