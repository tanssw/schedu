const mongoose = require("mongoose")
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    subject: String,
    sender: String,
    participants: [{
        userId: String,
        main: Boolean,
        confirmed: Boolean
    }],
    startAt: Date,
    endAt: Date,
    commMethod: String,
    commUrl: String,
    note: String
})

module.exports = appointmentSchema
