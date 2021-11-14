const mongoose = require("mongoose")
const Schema = mongoose.Schema

const accountSchema = new Schema({
    googleId: String,
    businessId: String,
    firstName: String,
    lastName: String,
    role: String,
    contact: {
        email : String,
        tel: String
    },
    image: String,
    setting: {
        displayTel: Boolean,
        weekendReceive: Boolean,
        activeTime: {
            startAt : String,
            endAt: String
        }
    },
    favorite: []
})

module.exports = accountSchema
