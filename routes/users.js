var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/userprofile', function(req, res, next){
	res.render('userprofile');
}); 


module.exports = router;
