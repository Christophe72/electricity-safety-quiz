# Architecture Agent - Quiz de Sécurité Électrique

## Vue d'ensemble

Cette application utilise une architecture basée sur un **agent** qui gère automatiquement le flux du questionnaire de sécurité électrique. L'agent centralise la logique métier et les transitions d'état, permettant une gestion plus propre et modulaire de l'application.

## Architecture

### 1. Agent Principal (`QuizAgent`)

Le `QuizAgent` est le cœur de l'application. Il :

- **Gère l'état global** du questionnaire
- **Contrôle les transitions** entre les différentes phases
- **Automatise les actions** (ex: passage automatique après 3 secondes)
- **Centralise la logique métier**

#### Responsabilités :

- Chargement des questions depuis le fichier JSON
- Gestion des réponses et du score
- Transitions automatiques entre questions
- Sauvegarde des résultats
- Gestion de l'historique

### 2. Hook React (`useQuizAgent`)

Le hook `useQuizAgent` fait le pont entre l'agent et les composants React :

- **Abonnement aux changements d'état**
- **Actions simplifiées** pour les composants
- **Getters utilitaires** pour les calculs dérivés
- **Configuration automatique** de la sauvegarde

### 3. Phases du Quiz (`QuizPhase`)

L'application est divisée en phases distinctes :

- `auth` : Authentification utilisateur
- `start` : Écran d'accueil du questionnaire
- `question` : Affichage des questions
- `result` : Affichage du résultat d'une question
- `completed` : Résultats finaux
- `history` : Historique des tentatives

### 4. Composants Spécialisés

Chaque phase a son composant dédié :

- `QuizStart` : Interface de démarrage
- `QuizQuestion` : Affichage des questions
- `QuizResult` : Affichage des explications
- `QuizCompleted` : Résultats finaux
- `QuizHistory` : Historique des résultats
- `QuizHeader` : Navigation et utilisateur

## Flux de Données

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   QuizAgent     │────│  useQuizAgent   │────│   Components    │
│   (État +       │    │   (Hook React)  │    │   (Interface)   │
│    Logique)     │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Actions       │    │   Getters       │    │   Événements    │
│   - loadQuestions│    │   - getProgress │    │   - onClick     │
│   - startQuiz   │    │   - isLast...   │    │   - onSubmit    │
│   - selectAnswer│    │   - getScore... │    │   - onStart     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Avantages de cette Architecture

### 1. **Séparation des Responsabilités**

- L'agent gère la logique métier
- Les composants gèrent uniquement l'affichage
- Le hook fait le pont entre les deux

### 2. **Automatisation**

- Transitions automatiques entre questions
- Sauvegarde automatique des résultats
- Gestion automatique des délais

### 3. **Extensibilité**

- Facile d'ajouter de nouveaux types de quiz
- Nouveaux composants facilement intégrables
- Actions et états modulaires

### 4. **Testabilité**

- Agent testable indépendamment
- Logique métier centralisée
- État prévisible

### 5. **Maintenabilité**

- Code organisé et modulaire
- Responsabilités clairement définies
- Flux de données unidirectionnel

## Configuration des Questions

Les questions sont stockées dans `/public/data/questions.json` :

```json
[
  {
    "id": 1,
    "question": "Votre question ici",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 1,
    "explanation": "Explication de la bonne réponse",
    "category": "prevention"
  }
]
```

### Catégories disponibles :

- `prevention` : Mesures préventives
- `urgence` : Situations d'urgence
- `installation` : Installation électrique
- `maintenance` : Maintenance et entretien

## Ajout de Nouveaux Questionnaires

Pour ajouter un nouveau type de questionnaire :

1. **Créer un nouveau fichier JSON** dans `/public/data/`
2. **Modifier le hook** pour accepter différents types
3. **Adapter l'agent** si nécessaire pour des logiques spécifiques

Exemple :

```typescript
// Utilisation avec un questionnaire spécifique
const { state, actions, getters } = useQuizAgent(userId, "plumbing-safety");
```

## Structure des Fichiers

```
lib/
├── quiz-agent.ts          # Agent principal
├── quiz-phases.ts         # Gestion des phases
└── auth.ts               # Authentification

hooks/
└── use-quiz-agent.ts     # Hook React

components/
├── QuizApp.tsx           # Composant principal
└── quiz/
    ├── QuizStart.tsx     # Écran de démarrage
    ├── QuizQuestion.tsx  # Affichage des questions
    ├── QuizResult.tsx    # Résultats d'une question
    ├── QuizCompleted.tsx # Résultats finaux
    ├── QuizHistory.tsx   # Historique
    └── QuizHeader.tsx    # En-tête

types/
└── quiz.ts              # Types TypeScript

public/data/
└── questions.json       # Questions du quiz
```

## Utilisation

### Démarrage Simple

```typescript
import QuizApp from "@/components/QuizApp";

export default function Page() {
  return <QuizApp />;
}
```

### Utilisation Avancée

```typescript
const { state, actions, getters } = useQuizAgent(userId);

// Démarrer le quiz
actions.startQuiz();

// Sélectionner une réponse
actions.selectAnswer(2);

// Obtenir la progression
const progress = getters.getProgress();
```

Cette architecture permet une maintenance aisée et une extensibilité maximale pour ajouter de nouveaux types de questionnaires ou fonctionnalités.
