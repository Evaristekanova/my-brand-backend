import express from'express';
import upload from '../store/multer';
import blogControllers from '../controllers/blogController';
import verifyToken from '../auth/auth';
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

  // export router to be used in server.js
module.exports = router;
