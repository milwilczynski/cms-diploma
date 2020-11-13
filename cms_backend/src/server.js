const app = require("./app");
const sequelize = require("./config/database");

app.set("port", process.env.NODE_PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${app.get("port")}`);
});
