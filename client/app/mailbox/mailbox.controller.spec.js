'use strict';

describe('Component: MailboxComponent', function () {

  // load the controller's module
  beforeEach(module('creapp3App'));

  var MailboxComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MailboxComponent = $componentController('MailboxComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
