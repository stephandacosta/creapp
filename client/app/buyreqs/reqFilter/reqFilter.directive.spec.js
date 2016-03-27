'use strict';

describe('Directive: reqFilter', function () {

  // load the directive's module and view
  beforeEach(module('creapp3App'));
  beforeEach(module('app/buyreqs/reqFilter/reqFilter.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<req-filter></req-filter>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the reqFilter directive');
  }));
});
