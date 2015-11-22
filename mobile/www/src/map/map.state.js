angular.module('app').config(function ($stateProvider) {
    $stateProvider.state('map', {
        url: '/map',
        templateUrl: 'src/map/map.html',
        controller: 'MapCtrl'
    });
});