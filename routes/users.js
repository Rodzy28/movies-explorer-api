const router = require('express').Router();

const {
  updateUserByIdVerification,
} = require('../utils/verification');

const {
  updateUserById,
  getCurrentUser,
} = require('../controllers/user');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserByIdVerification, updateUserById);

module.exports = router;
