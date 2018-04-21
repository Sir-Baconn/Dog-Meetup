var twilio = require('twilio');

var accountSID = "ACfa575a3ae1c0a4d60f4109f222784503";
var authToken = "44a517aefaf805c86aabbd07fee5b453";

var client = new twilio(accountSID, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+17326873406',  // Text this number
    from: '+12018857083' // From a valid Twilio number
})
.then((message) => console.log(message.sid));

// DB Tables
// --------- //
// User info (pk=id, name, email, location, phone number, number of dogs)
// Dog Info (pk=id, fk=userId, dog name, dog breed, one word description of dog, age)
// Meetup Preferences (stuff about when the dog/owner prefers to meet up) (pk=id, fk=userId, weekday, time, weather)
// Meetup (details about a specific meetup) (fk=userId, fk=userId, datetime, location, length)
// Parks (list of a bunch of parks) ()
// User Parks (what parks are near the user/they like to go to to take their dog) ()

// APIs
// ---- //
// Twilio to text about upcoming meetup
// Maybe use weather API to display what the weather is on a day the person is trying to meet up with another