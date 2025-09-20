const db = require("../models");
const { Op, where } = require("sequelize");
const UserModel = db.user;
const TournoisModel = db.listetournoi;
const UserTournoiModel = db.user_tournoi;
const MatchesModel = db.matches;
const TournoiRolesModel = db.tournoiroles;
const JOUEUR_ROLE_ID = 4;
exports.affParticipant = async (req, res) => {
  try {
    const addAllUser = await TournoiRolesModel.findAll({
      where: {
        tournoiId: req.body.tournoiId,
        roleId: JOUEUR_ROLE_ID,
      },
    });

    const userIds = addAllUser.map((item) => item.userId);

    const users = await UserModel.findAll({
      where: { id: userIds },
      attributes: ["id", "username"],
    });
    // const userUsername = users.map((item) => item.username);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
exports.getUserMatches = async (req, res) => {
  try {
    const { userId } = req.body;
    const userMatches = await MatchesModel.findAll({
      where: {
        [Op.or]: [{ user1: userId }, { user2: userId }],
        tournoiId: req.body.tournoiId,
      },
    });

    res.json(userMatches);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des matchs de l'utilisateur.",
    });
  }
};

exports.updateBracketDel = async (req, res) => {
  //Suprime un utilisateur dans le bracket
  try {
    delUser = await TournoiRolesModel.destroy({
      where: {
        [Op.and]: [
          { tournoiId: req.body.tournoiId },
          { userId: req.body.userId },
          { roleId: 4 },
        ],
      },
    });
    res.send("user bien supprimer");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
exports.searchOneUserBracket = async (req, res) => {
  //trouver l'utilisateur dans le bracket selon leur id
  try {
    const userBracketfind = await TournoiRolesModel.findOne({
      where: {
        tournoiId: req.body.tournoiId,
        userId: req.body.userId,
        roleId: 4,
      },
    });

    res.send(userBracketfind);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
//servira a randomiser les brackets
function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

exports.reportWinner = async (req, res) => {
  try {
    // Récupérer le numéro de match à mettre à jour et le gagnant depuis la requête
    const matchId = req.body.matchId;
    const winnerId = req.body.winnerId;

    // Vérifier si le match existe
    const matchToUpdate = await MatchesModel.findByPk(matchId);
    console.log(matchToUpdate);
    if (!matchToUpdate) {
      return res.status(404).json({ message: "Match introuvable." });
    }

    // Vérifier si le match n'a pas déjà de gagnant signalé
    if (matchToUpdate.winner !== null) {
      return res
        .status(400)
        .json({ message: "Un vainqueur a déjà été signalé pour ce match." });
    }

    // Vérifier qu'il y a bien deux joueurs dans le match
    if (!matchToUpdate.user1 || !matchToUpdate.user2) {
      return res.status(400).json({
        message:
          "Impossible de signaler un vainqueur : le match n'a pas deux joueurs.",
      });
    }

    // Signaler le vainqueur (sans valider automatiquement le bracket)
    matchToUpdate.winner = winnerId;
    matchToUpdate.status = "reported";
    await matchToUpdate.save();

    console.log(
      `Vainqueur signalé par un joueur: ${winnerId} pour le match ${matchId}`
    );

    res.status(200).json({
      message:
        "Vainqueur signalé avec succès. En attente de validation par l'administrateur.",
    });
  } catch (error) {
    console.error(
      `Erreur lors de la signalisation du gagnant : ${error.message}`
    );
    res.status(500).json({
      message: "Une erreur s'est produite lors de la signalisation du gagnant.",
    });
  }
};
exports.updateMatch = async (req, res) => {
  try {
    // Récupére le numéro de tournoi, le numéro de match à mettre à jour et le gagnant depuis la requête
    const matchId = req.body.matchId;
    const winnerId = req.body.winnerId;

    // Vérifie si le match existe
    const matchToUpdate = await MatchesModel.findByPk(matchId);

    if (!matchToUpdate) {
      return res.status(404).json({ message: "Match introuvable." });
    }
    const ancienWinner = matchToUpdate.winner;
    // Valider le gagnant du match
    matchToUpdate.winner = winnerId;
    matchToUpdate.status = "validated";
    await matchToUpdate.save();

    // Vérifie s'il y a un match suivant pour ce tour
    const nextMatch = await MatchesModel.findOne({
      where: {
        numMatch: Math.ceil(matchToUpdate.numMatch / 2),
        Round: matchToUpdate.Round + 1,
        tournoiId: matchToUpdate.tournoiId,
      },
    });

    if (nextMatch) {
      console.log(
        `Match suivant trouvé: Round ${nextMatch.Round}, Match ${nextMatch.numMatch}`
      );
      console.log(`Vainqueur actuel: ${winnerId}`);

      // Mettez à jour le match suivant avec le gagnant
      if (!nextMatch.user1) {
        nextMatch.user1 = winnerId;
        console.log(`user1 mis à jour avec: ${winnerId}`);
      } else if (!nextMatch.user2) {
        nextMatch.user2 = winnerId;
        console.log(`user2 mis à jour avec: ${winnerId}`);
      } else {
        // Si les deux slots sont occupés, remplacer celui qui correspond à l'ancien gagnant
        if (nextMatch.user1 === ancienWinner) {
          nextMatch.user1 = winnerId;
          console.log(`user1 remplacé avec: ${winnerId}`);
        } else if (nextMatch.user2 === ancienWinner) {
          nextMatch.user2 = winnerId;
          console.log(`user2 remplacé avec: ${winnerId}`);
        }
      }

      await nextMatch.save();
      console.log(
        `Match suivant mis à jour: user1=${nextMatch.user1}, user2=${nextMatch.user2}`
      );
    } else {
      console.log(
        "Aucun match suivant trouvé - le tournoi est peut-être terminé"
      );
    }

    res.status(200).json({ message: "Match mis à jour avec succès." });
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du match : ${error.message}`);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du match.",
    });
  }
};

exports.cancelWinner = async (req, res) => {
  try {
    const matchId = req.body.matchId;

    // Vérifie si le match existe
    const matchToCancel = await MatchesModel.findByPk(matchId);

    if (!matchToCancel) {
      return res.status(404).json({ message: "Match introuvable." });
    }

    const ancienWinner = matchToCancel.winner;

    // Annuler le vainqueur du match
    matchToCancel.winner = null;
    matchToCancel.status = "pending"; // Remettre en attente
    await matchToCancel.save();

    // Si ce match avait un vainqueur, le retirer du match suivant
    if (ancienWinner) {
      const nextMatch = await MatchesModel.findOne({
        where: {
          numMatch: Math.ceil(matchToCancel.numMatch / 2),
          Round: matchToCancel.Round + 1,
          tournoiId: matchToCancel.tournoiId,
        },
      });

      if (nextMatch) {
        console.log(`Retrait du vainqueur ${ancienWinner} du match suivant`);

        // Retirer le joueur du match suivant
        if (nextMatch.user1 === ancienWinner) {
          nextMatch.user1 = null;
          console.log(`user1 retiré du match suivant`);
        } else if (nextMatch.user2 === ancienWinner) {
          nextMatch.user2 = null;
          console.log(`user2 retiré du match suivant`);
        }

        await nextMatch.save();
        console.log(
          `Match suivant mis à jour: user1=${nextMatch.user1}, user2=${nextMatch.user2}`
        );
      }
    }

    res.status(200).json({ message: "Vainqueur annulé avec succès." });
  } catch (error) {
    console.error(
      `Erreur lors de l'annulation du vainqueur : ${error.message}`
    );
    res.status(500).json({
      message: "Une erreur s'est produite lors de l'annulation du vainqueur.",
    });
  }
};
exports.generateBracket = async (req, res) => {
  try {
    // Vérifier si le tournoi existe et s'il n'est pas déjà lancé
    const tournoi = await TournoisModel.findByPk(req.body.tournoiId);
    if (!tournoi) {
      return res.status(404).json({
        message: "Tournoi non trouvé.",
      });
    }

    if (tournoi.status === "lancé") {
      return res.status(400).json({
        message: "Ce tournoi a déjà été lancé.",
      });
    }

    const participants = await TournoiRolesModel.findAll({
      where: {
        tournoiId: req.body.tournoiId,
        roleId: JOUEUR_ROLE_ID,
      },
    });

    if (!Array.isArray(participants) || participants.length < 2) {
      return res.status(400).json({
        message:
          "Le tournoi doit avoir au moins 2 participants pour être lancé.",
      });
    }

    const numberOfParticipants = participants.length;
    // Calculez le nombre de rounds nécessaires (exemple numberOfParticipants=8  2x2x2=8 donc number of rounds =3 )
    const numberOfRounds = Math.ceil(Math.log2(numberOfParticipants));

    // Vérifie que le nombre de participants est une puissance de 2
    if (numberOfParticipants !== Math.pow(2, numberOfRounds)) {
      return res.status(400).json({
        message: `Le nombre de participants (${numberOfParticipants}) doit être une puissance de 2 (4, 8, 16, 32, 64).`,
      });
    }

    const shuffledAllPlayers = shuffle(participants);
    const tournoiId = shuffledAllPlayers[0].tournoiId;

    for (let round = 1; round <= numberOfRounds; round++) {
      // utilise le nombre de joueur total divisé par 2^le round pour le nombre de match du round
      const numberOfMatches = numberOfParticipants / Math.pow(2, round);

      for (let match = 1; match <= numberOfMatches; match++) {
        if (round === 1) {
          const player1 = shuffledAllPlayers.shift();
          const player2 = shuffledAllPlayers.shift();
          const user1Data = await UserModel.findByPk(player1.userId);
          const user2Data = await UserModel.findByPk(player2.userId);

          // Si les deux joueurs sont définis, créez le match avec les joueurs réels
          await MatchesModel.create({
            numMatch: match,
            Round: round,
            user1: user1Data.username,
            user2: user2Data.username,
            winner: null,
            status: "pending",
            tournoiId: tournoiId,
          });
        } else {
          await MatchesModel.create({
            numMatch: match,
            Round: round,
            user1: null,
            user2: null,
            winner: null,
            status: "pending",
            tournoiId: tournoiId,
          });
        }
      }
    }

    await TournoisModel.update(
      { status: "lancé" }, // Mettez à jour le statut ici
      {
        where: {
          id: tournoiId,
        },
      }
    );

    res.status(200).json({
      message: "Tournoi lancé avec succès !",
      tournoi: {
        id: tournoi.id,
        status: "lancé",
      },
    });
  } catch (error) {
    console.error(`Erreur lors de la génération du bracket : ${error.message}`);
    res.status(500).json({
      message:
        error.message ||
        "Une erreur est survenue lors du lancement du tournoi.",
    });
  }
};

module.exports.getAllMatches = async (req, res) => {
  try {
    const matches = await MatchesModel.findAll({
      where: { tournoiId: req.body.tournoiId },
    });
    res.status(200).json(matches);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

// exports.deleteUserFromBracket = async (req, res) => {
//   try {
//     const { tournoiId, userId } = req.body;

//     // Supprime l'utilisateur du bracket en fonction de l'ID du tournoi et de l'ID de l'utilisateur
//     const result = await UserTournoiModel.destroy({
//       where: {
//         tournoiId: tournoiId,
//         userId: userId,
//       },
//     });

//     if (result === 1) {
//       res.status(200).json({ message: "L'utilisateur a été supprimé du bracket avec succès." });
//     } else {
//       res.status(404).json({ message: "L'utilisateur n'a pas été trouvé dans le bracket." });
//     }
//   } catch (error) {
//     console.error(`Erreur lors de la suppression de l'utilisateur du bracket : ${error.message}`);
//     res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'utilisateur du bracket." });
//   }
// };
