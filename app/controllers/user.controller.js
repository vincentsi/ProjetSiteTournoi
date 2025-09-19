const db = require("../models");
const UserModel = db.user;
const UserRankModel = db.user_rank;
const ListeRankModel = db.listerank;
const JeuRankModel = db.jeu_rank;
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

module.exports.getUserRoles = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé" });
    }

    const roles = await user.getRoles();
    const roleNames = roles.map((role) => role.name);

    res.status(200).send(roleNames);
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles:", error);
    res.status(500).send({ message: error.message });
  }
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
  const { rankId, userId, jeuId } = req.body;
  try {
    // Récupérer le rang depuis listerank
    const rank = await ListeRankModel.findByPk(rankId);

    if (!rank) {
      return res.status(404).send({ message: "Rank not found" });
    }

    // Vérifier que le jeu existe
    const game = await JeuModel.findByPk(jeuId);
    if (!game) {
      return res.status(404).send({ message: "Game not found" });
    }

    // Vérifier que le rang est bien associé à ce jeu
    const jeuRank = await JeuRankModel.findOne({
      where: { rankId: rankId, jeuId: jeuId },
    });

    if (!jeuRank) {
      return res
        .status(404)
        .send({ message: "This rank is not available for this game" });
    }

    const gameId = jeuId;
    const gameName = game.title;
    const rankName = rank.name;

    // Récupérer tous les rangs associés à ce jeu
    const gameRanks = await JeuRankModel.findAll({
      where: { jeuId: gameId },
      attributes: ["rankId"],
    });

    const rankIds = gameRanks.map((gameRank) => gameRank.rankId);

    // Supprimer les rangs existants de l'utilisateur pour ce jeu
    const existingRanks = await UserRankModel.findAll({
      where: {
        userId,
        jeuId: gameId,
      },
    });

    for (const existingRank of existingRanks) {
      await existingRank.destroy();
    }

    // Ajouter le nouveau rang de l'utilisateur
    await UserRankModel.create({
      rankId,
      userId,
      jeuId: gameId,
    });

    // Renvoyer les données mises à jour
    res.send({ rankName: rankName, gameName: gameName });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

module.exports.infoRankUser = async (req, res) => {
  const { userId } = req.body;

  try {
    // Récupérer les rangs de l'utilisateur avec les informations des jeux et rangs
    const userRanks = await UserRankModel.findAll({
      where: { userId },
      include: [
        {
          model: ListeRankModel,
          as: "rank",
        },
        {
          model: JeuModel,
          as: "jeu",
        },
      ],
    });

    if (userRanks.length === 0) {
      res.send([]);
      return;
    }

    // Créer la structure de données
    const rankData = userRanks.map((userRank) => ({
      rank: userRank.rank.name,
      game: userRank.jeu.title,
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
