'use strict';

describe('Controller: BuyreqsCtrl', function () {

  // load the controller's module
  beforeEach(module('creapp'));

  var BuyreqsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuyreqsCtrl = $controller('BuyreqsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
