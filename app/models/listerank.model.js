module.exports = (sequelize, DataTypes) => {
  const ListeRank = sequelize.define("listerank", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: "./img/rankjeux/default.jpg",
    },
  });

  ListeRank.associate = (models) => {
    // Un rang peut appartenir à plusieurs jeux
    ListeRank.belongsToMany(models.listejeu, {
      through: models.jeu_rank,
      foreignKey: "rankId",
      as: "jeux",
    });
  };

  return ListeRank;
};
