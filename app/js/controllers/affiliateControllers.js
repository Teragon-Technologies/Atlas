'use strict';
//var api = 'http://home.teragonhost.com:8080/';
var api  = 'http://node.teragonhost.com/atlas/api/';


affiliate.controller('navigation', function($scope, title, $window) {
	$scope.title = title.getTitle();
	$scope.links = false;
	
	$scope.$on('TitleChanges', function(event, title) {
		$scope.title = title;
	});

	$(document).foundation();
});

affiliate.controller('loginController', function($scope, $http, $rootScope, $location, title, $window) {
	title.setTitle('Log in');
	$scope.error = '';
	$scope.login = function(user) {
		var auth = $http.post(api + 'login', user);
		auth.success(function(res) {
			if (res.user.role.name == 'General Manager') {
				$window.sessionStorage.user = JSON.stringify(res.user);
				if (res.user.setup == false) {
					$location.path('/setup');
				} else if (res.user.store.setup) {
					$location.path('/dashboard');
				} else {
					$location.path( "/profile" );
				}
			} else {
				$scope.error = "You are not authorized to access this area!";
			}
		}).error(function(res) {
			$scope.error = res.error;
		})
	}
});

affiliate.controller('accounts', function($scope, $http, $window, $location, title) {
	title.setTitle('Account Setup');
	$scope.update = function(user) {
		var auth = $http.post(api + 'login', {username: user.old_username, password: user.old_password});
		auth.success(function(res) {
			if (user.password === user.vpassword) {
				var currentUser = JSON.parse($window.sessionStorage.user);
				var update = $http.post(api+'Users/modify', {id: currentUser.id, username: user.username, password: user.password, setup: true});
				update.success(function(res) {
					if (res.store.setup) {
						$location.path('/dashboard');
					} else {
						$location.path('/profile');
					}
				});

			} else {
				$scope.error = 'New Passwords do not match!';
			}
		}).error(function(res) {
			$scope.error = res.error;
		});
	}
});

affiliate.controller('affiliates', function($scope, $http, $window, $location, $filter, title) {
	title.setTitle('Profile Setup');

	

	$scope.updateStore = function(store) {
		var i;
		for(i in store.hours) {
			store.hours[i].start = $filter('date')(store.hours[i].start, 'shortTime');
			store.hours[i].close = $filter('date')(store.hours[i].close, 'shortTime');
		}
		store.setup = true;
		console.log(store);
		// API Call to update store profile
	}

	$scope.calculateClose = function (day) {
		var d1 = new Date(day.start);
		d1.setTime(d1.getUTCMilliseconds() + (day.duration*60*60*1000));
		day.close = d1;
	}

});
