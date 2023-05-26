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
db.bracket = require("../models/bracket.model.js")(sequelize, Sequelize);
db.matches = require("../models/matches.model.js")(sequelize, Sequelize);

db.bracket.hasOne(db.matches)
db.matches.belongsTo(db.bracket);

db.user.hasOne(db.matches, {foreignKey: 'user1'})
db.matches.belongsTo(db.user, {foreignKey: 'user1'});
db.user.hasOne(db.matches,  {foreignKey: 'user2'})
db.matches.belongsTo(db.user, {foreignKey: 'user2'});

db.user.hasOne(db.matches, {foreignKey: 'winner'})
db.matches.belongsTo(db.user, {foreignKey: 'winner'});
db.user.hasOne(db.matches,  {foreignKey: 'loser'})
db.matches.belongsTo(db.user, {foreignKey: 'loser'});

db.listejeu.hasOne(db.listetournoi)
db.listetournoi.belongsTo(db.listejeu);

db.listetournoi.hasOne(db.bracket)
db.bracket.belongsTo(db.listetournoi);


db.user_brackets = sequelize.define('user_brackets');
db.bracket.belongsToMany(db.user, {
  through: "user_brackets",
  foreignKey: "bracketId",
  otherKey: "userId"
});
db.user.belongsToMany(db.bracket, {
  through: "user_brackets",
  foreignKey: "userId",
  otherKey: "bracketId"
});



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
