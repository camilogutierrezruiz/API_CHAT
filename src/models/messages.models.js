// Import Dependencies
const { DataTypes } = require('sequelize');
const db = require('../utils/database');

// Import Models for Foreign Keys
const Users = require('./users.models');
const Conversations = require('./conversations.models');

// Init Messages Model
const Messages = db.define('messages', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: { // Foreign Key
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: Users,
      key: 'id'
    }
  },
  conversationId: { // Foreign Key
    type: DataTypes.UUID,
    allowNull: false,
    field: 'conversation_id',
    references: {
      model: Conversations,
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_active',
    defaultValue: true
  }
});

// Export Messages Model
module.exports = Messages;