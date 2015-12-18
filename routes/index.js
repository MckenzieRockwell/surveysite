var express = require('express');
var router = express.Router();
var passport = require('passport');

var localStrategy = require('passport-local').Strategy;



/* GET home page. */

router.get('/', function(req, res, next){
	res.render('partials/userlist')
}); 

router.get('/login', function(req, res, next){
 	res.render('partials/loginform'); 
}); 

router.get('/congrats', function(req, res, next){
	res.render('partials/congratspage'); 
}); 

router.get('/register', function(req, res, next){
	res.render('partials/register');
}); 

router.post('/register', passport.authenticate('register', 
	{
		successRedirect: '/congrats',
		failureRedirect: '/register'
	}
));

router.post('/login', passport.authenticate('login', 
	{

		successRedirect: '/congrats', 
		failureRedirect: '/login'
	}
)); 

router.get('/surveys', function(req, res, next){
	res.render('surveys');
}); 

module.exports = router;
