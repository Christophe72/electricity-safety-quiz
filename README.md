# QuestionElec - Quiz de Sécurité Électrique

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)

Une application web moderne de quiz sur la sécurité électrique, développée avec une **architecture d'agent** pour une gestion automatisée et modulaire du flux utilisateur.

## 🎯 Fonctionnalités

- ✅ **Quiz interactif** avec 10 questions sur la sécurité électrique
- 🔐 **Authentification** sécurisée (connexion/inscription)
- 📊 **Suivi des résultats** avec historique complet
- 🤖 **Agent intelligent** pour la gestion automatique du flux
- ⏱️ **Transitions automatiques** avec explications détaillées
- 📱 **Interface responsive** et moderne
- 🏷️ **Catégorisation** des questions (prévention, urgence, installation, maintenance)

## 🏗️ Architecture Agent

Cette application utilise une architecture innovante basée sur un **agent** qui gère automatiquement :

- **État centralisé** du quiz avec système de réduction
- **Transitions automatiques** entre les phases
- **Logique métier encapsulée** et testable
- **Composants modulaires** et réutilisables

### Phases du Quiz

1. **auth** - Authentification utilisateur
2. **start** - Écran d'accueil
3. **question** - Affichage des questions
4. **result** - Explications automatiques (3s)
5. **completed** - Résultats finaux
6. **history** - Historique des tentatives

## 🚀 Technologies

- **Framework** : Next.js 15.2.4 (App Router)
- **Language** : TypeScript
- **Base de données** : Prisma + SQLite
- **UI** : Composants personnalisés + Lucide Icons
- **Architecture** : Agent Pattern + Hooks React
- **Gestionnaire de paquets** : pnpm

## 📁 Structure du Projet

```
├── app/
│   ├── page.tsx                 # Point d'entrée principal
│   └── api/                     # Routes API (auth, quiz)
├── components/
│   ├── QuizApp.tsx             # Orchestrateur principal
│   └── quiz/                   # Composants spécialisés
│       ├── QuizStart.tsx       # Écran de démarrage
│       ├── QuizQuestion.tsx    # Interface des questions
│       ├── QuizResult.tsx      # Affichage des explications
│       ├── QuizCompleted.tsx   # Résultats finaux
│       ├── QuizHistory.tsx     # Historique
│       └── QuizHeader.tsx      # Navigation
├── lib/
│   ├── quiz-agent.ts           # Agent principal (logique métier)
│   ├── quiz-phases.ts          # Gestion des phases
│   └── auth.ts                 # Authentification
├── hooks/
│   └── use-quiz-agent.ts       # Hook React pour l'agent
├── types/
│   └── quiz.ts                 # Types TypeScript
├── public/data/
│   └── questions.json          # Questions du quiz
└── prisma/
    └── schema.prisma           # Schéma de base de données
```

## ⚡ Installation & Démarrage

### Prérequis

- Node.js 18+
- pnpm (recommandé) ou npm

### Installation

```bash
# Cloner le projet
git clone https://github.com/Christophe72/electricity-safety-quiz.git
cd electricity-safety-quiz

# Installer les dépendances
pnpm install

# Initialiser la base de données
npx prisma migrate dev --name init
npx prisma generate

# Démarrer l'application
pnpm dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 🎮 Utilisation

### Démarrage Simple

```typescript
import QuizApp from "@/components/QuizApp";

export default function Page() {
  return <QuizApp />;
}
```

### Utilisation Avancée de l'Agent

```typescript
const { state, actions, getters } = useQuizAgent(userId);

// Démarrer le quiz
actions.startQuiz();

// Sélectionner une réponse
actions.selectAnswer(2);

// Obtenir la progression
const progress = getters.getProgress();
```

## 📝 Gestion des Questions

Les questions sont stockées dans `/public/data/questions.json` :

```json
{
  "id": 1,
  "question": "Votre question ici",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 1,
  "explanation": "Explication de la bonne réponse",
  "category": "prevention"
}
```

### Catégories Disponibles

- **prevention** : Mesures préventives
- **urgence** : Situations d'urgence
- **installation** : Installation électrique
- **maintenance** : Maintenance et entretien

## 🔧 Scripts Utiles

```bash
# Développement
pnpm dev                    # Démarrer en mode développement
pnpm build                  # Build de production
pnpm start                  # Démarrer en production

# Base de données
npx prisma studio          # Interface graphique DB
npx prisma migrate dev      # Appliquer migrations
npx prisma generate         # Générer client Prisma

# Qualité du code
pnpm lint                   # Linter
pnpm type-check            # Vérification TypeScript
```

## 🎨 Personnalisation

### Ajouter un Nouveau Questionnaire

1. **Créer le fichier JSON** dans `/public/data/`
2. **Modifier le hook** pour supporter différents types
3. **Adapter l'agent** si nécessaire

```typescript
const { state, actions, getters } = useQuizAgent(userId, "plumbing-safety");
```

### Modifier l'Interface

Les composants UI sont modulaires et facilement personnalisables :

- `/components/quiz/` - Composants spécialisés
- `/components/ui/` - Composants de base

## 🚢 Déploiement

### Vercel (Recommandé)

```bash
# Installation de Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Autres Plateformes

L'application est compatible avec toutes les plateformes supportant Next.js.

## 🧪 Tests

```bash
# Tests unitaires (à venir)
pnpm test

# Tests E2E (à venir)
pnpm test:e2e
```

## 📊 Avantages de l'Architecture Agent

- **🔄 Automatisation** : Transitions automatiques entre questions
- **🧩 Modularité** : Composants réutilisables et indépendants
- **🧪 Testabilité** : Logique métier centralisée et testable
- **📈 Extensibilité** : Facile d'ajouter de nouveaux types de quiz
- **🛠️ Maintenabilité** : Code organisé avec responsabilités séparées

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Christophe72**

- GitHub: [@Christophe72](https://github.com/Christophe72)

## 🙏 Remerciements

- Questions basées sur les normes de sécurité électrique françaises
- Interface inspirée des meilleures pratiques UX/UI
- Architecture agent inspirée des patterns Redux/Flux

---

**⚡ QuestionElec** - Testez vos connaissances en sécurité électrique ! ⚡
