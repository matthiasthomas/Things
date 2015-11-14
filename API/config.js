/**
 * CONFIG
 **/
var profile = "DEV"; // DEV / PROD
process.argv.forEach(function(arg) {
	if (arg == "PROD" ||  arg == "DEV") {
		profile = arg;
	}
});

var config = {
	ttlToken: 7200, //1h
	debug: profile == "DEV" ? true : false,
	salt: "d6jn$xvuR2y$JWhYgXqu9$Rm8oqhW",
	rootDirectory: __dirname,
	server: {
		address: profile == "DEV" ? 'localhost' : '176.31.167.154',
		port: profile == "DEV" ? '8080' : '80'
	},
	storageDirectory: __dirname + "/data",
	profile: profile
};

// Video properties
config.thumbnailsDirectory = config.storageDirectory + "/thumbnails";
config.tmpDirectory = config.storageDirectory + "/.tmp";
config.thumbnailsSize = "300x?"; //Eg: 300x300, 300x?, ?x300
config.picturesDirectory = config.storageDirectory + "/pictures";

// oAuth properties
config.oauth = {
	google: {
		clientId: "692138578031-avhpmuvu7g92kkrdl8pav3katk3n9asa.apps.googleusercontent.com",
		clientSecret: "w3mv2HIeIpFVu6MImZB_oUr6"
	},
	facebook: {
		clientId: "718430748292626",
		clientSecret: "a0799427bf154a5a38e2d159f7ffbe4c"
	}
};

exports.config = config;