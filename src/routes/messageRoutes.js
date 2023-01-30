import express from 'express';
import verifyToken from '../auth/auth';
import messageControllers from '../controllers/messageController';

const router = express.Router();

router.route('/all').get(verifyToken, messageControllers.getAllMsg);
router.route('/').post(messageControllers.postMsg);
router
  .route('/:id')
  .get(verifyToken, messageControllers.getMsg)
  .delete(verifyToken, messageControllers.deleteMsg);

export default router;
