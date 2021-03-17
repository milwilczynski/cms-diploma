const app = require('./../src/app');
const request = require('supertest');
import db from './../src/models';
import models, { sequelize } from '../src/models/index';

afterAll(async (done) => {
  try {
    await db.sequelize.close();
    done();
  } catch (error) {
    console.log(error);
    done();
  }
});

let token;

beforeAll(async (done) => {
  try {
    request(app)
      .post('/api/user-auth')
      .send({
        emailorlogin: 'admin',
        password: 'admin',
      })
      .end((err, response) => {
        token = response; // save the token!
        done();
      });
  } catch (error) {
    console.log(error);
    done();
  }
});

test('Should return valid token', async () => {
  const response = await request(app).post('/api/user-auth').send({
    emailorlogin: 'admin',
    password: 'admin',
  });
  expect(response.statusCode).toEqual(200);
  expect(response.body).toHaveProperty('token');
});
