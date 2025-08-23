import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { userId, score, totalQuestions, answers } = await request.json()

    if (!userId || score === undefined || !totalQuestions || !answers) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    // Sauvegarder le résultat
    const result = await prisma.quizResult.create({
      data: {
        userId,
        score,
        totalQuestions,
        answers: JSON.stringify(answers),
      },
    })

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
