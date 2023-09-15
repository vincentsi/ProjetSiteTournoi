module.exports = (sequelize, Sequelize) => {
    const rank = sequelize.define("rank", {
      name: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING,
        defaultValue: "./uploads/profil/random-user.png"
      },
    });
  
    return rank;
  };
  