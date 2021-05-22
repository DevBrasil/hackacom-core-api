const yup = require('../lib/yup');

module.exports = yup.object().shape({
  fields: yup.string(),
  page: yup.number().integer().min(1),
  perPage: yup.number().integer().min(1),
  sort: yup.string().default('-createdAt')
});
