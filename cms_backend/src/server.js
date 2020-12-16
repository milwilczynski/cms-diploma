const app = require("./app");
const db = require("./models");

app.set("port", process.env.NODE_PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${app.get("port")}`);
});

db.sequelize
  //.sync({ force: true }) //deletes and creates tables without seeding
  .sync({logging: console.log}) //only sync without deleting tables etc.
  .then(() => {
    console.log("Database successfully connected...");
  })
  .catch((error) => {
    console.log("Database connection failed... " + error.message);
  });
