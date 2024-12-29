const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  })
  .promise();

async function initialize() {
  try {
    const createPostsTable = `
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
        body TEXT NOT NULL,
        PRIMARY KEY (id)
      );`;

    const createCommentsTable = `
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT,
        author VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
        body TEXT NOT NULL,
        post_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (post_id) REFERENCES posts (id)
      );`;

    await pool.query(createPostsTable);
    await pool.query(createCommentsTable);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

initialize();

module.exports = pool;
