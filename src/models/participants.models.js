// Import Dependencies
const { DataTypes } = require('sequelize');
const db = require('../utils/database');

// Import Models for Foreign Key
const Users = require('./users.models');
const Conversations = require('./conversations.models');

// Init Participants Model
const Participants = db.define('participants', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  conversationId: { // Foreign Key
    type: DataTypes.UUID,
    allowNull: false,
    field: 'conversation_id',
    references: {
      key: 'id',
      model: Conversations
    }
  },
  userId: { // Foreign Key
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      key: 'id',
      model: Users
    }
  }
});

// Export Participants Model
module.exports = Participants;