const Post = require("../models/Post");

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    if (posts.length === 0) {
      return res.status(204).json({ message: "No posts available" });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function createPost(req, res) {
  if (!req?.body?.title || !req?.body?.author || !req?.body?.body) {
    return res.status(400).json({ message: "Required fields not provided" });
  }
  try {
    const newPost = await Post.create({
      title: req.body.title,
      author: req.body.author,
      date: req.body.date,
      body: req.body.body,
      comments: req.body.comments,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create new post" });
  }
}

async function getPost(req, res) {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID was not provided" });
    }
    const post = await Post.findById(req.params.id).exec();
    if (!post) {
      return res
        .status(400)
        .json({ message: `No post matches ID ${req.params.id}.` });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
}

async function updatePost(req, res) {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID was not provided" });
    }
    const post = await Post.findById(req.params.id).exec();
    if (!post) {
      return res
        .status(400)
        .json({ message: `No post matches ID ${req.params.id}.` });
    }
    if (req.body.title) post.title = req.body.title;
    if (req.body.author) post.author = req.body.author;
    if (req.body.body) post.body = req.body.body;
    if (req.body.comments) post.comments = req.body.comments;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post" });
  }
}

async function deletePost(req, res) {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID was not provided" });
    }
    const deletedPost = await Post.findByIdAndDelete(req.params.id, {
      runValidators: true,
    }).exec();
    if (!deletedPost) {
      return res
        .status(400)
        .json({ message: `No post matches ID ${req.params.id}.` });
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
}

module.exports = { getAllPosts, createPost, getPost, updatePost, deletePost };
