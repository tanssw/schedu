const mongoose = require("mongoose")
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    subject: String,
    sender: String,
    participants: [{
        business_id: String,
        main: Boolean,
        confirmed: Boolean
    }],
    comm_method: String,
    comm_url: String,
    note: String
})

module.exports = appointmentSchema;
