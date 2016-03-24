var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CurrentPosSchema = new Schema({
	lat: Number, 
	lng: Number, 
	speed: Number,
	bearing: Number,
	timestamp: Number,

});

module.exports = mongoose.model('CurrentPos', CurrentPosSchema);