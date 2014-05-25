'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('Atlas', ['ngRoute']);
var affiliate = angular.module('Affiliate', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginController'});
  $routeProvider.when('/dashboard', {templateUrl: 'partials/admin/dashboard.html', controller: 'dashboard'});
  $routeProvider.when('/affiliateCreate', {templateUrl: 'partials/admin/affiliate-create.html', controller: 'affiliates'});
  $routeProvider.when('/affiliateManage', {templateUrl: 'partials/admin/affiliate-manage.html', controller: 'affiliates'});
  $routeProvider.when('/accountManage', {templateUrl: 'partials/admin/accounts.html', controller: 'accounts'});
  $routeProvider.when('/affiliate/:id', {templateUrl: 'partials/admin/affiliate-account.html', controller: 'affiliate'});
  $routeProvider.when('/itemManage', {templateUrl: 'partials/admin/items-manage.html', controller: 'items'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);

app.run( function($rootScope, $window, error, $http, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if (typeof $window.sessionStorage.user == 'undefined') {
        // no logged user, we should be going to #login
        if ( next.templateUrl == 'partials/login.html' ) {
          // already going to #login, no redirect needed
          //var message = {error: 'You are not authenticated'};
          //error.setMessage(message);
        } else {
          // not going to #login, we should redirect now
          var message = {error: 'You are not authenticated'};
          error.setMessage(message);
          $location.path('/login');
        }
      }         
    });

    if (typeof $window.sessionStorage.user !== 'undefined') {
      var user = JSON.parse($window.sessionStorage.user);
      $http.defaults.headers.common.Authorization = user.token;
    }
 });

affiliate.config(['$routeProvider', function($routeProvider) { 
	$routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginController'});
	$routeProvider.when('/setup', {templateUrl: 'partials/affiliates/account-setup.html', controller: 'accounts'});
	$routeProvider.when('/profile', {templateUrl: 'partials/affiliates/profile.html', controller: 'affiliates'});
	$routeProvider.when('/dashboard', {templateUrl: 'partials/affiliates/affiliate-dashboard.html', controller: 'affiliates'});

	$routeProvider.otherwise({redirectTo: '/login'});
}]);

affiliate.run( function($rootScope, $location, $window) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($window.sessionStorage.user == null ) {
        // no logged user, we should be going to #login
        if ( next.templateUrl == "partials/login.html" ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( "/login" );
        }
      }         
    });
 });