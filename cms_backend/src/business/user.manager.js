/* eslint-disable prettier/prettier */
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import applicationException from '../exceptions/applicationException';
import models, { sequelize, queryInterface } from '../models/index';
import { ValidationError, Op } from 'sequelize';
import applicationMessage from '../resources/applicationMessage';

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
          model: models.role,
        },
      ],
    });

    return users;
  }

  async function getUserById(id) {
    try {
      return await models.user.findByPk(id, {
        include: [
          {
            model: models.role,
            attributes: ['id'],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  }

  async function getUsersByRole(role) {
    try {
      return await models.role.findByPk(role, {
        include: [
          {
            model: models.user,
          },
        ],
      });
    } catch (error) {
      return error;
    }
  }

  async function getDashboard() {
    try {
      const user = await models.user.findAll({
        order: [['createdAt', 'DESC']],
        limit: 1,
      });

      const amount = await models.user.count();

      return { user: user, amount: amount };
    } catch (error) {
      return error;
    }
  }

  async function deleteUserById(id) {
    try {
      const user = await models.user.findByPk(id);
      if (!user) return user;
      user.destroy();
      return applicationMessage.new(
        applicationMessage.OK,
        'User has been deleted',
      );
    } catch (error) {
      return error;
    }
  }

  async function createNew(userData) {
    const transaction = await sequelize.transaction();

    try {
      const tempData = userData;
      tempData.password = await generateHash(userData.password);
      const user = await models.user.create(
        {
          login: tempData.login,
          email: tempData.email,
          name: tempData.name,
          surname: tempData.surname,
        },
        {
          transaction,
        },
      );

      const password = await models.user_passwords.create(
        {
          userId: user.id,
          password: tempData.password,
        },
        {
          transaction,
        },
      );

      var rolesData = [];
      tempData.roles.forEach((role) => {
        if (role.value == true) {
          rolesData.push({
            userId: user.id,
            roleId: role.id,
          });
        }
      });
      await models.user_roles.bulkCreate(rolesData, {
        transaction,
      });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      return error;
    }
  }

  async function editUser(userData) {
    const transaction = await sequelize.transaction();
    try {
      const user = await models.user.findByPk(userData.id);
      if (!user) return user;

      await user.update(
        {
          login: userData.login,
          email: userData.email,
          name: userData.name,
          surname: userData.surname,
        },
        {
          transaction,
        },
      );

      await models.user_roles.destroy(
        {
          where: {
            userId: user.id,
          },
        },
        {
          transaction,
        },
      );

      var rolesData = [];
      userData.roles.forEach((role) => {
        if (role.value == true) {
          rolesData.push({
            userId: user.id,
            roleId: role.id,
          });
        }
      });

      await models.user_roles.bulkCreate(rolesData, {
        transaction,
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
          [Op.or]: [
            {
              email: data,
            },
            {
              login: data,
            },
          ],
        },
        include: [
          {
            nested: false,
            model: models.user_passwords,
            attributes: ['password'],
          },
        ],
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

      if (
        !(await bcrypt.compare(password, user.user_password.password))
      ) {
        throw new applicationException.new(
          applicationException.UNAUTHORIZED,
          'Incorrect Password',
        );
      }

      const token = jwt.sign(
        {
          id: user.id,
          login: user.login,
          name: user.name,
          surname: user.surname,
        },
        process.env.TOKEN_SECRET,
      );
      return { token: token };
    } catch (error) {
      return error;
    }
  }

  return {
    createNew,
    authenticate,
    deleteUserById,
    getAllUsers,
    getDashboard,
    getUserById,
    getUsersByRole,
    editUser,
  };
}

export default {
  create,
};
