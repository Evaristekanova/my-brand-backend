const express = require('express')
const signupControllers = require('../controllers/signupController');
const router = express.Router();

router
  .route('/')
  .get(signupControllers.getAllUsers)
  .post(signupControllers.postUser);
router
  .route('/:id')
  .get(signupControllers.getUser)
  .put(signupControllers.editUser)
  .delete(signupControllers.deleteUser);

  module.exports = router