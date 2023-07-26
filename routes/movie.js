const router = require('express').Router();
const {
  createCardVerification,
  likeDislikeAndDeleteVerification,
} = require('../utils/verification');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movie');

router.get('/', getMovies);
router.post('/', createCardVerification, createMovie);
router.delete('/:moveId', likeDislikeAndDeleteVerification, deleteMovieById);
module.exports = router;
