const { selectArticleById } = require("../model/articles.model");

const getArticleById = (req, res, next) => {
  selectArticleById(req.params.article_id)
    .then((result) => {
      res.status(200).send({ article: result.rows });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticleById };
