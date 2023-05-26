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

  exports.tournoiUpTest = async (req, res) => {
    try{
     const TournoiCreate= await TournoiModel.create({
      title: req.body.title,
      information: req.body.information,
      horaire: req.body.horaire,
      prix: req.body.prix,
      contact: req.body.contact,
      regle: req.body.regle,
      listejeuId: req.body.listejeuId,
    })  ;
    res.send({ 
      id:TournoiCreate.id,
      title: req.body.title,
      information: req.body.information,
      horaire: req.body.horaire,
      prix: req.body.prix,
      contact: req.body.contact,
      regle: req.body.regle,
      listejeuId: req.body.listejeuId,
     });
          } catch (err) {
            console.log(err)
            res.status(500).send({ message: err });
      }
    }

  


