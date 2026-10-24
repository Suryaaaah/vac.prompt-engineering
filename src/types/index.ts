export type CategoryType = 'Coding' | 'Writing' | 'Studying' | 'Research' | 'Presentation' | 'General';

export interface SavedPrompt {
  id: string;
  title: string;
  promptText: string;
  category: CategoryType;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  originalPrompt?: string;
  technique?: string;
}

export interface LessonModule {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  duration: string;
  explanation: string;
  keyConcepts: string[];
  whenToUse: string[];
  examples: {
    title: string;
    badPrompt: string;
    goodPrompt: string;
    whyItWorks: string;
  }[];
  commonMistakes: string[];
  practiceActivity: {
    task: string;
    starterPrompt: string;
    hint: string;
    modelAnswer: string;
  };
}

export interface ExamplePrompt {
  id: number;
  title: string;
  category: 'Coding' | 'Writing' | 'Studying';
  subcategory: string;
  weakPrompt: string;
  improvedPrompt: string;
  explanation: string;
  techniquesUsed: string[];
  expectedOutputCharacteristics: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  topic: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  answers: {
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  topicsToReview: string[];
}

export interface WorkshopSession {
  id: number;
  title: string;
  durationMinutes: number;
  objectives: string[];
  activityInstructions: string;
  learningOutcomes: string[];
  speakerNotes?: string;
}

export interface VerificationScenario {
  id: number;
  title: string;
  category: string;
  fictionalAiOutput: string;
  possibleIssue: string;
  verificationTask: string;
  correctApproach: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ActivityLog {
  id: string;
  type: 'lesson' | 'quiz' | 'prompt_saved' | 'prompt_improved' | 'verified';
  description: string;
  timestamp: string;
}
