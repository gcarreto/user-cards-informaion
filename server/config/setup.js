var express = require('express');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passportDefinition = require('./passport')(passport);

module.exports = function(app,config){
	
	app.set('views',path.join(__dirname, "../../public/templates"));		
	app.engine('html',require('ejs').renderFile);
	app.set('view engine','html');
	app.use(express.static(path.join(__dirname, "../../public")));
	app.use(bodyParser.json());
	//app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());			
	app.use(session({ secret: 'supercoolsecret', resave:true, saveUninitialized:true }));	
	app.use(passport.initialize());
	app.use(passport.session());
	//app.use(express.compress());
}