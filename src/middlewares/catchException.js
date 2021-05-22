const catchException = async (error, message = '') => {
  console.error('\x1b[31m', message, error);
};

module.exports = catchException;
