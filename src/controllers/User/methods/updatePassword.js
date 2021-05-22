const {
  SALT_NUMBER
} = process.env

const exception = require('../../../middlewares/catchException');

const bcrypt = require('bcrypt');
const User = require('../../../models/User');

/**
 * @api {put} /user/:id/password Atualizar senha de um usuário
 * @apiVersion 1.0.0
 * @apiName updatePassword
 * @apiGroup Usuários
 *
 * @apiHeader {String} authorization Token de autenticação
 *
 * @apiParam {String} id id do usuário a ser alterado.
 * @apiParam {String} current Senha atual.
 * @apiParam {String} password Nova senha.
 *
 * @apiPermission admin
 */

/**
 * @api {put} /user/me/password Atualizar minha senha
 * @apiVersion 1.0.0
 * @apiName updateMePassword
 * @apiGroup Minha Conta
 *
 * @apiHeader {String} authorization Token de autenticação
 *
 * @apiParam {String} current Senha atual.
 * @apiParam {String} password Nova senha.
 *
 * @apiPermission admin, user
 */

const changePassword = async (req, res) => {
  try {
    const { tokenUser, params, body } = req;

    const { current, password } = body;
    const { id } = params;

    const userId = id || tokenUser._id;

    if (!id) {
      const user = await User.findById(userId).select('+password');

      const passwordIsEqual = await bcrypt.compare(current, user.password);

      if (!passwordIsEqual)
        return res.status(403).json({ error: 'A senha atual está incorreta' });
    }

    const passwordHashed = await bcrypt.hash(password, parseInt(SALT_NUMBER || 10));

    await User.findByIdAndUpdate(userId, { password: passwordHashed });

    return res.status(200).json();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = changePassword;
