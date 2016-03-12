'use strict';

describe('Controller: RegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('creapp3App'));

  var RegisterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisterCtrl = $controller('RegisterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
