const exception = require('../../../middlewares/catchException');

const Tag = require('../../../models/Tag');

const destroy = async (req, res) => {
  try {
    const { params } = req;

    const { id } = params;

    await Tag.findByIdAndDelete(id);

    return res.status(200).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = destroy;
