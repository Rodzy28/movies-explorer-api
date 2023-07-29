const router = require('express').Router();
const { createUserVerification, loginVerification } = require('../utils/verification');
const userRoutes = require('./users');
const movieRoutes = require('./movie');
const { logIn, signOut, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND_ERROR } = require('../utils/constants');

router.post('/signin', loginVerification, logIn);
router.post('/signup', createUserVerification, createUser);

router.use(auth);

router.post('/signout', signOut);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/*', () => {
  throw new NotFoundError(PAGE_NOT_FOUND_ERROR);
});

module.exports = router;
