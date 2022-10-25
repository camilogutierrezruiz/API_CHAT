// Import Dependencies
const uuid = require('uuid');

// Import Models
const Participants = require('../../models/participants.models');

// Controllers
// Get All participants from conversation
const geAllParticipants = async (conversationId) => {
  const data = await Participants.findAll({
    where: { conversationId }
  });
  return data;
};

// Export Controllers
module.exports = {
  geAllParticipants
};