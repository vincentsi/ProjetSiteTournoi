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
      description: {
        type: Sequelize.STRING
      }
    });
  
    return listejeu;
  };
  