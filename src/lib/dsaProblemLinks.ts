// Direct GeeksforGeeks and LeetCode problem link mappings for CampusOS 375 DSA Questions

export function getCleanTitle(title: string): string {
  return title
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Converts string title to clean LeetCode slug
export function titleToLeetcodeSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Direct GeeksforGeeks Practice or Article URLs for CampusOS 375 questions
const GFG_DIRECT_URLS: Record<string, string> = {
  // Arrays
  'Maximum and Minimum Element in an Array': 'https://www.geeksforgeeks.org/problems/find-minimum-and-maximum-element-in-an-array4428/1',
  'Reverse the Array': 'https://www.geeksforgeeks.org/problems/reverse-an-array/1',
  "Maximum Subarray (Kadane's Algorithm)": 'https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1',
  'Contains Duplicate': 'https://www.geeksforgeeks.org/problems/contains-duplicate/1',
  'Chocolate Distribution Problem': 'https://www.geeksforgeeks.org/problems/chocolate-distribution-problem3825/1',
  'Search in Rotated Sorted Array': 'https://www.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1',
  'Next Permutation': 'https://www.geeksforgeeks.org/problems/next-permutation5226/1',
  'Best Time to Buy and Sell Stock': 'https://www.geeksforgeeks.org/problems/stock-buy-and-sell2615/1',
  'Repeat and Missing Number Array': 'https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1',
  'Kth-Largest Element in an Array': 'https://www.geeksforgeeks.org/problems/k-largest-elements3726/1',
  'Trapping Rain Water': 'https://www.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1',
  'Product of Array Except Self': 'https://www.geeksforgeeks.org/problems/product-array-puzzle4522/1',
  'Maximum Product Subarray': 'https://www.geeksforgeeks.org/problems/maximum-product-subarray3604/1',
  'Find Minimum in Rotated Sorted Array': 'https://www.geeksforgeeks.org/problems/minimum-element-in-a-sorted-and-rotated-array3626/1',
  'Find Pair with Sum in Sorted & Rotated Array': 'https://www.geeksforgeeks.org/problems/pair-with-given-sum-in-a-sorted-array4940/1',
  '3Sum': 'https://www.geeksforgeeks.org/problems/find-triplets-with-zero-sum/1',
  'Container With Most Water': 'https://www.geeksforgeeks.org/problems/container-with-most-water8007/1',
  'Given Sum Pair': 'https://www.geeksforgeeks.org/problems/key-pair5616/1',
  'Kth - Smallest Element': 'https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1',
  'Merge Overlapping Intervals': 'https://www.geeksforgeeks.org/problems/overlapping-intervals--170633/1',
  'Find Minimum Number of Merge Operations to Make an Array Palindrome': 'https://www.geeksforgeeks.org/problems/palindromic-array-1587115620/1',
  'Given an Array of Numbers Arrange the Numbers to Form the Biggest Number': 'https://www.geeksforgeeks.org/problems/largest-number-formed-from-an-array1117/1',
  'Space Optimization Using Bit Manipulations': 'https://www.geeksforgeeks.org/space-optimization-using-bit-manipulations/',
  'Subarray Sum Divisible K': 'https://www.geeksforgeeks.org/problems/sub-array-sum-divisible-by-k2617/1',
  'Print all Possible Combinations of r Elements in a Given Array of Size n': 'https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/',
  "Mo's Algorithm": 'https://www.geeksforgeeks.org/mos-algorithm-query-square-root-decomposition/',

  // Strings
  'Valid Palindrome': 'https://www.geeksforgeeks.org/problems/palindrome-string0817/1',
  'Valid Anagram': 'https://www.geeksforgeeks.org/problems/anagram-1587115620/1',
  'Valid Parentheses': 'https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1',
  'Remove Consecutive Characters': 'https://www.geeksforgeeks.org/problems/remove-consecutive-characters1509/1',
  'Longest Common Prefix': 'https://www.geeksforgeeks.org/problems/longest-common-prefix-in-an-array5129/1',
  'Convert a Sentence into its Equivalent Mobile Numeric Keypad Sequence': 'https://www.geeksforgeeks.org/problems/convert-a-sentence-into-its-equivalent-mobile-numeric-keypad-sequence0541/1',
  'Print all the Duplicates in the Input String': 'https://www.geeksforgeeks.org/print-all-the-duplicates-in-the-input-string/',
  'Longest Substring Without Repeating Characters': 'https://www.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1',
  'Longest Repeating Character Replacement': 'https://www.geeksforgeeks.org/problems/longest-repeating-character-replacement/1',
  'Group Anagrams': 'https://www.geeksforgeeks.org/problems/print-anagrams-together/1',
  'Longest Palindromic Substring': 'https://www.geeksforgeeks.org/problems/longest-palindrome-in-a-string3411/1',
  'Palindromic Substrings': 'https://www.geeksforgeeks.org/problems/palindromic-pathes4701/1',
  'Next Permutation (String variant)': 'https://www.geeksforgeeks.org/problems/next-permutation5226/1',
  'Count Palindromic Subsequences': 'https://www.geeksforgeeks.org/problems/count-palindromic-subsequences/1',
  'Smallest Window in a String Containing all the Characters of Another String': 'https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1',
  'Wildcard String Matching': 'https://www.geeksforgeeks.org/problems/wildcard-string-matching1126/1',
  'Longest Prefix Suffix (KMP Pattern Matching)': 'https://www.geeksforgeeks.org/problems/longest-prefix-suffix2527/1',
  'Rabin-Karp Algorithm for Pattern Searching': 'https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/',
  'Transform One String to Another using Minimum Number of Given Operation': 'https://www.geeksforgeeks.org/problems/transform-string5645/1',
  'Minimum Window Substring': 'https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1',
  'Boyer Moore Algorithm for Pattern Searching': 'https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/',
  'Word Wrap Problem': 'https://www.geeksforgeeks.org/problems/word-wrap1646/1',

  // 2D Arrays
  'Zigzag (or Diagonal) Traversal of Matrix': 'https://www.geeksforgeeks.org/zigzag-or-diagonal-traversal-of-matrix/',
  'Set Matrix Zeroes': 'https://www.geeksforgeeks.org/problems/make-matrix-beautiful-1587115620/1',
  'Spiral Matrix': 'https://www.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1',
  'Rotate Image (Rotate Matrix)': 'https://www.geeksforgeeks.org/problems/rotate-by-90-degree-1587115621/1',
  'Word Search': 'https://www.geeksforgeeks.org/problems/word-search/1',
  'Find the Number of Islands (Using DFS)': 'https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1',
  'Given a Matrix of O and X, Replace O with X if Surrounded by X': 'https://www.geeksforgeeks.org/problems/replace-o-with-x4256/1',
  'Find a Common Element in all Rows of a Given Row-Wise Sorted Matrix': 'https://www.geeksforgeeks.org/common-elements-in-all-rows-of-a-given-matrix/',
  'Create a Matrix with Alternating Rectangles of O and X': 'https://www.geeksforgeeks.org/create-a-matrix-with-alternating-rectangles-of-o-and-x/',
  'Maximum Size Rectangle of all 1s': 'https://www.geeksforgeeks.org/problems/max-rectangle/1',

  // Searching & Sorting
  'Permute Two Arrays such that Sum of Every Pair is Greater or Equal to K': 'https://www.geeksforgeeks.org/problems/permutations-in-array1747/1',
  'Counting Sort': 'https://www.geeksforgeeks.org/problems/counting-sort/1',
  'Find Common Elements in Three Sorted Arrays': 'https://www.geeksforgeeks.org/problems/common-elements1107/1',
  'Searching in an Array Where Adjacent Differ by at Most K': 'https://www.geeksforgeeks.org/problems/searching-in-an-array-where-adjacent-differ-by-at-most-k0454/1',
  'Ceiling in a Sorted Array': 'https://www.geeksforgeeks.org/ceiling-in-a-sorted-array/',
  'Pair with Given Difference': 'https://www.geeksforgeeks.org/problems/find-pair-given-difference1559/1',
  'Majority Element': 'https://www.geeksforgeeks.org/problems/majority-element-1587115620/1',
  'Count Triplets with Sum Smaller Than a Given Value': 'https://www.geeksforgeeks.org/problems/count-triplets-with-sum-smaller-than-x5549/1',
  'Maximum Sum Subsequence with No Adjacent Elements': 'https://www.geeksforgeeks.org/problems/stickler-theif-1587115621/1',
  'Merge Sorted Arrays using O(1) Extra Space': 'https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1',
  'Inversion of Array': 'https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1',
  'Find Duplicates in O(n) Time and O(1) Extra Space': 'https://www.geeksforgeeks.org/problems/find-duplicates-in-an-array/1',
  'Radix Sort': 'https://www.geeksforgeeks.org/radix-sort/',
  'Make all Array Elements Equal': 'https://www.geeksforgeeks.org/make-array-elements-equal-minimum-cost/',
  'Check if Reversing a Sub Array Make the Array Sorted': 'https://www.geeksforgeeks.org/check-reversing-sub-array-make-array-sorted/',
  'Find Four Elements that Sum to a Given Value': 'https://www.geeksforgeeks.org/problems/find-all-four-sum-numbers1732/1',
  'Median of Two Sorted Arrays with Different Sizes': 'https://www.geeksforgeeks.org/problems/median-of-2-sorted-arrays-of-different-sizes/1',
  'Median of Stream of Running Integers': 'https://www.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1',
  'Print Subarrays with 0 Sum': 'https://www.geeksforgeeks.org/problems/zero-sum-subarrays1825/1',
  'Aggressive Cows (Binary Search on Answer)': 'https://www.geeksforgeeks.org/problems/aggressive-cows/1',
  'Allocate Minimum Number of Pages': 'https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1',
  'Minimum Swaps to Sort': 'https://www.geeksforgeeks.org/problems/minimum-swaps/1',

  // Backtracking
  'Rat in a Maze Problem': 'https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1',
  'Combinational Sum': 'https://www.geeksforgeeks.org/problems/combination-sum-1587115620/1',
  'Crossword Puzzle Solver': 'https://www.geeksforgeeks.org/solve-crossword-puzzle/',
  'Longest Possible Route in a Matrix with Hurdles': 'https://www.geeksforgeeks.org/problems/longest-possible-route-in-a-matrix-with-hurdles/1',
  'Printing All Solutions in N-Queen Problem': 'https://www.geeksforgeeks.org/problems/n-queen-problem0315/1',
  'Solve the Sudoku': 'https://www.geeksforgeeks.org/problems/solve-the-sudoku-1587115621/1',
  'Partition Equal Subset Sum': 'https://www.geeksforgeeks.org/problems/subset-sum-problem2014/1',
  'M Coloring Problem': 'https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1',
  'Knight Tour Problem': 'https://www.geeksforgeeks.org/the-knights-tour-problem/',
  'Remove Invalid Parentheses': 'https://www.geeksforgeeks.org/problems/remove-invalid-parentheses/1',
  'Word Break Problem using Backtracking': 'https://www.geeksforgeeks.org/problems/word-break-part-23201/1',
  'Print All Palindromic Partitions of a String': 'https://www.geeksforgeeks.org/problems/find-all-possible-palindromic-partitions-of-a-string/1',
  'Find Shortest Safe Route in a Path with Landmines': 'https://www.geeksforgeeks.org/problems/find-shortest-safe-route-in-a-matrix/1',
  'Partition of Set into K Subsets with Equal Sum': 'https://www.geeksforgeeks.org/problems/partition-array-to-k-subsets/1',
  'Hamiltonian Cycle Detection': 'https://www.geeksforgeeks.org/hamiltonian-cycle/',
  'Tug of War': 'https://www.geeksforgeeks.org/tug-of-war/',
  'Maximum Possible Number by Doing at Most K Swaps': 'https://www.geeksforgeeks.org/problems/largest-number-in-k-swaps-1587115620/1',
  'Solving Cryptarithmetic Puzzles': 'https://www.geeksforgeeks.org/solving-cryptarithmetic-puzzles/',
  'Find Paths from Corner Cell to Middle Cell in Maze': 'https://www.geeksforgeeks.org/find-paths-from-corner-cell-to-middle-cell-in-maze/',
  'Arithmetic Expressions': 'https://www.geeksforgeeks.org/arithmetic-expressions/',

  // Linked List
  'Reverse Linked List': 'https://www.geeksforgeeks.org/problems/reverse-a-linked-list/1',
  'Linked List Cycle Detection': 'https://www.geeksforgeeks.org/problems/detect-loop-in-linked-list/1',
  'Merge Two Sorted Lists': 'https://www.geeksforgeeks.org/problems/merge-two-sorted-linked-lists/1',
  'Delete Node in a Linked List (Without Head Pointer)': 'https://www.geeksforgeeks.org/problems/delete-without-head-pointer/1',
  'Remove Duplicates from an Unsorted Linked List': 'https://www.geeksforgeeks.org/problems/remove-duplicates-from-an-unsorted-linked-list/1',
  'Sort a Linked List of 0s, 1s and 2s': 'https://www.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1',
  'Multiply Two Numbers Represented by Linked Lists': 'https://www.geeksforgeeks.org/problems/multiply-two-linked-lists/1',
  'Remove Nth Node From End of List': 'https://www.geeksforgeeks.org/problems/nth-node-from-end-of-linked-list/1',
  'Reorder List': 'https://www.geeksforgeeks.org/problems/reorder-list/1',
  'Detect and Remove Loop in a Linked List': 'https://www.geeksforgeeks.org/problems/remove-loop-in-linked-list/1',
  'Intersection Point of Two Linked Lists': 'https://www.geeksforgeeks.org/problems/intersection-point-in-y-shapped-linked-lists/1',
  'Flatten a Multilevel Doubly Linked List': 'https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1',
  'Linked List in Zig-Zag Fashion': 'https://www.geeksforgeeks.org/problems/linked-list-in-zig-zag-fashion/1',
  'Reverse a Doubly Linked List': 'https://www.geeksforgeeks.org/problems/reverse-a-doubly-linked-list/1',
  'Delete Nodes Which Have a Greater Value on Right Side': 'https://www.geeksforgeeks.org/problems/delete-nodes-having-greater-value-on-right/1',
  'Segregate Even and Odd Nodes in a Linked List': 'https://www.geeksforgeeks.org/problems/segregate-even-and-odd-nodes-in-a-linked-list5032/1',
  'Point to Next Higher Value Node in a Linked List with Arbitrary Pointer': 'https://www.geeksforgeeks.org/point-to-next-higher-value-node-in-a-linked-list-with-an-arbitrary-pointer/',
  'Rearrange a Given Linked List in Place': 'https://www.geeksforgeeks.org/rearrange-a-given-linked-list-in-place/',
  'Sort Biotonic Doubly Linked List': 'https://www.geeksforgeeks.org/sort-biotonic-doubly-linked-list/',
  'Merge K Sorted Lists': 'https://www.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1',
  'Merge Sort for Linked List': 'https://www.geeksforgeeks.org/problems/sort-a-linked-list/1',
  'Quicksort on Singly Linked List': 'https://www.geeksforgeeks.org/problems/quick-sort-on-linked-list/1',
  'Sum of Two Linked Lists': 'https://www.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1',
  'Flattening a Linked List': 'https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1',
  'Clone a Linked List with Next and Random Pointer': 'https://www.geeksforgeeks.org/problems/clone-a-linked-list-with-next-and-random-pointer/1',
  'Subtract Two Numbers Represented as Linked Lists': 'https://www.geeksforgeeks.org/problems/subtraction-in-linked-list/1',

  // Stacks & Queues
  'Implement Two Stacks in an Array': 'https://www.geeksforgeeks.org/problems/implement-two-stacks-in-an-array/1',
  'Evaluation of Postfix Expression': 'https://www.geeksforgeeks.org/problems/evaluation-of-postfix-expression1735/1',
  'Implement Stack using Queues': 'https://www.geeksforgeeks.org/problems/stack-using-two-queues/1',
  'Queue Reversal': 'https://www.geeksforgeeks.org/problems/queue-reversal/1',
  'Implement Stack and Queue using Deque': 'https://www.geeksforgeeks.org/implement-stack-queue-using-deque/',
  'Reverse First K Elements of Queue': 'https://www.geeksforgeeks.org/problems/reverse-first-k-elements-of-queue/1',
  'Design Stack with Middle Operation (O(1) time)': 'https://www.geeksforgeeks.org/design-a-stack-with-find-middle-operation/',
  'Infix to Postfix Conversion': 'https://www.geeksforgeeks.org/problems/infix-to-postfix-1587115620/1',
  'Design and Implement Special Stack (GetMin in O(1))': 'https://www.geeksforgeeks.org/problems/special-stack/1',
  'Longest Valid String of Parentheses': 'https://www.geeksforgeeks.org/problems/longest-valid-parentheses5657/1',
  'Find if an Expression Has Duplicate Parentheses': 'https://www.geeksforgeeks.org/find-expression-duplicate-parenthesis-not/',
  'Check if an Array is Stack Permutation of Other': 'https://www.geeksforgeeks.org/problems/stack-permutations/1',
  'Count Natural Numbers Whose Permutation Value is Greater Than Number': 'https://www.geeksforgeeks.org/count-natural-numbers-whose-permutation-is-greater-than-the-number/',
  'Sort a Stack using Recursion': 'https://www.geeksforgeeks.org/problems/sort-a-stack/1',
  'First Non-Repeating Character in a Stream of Characters': 'https://www.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1',
  'The Celebrity Problem': 'https://www.geeksforgeeks.org/problems/the-celebrity-problem/1',
  'Next Greater Element': 'https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1',
  'Distance of Nearest Cell Having 1 in a Binary Matrix': 'https://www.geeksforgeeks.org/problems/distance-of-nearest-cell-having-1-1587115620/1',
  'Rotten Oranges (BFS with Queue)': 'https://www.geeksforgeeks.org/problems/rotten-oranges3003/1',
  'Next Smaller Element': 'https://www.geeksforgeeks.org/problems/next-smaller-element/1',
  'Circular Tour (Gas Station Problem)': 'https://www.geeksforgeeks.org/problems/circular-tour-1587115620/1',
  'Efficiently Implement K-Stacks in a Single Array': 'https://www.geeksforgeeks.org/efficiently-implement-k-stacks-single-array/',
  'Iterative Tower of Hanoi': 'https://www.geeksforgeeks.org/iterative-tower-of-hanoi/',
  'Maximum of Minimums for Every Window Size in an Array': 'https://www.geeksforgeeks.org/problems/maximum-of-minimum-for-every-window-size3453/1',
  'LRU Cache Implementation': 'https://www.geeksforgeeks.org/problems/lru-cache/1',
  'Find a Tour That Visits All Petrol Pumps/Stations': 'https://www.geeksforgeeks.org/problems/circular-tour-1587115620/1',

  // Greedy
  'Activity Selection Problem': 'https://www.geeksforgeeks.org/problems/activity-selection-1587115620/1',
  'Greedy Algorithm for Minimum Number of Coins': 'https://www.geeksforgeeks.org/problems/coin-change2514/1',
  'Minimum Sum of Two Numbers Formed From Digits of an Array': 'https://www.geeksforgeeks.org/problems/minimum-sum4058/1',
  'Minimum Sum Absolute Difference Pairs of Two Arrays': 'https://www.geeksforgeeks.org/minimum-sum-absolute-difference-pairs-two-arrays/',
  'Find Maximum Height Pyramid From the Given Array of Objects': 'https://www.geeksforgeeks.org/find-maximum-height-pyramid-from-the-given-array-of-objects/',
  'Minimum Cost for Acquiring All Coins with K Extra Coins Allowed': 'https://www.geeksforgeeks.org/minimum-cost-for-acquiring-all-coins-with-k-extra-coins-allowed/',
  'Find Maximum Equal Sum of Every Three Stacks': 'https://www.geeksforgeeks.org/problems/find-maximum-equal-sum-of-three-stacks/1',
  'Job Sequencing Problem': 'https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1',
  'Greedy Algorithm for Egyptian Fraction': 'https://www.geeksforgeeks.org/greedy-algorithm-egyptian-fraction/',
  'Fractional Knapsack Problem': 'https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1',
  'Maximum Length Chain of Pairs': 'https://www.geeksforgeeks.org/problems/max-length-chain/1',
  'Find Smallest Number with Given Number of Digits and Digit Sum': 'https://www.geeksforgeeks.org/problems/smallest-number5829/1',
  'Maximize Sum of Consecutive Differences in a Circular Array': 'https://www.geeksforgeeks.org/problems/swap-and-maximize5859/1',
  'Paper Cut into Minimum Number of Squares': 'https://www.geeksforgeeks.org/paper-cut-minimum-number-squares/',
  'Lexicographically Smallest Array After K Consecutive Swaps': 'https://www.geeksforgeeks.org/lexicographically-smallest-array-k-consecutive-swaps/',
  'CHOCOLA - Chocolate Cut Problem': 'https://www.geeksforgeeks.org/minimum-cost-to-cut-a-board-into-squares/',
  'Find Minimum Time to Finish All Jobs with Given Constraints': 'https://www.geeksforgeeks.org/find-minimum-time-to-finish-all-jobs-with-given-constraints/',
  'Job Sequencing Using Disjoint Set Union (DSU)': 'https://www.geeksforgeeks.org/job-sequencing-using-disjoint-set-union/',
  'Rearrange Characters in String Such That No Two Adjacent Are Same': 'https://www.geeksforgeeks.org/problems/rearrange-characters4649/1',
  'Minimum Edges to Reverse to Make Path from Source to Destination': 'https://www.geeksforgeeks.org/minimum-edges-reverse-make-path-source-destination/',
  'Minimize Cash Flow Among a Given Set of Friends': 'https://www.geeksforgeeks.org/minimize-cash-flow-among-given-set-friends-borrowed-money/',
  'Minimum Cost to Cut a Board into Squares': 'https://www.geeksforgeeks.org/minimum-cost-to-cut-a-board-into-squares/',

  // Binary Trees
  'Maximum Depth / Height of Binary Tree': 'https://www.geeksforgeeks.org/problems/height-of-binary-tree/1',
  'Reverse Level Order Traversal': 'https://www.geeksforgeeks.org/problems/reverse-level-order-traversal/1',
  'Subtree of Another Tree': 'https://www.geeksforgeeks.org/problems/check-if-subtree/1',
  'Invert / Flip Binary Tree': 'https://www.geeksforgeeks.org/problems/mirror-tree/1',
  'Binary Tree Level Order Traversal': 'https://www.geeksforgeeks.org/problems/level-order-traversal/1',
  'Left View of Binary Tree': 'https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1',
  'Right View of Binary Tree': 'https://www.geeksforgeeks.org/problems/right-view-of-binary-tree/1',
  'ZigZag Tree Traversal': 'https://www.geeksforgeeks.org/problems/zigzag-tree-traversal/1',
  'Create a Mirror Tree From the Given Binary Tree': 'https://www.geeksforgeeks.org/problems/mirror-tree/1',
  'Check if All Leaves Are at Same Level': 'https://www.geeksforgeeks.org/problems/leaf-at-same-level/1',
  'Check for Balanced Tree': 'https://www.geeksforgeeks.org/problems/check-for-balanced-tree/1',
  'Transform to Sum Tree': 'https://www.geeksforgeeks.org/problems/transform-to-sum-tree/1',
  'Check if Tree is Isomorphic': 'https://www.geeksforgeeks.org/problems/check-if-tree-is-isomorphic/1',
  'Same Tree Check': 'https://www.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1',
  'Construct Binary Tree from Preorder and Inorder Traversal': 'https://www.geeksforgeeks.org/problems/construct-tree-1/1',
  'Height of Binary Tree': 'https://www.geeksforgeeks.org/problems/height-of-binary-tree/1',
  'Diameter of a Binary Tree': 'https://www.geeksforgeeks.org/problems/diameter-of-binary-tree/1',
  'Top View of Binary Tree': 'https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1',
  'Bottom View of Binary Tree': 'https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1',
  'Diagonal Traversal of Binary Tree': 'https://www.geeksforgeeks.org/problems/diagonal-traversal-of-binary-tree/1',
  'Boundary Traversal of Binary Tree': 'https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1',
  'Construct Binary Tree from String with Brackets': 'https://www.geeksforgeeks.org/problems/construct-binary-tree-from-string-with-bracket-representation/1',
  'Minimum Swap Required to Convert Binary Tree to Binary Search Tree': 'https://www.geeksforgeeks.org/problems/minimum-swap-required-to-convert-binary-tree-to-binary-search-tree/1',
  'Duplicate Subtree in Binary Tree': 'https://www.geeksforgeeks.org/problems/duplicate-subtree-in-binary-tree/1',
  'Check if a Given Graph is Tree or Not': 'https://www.geeksforgeeks.org/check-given-graph-tree/',
  'Lowest Common Ancestor in a Binary Tree': 'https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-binary-tree/1',
  'Min Distance Between Two Given Nodes of a Binary Tree': 'https://www.geeksforgeeks.org/problems/min-distance-between-two-given-nodes-of-a-binary-tree/1',
  'Duplicate Subtrees Detection': 'https://www.geeksforgeeks.org/problems/duplicate-subtrees/1',
  'Kth Ancestor of a Node in Binary Tree': 'https://www.geeksforgeeks.org/problems/kth-ancestor-in-a-tree/1',
  'Binary Tree Maximum Path Sum': 'https://www.geeksforgeeks.org/problems/maximum-path-sum-from-any-node/1',
  'Serialize and Deserialize Binary Tree': 'https://www.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1',
  'Binary Tree to Doubly Linked List (DLL)': 'https://www.geeksforgeeks.org/problems/binary-tree-to-dll/1',
  'Print All K-Sum Paths in a Binary Tree': 'https://www.geeksforgeeks.org/problems/k-sum-paths/1',

  // Binary Search Trees
  'Lowest Common Ancestor of a Binary Search Tree': 'https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-bst/1',
  'Binary Search Tree - Search and Insertion': 'https://www.geeksforgeeks.org/problems/search-a-node-in-bst/1',
  'Minimum Element in BST': 'https://www.geeksforgeeks.org/problems/minimum-element-in-bst/1',
  'Inorder Predecessor and Successor in BST': 'https://www.geeksforgeeks.org/problems/predecessor-and-successor/1',
  'Check Whether BST Contains Dead End': 'https://www.geeksforgeeks.org/problems/check-whether-bst-contains-dead-end/1',
  'Binary Tree to BST Conversion': 'https://www.geeksforgeeks.org/problems/binary-tree-to-bst/1',
  'Kth Largest Element in BST': 'https://www.geeksforgeeks.org/problems/kth-largest-element-in-bst/1',
  'Validate Binary Search Tree': 'https://www.geeksforgeeks.org/problems/check-for-bst/1',
  'Kth Smallest Element in a BST': 'https://www.geeksforgeeks.org/problems/find-k-th-smallest-element-in-bst/1',
  'Delete Node in a BST': 'https://www.geeksforgeeks.org/problems/delete-a-node-from-bst/1',
  'Flatten BST to Sorted List': 'https://www.geeksforgeeks.org/problems/flatten-bst-to-sorted-list/1',
  'Preorder to Postorder Traversal of BST': 'https://www.geeksforgeeks.org/problems/preorder-to-postorder4423/1',
  'Count BST Nodes That Lie in a Given Range': 'https://www.geeksforgeeks.org/problems/count-bst-nodes-that-lie-in-a-given-range/1',
  'Populate Inorder Successor for All Nodes': 'https://www.geeksforgeeks.org/problems/populate-inorder-successor-for-all-nodes/1',
  'Convert Normal BST to Balanced BST': 'https://www.geeksforgeeks.org/problems/normal-bst-to-balanced-bst/1',
  'Merge Two BSTs': 'https://www.geeksforgeeks.org/problems/merge-two-bst-s/1',
  'Given N Appointments, Find All Conflicting Appointments': 'https://www.geeksforgeeks.org/given-n-appointments-find-conflicting-appointments/',
  'Replace Every Element with the Least Greater Element on Its Right': 'https://www.geeksforgeeks.org/problems/replace-every-element-with-the-least-greater-element-on-its-right/1',
  'Construct BST from Given Preorder Traversal': 'https://www.geeksforgeeks.org/problems/construct-bst-from-given-preorder-traversal/1',
  'Find Median of BST in O(n) Time and O(1) Space': 'https://www.geeksforgeeks.org/problems/median-of-bst/1',
  'Largest BST in a Binary Tree': 'https://www.geeksforgeeks.org/problems/largest-bst/1',

  // Heaps & Hashing
  'Choose K Array Elements Such That Difference of Max and Min is Minimized': 'https://www.geeksforgeeks.org/minimum-sum-absolute-difference-pairs-two-arrays/',
  'Heap Sort': 'https://www.geeksforgeeks.org/problems/heap-sort/1',
  'Top K Frequent Elements': 'https://www.geeksforgeeks.org/problems/top-k-frequent-elements-in-array/1',
  'K Largest Elements in an Array': 'https://www.geeksforgeeks.org/problems/k-largest-elements3726/1',
  'Kth Smallest/Largest Element in Unsorted Array': 'https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1',
  'Find the Maximum Repeating Number in O(n) Time and O(1) Extra Space': 'https://www.geeksforgeeks.org/problems/maximum-repeating-number4802/1',
  'K-th Smallest Element After Removing Some Integers from Natural Numbers': 'https://www.geeksforgeeks.org/k-th-smallest-element-after-removing-some-integers-from-natural-numbers/',
  'Find K Closest Elements to a Given Value': 'https://www.geeksforgeeks.org/problems/find-k-closest-elements3631/1',
  'Kth Largest Element in a Stream': 'https://www.geeksforgeeks.org/problems/kth-largest-element-in-a-stream2220/1',
  'Connect Ropes with Minimum Cost': 'https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1',
  'Cuckoo Hashing': 'https://www.geeksforgeeks.org/cuckoo-hashing-farm-structure/',
  'Itinerary from a List of Tickets': 'https://www.geeksforgeeks.org/find-itinerary-from-a-given-list-of-tickets/',
  'Largest Subarray with 0 Sum': 'https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1',
  'Count Distinct Elements in Every Window of Size K': 'https://www.geeksforgeeks.org/problems/count-distinct-elements-in-every-window/1',
  'Group Shifted Strings': 'https://www.geeksforgeeks.org/group-shifted-string/',
  'Find Median from Data Stream': 'https://www.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1',
  'Sliding Window Maximum': 'https://www.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1',
  'Find the Smallest Positive Number Missing from Array': 'https://www.geeksforgeeks.org/problems/smallest-positive-missing-number-1587115621/1',
  'Find Surpasser Count of Each Element in Array': 'https://www.geeksforgeeks.org/surpasser-count-of-each-element-in-array/',
  'Tournament Tree and Binary Heap': 'https://www.geeksforgeeks.org/tournament-tree-and-binary-heap/',
  'Check for Palindrome after Anagram': 'https://www.geeksforgeeks.org/problems/anagram-palindrome4708/1',
  'Length of the Largest Subarray with Contiguous Elements': 'https://www.geeksforgeeks.org/length-largest-subarray-contiguous-elements-set-1/',
  'Palindrome Substring Queries': 'https://www.geeksforgeeks.org/palindrome-substring-queries/',
  'Subarray Distinct Elements Sum': 'https://www.geeksforgeeks.org/sum-of-number-of-distinct-elements-for-all-subarrays/',
  'Find the Recurring Function': 'https://www.geeksforgeeks.org/find-recurring-sequence-fraction/',
  'K Maximum Sum Combinations from Two Arrays': 'https://www.geeksforgeeks.org/problems/k-max-sum-combinations/1',

  // Graphs
  'Breadth First Search (BFS) Traversal': 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1',
  'Depth First Search (DFS) Traversal': 'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1',
  'Flood Fill Algorithm': 'https://www.geeksforgeeks.org/problems/flood-fill-algorithm1856/1',
  'Number of Triangles in a Directed and Undirected Graph': 'https://www.geeksforgeeks.org/number-of-triangles-in-a-directed-and-undirected-graph/',
  'Detect Cycle in a Directed Graph': 'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1',
  'Detect Cycle in an Undirected Graph': 'https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1',
  'Steps by Knight (Minimum Steps to Reach Target)': 'https://www.geeksforgeeks.org/problems/steps-by-knight5927/1',
  'Clone Graph': 'https://www.geeksforgeeks.org/problems/clone-graph/1',
  'Number of Operations to Make Network Connected': 'https://www.geeksforgeeks.org/problems/number-of-operations-to-make-network-connected/1',
  "Dijkstra's Shortest Path Algorithm": 'https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1',
  'Topological Sort': 'https://www.geeksforgeeks.org/problems/topological-sort/1',
  'Oliver and the Game': 'https://www.geeksforgeeks.org/oliver-and-the-game/',
  'Minimum Time Taken by Each Job to be Completed Given DAG': 'https://www.geeksforgeeks.org/problems/minimum-time-taken-by-each-job-to-be-completed-given-by-a-directed-acyclic-graph/1',
  'Find Whether it is Possible to Finish All Tasks or Not (Course Schedule)': 'https://www.geeksforgeeks.org/problems/prerequisite-tasks/1',
  'Find the Number of Islands': 'https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1',
  "Prim's Minimum Spanning Tree Algorithm": 'https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1',
  'Negative Weight Cycle Detection': 'https://www.geeksforgeeks.org/problems/negative-weight-cycle3504/1',
  'Floyd Warshall Algorithm (All Pairs Shortest Path)': 'https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2012/1',
  'Graph Coloring Problem': 'https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1',
  'Snakes and Ladders Game Solver': 'https://www.geeksforgeeks.org/problems/snake-and-ladder-problem4816/1',
  "Kosaraju's Algorithm for Strongly Connected Components": 'https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algorithm/1',
  'Journey to the Moon': 'https://www.geeksforgeeks.org/journey-to-the-moon/',
  'Vertex Cover Problem': 'https://www.geeksforgeeks.org/vertex-cover-problem-set-1-introduction-and-approximate-algorithm/',
  'Cheapest Flights Within K Stops': 'https://www.geeksforgeeks.org/problems/cheapest-flights-within-k-stops/1',
  'Find if There is a Path of More Than K Length from Source': 'https://www.geeksforgeeks.org/find-if-there-is-a-path-of-more-than-k-length-from-a-source/',
  'Bellman Ford Shortest Path Algorithm': 'https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1',
  'Bipartite Graph Check': 'https://www.geeksforgeeks.org/problems/bipartite-graph/1',
  'Word Ladder (Shortest Transformation Sequence)': 'https://www.geeksforgeeks.org/problems/word-ladder/1',
  'Alien Dictionary (Topological Sort)': 'https://www.geeksforgeeks.org/problems/alien-dictionary/1',
  "Kruskal's Minimum Spanning Tree Algorithm": 'https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1',
  'Total Number of Spanning Trees in a Graph': 'https://www.geeksforgeeks.org/problems/total-number-of-spanning-trees-in-a-graph/1',
  'Travelling Salesman Problem': 'https://www.geeksforgeeks.org/problems/travelling-salesman-problem2731/1',
  'Find Longest Path in Directed Acyclic Graph': 'https://www.geeksforgeeks.org/problems/find-longest-path-in-a-directed-acyclic-graph/1',
  'Two Clique Problem': 'https://www.geeksforgeeks.org/two-clique-problem-check-if-graph-can-be-divided-into-two-cliques/',
  'Minimise Cash Flow Among Friends': 'https://www.geeksforgeeks.org/minimize-cash-flow-among-given-set-friends-borrowed-money/',
  'Chinese Postman Problem': 'https://www.geeksforgeeks.org/chinese-postman-problem-set-1-introduction/',
  'Water Jug Problem Using BFS': 'https://www.geeksforgeeks.org/water-jug-problem-using-bfs/',
  'Water Jug Problem 2': 'https://www.geeksforgeeks.org/problems/water-jug-problem/1',

  // Tries
  'Construct a Trie from Scratch (Insert & Search)': 'https://www.geeksforgeeks.org/problems/trie-insert-and-search0651/1',
  'Print Unique Rows in a Given Boolean Matrix': 'https://www.geeksforgeeks.org/problems/unique-rows-in-boolean-matrix/1',
  'Word Break Problem using Trie': 'https://www.geeksforgeeks.org/problems/word-break1352/1',
  'Given a Sequence of Words, Print All Anagrams Together': 'https://www.geeksforgeeks.org/problems/print-anagrams-together/1',
  'Find Shortest Unique Prefix for Every Word in a List': 'https://www.geeksforgeeks.org/problems/shortest-unique-prefix-for-every-word/1',
  'Implement a Phone Directory using Trie': 'https://www.geeksforgeeks.org/problems/phone-directory4601/1',

  // Dynamic Programming
  'Knapsack with Duplicate Items (Unbounded Knapsack)': 'https://www.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1',
  'BBT Counter (Balanced Binary Trees Count)': 'https://www.geeksforgeeks.org/problems/bbt-counter4312/1',
  'Reach a Given Score': 'https://www.geeksforgeeks.org/problems/reach-a-given-score-1587115621/1',
  'Maximum Difference of Zeros and Ones in Binary String': 'https://www.geeksforgeeks.org/problems/maximum-difference-of-zeros-and-ones-in-binary-string4111/1',
  'Climbing Stairs': 'https://www.geeksforgeeks.org/problems/count-ways-to-reach-the-nth-stair-1587115620/1',
  'Permutation Coefficient': 'https://www.geeksforgeeks.org/permutation-coefficient/',
  'Longest Repeating Subsequence': 'https://www.geeksforgeeks.org/problems/longest-repeating-subsequence2004/1',
  'Pairs with Specific Difference': 'https://www.geeksforgeeks.org/problems/pairs-with-specific-difference1545/1',
  'Longest Subsequence Such That Difference Between Adjacents is One': 'https://www.geeksforgeeks.org/problems/longest-subsequence-such-that-difference-between-adjacents-is-one4724/1',
  'Coin Change Problem': 'https://www.geeksforgeeks.org/problems/coin-change2514/1',
  'Longest Increasing Subsequence (LIS)': 'https://www.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1',
  'Longest Common Subsequence (LCS)': 'https://www.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1',
  'Word Break Problem': 'https://www.geeksforgeeks.org/problems/word-break1352/1',
  'Combination Sum IV': 'https://www.geeksforgeeks.org/problems/combination-sum-iv/1',
  'House Robber': 'https://www.geeksforgeeks.org/problems/stickler-theif-1587115621/1',
  'House Robber II': 'https://www.geeksforgeeks.org/problems/house-robber-ii/1',
  'Decode Ways': 'https://www.geeksforgeeks.org/problems/total-decoding-messages1235/1',
  'Unique Paths': 'https://www.geeksforgeeks.org/problems/number-of-paths0926/1',
  'Jump Game': 'https://www.geeksforgeeks.org/problems/jump-game/1',
  '0/1 Knapsack Problem': 'https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1',
  'nCr Computation using Dynamic Programming': 'https://www.geeksforgeeks.org/problems/ncr1019/1',
  'Catalan Number Computation': 'https://www.geeksforgeeks.org/problems/nth-catalan-number0817/1',
  'Edit Distance': 'https://www.geeksforgeeks.org/problems/edit-distance3702/1',
  'Subset Sum Problem': 'https://www.geeksforgeeks.org/problems/subset-sum-problem1611/1',
  'Gold Mine Problem': 'https://www.geeksforgeeks.org/problems/gold-mine-problem2608/1',
  'Assembly Line Scheduling': 'https://www.geeksforgeeks.org/assembly-line-scheduling-dp-34/',
  'Maximize the Cut Segments': 'https://www.geeksforgeeks.org/problems/cutted-segments1642/1',
  'Maximum Sum Increasing Subsequence': 'https://www.geeksforgeeks.org/problems/maximum-sum-increasing-subsequence4749/1',
  'Count All Subsequences Having Product Less Than K': 'https://www.geeksforgeeks.org/problems/count-all-subsequences-having-product-less-than-k/1',
  'Egg Dropping Puzzle': 'https://www.geeksforgeeks.org/problems/egg-dropping-puzzle-1587115620/1',
  'Max Length Chain of Pairs': 'https://www.geeksforgeeks.org/problems/max-length-chain/1',
  'Largest Square in Matrix (Maximal Square)': 'https://www.geeksforgeeks.org/problems/largest-square-formed-in-a-matrix0806/1',
  'Maximum Path Sum in Matrix': 'https://www.geeksforgeeks.org/problems/path-in-matrix3805/1',
  'Minimum Number of Jumps to Reach End': 'https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1',
  'Minimum Removals from Array to Make Max - Min <= K': 'https://www.geeksforgeeks.org/problems/minimum-removals-from-array/1',
  'Longest Common Substring': 'https://www.geeksforgeeks.org/problems/longest-common-substring1429/1',
  'Longest Palindromic Subsequence': 'https://www.geeksforgeeks.org/problems/longest-palindromic-subsequence-1612325078/1',
  'Longest Alternating Subsequence': 'https://www.geeksforgeeks.org/problems/longest-alternating-subsequence5951/1',
  'Weighted Job Scheduling': 'https://www.geeksforgeeks.org/weighted-job-scheduling/',
  'Coin Game Strategy': 'https://www.geeksforgeeks.org/coin-game-winner-every-player-three-choices/',
  'Coin Game Winner': 'https://www.geeksforgeeks.org/coin-game-winner-every-player-three-choices/',
  'Optimal Strategy for a Game': 'https://www.geeksforgeeks.org/problems/optimal-strategy-for-a-game-1587115620/1',
  'Word Wrap Problem (DP Solution)': 'https://www.geeksforgeeks.org/problems/word-wrap1646/1',
  'Mobile Numeric Keypad Problem': 'https://www.geeksforgeeks.org/problems/mobile-numeric-keypad5456/1',
  'Maximum Length of Pair Chain': 'https://www.geeksforgeeks.org/problems/max-length-chain/1',
  'Matrix Chain Multiplication': 'https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1',
  'Maximum Profit by Buying and Selling a Share at Most Twice': 'https://www.geeksforgeeks.org/problems/buy-and-sell-a-share-at-most-twice/1',
  'Optimal Binary Search Tree': 'https://www.geeksforgeeks.org/problems/optimal-binary-search-tree0545/1',
  'Largest Submatrix with Sum 0': 'https://www.geeksforgeeks.org/problems/largest-submatrix-with-sum-0/1',
  'Largest Area Rectangular Sub-matrix with Equal Number of 1s and 0s': 'https://www.geeksforgeeks.org/problems/largest-area-rectangular-sub-matrix-with-equal-number-of-1s-and-0s/1',

  // Bit Manipulation
  'Find the Two Non-Repeating Elements in an Array of Repeating Elements': 'https://www.geeksforgeeks.org/problems/two-numbers-with-odd-occurrences5846/1',
  'Program to Find Whether a Number is Power of Two': 'https://www.geeksforgeeks.org/problems/power-of-2-1587115620/1',
  'Find Position of the Only Set Bit': 'https://www.geeksforgeeks.org/problems/find-position-of-set-bit3706/1',
  'Count Number of Bits to be Flipped to Convert A to B': 'https://www.geeksforgeeks.org/problems/bit-difference-1587115620/1',
  'Count Total Set Bits in All Numbers from 1 to N': 'https://www.geeksforgeeks.org/problems/count-total-set-bits-1587115620/1',
  'Copy Set Bits in a Range': 'https://www.geeksforgeeks.org/problems/copy-set-bits-in-a-range3337/1',
  'Calculate Square of a Number Without Using *, / and pow()': 'https://www.geeksforgeeks.org/calculate-square-of-a-number-without-using-and-pow/',
  'Divide Two Integers Without Using Multiplication, Division and Mod Operator': 'https://www.geeksforgeeks.org/problems/division-without-using-multiplication-division-and-mod-operator/1',
  'Power Set': 'https://www.geeksforgeeks.org/problems/power-set4302/1',

  // Segment Trees
  'Range Sum Query - Immutable': 'https://www.geeksforgeeks.org/problems/range-sum-query-immutable/1',
  'Range Minimum Query': 'https://www.geeksforgeeks.org/problems/range-minimum-query/1',
  'Range Sum Query - Mutable': 'https://www.geeksforgeeks.org/problems/range-sum-query-mutable/1',
  'Create Sorted Array through Instructions': 'https://www.geeksforgeeks.org/create-sorted-array-through-instructions/',
  'Count of Range Sum': 'https://www.geeksforgeeks.org/count-of-range-sum/',
  'Count of Smaller Numbers After Self': 'https://www.geeksforgeeks.org/problems/count-smaller-elements2214/1',
};

// Exact LeetCode problem slugs for CampusOS 375 questions
const LEETCODE_DIRECT_SLUGS: Record<string, string> = {
  // Arrays
  'Maximum and Minimum Element in an Array': 'number-of-senior-citizens',
  'Reverse the Array': 'reverse-string',
  "Maximum Subarray (Kadane's Algorithm)": 'maximum-subarray',
  'Contains Duplicate': 'contains-duplicate',
  'Search in Rotated Sorted Array': 'search-in-rotated-sorted-array',
  'Next Permutation': 'next-permutation',
  'Best Time to Buy and Sell Stock': 'best-time-to-buy-and-sell-stock',
  'Repeat and Missing Number Array': 'set-mismatch',
  'Kth-Largest Element in an Array': 'kth-largest-element-in-an-array',
  'Trapping Rain Water': 'trapping-rain-water',
  'Product of Array Except Self': 'product-of-array-except-self',
  'Maximum Product Subarray': 'maximum-product-subarray',
  'Find Minimum in Rotated Sorted Array': 'find-minimum-in-rotated-sorted-array',
  'Find Pair with Sum in Sorted & Rotated Array': 'two-sum-ii-input-array-is-sorted',
  '3Sum': '3sum',
  'Container With Most Water': 'container-with-most-water',
  'Given Sum Pair': 'two-sum',
  'Kth - Smallest Element': 'kth-largest-element-in-an-array',
  'Merge Overlapping Intervals': 'merge-intervals',
  'Subarray Sum Divisible K': 'subarray-sums-divisible-by-k',
  'Given an Array of Numbers Arrange the Numbers to Form the Biggest Number': 'largest-number',

  // Strings
  'Valid Palindrome': 'valid-palindrome',
  'Valid Anagram': 'valid-anagram',
  'Valid Parentheses': 'valid-parentheses',
  'Remove Consecutive Characters': 'remove-all-adjacent-duplicates-in-string',
  'Longest Common Prefix': 'longest-common-prefix',
  'Longest Substring Without Repeating Characters': 'longest-substring-without-repeating-characters',
  'Longest Repeating Character Replacement': 'longest-repeating-character-replacement',
  'Group Anagrams': 'group-anagrams',
  'Longest Palindromic Substring': 'longest-palindromic-substring',
  'Palindromic Substrings': 'palindromic-substrings',
  'Minimum Window Substring': 'minimum-window-substring',
  'Wildcard String Matching': 'wildcard-matching',
  'Smallest Window in a String Containing all the Characters of Another String': 'minimum-window-substring',

  // 2D Arrays
  'Zigzag (or Diagonal) Traversal of Matrix': 'diagonal-traverse',
  'Set Matrix Zeroes': 'set-matrix-zeroes',
  'Spiral Matrix': 'spiral-matrix',
  'Rotate Image (Rotate Matrix)': 'rotate-image',
  'Word Search': 'word-search',
  'Find the Number of Islands (Using DFS)': 'number-of-islands',
  'Given a Matrix of O and X, Replace O with X if Surrounded by X': 'surrounded-regions',
  'Maximum Size Rectangle of all 1s': 'maximal-rectangle',

  // Searching & Sorting
  'Majority Element': 'majority-element',
  'Merge Sorted Arrays using O(1) Extra Space': 'merge-sorted-array',
  'Find Four Elements that Sum to a Given Value': '4sum',
  'Median of Two Sorted Arrays with Different Sizes': 'median-of-two-sorted-arrays',
  'Median of Stream of Running Integers': 'find-median-from-data-stream',

  // Backtracking
  'Combinational Sum': 'combination-sum',
  'Printing All Solutions in N-Queen Problem': 'n-queens',
  'Solve the Sudoku': 'sudoku-solver',
  'Partition Equal Subset Sum': 'partition-equal-subset-sum',
  'Remove Invalid Parentheses': 'remove-invalid-parentheses',
  'Word Break Problem using Backtracking': 'word-break-ii',
  'Print All Palindromic Partitions of a String': 'palindrome-partitioning',

  // Linked List
  'Reverse Linked List': 'reverse-linked-list',
  'Linked List Cycle Detection': 'linked-list-cycle',
  'Merge Two Sorted Lists': 'merge-two-sorted-lists',
  'Delete Node in a Linked List (Without Head Pointer)': 'delete-node-in-a-linked-list',
  'Remove Nth Node From End of List': 'remove-nth-node-from-end-of-list',
  'Reorder List': 'reorder-list',
  'Intersection Point of Two Linked Lists': 'intersection-of-two-linked-lists',
  'Merge K Sorted Lists': 'merge-k-sorted-lists',
  'Delete Nodes Which Have a Greater Value on Right Side': 'remove-nodes-from-linked-list',
  'Segregate Even and Odd Nodes in a Linked List': 'odd-even-linked-list',
  'Sum of Two Linked Lists': 'add-two-numbers',
  'Clone a Linked List with Next and Random Pointer': 'copy-list-with-random-pointer',
  'Flatten a Multilevel Doubly Linked List': 'flatten-a-multilevel-doubly-linked-list',

  // Stacks & Queues
  'Evaluation of Postfix Expression': 'evaluate-reverse-polish-notation',
  'Implement Stack using Queues': 'implement-stack-using-queues',
  'Design and Implement Special Stack (GetMin in O(1))': 'min-stack',
  'Longest Valid String of Parentheses': 'longest-valid-parentheses',
  'Next Greater Element': 'next-greater-element-i',
  'Distance of Nearest Cell Having 1 in a Binary Matrix': '01-matrix',
  'Rotten Oranges (BFS with Queue)': 'rotting-oranges',
  'Circular Tour (Gas Station Problem)': 'gas-station',
  'LRU Cache Implementation': 'lru-cache',

  // Greedy
  'Maximum Length Chain of Pairs': 'maximum-length-of-pair-chain',
  'Rearrange Characters in String Such That No Two Adjacent Are Same': 'reorganize-string',
  'Itinerary from a List of Tickets': 'reconstruct-itinerary',

  // Binary Trees
  'Maximum Depth / Height of Binary Tree': 'maximum-depth-of-binary-tree',
  'Reverse Level Order Traversal': 'binary-tree-level-order-traversal-ii',
  'Subtree of Another Tree': 'subtree-of-another-tree',
  'Invert / Flip Binary Tree': 'invert-binary-tree',
  'Binary Tree Level Order Traversal': 'binary-tree-level-order-traversal',
  'Right View of Binary Tree': 'binary-tree-right-side-view',
  'ZigZag Tree Traversal': 'binary-tree-zigzag-level-order-traversal',
  'Check for Balanced Tree': 'balanced-binary-tree',
  'Same Tree Check': 'same-tree',
  'Construct Binary Tree from Preorder and Inorder Traversal': 'construct-binary-tree-from-preorder-and-inorder-traversal',
  'Diameter of a Binary Tree': 'diameter-of-binary-tree',
  'Duplicate Subtree in Binary Tree': 'find-duplicate-subtrees',
  'Check if a Given Graph is Tree or Not': 'graph-valid-tree',
  'Lowest Common Ancestor in a Binary Tree': 'lowest-common-ancestor-of-a-binary-tree',
  'Duplicate Subtrees Detection': 'find-duplicate-subtrees',
  'Binary Tree Maximum Path Sum': 'binary-tree-maximum-path-sum',
  'Serialize and Deserialize Binary Tree': 'serialize-and-deserialize-binary-tree',

  // Binary Search Trees
  'Lowest Common Ancestor of a Binary Search Tree': 'lowest-common-ancestor-of-a-binary-search-tree',
  'Binary Search Tree - Search and Insertion': 'search-in-a-binary-search-tree',
  'Validate Binary Search Tree': 'validate-binary-search-tree',
  'Kth Smallest Element in a BST': 'kth-smallest-element-in-a-bst',
  'Delete Node in a BST': 'delete-node-in-a-bst',
  'Construct BST from Given Preorder Traversal': 'construct-binary-search-tree-from-preorder-traversal',

  // Heaps & Hashing
  'Top K Frequent Elements': 'top-k-frequent-elements',
  'K Largest Elements in an Array': 'kth-largest-element-in-an-array',
  'Find K Closest Elements to a Given Value': 'find-k-closest-elements',
  'Kth Largest Element in a Stream': 'kth-largest-element-in-a-stream',
  'Group Shifted Strings': 'group-shifted-strings',
  'Find Median from Data Stream': 'find-median-from-data-stream',
  'Sliding Window Maximum': 'sliding-window-maximum',
  'Find the Smallest Positive Number Missing from Array': 'first-missing-positive',

  // Graphs
  'Flood Fill Algorithm': 'flood-fill',
  'Clone Graph': 'clone-graph',
  'Number of Operations to Make Network Connected': 'number-of-operations-to-make-network-connected',
  'Find Whether it is Possible to Finish All Tasks or Not (Course Schedule)': 'course-schedule',
  'Find the Number of Islands': 'number-of-islands',
  'Snakes and Ladders Game Solver': 'snakes-and-ladders',
  'Cheapest Flights Within K Stops': 'cheapest-flights-within-k-stops',
  'Bipartite Graph Check': 'is-graph-bipartite',
  'Word Ladder (Shortest Transformation Sequence)': 'word-ladder',

  // Tries
  'Construct a Trie from Scratch (Insert & Search)': 'implement-trie-prefix-tree',

  // Dynamic Programming
  'Climbing Stairs': 'climbing-stairs',
  'Coin Change Problem': 'coin-change',
  'Longest Increasing Subsequence (LIS)': 'longest-increasing-subsequence',
  'Longest Common Subsequence (LCS)': 'longest-common-subsequence',
  'Word Break Problem': 'word-break',
  'Combination Sum IV': 'combination-sum-iv',
  'House Robber': 'house-robber',
  'House Robber II': 'house-robber-ii',
  'Decode Ways': 'decode-ways',
  'Unique Paths': 'unique-paths',
  'Jump Game': 'jump-game',
  'Edit Distance': 'edit-distance',
  'Egg Dropping Puzzle': 'super-egg-drop',
  'Max Length Chain of Pairs': 'maximum-length-of-pair-chain',
  'Largest Square in Matrix (Maximal Square)': 'maximal-square',
  'Minimum Number of Jumps to Reach End': 'jump-game-ii',
  'Longest Palindromic Subsequence': 'longest-palindromic-subsequence',
  'Weighted Job Scheduling': 'maximum-profit-in-job-scheduling',
  'Maximum Length of Pair Chain': 'maximum-length-of-pair-chain',
  'Maximum Profit by Buying and Selling a Share at Most Twice': 'best-time-to-buy-and-sell-stock-iii',

  // Bit Manipulation
  'Program to Find Whether a Number is Power of Two': 'power-of-two',
  'Count Number of Bits to be Flipped to Convert A to B': 'minimum-bit-flips-to-convert-number',
  'Power Set': 'subsets',
};

// Generates direct GeeksforGeeks practice/article URL
export function getGfgUrl(prob: { title: string; gfgUrl?: string; platformUrl?: string }): string | null {
  if (prob.gfgUrl && prob.gfgUrl.includes('geeksforgeeks.org')) {
    return prob.gfgUrl;
  }

  if (GFG_DIRECT_URLS[prob.title]) {
    return GFG_DIRECT_URLS[prob.title];
  }

  if (prob.platformUrl && prob.platformUrl.includes('geeksforgeeks.org')) {
    return prob.platformUrl;
  }

  const cleanTitle = getCleanTitle(prob.title);
  // Direct Google Search for GeeksforGeeks problem/article (never fails with 500)
  return `https://www.google.com/search?q=geeksforgeeks+${encodeURIComponent(cleanTitle)}`;
}

// Generates direct LeetCode problem URL or null if not available on LeetCode
export function getLeetcodeUrl(prob: { title: string; leetcodeUrl?: string; platformUrl?: string }): string | null {
  if (prob.leetcodeUrl && prob.leetcodeUrl.includes('leetcode.com/problems/')) {
    return prob.leetcodeUrl;
  }

  // Check known direct slug map
  if (LEETCODE_DIRECT_SLUGS[prob.title]) {
    return `https://leetcode.com/problems/${LEETCODE_DIRECT_SLUGS[prob.title]}/`;
  }

  if (prob.platformUrl && prob.platformUrl.includes('leetcode.com/problems/')) {
    return prob.platformUrl;
  }

  // Return null if problem is not available on LeetCode so button is removed from UI
  return null;
}

// Generates primary practice URL
export function getPracticeUrl(prob: { title: string; platformUrl?: string; gfgUrl?: string; leetcodeUrl?: string }): string {
  if (prob.leetcodeUrl && prob.leetcodeUrl.includes('leetcode.com/problems/')) {
    return prob.leetcodeUrl;
  }

  if (LEETCODE_DIRECT_SLUGS[prob.title]) {
    return `https://leetcode.com/problems/${LEETCODE_DIRECT_SLUGS[prob.title]}/`;
  }

  if (prob.gfgUrl && prob.gfgUrl.includes('geeksforgeeks.org')) {
    return prob.gfgUrl;
  }

  if (GFG_DIRECT_URLS[prob.title]) {
    return GFG_DIRECT_URLS[prob.title];
  }

  if (prob.platformUrl && !prob.platformUrl.includes('google.com/search')) {
    return prob.platformUrl;
  }

  const cleanTitle = getCleanTitle(prob.title);
  return `https://www.google.com/search?q=geeksforgeeks+${encodeURIComponent(cleanTitle)}`;
}
