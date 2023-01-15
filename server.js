const express = require('express');
const mongoose = require('mongoose');
const upload = require('./store/multer');
const blogRouter = require('./routes/blogRoutes');
const signupRouter = require('./routes/signupRoutes');
const messageCRouter = require('./routes/messageRoutes');
const signupControllers = require('./controllers/signupController');
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
app.listen(8000, () => {
  console.log('server is running...');
});
