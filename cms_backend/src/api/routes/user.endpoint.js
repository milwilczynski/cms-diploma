const db = require("../../config/database");
const User = require("../../models/User");
const userEndpoint = (router) => {
  router.get("/api/user", async (request, response, next) =>
    User.findAll()
      .then((users) => {
        response.send(users);
      })
      .catch((err) => console.log(err))
  );
};

export default userEndpoint;
