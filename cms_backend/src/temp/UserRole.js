const Sequelize = require("sequelize");
const db = require("../config/database");
const User = require("./User");

const UserRole = db.define(
  "userRole",
  {
    name: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);

UserRole.hasMany(User.user);

module.exports = UserRole;
