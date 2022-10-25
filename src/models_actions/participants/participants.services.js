// Import Controller
const participantsController = require('./participants.controller');

// Services HTTP
// GET => All Participants
const getParticipants = (req, res) => {
  const conversationId = req.params.conversation_id;
  participantsController.geAllParticipants(conversationId)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

// Export Services
module.exports = {
  getParticipants
};