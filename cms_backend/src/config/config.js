require('dotenv').config();
module.exports = {
  local: {
    username: 'postgres',
    password: 'root',
    database: 'cms',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  development: {
    username: 'postgres',
    password: 'root',
    database: 'cms',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'root',
    database: 'cms',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'root',
    database: 'cms',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
