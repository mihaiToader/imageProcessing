var express = require('express');
var app = express();

var HomeController = require('./controller/HomeController');
app.use('/home', HomeController);

module.exports = app;
