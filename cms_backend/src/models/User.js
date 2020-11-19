import Joi from "@hapi/joi";
const Sequelize = require("sequelize");
const db = require("../config/database");

/**
 * User validation schema
 * @param {} data
 */
const registerValidate = (data) => {
  const schema = Joi.object({
    login: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
  });
  return schema.validate(data);
};

const loginValidate = (data) => {
  const schema = Joi.object({
    login: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

/**
 * User model
 */
const User = db.define(
  "user",
  {
    role_id: {
      type: Sequelize.INTEGER,
      defaultValue: 3,
      allowNull: false,
    },
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

User.associate = (models) => {
  User.belongsTo(models.UserRole, {
    foreignKey: {
      name: "role_id",
      allowNull: false,
    },
  });
};

module.exports = {
  User: User,
  registerValidate: registerValidate,
  loginValidate: loginValidate,
};
