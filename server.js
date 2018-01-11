// Requiring necessary modules
var express = require('express');
var path = require('path');
var request = require('request');
var apiId = process.env.apiId || require('./env.js').apiId;
var apiKey = process.env.apiKey || require('./env.js').apiKey;

var localPORT = 3000;

// Creating new Express object to handle routing
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    console.log("Home route was hit.");

    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function(req, res){
    console.log("api route was hit");

    request.get({
        url: "https://api.nutritionix.com/v1_1/search/" + req.query.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId + "&appKey=" + apiKey + ""
    }, function(err, response, body){
        if(!err && response.statusCode == 200){
            // console.log(typeof(body));
            var jsonBody = JSON.parse(body);
            // console.log(jsonBody);
            res.json(jsonBody);   
        } else if(err){
            res.send(err);
        }
    });
});

app.get('/food', function(req, res){
    console.log("Food route was hit");

   request.get({
        url: "https://api.nutritionix.com/v1_1/search/" + req.query.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId + "&appKey=" + apiKey + ""
    }, function(err, response, body){
        if(!err && response.statusCode == 200){
            // console.log(typeof(body));
            var jsonBody = JSON.parse(body);
            // console.log(jsonBody);
            res.render('foodResults.ejs', { jsonBody });   
        } else if(err){
            res.send(err);
        }
    });

});

app.get('*', function(req, res){
    res.send('Sorry, Page you were looking for was not found.');
});


app.listen(process.env.PORT || localPORT, function(){
    console.log("Server is running on PORT:" + localPORT);
});