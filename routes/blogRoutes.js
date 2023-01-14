const express = require('express');
const blogControllers = require('../controllers/blogController');
const router = express.Router();

router
  .route('/')
  .get(blogControllers.getAllBlogs)
  .post(blogControllers.postBlog);
router
  .route('/:id')
  .get(blogControllers.getSingleBlog)
  .put(blogControllers.updateBlog)
  .delete(blogControllers.deleteBlog);

module.exports = router;
