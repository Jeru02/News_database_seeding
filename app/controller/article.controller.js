const { selectArticleById, selectArticles } = require("../model/articles.model");

const getArticleById = (req, res, next) => {
  selectArticleById(req.params.article_id)
    .then((result) => {
      res.status(200).send({ article: result.rows });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticles = (req, res, next) => {
    selectArticles()
      .then((result) => {
        console.log(result.rows)

        //up to here we have al
        res.status(200).send({ articles: result.rows });
      })
      .catch((err) => {
        next(err);
      });
  };

module.exports = { getArticleById, getArticles};
