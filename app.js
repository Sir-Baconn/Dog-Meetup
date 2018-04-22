var bodyParser = require('body-parser');
var express = require('express');
var mysql = require('mysql');
var app = express();
var session = require('express-session');

var database = require('./node/database');
var authenticator = require('./node/authentication');

app.set("view engine", "ejs");
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'iubyivudogs'
}));


// GET /
app.get('/', function(req, res, next) {
    database.startConnection();
    res.render('index');
});

// GET signup
app.get('/signup', function(req, res, next){
    res.render('signup');
});

app.post('/signup', function(req, res, next){
    console.log(JSON.stringify(req.body));
    req.session.email = req.body.email;
    var userData = {
        name: req.body.name,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        numDogs: req.body.numDogs
    };

    authenticator.storeUser(req.body.email, req.body.password, userData);
    res.redirect('signup_confirmation');
});

app.get('/signup_confirmation', function(req, res, next){
    res.render('signup_confirmation'); 
});

// GET add_dog
app.get('/add_dog', function(req, res, next){
    database.getBreeds(function(breeds){
        res.render('addDog', {
            breeds: breeds
        });
    });
});

// POST add_dog
app.post('/add_dog', function(req, res, next){
    var dog = {
        name: req.body.name,
        breed: req.body.breed,
        description: req.body.description,
        age: req.body.age,
        size: req.body.size,
        activity_level: req.body.activityLevel,
        barking_level: req.body.barkingLevel,
        friendly_level: req.body.friendlyLevel,
        userid: req.session.email
    };
    
    database.insertDog(dog, function(result){
        res.send('thanks');
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server running on 3000!");
});