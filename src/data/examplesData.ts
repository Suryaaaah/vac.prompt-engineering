import type { ExamplePrompt } from '../types';

export const EXAMPLES_DATA: ExamplePrompt[] = [
  // ================= CODING: 7 EXAMPLES =================
  {
    id: 1,
    title: 'Java Factorial Program',
    category: 'Coding',
    subcategory: 'Core Java & Recursion',
    weakPrompt: 'Write a factorial program in Java.',
    improvedPrompt: `Act as a Computer Science Lab Instructor. Write a complete, compilable Java 17 class named FactorialCalculator that includes:
1. Both iterative and recursive methods for calculating factorials.
2. Robust input validation: handle negative integers (throw IllegalArgumentException) and values greater than 20 using BigInteger to prevent arithmetic overflow.
3. A main method demonstrating edge cases (n=0, n=1, n=5, n=25) with formatted console output.
4. Javadoc comments explaining time complexity O(n) and space complexity O(1) iterative vs O(n) recursive stack frames.`,
    explanation: 'The weak prompt gives no language version, ignores integer overflow (standard Java long overflows at 21!), omits recursive vs iterative comparison, and skips input edge validation.',
    techniquesUsed: ['Role Prompting', 'Constraint Specification', 'Edge-Case Enforcement', 'Output Structure'],
    expectedOutputCharacteristics: [
      'Compilable Java 17 class with import java.math.BigInteger',
      'Both iterative and recursive implementations side-by-side',
      'Defensive checks throwing IllegalArgumentException',
      'Clear Big-O time and call stack space analysis'
    ]
  },
  {
    id: 2,
    title: 'Java Even-or-Odd Program',
    category: 'Coding',
    subcategory: 'Bitwise Operators & Basics',
    weakPrompt: 'Java code for even odd number.',
    improvedPrompt: `Act as an expert Java programmer. Write an efficient Java method to check whether a given integer is even or odd:
- Provide two implementations: standard modulo operator (%) and high-performance bitwise AND (& 1).
- Explain why the bitwise check works at the hardware/binary register level.
- Handle positive integers, zero, and negative odd numbers (highlighting how Java modulo behaves with negatives like -3 % 2 == -1).
- Include simple JUnit 5 test cases covering positive, zero, and negative values.`,
    explanation: 'The weak prompt creates a basic n % 2 == 0 snippet that often fails on negative numbers in Java (-3 % 2 is -1, not 1). The improved prompt highlights bitwise operations and unit test safety.',
    techniquesUsed: ['Role Prompting', 'Comparative Implementations', 'Negative Number Edge-Case', 'Testing Harness'],
    expectedOutputCharacteristics: [
      'Clean idiomatic method using (n & 1) == 0 vs (n % 2 != 0)',
      'Explanation of signed two complement bit checking',
      'Executable JUnit 5 parameter tests'
    ]
  },
  {
    id: 3,
    title: 'Java Inheritance Explanation',
    category: 'Coding',
    subcategory: 'Object-Oriented Programming',
    weakPrompt: 'Explain inheritance in Java with example.',
    improvedPrompt: `Act as a senior OOP architect tutoring a 2nd-year CSE student. Explain Java single inheritance versus interface implementation:
1. Provide a real-world software domain example (e.g., BankAccount base class with SavingsAccount child class overriding calculateInterest()).
2. Demonstrate the correct use of 'super' constructor, 'super' method calls, and '@Override' annotations.
3. Explain why Java prohibits multiple class inheritance (the Diamond Problem) and how default methods in interfaces provide flexible alternatives.
4. Format output with concise class definitions, UML class relationship diagram in ASCII/text, and 3 common student pitfalls.`,
    explanation: 'The weak prompt usually generates a cliché Animal/Dog example. The improved prompt grounds the concept in realistic banking software, addresses the Diamond Problem, and includes architectural warnings.',
    techniquesUsed: ['Role Prompting', 'Realistic Domain Framing', 'Conceptual Depth (Diamond Problem)', 'Visual ASCII Diagram'],
    expectedOutputCharacteristics: [
      'Realistic BankAccount / SavingsAccount hierarchy',
      'Constructor chaining via super(...) with encapsulation',
      'Textual UML diagram showing IS-A relationship',
      'Explanation of why interfaces solve multiple inheritance'
    ]
  },
  {
    id: 4,
    title: 'Python List Sorting',
    category: 'Coding',
    subcategory: 'Data Structures & Algorithms',
    weakPrompt: 'How to sort a list in Python?',
    improvedPrompt: `Act as a Python Performance Specialist. Explain how Python handles list sorting:
1. Clearly differentiate in-place list.sort() (mutates list, returns None) versus sorted() (creates new list).
2. Demonstrate custom sorting using key=lambda and operator.itemgetter on a list of student dictionaries: [{"name": str, "gpa": float, "age": int}] sorted first by GPA descending, then by name ascending.
3. Explain Timsort (Python underlying hybrid sorting algorithm), its adaptive nature, and its O(N log N) worst-case vs O(N) best-case time complexity.
4. Format code using PEP 8 conventions with full type hints.`,
    explanation: 'The weak prompt produces a basic sort() call. The improved prompt addresses mutation vs immutability, multi-key lambda sorting, and internal Timsort algorithmic details crucial for technical interviews.',
    techniquesUsed: ['Domain Priming', 'Multi-attribute Sorting', 'Algorithmic Theory (Timsort)', 'PEP 8 Standards'],
    expectedOutputCharacteristics: [
      'Clear side-by-side comparison of list.sort() vs sorted()',
      'Multi-level tuple key sorting (key=lambda s: (-s["gpa"], s["name"]))',
      'Deep dive into Timsort run detection and stability'
    ]
  },
  {
    id: 5,
    title: 'Debugging a Programming Error',
    category: 'Coding',
    subcategory: 'Diagnostic Engineering',
    weakPrompt: 'Why does my code throw NullPointerException?',
    improvedPrompt: `Act as a Lead Java Diagnostic Engineer. I have encountered a java.lang.NullPointerException at line 24 of my Spring Boot controller.
Here is the code context:
\`\`\`java
@GetMapping("/students/{id}")
public ResponseEntity<StudentDTO> getStudent(@PathVariable Long id) {
    Student s = studentRepository.findById(id).get();
    return ResponseEntity.ok(new StudentDTO(s.getId(), s.getName().toUpperCase()));
}
\`\`\`
1. Identify the 2 distinct causes of NPE in these 4 lines.
2. Show the modern Java 17 / Spring Boot refactored version using Optional.map(), orElseThrow(ResourceNotFoundException::new), and Objects.requireNonNullElse().
3. Add a unit test using Mockito that asserts proper 404 response when a student ID does not exist.`,
    explanation: 'The weak prompt is useless without code and trace. The improved prompt supplies minimal reproducible code, pinpoints multi-layered null sources (Optional.get() and null name string), and asks for production-ready error handling.',
    techniquesUsed: ['Code Context Injection', 'Root-Cause Analysis', 'Refactoring with Modern Idioms', 'Unit Test Generation'],
    expectedOutputCharacteristics: [
      'Identifies Optional.get() without isPresent() and unvalidated s.getName()',
      'Spring Boot best-practice controller returning 404 cleanly',
      'Mockito mock verification snippet'
    ]
  },
  {
    id: 6,
    title: 'SQL Query Explanation',
    category: 'Coding',
    subcategory: 'Relational Databases',
    weakPrompt: 'Explain this SQL query with join and group by.',
    improvedPrompt: `Act as a Database Administrator (DBA). Deconstruct the following PostgreSQL query for university students:
\`\`\`sql
SELECT d.dept_name, COUNT(e.emp_id) AS total_employees, ROUND(AVG(e.salary), 2) AS avg_sal
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
WHERE d.is_active = TRUE
GROUP BY d.dept_name
HAVING COUNT(e.emp_id) > 5
ORDER BY avg_sal DESC;
\`\`\`
1. Explain the logical SQL execution order (FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY).
2. Explain why a LEFT JOIN was used instead of an INNER JOIN.
3. Clarify the crucial difference between the WHERE clause and the HAVING filter.
4. Suggest a composite index on the employees table to optimize this aggregation.`,
    explanation: 'The weak prompt leads to generic recitation. The improved prompt forces the model to explain SQL logical execution order (which differs from written syntax order) and index tuning.',
    techniquesUsed: ['Execution Order Deconstruction', 'Comparative Rationale (LEFT vs INNER)', 'Optimization & Indexing'],
    expectedOutputCharacteristics: [
      'Step-by-step breakdown according to relational query engine phases',
      'Distinction between row-level WHERE vs aggregate HAVING filters',
      'Actionable B-tree composite index recommendation'
    ]
  },
  {
    id: 7,
    title: 'Data Structures Revision',
    category: 'Coding',
    subcategory: 'Core Computer Science',
    weakPrompt: 'Summarize trees and graphs for my exam.',
    improvedPrompt: `Act as a Data Structures Professor creating an exam revision guide for 2nd-year CSE students.
1. Provide a concise comparative Markdown table contrasting Binary Trees, Binary Search Trees (BST), AVL Trees, and Graphs across: Definition, Lookup Time (Best vs Worst), Traversal Algorithms, and Core Applications.
2. Detail when an AVL tree is preferred over a plain BST (mentioning degenerate O(N) linked list trees).
3. Outline BFS vs DFS on a graph with both queue/stack mechanics and cycle detection strategies.
4. Include 3 tricky viva exam questions with concise model answers.`,
    explanation: 'The weak prompt gives an unreadable wall of text. The improved prompt organizes the review into high-yield comparative tables, worst-case edge cases, and oral exam prep.',
    techniquesUsed: ['Comparative Table Formatting', 'Viva Prep Extraction', 'Algorithmic Edge-Cases'],
    expectedOutputCharacteristics: [
      'High-density Markdown matrix with Big-O notations',
      'Self-balancing mechanics comparison (AVL balance factor)',
      '3 challenging viva questions with crisp answers'
    ]
  },

  // ================= WRITING: 6 EXAMPLES =================
  {
    id: 8,
    title: 'Technical Assignment Introduction',
    category: 'Writing',
    subcategory: 'Academic Papers',
    weakPrompt: 'Write an introduction about cloud computing for my assignment.',
    improvedPrompt: `Act as an academic writing coach for Computer Science undergraduates. Write a 200-word formal introduction for a university assignment titled "Architecting Fault-Tolerant Distributed Microservices on AWS":
1. Open with a compelling hook regarding cloud computing scalability and reliability challenges in modern enterprises.
2. Define the core architectural problem: state management and single points of failure across containerized clusters.
3. Outline the assignment scope: evaluating Amazon ECS, auto-scaling groups, and multi-region S3 replication.
4. Maintain a rigorous academic tone without colloquialisms or marketing buzzwords.`,
    explanation: 'The weak prompt produces generic high-school level fluff ("Cloud computing is very popular today"). The improved prompt defines title, technical problem statement, scope, word limit, and academic rigor.',
    techniquesUsed: ['Word Count Limit', 'Tone Calibration', 'Structural Hook-Problem-Scope Framework'],
    expectedOutputCharacteristics: [
      'Exactly 180-220 words of formal academic prose',
      'Focus on technical engineering metrics (availability, replication)',
      'Clear thematic transition into paper body'
    ]
  },
  {
    id: 9,
    title: 'Professional Email to Professor',
    category: 'Writing',
    subcategory: 'Professional Communication',
    weakPrompt: 'Write an email asking professor for project guidance.',
    improvedPrompt: `Act as a professional communications advisor. Draft a concise, respectful formal email from a 2nd-year CSE student to Dr. Sharma requesting research supervision for an undergraduate project on Natural Language Processing:
Context: The student has read Dr. Sharma's 2024 paper on low-resource language tokenization and has completed Stanford CS224N online.
Constraints:
- Subject line must include student registration number (24BCSE102) and specific topic.
- Length under 150 words.
- Specific call to action: requesting a 15-minute office meeting during faculty hours next Tuesday or Thursday.
- Include placeholders for student name and portfolio GitHub link.`,
    explanation: 'The weak prompt generates an informal or overly desperate email that busy professors ignore. The improved prompt demonstrates prior research, brevity, and an actionable, low-friction meeting request.',
    techniquesUsed: ['Audience Awareness', 'Brevity Constraint (<150 words)', 'Clear Call-to-Action', 'Credibility Anchoring'],
    expectedOutputCharacteristics: [
      'High-impact subject line with course ID',
      'Demonstrates familiarity with supervisor research',
      'Polite, bounded time request (15 minutes)'
    ]
  },
  {
    id: 10,
    title: 'Final Year Project Abstract',
    category: 'Writing',
    subcategory: 'Project Documentation',
    weakPrompt: 'Write an abstract for my machine learning project.',
    improvedPrompt: `Act as a Senior Research Editor. Compose a formal 250-word engineering project abstract for a final-year B.Tech CSE thesis titled: "EdgeVision: Low-Latency Fall Detection for Elder Care Using Quantized MobileNetV3 on Raspberry Pi 4":
Structure the abstract into four distinct labelled sentences/paragraphs:
1. Motivation & Problem: High mortality from unassisted falls in elderly living and privacy concerns with cloud video streaming.
2. Proposed Solution: On-device computer vision pipeline using 8-bit quantized MobileNetV3 and background subtraction.
3. Quantifiable Results: 94.2% detection precision at 28 FPS while consuming under 4.5 Watts of system power.
4. Impact: Zero cloud transmission of raw video, ensuring HIPAA-compliant privacy and real-time SMS alerts under 400ms.`,
    explanation: 'The weak prompt misses all specific technical metrics and IEEE abstract conventions. The improved prompt enforces the 4-stage empirical engineering abstract standard with concrete benchmarks.',
    techniquesUsed: ['IEEE Abstract Formula', 'Quantifiable Metrics Insertion', 'Hardware & Privacy Constraints'],
    expectedOutputCharacteristics: [
      'Four-stage academic structure (Problem, Method, Metrics, Impact)',
      'Concrete numbers (FPS, Watts, precision, latency)',
      'Zero fluff, publication-ready prose'
    ]
  },
  {
    id: 11,
    title: 'Resume Summary for Software Intern',
    category: 'Writing',
    subcategory: 'Career & Portfolios',
    weakPrompt: 'Write a resume objective for CSE student.',
    improvedPrompt: `Act as a Technical Recruiter at a tier-1 tech firm. Write a 3-sentence, high-impact Professional Summary for a 2nd-year CSE student applying for a Summer 2026 Software Engineering Internship:
Candidate strengths: Strong Data Structures in Java (Top 15% on LeetCode), built full-stack MERN projects with Docker, and won 2nd place in a 36-hour college hackathon.
Rules:
- Eliminate generic clichés like "hardworking team player looking for an opportunity to learn".
- Use active action verbs (Engineered, Architected, Optimized).
- Highlight technical stacks, competitive problem-solving aptitude, and measurable project impact.`,
    explanation: 'The weak prompt generates outdated "Objective" statements that modern recruiters discard. The improved prompt focuses on hard evidence, rankings, hackathons, and ATS-friendly keywords.',
    techniquesUsed: ['Role Prompting', 'Negative Constraints (Ban Clichés)', 'Action-Oriented ATS Optimization'],
    expectedOutputCharacteristics: [
      'Exactly 3 punchy, evidence-driven sentences',
      'Incorporates LeetCode ranking, MERN/Docker skills, and hackathon win',
      'Direct value proposition for engineering managers'
    ]
  },
  {
    id: 12,
    title: 'Technical Article on Git Workflow',
    category: 'Writing',
    subcategory: 'Dev Blogs & Tutorials',
    weakPrompt: 'Write a blog post about Git branches.',
    improvedPrompt: `Act as a Staff Developer Advocate. Write a practical 400-word tutorial article titled "Demystifying Feature Branch Workflow: A Survival Guide for Junior Engineers":
Audience: 1st and 2nd year students collaborating on their first team GitHub project.
Include:
1. The golden rule: Never commit directly to 'main'.
2. Step-by-step CLI workflow from 'git checkout -b feature/login' to pull request merge.
3. How to resolve a merge conflict in 3 clear steps without panic.
4. Format with clean code blocks, callout tips for good commit messages, and a summary cheat-sheet table.`,
    explanation: 'The weak prompt creates dry theory. The improved prompt gives an engaging developer narrative, exact terminal command sequences, and anxiety-reducing merge conflict workflows.',
    techniquesUsed: ['Audience Calibration', 'Interactive Command Trace', 'Callout Box Formatting', 'Visual Cheat-Sheet'],
    expectedOutputCharacteristics: [
      'Engaging, non-intimidating tech writer tone',
      'Accurate bash terminal snippets with comments',
      'Systematic conflict resolution framework'
    ]
  },
  {
    id: 13,
    title: 'Presentation Outline for AI Seminar',
    category: 'Writing',
    subcategory: 'Slide Decks & Seminars',
    weakPrompt: 'Make slides for a seminar on artificial intelligence.',
    improvedPrompt: `Act as an expert technical speaker. Create an 8-slide presentation outline for a 15-minute departmental seminar titled "Transformers and Attention: The Architecture Fueling Modern GenAI":
For each slide provide:
- Slide Title
- Visual/Diagram Idea (e.g., self-attention matrix, encoder-decoder flow)
- 3 Bullet Points (technical concepts, not surface trivia)
- Speaker Talking Script (30-45 seconds in conversational yet academic tone)
- Transition phrase to the next slide.`,
    explanation: 'The weak prompt spits out generic bullet points without slide pacing or visual design. The improved prompt structures each slide with visual recommendations, speaker scripts, and cohesive transitions.',
    techniquesUsed: ['Slide-by-Slide Schema', 'Speaker Note Generation', 'Visual Recommendation', 'Time Budgeting'],
    expectedOutputCharacteristics: [
      '8 rigorously structured slide outlines',
      'Actionable diagram ideas (heatmaps, token embeddings)',
      'Natural conversational transitions for students on stage'
    ]
  },

  // ================= STUDYING: 7 EXAMPLES =================
  {
    id: 14,
    title: 'Operating System Concepts (Deadlocks)',
    category: 'Studying',
    subcategory: 'Core Systems',
    weakPrompt: 'Explain deadlocks in OS.',
    improvedPrompt: `Act as an Operating Systems Professor. Explain the concept of Deadlocks for students preparing for university exams:
1. Define Deadlock using the classic Dining Philosophers analogy.
2. Clearly explain Coffman 4 Necessary Conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) and show how breaking just one condition prevents deadlock.
3. Walk through the Banker Algorithm: state the data matrices (Allocation, Max, Available, Need) and provide a miniature numerical example with 3 processes and 3 resources to prove a Safe State sequence.
4. Provide a 4-bullet exam summary checklist.`,
    explanation: 'The weak prompt merely recites definition. The improved prompt integrates the Coffman conditions, the mechanical arithmetic of the Banker Algorithm safe state, and exam-focused mnemonic takeaways.',
    techniquesUsed: ['Analogy Anchoring', 'Four-Condition Decomposition', 'Numerical Trace of Banker Algorithm'],
    expectedOutputCharacteristics: [
      'Clear definition + dining philosophers visual story',
      'Need Matrix calculation formula (Need = Max - Allocation)',
      'Worked 3-process numerical safety trace'
    ]
  },
  {
    id: 15,
    title: 'Computer Networks (OSI vs TCP/IP)',
    category: 'Studying',
    subcategory: 'Network Architecture',
    weakPrompt: 'OSI model vs TCP/IP model.',
    improvedPrompt: `Act as a Computer Networks Instructor. Create a comprehensive study guide comparing the 7-layer OSI Model against the 4-layer TCP/IP Model:
1. Provide a side-by-side mapping diagram showing how OSI layers correspond to TCP/IP layers.
2. For each layer in TCP/IP, list: Layer Name, Primary Responsibility, Data Unit (Frame, Packet, Segment, Stream), and 3 Core Protocols.
3. Explain packet encapsulation/decapsulation from Application down to Physical wire with an ASCII diagram of header additions.
4. Detail 2 reasons why the OSI model remained a theoretical reference model while TCP/IP became the global commercial standard.`,
    explanation: 'The weak prompt lists names without clarifying Protocol Data Units (PDUs) or real-world encapsulation. The improved prompt teaches the mechanics of headers and commercial networking realities.',
    techniquesUsed: ['Layer Mapping Matrix', 'PDU Specification', 'ASCII Encapsulation Trace', 'Historical Context'],
    expectedOutputCharacteristics: [
      'Visual alignment of 7 layers to 4 layers',
      'Explicit PDU terminology (Bits -> Frames -> Packets -> Segments -> Data)',
      'ASCII header addition illustration'
    ]
  },
  {
    id: 16,
    title: 'Database Normalization (1NF to BCNF)',
    category: 'Studying',
    subcategory: 'Database Systems',
    weakPrompt: 'How to normalize database tables?',
    improvedPrompt: `Act as a Senior Database Architect tutoring a university student. Walk through Relational Database Normalization step-by-step from un-normalized data through Boyce-Codd Normal Form (BCNF):
Given a sample unnormalized student table: StudentEnrolment(StudentID, StudentName, CourseID, CourseName, InstructorID, InstructorOffice).
1. 1NF: Eliminate repeating groups / multi-valued attributes and establish primary keys.
2. 2NF: Remove partial dependencies (functional dependencies on a subset of a composite key).
3. 3NF: Remove transitive dependencies (non-prime attributes determining non-prime attributes).
4. BCNF: Enforce that every determinant is a candidate key.
At each stage: state the rule violation in plain English, display the resulting decomposed tables with schemas, and highlight foreign key links.`,
    explanation: 'The weak prompt produces abstract definitions. The improved prompt uses a concrete 6-attribute college table and walks through exact relation decompositions at each normal form boundary.',
    techniquesUsed: ['Step-by-Step Problem Solving', 'Concrete Running Example', 'Dependency Mapping (Partial vs Transitive)'],
    expectedOutputCharacteristics: [
      'Trace on a realistic student-course-instructor dataset',
      'Formal functional dependencies expressed as X -> Y',
      'Clean relational schema outputs at 1NF, 2NF, 3NF, and BCNF'
    ]
  },
  {
    id: 17,
    title: 'Software Engineering Exam Preparation',
    category: 'Studying',
    subcategory: 'Software Lifecycle & Methodologies',
    weakPrompt: 'Give important questions for software engineering exam.',
    improvedPrompt: `Act as an external university examiner in Software Engineering. Create a high-yield exam preparation kit covering 4 core syllabus units:
Unit 1: Agile vs Waterfall (Scrum ceremonies, user stories, sprints).
Unit 2: Requirements Engineering (Functional vs Non-Functional requirements, SRS standards).
Unit 3: Design Patterns (Creational: Singleton/Factory, Structural: Adapter, Behavioral: Observer).
Unit 4: Software Testing (Black-box vs White-box, cyclomatic complexity calculation).
For each unit include:
- 1 standard 10-mark question with key scoring points examiners look for.
- 1 tricky 2-mark viva question with a crisp 1-sentence answer.`,
    explanation: 'The weak prompt gives an unstructured list of questions. The improved prompt mirrors university marking schemes with 10-mark rubrics and 2-mark viva definitions.',
    techniquesUsed: ['Examiner Persona', 'Syllabus Decomposition', 'Mark-Graded Structure', 'Scoring Rubric Tips'],
    expectedOutputCharacteristics: [
      'Four organized unit modules',
      '10-mark questions with specific point breakdowns',
      'Cyclomatic complexity calculation formula V(G) = E - N + 2P'
    ]
  },
  {
    id: 18,
    title: 'Mathematics Problem Solving (Recurrence Relations)',
    category: 'Studying',
    subcategory: 'Discrete Mathematics',
    weakPrompt: 'Solve T(n) = 2T(n/2) + n using Master Theorem.',
    improvedPrompt: `Act as a Discrete Mathematics Professor. Solve the recurrence relation T(n) = 2T(n/2) + n using the Master Theorem for algorithm analysis:
Show every algebraic step explicitly:
1. Identify parameters a, b, and f(n) from the general form T(n) = aT(n/b) + f(n).
2. Calculate the critical exponent log_b(a) and state its exact numerical value.
3. Compare f(n) with n^(log_b(a)) asymptotically: state which of the 3 Master Theorem cases applies.
4. Derive the tight Big-Theta Θ bound.
5. Provide a verification by drawing the first 3 levels of the Recurrence Tree showing work done per level.`,
    explanation: 'The weak prompt gives just the answer Θ(n log n). The improved prompt demands the exact algebraic proof, case matching justification, and recurrence tree visualization.',
    techniquesUsed: ['Step-by-Step Derivation', 'Formal Mathematical Proof', 'Recurrence Tree Verification'],
    expectedOutputCharacteristics: [
      'Parameter extraction: a=2, b=2, f(n)=n',
      'Critical exponent calculation: log_2(2) = 1, so n^1',
      'Comparison: f(n) = Θ(n^(log_b a)), invoking Case 2 -> Θ(n log n)',
      'Recurrence tree work sum per level diagram'
    ]
  },
  {
    id: 19,
    title: 'Exam Revision Timetable',
    category: 'Studying',
    subcategory: 'Study Planning & Productivity',
    weakPrompt: 'Make a study timetable for my exams next week.',
    improvedPrompt: `Act as an academic productivity coach for engineering students. Create a realistic 7-day intensive revision timetable for a 2nd-year CSE student preparing for 4 upcoming semester exams:
Subjects: Operating Systems, Computer Networks, Database Management Systems, Theory of Computation.
Constraints:
- Available study time: 7 productive hours per day broken into 50-minute Pomodoro blocks with 10-minute active recall breaks.
- Distribute heavier theoretical subjects (TOC, OS) in high-energy morning slots.
- Incorporate active recall and past paper solving sessions every afternoon.
- Include a final 1-hour evening consolidation review block.
Format as a clean Markdown table with columns: Day, Time Slot, Subject & Topic, Study Technique (e.g., Flashcards, Solving past papers, Feynman technique).`,
    explanation: 'The weak prompt produces an impractical 18-hour cramming plan that causes burnout. The improved prompt uses Pomodoro science, circadian energy scheduling, and evidence-based active recall.',
    techniquesUsed: ['Constraint Framing', 'Circadian Energy Scheduling', 'Pomodoro Method Integration', 'Markdown Table Grid'],
    expectedOutputCharacteristics: [
      'Balanced 7-day hourly schedule table',
      'Specific pairing of topics with study techniques',
      'Built-in recovery and past-paper simulation blocks'
    ]
  },
  {
    id: 20,
    title: 'Multiple-Choice Practice Quiz Generation',
    category: 'Studying',
    subcategory: 'Self-Testing & Active Recall',
    weakPrompt: 'Make some quiz questions on computer architecture.',
    improvedPrompt: `Act as an exam setter for Computer Organization and Architecture. Generate 5 challenging multiple-choice questions (MCQs) on Pipelining and Cache Memory:
Requirements:
1. Include 1 numerical question on calculating pipeline speedup factor and 1 question on direct-mapped cache hit latency.
2. For each question provide: Question stem, 4 plausible options (A, B, C, D) with realistic distractors (not silly giveaways), the Verified Correct Answer, and a detailed 2-sentence explanation of why the correct option is right and why the main distractor is wrong.
3. Conclude with a 1-sentence tip on avoiding common student traps in pipeline hazard questions.`,
    explanation: 'The weak prompt generates trivial questions with obvious answers. The improved prompt requires engineering calculations, plausible distractors, and diagnostic feedback on common mistakes.',
    techniquesUsed: ['Plausible Distractor Construction', 'Calculation-based Questions', 'Diagnostic Explanations'],
    expectedOutputCharacteristics: [
      '5 rigorous engineering MCQs with A/B/C/D choices',
      'Realistic distractors based on common calculation slips',
      'Thorough rationale for both correct answer and tricky distractors'
    ]
  }
];
