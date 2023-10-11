const db = require("../models");
const UserModel = db.user;
const TournoiRolesModel = db.tournoiroles;
const TournoiModel = db.listetournoi;
const RoleModel = db.role;
module.exports.assignRoleTournoiAdminToUser = async (req, res) => {
    try {
      const { userId, tournoiId } = req.body;

      const roleAdminTournoiId = await RoleModel.findOne({
        where: { name: "adminTournoi" }, });
        console.log(tournoiId)
      const tournoiRole = await TournoiRolesModel.create({
        userId: userId,
        tournoiId: tournoiId,
        roleId: roleAdminTournoiId.id, 
      });
  
      console.log('Rôle "adminTournoi" attribué avec succès :', tournoiRole);
      return res.status(201).json({ message: "Rôle 'adminTournoi' attribué avec succès.", tournoiRole });
    } catch (error) {
      console.error('Erreur lors de l\'attribution du rôle "adminTournoi" :', error);
      return res.status(500).json({ message: "Une erreur s'est produite lors de l'attribution du rôle 'adminTournoi'." });
    }
  };
  exports.addInscritBracket = async (req, res) => {
    try {
      const userId = req.body.userId;
      const tournoiId = req.body.tournoiId;
  
      const roleJoueurId = await RoleModel.findOne({ where: { name: 'joueur' } });
  
      if (roleJoueurId) {
        const newRole = await TournoiRolesModel.create({
          userId: userId,
          tournoiId: tournoiId,
          roleId: roleJoueurId.id, 
        });
  
        res.status(200).send({ message: "Rôle de joueur attribué avec succès." });
      } else {
        res.status(404).send({ message: "Le rôle 'joueur' n'a pas été trouvé." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err });
    }
  };
  
 

exports.getOrganisateurTournoi = async (req, res) => {
    try {
      const tournoiId = req.params.tournoiId; 
  
  
      const organizerRole = await TournoiRolesModel.findOne({
        where: {
          tournoiId: tournoiId,
          roleId: 6 
        }
      });
  
      if (organizerRole) {
       
        const organizer = await UserModel.findByPk(organizerRole.userId);
  
        res.status(200).json(organizer);
      } else {
        res.status(404).json({ message: "Organisateur introuvable pour ce tournoi." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'organisateur du tournoi." });
    }
};
