"use strict";
import express from "express";
import routes from "./api/routes";
import bodyParser from "body-parser";
import cors from "cors";
import database from "./config/database";

process.env.NODE_ENV = process.env.NODE_ENV;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//User routes
routes(app);

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

module.exports = app;
