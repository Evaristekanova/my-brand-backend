"use strict";

var _comments = _interopRequireDefault(require("../models/comments"));
var _blogs = _interopRequireDefault(require("../models/blogs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
exports.postComment = async (req, res) => {
  try {
    const {
      commentContent
    } = req.body;
    const blogId = req.params.id;
    const {
      user
    } = req.user;
    const userId = user._id;
    if (!commentContent || !blogId) {
      res.json({
        message: 'all fields are required'
      });
    } else {
      const newComment = await _comments.default.create({
        commentContent,
        blog: blogId,
        userName: user.name,
        user: userId
      });
      await _blogs.default.updateOne({
        _id: blogId
      }, {
        $push: {
          comments: newComment._id
        }
      });
      res.status(201).json({
        status: 201,
        message: 'comment created successfully',
        comment: newComment
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getAllComments = async (req, res) => {
  try {
    const allComments = await _comments.default.find();
    res.status(200).json(allComments);
  } catch (err) {
    console.log(err);
  }
};
exports.getComment = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.json({
        message: 'incorrect id'
      });
    }
    const comment = await _comments.default.findById(req.params.id);
    if (!comment) {
      res.status(404).json({
        status: 'comment not found',
        message: "the comment doesn't exist"
      });
    } else {
      res.status(200).json(comment);
    }
  } catch (err) {
    console.log(err);
  }
};
exports.deleteComment = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(404).json({
        status: 'invalid id',
        message: 'incorrect id'
      });
    }
    const comment = await _comments.default.findById(req.params.id);
    if (!comment) {
      res.status(404).json({
        status: 'comment not found',
        message: "the comment doesn't exist"
      });
    } else {
      comment.remove();
      res.status(200).json({
        status: 'success',
        message: 'message deleted successfully',
        comment
      });
    }
  } catch (err) {
    console.log(err);
  }
};