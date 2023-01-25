import message from '../models/messages';

exports.postMsg = async (req, res) => {
  try {
    const { firstName, secondName, email, messages } = req.body;
    if (!firstName || !secondName || !email || !message) {
      res.json({ message: 'all fields are required' });
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
    res.status(200).json(allMsg);
  } catch (err) {
    console.log(err);
  }
};
exports.getMsg = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.json({ message: 'incorrect id' });
    }
    const msg = await message.findById(req.params.id);
    if (!msg) {
      res.status(404).json({
        status:"message not found",
        message: "the message doesn't exist"
      });
    } else {
      res.status(200).json(msg);
    }
  } catch (err) {
    console.log(err);
  }
};
exports.deleteMsg = async (req, res) => {
  try {
    if (req.params.id.length != 24) {
      res.status(400).json({
        status:"fail",
        message: 'incorrect id'
      });
    }
    const msg = await message.findById(req.params.id);
    if (!msg) {
      res.status(404).json({
        status: 'message not found',
        message: "the message doesn't exist",
      });
    } else {
      const dltMsg = await message.findById(req.params.id);
      dltMsg.remove();
      res.status(200).json({
        status: 'success',
        message: 'message deleted successfully.',
        dltMsg
      });
    }
  } catch (err) {
    console.log(err);
  }
};
