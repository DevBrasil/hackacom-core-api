const {
  SALT_NUMBER,
  TOKEN_EMAIL_KEY
} = process.env

const exception = require('../../../middlewares/catchException');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const User = require('../../../models/User');

/**
 * @api {post} /user/recover Recuperar senha
 * @apiVersion 1.0.0
 * @apiName RecoverPassword
 * @apiGroup Minha Conta
 *
 * @apiParam {String} token Token de recuperação.
 * @apiParam {String} password Nova senha
 */

const recoverPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const tokenDecoded = await promisify(jwt.verify)(token, TOKEN_EMAIL_KEY);

    if (!tokenDecoded) return res.status(403).json({ error: 'Decoded token error' });

    const passwordHashed = await bcrypt.hash(password, parseInt(SALT_NUMBER || 10));

    const user = await User.findByIdAndUpdate(
      { _id: tokenDecoded._id },
      { password: passwordHashed }
    );

    return res.status(200).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = recoverPassword;
