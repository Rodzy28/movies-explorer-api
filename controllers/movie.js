const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const reqBodyMovie = { ...req.body };

  Movie.create({ reqBodyMovie, owner: req.user._id })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      }
      return next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  const { moveId } = req.params;

  Movie.findById(moveId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильма с указанным _id не найдена.');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие фильмы! :/');
      }

      return Movie.findByIdAndDelete(moveId)
        .then(() => res.status(200).send(movie))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError('Некорректный запрос'));
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
