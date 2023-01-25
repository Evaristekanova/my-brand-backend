"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME
} = process.env;
const DB = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.aynlyhe.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
_mongoose.default.set('strictQuery', true);
const connection = _mongoose.default.connect(DB, {
  useNewUrlParser: true
}).then(() => console.log('connected')).catch(err => console.log(err));
module.exports = connection;