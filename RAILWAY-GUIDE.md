# 🚀 Guide Railway - Déploiement Gratuit

## Étape 1 : Créer la base de données Railway

### 1.1 Aller sur Railway
- Rendez-vous sur [railway.app](https://railway.app/)
- Cliquez sur "Login" et connectez-vous avec GitHub

### 1.2 Créer un nouveau projet
- Cliquez sur "New Project"
- Sélectionnez "Database" → "MySQL"

### 1.3 Noter les informations de connexion
- Une fois créé, cliquez sur votre base de données MySQL
- Allez dans l'onglet "Variables"
- Copiez ces valeurs :
  - `MYSQL_HOST`
  - `MYSQL_USER` 
  - `MYSQL_PASSWORD`
  - `MYSQL_DATABASE`
  - `MYSQL_PORT`

## Étape 2 : Configurer Cloudinary

### 2.1 Créer un compte Cloudinary
- Allez sur [cloudinary.com](https://cloudinary.com/)
- Créez un compte gratuit
- Notez :
  - Cloud name
  - API Key
  - API Secret

## Étape 3 : Déployer sur Vercel

### 3.1 Installer Vercel CLI
```bash
npm install -g vercel
```

### 3.2 Se connecter à Vercel
```bash
vercel login
```

### 3.3 Déployer le projet
```bash
vercel
```

### 3.4 Configurer les variables d'environnement
Dans le dashboard Vercel, ajoutez :

**Base de données Railway :**
```
MYSQL_HOST=votre-host-railway
MYSQL_USER=votre-username
MYSQL_PASSWORD=votre-password
MYSQL_DATABASE=votre-database-name
MYSQL_PORT=3306
```

**Cloudinary :**
```
CLOUDINARY_CLOUD_NAME=votre-cloud-name
CLOUDINARY_API_KEY=votre-api-key
CLOUDINARY_API_SECRET=votre-api-secret
```

**App :**
```
NODE_ENV=production
JWT_SECRET=votre-clé-secrète-très-longue
REACT_APP_API_URL=https://votre-app.vercel.app/
```

## Étape 4 : Initialiser la base de données

### 4.1 Exécuter le script de setup
```bash
node railway-setup.js
```

Ou manuellement :
```bash
# Tester la connexion
node -e "require('./app/models').sequelize.authenticate().then(() => console.log('✅ Connexion OK')).catch(console.error)"

# Initialiser les données
node init-complete-data.js
```

## Étape 5 : Vérifier le déploiement

### 5.1 Tester l'application
- Visitez votre URL Vercel
- Testez la connexion avec les comptes de test

### 5.2 Comptes de test
- **Admin :** username: admin, password: admin
- **User :** username: user, password: user

## 🎉 C'est terminé !

Votre application est maintenant déployée gratuitement sur :
- **Frontend + Backend :** Vercel
- **Base de données :** Railway
- **Images :** Cloudinary

## 🔧 Problèmes courants

### Images non visibles
- Vérifiez les URLs Cloudinary dans la console
- Vérifiez les variables d'environnement Cloudinary

### Erreurs de base de données
- Vérifiez les variables MYSQL_* dans Vercel
- Testez la connexion Railway

### CORS errors
- Vérifiez que REACT_APP_API_URL pointe vers votre app Vercel
