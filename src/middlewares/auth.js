const {
  SESSION_KEY,
  SKIP_AUTH
} = process.env

const catchException = require('./catchException');

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { promisify } = require('util');

const auth = (roles = 'user', skip = false) => async (req, res, next) => {
  const unauthorized = () => {
    if(skip || SKIP_AUTH) return next()

    return res.status(401).end();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) return unauthorized()

  const [, token] = authHeader.split(' ');

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, SESSION_KEY);

    if (!tokenDecoded) return unauthorized()

    const { tokenUser: userId } = tokenDecoded;

    const user = await User.findById(userId);

    if (!user) return unauthorized()

    if (!user.active)
      return res.status(401).json({ errors: 'Este usuário está inativo.' });

    if (roles !== 'user' && !roles.includes(user.role))
      return res
        .status(403)
        .json({ errors: 'Você não tem acesso a este recurso.' });

    req.tokenUser = user;
    req.admin = user.role === 'admin';

    return next();
  } catch (error) {
    catchException(error);
    return res.status(500).end();
  }
};

module.exports = auth;
