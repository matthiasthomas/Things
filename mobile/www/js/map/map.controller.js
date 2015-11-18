angular.module('app').controller('MapCtrl', function ($scope, MapFactory) {

	$scope.$on('$stateChangeSuccess', function () {
		console.log('MapCtrl');
	});

});