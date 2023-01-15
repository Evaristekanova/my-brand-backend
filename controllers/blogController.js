const blogPost = require('../models/blogs');
const cloudinary = require('cloudinary');
const jwt =  require('jsonwebtoken')
const uploads = require('../store/cloudinary');

exports.postBlog = async (req, res) => {
  try {
    const { SECRET_KEY } = process.env;
    jwt.verify(req.token, SECRET_KEY, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      }
    });
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const { title, shortDescription, fullDescription } = req.body;
    // Create new user
    let user = {
      title,
      shortDescription,
      fullDescription,
      imageUrl: result.secure_url,
      cloudinary_id: result.public_id,
    };
    const newBlog = await blogPost.create(user);
    res.status(201).json({ messag: 'blog created successfully' });
  } catch (err) {
    console.log(err);
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogPost.find();
    res.json(allBlogs);
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    console.log(req.path);
    const blog = await blogPost.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogPost.findById(req.params.id);
    await cloudinary.uploader.destroy(blog.cloudinary_id);
    await blog.remove();
    res.json({ messag: 'blog deleted.' });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
exports.updateBlog = async (req, res) => {
  try {
    let blog = await blogPost.findById(req.params.id);
    // Delete image from cloudinary
    console.log(blog);
    await cloudinary.uploader.destroy(blog.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    console.log(result);
    console.log(req.body);
    const { shortDescription, title, fullDescription } = req.body;
    const data = {
      title: title || blog.title,
      shortDescription: shortDescription || blog.shortDescription,
      fullDescription: fullDescription || blog.fullDescription,
      imageUrl: result?.secure_url || blog.imageUrl,
      cloudinary_id: result?.public_id || blog.cloudinary_id,
    };
    blog = await blogPost.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};
