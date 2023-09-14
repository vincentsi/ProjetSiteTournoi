const db = require("../models");
const { Op, where } = require("sequelize");
// const { round } = require("lodash");
// const { match } = require("assert");
const UserModel = db.user;
const TournoisModel = db.listetournoi;
const UserTournoiModel = db.user_tournoi;
const MatchesModel = db.matches;
exports.affParticipant = async (req, res) => {
  try {
    const addAllUser = await UserTournoiModel.findAll({
      where: { tournoiId: req.body.tournoiId }
    });


    const userIds = addAllUser.map((item) => item.userId);
    
    const users = await UserModel.findAll({
      where: { id: userIds }, 
      attributes: ['id', 'username'] 
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
        [Op.or]: [
          { user1: userId },
          { user2: userId }
        ],
        tournoiId: req.body.tournoiId
      }
    });

    res.json(userMatches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des matchs de l'utilisateur." });
  }
};

exports.updateBracket = async (req, res) => {
  //Ajoute un utilisateur dans le bracket
  try {
    addUser = await UserTournoiModel.create({
      tournoiId: req.body.tournoiId,
      userId: req.body.userId,
    });
    res.send(addUser);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
exports.updateBracketDel = async (req, res) => {
  //Suprime un utilisateur dans le bracket
  try {
    delUser = await UserTournoiModel.destroy({
        where: {
          [Op.and]: [{  tournoiId: req.body.tournoiId}, { userId: req.body.userId}],
        },     
  })
    res.send("user bien supprimer");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
exports.searchOneUserBracket = async (req, res) => {
  //trouver l'utilisateur dans le bracket selon leur id
  try {
    const userBracketfind = await UserTournoiModel.findOne({
      where: {
        tournoiId: req.body.tournoiId,
        userId: req.body.userId,
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


exports.updateMatch = async (req, res) => {
  try {
    // Récupére le numéro de tournoi, le numéro de match à mettre à jour et le gagnant depuis la requête
    const tournoiId = req.body.tournoiId;
    const matchId = req.body.matchId; 
    const winnerId = req.body.winnerId;

    // Vérifie si le match existe
    const matchToUpdate = await MatchesModel.findByPk(matchId);
    console.log(matchToUpdate.numMatch)
    if (!matchToUpdate) {
      return res.status(404).json({ message: "Match introuvable." });
    }

    // Vérifie si le match n'a pas déjà de gagnant
    if (matchToUpdate.winner !== null) {
      return res.status(400).json({ message: "Ce match a déjà un gagnant." });
    }
    console.log(matchToUpdate.numMatch)
    console.log(matchToUpdate.Round + 1)
    // Met à jour le gagnant du match
    matchToUpdate.winner = winnerId;
    await matchToUpdate.save();

    // Vérifie s'il y a un match suivant pour ce tour
    const nextMatch = await MatchesModel.findOne({
      where: {
        tournoiId: tournoiId,
        numMatch: Math.ceil(matchToUpdate.numMatch / 2), 
        Round: matchToUpdate.Round + 1, 
      },
    });

    if (nextMatch) {
      // Mettez à jour le match suivant avec le gagnant
      if (!nextMatch.user1) {
        nextMatch.user1 = winnerId;
      } else if (!nextMatch.user2) {
        nextMatch.user2 = winnerId;
      }

      await nextMatch.save();
    }

    res.status(200).json({ message: "Match mis à jour avec succès." });
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du match : ${error.message}`);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du match." });
  }
};

// exports.fetchBracket = async (req, res) => {
//   try {
//     const { tournoiId } = req.body;
//     const matches = await MatchesModel.findAll({
//       where: { tournoiId: tournoiId },
//       include: [{ model: UserModel, as: 'user1' }, { model: UserModel, as: 'user2' }],
//     });

//     const formattedMatches = matches.map((match) => ({
//       id: match.id,
//       user1: match.user1 ? match.user1.username : '',
//       user2: match.user2 ? match.user2.username : '',
//       winner: match.winner,
//       round: match.Round,
//     }));

//     res.status(200).json({ matchList: formattedMatches });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.generateBracket = async (req, res) => {
  try {
    const participants = await UserTournoiModel.findAll({
      where: {
        tournoiId: req.body.tournoiId,
      },
    });

    if (!Array.isArray(participants) || participants.length < 2) {
      throw new Error('La liste des participants est invalide.');
    }

    const numberOfRounds = Math.ceil(Math.log2(participants.length));
    const shuffledPlayers = shuffle(participants);
    const tournoiId = shuffledPlayers[0].tournoiId;

    for (let round = 1; round <= numberOfRounds; round++) {
      console.log(`Round ${round}`);
      
      // Créez une copie du tableau shuffledPlayers au début de chaque tour
      const currentRoundPlayers = [...shuffledPlayers];
      console.log(`Nombre de participants : ${currentRoundPlayers.length}`);
    
      const numberOfMatches = currentRoundPlayers.length / Math.pow(2, round);
      console.log(`Nombre de matches dans ce round : ${numberOfMatches}`);
    
      for (let match = 1; match <= numberOfMatches; match++) {
        const player1 = currentRoundPlayers.shift();
        const player2 = currentRoundPlayers.shift();
    
        if (round === 1 ) {
          // Si les deux joueurs sont définis, créez le match avec les joueurs réels
          await MatchesModel.create({
            numMatch: match,
            Round: round,
            user1: player1.userId,
            user2: player2.userId,
            winner: null,
            tournoiId: tournoiId,
          });
        } else {
           await MatchesModel.create({
            numMatch: match,
            Round: round,
            user1: null,
            user2: null,
            winner: null,
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
    res.status(200).json("tournois crée");
  } catch (error) {
    console.error(`Erreur lors de la génération du bracket : ${error.message}`);
    return null;
  }
}


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
