// Import Dependencies
const uuid = require('uuid');

// Import Models
const Participants = require('../../models/participants.models');
const Users = require('../../models/users.models');

// Controllers
// Get All participants from conversation
const geAllParticipants = async (conversationId) => {
  const data = await Participants.findAll({
    where: { conversationId },
    include: [
      {
        model: Users
      }
    ]
  });
  return data;
};

const addParticipant = async (conversationId, userId) => {
  const data = await Participants.create({
    id: uuid.v4(),
    conversationId,
    userId
  });
  return data;
};

// Export Controllers
module.exports = {
  geAllParticipants,
  addParticipant
};