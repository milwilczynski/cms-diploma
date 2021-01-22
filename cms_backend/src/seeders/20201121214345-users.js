'use strict';
const { query } = require('express');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bcrypt = require('bcryptjs');
    const date = new Date();
    //Creating User Roles
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('admin', salt);

    const userId = await queryInterface.bulkInsert(
      'users',
      [
        {
          login: 'admin',
          email: 'admin@gmail.com',
          name: 'admin',
          surname: 'admin',
          createdAt: date,
          updatedAt: date,
        },
        {
          login: 'jdoe',
          email: 'jdoe@gmail.com',
          name: 'John',
          surname: 'Doe',
          createdAt: date,
          updatedAt: date,
        },
        {
          login: 'mwilk',
          email: 'mwilk@gmail.com',
          name: 'Milek',
          surname: 'Wilk',
          createdAt: date,
          updatedAt: date,
        },
      ],
      { returning: true },
    );
    await queryInterface.bulkInsert('user_passwords', [
      {
        userId: userId[0]['id'],
        password: password,
        createdAt: date,
        updatedAt: date,
      },
      {
        userId: userId[1]['id'],
        password: password,
        createdAt: date,
        updatedAt: date,
      },
      {
        userId: userId[2]['id'],
        password: password,
        createdAt: date,
        updatedAt: date,
      },
    ]);
    const roles = await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        description: 'Able to do everything',
        createdAt: date,
        updatedAt: date,
      },
      {
        name: 'mod',
        description:
          'Able to do everything - except adding new page.',
        createdAt: date,
        updatedAt: date,
      },
    ]);

    await queryInterface.bulkInsert('user_roles', [
      {
        userId: userId[0]['id'],
        roleId: 1,
        createdAt: date,
        updatedAt: date,
      },
      {
        userId: userId[1]['id'],
        roleId: 2,
        createdAt: date,
        updatedAt: date,
      },
    ]);

    await queryInterface.bulkInsert;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('user_passwords', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  },
};
