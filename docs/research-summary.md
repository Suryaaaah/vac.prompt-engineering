# PromptCraft AI — Research Summary & Official Documentation

## Executive Overview
Prompt engineering is the engineering discipline of structuring natural language inputs to predictably steer Large Language Model (LLM) behavior. Rather than being an art of guesswork, it relies on mathematical and empirical principles of autoregressive transformer architectures.

This document compiles the foundational research and official engineering guidelines from the primary AI laboratories: **OpenAI**, **Anthropic**, and **Google DeepMind / Google Cloud**.

---

## 1. Verified Official Laboratory Guidelines

### 1.1 OpenAI Prompt Engineering Guidelines
*Source:* [OpenAI Official Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)  
*Status:* Authoritative industry documentation.

**Core Principles Identified:**
1. **Write Clear Instructions:** LLMs cannot read minds. If outputs are too long, request brevity. If code is too obscure, request junior-friendly syntax.
2. **Provide Reference Text:** Instruct the model to ground its responses exclusively in provided context to eliminate hallucination vectors.
3. **Split Complex Tasks into Subtasks:** Break down multi-stage programming assignments into modular stages (e.g., input validation -> algorithmic solution -> unit test verification).
4. **Give the Model "Time to Think":** Instruct models to generate intermediate steps or chain of thought before emitting final answers.
5. **Use External Tools:** Leverage code sandboxes and function calling when exact mathematical or database retrieval is required.

---

### 1.2 Anthropic Claude Prompt Engineering Guidelines
*Source:* [Anthropic Interactive Prompt Tutorial](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)  
*Status:* Authoritative industry documentation.

**Core Principles Identified:**
1. **Be Clear, Direct, and Detailed:** Provide high context density.
2. **Use XML Delimiters:** Encapsulate different components of a prompt inside distinct tags (e.g. `<instructions>`, `<context>`, `<rules>`, `<examples>`) to ensure the model parses roles and constraints cleanly.
3. **Assign Roles and Personas:** Priming Claude with a specialized role (e.g., "Senior Systems Architect") alters its word selection and rigor.
4. **Few-Shot Prompting (Exemplars):** Provide 1 to 3 demonstration pairs to establish formatting, style, and tone consistency.
5. **Precognition / Scratchpad Prompting:** Allow the model to show its reasoning inside `<thinking>` tags before answering.

---

### 1.3 Google DeepMind & Google Cloud Gemini Strategies
*Source:* [Google Cloud Vertex AI Prompt Design Guide](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction)  
*Status:* Authoritative industry documentation.

**Core Principles Identified:**
1. **Structured Inputs and Output Schema Constraints:** Direct models to produce structured JSON or Markdown tables to facilitate programmatic consumption.
2. **Negative Constraints:** State what the model must *not* do (e.g., "Do not use deprecated libraries, do not import external packages").
3. **Grounding:** Connecting the model to verifiable external sources or private enterprise repositories to anchor facts.
4. **Task Decomposition:** Guiding multi-turn conversations through incremental prompts.

---

## 2. Foundational Academic Literature

1. **Wei et al. (2022) — "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"**  
   *arXiv:2201.11903*  
   *Finding:* Generating a sequence of intermediate reasoning steps significantly enhances the ability of large language models to perform complex arithmetic, commonsense, and symbolic reasoning.
   
2. **Yao et al. (2022) — "ReAct: Synergizing Reasoning and Acting in Language Models"**  
   *arXiv:2210.03629*  
   *Finding:* Interleaving reasoning traces ("Thought") with domain-specific tool executions ("Action") and environmental feedback ("Observation") creates dynamic reasoning loops that drastically lower hallucination rates compared to static prompts.

3. **Brown et al. (2020) — "Language Models are Few-Shot Learners"**  
   *arXiv:2005.14165*  
   *Finding:* In-context learning enables models to recognize task requirements from demonstration examples without parameter updates.

---

## 3. Distinction: Verified Sources vs. Simulated Educational Examples

| Element | Nature | Source / Verification Method |
|---|---|---|
| **Core Prompting Patterns** | Verified Scientific Standard | Published in peer-reviewed proceedings (NeurIPS, ICLR) and official laboratory documentation. |
| **API Guidelines** | Verified Official Docs | OpenAI, Anthropic, Google Cloud Developer documentation. |
| **Workshop Exercises & Code Snippets** | Pedagogical Demonstrations | Created specifically for PromptCraft AI to illustrate educational concepts to undergraduates. |
| **Simulated Defect Scenarios** | Instructive Case Studies | Synthetic educational scenarios based on real-world common student mistakes and OWASP Top 10 vulnerabilities. |

---

## 4. Unverified / Pending Items
- *Future LLM Benchmarking:* Local latency benchmarks across client-side WebGPU models (e.g., WebLLM with Llama 3) remain pending future testing.
