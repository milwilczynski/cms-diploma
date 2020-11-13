const { Sequelize } = require("sequelize");
console.log(process.env.DB_USER);
const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Database connection failed: " + err));

module.exports = db;
