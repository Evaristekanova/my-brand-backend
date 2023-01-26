import express from 'express';
import upload from '../store/multer';
import blogControllers from '../controllers/blogController';
import commentController from '../controllers/commentController';
import verifyToken from '../auth/auth';

const router = express.Router();

router.route('/all').get(blogControllers.getAllBlogs);
router
  .route('/newBlog')
  .post(verifyToken, upload.single('image'), blogControllers.postBlog);
router.route('/single/:id').get(blogControllers.getSingleBlog);
router
  .route('/update/:id')
  .put(verifyToken, upload.single('image'), blogControllers.updateBlog);

router.route('/delete/:id').delete(verifyToken, blogControllers.deleteBlog);

router.route('/:id/comments').get(commentController.getAllComments);
router
  .route('/:id/newcomment')
  .post(verifyToken, commentController.postComment);

export default router;
