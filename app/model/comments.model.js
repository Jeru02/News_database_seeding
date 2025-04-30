const db = require("../../db/connection");

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
module.exports = { selectCommentsByArticleId };
