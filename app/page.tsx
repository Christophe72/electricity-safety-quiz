"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  XCircle,
  Zap,
  Shield,
  AlertTriangle,
  User,
  LogOut,
  History,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import AuthForm from "@/components/auth-form";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "prevention" | "urgence" | "installation" | "maintenance";
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quelle est la première chose à faire en cas d'électrocution ?",
    options: [
      "Toucher immédiatement la personne pour l'aider",
      "Couper l'alimentation électrique avant d'intervenir",
      "Verser de l'eau sur la personne",
      "Appeler les secours sans rien faire d'autre",
    ],
    correctAnswer: 1,
    explanation:
      "Il faut toujours couper l'alimentation électrique avant de porter secours pour éviter de s'électrocuter à son tour.",
    category: "urgence",
  },
  {
    id: 2,
    question:
      "Quelle est la tension considérée comme dangereuse pour l'homme ?",
    options: ["12V", "24V", "50V", "220V"],
    correctAnswer: 2,
    explanation:
      "À partir de 50V en courant alternatif, la tension devient dangereuse pour l'homme dans des conditions normales.",
    category: "prevention",
  },
  {
    id: 3,
    question:
      "Dans une salle de bain, à quelle distance minimum du bord de la baignoire peut-on installer une prise électrique ?",
    options: [
      "1 mètre",
      "2 mètres",
      "3 mètres",
      "Aucune prise n'est autorisée",
    ],
    correctAnswer: 2,
    explanation:
      "Les prises électriques doivent être installées à au moins 3 mètres du bord de la baignoire pour respecter les volumes de sécurité.",
    category: "installation",
  },
  {
    id: 4,
    question: "Que signifie l'indice de protection IP44 ?",
    options: [
      "Protection contre les projections d'eau",
      "Protection contre l'immersion",
      "Protection contre la poussière uniquement",
      "Aucune protection particulière",
    ],
    correctAnswer: 0,
    explanation:
      "IP44 signifie protection contre les corps solides > 1mm et protection contre les projections d'eau de toutes directions.",
    category: "installation",
  },
  {
    id: 5,
    question: "À quelle fréquence doit-on tester un disjoncteur différentiel ?",
    options: [
      "Une fois par an",
      "Une fois par mois",
      "Une fois par semaine",
      "Jamais, il se teste automatiquement",
    ],
    correctAnswer: 1,
    explanation:
      "Il est recommandé de tester le disjoncteur différentiel une fois par mois en appuyant sur le bouton test.",
    category: "maintenance",
  },
  {
    id: 6,
    question:
      "Quel équipement doit obligatoirement être porté lors d'une intervention sur un tableau électrique ?",
    options: [
      "Des lunettes de soleil",
      "Des gants isolants",
      "Un casque audio",
      "Des chaussures ouvertes",
    ],
    correctAnswer: 1,
    explanation:
      "Les gants isolants sont essentiels pour se protéger contre les risques d'électrocution lors d'une intervention sur un tableau électrique.",
    category: "prevention",
  },
  {
    id: 7,
    question: "Que faut-il vérifier avant de remplacer une ampoule ?",
    options: [
      "Que l'interrupteur est en position off",
      "Que la tension de l'ampoule est compatible avec le luminaire",
      "Que l'ampoule est froide",
      "Toutes ces réponses",
    ],
    correctAnswer: 3,
    explanation:
      "Il est important de vérifier que l'interrupteur est off, que la tension est compatible et que l'ampoule est froide pour éviter tout risque.",
    category: "maintenance",
  },
  {
    id: 8,
    question: "Quel est le rôle d'un disjoncteur différentiel ?",
    options: [
      "Protéger contre les courts-circuits uniquement",
      "Protéger contre les surcharges uniquement",
      "Détecter les fuites de courant vers la terre",
      "Réguler la tension du réseau",
    ],
    correctAnswer: 2,
    explanation:
      "Le disjoncteur différentiel détecte les fuites de courant vers la terre et coupe l'alimentation pour éviter les accidents.",
    category: "installation",
  },
  {
    id: 9,
    question:
      "Quelle est la première étape avant toute opération de maintenance électrique ?",
    options: [
      "Lire le manuel d'utilisation",
      "Couper l'alimentation électrique",
      "Porter des lunettes de protection",
      "Appeler un collègue",
    ],
    correctAnswer: 1,
    explanation:
      "Il faut toujours couper l'alimentation électrique avant toute opération de maintenance pour garantir la sécurité.",
    category: "maintenance",
  },
  {
    id: 10,
    question:
      "Quel symbole indique un appareil électrique protégé contre l'eau ?",
    options: ["IP suivi de deux chiffres", "CE", "NF", "Un triangle jaune"],
    correctAnswer: 0,
    explanation:
      "Le symbole IP suivi de deux chiffres indique le niveau de protection contre l'eau et la poussière d'un appareil électrique.",
    category: "installation",
  },
];

