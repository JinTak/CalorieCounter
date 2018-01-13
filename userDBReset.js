// This file will reset the Mass database
var db = require("./models");

// Resetting the Food database
db.User.remove({}, (err, users)=>{
    console.log("Removed all Users!" + users);
    process.exit();
});

