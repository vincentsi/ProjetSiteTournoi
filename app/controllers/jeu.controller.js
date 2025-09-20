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
  try {
    let picturePath = "/img/imagejeux/test.jpg"; // Image par défaut

    // Si une image a été uploadée
    if (req.file) {
      picturePath = req.file.path; // Cloudinary retourne le path complet
    }

    const jeu = await JeuModel.create({
      name: req.body.title.toLowerCase().replace(/\s+/g, "-"), // Générer le nom à partir du titre
      title: req.body.title,
      genres: req.body.genres,
      description: req.body.description,
      picture: picturePath,
    });

    res.status(200).send(jeu);
  } catch (error) {
    console.error("Erreur lors de la création du jeu:", error);

    // Gestion des erreurs spécifiques
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors
        .map((err) => err.message)
        .join(", ");
      return res.status(400).send({
        message: `Erreur de validation: ${validationErrors}`,
        errors: error.errors,
      });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).send({
        message: "Un jeu avec ce nom existe déjà",
        error: "DUPLICATE_NAME",
      });
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).send({
        message: "Le fichier image est trop volumineux (max 5MB)",
        error: "FILE_TOO_LARGE",
      });
    }

    if (error.message === "Seules les images sont autorisées!") {
      return res.status(400).send({
        message: "Seules les images sont autorisées",
        error: "INVALID_FILE_TYPE",
      });
    }

    // Erreur générique
    res.status(500).send({
      message: "Erreur interne du serveur lors de la création du jeu",
      error: "INTERNAL_ERROR",
    });
  }
};

module.exports.updateJeu = async (req, res) => {
  try {
    const jeu = await JeuModel.findByPk(req.params.id);

    if (!jeu) {
      return res.status(404).send({ message: "Jeu non trouvé" });
    }

    // Préparer les données à mettre à jour
    const updateData = {
      name: req.body.name,
      title: req.body.title,
      genres: req.body.genres,
      description: req.body.description,
    };

    // Si une nouvelle image est uploadée, l'ajouter
    if (req.file) {
      updateData.picture = req.file.path; // Cloudinary retourne le path complet
    }

    await JeuModel.update(updateData, { where: { id: req.params.id } });

    // Récupérer le jeu mis à jour pour le retourner
    const updatedJeu = await JeuModel.findByPk(req.params.id);
    res.status(200).send(updatedJeu);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
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
