import message from '../models/messages';

exports.postMsg = async (req, res) => {
  try {
    const { firstName, secondName, email, messages } = req.body;
    if (!firstName || !secondName || !email || !messages) {
      res.status(204).json({ message: 'all fields are required' });
    } else {
      const newMsg = await message.create({
        firstName,
        secondName,
        email,
        messages,
      });
      res.status(201).json({
        status: 'success',
        message: 'message sent',
        data: newMsg,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getAllMsg = async (req, res) => {
  try {
    const allMsg = await message.find();
    res.status(200).json({
      status: 'success',
      length: allMsg.length,
      data: allMsg,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getMsg = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'provide id' });
    if (req.params.id.length != 24) {
      return res.status(404).json({ message: 'incorrect id' });
    }
    const msg = await message.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({
        status: 'message not found',
        message: "the message doesn't exist",
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: msg,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.deleteMsg = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'provide id' });
    if (req.params.id.length != 24) {
      return res.status(400).json({
        status: 'fail',
        message: 'incorrect id',
      });
    }
    const msg = await message.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({
        status: 'message not found',
        message: "the message doesn't exist",
      });
    } else {
      const dltMsg = await message.findById(req.params.id);
      dltMsg.remove();
      res.status(200).json({
        status: 'success',
        message: 'message deleted successfully.',
        data: dltMsg,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
