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
        model: Users,
        attributes: ['id', 'firstName', 'lastName', 'email', 'profileImg', 'phone']
      }
    ],
    attributes: {
      exclude: ['userId', 'createdAt', 'updatedAt']
    }
  });
  return data;
};

const getparticipantById = async (id, conversationId) => {
  const data = await Participants.findOne({
    where: { id, conversationId },
    include: [
      {
        model: Users,
        attributes: ['id', 'firstName', 'lastName', 'email', 'profileImg', 'phone']
      }
    ],
    attributes: {
      exclude: ['userId', 'createdAt', 'updatedAt']
    }
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

const deleteParticipant = async (id) => {
  return await Participants.destroy({
    where: { id }
  });
};

// Export Controllers
module.exports = {
  geAllParticipants,
  getparticipantById,
  addParticipant,
  deleteParticipant
};