import message from '../models/messages';

exports.postMsg = async (req, res) => {
  try {
    const { firstName, secondName, email, messages } = req.body;
    newMsg = await message.create({
      firstName,
      secondName,
      email,
      messages,
    });
    res.status(201).json(newMsg);
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
    const msg = await message.findById(req.params.id);
    res.status(200).json(msg);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteMsg = async (req, res) => {
  try {
    const dltMsg = await message.findById(req.params.id);
    dltMsg.remove();
    res.status(200).json(dltMsg);
  } catch (err) {
    console.log(err);
  }
};
