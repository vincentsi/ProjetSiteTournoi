const db = require("../models");
const UserModel = db.user;
const UserRankModel = db.user_rank;
const RankModel = db.rank;
const JeuModel = db.listejeu;
// const userModel = require("../models/user.model");
// const config = require("../config/auth.config");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.findAll({
    attributes: { exclude: ["password"] },
  });
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  UserModel.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((id) => {
      if (!id) {
        return res.status(200).send({ errorsid: "id Not found." });
      }
      res.status(200).send({
        id: id.id,
        username: id.username,
        email: id.email,
        picture: id.picture,
        bio: id.bio,
        createdAt: id.createdAt,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
module.exports.userInfoByUsername = (req, res) => {
  const username = req.body.username; 

  UserModel.findOne({
    where: {
      username: username, 
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(200).send({ errors: "Utilisateur non trouvé." });
      }

      // Renvoyez les informations de l'utilisateur
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        picture: user.picture,
        bio: user.bio,
        createdAt: user.createdAt,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (user != null) {
      await user.update({ bio: req.body.bio });

      res.status(200).send({ message: "Bio updated successfully." });
    } else {
      res.status(404).send({ message: "User not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
  // try {
  //     UserModel.findOne({
  //   where: {
  //     id: req.params.id,
  //   },
  // });
  //     UserModel.update({ bio: req.body.bio }, { where: { id: req.params.id } });
  //     console.log(bio);
  // } catch (err) {
  //   console.log(err)
  //   return res.status(500).send({ message: err });
  // }
};

module.exports.updateRankUser = async (req, res) => {
  const { rankId, userId } = req.body;
  try {
    const rank = await RankModel.findOne({
      where: { id: rankId },
    });

    if (rank) {
      const gameId = rank.jeuId;

      // Effectuez une autre requête pour obtenir le nom du rang à partir de rankId
      const rankName = rank.name;

      // Effectuez une autre requête pour obtenir le nom du jeu à partir de gameId
      const game = await JeuModel.findOne({
        where: { id: gameId },
      });
      const gameName = game.title;

      const gameRanks = await RankModel.findAll({
        attributes: ['id'],
        where: { jeuId: gameId },
      });

      const rankIds = gameRanks.map((gameRank) => gameRank.id);

      const existingRank = await UserRankModel.findOne({
        where: { userId, rankId: rankIds },
      });

      if (existingRank) {
        await existingRank.destroy();
      }

      const addRank = await UserRankModel.create({
        rankId,
        userId,
      });

      // Renvoyez les données mises à jour, y compris le nom du rang et le nom du jeu
      res.send({ rankName: rankName, gameName: gameName });
    } else {
      res.status(404).send({ message: 'Rank not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};


module.exports.infoRankUser = async (req, res) => {
  const { userId } = req.body;

  try {
    //les rangs de l'utilisateur à partir de la table user_ranks
    const userRanks = await UserRankModel.findAll({
      where: {
        userId,
      },
    });

    if (userRanks.length === 0) {
      // Si aucun rang n'est trouvé une réponse vide 
      res.send([]);
      return;
    }

    // IDs de rang de l'utilisateur
    const rankIds = userRanks.map((rank) => rank.rankId);

    // les rangs correspondant aux IDs dans la table ranks
    const ranksData = await RankModel.findAll({
      where: {
        id: rankIds,
      },
    });

    // IDs de jeu associés aux rangs
    const gameIds = ranksData.map((rank) => rank.jeuId);

    // noms de jeu correspondant aux IDs dans la table jeux
    const gamesData = await JeuModel.findAll({
      where: {
        id: gameIds,
      },
    });

    // noms de jeu à partir des données de jeu
    const gameNames = gamesData.map((game) => game.title);

    // noms de rangs à partir des données de rangs
    const rankNames = ranksData.map((rank) => rank.name);

    // Créez une structure de données qui associe les noms de rangs aux noms de jeu
    const rankData = rankNames.map((rank, index) => ({
      rank,
      game: gameNames[index],
    }));

    res.send(rankData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };
