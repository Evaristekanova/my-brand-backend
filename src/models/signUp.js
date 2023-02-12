import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  isAdmin: {
    type: Boolean,
    required:false
  },
  refreshToken: {
    type: String,
  },
});
const signUp = mongoose.model('Users', schema);
export default signUp;
