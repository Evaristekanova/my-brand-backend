const express = require('express')
const blogControllers = require('../controllers/blogController')
const router = express.Router()

router.route('/').get(blogControllers.getAllBlogs).post(blogControllers.postBlog)

module.exports = router