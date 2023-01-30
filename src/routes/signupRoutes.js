import express from 'express';
import verifyToken from '../auth/auth';
import signupControllers from '../controllers/signupController';
// import verifyToken from '../auth/auth'

const router = express.Router();

router.route('/all').get(signupControllers.getAllUsers);
router.route('/').post(signupControllers.postUser);
router
  .route('/:id')
  .get(signupControllers.getUser)
  .put(verifyToken, signupControllers.editUser)
  .delete(verifyToken, signupControllers.deleteUser);

export default router;
