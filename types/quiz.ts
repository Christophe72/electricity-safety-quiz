export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "prevention" | "urgence" | "installation" | "maintenance";
}

export interface QuizResult {
  userId: string;
  score: number;
  totalQuestions: number;
  answers: number[];
  completedAt: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  answers: number[];
  score: number;
  isStarted: boolean;
  isCompleted: boolean;
  showResult: boolean;
  showHistory: boolean;
  loading: boolean;
  error: string | null;
}

export interface QuizAction {
  type:
    | "LOAD_QUESTIONS"
    | "LOAD_QUESTIONS_SUCCESS"
    | "LOAD_QUESTIONS_ERROR"
    | "START_QUIZ"
    | "SELECT_ANSWER"
    | "NEXT_QUESTION"
    | "SHOW_RESULT"
    | "COMPLETE_QUIZ"
    | "RESET_QUIZ"
    | "SHOW_HISTORY"
    | "HIDE_HISTORY";
  payload?: any;
}

export const categoryLabels = {
  prevention: "Prévention",
  urgence: "Urgence",
  installation: "Installation",
  maintenance: "Maintenance",
};

export const categoryColors = {
  prevention: "bg-blue-100 text-blue-800",
  urgence: "bg-red-100 text-red-800",
  installation: "bg-green-100 text-green-800",
  maintenance: "bg-yellow-100 text-yellow-800",
};

export type QuizPhase =
  | "auth"
  | "start"
  | "question"
  | "result"
  | "completed"
  | "history";
