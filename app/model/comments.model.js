const db = require("../../db/connection");
var format = require("pg-format");
const articles = require("../../db/data/test-data/articles");

const selectCommentsByArticleId = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1;`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `404 Not found: no article was found with id: ${id}`,
        });
      }
      return result;
    });
};

const insertCommentByArticleId = (username, body, id) => {
 
  return db.query(
    `INSERT INTO comments (article_id, body, author) VALUES($1, $2, $3) RETURNING *;`,
    [id, body, username]
  );
};
module.exports = { selectCommentsByArticleId, insertCommentByArticleId };
