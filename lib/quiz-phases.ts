import { QuizPhase } from "@/types/quiz";
import { QuizState } from "@/types/quiz";

export function determineQuizPhase(
  isAuthenticated: boolean,
  state: QuizState
): QuizPhase {
  if (!isAuthenticated) {
    return "auth";
  }

  if (state.showHistory) {
    return "history";
  }

  if (state.isCompleted) {
    return "completed";
  }

  if (state.showResult) {
    return "result";
  }

  if (state.isStarted && state.questions.length > 0) {
    return "question";
  }

  return "start";
}
