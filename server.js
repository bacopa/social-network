require("dotenv").config();
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "./client")));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


require('./server/config/mongoose.js');
require("./server/config/routes.js")(app);

var server = app.listen(3000, function () {
	console.log("~~ time to talk about yourself on port 3000!! ~~")
})	