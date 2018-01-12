// Requiring mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Defining new User Schema
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;