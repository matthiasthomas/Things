var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	text: String,
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date
});

var Tag = mongoose.model('Tag', schema);

module.exports = Tag;