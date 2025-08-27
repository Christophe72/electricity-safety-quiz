import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { Question, categoryLabels, categoryColors } from "@/types/quiz";

interface QuizCompletedProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  answers: number[];
  scoreMessage: string;
  onRestart: () => void;
}

export function QuizCompleted({
  score,
  totalQuestions,
  questions,
  answers,
  scoreMessage,
  onRestart,
}: QuizCompletedProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Questionnaire terminé !</CardTitle>
        <CardDescription>Voici vos résultats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-lg text-muted-foreground mb-4">
            {Math.round((score / totalQuestions) * 100)}% de réussite
          </div>
          <p className="text-sm">{scoreMessage}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Détail des réponses :</h3>
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                {answers[index] === question.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="text-sm">Question {index + 1}</span>
              </div>
              <Badge className={categoryColors[question.category]}>
                {categoryLabels[question.category]}
              </Badge>
            </div>
          ))}
        </div>

        <Button onClick={onRestart} className="w-full">
          Recommencer le questionnaire
        </Button>
      </CardContent>
    </Card>
  );
}
