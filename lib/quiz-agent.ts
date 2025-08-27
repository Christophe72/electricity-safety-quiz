import { Question, QuizState, QuizAction, QuizResult } from "@/types/quiz";

export class QuizAgent {
  private state: QuizState;
  private listeners: ((state: QuizState) => void)[] = [];
  private saveResultCallback?: (result: QuizResult) => Promise<void>;

  constructor() {
    this.state = this.getInitialState();
  }

  private getInitialState(): QuizState {
    return {
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      answers: [],
      score: 0,
      isStarted: false,
      isCompleted: false,
      showResult: false,
      showHistory: false,
      loading: false,
      error: null,
    };
  }

  // Abonner aux changements d'état
  subscribe(listener: (state: QuizState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Obtenir l'état actuel
  getState(): QuizState {
    return { ...this.state };
  }

  // Notifier les listeners des changements
  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.getState()));
  }

  // Dispatcher pour les actions
  dispatch(action: QuizAction) {
    const previousState = { ...this.state };
    this.state = this.reduce(this.state, action);

    // Effets secondaires basés sur l'action
    this.handleSideEffects(action, previousState);

    this.notifyListeners();
  }

  // Réducteur pour gérer les changements d'état
  private reduce(state: QuizState, action: QuizAction): QuizState {
    switch (action.type) {
      case "LOAD_QUESTIONS":
        return { ...state, loading: true, error: null };

      case "LOAD_QUESTIONS_SUCCESS":
        return {
          ...state,
          loading: false,
          questions: action.payload,
          error: null,
        };

      case "LOAD_QUESTIONS_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case "START_QUIZ":
        return {
          ...state,
          isStarted: true,
          currentQuestionIndex: 0,
          answers: [],
          score: 0,
          isCompleted: false,
          showHistory: false,
        };

      case "SELECT_ANSWER":
        return {
          ...state,
          selectedAnswer: action.payload,
        };

      case "SHOW_RESULT":
        return {
          ...state,
          showResult: true,
        };

      case "NEXT_QUESTION":
        const newAnswers = [...state.answers, state.selectedAnswer!];
        const isCorrect =
          state.selectedAnswer ===
          state.questions[state.currentQuestionIndex].correctAnswer;
        const newScore = isCorrect ? state.score + 1 : state.score;
        const isLastQuestion =
          state.currentQuestionIndex >= state.questions.length - 1;

        return {
          ...state,
          answers: newAnswers,
          score: newScore,
          currentQuestionIndex: isLastQuestion
            ? state.currentQuestionIndex
            : state.currentQuestionIndex + 1,
          selectedAnswer: null,
          showResult: false,
          isCompleted: isLastQuestion,
        };

      case "COMPLETE_QUIZ":
        return {
          ...state,
          isCompleted: true,
          isStarted: false,
        };

      case "RESET_QUIZ":
        return {
          ...this.getInitialState(),
          questions: state.questions,
        };

      case "SHOW_HISTORY":
        return {
          ...state,
          showHistory: true,
        };

      case "HIDE_HISTORY":
        return {
          ...state,
          showHistory: false,
        };

      default:
        return state;
    }
  }

  // Gérer les effets secondaires
  private handleSideEffects(action: QuizAction, previousState: QuizState) {
    switch (action.type) {
      case "SHOW_RESULT":
        // Auto-avancement après 3 secondes
        setTimeout(() => {
          if (
            this.state.currentQuestionIndex >=
            this.state.questions.length - 1
          ) {
            this.dispatch({ type: "COMPLETE_QUIZ" });
            this.saveQuizResult();
          } else {
            this.dispatch({ type: "NEXT_QUESTION" });
          }
        }, 3000);
        break;
    }
  }

  // Méthodes publiques pour les actions courantes
  async loadQuestions(quizType: string = "electrical-safety") {
    this.dispatch({ type: "LOAD_QUESTIONS" });

    try {
      const response = await fetch("/data/questions.json");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des questions");
      }
      const questions = await response.json();
      this.dispatch({ type: "LOAD_QUESTIONS_SUCCESS", payload: questions });
    } catch (error) {
      this.dispatch({
        type: "LOAD_QUESTIONS_ERROR",
        payload: error instanceof Error ? error.message : "Erreur inconnue",
      });
    }
  }

  startQuiz() {
    this.dispatch({ type: "START_QUIZ" });
  }

  selectAnswer(answerIndex: number) {
    this.dispatch({ type: "SELECT_ANSWER", payload: answerIndex });
  }

  submitAnswer() {
    if (this.state.selectedAnswer === null) return;
    this.dispatch({ type: "SHOW_RESULT" });
  }

  resetQuiz() {
    this.dispatch({ type: "RESET_QUIZ" });
  }

  showHistory() {
    this.dispatch({ type: "SHOW_HISTORY" });
  }

  hideHistory() {
    this.dispatch({ type: "HIDE_HISTORY" });
  }

  // Configuration du callback de sauvegarde
  setSaveResultCallback(callback: (result: QuizResult) => Promise<void>) {
    this.saveResultCallback = callback;
  }

  // Sauvegarde automatique du résultat
  private async saveQuizResult() {
    if (!this.saveResultCallback) return;

    const result: QuizResult = {
      userId: "", // Sera fourni par le callback
      score: this.state.score,
      totalQuestions: this.state.questions.length,
      answers: this.state.answers,
      completedAt: new Date().toISOString(),
    };

    try {
      await this.saveResultCallback(result);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  }

  // Méthodes utilitaires
  getCurrentQuestion(): Question | null {
    if (this.state.currentQuestionIndex >= this.state.questions.length) {
      return null;
    }
    return this.state.questions[this.state.currentQuestionIndex];
  }

  getProgress(): number {
    return (
      ((this.state.currentQuestionIndex + 1) / this.state.questions.length) *
      100
    );
  }

  getScoreMessage(): string {
    const percentage = (this.state.score / this.state.questions.length) * 100;
    if (percentage >= 80)
      return "Excellent ! Vous maîtrisez bien la sécurité électrique.";
    if (percentage >= 60)
      return "Bien ! Quelques révisions seraient bénéfiques.";
    return "Il est important de réviser les règles de sécurité électrique.";
  }

  isLastQuestion(): boolean {
    return this.state.currentQuestionIndex >= this.state.questions.length - 1;
  }
}
