"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();
    //Creating User Roles
  
    const userId = await queryInterface.bulkInsert(
      "users",
      [
        {
          login: "admin",
          email: "admin@gmail.com",
          name: "admin",
          surname: "admin",
          createdAt: date,
          updatedAt: date,
        },
        {
          login: "jdoe",
          email: "jdoe@gmail.com",
          name: "John",
          surname: "Doe",
          createdAt: date,
          updatedAt: date,
        },
        {
          login: "mwilk",
          email: "mwilk@gmail.com",
          name: "Milek",
          surname: "Wilk",
          createdAt: date,
          updatedAt: date,
        },
      ],
      { returning: true }
    );
    await queryInterface.bulkInsert("user_passwords", [
      {
        userId: userId[0]["id"],
        password: "admin",
        createdAt: date,
        updatedAt: date,
      },
      {
        userId: userId[1]["id"],
        password: "admin",
        createdAt: date,
        updatedAt: date,
      },
      {
        userId: userId[2]["id"],
        password: "admin",
        createdAt: date,
        updatedAt: date,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("user_passwords", null, {});
  },
};
