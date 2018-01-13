// This file will reset the Mass database

var db = require("./models");


// Resetting the Food database
db.Food.remove({}, (err, foods)=>{
    console.log("Removed all Foods!" + foods);
    process.exit();
});

