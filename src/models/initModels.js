// Import Models as Dependencies
const Users = require('./users.models');
const Conversations = require('./conversations.models');
const Participants = require('./participants.models');
const Messages = require('./messages.models');

// Extablishig Models Associations
const initModels = () => {
  // 1 : N
  Users.hasMany(Conversations);
  Conversations.belongsTo(Users);

  // M : M
  Users.hasMany(Messages);
  Messages.belongsTo(Users);
  Conversations.hasMany(Messages);
  Messages.belongsTo(Conversations);

  Users.hasMany(Participants);
  Participants.belongsTo(Users);
  Conversations.hasMany(Participants);
  Participants.belongsTo(Conversations);

};

// Export Init Models
module.exports = initModels;