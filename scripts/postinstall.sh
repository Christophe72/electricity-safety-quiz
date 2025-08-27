#!/bin/bash

echo "🔧 Configuration post-installation..."

# Génère le client Prisma
npx prisma generate

# Applique les migrations
npx prisma migrate deploy

echo "✅ Configuration terminée"
