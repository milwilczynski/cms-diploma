"use strict";
const { Model } = require("sequelize");
const {  ValidationError,  Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.user_passwords, {
        foreignKey: {
          name: "userId", allowNull: false
        }
      });
      User.hasOne(models.post, {
        foreignKey: {
          name: 'userId', allowNull: false
        }
      })
    }
  }
  User.init(
    {
      login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "user",
      validate: {
        async isEmailOrLoginUnique() {
          const user = await User.findOne({
            where: {
              [Op.or]: [{ email: this.email }, { login: this.login }],
            },
          });
          if (user) {
            throw new Error("Email or Login already in use!");
          }
        },
      },
    }
  );


  return User;
    
};
