// Import Dependencies
const crypto = require('../utils/crypto');

// Import Users Controller
const usersController = require('../models_actions/users/users.controller');

// Login User => Receive email && password
const userLogin = async (email, password) => {
  try {
    const user = await usersController.getUserByEmail(email);
    const verifyPassword = crypto.comparePassword(password, user.password);
    if (verifyPassword) {
      return user;
    };
    return false;
  } catch (err) {
    return false;
  }
};

// Export Login Function
module.exports = {
  userLogin
};
