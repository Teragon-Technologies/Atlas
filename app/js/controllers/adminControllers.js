'use strict';
//var api = 'http://home.teragonhost.com:8080/';
var api  = 'http://node.teragonhost.com/atlas/api/';


app.controller('navigation', function($scope, title, $window) {
	$scope.title = title.getTitle();
	$scope.links = false;
	
	$scope.$on('TitleChanges', function(event, title) {
		$scope.title = title;
	});

	$(document).foundation();
});

app.controller('loginController', function($scope, $http, $rootScope, $location, title, $window, error) {
	title.setTitle('Log in');
	$scope.$on('ErrorChange', function(event, error) {
		$scope.error = error;
	});
	$scope.error = '';
	$scope.login = function(user) {
		var auth = $http.post(api + 'login', user);
		auth.success(function(res) {
			if (res.user.role.name == 'Admin') {
				$http.defaults.headers.common.Authorization = res.user.token;
				$window.sessionStorage.user = JSON.stringify(res.user);
				$location.path( "/dashboard" );
			} else {
				$scope.error = "You are not authorized to access this area!";
			}
		}).error(function(res) {
			error.response(res);
		});
	}
})

app.controller('dashboard', function($scope, title) {
	title.setTitle('Dashboard');
});

app.controller('affiliates', function($scope, $http, $location, title, error) {
	title.setTitle('Affiliate Management');

	$scope.stores = {};

	io.socket.on('stores', function notificationReceivedFromServer ( message ) {
    	$scope.getAffiliates();
	});
	io.socket.get(api+'Stores/subscribe');

	$scope.create = function(affiliate) {
		var data = $http.post(api + 'Stores/create', affiliate);
		data.success(function(res) {
			$location.path("/affiliateManage");
		}).error(function(res) {
			error.response(res);
		});;
	}

	$scope.getAffiliates = function() {
		var data = $http.get(api + 'Stores');
		data.success(function(res) {
			$scope.stores = res.stores;
		}).error(function(res) {
			error.response(res);
		});
	}
});

app.controller('affiliate', function($scope, $routeParams, $http, title, error) {
	title.setTitle('Affiliate Management');
	$scope.store = {};

	$scope.init = function() {
		var getAffiliate = $http.get(api+'Stores/'+$routeParams.id);
		getAffiliate.success(function(res) {
			$scope.store = res;
		}).error(function(res) {
			error.response(res);
		});;
	}

});

app.controller('accounts', function($scope, $http, title, error) {
	title.setTitle('Account Management');
	$(document).foundation();
	$scope.users = {};
	$scope.roles = {};
	$scope.current = {};

	io.socket.on('users', function notificationReceivedFromServer ( message ) {
    	$scope.init();
	});
	io.socket.get(api+'Users/subscribe');

	$scope.init = function() {
		var users = $http.get(api + 'Users');
		users.success(function(res) {
			$scope.users = res;
		}).error(function(res) {
			error.response(res);
		});

		var roles = $http.get(api+'Roles');
		roles.success(function(res) {
			$scope.roles = res;
		}).error(function(res) {
			error.response(res);
		});;
		

	}

	$scope.setCurrent = function(id) {
		for (var i=0; i<$scope.users.length; i++) {
			if ($scope.users[i].id == id) {
				$scope.current = $scope.users[i];
				break;
			}

		}
	}

	$scope.addUser = function(user) {
		user.password = "123";
		var create = $http.post(api + 'Users/create', user);
		create.success(function(res) {
			$scope.init();

		});
	}

	$scope.editUser = function(current) {
		var update = $http.post(api+'Users/modify', current);
		update.success(function() {
			$scope.init();
		})

	}

	$scope.delUser = function(id) {
		var del = $http.post(api + 'Users/destroy/'+id);
		del.success(function(res) {
			$scope.init();
		});
	}

	$scope.lastLoggedIn = function(date) {
		var d1 = new Date(date);
		var d2 = new Date();
		var miliseconds = d2-d1;
		var seconds = miliseconds/1000;
		if (seconds > 60) {
			var minutes = seconds/60;
			if (minutes > 60) {
				var hours = minutes/60;
				if (hours > 24) {
					var days = hours/24;
					return Math.floor(days) + ' days ago';
				} else {
					return Math.floor(hours) + ' hours ago';
				}
			} else {
				return Math.floor(minutes) + ' minutes ago';
			}
		} else {
			return Math.floor(seconds) + ' seconds ago';
		}
	}
});

app.controller('items', function($scope, $http, title) {
	title.setTitle('Item Management');
	$(document).foundation();


});