var mongoose = require('./Db.js').mongoose;

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: {
		type: String
	},

	facebook: {
		type: String
	},
	twitter: {
		type: String
	},
	google: {
		type: String
	},
	github: {
		type: String
	},
	instagram: {
		type: String
	},
	linkedin: {
		type: String
	},
	tokens: {
		type: Array
	},

	categories: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	}],

	profile: {
		name: {
			type: String,
			default: ''
		},
		gender: {
			type: String,
			default: ''
		},
		location: {
			type: String,
			default: ''
		},
		website: {
			type: String,
			default: ''
		},
		picture: {
			type: String,
			default: ''
		}
	},

	created: {
		type: Date,
		default: Date.now
	},
	updated: String
});

var userModel = mongoose.model('User', userSchema);
exports.User = userModel;