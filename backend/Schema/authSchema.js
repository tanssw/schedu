const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TOKEN_TTL = 3600

const authSchema = new Schema({
    token: String,
    userId: String,
    createdAt: Date,
})

authSchema.index({createdAt: 1}, {expireAfterSeconds: TOKEN_TTL})

module.exports = authSchema