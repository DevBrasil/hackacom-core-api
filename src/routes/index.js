const user = require('../controllers/User');
const resource = require('../controllers/Resource');
const tag = require('../controllers/Tag');

const routes = (app) => {
  app.use('/user', user);
  app.use('/tag', tag);
  app.use('/resource', resource);
};

module.exports = routes;
