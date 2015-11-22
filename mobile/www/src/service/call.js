angular.module('app').factory('$call', [
	'$scope', '$http', '$location', '$config',
	function ($scope, $http, $location, $config) {
		
		/**
		 * Catch request error 
		 * @Error message
		 * @Code code http error
		 */
		var httpError = function (err, code) {
			if (401 == code) {
				console.error('Error 401');
				$location.path("/");
			} else if (404 == code) {
				console.error('Error 404');
				$location.path("/");
			} else if (500 == code || 503 == code) {
				console.error('Error 500 or 503');
				$location.path("/");
			} else {
				console.error('Error CONNECTION LOST OR REFUSED', err, code);
			}
		};

		var $call = {

			/**
			 * Request Factory
			 * @method {string} HTTP method GET, POST, PUT, DELETE
			 * @model {string} API route
			 * @param {string} url param  (optional)
			 * @data {object} body object  (optional)
			 * @token {bool} add header token  (optional)
			 * @Return {promise} return response object or true or catch error
			 */
			request: function (method, model, param, data, token) {
				var url = $config.getApiAddr() + model;
				if (param) { url = url + "/" + param; }
				if (!method) { method = "GET"; }

				return $http({
					url: url,
					method: method,
					headers: {
						'x-access-token': (token) ? $scope.app.getToken() : null
						// 'Authorization': 'Basic ' + login_base64
					},
					data: data
				}).then(function (res) {
					if ($config.debug) {
						console.log('%cRequest ' + method + ' ' + ' at ' + model, 'color: purple');
						console.log(res);
					}
					if (res.data.status) {
						if (res.data.data) {
							return res.data.data;
						} else {
							return true;
						}
					} else {
						return $scope.app.showNotif(res.data.error, 'error');
					}
				},
					function (error) {
						return httpError(error.statusText, error.status);
					});
			}

		};

		return $call;
	}]);  