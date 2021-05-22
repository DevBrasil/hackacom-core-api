/* eslint-disable no-console */
require('dotenv').config('.env');
const { HOST, NODE_ENV, PORT = 4000 } = process.env;

const express = require('express');
const app = require('./src/app');

app.use('/docs', express.static(__dirname + '/docs'));

app.listen(PORT, () => {
  console.warn(`[API] Server is running at ${HOST}:${PORT}`);

  if (NODE_ENV !== 'dev') console.log = function () {};
});
