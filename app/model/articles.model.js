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
  return db
    .query(
      `SELECT articles.article_id, articles.author, articles title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count 
    FROM articles
    LEFT JOIN comments ON 
    comments.article_id = articles.article_id
    GROUP BY articles.article_id;`
    )
    .then((result) => {
      console.log(result.rows);

      return result;
    });
};

module.exports = { selectArticleById, selectArticles };

