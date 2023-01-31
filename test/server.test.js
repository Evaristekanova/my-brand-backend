import express from 'express';
import dotenv from 'dotenv';
import blogRouter from '../src/routes/blogRoutes';
import signupRouter from '../src/routes/signupRoutes';
import messageCRouter from '../src/routes/messageRoutes';
import signupControllers from '../src/controllers/signupController';
import commentRouter from '../src/controllers/commentController';
import mongoose from 'mongoose';

dotenv.config();
const { TEST_CONNECTION } = process.env;

mongoose.set('strictQuery', true);
const connection = mongoose
  .connect(TEST_CONNECTION, {
    useNewUrlParser: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));
dotenv.config();
const app = express();
app.use(express.json());

// ================== ENDPOINTs ===================//
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/messages', messageCRouter);
app.use('/api/v1/users', signupRouter);
app.use('/api/v1/login', signupControllers.login);
app.use('/api/v1/logout', signupControllers.logout);
// app.use('/', (req, res) => {
//   res.json({message:'welcome to the home page'})
// })
app.use((req, res) => {
  res.status(404).json({
    message: 'the page not found',
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});
export default app;
