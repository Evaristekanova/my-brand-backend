"use strict";

var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../auth/auth"));
var _signupController = _interopRequireDefault(require("../controllers/signupController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import verifyToken from '../auth/auth'

const router = _express.default.Router();
router.route('/all').get(_signupController.default.getAllUsers);
router.route('/newUser').post(_signupController.default.postUser);
router.route('/user/:id').get(_signupController.default.getUser);
router.route('/editUser/:id').put(_auth.default, _signupController.default.editUser);
router.route('/deleteUser/:id').delete(_auth.default, _signupController.default.deleteUser);
module.exports = router;