const mongoose = require("mongoose")
const Schema = mongoose.Schema
const notificationSchema = new Schema({
  title: String,
  description: String,
  link_to: String,
  type: String,
  user_oid: String
});

module.exports = notificationSchema;
