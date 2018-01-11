// Setting up database connections using mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Mass");

// Importing User and Food Models
var User = require("./user.js");
var Food = require("./food.js");
