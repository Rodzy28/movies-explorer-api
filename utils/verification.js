const { Joi, celebrate } = require('celebrate');

const reg = /https?:\/\/[a-z0-9а-я-._~:\\/?#[\]%@!$&'()*+,;=]*\.[a-z0-9а-я-._~:\\/?#[\]@%!$&'()*+,;=]*/i;

const createUserVerification = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginVerification = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserByIdVerification = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieVerification = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(reg),
    trailerLink: Joi.string().required().regex(reg),
    thumbnail: Joi.string().required().regex(reg),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieVerification = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  createUserVerification,
  loginVerification,
  updateUserByIdVerification,
  createMovieVerification,
  deleteMovieVerification,
};
