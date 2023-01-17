import mongoose from 'mongoose';
const schema = mongoose.Schema({
  commentContent: {
    type: String,
    required: true,
    },
    date: {
        type: Date,
        default: new Date()
    },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blogs',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
});
const comments = mongoose.model('comments', schema);
module.exports = comments;
