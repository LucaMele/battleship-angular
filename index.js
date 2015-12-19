var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 1337;
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require('./server/routes/ajax.js'));


http.createServer(app).listen(port, function() {
    console.log('\nServer running on port: ' + port);
});