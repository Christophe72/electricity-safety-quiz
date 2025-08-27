import { useState, useEffect, useCallback } from "react";
import { QuizAgent } from "@/lib/quiz-agent";
import { QuizState, QuizResult } from "@/types/quiz";

let quizAgentInstance: QuizAgent | null = null;

export function useQuizAgent(userId?: string) {
  const [state, setState] = useState<QuizState>(() => {
    if (!quizAgentInstance) {
      quizAgentInstance = new QuizAgent();
    }
    return quizAgentInstance.getState();
  });

  useEffect(() => {
    if (!quizAgentInstance) {
      quizAgentInstance = new QuizAgent();
    }

    const unsubscribe = quizAgentInstance.subscribe(setState);

    // Configuration du callback de sauvegarde
    if (userId) {
      quizAgentInstance.setSaveResultCallback(async (result: QuizResult) => {
        try {
          await fetch("/api/quiz/save-result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...result,
              userId,
            }),
          });
        } catch (error) {
          console.error("Erreur lors de la sauvegarde:", error);
          throw error;
        }
      });
    }

    return unsubscribe;
  }, [userId]);

  // Actions de l'agent
  const actions = {
    loadQuestions: useCallback((quizType?: string) => {
      quizAgentInstance?.loadQuestions(quizType);
    }, []),

    startQuiz: useCallback(() => {
      quizAgentInstance?.startQuiz();
    }, []),

    selectAnswer: useCallback((answerIndex: number) => {
      quizAgentInstance?.selectAnswer(answerIndex);
    }, []),

    submitAnswer: useCallback(() => {
      quizAgentInstance?.submitAnswer();
    }, []),

    resetQuiz: useCallback(() => {
      quizAgentInstance?.resetQuiz();
    }, []),

    showHistory: useCallback(() => {
      quizAgentInstance?.showHistory();
    }, []),

    hideHistory: useCallback(() => {
      quizAgentInstance?.hideHistory();
    }, []),
  };

  // Getters utilitaires
  const getters = {
    getCurrentQuestion: useCallback(() => {
      return quizAgentInstance?.getCurrentQuestion() || null;
    }, [state.currentQuestionIndex, state.questions]),

    getProgress: useCallback(() => {
      return quizAgentInstance?.getProgress() || 0;
    }, [state.currentQuestionIndex, state.questions.length]),

    getScoreMessage: useCallback(() => {
      return quizAgentInstance?.getScoreMessage() || "";
    }, [state.score, state.questions.length]),

    isLastQuestion: useCallback(() => {
      return quizAgentInstance?.isLastQuestion() || false;
    }, [state.currentQuestionIndex, state.questions.length]),
  };

  return {
    state,
    actions,
    getters,
  };
}
