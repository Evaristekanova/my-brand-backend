import express from 'express';
import { verifyToken, Admin } from '../auth/auth';
import messageControllers from '../controllers/messageController';

const router = express.Router();

router.route('/all').get(verifyToken, Admin, messageControllers.getAllMsg);
router.route('/').post(messageControllers.postMsg);
router
  .route('/:id')
  .get(verifyToken, Admin, messageControllers.getMsg)
  .delete(verifyToken, Admin, messageControllers.deleteMsg);

export default router;
