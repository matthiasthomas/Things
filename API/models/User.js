var mongoose = require('./Db.js').mongoose;

var userSchema = mongoose.Schema({
	accessToken: {
		type: String
	},
	password: {
		type: String
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	birthdate: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});

var userModel = mongoose.model('User', userSchema);
exports.User = userModel;