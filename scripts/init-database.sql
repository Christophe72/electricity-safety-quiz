-- Script d'initialisation de la base de données SQLite
-- Ce script sera exécuté automatiquement par Prisma

-- Les tables seront créées automatiquement par Prisma migrate
-- Ce fichier sert de documentation pour la structure de la base

-- Table User
-- id: identifiant unique
-- name: nom complet de l'utilisateur  
-- email: adresse email (unique)
-- createdAt: date de création du compte

-- Table QuizResult
-- id: identifiant unique du résultat
-- userId: référence vers l'utilisateur
-- score: nombre de bonnes réponses
-- totalQuestions: nombre total de questions
-- answers: tableau JSON des réponses données
-- completedAt: date de completion du quiz
