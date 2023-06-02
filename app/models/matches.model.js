module.exports = (sequelize, Sequelize) => {
    const matches = sequelize.define("matches", {
      nextMatchId: {
        type: Sequelize.INTEGER
      },
      round: {
        type: Sequelize.INTEGER
      },
      // user1: {
      //   type: Sequelize.STRING,
      // },
      // user2: {
      //   type: Sequelize.STRING
      // },
      // winner: {
      //   type: Sequelize.STRING
      // },
      // loser: {
      //   type: Sequelize.STRING
      // },
      // state: {
      //   type: Sequelize.STRING
      // },
    });
  
    return matches;
  };
  