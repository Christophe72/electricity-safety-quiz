import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuizHistoryProps {
  userId: string;
  onBack: () => void;
}

interface HistoryResult {
  id: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export function QuizHistory({ userId, onBack }: QuizHistoryProps) {
  const [results, setResults] = useState<HistoryResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const response = await fetch(`/api/quiz/results?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des résultats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [userId]);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Historique des résultats</CardTitle>
            <CardDescription>Vos précédents questionnaires</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onBack}>
            Retour
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucun résultat précédent trouvé
          </p>
        ) : (
          results.map((result) => (
            <div key={result.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    {result.score}/{result.totalQuestions} (
                    {Math.round((result.score / result.totalQuestions) * 100)}%)
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(result.completedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <Badge
                  variant={
                    result.score >= result.totalQuestions * 0.8
                      ? "default"
                      : "secondary"
                  }
                >
                  {result.score >= result.totalQuestions * 0.8
                    ? "Excellent"
                    : result.score >= result.totalQuestions * 0.6
                    ? "Bien"
                    : "À améliorer"}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
