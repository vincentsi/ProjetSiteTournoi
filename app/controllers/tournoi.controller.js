const db = require("../models");
const TournoiModel = db.listetournoi;
const TournoiRolesModel = db.tournoiroles;
module.exports.tournoiInfo = (req, res) => {
  TournoiModel.findOne({
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
        platforme: id.platforme,
        description: id.description,
        createdAt: id.createdAt,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.getAlltournois = async (req, res) => {
  const tournois = await TournoiModel.findAll({});
  res.status(200).json(tournois);
};

module.exports.updateTournament = async (req, res) => {
  try {
    await TournoiModel.findByPk(req.params.id);

    if (TournoiModel != null) {
      TournoiModel.update(
        {
          title: req.body.title,
          information: req.body.information,
          horaire: req.body.horaire,
          nJoueur: req.body.nJoueur,
          prix: req.body.prix,
          platforme: req.body.platforme,
          contact: req.body.contact,
          regle: req.body.regle,
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
exports.tournoiCrée = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validation des champs requis
    if (!req.body.title || !req.body.title.trim()) {
      return res.status(400).json({ message: "Le titre est requis" });
    }

    if (!req.body.information || !req.body.information.trim()) {
      return res.status(400).json({ message: "L'information est requise" });
    }

    if (!req.body.horaire || !req.body.horaire.trim()) {
      return res.status(400).json({ message: "L'horaire est requis" });
    }

    if (!req.body.prix || !req.body.prix.trim()) {
      return res.status(400).json({ message: "Le prix est requis" });
    }

    if (!req.body.contact || !req.body.contact.trim()) {
      return res.status(400).json({ message: "Le contact est requis" });
    }

    if (!req.body.regle || !req.body.regle.trim()) {
      return res.status(400).json({ message: "Les règles sont requises" });
    }

    if (!req.body.platforme || !req.body.platforme.trim()) {
      return res.status(400).json({ message: "La plateforme est requise" });
    }

    if (
      !req.body.nJoueur ||
      req.body.nJoueur === "" ||
      req.body.nJoueur === null
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez sélectionner le nombre de joueurs" });
    }

    const nJoueur = parseInt(req.body.nJoueur);
    if (isNaN(nJoueur) || nJoueur <= 0) {
      return res
        .status(400)
        .json({ message: "Le nombre de joueurs doit être un nombre positif" });
    }

    const existingAdminTournoi = await TournoiRolesModel.findOne({
      where: {
        userId: userId,
        roleId: 3, //adminTournoi
      },
    });

    if (existingAdminTournoi) {
      return res.status(400).json({
        message:
          "❌ Erreur : Vous ne pouvez organiser qu'un seul tournoi à la fois. Terminez votre tournoi actuel avant d'en créer un nouveau.",
      });
    }

    const tournoi = await TournoiModel.create({
      title: req.body.title,
      information: req.body.information,
      horaire: req.body.horaire,
      nJoueur: nJoueur,
      prix: req.body.prix,
      contact: req.body.contact,
      platforme: req.body.platforme,
      regle: req.body.regle,
      listejeuId: req.body.listejeuId,
    });

    await TournoiRolesModel.create({
      userId: userId,
      tournoiId: tournoi.id,
      roleId: 3, //adminTournoi
    });

    res.send({
      id: tournoi.id,
      title: req.body.title,
      information: req.body.information,
      horaire: req.body.horaire,
      prix: req.body.prix,
      platforme: req.body.platforme,
      contact: req.body.contact,
      regle: req.body.regle,
      listejeuId: req.body.listejeuId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Erreur lors de la création du tournoi",
    });
  }
};
