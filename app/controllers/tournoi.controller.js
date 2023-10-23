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
    const tournois = await TournoiModel.findAll({
    });
    res.status(200).json(tournois);
  };
  


  module.exports.updateTournament = async (req, res) => {

    try{
      await TournoiModel.findByPk(req.params.id)
      
          if (TournoiModel != null) {
            TournoiModel.update(
              { title: req.body.title,
                information: req.body.information,
                horaire: req.body.horaire,
                nJoueur: req.body.nJoueur,
                prix: req.body.prix,
                platforme: req.body.platforme,
                contact: req.body.contact,
                regle: req.body.regle }, 
              { where: { id: req.params.id } }
              );   
              res.status(200).send("updated successfully");
              }    
          } catch (err) {
            console.log(err)
            res.status(500).send({ message: err });
      }
    }
    exports.tournoiCrée = async (req, res) => {
      try {
        const { userId } = req.body;
    
        
        const existingAdminTournoi = await TournoiRolesModel.findOne({
          where: {
            userId: userId,
            roleId: 6 //organisateurTournoi
          },
        });
    
        if (existingAdminTournoi) {
          return res.status(400).json({ message: "Vous etez deja organisateur d'un tournoi" });
        }
    
    
        const tournoi = await TournoiModel.create({
          title: req.body.title,
          information: req.body.information,
          horaire: req.body.horaire,
          nJoueur: req.body.nJoueur,
          prix: req.body.prix,
          contact: req.body.contact,
          platforme: req.body.platforme,
          regle: req.body.regle,
          listejeuId: req.body.listejeuId,
        });
   
        const tournoiRole = await TournoiRolesModel.create({
          userId: userId,
          tournoiId: tournoi.id, 
          roleId: 6 , //organisateurTournoi
        });
    
      
        tournoiRole.tournoiId = tournoi.id;
        await tournoiRole.save();
    
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
        res.status(500).send({ message: err });
      }
    };