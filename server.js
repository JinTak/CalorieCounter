var express = require('express');
var app = express();
var path = require('path');
const PORT = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});



app.listen(PORT, function(){
    console.log("Server is running on PORT:" + PORT);
});