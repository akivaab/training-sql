const pool = require("../db/dbConnection");

export default async function getPostObject(id) {
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
            author: comment.author,
            date: comment.created_at,
            body: comment.body,
          };
        })
      : [];

  return {
    _id: post.id,
    title: post.title,
    author: post.author,
    date: post.created_at,
    body: post.body,
    comments: comments,
  };
}
