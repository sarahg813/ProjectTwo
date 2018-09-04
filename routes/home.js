var express = require('express');
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require('mysql');


	var bodyParser = require('body-parser');

	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(bodyParser.json());



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "shelter_db"
});




router.get('/content', function(req, res){
 
	connection.query('SELECT * FROM pets',function (error, results, fields) {
	  if (error) throw error;
	  
      res.json(results);
  })
});


module.exports = router;