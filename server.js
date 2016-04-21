var express = require('express');

var app = express();

var env = require('./server/config/appEnvironment');
var config = require('./server/config/config')[env];

var APP_NAME = config.app_name;
require('./server/config/setup')(app,config);
require('./server/config/routes')(app,APP_NAME);

app.listen(config.port,function(){
	console.log("Listening on port %d in %s mode...",config.port,env.toUpperCase());
});