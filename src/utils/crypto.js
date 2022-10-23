// Import Bcrypt Package
const bcrypt = require('bcrypt');

// Encript String Password
const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, 10);

// Compare => Login password credentials == hashed pasword database
const comparePassword = (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword);

// Export Bcrypt functions
module.exports = {
  hashPassword,
  comparePassword
};