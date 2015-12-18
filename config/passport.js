
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user'); 

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use('login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) 
		{	
			console.log('this far'); 
			User.findOne({
				'username':username
			}, function(err, user) {
				if(err) {
					console.log('some error'); 
					return done(err);
				}
			
				if(!user) {
					console.log('no user'); 
					return done(null, false);
				}
				
				if(!user.validPassword(password)) {
					console.log('its broken'); 					
					return done(null, false);
				}

				return done(null, user);
			});
		}
	));

	passport.use('register', new LocalStrategy({
		passReqToCallback: true
	},
		function(req, username, password, done){
			User.findOne({'username': username},
				function(err, user){
					if(err){
						return done(err);
						console.log(err);
					}
					if(user){
						console.log('sorry that username is already taken');
						return done(null, false);
					}
					else{
						var newUser = new User(req.body);
						newUser.setPassword(req.body.password);
						newUser.save(function(err){
							if(err){
								throw err;
							}
							return done(null, newUser);
						}); 
					}
				})
		}
	));
}; 