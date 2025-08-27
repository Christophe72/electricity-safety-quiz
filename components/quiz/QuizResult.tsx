import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { Question } from "@/types/quiz";

interface QuizResultProps {
  question: Question;
  selectedAnswer: number;
  isCorrect: boolean;
}

export function QuizResult({
  question,
  selectedAnswer,
  isCorrect,
}: QuizResultProps) {
  return (
    <div className="space-y-4">
      <Alert
        className={
          isCorrect
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50"
        }
      >
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          <span className="font-semibold">
            {isCorrect ? "Correct !" : "Incorrect"}
          </span>
        </div>
        <AlertDescription className="mt-2">
          {question.explanation}
        </AlertDescription>
      </Alert>

      {!isCorrect && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm">
            <span className="font-semibold">Bonne réponse : </span>
            {String.fromCharCode(65 + question.correctAnswer)}.{" "}
            {question.options[question.correctAnswer]}
          </p>
        </div>
      )}
    </div>
  );
}
