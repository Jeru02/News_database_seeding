const {
  selectArticleById,
  selectArticles,
  updateArticlebyVotes,
} = require("../model/articles.model");

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
  const query = req.query.topic;
  const sortBy = req.query.sort_by;
  const order = req.query.order;

  selectArticles(sortBy, order, query)
    .then((result) => {
      
      res.status(200).send({ articles: result.rows });
    })
    .catch((err) => {
      
      next(err);
    });
};

const patchVotesByArticleId = (req, res, next) => {
  const incVotes = req.body.inc_votes;
  if (incVotes === undefined || typeof incVotes != "number") {
    next({
      status: 404,
      msg: "404 not found: invalid patch request, make sure you are sending an object with the correct key 'inc_votes' with a Number as the value",
    });
  }
  const id = req.params.article_id;
  updateArticlebyVotes(incVotes, id)
    .then((result) => {
      res.status(201).send({ updatedArticle: result.rows });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticleById, getArticles, patchVotesByArticleId };
