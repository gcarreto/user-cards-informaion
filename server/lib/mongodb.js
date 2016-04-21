var promise = require('bluebird');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var env = require('../config/appEnvironment');
var config = require('../config/config')[env];
var databaseUrl = "mongodb://"+config.mongodb.host+":"+config.mongodb.port+"/"+
	config.mongodb.database;

var insert = exports.insert = function(collectionName,item){
	
	return new Promise(function(resolve,reject){
		mongoClient.connect(databaseUrl,function(err,db){
			
			if(err){				
				//console.log("unable to connect to mongodb server. Error",err);
				return reject(err);
			}
						
			var collection = db.collection(collectionName);
			
			collection.insert([item],function(errr,result){
				if(errr){
					reject(errr);
				}else{
					resolve(result);
				}				
								
				db.close();
			});		
		});		
	});		
} 

var findAll = exports.findAll = function(collectionName,itemFilter){
	
	return new Promise(function(resolve,reject){
		mongoClient.connect(databaseUrl,function(err,db){
			
			if(err){				
				//console.log("unable to connect to mongodb server. Error",err);
				return reject(err);
			}
						
			var collection = db.collection(collectionName);
			
			collection.find(itemFilter).toArray(function(errr,result){
				if(errr){
					return reject(errr);
				}
				
				resolve(result);				
				db.close();
			});		
		});		
	});		
}

var findOne = exports.findOne = function(collectionName,itemFilter){
	
	return new Promise(function(resolve,reject){
		mongoClient.connect(databaseUrl,function(err,db){
			
			if(err){				
				//console.log("unable to connect to mongodb server. Error",err);
				return reject(err);
			}
						
			var collection = db.collection(collectionName);
			
			collection.findOne(itemFilter,function(errr,result){
				if(errr){
					return reject(errr);
				}else{
					resolve(result);
				}				
								
				db.close();
			});		
		});		
	});		
}

var findPaginated = exports.findPaginated = function(collectionName,itemFilter,limit,start){
	
	return new Promise(function(resolve,reject){
		mongoClient.connect(databaseUrl,function(err,db){
			
			if(err){				
				return reject(err);
			}
						
			var collection = db.collection(collectionName);			
			var cursor = collection.find(itemFilter);			
			cursor.limit(limit);
			cursor.skip(start);
			
			cursor.toArray(function(errr,result){
				if(errr){
					return reject(errr);
				}
				
				resolve(result);				
				db.close();
			});		
		});		
	});		
}

var update = exports.update = function(collectionName,updateCondition,newProperties){
	
	return new Promise(function(resolve,reject){
		mongoClient.connect(databaseUrl,function(err,db){
			
			if(err){				
				return reject(err);
			}
						
			var collection = db.collection(collectionName);			
			
			collection.update(updateCondition,{$set:newProperties},function(errr,result){
				if(errr){
					return reject(errr);
				}
				
				resolve(result.result.n);								
								
				db.close();
			});		
		});		
	});
}

var deleteItem = exports.deleteItem = function(collectionName,deleteCondition){
	
	return new Promise(function(resolve,reject){
		mongoClient.connect(databaseUrl,function(err,db){
			
			if(err){				
				return reject(err);
			}
						
			var collection = db.collection(collectionName);			
			
			collection.deleteOne(deleteCondition,function(errr,result){
				if(errr){
					return reject(errr);
				}				
				
				resolve(result.result.n);
								
				db.close();
			});		
		});		
	});
}

