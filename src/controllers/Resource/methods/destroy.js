const exception = require('../../../middlewares/catchException');

const Resource = require('../../../models/Resource');

/**
 * @api {delete} /resource/:id Excluir um recurso
 * @apiVersion 1.0.0
 * @apiName DeleteResource
 * @apiGroup Recursos
 *
 * @apiHeader {String} authorization Token de autenticação
 * 
 * @apiParam {String} Id Identificador do recurso.
 */

const destroy = async (req, res) => {
  try {
    const { params } = req;

    const { id } = params;

    await Resource.findByIdAndDelete(id);

    return res.status(200).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = destroy;
