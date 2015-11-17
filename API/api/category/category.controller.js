module.exports = function (app, router, config, modules, models, middlewares) {


	app.get('/category', function (req, res) {
		res.success({ test: 'test' });
	});

	app.get('/category/error', function (req, res) {
		res.error('bullshit');
	});

};