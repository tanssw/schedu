const mongoose = require('mongoose');

// const conn = mongoose.createConnection(process.env.MONGODB_URI);
const conn = mongoose.createConnection('mongodb://localhost:27017/IT_Calendar');
// const eventModel = mongoose.model('event',eventConn,'event')

module.exports = conn;