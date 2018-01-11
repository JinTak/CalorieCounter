var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
const api = require('./env.js');

const PORT = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/food', function(req, res){
    request.get({
        url: "https://api.nutritionix.com/v1_1/search/" + req.query.food + "?results=0%3A3&fields=item_name,brand_name,nf_calories,nf_total_carbohydrate,nf_protein,nf_total_fat,nf_serving_size_qty=1&appId=" + api.apiId + "&appKey=" + api.apiKey + ""
    }, function(err, response, body){
        if(!err && response.statusCode == 200){
            // console.log(typeof(body));
            let jsonBody = JSON.parse(body);
            // console.log(jsonBody);
            res.render('foodResults.ejs', {jsonBody});   
        }
    });
});


app.listen(PORT, function(){
    console.log("Server is running on PORT:" + PORT);
});