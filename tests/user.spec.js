global.config = {};

process.env.SKIP_AUTH = false;
require('./User/register');
require('./User/me');
require('./User/auth');
require('./User/manage');
