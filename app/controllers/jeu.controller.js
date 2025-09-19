const db = require("../models");
const JeuModel = db.listejeu;
const ListeRankModel = db.listerank;
const JeuRankModel = db.jeu_rank;
//recherche les informations de un jeu avec son id dans url
module.exports.jeuInfo = (req, res) => {
  JeuModel.findOne({
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
        name: id.name,
        title: id.title,
        picture: id.picture,
        genres: id.genres,
        description: id.description,
        createdAt: id.createdAt,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//recherche les informations de un jeu avec son nom
module.exports.jeuInfo2 = (req, res) => {
  JeuModel.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((id) => {
      if (!id) {
        return res.status(200).send({ errorsid: "id Not found." });
      }
      res.status(200).send({
        id: id.id,
        name: id.name,
        title: id.title,
        picture: id.picture,
        genres: id.genres,
        description: id.description,
        createdAt: id.createdAt,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//recherche les informations de tout les jeux
module.exports.getAlljeux = async (req, res) => {
  const jeux = await JeuModel.findAll({});
  res.status(200).json(jeux);
};

// crée un jeu
exports.jeuCrée = async (req, res) => {
  const jeu = await JeuModel.create({
    name: req.body.name,
    title: req.body.title,
    genres: req.body.genres,
    description: req.body.description,
    picture: req.body.picture,
  });
  if (JeuModel) {
    res.status(200).send(jeu);
  } else {
    res.send({ message: "error" });
  }
};

module.exports.updateJeu = async (req, res) => {
  try {
    await JeuModel.findByPk(req.params.id);

    if (JeuModel != null) {
      JeuModel.update(
        {
          name: req.body.name,
          title: req.body.title,
          genres: req.body.genres,
          description: req.body.description,
        },
        { where: { id: req.params.id } }
      );
      res.status(200).send("updated successfully");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

module.exports.deleteJeu = async (req, res) => {
  JeuModel.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((email) => {
      if (!email) {
        return res.status(200).send({ errorsid: "jeu Not found." });
      }
      res.status(200).send({ jeu: "jeu delete." });
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.addJeuRank = async (req, res) => {
  try {
    // Créer une association entre un jeu et un rang
    await JeuRankModel.create({
      jeuId: req.body.jeuId,
      rankId: req.body.rankId,
    });
    res.status(200).send("Association jeu-rang créée avec succès");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

module.exports.jeuRankInfo = async (req, res) => {
  try {
    // Récupérer les rangs associés à un jeu via la table de liaison
    const jeuRanks = await JeuRankModel.findAll({
      where: { jeuId: req.body.jeuId },
      include: [
        {
          model: ListeRankModel,
          as: "listerank",
          required: true,
        },
      ],
    });

    // Créez un tableau d'objets avec les propriétés ID et nom
    const rankInfo = jeuRanks.map((jeuRank) => {
      return {
        id: jeuRank.listerank.id,
        name: jeuRank.listerank.name,
      };
    });

    res.status(200).send(rankInfo);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
