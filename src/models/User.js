const mongoose = require('mongoose');
const paginate = require('../config/mongoose-paginate');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, lowercase: true, required: true },
    password: { type: String, select: false, required: true },
    description: { type: String },

    photo: { type: String },
    phone: { type: String },
    address: {
      zipcode: { type: String },
      street_name: { type: String },
      street_number: { type: String },
      neighborhood: { type: String },
      city: { type: String },
      state: { type: String },
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    ong: { type: Boolean },
    location: {
      type: { type: String, enum: ['Point'] },
      coordinates: [],
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.plugin(paginate);
UserSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);
