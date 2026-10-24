import type { CategoryType } from '../types';

export interface PromptAnalysis {
  hasRole: boolean;
  hasTask: boolean;
  hasContext: boolean;
  hasAudience: boolean;
  hasConstraints: boolean;
  hasFormat: boolean;
  hasExamples: boolean;
  score: number; // 0 to 100
  missingElements: string[];
  includedElements: string[];
}

export interface ImprovedPromptResult {
  originalPrompt: string;
  improvedPrompt: string;
  category: CategoryType;
  difficulty: 'Beginner' | 'Intermediate';
  analysis: PromptAnalysis;
  explanation: string[];
  assumptionsMade: string[];
}

export function analyzePrompt(text: string): PromptAnalysis {
  const clean = text.toLowerCase().trim();
  
  const hasRole = /(act as|you are an?|role:|as an? (developer|engineer|professor|expert|architect|ta|evaluator))/i.test(clean);
  const hasTask = /(write|implement|explain|compare|refactor|debug|create|generate|summarize|solve|analyze|build|design)/i.test(clean);
  const hasContext = /(java|python|c\+\+|sql|react|node|spring|docker|linux|algorithm|database|system|exam|course|semester|version|\d+\.\d+)/i.test(clean);
  const hasAudience = /(for a (beginner|student|junior|senior|expert|child|class)|audience:|aimed at|2nd.?year|1st.?year)/i.test(clean);
  const hasConstraints = /(do not|don't|limit|must (include|be|have)|without|only|under \d+|at least|complexity|constraint)/i.test(clean);
  const hasFormat = /(format:|json|table|markdown|bullet points|schema|code block|ascii diagram|step-by-step)/i.test(clean);
  const hasExamples = /(example|for instance|input:|output:|sample)/i.test(clean);

  const includedElements: string[] = [];
  const missingElements: string[] = [];

  if (hasRole) includedElements.push('Role / Persona'); else missingElements.push('Role / Persona');
  if (hasTask) includedElements.push('Actionable Task'); else missingElements.push('Actionable Task');
  if (hasContext) includedElements.push('Technical Context'); else missingElements.push('Technical Context');
  if (hasAudience) includedElements.push('Target Audience'); else missingElements.push('Target Audience');
  if (hasConstraints) includedElements.push('Boundary Constraints'); else missingElements.push('Boundary Constraints');
  if (hasFormat) includedElements.push('Strict Output Format'); else missingElements.push('Strict Output Format');
  if (hasExamples) includedElements.push('Demonstration Exemplars'); else missingElements.push('Demonstration Exemplars');

  // Calculate score out of 100
  const weights = {
    hasRole: 15,
    hasTask: 25,
    hasContext: 20,
    hasAudience: 10,
    hasConstraints: 15,
    hasFormat: 15
  };
  
  let score = 0;
  if (hasRole) score += weights.hasRole;
  if (hasTask) score += weights.hasTask;
  if (hasContext) score += weights.hasContext;
  if (hasAudience) score += weights.hasAudience;
  if (hasConstraints) score += weights.hasConstraints;
  if (hasFormat) score += weights.hasFormat;

  return {
    hasRole,
    hasTask,
    hasContext,
    hasAudience,
    hasConstraints,
    hasFormat,
    hasExamples,
    score,
    missingElements,
    includedElements
  };
}

export function improvePrompt(
  inputPrompt: string,
  category: CategoryType = 'Coding',
  difficulty: 'Beginner' | 'Intermediate' = 'Beginner',
  userAudience?: string,
  userFormat?: string
): ImprovedPromptResult {
  const trimmed = inputPrompt.trim();
  const analysis = analyzePrompt(trimmed);

  const explanations: string[] = [];
  const assumptions: string[] = [];

  // Determine role based on category
  let role = '';
  switch (category) {
    case 'Coding':
      role = difficulty === 'Beginner' 
        ? 'Act as a patient Computer Science Lab Instructor and Senior Software Engineer.'
        : 'Act as a Principal Staff Software Engineer and Technical Interviewer.';
      break;
    case 'Writing':
      role = 'Act as an Academic Writing Coach and Technical Communications Specialist.';
      break;
    case 'Studying':
      role = 'Act as a University Computer Science Professor specializing in curriculum mastery and exam preparation.';
      break;
    case 'Research':
      role = 'Act as a Computer Science Research Fellow and Peer Reviewer.';
      break;
    case 'Presentation':
      role = 'Act as a Senior Technical Keynote Speaker and Presentation Designer.';
      break;
    default:
      role = 'Act as an expert Technical Consultant.';
  }

  if (!analysis.hasRole) {
    explanations.push(`Added explicit expert persona (${role}) to prime domain vocabulary and technical standards.`);
  }

  // Determine audience
  const audience = userAudience?.trim() || (difficulty === 'Beginner' ? '1st or 2nd year Computer Science Engineering students' : 'Experienced developers and evaluators');
  if (!analysis.hasAudience) {
    explanations.push(`Calibrated explanations for: "${audience}".`);
  }

  // Determine format
  const format = userFormat?.trim() || (category === 'Coding' 
    ? 'Clean compilable code block with inline comments, followed by Big-O time/space complexity analysis and 3 edge-case tests.'
    : category === 'Studying'
    ? 'Markdown structured outline with key definitions, comparison table, and 3 review questions.'
    : 'Professional Markdown with structured headings, bullet points, and actionable takeaways.');
  
  if (!analysis.hasFormat) {
    explanations.push(`Defined strict output schema: "${format}".`);
  }

  // Determine constraints based on category
  const constraintsList: string[] = [];
  if (category === 'Coding') {
    constraintsList.push('Enforce modern language syntax (e.g., Java 17+, Python 3.11+, C++17).');
    constraintsList.push('Handle input boundary edge cases (null, empty, negative, or overflow values).');
    constraintsList.push('Avoid unverified external libraries; prioritize standard library or state dependencies explicitly.');
    assumptions.push('Assumed modern LTS compiler standards and requirement for boundary-case defensive programming.');
  } else if (category === 'Studying') {
    constraintsList.push('Explain concepts using relatable intuitive analogies before presenting formal mathematical or system definitions.');
    constraintsList.push('Highlight common student misconceptions and exam pitfalls.');
    assumptions.push('Assumed preparation for university semester exams and viva voce questions.');
  } else if (category === 'Writing') {
    constraintsList.push('Keep language clear, active, and academic; ban promotional buzzwords and empty filler.');
    constraintsList.push('Maintain strict conciseness and appropriate formal tone.');
    assumptions.push('Assumed formal academic or professional engineering review standards.');
  } else {
    constraintsList.push('State any external assumptions explicitly.');
    constraintsList.push('Provide verifiable, testable takeaways.');
  }

  explanations.push('Injected defensive boundary conditions and negative constraints to prevent hallucinated tangents.');

  // Build the improved structured prompt
  const improvedPrompt = `${role}

Task:
${trimmed.endsWith('.') ? trimmed : trimmed + '.'} Ensure the explanation deconstructs underlying principles, architectural considerations, and practical mechanics.

Context & Audience:
- Target Audience: ${audience}
- Level: ${difficulty} Engineering standard
- Environment: Standard computer science curriculum and modern production engineering best practices

Constraints:
${constraintsList.map(c => `- ${c}`).join('\n')}

Output Format:
- ${format}
- Conclude with a 1-sentence verification checklist or test reminder.`;

  return {
    originalPrompt: trimmed,
    improvedPrompt,
    category,
    difficulty,
    analysis,
    explanation: explanations,
    assumptionsMade: assumptions
  };
}
