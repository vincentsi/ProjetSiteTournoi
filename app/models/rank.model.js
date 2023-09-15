module.exports = (sequelize, Sequelize) => {
    const rank = sequelize.define("rank", {
      name: {
        type: Sequelize.INTEGER
      },
    });
  
    return rank;
  };
  