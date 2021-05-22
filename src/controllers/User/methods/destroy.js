const exception = require('../../../middlewares/catchException');

const User = require('../../../models/User');

/**
 * @api {delete} /user/:id Excluir um usuário
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Usuários
 *
 * @apiParam {String} Id Identificador do usuário (required).
 * @apiHeader {String} authorization Token de autenticação
 *
 * @apiPermission admin
 */

/**
 * @api {delete} /user/me Excluir minha conta
 * @apiVersion 1.0.0
 * @apiName DeleteMeUser
 * @apiGroup Minha Conta
 *
 * @apiHeader {String} authorization Token de autenticação
 *
 * @apiPermission admin, user
 */

const destroy = async (req, res) => {
  try {
    const { tokenUser, params } = req;

    const { id } = params;

    const userId = id || tokenUser._id;

    await User.findByIdAndUpdate(userId, { deleted: true });

    return res.status(200).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = destroy;
