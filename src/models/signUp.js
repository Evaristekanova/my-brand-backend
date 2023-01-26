import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  token: {
    type: String,
    required: false,
  },
});
const signUp = mongoose.model('Users', schema);
export default signUp;
