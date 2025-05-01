const express = require("express");
const app = express();
const { getApi } = require("./app/controller/documentation.controller");
const { getTopics } = require("./app/controller/topics.controller");

const {
  getArticleById,
  getArticles,
} = require("./app/controller/article.controller");

const {
  getCommentsByArticleId, postCommentByArticleId
} = require("./app/controller/comments.controller");

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId)




app.use((err, req, res, next) => {
  // forced error
  if (err.status && err.msg) {
    res.status(err.status).send({
      msg: err.msg,
    });
  }

  next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({
      msg: "400 Bad request: make sure you are sending a parameter of type number",
    });
  }
});

module.exports = app;
