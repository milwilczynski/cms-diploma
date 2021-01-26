import { response } from 'express';
import models, { sequelize } from '../models/index';
import applicationMessage from '../resources/applicationMessage';

function create(context) {
  async function getAllRoles() {
    try {
      let roles = await models.role.findAll();
      return roles;
    } catch (error) {
      return error;
    }
  }

  async function getRoleById(id) {
    try {
      let roles = await models.role.findByPk(id);
      return roles;
    } catch (error) {
      return error;
    }
  }

  async function getDashboard() {
    try {
      const roles = await models.role.findOne({
        order: [['createdAt', 'DESC']],
      });
      const amount = await models.role.count();
      console.log('LICZBA: ' + amount);
      return { roles: roles, amount: amount };
    } catch (error) {
      return error;
    }
  }

  async function deleteRoleById(id) {
    try {
      let roles = await models.role.findByPk(id);
      roles
        ? roles.destroy()
        : response.status(204).send('No such role');
      response.status(200).send('Role has been deleted');
    } catch (error) {
      return error;
    }
  }

  async function deleteRoleById(id) {
    try {
      let roles = await models.role.findByPk(id);
      if (!roles) return false;
      roles.destroy();

      return true;
    } catch (error) {
      return error;
    }
  }

  async function addRole(request) {
    const transaction = await sequelize.transaction();
    try {
      const role = await models.role.create(
        {
          name: request.body.name,
          description: request.body.description,
        },
        {
          transaction,
        },
      );
      await transaction.commit();

      return role;
    } catch (error) {
      await transaction.rollback();
      return error;
    }
  }

  async function updateRole(request) {
    try {
      const role = await models.role.findByPk(request.body.id);

      if (role == null) {
        return role;
      }

      const updated = await role.update({
        name: request.body.name,
        description: request.body.description,
      });

      return updated;
    } catch (error) {
      return error;
    }
  }

  return {
    getAllRoles,
    getRoleById,
    getDashboard,
    deleteRoleById,
    updateRole,
    addRole,
  };
}

export default {
  create,
};
