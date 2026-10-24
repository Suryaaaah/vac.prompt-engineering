import type { WorkshopSession } from '../types';

export const WORKSHOP_SESSIONS: WorkshopSession[] = [
  {
    id: 1,
    title: 'Introduction to AI and Prompt Engineering',
    durationMinutes: 10,
    objectives: [
      'Demystify how Large Language Models predict tokens without human consciousness',
      'Explain the difference between search engines and generative models',
      'Frame prompt engineering as an essential developer superpower for 2026+'
    ],
    activityInstructions: 'Presenter shares live side-by-side demo: vague prompt ("Write a web app") vs structured prompt. Ask students in the audience to predict which one produces usable code.',
    learningOutcomes: [
      'Students understand why GIGO (Garbage In, Garbage Out) applies strongly to LLMs',
      'Appreciation that prompt engineering is rigorous interface design, not magic'
    ],
    speakerNotes: 'Keep energy high. Use relatable college analogies: treating the AI like an eager first-year junior intern who follows orders literally.'
  },
  {
    id: 2,
    title: 'Prompt Basics and Common Mistakes',
    durationMinutes: 15,
    objectives: [
      'Analyze the top 5 mistakes beginner students make with AI',
      'Introduce the core Prompt Anatomy model (Role, Task, Context, Constraints, Format)',
      'Explain context window limits and token truncation'
    ],
    activityInstructions: 'Display 3 common student prompt fails on screen. Students identify the missing element in each within 60 seconds using clickers or hand raises.',
    learningOutcomes: [
      'Ability to instantly spot ambiguous directives',
      'Knowledge of negative constraints (telling AI what NOT to do)'
    ],
    speakerNotes: 'Focus on how unstated assumptions ruin programming answers (e.g., Python 2 vs Python 3, missing error handling).'
  },
  {
    id: 3,
    title: 'Role, Task, Context, and Format Prompting',
    durationMinutes: 20,
    objectives: [
      'Master the mechanics of Role Priming for domain accuracy',
      'Learn to write high-impact imperative task descriptions',
      'Specify output schemas (Markdown tables, JSON, PlantUML diagrams)'
    ],
    activityInstructions: 'Students open the PromptCraft AI app. They take a weak prompt ("explain sorting") and incrementally add Role -> Task -> Context -> Format using guided steps.',
    learningOutcomes: [
      'Construct multi-part prompts with structured delimiters',
      'Command specific data structures and formats with zero conversational preamble'
    ],
    speakerNotes: 'Emphasize that role prompting is not roleplay—it activates domain-specific weights and technical vocabulary.'
  },
  {
    id: 4,
    title: 'Few-Shot and Advanced Prompting Approaches',
    durationMinutes: 15,
    objectives: [
      'Understand In-Context Learning and exemplar calibration',
      'Compare Zero-Shot vs One-Shot vs Few-Shot prompt efficiency',
      'Introduce Step-by-Step reasoning for complex logic and mathematics'
    ],
    activityInstructions: 'Live demonstration of prompt pattern matching: convert 3 unstructured log files into JSON tickets using a 2-shot prompt template.',
    learningOutcomes: [
      'Design reliable few-shot templates for deterministic schema outputs',
      'Structure algorithmic reasoning queries to avoid mathematical leaps'
    ],
    speakerNotes: 'Remind students that examples should be diverse and error-free, as the model copies flaws present in examples.'
  },
  {
    id: 5,
    title: 'Break and Questions',
    durationMinutes: 10,
    objectives: [
      'Allow mental consolidation and informal peer discussions',
      'Address open floor questions on prompt length, model differences, and token limits'
    ],
    activityInstructions: '10-minute break. Display an interactive countdown timer on the main projector screen with background lo-fi music.',
    learningOutcomes: [
      'Students refresh attention span before the hands-on lab block'
    ],
    speakerNotes: 'Circulate around the room to assist students having trouble loading the web app on their laptops.'
  },
  {
    id: 6,
    title: 'Hands-On Coding and Study Exercises',
    durationMinutes: 20,
    objectives: [
      'Put prompt techniques into direct practice on real engineering coursework',
      'Solve coding problems: debugging, refactoring, and test case generation',
      'Create academic study artifacts: revision timetables and concept maps'
    ],
    activityInstructions: 'Students work through 3 hands-on challenges from the workshop exercise bank: (1) Debug a recursive function, (2) Generate JUnit test edge cases, (3) Build a comparative database matrix.',
    learningOutcomes: [
      'Hands-on fluency applying the 5-part prompt framework under time constraints',
      'Confidence using AI responsibly for university lab assignments'
    ],
    speakerNotes: 'Encourage pair programming. Walk around and highlight standout student prompts on the projector.'
  },
  {
    id: 7,
    title: 'Before-and-After Prompt Improvement Activity',
    durationMinutes: 15,
    objectives: [
      'Use the PromptCraft AI Playground to transform weak student prompts',
      'Analyze the before-and-after metric score and element diagnostics',
      'Save improved prompts into local personal prompt libraries'
    ],
    activityInstructions: 'Students pick one weak prompt from their past week of college work and input it into the Prompt Playground. They review the generated improvements and save to their library.',
    learningOutcomes: [
      'Immediate practical upgrade to their day-to-day workflow',
      'Building a reusable repository of verified prompts'
    ],
    speakerNotes: 'Have 2 volunteers share their before-and-after transformations with the entire room.'
  },
  {
    id: 8,
    title: 'AI Verification and Ethics',
    durationMinutes: 10,
    objectives: [
      'Identify AI hallucinations, fabricated citations, and subtle code security flaws',
      'Adopt the 8-point Verification Checklist for academic and engineering tasks',
      'Address academic integrity, code plagiarism, and data privacy guardrails'
    ],
    activityInstructions: 'Analyze an AI-generated code snippet that contains a subtle SQL injection and an off-by-one loop error. Guide the room through verification.',
    learningOutcomes: [
      'Instinctive skepticism: treating every AI output as an unverified draft',
      'Understanding why student credentials and private data must never enter public AI tools'
    ],
    speakerNotes: 'Reiterate that AI does not replace engineering knowledge—it demands higher verification competence.'
  },
  {
    id: 9,
    title: 'Quiz and Feedback',
    durationMinutes: 5,
    objectives: [
      'Assess retention across the 12 core workshop concepts',
      'Celebrate top scores and reinforce topics requiring review',
      'Collect session feedback and issue workshop completion badges'
    ],
    activityInstructions: 'All students take the 12-question interactive quiz inside PromptCraft AI. Review aggregate score distribution and address the top missed question.',
    learningOutcomes: [
      'Quantified proof of learning progress stored in local storage',
      'Clear path for continuing self-paced exploration'
    ],
    speakerNotes: 'Congratulate the cohort! Remind them to export their prompt library and revisit the platform before midterms.'
  }
];

