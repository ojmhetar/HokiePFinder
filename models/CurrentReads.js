var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CurrentReadsSchema = new Schema({
	minor: String, 
	hostlerId: Number, 
	lat: Number, 
	lng: Number, 
	spot: String,
	timestamp: Number,
});

module.exports = mongoose.model('CurrentReads', CurrentReadsSchema);