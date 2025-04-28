const { selectArticleById } = require("../model/articles.model");

const getArticleById = (req, res) => {
  selectArticleById(req.params.article_id).then((result) => {
    res.status(200).send({ article: result.rows });
  });
};

module.exports = { getArticleById };
