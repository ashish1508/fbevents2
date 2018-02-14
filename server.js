var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var passport = require('passport');
var path = require('path');
//var mongoose = require('mongoose');
app.use(bodyparser());
app.use(bodyparser.urlencoded({ extended: true })); 

//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))
app.use(bodyparser({uploadDir:'/uploads'}));
//var db = require('./config/db');
//mongoose.connect(db.url);
app.set('view engine','ejs');
require('./app/routes')(app); 

app.listen(3000 ,function(){
	console.log("listening");
})
exports = module.exports = app; 
