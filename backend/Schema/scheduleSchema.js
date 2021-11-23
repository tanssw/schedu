const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    type: String,
    data: Object
})

module.exports = scheduleSchema
