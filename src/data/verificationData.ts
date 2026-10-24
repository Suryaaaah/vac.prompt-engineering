import type { VerificationScenario } from '../types';

export interface VerificationTopic {
  id: number;
  title: string;
  shortDesc: string;
  riskFactor: string;
  bestPractice: string;
  warningSigns: string[];
}

export const VERIFICATION_TOPICS: VerificationTopic[] = [
  {
    id: 1,
    title: 'Hallucinations and Fabricated Facts',
    shortDesc: 'LLMs generate plausible-sounding text, including fake URLs, research papers, and library names that do not exist.',
    riskFactor: 'High — Leads to submitting false citations or importing non-existent packages.',
    bestPractice: 'Always verify citations on Google Scholar, IEEE Xplore, or official publisher sites. Never trust a cited DOI without checking it.',
    warningSigns: ['Obscure paper titles by famous authors', 'DOIs that lead to 404 pages', 'Too-convenient historical statistics']
  },
  {
    id: 2,
    title: 'Incorrect Programming Code',
    shortDesc: 'AI code can look syntactically clean while harboring subtle logical flaws, memory leaks, off-by-one errors, or concurrency race conditions.',
    riskFactor: 'High — Software crashes, test failures, or security breaches in production.',
    bestPractice: 'Paste code into a local sandbox, run compiler with strict warnings (-Wall -Wextra), and execute unit tests against boundary cases.',
    warningSigns: ['Missing null checks', 'Using deprecated API methods', 'Assuming infinite resources', 'Unsynchronized shared state']
  },
  {
    id: 3,
    title: 'Outdated Information',
    shortDesc: 'AI training cutoff dates mean models may not know about modern framework releases, security advisories, or revised language syntax.',
    riskFactor: 'Medium — Writing code using obsolete APIs or citing superseded standards.',
    bestPractice: 'Check current official documentation (e.g. React.dev, Python.org, Spring.io) to ensure methods are not deprecated.',
    warningSigns: ['Using class components instead of hooks in React', 'Using deprecated package managers', 'Citing old RFC specifications']
  },
  {
    id: 4,
    title: 'Unsafe or Misleading Advice',
    shortDesc: 'AI might recommend insecure system configurations, such as disabling firewalls, disabling SSL verification, or using raw SQL string concatenation.',
    riskFactor: 'Critical — Exposure to SQL Injection, Remote Code Execution, and credential leakage.',
    bestPractice: 'Audit all configuration and security-critical snippets against OWASP guidelines. Never disable TLS or SSL verification.',
    warningSigns: ['"trustAllCerts = true"', '"chmod 777 /"', '"eval(userInput)"', 'SQL string interpolation']
  },
  {
    id: 5,
    title: 'Source Verification',
    shortDesc: 'Models cannot provide authentic firsthand accounts; they synthesize aggregate impressions across disparate training data.',
    riskFactor: 'Medium — Misattributing quotes, historical timelines, or scientific discoveries.',
    bestPractice: 'Trace claims back to primary authoritative sources (RFCs, official language specs, peer-reviewed journals).',
    warningSigns: ['Vague attribution ("Studies have shown...")', 'Attributing multiple discoveries to one single person']
  },
  {
    id: 6,
    title: 'Testing Code and Calculations',
    shortDesc: 'LLMs struggle with large multi-digit arithmetic, floating-point precision, and complex logical deduction when forced to guess.',
    riskFactor: 'High — Calculation errors in data analysis, structural formulas, or matrix transformations.',
    bestPractice: 'Re-run all numerical calculations using Python interpreter, wolfram alpha, or a dedicated calculator tool.',
    warningSigns: ['Quick answers to large prime number tests', 'Matrix multiplication answers without intermediate steps']
  },
  {
    id: 7,
    title: 'Privacy and Sensitive Data',
    shortDesc: 'Prompts sent to cloud AI providers may be stored for model fine-tuning or reviewed by third-party human evaluators.',
    riskFactor: 'Critical — Compliance violations, privacy breaches, and intellectual property leaks.',
    bestPractice: 'Anonymize data. Redact passwords, API tokens, student names, phone numbers, and company-confidential algorithms.',
    warningSigns: ['Pasting .env files into prompts', 'Pasting real student databases with phone numbers or marks']
  },
  {
    id: 8,
    title: 'Academic Honesty',
    shortDesc: 'Submitting AI-generated solutions without understanding or disclosure violates institutional honor codes.',
    riskFactor: 'High — Disciplinary suspension, failing course grades, and damaged reputation.',
    bestPractice: 'Use AI as a study tutor to understand difficult concepts. Write your own code, and clearly state when and how AI was used as per university guidelines.',
    warningSigns: ['Submitting code you cannot explain during viva', 'Identical code patterns across student lab batches']
  },
  {
    id: 9,
    title: 'Source Attribution',
    shortDesc: 'AI models blend text from thousands of open-source projects without preserving original GPL/MIT licenses or author attributions.',
    riskFactor: 'Medium — Copyright infringement or license compliance breaches.',
    bestPractice: 'Attribute open-source libraries appropriately and check if generated logic belongs to copyrighted codebases.',
    warningSigns: ['Direct verbatim reproduction of proprietary SDKs', 'Unacknowledged code generation in thesis work']
  },
  {
    id: 10,
    title: 'Responsible AI Usage',
    shortDesc: 'Using AI tools with awareness of environmental energy footprints, algorithmic bias, and human cognitive dependency.',
    riskFactor: 'Long-term — Skill atrophy, over-reliance on automated tools, and uncritically accepting biased outputs.',
    bestPractice: 'Maintain fundamental problem-solving skills through manual coding and critical thinking. Treat AI as an assistant, never as the pilot.',
    warningSigns: ['Inability to write basic loops without prompt suggestions', 'Accepting biased hiring or grading filters']
  }
];

