const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = {
  customLabels: {
    docs: 'data',
    totalDocs: 'total',
  },
};

module.exports = mongoosePaginate;