export const WORKSHOP_EXERCISES = [
  {
    id: 'ex-1',
    title: 'Lab Exercise 1: The Debugging Interrogator',
    scenario: 'You have a C++ program that crashes with a segmentation fault when inserting into a binary search tree.',
    starterPrompt: 'Fix my segmentation fault in BST insert function.',
    task: 'Upgrade this prompt using Role Prompting, minimal code snippet injection, memory inspection request, and valgrind diagnosis.',
    targetElements: ['Senior Systems Programmer Role', 'Explicit C++17 Standard', 'Valgrind Memory Trace Request', 'Edge Case Handling (Empty Tree)']
  },
  {
    id: 'ex-2',
    title: 'Lab Exercise 2: Algorithmic Comparative Matrix',
    scenario: 'Your professor asks for a comparative study between Dijkstra and Bellman-Ford algorithms for your viva.',
    starterPrompt: 'Compare Dijkstra and Bellman Ford.',
    task: 'Structure a prompt that commands a 6-row Markdown table, negative edge weight handling, and Big-O derivations.',
    targetElements: ['Markdown Table Schema', 'Negative Weight Cycle Edge Case', 'Time Complexity Derivation', 'Viva Question Generation']
  },
  {
    id: 'ex-3',
    title: 'Lab Exercise 3: Automated Unit Test Suite',
    scenario: 'You are submitting an e-commerce shopping cart module and need 100% boundary test coverage for discount vouchers.',
    starterPrompt: 'Write tests for discount voucher calculation.',
    task: 'Create a Few-Shot or Structured Task prompt that produces JUnit 5 parameterized test cases covering expired coupons, zero discount, 100% discount, and negative values.',
    targetElements: ['JUnit 5 Parameterized Format', 'Boundary Value Analysis', 'Equivalence Partitioning', 'Negative Constraints (No Mocks)']
  }
];
