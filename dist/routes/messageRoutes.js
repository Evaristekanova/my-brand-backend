"use strict";

var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../auth/auth"));
var _messageController = _interopRequireDefault(require("../controllers/messageController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.route('/all').get(_auth.default, _messageController.default.getAllMsg);
router.route('/newMessage').post(_messageController.default.postMsg);
router.route('/single/:id').get(_auth.default, _messageController.default.getMsg);
router.route('/deleteMessage/:id').delete(_auth.default, _messageController.default.deleteMsg);
module.exports = router;