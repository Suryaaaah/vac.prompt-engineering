# Responsible AI & Engineering Ethics Guide

## 1. Ethical Principles for Computer Science Undergraduates

As generative AI tools become integrated into modern software development, undergraduate engineers bear a professional and ethical responsibility to ensure that AI amplification does not compromise safety, integrity, or intellectual honesty.

### 1.1 Treat AI as a Cognitive Partner, Not an Uncritical Author
- **The Assistant Principle:** AI models are productivity multipliers. They excel at drafting outlines, brainstorming architectures, and explaining obscure compiler error traces.
- **The Pilot Responsibility:** The human engineer remains 100% accountable for the correctness, performance, and legal safety of every line of committed code.

---

## 2. Academic Honesty & Institutional Integrity

### 2.1 The Viva Voce Standard
If you submit a programming assignment or project module containing AI-assisted code, ask yourself:
> *"Can I explain every data structure, loop invariant, and memory allocation choice to my professor during viva voce?"*

If the answer is no, you have violated the principle of academic mastery. Submitting code you cannot explain constitutes academic dishonesty.

### 2.2 Transparent Attribution
When permitted by university coursework policy, document your AI utilization openly in your code header or thesis methodology:
```java
/**
 * Module: QuickSortWithMedianOfThree
 * Author: Jane Doe (Roll No: 24BCSE102)
 * AI Assistance Disclosure:
 * - Architecture & recursive partitioning logic designed manually.
 * - AI assistant (Claude 3.5) was used to scaffold JUnit 5 parameterized edge-case tests.
 * - All code compiled, audited, and verified locally.
 */
```

---

## 3. Data Privacy & Sensitive Information Guardrails

### 3.1 What NEVER to Paste into Cloud AI Prompts
1. **API Keys & Secrets:** AWS access keys, Stripe secret tokens, database connection strings with passwords.
2. **Personally Identifiable Information (PII):** Student names, Aadhaar/SSN numbers, home addresses, confidential marks sheets.
3. **Proprietary & NDA-Bound Source Code:** Commercial codebase intellectual property without institutional authorization.

### 3.2 Safe Sanitization Protocols
Always anonymize data before prompting:
- Replace real server IP addresses with RFC 5737 dummy addresses (`192.0.2.1`).
- Replace student names with placeholders (`student_01`, `student_02`).
- Replace private database URLs with standard local references (`localhost:5432/test_db`).

---

## 4. Hallucination Hazards & Slopsquatting Defense

### 4.1 What is Slopsquatting / Dependency Confusion?
When an AI hallucinates a non-existent package name (e.g. `pip install fast-pdf-gpa-parser`), malicious threat actors monitor model outputs and register those exact phantom package names on public repositories (PyPI, npm) embedding malware.

### 4.2 Mandatory Package Verification Rule
Before running `npm install <package>` or `pip install <package>` suggested by an AI:
1. Search the official registry ([npmjs.com](https://www.npmjs.com) or [pypi.org](https://pypi.org)).
2. Inspect package creation date, weekly downloads, and GitHub repository links.
3. If a package has 0 downloads and was created yesterday, **DO NOT INSTALL IT**.

---

## 5. Summary Checklist for Responsible AI
- [x] I understand every line of code I am submitting.
- [x] I have tested edge cases with real execution.
- [x] I have redacted all credentials, secrets, and personal information.
- [x] I have disclosed AI assistance in accordance with course policy.
- [x] I have independently verified all cited research papers and documentation.
