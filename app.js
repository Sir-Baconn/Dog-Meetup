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

app.get('/login', function(req, res, next){
    res.render('login');
});

app.post('/login', function(req, res, next){
    authenticator.userExists(req.body.email, req.body.password, function(result){
        if(result){
            if(!req.session.email){
                req.session.email = req.body.email;
            }
            res.render('confirmation', {
                text: 'Login was successful'
            });
        }else{
            res.render('confirmation', {
                text: 'Login failed please try again'
            });
        }
    }); 
});

app.get('/signup_confirmation', function(req, res, next){
    res.render('confirmation', {
        text: 'Thanks for signing up'
    }); 
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
        res.render('confirmation', {
            text: 'Added dog successfully'
        });
    });
});

app.get('/profile', function(req, res, next){
    database.getUserInfo(req.session.email, function(userInfo){
        database.getDogs(req.session.email, function(dogs){
            res.render('profile', {
                userInfo: userInfo[0],
                dogs: dogs
            });
        });
    });
});

app.listen(process.env.PORT || 3000, '0.0.0.0', function() {
    console.log("Server running on 3000!");
});