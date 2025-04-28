const express = require('express');
const app = express();
const {getApi} = require('./app/controller/documentation.controller')
const {getTopics} = require("./app/controller/topics.controller")


app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);


module.exports = app