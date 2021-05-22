const exception = require('../../../middlewares/catchException');

const Tag = require('../../../models/Tag');

const update = async (req, res) => {
  try {
    const { body, params } = req;

    const { id } = params;
    const { ...data } = body;

    const tag = await Tag.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json(tag);
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = update;
