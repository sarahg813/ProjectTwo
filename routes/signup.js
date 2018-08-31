var express = require('express');
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "shelter_db"
  });

app.post('/create', function(req, res){
	console.log(req.body);

	var query = connection.query(
	  "INSERT INTO users SET ?",
	  req.body,
	  function(err, response) {
	    res.redirect('/');
	  }
	);
})