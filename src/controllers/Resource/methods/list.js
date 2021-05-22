const exception = require('../../../middlewares/catchException');

const Resource = require('../../../models/Resource');

/**
 * @api {get} /resource Listar recursos
 * @apiVersion 1.0.0
 * @apiName ListResource
 * @apiGroup Recursos
 *
 * @apiHeader {String} authorization Token de autenticação
 * 
 * @apiParam {Number} page Pagina
 * @apiParam {Number} perPage Itens por pagina, se não informado, retornará todos
 * @apiParam {Boolean} sort Configura ordenação do conteúdo
 * @apiParam {String} fields Filtrar campos que serão retornados
 * @apiParam {String} filter Filtrar recursos
 */

const list = async (req, res) => {
  try {
    const { fields, sort, page, perPage, filter } = req.query;

    const options = {
      ...(sort ? { sort } : {}),
      ...(page ? { page } : {}),
      ...(fields ? { select: fields } : {}),
      ...(perPage ? { limit: perPage } : { pagination: false }),
    };

    const query = {};

    if (filter) {
      query.$or = [
        { name: { $regex: filter, $options: 'i' } },
      ]
    }

    const resources = await Resource.paginate(query, options);

    return res.status(200).json(resources);
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = list;
