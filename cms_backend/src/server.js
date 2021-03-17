import app from './app';
import db from './models';

app.set('port', process.env.NODE_PORT || 8080);

const server = app.listen(app.get('port'), async () => {
  console.log(`Server is listening on port ${app.get('port')}`);
});

db.sequelize
  //.sync({ force: true }) //deletes and creates tables without seeding
  //.sync({ logging: console.log }) //only sync without deleting tables etc.
  .sync()
  .then(() => {
    console.log('Database successfully connected...');
  })
  .catch((error) => {
    console.log('Database connection failed... ' + error.message);
  });
