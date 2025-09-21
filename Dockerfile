# Utilise l'image Node.js officielle
FROM node:18-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers package.json pour installer les dépendances
COPY package*.json ./
COPY client/package*.json ./client/

# Installe les dépendances du serveur et du client
RUN npm install
RUN cd client && npm install

# Copie tout le code source
COPY . .

# Build le client React
RUN cd client && npm run build

# Expose le port
EXPOSE 8080

# Commande pour démarrer le serveur
CMD ["npm", "start"]
