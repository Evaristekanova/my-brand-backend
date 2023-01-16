const express = require('express');
const upload = require('../../store/multer');
const blogControllers = require('../controllers/blogController');
const verifyToken = require('../auth/auth');
const router = express.Router();

router
  .route('/')
  .get(blogControllers.getAllBlogs)
  .post(verifyToken, upload.single('image'), blogControllers.postBlog);
router
  .route('/:id')
  .get(blogControllers.getSingleBlog)
  .put(upload.single('image'), blogControllers.updateBlog)
  .delete(blogControllers.deleteBlog);

module.exports = router;
