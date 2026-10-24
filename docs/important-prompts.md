# PromptCraft AI — Important Prompts Record

This document records the key prompts engineered and utilized during the development, verification, and architecture of the **PromptCraft AI** platform.

---

## 1. System Architecture & Component Design Prompts

### Prompt 1.1: Visual Design System Definition
- **Purpose:** Establishing consistent color tokens, dark-first contrast, and glassmorphism styling compliant with modern web accessibility guidelines.
- **Engineered Prompt:**
  ```text
  Role: Act as a Principal Design Systems Architect.
  Task: Define a tailored dark-first visual design system in Tailwind CSS for an educational engineering platform.
  Context: Target audience is 1st and 2nd year Computer Science students.
  Color Palette: Background (#080B14), Secondary (#0E1322), Card (#12192B), Primary (#8B5CF6), Secondary (#6366F1), Cyan (#22D3EE), Text (#F8FAFC, #94A3B8).
  Constraints: Avoid neon eye-strain; enforce 12px to 20px rounded corners; ensure WCAG 2.1 AA text contrast; provide smooth transitions.
  Output Format: Complete tailwind.config.js configuration and index.css utility classes.
  ```

---

## 2. Rule-Based Prompt Improvement Engine Prompts

### Prompt 2.1: Prompt Anatomy Diagnostic Parser
- **Purpose:** Analyzing natural language inputs to detect missing parameters (Role, Task, Context, Audience, Constraints, Format, Exemplars) without relying on external cloud LLM APIs.
- **Engineered Prompt:**
  ```text
  Role: Act as a Senior Computational Linguist and Rule-Based AI Engine Developer.
  Task: Create a deterministic TypeScript diagnostic function `analyzePrompt(text: string)` that scores instruction completeness from 0 to 100.
  Detection Criteria:
  1. Role / Persona (regex: "act as", "you are", "role:")
  2. Actionable Task (imperative action verbs)
  3. Technical Context (language names, versions, frameworks)
  4. Audience (prerequisites, grade level)
  5. Constraints (negative bounds, space/time limits)
  6. Output Format (tables, schemas, unit tests)
  Output Format: Pure TypeScript function with explicit interfaces and zero external runtime dependencies.
  ```

---

## 3. Curated Benchmark Example Prompts

### Prompt 3.1: Java Factorial with BigInteger & Recursion
- **Purpose:** Demonstrating the before-and-after contrast between a trivial 1-line query and a high-precision lab prompt addressing integer overflow and recursive stack frames.
- **Before:** `"Write a factorial program in Java."`
- **After:**
  ```text
  Act as a Computer Science Lab Instructor. Write a complete, compilable Java 17 class named FactorialCalculator that includes:
  1. Both iterative and recursive methods for calculating factorials.
  2. Robust input validation: handle negative integers (throw IllegalArgumentException) and values greater than 20 using BigInteger to prevent arithmetic overflow.
  3. A main method demonstrating edge cases (n=0, n=1, n=5, n=25) with formatted console output.
  4. Javadoc comments explaining time complexity O(n) and space complexity O(1) iterative vs O(n) recursive stack frames.
  ```

### Prompt 3.2: Database Normalization Step-by-Step
- **Purpose:** Teaching students to avoid unverified relational decompositions by commanding explicit 1NF to BCNF dependency tracking.
- **Before:** `"How to normalize database tables?"`
- **After:**
  ```text
  Act as a Senior Database Architect tutoring a university student. Walk through Relational Database Normalization step-by-step from un-normalized data through Boyce-Codd Normal Form (BCNF):
  Given a sample unnormalized student table: StudentEnrolment(StudentID, StudentName, CourseID, CourseName, InstructorID, InstructorOffice).
  1. 1NF: Eliminate repeating groups / multi-valued attributes and establish primary keys.
  2. 2NF: Remove partial dependencies (functional dependencies on a subset of a composite key).
  3. 3NF: Remove transitive dependencies (non-prime attributes determining non-prime attributes).
  4. BCNF: Enforce that every determinant is a candidate key.
  At each stage: state the rule violation in plain English, display the resulting decomposed tables with schemas, and highlight foreign key links.
  ```

---

## 4. Evaluation & Quiz Construction Prompts

### Prompt 4.1: Quiz Question Generator with Plausible Distractors
- **Purpose:** Developing 12 rigorous multiple-choice questions testing conceptual comprehension rather than trivial recall.
- **Engineered Prompt:**
  ```text
  Role: Act as an External University Exam Setter for Computer Science.
  Task: Draft 12 multiple choice questions covering prompt engineering fundamentals, token probability, role priming, few-shot patterns, ReAct loops, hallucination detection, OWASP code security, and academic honesty.
  Constraints:
  - Exactly 4 options per question (A, B, C, D).
  - Include plausible distractors reflecting common student misconceptions.
  - Exactly 1 unambiguous, verified correct answer per question.
  - Accompany each question with a 2-sentence technical rationale.
  Output Format: Strongly-typed TypeScript array of QuizQuestion objects.
  ```
