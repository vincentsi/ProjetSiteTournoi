const db = require("../models");
const UserModel = db.user;
const TournoiRolesModel = db.tournoiroles;
const TournoiModel = db.listetournoi;
const RoleModel = db.role;
module.exports.assignRoleTournoiAdminToUser = async (req, res) => {
  try {
    const { userId, tournoiId } = req.body;

    const roleAdminTournoiId = await RoleModel.findOne({
      where: { name: "adminTournoi" },
    });
    console.log(tournoiId);
    const tournoiRole = await TournoiRolesModel.create({
      userId: userId,
      tournoiId: tournoiId,
      roleId: roleAdminTournoiId.id,
    });

    console.log('Rôle "adminTournoi" attribué avec succès :', tournoiRole);
    return res.status(201).json({
      message: "Rôle 'adminTournoi' attribué avec succès.",
      tournoiRole,
    });
  } catch (error) {
    console.error(
      'Erreur lors de l\'attribution du rôle "adminTournoi" :',
      error
    );
    return res.status(500).json({
      message:
        "Une erreur s'est produite lors de l'attribution du rôle 'adminTournoi'.",
    });
  }
};
exports.addInscritBracket = async (req, res) => {
  try {
    const userId = req.body.userId;
    const tournoiId = req.body.tournoiId;

    // Vérifier si le tournoi existe
    const tournoi = await TournoiModel.findByPk(tournoiId);
    if (!tournoi) {
      return res.status(404).json({
        message: "Tournoi non trouvé.",
      });
    }

    // Vérifier si le tournoi est déjà lancé
    if (tournoi.status === "lancé") {
      return res.status(400).json({
        message:
          "Ce tournoi a déjà été lancé, vous ne pouvez plus vous inscrire.",
      });
    }

    // Vérifier si l'utilisateur est déjà inscrit
    const existingInscription = await TournoiRolesModel.findOne({
      where: {
        userId: userId,
        tournoiId: tournoiId,
        roleId: 4, //joueur
      },
    });

    if (existingInscription) {
      return res.status(400).json({
        message: "Vous êtes déjà inscrit à ce tournoi.",
      });
    }

    // Compter le nombre de participants actuels
    const currentParticipants = await TournoiRolesModel.count({
      where: {
        tournoiId: tournoiId,
        roleId: 4, //joueur
      },
    });

    // Vérifier si le tournoi est complet
    if (currentParticipants >= tournoi.nJoueur) {
      return res.status(400).json({
        message: `Ce tournoi est complet ! (${currentParticipants}/${tournoi.nJoueur} participants)`,
      });
    }

    const roleJoueurId = await RoleModel.findOne({ where: { name: "joueur" } });

    if (roleJoueurId) {
      const newRole = await TournoiRolesModel.create({
        userId: userId,
        tournoiId: tournoiId,
        roleId: roleJoueurId.id,
      });

      res.status(200).json({
        message:
          "Inscription réussie ! Vous êtes maintenant inscrit au tournoi.",
      });
    } else {
      res.status(404).json({ message: "Le rôle 'joueur' n'a pas été trouvé." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message || "Une erreur est survenue lors de l'inscription.",
    });
  }
};

exports.getOrganisateurTournoi = async (req, res) => {
  try {
    const tournoiId = req.params.tournoiId;

    const organizerRole = await TournoiRolesModel.findOne({
      where: {
        tournoiId: tournoiId,
        roleId: 3, //adminTournoi
      },
    });

    if (organizerRole) {
      const organizer = await UserModel.findByPk(organizerRole.userId);

      res.status(200).json(organizer);
    } else {
      res
        .status(404)
        .json({ message: "Organisateur introuvable pour ce tournoi." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération de l'organisateur du tournoi.",
    });
  }
};

module.exports.addAdminToTournament = async (req, res) => {
  try {
    const tournoiId = req.body.tournoiId;
    const username = req.body.username;

    // Recherchez l'utilisateur par son nom d'utilisateur
    const user = await UserModel.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      // L'utilisateur n'a pas été trouvé, renvoyez une réponse indiquant que l'utilisateur n'existe pas
      return res.status(400).send({ message: "L'utilisateur n'existe pas." });
    }

    // Vérifiez si l'utilisateur est déjà administrateur du tournoi
    const existingAdmin = await TournoiRolesModel.findOne({
      where: {
        userId: user.id,
        tournoiId: tournoiId,
        roleId: 3, //adminTournoi
      },
    });

    if (existingAdmin) {
      // L'utilisateur est déjà administrateur, renvoyez une réponse indiquant qu'il est déjà administrateur
      return res
        .status(400)
        .send({ message: "L'utilisateur est déjà administrateur du tournoi." });
    }

    // L'utilisateur n'est pas encore administrateur, ajoutez-le en tant qu'administrateur du tournoi
    await TournoiRolesModel.create({
      userId: user.id, // Utilisation de l'ID de l'utilisateur
      tournoiId: tournoiId,
      roleId: 3,
    });

    res.status(200).send({
      message: "L'utilisateur a été ajouté comme administrateur du tournoi.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Une erreur s'est produite lors de l'ajout de l'administrateur.",
    });
  }
};

exports.getAdminsTournoi = async (req, res) => {
  try {
    const tournoiId = req.params.tournoiId;

    const adminRoles = await TournoiRolesModel.findAll({
      where: {
        tournoiId: tournoiId,
        roleId: 3,
      },
    });

    if (adminRoles.length > 0) {
      const adminUserIds = adminRoles.map((adminRole) => adminRole.userId);

      const admins = await UserModel.findAll({
        where: {
          id: adminUserIds,
        },
      });

      res
        .status(200)
        .send({ message: "L'utilisateur est administrateur du tournoi." });
    } else {
      res
        .status(200)
        .json({ message: "Aucun administrateur trouvé pour ce tournoi." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération des administrateurs du tournoi.",
    });
  }
};
