const mongoose = require('mongoose');
const paginate = require('../config/mongoose-paginate');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, lowercase: true, required: true },
    password: { type: String, select: false, required: true },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    photo: { type: String },
    phone: { type: String },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    }
  },
  { timestamps: true }
);

UserSchema.plugin(paginate);

module.exports = mongoose.model('User', UserSchema);