export const VERIFICATION_CHECKLIST_ITEMS = [
  { id: 'chk-1', text: 'Is the answer factually supported by established science or engineering?', category: 'Factual Accuracy' },
  { id: 'chk-2', text: 'Can the source, author, and publication be independently verified online?', category: 'Source Credibility' },
  { id: 'chk-3', text: 'Does the official documentation (Oracle, Python.org, MDN) support this API usage?', category: 'API Validity' },
  { id: 'chk-4', text: 'Does the generated code compile cleanly without deprecation warnings?', category: 'Code Integrity' },
  { id: 'chk-5', text: 'Have different input boundary cases (null, empty, negative, max limits) been tested?', category: 'Test Coverage' },
  { id: 'chk-6', text: 'Are all assumptions, hardware limits, and prerequisites clearly stated?', category: 'Assumptions' },
  { id: 'chk-7', text: 'Is the information current and compliant with modern security standards?', category: 'Currency & Security' },
  { id: 'chk-8', text: 'Is sensitive personal data, credentials, and institutional IP protected from leaks?', category: 'Privacy & Safety' }
];

export const VERIFICATION_SCENARIOS: VerificationScenario[] = [
  {
    id: 1,
    title: 'Scenario 1: The Phantom Python Package',
    category: 'Library Hallucination',
    fictionalAiOutput: 'To parse the university course PDF and automatically calculate GPA, install the specialized library: `pip install fast-pdf-gpa-calculator`. Then import `fast_gpa` and call `calculate_marks("grades.pdf")`.',
    possibleIssue: 'The library "fast-pdf-gpa-calculator" does not exist on PyPI. Threat actors often register hallucinated package names with malicious payload code (Dependency Confusion / Slopsquatting).',
    verificationTask: 'Search the Python Package Index (pypi.org) for "fast-pdf-gpa-calculator" and check if it exists and who created it.',
    correctApproach: 'Use established, verified libraries like `pypdf` or `pdfplumber` combined with standard Python parsing logic. Never execute `pip install` on unfamiliar library names without checking PyPI repository stats.',
    riskLevel: 'Critical'
  },
  {
    id: 2,
    title: 'Scenario 2: Subtle SQL Injection in Login Controller',
    category: 'Security Vulnerability',
    fictionalAiOutput: 'Here is a quick Node.js login authentication function:\n```javascript\napp.post("/login", (req, res) => {\n  const query = `SELECT * FROM users WHERE user = "${req.body.username}" AND pass = "${req.body.password}"`;\n  db.query(query, (err, result) => { ... });\n});\n```',
    possibleIssue: 'The AI generated raw string interpolation (`${...}`) directly into a SQL query, creating a classic OWASP Top 10 SQL Injection vulnerability. A user typing `admin" --` can log in without a password.',
    verificationTask: 'Audit the query formation method. Identify whether parameterized queries / prepared statements are being utilized.',
    correctApproach: 'Refactor immediately to use parameterized statements: `db.query("SELECT * FROM users WHERE user = ? AND pass = ?", [req.body.username, req.body.password])` combined with password hashing (bcrypt).',
    riskLevel: 'Critical'
  },
  {
    id: 3,
    title: 'Scenario 3: Hallucinated Academic Citation',
    category: 'Academic Integrity',
    fictionalAiOutput: 'According to a seminal 2023 paper by Dr. H. V. Raman et al., "Quantum Optimization of Distributed Hash Tables" published in IEEE Transactions on Cloud Computing (Vol. 14, pp. 201-218), hash collision rates are reduced by 87% using entanglement indices.',
    possibleIssue: 'The author, paper title, and volume page numbers are completely fabricated by the model to sound prestigious and academic.',
    verificationTask: 'Check IEEE Xplore, Google Scholar, and the author publication history for this paper.',
    correctApproach: 'Search IEEE Xplore directly. When no record is found, discard the claim or consult authentic peer-reviewed surveys. Never cite an unverified paper in a college thesis.',
    riskLevel: 'High'
  },
  {
    id: 4,
    title: 'Scenario 4: The Truncated Float Precision Bug',
    category: 'Calculation Integrity',
    fictionalAiOutput: 'The total compound interest for an initial capital of $100,000 at 7.25% compounded quarterly over 10 years is exactly $105,420.15.',
    possibleIssue: 'The AI guessed a rounded approximation. The real mathematical formula A = P(1 + r/n)^(nt) evaluates to $100,000 * (1 + 0.0725/4)^40 = $105,420.15 is wrong; the correct accumulated amount is $205,420.15, meaning interest alone is $105,420.15, but the AI confused total amount with interest.',
    verificationTask: 'Recompute using a programmatic formula or scientific calculator: evaluate 100000 * ((1 + 0.0725/4)**40 - 1).',
    correctApproach: 'Always write a 2-line Python script or spreadsheet formula to compute mathematical, financial, or statistical equations. Never trust raw arithmetic in text.',
    riskLevel: 'Medium'
  }
];

