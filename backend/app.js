let express = require('express');
let app = express();

let HomeController = require('./controller/homeController');
let ImageController = require('./controller/imageController');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/home', HomeController);
app.use('/img', ImageController);

module.exports = app;
