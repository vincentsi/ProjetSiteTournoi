# Guide de déploiement sur Vercel + Railway

## 1. Prérequis

### Base de données - Railway (GRATUIT)
1. Créer un compte sur [Railway](https://railway.app/)
2. Cliquer sur "New Project"
3. Sélectionner "Database" → "MySQL"
4. Railway créera automatiquement votre base de données
5. Dans l'onglet "Variables", noter les informations :
   - MYSQL_HOST
   - MYSQL_USER
   - MYSQL_PASSWORD
   - MYSQL_DATABASE
   - MYSQL_PORT

### Images - Cloudinary (GRATUIT)
1. Créer un compte sur [Cloudinary](https://cloudinary.com/)
2. Noter les informations :
   - Cloud name
   - API Key
   - API Secret

## 2. Variables d'environnement Vercel

Dans le dashboard Vercel, ajouter ces variables :

### Base de données Railway
```
MYSQL_HOST=votre-host-railway
MYSQL_USER=votre-username
MYSQL_PASSWORD=votre-password
MYSQL_DATABASE=votre-database-name
MYSQL_PORT=3306
```

### JWT
```
JWT_SECRET=votre-clé-secrète-jwt-très-longue-et-sécurisée
```

### Cloudinary
```
CLOUDINARY_CLOUD_NAME=votre-cloud-name
CLOUDINARY_API_KEY=votre-api-key
CLOUDINARY_API_SECRET=votre-api-secret
```

### App
```
NODE_ENV=production
REACT_APP_API_URL=https://votre-app.vercel.app/
```

## 3. Commandes de déploiement

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# 4. Configurer les variables d'environnement
# (Via le dashboard Vercel)

# 5. Redéployer après configuration
vercel --prod
```

## 4. Migration de la base de données

Après le déploiement, vous devrez :
1. Exécuter le script `init-complete-data.js` sur la base PlanetScale
2. Ou recréer les tables via Sequelize

## 5. Problèmes courants

- **Images non visibles** : Vérifier les URLs Cloudinary
- **Erreurs de base de données** : Vérifier les variables d'environnement
- **CORS** : Vérifier l'URL dans server.js
