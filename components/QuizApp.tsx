"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useQuizAgent } from "@/hooks/use-quiz-agent";
import { determineQuizPhase } from "@/lib/quiz-phases";
import AuthForm from "@/components/auth-form";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizStart } from "@/components/quiz/QuizStart";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizResult } from "@/components/quiz/QuizResult";
import { QuizCompleted } from "@/components/quiz/QuizCompleted";
import { QuizHistory } from "@/components/quiz/QuizHistory";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ElectricalSafetyQuiz() {
  const { user, isAuthenticated, logout } = useAuth();
  const { state, actions, getters } = useQuizAgent(user?.id);

  const currentPhase = determineQuizPhase(isAuthenticated, state);

  // Charger les questions au démarrage
  useEffect(() => {
    if (isAuthenticated && state.questions.length === 0) {
      actions.loadQuestions();
    }
  }, [isAuthenticated, state.questions.length, actions]);

  const handleLogout = () => {
    logout();
    actions.resetQuiz();
  };

  const renderContent = () => {
    switch (currentPhase) {
      case "auth":
        return <AuthForm onSuccess={() => {}} />;

      case "start":
        if (state.loading) {
          return (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">
                    Chargement des questions...
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        }

        if (state.error) {
          return (
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Erreur</CardTitle>
                <CardDescription>{state.error}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => actions.loadQuestions()}
                  className="w-full"
                >
                  Réessayer
                </Button>
              </CardContent>
            </Card>
          );
        }

        return (
          <QuizStart
            title="QuestionElec"
            description="Testez vos connaissances en sécurité électrique"
            questionCount={state.questions.length}
            onStart={actions.startQuiz}
          />
        );

      case "question":
        const currentQuestion = getters.getCurrentQuestion();
        if (!currentQuestion) return null;

        return (
          <QuizQuestion
            question={currentQuestion}
            currentIndex={state.currentQuestionIndex}
            totalQuestions={state.questions.length}
            selectedAnswer={state.selectedAnswer}
            progress={getters.getProgress()}
            isLastQuestion={getters.isLastQuestion()}
            onAnswerSelect={actions.selectAnswer}
            onSubmit={actions.submitAnswer}
          />
        );

      case "result":
        const questionForResult = getters.getCurrentQuestion();
        if (!questionForResult || state.selectedAnswer === null) return null;

        return (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {state.currentQuestionIndex + 1} sur{" "}
                  {state.questions.length}
                </span>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl leading-relaxed">
                  {questionForResult.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuizResult
                  question={questionForResult}
                  selectedAnswer={state.selectedAnswer}
                  isCorrect={
                    state.selectedAnswer === questionForResult.correctAnswer
                  }
                />
              </CardContent>
            </Card>
          </div>
        );

      case "completed":
        return (
          <QuizCompleted
            score={state.score}
            totalQuestions={state.questions.length}
            questions={state.questions}
            answers={state.answers}
            scoreMessage={getters.getScoreMessage()}
            onRestart={actions.resetQuiz}
          />
        );

      case "history":
        return (
          <QuizHistory userId={user?.id || ""} onBack={actions.hideHistory} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {isAuthenticated && currentPhase !== "auth" && (
          <QuizHeader
            userName={user?.name || ""}
            onShowHistory={actions.showHistory}
            onLogout={handleLogout}
          />
        )}

        {renderContent()}
      </div>
    </div>
  );
}
