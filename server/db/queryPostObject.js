const pool = require("../db/dbConnection");

async function getPostObject(id) {
  try {
    //get post matching id
    const [posts] = await pool.query(
      `
      SELECT *
      FROM posts
      WHERE id = ?
      `,
      [id]
    );
    if (posts.length === 0) {
      return null;
    }
    const post = posts[0];

    //get comments for post
    const [postComments] = await pool.query(
      `
      SELECT *
      FROM comments
      WHERE post_id = ?
      `,
      [id]
    );

    const comments =
      postComments.length > 0
        ? postComments.map((comment) => {
            return {
              id: comment.id,
              author: comment.author,
              date: comment.created_at,
              body: comment.body,
            };
          })
        : [];

    return {
      id: post.id,
      title: post.title,
      author: post.author,
      date: post.created_at,
      body: post.body,
      comments: comments,
    };
  } catch (err) {
    throw err;
  }
}

async function getAllPostObjects() {
  try {
    //get all posts
    const [rows] = await pool.query(
      `
      SELECT 
        p.id AS post_id, 
        p.title AS post_title, 
        p.author AS post_author, 
        p.created_at AS post_created_at, 
        p.body AS post_body,
        c.id AS comment_id, 
        c.author AS comment_author, 
        c.created_at AS comment_created_at, 
        c.body AS comment_body
      FROM posts AS p
      LEFT JOIN comments AS c ON p.id = c.post_id
      `
    );
    if (rows.length === 0) {
      return null;
    }

    const posts = [];
    for (const row of rows) {
      let post = posts.find((p) => p.id === row.post_id);

      if (!post) {
        post = {
          id: row.post_id,
          title: row.post_title,
          author: row.post_author,
          date: row.post_created_at,
          body: row.post_body,
          comments: [],
        };
        posts.push(post);
      }

      if (row.comment_id) {
        post.comments.push({
          id: row.comment_id,
          author: row.comment_author,
          date: row.comment_created_at,
          body: row.comment_body,
        });
      }
    }
    return posts;
  } catch (err) {
    throw err;
  }
}

module.exports = { getAllPostObjects, getPostObject };
