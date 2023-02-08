import comments from '../models/comments';
import blopPost from '../models/blogs';
import signupRouter from '../models/signUp';
import signUp from '../models/signUp';

exports.postComment = async (req, res) => {
  try {
    console.log('comments');
    const { commentContent } = req.body;
    console.log(commentContent);
    const blogId = req.params.id;
    const user = req.user;
    const userId = user._id;
    const aUser = await signUp.findOne({ _id: userId });
    console.log(aUser);
    if (!commentContent || !blogId) {
      console.log('no');
      return res.status(200).json({ message: 'this field is required' });
    } else {
      const newComment = await comments.create({
        commentContent,
        blog: blogId,
        userName: aUser.name,
        user: userId,
      });
      console.log(newComment);
      await blopPost.updateOne(
        { _id: blogId },
        {
          $push: { comments: newComment._id },
        }
      );
      res.status(201).json({
        status: 'success',
        message: 'comment created successfully',
        comment: newComment,
      });
    }
  } catch (err) {
    return res.status(403).json(err);
  }
};
exports.getAllComments = async (req, res) => {
  try {
    const allComments = await comments.find();
    res.status(200).json({
      status: 'success',
      length: allComments.length,
      data: allComments,
    });
  } catch (err) {
    return res.status(403).json(err);
  }
};
// exports.getComment = async (req, res) => {
//   try {
//     if (req.params.id.length != 24) {
//       res.json({ message: 'incorrect id' });
//     }
//     const comment = await comments.findById(req.params.id);
//     if (!comment) {
//       res.status(404).json({
//         status: 'comment not found',
//         message: "the comment doesn't exist",
//       });
//     } else {
//       res.status(200).json({
//         status:"success",
//         data:comment
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// exports.deleteComment = async (req, res) => {
//   try {
//     if (req.params.id.length != 24) {
//       res.status(404).json({
//         status: 'invalid id',
//         message: 'incorrect id',
//       });
//     }
//     const comment = await comments.findById(req.params.id);
//     if (!comment) {
//       res.status(404).json({
//         status: 'comment not found',
//         message: "the comment doesn't exist",
//       });
//     } else {
//       comment.remove();
//       res.status(204).json({
//         status: 'success',
//         message: 'message deleted successfully',
//         data:comment,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
