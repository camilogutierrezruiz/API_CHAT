// Import Users Controller
const usersCotroller = require('./users.controller');

// Services Functions for Users Model
// GET => All Users
const getUsers = (req, res) => {
  usersCotroller.getAllUsers()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

// GET => User by ID
const getOneUser = (req, res) => {
  const id = req.params.id;
  usersCotroller.getUserById(id)
    .then(data => {
      data
        ? res.status(200).json(data)
        : res.status(404).json({ message: 'Invalid ID!' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

// POST => Register User
const registerUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    profileImg,
    phone
  } = req.body;
  if (firstName && lastName && email && password && phone) {
    usersCotroller.createUser({ firstName, lastName, email, password, profileImg, phone })
      .then(data => {
        res.status(201).json({
          message: 'User was created succesfully',
          data
        });
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        firstName: 'STRING',
        lastName: 'STRING',
        email: 'STRING',
        password: 'STRING',
        phone: 'STRING'
      }
    });
  };
};

// Own User Services
// GET => My User
const getMyUSer = (req, res) => {
  const myId = req.user.id;
  usersCotroller.getUserById(myId)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

// PATCH => Update My User
const updateMyUser = (req, res) => {
  const id = req.user.id;
  const newUserInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImg: req.body.profileImg,
    phone: req.body.phone
  };
  usersCotroller.updateUser(id, newUserInfo)
    .then(() => {
      res.status(200).json({ message: 'Your user was updated succesfully!' })
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
};

// Delete My User
const deleteMyUser = (req, res) => {
  const id = req.user.id;
  usersCotroller.updateUser(id, { status: 'inactive' })
    .then(() => {
      res.status(204).json({ message: 'Your user was deleted succesfully!' });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
};

// Export Services
module.exports = {
  getUsers,
  getOneUser,
  registerUser,
  getMyUSer,
  updateMyUser,
  deleteMyUser
};