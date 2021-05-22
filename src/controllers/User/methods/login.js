const {
  SESSION_KEY,
  SESSION_LIFETIME,
  FORCE_LOGIN,
  SALT_NUMBER
} = process.env

const exception = require('../../../middlewares/catchException');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../../models/User');

/**
 * @api {post} /user/login Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Minha Conta
 *
 * @apiParam {String} email Email do usuário.
 * @apiParam {String} password Senha do usuário.
 * @apiParam {Boolean} persist Parâmetro pra definir se deve persistir o token de autenticação.
 *
 */

const login = async (req, res, next) => {
  try {
    const { email, password = '', persist } = req.body;

    let user =
      (await User.findOne({ email, deleted: false, active: true })
        .select('+password')
        .lean()) || {};

    const passwordIsEqual = bcrypt.compareSync(password, user.password || '') || FORCE_LOGIN == 'true';

    if (!passwordIsEqual) {
      if ((await User.count()) !== 0)
        return res.status(401).json({ error: 'E-mail e/ou senha incorreta' });

      const passwordHashed = bcrypt.hashSync(
        password,
        parseInt(SALT_NUMBER || 10)
      );

      user = await User.create({
        email,
        role: 'admin',
        active: true,
        name: 'Administrador',
        password: passwordHashed,
      });
    }

    if (!user.active) return res.status(401).json();

    const { _id } = user;

    delete user.password;

    // Generate session token
    const tokenOptions = {};
    if (!persist) tokenOptions.expiresIn = SESSION_LIFETIME;
    const token = jwt.sign({ tokenUser: _id }, SESSION_KEY, tokenOptions);

    return res.status(200).json({ token, user });
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = login;
