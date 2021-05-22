const register = require('./register');
const get = require('./get');
const list = require('./list');
const update = require('./update');
const destroy = require('./destroy');

module.exports = {
  get,
  list,
  register,
  destroy,
  update
};
