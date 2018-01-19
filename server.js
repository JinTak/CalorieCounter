// MASS
// AUTHOR: Jin Tak

// Requiring necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// Creating new Express object to handle routing
let app = express();

// Requiring Passport Modules
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


// Local Port Number
const localPORT = 3000;

// Requiring Models
var db = require('./models');

// EJS Rendering Middleware to handle form data
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Setting up Passport
app.use(session({ secret: 'HEY' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);
// Passport middleware to make user object available globally
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Setting path to views folder
app.set('views', path.join(__dirname, 'views'));
// Serve static files from public folder
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// Using routes in config directory
var router = require('./config/routes.js');
app.use(router);

// Listening on local server
app.listen(process.env.PORT || localPORT, ()=>{
    console.log("Server is running on PORT: Andre " + localPORT);
});
