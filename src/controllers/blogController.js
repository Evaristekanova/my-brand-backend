import cloudinary from 'cloudinary';
import status from 'statuses';
import blogPost from '../models/blogs';
import uploads from '../store/cloudinary';

const jwt = require('jsonwebtoken');

exports.postBlog = async (req, res) => {
  try {
    const { SECRET_KEY } = process.env;
    const result = await cloudinary.uploader.upload(req.file.path);
    const { title, shortDescription, fullDescription } = req.body;
    if (!title || !shortDescription || !fullDescription || !result) {
      res.json({ message: 'all fields are required' });
    }
    // Create new user
    else {
      const user = {
        title,
        shortDescription,
        fullDescription,
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id,
      };
      const newBlog = await blogPost.create(user);
      res.status(201).json({
        status: 'success',
        messag: 'blog created successfully',
        dats:newBlog,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogPost.find().populate('comments');
    res.status(200).json({
      status: "success",
      length:allBlogs.length,
      data:allBlogs
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.json({ message: 'incorrect id' });
    }
    const blog = await blogPost
      .findOne({ _id: req.params.id })
      .populate('comments');
    if (!blog) {
      res.status(404).json({
        status: 'fail',
        message: "the blog doesn't exist",
      });
    } else {
      res.status(200).json({
        status: "success",
        data:blog
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.json({ message: 'incorrect id' });
    }
    const blog = await blogPost.findById(req.params.id);
    if (!blog) {
      res.json({ message: "the blog doesn't exist" });
    } else {
      await cloudinary.uploader.destroy(blog.cloudinary_id);
      await blog.remove();
    }
    res.status(204).json({
      status: 'success',
      messag: 'blog deleted.',
      data:blog,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
exports.updateBlog = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.json({ message: 'incorrect id' });
    }
    let blog = await blogPost.findById(req.params.id);
    if (!blog) {
      res.status(400).json({
        status: 'bad request',
        message: "the blog doesn't exist",
        data:blog
      });
    } else {
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(blog.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      const { shortDescription, title, fullDescription } = req.body;
      const data = {
        title: title || blog.title,
        shortDescription: shortDescription || blog.shortDescription,
        fullDescription: fullDescription || blog.fullDescription,
        imageUrl: result?.secure_url || blog.imageUrl,
        cloudinary_id: result?.public_id || blog.cloudinary_id,
      };
      blog = await blogPost.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      res.status(200).json({
        message: 'blog updated successfully',
        status: 'success',
        data:blog,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
