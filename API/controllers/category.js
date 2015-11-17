module.exports.controller = function(app, router, config, modules, models, middlewares) {
	/**
	 *  Get All
	 **/
	router.get('/categories', function(req, res) {
		models.Category
			.find()
			.exec(function(err, categories) {
				if (err) {
					if (config.debug) {
						console.log({
							error_GET_categories: err
						});
					}
					return res.json({
						success: false,
						err: "An error occured."
					});
				}
				return res.json({
					success: true,
					data: categories
				});
			});
	});

	/**
	 * Get One By ID
	 **/
	router.get('/category/:id', middlewares.checkAuth, function(req, res) {
		models.Category.findById(req.params.id)
			.select('-__v')
			.exec(function(err, category) {
				if (err) {
					if (config.debug) {
						console.log({
							error_GET_category: err
						});
					}
					return res.json({
						success: false,
						err: "An error occured."
					});
				}
				return res.json({
					success: true,
					data: category
				});
			});
	});

	/**
	 * Create
	 **/
	router.post('/categories', middlewares.checkAuth, function(req, res) {
		modules.async.waterfall([
			// Check the fields
			function(callback) {
				if (!req.body.title || !req.body.description) {
					return callback("All fields must be completed.");
				}
				return callback();
			},
			// Check title existence
			function(callback) {
				models.Category.find({
					title: req.body.title
				}, function(err, categories) {
					if (err) return callback(err);
					if (categories.length > 0) return callback('Category title already exists.');
					return callback();
				});
			},
			// Create category
			function(callback) {
				var category = new Category({
					title: req.body.title,
					description: req.body.description
				});
				category.save(function(err) {
					if (err) return callback(err);
					return callback(null, category);
				});
			}
		], function(err, category) {
			if (err) {
				if (config.debug) {
					console.log({
						error_GET_categories: err
					});
				}
				return res.json({
					success: false,
					err: "An error occured."
				});
			}
			return res.json({
				success: true,
				data: category
			});
		});
	});
};