// Requiring necessary modules
let express = require('express');
let bodyParser = require('body-parser');
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

// EJS Rendering Middleware to handle form data
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Setting path to views folder
app.set('views', path.join(__dirname, 'views'));
// Serve static files from public folder
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// Home Route
app.get('/', (req, res)=>{
    console.log("Home route was hit.");

    res.sendFile(__dirname + '/views/index.html');
});

// Route to search food from Nutrionix
app.post('/food', (req, res)=>{
    console.log("Food route was hit");

    request.get({
        url: "https://api.nutritionix.com/v1_1/search/" + req.body.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId + "&appKey=" + apiKey + ""
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
app.post('/createCustomFood', (req, res)=>{
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
    
    console.log(typeof(newCustomFood));
    res.json(req.body);
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

// Catch all route
app.get('*', (req, res)=>{
    res.send('Sorry, Page you were looking for was not found.');
});


app.listen(process.env.PORT || localPORT, ()=>{
    console.log("Server is running on PORT:" + localPORT);
});