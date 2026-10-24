import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Prompt Engineering Basics',
    question: 'How do Large Language Models (LLMs) fundamentally generate answers when responding to user prompts?',
    options: [
      'They query a live relational database of truth and copy verified records.',
      'They predict the statistically most probable sequence of subsequent tokens based on the provided context.',
      'They compile and run a hidden virtual Python sandbox for all incoming sentences.',
      'They search Google in real-time for every word and concatenate top search snippets.'
    ],
    correctIndex: 1,
    explanation: 'LLMs are autoregressive probabilistic models trained to predict the next token given preceding context. They do not intrinsically know "truth" or automatically execute sandboxes unless specifically augmented with external tool agents.'
  },
  {
    id: 2,
    topic: 'Role Prompting',
    question: 'What is the primary technical benefit of using Role Prompting (e.g. "Act as a Senior Database Administrator")?',
    options: [
      'It bypasses the safety guardrails and moderation filters of the AI.',
      'It primes the model latent weights to activate domain-specific vocabulary, standards, and technical depth.',
      'It grants the AI administrative permissions to access your local file system.',
      'It forces the AI to output exactly 100% truthful facts with no possibility of error.'
    ],
    correctIndex: 1,
    explanation: 'Role prompting primes the neural network weights toward domain-relevant terminology, best practices, and the expected tone/depth of that profession. It does not grant system access or eliminate hallucinations.'
  },
  {
    id: 3,
    topic: 'Task Clarity',
    question: 'Which of the following prompt formulations demonstrates the highest level of task clarity for a programming assignment?',
    options: [
      'Can you help me do something cool with linked lists in C?',
      'Write a function in C to insert a node at the head of a singly linked list; handle NULL head pointers, return the new head pointer, and include time complexity in Big-O.',
      'Explain linked lists with code and make it very detailed and good for students.',
      'Do my computer science homework on pointer structures.'
    ],
    correctIndex: 1,
    explanation: 'Option B specifies the exact programming language (C), the precise action (insert at head), the data structure (singly linked list), edge cases (NULL pointer), return types, and documentation requirements (Big-O).'
  },
  {
    id: 4,
    topic: 'Context & Audience',
    question: 'Why is defining the target audience (e.g. "for a first-year student" vs "for a doctoral researcher") essential in technical prompts?',
    options: [
      'Because the AI cannot understand English without an audience label.',
      'It calibrates the appropriate abstraction level, technical jargon, assumed prerequisites, and pedagogical tone.',
      'It changes the underlying programming language of the neural network.',
      'It guarantees that the output will be shorter than 50 words.'
    ],
    correctIndex: 1,
    explanation: 'Audience framing prevents the AI from either over-simplifying with cartoonish metaphors for an expert or overwhelming a beginner with dense graduate-level mathematical formalisms.'
  },
  {
    id: 5,
    topic: 'Output Formatting',
    question: 'When you need an AI model output to be consumed by an automated web backend or script, which constraint is most effective?',
    options: [
      'Saying "Please give me JSON and be polite".',
      'Specifying a strict JSON schema, requesting only valid JSON, and explicitly banning conversational preamble or markdown backticks.',
      'Typing the word JSON ten times in all capital letters.',
      'Asking the model to format it as a Microsoft Word DOCX attachment.'
    ],
    correctIndex: 1,
    explanation: 'Modern LLMs respect schema definitions and negative constraints (e.g., "no markdown ticks or conversational text"). This ensures the output can be cleanly parsed by JSON.parse() without syntax errors.'
  },
  {
    id: 6,
    topic: 'Few-Shot Prompting',
    question: 'What distinguishes "Few-Shot Prompting" from "Zero-Shot Prompting"?',
    options: [
      'Few-shot prompting costs less money on all AI API platforms.',
      'Few-shot prompting supplies one or more explicit input-output exemplars inside the prompt to guide pattern replication.',
      'Few-shot prompting limits the AI to only answering in three sentences.',
      'Few-shot prompting means the user gets only three chances to prompt before being banned.'
    ],
    correctIndex: 1,
    explanation: 'Few-shot prompting incorporates demonstration examples directly within the context window, allowing the model to emulate the style, schema, and reasoning structure without needing parameter fine-tuning.'
  },
  {
    id: 7,
    topic: 'Step-by-Step Problem Solving',
    question: 'Why does asking an AI to show intermediate calculation steps improve accuracy on complex math or logic tasks?',
    options: [
      'It unlocks the AI hidden unconscious mind.',
      'Generating intermediate reasoning tokens gives the autoregressive model computational space to deduce the final answer rather than jumping to an uncalculated guess.',
      'It increases the GPU clock speed in the AI datacenter.',
      'It compiles the math in real-time into C++ machine code.'
    ],
    correctIndex: 1,
    explanation: 'Because LLMs generate token-by-token, intermediate tokens provide explicit context and working memory for subsequent token generation. Forcing an immediate single-token answer forces the model to predict the result without intermediate calculation.'
  },
  {
    id: 8,
    topic: 'ReAct (Reasoning and Acting)',
    question: 'In the ReAct prompting framework used in AI agents, what are the three iterative components of the loop?',
    options: [
      'Prompt, Payment, Download.',
      'Thought (Reasoning), Action (Tool execution), and Observation (Environment feedback).',
      'Request, Approval, Termination.',
      'HTML, CSS, and JavaScript.'
    ],
    correctIndex: 1,
    explanation: 'ReAct synergizes Reasoning (Thought) and Acting (Action) with external observations (Observation) from tools like search, databases, or terminal execution before formulating the next step or final answer.'
  },
  {
    id: 9,
    topic: 'AI Hallucinations',
    question: 'What is an "AI Hallucination" in the context of Large Language Models?',
    options: [
      'When the user sees glowing colors on their computer monitor.',
      'When an AI generates plausible-sounding statements, library names, or citations that are factually fabricated or non-existent.',
      'When the server experiences a physical hardware power outage.',
      'When an AI model refuses to answer a prompt due to rate limits.'
    ],
    correctIndex: 1,
    explanation: 'Hallucinations occur when probabilistic token prediction strings together grammatically fluid and authoritative-sounding statements that have no factual reality (e.g., citing fake research papers or non-existent API methods).'
  },
  {
    id: 10,
    topic: 'Source Verification',
    question: 'What is the most responsible way to verify AI-generated computer science code before committing it to a project?',
    options: [
      'Assume it is correct because modern AI models scored high on benchmarks.',
      'Ask the same AI prompt a second time and check if it agrees with itself.',
      'Inspect the logic, cross-reference official documentation, compile in a sandbox, and execute comprehensive unit tests.',
      'Post the raw code on social media and check how many likes it gets.'
    ],
    correctIndex: 2,
    explanation: 'AI code must always be treated as unverified candidate code. Responsible engineers verify syntax, inspect logic, check official framework docs, and execute rigorous unit and boundary tests.'
  },
  {
    id: 11,
    topic: 'Privacy & Sensitive Data',
    question: 'When using public cloud-hosted AI tools, what kind of information should NEVER be pasted into a prompt?',
    options: [
      'Standard algorithm definitions like Quicksort.',
      'API secret keys, database credentials, personally identifiable student data (PII), and proprietary commercial code.',
      'Public HTML tags and CSS class names.',
      'Definitions of Big-O asymptotic notations.'
    ],
    correctIndex: 1,
    explanation: 'Public AI chat models may log or retain user prompts for training or inspection. Sensitive tokens, private database passwords, client credentials, and personal confidential records must never be uploaded.'
  },
  {
    id: 12,
    topic: 'Responsible AI & Academic Integrity',
    question: 'How should a Computer Science student ethically use AI assistants for university coursework and assignments?',
    options: [
      'Copy the assignment prompt verbatim, generate the solution, and submit it without reading as your own work.',
      'Use AI as an interactive tutor to clarify confusing concepts, test understanding, and scaffold ideas, while writing your own code and disclosing AI assistance according to course policy.',
      'Deny ever using a computer or the internet if asked by a faculty member.',
      'Pay for multiple AI subscriptions so you can submit different AI solutions to all your classmates.'
    ],
    correctIndex: 1,
    explanation: 'Ethical and responsible AI utilization treats models as cognitive amplifiers and learning tutors. Students must understand every line of their submissions, do their own synthesis, and abide by institutional disclosure policies.'
  }
];
