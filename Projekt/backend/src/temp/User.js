import Joi from "@hapi/joi";
import applicationException from "../exceptions/applicationException";
const { ValidationError, Op } = require("sequelize");
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

/**
 * TODO:
 * Log-in to server with login or email
 * @param {} data
 */
const loginValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
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
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
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

User.associate = (models) => {
  User.belongsTo(models.UserRole, {
    foreignKey: {
      name: "role_id",
      allowNull: false,
    },
  });
};

async function getByEmailOrLogin(data) {
  const result = await User.findOne({
    where: {
      [Op.or]: [{ email: data }, { login: data }],
    },
  });
  if (result) {
    return result;
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
}

async function createNew(user) {
  try {
    const data = await User.build(user).save();
    return data;
  } catch (error) {
    return error.errors[0].message;
  }
}

module.exports = {
  User: User,
  registerValidate: registerValidate,
  loginValidate: loginValidate,
  createNew: createNew,
  getByEmailOrLogin: getByEmailOrLogin,
};
