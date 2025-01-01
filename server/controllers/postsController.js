const pool = require("../db/dbConnection");

async function getAllPosts(req, res) {
  try {
    const [posts] = await pool.query(`SELECT * FROM posts`);
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
    const [results] = await pool.query(
      `
      INSERT INTO posts (title, author, body)
      VALUES (?, ?, ?)
      `,
      [req.body.title, req.body.author, req.body.body]
    );

    const [newPost] = await pool.query(
      `
      SELECT * 
      FROM posts 
      WHERE id = ?
      `,
      [results.insertId]
    );
    newPost.comments = [];

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

    const [posts] = await pool.query(
      `
      SELECT *
      FROM posts
      WHERE id = ?
      `,
      [req.params.id]
    );
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: `No post matches ID ${req.params.id}.` });
    }
    const post = posts[0];

    const [postComments] = await pool.query(
      `
      SELECT *
      FROM comments
      WHERE post_id = ?
      `,
      [req.params.id]
    );
    post.comments = postComments.length > 0 ? postComments : [];

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

    // const post = await Post.findById(req.params.id).exec();
    // if (!post) {
    //   return res
    //     .status(400)
    //     .json({ message: `No post matches ID ${req.params.id}.` });
    // }
    // if (req.body.title) post.title = req.body.title;
    // if (req.body.author) post.author = req.body.author;
    // if (req.body.body) post.body = req.body.body;
    // if (req.body.comments) post.comments = req.body.comments;
    // const updatedPost = await post.save();

    await pool.query(
      `
      UPDATE posts
      SET title = ?, author = ?, body = ?
      WHERE id = ?
      `,
      [req.body.title, req.body.author, req.body.body, req.params.id]
    );

    //insert new comments into comments table

    res.status(200).json(/*updatedPost*/);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post" });
  }
}

async function deletePost(req, res) {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID was not provided" });
    }

    const [posts] = await pool.query(
      `
      SELECT * 
      FROM posts
      WHERE id = ?
      `,
      [req.params.id]
    );
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: `No post matches ID ${req.params.id}.` });
    }
    const post = posts[0];

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
