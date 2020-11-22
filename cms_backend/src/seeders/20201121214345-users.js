"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();
    //Creating User Roles
    const roleIds = await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "Administrator",
          description: "Administrator ma dostep do każdego elementu aplikacji",
          createdAt: date,
          updatedAt: date,
        },
        {
          name: "Zarządca Strony",
          description:
            "Zarządca Strony ma dostep do większości elementów aplikacji",
          createdAt: date,
          updatedAt: date,
        },
        {
          name: "Pracownik",
          description:
            "Pracownik ma dostep do ściślę określonych elementów aplikacji",
          createdAt: date,
          updatedAt: date,
        },
      ],
      { returning: true }
    );

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
    await queryInterface.bulkInsert(
      "user_roles",
      [
        {
          userId: userId[0]["id"],
          roleId: roleIds[0]["id"],
          createdAt: date,
          updatedAt: date,
        },
        {
          userId: userId[1]["id"],
          roleId: roleIds[1]["id"],
          createdAt: date,
          updatedAt: date,
        },
        {
          userId: userId[2]["id"],
          roleId: roleIds[2]["id"],
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("user_passwords", null, {});
    await queryInterface.bulkDelete("user_roles", null, {});
    await queryInterface.bulkDelete("roles", null, {});
  },
};
