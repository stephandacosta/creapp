'use strict';

describe('Controller: AddreqCtrl', function () {

  // load the controller's module
  beforeEach(module('creapp3App'));

  var AddreqCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddreqCtrl = $controller('AddreqCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
