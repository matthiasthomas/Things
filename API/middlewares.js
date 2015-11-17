module.exports.controller = function (app, config, modules, models, middlewares, sessions) {

	function getSessionIndexByToken(token) {
		// Loop through the sessions
		for (var i = 0; i < sessions.length; i++) {
			// If a session corresponds
			if (token == sessions[i].token) return i;
		}
		return -1;
	}

	function getTokenByKey(key, callback) {
		models.Token.findOne({
			key: key,
			archived: false
		}).populate('_user', 'email currentToken profile').exec(function (error, token) {
			if (error || !token) return callback("Invalid Token");
			return callback(null, token);
		});
	}

	// To check wether the user is authenticated or not
	exports.checkAuth = function (req, res, next) {
		// Get the token from the request headers
		var key = req.headers["x-access-token"];
		getTokenByKey(key, function (error, token) {
			if (error || !token) return res.status(401).end();
			// Check if it's still alive
			if (token.isAlive()) {
				token.renew(function (error) {
					if (error) return res.send(error);
					// Add user object to the request, and next
					req.user = token._user;
					return next();
				});
			} else {
				return res.status(401).end();
			}
		});
	};

	// Same as checkAuth but won't return a 401;
	// It will just next() with an empty req.user if no user was connected
	exports.populateUser = function (req, res, next) {
		// Get the token from the request headers
		var key = req.headers["x-access-token"];
		getTokenByKey(key, function (error, token) {
			if (error || !token) return next();
			// Check if it's still alive
			if (token.isAlive()) {
				token.renew(function (error) {
					if (error) return res.send(error);
					// Add user object to the request, and next
					req.user = token._user;
					return next();
				});
			} else {
				return next();
			}
		});
	};

	exports.getIP = function (req, res, next) {
		if (!req.things) req.things = {};
		req.things.IP = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		"unknown";
		next();
	};

	exports.catch = function (req, res, next) {
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
	};


	exports.header = function (req, res, next) {
		res.header("Cache-Control", "max-age=1");
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
		res.header("Access-Control-Allow-Headers", "Content-Type,x-access-token");
		next();
	};
};