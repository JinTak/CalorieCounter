// Requiring necessary modules
const passport = require('passport');
const request = require('request');

// Hidden API Id and API Key
let apiId = process.env.apiId || require('../env.js').apiId;
let apiKey = process.env.apiKey || require('../env.js').apiKey;

// Require database 
let db = require('../models/index.js');

// Requi

// MASS Controllers

// GET Landing Page 
function getLanding(req, res){
    console.log("Landing Page route was hit.");

    res.render('index');
}

// GET Home Page
function goHome(req, res){
    res.render('home.ejs');
}

// GET Eat Controller
function eat(req, res){
    res.render('eat.ejs');
}

// POST search-api-food Route
function searchNutritionAPI(req, res){
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

}
// POST controller to save API food
function saveAPIFood(req, res){
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
}

// POST controller for Creating Custom Food
function createCustomFood(req, res){
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
}

// POST controller for search personal database for saved food
function searchMyFoods(req, res){

    db.Food.findOne({ foodName: req.body.myFoodToSearch }, function(err, food){
        if(err){ res.send(err); } 
        
        if(!food){
            res.send('Sorry, food not found!');
        } else {
            // console.log(typeof(food));
            res.render('searchMyFoods.ejs',  {food} );
        } 

    });

}

// GET controller to list all User's foods
function listAllFoods(req, res){
    db.Food.find({}, (err, foods)=>{
        if(err){ res.send(err); }
        
        res.render('listAllMyFoods.ejs', { foods });
    });
}

// PUT route for Updating Food Data
function updateFood(req, res){

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
    
}

// DELETE route for Food Data
function deleteFood(req, res){

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
}

// POST All API data
function getAPIData(req, res){
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
}

// GET controller for Catching Invalid URL's
function catchAll(req, res){
    res.send('Sorry, Page you were looking for was not found.');
}


////////////////////////
// USER CONTROLLERS
///////////////////////
// GET Sign UP page
function getSignUp(req, res){
    // res.render('./passport/signup.ejs');
    res.render('./passport/signup.ejs', { message: req.flash('signupMessage') });
}
// POST Sign UP page
function postSignUp(req, res, next){
    
    let signupStragety = passport.authenticate('local-signup', {
        successRedirect : '/home',
        failureRedirect : '/signup',
        failureFlash    : true
    });

    return signupStragety(req, res, next);
}

// GET Sign IN page
function getSignIn(req, res){
    // res.render('./passport/signup.ejs');
    res.render('./passport/signin.ejs', { message: req.flash('loginMessage') });
}

// POST Sign IN Page
function postSignIn(req, res, next){
    var loginStrategy = passport.authenticate('local-login', {
        successRedirect : '/home',
        failureRedirect : '/signin',
        failureFlash    : true
    });

    return loginStrategy(req, res, next);
}
// Get Logout Controller
function logout(req, res, next){

    function getLogout(request, response){
        request.logout();
        response.redirect('/');
    }

    getLogout(req, res);
}



// GET congratulations page
function congratulations(req, res){
    res.render('congratulations');
}

module.exports = {
    getLanding              : getLanding,
    goHome                  : goHome,
    eat                     : eat,
    searchNutritionAPI      : searchNutritionAPI,
    saveAPIFood             : saveAPIFood,
    createCustomFood        : createCustomFood,
    searchMyFoods           : searchMyFoods,
    listAllFoods            : listAllFoods,
    getAPIData              : getAPIData,
    updateFood              : updateFood,
    deleteFood              : deleteFood,

    getSignUp               : getSignUp,
    postSignUp              : postSignUp,
    getSignIn               : getSignIn,
    postSignIn              : postSignIn,
    logout                  : logout,
    congratulations         : congratulations,

    catchAll                : catchAll
}
