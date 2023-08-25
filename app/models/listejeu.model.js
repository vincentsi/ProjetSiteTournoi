module.exports = (sequelize, Sequelize) => {
    const listejeu = sequelize.define("listejeu", {
      name: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING,
        defaultValue: "./uploads/profil/random-user.png"
      },
      genres: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });  
    return listejeu;
  };
  