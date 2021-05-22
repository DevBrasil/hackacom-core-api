const exception = require('../../../middlewares/catchException');

const Tag = require('../../../models/Tag');

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findById(id);

    if (!tag) return res.status(404).end();

    return res.status(200).json(tag).end();
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = get;
