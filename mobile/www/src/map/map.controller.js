angular.module('app').controller('MapCtrl', function ($scope, MapFactory) {

	$scope.$on('$stateChangeSuccess', function () {
		console.log('MapCtrl');
	});

	if (ionic.Platform.isWebView()) {
		// Init Map
        var div = document.getElementById("map_canvas");
        var map = plugin.google.maps.Map.getMap(div);
        map.setOptions({
			//center: new plugin.google.maps.LatLng(50, 2),
			zoom: 4,
			//mapTypeId: plugin.google.maps.MapTypeId.ROADMAP, // HYBRID, ROADMAP, SATELLITE, TERRAIN
			scrollwheel: false
        });

	}
});