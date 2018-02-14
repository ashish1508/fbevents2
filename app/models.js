var mangoose = require('mongoose');
var db = require('../config/db');
mangoose.connect(db.url);


var eventschema = {
	name:String,
	place:String,
	desc:String,
	imgloc:String,
	sdate:Date,
	stime:String,
	edate:Date,
	etime:String,
	private:Number,
	public:Number
}
var eventmodel = mangoose.model('events',eventschema);
var userschema = {
	username : String,
	password :String,
	salt:String,
	events:[eventschema],
	invited:[eventschema]
}
var usermodel = mangoose.model('users',userschema);
module.exports.userm = usermodel;
module.exports.eventm = eventmodel;