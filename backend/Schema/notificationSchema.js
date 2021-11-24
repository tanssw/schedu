const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema(
    {
        type: String,
        targets: [{ userId: String, response: Boolean }],
        appointmentId: String,
        expireAt: Date
    },
    {
        timestamps: true
    }
)

module.exports = notificationSchema
