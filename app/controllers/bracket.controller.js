const db = require("../models");
const { Op } = require("sequelize");
const BracketModel = db.bracket;
const UserModel = db.user;
const TournoisModel = db.listetournoi;
const UserBracketModel = db.user_brackets;
const MatchesModel = db.matches;
exports.createBracket = (req, res) => {
  // Save User to Database
  BracketModel.create({
    participant: req.body.participant,
    dateDebut: req.body.dateDebut,
    nbMaxJoueurs: req.body.nbMaxJoueurs,
    listetournoiId: req.body.listetournoiId,
  });
  if (BracketModel) {
    res.send({ message: "bracket registered successfully!" });
  } else {
    res.send({ message: "erroor" });
  }
};

exports.updateBracket = async (req, res) => {
  // Save User  bracket to Database

  try {
    await UserBracketModel.create({
      bracketId: req.body.bracketId,
      userId: req.body.userId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
exports.searchOneUserBracket = async (req, res) => {
  try {
    const userBracketfind = await UserBracketModel.findOne({
      where: {
        bracketId: req.body.bracketId,
        userId: req.body.userId,
      },
    });

    res.send(userBracketfind);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
exports.searchBracket = async (req, res) => {
  try {
    const bracketfind = await BracketModel.findOne({
      where: {
        listetournoiId: req.body.listetournoiId,
      },
    });
    res.send(bracketfind);
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



exports.bracketRandomiser = async (req, res) => {
  try {
    userBracketfind = await UserBracketModel.findAll({
      where: {
        bracketId: req.body.bracketId,
      },
    });
    console.log(userBracketfind.length)
    userBracketfind = shuffle(userBracketfind);
    bracketid = userBracketfind[0].bracketId;
    let j = 0
  
    for (let i = 0; i < userBracketfind.length - 1; i += 2) {
      const createMatch = await MatchesModel.create({
        // nextMatchid:createMatch[i].id,
        user1: userBracketfind[i].userId,
        user2: userBracketfind[i + 1].userId,
        bracketId: bracketid,
        state: req.body.state,
      });
      
      j += 1
      // console.log(createMatch.id-1);
      if (j % 2 == 0) {
        const createNextMatch = await MatchesModel.create({
          // nextMatchid:createMatch[i].id,
          // user1: userBracketfind[i].userId,
          // user2: userBracketfind[i + 1].userId,
          bracketId: bracketid,
          state: req.body.state,
        });
        const updateMatchBracket = await MatchesModel.update(
        { nextMatchId: createNextMatch.id  },
        { where: {[Op.or]: [{id: createMatch.id-1}, {id: createMatch.id}] } }
        );
        
      }
      if (j % 4 == 0) {
        const createNextMatchWinner = await MatchesModel.create({
          // nextMatchid:createMatch[i].id,
          // user1: userBracketfind[i].userId,
          // user2: userBracketfind[i + 1].userId,
          bracketId: bracketid,
          state: req.body.state,
        });
        const updateNextMatchBracket = await MatchesModel.update(
        { nextMatchId: createNextMatchWinner.id  },
        { where: {[Op.or]: [{id: createMatch.id+1}, {id: createMatch.id-2}] } }
        );
      }
     
      if (j % 8 == 0) {
        // if(){}
        const createNextMatchWinner = await MatchesModel.create({
          // nextMatchid:createMatch[i].id,
          // user1: userBracketfind[i].userId,
          // user2: userBracketfind[i + 1].userId,
          bracketId: bracketid,
          state: req.body.state,
        });
        const updateNextMatchBracket = await MatchesModel.update(
        { nextMatchId: createNextMatchWinner.id  },
        { where: {[Op.or]: [{id: createMatch.id+2}, {id: createMatch.id-5}] } }
        );
      }

    }

    res.status(200).json(userBracketfind);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

module.exports.updateMatch = async (req, res) => {
  try {
    await MatchesModel.findByPk(req.body.id);

    if (MatchesModel != null) {
      MatchesModel.update(
        { winner: req.body.winner, loser: req.body.loser },
        { where: { id: req.body.id } }
      );
      res.status(200).send("updated successfully");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};



