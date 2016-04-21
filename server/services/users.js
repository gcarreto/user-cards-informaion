var mongodb = require('../lib/mongodb');
var env = require('../config/appEnvironment');
var config = require('../config/config')[env];

var findUser = exports.findUser = function(email){

	return mongodb.findOne(config.mongodb.collections.user.collectionName,
		{email:email});	
}

exports.createUser = function(user){

	return mongodb.insert(config.mongodb.collections.user.collectionName,user);	
}
/*

*/

/*
findUser("usersTemporal",{name:"simple name"}).then(function(rs){
	console.log(rs);
}).catch(function(rr){
	console.log(rr);
});
//*/

/*
findPaginated("usersTemporal",{name:"simple name"},1,1).then(function(rs){
	console.log(rs);
}).catch(function(rr){
	console.log(rr);
});
//*/

/*
update("usersTemporal",{name:"simple name"},{supercoolProp:"coolestValueEver"}).then(function(rs){
	console.log(rs);
}).catch(function(error){
	console.log(error);
});
//*/

/*
deleteItem("usersTemporal",{name:"simpler"}).then(function(rs){
	console.log(rs);
}).catch(function(error){
	console.log(error);
});
*/
