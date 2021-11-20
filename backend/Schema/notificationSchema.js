const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    type: String,
    targets: [String],
    appointmentId: String
}, {
    timestamps: true
})

module.exports = notificationSchema;
