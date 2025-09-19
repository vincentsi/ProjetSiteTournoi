module.exports = (sequelize, Sequelize) => {
  const listejeu = sequelize.define("listejeu", {
    name: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    picture: {
      type: Sequelize.STRING,
      defaultValue: "./uploads/profil/random-user.png",
    },
    genres: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  listejeu.associate = (models) => {
    // Un jeu peut avoir plusieurs rangs
    listejeu.belongsToMany(models.listerank, {
      through: models.jeu_rank,
      foreignKey: "jeuId",
      as: "ranks",
    });

    // Un jeu peut avoir plusieurs tournois
    listejeu.hasMany(models.listetournoi, {
      foreignKey: "listejeuId",
      as: "tournois",
    });
  };

  return listejeu;
};
