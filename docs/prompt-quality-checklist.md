# Prompt Quality Assurance Checklist

This checklist provides an actionable quality rubric for undergraduate computer science students and engineers to evaluate prompt robustness before relying on AI outputs.

---

## The 8-Point Quality Assessment Rubric

| # | Checkpoint | Target Goal | What to Look For | Score (0-2) |
|---|---|---|---|---|
| **1** | **Role Priming** | Domain vocabulary and perspective activation | Does the prompt state an explicit persona (e.g. *Senior Java Architect*, *Academic Writing Coach*)? | [ ] |
| **2** | **Actionable Task** | Imperative action directive | Does the prompt use unambiguous action verbs (*Refactor*, *Prove*, *Benchmark*) rather than weak verbs (*Help*, *Explain*)? | [ ] |
| **3** | **Context & Background** | Eliminating unstated assumptions | Does the prompt provide technical environment details (e.g. Java 17, PostgreSQL 15, Spring Boot 3)? | [ ] |
| **4** | **Target Audience** | Depth and prerequisite calibration | Is the level of reader expertise specified (*1st-year student*, *Lab external examiner*, *Staff engineer*)? | [ ] |
| **5** | **Boundary Constraints** | Guardrails and negative bounds | Are explicit restrictions listed (*Do not use external libraries*, *O(1) space complexity*, *Under 200 words*)? | [ ] |
| **6** | **Output Schema** | Structured, parseable formats | Is the output format locked down (*Markdown table*, *JSON schema*, *Compilable code block with JUnit*)? | [ ] |
| **7** | **Demonstration Exemplars** | In-context pattern replication | Are 1-2 input-output pairs provided when strict formatting consistency is required? | [ ] |
| **8** | **Verification Demands** | Self-checking prompts | Does the prompt explicitly demand Big-O complexity proofs, boundary tests, or mathematical trace steps? | [ ] |

---

## Scoring Scale
- **14 - 16 Points:** **Production-Grade / High-Precision Prompt.** Highly deterministic output with minimal hallucination risk.
- **10 - 13 Points:** **Competent Prompt.** Clear task, but may require minor iterative follow-ups for edge cases.
- **5 - 9 Points:** **Weak Prompt.** Ambiguous bounds; likely to produce generic, verbose, or partially inaccurate responses.
- **0 - 4 Points:** **Flawed / High-Risk Prompt.** Completely unguided; high risk of hallucinated libraries or wrong assumptions.

---

## Quick Example Evaluation

### Prompt A (Score: 2/16)
> *"Write a program to sort numbers in Java."*
- Role: Missing (0)
- Task: Vague (1)
- Context: Missing Java version or data size (0)
- Audience: Unstated (0)
- Constraints: No algorithm or memory bounds (0)
- Output: No code structure specified (1)
- Examples: None (0)
- Verification: None (0)

### Prompt B (Score: 16/16)
> *"Act as a Computer Science Lab Instructor. Write a clean, compilable Java 17 method implementing in-place QuickSort on a generic Comparable array. Handle null and empty array edge cases. Audience: 2nd-year CSE students. Constraints: Do not use java.util.Arrays.sort(). Format: Full compilable class, followed by O(N log N) time complexity derivation and 3 JUnit 5 unit tests."*
- Meets all 8 quality checkpoints with maximum precision.
