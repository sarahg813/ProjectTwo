var mysql = require("mysql");
var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');


var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({ secret: 'app', cookie: { maxAge: 1*1000*60*60*24*365 }}));
app.use(cookieParser());

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var path = require("path");

app.use(express.static("public"));

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "shelter_db"
});

//   app.get('/', function(req, res){
// 	connection.query('SELECT * FROM pets WHERE ',function (error, results, fields) {
// 	  if (error) throw error;
	  
// 	  res.json(results);
//   })
// });

var homeRoutes = require('./routes/home.js');

var blogRoutes = require('./routes/blogs.js');

var petRoutes = require('./routes/pets.js');


app.use('/', homeRoutes);

app.use('/', blogRoutes);

app.use('/', petRoutes);




app.get('/logout', function(req, res){
	req.session.destroy(function(err) {
	   res.redirect('/')
	})
})