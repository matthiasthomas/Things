var mongoose = require('mongoose');
var config = require('../../config');

var schema = new mongoose.Schema({
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

schema.methods.isAlive = function () {
	return (this.expiration >= Math.round(+new Date() / 1000));
};

schema.methods.renew = function (callback) {
	this.expiration = Math.round(+new Date() / 1000) + config.ttlToken;
	this.save(callback);
};

var Token = mongoose.model('Token', schema);

module.exports = Token;