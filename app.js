var port = 5000;
var url = 'mongodb://localhost:27017/TMMP';

var express = require('express');
var app = express();

var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

var method_override = require('method-override');
app.use(method_override('_method'));

app.set('views', './src/views');
app.set('view engine', 'ejs');


// READ
app.get('/', function(req, res) {
    res.render("index");
});

app.get('/coming_soon', function(req, res) {
    res.render("coming_soon");
});

app.get('/view_recipe', function(req, res) {
    res.render("view_recipe");
});

app.get('/recipe_book', function(req, res) {
    mongodb.connect(url, function(err, db) {
        var collection = db.collection('recipes');
        collection.find({}).toArray(
            function(err, results){
                res.render("recipe_book", {recipe_list: results});
            }
        );
    });
});

app.get('/add_recipe', function(req, res) {
    res.render("recipe_form");
});

// app.get('/menu_planner', function(req, res) {
//     res.render("menu_planner");
// });

app.get('/menu_planner', function(req, res) {
    var id = new objectId(req.params.id);
    mongodb.connect(url, function(err, db){
        var collection = db.collection('menu');
        collection.find({}).toArray(
            function(err, results){
                res.render("menu_planner", {menus: results});  
            }
        )
    });
});

app.get('/menus', function(req, res) {
    mongodb.connect(url, function(err, db){
        var collection = db.collection('menu');
        collection.find({}).toArray(
            function(err, results){
                res.render("table_test", {menu: results});  
            }
        );
    }) 
});

app.post('/menu_planner', function(req, res) {
    mongodb.connect(url, function(err, db){
        var collection = db.collection('menu');
        var plan = {
            sun1: req.body.sun1,
            mon1: req.body.mon1,
            tue1: req.body.tue1,
            wed1: req.body.wed1,
            thu1: req.body.thu1,
            fri1: req.body.fri1,
            sat1: req.body.sat1,
            sun2: req.body.sun2,
            mon2: req.body.mon2,
            tue2: req.body.tue2,
            wed2: req.body.wed2,
            thu2: req.body.thu2,
            fri2: req.body.fri2,
            sat2: req.body.sat2
        };
        collection.insertOne(plan, function(err, results){
            res.redirect('/menus') // DEBUG PURPOSES
        })
    })
});


app.post('/add_recipe', function(req, res) {
    mongodb.connect(url, function(err, db){
        var collection = db.collection('recipes');
        var recipe = {
            name: req.body.name,
            author: req.body.author,
            picture: req.body.picture,
            prepHours: req.body.prepHours,
            prepMin: req.body.prepMin,
            cookHours: req.body.cookHours,
            cookMin: req.body.cookMin,
            amount: req.body.amount,
            unit: req.body.unit,
            ingredient: req.body.ingredient,
            preparation: req.body.preparation,
            directions: req.body.directions
        };
        collection.insertOne(movie, function(err, results) {
            res.redirect('/recipe_book');
        });
    });
});

// UPDATE
// app.get("/menu_planner", function(req,res){
//   users.forEach(function(user,index){
//     if(user.name == req.params.name){
//       return res.render("userForm", { process: 'edit', name: user.name, age: user.age });
//     }
//   })
// })
// app.post("/users/edit/:name", function(req,res){
//   users.forEach(function(user,index){
//     if(user.name == req.params.name){
//       users[index].name = req.body.name
//       users[index].age = req.body.age
//       res.redirect("/users/")
//     }
//   })
// })


// app.post('/menu_planner', function(req, res, next){ 
//   mongodb.connect(url, function(err, db) {
//     var collection = db.collection('menu'); 
//     var mon1 = req.body.mon1;
//     var tue1 = req.body.tue1;
//     var wed1 = req.body.wed1;

//     collection.update({'_id':new mongodb.ObjectID(req.body.id)}, 
//     { $set: {'mon1': mon1, 'tue1': tue1, 'wed1': wed1 } }, function(err, result) { 
//       if(err) { throw err; } 
//       db.close(); 
//       res.redirect('/menu_planner');
//     });
//   });
// });



app.delete('/test/:id', function(req, res) {
    var id = new objectId(req.params.id);
    mongodb.connect(url, function(err, db){
        var collection = db.collection('menu');
        collection.remove({_id: id}, function(err, results){
            res.redirect('/test');         
        });
    }); 
});

app.listen(port, function(err) {
    console.log("Listening on Port: " + port);
});