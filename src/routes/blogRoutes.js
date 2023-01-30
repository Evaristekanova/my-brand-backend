import express from 'express';
import upload from '../store/multer';
import blogControllers from '../controllers/blogController';
import commentController from '../controllers/commentController';
import verifyToken from '../auth/auth';

const router = express.Router();

router.route('/all').get(blogControllers.getAllBlogs);
router
  .route('/')
  .post(verifyToken, upload.single('image'), blogControllers.postBlog);

router
  .route('/:id')
  .get(blogControllers.getSingleBlog)
  .delete(verifyToken, blogControllers.deleteBlog);
router
  .route('/update/:id')
  .put(verifyToken, upload.single('image'), blogControllers.updateBlog);


router.route('/:id/comments').get(commentController.getAllComments);
router
  .route('/:id/newcomment')
  .post(verifyToken, commentController.postComment);

export default router;
