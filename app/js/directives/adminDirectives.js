'use strict';

app.directive('loginForm', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/tpl/login.tpl.html',
	}
});

app.directive('navigation', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/tpl/nav.tpl.html',
	}
})