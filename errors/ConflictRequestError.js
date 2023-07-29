const { CONFLICT_REQUEST_ERROR_CODE } = require('../utils/constants');

class ConflictRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_REQUEST_ERROR_CODE;
  }
}

module.exports = ConflictRequestError;
