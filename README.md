# PromptCraft AI — Prompt Engineering Workshop Kit

> **"Learn to Prompt Smarter. Build with AI."**  
> *An educational, interactive web platform designed for First-Year and Second-Year Computer Science Engineering students.*

---

## 🚀 Overview

**PromptCraft AI** is a complete, modern, responsive educational web application and workshop platform. It bridges the gap between conversational AI usage and rigorous engineering practices, teaching undergraduate computer science students how to structure deterministic prompts, reduce hallucinations, debug code systematically, and audit AI outputs responsibly.

### Key Value Propositions
- **100% Offline & Local Execution:** Requires zero paid API keys; uses a client-side deterministic rule-based analysis engine.
- **Privacy & Academic Integrity by Design:** Runs entirely inside the browser's LocalStorage—no student data, credentials, or code snippets leave the machine.
- **College Demonstration Ready:** Includes an interactive Prompt Playground, a 20-example before-and-after library, a 12-question quiz with instant feedback, a 120-minute printable workshop schedule, and responsible AI verification tools.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Vanilla CSS Design System with dark-first theme (`#080B14`, `#0E1322`, `#12192B`)
- **Navigation:** React Router v7
- **Icons:** Lucide React
- **Animations:** Framer Motion & CSS Micro-Interactions
- **Celebration Effects:** Canvas-Confetti
- **Storage:** Browser `window.localStorage` with JSON import/export portability

---

## 🧭 Navigation & Modules

| # | Section | Route | Description |
|---|---|---|---|
| 1 | **Overview** | `/` | Hero dashboard with animated prompt transformer, live stats, progress tracking, and recent activity. |
| 2 | **Learn Prompting** | `/learn` | 7 educational modules (Intro, Role, Task, Context/Format, Few-Shot, Step-by-Step, ReAct) with hints and completion tracking. |
| 3 | **Prompt Playground** | `/playground` | Interactive diagnostic assistant analyzing Role, Task, Context, Audience, Constraints, and Output Format. |
| 4 | **Example Library** | `/examples` | Exactly 20 before-and-after comparisons across Coding (7), Writing (6), and Studying (7). |
| 5 | **Interactive Quiz** | `/quiz` | 12 multiple-choice questions with 4 choices each, scoring, review explanations, and confetti rewards. |
| 6 | **Prompt Library** | `/library` | LocalStorage repository to save, edit, filter, tag, star, and export/import custom prompts. |
| 7 | **Workshop Planner** | `/workshop` | Exactly 120-minute (2-hour) 9-session curriculum with printable layout and hands-on exercises. |
| 8 | **AI Verification** | `/verification` | 8-point verification checklist, 4 defect scenarios, 10 ethics principles, and audit report template. |
| 9 | **Project Resources** | `/resources` | Reusable prompt template, quality checklist, research summary, and presentation slides outline. |
| 10 | **Settings** | `/settings` | Storage diagnostics, full system backup download/upload, and progress reset controls. |

---

## ⚙️ Quick Start & Local Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended; verified on Node v24 LTS)
- npm or pnpm

### Installation
```bash
# 1. Clone or extract project repository
cd vac

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production preview
npm run build
npm run preview
```

Open your browser at `http://localhost:5173/`.

---

## 📚 Project Documentation

Detailed engineering guides and workshop plans are available in the [`docs/`](./docs) folder:
1. [`docs/research-summary.md`](./docs/research-summary.md) — Prompting patterns backed by OpenAI, Google, Anthropic, and academic literature.
2. [`docs/prompt-quality-checklist.md`](./docs/prompt-quality-checklist.md) — 8-point rubric for production-grade prompt evaluation.
3. [`docs/workshop-plan.md`](./docs/workshop-plan.md) — 120-minute instructional session plan with speaker notes.
4. [`docs/verification-report-template.md`](./docs/verification-report-template.md) — Standard audit report template for testing AI outputs.
5. [`docs/ai-ethics.md`](./docs/ai-ethics.md) — Guidelines on academic honesty, hallucinations, and sensitive data protection.
6. [`docs/important-prompts.md`](./docs/important-prompts.md) — Record of core prompts used and designed during development.
7. [`docs/project-testing.md`](./docs/project-testing.md) — Comprehensive test execution logs and verification results.

---

## ⚖️ License & Academic Disclosure

Created for undergraduate Computer Science Engineering curriculum instruction and academic project demonstrations. Educational open-source use.
