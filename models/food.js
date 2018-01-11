// Importing necessary modules
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Defining new Food Schema
var FoodSchema = new Schema({
    foodName: String,
    calories: Number,
    proteins: Number,
    carbohydrates: Number,
    fats: Number
});

var Food = mongoose.model('Food', FoodSchema);

module.exports = Food;