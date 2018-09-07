var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "shelter_db"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("connected as id " + connection.threadId + "\n");
        showDatabase();
    }
});

function showDatabase() {
    {
        inquirer.prompt({
            name: "action",
            type: "list",
            message: "Hello! What do you want to do?",
            choices: ["Post new animal", 'Post new blog', "Assign animal", 'Exit']
        }).then(function(data) {
            switch (data.action) {
                case 'Post new animal':
                    PostAnimal(function(){
                        showDatabase()
                    });
                    break;
                case 'Post new blog':
                    PostBlog(function(){
                        showDatabase()
                    });
                    break;
                case 'Assign animal':
                    assignAnimal();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }
        })
    };
}

function PostAnimal() {
    inquirer.prompt([{
        name: 'pet',
        type: 'text',
        message: 'Please enter the name of the pet.'
    }, {
        name: 'type',
        type: 'text',
        message: 'Please enter the type of the pet.'
    }, {
        name: 'breed',
        type: 'text',
        message: 'Please enter the breed.'
    }, {
        name: 'age',
        type: 'text',
        message: 'Plese enter the age of the pet.'
    }, {
        name: 'sex',
        type: 'text',
        message: 'Please enter the sex.'
    }, {
        name: 'weight',
        type: 'text',
        message: 'Please enter the weight.'
    }, {
        name: 'color',
        type: 'text',
        message: 'Please enter the color of the pet.'
    }, {
        name: 'bio',
        type: 'text',
        message: 'Please enter the bio.'
    }, {
        name: 'adopted',
        type: 'text',
        message: 'Please enter 0 here.'
    }, {
        name: 'url',
        type: 'text',
        message: 'Please enter the img url.'
    }]).then(function(animal) {
        var item = {
                pet_name: animal.pet,
                pet_type: animal.type,
                breed: animal.breed,
                age: animal.age,
                sex: animal.sex,
                pet_weight: animal.weight,
                color: animal.color,
                pet_bio: animal.bio,
                adopted: animal.adopted,
                img_url: animal.url,
            }
        connection.query('INSERT INTO pets SET ?', item,
            function(err) {
                if (err) throw err;
                console.log(item.pet_name + ' has been added successfully.');
                showDatabase();
            });
    });
}

function PostBlog() {
    inquirer.prompt([{
        name: 'title',
        type: 'text',
        message: 'Please enter the title.'
    }, {
        name: 'post',
        type: 'text',
        message: 'Please enter the content.'
    }, {
        name: 'date',
        type: 'text',
        message: 'Please enter date(must be: yyyy-mm-dd).'
    }, {
        name: 'url',
        type: 'text',
        message: 'Please enter the img url.'
    }]).then(function(post) {
        var blog = {
                title: post.title,
                post_time: post.date,
                shelter_post: post.post,
                post_img_url: post.url,
            }
        connection.query('INSERT INTO shelter_blogs SET ?', blog,
            function(err) {
                if (err) throw err;
                console.log(blog.title + ' has been added successfully.');
                showDatabase();
            });
    });
}


function assignAnimal() {
    var animals = [];
    connection.query('SELECT pet_name FROM pets WHERE adopted = 0', function(err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            animals.push(data[i].pet_name)
        }
        inquirer.prompt([{
            name: 'choices',
            type: 'checkbox',
            message: 'Which animal do you want to assign?',
            choices: animals
        }]).then(function(assign) {
                assignTo(assign.choices);
            
        });
    });
}
function assignTo(animalName) {
    var pet = animalName.shift();
    connection.query('UPDATE pets SET ? WHERE ?', [{
        adopted: 1}, {pet_name: pet
    }],
    function(err, data) {
        if (err) {throw err;}
        else {
            console.log("Assigned.");
            showDatabase();
        }
    });
}


// inquirer.prompt([{
//     name: 'amount',
//     type: 'text',
//     message: 'which user do you want to assign?',
//     validate: function(str) {
//         if (isNaN(parseInt(str))) {
//             console.log('Sorry that is not a valid number!');
//             return false;
//         } else {
//             return true;
//         }
//     }
// }]).then(function(managerData) {
//     var amount = managerData.amount
//     amount = parseInt(amount);
//     connection.query('UPDATE products SET ? WHERE ?', [{
//         stock_quantity: itemUnit += amount
//     }, {
//         product_name: item
//     }], function(err) {
//         if (err) throw err;
//     });
//     if (itemNames.length != 0) {
//         addUnit(itemNames);
//     } else {
//         console.log("Your inventory has been updated.");
//         showDatabase();
//     }
// });
