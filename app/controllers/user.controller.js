const db = require("../models");
const UserModel = db.user;
const UserRankModel = db.user_rank;
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

  try {
    addRank = await UserRankModel.create({
      rankId: req.body.rankId,
      userId: req.body.userId,
    });
    res.send(addRank);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

module.exports.infoRankUser = async (req, res) => {

  try {
    infoRank = await UserRankModel.findAll({
      userId: req.body.userId,
    });
    res.send(infoRank);
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
