var mongoose = require('./Db.js').mongoose;

var thingSchema = mongoose.Schema({
	
});

var thingModel = mongoose.model('Thing', thingSchema);
exports.Thing = thingModel;