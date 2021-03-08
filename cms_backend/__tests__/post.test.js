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

test('Should create new post', async () => {
  const users = await request(app)
    .get('/api/user')
    .set('X-Auth-Token', token.body.token);
  expect(users.statusCode).toEqual(200);

  const sites = await request(app)
    .get('/api/sites')
    .set('X-Auth-Token', token.body.token);
  expect(sites.statusCode).toEqual(200);

  const post = {
    siteId: sites.body[0].id,
    userId: users.body[0].id,
    title: 'Test post',
    subtitle: 'Testing post',
    content: 'This is the best post in the world',
  };

  const response = await request(app)
    .post('/api/posts/add')
    .send(post);

  expect(response.statusCode).toEqual(201);
});
