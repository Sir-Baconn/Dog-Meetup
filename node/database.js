var mysql = require('mysql');
var options = require('./options');
const bcrypt = require('bcryptjs');

// Global variable - gives access to mysql db connection
var db;

function startConnection() {
    db = mysql.createPool({
        connectionLimit: 10,
        host: options.storageConfig.database.host,
        user: options.storageConfig.database.user,
        password: options.storageConfig.database.password,
        database: options.storageConfig.database.database,
        multipleStatements: true
    });
}

// Closes the connection, still unsure of when to call this at all...
function closeConnection() {
    if (db !== "undefined")
        db.end();
}

function insertBreeds(breeds, callback){
    var query = 'INSERT INTO dog_meetup.breeds (breed) VALUES ?'
    db.query(query, [breeds], function(error, results, fields) {
        if (error) throw error;
    });
}

function insertUser(email, password, userData, callback){
    var user = {
        email: email,
        password: password,
        name: userData.name,
        location: userData.location,
        phone_number: userData.phoneNumber,
        number_of_dogs: userData.numDogs
    };

    var query = 'INSERT INTO dog_meetup.users SET ?';
    db.query(query, user, function(err, result){
        if(err){
            if(err.code === "ER_DUP_ENTRY"){
                // Someone tried to make an account with the same email as someone else
                // Handle that here
            }else if(err.code === "ER_ACCESS_DENIED_ERROR"){
                console.log('<insertUser>: Access denied, check if password is blank.');
            }
            console.log(err);
        }
        return callback(result);
    });
}

function getUser(email, password, callback){
    var query = 'SELECT password FROM dog_meetup.users WHERE email = ?';
    db.query(query, email, function(err, result){
        if(err) throw err;
        if(typeof result[0] === "undefined"){
            return callback(false);
        }
        bcrypt.compare(password, result[0].password, function(err, doesMatch){
            if (doesMatch){
                return callback(true);
            }else{
                return callback(false);
            }
        });
    });
}

function insertDog(dog, callback){
    var query = 'INSERT INTO dog_meetup.dogs SET ?';
    db.query(query, dog, function(err, result){
        if(err) throw err;
        return callback(result);
    });
}

function insertRequestedMeetup(meetup, callback){
    var query = 'INSERT INTO dog_meetup.requested_meetups SET ?';
    db.query(query, meetup, function(err, result){
        if(err) throw err;
        return callback(result);
    })
}

function getBreeds(callback){
    var query = 'SELECT * FROM dog_meetup.breeds';
    db.query(query, function(err, result){
        if(err) throw err;
        return callback(result);
    });
}

function getUserId(email, callback){
    var query = 'SELECT iduser FROM dog_meetup.users WHERE email = ?';
    var q = db.query(query, email, function(err, result){
        if(err) throw err;
        return callback(result);
    });
}

function getUserInfo(email, callback){
    var query = 'SELECT name, location, phone_number, number_of_dogs FROM dog_meetup.users WHERE email = ?';
    db.query(query, email, function(err, result){
        if(err) throw err;
        return callback(result);
    });
}

function getDogs(email, callback){
    var query = 'SELECT iddogs, name, breed, description, age, size, activity_level, barking_level, friendly_level FROM dog_meetup.dogs WHERE userid = ?';
    db.query(query, email, function(err, result){
        if(err) throw err;
        return callback(result);
    });
}

function getRequestedMeetups(callback){
    var query = 'SELECT * FROM dog_meetup.requested_meetups';
    db.query(query, function(err, result){
        if(err) throw err;
        return callback(result);
    });
}

module.exports = {
    startConnection: startConnection,

    insertBreeds: insertBreeds,
    insertUser: insertUser,
    insertDog: insertDog,
    insertRequestedMeetup: insertRequestedMeetup,

    getUser: getUser,
    getBreeds: getBreeds,
    getUserId: getUserId,
    getUserInfo: getUserInfo,
    getDogs: getDogs,
    getRequestedMeetups: getRequestedMeetups,

    closeConnection: closeConnection
}