export const VERIFICATION_REPORT_TEMPLATE = `=====================================================
AI OUTPUT VERIFICATION REPORT
PromptCraft AI — Quality & Safety Audit
=====================================================

1. ITEM UNDER AUDIT:
   - Feature / Module: [e.g., Student Attendance Service]
   - Purpose: [e.g., Parse Excel roster and save to DB]
   - AI Tool Used: [e.g., Claude 3.5 Sonnet / GPT-4o]
   - Date Audited: ${new Date().toISOString().slice(0, 10)}

2. CHECKLIST AUDIT:
   [ ] Factual Accuracy: Verified against official documentation
   [ ] Code Compilability: Tested in local sandbox (Passed / Failed)
   [ ] Security Analysis: OWASP Top 10 vulnerabilities checked (Clean / Flagged)
   [ ] Boundary Cases: Tested null, empty, negative, and overflow inputs
   [ ] Privacy Check: Zero sensitive student data or API keys exposed

3. TESTS ACTUALLY PERFORMED:
   - Compilation: Built with 'javac' / 'tsc' / 'pytest'
   - Test Results: [e.g., 4 unit tests passed, 1 edge-case failed]
   - Output Verification: Compared calculated metrics against manual check

4. DISCOVERED ISSUES & CORRECTIONS:
   - Issue: [Describe any hallucinated method or logic bug]
   - Remediation: [Explain how code was refactored and secured]

5. FINAL STATUS:
   [ ] APPROVED for Project Integration
   [ ] REQUIRES RE-PROMPTING & RE-TESTING
   [ ] REJECTED (Unsafe / Hallucinated)

Auditor Signature: _______________________
`;
