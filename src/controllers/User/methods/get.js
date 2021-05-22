const exception = require('../../../middlewares/catchException');

const User = require('../../../models/User');

/**
 * @api {get} /user/:id Buscar um usuário
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Usuários
 *
 * @apiParam {String} Id Identificador do usuário.
 * @apiHeader {String} authorization Token de autenticação
 *
 * @apiPermission admin
 */

/**
 * @api {get} /user/me Buscar meus dados
 * @apiVersion 1.0.0
 * @apiName GetMeUser
 * @apiGroup Minha Conta
 *
* @apiHeader {String} authorization Token de autenticação
 *
 * @apiPermission user, admin
 */

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const user = id
      ? await User.findOne({ _id: id, deleted: false })
      : req.tokenUser;

    if (!user) return res.status(404).end();

    return res.status(200).json(user).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = get;
