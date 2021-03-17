const jwt = require('jsonwebtoken');
import models, { sequelize } from '../models/index';
import { ValidationError, Op } from 'sequelize';
import { result } from 'lodash';
import { async } from 'regenerator-runtime';

const auth = (request, response, next) => {
  const token = request.header('x-auth-token');
  if (!token) {
    return response.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    request.user = verified;
    next();
  } catch (error) {
    response.status(400).send('Invalid token');
  }
};

async function isAdmin(request, response, next) {
  const token = request.header('x-auth-token');
  if (!token) {
    return response.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await models.user.findOne({
      where: {
        id: verified.id,
      },
      include: {
        all: true,
      },
    });

    if (user.roles[0].name != 'admin') {
      return response.status(401).send('Access Denied');
    }
    next();
  } catch (error) {
    response.status(400).send('Invalid token');
  }
}

async function isMod(request, response, next) {
  const token = request.header('x-auth-token');
  if (!token) {
    return response.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await models.user.findOne({
      where: {
        id: verified.id,
      },
      include: {
        all: true,
      },
    });

    if (user.roles[0].name != 'mod') {
      return response.status(401).send('Access Denied');
    }
    next();
  } catch (error) {
    response.status(400).send('Invalid token');
  }
}

async function checkRole(request, response, next) {
  const user = await models.user.findByPk(request.userId);
  if (!user) {
    return response.status(404).send('Not Found');
  }
  console.log(user.getRoles());
}

const authJwt = {
  auth: auth,
  checkRole: checkRole,
  isAdmin: isAdmin,
  isMod: isMod,
};

export default authJwt;
