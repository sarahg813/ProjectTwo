var express = require("express");
var app = express();
// var router = express.Router();
var path = require("path");
var mysql = require("mysql");
var bcrypt = require("bcryptjs");

app.use(express.static("public"));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

var multer = require("multer");
var upload = multer();

app.set("view engine", "ejs");
app.set("views", "./views");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cookieParser = require("cookie-parser");
var session = require("express-session");
app.use(
  session({
    secret: "struggling",
    resave: true,
    saveUninitialized: true,
    secure: false,
    cookie: { maxAge: 1 * 1000 * 60 * 60 * 24 * 3 }
  })
);
app.use(cookieParser());

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shelter_db"
  });
}

var port = process.env.PORT || 3300;

process.on("uncaughtException", function(err) {
  console.log(err);
});

//homepage
app.get("/", function(req, res, next) {
  var user = req.session.user;
  res.render("../views/pages/index", { user: user });
});

app.get("/content", function(req, res) {
  connection.query("SELECT * FROM pets", function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/content/blog", function(req, res) {
  connection.query("SELECT * FROM shelter_blogs", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

//log in
app.get("/login", function(req, res) {
  res.render("../views/pages/login");
});

app.post("/userlogin", function(req, res) {
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [req.body.email],
    function(error, results, fields) {
      if (error) throw error;
      // res.json(results);
      if (results.length == 0) {
        res.render("../views/pages/signup_a");
      } else {
        bcrypt.compare(req.body.pswd, results[0].pswd, function(err, result) {
          if (result == true) {
            console.log(results[0]);
            req.session.user = results[0].username;
            req.session.email = results[0].email;
            req.session.id = results[0].id;
            res.redirect("/");
          } else {
            res.render("../views/pages/signup_b");
          }
        });
      }
    }
  );
});

//myaccount
app.get("/myaccount", function(req, res) {
  var email = req.session.email;
  var user = req.session.user;

  res.render("../views/pages/myaccount", {
    user: user,
    email: email
  });
});

app.post("/apply_adopt", function(req, res) {
  //res.json(req.body);
  connection.query(
    "INSERT INTO apply_users (apply_email, apply_info, apply_pet_id) VALUES (?, ?, ?)",
    [req.body.apply_email, req.body.apply_info, req.body.apply_pet_id],
    function(error, results, fields) {
      if (error) {
        res.send("sorry");
      } else {
        res.render("../views/pages/applied");
      }
    }
  );
});

//sign up
app.get("/signup", function(req, res) {
  res.render("../views/pages/signup");
});

app.post("/createuser", function(req, res) {
  //console.log(req.body);

  bcrypt.genSalt(10, function(err, salt) {
    // res.send(salt);
    bcrypt.hash(req.body.pswd, salt, function(err, p_hash) {
      // res.send(p_hash);
      connection.query(
        "INSERT INTO users (username, email, home_address, pswd) VALUES (?, ?, ?, ?)",
        [req.body.username, req.body.email, req.body.home_address, p_hash],
        function(error, results, fields) {
          if (error) {
            res.send("you need to use a unique email");
          } else {
            res.redirect("/");
          }
          //res.redirect('/login');
        }
      );
    });
  });
});

//about
app.get("/about", function(req, res) {
  var user = req.session.user;
  res.render("../views/pages/about", { user: user });
});

//blogs
app.get("/blogs", function(req, res) {
  var user = req.session.user;
  res.render("../views/pages/blogs", { user: user });
});

//contact
app.get("/contact", function(req, res) {
  var user = req.session.user;
  res.render("../views/pages/contact", { user: user });
});

//pets
app.get("/pets", function(req, res) {
  // connection.query('SELECT * FROM pets',function (error, results, fields) {
  //   if (error) throw error;
  //     res.json(results);
  var user = req.session.user;
  res.render("../views/pages/pets", { user: user });
});
app.get("/pets/dog", function(req, res) {
  connection.query(
    "SELECT * FROM pets where pet_type = 'dog' AND adopted = 0",
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});
app.get("/pets/cat", function(req, res) {
  connection.query(
    "SELECT * FROM pets WHERE pet_type = 'cat' AND adopted = 0",
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});
app.get("/pets/other", function(req, res) {
  connection.query(
    "SELECT * FROM pets where pet_type IN ('rabbit', 'bird', 'mouse') AND adopted = 0",
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});
app.get("/pets/adopted", function(req, res) {
  connection.query("SELECT * FROM pets WHERE adopted = 1", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json(results);
  });
});

//pet detail
app.get("/pet_detail/:pet_name", function(req, res) {
  var user = req.session.user;
  connection.query(
    "SELECT * FROM pets WHERE pet_name = ?",
    [req.params.pet_name],
    function(error, results, fields) {
      if (error) throw error;

      var info = results[0];
      var pet_id = info.id;
      var name = info.pet_name;
      var type = info.pet_type;
      var breed = info.breed;
      var age = info.age;
      var sex = info.sex;
      var weight = info.pet_weight;
      var color = info.color;
      var bio = info.pet_bio;
      var img = info.img_url;

      res.render("../views/pages/pet_detail", {
        user: user,
        pet_id: pet_id,
        name: name,
        type: type,
        breed: breed,
        age: age,
        sex: sex,
        weight: weight,
        color: color,
        bio: bio,
        img: img
      });
      //res.json(results[0]);
    }
  );
});

//myaccount
app.get("/myaccount", function(req, res) {
  var user = req.session.username;
  //var email = req.session.email
  res.render("../views/pages/myaccount", { name: user });
});

//log out
app.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
});

app.listen(port, function() {
  console.log("app is running on" + port);
});
