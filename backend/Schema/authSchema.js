const mongoose = require("mongoose")
const Schema = mongoose.Schema

const authSchema = new Schema({
    token: String,
    userId: String,
    createAt: Date,
    expireAt: Date
})

module.exports = authSchema