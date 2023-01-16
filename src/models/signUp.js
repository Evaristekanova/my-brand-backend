import mongoose from "mongoose";
const schema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});
const signUp = mongoose.model('Users', schema);
module.exports = signUp;
