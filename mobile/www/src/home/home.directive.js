angular.module('app')
	.directive('searchEffect', function (classie, _) {
		var link = function (scope, element, attrs) {
			var el = element[0];
			element.bind('click', function () {
				var classActive = 'search-effect-active';
				classie.toggle(el, classActive);
			});
		};
		return {
			restrict: 'E',
			link: link
		};
	});