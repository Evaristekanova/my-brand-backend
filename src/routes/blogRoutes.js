import express from 'express';
import upload from '../store/multer';
import blogControllers from '../controllers/blogController';
import commentController from '../controllers/commentController';
import verifyToken from '../auth/auth';
const router = express.Router();

router
  .route('/')
  .get(blogControllers.getAllBlogs)
  .post(verifyToken, upload.single('image'), blogControllers.postBlog);
router
  .route('/:id')
  .get(blogControllers.getSingleBlog)
  .put(verifyToken,upload.single('image'), blogControllers.updateBlog)
  .delete(verifyToken,blogControllers.deleteBlog);
router
  .route('/:id/comment')
  .get(commentController.getAllComments)
  .post(verifyToken, commentController.postComment);

// router
//   .route('./:id/comment/')
//   .get(verifyToken, commentController.getComment);

// export router to be used in server.js
module.exports = router;
