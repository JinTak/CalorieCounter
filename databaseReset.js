// This file will reset the Mass database

var db = require("./models");


// Resetting the database
db.Food.remove({}, (err, foods)=>{
    console.log("Removed all foods!" + foods);
    process.exit();
});