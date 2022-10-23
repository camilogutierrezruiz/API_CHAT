// Import Dependencies
const router = require('express').Router();

// Import Services
const usersServices = require('../models_actions/users/users.services');
const authServices = require('./auth.services');

// Stablishing Routes
router.post('/register', usersServices.registerUser);
router.post('/login', authServices.login);

// Export Routes
module.exports = router;