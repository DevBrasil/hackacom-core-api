const { HOST, NODE_ENV, TOKEN_EMAIL_KEY, TOKEN_EMAIL_LIFETIME } = process.env;

const exception = require('../../../middlewares/catchException');

const jwt = require('jsonwebtoken');
const nodemailer = require('../../../lib/nodemailer');

const User = require('../../../models/User');

/**
 * @api {post} /user/forgot Esqueci minha senha
 * @apiVersion 1.0.0
 * @apiName ForgotPassword
 * @apiGroup Minha Conta
 *
 * @apiParam {String} email Email do usuário.
 * @apiParam {String} device Dispositivo do usuário do usuário. ('web' | 'ios' | 'android')
 */

const forgotPassword = async (req, res) => {
  try {
    const { email, device = 'web' } = req.body;

    const user = await User.findOne({ email, deleted: false });

    if (!user) return res.status(200).end();

    const { _id } = user;

    const token = jwt.sign({ _id, create_at: new Date() }, TOKEN_EMAIL_KEY, {
      expiresIn: TOKEN_EMAIL_LIFETIME,
    });

    if (NODE_ENV === 'test') {
      return res.status(200).json({ token });
    }

    const links = {
      web: {
        label: 'Recuperar Senha',
        value: `${HOST}/recover-password/${token}`,
      },
      mobile: {
        label: 'Abrir aplicativo',
        value: `http://agenciarazzo.boilerplate/new-password/${token}`,
      },
    };

    const options = {
      email,
      subject: 'Recuperação de senha',
      template: 'recover-password',
      values: {
        recover_link: links[device].value,
        name: user.name,
      },
    };

    const result = await nodemailer(options);

    if (result.rejected && result.rejected.length > 0)
      return res.status(403).json({
        result: result.rejected,
      });

    return res.status(200).json({
      result: result.accepted,
    });
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = forgotPassword;
