import { response } from "express";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/database");
const { User, registerValidate, loginValidate } = require("../../models/User");

const userEndpoint = (router) => {
  /**
   * Endpoint which shows all users in db.
   */
  router.get("/api/user", async (request, response, next) =>
    User.findAll()
      .then((users) => {
        response.send(users);
      })
      .catch((err) => console.log(err))
  );

  /**
   * Endpoints which creates user - checking if mail/login is taken
   * then hashes password
   */
  router.post("/api/user/create", async (request, response, next) => {
    const { error } = registerValidate(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    //check mail and login
    const emailExist = await User.findOne({
      where: {
        login: request.body.login,
      },
    });
    if (emailExist)
      return response.status(400).send("Email or Login already taken");

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
      login: request.body.login,
      password: hashedPassword,
      email: request.body.email,
      name: request.body.name,
      surname: request.body.surname,
    });

    try {
      const savedUser = await user.save();
      response.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  /**
   * Endpoint which allow to login user onto server
   */
  router.post("/api/user/login", async (request, response, next) => {
    const { error } = loginValidate(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    //check mail and login
    const user = await User.findOne({
      where: {
        login: request.body.login,
      },
    });
    if (!user)
      return response.status(404).send("Email/Login or password is incorrect.");
    //password is correct
    const validPass = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (!validPass) return response.status(400).send("Invalid password.");

    //create and assign token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
    response.header("auth-token", token).status(200).send(token);
  });
};

export default userEndpoint;
