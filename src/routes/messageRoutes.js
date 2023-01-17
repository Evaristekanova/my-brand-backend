import express from 'express'
import verifyToken from '../auth/auth'
import messageControllers from '../controllers/messageController'
const router = express.Router();

router
  .route('/')
  .get(messageControllers.getAllMsg)
  .post(messageControllers.postMsg);
router
  .route('/:id')
  .get(messageControllers.getMsg)
  .delete(verifyToken,messageControllers.deleteMsg);

  module.exports = router