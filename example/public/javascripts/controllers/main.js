(function(){
  'use strict';
  angular.module('AuthTest.Controllers')
    .controller('MainCtrl', ['$scope', function($scope){
      $scope.hello = 'Main';
    }])
    .controller('IndexCtrl', ['$scope', function($scope){
      $scope.hello = 'Index';
    }])
    .controller('LoginCtrl', ['$scope', 'authService', function($scope, authService){
      $scope.username = null;
      $scope.email = null;
      $scope.password = null;
      $scope.errors = {
        username: [],
        email: [],
        password: [],
        form: []
      };
      $scope.login = function(){
        authService.logIn($scope.username, $scope.email, $scope.password).error(function(data, status, headers, config){
          $scope.errors = data.errors;
        })
      }
    }])
})();