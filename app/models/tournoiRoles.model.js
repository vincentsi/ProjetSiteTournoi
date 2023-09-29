module.exports = (sequelize, Sequelize) => {
    const tournoiroles = sequelize.define('tournoiroles', {
        tournoiId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          roleId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
        
    });
  
    return tournoiroles;
  };
  