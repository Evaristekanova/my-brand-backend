import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;
const DB = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.aynlyhe.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);
const connection = mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

module.exports = connection;
