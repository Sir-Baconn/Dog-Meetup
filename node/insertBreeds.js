var database = require('./database');

database.startConnection();

var fs = require('fs');
var array = fs.readFileSync('breeds.txt').toString().split("\r\n");
var breeds = [];
for(i in array) {
    breeds.push([array[i]]);
}

database.insertBreeds(breeds, function(result){
    console.log(result);
});

database.closeConnection();