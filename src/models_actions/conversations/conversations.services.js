// Import Conversations Controller
const conversationsController = require('./conversations.controller');

// Conversations Services
// GET => All Concersations
const getConversations = (req, res) => {
  const userId = req.user.id;
  conversationsController.getAllConversations(userId)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    })
};

// GET => Conversation By ID
const getOneConversation = (req, res) => {
  const id = req.params.id;
  conversationsController.getConversationById(id)
    .then(data => {
      data
        ? res.status(200).json(data)
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    })
};

// POST => Create Conversation
const createConversation = (req, res) => {
  const userId = req.user.id;
  const { title, urlImg } = req.body;
  if (title) {
    conversationsController.createConversation({ title, urlImg, userId })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "Title field can't be empty",
      fiedls: {
        title: 'STRING'
      }
    });
  };
};

// PATCH => Update Conversation
const updateConversation = (req, res) => {
  const id = req.params.id;
  const newConversationInfo = {
    title: req.body.title,
    urlImg: req.body.urlImg
  };
  conversationsController.updateConversation(id, newConversationInfo)
    .then(data => {
      data[0]
        ? res.status(200).json({ message: 'Conversation updated succesfully!' })
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

// DELETE => Delete Conversation isActive from true to false
const deleteConversation = (req, res) => {
  const id = req.params.id;
  conversationsController.updateConversation(id, { isActive: false })
    .then(data => {
      data[0]
        ? res.status(204).json()
        : res.status(404).json({ message: 'Invalid ID' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

// DELETE => Delete Conversation Definitely
const destroyConversation = (req, res) => {
  const id = req.params.id;
  conversationsController.deleteConversation(id)
    .then(() => {
      res.status(204).json();
    })
    .catch(err => {
      res.status(404).json({ message: 'Invalid ID' });
    });
};

// Export Conversations Services
module.exports = {
  getConversations,
  getOneConversation,
  createConversation,
  updateConversation,
  deleteConversation,
  destroyConversation
};