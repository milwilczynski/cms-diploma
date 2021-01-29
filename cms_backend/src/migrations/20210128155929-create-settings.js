'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isHeader: {
        type: Sequelize.BOOLEAN
      },
      headerColor: {
        type: Sequelize.STRING
      },
      menuColor: {
        type: Sequelize.STRING
      },
      bodyColor: {
        type: Sequelize.STRING
      },
      navbarColor: {
        type: Sequelize.STRING
      },
      layout: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Settings');
  }
};