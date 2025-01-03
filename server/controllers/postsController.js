const pool = require("../db/dbConnection");
const { getAllPostObjects, getPostObject } = require("../db/queryPostObject");

async function getAllPosts(req, res) {
  try {
    const posts = await getAllPostObjects();
    if (!posts) {
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
    const [results] = await pool.query(
      `
      INSERT INTO posts (title, author, body)
      VALUES (?, ?, ?)
      `,
      [req.body.title, req.body.author, req.body.body]
    );

    const newPost = await getPostObject(results.insertId);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create new post" });
  }
}

async function getPost(req, res) {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID was not provided" });
  }
  try {
    const post = await getPostObject(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ message: `No post matches ID ${req.params.id}.` });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
}

async function updatePost(req, res) {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID was not provided" });
  }
  try {
    if (req.body.hasOwnProperty("newComment")) {
      await pool.query(
        `
        INSERT INTO comments (author, body, post_id)
        VALUES (?, ?, ?)
        `,
        [req.body.newComment.author, req.body.newComment.body, req.params.id]
      );
    } else {
      await pool.query(
        `
        UPDATE posts
        SET title = ?, author = ?, body = ?
        WHERE id = ?
        `,
        [req.body.title, req.body.author, req.body.body, req.params.id]
      );
    }

    const post = await getPostObject(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ message: `No post matches ID ${req.params.id}.` });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post" });
  }
}

async function deletePost(req, res) {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID was not provided" });
  }
  try {
    const post = await getPostObject(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ message: `No post matches ID ${req.params.id}.` });
    }

    await pool.query(
      `
      DELETE FROM posts
      WHERE id = ?
      `,
      [req.params.id]
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
}

module.exports = { getAllPosts, createPost, getPost, updatePost, deletePost };
