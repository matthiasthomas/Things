angular.module('app').controller('HomeCtrl', function ($scope) {

	$scope.$on('$stateChangeSuccess', function () {
		console.log('HomeCtrl');
	});

});