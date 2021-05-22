const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  description: yup.string(),
  address: yup
    .object({
      city: yup.string(),
      state: yup.string(),
      zipcode: { type: String },
      street_name: yup.string(),
      street_number: yup.string(),
      neighborhood: yup.string(),
      state: yup.string(),
    })
    .required(),
  tags: yup.array(yup.string()),
  ong: yup.boolean(),
  phone: yup
    .string()
    .matches(/(^[0-9]+$)/)
    .length(11),
});
