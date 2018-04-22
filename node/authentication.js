const bcrypt = require('bcryptjs');
const database = require('./database');

function storeUser(email, password, userData){

    bcrypt.hash(password, 10, function(err, hash) {
        //store email and password in db
        database.insertUser(email, hash, userData, function(success){
            
        });
    });
    
}

function userExists(email, password){
    database.startConnection();
    database.getUser(email, password, function(res){

    });
}


module.exports = {
    storeUser: storeUser,
    userExists: userExists,
};