const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_ERROR } = require('../utils/constants');
const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEV } = require('../utils/configuration');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR));
  }

  req.user = payload;
  next();
};

module.exports = auth;
