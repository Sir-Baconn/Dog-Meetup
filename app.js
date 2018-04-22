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
    if(!req.session.email){
        res.redirect('login');
    }else{
        database.getBreeds(function(breeds){
            res.render('addDog', {
                breeds: breeds
            });
        });
    }
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
    if(!req.session.email){
        res.redirect('login');
    }else{
        database.getUserInfo(req.session.email, function(userInfo){
            database.getDogs(req.session.email, function(dogs){
                res.render('profile', {
                    userInfo: userInfo[0],
                    dogs: dogs
                });
            });
        });
    }
});

app.get('/request_meetup', function(req, res, next){
    if(!req.session.email){
        res.redirect('login');
    }else{
        database.getDogs(req.session.email, function(dogs){
            res.render('request_meetup', {
                dogs: dogs
            });
        });
    }
});

app.post('/request_meetup', function(req, res, next){
    var datetime = req.body.date + ' ' + req.body.time;
    var meetup = {
        userid: req.session.email,
        dogid: req.body.dog,
        time: datetime,
        location: req.body.location,
        length: req.body.length
    };

    database.insertRequestedMeetup(meetup, function(result){
        console.log(result);
    });

    res.send('hi');
});

app.get('/find_meetups', function(req, res, next){

    if(!req.session.email){
        res.redirect('login');
    }else{
        if(req.query.idrequested_meetups){
            database.getRequestedMeetupById(req.query.idrequested_meetups, function(requestedMeetup){
                database.getDogs(req.session.email, function(dogs){
                    var meetup = {
                        userid_1: requestedMeetup[0].userid,
                        userid_2: req.session.email,
                        time: requestedMeetup[0].time,
                        location: requestedMeetup[0].location,
                        length: requestedMeetup[0].length,
                        dogid_1: req.query.dogid,
                        dogid_2: dogs[0].iddogs
                    };
                    database.insertMeetup(meetup, function(result){
                        console.log(result);
                        // Lastly remove the requestedmeetup from the requested meetup table

                        // Send over the requestedmeetupid
                        res.send(req.query.idrequested_meetups);
                    });
                });
            });
        }else{
            database.getRequestedMeetups(req.session.email, function(meetups){
                res.render('find_meetups', {
                    meetups: meetups
                });
            });
        }
    }
})

app.get('/my_meetups', function(req, res, next){
    res.send('hello');
});

app.listen(process.env.PORT || 3000, '0.0.0.0', function() {
    console.log("Server running on 3000!");
});