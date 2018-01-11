// Requiring necessary modules
let express = require('express');
let path = require('path');
let request = require('request');
let apiId = process.env.apiId || require('./env.js');
let apiKey = process.env.apiKey || require('./env.js');
let localPORT = 3000;

// Creating new Express object to handle routing
let app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/food', function(req, res){
    console.log("Food route was hit");

   request.get({
        url: "https://api.nutritionix.com/v1_1/search/" + req.query.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId.apiId + "&appKey=" + apiKey.apiKey + ""
    }, function(err, response, body){
        if(!err && response.statusCode == 200){
            // console.log(typeof(body));
            let jsonBody = JSON.parse(body);
            // console.log(jsonBody);
            res.render('foodResults.ejs', { jsonBody });   
        } else if(err){
            console.log("https://api.nutritionix.com/v1_1/search/" + req.query.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + apiId.apiId + "&appKey=" + apiKey.apiKey + "");
        }
    });

});


app.listen(process.env.PORT || localPORT, function(){
    console.log("Server is running on PORT:" + localPORT);
});