"use strict"

/**
 * Header middleware
 */
module.exports = function (app, config, modules, models) {

	return function (req, res, next) {
		res.header("Cache-Control", "max-age=1");
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
		res.header("Access-Control-Allow-Headers", "Content-Type,x-access-token");
		if (req.method === 'OPTIONS') {
			res.statusCode = 204;
			return res.end();
		} else {
			return next();
		}
	}

}