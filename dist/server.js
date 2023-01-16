"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _multer = _interopRequireDefault(require("./store/multer"));
var _blogRoutes = _interopRequireDefault(require("./routes/blogRoutes"));
var _signupRoutes = _interopRequireDefault(require("./routes/signupRoutes"));
var _messageRoutes = _interopRequireDefault(require("./routes/messageRoutes"));
var _signupController = _interopRequireDefault(require("./controllers/signupController"));
var _connection = _interopRequireDefault(require("./connection/connection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const app = (0, _express.default)();
app.use(_express.default.json());

// ================== ENDPOINTs ===================//
_multer.default.single('image');
app.use('/blog', _blogRoutes.default);
app.use('/message', _messageRoutes.default);
app.use('/register', _signupRoutes.default);
app.use('/login', _signupController.default.login);
app.use('/logout', _signupController.default.logout);
app.use((req, res) => {
  res.status(404).json({
    message: 'the page not found'
  });
});
const {
  PORT
} = process.env;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});