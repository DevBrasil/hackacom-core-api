const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  name: yup.string().required()
});
