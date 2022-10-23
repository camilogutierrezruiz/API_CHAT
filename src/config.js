// Import Dependencies
require('dotenv').config();

// Configure environtment valiables
const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 1969,
  jwtSecret: process.env.JWT_SECRET,
  db: {
    port: process.env.DB_PORT || 5432,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    dbName: process.env.DB_NAME
  }
};

// Export environtment variables
module.exports = config;