const mongoose = require('mongoose')

// const conn = mongoose.createConnection(process.env.MONGODB_URI);
const conn = mongoose.createConnection(`mongodb://localhost:27017/${process.env.SCHEDU_DB_NAME}`)

module.exports = conn
