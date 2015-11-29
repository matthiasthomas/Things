angular.module('app').controller('ModuleCtrl', function ($scope, MapFactory) {

	$scope.$on('$stateChangeSuccess', function () {
		console.log('ModuleCtrl');
	});

});