const db = require("../models");
const { Op, where } = require("sequelize");
// const { round } = require("lodash");
// const { match } = require("assert");
const UserModel = db.user;
// const TournoisModel = db.listetournoi;
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


module.exports.updateMatch = async (req, res) => {
  //update des matchs du bracket pour le winner 
  try {
    //recuperation du winner 
    const matchFini = await MatchesModel.findByPk(req.body.id);
    //update du match
    if (matchFini != null) {
      await matchFini.update(
        { winner: req.body.winner },
        { where: { id: req.body.id } }
      );
      //recuperation du prochain match pour le winner
         const matchUpdateWinner = await MatchesModel.findOne(
          { where: { numMatch: matchFini.nextMatch  } }
        );
        // envoie du winner dans son prochain match en verifiant que son adversaire  ne soit pas deja envoyé
        if (matchUpdateWinner.user1 == null || matchUpdateWinner.user1 == matchFini.winner) 
        {
          matchUpdateWinner.update(  
            { user1: req.body.winner },
 
          )
        }else{
          matchUpdateWinner.update(
            { user2: req.body.winner },

            )
        }
     
      res.status(200).send(matchUpdateWinner);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
exports.fetchBracket = async (req, res) => {
  try {
    const { tournoiId } = req.body;
    const matches = await MatchesModel.findAll({
      where: { tournoiId: tournoiId },
      include: [{ model: UserModel, as: 'user1' }, { model: UserModel, as: 'user2' }],
    });

    const formattedMatches = matches.map((match) => ({
      id: match.id,
      user1: match.user1 ? match.user1.username : '',
      user2: match.user2 ? match.user2.username : '',
      winner: match.winner,
      round: match.Round,
    }));

    res.status(200).json({ matchList: formattedMatches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.bracketRandomiser = async (req, res) => {
  try {
    const userBracketfind = await UserTournoiModel.findAll({
      where: {
        tournoiId: req.body.tournoiId,
      },
    });

    const nbMaxPlayers = 8;
    let x = 0; // pour les numMatch
    let j = 1; // pour les rounds
    let y = nbMaxPlayers / 2; // pour les nextMatch

    const shuffledPlayers = shuffle(userBracketfind);
    const tournoiId = shuffledPlayers[0].tournoiId;

    // Création des matchs avec les utilisateurs inscrits
    for (let i = 0; i < nbMaxPlayers - 1; i += 2) {
      x += 1;
      if (i % 4 === 0) y += 1; // Changement de nextMatch tous les 2 matchs

      await MatchesModel.create({
        Round: 1,
        numMatch: x,
        nextMatch: y,
        user1: shuffledPlayers[i].userId,
        user2: shuffledPlayers[i + 1].userId,
        tournoiId: tournoiId,
      });
    }

    let nRound;
  

    // Création des matchs pour les winners selon le nombre de matchs
    do {
      nRound = await MatchesModel.count({
        where: {
          [Op.and]: [{ Round: j }, { tournoiId: tournoiId }],
        },
      });
      j++;

      for (let i = 0; i < nRound; i += 2) {
        if (i % 4 === 0) y += 1;
        if (nRound <= 2) y = "Final"; // Attribuer "Final" au dernier match

        x += 1;
        await MatchesModel.create({
          Round: j,
          numMatch: x,
          nextMatch: y,
          tournoiId: tournoiId,
        });
      }
    } while (nRound > 2);

    res.status(200).json(userBracketfind);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

// exports.bracketRandomiser = async (req, res) => {
//   //randomisation du bracket selon le nombre de joueur 
//   try {
//     userBracketfind = await UserTournoiModel.findAll({
//       where: {
//         tournoiId: req.body.tournoiId,
//       },
//     });
//     const nbMaxPlayers = 8;
//     // x pour les numMatch
//     let x = 0;
//     // j  pour les rounds
//     let j = 1;
//     // y  pour les nextMatch
//     let y = nbMaxPlayers/2;
//     userBracketfind = shuffle(userBracketfind);
//     tournoiid = userBracketfind[0].tournoiId;
//     //creation des matchs avec utilisateur inscrit
//     for (let i = 0; i < nbMaxPlayers - 1; i += 2) {
//         x += 1;
//         //on change le prochain match attribue du match tout les 2 matchs
//         if(i%4==0) y += 1;

//         createMatch = await MatchesModel.create({
//           Round: 1,
//           numMatch: x,
//           nextMatch:y,
//           user1: userBracketfind[i].userId,
//           user2: userBracketfind[i + 1].userId,
//           tournoiId: tournoiid,
//         });
//     }
//     let nRound =[] ;
//      //creation des matchs pour les winners selon le nombre de matchs 
//     do{
//      nRound = await MatchesModel.count({
//               where: {
//                 [Op.and]: [{ Round: j }, { tournoiId: tournoiid }],
//               },    
//     });
//     j++
   
//     for (let i = 0; i < nRound ; i += 2) { 
//       if(i%4==0) y += 1;
//       //on attribut final au denier match
//       if(nRound <= 2) y = "Final";
//         x += 1;
//         createMatch = await MatchesModel.create({
//           Round: j,
//           numMatch: x,
//           nextMatch: y,
//           tournoiId: tournoiid,
//         });
//     }
//     console.log(nRound);
//   } while (nRound > 2);

//     res.status(200).json(userBracketfind);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: err });
//   }
// };


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
