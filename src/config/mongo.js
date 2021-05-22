const mongoose = require('mongoose');

const { MONGO_URI, MONGO_DB } = process.env;

const uri = `${MONGO_URI}/${MONGO_DB}`;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const connect = async () => {
  return mongoose
    .connect(uri, config)
    .then(() => console.warn('[API] MongoDB connected!'))
    .catch((err) => console.error('[API] Erro on connect DB', err));
};

module.exports = {
  connect,
  uri,
  config,
};
