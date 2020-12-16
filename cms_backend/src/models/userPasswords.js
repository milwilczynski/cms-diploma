"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPasswords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPasswords.belongsTo(models.user, {
        foreignKey: {
          name: "userId", allowNull: false
        }
      });
    }
  }
  UserPasswords.init(
    {
      userId: { type: DataTypes.INTEGER, unique: true },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_passwords",
    }
  );
  return UserPasswords;
};
