// Import Ddependencies
const router = require('express').Router();
const passport = require('passport');

// Import Middleware Protected Route
require('../../middlewares/auth.middleware')(passport);

// Import Users Services
const usersServices = require('./users.services');

// Users Services Routes
router.route('/')
  .get(usersServices.getUsers)

// User Services Protected Routes
router.route('/me')
  .get(
    passport.authenticate('jwt', { session: false }),
    usersServices.getMyUSer
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    usersServices.updateMyUser
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    usersServices.deleteMyUser
  );

router.route('/:id')
  .get(usersServices.getOneUser)


// Export User Routes
module.exports = router;
