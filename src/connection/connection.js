import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, NODE_ENV, TEST_CONNECTION } = process.env;
const DB = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.aynlyhe.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);
const connection = mongoose
  .connect(NODE_ENV==='test'?TEST_CONNECTION:DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

export default connection;
