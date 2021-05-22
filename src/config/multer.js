const aws = require('aws-sdk');
const s3Storage = require('multer-sharp-s3');

const {
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME
} = process.env;

aws.config.update({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY
});

const s3 = (folder, resize) => s3Storage({
  resize,
  s3: new aws.S3(),
  Bucket: S3_BUCKET_NAME,
  ACL: 'public-read',
  Key: (req, file, cb) => {
    const { tokenUser, body, params } = req;
    const bodyId = body.id;
    const paramsId = params.id;
    const userId = tokenUser._id;

    cb(null, `${folder}/${bodyId || paramsId || userId}`);
  }
});

const fileUpload = (folder = 'public', resize = { width: 1000 }) => ({
  storage: s3(folder, resize)
});

module.exports = fileUpload;
