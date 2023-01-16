import bcrypt from 'bcrypt'
import signUp from '../models/signUp';
import jwt from'jsonwebtoken';
require('dotenv').config();

exports.postUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const user = await signUp.findOne({ email });
    if (user) return res.json({ message: 'access dineid' });
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const newuser = await signUp.create({
      name,
      email,
      password,
    });
    res.status(201).json({ message: 'new user created successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await signUp.find();
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await signUp.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
exports.editUser = async (req, res) => {
  try {
    const user = await signUp.findById(req.params.id);
    console.log(user);
    let result;
    let data;
    // if(req.body)
    //     result = req.body
    if (req.body.password) {
      let { password } = req.body;
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(req.body.password, salt);
      data = {
        name: result?.name || user.name,
        password: password,
        email: result?.email || user.email,
      };
    } else {
      data = {
        name: result?.name || user.name,
        password: user.password,
        email: result?.email || user.email,
      };
    }
    const updateUser = await signUp.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    updateUser.save();
    res.json(updateUser);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const deleteBlog = await signUp.findById(req.params.id);
    await deleteBlog.remove();
    res.status(200).json(deleteBlog);
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await signUp.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({ message: 'access dineid' });
    }
    const { SECRET_KEY } = process.env;
    jwt.sign({ user }, SECRET_KEY, (err, token) => {
      req.token = token;
      res.json(req.token);
    });
    // res.status(203).json({ message: 'access granted' });
  } catch (err) {
    res.json(err);
  }
};

exports.logout = async (req, res) => {
  try {
    console.log(req.token);
    res.json({ message: 'user loged out' });
  } catch (error) {
    console.log(error);
  }
};
