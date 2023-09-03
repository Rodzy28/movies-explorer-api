const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  INCORRECT_DATA_MOVIE_CREATE_ERROR,
  NOT_MOVIE_BY_ID_ERROR,
  INCORRECT_DATA_MOVIE_DELETE_ERROR,
  NOT_ACCESS_RIGHTS_MOVIE_DELETE_ERROR,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const reqBodyMovie = { ...req.body, owner: req.user._id };

  Movie.create(reqBodyMovie)
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INCORRECT_DATA_MOVIE_CREATE_ERROR));
      }
      return next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_MOVIE_BY_ID_ERROR);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(NOT_ACCESS_RIGHTS_MOVIE_DELETE_ERROR);
      }

      return Movie.findByIdAndDelete(_id)
        .then(() => res.send({ message: `Фильм с id:${_id} - удален!` }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError(INCORRECT_DATA_MOVIE_DELETE_ERROR));
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
