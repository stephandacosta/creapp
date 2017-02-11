'use strict';

describe('Controller: reqCtrl', function () {

  // load the controller's module
  beforeEach(module('creapp'));

  var reqCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    reqCtrl = $controller('reqCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
