const exception = require('../../../middlewares/catchException');

const Tag = require('../../../models/Tag');

const register = async (req, res) => {
  try {
    const { body } = req;
    const { ...data } = body;

    const tag = await Tag.create(data);

    return res.status(201).json(tag).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = register;
