const mongoose = require("mongoose")
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    subject: String,
    sender: String,
    receiver: String,
    participants: Array,
    comm_method: String,
    comm_url: String,
    note: String
})

module.exports = appointmentSchema;
