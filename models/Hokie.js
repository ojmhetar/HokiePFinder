var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var PassportSchema = new Schema({
	idnumber: Number,
	date: String,  
	locationto: String, 
	contactemail: String,
	contactphone: String, 
});

module.exports = mongoose.model('Passport', PassportSchema); 
 
