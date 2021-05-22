const exception = require('../../../middlewares/catchException');

const User = require('../../../models/User');

/**
 * @api {get} /user Listar usuários
 * @apiVersion 1.0.0
 * @apiName ListUsers
 * @apiGroup Usuários
 *
 * @apiHeader {String} authorization Token de autenticação
 *
 * @apiParam {Number} page Pagina
 * @apiParam {Number} perPage Itens por pagina, se não informado, retornará todos
 * @apiParam {Boolean} sort Configura ordenação do conteúdo
 * @apiParam {String} fields Filtrar campos que serão retornados
 * @apiParam {String} filter Filtrar usuários
 * @apiParam {Boolean} active Filtrar apenas por ativos / inativos
 *
 * @apiPermission admin
 */

const list = async (req, res) => {
  try {
    const { active, sort, page, perPage, fields, filter } = req.query;

    const options = {
      ...(sort ? { sort } : {}),
      ...(page ? { page } : {}),
      ...(fields ? { select: fields } : {}),
      ...(perPage ? { limit: perPage } : { pagination: false }),
    };

    const query = {
      _id: { $ne: req.tokenUser._id }, // do not return logged user
      deleted: false,
    };

    if (filter) {
      query.$or = [
        { name: { $regex: filter, $options: 'i' } },
        { email: { $regex: filter, $options: 'i' } },
        { phone: { $regex: filter, $options: 'i' } },
      ]
    }

    if (typeof active === 'boolean') query.active = active;

    const user = await User.paginate(query, options);

    return res.status(200).json(user);
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = list;
