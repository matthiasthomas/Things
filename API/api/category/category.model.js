var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: String,
	description: String,
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date
});

var Category = mongoose.model('Category', schema);

module.exports = Category;