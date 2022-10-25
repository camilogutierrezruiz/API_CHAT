// Import Dependencies
const router = require('express').Router();
const passport = require('passport');

// Import Middleware Protected Route
require('../../middlewares/auth.middleware')(passport);

// Import Services
const participantsServices = require('./participants.services');

// Routes
router.route('/:conversation_id/participants')
  .get(
    passport.authenticate('jwt', { session: false }),
    participantsServices.getParticipants
  )
  .post();

router.route('/:conversation_id/participants/:participant_id')
  .get();

// Export Routes
module.exports = router;