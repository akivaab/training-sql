const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = CommentSchema;
