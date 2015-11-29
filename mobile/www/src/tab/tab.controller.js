angular.module('app').controller('TabCtrl', function ($scope, $ionicSideMenuDelegate) {

	console.log('TabCtrl');
	
	$ionicSideMenuDelegate.canDragContent(false);
	
	$scope.toggleMenu = function() {
		$ionicSideMenuDelegate.toggleRight();
	};

});