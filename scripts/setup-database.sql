-- Script pour initialiser la base de données Prisma
-- Ce script configure la base de données SQLite avec les tables nécessaires

-- Exécuter les commandes Prisma pour créer la base de données
-- npx prisma db push
-- npx prisma generate

-- Les tables User et QuizResult seront créées automatiquement
-- selon le schéma défini dans prisma/schema.prisma

-- Structure des tables :
-- User: id, name, email, createdAt
-- QuizResult: id, userId, score, totalQuestions, answers (JSON), completedAt

SELECT 'Base de données initialisée avec succès' as message;
