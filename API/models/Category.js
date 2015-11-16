var mongoose = require('./Db.js').mongoose;

var categorySchema = new mongoose.Schema({
	title: String,
	description: String,
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date
});

var categoryModel = mongoose.model('Category', categorySchema);
exports.Category = categoryModel;