const express = require('express');
const messageControllers = require('../controllers/messageController');
const router = express.Router();

router
  .route('/')
  .get(messageControllers.getAllMsg)
  .post(messageControllers.postMsg);
router
  .route('/:id')
  .get(messageControllers.getMsg)
  .delete(messageControllers.deleteMsg);

  module.exports = router