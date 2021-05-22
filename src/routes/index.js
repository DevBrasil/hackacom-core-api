const user = require('../controllers/User');
const resource = require('../controllers/Resource');

const routes = (app) => {
  app.use('/user', user);
  app.use('/resource', resource);
};

module.exports = routes;
