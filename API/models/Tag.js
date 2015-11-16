var mongoose = require('./Db.js').mongoose;

var tagSchema = new mongoose.Schema({
	text: String,
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date
});

var tagModel = mongoose.model('Tag', tagSchema);
exports.Tag = tagModel;