"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const schema = _mongoose.default.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: String,
    required: false
  }
});
const signUp = _mongoose.default.model('Users', schema);
module.exports = signUp;