module.exports = (sequelize, DataTypes) => {
  const UserRank = sequelize.define(
    "user_rank",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
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
      jeuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "listejeus",
          key: "id",
        },
      },
    },
    {
      tableName: "user_ranks",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["userId", "jeuId"],
        },
      ],
    }
  );

  UserRank.associate = (models) => {
    // Relation avec l'utilisateur
    UserRank.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });

    // Relation avec le rang
    UserRank.belongsTo(models.listerank, {
      foreignKey: "rankId",
      as: "rank",
    });

    // Relation avec le jeu
    UserRank.belongsTo(models.listejeu, {
      foreignKey: "jeuId",
      as: "jeu",
    });
  };

  return UserRank;
};
