angular.module('app').config(function ($stateProvider) {
    $stateProvider.state('app.tab.home', {
		url: '/home',
		views: {
			'app-tab-home': {
				templateUrl: 'src/home/home.html',
				controller: 'HomeCtrl'
			}
		}
	})
});