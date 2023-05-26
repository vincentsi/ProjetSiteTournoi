module.exports = (sequelize, Sequelize) => {
    const brackets = sequelize.define("brackets", {
      
      dateDebut : {
        type: Sequelize.STRING
      },
      nbMaxJoueurs  : {
        type: Sequelize.INTEGER
      }
    });
  
    return brackets;
  };