const { parse } = require("dotenv");
const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
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

  
  insertCommentByArticleId(username, body, id).then((result) => {

    
    res.status(201).send({ comment: result.rows[0] });
  }).catch((err)=>{


    next(err)

  });
};

module.exports = { getCommentsByArticleId, postCommentByArticleId };
