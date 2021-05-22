const { Router } = require('express');
const multer = require('multer');
const fileUpload = require('../../config/multer');

const validators = require('../../validators');

const { auth, validate } = require('../../middlewares');

const {
  updatePassword,
  forgotPassword,
  recoverPassword,
  get,
  list,
  login,
  register,
  destroy,
  update,
  updatePhotoProfile,
} = require('./methods');

const router = Router();

router.post('/', validate(validators.user.register), register);
router.post('/login', login);

router.post('/forgot', forgotPassword);
router.post('/recover', recoverPassword);

router.get('/me', auth(), get);
router.put('/me', auth(), update);
router.put('/me/password', auth(), updatePassword);
router.post(
  '/me/photo',
  auth(),
  multer(fileUpload('profile')).single('photo'),
  updatePhotoProfile
);
router.delete('/me', auth(), destroy);

router.get('/', auth(['admin', 'user']), list);
router.get('/:id', auth(['admin']), get);
router.put('/:id', auth(['admin']), update);
router.put('/:id/password', auth(['admin']), updatePassword);
router.post(
  '/:id/photo',
  auth(['admin']),
  multer(fileUpload('profile')).single('photo'),
  updatePhotoProfile
);
router.delete('/:id', auth(['admin']), destroy);

module.exports = router;
