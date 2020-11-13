const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "user",
  {
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);

module.exports = User;
