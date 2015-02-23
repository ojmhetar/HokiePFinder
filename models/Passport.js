var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PassportSchema = new Schema({
	idnumber: Number,
	lastname: String,
	loc: String,
	contactemail: String,
	contactphone: String,
	owneremail: String,	
});

module.exports = mongoose.model('Passport', PassportSchema);
