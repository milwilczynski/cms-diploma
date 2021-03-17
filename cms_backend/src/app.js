'use strict';
import express from 'express';
import routes from './api/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
const path = require('path');
import regeneratorRuntime from 'regenerator-runtime';
process.env.NODE_ENV = process.env.NODE_ENV;

const app = express();
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//User routes
routes(app);

module.exports = app;
