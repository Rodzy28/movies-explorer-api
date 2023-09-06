const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictRequestError = require('../errors/ConflictRequestError');
const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEV } = require('../utils/configuration');
const {
  INCORRECT_DATA_USER_CREATE_ERROR,
  USER_ALREADY_EXISTS_ERROR,
  INCORRECT_DATA_USER_UPDATE_ERROR,
  NOT_USER_BY_ID_ERROR,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashPassword) => {
      User.create({
        name,
        email,
        password: hashPassword,
      })
        .then((newUser) => {
          res.status(201).send(newUser.deletePassword());
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError(INCORRECT_DATA_USER_CREATE_ERROR));
          }
          if (err.code === 11000) {
            return next(new ConflictRequestError(USER_ALREADY_EXISTS_ERROR));
          }
          return next(err);
        });
    });
};

const updateUserById = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_USER_BY_ID_ERROR);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictRequestError(USER_ALREADY_EXISTS_ERROR));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INCORRECT_DATA_USER_UPDATE_ERROR));
      }
      return next(err);
    });
};

const logIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.send(user.deletePassword());
    })
    .catch(next);
};

const signOut = (req, res) => {
  res.clearCookie('token', { domain: 'https://rodzy28.nomoredomainsicu.ru' })
    .send({ message: 'Вы вышли из аккаунта' });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateUserById,
  logIn,
  signOut,
  getCurrentUser,
};
