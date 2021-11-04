const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  bussiness_id: String,
  firstName: String,
  lastName: String,
  role: String,
  contact: {
      email : String,
      tel: String
},
  image: String,
  setting: {
      display_tel: Boolean,
      weekend_receive: Boolean,
      active_time: {
        start_at : String,
        end_at: String
      }
  }
});

module.exports = usersSchema;
