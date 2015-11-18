"use strict"

/**
 * Catch middleware
 */
module.exports = function (app, config, models, modules) {

	return function (req, res, next) {
		res.success = function (data) {
			if (config.debug) {
				console.log("Response data :", data);
			}
			return res.json({ "success": true, "time": Date.now(), "data": data });
		};
		res.error = function (err, param) {
			if (config.debug) {
				console.log("Response error :", err);
				console.log("Resonse param", param);
			}
			if (typeof (err == "string")) {
				return res.json({ "success": false, "error": 200, "message": err })
			} else {
				return res.json({ "success": false, "error": err, "message": err.errors.description.message })
			}
		};
		return next();
	}

}