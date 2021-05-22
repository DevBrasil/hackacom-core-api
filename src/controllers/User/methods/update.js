const exception = require('../../../middlewares/catchException');

const User = require('../../../models/User');

/**
 * @api {put} /user/:id Atualizar um usuário
 * @apiVersion 1.0.0
 * @apiName updateUser
 * @apiGroup Usuários
 *
 * @apiHeader {String} authorization Token de autenticação
 *
 * @apiParam {String} name Nome do usuário.
 * @apiParam {Boolean} active Ativar/Desativar usuário.
 * @apiParam {String} role Nível do usuário ('admin' | 'user').
 *
 * @apiPermission admin
 */

/**
 * @api {put} /user/me Atualizar meu perfil
 * @apiVersion 1.0.0
 * @apiName updateMeUser
 * @apiGroup Minha Conta
 *
 * @apiHeader {String} authorization Token de autenticação
 *
 * @apiParam {String} name Nome do usuário.
 *
 * @apiPermission admin, user
 */

const update = async (req, res) => {
  try {
    const { tokenUser, body, params } = req;

    const { email, active, role, ...data } = body;
    const { id } = params;

    const userId = id || tokenUser._id;

    if(tokenUser.role == 'admin') {
      if(typeof active != 'undefined') data.active = active
      if(typeof role != 'undefined') data.role = role
    }

    const user = await User.findByIdAndUpdate(userId, data, { new: true });

    return res.status(200).json(user);
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = update;
