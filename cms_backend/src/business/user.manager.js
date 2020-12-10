/* eslint-disable prettier/prettier */
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import applicationException from '../exceptions/applicationException';
import models from '../models/index';

function create(context) {
  async function generateHash(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async function getAllUsers() {
    const users = await models.user.findAll({
      include: [
        {
          nested: false,
          model: models.user_passwords,
          attributes: ['password'],
        },
        {
          model: models.roles,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });

    return users;
  }

  async function createNew(userData) {
    const tempData = userData;
    tempData.password = await generateHash(userData.password);
    const user = await models.User.createNew(tempData);
    return user;
  }

  async function authenticate(email, password) {
    const user = await models.User.getByEmailOrLogin(email);
    if (!user) {
      throw applicationException.new(
        applicationException.UNAUTHORIZED,
        'User with that email does not exist',
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new applicationException.new(
        applicationException.UNAUTHORIZED,
        'Incorrect Password',
      );
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    return token;
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
