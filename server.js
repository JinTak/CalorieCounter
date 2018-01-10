var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
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
        url: "https://api.nutritionix.com/v1_1/search/icecream?results=0%3A3&fields=item_name,brand_name,nf_calories&item_type=3&appId=" + + "&appKey=" + + ""
    }, function(err, response, body){
        if(!err && response.statusCode == 200){
            res.send(body);
        }
    });
});


app.listen(PORT, function(){
    console.log("Server is running on PORT:" + PORT);
});