const objectIsNotEmpty = (obj) => Object.entries(obj).length !== 0;

const validate = (schema) => async (req, res, next) => {
  try {
    const { method } = req;

    const validateOptions = {
      abortEarly: false,
      stripUnknown: true,
    };

    switch (true) {
      case method === 'GET':
        req.query = await schema.validate(req.query, validateOptions);
        break;

      default:
        req.body = await schema.validate(req.body, validateOptions);
        break;
    }

    return next();
  } catch (errors) {
    const validationErrors = {};

    if (errors.inner) {
      errors.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });

      return res.status(400).json(validationErrors);
    }

    return res.status(500).json({ errors });
  }
};

module.exports = validate;
