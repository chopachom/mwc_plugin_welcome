(function(){
  'use strict';

  /**
   *
   * @param {angular.$http} $http
   * @param {String} CONFIG Configuration object
   * @param {String} CONFIG.logoutUrl url for the logout
   * @constructor
   * @exports
   */
  var AuthService = function($http, CONFIG){
    this.$http = $http;
    this.CONFIG = CONFIG;
    // user object
    this.user = null;
    // callback that is called on user authentication
    /** @type {function} */
    this.onauthenticated = null;
    /** @type {function} */
    this.onloggedout = null;
  };

  /**
   * Returns true if current user is authenticated
   * @returns {boolean}
   */
  AuthService.prototype.isAuthenticated = function(){
    return !!this.user;
  };

  /**
   * Authenticates user. If service has onauthenticated callback
   * it will be called passing given user object
   * @param {Object} user User object
   */
  AuthService.prototype.authenticate = function(user){
    this.user = user;
    if(typeof this.onauthenticated === 'function'){
      this.onauthenticated(user);
    }
  };

  /**
   * Logs user out. If service has onloggedout callback it will be called
   * after successful logout http request
   */
  AuthService.prototype.logout = function(){
    var _this = this;
    this.$http.post(this.CONFIG.logoutURL, '').success(function(){
      _this.user = null;
      if(typeof _this.onloggedout === 'function'){
        _this.onloggedout()
      }
    });
  };

  AuthService.prototype.logIn = function(username, email, password){
    var _this = this;
    return this.$http.post(this.CONFIG.loginURL, {
      username: username,
      email:email,
      password:password
    })
    .success(function(data, status, headers, config){
      _this.authenticate(data);
    })
  };

  angular.module('AuthTest.Services')
    .factory('authService', ['$http', 'CONFIG',
      function($http, CONFIG){
        return new AuthService($http, CONFIG);
      }
    ]);
})();