// Define as estruturas de dados usadas em todo o aplicativo GabaritaAí

export interface UserProfile {
  name: string;
  targetExam?: string;
  targetCourse?: string;
  dailyGoalHours?: string;
  dailyQuestionsGoal?: number;
  streakDays?: number;
  xp?: number;
  level?: number;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject?: string;
  topic?: string;
  content?: string;
  summary?: string;
  createdAt: number;
  flashcards?: {
    id: string;
    front: string;
    back: string;
  }[];
  questions?: {
    id: string;
    statement: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface TutorPlan {
  id: string;
  title: string;
  subject: string;
  weeksCount?: number;
  createdAt: number;
  steps?: {
    title: string;
    description: string;
    completed: boolean;
  }[];
}

export interface ELI5Explanation {
  id: string;
  question: string;
  explanation: string;
  createdAt: number;
  simpleAnalogy?: string;
}

export interface UserStats {
  totalQuestionsAnswered: number;
  correctAnswers: number;
  wrongAnswers: number;
  streakDays: number;
  totalXp: number;
  weeklyProgress: {
    day: string;
    questionsCount: number;
    goalHit: boolean;
  }[];
}

