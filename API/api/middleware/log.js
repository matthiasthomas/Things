"use strict"
var chalk = require("chalk");

/**
 * Log middleware
 */
module.exports = function (app, config, modules, models) {

	var getRoute = function () {
		function logHandler(methods, path) {
			console.log(chalk.green('Load route'), chalk.cyan(methods), chalk.cyan(path));
		}
		app._router.stack.forEach(function (middleware) {
			if (middleware.route) { // routes registered directly on the app
				if (middleware.route.path != '*') {
					logHandler(Object.keys(middleware.route.methods), middleware.route.path);
				}
			} else if (middleware.name === 'router') { // router middleware 
				middleware.handle.stack.forEach(function (handler) {
					if (handler.route && handler.route.path != '*') {
						logHandler(Object.keys(handler.route.methods), '/api' + handler.route.path);
					}
				});
			}
		});
	}

	return {
		getRoute: getRoute
	}
};