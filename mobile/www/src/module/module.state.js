angular.module('app').config(function ($stateProvider) {
    $stateProvider.state('app.tab.module', {
        url: '/module',
		views: {
			'app-tab-module': {
				templateUrl: 'src/module/module.html',
				controller: 'ModuleCtrl'
			}
		}
    });
});