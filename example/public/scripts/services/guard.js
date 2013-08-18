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
            //TODO: maybe we need a different service for that
            if(window.USER && Object.keys(window.USER).length > 0){
              authService.authenticate(window.USER);
            }

            $rootScope.$on("$routeChangeStart", function (event, next, current) {
              if(next.loginRequired != false && !authService.isAuthenticated()){
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