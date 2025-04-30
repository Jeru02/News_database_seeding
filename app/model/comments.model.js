const db = require("../../db/connection");

const selectCommentsByArticleId = (id) => {
  console.log("<------");
  return db.query(`SELECT * FROM comments WHERE article_id = $1;`, [id]);
};
module.exports = { selectCommentsByArticleId };
