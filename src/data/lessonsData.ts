import type { LessonModule } from '../types';

export const LESSONS_DATA: LessonModule[] = [
  {
    id: 1,
    slug: 'intro-to-prompting',
    title: 'Module 1: Introduction to Prompt Engineering',
    shortDesc: 'Master what prompts are, how LLMs process tokens, and why instruction structure directly dictates answer quality.',
    duration: '15 mins',
    explanation: `Prompt engineering is the systematic practice of designing, structuring, and refining natural language inputs to elicit precise, reliable, and high-utility outputs from Artificial Intelligence models.

For Computer Science students, thinking of an AI model as an eager junior developer or an associative compiler is helpful: it does not possess human intuition or telepathic insight into your project requirements. Instead, it statistically predicts the most probable next sequence of words based on the context window you provide.

When you send a vague prompt, the AI must guess your unstated assumptions (programming language version, error boundaries, performance constraints, code style). When you engineer your prompt, you eliminate ambiguity and guide the model directly to the optimal solution path.`,
    keyConcepts: [
      'Token prediction & probabilistic text generation',
      'Context windows and attention mechanisms',
      'The GIGO principle (Garbage In, Garbage Out) in AI',
      'Declarative vs. Ambiguous instructions'
    ],
    whenToUse: [
      'Every time you interact with modern AI models like Claude, GPT, or Gemini',
      'When generating code snippets, algorithms, or architectural diagrams',
      'When summarizing computer science textbooks or debugging compiler errors',
      'When preparing for viva voce questions or drafting technical reports'
    ],
    examples: [
      {
        title: 'Basic Coding Request',
        badPrompt: 'Write a program to reverse a string.',
        goodPrompt: 'Write a clean, idiomatic Java 17 method to reverse a string in-place using a two-pointer approach with char array. Include time and space complexity annotations and handle null/empty strings gracefully.',
        whyItWorks: 'The good prompt specifies the language version, algorithmic paradigm (two-pointer), space constraints (in-place), edge cases (null/empty), and complexity documentation.'
      },
      {
        title: 'Explaining a CS Concept',
        badPrompt: 'Explain how paging works.',
        goodPrompt: 'Explain the concept of Paging in Operating Systems for a 2nd-year CSE student preparing for semester exams. Include physical vs virtual address translation, Page Tables, and the role of the TLB (Translation Lookaside Buffer) in under 300 words with an ASCII diagram.',
        whyItWorks: 'Target audience, core sub-topics (Page Table, TLB), word count limit, and diagrammatic format are explicitly bounded.'
      },
      {
        title: 'Debugging an Error',
        badPrompt: 'Why is my program crashing with Segfault?',
        goodPrompt: 'I have a C program attempting to access an array index out of bounds. Analyze the following 20 lines of code, explain why the SIGSEGV occurs at line 14, and provide the fixed code with an explanation of memory safety.',
        whyItWorks: 'Points directly to the fault location, expected explanation depth, and asks for both fix and memory safety lesson.'
      }
    ],
    commonMistakes: [
      'Assuming the AI remembers details from external files without you pasting the relevant context.',
      'Using one-word or one-sentence prompts for complex technical tasks.',
      'Failing to specify language version, libraries, or operational constraints.',
      'Treating the model as an omniscient search engine rather than an instruction-following assistant.'
    ],
    practiceActivity: {
      task: 'Rewrite the weak prompt "Help me with binary search" into a high-precision prompt for a data structures lab exam.',
      starterPrompt: 'Help me with binary search',
      hint: 'Include target language, recursive vs iterative requirement, handling duplicates, time/space complexity, and edge cases like an empty array.',
      modelAnswer: 'Act as a Data Structures TA. Provide an iterative C++ implementation of Binary Search that returns the first occurrence index if duplicate keys exist. Include input edge cases (empty vector, target not present), step-by-step trace comments, and Big-O time and space complexity analysis.'
    }
  },
  {
    id: 2,
    slug: 'role-prompting',
    title: 'Module 2: Role Prompting',
    shortDesc: 'Harness persona and expertise priming to shape vocabulary, depth, perspective, and domain-specific rigor.',
    duration: '15 mins',
    explanation: `Role Prompting primes the AI model to adopt a specific professional persona, mindset, and perspective. Because Large Language Models are trained on vast corpora spanning casual internet chatter, academic papers, enterprise RFCs, and code repositories, assigning a role activates the latent weights and vocabulary associated with that specific domain.

If you ask "Review my code", you might get superficial syntax commentary. If you prompt "Act as a Senior Cyber Security Auditor specializing in OWASP Top 10 vulnerabilities for Spring Boot", the model immediately evaluates SQL injection vectors, CSRF protection, and deserialization hazards.`,
    keyConcepts: [
      'Domain priming and vocabulary activation',
      'Tone and depth modulation (beginner teacher vs senior engineer)',
      'Constraint enforcement through persona duties',
      'Dual perspective prompting (e.g. interviewer vs candidate)'
    ],
    whenToUse: [
      'When you need technical reviews from a specific engineering perspective (security, accessibility, performance)',
      'When practicing mock technical interviews or viva examinations',
      'When explaining complex topics to different audiences (5-year-old vs PhD researcher)',
      'When drafting official communications (engineering lead writing to stakeholders)'
    ],
    examples: [
      {
        title: 'Role 1: Senior Systems Architect',
        badPrompt: 'Tell me if microservices or monolith is better.',
        goodPrompt: 'Act as a Senior Distributed Systems Architect with 15 years of experience. Compare monolithic architecture versus microservices for an e-commerce startup with 5 developers. Highlight database consistency (ACID vs BASE), network latency, operational overhead, and recommend which one we should adopt first.',
        whyItWorks: 'The persona establishes high-level architectural trade-offs, practical resource awareness (5 devs), and specific engineering metrics.'
      },
      {
        title: 'Role 2: Strict Technical Interviewer',
        badPrompt: 'Ask me questions about SQL joins.',
        goodPrompt: 'Act as a Principal Database Engineer conducting a 30-minute technical interview for a junior backend role. Ask me one challenging scenario question about INNER vs LEFT JOIN on nullable foreign keys. Wait for my answer before critiquing it.',
        whyItWorks: 'Constrains interaction to turn-by-turn conversational interview mode and sets high technical standard.'
      },
      {
        title: 'Role 3: Patient Pedagogical Tutor',
        badPrompt: 'I do not get recursion in trees.',
        goodPrompt: 'Act as a patient computer science professor tutoring a first-year student who has never understood call stacks. Use a visual metaphor involving stacked cafeteria trays to explain depth-first tree traversal. Do not use abstract math notation.',
        whyItWorks: 'Tunes pedagogical style, requires intuitive analogies, and explicitly forbids discouraging mathematical jargon.'
      }
    ],
    commonMistakes: [
      'Using frivolous roles like "Act as a magic wizard" for academic or technical questions.',
      'Assigning a role but giving no task details, assuming the role does all the work.',
      'Confusing role prompting with emotional persuasion ("Please be nice, my exam is tomorrow").'
    ],
    practiceActivity: {
      task: 'Create a role-prompt for a Code Reviewer focusing exclusively on clean code conventions and algorithmic efficiency.',
      starterPrompt: 'Look at my Python bubble sort code.',
      hint: 'Specify the persona (Staff Software Engineer), standards (PEP 8, clean code, time complexity), and what feedback format to use.',
      modelAnswer: 'Act as a Staff Python Engineer conducting a pull request code review. Analyze the following Bubble Sort implementation. Provide constructive feedback categorized into: (1) Algorithmic Efficiency & Early-termination optimizations, (2) PEP 8 formatting & type hinting, and (3) Docstrings and unit test suggestions.'
    }
  },
  {
    id: 3,
    slug: 'task-prompting',
    title: 'Module 3: Task Prompting',
    shortDesc: 'Deconstruct assignments into actionable verbs, boundary conditions, and explicit success criteria.',
    duration: '20 mins',
    explanation: `Task Prompting is the engine of prompt engineering. The task specifies the precise operational command: what action must the AI execute, what should it exclude, and what does success look like?

Beginners often write conversational prompts ("Can you help me learn Dijkstra's?"). Clear task prompting transforms this into a crisp imperative action ("Derive the single-source shortest path step-by-step on the provided adjacency matrix, documenting edge relaxations at each iteration").

By using strong, unambiguous action verbs (Compare, Synthesize, Refactor, Benchmark, Prove, Isolate) rather than weak requests (Help, Tell, Explain), you minimize hallucinated tangents.`,
    keyConcepts: [
      'Strong imperative action verbs vs ambiguous queries',
      'Explicit operational boundaries (what to do and what NOT to do)',
      'Sub-task decomposition into atomic stages',
      'Acceptance criteria and definition of done'
    ],
    whenToUse: [
      'Writing homework assignments, lab exercises, and term papers',
      'Refactoring legacy code or migrating syntax across language versions',
      'Summarizing research papers or extracting benchmark statistics',
      'Generating test cases (boundary, equivalence partition, fuzz)'
    ],
    examples: [
      {
        title: 'Coding Task: Algorithm Refactoring',
        badPrompt: 'Make this code faster.',
        goodPrompt: 'Refactor this Python O(N^2) nested loop list search into an O(N) lookup using a hash set. Maintain the original function signature, preserve order of unique outputs, and include a before-and-after benchmark calculation using timeit.',
        whyItWorks: 'Clear action (Refactor), explicit complexity target (O(N^2) to O(N)), data structure requirement (hash set), and regression guard.'
      },
      {
        title: 'Writing Task: Project Abstract',
        badPrompt: 'Write an abstract for my IoT project.',
        goodPrompt: 'Compose a 150-word formal academic abstract for an IoT Smart Agriculture project based on ESP32 and MQTT. The abstract must follow the 4-part structure: (1) Problem statement, (2) Proposed methodology & sensors, (3) Experimental results showing 35% water savings, (4) Future scope. Avoid buzzwords.',
        whyItWorks: 'Word limit, structural layout, target sensors/metrics, and tone boundaries are crystal clear.'
      },
      {
        title: 'Study Task: Comparative Matrix',
        badPrompt: 'Tell me about TCP vs UDP.',
        goodPrompt: 'Construct a Markdown comparative matrix evaluating TCP versus UDP across 7 dimensions: Connection model, Header size, Speed/Overhead, Reliability/Retransmission, Flow/Congestion control, Handshake mechanism, and Ideal Use Cases with 2 real-world protocols each.',
        whyItWorks: 'Defines the structural vehicle (Markdown matrix) and the exact 7 evaluation criteria.'
      }
    ],
    commonMistakes: [
      'Combining multiple conflicting tasks in one chaotic sentence.',
      'Failing to specify negative constraints (e.g. "Do not use external libraries like NumPy").',
      'Leaving the depth of analysis open-ended ("Write a lot").'
    ],
    practiceActivity: {
      task: 'Formulate a task prompt to generate 5 comprehensive test cases for a bank withdrawal function.',
      starterPrompt: 'Give me test cases for bank withdrawal.',
      hint: 'Include normal cases, edge cases (zero, negative, exact balance), and overdraft limits with input/expected output tables.',
      modelAnswer: 'Generate a tabular test suite containing 5 distinct test cases for a function `withdraw(accountId, amount)`. Include columns: Test Case ID, Description, Input State (Account Balance, Withdrawal Amount), Expected Result (Success/Error Code), and Boundary Category (Normal, Zero Amount, Negative Amount, Insufficient Funds, Exact Balance).'
    }
  },
  {
    id: 4,
    slug: 'context-and-format',
    title: 'Module 4: Context and Format Prompting',
    shortDesc: 'Provide necessary background, target audience constraints, and dictate rigid output structures.',
    duration: '20 mins',
    explanation: `A prompt without context forces the AI to make wild assumptions. Context answers the questions: What is the environment? What dependencies exist? Who is reading this? What are the hardware or timeline limits?

Equally important is Output Format Prompting. LLMs can output raw prose, Markdown tables, JSON, PlantUML diagrams, YAML configs, or LaTeX mathematical formulas. If you want a JSON response to parse with a web service, demanding JSON schema upfront prevents conversational fluff like "Sure! Here is the JSON you requested:".`,
    keyConcepts: [
      'The 4 Pillars of Framing: Background, Audience, Constraints, Output',
      'Structural formatting: JSON, Markdown tables, CSV, PlantUML, LaTeX',
      'System context: OS, framework version, dependencies, hardware',
      'Negative constraints and style guidelines'
    ],
    whenToUse: [
      'When integrating AI outputs directly into code, scripts, or documents',
      'When working on restricted environments (e.g. C++11 embedded systems, React 19 hooks)',
      'When tailoring technical explanations for specific audiences (laymen vs lab external examiners)',
      'When creating revision cheat-sheets with strict space constraints'
    ],
    examples: [
      {
        title: 'Strict JSON API Response',
        badPrompt: 'Give me 3 sorting algorithms with time complexity.',
        goodPrompt: 'Output a valid JSON array of objects representing 3 comparison sorting algorithms (Merge Sort, Quick Sort, Heap Sort). Each object must strictly match this schema: {"name": string, "best_time": string, "worst_time": string, "space": string, "is_stable": boolean}. Do not include markdown code ticks or conversational preamble.',
        whyItWorks: 'Enforces strict JSON schema, boolean data types, and prohibits conversational chatter.'
      },
      {
        title: 'Audience-Specific Documentation',
        badPrompt: 'Document this REST endpoint.',
        goodPrompt: 'Context: We are building an internal student attendance portal using Express.js. Audience: First-year student interns. Format: OpenAPI 3.0 YAML snippet followed by a 2-paragraph human-readable explanation with example `curl` commands using realistic college dummy data.',
        whyItWorks: 'Pairs context, developer seniority, formal YAML spec, and runnable curl examples.'
      },
      {
        title: 'Comparative Markdown Table',
        badPrompt: 'Compare MySQL and MongoDB.',
        goodPrompt: 'Context: A university lab project evaluating SQL vs NoSQL for storing student semester grade history. Format: A Markdown table with columns: [Feature, MySQL, MongoDB, Winner for Grade Storage, Reason]. Constraints: Limit analysis to ACID transactions, schema migration, and aggregation ease.',
        whyItWorks: 'Explicit decision context, table column specification, and scoped criteria.'
      }
    ],
    commonMistakes: [
      'Forgetting to mention the specific library version (e.g. React 18 vs React 19).',
      'Asking for JSON but forgetting to specify keys, resulting in random schema designs.',
      'Allowing conversational intros ("Certainly! As an AI...") when piping output into automated tools.'
    ],
    practiceActivity: {
      task: 'Prompt the AI to generate a hardware requirement specification for a Linux virtual machine in a Markdown table.',
      starterPrompt: 'What specs do I need for Ubuntu VM?',
      hint: 'Include target workload (Docker + VS Code), minimum vs recommended specs (RAM, vCPU, Disk), and table layout.',
      modelAnswer: 'Context: I am configuring a VirtualBox VM on Windows 11 to run Ubuntu 24.04 LTS for a semester course involving Docker containers, Node.js, and VS Code. Format: A Markdown table comparing "Minimum Specification" vs "Recommended Specification" across: Host RAM Allocation, Virtual CPUs, VDI Disk Size, Video Memory, and Network Adapter Mode. Conclude with 2 terminal commands to verify virtualization is enabled.'
    }
  },
  {
    id: 5,
    slug: 'few-shot-prompting',
    title: 'Module 5: Few-Shot Prompting',
    shortDesc: 'Teach by demonstration using input-output pairs to lock in formatting, tone, and logic patterns.',
    duration: '15 mins',
    explanation: `Zero-shot prompting is asking the AI to perform a task without examples. Few-shot prompting provides one or more high-quality input-output examples directly in the prompt before presenting the actual query.

Language models are pattern-matching engines. When you give 2-3 examples showing input format, reasoning style, and exact output format, the model mirrors the pattern with remarkable fidelity.

Few-shot prompting is the single most reliable way to standardize code generation, data normalization, classification, and commit message drafting.`,
    keyConcepts: [
      'Zero-Shot vs One-Shot vs Few-Shot learning',
      'In-context learning through exemplar matching',
      'Pattern stabilization and hallucination reduction',
      'Balancing example diversity with token limits'
    ],
    whenToUse: [
      'Formatting unstructured text into structured data (e.g. error logs into incident tickets)',
      'Writing git commit messages following Conventional Commits format',
      'Translating math or logical statements into specific programming idioms',
      'Classifying code smells or academic research abstracts'
    ],
    examples: [
      {
        title: 'Conventional Commit Generator',
        badPrompt: 'Write commit messages for these changes.',
        goodPrompt: `Generate conventional commit messages matching the examples below:

Example 1:
Diff: Added null checks to UserService.authenticate()
Commit: fix(auth): prevent null pointer exception during user authentication

Example 2:
Diff: Created database migration for user_sessions table
Commit: feat(db): add user_sessions table migration

Now generate the commit message for:
Diff: Optimized SQL query in getActiveStudents() by adding index on batch_year`,
        whyItWorks: 'The model immediately grasps the structure: type(scope): lowercase imperative summary.'
      },
      {
        title: 'Boolean Logic to SQL WHERE Clause',
        badPrompt: 'Turn this logic into SQL.',
        goodPrompt: `Translate English filtering requirements into parameterized SQL WHERE clauses:

Input: "Active students who joined in 2024 or 2025"
Output: status = 'ACTIVE' AND join_year IN (2024, 2025)

Input: "Faculty in CSE or ECE department with more than 5 years tenure"
Output: department IN ('CSE', 'ECE') AND tenure_years > 5

Input: "Students with pending fees and GPA above 8.5 who are not on probation"
Output:`,
        whyItWorks: 'Eliminates guesswork about SQL casing, operators, and parenthesis precedence.'
      },
      {
        title: 'Error Code to Student-Friendly Diagnostics',
        badPrompt: 'Explain this error.',
        goodPrompt: `Translate GCC compiler errors into simple student diagnostic tips:

Error: "error: expected ';' before '}' token"
Fix: Check the line directly above the closing curly brace; you likely missed a terminating semicolon.

Error: "undefined reference to 'sqrt'"
Fix: You forgot to link the math library. Compile with the '-lm' flag: gcc program.c -lm

Error: "warning: assignment to 'int' from 'int *' makes integer from pointer without a cast"
Fix:`,
        whyItWorks: 'Standardizes the advice format into an actionable, reassuring one-liner.'
      }
    ],
    commonMistakes: [
      'Providing inaccurate or poorly formatted examples in the few-shot demonstrations.',
      'Using inconsistent example patterns (e.g. one example uses JSON, another uses prose).',
      'Using too many verbose examples that consume the prompt context window needlessly.'
    ],
    practiceActivity: {
      task: 'Create a 2-shot prompt that converts raw function names into snake_case and kebab-case mappings.',
      starterPrompt: 'Convert these function names.',
      hint: 'Give 2 input/output pairs showing CamelCase converted to snake_case and kebab-case.',
      modelAnswer: `Transform JavaScript camelCase function names into both Python snake_case and CSS/URL kebab-case:

Input: calculateStudentAverage
Output: snake_case: calculate_student_average | kebab-case: calculate-student-average

Input: fetchUserProfileData
Output: snake_case: fetch_user_profile_data | kebab-case: fetch-user-profile-data

Input: updatePaymentGatewayStatus
Output:`
    }
  },
  {
    id: 6,
    slug: 'step-by-step',
    title: 'Module 6: Step-by-Step Problem Solving',
    shortDesc: 'Guide the model to lay out intermediate reasoning, assumptions, and validation checkpoints before final answers.',
    duration: '20 mins',
    explanation: `Complex computational and mathematical problems require sequential reasoning. When an AI attempts to jump directly from a complicated prompt to a final answer in a single token, it is prone to calculation errors and logical leaps.

By prompting the model to break the problem into clear, visible intermediate steps, you encourage structured deduction. You ask the model to:
1. List explicit assumptions and variable states,
2. Perform intermediate calculations step-by-step,
3. Validate boundary conditions or units,
4. State the verified conclusion.

Important clarity note: This technique requests the AI to present structured, readable solution steps in its output. It does not claim that secret or internal model neural reasoning traces must be exposed; rather, it structures the user-facing explanation so both student and AI can verify each deduction.`,
    keyConcepts: [
      'Sequential problem decomposition',
      'Explicit boundary and variable state tracking',
      'Intermediate verification checkpoints',
      'Self-correction before emitting final answers'
    ],
    whenToUse: [
      'Solving Discrete Mathematics, Probability, or Theory of Computation problems',
      'Analyzing algorithms with loop invariants or dynamic programming states',
      'Tracing execution of pointer-heavy code in C/C++',
      'Designing database schemas with normalization dependencies (1NF to 3NF)'
    ],
    examples: [
      {
        title: 'Discrete Math: Pigeonhole Principle',
        badPrompt: 'If 100 students get grades A through F, do 20 get the same grade?',
        goodPrompt: 'Solve this Discrete Mathematics problem using the Generalized Pigeonhole Principle. Structure your answer in 4 explicit steps: (1) Identify the pigeons and pigeonholes, (2) State the formula ceil(N/k), (3) Substitute values and calculate, (4) State the final conclusion clearly with an interpretation for the exam.',
        whyItWorks: 'Prevents the model from guessing a quick "Yes" or "No" and ensures mathematical rigor.'
      },
      {
        title: 'Algorithm Trace: Dijkstra Single Source',
        badPrompt: 'Find shortest path in graph A-B-C.',
        goodPrompt: 'Given the weighted undirected graph: A-(4)-B, A-(2)-C, C-(1)-B, B-(5)-D, C-(8)-D. Trace Dijkstra algorithm from source node A to all nodes. For each step show: Current Unvisited Set, Distance Table [A, B, C, D], Selected Node with minimum distance, and Relaxed Neighbors. Conclude with final path to D.',
        whyItWorks: 'Enforces an iteration-by-iteration state table, preventing hallucinated shortcuts.'
      },
      {
        title: 'Database Normalization Step-by-Step',
        badPrompt: 'Normalize this table: Student, Course, Instructor, Room.',
        goodPrompt: 'Perform relational database normalization on the provided relation from Unnormalized Form (UNF) through 3NF. For each normal form step: (a) Identify functional dependencies violating the rule, (b) Show decomposed relations, (c) State primary and foreign keys, (d) Confirm why the decomposed tables satisfy that normal form.',
        whyItWorks: 'Standardizes academic normalization proof steps required in university grading.'
      }
    ],
    commonMistakes: [
      'Assuming the AI will catch math errors without giving it room to show intermediate arithmetic.',
      'Allowing vague answers without specifying what state variables must be tracked.',
      'Confusing structured explanations with asking the model to show internal AI runtime thoughts.'
    ],
    practiceActivity: {
      task: 'Prompt the AI to trace the binary representation and two complement conversion of the decimal number -42 in an 8-bit register.',
      starterPrompt: 'What is -42 in binary?',
      hint: 'Ask for step 1: 42 in unsigned 8-bit binary, step 2: One complement (invert bits), step 3: Add 1 for Two complement, step 4: Verification by weights.',
      modelAnswer: 'Explain the 8-bit two complement representation of decimal -42 step-by-step for a Computer Organization exam. Present the solution in 4 explicit stages: Step 1: Convert +42 to 8-bit binary. Step 2: Compute the 1 complement by inverting all bits. Step 3: Add 1 to the least significant bit (showing carry operations). Step 4: Verify the result by summing the signed bit weights (-128 + 64 + ...). Conclude with hexadecimal equivalent.'
    }
  },
  {
    id: 7,
    slug: 'react-prompting',
    title: 'Module 7: ReAct (Reasoning and Acting)',
    shortDesc: 'Understand the synergy of Thought, Action, and Observation loops that power modern AI agents and tool integrations.',
    duration: '15 mins',
    explanation: `ReAct is an advanced prompting paradigm that combines Reasoning ("Thought") with Action ("Act") and environmental feedback ("Observation"). In traditional prompting, a model generates a direct static response. In ReAct, the model cycles through:
1. Thought: What is the current state and what information do I need next?
2. Action: Call an external tool, execute code, query a database, or search documentation.
3. Observation: Read the tool output and update its knowledge.
4. Final Answer: Synthesize the verified result.

Important educational distinction: In simple web chat interfaces without tool plugins, the AI can only simulate the ReAct pattern as a thought exercise. However, in agentic frameworks like LangChain, AutoGen, or modern developer IDEs with tools (like Antigravity or Claude Code), actual tools are invoked by the environment based on the AI action commands.`,
    keyConcepts: [
      'The Thought -> Action -> Observation loop',
      'Tool integration and function calling mechanisms',
      'Grounding AI reasoning in verifiable real-time data',
      'Simulated ReAct prompting vs autonomous agent tool execution'
    ],
    whenToUse: [
      'When building AI agent workflows or using IDEs with command execution capabilities',
      'When asking an AI to solve multi-stage research problems that require verifying facts',
      'When diagnosing system logs where each command depends on previous command outputs',
      'When studying modern AI system architecture in advanced elective courses'
    ],
    examples: [
      {
        title: 'ReAct Structure for Bug Investigation',
        badPrompt: 'Why is port 8080 busy on my server?',
        goodPrompt: `You are a DevOps Troubleshooter assistant equipped with terminal tools. Analyze why a web server fails to bind to port 8080 using the ReAct loop:

Thought: I need to check what process is currently bound to port 8080.
Action: Run command "lsof -i :8080" or "netstat -ano | findstr 8080".
Observation: [PID 4192 is listening on 0.0.0.0:8080].
Thought: Now I need to identify what process PID 4192 belongs to.
Action: Run command "ps -p 4192 -o comm=" or "tasklist /FI \\"PID eq 4192\\"".
Observation: [It is an orphan node process from a previous test].
Final Answer: Advise the user to terminate PID 4192 with safe instructions.`,
        whyItWorks: 'Demonstrates the sequential loop of gathering telemetry, forming a hypothesis, and acting.'
      },
      {
        title: 'Research Fact Verification with Search Tools',
        badPrompt: 'When was Python 3.13 released and what is its headline feature?',
        goodPrompt: 'Act as a research assistant. If you have search capability, formulate your response using the ReAct pattern: First state your Thought on the official Python release schedule, your Action (search query for Python 3.13 release notes), the Observation (confirmed release date and experimental free-threaded mode / JIT), and finally the synthesized answer.',
        whyItWorks: 'Ensures the model explicitly checks facts against release documentation rather than relying on stale memory.'
      },
      {
        title: 'Automated Unit Test & Fix Loop',
        badPrompt: 'Fix my code until it passes.',
        goodPrompt: 'Operate in an agentic loop: (1) Thought: Analyze the pytest assertion error trace, (2) Action: Suggest the minimal patch to `utils.py`, (3) Anticipate the observation: explain what test output will verify the fix, (4) Conclude with regression risk assessment.',
        whyItWorks: 'Teaches students how real agentic IDEs pair code edits with test executions.'
      }
    ],
    commonMistakes: [
      'Assuming all AI chatbots can magically run terminal commands when no tool access exists.',
      'Allowing an agent to run destructive commands without intermediate human verification.',
      'Failing to parse the observation step properly before deciding the next action.'
    ],
    practiceActivity: {
      task: 'Structure a ReAct prompt to diagnose a slow database query using EXPLAIN ANALYZE.',
      starterPrompt: 'Help fix slow SQL query.',
      hint: 'Include Thought (inspect query execution plan), Action (run EXPLAIN ANALYZE), Observation (seq scan on unindexed column), and Final Answer (CREATE INDEX recommendation).',
      modelAnswer: `You are an automated Database Performance Agent. Structure your diagnostic advice using the ReAct pattern:
1. Thought: Formulate a hypothesis on why "SELECT * FROM orders WHERE customer_id = 9201" is taking 3.4 seconds.
2. Action: Recommend running "EXPLAIN (ANALYZE, BUFFERS) SELECT ...".
3. Observation: Outline what indicators (Sequential Scan vs Index Scan, Execution Time vs Planning Time) to look for in the query planner tree.
4. Final Recommendation: Provide the exact DDL to create the supporting B-tree index and re-verify performance.`
    }
  }
];
