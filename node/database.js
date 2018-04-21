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
    var query = 'INSERT INTO breeds (breed) VALUES ?'
    db.query(query, [breeds], function(error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
}

module.exports = {
    startConnection: startConnection,

    insertBreeds: insertBreeds,

    closeConnection: closeConnection
}