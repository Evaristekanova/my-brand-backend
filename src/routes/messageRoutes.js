import express from 'express';
import verifyToken from '../auth/auth';
import messageControllers from '../controllers/messageController';

const router = express.Router();

router.route('/all').get(verifyToken, messageControllers.getAllMsg);
router.route('/newMessage').post(messageControllers.postMsg);
router.route('/single/:id').get(verifyToken, messageControllers.getMsg);
router
  .route('/deleteMessage/:id')
  .delete(verifyToken, messageControllers.deleteMsg);

export default router;
