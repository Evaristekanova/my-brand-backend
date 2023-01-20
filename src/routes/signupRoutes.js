import express from 'express';
import verifyToken from '../auth/auth';
import signupControllers from '../controllers/signupController';
// import verifyToken from '../auth/auth'

const router = express.Router();

router.route('/all').get(signupControllers.getAllUsers);
router.route('/newUser').post(signupControllers.postUser);
router.route('/user/:id').get(signupControllers.getUser);
router.route('/editUser/:id').put(verifyToken, signupControllers.editUser);
router
  .route('/deleteUser/:id')
  .delete(verifyToken, signupControllers.deleteUser);
module.exports = router;
