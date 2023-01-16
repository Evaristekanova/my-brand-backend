import mongoose from "mongoose";
const schema = mongoose.Schema({
  firstName: { type: String },
  secondName: { type: String },
  email: { type: String },
  messages: { type: String },
});
const message = mongoose.model('messages', schema);
module.exports = message;
