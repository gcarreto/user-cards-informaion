var fs = require('fs');
var auth = require('./auth');
var cardsController = require('../controllers/cards');

module.exports = function(app,prefix){
	
	app.post("/"+prefix+"/signup",auth.signup);	

	app.get("/"+prefix+"/cards",auth.requiresLogin,function(req,res){
		res.render("cards.html");
	});
			
	app.get("/"+prefix+"/users/cards",auth.requiresLogin,function(req,res){
		cardsController.getCards(req).then(function(userCards){
			res.json(userCards);
		});		
	});
	
	app.post("/"+prefix+"/users/cards/:cardId",auth.requiresLogin,function(req,res){
		
		cardsController.updateCard(req.params.cardId,req.body).then(function(rs){
			res.json({success:rs});
		}).catch(function(error){
			res.json({success:0,error:error});
		});						
	});
	
	app.delete("/"+prefix+"/users/cards/:cardId",auth.requiresLogin,function(req,res){
					
		cardsController.deleteCard(req.params.cardId,req.user.email).then(function(rs){
			res.json({success:rs});
		}).catch(function(error){
			res.json({success:0,error:error});
		});		
	});
	
	app.post("/"+prefix+"/users/cards",auth.requiresLogin,function(req,res){				
		cardsController.saveCard(req.body,req.user.email).then(function(rs){
			res.json({'success':rs});
		});		
	});	
	
	app.get("/"+prefix+"/auth/facebook",auth.authFacebook({scope:'email'}));	
	
	app.get("/"+prefix+"/auth/facebook/callback",auth.authFacebook({
		successRedirect:'/'+prefix+"/cards",
		failureRedirect:'/'+prefix+"/login"
	}));			
	
	
	app.get("/"+prefix+"/login",function(req,res){
		res.render("login-angular.html");
	});	
	
	app.post("/"+prefix+"/authenticate",auth.authenticate);
		
	app.get("/"+prefix+"/logout",function(req,res){
		req.logout();
		res.redirect("/"+prefix+"/login");
	});
}