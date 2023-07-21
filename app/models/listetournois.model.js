module.exports = (sequelize, Sequelize) => {
    const listetournois = sequelize.define("listetournoi", {
      title: {
        type: Sequelize.STRING
      },
      information: {
        type: Sequelize.STRING
      },
      nJoueur: {
        type: Sequelize.INTEGER
      },
      picture: {
        type: Sequelize.STRING,
        defaultValue: "./uploads/profil/random-user.png"
      },
      prix: {
        type: Sequelize.STRING
      },
      regle: {
        type: Sequelize.STRING
      },
      horaire: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
    });
  
    return listetournois;
  };
  