// // Author: Jin Tak
// var express = require('express');
// var app = express();
// const path = require('path');
// var router = require('express').Router();

// // Setting path to views folder
// app.set('views', path.join(__dirname, 'views'));
// // Serve static files from public folder
// router.use(express.static(__dirname + '/public'));


// // Home Route
// router.get('/', (req, res)=>{
//     console.log("Home route was hit.");

//     res.sendFile(__dirname + '/views/index.html');
// });

// router.get('/home', (req, res)=>{
//     res.sendFile(__dirname + '/views/home.html');
// });

// // Route to search food from Nutrionix
// router.post('/search-api-food', (req, res)=>{
//     console.log("Food route was hit");

//     // API CALL
//     request.get({
//         url: "https://api.nutritionix.com/v1_1/search/" + req.body.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId + "&appKey=" + apiKey + ""
//     }, (err, response, body)=>{
//         let jsonBody = JSON.parse(body);
//         console.log(typeof(jsonBody.total_hits));
//         console.log(jsonBody.total_hits);
//         if(jsonBody.total_hits === 0){
//             res.redirect('/');
//         } else if(!err && response.statusCode == 200){
//             // console.log(typeof(body));
            
//             // console.log(jsonBody.hits[0]);

//             res.render('foodResults.ejs', { jsonBody });   
//         } else if(err){
//             res.send(err);
//         }
//     });

//     // START - DUMMY DATA so I don't have to keep calling api
//     // let dummy = {
//     //                 fields: [
//     //                     {
//     //                         foodName: "Birthday CAkeeee",
//     //                         calories: 1000,
//     //                         proteins: 99,
//     //                         carbohydrates: 123,
//     //                         fats: 22
//     //                     },
//     //                     {
//     //                         foodName: "Nachos",
//     //                         calories: 999,
//     //                         proteins: 88,
//     //                         carbohydrates: 123,
//     //                         fats: 1
//     //                     },
//     //                     {
//     //                         foodName: "Pizzaaaaa",
//     //                         calories: 44,
//     //                         proteins: 23,
//     //                         carbohydrates: 66,
//     //                         fats: 77
//     //                     }
//     //                 ]
//     //             }
//     // res.render('foodResults.ejs', {dummy} );
//     // END - DUMMY DATA

// });


// // Route to create new Custom Food
// router.post('/create-custom-food', (req, res)=>{
//     let newCustomFood = {
//         foodName: req.body.foodName,
//         calories: req.body.calories,
//         proteins: req.body.proteins,
//         carbohydrates: req.body.carbohydrates,
//         fats: req.body.fats
//     }

//     db.Food.create(newCustomFood, (err, food)=>{
//         if(err) { console.log('Error: ' + err); }
//         else { console.log("The new custom food was successfully created: " + food); }
//     });
    
//     // console.log(typeof(newCustomFood));
//     // res.json(req.body);

//     res.redirect('/home');
// });

// // Route to search foods in user's database
// router.post('/search-my-food-database', (req, res)=>{

//     db.Food.findOne({foodName: req.body.myFoodToSearch}, function(err, food){
//         if(err){ res.send(err); } 
        
//         if(!food){
//             res.send('Sorry, food not found!');
//         } else {
//             res.send(food);
//         }

//     });
// });


// // Route to list ALL Foods from Database
// router.get('/list-all-foods', (req, res)=>{
//     db.Food.find({}, (err, foods)=>{
//         // console.log(albums);
//         res.json(foods);
//     });
// });


// // Route to create new food from Nutrionix API call
// router.post('/save-food', (req, res)=>{
//     let newFood = {
//         foodName: req.body.foodName,
//         calories: req.body.calories,
//         proteins: req.body.proteins,
//         carbohydrates: req.body.carbohydrates,
//         fats: req.body.fats
//     }

//     db.Food.create(newFood, (err, food)=>{
//         if(err) { console.log('Error: ' + err); }
//         else { console.log("The new API food was successfully created: " + food); }
//     });
    
//     // res.json(req.body);
//     res.redirect('/home');
// });

// // Route to get api info
// router.post('/api', (req, res)=>{
//     console.log("api route was hit");

//     request.get({
//         url: "https://api.nutritionix.com/v1_1/search/" + req.body.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId + "&appKey=" + apiKey + ""
//     }, function(err, response, body){
//         if(!err && response.statusCode == 200){
//             // console.log(typeof(body));
//             let jsonBody = JSON.parse(body);
//             // console.log(typeof(body));
//             res.json(jsonBody);   
//         } else if(err){
//             res.send(err);
//         }
//     });
// });


// // GET: Route to signup page
// router.get('/signup', (req, res)=>{
//     res.render('./passport/signup.ejs');
// });

// // POST: Route to signup page
// router.post('/signup', (req, res, next)=>{
    
//     let signupStragety = passport.authenticate('local-signup', {
//         successRedirect: '/home',
//         failureRedirect: '/signup',
//         failureFlash: true
//     });

//     return signupStragety(req, res, next);
// });

// // POST: Route to signin page
// router.post('/signin', (req, res, next)=>{
//     let signupStragety = passport.authenticate('local-signup', {
//         successRedirect: '/home',
//         failureRedirect: '/signup',
//         failureFlash: true
//     });

//     return signupStragety(req, res, next);
// });

// // Catch all route
// router.get('*', (req, res)=>{
//     res.send('Sorry, Page you were looking for was not found.');
// });


// // Exporting Router 
// module.exports = router;