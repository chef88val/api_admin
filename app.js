

'use strict';

var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var cors = require('cors')
var shoproutes = require('./routes/shop')

app.use(cors())
//var user_routes = require('./routes/user')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
//CORS middleware
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
//app.use(allowCrossDomain);


app.use('/api', shoproutes)

module.exports = app;


global.fnError = function () {

    return { message: "No se ha podido identificar el usuario" }
}



