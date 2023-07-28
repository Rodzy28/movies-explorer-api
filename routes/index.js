const router = require('express').Router();
const { createUserVerification, loginVerification } = require('../utils/verification');
const userRoutes = require('./users');
const movieRoutes = require('./movie');
const { logIn, signOut, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', loginVerification, logIn);
router.post('/signup', createUserVerification, createUser);

router.use(auth);

router.post('/signout', signOut);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/*', () => {
  throw new NotFoundError('Page Not Found! :(');
});

module.exports = router;
