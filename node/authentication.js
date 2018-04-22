const bcrypt = require('bcryptjs');
const database = require('./database');

function storeUser(email, password, userData){

    bcrypt.hash(password, 10, function(err, hash) {
        //store email and password in db
        database.insertUser(email, hash, userData, function(success){
            
        });
    });
    
}

function userExists(email, password, callback){
    database.getUser(email, password, function(res){
        return callback(res);
    });
}


module.exports = {
    storeUser: storeUser,
    userExists: userExists,
};