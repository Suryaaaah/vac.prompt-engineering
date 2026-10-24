# AI Output Verification Report Template

This standardized template provides a structured audit document for verifying AI-generated code, algorithms, or technical claims before integrating them into academic or commercial software projects.

---

```markdown
================================================================================
                    AI OUTPUT VERIFICATION REPORT
================================================================================

1. AUDIT METADATA
--------------------------------------------------------------------------------
Project / Module Name : [e.g., Student Attendance Microservice]
Candidate Feature     : [e.g., CSV Attendance Log Parser]
AI Model Used         : [e.g., Claude 3.5 Sonnet / GPT-4o / Gemini 1.5 Pro]
Auditor Name & ID     : [e.g., Rahul S. — 24BCSE102]
Date of Evaluation    : [YYYY-MM-DD]
Repository Branch     : [e.g., feature/csv-parser-v1]

2. CHECKLIST VERIFICATION MATRIX
--------------------------------------------------------------------------------
[ ] 1. Factual Accuracy        : Claims verified against official documentation
[ ] 2. Source Credibility      : Cited authors/papers verified on Google Scholar/IEEE
[ ] 3. API & Framework Validity: Methods confirmed not deprecated in modern LTS
[ ] 4. Code Compilability      : Compiles with 0 errors under strict compiler warnings
[ ] 5. Boundary Test Coverage  : Tested against null, empty, negative, max-bound inputs
[ ] 6. Explicit Assumptions    : Memory limits, threading, and runtime prerequisites noted
[ ] 7. Security & OWASP Audit  : Zero SQL injections, command injections, or plaintext tokens
[ ] 8. Privacy Compliance      : Zero student PII or proprietary credentials exposed

3. TESTS ACTUALLY PERFORMED
--------------------------------------------------------------------------------
Describe the exact physical tests executed on the candidate code:
- Test 1 (Compilation): Executed `javac -Xlint:all FactorialCalculator.java` (Passed / Failed)
- Test 2 (Unit Testing): Ran JUnit 5 suite containing 5 boundary test cases
- Test 3 (Static Analysis): Scanned code using SonarLint / ESLint
- Test 4 (Runtime Verification): Tested with empty dataset and max 64-bit integer

4. RESULTS OBSERVED
--------------------------------------------------------------------------------
Record the observed outputs, execution times, and memory behaviors:
- Observed Return Values: [e.g., Correctly returned IllegalArgumentException on -5]
- Memory Usage: [e.g., Heap memory remained stable under 32MB]
- Edge Case Behavior: [e.g., Gracefully handled null input without throwing unhandled NPE]

5. DEFECTS DISCOVERED & REMEDIATION
--------------------------------------------------------------------------------
Detail any subtle bugs, hallucinations, or security hazards found in the AI draft:
- Flaw 1 (Hallucination): [e.g., AI invented a non-existent method `MathUtils.fastPow()`]
  - Remediation: Replaced with standard Java `Math.pow()` and documented precision.
- Flaw 2 (Security): [e.g., Query used unparameterized string concatenation]
  - Remediation: Refactored to PreparedStatement with parameterized `?` bindings.

6. KNOWN LIMITATIONS
--------------------------------------------------------------------------------
Document remaining system constraints:
- Concurrency: This implementation is not thread-safe for shared mutable state.
- Scalability: Operates in memory; datasets exceeding 500,000 rows require batch streaming.

7. TESTS STILL PENDING
--------------------------------------------------------------------------------
List tests that could not be run during this audit phase:
- [ ] Load testing with Apache JMeter under 1,000 concurrent virtual users.
- [ ] Integration testing with the live departmental PostgreSQL database.

8. FINAL AUDIT DECISION
--------------------------------------------------------------------------------
[ ] APPROVED FOR MERGE    — All critical tests passed; zero known safety hazards.
[ ] CONDITIONAL RE-AUDIT — Minor bugs patched; pending integration test pass.
[ ] REJECTED              — Insecure or hallucinated core logic; re-prompting required.

Auditor Signature: __________________________    Date: ______________
================================================================================
```
