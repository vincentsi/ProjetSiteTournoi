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

  exports.tournoiUpTest = (req, res) => {
    // Save User to Database
    TournoiModel.create({
      name: req.body.name,
      description: req.body.description,
      listejeuId: req.body.listejeuId,
    })
    if (TournoiModel){res.send({ message: "game registered successfully!" });
    } else {res.send({ message: "erroor" });}

  };
//   INSERT INTO listejeus (name, title, picture, description)VALUES ('league of legend', 'league of legend','./uploads/img/imagejeux.jpg','jeu de strategie')
