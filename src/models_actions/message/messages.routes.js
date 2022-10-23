// Init Sequelize Router
const router = require('express').Router();
const passport = require('passport');

// Import Middleware Protected Route
require('../../middlewares/auth.middleware')(passport);

// Import Messages Services
const messagesServices = require('./messages.services');

// Messages Routes
router.route('/:conversation_id/messages')
  .get(
    passport.authenticate('jwt', { session: false }),
    messagesServices.getMessages
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    messagesServices.sendMessage
  );

router.route('/:conversation_id/messages/:message_id')
  .get(
    passport.authenticate('jwt', { session: false }),
    messagesServices.getOneMessage
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    messagesServices.deleteMessage
  );

// Export Messages Routes
module.exports = router;