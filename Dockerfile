FROM node:18-alpine

WORKDIR /app

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Exposer le port 4200 pour Angular
EXPOSE 4200

# Démarrer l'application Angular en mode développement
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "500"]