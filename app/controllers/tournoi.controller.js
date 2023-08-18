const db = require("../models");
const TournoiModel = db.listetournoi;

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
  

  exports.tournoiCrée = async (req, res) => {
    try {
      // Vérification si l'utilisateur a déjà créé un tournoi
      const existingTournoi = await TournoiModel.findOne({
        where: { userId: req.body.userId },
      });
  
      if (existingTournoi) {
        return res.status(200).json({ message: "User has already created a tournament." });
      }
  
      // Création du tournoi et attribution à l'utilisateur
      const TournoiCreate = await TournoiModel.create({
        title: req.body.title,
        information: req.body.information,
        horaire: req.body.horaire,
        nJoueur: req.body.nJoueur,
        prix: req.body.prix,
        contact: req.body.contact,
        regle: req.body.regle,
        listejeuId: req.body.listejeuId,
        userId: req.body.userId, // Attribution à l'utilisateur connecté
      });
  
      res.send({
        id: TournoiCreate.id,
        title: req.body.title,
        information: req.body.information,
        horaire: req.body.horaire,
        prix: req.body.prix,
        contact: req.body.contact,
        regle: req.body.regle,
        listejeuId: req.body.listejeuId,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err });
    }
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