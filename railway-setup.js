// Script pour initialiser la base de données sur Railway
// À exécuter après le déploiement sur Vercel

const { sequelize } = require('./app/models');
const initCompleteData = require('./init-complete-data');

async function setupRailwayDatabase() {
  try {
    console.log('🚀 Connexion à la base de données Railway...');
    
    // Tester la connexion
    await sequelize.authenticate();
    console.log('✅ Connexion à Railway réussie !');
    
    // Synchroniser les modèles (créer les tables)
    console.log('📊 Synchronisation des modèles...');
    await sequelize.sync({ force: false }); // force: false pour ne pas supprimer les données existantes
    console.log('✅ Modèles synchronisés !');
    
    // Initialiser les données de test
    console.log('🎮 Initialisation des données de test...');
    await initCompleteData();
    console.log('✅ Données de test initialisées !');
    
    console.log('🎉 Setup Railway terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors du setup Railway:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

// Exécuter le setup
setupRailwayDatabase();
