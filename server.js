var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var bcrypt = require('bcryptjs');

var methodOverride = require('method-override');
app.use(methodOverride('_method'));


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




var homeRoutes = require('./routes/home.js');

var blogRoutes = require('./routes/blogs.js');

var petRoutes = require('./routes/pets.js');

var aboutRoutes = require('./routes/about.js');

var contactRoutes = require('./routes/contact.js');

var petDetailRoutes = require('./routes/pet_detail.js');

var loginRoutes = require('./routes/login.js');

var signupRoutes = require('./routes/signup.js');

var myaccountRoutes = require('./routes/myaccount.js');



app.use('/', homeRoutes);

app.use('/', blogRoutes);

app.use('/', petRoutes);

app.use('/', aboutRoutes);

app.use('/', contactRoutes);

app.use('/', petDetailRoute);

app.use('/', loginRoutes);

app.use('/', signupRoutes);

app.use('/', myaccountRoutes);


// app.get('/logout', function(req, res){
// 	req.session.destroy(function(err) {
// 	   res.redirect('/')
// 	})
// })



app.listen(3000);