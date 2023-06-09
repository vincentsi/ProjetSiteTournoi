module.exports = (sequelize, Sequelize) => {
    const matches = sequelize.define("matches", {
      Round: {
        type: Sequelize.INTEGER
      },
      numMatch: {
        type: Sequelize.INTEGER
      },
      nextMatch: {
        type: Sequelize.STRING
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
  