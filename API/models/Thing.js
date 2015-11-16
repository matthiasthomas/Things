var mongoose = require('./Db.js').mongoose;

var thingSchema = new mongoose.Schema({
	title: {
		type: String
	},
	// Description of the place, details...
	what: {
		type: String
	},
	when: {
		// Is there a season when it's best to go or is it temporary
		details: String,
		// it can be on a single day
		date: Date,
		// On a precise time
		time: String,
		// It can be during a certain period
		startDate: Date,
		endDate: Date,
		// It can have opening hours
		openingTime: String,
		closingTime: String,
		// For a museum or else which has the same hours year long (or from monthStart to monthEnd)
		openings: [{
			day: String,
			// It can close and open multiple times a day (with a lunch break for example)
			hours: [{
				start: String,
				end: String
			}],
			monthStart: String,
			monthEnd: String
		}]
	},
	// How many people have been there
	numberOfPeople: {
		type: Boolean
	},
	price: {
		type: String
	},
	_category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	tags: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tag'
	}],
	location: {
		address: String,
		city: String,
		zip: String,
		country: String,
		latitude: String,
		longitude: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date
});

var thingModel = mongoose.model('Thing', thingSchema);
exports.Thing = thingModel;