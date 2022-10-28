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

const getOneParticipant = (req, res) => {
  const id = req.params.participant_id;
  const conversationId = req.params.conversation_id;
  participantsController.getparticipantById(id, conversationId)
    .then(data => {
      data
        ? res.status(200).json(data)
        : res.status(404).json({ message: 'Invalid ID' })
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    });
};

const addParticipant = (req, res) => {
  const userId = req.body.id;
  const conversationId = req.params.conversation_id;
  participantsController.addParticipant(conversationId, userId)
    .then(data => {
      res.status(201).json({
        message: 'User c5a617e4-801f-4e8e-9885-2617a29288c0 add to conversation'
      });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

const deleteParticipant = (req, res) => {
  const id = req.params.participant_id;
  participantsController.deleteParticipant(id)
    .then(() => {
      res
        .status(204)
        .json({ message: `Participant with id ${id} has been deleted!` });
    })
    .catch(err => {
      res
        .status(400)
        .json({ message: err.message });
    });
};

// Export Services
module.exports = {
  getParticipants,
  getOneParticipant,
  addParticipant,
  deleteParticipant
};