// Import Dependencies
const uuid = require('uuid');

// Import Users Model
const Users = require('../../models/users.models');

// Import Conversations Model
const Conversations = require('../../models/conversations.models');
const Participants = require('../../models/participants.models');

// Controllers for Conversations Model
// GET => All COnversations
const getAllConversations = async (userId) => {
  const data = await Conversations.findAll({
    where: { userId, isActive: true }
  });
  return data;
};

// GET => Conversation by ID
const getConversationById = async (id, userId) => {
  const data = await Conversations.findOne({
    where: { id, userId, isActive: true },
    include: [
      {
        model: Users,
        attributes: {
          exclude: ['id', 'role', 'status', 'isVerified', 'password', 'createdAt', 'updatedAt']
        }
      },
      {
        model: Participants,
        attributes: ['id'],
        include: [
          {
            model: Users,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ]
      }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'userId']
    }
  });
  return data;
};

// POST => Create Conversation
const createConversation = async (newConversation) => {
  const data = await Conversations.create({
    id: uuid.v4(),
    title: newConversation.title,
    urlImg: newConversation.urlImg,
    userId: newConversation.userId
  })
  return data;
};

// PATCH => Update Convesation
const updateConversation = async (id, conversationToUpdate) => {
  const data = await Conversations.update(conversationToUpdate, { where: { id } });
  return data;
};

// DELETE => Delete Conversation
const deleteConversation = async (id) => {
  const data = await Conversations.destroy({ where: { id } });
  return data;
};

// Export Conversations Controllers
module.exports = {
  getAllConversations,
  getConversationById,
  createConversation,
  updateConversation,
  deleteConversation
};