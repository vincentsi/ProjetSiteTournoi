const db = require("../models");
const { Op } = require("sequelize");
const TournoisModel = db.listetournoi;
const UserModel = db.user;
// const TournoisModel = db.listetournoi;
const UserTournoiModel = db.user_tournoi;
const MatchesModel = db.matches;

exports.updateBracket = async (req, res) => {
  // Save User  bracket to Database

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
exports.searchOneUserBracket = async (req, res) => {
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

// exports.bracketRandomiser = async (req, res) => {
//   try {
//     userBracketfind = await UserTournoiModel.findAll({
//       where: {
//         tournoiId: req.body.tournoiId,
//       },
//     });
//     console.log(userBracketfind.length);
//     userBracketfind = shuffle(userBracketfind);
//     tournoiid = userBracketfind[0].tournoiId;
//     let j = 0;
//     let createMatch = [];
//     for (let i = 0; i < userBracketfind.length; i += 2) {
//       // console.log(userBracketfind[i + 1].userId)
//       if (userBracketfind[i + 1].userId != undefined) {
//         createMatch = await MatchesModel.create({
//           // nextMatchid:createMatch[i].id,
//           user1: userBracketfind[i].userId,
//           user2: userBracketfind[i + 1].userId,
//           tournoiId: tournoiid,
//         });
//       } 
//       j += 1;
//       // let createNextMatch = []
//       // console.log(createMatch.id-1);
//       if (j % 2 == 0) {
//         const createNextMatch = await MatchesModel.create({
//           tournoiId: tournoiid,
//         });
//         const updateMatchBracket = await MatchesModel.update(
//           { nextMatchId: createNextMatch.id },
//           {
//             where: {
//               [Op.or]: [{ id: createMatch.id - 1 }, { id: createMatch.id }],
//             },
//           }
//         );
//       }
//       if (j % 4 == 0) {
//         const createNextMatchWinner = await MatchesModel.create({
//           tournoiId: tournoiid,
//         });
//         const updateNextMatchBracket = await MatchesModel.update(
//           { nextMatchId: createNextMatchWinner.id },
//           {
//             where: {
//               [Op.or]: [{ id: createMatch.id + 1 }, { id: createMatch.id - 2 }],
//             },
//           }
//         );
//       }
//       if (j % 8 == 0) {
//         // if(){}
//         const createNextMatchWinner = await MatchesModel.create({

//           tournoiId: tournoiid,
//           state: req.body.state,
//         });
//         const updateNextMatchBracket = await MatchesModel.update(
//           { nextMatchId: createNextMatchWinner.id },
//           {
//             where: {
//               [Op.or]: [{ id: createMatch.id + 2 }, { id: createMatch.id - 5 }],
//             },
//           }
//         );
//       }
//     }
//     res.status(200).json("test");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: err });
//   }
// };

module.exports.updateMatch = async (req, res) => {
  try {
    await MatchesModel.findByPk(req.body.id);

    if (MatchesModel != null) {
      MatchesModel.update(
        { winner: req.body.winner },
        { where: { id: req.body.id } }
      );
      res.status(200).send("updated successfully");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

exports.bracketRandomiser = async (req, res) => {
  try {
        userBracketfind = await UserTournoiModel.findAll({
              where: {
                tournoiId: req.body.tournoiId,
              },
            });
    const nbMaxPlayers = 8;
    let x=0;
    userBracketfind = shuffle(userBracketfind);
    tournoiid = userBracketfind[0].tournoiId;
    for (let i = 0; i < nbMaxPlayers-1 ; i += 1) {
              // console.log(userBracketfind[i].userId)
              // if (userBracketfind[i + 1].userId != undefined){
                x += 1;
                
                createMatch = await MatchesModel.create({
              
                tournoiId: tournoiid,
              });
            
          }

    res.status(200).json(userBracketfind);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
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
