"use strict";
var path = require("path");
var _ = require("lodash");

var env = process.env.NODE_ENV || 'DEV';
process.argv.forEach(function (arg) {
	if (arg == "PROD" || arg == "TEST") {
		env = arg
	}
});

var base = {
	root: path.normalize(path.join(__dirname, '../', '/..')),
	env: env,
	ttlToken: 7200, //2H
	address: env == "PROD" ? '176.31.167.154' : 'localhost',
	port: env == "PROD" ? '80' : '8080',
	storage: path.join(__dirname, '../', 'data'),
}

// Pictures properties
base.thumbnailsDirectory = base.storage + "/thumbnails";
base.tmpDirectory = base.storage + "/.tmp";
base.thumbnailsSize = "300x?"; //Eg: 300x300, 300x?, ?x300
base.picturesDirectory = base.storage + "/pictures";

var specific = {
	DEV: {
		salt: "d6jn$xvuR2y$JqhYgXqu9$RmD6qhW",
		database: 'mongodb://127.0.0.1:27017/things_dev',
		debug: true
	},
	TEST: {
		salt: "d6jn$xvuR2y$JWhYgXqsq8$Rm8oqhW",
		database: 'mongodb://127.0.0.1:27017/things_test',
		debug: true
	},
	PROD: {
		salt: "d6jn$xvuR2y$TYUYgXqu9$Rm8oqhW",
		database: 'mongodb://127.0.0.1:27017/things',
		debug: false
	},
};

module.exports = _.merge(base, specific[env]);