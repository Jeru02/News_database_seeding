const db = require("../../db/connection");

const selectArticleById = (id) => {
  return db
    .query(
      `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.body, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count 
    FROM articles
    LEFT JOIN comments ON 
    comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    `,
      [id]
    )
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

const selectArticles = (sortBy, order, query) => {
  //where topic = cats
  if (sortBy === undefined) {
    sortBy = "created_at";
  }
  if (order === undefined) {
    order = "DESC";
  }

  const queryStringA =
    "SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id";

  let queryStringB = ` WHERE topic = '${query}' `;

  const queryStringC = ` GROUP BY articles.article_id ORDER BY articles.${sortBy} ${order};`;
  if (query !== undefined) {
    //check if he topic exists

    return db
      .query(`SELECT * FROM topics WHERE slug = '${query}'`)
      .then((result) => {
        if (result.rows.length > 0) {
          queryStringB = ` WHERE topic = '${query}' `;
        } else {
          return Promise.reject({
            status: 404,
            msg: `404 Not Found: topic does not exist`,
          });
        }
      })
      .then(() => {
        return db
          .query(queryStringA + queryStringB + queryStringC)
          .then((result) => {
            return result;
          });
      });
  } else {
    return db.query(queryStringA + queryStringC).then((result) => {
      return result;
    });
  }
};

const updateArticlebyVotes = (incVotes, id) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING*;`,
      [incVotes, id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Not found: id ${id} is out of range, patch attemp failed`,
        });
      }

      return result;
    });
};

module.exports = { selectArticleById, selectArticles, updateArticlebyVotes };
