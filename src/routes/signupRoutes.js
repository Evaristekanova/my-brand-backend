import express from 'express'
import signupControllers from '../controllers/signupController'
// import verifyToken from '../auth/auth'

const router = express.Router();

router
  .route('/')
  .get(signupControllers.getAllUsers)
  .post(signupControllers.postUser)
router
  .route('/:id')
  .get(signupControllers.getUser)
  .put(signupControllers.editUser)
  .delete(signupControllers.deleteUser);

module.exports = router;
