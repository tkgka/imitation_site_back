import mongoose from 'mongoose';
const dotenv = require('dotenv').config();

const MONGO_URL = `mongodb+srv://root:${process.env.DBpasswd}@cluster0.ywtqd.mongodb.net/${process.env.database}?retryWrites=true&w=majority`;

module.exports = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((err) => {
      console.log(err);
    });
};