const categoryLabels = {
  prevention: "Prévention",
  urgence: "Urgence",
  installation: "Installation",
  maintenance: "Maintenance",
};

const categoryColors = {
  prevention: "bg-blue-100 text-blue-800",
  urgence: "bg-red-100 text-red-800",
  installation: "bg-green-100 text-green-800",
  maintenance: "bg-yellow-100 text-yellow-800",
};

export default function ElectricalSafetyQuiz() {
  const { user, isAuthenticated, logout } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [previousResults, setPreviousResults] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuth(true);
    } else {
      loadPreviousResults();
    }
  }, [isAuthenticated]);

  const loadPreviousResults = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/quiz/results?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setPreviousResults(data.results);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des résultats:", error);
    }
  };

  const saveQuizResult = async () => {
    if (!user) return;

    try {
      await fetch("/api/quiz/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          score,
          totalQuestions: questions.length,
          answers,
        }),
      });
      loadPreviousResults(); // Recharger les résultats
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        saveQuizResult();
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizStarted(false);
    setQuizCompleted(false);
    setShowHistory(false);
  };

  const handleLogout = () => {
    logout();
    resetQuiz();
    setShowAuth(true);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80)
      return "Excellent ! Vous maîtrisez bien la sécurité électrique.";
    if (percentage >= 60)
      return "Bien ! Quelques révisions seraient bénéfiques.";
    return "Il est important de réviser les règles de sécurité électrique.";
  };

  if (showAuth || !isAuthenticated) {
    return <AuthForm onSuccess={() => setShowAuth(false)} />;
  }

  if (showHistory) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    Historique des résultats
                  </CardTitle>
                  <CardDescription>
                    Vos précédents questionnaires
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistory(false)}
                >
                  Retour
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {previousResults.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucun résultat précédent trouvé
                </p>
              ) : (
                previousResults.map((result, index) => (
                  <div key={result.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">
                          {result.score}/{result.totalQuestions} (
                          {Math.round(
                            (result.score / result.totalQuestions) * 100
                          )}
                          %)
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(result.completedAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
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
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{user?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(true)}
              >
                <History className="h-4 w-4 mr-1" />
                Historique
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Déconnexion
              </Button>
            </div>
          </div>

          <Card className="text-center">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Zap className="h-12 w-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">QuestionElec</CardTitle>
              <CardDescription className="text-lg">
                Testez vos connaissances en sécurité électrique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>{questions.length} questions</span>
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
                  électrique : prévention, urgences, installation et
                  maintenance.
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => setQuizStarted(true)}
                size="lg"
                className="w-full"
              >
                Commencer le questionnaire
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">
                Questionnaire terminé !
              </CardTitle>
              <CardDescription>Voici vos résultats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {score}/{questions.length}
                </div>
                <div className="text-lg text-muted-foreground mb-4">
                  {Math.round((score / questions.length) * 100)}% de réussite
                </div>
                <p className="text-sm">{getScoreMessage()}</p>
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

              <Button onClick={resetQuiz} className="w-full">
                Recommencer le questionnaire
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} sur {questions.length}
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
            {!showResult ? (
              <>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full text-left justify-start h-auto p-4"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <span className="mr-3 font-semibold">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="w-full mt-6"
                >
                  {currentQuestion === questions.length - 1
                    ? "Terminer"
                    : "Question suivante"}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <Alert
                  className={
                    selectedAnswer === question.correctAnswer
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }
                >
                  <div className="flex items-center gap-2">
                    {selectedAnswer === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-semibold">
                      {selectedAnswer === question.correctAnswer
                        ? "Correct !"
                        : "Incorrect"}
                    </span>
                  </div>
                  <AlertDescription className="mt-2">
                    {question.explanation}
                  </AlertDescription>
                </Alert>

                {selectedAnswer !== question.correctAnswer && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold">Bonne réponse : </span>
                      {String.fromCharCode(65 + question.correctAnswer)}.{" "}
                      {question.options[question.correctAnswer]}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
