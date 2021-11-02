const mongoose = require('mongoose')
const Schema = mongoose.Schema
const eventSchema = new Schema({
  title: String,
  type: String,
  comm_method: String,
  participants: [String],
  std_participants: [String],
})
const eventModel = mongoose.model('event',eventSchema,'event')
module.exports = eventModel