const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema(
    {
        subject: String,
        status: String,
        sender: String,
        participants: [
            {
                userId: String,
                main: Boolean,
                confirmed: Boolean,
                join: Boolean
            }
        ],
        startAt: Date,
        endAt: Date,
        commMethod: String,
        commUrl: String,
        note: String
    },
    {
        timestamps: true
    }
)

module.exports = appointmentSchema
