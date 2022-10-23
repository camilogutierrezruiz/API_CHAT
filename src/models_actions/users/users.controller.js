// Import Dependencies
const uuid = require('uuid');
const crypto = require('../../utils/crypto');

// Import Users Model
const Users = require('../../models/users.models');

// Funtions Controllers for Users Model
// GET => All Users
const getAllUsers = async () => {
  const data = await Users.findAll({ where: { status: 'active' } });
  return data;
};

// GET => User by ID
const getUserById = async (id) => {
  const data = await Users.findOne({ where: { id, status: 'active' } });
  return data;
};

// GET => User by Email
const getUserByEmail = async (email) => {
  const data = await Users.findOne({ where: { email, status: 'active' } });
  return data;
};

// POST => Create User
const createUser = async (newUser) => {
  const data = await Users.create({
    id: uuid.v4(),
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: crypto.hashPassword(newUser.password),
    profileImg: newUser.profileImg,
    phone: newUser.phone
  });
  return data;
};

// PATCH => Update User
const updateUser = async (id, user) => {
  const data = await Users.update(user, { where: { id } });
  return data;
};

// DELETE => Delete User
const deleteUser = async (id) => {
  const data = await Users.destroy({ where: { id } });
  return data;
};

// Exports Users Controller
module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};