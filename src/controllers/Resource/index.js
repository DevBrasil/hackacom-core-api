const { Router } = require('express');
const multer = require('multer');
const fileUpload = require('../../config/multer');

const validators = require('../../validators');

const { auth, validate } = require('../../middlewares');

const {
  get,
  list,
  register,
  destroy,
  update,
} = require('./methods');

const router = Router();

router.use(auth())
router.post('/', validate(validators.resource.register), register);
router.get('/', validate(validators.list), list);
router.get('/:id', get);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
