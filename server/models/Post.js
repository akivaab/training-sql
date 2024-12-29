const mongoose = require("mongoose");
const CommentSchema = require("./Comment");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
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
  comments: {
    type: [CommentSchema],
    default: [],
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
