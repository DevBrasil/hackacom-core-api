const exception = require('../../../middlewares/catchException');

const User = require('../../../models/User');

const list = async (req, res) => {
  try {
    const { active, sort, page, perPage, fields, filter, ong, location } =
      req.query;

    const options = {
      ...(sort ? { sort } : {}),
      ...(page ? { page } : {}),
      ...(fields ? { select: fields } : {}),
      ...(perPage ? { limit: perPage } : { pagination: false }),
    };

    const query = {
      _id: { $ne: req.tokenUser._id }, // do not return logged user
      deleted: false,
      active: true,
    };
    if (location) {
      const array = location.split(',');

      locationArray = [parseFloat(array[0]), parseFloat(array[1])];
    }

    if (locationArray.length) {
      query.location = {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: locationArray,
          },
          $maxDistance: 30000,
        },
      };
    }

    if (filter) {
      query.$or = [
        { name: { $regex: filter, $options: 'i' } },
        { email: { $regex: filter, $options: 'i' } },
        { phone: { $regex: filter, $options: 'i' } },
      ];
    }

    if (ong) {
      query.ong = ong;
    }

    const user = await User.paginate(query, options);

    return res.status(200).json(user);
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = list;
