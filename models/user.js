var mongoose = require('mongoose'), Schema = mongoose.Schema; 
var cryptoJs = require('crypto-js');

var cryptAlg = require('crypto-js/aes');

var passphrase = "command my feet"; 

var userSchema = new Schema({
	username: String,
	password: String, 
	email:{
		type: String,
		default: 'fakeEmail@fake.com'
	}, 
	dateCreated: {
		type: Date,
		default: Date.now
	}
});



userSchema.methods.setPassword = function(password){
	this.password = cryptAlg.encrypt(password, "crazy daisy");
}

userSchema.methods.validPassword = function(password){
	var wordsArray= cryptAlg.decrypt(this.password, "crazy daisy");
	if(password  == wordsArray.toString(cryptoJs.enc.Utf8)){
		return true;
	}


}



module.exports = mongoose.model('user', userSchema);

