// Setting up database connections using mongoose
var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || 
                 process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                 "mongodb://localhost/Mass");

// Importing User and Food Models
var User = require("./user.js");
var Food = require("./food.js");

module.exports.User = User;
module.exports.Food = Food;