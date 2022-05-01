import mongoose from 'mongoose';
const dotenv = require('dotenv').config();

const { Schema } = mongoose;
const contentSchema: any = new Schema({
  path: {
    type: String,
    required: true,
    index: true,
  },
  tag: {
    type: [String],
    required: false,
    index: true,
  },
  requestMethod: {
    type: String,
    required: false,
    index: true,
  },
  responseCode: {
    type: Number,
    required: true,
    index: true,
  },
  responseHeader: {
    type: [Object],
    required: true,
  },
  responseData: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(process.env.DBCollection, contentSchema);
