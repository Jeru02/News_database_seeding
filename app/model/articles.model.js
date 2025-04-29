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

const selectArticles = () => {
  db.query(`SELECT * FROM Articles ;`).then(async (result) => {
    const countPromises = [];

    result.rows.forEach((singleArticle) => {
      countPromises.push(
        db
          .query(
            `SELECT COUNT FROM Articles WHERE article_id = ${singleArticle};`
          )
          .then((result2) => {
            return result2.rows[0].count;
          })
      );
    });

   return Promise.all(countPromises)
  });

 
};

module.exports = { selectArticleById, selectArticles };
