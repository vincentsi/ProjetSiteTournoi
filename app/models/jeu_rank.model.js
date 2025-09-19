module.exports = (sequelize, DataTypes) => {
  const JeuRank = sequelize.define(
    "jeu_rank",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      jeuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "listejeus",
          key: "id",
        },
      },
      rankId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "listeranks",
          key: "id",
        },
      },
    },
    {
      tableName: "jeu_ranks",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["jeuId", "rankId"],
        },
      ],
    }
  );

  JeuRank.associate = (models) => {
    // Relation avec le jeu
    JeuRank.belongsTo(models.listejeu, {
      foreignKey: "jeuId",
      as: "jeu",
    });

    // Relation avec le rang
    JeuRank.belongsTo(models.listerank, {
      foreignKey: "rankId",
      as: "rank",
    });
  };

  return JeuRank;
};
