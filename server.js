// Requiring necessary modules
let express = require('express');
let path = require('path');
let request = require('request');
let apiId = process.env.apiId || require('./env.js').apiId;
let apiKey = process.env.apiKey || require('./env.js').apiKey;

// Local Port Number
let localPORT = 3000;

// Requiring Models
var db = require('./models');

// Creating new Express object to handle routing
let app = express();

// Body Parser Middleware to handle form data
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Serve static files from public folder
app.use(express.static(__dirname + '/public'));

// Home Route
app.get('/', (req, res)=>{
    console.log("Home route was hit.");

    res.sendFile(__dirname + '/views/index.html');
});

// Route to search food from Nutrionix
app.get('/food', (req, res)=>{
    console.log("Food route was hit");

   request.get({
        url: "https://api.nutritionix.com/v1_1/search/" + req.query.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId + "&appKey=" + apiKey + ""
    }, (err, response, body)=>{
        if(!err && response.statusCode == 200){
            // console.log(typeof(body));
            let jsonBody = JSON.parse(body);
            // console.log(jsonBody);
            res.render('foodResults.ejs', { jsonBody });   
        } else if(err){
            res.send(err);
        }
    });

});

// Route to create new Custom Form
app.get('/createCustomFood', (req, res)=>{
    let newCustomFood = {
        foodName: req.query.foodName,
        calories: req.query.calories,
        proteins: req.query.proteins,
        carbohydrates: req.query.carbohydrates,
        fats: req.query.fats
    }

    db.Food.create(newCustomFood, (err, food)=>{
        console.log("The new custom food was successfully created: " + food);
    });

    res.json(newCustomFood);
});

// Route to get api info
app.get('/api', (req, res)=>{
    console.log("api route was hit");

    request.get({
        url: "https://api.nutritionix.com/v1_1/search/" + req.query.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId + "&appKey=" + apiKey + ""
    }, function(err, response, body){
        if(!err && response.statusCode == 200){
            // console.log(typeof(body));
            let jsonBody = JSON.parse(body);
            // console.log(jsonBody);
            res.json(jsonBody);   
        } else if(err){
            res.send(err);
        }
    });
});

// Catch all route
app.get('*', (req, res)=>{
    res.send('Sorry, Page you were looking for was not found.');
});


app.listen(process.env.PORT || localPORT, ()=>{
    console.log("Server is running on PORT:" + localPORT);
});