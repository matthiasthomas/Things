var mongoose = require('./Db.js').mongoose;
var config = require("../config.js").config;

var tokenSchema = new mongoose.Schema({
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	key: String,
	expiration: String, // Date in seconds
	created: {
		type: Date,
		default: Date.now
	},
	archived: {
		type: Boolean,
		default: false
	}
});

tokenSchema.methods.isAlive = function() {
	return (this.expiration >= Math.round(+new Date() / 1000));
};

tokenSchema.methods.renew = function(callback) {
	this.expiration = Math.round(+new Date() / 1000) + config.ttlToken;
	this.save(callback);
};

exports.Token = mongoose.model('Token', tokenSchema);