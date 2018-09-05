  var express = require('express');
  var app = express();
  // var router = express.Router();
  var path = require("path");
  var mysql = require('mysql');
  var bcrypt = require('bcryptjs');

  app.use(express.static("public"));

  var methodOverride = require('method-override');
  app.use(methodOverride('_method'));
  
  var multer = require('multer');
  var upload = multer(); 

  app.set('view engine', 'ejs');
  app.set('views','./views');
  
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  var cookieParser = require('cookie-parser');
  var session = require('express-session');
  app.use(session({ 
      secret: 'struggling', 
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 1*1000*60*60*24*3 }}));
  app.use(cookieParser());
  
  var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "shelter_db"
  });
  
  //homepage
  app.get('/', function(req, res){
    res.render('../views/pages/index');
  });
  app.get('/content', function(req, res){
    connection.query('SELECT * FROM pets',function (error, results, fields) {
      if (error) throw error;
        res.json(results);
    })
  });

  app.get('/content/blog', function(req, res){
    connection.query('SELECT * FROM shelter_blogs',function (error, results, fields) {
      if (error) throw error;
        res.json(results);
    })
  });


  //log in 
  app.get('/login', function(req, res){
    res.render('../views/pages/login');
  });
  
  app.post('/userlogin', function(req, res){
    connection.query('SELECT * FROM users WHERE email = ?', [req.body.email],function (error, results, fields) {
  
      if (error) throw error;
      // res.json(results);
      if (results.length == 0){
        res.send('not found');
      }else {
        bcrypt.compare(req.body.pswd, results[0].pswd, function(err, result) {
            if (result == true){
              req.session.username = results[0].username;
              req.session.email = results[0].email;
                //res.send('you are logged in');
              res.redirect('/myaccount');
            }else{
                res.send('Please try again or sign up');
                
            }
        });
      }
    });
  });
  


  //sign up 
  app.get('/signup', function(req, res){
    res.render('../views/pages/signup');
  });
  
  app.post('/createuser', function(req, res){
    console.log(req.body);
  
    bcrypt.genSalt(10, function(err, salt) {
      // res.send(salt);
      bcrypt.hash(req.body.pswd, salt, function(err, p_hash) { 
        // res.send(p_hash);
        connection.query('INSERT INTO users (username, email, home_address, pswd) VALUES (?, ?, ?, ?)', [req.body.username, req.body.email, req.body.home_address, p_hash],function (error, results, fields) {
          
          if (error){
            res.send('you need to use a unique email');
          }else{
            res.send('you have signed up - please go login');
          }
          //res.redirect('/login');
          
        });
      });
    });
  })


  
  //about 
  app.get('/about', function(req, res) {
    res.render('../views/pages/about');
  });


  //blogs
  app.get('/blogs', function(req, res) {
    res.render('../views/pages/blogs');
  });
  

  //contact  
  app.get('/contact', function(req, res) {
    res.render('../views/pages/contact');
  });


  //pets
  app.get('/pets', function(req, res) {
    res.render('../views/pages/pets');
  });


  //pet detail
  app.get('/pet_detail', function(req, res) {
    res.render('../views/pages/pet_detail');
  });

  //myaccount
  app.get('/myaccount', function(req, res){
	
		var user = req.session.username;
		//var email = req.session.email
  res.render('../views/pages/myaccount', 
              {name: user} );
});

//log out
app.get('/logout', function(req, res){
	req.session.destroy(function(err) {
	   res.render('../views/pages/logout');
	})
	
});

// app.use('/', loginRoutes);



// app.get('/logout', function(req, res){
// 	req.session.destroy(function(err) {
// 	   res.redirect('/')
// 	})
// })









  // router.get('/myaccout', function(req, res){
  // 	var user_info = {
  // 		username : req.session.username,
  // 		email: req.session.email
  // 	}
  
  // 	res.json(user_info);
  // });
  
  
  
  



// var homeRoutes = require('./routes/home.js');

// var blogRoutes = require('./routes/blogs.js');

// var petRoutes = require('./routes/pets.js');

// var aboutRoutes = require('./routes/about.js');

// var contactRoutes = require('./routes/contact.js');

// var petDetailRoutes = require('./routes/pet_details.js');

// var loginRoutes = require('./routes/login.js');

// var signupRoutes = require('./routes/signup.js');

// var myaccountRoutes = require('./routes/myaccount.js');


// app.use('/', homeRoutes);

// app.use('/', blogRoutes);

// app.use('/', petRoutes);

// app.use('/', aboutRoutes);

// app.use('/', contactRoutes);

// app.use('/', petDetailRoutes);

// app.use('/', loginRoutes);

// app.use('/', signupRoutes);

// app.use('/', myaccountRoutes);


// app.get('/logout', function(req, res){
// 	req.session.destroy(function(err) {
// 	   res.redirect('/')
// 	})
// })



app.listen(3000);