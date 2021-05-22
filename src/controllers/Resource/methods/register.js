const exception = require('../../../middlewares/catchException');

const Resource = require('../../../models/Resource');

/**
 * @api {post} /resource Registar um recurso
 * @apiVersion 1.0.0
 * @apiName RegisterResource
 * @apiGroup Recursos
 *
 * @apiParam {String} name Nome do recurso.
 */

const register = async (req, res) => {
  try {
    const { body } = req;
    const { ...data } = body;

    const resource = await Resource.create(data);

    return res.status(201).json(resource).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = register;
