'use strict';

describe('Directive: reqMap', function () {

  // load the directive's module
  beforeEach(module('creapp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<req-map></req-map>');
    element = $compile(element)(scope);
    element.text().should.equal('this is the reqMap directive');
  }));
});
