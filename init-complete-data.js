const db = require("./app/models");

async function initCompleteData() {
  try {
    console.log("🎯 Initialisation complète des données...");

    // 1. Créer les rôles (comme dans init-roles.js)
    console.log("👥 Création des rôles...");
    const roles = [
      { id: 1, name: "user" },
      { id: 2, name: "admin" },
      { id: 3, name: "adminTournoi" },
      { id: 4, name: "joueur" },
    ];

    for (const role of roles) {
      const [roleCreated, created] = await db.role.findOrCreate({
        where: { id: role.id },
        defaults: role,
      });
      if (created) {
        console.log(`✅ Rôle '${role.name}' créé`);
      } else {
        console.log(`⚠️  Rôle '${role.name}' déjà existant`);
      }
    }

    // 2. Créer tous les rangs spécifiques aux jeux
    console.log("\n🏆 Création des rangs...");
    const rangs = [
      // Rangs communs
      { id: 1, name: "Iron", picture: "./img/rankjeux/iron.jpg" },
      { id: 2, name: "Bronze", picture: "./img/rankjeux/bronze.jpg" },
      { id: 3, name: "Silver", picture: "./img/rankjeux/silver.jpg" },
      { id: 4, name: "Gold", picture: "./img/rankjeux/gold.jpg" },
      { id: 5, name: "Platinum", picture: "./img/rankjeux/platinum.jpg" },
      { id: 6, name: "Diamond", picture: "./img/rankjeux/diamond.jpg" },

      // Rangs spécifiques LoL/TFT
      { id: 7, name: "Master", picture: "./img/rankjeux/master.jpg" },
      { id: 8, name: "Grandmaster", picture: "./img/rankjeux/grandmaster.jpg" },
      { id: 9, name: "Challenger", picture: "./img/rankjeux/challenger.jpg" },

      // Rangs spécifiques Valorant
      {
        id: 10,
        name: "Immortal",
        picture: "./img/rankjeux/valorant_immortal.jpg",
      },
      {
        id: 11,
        name: "Radiant",
        picture: "./img/rankjeux/valorant_radiant.jpg",
      },

      // Rangs spécifiques Rocket League
      { id: 12, name: "Champion", picture: "./img/rankjeux/rl_champion.jpg" },
      {
        id: 13,
        name: "Grand Champion",
        picture: "./img/rankjeux/rl_grandchampion.jpg",
      },
      {
        id: 14,
        name: "Supersonic Legend",
        picture: "./img/rankjeux/rl_ssl.jpg",
      },
    ];

    for (const rang of rangs) {
      const [rangCreated, created] = await db.listerank.findOrCreate({
        where: { id: rang.id },
        defaults: rang,
      });
      if (created) {
        console.log(`✅ Rang '${rang.name}' créé`);
      } else {
        console.log(`⚠️  Rang '${rang.name}' déjà existant`);
      }
    }

    // 3. Créer les jeux (comme dans init-jeux.js mais adapté)
    console.log("\n🎮 Création des jeux...");
    const jeux = [
      {
        name: "League of Legends",
        title: "League of Legends",
        picture: "./img/imagejeux/LoL.jpg",
        genres: "MOBA",
        description: "Jeu de stratégie en temps réel 5v5",
      },
      {
        name: "Valorant",
        title: "Valorant",
        picture: "./img/imagejeux/valorant.jpg",
        genres: "FPS",
        description: "Jeu de tir tactique 5v5",
      },
      {
        name: "Rocket League",
        title: "Rocket League",
        picture: "./img/imagejeux/rocketleague.jpg",
        genres: "Sport",
        description: "Football avec des voitures",
      },
      {
        name: "Super Smash Bros",
        title: "Super Smash Bros",
        picture: "./img/imagejeux/smash.jpg",
        genres: "Combat",
        description: "Jeu de combat multijoueur",
      },
      {
        name: "Teamfight Tactics",
        title: "Teamfight Tactics",
        picture: "./img/imagejeux/tft.jpg",
        genres: "Auto-chess",
        description: "Jeu de stratégie tactique",
      },
      {
        name: "The Legend of Zelda",
        title: "The Legend of Zelda",
        picture: "./img/imagejeux/zelda.jpg",
        genres: "Aventure",
        description: "Jeu d'aventure et d'exploration",
      },
    ];

    for (const jeu of jeux) {
      const [jeuCreated, created] = await db.listejeu.findOrCreate({
        where: { name: jeu.name },
        defaults: jeu,
      });

      if (created) {
        console.log(`✅ Jeu créé: ${jeu.name}`);
      } else {
        console.log(`⚠️  Jeu déjà existant: ${jeu.name}`);
      }

      // Associer les rangs spécifiques à chaque jeu (même si le jeu existe déjà)
      let gameRanks = [];
      switch (jeu.name) {
        case "League of Legends":
        case "Teamfight Tactics":
          gameRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Iron à Challenger
          break;
        case "Valorant":
          gameRanks = [1, 2, 3, 4, 5, 6, 10, 11]; // Iron à Radiant
          break;
        case "Rocket League":
          gameRanks = [2, 3, 4, 5, 6, 12, 13, 14]; // Bronze à SSL
          break;
        case "Super Smash Bros":
        case "The Legend of Zelda":
          gameRanks = [1, 2, 3, 4, 5, 6]; // Iron à Diamond seulement
          break;
      }

      // Supprimer les anciennes associations pour ce jeu
      await db.jeu_rank.destroy({
        where: { jeuId: jeuCreated.id },
      });

      // Créer les nouvelles associations
      for (const rankId of gameRanks) {
        await db.jeu_rank.create({
          jeuId: jeuCreated.id,
          rankId: rankId,
        });
      }
      console.log(`  🔗 ${gameRanks.length} rangs associés à ${jeu.name}`);
    }

    console.log("\n🎉 Initialisation terminée avec succès !");
    console.log("📊 Résumé:");
    console.log("  - 4 rôles (user, admin, adminTournoi, joueur)");
    console.log("  - 14 rangs spécifiques par jeu:");
    console.log("    • League of Legends: 9 rangs (Iron → Challenger)");
    console.log("    • Teamfight Tactics: 9 rangs (Iron → Challenger)");
    console.log("    • Valorant: 8 rangs (Iron → Radiant)");
    console.log("    • Rocket League: 8 rangs (Bronze → SSL)");
    console.log("    • Super Smash Bros: 6 rangs (Iron → Diamond)");
    console.log("    • The Legend of Zelda: 6 rangs (Iron → Diamond)");
    console.log("  - Structure user_ranks prête (userId, rankId, jeuId)");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error);
  } finally {
    await db.sequelize.close();
    process.exit(0);
  }
}

initCompleteData();
