const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port:  config.PORT,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.listejeu = require("../models/listejeu.model.js")(sequelize, Sequelize);
db.listetournoi = require("../models/listetournois.model.js")(sequelize, Sequelize);
db.matches = require("../models/matches.model.js")(sequelize, Sequelize);
db.rank = require("../models/rank.model.js")(sequelize, Sequelize);
db.tournoiroles = require("../models/tournoiRoles.model.js")(sequelize, Sequelize);

db.listejeu.hasOne(db.rank,{foreignKey: 'jeuId'})
db.listetournoi.hasOne(db.matches,{foreignKey: 'tournoiId'})
db.matches.belongsTo(db.listetournoi,{foreignKey: 'tournoiId'});

// db.user.hasOne(db.matches, {foreignKey: 'user1'})
// db.matches.belongsTo(db.user, {foreignKey: 'user1'});
// db.user.hasOne(db.matches,  {foreignKey: 'user2'})
// db.matches.belongsTo(db.user, {foreignKey: 'user2'});
// db.user.hasOne(db.matches, {foreignKey: 'winner'})
// db.matches.belongsTo(db.user, {foreignKey: 'winner'});

db.user.hasOne(db.listetournoi);
db.listetournoi.belongsTo(db.user);

db.listejeu.hasOne(db.listetournoi);
db.listetournoi.belongsTo(db.listejeu);


db.listetournoi.hasOne(db.tournoiroles,{ foreignKey: 'tournoiId' });
db.tournoiroles.belongsTo(db.listetournoi,{ foreignKey: 'tournoiId' });
db.user.hasOne(db.tournoiroles,{ foreignKey: 'userId' });
db.tournoiroles.belongsTo(db.user,{ foreignKey: 'userId' });
db.role.hasOne(db.tournoiroles,{ foreignKey: 'roleId' });
db.tournoiroles.belongsTo(db.role,{ foreignKey: 'roleId' });


db.user_rank = sequelize.define('user_ranks');
db.rank.belongsToMany(db.user, {
  through: "user_ranks",
  foreignKey: "rankId",
  otherKey: "userId"
});
db.user.belongsToMany(db.rank, {
  through: "user_ranks",
  foreignKey: "userId",
  otherKey: "rankId"
});

// db.user_tournoi = sequelize.define('user_tournoi');

// db.listetournoi.belongsToMany(db.user, {
//   through: "user_tournoi",
//   foreignKey: "tournoiId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.listetournoi, {
//   through: "user_tournoi",
//   foreignKey: "userId",
//   otherKey: "tournoiId"
// });

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});



db.ROLES = ["user", "admin"];

module.exports = db;
