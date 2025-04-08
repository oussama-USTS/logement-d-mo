#!/bin/bash

# Récupérer le message de commit depuis les arguments ou utiliser un message par défaut
commit_message=${1:-"Automatic commit from Cursor"}

# Ajouter tous les fichiers modifiés
git add .

# Créer un commit avec le message
git commit -m "$commit_message"

# Pousser les modifications
git push origin main

echo "✅ Changes committed and pushed successfully!" 