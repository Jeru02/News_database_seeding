const { parse } = require("dotenv");
const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  deleteFromComments,
} = require("../model/comments.model");

const getCommentsByArticleId = (req, res, next) => {
  selectCommentsByArticleId(req.params.article_id)
    .then((result) => {
      res.status(200).send({ comments: result.rows });
    })
    .catch((err) => {
      next(err);
    });
};

const postCommentByArticleId = (req, res, next) => {
  const username = req.body.username;
  const body = req.body.body;
  const id = parseInt(req.params.article_id);

  if (body === "") {
    next({
      status: 400,
      msg: `400 Bad request: no body provided`,
    });
  } else {
    insertCommentByArticleId(username, body, id)
      .then((result) => {
        res.status(201).send({ comment: result.rows[0] });
      })
      .catch((err) => {
        next(err);
      });
  }
};

const deleteCommentByCommentId = (req, res) => {
  const commentId = req.params.comment_id;
  deleteFromComments(commentId).then((result) => {
    res.status(204).send();
  });
};

module.exports = {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentByCommentId,
};
