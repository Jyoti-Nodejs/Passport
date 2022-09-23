//const validator = require("express-validator");
module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      autoNull: false,
      primaryKey: true,
    },
    Name: {
      type: Sequelize.STRING,
      autoNull: false,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Otp: {
      type: Sequelize.STRING,
      autoNull: true,
    },
    Username: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
    Role: {
      type: Sequelize.STRING,
    },
  });
  return user;
};
