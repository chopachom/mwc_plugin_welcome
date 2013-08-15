(function(){
  'use strict';
  angular.module('AuthTest.Config', []);
  angular.module('AuthTest.Services', ['AuthTest.Config']);
  angular.module('AuthTest.Controllers', []);
  angular.module('AuthTest', ['AuthTest.Services', 'AuthTest.Controllers'])
    .config(['$routeProvider', function($routeProvider){
      $routeProvider
        .when('/', {templateUrl:'/partials/index.html', controller: 'IndexCtrl'})
        .when('/login', {templateUrl: '/partials/login.html', controller: 'LoginCtrl'})
    }])
    .run(['guard', function(guard){
      guard.watch();
    }])
})();