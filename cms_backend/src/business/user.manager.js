/* eslint-disable prettier/prettier */
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import applicationException from '../exceptions/applicationException';
import models, {
  sequelize
} from '../models/index';
import {
  ValidationError,
  Op
} from "sequelize";

function create(context) {
  async function generateHash(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async function getAllUsers() {
    const users = await models.user.findAll({
      include: [{
        nested: false,
        model: models.user_passwords,
        attributes: ['password']
      }, ],
    });

    return users;
  }

  async function createNew(userData) {
    const transaction = await sequelize.transaction();

    try {
      const tempData = userData;
      tempData.password = await generateHash(userData.password);
      const user = await models.user.create({
        login: tempData.login,
        email: tempData.email,
        name: tempData.name,
        surname: tempData.surname
      }, {
        transaction
      });

      const password = await models.user_passwords.create({
        userId: user.id,
        password: tempData.password
      }, {
        transaction
      });

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      return error;
    }

  }

  async function authenticate(data, password) {
    try {
      const user = await models.user.findOne({
        where: {
          [Op.or]: [{
            email: data
          }, {
            login: data
          }],
        },
        include: [{
          nested: false,
          model: models.user_passwords,
          attributes: ['password'],
        }]
      });
      /**
       * TODO: FIX IF NOT FOUND - IF, dosen't work correctly.
       */
      if (!user) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'User with that email does not exist',
        );
      }

      if (!(await bcrypt.compare(password, user.user_password.password))) {
        throw new applicationException.new(
          applicationException.UNAUTHORIZED,
          'Incorrect Password',
        );
      }

      const token = jwt.sign({
        id: user.id
      }, process.env.TOKEN_SECRET);
      return token;
    } catch (error) {
      return error;
    }

  }

  return {
    createNew,
    authenticate,
    getAllUsers,
  };
}

export default {
  create,
};