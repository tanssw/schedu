const mongoose = require('mongoose');

const conn = mongoose.createConnection(`mongodb://localhost:27017/${process.env.IT_CALENDAR_DB_NAME}`);

module.exports = conn;