import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "ID utilisateur requis" }, { status: 400 })
    }

    // Récupérer les résultats de l'utilisateur
    const results = await prisma.quizResult.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 10, // Limiter aux 10 derniers résultats
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Erreur lors de la récupération:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
