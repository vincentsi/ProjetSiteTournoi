const db = require("../models");
const JeuModel = db.listejeu;

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
          description: id.description,
          createdAt: id.createdAt,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };

  module.exports.getAlljeux = async (req, res) => {
    const jeux = await JeuModel.findAll({
    });
    res.status(200).json(jeux);
  };

  exports.jeuuptest = (req, res) => {
    // Save User to Database
    JeuModel.create({
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      picture:  req.body.picture,
    })
    if (JeuModel){res.send({ message: "game registered successfully!" });
    } else {res.send({ message: "error" });}

  };
//   INSERT INTO listejeus (name, title, picture, description)VALUES ('league of legend', 'league of legend','./uploads/img/imagejeux.jpg','jeu de strategie')
