# 🚀 Démarrage Rapide

## Installation

```bash
# Cloner le repository
git clone https://github.com/username/electricity-safety-quiz.git
cd electricity-safety-quiz

# Installer les dépendances
pnpm install

# Configurer l'environnement
cp .env.example .env

# Initialiser la base de données
pnpm db:migrate

# Démarrer en développement
pnpm dev
```

## Déploiement

### Vercel (Recommandé)

1. Fork le repository sur GitHub
2. Connecter à Vercel
3. Ajouter la variable d'environnement `DATABASE_URL`
4. Déployer

### Variables d'environnement requises

- `DATABASE_URL`: URL de la base de données
- `NEXTAUTH_SECRET`: Clé secrète pour l'authentification

## Structure de l'Agent

```text
QuizAgent
├── phases/
│   ├── auth      → Authentification
│   ├── start     → Écran de démarrage
│   ├── question  → Questions du quiz
│   ├── result    → Résultat d'une question
│   ├── completed → Quiz terminé
│   └── history   → Historique des résultats
└── actions/
    ├── login()
    ├── startQuiz()
    ├── submitAnswer()
    ├── nextQuestion()
    └── viewHistory()
```

## Ajouter de nouveaux questionnaires

1. Créer un nouveau fichier JSON dans `/public/data/`
2. Suivre le format de `questions.json`
3. Modifier `QuizAgent` pour charger le nouveau questionnaire

## Support

- 📧 Issues: GitHub Issues
- 📚 Documentation: README.md
- 🔧 Agent Pattern: ARCHITECTURE.md
