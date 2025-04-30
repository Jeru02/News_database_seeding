const { selectCommentsByArticleId } = require("../model/comments.model");

const getCommentsByArticleId = (req, res, next) => {
  selectCommentsByArticleId(req.params.article_id)
    .then((result) => {
      res.status(200).send({ comments: result.rows });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCommentsByArticleId };
