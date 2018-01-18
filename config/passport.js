let localStrategy  = require('passport-local').Strategy;
let User           = require('../models/user.js');

module.exports = function(passport){

    passport.serializeUser( (user, callback)=>{
        callback(null, user.id);
    });

    passport.deserializeUser( (id, callback)=>{
        User.findById(id, (err, user)=>{
            callback(err, user);
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, callback)=>{
        User.findOne({'email': email}, (err, user)=>{
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

                newUser.save( (err)=>{
                    if(err) return callback(err);
                    return callback(null, newUser);
                });
            }
        });
      
    }));

    // passport.use('local-login', new LocalStrategy({
    //     usernameField : 'email',
    //     passwordField : 'password',
    //     passReqToCallback : true
    // }, function(req, email, password, callback){

    // }));

}
