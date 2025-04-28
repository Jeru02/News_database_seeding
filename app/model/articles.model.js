const db = require("../../db/connection")

const selectArticleById = (id) => {
    return db.query(`SELECT * FROM Articles WHERE  article_id = $1`,[id]);
  };

module.exports = { selectArticleById }