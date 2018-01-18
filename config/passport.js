let localStrategy  = require('passport-local').Strategy;
let User           = require('../models/user.js');

module.exports = function(passport){

    passport.serializeUser( function(user, callback){
        callback(null, user.id);
    });

    passport.deserializeUser( function(id, callback){
        User.findById(id, function(err, user){
            callback(err, user);
        });
    });

    // Strategy for SIGN UP
    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, callback){
        User.findOne({ 'email': email }, function(err, user){
            // There was an error
            if(err) return callback(err);

            // There is a user with this email
            if(user){
                console.log("User already exists!");
                return callback(null, false, req.flash('signupMessage', 'That email is already in use.'));
            } else{
                // Create new user
                let newUser = new User();
                newUser.email = email;
                newUser.password = newUser.encrypt(password);
                newUser.username = req.body.customUsername;

                newUser.save( function(err){
                    if(err) return callback(err);
                    return callback(null, newUser);
                });
            }
        });
      
    }));


    // Strategy for SIGN IN
    passport.use('local-login', new localStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, email, password, callback){
        // Searching for a user with the email input
        User.findOne({ 'email' : email }, function(err, user){
            console.log('checking credentials..');
            console.log(user);

            if(err){
                return callback(err);
            }
            // // If no user is found in the database
            if(!user){
                return callback(null, false, req.flash('loginMessage', 'User not found. Try again.'));
            }

            // // If user enters incorrect password
            if(!user.validPassword(password)){
                return callback(null, false, req.flash('loginMessage', 'Incorrect password. Try again.'));
            }
            console.log('passsssss');
            return callback(null, user);
        });

    }));

};
