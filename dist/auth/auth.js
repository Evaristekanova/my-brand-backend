"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Verify Token

_dotenv.default.config();
async function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'undefined') {
    // Forbidden
    return res.status(403).json({
      message: 'Access dineid'
    });
  }
  if (!user.token) {
    return res.status(403).json({
      message: 'Access dineid'
    });
  } else {
    const bearer = bearerHeader.split(' ');
    const {
      SECRET_KEY
    } = process.env;
    const bearerToken = bearer[1];
    const user = await _jsonwebtoken.default.verify(bearerToken, SECRET_KEY);
    req.token = bearerToken;
    req.user = user;
    next();
  }
}
module.exports = verifyToken;