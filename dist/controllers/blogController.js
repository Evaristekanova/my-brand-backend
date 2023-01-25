"use strict";

var _cloudinary = _interopRequireDefault(require("cloudinary"));
var _statuses = _interopRequireDefault(require("statuses"));
var _blogs = _interopRequireDefault(require("../models/blogs"));
var _cloudinary2 = _interopRequireDefault(require("../store/cloudinary"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const jwt = require('jsonwebtoken');
exports.postBlog = async (req, res) => {
  try {
    const {
      SECRET_KEY
    } = process.env;
    console.log(req.user, 'from blogController');
    // jwt.verify(req.token, SECRET_KEY, (err, authData) => {
    //   if (err) {
    //     return res.status(403).json({message:"mismatch of tokens"});
    //   }
    // });
    // Upload image to cloudinary
    const result = await _cloudinary.default.uploader.upload(req.file.path);
    const {
      title,
      shortDescription,
      fullDescription
    } = req.body;
    if (!title || !shortDescription || !fullDescription || !result) {
      res.json({
        message: 'all fields are required'
      });
    }
    // Create new user
    else {
      const user = {
        title,
        shortDescription,
        fullDescription,
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id
      };
      const newBlog = await _blogs.default.create(user);
      res.status(201).json({
        status: 'success',
        messag: 'blog created successfully',
        newBlog
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await _blogs.default.find().populate('comments');
    res.json(allBlogs);
  } catch (err) {
    console.log(err);
  }
};
exports.getSingleBlog = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.json({
        message: 'incorrect id'
      });
    }
    const blog = await _blogs.default.findOne({
      _id: req.params.id
    }).populate('comments');
    if (!blog) {
      res.status(404).json({
        status: 'fail',
        message: "the blog doesn't exist"
      });
    } else {
      res.json(blog);
    }
  } catch (err) {
    console.log(err);
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.json({
        message: 'incorrect id'
      });
    }
    const blog = await _blogs.default.findById(req.params.id);
    if (!blog) {
      res.json({
        message: "the blog doesn't exist"
      });
    } else {
      await _cloudinary.default.uploader.destroy(blog.cloudinary_id);
      await blog.remove();
    }
    res.status(400).json({
      status: 'success',
      messag: 'blog deleted.',
      blog
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
exports.updateBlog = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.json({
        message: 'incorrect id'
      });
    }
    let blog = await _blogs.default.findById(req.params.id);
    if (!blog) {
      res.status(400).json({
        status: 'bad request',
        message: "the blog doesn't exist"
      });
    } else {
      // Delete image from cloudinary
      await _cloudinary.default.uploader.destroy(blog.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await _cloudinary.default.uploader.upload(req.file.path);
      }
      const {
        shortDescription,
        title,
        fullDescription
      } = req.body;
      const data = {
        title: title || blog.title,
        shortDescription: shortDescription || blog.shortDescription,
        fullDescription: fullDescription || blog.fullDescription,
        imageUrl: result?.secure_url || blog.imageUrl,
        cloudinary_id: result?.public_id || blog.cloudinary_id
      };
      blog = await _blogs.default.findByIdAndUpdate(req.params.id, data, {
        new: true
      });
      res.status(201).json({
        message: 'blog updated successfully',
        status: 'success',
        blog
      });
    }
  } catch (err) {
    console.log(err);
  }
};