module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.STRING,
      default: "./uploads/profil/random-user.png"
    },
    bio: {
      type: Sequelize.STRING
    }
  });

  return User;
};
