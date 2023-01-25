"use strict";

var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("../store/multer"));
var _blogController = _interopRequireDefault(require("../controllers/blogController"));
var _commentController = _interopRequireDefault(require("../controllers/commentController"));
var _auth = _interopRequireDefault(require("../auth/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.route('/all').get(_blogController.default.getAllBlogs);
router.route('/newBlog').post(_auth.default, _multer.default.single('image'), _blogController.default.postBlog);
router.route('/single/:id').get(_blogController.default.getSingleBlog);
router.route('/update/:id').put(_auth.default, _multer.default.single('image'), _blogController.default.updateBlog);
router.route('/delete/:id').delete(_auth.default, _blogController.default.deleteBlog);
router.route('/:id/comments').get(_commentController.default.getAllComments);
router.route('/:id/newcomment').post(_auth.default, _commentController.default.postComment);
module.exports = router;