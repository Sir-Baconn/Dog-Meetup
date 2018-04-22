var mysql = require('mysql');
var options = require('./options');

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
        console.log(results);
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
        return result;
    });
}

function insertDog(dog, callback){
    console.log(dog);
    var query = 'INSERT INTO dog_meetup.dogs SET ?';
    db.query(query, dog, function(err, result){
        if(err) throw err;
        return callback(result);
    });
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
        console.log(q.sql);
        if(err) throw err;
        return result;
    });
}

module.exports = {
    startConnection: startConnection,

    insertBreeds: insertBreeds,
    insertUser: insertUser,
    insertDog: insertDog,

    getBreeds: getBreeds,
    getUserId: getUserId,

    closeConnection: closeConnection
}