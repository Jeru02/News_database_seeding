const express = require("express");
const app = express();
const { getApi } = require("./app/controller/documentation.controller");
const { getTopics } = require("./app/controller/topics.controller");

const { getArticleById } = require("./app/controller/article.controller");

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.use((err, req, res, next) => {
  // forced errors
  res
    .status(400)
    .send({
      msg: "400 Bad request: make sure you are sending a parameter of type number",
    });
});

module.exports = app;
