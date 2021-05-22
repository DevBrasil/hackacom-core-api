const exception = require('../../../middlewares/catchException');

const Resource = require('../../../models/Resource');

/**
 * @api {get} /resource/:id Buscar um recurso
 * @apiVersion 1.0.0
 * @apiName GetResource
 * @apiGroup Recursos
 * 
 * @apiHeader {String} authorization Token de autenticação
 * 
 * @apiParam {String} Id Identificador do Recurso.
 */

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findById(id)
    
    if (!resource) return res.status(404).end();

    return res.status(200).json(resource).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = get;
