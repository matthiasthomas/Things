angular.module('app').config(function ($stateProvider) {
    $stateProvider.state('app.tab', {
		url: '/tab',
		abstract: true,
		views: {
			'menuContent': {
				templateUrl: 'src/tab/tab.html',
				controller: 'TabCtrl'
			}
		}
	})
});

