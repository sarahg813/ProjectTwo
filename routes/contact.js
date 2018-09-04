var express = require('express');
var app = express();
var router = express.Router();
var path = require("path");

router.get('/contact', function(req, res){
    res.sendFile(path.join(__dirname, "../public/contact.html"));
});