var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var env = require('./appEnvironment');
var config = require('./config')[env];
var users = require('../services/users');

module.exports = function(passport){

	passport.use('local-signup',new LocalStrategy(function(email,password,done){
		users.findUser(email).then(function(user){
			if(user){
				return false;
			}else{
				
				return users.createUser({email:email,password:password}).then(function(creationRs){
					
					if(creationRs.result.n){
						return creationRs.ops[0];
					}else{
						return false;
					}
				});				
			}
			
		}).then(function(user){
			return done(null,user);						
		}).catch(function(rr){
			return done(rr);
		});		
    }));

	passport.use('local',new LocalStrategy(function(username,password,done){		
		
		users.findUser(username).then(function(user){		
			if(user){
				return done(null,user);				
			}else{
				return done(null,false);
			}
		}).catch(function(rr){
			console.log('rr',rr);
			return done(rr);
		});	
    }));
	
	passport.use(new FacebookStrategy({
		clientID	:config.facebook.id,
		clientSecret:config.facebook.secret,
		callbackURL	:config.facebook.callbackURL
	},
	function(token,refreshToken,profile,done){		
		
		//console.log(token,refreshToken,"profile",profile);
		if(profile){
			users.findUser(profile.id).then(function(user){
				
				if(user){
					return {username:profile.displayName,email:profile.id};
				}else{					
					return users.createUser({username:profile.displayName,email:profile.id})
					.then(function(creationRs){
						
						if(creationRs.result.n){
							return creationRs.ops[0];
						}else{
							return false;
						}
					});				
				}
				
			}).then(function(user){
				return done(null,user);						
			}).catch(function(rr){
				return done(rr);
			});
			
			//return done(null,{username:profile.displayName,email:profile.id});
		}else{			
			return done(null,false);
		}
		
	}));
	
    passport.serializeUser(function(user,done){

        if(user){	
            done(null,user.email);
        }else{
			done(null,false);
		}
    });

    passport.deserializeUser(function(id,done){		

		users.findUser(id).then(function(user){
			if(user){
				return done(null,user);				
			}else{
				return done(null,false);
			}
		});
		
    });
}