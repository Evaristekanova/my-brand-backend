import express from 'express';
import upload from '../store/multer';
import blogControllers from '../controllers/blogController';
import commentController from '../controllers/commentController';
import { verifyToken, Admin } from '../auth/auth';

const router = express.Router();

router.route('/all').get(blogControllers.getAllBlogs);
router
  .route('/')
  .post(verifyToken, Admin, upload.single('image'), blogControllers.postBlog);

router
  .route('/:id')
  .get(blogControllers.getSingleBlog)
  .delete(verifyToken, Admin, blogControllers.deleteBlog);
router
  .route('/update/?:id')
  .put(verifyToken, Admin, upload.single('image'), blogControllers.updateBlog);

router.route('/:id/comments').get(commentController.getAllComments);
router
  .route('/:id/newcomment')
  .post(verifyToken, commentController.postComment);

export default router;