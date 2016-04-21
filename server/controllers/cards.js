var apiHandler = require('../lib/apiHandler');
var env = require('../config/appEnvironment');
var config = require('../config/config')[env];
var mongodb = require('../lib/mongodb');
var mongodbL = require('mongodb');
var promise = require('bluebird');

exports.getCards = function(req){
	
	req.session.databasePage || (req.session.databasePage = 0)
	req.session.databaseLimitReached != undefined || (req.session.databaseLimitReached = false)
	
	var p = promise.resolve([]);
	
	if(!req.session.databaseLimitReached){
		
		p = mongodb.findPaginated(config.mongodb.collections.cardsInfo.collectionName,
		{autor:req.user.email},10,1*req.session.databasePage).then(function(rs){
			
			if(rs.length < 10){
				req.databaseLimitReached = true;
			}else{
				req.session.databasePage++;
			}
			return rs;
		}).catch(function(rr){
			console.log(rr);
			return [];
		});
	}
	
	return p.then(function(cardsFromDB){
		
		var limit = 10 - cardsFromDB.length;
		if(limit){
			return apiHandler.restApiHandler({
				host:config.holonis.host,
				port:config.holonis.port,
				method:config.holonis.method,
				path:config.holonis.path + limit
			}).then(function(apiCards){
				
				apiCards.forEach(function(apiCard){
					
					cardsFromDB.push({
						name:apiCard.name,
						username:apiCard.username,
						email:apiCard.email,
						phone:apiCard.phone,
						gender:"",
						address:apiCard.address.streetA,
						city:apiCard.address.city,
						country:apiCard.address.country
					});
				});
				
				return cardsFromDB;
			});
		}else{
			return cardsFromDB;
		}
	}).catch(function(e){
		console.log(e);
		return [];
	});		
}

exports.saveCard = function(cardData,autor){
	
	cardData['autor'] = autor;
	return mongodb.insert(config.mongodb.collections.cardsInfo.collectionName,cardData).catch(function(rr){
		console.log(rr);
		return false;
	}).then(function(rs){
		return rs?true:false;
	});	
}

exports.deleteCard = function(cardId,autor){
	
	return  mongodb.deleteItem(config.mongodb.collections.cardsInfo.collectionName,
	{_id: new mongodbL.ObjectID(cardId),autor:autor});	
}

exports.updateCard = function(cardId,properties){
	
	delete properties['_id'];
	delete properties['index'];
		
	return mongodb.update(config.mongodb.collections.cardsInfo.collectionName,
	{_id:new mongodbL.ObjectID(cardId)},properties);	
}

/*
insert("usersTemporal",{name:"simple name",opt:"simple extra",antoo:"works"}).then(function(rs){
	console.log(rs);
}).catch(function(rr){
	console.log(rr);
});
*/

/*
find("usersTemporal",{name:"simple name"}).then(function(rs){
	console.log(rs);
}).catch(function(rr){
	console.log(rr);
});
/*/

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