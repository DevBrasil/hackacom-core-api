const exception = require('../../../middlewares/catchException');

const User = require('../../../models/User');
const bcrypt = require('bcrypt');

/**
 * @api {post} /user Registrar um usuário
 * @apiVersion 1.0.0
 * @apiName register
 * @apiGroup Usuários
 *
 * @apiParam {Email} email Email do usuário.
 * @apiParam {String} name Nome do usuário.
 * @apiParam {String} password Senha do usuário.
 */

const register = async (req, res) => {
  try {
    const { body } = req;
    const { email, password, ...restUser } = body;

    const usersExists = await User.count({
      email,
      deleted: false,
      active: true,
    });

    if (usersExists > 0)
      return res
        .status(403)
        .json({ error: `Usuário já cadastrado, efetue login` });

    const passwordHashed = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_NUMBER || 10)
    );
    try {
      if (restUser.address && restUser.address.zipcode) {
        const location = await geocoder.geocode(
          `${restUser.address.street_name}, ${restUser.address.street_number}, ${restUser.address.neighborhood} ${restUser.address.city} ${restUser.address.state} - ${restUser.address.zipcode} `
        );
        if (location.length > 0) {
          restUser.location = {
            type: 'Point',
            coordinates: [location[0].longitude, location[0].latitude],
          };
        }
      }
    } catch (err) {
      console.log(err);
    }

    const user = await User.create({
      email,
      password: passwordHashed,
      ...restUser,
    });

    return res.status(201).json(user).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = register;
