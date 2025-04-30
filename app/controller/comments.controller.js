const {selectCommentsByArticleId} = require("../model/comments.model");

const getCommentsByArticleId = (req, res) => {
    
  selectCommentsByArticleId(req.params.article_id).then((result) => {
    
    res.status(200).send({ comments: result.rows });
  }).catch(err =>{


    console.log(err)
  });
};

module.exports = { getCommentsByArticleId };
