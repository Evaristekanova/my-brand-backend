"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const schema = _mongoose.default.Schema({
  commentContent: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  blog: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'blogs'
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Users'
  },
  userName: {
    type: String
  }
});
const comments = _mongoose.default.model('comments', schema);
module.exports = comments;