// Author: Jin Tak

// Requiring mongoose module
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let Schema = mongoose.Schema;

// Defining new User Schema
let UserSchema = new Schema({
    username  : String,
    email     : String,
    password  : String
});

UserSchema.methods.encrypt = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User', UserSchema);

module.exports = User;