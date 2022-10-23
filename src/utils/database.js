// Sequelize dependecy & environtment variables configuration
const { Sequelize } = require('sequelize');
const config = require('../config');

// Instanciate new sequelize database object
const db = new Sequelize({
  dialect: 'postgres',
  host: config.db.host,
  username: config.db.username,
  password: config.db.password,
  database: config.db.dbName
});

// Export database object
module.exports = db;