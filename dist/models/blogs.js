"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const schema = _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cloudinary_id: {
    type: String
  },
  comments: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'comments'
  }]
});
const blopPost = _mongoose.default.model('blogs', schema);
module.exports = blopPost;