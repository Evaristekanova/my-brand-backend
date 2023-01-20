"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _blogRoutes = _interopRequireDefault(require("./routes/blogRoutes"));
var _signupRoutes = _interopRequireDefault(require("./routes/signupRoutes"));
var _messageRoutes = _interopRequireDefault(require("./routes/messageRoutes"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _signupController = _interopRequireDefault(require("./controllers/signupController"));
var _commentController = _interopRequireDefault(require("./controllers/commentController"));
var _connection = _interopRequireDefault(require("./connection/connection"));
var _swagger = require("./documentation/swagger.doc");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import options from './documentation/register';

// import swaggerDocumentation from '../helper/documentation.js';
_dotenv.default.config();
const app = (0, _express.default)();
app.use(_express.default.json());

// ================== ENDPOINTs ===================//
app.use('/doc', _swagger.docrouter);
// app.use('/documentation', swaggerUI.serve, swaggerUI.setup(options));
// app.use(
//   '/documentation',
//   swaggerUI.serve,
//   swaggerUI.setup(swaggerDocumentation)
// );
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