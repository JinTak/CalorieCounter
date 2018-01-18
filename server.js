// Requiring necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');


// Creating new Express object to handle routing
let app = express();

// Requiring Passport Modules
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// Hidden API Id and API Key
let apiId = process.env.apiId || require('./env.js').apiId;
let apiKey = process.env.apiKey || require('./env.js').apiKey;

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

// Setting path to views folder
app.set('views', path.join(__dirname, 'views'));
// Serve static files from public folder
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// Using routes in config directory
// var router = require('./config/routes.js');
// app.use(router);




// Home Route
app.get('/', (req, res)=>{
    console.log("Home route was hit.");

    res.sendFile(__dirname + '/views/index.html');
});

app.get('/home', (req, res)=>{
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/eat', (req, res)=>{
    res.render('eat.ejs');
});

// Route to search food from Nutrionix
app.post('/search-api-food', (req, res)=>{
    console.log("Food route was hit");

    // API CALL
    request.get({
        url: "https://api.nutritionix.com/v1_1/search/" + req.body.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId + "&appKey=" + apiKey + ""
    }, (err, response, body)=>{
        let jsonBody = JSON.parse(body);
        // console.log(typeof(jsonBody.total_hits));
        // console.log(jsonBody.total_hits);
        if(jsonBody.total_hits === 0){
            res.redirect('/eat');
        } else if(!err && response.statusCode == 200){
            // console.log(typeof(body));
            
            // console.log(jsonBody.hits[0]);

            res.render('foodResults.ejs', { jsonBody });   
        } else if(err){
            res.send(err);
        }
    });

    // START - DUMMY DATA so I don't have to keep calling api
    // let dummy = {
    //                 fields: [
    //                     {
    //                         foodName: "Birthday CAkeeee",
    //                         calories: 1000,
    //                         proteins: 99,
    //                         carbohydrates: 123,
    //                         fats: 22
    //                     },
    //                     {
    //                         foodName: "Nachos",
    //                         calories: 999,
    //                         proteins: 88,
    //                         carbohydrates: 123,
    //                         fats: 1
    //                     },
    //                     {
    //                         foodName: "Pizzaaaaa",
    //                         calories: 44,
    //                         proteins: 23,
    //                         carbohydrates: 66,
    //                         fats: 77
    //                     }
    //                 ]
    //             }
    // res.render('foodResults.ejs', {dummy} );
    // END - DUMMY DATA

});


// Route to create new Custom Food
app.post('/create-custom-food', (req, res)=>{
    let newCustomFood = {
        foodName: req.body.foodName,
        calories: req.body.calories,
        proteins: req.body.proteins,
        carbohydrates: req.body.carbohydrates,
        fats: req.body.fats
    }

    db.Food.create(newCustomFood, (err, food)=>{
        if(err) { console.log('Error: ' + err); }
        else { console.log("The new custom food was successfully created: " + food); }
    });
    
    // console.log(typeof(newCustomFood));
    // res.json(req.body);

    res.redirect('/eat');
});

// Route to search foods in user's database
app.post('/search-my-food-database', (req, res)=>{

    db.Food.findOne({ foodName: req.body.myFoodToSearch }, function(err, food){
        if(err){ res.send(err); } 
        
        if(!food){
            res.send('Sorry, food not found!');
        } else {
            // console.log(typeof(food));
            res.render('searchMyFoods.ejs',  {food} );
        } 

    });

});


// Route to list ALL Foods from Database
app.get('/list-all-foods', (req, res)=>{
    db.Food.find({}, (err, foods)=>{
        if(err){ res.send(err); }
        
        res.render('listAllMyFoods.ejs', { foods });
    });
});


// Route to create new food from Nutrionix API call
app.post('/save-food', (req, res)=>{
    let newFood = {
        foodName: req.body.foodName,
        calories: req.body.calories,
        proteins: req.body.proteins,
        carbohydrates: req.body.carbohydrates,
        fats: req.body.fats
    }

    db.Food.create(newFood, (err, food)=>{
        if(err) { console.log('Error: ' + err); }
        else { console.log("The new API food was successfully created: " + food); }
    });
    
    
    res.redirect('/eat');
});

// Route to get api info
app.post('/api', (req, res)=>{
    console.log("api route was hit");

    request.get({
        url: "https://api.nutritionix.com/v1_1/search/" + req.body.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId + "&appKey=" + apiKey + ""
    }, function(err, response, body){
        if(!err && response.statusCode == 200){
            // console.log(typeof(body));
            let jsonBody = JSON.parse(body);
            // console.log(typeof(body));
            res.json(jsonBody);   
        } else if(err){
            res.send(err);
        }
    });
});

// UPDATE ROUTE
app.put('/update-food/:id', (req, res)=>{

    console.log('hit update route');

    // if(!req.body.foodName || !req.body.calories || !req.body.proteins || !req.body.carbohydrates || !req.body.fats ){
    //     res.json("Please enter foodName, calories, carbohydrates, proteins, & fats properties.");
    // } else {
    db.Food.findOneAndUpdate({_id: req.params.id}, {$set:{foodName:req.body.foodName, calories:req.body.calories, proteins:req.body.proteins, carbohydrates:req.body.carbohydrates, fats:req.body.fats }}, {new:true}, function(err, food){
        if(err) {
            res.json("Food not found.");
        }
        else {
            res.json("Found the Food.");
        console.log(food);
        };
    });
    
});

// DELETE ROUTE
app.delete('/delete-food/:id', (req, res)=>{

    console.log('hit delete route');

    db.Food.findById(req.params.id, function (err, food) {
        
        db.Food.remove( {_id: req.params.id }, (err) => {
          if(err) {
            res.json("Error: Food was not removed.");
          }
          else {
            res.json("Successfully removed " + food + "!")
            console.log("Successfully removed " + food + "!");}
        }); 
        
    });
});


// GET: Route to signup page
app.get('/signup', (req, res)=>{
    // res.render('./passport/signup.ejs');
    res.render('./passport/signup.ejs', { message: req.flash('signupMessage') });
});

// POST: Route to signup page
app.post('/signup', (req, res, next)=>{
    
    let signupStragety = passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    });

    return signupStragety(req, res, next);
});

// GET: Route to signup page
app.get('/signup', (req, res)=>{
    // res.render('./passport/signup.ejs');
    res.render('./passport/signup.ejs', { message: req.flash('signupMessage') });
});

// POST: Route to signin page
// app.post('/signin', (req, res, next)=>{
//     let signupStragety = passport.authenticate('local-signup', {
//         successRedirect: '/home',
//         failureRedirect: '/signup',
//         failureFlash: true
//     });

//     return signupStragety(req, res, next);
// });

// Route to congratulations page
app.get('/congratulations', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/congratulations.html'));
});

// Catch all route
app.get('*', (req, res)=>{
    res.send('Sorry, Page you were looking for was not found.');
});


app.listen(process.env.PORT || localPORT, ()=>{
    console.log("Server is running on PORT: Andre " + localPORT);
});


module.exports = app;