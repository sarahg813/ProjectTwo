// var express = require('express');
// var app = express();
// var router = express.Router();
// var path = require("path");
// var mysql = require('mysql');

// // router.get('/blogs', function(req, res){
// // 	res.sendFile(path.join(__dirname, "../public/blogs.html"));
// // });

// 	var bodyParser = require('body-parser');

// 	app.use(bodyParser.urlencoded({ extended: true }));

// 	app.use(bodyParser.json());



// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "password",
//   database: "shelter_db"
// });

// router.get('/blogs', function(req, res){

//   connection.query('SELECT * FROM ', function (error, results, fields) {
//     if (error) throw error;
    
//     res.json(results);
//   });

// });

// router.get('/questions/:id', function(req, res){
// 	connection.query('SELECT * FROM questions WHERE id = ?', [req.params.id],function (error, results, fields) {
// 	  if (error) throw error;
	  
// 	  res.json(results[0]);
// 	});
// });

// router.get('/new', function(req, res){
// 	res.sendFile(path.join(__dirname, "../public/new.html"));
// });

// router.get('/edit/:id', function(req, res){
// 	res.sendFile(path.join(__dirname, "public/edit.html"));
// });

// router.put('/update/:id', function(req, res){
// 	var query = connection.query(
// 	  "UPDATE questions SET ? WHERE id = ?",
// 	  [req.body, req.params.id],
// 	  function(err, response) {
// 	    res.redirect('/');
// 	  }
// 	);
// });

// router.delete('/delete/:id', function(req, res){

// 	var query = connection.query(
// 	  "DELETE FROM questions WHERE id = ?",
// 	  [req.params.id],
// 	  function(err, response) {
// 	    res.redirect('/');
// 	  }
// 	);

// })



// module.exports = router;