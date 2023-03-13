module.exports = (sequelize, Sequelize) => {
    const listetournois = sequelize.define("listetournoi", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return listetournois;
  };
  