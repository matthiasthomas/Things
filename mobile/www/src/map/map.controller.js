angular.module('app').controller('MapCtrl', function ($scope, MapFactory) {

	console.log('MapCtrl');
	$scope.$on('$stateChangeSuccess', function () {
		console.log('MapCtrl');
	});

});