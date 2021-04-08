const bodyParser = require('body-parser');
const people = require('./peopleRoute');

module.exports = app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(people);
}
