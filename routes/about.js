var express = require('express');
var app = express();
var router = express.Router();
var path = require("path");

router.get('/about', function(req, res){
	res.sendFile(path.join(__dirname, "../public/about.html"));
});