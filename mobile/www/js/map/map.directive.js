angular.module('app').directive('map', function () {

	var link = function (scope, element, attrs) {
		var el = element[0];

		el.style.width = "100%";
		el.style.height = "100%";
        
		// map config
		var mapOptions = {};
    };

	return {
		restrict: 'AE',
		template: '<div></div>',
		replace: true,
		link: link
	};
});
