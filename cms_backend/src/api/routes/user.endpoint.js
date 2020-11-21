import { response } from "express";
const jwt = require("jsonwebtoken");
const db = require("../../config/database");
const { Op } = require("sequelize");
import business from "../../business/business.container";
import applicationException from "../../exceptions/applicationException";

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
    try {
      let result = await business(request)
        .getUserManager(request)
        .createNew(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * Endpoint which allow to login user onto server
   */
  router.post("/api/user/auth", async (request, response, next) => {
    try {
      let result = await business(request)
        .getUserManager(request)
        .authenticate(request.body.email, request.body.password);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default userEndpoint;
