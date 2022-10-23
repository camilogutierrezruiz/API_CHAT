// Import Dependencies
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Import Authenticartion Controller
const authController = require('./auth.controller');

// POST => User Login Service
const login = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    authController.userLogin(email, password)
      .then(response => {
        if (response) {
          const token = jwt.sign({
            id: response.id,
            email: response.email,
            role: response.role
          }, jwtSecret);
          res.status(200).json({
            message: 'Credentials OK!',
            token
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials!' });
        };
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({ message: 'Missing Data' });
  };
};

// Export Login Function
module.exports = {
  login
};