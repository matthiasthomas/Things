angular.module('app').value('$config', {
	env: "DEV",
	currentVersion: "1.0.0",
	debug: false,

	getApiAddr: function () {
		return this.api.prefix + this.api.addr + ":" + this.api.port + this.api.sub;
	},

	api: {
		prefix: "http://",
		addr: "localhost",
		port: 8080,
		sub: '/api',
		route: {
			auth: {
				logout: "/auth/logout",
				login: "/auth/local",
				user: "/auth/user",
			},
			user: "/user"
		}
	},

	storage: {
		get: function (item) {
			return JSON.parse(localStorage.getItem(item));
		},
		set: function (name, value) {
			var itemString = JSON.stringify(value);
			localStorage.setItem(name, itemString);
			return true;
		},
		delete: function (item) {
			localStorage.removeItem(item);
			return true;
		}
	}
});