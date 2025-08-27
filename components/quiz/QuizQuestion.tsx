import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Question, categoryLabels, categoryColors } from "@/types/quiz";

interface QuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  progress: number;
  isLastQuestion: boolean;
  onAnswerSelect: (index: number) => void;
  onSubmit: () => void;
}

export function QuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  progress,
  isLastQuestion,
  onAnswerSelect,
  onSubmit,
}: QuizQuestionProps) {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentIndex + 1} sur {totalQuestions}
          </span>
          <Badge className={categoryColors[question.category]}>
            {categoryLabels[question.category]}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => onAnswerSelect(index)}
              >
                <span className="mr-3 font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          <Button
            onClick={onSubmit}
            disabled={selectedAnswer === null}
            className="w-full mt-6"
          >
            {isLastQuestion ? "Terminer" : "Question suivante"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
