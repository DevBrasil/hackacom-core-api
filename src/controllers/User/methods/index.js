const login = require('./login');
const forgotPassword = require('./forgotPassword');
const recoverPassword = require('./recoverPassword');

const register = require('./register');

const get = require('./get');
const list = require('./list');
const destroy = require('./destroy');

const update = require('./update');
const updatePassword = require('./updatePassword');
const updatePhotoProfile = require('./updatePhotoProfile');

module.exports = {
  updatePassword,
  forgotPassword,
  recoverPassword,
  get,
  list,
  login,
  register,
  destroy,
  update,
  updatePhotoProfile,
};
