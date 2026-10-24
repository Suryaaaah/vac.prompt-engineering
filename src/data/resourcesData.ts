export const PROMPT_QUALITY_CHECKLIST = [
  { id: 'qc-1', item: 'Role Specified', desc: 'Is an explicit persona, role, or technical domain expertise defined?' },
  { id: 'qc-2', item: 'Action Verb Directed', desc: 'Does the prompt use clear imperative verbs (Deconstruct, Refactor, Prove, Benchmark) instead of vague requests (Help, Tell)?' },
  { id: 'qc-3', item: 'Sufficient Context', desc: 'Does the prompt supply necessary background info, system environment, and dependencies?' },
  { id: 'qc-4', item: 'Target Audience Defined', desc: 'Is the expertise level of the reader specified (e.g., 2nd-year CSE student vs senior engineer)?' },
  { id: 'qc-5', item: 'Explicit Constraints', desc: 'Are boundaries, word limits, prohibited libraries, and negative constraints listed?' },
  { id: 'qc-6', item: 'Strict Output Format', desc: 'Is the format locked down (Markdown table, JSON schema, plantUML, runnable unit test)?' },
  { id: 'qc-7', item: 'Exemplars / Few-Shot', desc: 'When consistency is needed, are 1-2 input-output demonstrations provided?' },
  { id: 'qc-8', item: 'Verification Demands', desc: 'Does the prompt ask for test cases, complexity analysis, or validation checks?' }
];

export const REUSABLE_PROMPT_TEMPLATE = `Role:
Act as a [e.g. Senior Software Architect / Patient Computer Science Professor]

Task:
[Specific imperative command: e.g., Implement, Refactor, Compare, Prove]

Context:
[Background environment: Language version, framework, project purpose, existing code snippet]

Audience:
[Target reader: First-year CSE student / External project evaluator / Junior developer]

Constraints:
- [Rule 1: e.g., Do not use external libraries]
- [Rule 2: e.g., Must handle null and negative input boundaries]
- [Rule 3: e.g., Maximum 250 words / O(1) space complexity]

Output Format:
[Structured format: Markdown table / Valid JSON matching schema / Compilable code with unit tests]

Examples (Optional Few-Shot):
Input: [...]
Output: [...]

Verification Requirements:
[Include Big-O time/space complexity analysis and 3 edge-case test demonstrations]`;

export const RESEARCH_SUMMARY = {
  title: 'Research Summary & Authoritative Industry Documentation',
  overview: 'Prompt engineering methodologies have evolved from ad-hoc empirical heuristics into structured software disciplines backed by leading AI labs. Here are the core verified reference sources.',
  sources: [
    {
      lab: 'OpenAI',
      resource: 'OpenAI Prompt Engineering Guide',
      url: 'https://platform.openai.com/docs/guides/prompt-engineering',
      keyTactics: [
        'Write clear instructions (ask the model to adopt a persona, specify steps, provide examples)',
        'Provide reference text and instruct the model to answer using only the reference text',
        'Split complex tasks into simpler subtasks',
        'Give the model time to think (chain of thought / step-by-step reasoning)',
        'Use external tools (code execution, embeddings retrieval)'
      ]
    },
    {
      lab: 'Anthropic',
      resource: 'Anthropic Interactive Prompt Engineering Tutorial',
      url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
      keyTactics: [
        'Be clear, direct, and detailed',
        'Use XML tags (<instructions>, <context>, <example>) to structure complex prompts cleanly',
        'Assign roles and prime Claude with specific personas',
        'Use few-shot prompting to lock in output syntax and tone',
        'Allow Claude to think before answering (scratchpad prompting)'
      ]
    },
    {
      lab: 'Google DeepMind & Google Cloud',
      resource: 'Google Cloud Prompt Design Strategies & Gemini Documentation',
      url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction',
      keyTactics: [
        'Define clear task boundaries and output formats (JSON schemas, tables)',
        'Provide positive and negative constraints',
        'Ground model generations with search tools or private data sources (Grounding)',
        'Test prompts systematically across representative temperature settings and inputs'
      ]
    },
    {
      lab: 'Academic Foundations',
      resource: 'Wei et al. (2022) & Yao et al. (2022)',
      url: 'https://arxiv.org/abs/2201.11903 (Chain-of-Thought) | https://arxiv.org/abs/2210.03629 (ReAct)',
      keyTactics: [
        'Chain-of-Thought (CoT) prompting elicits multi-step reasoning in large language models',
        'ReAct demonstrates synergistic reasoning and acting loops, significantly reducing hallucination rates when tools are available'
      ]
    }
  ]
};

export const WORKSHOP_LEARNING_OBJECTIVES = [
  'Understand the autoregressive, token-prediction mechanics of modern Large Language Models.',
  'Master the 6-component Prompt Anatomy (Role, Task, Context, Constraints, Format, Exemplars).',
  'Transform vague, one-line student queries into high-precision, production-grade prompts.',
  'Implement few-shot and step-by-step reasoning patterns for algorithms, data structures, and math.',
  'Identify AI hallucinations, fabricated citations, and subtle code security vulnerabilities.',
  'Adopt institutional academic integrity guidelines and responsible data privacy practices.'
];

export const PRESENTATION_OUTLINE = [
  {
    slideNumber: 1,
    title: 'PromptCraft AI: The Developer Guide to Prompting',
    talkingPoints: ['Welcome cohort', 'Why prompt engineering is the new high-level programming language', 'Workshop roadmap']
  },
  {
    slideNumber: 2,
    title: 'Under the Hood: Probabilistic Token Prediction',
    talkingPoints: ['How LLMs really work (no magic consciousness)', 'Attention mechanisms & context windows', 'Garbage In, Garbage Out']
  },
  {
    slideNumber: 3,
    title: 'The Anatomy of a High-Precision Prompt',
    talkingPoints: ['Role priming', 'Action verbs & explicit task scope', 'Context, constraints, and schemas']
  },
  {
    slideNumber: 4,
    title: 'Few-Shot & Step-by-Step Problem Solving',
    talkingPoints: ['Teaching by demonstration', 'Eliminating math/logic leaps', 'ReAct: Thought-Action-Observation loops']
  },
  {
    slideNumber: 5,
    title: 'Hands-On Lab: The Prompt Playground',
    talkingPoints: ['Live coding diagnostics', 'Refactoring weak prompts', 'Building your personal prompt library']
  },
  {
    slideNumber: 6,
    title: 'The Critical Rule: AI Verification & Ethics',
    talkingPoints: ['Hallucination traps (phantom libraries, fake papers)', 'Security vulnerabilities in AI code', 'Academic honesty & attribution']
  },
  {
    slideNumber: 7,
    title: 'Wrap-Up: Test Your Knowledge',
    talkingPoints: ['Interactive 12-question quiz challenge', 'Reviewing top missed concepts', 'Next steps & take-home resources']
  }
];
