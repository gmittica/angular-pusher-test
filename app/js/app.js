'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', '$provide', function($routeProvider, $provide) {
  $routeProvider.when('/test', {templateUrl: 'partials/test.html', controller: 'MyCtrl1'});
  $routeProvider.otherwise({redirectTo: '/test'});
}])
.constant('configPusher', {
	appKey: '', //set app key
	options: {
		authTransport: 'jsonp',
		authEndpoint: 'http://www.gabrielemittica.com/auth.php'
	}
});
