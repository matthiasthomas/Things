angular.module('app').config(function ($stateProvider) {
    $stateProvider.state('app.home', {
		url: '/home',
		views: {
			'menuContent': {
				templateUrl: 'src/home/home.html',
				controller: 'HomeCtrl'
			}
		}
	});
});