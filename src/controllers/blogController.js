import blogPost from '../models/blogs';
import cloudinary from 'cloudinary';
const jwt = require('jsonwebtoken');
import _uploads from '../store/cloudinary';

exports.postBlog = async (req, res) => {
  try {
    const { SECRET_KEY } = process.env;
    jwt.verify(req.token, SECRET_KEY, (err, _authData) => {
      if (err) {
        return res.status(403).json({ message: 'mismatch of tokens' });
      }
    });
    // Upload image to cloudinary
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
        messag: 'blog created successfully',
        data: newBlog,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getAllBlogs = async (_req, res) => {
  try {
    const allBlogs = await blogPost.find({});
    res.json(allBlogs);
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.json({ message: 'incorrect id' });
    }
    const blog = await blogPost.findById(req.params.id);
    if (!blog) {
      res.json({ message: "the blog doesn't exist" });
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
      res.json({ message: 'incorrect id' });
    }
    const blog = await blogPost.findById(req.params.id);
    if (!blog) {
      res.json({ message: "the blog doesn't exist" });
    } else {
      await cloudinary.uploader.destroy(blog.cloudinary_id);
      await blog.remove();
    }
    res.json({ messag: 'blog deleted.' });
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
      res.json({ message: "the blog doesn't exist" });
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
      res.json({ message: 'blog updated successfully' });
    }
  } catch (err) {
    console.log(err);
  }
};
