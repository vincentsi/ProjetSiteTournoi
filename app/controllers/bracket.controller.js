const db = require("../models");
const { Op } = require("sequelize");
const matchesModel = require("../models/matches.model");
const { round } = require("lodash");
const { match } = require("assert");
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


module.exports.updateMatch = async (req, res) => {
  try {
    const matchFini = await MatchesModel.findByPk(req.body.id);
    // const numMatchMax = await MatchesModel.max('nMatch',{ where: { Round: matchFini.Round } });
 
    if (matchFini != null) {
      await matchFini.update(
        { winner: req.body.winner },
        { where: { id: req.body.id } }
      );
         const matchUpdateWinner = await MatchesModel.findOne(
          // { user1: req.body.winner },
          { where: { numMatch: matchFini.nextMatch  } }
        );
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

exports.bracketRandomiser = async (req, res) => {
  try {
    userBracketfind = await UserTournoiModel.findAll({
      where: {
        tournoiId: req.body.tournoiId,
      },
    });
    const nbMaxPlayers = 8;
    // x pour les numMatch
    let x = 0;
    // j  pour les rounds
    let j = 1;
    // y  pour les nextMatch
    let y = nbMaxPlayers/2;
    userBracketfind = shuffle(userBracketfind);
    tournoiid = userBracketfind[0].tournoiId;
    for (let i = 0; i < nbMaxPlayers - 1; i += 2) {
        x += 1;
        if(i%4==0) y += 1;
        createMatch = await MatchesModel.create({
          Round: 1,
          numMatch: x,
          nextMatch:y,
          user1: userBracketfind[i].userId,
          user2: userBracketfind[i + 1].userId,
          tournoiId: tournoiid,
        });
    }
    let nRound =[] ;
    do{
     nRound = await MatchesModel.count({
              where: {
                [Op.and]: [{ Round: j }, { tournoiId: tournoiid }],
              },    
    });
    j++
   
    for (let i = 0; i < nRound ; i += 2) {
      if(i%4==0) y += 1;
      if(nRound <= 2) y = "Final";
        x += 1;
        createMatch = await MatchesModel.create({
          Round: j,
          numMatch: x,
          nextMatch: y,
          tournoiId: tournoiid,
        });
    }
    console.log(nRound);
  } while (nRound > 2);

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
