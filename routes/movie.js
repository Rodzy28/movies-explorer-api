const router = require('express').Router();

const {
  createMovieVerification,
  deleteMovieVerification,
} = require('../utils/verification');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movie');

router.get('/', getMovies);
router.post('/', createMovieVerification, createMovie);
router.delete('/:_id', deleteMovieVerification, deleteMovieById);

module.exports = router;
