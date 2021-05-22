const exception = require('../../../middlewares/catchException');

const User = require('../../../models/User');

const updatePhotoProfile = async (req, res) => {
  try {
    const { tokenUser, params } = req;
    const { id } = params;
    const { Location } = req.file;

    const userId = id || tokenUser._id;

    const user = await User.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ error: 'Usuário não encontrado'});

    if (Location) user.photo = Location;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    exception(error);
    return res.status(500).json(error);
  }
};

module.exports = updatePhotoProfile;
