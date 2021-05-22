const defaultList = require('./list.schema');

const registerUser = require('./User/register.schema');
const registerResource = require('./Resource/register.schema');

module.exports = {
  list: defaultList,
  resource: {
    register: registerResource
  },
  user: { 
    register: registerUser
  }
};
