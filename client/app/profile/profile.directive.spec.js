'use strict';

describe('Directive: profile', function () {

  // load the directive's module
  beforeEach(module('creapp3App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile></profile>');
    element = $compile(element)(scope);
    element.text().should.equal('this is the profile directive');
  }));
});
