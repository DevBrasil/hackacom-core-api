const exception = require('../../../middlewares/catchException');

const Tag = require('../../../models/Tag');

const list = async (req, res) => {
  try {
    const { fields, sort, page, perPage, filter } = req.query;

    const options = {
      ...(sort ? { sort } : {}),
      ...(page ? { page } : {}),
      ...(fields ? { select: fields } : {}),
      ...(perPage ? { limit: perPage } : { pagination: false }),
    };

    const query = {};

    if (filter) {
      query.$or = [{ name: { $regex: filter, $options: 'i' } }];
    }

    const tags = await Tag.paginate(query, options);

    return res.status(200).json(tags);
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = list;
