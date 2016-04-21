var passport = require('passport');
var env = require('./appEnvironment');
var config = require('./config')[env];

exports.signup = function(req,res,next){
	
    var auth = passport.authenticate('local-signup',function(err,user){		
		
		if(err){return res.json(err);}
        //if(err){return next(err);}
        if(!user){ return res.json({success:false});}
        req.logIn(user,function(error){
            if(error){return next(error);}      
            res.json({success:true,user:user});
        });      
    });
    auth(req,res,next);
}

exports.authenticate = function(req,res,next){
	
    var auth = passport.authenticate('local',function(err,user){
		
        if(err){return res.json(err);}
        if(!user){ return res.json({success:false});}
        req.logIn(user,function(error){
            if(error){return next(error);}      
            res.json({success:true,user:user});
        });       
    });
    auth(req,res,next);
};

exports.requiresLogin = function(req,res,next){
    if(!req.isAuthenticated()){
		res.redirect('/'+config.app_name+'/login');       
    }else{
        next();
    }
};

exports.authFacebook = function(conf){

	return function(req,res,next){

		var auth = passport.authenticate('facebook',conf);		
		
		auth(req,res,next);		
	}	
};
