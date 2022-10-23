// Dependencies
const express = require('express');
const db = require('./utils/database');

//Files

// Initial configs
const app = express();
app.use(express.json());
const { port } = require('./config');
const initModels = require('./models/initModels');

// Import Routes
const authRouter = require('./auth/auth.routes');
const usersRouter = require('./models_actions/users/users.routes');
const conversationsRouter = require('./models_actions/conversations/conversations.routes');
const messagesRouter = require('./models_actions/message/messages.routes');

// Database Settings
// => Database authentication
db.authenticate()
  .then(() => {
    console.log('Database Authenticated');
  })
  .catch(err => {
    console.log(err);
  });

// => Database synchronization
db.sync({
  // force: true
})
  .then(() => {
    console.log('Database Synced Succesfully');
  })
  .catch(err => {
    console.log(err);
  });

// Init models
initModels();

// Define API prefix
const URL_API = '/api/v1';

app.get(`${URL_API}/`, (req, res) => {
  res.status(200).json({
    message: 'CHAT_APIREST OK!'
  });
});

// API Routes
app.use(`${URL_API}/auth`, authRouter);
app.use(`${URL_API}/users`, usersRouter);
app.use(`${URL_API}/conversations`, conversationsRouter);
app.use(`${URL_API}/conversations`, messagesRouter);


// Init API server
app.listen(port, () => {
  console.log(`Server started at port => ${port}`);
});