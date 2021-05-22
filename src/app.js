require('dotenv').config({
  path: '.env',
});
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongo = require('./config/mongo');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan(process.env.LOG_PATTERN || 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

mongo.connect();

module.exports = app;
