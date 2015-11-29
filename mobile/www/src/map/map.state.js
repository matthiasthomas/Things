angular.module('app').config(function ($stateProvider) {
    $stateProvider.state('app.map', {
        url: '/map',
        views: {
            'menuContent': {
                templateUrl: 'src/map/map.html',
                controller: 'MapCtrl'
            }
        }

    });
});