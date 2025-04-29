const db = require("../../db/connection");

const selectArticleById = (id) => {
  return db
    .query(`SELECT * FROM Articles WHERE  article_id = $1`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Not found: id ${id} is out of range`,
        });
      }

      return result;
    });
};

module.exports = { selectArticleById };
