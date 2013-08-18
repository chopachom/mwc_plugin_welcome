'use strict';

window.USER = {
  username: 'Joe'
};

describe('Service: guard', function () {
  var
    $location,
    $rootScope,
    authService,
    guard;

  // load the controller's module
  beforeEach(module('AuthTest'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_guard_, _authService_, _$location_, _$rootScope_) {
    guard = _guard_;
    authService = _authService_;
    $location = _$location_;
    $rootScope = _$rootScope_;
  }));

  describe('#watch()', function(){
    it('should return false if user is not authenticated', function () {
      authService.isAuthenticated = jasmine.createSpy();
      $location.path('/some_url');
      $rootScope.$digest();
      expect(authService.isAuthenticated).toHaveBeenCalled();
    });
  });


});