const express = require('express');
const mongoose = require('mongoose');
import upload from'../store/multer'
import blogRouter from'./routes/blogRoutes'
import signupRouter from'./routes/signupRoutes'
import messageCRouter from'./routes/messageRoutes'
import signupControllers from './controllers/signupController'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(express.json());

//==============DATABASE CONNECTION =========//
const DB = require('./connection/connection');
mongoose.set('strictQuery', true);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

// ================== ENDPOINTs ===================//
upload.single('image');
app.use('/blog', blogRouter);
app.use('/message', messageCRouter);
app.use('/register', signupRouter);
app.use('/login', signupControllers.login);
app.use('/logout', signupControllers.logout);
app.use((req, res) => {
  res.status(404).json({
    message: 'the page not found',
  });
});

const {PORT} = process.env
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});
