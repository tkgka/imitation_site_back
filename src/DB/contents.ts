import mongoose from 'mongoose';
const dotenv = require('dotenv').config();

const { Schema } = mongoose;
const contentSchema: any = new Schema({
  path: {
    type: String,
    unique: true,
    index: true,
    required: true
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
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(process.env.DBCollection, contentSchema);
