'use strict';

affiliate.directive('loginForm', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/tpl/login.tpl.html',
	}
});

affiliate.directive('navigation', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/tpl/affiliate-nav.tpl.html',
	}
})