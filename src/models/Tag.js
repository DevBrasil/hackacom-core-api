const mongoose = require('mongoose');
const paginate = require('../config/mongoose-paginate');

const { Schema } = mongoose;

const TagSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

TagSchema.plugin(paginate);

module.exports = mongoose.model('Tag', TagSchema);
