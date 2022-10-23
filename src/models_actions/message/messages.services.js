// Import Messages Controller
const messagesController = require('./messages.controller');

// Messages Services Functions
// GET => Messages
const getMessages = (req, res) => {
  const userId = req.user.id;
  const conversationId = req.params.conversation_id;
  messagesController.getAllMessages(userId, conversationId)
    .then(data => {
      data
        ? res.status(200).json(data)
        : res.status(404).json({ message: 'Invalid Conversation_ID' })
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

// GET => One Message
const getOneMessage = (req, res) => {
  const id = req.params.message_id;
  const userId = req.user.id;
  const conversationId = req.params.conversation_id;
  messagesController.getMessageById(id, userId, conversationId)
    .then(data => {
      data
        ? res.status(200).json(data)
        : res.status(400).json({ message: "There's no messages" });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    })
};

// POST => Send Message
const sendMessage = (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;
  const conversationId = req.params.conversation_id;
  if (message && conversationId) {
    messagesController.createMessage({ message, userId, conversationId })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      })
  } else {
    res.status(400).json({ message: "Message field can't be empty" });
  };
};

// DELETE => Message
const deleteMessage = (req, res) => {
  const messageId = req.params.message_id;
  // const userId = req.user.id;
  // const conversationId = req.params.conversation_id;
  messagesController.updateMessage(messageId, { isActive: false })
    .then(data => {
      data[0]
        ? res.status(200).json({ message: 'message deleted' })
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

// Export Messages Services
module.exports = {
  getMessages,
  getOneMessage,
  sendMessage,
  deleteMessage
};