// Requiring mongoose module
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let Schema = mongoose.Schema;

// Defining new User Schema
let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

UserSchema.methods.encrypt = (password)=>{
    bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

var User = mongoose.model('User', UserSchema);

module.exports = User;