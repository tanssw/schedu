const mongoose = require('mongoose');

// const conn = mongoose.createConnection(process.env.MONGODB_URI);
const conn = mongoose.createConnection('mongodb://localhost:27017/schedu');

module.exports = conn;