import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Shield, AlertTriangle } from "lucide-react";

interface QuizStartProps {
  title: string;
  description: string;
  questionCount: number;
  onStart: () => void;
}

export function QuizStart({
  title,
  description,
  questionCount,
  onStart,
}: QuizStartProps) {
  return (
    <Card className="text-center">
      <CardHeader className="space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <Zap className="h-12 w-12 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>{questionCount} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-accent" />
            <span>Sécurité électrique</span>
          </div>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Ce questionnaire couvre les aspects essentiels de la sécurité
            électrique : prévention, urgences, installation et maintenance.
          </AlertDescription>
        </Alert>

        <Button onClick={onStart} size="lg" className="w-full">
          Commencer le questionnaire
        </Button>
      </CardContent>
    </Card>
  );
}
