"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const schema = _mongoose.default.Schema({
  firstName: {
    type: String
  },
  secondName: {
    type: String
  },
  email: {
    type: String
  },
  messages: {
    type: String
  }
});
const message = _mongoose.default.model('messages', schema);
module.exports = message;