// Requiring mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Defining new User Schema
var UserSchema = new Schema({
    name: String,
    password: String
});