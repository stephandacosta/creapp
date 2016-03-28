'use strict';

describe('Directive: reqDetails', function () {

  // load the directive's module and view
  beforeEach(module('creapp3App'));
  beforeEach(module('app/buyreqs/reqDetails/reqDetails.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<req-details></req-details>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the reqDetails directive');
  }));
});
