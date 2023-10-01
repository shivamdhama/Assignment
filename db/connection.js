const mongoose = require('mongoose');
const config = require('../config.json');

// Database connection
mongoose.connect(config.mongoDBConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const databaseConn = mongoose.connection;

// Checking the status of connection
databaseConn.on('error', console.error.bind(console, 'Error while connecting to mongo database:'));
databaseConn.once('open', () => {
  console.log('Connected to mongo database');
});

module.exports = mongoose;