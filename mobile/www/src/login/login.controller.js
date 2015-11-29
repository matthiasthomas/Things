angular.module('app').controller('LoginCtrl', function ($scope, MapFactory) {

	$scope.$on('$stateChangeSuccess', function () {
		console.log('LoginCtrl');
	});

});