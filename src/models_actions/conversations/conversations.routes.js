// Import Ddependencies
const router = require('express').Router();
const passport = require('passport');

// Import Middleware Protected Route
require('../../middlewares/auth.middleware')(passport);

// Import Conversarions Services
const conversationsServices = require('./conversations.services');

// Conversarions Routes
router.route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    conversationsServices.getConversations
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    conversationsServices.createConversation
  );

router.route('/:id')
  .get(
    passport.authenticate('jwt', { session: false }),
    conversationsServices.getOneConversation
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    conversationsServices.updateConversation
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    conversationsServices.deleteConversation
  );

router.route('/delete/:id')
  .delete(
    passport.authenticate('jwt', { session: false }),
    conversationsServices.destroyConversation
  );

// Export Conversations Router
module.exports = router;