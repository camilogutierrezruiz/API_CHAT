// Import Dependencies
const { DataTypes } = require('sequelize');
const db = require('../utils/database');

// Import Model for Foreign Key
const Users = require('./users.models');

// Init Conversations Model
const Conversations = db.define('conversations', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  urlImg: {
    type: DataTypes.STRING,
    field: 'url_image',
    defaultValue: null
  },
  userId: { // Foreign Key
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      key: 'id',
      model: Users
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    field: 'is_active'
  }
});

// Export Conversations Model
module.exports = Conversations;