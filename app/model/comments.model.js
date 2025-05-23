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
  //check if article exists
  return db
    .query(`SELECT * FROM Articles WHERE  article_id = $1`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `404 not found: no article was found with id: ${id}, post attempt failed`,
        });
      }
      //check if username is valid
      return db
        .query(`SELECT * FROM Users WHERE username = $1`, [username])
        .then((result) => {
          if (result.rows.length === 0) {
            return Promise.reject({
              status: 404,
              msg: `404 not found: no user was found with username: ${username}, post attempt failed`,
            });
          }
        });
    })

    .then(() => {
      return db.query(
        `INSERT INTO comments (article_id, body, author) VALUES($1, $2, $3) RETURNING *;`,
        [id, body, username]
      );
    });
};

const deleteFromComments = (commentId) => {
  return db.query(`DELETE FROM Comments WHERE comment_id = $1 RETURNING *;`, [
    commentId,
  ]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `404 Not found: comment id: ${commentId} is out of range, delete attempt failed`
      });
    }
    return result;
  });;
};
module.exports = {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  deleteFromComments,
};
