const exception = require('../../../middlewares/catchException');

const Resource = require('../../../models/Resource');

/**
 * @api {put} /resource/:id Atualizar um recurso
 * @apiVersion 1.0.0
 * @apiName updateResource
 * @apiGroup Recursos
 *
 * @apiHeader {String} authorization Token de autenticação
 *
 * @apiParam {String} name Nome do recurso.
 */

const update = async (req, res) => {
  try {
    const { body, params } = req;
    
    const { id } = params;
    const { ...data } = body;
    
    const resource = await Resource.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json(resource);
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = update;
