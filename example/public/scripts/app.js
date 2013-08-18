(function(){
  'use strict';
  angular.module('AuthTest.Config', []);
  angular.module('AuthTest.Services', ['AuthTest.Config']);
  angular.module('AuthTest.Controllers', []);
  angular.module('AuthTest', ['AuthTest.Services', 'AuthTest.Controllers'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
      $locationProvider.html5Mode(true);
      $routeProvider
        .when('/', {templateUrl:'/partials/index.html', controller: 'IndexCtrl'})
        .when('/login', {templateUrl: '/partials/login.html', controller: 'LoginCtrl'})
        .when('/signup', {templateUrl: '/partials/signup.html', controller: 'SignupCtrl', loginRequired: false})
        .otherwise({redirectTo: '/'})
    }])
    .run(['guard', function(guard){
      guard.watch();
    }])
})();