const jwt = require("jsonwebtoken");
const db = require("../models");
const UserModel = db.user;

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // res.cookies('jwt', '', { maxAge: 1});
        next();
      } else {
        const user = await UserModel.findByPk(decodedToken.id);
        res.locals.user = user.dataValues;

        console.log(res.locals.user);
        // console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
  console.log("check user");
};
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.error(err);
        res.status(401).json("invalid token");
      } else {
        console.log(decodedToken.id);
        const user = await UserModel.findByPk(decodedToken.id);
        res.locals.user = user.dataValues;
        next();
      }
    });
  } else {
    console.log("no token");
    res.status(401).json("no token");
  }
};
module.exports.tokenAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(403)
        .send({ message: "Token manquant - connectez-vous" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        return res
          .status(403)
          .send({ message: "Token invalide - reconnectez-vous" });
      }

      try {
        const user = await UserModel.findByPk(decodedToken.id);
        if (!user) {
          return res.status(403).send({ message: "Utilisateur non trouvé" });
        }

        const roles = await user.getRoles();
        const isAdmin = roles.some((role) => role.name === "admin");

        if (isAdmin) {
          res.locals.user = user.dataValues;
          next();
        } else {
          return res
            .status(403)
            .send({ message: "Rôle administrateur requis" });
        }
      } catch (dbError) {
        return res.status(500).send({
          message: "Erreur serveur lors de la vérification des rôles",
        });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: "Erreur interne du serveur" });
  }
};
