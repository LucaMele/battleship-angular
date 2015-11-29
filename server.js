var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/", require('./server/routes/ajax.js'));


http.createServer(app).listen(3000);