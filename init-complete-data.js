require("dotenv").config();
const db = require("./app/models");

async function initCompleteData() {
  try {
    console.log("🎯 Initialisation complète des données...");

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

    console.log("\n🏆 Création des rangs...");
    const rangs = [
      { id: 1, name: "Iron", picture: "./img/rankjeux/iron.jpg" },
      { id: 2, name: "Bronze", picture: "./img/rankjeux/bronze.jpg" },
      { id: 3, name: "Silver", picture: "./img/rankjeux/silver.jpg" },
      { id: 4, name: "Gold", picture: "./img/rankjeux/gold.jpg" },
      { id: 5, name: "Platinum", picture: "./img/rankjeux/platinum.jpg" },
      { id: 6, name: "Diamond", picture: "./img/rankjeux/diamond.jpg" },

      { id: 7, name: "Master", picture: "./img/rankjeux/master.jpg" },
      { id: 8, name: "Grandmaster", picture: "./img/rankjeux/grandmaster.jpg" },
      { id: 9, name: "Challenger", picture: "./img/rankjeux/challenger.jpg" },

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
      {
        name: "Dota 2",
        title: "Dota 2",
        picture: "/img/imagejeux/dota2.jpg",
        genres: "MOBA",
        description: "MOBA stratégique avec des héros uniques",
      },
      {
        name: "Heroes of the Storm",
        title: "Heroes of the Storm",
        picture: "/img/imagejeux/heroesofthestorm.jpg",
        genres: "MOBA",
        description: "MOBA avec les héros Blizzard",
      },
      {
        name: "Counter-Strike 2",
        title: "Counter-Strike 2",
        picture: "/img/imagejeux/counterstrike2.jpg",
        genres: "FPS",
        description: "FPS tactique compétitif",
      },
      {
        name: "Overwatch 2",
        title: "Overwatch 2",
        picture: "/img/imagejeux/overwatch2.jpg",
        genres: "FPS",
        description: "FPS héroïque multijoueur",
      },
      {
        name: "Apex Legends",
        title: "Apex Legends",
        picture: "/img/imagejeux/apexlegends.jpg",
        genres: "FPS",
        description: "Battle royale FPS",
      },
      {
        name: "FIFA 24",
        title: "FIFA 24",
        picture: "/img/imagejeux/fifa24.jpg",
        genres: "Sport",
        description: "Simulation de football",
      },
      {
        name: "NBA 2K24",
        title: "NBA 2K24",
        picture: "/img/imagejeux/nba2k24.jpg",
        genres: "Sport",
        description: "Simulation de basketball",
      },
      {
        name: "Street Fighter 6",
        title: "Street Fighter 6",
        picture: "/img/imagejeux/streetfighter6.jpg",
        genres: "Combat",
        description: "Jeu de combat classique",
      },
      {
        name: "Tekken 8",
        title: "Tekken 8",
        picture: "/img/imagejeux/tekken8.jpg",
        genres: "Combat",
        description: "Combat 3D intense",
      },
      {
        name: "Mortal Kombat 1",
        title: "Mortal Kombat 1",
        picture: "/img/imagejeux/mortalkombat1.jpg",
        genres: "Combat",
        description: "Combat brutal et cinématique",
      },
      {
        name: "Chess.com",
        title: "Chess.com",
        picture: "/img/imagejeux/chess.jpg",
        genres: "Auto-chess",
        description: "Plateforme d'échecs en ligne",
      },
      {
        name: "Hearthstone",
        title: "Hearthstone",
        picture: "/img/imagejeux/hearthstone.jpg",
        genres: "Auto-chess",
        description: "Jeu de cartes stratégique",
      },
      {
        name: "Legends of Runeterra",
        title: "Legends of Runeterra",
        picture: "/img/imagejeux/legendsofruneterra.jpg",
        genres: "Auto-chess",
        description: "Jeu de cartes de l'univers LoL",
      },
      {
        name: "Minecraft",
        title: "Minecraft",
        picture: "/img/imagejeux/minecraft.jpg",
        genres: "Aventure",
        description: "Monde ouvert créatif",
      },
      {
        name: "The Witcher 3",
        title: "The Witcher 3",
        picture: "/img/imagejeux/thewitcher3.jpg",
        genres: "Aventure",
        description: "RPG d'aventure épique",
      },
      {
        name: "Elden Ring",
        title: "Elden Ring",
        picture: "/img/imagejeux/eldenring.jpg",
        genres: "Aventure",
        description: "Aventure sombre et difficile",
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

      let gameRanks = [];
      switch (jeu.name) {
        case "League of Legends":
        case "Dota 2":
        case "Heroes of the Storm":
        case "Teamfight Tactics":
          gameRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          break;
        case "Valorant":
        case "Counter-Strike 2":
        case "Overwatch 2":
        case "Apex Legends":
          gameRanks = [1, 2, 3, 4, 5, 6, 10, 11];
          break;
        case "Rocket League":
        case "FIFA 24":
        case "NBA 2K24":
          gameRanks = [2, 3, 4, 5, 6, 12, 13, 14];
          break;
        case "Super Smash Bros":
        case "Street Fighter 6":
        case "Tekken 8":
        case "Mortal Kombat 1":
        case "The Legend of Zelda":
        case "Minecraft":
        case "The Witcher 3":
        case "Elden Ring":
          gameRanks = [1, 2, 3, 4, 5, 6];
          break;
        case "Chess.com":
        case "Hearthstone":
        case "Legends of Runeterra":
          gameRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          break;
      }

      await db.jeu_rank.destroy({
        where: { jeuId: jeuCreated.id },
      });

      for (const rankId of gameRanks) {
        await db.jeu_rank.create({
          jeuId: jeuCreated.id,
          rankId: rankId,
        });
      }
      console.log(`  🔗 ${gameRanks.length} rangs associés à ${jeu.name}`);
    }

    console.log("\n👤 Création des utilisateurs de test...");
    const utilisateurs = [
      {
        username: "admin",
        email: "admin@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Administrateur du site de tournois",
        roleId: 2,
        picture: "./uploads/profil/admin.jpg",
      },
      {
        username: "organisateur1",
        email: "org1@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Organisateur de tournois expérimenté",
        roleId: 1,
        picture: "./uploads/profil/org1.jpg",
      },
      {
        username: "joueur1",
        email: "joueur1@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Passionné de League of Legends",
        roleId: 1,
        picture: "./uploads/profil/joueur1.jpg",
      },
      {
        username: "valorant_pro",
        email: "valorant@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Joueur pro Valorant, Immortal rank",
        roleId: 1,
        picture: "./uploads/profil/valorant_pro.jpg",
      },
      {
        username: "rocket_league_fan",
        email: "rocket@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Fan de Rocket League, Champion rank",
        roleId: 1,
        picture: "./uploads/profil/rocket_fan.jpg",
      },
      {
        username: "smash_master",
        email: "smash@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Maître du Super Smash Bros",
        roleId: 1,
        picture: "./uploads/profil/smash_master.jpg",
      },
      {
        username: "tft_strategist",
        email: "tft@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Stratège TFT, Grandmaster rank",
        roleId: 1,
        picture: "./uploads/profil/tft_strategist.jpg",
      },
      {
        username: "zelda_explorer",
        email: "zelda@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Explorateur d'Hyrule",
        roleId: 1,
        picture: "./uploads/profil/zelda_explorer.jpg",
      },
      {
        username: "multi_gamer",
        email: "multi@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Joueur multigaming, bon dans tous les jeux",
        roleId: 1,
        picture: "./uploads/profil/multi_gamer.jpg",
      },
      {
        username: "newcomer",
        email: "newcomer@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Nouveau sur la plateforme",
        roleId: 1,
        picture: "./uploads/profil/random-user.png",
      },
      {
        username: "pro_gamer",
        email: "pro@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Joueur professionnel multigaming",
        roleId: 1,
        picture: "./uploads/profil/pro_gamer.jpg",
      },
      {
        username: "streamer_king",
        email: "streamer@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Streamer et créateur de contenu gaming",
        roleId: 1,
        picture: "./uploads/profil/streamer_king.jpg",
      },
      {
        username: "tournament_master",
        email: "tournament@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Expert en organisation de tournois",
        roleId: 1,
        picture: "./uploads/profil/tournament_master.jpg",
      },
      {
        username: "lol_challenger",
        email: "lol@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Challenger League of Legends",
        roleId: 1,
        picture: "./uploads/profil/lol_challenger.jpg",
      },
      {
        username: "valorant_radiant",
        email: "valo@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Radiant Valorant, sniper expert",
        roleId: 1,
        picture: "./uploads/profil/valorant_radiant.jpg",
      },
      {
        username: "rocket_ssl",
        email: "ssl@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Supersonic Legend Rocket League",
        roleId: 1,
        picture: "./uploads/profil/rocket_ssl.jpg",
      },
      {
        username: "smash_god",
        email: "smashgod@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Dieu du Super Smash Bros Ultimate",
        roleId: 1,
        picture: "./uploads/profil/smash_god.jpg",
      },
      {
        username: "tft_genius",
        email: "tftgenius@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Génie TFT, stratège tactique",
        roleId: 1,
        picture: "./uploads/profil/tft_genius.jpg",
      },
      {
        username: "zelda_master",
        email: "zelda@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Maître des légendes de Zelda",
        roleId: 1,
        picture: "./uploads/profil/zelda_master.jpg",
      },
      {
        username: "esports_coach",
        email: "coach@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Coach esport professionnel",
        roleId: 1,
        picture: "./uploads/profil/esports_coach.jpg",
      },
      {
        username: "game_analyst",
        email: "analyst@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Analyste de jeux vidéo",
        roleId: 1,
        picture: "./uploads/profil/game_analyst.jpg",
      },
      {
        username: "tournament_commentator",
        email: "commentator@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Commentateur de tournois esport",
        roleId: 1,
        picture: "./uploads/profil/commentator.jpg",
      },
      {
        username: "casual_gamer",
        email: "casual@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Joueur occasionnel, juste pour le plaisir",
        roleId: 1,
        picture: "./uploads/profil/casual_gamer.jpg",
      },
      {
        username: "speedrunner",
        email: "speedrun@tournoi.com",
        password:
          "$2a$10$9.LvlA3HEYDYluqfJUBkw.cx5O0iDZh1OIBIbVLdUMDya.vWtra9u",
        bio: "Speedrunner Zelda et autres jeux",
        roleId: 1,
        picture: "./uploads/profil/speedrunner.jpg",
      },
    ];

    for (const user of utilisateurs) {
      const [userCreated, created] = await db.user.findOrCreate({
        where: { email: user.email },
        defaults: user,
      });

      if (created) {
        console.log(`✅ Utilisateur créé: ${user.username} (${user.email})`);
      } else {
        console.log(`⚠️  Utilisateur déjà existant: ${user.username}`);
      }

      // Créer l'association user-role si elle n'existe pas
      if (user.roleId) {
        const role = await db.role.findByPk(user.roleId);
        if (role) {
          const hasRole = await userCreated.hasRole(role);
          if (!hasRole) {
            await userCreated.addRole(role);
            console.log(`🔗 Rôle assigné: ${user.username} → ${role.name}`);
          }
        }
      }
    }

    console.log("\n🏆 Création des tournois de test...");
    const tournois = [
      {
        title: "Championnat LoL Hiver 2024",
        information: "Tournoi de League of Legends pour tous niveaux",
        nJoueur: 16,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "500€ + goodies Riot Games",
        regle: "Format élimination directe, pas de champions interdits",
        horaire: "Samedi 15h-20h",
        contact: "Discord: LoLChamp#1234",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 1,
        organisateurId: 2,
      },
      {
        title: "Valorant Masters 2024",
        information: "Tournoi Valorant pour joueurs Diamond+",
        nJoueur: 8,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "300€ + skins exclusives",
        regle: "Format round-robin puis élimination",
        horaire: "Dimanche 14h-18h",
        contact: "Discord: ValoMasters#5678",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 2,
        organisateurId: 4,
      },
      {
        title: "Rocket League Championship",
        information: "Tournoi 3v3 Rocket League",
        nJoueur: 12,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "200€ + items exclusifs",
        regle: "Match en 3v3, 5 minutes par match",
        horaire: "Samedi 16h-22h",
        contact: "Discord: RLChamp#9999",
        platforme: "PC/Console",
        status: "non lancé",
        listejeuId: 3,
        organisateurId: 5,
      },
      {
        title: "Smash Bros Ultimate Tournament",
        information: "Tournoi Super Smash Bros Ultimate",
        nJoueur: 32,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "150€ + amiibo exclusifs",
        regle: "Format double élimination, tous personnages autorisés",
        horaire: "Dimanche 10h-20h",
        contact: "Discord: SmashTourney#1111",
        platforme: "Nintendo Switch",
        status: "non lancé",
        listejeuId: 4,
        organisateurId: 6,
      },
      {
        title: "TFT Tactics Championship",
        information: "Tournoi Teamfight Tactics",
        nJoueur: 8,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "100€ + RP League",
        regle: "6 parties, meilleur score gagne",
        horaire: "Samedi 19h-23h",
        contact: "Discord: TFTChamp#2222",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 5,
        organisateurId: 7,
      },
      {
        title: "Zelda Speedrun Competition",
        information: "Compétition de speedrun Zelda BOTW",
        nJoueur: 16,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "75€ + édition collector",
        regle: "Speedrun 100%, temps le plus rapide gagne",
        horaire: "Samedi 9h-17h",
        contact: "Discord: ZeldaSpeed#3333",
        platforme: "Nintendo Switch",
        status: "non lancé",
        listejeuId: 6,
        organisateurId: 8,
      },
      {
        title: "Multi-Gaming Festival",
        information: "Tournoi multigaming pour tous",
        nJoueur: 24,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "400€ + lots divers",
        regle: "3 jeux différents, points cumulés",
        horaire: "Samedi-Dimanche 10h-18h",
        contact: "Discord: MultiFest#4444",
        platforme: "Multi",
        status: "non lancé",
        listejeuId: 1,
        organisateurId: 9,
      },
      {
        title: "Pro Gamer Showdown",
        information: "Tournoi réservé aux joueurs pro",
        nJoueur: 8,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "1000€ + sponsorisation",
        regle: "Format professionnel, streaming obligatoire",
        horaire: "Samedi 20h-02h",
        contact: "Discord: ProShow#5555",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 2,
        organisateurId: 10,
      },
      {
        title: "Streamer Tournament",
        information: "Tournoi pour streamers et créateurs",
        nJoueur: 16,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "250€ + équipement streaming",
        regle: "Streaming obligatoire, interaction avec le public",
        horaire: "Dimanche 15h-21h",
        contact: "Discord: StreamTourney#6666",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 1,
        organisateurId: 11,
      },
      {
        title: "Tournament Master Cup",
        information: "Tournoi organisé par un expert",
        nJoueur: 20,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "350€ + coaching privé",
        regle: "Format innovant, règles personnalisées",
        horaire: "Samedi 12h-20h",
        contact: "Discord: MasterCup#7777",
        platforme: "PC/Console",
        status: "non lancé",
        listejeuId: 3,
        organisateurId: 12,
      },
      {
        title: "LoL Challenger Series",
        information: "Série de tournois LoL pour Challenger",
        nJoueur: 8,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "800€ + qualification pro",
        regle: "Format BO5, méta actuelle",
        horaire: "Dimanche 16h-22h",
        contact: "Discord: ChallengerSeries#8888",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 1,
        organisateurId: 13,
      },
      {
        title: "Valorant Radiant League",
        information: "Ligue Valorant pour joueurs Radiant",
        nJoueur: 10,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "600€ + skins mythiques",
        regle: "Ligue sur plusieurs semaines",
        horaire: "Samedi 18h-21h",
        contact: "Discord: RadiantLeague#9999",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 2,
        organisateurId: 14,
      },
      {
        title: "Rocket League SSL Championship",
        information: "Championnat SSL Rocket League",
        nJoueur: 6,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "500€ + alpha boost",
        regle: "Format SSL, règles officielles",
        horaire: "Dimanche 17h-20h",
        contact: "Discord: SSLChamp#1010",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 3,
        organisateurId: 15,
      },
      {
        title: "Smash God Tournament",
        information: "Tournoi pour dieux du Smash",
        nJoueur: 16,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "300€ + contrôleur pro",
        regle: "Format godlike, techniques avancées",
        horaire: "Samedi 13h-21h",
        contact: "Discord: SmashGod#1111",
        platforme: "Nintendo Switch",
        status: "non lancé",
        listejeuId: 4,
        organisateurId: 16,
      },
      {
        title: "TFT Genius Competition",
        information: "Compétition TFT pour génies tactiques",
        nJoueur: 8,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "200€ + coaching TFT",
        regle: "Format tactique pure, méta analysis",
        horaire: "Dimanche 20h-24h",
        contact: "Discord: TFTGenius#1212",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 5,
        organisateurId: 17,
      },
      {
        title: "Zelda Master Quest",
        information: "Quête maître Zelda pour experts",
        nJoueur: 12,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "150€ + édition master",
        regle: "Quête complète, tous les shrines",
        horaire: "Samedi 8h-16h",
        contact: "Discord: ZeldaMaster#1313",
        platforme: "Nintendo Switch",
        status: "non lancé",
        listejeuId: 6,
        organisateurId: 18,
      },
      {
        title: "Esports Coach Training",
        information: "Formation coaching esport",
        nJoueur: 20,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "Certification + emploi",
        regle: "Format pédagogique, théorie + pratique",
        horaire: "Week-end complet",
        contact: "Discord: CoachTraining#1414",
        platforme: "Multi",
        status: "non lancé",
        listejeuId: 1,
        organisateurId: 19,
      },
      {
        title: "Game Analyst Workshop",
        information: "Atelier d'analyse de jeux",
        nJoueur: 15,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "Formation + outils d'analyse",
        regle: "Format éducatif, analyse de replays",
        horaire: "Samedi 9h-17h",
        contact: "Discord: AnalystWorkshop#1515",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 2,
        organisateurId: 20,
      },
      {
        title: "Tournament Commentary Masterclass",
        information: "Masterclass commentaire esport",
        nJoueur: 12,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "Formation + équipement audio",
        regle: "Format pratique, commentaire en direct",
        horaire: "Dimanche 10h-18h",
        contact: "Discord: CommentaryMC#1616",
        platforme: "Multi",
        status: "non lancé",
        listejeuId: 3,
        organisateurId: 21,
      },
      {
        title: "Casual Gamer Fun Tournament",
        information: "Tournoi fun pour joueurs occasionnels",
        nJoueur: 32,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "Goodies + souvenirs",
        regle: "Format fun, règles simplifiées",
        horaire: "Dimanche 14h-18h",
        contact: "Discord: CasualFun#1717",
        platforme: "Multi",
        status: "non lancé",
        listejeuId: 4,
        organisateurId: 22,
      },
      {
        title: "Speedrun World Record Attempt",
        information: "Tentative de record du monde",
        nJoueur: 24,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "Reconnaissance + trophée",
        regle: "Format speedrun, règles officielles",
        horaire: "Samedi 6h-18h",
        contact: "Discord: SpeedrunWR#1818",
        platforme: "Multi",
        status: "non lancé",
        listejeuId: 6,
        organisateurId: 23,
      },
      {
        title: "Admin Tournament - Full House",
        information: "Tournoi admin avec 8 joueurs inscrits",
        nJoueur: 8,
        picture: "/img/imagetournois/default-tournament.png",
        prix: "test",
        regle: "Format admin, règles spéciales",
        horaire: "Samedi 15h-19h",
        contact: "Discord: AdminTourney#0000",
        platforme: "PC",
        status: "non lancé",
        listejeuId: 1,
        organisateurId: 1, // Admin
      },
    ];

    for (const tournoi of tournois) {
      const [tournoiCreated, created] = await db.listetournoi.findOrCreate({
        where: { title: tournoi.title },
        defaults: tournoi,
      });

      if (created) {
        console.log(`✅ Tournoi créé: ${tournoi.title}`);

        await db.tournoiroles.create({
          tournoiId: tournoiCreated.id,
          userId: tournoi.organisateurId,
          roleId: 3,
        });

        console.log(
          `  🔗 Organisateur assigné (ID: ${tournoi.organisateurId})`
        );
      } else {
        console.log(`⚠️  Tournoi déjà existant: ${tournoi.title}`);
      }
    }

    console.log("\n👥 Création des inscriptions aux tournois...");

    // Récupérer tous les tournois et utilisateurs
    const allTournois = await db.listetournoi.findAll();
    const users = await db.user.findAll();

    // Créer des inscriptions pour chaque tournoi (2-5 joueurs par tournoi)
    for (const tournoi of allTournois) {
      // Exclure l'organisateur du tournoi
      const organisateur = await db.tournoiroles.findOne({
        where: { tournoiId: tournoi.id, roleId: 3 },
      });

      const availableUsers = users.filter(
        (user) => user.id !== organisateur?.userId && user.id !== 1 // Exclure admin et organisateur
      );

      let nbInscriptions;

      // Tournoi admin spécial : toujours remplir complètement
      if (tournoi.title === "Admin Tournament - Full House") {
        nbInscriptions = tournoi.nJoueur - 1; // 8 - 1 = 7 joueurs (plus l'admin = 8 total)
      } else {
        // Pour 2-3 tournois, les remplir complètement
        const shouldFillCompletely = Math.random() < 0.15; // 15% de chance

        if (
          shouldFillCompletely &&
          availableUsers.length >= tournoi.nJoueur - 1
        ) {
          // Remplir complètement (moins l'organisateur)
          nbInscriptions = tournoi.nJoueur - 1;
        } else {
          // Inscrire entre 2 et 5 joueurs aléatoirement
          nbInscriptions = Math.floor(Math.random() * 4) + 2; // 2 à 5 joueurs
        }
      }

      const selectedUsers = availableUsers
        .sort(() => 0.5 - Math.random())
        .slice(0, nbInscriptions);

      for (const user of selectedUsers) {
        // Vérifier si l'utilisateur n'est pas déjà inscrit
        const existingInscription = await db.tournoiroles.findOne({
          where: {
            tournoiId: tournoi.id,
            userId: user.id,
            roleId: 4, // roleId 4 = joueur
          },
        });

        if (!existingInscription) {
          await db.tournoiroles.create({
            tournoiId: tournoi.id,
            userId: user.id,
            roleId: 4, // joueur
          });

          console.log(`  📝 ${user.username} inscrit à "${tournoi.title}"`);
        }
      }

      if (nbInscriptions === tournoi.nJoueur - 1) {
        console.log(
          `  🎯 TOURNOI COMPLET ! ${selectedUsers.length} joueurs inscrits à "${tournoi.title}" (${tournoi.nJoueur} max)`
        );
      } else {
        console.log(
          `  🎯 ${selectedUsers.length} joueurs inscrits à "${tournoi.title}"`
        );
      }
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
    console.log("  - 24 utilisateurs de test créés:");
    console.log("    • admin (admin@tournoi.com) - Admin");
    console.log(
      "    • organisateur1 (org1@tournoi.com) - User (à promouvoir adminTournoi)"
    );
    console.log(
      "    • joueurs spécialisés: joueur1, valorant_pro, rocket_league_fan, smash_master"
    );
    console.log(
      "    • joueurs experts: lol_challenger, valorant_radiant, rocket_ssl, smash_god"
    );
    console.log(
      "    • créateurs: streamer_king, tournament_master, esports_coach, game_analyst"
    );
    console.log(
      "    • autres: tft_genius, zelda_master, commentator, casual_gamer, speedrunner"
    );
    console.log("  - 23 tournois créés par les utilisateurs:");
    console.log(
      "    • Tournois par jeu: LoL (5), Valorant (3), Rocket League (3)"
    );
    console.log("    • Smash Bros (3), TFT (2), Zelda (2), Multi (5)");
    console.log("    • Tous avec organisateur assigné (roleId: 3)");
    console.log("    • 1 tournoi admin avec 8 joueurs (complet)");
    console.log("    • 2-5 joueurs inscrits aléatoirement par tournoi");
    console.log("  - Structure user_ranks prête (userId, rankId, jeuId)");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error);
  } finally {
    await db.sequelize.close();
    process.exit(0);
  }
}

initCompleteData();
