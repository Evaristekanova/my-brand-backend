import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemon from 'nodemon';
import signUp from '../models/signUp';

require('dotenv').config();

exports.postUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: 'All field are required' });
    }
    const user = await signUp.findOne({ email });
    if (user)
      return res.status(400).json({
        status: 'fail',
        error: 'Email already taken',
      });
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const newuser = await signUp.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      status: 'success',
      message: 'new user created successfully',
      data: newuser,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await signUp.find();
    res.status(200).json({
      status: 'success',
      length: allUsers.length,
      data: allUsers,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getUser = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'provide id' });
    if (req.params.id.length != 24) {
      return res.status(400).json({ message: 'incorrect id' });
    }
    const user = await signUp.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "the user doesn't exist" });
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.editUser = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'provide id' });
    if (req.params.id.length != 24) {
      return res.status(400).json({ message: 'incorrect id' });
    }
    const user = await signUp.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "the user doesn't exist" });
    }
    let result;
    let data;
    if (req.body) result = req.body;
    if (req.body.password) {
      let { password } = req.body;
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(req.body.password, salt);
      data = {
        name: result?.name || user.name,
        password,
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
    res.status(200).json({
      status: 'success',
      message: 'user updated successfully',
      data: updateUser,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: 'provide id' });
    if (req.params.id.length != 24) {
      return res.status(400).json({ message: 'incorrect id' });
    }
    const user = await signUp.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "the user doesn't exist" });
    } else {
      await user.remove();
      res.status(204).json({
        status: 'success',
        message: 'user deleted successfully',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { SECRET_KEY } = process.env;
    const cookie = req.headers?.cookie;
    let ActiveRefreshToken;
    if (cookie) {
      let cookieValues = cookie.split(';');
      ActiveRefreshToken = cookieValues
        .find((value) => value.startsWith('refreshToken'))
        .substring(13);
    }
    if (ActiveRefreshToken) {
      let user = await signUp
        .findOne({
          refreshToken: ActiveRefreshToken,
        })
        .exec();
      if (user) {
        const accessToken = jwt.sign(
          { _id: user._id, email: user.email, isAdmin: user.isAdmin },
          SECRET_KEY,
          { expiresIn: '3600s' }
        );
        res.status(200).json({ message: 'welcome', data: accessToken });
      } else {
        res.clearCookie('refreshToken');
        res.sendStatus(403);
      }
    } else {
      //in case the user has been logged out
      const email = req.body.email;
      const password = req.body.password;
      if (!email || !password) {
        return res.json({ message: 'enter email and password' });
      }
      let user = await signUp.findOne({ email }).exec();
      if (user) {
        const checkedpassword = await bcrypt.compare(password, user.password);
        if (checkedpassword) {
          //generate tokens
          const accessToken = jwt.sign(
            { _id: user._id, email: user.email, isAdmin: user.isAdmin },
            SECRET_KEY,
            { expiresIn: '3600s' }
          );
          const refreshToken = jwt.sign(
            { _id: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: '10d' }
          );
          //store refresh token in cookies
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 2000,
          });
          //store refreshToken in databse
          user.refreshToken = refreshToken;
          await user.save();
          res.status(200).json({ message: 'welcome', data: accessToken });
        }
      } else {
        res.json({ message: 'incorrect username and password' });
      }
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.logout = async (req, res) => {
  const cookie = req.headers?.cookie;
  if (cookie) {
    let cookieValues = cookie.split(';');
    const ActiveRefreshToken = cookieValues
      .find((value) => value.startsWith('refreshToken'))
      .substring(13);
    if (!ActiveRefreshToken) return res.json({ message: 'logged out' });
    let user = await signUp.findOne({ refreshToken: ActiveRefreshToken }).exec();
    //delete refresh token in databse
    user.refreshToken = '';
    await user.save();
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'you\'ve logged out' });
    res.end();
  }
};
