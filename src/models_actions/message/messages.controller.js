// Import Dependencies
const uuid = require('uuid');
// Import Models
const Messages = require('../../models/messages.models');
const Users = require('../../models/users.models');
const Conversations = require('../../models/conversations.models');

// Messages Functions
// GET => All Messages
const getAllMessages = async (userId, conversationId) => {
  const data = await Messages.findAll({
    where: { userId, conversationId, isActive: true },
    include: [
      {
        model: Users,
        attributes: ['id', 'firstName', 'lastName', 'email', 'profileImg', 'phone', 'status']
      },
      {
        model: Conversations,
        attributes: ['id', 'title', 'urlImg', 'isActive'],
        include: {
          model: Users,
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImg', 'phone']
        }
      }
    ],
    attributes: {
      exclude: ['userId', 'conversationId']
    }
  });
  return data;
};

// GET => Message By ID
const getMessageById = async (id, userId, conversationId) => {
  const data = await Messages.findOne({
    where: { id, userId, conversationId, isActive: true },
    include: [
      {
        model: Users,
        attributes: ['id', 'firstName', 'lastName', 'email', 'profileImg', 'phone', 'status']
      },
      {
        model: Conversations,
        attributes: ['id', 'title', 'urlImg', 'isActive'],
        include: {
          model: Users,
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImg', 'phone']
        }
      }
    ],
    attributes: {
      exclude: ['userId', 'conversationId']
    }
  })
  return data;
};

// POST => Create Message
const createMessage = async (newMessage) => {
  const data = await Messages.create({
    id: uuid.v4(),
    message: newMessage.message,
    userId: newMessage.userId,
    conversationId: newMessage.conversationId
  });
  return data;
};

// Update Message
const updateMessage = async (messageId, messageToUpdate) => {
  const data = await Messages.update(messageToUpdate, { where: { id: messageId } });
  return data;
};

// Export Messages Functions
module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage
};