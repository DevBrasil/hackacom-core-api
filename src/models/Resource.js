const mongoose = require('mongoose');
const paginate = require('../config/mongoose-paginate');

const { Schema } = mongoose;

const ResourceSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

ResourceSchema.plugin(paginate);

module.exports = mongoose.model('Resource', ResourceSchema);
