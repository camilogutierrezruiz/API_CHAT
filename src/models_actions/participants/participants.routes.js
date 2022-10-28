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
  .post(
    passport.authenticate('jwt', { session: false }),
    participantsServices.addParticipant
  );

router.route('/:conversation_id/participants/:participant_id')
  .get(
    passport.authenticate('jwt', { session: false }),
    participantsServices.getOneParticipant
  );

// Export Routes
module.exports = router;