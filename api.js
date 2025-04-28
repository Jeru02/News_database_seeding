const express = require('express')
const app = express()
const {getApi} = require('./app/controller/documentation.controller')


app.get("/api", getApi)


module.exports = app