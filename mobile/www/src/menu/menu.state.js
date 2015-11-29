angular.module('app').config(function ($stateProvider) {
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'src/menu/menu.html',
        controller: 'MenuCtrl'
    });

});