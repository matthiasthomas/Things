module.exports.controller = function(app, router, config, modules, models, middlewares, sessions) {

	app.get('/auth/user', middlewares.checkAuth, function(req, res, next) {
		res.json({
			"success": true,
			"data": req.user
		});
	});


	/** auth LOCAL **/
	app.post('/auth/local', function(req, res, next) {
		modules.passport.authenticate('local', {}, function(err, user, info) {
			if (err || !user) {
				return res.json({
					"success": false,
					"error": "Invalid email / password."
				});
			}
			req.login(user, function(err) {
				if (err) return next(err);
				return res.json({
					"success": true,
					"data": {
						token: user.currentToken
					}
				});
			});
		})(req, res, next);
	});


	/**
	 * oAuth GOOGLE
	 **/
	app.get('/auth/google', middlewares.populateUser, modules.passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
	}));

	app.get('/auth/google/callback', middlewares.populateUser, function(req, res, next) {
		modules.passport.authenticate('google', {
			failureRedirect: '/#/auth/error'
		}, function(err, user) {
			if (err || !user) {
				console.log(err);
				return res.redirect('/#/auth/error');
			}
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.redirect('/#/auth/success/' + user.currentToken);
			});
		})(req, res, next);
	});


	/**
	 * oAuth FACEBOOK
	 **/
	app.get('/auth/facebook', middlewares.populateUser, modules.passport.authenticate('facebook', {
		authType: 'rerequest',
		scope: ['email', 'user_location']
	}));

	app.get('/auth/facebook/callback', middlewares.populateUser, function(req, res, next) {
		modules.passport.authenticate('facebook', {
			failureRedirect: '/#/auth/error'
		}, function(err, user) {
			if (err || !user) {
				return res.redirect('/#/auth/error');
			}
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.redirect('/#/auth/success/' + user.currentToken);
			});
		})(req, res, next);
	});

	/**
	 * oAuth Twitter
	 **/
	app.get('/auth/twitter', middlewares.populateUser, modules.passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', middlewares.populateUser, function(req, res, next) {
		modules.passport.authenticate('twitter', {
			failureRedirect: '/#/auth/error'
		}, function(err, user) {
			if (err || !user) {
				return res.redirect('/#/auth/error');
			}
			req.login(user, function(err) {
				if (err) return next(err);
				return res.redirect('/#/auth/success/' + user.currentToken);
			});
		})(req, res, next);
	});

	/**
	 * LOGOUT
	 **/
	app.get('/auth/logout', middlewares.checkAuth, function(req, res, next) {
		modules.async.waterfall([
				// Get the token
				function(callback) {
					models.Token.findOne({
						_user: req.user._id,
						archived: false
					}, callback);
				},
				// Archive it
				function(token, callback) {
					if (!token) return callback(null);
					token.archived = true;
					token.save(function(err) {
						if (err) return callback(err);
						return callback(null);
					});
				}
			],
			function(err, success) {
				if (err) {
					return res.json({
						success: false,
						err: err
					});
				}
				return res.json({
					success: true
				});
			});
	});
};