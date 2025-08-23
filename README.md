# Electrical Safety Quiz

Ce projet est une application web de quiz sur la sécurité électrique, développée avec Next.js, TypeScript et Prisma.

## Fonctionnalités

- Authentification (connexion/inscription)
- Quiz interactif sur la sécurité électrique
- Sauvegarde des résultats utilisateur
- Interface moderne et responsive

## Technologies utilisées

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Prisma** (ORM, SQLite par défaut)
- **pnpm** (gestionnaire de paquets)
- **UI personnalisée** (composants dans `/components/ui`)

## Structure du projet

```
├── app/                # Pages et API routes
│   ├── api/            # Endpoints d'authentification et quiz
│   ├── globals.css     # Styles globaux
│   └── layout.tsx      # Layout principal
├── components/         # Composants UI et formulaires
├── hooks/              # Hooks personnalisés
├── lib/                # Fonctions utilitaires et logique d'auth
├── prisma/             # Schéma Prisma
├── public/             # Images et assets
├── scripts/            # Scripts SQL
├── styles/             # Fichiers CSS
├── package.json        # Dépendances et scripts
├── tsconfig.json       # Configuration TypeScript
```

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd electrical-safety-quiz
   ```
2. **Installer les dépendances**
   ```bash
   pnpm install
   # ou
   npm install
   ```
3. **Initialiser la base de données**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

## Démarrage

```bash
pnpm dev
# ou
npm run dev
```

L’application sera disponible sur `http://localhost:3000`.

## Authentification

- Les routes `/api/auth/login` et `/api/auth/register` gèrent la connexion et l’inscription.
- Le composant `AuthForm` permet à l’utilisateur de s’authentifier ou de créer un compte.

## Quiz

- Les questions et la logique du quiz sont gérées dans les routes `/api/quiz`.
- Les résultats sont sauvegardés dans la base de données via Prisma.

## Prisma

- Le schéma se trouve dans `prisma/schema.prisma`.
- La base de données par défaut est SQLite (`dev.db`).
- Pour changer de SGBD, modifiez le bloc `datasource` dans le schéma Prisma.

## Scripts utiles

- `npx prisma studio` : interface graphique pour explorer la base de données
- `npx prisma migrate dev` : appliquer les migrations
- `npx prisma generate` : générer le client Prisma

## Personnalisation UI

- Les composants UI sont dans `components/ui/` et peuvent être modifiés selon vos besoins.

## Déploiement

- Prévu pour Vercel, mais peut être adapté à d’autres plateformes.

## Aide & contributions

Pour toute question ou suggestion, ouvrez une issue ou une pull request.

---

© 2025 Electrical Safety Quiz
