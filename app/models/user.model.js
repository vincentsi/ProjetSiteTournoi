
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      validate: {
      isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.STRING,
      defaultValue: "./uploads/profil/random-user.png"
    },
    bio: {
      type: Sequelize.STRING
    },
  });

  return User;
};
