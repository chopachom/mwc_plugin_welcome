(function(){
  'use strict';

  angular.module('AuthTest.Services')
    .factory('guard', ['$rootScope', '$location', 'authService',
      /**
       *
       * @param {angular.$rootScope} $rootScope
       * @param {angular.$location} $location
       * @param {AuthService} authService
       * @returns {{watch: Function}}
       */
      function($rootScope, $location, authService){
        return {
          watch: function(){
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
              if(!authService.isAuthenticated()){
                //TODO: configurable login path
                $location.url("/login");
              }
            });
            authService.onloggedout = function(){
              //TODO: configurable login path
              $location.url("/login");
            };
            authService.onauthenticated = function(user){
              $location.url('/');
            }
          }
        }
      }
    ]);
})();